import type MarkdownIt from 'markdown-it'
import { buildD2lIndex, type D2lTarget } from './d2l-index.ts'

/**
 * markdown-it 插件：渲染《动手学深度学习》(d2l) 的交叉引用语法。
 *
 * 处理的指令：
 *  - :label:`xxx`            标签定义（隐藏，作为锚点存在）
 *  - :numref:`xxx`           图/章节引用 -> 「图 N」或章节标题
 *  - :eqref:`xxx`            公式引用 -> 「式 N」
 *  - :ref:`xxx`              通用引用 -> 目标标题或标签
 *  - :cite:`A.B.YYYY,...`    文献引用 -> 「A 等, YYYY」/「A 和 B, YYYY」
 *  - :width:`NNpx`           图片宽度（隐藏）
 *  - #@tab framework         代码块内框架标记 -> 剥离并渲染为徽标
 *  - #@save                  代码块内标记 -> 剥离
 *  - :begin_tab: / :end_tab: 讨论块标记 -> 剥离（保留内部链接）
 *
 * 所有未知/无法解析的引用一律回退为原文文本，绝不让构建崩溃。
 */

const INLINE_RE = /:(label|eqlabel|numref|eqref|ref|cite|width):`([^`]+)`/
const NUMERABLE_KINDS = new Set(['fig', 'eq', 'table', 'img'])

/** 作者缩略名: A.B.C.ea.2017 -> 「A 等, 2017」；A.B.2017 -> 「A 和 B, 2017」 */
function citeText(key: string): string {
  const parts = key.split('.')
  const year = parts[parts.length - 1]
  const names = parts.slice(0, -1)
  if (!/^\d{4}$/.test(year)) return key
  if (names[names.length - 1] === 'ea') {
    const first = names[0]
    return `${first} 等, ${year}`
  }
  const lead = names.slice(0, 2).filter(Boolean)
  return `${lead.join(' 和 ')}, ${year}`
}

function readableRef(kind: 'numref' | 'eqref' | 'ref', target: D2lTarget): string {
  if (kind === 'eqref') return `式 ${target.order}`
  if (target.kind === 'fig' || target.kind === 'img') return `图 ${target.order}`
  if (target.kind === 'eq') return `式 ${target.order}`
  if (target.kind === 'table') return `表 ${target.order}`
  // 章节类引用 -> 使用标题文本
  if (target.heading) return target.heading
  if (kind === 'numref' && target.kind === 'sec') return `第 ${target.order} 节`
  return target.heading || target.kind
}

/** 未知标签的可读回退：subsec_multi-output-channels -> 多输出通道章节 */
function fallbackText(kind: string, arg: string): string {
  const prefix = /^(fig|eq|table|img|sec|subsec|chap)_/.exec(arg)?.[1]
  const label = arg.replace(/^(fig|eq|table|img|sec|subsec|chap)_/, '')
  const readable = label.replace(/[-_]+/g, ' ')
  if (kind === 'eqref') return `式 ${readable}`
  if (prefix === 'fig' || prefix === 'img') return `图 ${readable}`
  if (prefix === 'table') return `表 ${readable}`
  return readable
}

function currentRoute(env: any): string {
  // env.relativePath 形如 ai/DeepLearning/注意力机制/transformer.md
  const rel = env?.relativePath
  if (!rel) return ''
  return '/' + rel.replace(/\.md$/, '')
}

export default function d2lPlugin(md: MarkdownIt, opts?: { index?: Map<string, D2lTarget> }) {
  const index = opts?.index ?? buildD2lIndex()
  // 缓存默认 fence 渲染（VitePress 的 shiki 高亮规则），覆写时仍调用它
  const defaultFence = md.renderer.rules.fence

  // ---- 1. 内联规则：:numref: / :eqref: / :ref: / :cite: / :label: / :width: ----
  // 必须赶在 emoji 规则之前：:label: 是合法 emoji 别名，会被转成 🏷️
  md.inline.ruler.before('text', 'd2l_inline', (state, silent) => {
    const src = state.src.slice(state.pos)
    const m = src.match(INLINE_RE)
    if (!m || m.index !== 0) return false
    if (silent) return true

    const [, kind, arg] = m

    switch (kind) {
      case 'label':
      case 'eqlabel':
      case 'width':
        // 静默删除：不产生 token，避免 :label: 被 emoji 插件误转
        state.pos += m[0].length
        return true

      case 'numref':
      case 'eqref':
      case 'ref': {
        const target = index.get(arg)
        if (!target) {
          // 未知标签：回退为可读文本，不泄漏原文
          const t = state.push('text', '', 0)
          t.content = fallbackText(kind, arg)
          state.pos += m[0].length
          return true
        }
        const text = readableRef(kind, target)
        const current = currentRoute(state.env)
        const sameFile = current === target.route
        // 图/表/式引用渲染为纯文本编号；章节引用渲染为链接
        const isSection = !NUMERABLE_KINDS.has(target.kind)
        if (!isSection || !target.slug) {
          const t = state.push('text', '', 0)
          t.content = text
          state.pos += m[0].length
          return true
        }
        // 同文件引用带 #锚点；跨文件链接用路由（VitePress 自动补 base + .html + decodeURI）
        const href = sameFile ? `#${target.slug}` : target.route
        const open = state.push('link_open', 'a', 1)
        open.attrs = [['href', href]]
        const txt = state.push('text', '', 0)
        txt.content = text
        state.push('link_close', 'a', -1)
        state.pos += m[0].length
        return true
      }

      case 'cite': {
        const t = state.push('text', '', 0)
        t.content = arg
          .split(',')
          .map((s: string) => citeText(s.trim()))
          .join('; ')
        state.pos += m[0].length
        return true
      }

      default:
        return false
    }
  })

  // ---- 2. 块级规则：#@tab / #@save 代码块处理 ----
  md.block.ruler.before('fence', 'd2l_tab', (state, startLine, endLine, silent) => {
    const startPos = state.bMarks[startLine]
    const maxPos = state.eMarks[startLine]
    const src = state.src.slice(startPos, maxPos)
    const fenceMatch = src.match(/^```(\S*)/)
    if (!fenceMatch) return false

    // 扫描代码块内容，收集 #@tab/#@save 与 :maxdepth: 行
    let line = startLine + 1
    let content: string[] = []
    let dropped: string[] = []
    let tabLines: string[] = []
    let isToc = fenceMatch[1] === 'toc'
    for (; line < endLine; line++) {
      const b = state.bMarks[line]
      const e = state.eMarks[line]
      const raw = state.src.slice(b, e)
      if (/^```/.test(raw)) break
      // toc 代码块内的 :maxdepth: 是 d2l 目录深度指令，静默剥离
      if (isToc && /^:maxdepth:\s*\d*/.test(raw)) {
        dropped.push(raw)
        continue
      }
      if (/^#@(?:tab|save)\b/.test(raw)) {
        dropped.push(raw)
        tabLines.push(raw)
        continue
      }
      content.push(raw)
    }
    // 无 d2l 标记的普通代码块：交给默认 fence 规则（保持 shiki 高亮）
    if (!dropped.length) return false
    if (silent) return true

    const token = state.push('fence', 'code', 0)
    token.content = content.join('\n')
    token.markup = '```'
    token.info = fenceMatch[1] || 'python'
    token.map = [startLine, line]
    token.meta = {
      tab: tabLines
        .map((d) => d.replace(/^#@(?:tab|save)\s*/, '').trim())
        .filter(Boolean)
        .join(', ')
    }
    state.line = line + 1
    return true
  })

  // ---- 3. fence 渲染器：带框架徽标的包装 ----
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (!token.meta?.tab) return defaultFence(tokens, idx, options, env, slf)
    const badge = `<div class="d2l-tab-label">${token.meta.tab}</div>`
    return `<div class="d2l-tab">${badge}${defaultFence(tokens, idx, options, env, slf)}</div>`
  }

  // ---- 4. core 规则：剥离 :begin_tab: / :end_tab: 行 ----
  md.core.ruler.before('inline', 'd2l_strip_tab_block', (state) => {
    for (const tok of state.tokens) {
      if (tok.type === 'inline' && /^:begin_tab:|^:end_tab:/m.test(tok.content)) {
        tok.content = tok.content
          .split('\n')
          .filter((l) => !/^:begin_tab:|^:end_tab:/.test(l))
          .join('\n')
      }
    }
  })
}
