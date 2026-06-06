---
layout: page
sidebar: false
aside: false
---

<style scoped>
/* ============================================
   页面容器
   ============================================ */
.resume-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

/* ============================================
   Hero 区域 - 左右布局
   ============================================ */
.hero-layout {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 3rem 0 2.5rem;
  position: relative;
}

.hero-left {
  flex: 1;
  min-width: 0;
}

.hero-right {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-name {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  font-weight: 500;
  min-height: 1.6em;
}

.hero-subtitle::after {
  content: '▌';
  animation: cursorBlink 1s step-end infinite;
  color: var(--vp-c-brand-1);
  font-weight: 300;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 500;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(99, 102, 241, 0.15);
}

.hero-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
}

.hero-contact a,
.hero-contact span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-contact a:hover {
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

/* 头像 + 光环 */
.avatar-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--vp-c-brand-1),
    #8b5cf6,
    #06b6d4,
    var(--vp-c-brand-1)
  );
  animation: avatarRingSpin 4s linear infinite;
  filter: blur(1px);
}

.avatar-ring::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--vp-c-bg);
}

.hero-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--vp-c-bg);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.hero-avatar:hover {
  transform: scale(1.05);
}

.avatar-wrapper::after {
  content: '';
  position: absolute;
  inset: -24px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  animation: avatarPulse 3s ease-in-out infinite;
  z-index: -1;
  pointer-events: none;
}

@keyframes avatarRingSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes avatarPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.15); opacity: 0.8; }
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ============================================
   双列并排区域
   ============================================ */
.dual-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

/* ============================================
   区块标题
   ============================================ */
.section-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.section-title .icon {
  font-size: 1.3rem;
}

/* ============================================
   时间线
   ============================================ */
.timeline {
  position: relative;
  padding-left: 1.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(180deg, var(--vp-c-brand-1), #8b5cf6, transparent);
  border-radius: 9999px;
}

.timeline-item {
  position: relative;
  padding-bottom: 1.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -1.5rem;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 3px solid var(--vp-c-bg);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
  animation: timelinePulse 2s ease-in-out infinite;
}

@keyframes timelinePulse {
  0%, 100% { box-shadow: 0 0 0 2px var(--vp-c-brand-soft); }
  50% { box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.15); }
}

.timeline-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
}

.timeline-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.timeline-header .time {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
  background: var(--vp-c-bg-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
}

.timeline-sub {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin: 0.2rem 0 0.4rem;
}

.timeline-body {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.7;
}

.timeline-body ul {
  margin: 0.3rem 0 0;
  padding-left: 1.2rem;
}

.timeline-body li {
  margin: 0.25rem 0;
}

.timeline-body li::marker {
  color: var(--vp-c-brand-1);
}

/* ============================================
   项目卡片 - 双列网格
   ============================================ */
.project-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-top: 1rem;
}

.project-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 800px;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.12);
  border-color: var(--vp-c-brand-soft);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), #8b5cf6, #06b6d4);
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.project-card h3 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
}

.project-card .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
}

.project-card .tag {
  font-size: 0.7rem;
  padding: 0.12rem 0.45rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: default;
}

.project-card .tag:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.project-card p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

/* ============================================
   科研成果 - 横向卡片
   ============================================ */
.achieve-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
}

.achieve-card {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.achieve-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateX(4px);
  border-left: 3px solid var(--vp-c-brand-1);
}

