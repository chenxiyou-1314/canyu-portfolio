# vLLM 推理加速：从2.3s到0.8s

> 在格物知新实习期间，将 LLM 推理延迟从 2.3s 优化至 0.8s，吞吐从 8 QPS 提升至 25 QPS

## 问题背景

线上服务使用 LLM 做意图识别和对话生成，原始方案用 HuggingFace Transformers 直接加载模型推理：
- 单次推理延迟 **2.3s**
- 并发吞吐 **8 QPS**
- GPU 显存利用率低，KV Cache 碎片化严重

## 三层优化策略

### 第一层：PagedAttention + Continuous Batching

**核心问题**：传统推理为每个请求预分配固定大小的 KV Cache，导致显存碎片化和浪费。

**PagedAttention**：借鉴操作系统虚拟内存分页思想，将 KV Cache 划分为固定大小的 block，按需分配，不再预分配连续内存。

**Continuous Batching**：传统 static batching 等所有请求完成才释放资源，短请求被长请求拖慢。Continuous Batching 在请求完成后立即替换为新请求，GPU 利用率从 ~40% 提升到 ~90%。

**效果**：延迟降至 **1.4s**，吞吐提升至 **15 QPS**。

### 第二层：INT8 AWQ 量化

**为什么选 AWQ 而不是 GPTQ**：
- AWQ 基于激活感知权重量化，保护重要权重通道，精度损失更小
- 支持任意模型，不需要校准数据集长时间训练
- vLLM 原生支持，一行配置即可

**实现**：
```python
# vLLM 加载 AWQ 量化模型
from vllm import LLM
model = LLM(
    model="model_path",
    quantization="awq",
    dtype="half",
    gpu_memory_utilization=0.9,
)
```

**效果**：模型体积减半，显存占用降低 50%，延迟降至 **1.0s**，吞吐 **20 QPS**。

### 第三层：部署层优化

1. **gpu_memory_utilization 调至 0.9**：让 vLLM 使用更多显存做 KV Cache，减少 swap
2. **max_model_len 合理设置**：根据实际输入长度限制最大序列长度，避免为超长序列预留资源
3. **预热模型**：服务启动时发送几个 dummy 请求，避免首次推理冷启动

**效果**：延迟降至 **0.8s**，吞吐 **25 QPS**。

## 最终效果

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 推理延迟 | 2.3s | 0.8s | **-65%** |
| 吞吐量 | 8 QPS | 25 QPS | **+212%** |
| 显存利用率 | ~40% | ~90% | **+125%** |
| 模型体积 | FP16 | INT8 AWQ | **-50%** |

## 经验总结

1. **先 profiling 再优化**：用 NVIDIA Nsight 看 GPU 利用率和显存瓶颈，不要猜
2. **PagedAttention 是基础**：不做这步，后面量化省下的显存也会被碎片浪费
3. **量化选型看场景**：AWQ 适合通用场景，GPTQ 适合对特定模型极致压缩
4. **部署参数要实测**：gpu_memory_utilization 和 max_model_len 没有银弹，根据实际负载调

---

*本文基于格物知新实习项目实践经验总结*
