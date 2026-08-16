#!/usr/bin/env node
/**
 * 批量给 MyBlog 笔记添加 frontmatter 元数据。
 *
 * 用法:
 *   node scripts/add-frontmatter.mjs            # dry-run（默认，只打印计划）
 *   node scripts/add-frontmatter.mjs --apply     # 实际写入
 *
 * 每个文件生成:
 *   ---
 *   title: <首个 # 标题，剥离 emoji/序号>
 *   date: <首次 git 提交日期>
 *   categories: [<目录路径段>]
 *   tags: [<顶层目录映射 + 子目录>]
 *   ---
 *
 * 跳过规则:
 *   - 已以 `---` 开头的文件（含 frontmatter）
 *   - 0 字节空文件（由 index 页/内容编写工作处理）
 *   - Examples/、README.md、根 index.md、self-intro.md
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, basename, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'

const ROOT = process.cwd()
const DRY_RUN = !process.argv.includes('--apply')

/** 顶层目录 -> 中文标签映射 */
const TOP_TAG = {
  frontend: '前端',
  backend: '后端',
  devops: 'DevOps',
  ai: 'AI',
}

/** 子目录路径 -> 额外标签（按前缀匹配） */
const SUBDIR_TAGS = [
  [/^ai\/DeepLearning/, '深度学习'],
  [/^ai\/DeepLearning/, 'd2l'],
  [/^ai\/MachineLearning/, '机器学习'],
  [/^ai\/LLM/, 'LLM'],
  [/^ai\/NLP/, 'NLP'],
  [/^ai\/CV/, 'CV'],
  [/^ai\/Pytorch/, 'PyTorch'],
  [/^ai\/PyTorch/, 'PyTorch'],
  [/^ai\/TensorFlow/, 'TensorFlow'],
  [/^backend\/Java/, 'Java'],
  [/^backend\/Python/, 'Python'],
  [/^backend\/RDBMS/, 'RDBMS'],
  [/^backend\/NoSQL/, 'NoSQL'],
  [/^backend\/MQ/, 'MQ'],
  [/^frontend\/HTML/, 'HTML'],
  [/^frontend\/CSS/, 'CSS'],
  [/^frontend\/JavaScript/, 'JavaScript'],
  [/^frontend\/TypeScript/, 'TypeScript'],
  [/^frontend\/Vue/, 'Vue'],
  [/^frontend\/React/, 'React'],
  [/^devops\/Git/, 'Git'],
  [/^devops\/CI_CD/, 'CI/CD'],
  [/^devops\/container/, '容器'],
  [/^devops\/server/, 'Nginx'],
]

/** 明确跳过（顶层特殊文件） */
const SKIP_TOP = new Set(['index.md', 'README.md', 'self-intro.md'])

/** 收集内容目录下所有 md 文件 */
function collectMd(root) {
  const out = []
  for (const top of ['frontend', 'backend', 'ai', 'devops']) {
    walk(join(root, top), out)
  }
  return out
}
function walk(dir, out) {
  if (!statSyncSafe(dir)) return
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    const st = statSyncSafe(p)
    if (!st) continue
    if (st.isDirectory()) walk(p, out)
    else if (e.endsWith('.md')) out.push(p)
  }
}
function statSyncSafe(p) {
  try {
    return statSync(p)
  } catch {
    return null
  }
}

