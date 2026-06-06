# LangGraph 多Agent架构源码解析

> 基于 Research Copilot 项目，解析 11-Agent 有向图的完整设计与实现

## 架构总览

Research Copilot 采用 LangGraph StateGraph 构建 11 个 Agent 节点的有向图，核心设计理念：**每个 Agent 只做一件事，通过 State 传递数据，条件路由控制流向**。

```
用户输入 → Intent识别 → 路由分支
  ├─ search/summarize/refine → Coordinator → Search → Analysis → Writing → Critic → Novelty → Decomposition → Trend → Profile → Memory
  └─ qa → Analysis → Writing → Memory（短链路）
```

## State 设计：ResearchState TypedDict

所有 Agent 共享一个 `ResearchState`（TypedDict），关键字段：

| 字段 | 类型 | 作用 |
|------|------|------|
| `query` | str | 用户原始输入 |
| `intent` | str | 意图：search/qa/summarize/refine |
| `search_queries` | list[str] | Coordinator 规划的检索关键词 |
| `filtered_papers` | list[dict] | Search Agent 筛选后的论文 |
| `rag_context` | str | Analysis Agent RAG 检索的上下文 |
| `summary` | str | Writing Agent 生成的综述 |
| `critic_passed` | bool | Critic 是否通过 |
| `critic_feedback` | str | Critic 反馈（不通过时） |
| `gaps` | dict | Novelty Agent 四维 Gap |
| `decomposition` | dict | Decomposition 原子组件 |

**设计要点**：TypedDict 而非 Pydantic，因为 LangGraph 需要增量更新 State，每个节点只返回需要更新的字段，框架自动 merge。

## 条件路由：意图分流

```python
def route_by_intent(state: ResearchState) -> str:
    intent = state.get("intent", "search")
    if intent in ("search", "summarize", "refine"):
        return "coordinator"    # 完整链路
    elif intent == "qa":
        return "analysis"       # QA 短链路
```

意图识别由 LLM 完成，Prompt 要求从 search/qa/summarize/refine 四个中选一个。识别失败默认走 search。

## Critic 闭环：质量保证

Critic Agent 对综述做三维评分（完整性/准确性/结构），每项 1-5 分，**阈值 3.5**：

```python
def route_by_critic(state: ResearchState) -> str:
    if state.get("critic_passed", True):
        return "novelty"           # 通过 → 研究发现
    rerun_count = state.get("rerun_count", 0)
    if rerun_count >= MAX_RERUN:
        return "novelty"           # 超过最大重试 → 强制通过
    return "coordinator"           # 未通过 → 回到 Coordinator 重新规划
```

**关键设计**：
- 不是回到 Writing 重写，而是回到 **Coordinator** 重新规划，因为 Critic 不通过可能不是写的问题，而是检索的论文不够
- 有最大重试次数保护，防止死循环
- Critic feedback 会传入 Writing 的 revise 模式

## 两条链路的区别

| | Full 链路 | QA 链路 |
|---|---|---|
| 路径 | intent → coordinator → search → analysis → writing → critic → novelty → decomposition → trend → profile → memory | intent → analysis → writing → memory |
| 节点数 | 11 | 3 |
| 响应时间 | 较长（需要检索+生成） | 较短（假设数据已有） |
| 输出 | 综述 + Gap分析 + 趋势 + 画像 | QA 回答 |

## 实际开发中的坑

1. **search 和 summarize 代码流程完全一样**：intent 区分只为未来扩展预留，当前都走完整链路
2. **decomposition_node 不会跳过**：gaps 默认空字典但不阻断流程
3. **QA 模式下 profile 被跳过**：因为无总结也无论文，没有构建画像的数据基础

---

*本文基于 Research Copilot 项目源码分析，项目地址：[GitHub](https://github.com/chenxiyou-1314/Research-Copilot)*