.achieve-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.achieve-content {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

.achieve-content strong {
  color: var(--vp-c-text-1);
}

/* ============================================
   技能
   ============================================ */
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.skill-group {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  background: var(--vp-c-bg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-group:hover {
  border-color: var(--vp-c-brand-soft);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.08);
  transform: translateY(-2px);
}

.skill-group h4 {
  margin: 0 0 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-group p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* ============================================
   底部CTA
   ============================================ */
.action-footer {
  text-align: center;
  margin-top: 3.5rem;
  padding: 2rem;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--vp-c-brand-soft), rgba(139, 92, 246, 0.08));
  border: 1px solid var(--vp-c-brand-soft);
}

.action-footer h3 {
  margin: 0 0 0.4rem;
  font-size: 1.15rem;
  font-weight: 700;
}

.action-footer p {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.action-btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}

.action-btns a {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.action-btns .btn-primary {
  background: linear-gradient(135deg, var(--vp-c-brand-1), #8b5cf6);
  color: #fff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
  position: relative;
  overflow: hidden;
}

.action-btns .btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.action-btns .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
}

.action-btns .btn-secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1.5px solid var(--vp-c-divider);
}

.action-btns .btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* ============================================
   响应式
   ============================================ */
@media (max-width: 768px) {
  .hero-layout {
    flex-direction: column-reverse;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem 0;
  }

  .hero-name {
    font-size: 2.2rem;
  }

  .hero-tags {
    justify-content: center;
  }

  .hero-contact {
    justify-content: center;
  }

  .hero-avatar {
    width: 110px;
    height: 110px;
  }

  .dual-column {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .achieve-grid {
    grid-template-columns: 1fr;
  }

  .skill-grid {
    grid-template-columns: 1fr;
  }
}


/* ============================================
   项目卡片链接
   ============================================ */
.project-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-card-link:hover .project-card {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.12);
  border-color: var(--vp-c-brand-soft);
}

/* ============================================
   成就卡片光泽扫过
   ============================================ */
.achieve-card {
  position: relative;
  overflow: hidden;
}

.achieve-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.06), transparent);
  transition: left 0.5s ease;
  pointer-events: none;
}

.achieve-card:hover::after {
  left: 120%;
}

/* ============================================
   手机号脱敏
   ============================================ */
.phone-reveal {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  border-radius: 4px;
  padding: 0.1rem 0.3rem;
}

.phone-reveal:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}


/* ============================================
   技能标签浮动动画
   ============================================ */
.skill-group p {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.skill-tag {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: tagFloat 3s ease-in-out infinite;
}

.skill-tag:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-3px) scale(1.05);
}

@keyframes tagFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
</style>

<div class="resume-page">

<!-- ═══════════════ Hero: 左右布局 ═══════════════ -->
<div class="hero-layout">
  <div class="hero-left">
    <h1 class="hero-name">陈灿域</h1>
    <div class="hero-subtitle" id="hero-typewriter"></div>
    <div class="hero-tags">
      <span class="hero-tag">🤖 LLM / Agent</span>
      <span class="hero-tag">🖥️ 全栈开发</span>
      <span class="hero-tag">📄 学术成果</span>
      <span class="hero-tag">🎓 GPA 4.01/5.0</span>
    </div>
    <div class="hero-contact">
      <a href="https://github.com/chenxiyou-1314" target="_blank">🐙 GitHub</a>
      <a href="mailto:chencanyu@xxx.com">✉️ 邮箱</a>
      <span class="phone-reveal" onclick="this.innerHTML='📱 138-2957-2603'; this.style.cursor='default'" style="cursor:pointer">📱 点击查看电话</span>
      <span>📍 广东广州</span>
    </div>
  </div>
  <div class="hero-right">
    <div class="avatar-wrapper">
      <div class="avatar-ring"></div>
      <img src="/avatar.jpg" alt="avatar" class="hero-avatar" />
    </div>
  </div>
</div>

