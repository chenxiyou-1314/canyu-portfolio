# Spring Boot + Python AI 微服务实践

> 将纯 Python LangGraph 项目改造为 Spring Boot + Python AI Service 微服务架构的实践记录

## 改造动机

Research Copilot 原本是纯 Python 实现，功能完整但存在几个问题：
1. 没有用户管理，无法多用户使用
2. 没有任务持久化，重启即丢失
3. 没有前端界面，只能命令行交互
4. 面试全栈岗位，需要展示 Java + 前端能力

改造目标：**Java 做平台，Python 做大脑**。

## 架构设计

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Vue3 前端  │────▶│  Spring Boot 主服务 │────▶│  Python AI 服务   │
│  Element Plus│     │  MyBatis-Plus     │     │  FastAPI+LangGraph│
│  ECharts     │     │  Redis + RabbitMQ │     │  FAISS + OpenAI  │
└─────────────┘     └──────────────────┘     └─────────────────┘
                           │                        │
                    ┌──────┴──────┐          ┌──────┴──────┐
                    │   MySQL     │          │   Qdrant    │
                    │   Redis     │          │  向量数据库   │
                    └─────────────┘          └─────────────┘
```

### 为什么这样拆

| 问题 | 答案 |
|------|------|
| 为什么不全用 Python？ | LangGraph 只有 Python 版，但 Spring Boot 做业务更成熟 |
| 为什么不全用 Java 调 AI？ | LangGraph 无法用 Java 调用，Python AI 生态远优于 Java |
| 为什么用 RabbitMQ 不用 HTTP？ | AI 推理耗时长（分钟级），HTTP 同步调用会超时，MQ 异步更可靠 |
| 为什么不把 AI 塞进 Java？ | 技术栈解耦，Python AI 可独立迭代部署，不牵连主服务 |

## 关键实现

### 1. RabbitMQ 异步任务

**问题**：综述生成需要 1-3 分钟，前端不能干等。

**方案**：

```java
// Java 端：发送任务
rabbitTemplate.convertAndSend("ai.task.queue", taskMessage);

// Java 端：接收结果
@RabbitListener(queues = "ai.result.queue")
public void handleResult(AIResultMessage result) {
    taskService.updateResult(result.getTaskId(), result.getContent());
}
```

```python
# Python 端：消费任务
@channel.queue(queue="ai.task.queue")
async def handle_task(message):
    result = await graph.arun(message.query)
    # 结果推回 Java
    await channel.publish("ai.result.queue", result)
```

### 2. Redis 缓存策略

- **论文检索结果缓存**：同一 query 30 分钟内不重复检索
- **用户会话缓存**：LangGraph State 序列化存 Redis，支持断点续跑
- **向量化去重**：Redis Set 记录已索引 paper_id，避免重复 embedding

### 3. Docker Compose 7 服务编排

```yaml
services:
  copilot-server:   # Spring Boot 主服务
  ai-service:       # Python AI Service
  copilot-web:      # Vue3 前端
  mysql:            # 结构化数据
  redis:            # 缓存 + 会话
  rabbitmq:         # 异步消息
  qdrant:           # 向量检索
```

## 踩坑记录

1. **RabbitMQ 消息序列化**：Java 默认用 JDK 序列化，Python 读不了。改为 JSON 序列化，两边统一
2. **FAISS 索引跨容器**：Python 服务容器内生成的 FAISS 索引需要挂载共享卷，否则重启丢失
3. **LangGraph State 太大**：ResearchState 有十几个字段，Redis 缓存要控制 TTL，避免内存溢出

## 开发时间规划

| 阶段 | 内容 | 时间 |
|------|------|------|
| Phase 1 | Spring Boot 骨架 + Docker Compose | 2天 |
| Phase 2 | RabbitMQ 异步通信 + Redis 缓存 | 2天 |
| Phase 3 | Vue3 前端 | 2天 |
| Phase 4 | 对接联调 + 部署 | 2天 |
| Phase 5 | 完善 + 测试 | 1天 |

---

*本文基于 Research Copilot 项目改造实践，方案文件：`research-copilot/web-platform/改造方案-SpringBoot微服务.md`*
