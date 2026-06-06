# 项目

## 基于 Spring Boot + LangGraph 的科研文献智能分析与综述生成平台

**全栈微服务架构 · AI + Java + Vue3**

### 项目概述

面向科研工作者的文献智能检索与综述生成系统，采用 Spring Boot 主服务 + Python AI Service 微服务架构，Java 负责业务编排与数据持久化，Python 负责 LangGraph 多Agent协同推理，实现从论文检索、综述生成到研究发现的全链路自动化。

### 技术架构

| 层级 | 技术栈 | 职责 |
|------|--------|------|
| 前端 | Vue3 + TypeScript + Element Plus + ECharts | 任务管理、综述展示、趋势可视化 |
| Java 主服务 | Spring Boot 3 + MyBatis-Plus + Redis + RabbitMQ | 用户管理、任务编排、数据持久化、消息驱动 |
| AI Service | FastAPI + LangGraph + FAISS + OpenAI | 11-Agent协同推理、RAG检索、综述生成 |
| 数据层 | MySQL + Redis + Qdrant | 结构化存储 + 缓存 + 向量检索 |

### 核心工作

1. **设计 11-Agent 有向图架构**：基于 LangGraph StateGraph 实现 Search→Analysis→Writing→Critic 闭环，Critic 三维评分阈值3.5不通过自动重写，意图识别分流 Full/QA 双链路
2. **构建 Spring Boot 微服务主服务**：MyBatis-Plus 持久化 + Redis 缓存 + RabbitMQ 异步任务，Java 编排业务 Python 执行 AI，消息队列解耦实现异步综述生成
3. **实现 RAG 检索增强生成链路**：PDF 解析 → RecursiveCharacterTextSplitter 切chunk → OpenAI Embedding → FAISS 向量化，similarity_search top-20 召回补充上下文
4. **开发 Vue3 前端平台**：Element Plus 任务管理面板 + ECharts 趋势可视化 + Markdown 渲染综述结果，Axios 对接 Spring Boot RESTful API
5. **落地 Novelty Agent 四维 Gap 分析**：方法学/数据/理论/实践四维度扫描，Decomposition Agent 原子组件解构重组，自动发现跨域迁移机会
6. **优化 LLM 推理性能**：vLLM PagedAttention + Continuous Batching + INT8 AWQ 量化，推理延迟从 2.3s 降至 0.8s，吞吐 8→25 QPS

### 项目亮点

- **Critic 闭环机制**：三维评分（完整性/准确性/结构）+ 阈值3.5 + 最大重试次数，综述质量可控
- **意图分流双链路**：search/summarize 走完整11节点链路，QA 跳过 coordinator 直接 RAG 检索，响应时间缩短60%
- **跨域迁移发现**：Decomposition Agent 将方法拆解为原子组件，通过结构性共性匹配发现跨领域迁移机会

### 项目链接

- 🔗 [GitHub - Research Copilot](https://github.com/chenxiyou-1314/Research-Copilot)

---

## Ship30: 细粒度船舶分布外检测基准

**广东省海洋经济发展专项资金项目**

### 项目概述

面向类增量学习的细粒度船舶分布外检测，构建30类船舶细粒度OOD检测基准数据集，提出OSFT-TTA测试时自适应方法，实现2ms/张的实时分布外检测。

### 核心成果

- 📄 **ICME 2026 二作**：Ship30: Benchmarking Fine-grained Out-of-distribution Ship Detection
- 📜 **2项国家发明专利**（导师一作，本人二作）
- 🖥️ **原型系统完成**：30类船舶 OOD 检测，2ms/张推理速度
- 📊 **COCO +21.9 mAP / LISA mIoU +10.7**

---

## Research Copilot 前身：纯 Python LangGraph 系统

11-Agent 协同的科研文献智能检索与综述生成系统，纯 Python 实现，已完成全链路开发并推送 GitHub。后在此基础上进行 Spring Boot 微服务改造，形成上述全栈平台项目。

**核心技术**：LangGraph StateGraph · TypedDict State · 条件路由 · Critic 闭环 · FAISS RAG · S2/arXiv 多源检索
