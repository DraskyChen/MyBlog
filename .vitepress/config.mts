import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/Iron Man.svg' }]],
  base: '/MyBlog.git/',
  title: "Drasky's Blog",
  description: "A VitePress Site",
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/Iron Man.svg',
    search: {
      provider: 'local'
    },
    //导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: '前端', items:[
        {text: '基础知识', items: [
          {text: 'HTML', link: '/frontend/HTML/index'},
          {text: 'CSS', link: '/frontend/CSS/index'},
          {text: 'JavaScript', link: '/frontend/JavaScript/index'},
        ]},
        {text: '进阶知识', items: [
          {text: 'TypeScript', link: '/frontend/TypeScript/index'},
        ]},
        {text: '框架技术', items: [
          {text: 'Vue', link: '/frontend/Vue/index'},
          {text: 'React', link: '/frontend/React/index'},
        ]},
        {text: '前端工程化', items: [
          {text: 'Webpack', link: '/frontend/Webpack/index'},
          {text: 'Vite', link: '/frontend/Vite/index'},
        ]},
        {text: 'Awesome', link: '/frontend/awesome'},
      ]},
      { text: '后端', items: [
        {text: '基础知识', items: [
          {text: 'Java', link: '/backend/Java/index'},
          {text: 'Python', link: '/backend/Python/index'},
        ]},
        {text: '数据库', items: [
          {text: 'MySQL', link: '/backend/MySQL/index'},
          {text: 'Redis', link: '/backend/Redis/index'},
        ]},
        {text: '框架技术', items: [
          {text: 'SpringBoot', link: '/backend/SpringBoot/index'},
          {text: 'Django', link: '/backend/Django/index'},
        ]},
        {text: 'Awesome', link: '/backend/awesome'},
      ]},
      { text: '人工智能', items: [
        {text: '基础知识', items: [
          {text: '机器学习', link: '/ai/machine-learning/index'},
          {text: '深度学习', link: '/ai/deep-learning/index'},
        ]},
        {text: '框架技术', items: [
          {text: 'TensorFlow', link: '/ai/TensorFlow/index'},
          {text: 'PyTorch', link: '/ai/PyTorch/index'},
        ]},
        {text: '进阶知识', items: [
          {text: 'NLP', link: '/ai/NLP/index'},
          {text: 'CV', link: '/ai/CV/index'},
        ]},
        {text: 'LLM', link: '/ai/LLM/index'},
        {text: 'Awesome', link: '/ai/awesome'},
      ]},
      { text: 'DevTools', link: '/devtools/index' },
      { text: 'Examples', link: '/Examples/markdown-examples' }
    ],
    //侧边栏
    sidebar: {
      '/frontend/HTML':[
        {
          text: '学习HTML',
          items: [
          { text: '快速入门', link: '/frontend/HTML/index' },
          { text: '标签', link: '/frontend/HTML/tags' },
          { text: '布局', link: '/frontend/HTML/layout' },]
        }
      ],
      '/frontend/CSS':[
        {
          text: '学习CSS',
          items: [
          { text: '快速入门', link: '/frontend/CSS/index' },
          { text: '基础语法', link: '/frontend/CSS/basic-syntax' },
          { text: '伪类&伪元素', link: '/frontend/CSS/pseudo-class-pseudo-element' },]
        },
      ],
      '/frontend/JavaScript':[
        {
          text: '学习JavaScript',
          items: [
          { text: '快速入门', link: '/frontend/JavaScript/index' },
          { text: '基础语法', link: '/frontend/JavaScript/basic-syntax' },]
        },
      ],
      '/backend/':[{
      }],
      '/ai/':[{
      }],
     '/Examples/':[{
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/Examples/markdown-examples' },
          { text: 'Runtime API Examples', link: '/Examples/api-examples' }
        ]
      }]
    },
    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    //底部
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Drasky Chen'
    }
  }
})
