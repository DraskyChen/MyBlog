---
title: 消息队列（MQ）指南
date: 2025-09-02
categories: [backend, MQ]
tags: [后端, MQ]
---

# 📨 消息队列（MQ）指南

消息队列（Message Queue）是分布式系统的"交通枢纽"，解决服务间的 **解耦、削峰、异步** 问题。本文介绍 MQ 的核心概念与主流产品选型。

---

## 🎯 一、消息队列解决什么问题？

| 问题 | 说明 | 类比 |
| --- | --- | --- |
| **解耦** | 生产者和消费者互不感知 | 通过"邮局"传信，双方不直接联系 |
| **削峰** | 高峰期缓存请求，平滑处理 | 水库蓄水，洪峰平稳泄放 |
| **异步** | 非关键操作后台处理，接口快速响应 | 点外卖后先确认，再做餐 |

**无 MQ 的同步调用：**

```
下单服务 ──同步──> 库存服务 ──同步──> 短信服务
              用户要等全部完成才能收到响应 ❌
```

**有 MQ 的异步解耦：**

```
下单服务 ──发消息──> [MQ] ──> 库存服务（订阅消费）
                 └──> 短信服务（订阅消费）
              用户立即收到"下单成功" ✅
```

---

## 🧩 二、核心概念

| 概念 | 说明 |
| --- | --- |
| **生产者（Producer）** | 发送消息的一方 |
| **消费者（Consumer）** | 接收并处理消息的一方 |
| **Broker** | 消息中间件服务器本身 |
| **主题（Topic）** | 消息的分类（如 `order.created`） |
| **分区（Partition）** | Topic 的分片，支持并行与顺序（Kafka 概念） |
| **消费组（Consumer Group）** | 多个消费者协作消费同一主题 |
| **ACK（确认）** | 消费者处理完向 Broker 确认 |

---

## ⚖️ 三、主流 MQ 对比

| 特性 | Kafka | RabbitMQ | RocketMQ | Pulsar |
| --- | --- | --- | --- | --- |
| 定位 | 高吞吐流处理 | 灵活路由，AMQP 标准 | 阿里出品，电商强 | 云原生，存算分离 |
| 吞吐量 | 极高（百万级/s） | 中等（万级/s） | 高 | 高 |
| 消息模型 | Topic + Partition | Exchange + Queue | Topic + Queue | Topic + Partition |
| 顺序性 | 分区内有序 | 队列内有序 | 分区有序 | 分区有序 |
| 语言 | Scala/Java | Erlang | Java | Java |
| 适用 | 日志、流计算、大数据 | 传统企业集成 | 电商、金融 | 多租户云场景 |

> 💡 选型建议：大数据日志/流处理选 Kafka；轻量灵活路由选 RabbitMQ；国内电商场景选 RocketMQ。

---

## 🚀 四、Kafka 快速上手

```bash
# 启动（需先安装，或用 Docker）
docker run -d --name kafka -p 9092:9092 apache/kafka:3.7
```

```bash
# 创建主题
kafka-topics.sh --create --topic test --partitions 3 --bootstrap-server localhost:9092

# 生产者（发送）
kafka-console-producer.sh --topic test --bootstrap-server localhost:9092
> hello world

# 消费者（接收）
kafka-console-consumer.sh --topic test --from-beginning --bootstrap-server localhost:9092
```

Java/Python 生产者消费者示例详见 [Kafka 从入门到放弃](./Kafka从入门到放弃.md)。

---

## 🧠 五、什么时候该用 MQ？

**应该用**：
- 系统间需要异步解耦（下单 → 通知/日志/统计）
- 高峰期流量远超系统处理能力（秒杀、抢购）
- 数据需要顺序处理或广播给多个下游

**不该用**（引入复杂度要谨慎）：
- 仅两个服务简单同步调用
- 对实时性要求极高且必须立即返回
- 团队没有运维 MQ 的能力

---

## 🎯 六、小结

- MQ 三大价值：解耦、削峰、异步
- 核心概念：Producer / Consumer / Broker / Topic / 消费组
- Kafka 适合高吞吐流式场景，RabbitMQ 适合灵活路由
- 引入 MQ 是增加复杂度，按需选择

---
