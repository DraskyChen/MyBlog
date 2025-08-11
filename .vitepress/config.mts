import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

const vitePressConfig = {
  head: [['link', { rel: 'icon', href: './IronMan.svg' }, '']],
  base: '/MyBlog/',
  title: "Drasky's Blog",
  description: "A VitePress Site",
  locales: {
    'root': {
      label: '简体中文',
      lang: 'zh-CN',
    },
    'en-US': {
      label: 'English',
      lang: 'en-US',
    }
  },
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/IronMan.svg',
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
      { text: 'AI', items: [
        {text: '基础知识', items: [
          {text: '机器学习', link: '/ai/MachineLearning/index'},
          {text: '深度学习', link: '/ai/DeepLearning/index'},
        ]},
        {text: '框架技术', items: [
          {text: 'TensorFlow', link: '/ai/TensorFlow/index'},
          {text: 'PyTorch', link: '/ai/PyTorch/index'},
        ]},
        {text: '进阶知识', items: [
          {text: 'NLP', link: '/ai/NLP/index'},
          {text: 'CV', link: '/ai/CV/index'},
        ]},
        {text: 'LLM', items:[
          {text: 'Agent', link: '/ai/LLM/Agent/index'},
        ]},
        {text: 'Awesome', link: '/ai/awesome'},
      ]},
      { text: '其他', items: [
        {text:'devtools', items: [
          {text: 'Git', link: '/devtools/Git/index'},
          {text: 'VSCode', link: '/devtools/VSCode/index'},
          {text: 'Cursor', link: '/devtools/Cursor/index'},
        ]}
      ]},
      // { text: 'Examples', link: '/Examples/markdown-examples' }
    ],
    //侧边栏
    sidebar: {},
    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DraskyChen' },
    ],
    //底部
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Drasky Chen'
    }
  }
};
const vitePressConfigWithSidebar = [
  {
    documentRootPath: '/',
    scanStartPath: 'backend/Python',
    basePath: '/backend/Python/',
    resolvePath: '/backend/Python/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'frontend/HTML',
    basePath: '/frontend/HTML/',
    resolvePath: '/frontend/HTML/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'frontend/CSS',
    basePath: '/frontend/CSS/',
    resolvePath: '/frontend/CSS/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'frontend/JavaScript',
    basePath: '/frontend/JavaScript/',
    resolvePath: '/frontend/JavaScript/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'frontend/TypeScript',
    basePath: '/frontend/TypeScript/',
    resolvePath: '/frontend/TypeScript/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'frontend/Vue',
    basePath: '/frontend/Vue/',
    resolvePath: '/frontend/Vue/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'ai/MachineLearning',
    basePath: '/ai/MachineLearning/',
    resolvePath: '/ai/MachineLearning/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'ai/LLM/Agent',
    basePath: '/ai/LLM/Agent/',
    resolvePath: '/ai/LLM/Agent/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'Examples',
    basePath: '/Examples/',
    resolvePath: '/Examples/',
    // useTitleFromFileHeading: true
  }
]
// https://vitepress.dev/reference/site-config
export default defineConfig(withSidebar(vitePressConfig, vitePressConfigWithSidebar))