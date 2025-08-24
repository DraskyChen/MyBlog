# MongoDB 技术解析：从单机到分布式的存储引擎与架构设计

MongoDB 是目前最广泛使用的文档型 NoSQL 数据库之一。本文将从 **存储引擎** 到 **分布式架构**，系统梳理 MongoDB 的核心设计理念，并对比 MySQL 架构，帮助你更好地理解其设计思路。

---

## 🟢 基础概念

MongoDB 是一个 **面向文档（Document-Oriented）** 的数据库，特点包括：

- **Schema-Free**：无需固定表结构，灵活存储。
- **高扩展性**：支持分片（Sharding），轻松应对海量数据。
- **高可用性**：副本集提供冗余和自动故障转移。
- **灵活查询**：支持丰富的查询语法、索引和聚合管道。

---

## 📄 文档（Document）与集合（Collection）

- **文档（Document）**：MongoDB 的最小存储单元，类似 MySQL 的一行记录，采用 BSON 格式。
- **集合（Collection）**：文档的逻辑容器，相当于 MySQL 的表。

示例文档：

```json
{
  "name": "Alice",
  "age": 25,
  "skills": ["MongoDB", "Node.js"]
}
````

---

## 🗂️ BSON 编码

BSON（Binary JSON）是 MongoDB 的数据格式：

* 支持比 JSON 更丰富的类型（`Date`, `ObjectId`, `Decimal128`）。
* 使用二进制存储，解析高效，支持嵌套和数组。
* 更适合数据库内部存储和网络传输。

---

## 💾 数据页结构与 `.wt` 文件

MongoDB 默认使用 **WiredTiger 存储引擎**。

* **数据页（Page）**：最小存储单位，默认大小 4KB。
* **.wt 文件**：每个集合和索引都有单独的文件：

  ```
  collection-*.wt   -> 存储集合数据
  index-*.wt        -> 存储索引数据
  ```

数据先进入内存缓存，再通过 **Journal + Checkpoint** 写入磁盘，保证一致性。

---

## 🌳 变种 B+ 树索引

* MongoDB 的索引基于 **B+ 树变体**。
* 特点：

  * 叶子节点链表，加快范围查询。
  * 支持多种索引：单键、复合、地理位置、全文。
* 与 MySQL InnoDB 相似，但更灵活，适合 JSON 文档的多字段查询。

---

## 🔄 并发控制：写时复制 (Copy On Write)

* 修改数据时不覆盖旧数据，而是生成新版本。
* 通过 **MVCC（多版本并发控制）** 保证读写并行：

  * **读**：一致性快照
  * **写**：新版本提交后替换旧版本

这样既提升了并发能力，也避免了读写冲突。

---

## 🧩 缓存策略（Cache + LRU 淘汰）

* **缓存**：WiredTiger 使用内存缓存数据页。
* **LRU 策略**：淘汰最近最少使用的数据页。
* **内存分配**：默认占系统内存的 50%。

这让 MongoDB 在大数据量场景下依然保持较快响应。

---

## 📝 持久化保障

MongoDB 使用 **双重机制** 保证数据安全：

* **Journal 写前日志**：所有写操作先写日志，再写入数据文件。
* **Checkpoint**：周期性将内存页写入磁盘，形成一致性快照。

崩溃恢复时：加载 checkpoint，再回放 journal 补全。

---

## ⚙️ WiredTiger 与 Server 层关系

* **WiredTiger**：存储引擎，负责数据存储、缓存、并发、持久化。
* **Server 层**：负责查询解析、聚合、分片路由。
* 两者通过 **存储引擎 API** 解耦，使 MongoDB 可以替换不同的存储引擎。

---

## 🔑 存储引擎的定位与接口

存储引擎的职责：

* 数据存储与读取
* 缓存管理
* 并发控制
* 事务支持
* 日志与恢复

核心接口：

* `RecordStore`：文档存取
* `SortedDataInterface`：索引存取
* `RecoveryUnit`：事务与一致性

---

## 🏗️ 单机 MongoDB 的本质（对比 MySQL）

单机 MongoDB 与 MySQL 架构对比：

* **Server 层**：MySQL SQL 层 ≈ MongoDB Query 层
* **存储层**：MySQL InnoDB ≈ MongoDB WiredTiger

差异：

* MySQL → 行存储，强 Schema
* MongoDB → 文档存储，弱 Schema
* MongoDB 原生支持分布式，而 MySQL 依赖中间件扩展

---

## 📡 分片集群 (Sharding)

MongoDB 的 **核心扩展机制**。

### 分片逻辑

* **范围分片（Range Sharding）**：按照字段范围切分，例如 userId。
* **哈希分片（Hashed Sharding）**：对 shard key 哈希，避免热点问题。

Sharding 让 MongoDB 能在海量数据下实现 **水平扩展**。

---

## 🧭 路由服务与配置中心

* **mongos**：客户端访问入口，负责查询路由。
* **Config Server**：存储集群的元数据（分片信息、集合分布）。

工作流程：

1. 客户端请求 → mongos
2. mongos 查询 config server 获取路由信息
3. 将请求分发到对应 shard

---

## 🧩 副本集 Replica Set

Replica Set 提供 **高可用**：

* 一个 **Primary** 节点，多个 **Secondary** 节点。
* **写操作** → Primary
* **读操作** → 可分发到 Secondary
* Primary 故障时，自动选举新的 Primary

---

## 🌍 分布式 MongoDB 集群

完整的 MongoDB 集群由以下部分组成：

* **分片（Sharding）**：实现水平扩展
* **副本集（Replica Set）**：保证高可用和数据冗余
* **mongos + Config Server**：路由与元数据管理

这使 MongoDB 能支撑从 **单机 → 高可用 → 全球分布式部署** 的演进路径。

---

## ✅ 总结

MongoDB 的核心在于：

* **文档模型**：灵活存储 JSON 风格数据
* **WiredTiger 存储引擎**：高效并发与持久化
* **分布式架构**：副本集 + 分片集群

它既能作为单机数据库替代 MySQL，也能在分布式场景下支撑互联网级应用。

> MongoDB 的设计思路，可以看作是 **MySQL + 分布式系统** 的结合体。
