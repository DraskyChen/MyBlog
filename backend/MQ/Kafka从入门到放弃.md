---
title: Kafka 从入门到放弃
date: 2025-09-02
categories: [backend, MQ]
tags: [后端, MQ, Kafka]
---

# 📊 Kafka 从入门到放弃

Apache Kafka 是 **分布式流处理平台**，以超高吞吐量著称，是大数据、日志收集、流计算的标配。本文从架构到实战，带你入门 Kafka。

---

## 🏗️ 一、核心架构

```
生产者 Producer ──> [Kafka Broker] ──> 消费者 Consumer
                        │
               Topic（主题）由多个 Partition 组成
```

**关键概念：**

| 概念 | 说明 |
| --- | --- |
| **Broker** | 一台 Kafka 服务器，集群由多个 Broker 组成 |
| **Topic** | 消息的逻辑分类 |
| **Partition（分区）** | Topic 的分片，每个分区是**有序**的日志文件 |
| **Offset（偏移量）** | 分区内消息的顺序编号 |
| **Consumer Group** | 消费组，组内消费者分摊分区消费 |

**为什么分区能提高吞吐？** 一个 Topic 拆成 N 个分区，可分布在多台 Broker 上并行读写；多个消费者组内并行消费不同分区。

---

## 📦 二、安装与快速启动

**Docker 一键启动：**

```bash
docker run -d --name kafka -p 9092:9092 -e KAFKA_CFG_NODE_ID=1 \
  -e KAFKA_CFG_PROCESS_ROLES=broker,controller \
  -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
  -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  -e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
  -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 \
  -e KAFKA_CFG_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  -e KAFKA_CFG_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1 \
  -e KAFKA_CFG_TRANSACTION_STATE_LOG_MIN_ISR=1 \
  apache/kafka:3.7
```

> 💡 上面是 Kafka 3.x 的 KRaft（去 ZooKeeper）模式，单节点即可跑通。

**命令行验证：**

```bash
# 创建主题（3 分区）
docker exec kafka kafka-topics.sh --create --topic orders \
  --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092

# 生产消息
docker exec -it kafka kafka-console-producer.sh --topic orders \
  --bootstrap-server localhost:9092
> order-1
> order-2

# 消费消息（新开终端）
docker exec -it kafka kafka-console-consumer.sh --topic orders \
  --from-beginning --bootstrap-server localhost:9092
```

---

## 🐍 三、生产者 / 消费者代码

### Python（kafka-python）

```bash
pip install kafka-python
```

```python
# producer.py
from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers='localhost:9092')
producer.send('orders', b'order-1')
producer.send('orders', key=b'user-1', value=b'order-2')
producer.flush()
print('已发送')
```

```python
# consumer.py
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'orders',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',   # 从头消费
    group_id='order-service'        # 消费组
)
for msg in consumer:
    print(f'收到: {msg.value.decode()}')
```

### Java（spring-kafka 简化）

```java
// 生产者
kafkaTemplate.send("orders", "order-1");

// 消费者
@KafkaListener(topics = "orders", groupId = "order-service")
public void onOrder(String orderId) {
    System.out.println("收到订单: " + orderId);
}
```

---

## 🔀 四、分区与消费组

```
Topic: orders（3 个分区）
┌──────────┐ ┌──────────┐ ┌──────────┐
│Partition 0│ │Partition 1│ │Partition 2│
└──────────┘ └──────────┘ └──────────┘
    │              │              │
    └──── 消费组 A（3 个消费者）────┘
         每个消费者负责 1 个分区 → 并行消费

如果消费组 B 只有 1 个消费者 → 它消费全部分区
```

**要点：**
- 分区内消息**有序**，跨分区不保证全局有序
- 一个分区同一时刻只能被一个消费组内的**一个**消费者消费
- 消费者数量 = 分区数时负载最均衡

---

## 🛡️ 五、消息可靠性

### ACK 机制（生产者确认）

| acks | 行为 | 可靠性 |
| --- | --- | --- |
| `0` | 发完不管 | 可能丢失，吞吐最高 |
| `1` | Leader 写入确认 | 默认，丢 Leader 时会丢 |
| `all` | 所有 ISR 副本确认 | 最可靠 |

### ISR（In-Sync Replicas）

Leader 分区的**同步副本集合**。副本数（`replication-factor`）决定冗余：

```
Partition 0
  ├── Leader（负责读写）
  └── Follower 1（同步复制）
  └── Follower 2（同步复制）
```

- `min.insync.replicas=2` + `acks=all` 可保证消息至少写入 2 个副本
- Leader 故障时从 ISR 中选举新 Leader

### 幂等与事务

```python
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    enable_idempotence=True        # 开启幂等，避免重复
)
```

---

## ⚙️ 六、常用参数速查

| 参数 | 默认 | 说明 |
| --- | --- | --- |
| `retention.ms` | 7 天 | 消息保留时间 |
| `compression.type` | none | 压缩（producer 建议 `lz4`/`zstd`） |
| `batch.size` | 16384 | 生产者批量发送字节数 |
| `linger.ms` | 0 | 批量前等待时间（调大提升吞吐） |
| `auto.offset.reset` | latest | 无 offset 时从哪消费 |
| `max.poll.records` | 500 | 单次拉取条数 |

---

## 🎯 七、小结

- Kafka = Topic + Partition + 消费组，用分区换取吞吐
- 分区内有序，跨分区无序；消费组内分区分摊
- 可靠性靠 `acks` + `min.insync.replicas` + ISR 副本
- 大数据日志、流处理场景的首选

---
