---
title: PostgreSQL 从入门到放弃
date: 2025-09-02
categories: [backend, RDBMS]
tags: [后端, RDBMS, PostgreSQL]
---

# 🐘 PostgreSQL 从入门到放弃

PostgreSQL（简称 PG）被誉为"功能最强大的开源数据库"，以标准兼容、类型丰富、扩展能力强著称。本文从安装到高级特性，带你入门 PG。

---

## 📦 一、安装与连接

**macOS**（Homebrew）：

```bash
brew install postgresql@16
brew services start postgresql@16
```

**Ubuntu/Debian**：

```bash
sudo apt install postgresql
sudo systemctl start postgresql
```

**连接**：

```bash
sudo -u postgres psql        # Ubuntu 下切换到 postgres 用户
psql -U yourname -d postgres # 本机默认用户名登录
```

---

## 🏗️ 二、基础操作（与 MySQL 一致的部分）

```sql
-- 建库建表
CREATE DATABASE shop;
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,      -- PG 版的自增
  name VARCHAR(50) NOT NULL,
  age INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 增删改查
INSERT INTO users (name, age) VALUES ('张三', 18);
UPDATE users SET age = 19 WHERE name = '张三';
DELETE FROM users WHERE id = 3;
SELECT * FROM users WHERE age >= 18 ORDER BY age DESC;
```

> 💡 `BIGSERIAL` 是 `BIGINT` + 自增序列的简写，等价于 MySQL 的 `AUTO_INCREMENT`。

---

## ⚖️ 三、与 MySQL 的核心差异

| 维度 | PostgreSQL | MySQL |
| --- | --- | --- |
| SQL 标准 | 兼容度最高 | 有自己方言 |
| JSON | `JSONB`（二进制，可索引） | `JSON`（5.7+，较弱） |
| 窗口函数 | 完整支持 | 8.0+ 支持 |
| 数组类型 | ✅ 原生 | ❌ |
| 全文检索 | ✅ 内建 | 需 FULLTEXT 索引 |
| 分区表 | 声明式分区 | 分区语法 |
| 数据一致性 | 更严谨（如默认不自动截断超长字符串） | 宽松（默认截断） |

---

## ✨ 四、PostgreSQL 特色功能

### 1. JSONB —— 灵活文档

```sql
CREATE TABLE products (
  id INT PRIMARY KEY,
  data JSONB
);

INSERT INTO products VALUES (1, '{"name": "手机", "price": 2999}');

-- 查询 JSON 字段
SELECT data->>'name' AS name FROM products;
-- 给 JSON 建索引加速查询
CREATE INDEX ON products USING GIN (data);
-- 修改 JSON 内部字段
UPDATE products SET data = jsonb_set(data, '{price}', '2599') WHERE id = 1;
```

### 2. 数组类型

```sql
CREATE TABLE tags (
  id INT PRIMARY KEY,
  labels TEXT[]
);

INSERT INTO tags VALUES (1, ARRAY['科技', '数码']);

SELECT * FROM tags WHERE '科技' = ANY(labels);
-- 或
SELECT * FROM tags WHERE labels @> ARRAY['科技'];
```

### 3. CTE（公共表表达式）—— 让复杂查询可读

```sql
WITH high_age AS (
  SELECT name, age FROM users WHERE age >= 18
)
SELECT name FROM high_age ORDER BY age DESC;
```

### 4. 窗口函数 —— 分组内的排名/累计

```sql
-- 每个分组内按年龄排名
SELECT name, age,
       RANK() OVER (ORDER BY age DESC) AS age_rank
FROM users;

-- 每个部门内排名
SELECT dept, name,
       ROW_NUMBER() OVER (PARTITION BY dept ORDER BY score DESC) AS rn
FROM employees;
```

---

## 🧾 五、常用数据类型

| 类型 | 说明 |
| --- | --- |
| `INTEGER` / `BIGINT` | 整数 |
| `NUMERIC(p, s)` | 精确小数（金额用，避免浮点误差） |
| `VARCHAR(n)` / `TEXT` | 变长字符串 |
| `TIMESTAMPTZ` | 带时区时间（推荐） |
| `BOOLEAN` | 布尔 |
| `JSONB` | 二进制 JSON（可索引） |
| `ARRAY` | 数组 |
| `UUID` | 通用唯一标识 |
| `DATE` / `TIME` | 日期 / 时间 |

---

## 🛠️ 六、实用运维命令

```bash
# 导出/导入
pg_dump shop > shop.sql
psql -d shop < shop.sql

# 查看连接
SELECT * FROM pg_stat_activity;
```

```sql
-- 查看执行计划
EXPLAIN ANALYZE SELECT * FROM users WHERE age > 18;
```

---

## 🎯 七、小结

- PG 以 SQL 标准兼容和丰富类型见长，JSONB 让"文档 + 关系"兼得
- CTE 与窗口函数让复杂查询更清晰
- 与 MySQL 选型：需要 JSON/数组/GIS/复杂分析选 PG，追求简单易用的 Web 常规场景选 MySQL
- 配套参考：[MySQL 从入门到放弃](./MySQL从入门到放弃.md)

---
