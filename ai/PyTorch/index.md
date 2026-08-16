---
title: PyTorch 概览
date: 2025-09-02
categories: [ai, Pytorch]
tags: [AI, PyTorch]
---

# 🔥 PyTorch 概览

PyTorch 是目前最流行的深度学习框架之一，以 **动态计算图** 和 **Python 原生体验** 著称，研究界与工业界都广泛使用。

---

## 📚 目录导航

- [🔢 一、张量基础](./1.张量基础.md) —— 创建、运算、广播、设备
- [🧮 二、自动求导](./2.自动求导.md) —— autograd 与训练核心
- [🧠 三、神经网络入门](./3.神经网络入门.md) —— nn.Module 与完整训练流程
- [⚖️ 四、与 TensorFlow 对比](./4.与TensorFlow对比.md) —— 选型参考
- [🗺️ 五、学习路线](./5.学习路线.md) —— 从入门到实战

---

## 🎯 为什么选 PyTorch？

| 特性 | 说明 |
| --- | --- |
| 动态计算图 | 边运行边构建，调试友好 |
| Python 原生 | 语法像 NumPy，上手快 |
| 自动求导 | `autograd` 自动计算梯度 |
| 生态丰富 | HuggingFace、torchvision 等全栈覆盖 |
| 研究主流 | 论文复现首选 |

> 💡 本博客 [深度学习](../DeepLearning/index.md) 笔记全部基于 PyTorch 实现。

---

## 📦 安装

```bash
# CPU 版
pip install torch torchvision

# GPU 版（按官网选择 CUDA 版本）
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

验证：

```python
import torch
print(torch.__version__)          # 2.x
print(torch.cuda.is_available())  # GPU 是否可用
```

---

## 💡 一句话认识三件套

| 组件 | 作用 | 详见 |
| --- | --- | --- |
| **Tensor（张量）** | 数据容器，类似 NumPy + GPU | [张量基础](./1.张量基础.md) |
| **autograd** | 自动求导，反向传播的核心 | [自动求导](./2.自动求导.md) |
| **nn.Module** | 神经网络组件与训练流程 | [神经网络入门](./3.神经网络入门.md) |

**训练四步套路**（贯穿所有深度学习）：

```python
for epoch in range(epochs):
    optimizer.zero_grad()          # 1. 清空梯度
    pred = model(x)                # 2. 前向计算
    loss = loss_fn(pred, y)        #   计算损失
    loss.backward()                # 3. 反向传播
    optimizer.step()               # 4. 更新参数
```

---

## 🗺️ 建议阅读顺序

1. [张量基础](./1.张量基础.md) → 学会操作数据
2. [自动求导](./2.自动求导.md) → 理解训练原理
3. [神经网络入门](./3.神经网络入门.md) → 搭建第一个模型
4. 需要选型时看 [与 TensorFlow 对比](./4.与TensorFlow对比.md)
5. 最后按 [学习路线](./5.学习路线.md) 深入

---
