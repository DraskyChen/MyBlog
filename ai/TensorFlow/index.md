---
title: TensorFlow
date: 2025-09-02
categories: [ai, TensorFlow]
tags: [AI, TensorFlow]
---

# ⚙️ TensorFlow

TensorFlow 是 Google 开源的深度学习框架，工业界部署生态成熟，与 Keras 结合后易用性大幅提升。

---

## 📚 目录导航

- [🚀 一、快速上手](./1.快速上手.md) —— 安装、tf.keras 建模、训练
- [🔧 二、核心概念](./2.核心概念.md) —— 张量、Eager 模式、数据管道
- [⚖️ 三、与 PyTorch 对比](./3.与PyTorch对比.md) —— 选型参考
- [🗺️ 四、学习路线](./4.学习路线.md) —— 从入门到部署

---

## 🧠 TensorFlow 简介

- **动态/静态图**：TF 2.x 默认 Eager 模式（动态图），类似 PyTorch
- **生产部署**：TF Serving、TFLite（移动端）、TF.js（浏览器）生态完整
- **与 Keras**：`tf.keras` 提供高层 API，快速搭建模型

```python
import tensorflow as tf

# 线性模型
model = tf.keras.Sequential([
    tf.keras.layers.Dense(1)
])

model.compile(optimizer='sgd', loss='mse')

# 训练
x = tf.constant([[1.0], [2.0], [3.0]])
y = tf.constant([[2.0], [4.0], [6.0]])
model.fit(x, y, epochs=100)
```

---

## 💡 一句话认识

| 能力 | 说明 | 详见 |
| --- | --- | --- |
| **tf.keras** | 高层建模 API，快速搭网络 | [快速上手](./1.快速上手.md) |
| **Eager 模式** | 动态图，调试直观 | [核心概念](./2.核心概念.md) |
| **tf.data** | 高性能数据管道 | [核心概念](./2.核心概念.md) |
| **部署生态** | TF Serving / TFLite / TF.js | [学习路线](./4.学习路线.md) |

---

## 🗺️ 建议阅读顺序

1. [快速上手](./1.快速上手.md) → 跑通第一个模型
2. [核心概念](./2.核心概念.md) → 理解张量与数据管道
3. 需要选型时看 [与 PyTorch 对比](./3.与PyTorch对比.md)
4. 按 [学习路线](./4.学习路线.md) 深入工程化

---