<!-- ═══════════════ 教育 + 实习 并排 ═══════════════ -->
<div class="dual-column">
  <div>
    <div class="section-title"><span class="icon">🎓</span>教育经历</div>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <h3>广东工业大学</h3>
          <span class="time">2024.09 - 至今</span>
        </div>
        <div class="timeline-sub">计算机技术 · 硕士</div>
        <div class="timeline-body">
          <ul>
            <li>GPA <strong>4.01/5.0</strong> 专业前3%，学业一等奖学金</li>
            <li>研究方向：大模型应用、多模态技术、深度学习落地</li>
            <li>学术成果：ICME（CCF B）二作论文1篇，ICMR（CCF B）三作论文1篇，国家发明专利2项，全国研究生数学建模竞赛三等奖×2</li>
          </ul>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <h3>广东技术师范大学</h3>
          <span class="time">2020.09 - 2024.06</span>
        </div>
        <div class="timeline-sub">软件工程 · 本科</div>
        <div class="timeline-body">
          <ul>
            <li>GPA <strong>3.96/5.0</strong> 专业前3%，两年校级三好学生及校级奖学金</li>
            <li>主修课程：计算机系统结构、云计算与大数据技术、软件工程、高级数据库</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="section-title"><span class="icon">💼</span>实习经历</div>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <h3>广州格物知新</h3>
          <span class="time">2026.01 - 至今</span>
        </div>
        <div class="timeline-sub">AI应用开发工程师 · 生成小组</div>
        <div class="timeline-body">
          <ul>
            <li>基于 <strong>LangGraph</strong> 研发多模态内容生成 Agent，意图路由准确率 <strong>95%+</strong></li>
            <li>打通 LLM、TTS、ASR、图像/视频生成全链路</li>
            <li>重构视频生成流水线，FFmpeg 加速 + 并行合成提升吞吐量</li>
            <li>核心接口 Docker 化部署，SSE + Redis 高可用架构</li>
            <li>主导撰写 <strong>2项发明专利</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ 项目经历 - 双列 ═══════════════ -->
<div class="section-title"><span class="icon">🚀</span>项目经历</div>
<div class="project-grid">
  <a href="/projects#research-copilot" class="project-card-link"><div class="project-card">
    <h3>科研文献智能检索与综述生成系统</h3>
    <div class="tags">
      <span class="tag">LangGraph</span>
      <span class="tag">FastAPI</span>
      <span class="tag">Vue3</span>
      <span class="tag">FAISS</span>
      <span class="tag">Spring Boot</span>
    </div>
    <p>
      独立设计 11-Agent 有向图，覆盖意图识别→任务规划→多源检索→PDF解析→综述生成→质量评审→Gap分析→方法解构→趋势预测全链路。
      Critic 自回归质量闭环，Novelty Agent 四维 Gap 分析，Decomposition Agent 原子组件解构重组。
      Spring Boot + FastAPI 微服务，Docker Compose 一键部署。
    </p>
  </div></a>
  <a href="/projects#ship30" class="project-card-link"><div class="project-card">
    <h3>Ship30: 细粒度船舶分布外检测基准</h3>
    <div class="tags">
      <span class="tag">OOD检测</span>
      <span class="tag">ViT</span>
      <span class="tag">多模态</span>
      <span class="tag">广东省海洋项目</span>
    </div>
    <p>
      构建30类船舶细粒度 OOD 检测基准数据集，提出 OSFT-TTA 测试时自适应方法。
      自研 LLM 驱动伪 OOD 标签生成，多阶段去重扩展语义覆盖。
      基于 ViT-B 实现 <strong>2ms/张</strong> 毫秒级推理。
      <strong>ICME 2026 二作</strong>，2项国家发明专利，COCO +21.9 mAP / LISA mIoU +10.7。
    </p>
  </div></a>
</div>

<!-- ═══════════════ 科研成果 - 横向卡片 ═══════════════ -->
<div class="section-title"><span class="icon">📄</span>科研成果</div>
<div class="achieve-grid">
  <div class="achieve-card">
    <span class="achieve-icon">📑</span>
    <div class="achieve-content">
      <strong>ICME 2026（CCF B）</strong> — TRIDENT: TEXT-GUIDED REFINEMENT FOR ID AND OOD ENTITIES · 导师一作本人二作
    </div>
  </div>
  <div class="achieve-card">
    <span class="achieve-icon">📑</span>
    <div class="achieve-content">
      <strong>ICMR（CCF B）</strong> — Chameleon: On the scene diversity and domain variety of AI-generated videos detection · 第三作者
    </div>
  </div>
  <div class="achieve-card">
    <span class="achieve-icon">🔖</span>
    <div class="achieve-content">
      <strong>国家发明专利</strong> — 基于X射线蒸馏和对象完整框架的多源海洋智能侦察方法 · 202510950121.0
    </div>
  </div>
  <div class="achieve-card">
    <span class="achieve-icon">🔖</span>
    <div class="achieve-content">
      <strong>国家发明专利</strong> — 一种海上智能侦察仪多尺度小波变换的动态序列推荐机制 · 202511279926.3
    </div>
  </div>
