---
layout: page
sidebar: false
aside: false
---

<style scoped>
.resume-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem 4rem;
}

/* 顶部名片 */
.hero-card {
  text-align: center;
  padding: 3rem 2rem 2rem;
  margin: -2rem -1.5rem 3rem;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.12), transparent),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139, 92, 246, 0.08), transparent);
  position: relative;
  overflow: hidden;
}
.hero-card::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  top: -150px;
  right: -150px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
  pointer-events: none;
}
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-20px, 15px) scale(1.05); }
  66% { transform: translate(15px, -10px) scale(0.95); }
}
.hero-avatar {
  width: 110px;
  height: 110px;
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
.hero-name {
  font-size: 2.5rem;
  font-weight: 800;
  margin-top: 1rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}
.hero-title {
  font-size: 1.15rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
}
.hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  position: relative;
  z-index: 1;
}
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(99, 102, 241, 0.15);
}
.hero-contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.25rem;
  position: relative;
  z-index: 1;
}
.hero-contact a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.hero-contact a:hover {
  color: var(--vp-c-brand-1);
}

/* 区块标题 */
.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 3rem 0 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}
.section-title .icon {
  font-size: 1.5rem;
}

/* 时间线 */
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
  padding-bottom: 1.75rem;
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
}
.timeline-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
}
.timeline-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.timeline-header .time {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
  background: var(--vp-c-bg-soft);
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
}
.timeline-sub {
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin: 0.25rem 0 0.5rem;
}
.timeline-body {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.8;
}
.timeline-body ul {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
}
.timeline-body li {
  margin: 0.35rem 0;
}
.timeline-body li::marker {
  color: var(--vp-c-brand-1);
}

/* 项目卡片 */
.project-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
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
  background: linear-gradient(90deg, var(--vp-c-brand-1), #8b5cf6);
}
.project-card h3 {
  margin: 0 0 0.25rem;
  font-size: 1.15rem;
  font-weight: 700;
}
.project-card .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}
.project-card .tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  font-weight: 500;
}
.project-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

/* 技能 */
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
.skill-group {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg);
}
.skill-group h4 {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.skill-group p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

/* 成果列表 */
.achieve-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.achieve-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}
.achieve-item:hover {
  border-color: var(--vp-c-brand-soft);
}
.achieve-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.achieve-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.achieve-content strong {
  color: var(--vp-c-text-1);
}

/* 页脚行动 */
.action-footer {
  text-align: center;
  margin-top: 4rem;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--vp-c-brand-soft), rgba(139, 92, 246, 0.08));
  border: 1px solid var(--vp-c-brand-soft);
}
.action-footer h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
}
.action-footer p {
  margin: 0 0 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.action-btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}
