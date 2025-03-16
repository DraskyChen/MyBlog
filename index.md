---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

#如果layout是home，hero是配置项
hero:
  name: "个人技术博客"
  text: "A VitePress Site"
  tagline: My great project tagline
  image:
    src: /iron-man_640_ok.png
    alt: VitePress
  actions:
    - theme: brand
      text: 现在就开始吧 ->
      link: /#
    - theme: alt
      text: Github
      link: https://github.com/DraskyChen

features:
  - icon: ✨ 
    title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /#
    linkText: Learn more...
  - icon: 🛠️
    title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - icon: 🧭
    title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - icon: 💕
    title: Feature D
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---
<style module>
  :root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
    --vp-button-brand-bg: #41d1ff;
  }  
</style>
