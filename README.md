# 陈灿域 · 个人简历网站

基于 [VitePress](https://vitepress.dev) 搭建的个人在线简历与技术博客，部署在阿里云学生机。

**在线访问**: http://47.121.131.189

## ✨ 特性

- **9 个自定义 Vue 组件**：鼠标流星尾、技能雷达图、3D 卡片倾斜、滚动入场动画、滚动进度条、回到顶部、终端彩蛋、页面加载动画、暗色星空粒子
- **打字机轮播**：4 句个人亮点逐字渐变色打出
- **Konami Code 彩蛋**：输入 `↑↑↓↓←→←→BA` 触发终端动画
- **暗色模式**：完整的暗色主题适配 + 星空粒子背景
- **响应式**：移动端完整适配
- **技能标签云**：浮动动画 + hover 交互

## 🏗️ 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | VitePress 1.6 + Vue 3 |
| 样式 | CSS Custom Properties + Scoped Styles |
| 动画 | Canvas API + IntersectionObserver + CSS Keyframes |
| 部署 | Nginx + 阿里云 ECS (Ubuntu 22.04) |
| CI/CD | GitHub Actions（待配置） |

## 📁 项目结构

```
docs/
├── .vitepress/
│   ├── config.mts          # VitePress 配置
│   └── theme/
│       ├── index.ts         # 主题入口 + 打字机 + 雷达注入
│       ├── style.css        # 全局样式
│       ├── MouseTrail.vue   # 鼠标流星尾
│       ├── ScrollReveal.vue # 滚动入场动画
│       ├── SkillRadar.vue   # 技能雷达图 (Canvas)
│       ├── CardTilt.vue     # 项目卡片 3D 倾斜
│       ├── ScrollProgress.vue # 滚动进度条
│       ├── BackToTop.vue    # 回到顶部按钮
│       ├── TerminalEasterEgg.vue # Konami Code 终端彩蛋
│       ├── PageLoader.vue   # 页面加载动画
│       └── StarField.vue    # 暗色星空粒子
├── public/
│   ├── avatar.jpg           # 头像
│   └── favicon.svg          # 自定义 Favicon
├── index.md                 # 简历首页
├── projects.md              # 项目详情页
├── resume.md                # 简历文档页
└── blog/                    # 技术博客
    ├── langgraph-analysis.md
    ├── vllm-optimization.md
    └── springboot-ai-microservice.md
```

## 🚀 本地开发

```bash
# 克隆
git clone https://github.com/chenxiyou-1314/canyu-portfolio.git
cd canyu-portfolio

# 安装依赖
npm install

# 开发服务器
npm run docs:dev

# 构建
npm run docs:build

# 预览构建产物
npm run docs:preview
```

## 🖥️ 服务器部署

详细部署指南见 [DEPLOY.md](./DEPLOY.md)。

快速更新：

```bash
cd /var/www/canyu-portfolio && git pull && npm run docs:build
```

## 📄 License

MIT
