import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import mathjax3 from 'markdown-it-mathjax3'

const customElements = [
'math', 'maction', 'maligngroup', 'malignmark', 'menclose', 'merror', 'mfenced', 'mfrac', 'mi', 'mlongdiv', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mscarries', 'mscarry', 'mscarries', 'msgroup', 'mstack', 'mlongdiv', 'msline', 'mstack', 'mspace', 'msqrt', 'msrow', 'mstack', 'mstack', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'semantics', 'math', 'mi', 'mn', 'mo', 'ms', 'mspace', 'mtext', 'menclose', 'merror', 'mfenced', 'mfrac', 'mpadded', 'mphantom', 'mroot', 'mrow', 'msqrt', 'mstyle', 'mmultiscripts', 'mover', 'mprescripts', 'msub', 'msubsup', 'msup', 'munder', 'munderover', 'none', 'maligngroup', 'malignmark', 'mtable', 'mtd', 'mtr', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'msline', 'msrow', 'mstack', 'maction', 'semantics', 'annotation', 'annotation-xml', 'mjx-container', 'mjx-assistive-mml'
]

const vitePressConfig = {
  head: [[
    'script',
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-5R3J1LLHED'
    }
  ],
  [
    'script',
    {},
    `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-5R3J1LLHED');
      `
  ], 
  ['link', { rel: 'icon', href: './IronMan.svg' }, '']],
  base: '/MyBlog/',
  title: "Drasky's Blog",
  description: "A VitePress Site",
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag) 
      }
    }
  },
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
          {text: '关系型数据库 (RDBMS)', link: '/backend/RDBMS/index'},
          {text: '非关系型数据库 (NoSQL)', link: '/backend/NoSQL/index'},
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
      { text: 'DevOps', items: [
        {text:'开发工具', link:'/devops/devtools/index'},
        {text: 'Git', link: '/devops/Git/index'},
        {text: 'CI/CD', link: '/devops/CI_CD/index'},
        {text: '容器化', link: '/devops/container/index'},
        {text: '监控与日志', link: '/devops/mon&log/index'},
        {text: 'Web 服务器/反向代理', link: '/devops/server/index'},
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
    scanStartPath: 'backend/Java',
    basePath: '/backend/Java/',
    resolvePath: '/backend/Java/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'backend/NoSQL',
    basePath: '/backend/NoSQL/',
    resolvePath: '/backend/NoSQL/',
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
    scanStartPath: 'ai/DeepLearning',
    basePath: '/ai/DeepLearning/',
    resolvePath: '/ai/DeepLearning/',
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
    scanStartPath: 'devops/Git',
    basePath: '/devops/Git/',
    resolvePath: '/devops/Git/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'devops/CI_CD',
    basePath: '/devops/CI_CD/',
    resolvePath: '/devops/CI_CD/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'devops/server',
    basePath: '/devops/server/',
    resolvePath: '/devops/server/',
    // useTitleFromFileHeading: true
  },
  {
    documentRootPath: '/',
    scanStartPath: 'devops/container',
    basePath: '/devops/container/',
    resolvePath: '/devops/container/',
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