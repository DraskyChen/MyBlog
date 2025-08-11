// scripts/genSidebar.ts
import fs from 'fs'
import path from 'path'

const DOCS_ROOT = path.resolve(__dirname, '../')
const OUTPUT_FILE = path.resolve(DOCS_ROOT, '.vitepress/generated/sidebar.json')

// 配置：你要扫描哪些子目录
const sectionPaths = [
  'frontend/HTML',
  'frontend/CSS',
  'frontend/JavaScript',
  'frontend/TypeScript',
  'frontend/Vue',
  'backend/Python',
  'ai/LLM/Agent'
]

// 工具：读取指定目录下的 Markdown 文件，生成 sidebar 条目
function getSidebarEntries(dir: string): { text: string; link: string }[] {
  const fullDir = path.join(DOCS_ROOT, dir)
  if (!fs.existsSync(fullDir)) return []

  return fs
    .readdirSync(fullDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const filePath = path.join(dir, f).replace(/\\/g, '/')
      const link = '/' + filePath.replace(/\.md$/, '')
      const text = f.replace(/\.md$/, '')
      return { text, link }
    })
}

// 主函数：构建 sidebar 对象
function buildSidebar() {
  const sidebar: Record<string, { text: string; link: string }[]> = {}

  sectionPaths.forEach(section => {
    const entries = getSidebarEntries(section)
    if (entries.length > 0) {
      const routePath = '/' + section.replace(/\\/g, '/') + '/'
      sidebar[routePath] = entries
    }
  })

  return sidebar
}

// 执行写入
function generateSidebarFile() {
  const sidebar = buildSidebar()
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sidebar, null, 2))
  console.log(`✅ Sidebar generated to ${OUTPUT_FILE}`)
}

generateSidebarFile()
