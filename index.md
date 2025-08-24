---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

#如果layout是home，hero是配置项
hero:
  name: "Drasky's Blog"
  text: "在不断构建中，构建更好的自己"
  tagline: Code is cheap, show me you prompt
  image:
    src: /iron-man_640_ok.png
    alt: VitePress
  actions:
    - theme: brand
      text: 现在就开始吧 ->
      link: /self-intro/

features:
  - icon: 🖥️
    title: web开发
    details: 现代web技术，分享实用开发经验与最佳实践。
  - icon: 🛠️
    title: 工程化与自动化
    details: 持续集成、自动化部署、脚手架工具开发，提升开发效率与代码质量。
  - icon: 🤖
    title: AI玩家
    details: 探索大模型应用开发与场景落地、API 设计、Prompt 工程与结合前后端的智能化功能落地。
  - icon: 📚
    title: 学习与成长
    details: 记录学习笔记、读书与知识总结、职业发展建议与技术反思，助力持续进步。
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