.action-btns a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}
.action-btns .btn-primary {
  background: linear-gradient(135deg, var(--vp-c-brand-1), #8b5cf6);
  color: #fff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
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

@media (max-width: 640px) {
  .hero-name { font-size: 1.8rem; }
  .hero-card { padding: 2rem 1rem 1.5rem; margin: -1rem -1rem 2rem; }
  .timeline { padding-left: 1.25rem; }
  .timeline-dot { left: -1.25rem; width: 12px; height: 12px; }
  .skill-grid { grid-template-columns: 1fr; }
}
</style>

<div class="resume-page">

<!-- 顶部名片 -->
<div class="hero-card">
  <div class="avatar-wrapper"><div class="avatar-ring"></div><img src="/avatar.jpg" alt="avatar" class="hero-avatar" /></div>
  <div class="hero-name">陈灿域</div>
  <div class="hero-title">AI算法 & 全栈开发 · 硕士研究生</div>
  <div class="hero-tags">
    <span class="hero-tag">🤖 LLM / Agent</span>
    <span class="hero-tag">🖥️ 全栈开发</span>
    <span class="hero-tag">📄 学术成果</span>
    <span class="hero-tag">🎓 GPA 4.01/5.0</span>
  </div>
  <div class="hero-contact">
    <a href="https://github.com/chenxiyou-1314" target="_blank">🐙 GitHub</a>
    <a href="mailto:chencanyu@xxx.com">✉️ 邮箱</a>
    <a href="tel:13829572603">📱 电话</a>
    <span>📍 广东广州</span>
  </div>
</div>

<!-- 教育经历 -->
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

<!-- 实习经历 -->
<div class="section-title"><span class="icon">💼</span>实习经历</div>
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-header">
      <h3>广州格物知新人工智能科技有限公司</h3>
      <span class="time">2026.01 - 至今</span>
    </div>
    <div class="timeline-sub">AI应用开发工程师 · 生成小组</div>
    <div class="timeline-body">
      <ul>
        <li>基于 <strong>LangGraph</strong> 研发多模态内容生成 Agent，搭建意图路由、对话记忆能力，实现 PPT/视频/播客自动化生成</li>
        <li>意图理解与动态路由模块准确率 <strong>95%+</strong></li>
        <li>深度参与 OpenMAIC、GeekAI 系统部署与重构，打通 LLM、TTS、ASR、图像/视频生成全链路</li>
        <li>重构视频生成流水线，FFmpeg 加速 + 并行合成提升吞吐量</li>
        <li>核心接口 Docker 化部署，SSE + Redis 高可用架构</li>
        <li>主导撰写 <strong>2项发明专利</strong></li>
      </ul>
    </div>
  </div>
</div>

<!-- 项目经历 -->
<div class="section-title"><span class="icon">🚀</span>项目经历</div>

<div class="project-card">
  <h3>基于 LangGraph 的科研文献智能检索与综述生成系统</h3>
  <div class="tags">
    <span class="tag">LangGraph</span>
    <span class="tag">FastAPI</span>
    <span class="tag">Vue3</span>
    <span class="tag">FAISS</span>
    <span class="tag">Docker</span>
  </div>
  <p>
    独立设计并开发面向科研场景的多 Agent 协作系统，覆盖从文献检索、综述生成、研究思路发现到趋势预测的完整认知链路。
    基于 LangGraph 设计 <strong>11-Agent 有向图</strong>，按单一职责拆分意图识别→任务规划→多源检索→PDF解析→综述生成→质量评审→Gap分析→方法解构→趋势预测→知识图谱→记忆持久化，Critic 自回归质量闭环。
    Novelty Agent 实现四维 Gap 分析，Decomposition Agent 实现方法原子组件解构重组。全栈工程化：FastAPI + SSE 流式输出，Vue3 六标签页 Web UI，Docker Compose 一键部署。
  </p>
</div>

<div class="project-card">
  <h3>Ship30: 细粒度船舶分布外检测基准</h3>
  <div class="tags">
    <span class="tag">OOD检测</span>
    <span class="tag">ViT</span>
    <span class="tag">多模态</span>
    <span class="tag">广东省海洋项目</span>
  </div>
  <p>
    面向类增量学习的细粒度船舶分布外检测，构建30类船舶细粒度OOD检测基准数据集，提出 OSFT-TTA 测试时自适应方法。
    自研 LLM 驱动的伪 OOD 标签生成模块，多阶段去重策略扩展语义覆盖。
    基于 ViT-B 架构实现 <strong>2ms/张</strong> 毫秒级推理。
    成果：<strong>ICME 2026 二作</strong>、2项国家发明专利、COCO +21.9 mAP / LISA mIoU +10.7。
  </p>
</div>

<!-- 科研成果 -->
<div class="section-title"><span class="icon">📄</span>科研成果</div>
<div class="achieve-list">
  <div class="achieve-item">
    <span class="achieve-icon">📑</span>
    <div class="achieve-content">
      <strong>ICME 2026（CCF B）</strong> — "TRIDENT: TEXT-GUIDED REFINEMENT FOR ID AND OOD ENTITIES" · 导师一作本人二作
    </div>
  </div>
  <div class="achieve-item">
    <span class="achieve-icon">📑</span>
    <div class="achieve-content">
      <strong>ICMR（CCF B）</strong> — "Chameleon: On the scene diversity and domain variety of AI-generated videos detection" · 第三作者
    </div>
  </div>
  <div class="achieve-item">
    <span class="achieve-icon">🔖</span>
    <div class="achieve-content">
      <strong>国家发明专利</strong> — 基于X射线蒸馏和对象完整框架的多源海洋智能侦察方法 · 申请号：202510950121.0
    </div>
  </div>
  <div class="achieve-item">
    <span class="achieve-icon">🔖</span>
    <div class="achieve-content">
      <strong>国家发明专利</strong> — 一种海上智能侦察仪多尺度小波变换的动态序列推荐机制 · 申请号：202511279926.3
    </div>
  </div>
</div>

<!-- 技术技能 -->
<div class="section-title"><span class="icon">🛠️</span>技术技能</div>
<div class="skill-grid">
  <div class="skill-group">
    <h4>编程语言</h4>
    <p>Python、Java、Shell 脚本</p>
  </div>
  <div class="skill-group">
    <h4>大模型 & 框架</h4>
    <p>LangGraph、LangChain、Transformers、BERT、GPT、GLM、LLaMA、Qwen</p>
  </div>
  <div class="skill-group">
    <h4>训练 / 推理</h4>
    <p>Llama-Factory、Ollama、DeepSpeed、vLLM、LoRA、SFT、PPO、DPO、GRPO</p>
  </div>
  <div class="skill-group">
    <h4>后端 & 中间件</h4>
    <p>Spring Boot、FastAPI、RabbitMQ、Redis、MySQL、Docker</p>
  </div>
  <div class="skill-group">
    <h4>前端</h4>
    <p>Vue3、TypeScript、Element Plus、ECharts</p>
  </div>
  <div class="skill-group">
    <h4>证书 & 其他</h4>
    <p>中级软件设计师、CET-6、RAG、多智能体、提示工程</p>
  </div>
</div>

<!-- 底部行动 -->
<div class="action-footer">
  <h3>想了解更多？</h3>
  <p>查看详细项目介绍与技术博客文章</p>
  <div class="action-btns">
    <a href="/projects" class="btn-primary">📂 查看项目详情</a>
    <a href="/blog/" class="btn-secondary">📝 阅读技术博客</a>
  </div>
</div>

</div>
