import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

/**
 * d2l (Dive into Deep Learning) 交叉引用标签索引。
 *
 * 《动手学深度学习》原始内容使用 :label:`xxx` 定义标签，
 * 并在正文中用 :numref: / :eqref: / :ref: / :cite: 引用。
 * 本模块在配置加载时扫描 DeepLearning 与 MachineLearning 目录，
 * 建立 label -> 目标信息 的映射，供 markdown-it-d2l 插件渲染时解析引用。
 */

export interface D2lTarget {
  /** 目标页面路由，如 /ai/DeepLearning/注意力机制/transformer（不含 .html 与 base） */
  route: string
  /** 最近的章节标题文本（标签紧跟其后时为 ''） */
  heading: string
  /** 章节标题的 VitePress 风格锚点 slug */
  slug: string
  /** 标签类型：fig_/eq_/table_/img_ 为编号对象，sec_/subsec_/chap_ 为章节 */
  kind: 'fig' | 'eq' | 'table' | 'img' | 'sec' | 'subsec' | 'chap' | 'other'
  /** 同类型标签的全局序号，用于 d2l 风格的“图 N/式 N/表 N”编号 */
  order: number
}

const LABEL_RE = /^:(label|eqlabel):`([^`]+)`/
const HEADING_RE = /^(#{1,6})\s+(.+)$/
const KIND_PREFIX = /^(fig|eq|table|img|sec|subsec|chap)_/

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (entry.endsWith('.md')) out.push(p)
  }
  return out
}

/** 近似 VitePress 的 header-slug 规则：保留 CJK，标点转连字符 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, '-')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

/** 清理标题文本：去掉 d2l 的 [**...**] 强调标记与 markdown 标记 */
export function cleanHeading(text: string): string {
  return text
    .replace(/[\[\]]|\*\*/g, '') // [**位置编码**] -> 位置编码（去掉方括号与 **）
    .replace(/\*(.+?)\*/g, '$1') // *斜体* -> 斜体
    .replace(/`([^`]+)`/g, '$1') // `code` -> code
    .replace(/\s+/g, ' ')
    .trim()
}

export function buildD2lIndex(root = process.cwd()): Map<string, D2lTarget> {
  const index = new Map<string, D2lTarget>()
  const orderByKind = new Map<string, number>()

  const files = [...walk(join(root, 'ai/DeepLearning')), ...walk(join(root, 'ai/MachineLearning'))].sort()

  for (const file of files) {
    const lines = readFileSync(file, 'utf8').split('\n')
    let heading = ''
    let inFence = false

    for (const line of lines) {
      if (/^```/.test(line)) {
        inFence = !inFence
        continue
      }
      if (inFence) continue

      const h = line.match(HEADING_RE)
      if (h) {
        heading = cleanHeading(h[2])
        continue
      }

      const m = line.match(LABEL_RE)
      if (!m) continue

      const label = m[2]
      // :eqlabel: 是公式标签（:eqref: 的引用目标），归为 eq 类型
      const kindMatch = label.match(KIND_PREFIX)
      const kind = m[1] === 'eqlabel' ? 'eq' : ((kindMatch ? kindMatch[1] : 'other') as D2lTarget['kind'])
      const order = (orderByKind.get(kind) ?? 0) + 1
      orderByKind.set(kind, order)

      const route = '/' + relative(root, file).replace(/\.md$/, '')
      if (!index.has(label)) {
        index.set(label, { route, heading, slug: slugify(heading), kind, order })
      } else {
        console.warn(`[d2l-index] 重复标签 ${label}，忽略 ${route}`)
      }
    }
  }
  return index
}