</div>

<!-- ═══════════════ 技术技能 ═══════════════ -->
<div class="section-title"><span class="icon">🛠️</span>技术技能</div>
<div class="skill-grid">
  <div class="skill-group">
    <h4>编程语言</h4>
    <p><span class="skill-tag" style="animation-delay:0.00s">Python</span><span class="skill-tag" style="animation-delay:0.15s">Java</span><span class="skill-tag" style="animation-delay:0.30s">Shell 脚本</span></p>
  </div>
  <div class="skill-group">
    <h4>大模型 & 框架</h4>
    <p><span class="skill-tag" style="animation-delay:0.00s">LangGraph</span><span class="skill-tag" style="animation-delay:0.15s">LangChain</span><span class="skill-tag" style="animation-delay:0.30s">Transformers</span><span class="skill-tag" style="animation-delay:0.45s">BERT</span><span class="skill-tag" style="animation-delay:0.60s">GPT</span><span class="skill-tag" style="animation-delay:0.75s">GLM</span><span class="skill-tag" style="animation-delay:0.90s">Qwen</span></p>
  </div>
  <div class="skill-group">
    <h4>训练 / 推理</h4>
    <p><span class="skill-tag" style="animation-delay:0.00s">Llama-Factory</span><span class="skill-tag" style="animation-delay:0.15s">Ollama</span><span class="skill-tag" style="animation-delay:0.30s">DeepSpeed</span><span class="skill-tag" style="animation-delay:0.45s">vLLM</span><span class="skill-tag" style="animation-delay:0.60s">LoRA</span><span class="skill-tag" style="animation-delay:0.75s">SFT</span><span class="skill-tag" style="animation-delay:0.90s">PPO</span><span class="skill-tag" style="animation-delay:1.05s">DPO</span><span class="skill-tag" style="animation-delay:1.20s">GRPO</span></p>
  </div>
  <div class="skill-group">
    <h4>后端 & 中间件</h4>
    <p><span class="skill-tag" style="animation-delay:0.00s">Spring Boot</span><span class="skill-tag" style="animation-delay:0.15s">FastAPI</span><span class="skill-tag" style="animation-delay:0.30s">RabbitMQ</span><span class="skill-tag" style="animation-delay:0.45s">Redis</span><span class="skill-tag" style="animation-delay:0.60s">MySQL</span><span class="skill-tag" style="animation-delay:0.75s">Docker</span></p>
  </div>
  <div class="skill-group">
    <h4>前端</h4>
    <p><span class="skill-tag" style="animation-delay:0.00s">Vue3</span><span class="skill-tag" style="animation-delay:0.15s">TypeScript</span><span class="skill-tag" style="animation-delay:0.30s">Element Plus</span><span class="skill-tag" style="animation-delay:0.45s">ECharts</span></p>
  </div>
  <div class="skill-group">
    <h4>证书 & 其他</h4>
    <p><span class="skill-tag" style="animation-delay:0.00s">中级软件设计师</span><span class="skill-tag" style="animation-delay:0.15s">CET-6</span><span class="skill-tag" style="animation-delay:0.30s">RAG</span><span class="skill-tag" style="animation-delay:0.45s">多智能体</span><span class="skill-tag" style="animation-delay:0.60s">提示工程</span></p>
  </div>
</div>

<!-- ═══════════════ 底部CTA ═══════════════ -->
<div class="action-footer">
  <h3>想了解更多？</h3>
  <p>查看详细项目介绍与技术博客文章</p>
  <p style="font-size:0.72rem;color:var(--vp-c-text-3);margin-top:0.3rem;opacity:0.6">💡 试试在页面输入 ↑↑↓↓←→←→BA</p>
  <div class="action-btns">
    <a href="/projects" class="btn-primary">📂 查看项目详情</a>
    <a href="/blog/" class="btn-secondary">📝 阅读技术博客</a>
  </div>
</div>

</div>
