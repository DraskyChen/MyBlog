---
title: MySQL 从入门到放弃
date: 2025-09-02
categories: [backend, RDBMS]
tags: [后端, RDBMS, MySQL]
---

# 🐬 MySQL 从入门到放弃

MySQL 是世界上最流行的开源关系型数据库之一，Web 应用（尤其是 LAMP/LNMP 栈）的标配。本文从安装到调优，带你把 MySQL 用起来。

---

## 📦 一、安装与连接

**macOS**（Homebrew）：

```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian**：

```bash
sudo apt update && sudo apt install mysql-server
sudo systemctl start mysql
```

**连接**：

```bash
mysql -u root -p
```

> 💡 新装后建议运行 `mysql_secure_installation` 设置密码并清理默认账号。

---

## 🏗️ 二、库表操作（DDL）

```sql
-- 建库
CREATE DATABASE shop DEFAULT CHARACTER SET utf8mb4;
USE shop;

-- 建表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  age INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 修改表
ALTER TABLE users ADD COLUMN email VARCHAR(100);
DROP TABLE users;
```

> 💡 字符集选 `utf8mb4`，支持 emoji 和完整中文。

---

## 🔄 三、数据操作（DML/DQL）

```sql
-- 插入
INSERT INTO users (name, age) VALUES ('张三', 18);
INSERT INTO users (name, age) VALUES ('李四', 20), ('王五', 22);

-- 更新
UPDATE users SET age = 19 WHERE name = '张三';

-- 删除
DELETE FROM users WHERE id = 3;

-- 查询
SELECT id, name, age FROM users;
SELECT * FROM users WHERE age >= 18 ORDER BY age DESC LIMIT 10;
```

---

## 📊 四、聚合与 JOIN

```sql
-- 聚合
SELECT COUNT(*), AVG(age), MAX(age) FROM users;
SELECT age, COUNT(*) FROM users GROUP BY age HAVING COUNT(*) > 1;

-- 内连接：只返回两表都匹配的行
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- 左连接：保留左表所有行
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

| JOIN 类型 | 结果 |
| --- | --- |
| `INNER JOIN` | 两表匹配的行 |
| `LEFT JOIN` | 左表全部 + 右表匹配 |
| `RIGHT JOIN` | 右表全部 + 左表匹配 |
| `FULL OUTER JOIN` | 两表全部（MySQL 不支持，用 UNION 模拟） |

---

## 🌲 五、索引原理与使用

MySQL 默认使用 **InnoDB** 引擎，索引基于 **B+ 树**：

```
            ┌──────────┐
            │ 根节点    │  → 索引键 + 子节点指针
            └────┬─────┘
        ┌────────┼────────┐
   ┌────┴────┐ ┌────┴────┐ ┌────┴────┐
   │ 分支节点 │ │ 分支节点 │ │ 分支节点 │
   └────┬────┘ └──────────┘ └──────────┘
   叶子节点（有序链表，含数据指针）
```

**B+ 树特点**：矮胖、层数少（3~4 层即可承载千万级数据）、叶子有序便于范围查询。

```sql
-- 创建索引
CREATE INDEX idx_users_age ON users (age);
-- 联合索引
CREATE INDEX idx_users_name_age ON users (name, age);
-- 查看执行计划（看是否走索引）
EXPLAIN SELECT * FROM users WHERE age > 18;
```

> 💡 索引技巧：查询频率高的 WHERE/JOIN/ORDER BY 列加索引；避免在索引列上使用函数；联合索引遵循"最左前缀"原则。

---

## 🧾 六、事务（ACID）

```sql
START TRANSACTION;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- 或 ROLLBACK;
```

| 特性 | 含义 |
| --- | --- |
| **A**tomicity（原子性） | 全部成功或全部回滚 |
| **C**onsistency（一致性） | 事务前后数据状态合法 |
| **I**solation（隔离性） | 并发事务互不干扰 |
| **D**urability（持久性） | 提交后数据不丢失 |

**隔离级别**（由低到高）：

| 级别 | 脏读 | 不可重复读 | 幻读 |
| --- | --- | --- | --- |
| Read Uncommitted | ❌ 可能 | 可能 | 可能 |
| Read Committed | ✅ 避免 | 可能 | 可能 |
| Repeatable Read（MySQL 默认） | ✅ | ✅ | 基本避免 |
| Serializable | ✅ | ✅ | ✅ |

---

## 🔁 七、主从复制与日志

主从复制用于高可用和读写分离：

```
主库 Master → binlog（二进制日志）→ 从库 Slave 重放
```

- **binlog**：记录数据变更，用于复制和恢复
- **redo log**：崩溃恢复时重放（保证持久性）
- **undo log**：回滚与 MVCC（多版本并发控制）

```sql
-- 查看主从状态
SHOW MASTER STATUS;
SHOW SLAVE STATUS\G
```

---

## ⚡ 八、常用调优

```sql
-- 常见瓶颈检查
SHOW PROCESSLIST;           -- 查看当前连接
EXPLAIN SELECT ...;         -- 查看执行计划（type 是否 ALL = 全表扫描）
SHOW INDEX FROM users;      -- 查看索引
```

| 调优点 | 做法 |
| --- | --- |
| 查询慢 | 加索引、避免 `SELECT *`、用 `LIMIT` |
| 连接慢 | 增大 `max_connections` |
| 写入慢 | 批量插入、减少不必要索引 |
| 表太大 | 分区表、归档冷数据 |

---

## 🎯 九、小结

- DDL 建表、DML 增删改、DQL 查询、JOIN 关联是四大基本功
- B+ 树索引 + EXPLAIN 是查询优化的核心
- InnoDB 提供 ACID 事务，Repeatable Read 是默认隔离级别
- 主从复制 + 合理索引是生产环境的标配

---
