import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '陈灿域',
  description: 'AI算法 & 全栈开发 | 硕士研究生',
  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/avatar.jpg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'msapplication-TileColor', content: '#6366f1' }],
  ],
  appearance: true,
  cleanUrls: true,

  themeConfig: {
    logo: '/avatar.jpg',

    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/projects' },
      { text: '博客', link: '/blog/' },
    ],

    sidebar: {
      '/blog/': [
        {
          text: '技术文章',
          items: [
            { text: 'LangGraph 多Agent架构源码解析', link: '/blog/langgraph-analysis' },
            { text: 'vLLM推理加速：从2.3s到0.8s', link: '/blog/vllm-optimization' },
            { text: 'Spring Boot + Python AI微服务实践', link: '/blog/springboot-ai-microservice' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenxiyou-1314' },
    ],

    footer: {
      message: '基于 VitePress 搭建',
      copyright: '© 2026 陈灿域',
    },

    search: {
      provider: 'local',
    },
  },
})
