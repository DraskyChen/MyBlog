---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

#如果layout是home，hero是配置项
hero:
  name: "Drasky's Blog"
  text: "在不断构建中，构建更好的自己"
  tagline: Code is Cheap, show me you chat
  image:
    src: /iron-man_640_ok.png
    alt: VitePress
  actions:
    - theme: brand
      text: 现在就开始吧 ->
      link: /posts/

features:
  - icon: 🖥️
    title: 前端开发
    details: 深入研究 Vue、React、TypeScript 等现代前端技术，分享实用开发经验与最佳实践。
    link: /frontend/
    linkText: 前端专栏
  - icon: ⚙️
    title: 工程化与自动化
    details: 持续集成、自动化部署、脚手架工具开发，提升开发效率与代码质量。
    link: /engineering/
    linkText: 工程化实践
  - icon: 🌐
    title: Node.js & 全栈
    details: Node.js 后端开发、API 设计、全栈项目实战，打造完整应用。
    link: /fullstack/
    linkText: 全栈探索
  - icon: 📚
    title: 学习与成长
    details: 记录学习笔记、技术思考与成长感悟，见证每一步进步。
    link: /notes/
    linkText: 学习笔记
---

<style module>
  :root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
    --vp-button-brand-bg: #41d1ff;
  }
  .vp-hero {
    font-size: 1rem;
  }
</style>