/** fence 感知的首个 # 标题（含 setext 标题处理） */
function extractTitle(src, relPath) {
  const lines = src.split('\n')
  let inFence = false
  let firstH1 = ''
  let firstH2 = ''
  let firstSetextH2 = ''
  let firstSetextH1 = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const m = line.match(/^(#{1,6})\s+(.+)$/)
    if (m) {
      if (m[1].length === 1 && !firstH1) firstH1 = m[2]
      if (m[1].length === 2 && !firstH2) firstH2 = m[2]
      continue
    }

    // setext 标题：某行下方紧跟 =====(h1) 或 -----(h2)
    const next = lines[i + 1]
    if (next) {
      if (/^={4,}$/.test(next.trim()) && !line.startsWith(':')) {
        if (!firstSetextH1) firstSetextH1 = line
      } else if (/^-{4,}$/.test(next.trim()) && !line.startsWith(':') && !firstSetextH2) {
        firstSetextH2 = line
      }
    }
  }

  // 优先级：`#` h1（DL 风格）> setext h2（ML 描述性子标题）> `##` h2 > setext h1（ML 第X周）> 首个非空行 > 文件名
  if (firstH1) return cleanTitle(firstH1)
  if (firstSetextH2) return cleanTitle(firstSetextH2)
  if (firstH2) return cleanTitle(firstH2)
  if (firstSetextH1) return cleanTitle(firstSetextH1)
  for (const line of lines) {
    const t = line.trim()
    if (t && !t.startsWith(':')) return cleanTitle(t)
  }
  return basename(relPath, '.md')
}

function cleanTitle(title) {
  return title
    .replace(/^[\d]+[.、．\s]+/, '') // 数字序号 "2. " "3."
    .replace(/^\p{Extended_Pictographic}+[\s:：]?/u, '') // 前导 emoji
    .replace(/^第[一二三四五六七八九十百千]+[、．.\s]+/, '') // 第X、/第X. 前缀
    .replace(/^第[一二三四五六七八九十百千]+[章讲篇节课]?\s*/, '') // 第X章/讲/节
    .replace(/^第[一二三四五六七八九十百千]+周/, '') // 第X周
    .trim()
}

/** 首次 git 提交日期 */
function firstCommitDate(relPath) {
  try {
    const out = execFileSync('git', ['log', '--format=%aI', '--', relPath], {
      cwd: ROOT,
      encoding: 'utf8',
    })
      .trim()
      .split('\n')
      .filter(Boolean)
    if (out.length) return out[out.length - 1].slice(0, 10) // 最旧提交
  } catch {
    /* 未跟踪文件 */
  }
  try {
    return statSync(join(ROOT, relPath)).birthtime.toISOString().slice(0, 10)
  } catch {
    return '2025-01-01'
  }
}

/** YAML 单值引号处理 */
function yamlQuote(s) {
  const needsQuote = /[:#{}[\]&*!|>'"%@`]/u.test(s) || /^\s|\s$/.test(s)
  if (!needsQuote) return s
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
}

function buildFrontmatter(relPath, src) {
  const title = extractTitle(src, relPath)
  const date = firstCommitDate(relPath)
  const segments = dirname(relPath).split('/')
  const top = segments[0]
  const categories = [top, ...segments.slice(1)].map((s) => s)
  const tags = []
  if (TOP_TAG[top]) tags.push(TOP_TAG[top])
  for (const [re, tag] of SUBDIR_TAGS) {
    if (re.test(relPath)) tags.push(tag)
  }
  // 追加直接子目录名（如 优化算法）
  if (segments.length > 1 && !tags.includes(segments[1])) tags.push(segments[1])

  return [
    '---',
    `title: ${yamlQuote(title)}`,
    `date: ${date}`,
    `categories: [${categories.map(yamlQuote).join(', ')}]`,
    `tags: [${tags.map(yamlQuote).join(', ')}]`,
    '---',
    '',
  ].join('\n')
}

function main() {
  const files = collectMd(ROOT)
  const wouldWrite = []
  const skipped = []

  for (const file of files) {
    const relPath = relative(ROOT, file)
    const src = readFileSync(file, 'utf8')

    // 跳过规则
    if (SKIP_TOP.has(relPath)) {
      skipped.push({ relPath, reason: '顶层特殊文件' })
      continue
    }
    if (src.startsWith('---')) {
      skipped.push({ relPath, reason: '已有 frontmatter' })
      continue
    }
    if (!src.trim()) {
      skipped.push({ relPath, reason: '空文件' })
      continue
    }

    const fm = buildFrontmatter(relPath, src)
    wouldWrite.push({ relPath, fm })
  }

  // 汇总输出
  if (DRY_RUN) {
    console.log(`[dry-run] 将写入 ${wouldWrite.length} 个文件，跳过 ${skipped.length} 个\n`)
    for (const s of skipped) console.log(`  ⏭ 跳过 ${s.relPath} (${s.reason})`)
    console.log('\n=== 计划写入的 title ===')
    for (const w of wouldWrite) {
      const title = w.fm.split('\n').find((l) => l.startsWith('title:'))?.slice(7) ?? '?'
      console.log(`  ${w.relPath} -> title: ${title}`)
    }
    console.log('\n提示: 运行 `node scripts/add-frontmatter.mjs --apply` 实际写入')
  } else {
    for (const w of wouldWrite) {
      const file = join(ROOT, w.relPath)
      const src = readFileSync(file, 'utf8')
      const body = src.replace(/^\s*\n/, '') // 去掉开头空行
      writeFileSync(file, w.fm + '\n' + body)
    }
    console.log(`✅ 已为 ${wouldWrite.length} 个文件写入 frontmatter，跳过 ${skipped.length} 个`)
  }
}

main()
