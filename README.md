# MyBlog / Drasky's Blog

一个基于 [VitePress](https://vitepress.dev/) 的个人技术博客，沉淀前端、后端、AI、DevOps 四个方向的学习笔记，通过 GitHub Actions 自动构建并部署到 GitHub Pages。

## 技术栈

- **文档框架**：VitePress 1.6+（Vue 3）
- **侧边栏**：`vitepress-sidebar` 按目录自动生成
- **数学公式**：`markdown-it-mathjax3`
- **CI/CD**：GitHub Actions（push 到 main 自动构建部署到 `gh-pages` 分支）

## 内容结构

内容直接存放在仓库根目录的四个主题目录下，每个子目录是一个技术模块，含 `index.md` 目录页和若干笔记：

```
frontend/  前端（HTML、CSS、JavaScript、TypeScript、Vue、React）
backend/   后端（Java、Python、RDBMS、NoSQL、MQ）
ai/        人工智能（机器学习、深度学习、NLP、CV、PyTorch、TensorFlow、LLM/Agent）
devops/    工程化（Git、CI/CD、容器化、Nginx）
```

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（带热更新）
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建产物
npm run docs:preview
```

## 如何添加一篇笔记

1. 在对应模块目录下新建 `.md` 文件，文件名用数字前缀控制排序，例如 `frontend/Vue/9.xxx.md`。
2. 每个笔记建议带 frontmatter：

   ```markdown
   ---
   title: 笔记标题
   date: 2025-09-02
   categories: [frontend, Vue]
   tags: [前端, Vue]
   ---
   ```

3. 若新增了**新的模块目录**，需要在 `.vitepress/config.mts` 中：
   - 在 `nav` 中添加导航项；
   - 在 `vitePressConfigWithSidebar` 数组中添加一条 `scanStartPath` 配置，侧边栏才会生成。

> 已有目录的侧边栏会自动生成，无需手动维护。

## 内容约定

- **笔记风格**：`#` 标题 + `---` 分隔 + emoji/中文序号小节 + 可运行代码块 + 表格 + 小结。
- **d2l 交叉引用**：`ai/DeepLearning/` 下的《动手学深度学习》笔记使用了 `:numref:` / `:cite:` / `#@tab` 等 d2lbook 语法，由自定义插件 `.vitepress/plugins/markdown-it-d2l.ts` 在渲染时转换为可读文本与框架徽标。
- **frontmatter 批量迁移**：`scripts/add-frontmatter.mjs` 可为现有笔记批量补充 title/date/categories/tags（`--dry-run` 预览，`--apply` 写入）。

## 部署

push 到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）会自动构建并部署到 GitHub Pages（站点根路径为 `/MyBlog/`）。

## 许可证

MIT License。详见仓库根目录的 LICENSE 文件。
