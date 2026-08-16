---
title: SSM 框架
date: 2025-09-02
categories: [backend, Java]
tags: [后端, Java, SSM]
---

# 🏗️ SSM 框架

SSM 是经典的 Java Web 技术栈组合：**Spring + SpringMVC + MyBatis**，曾经是国内企业开发的主流方案（如今多数已转向 Spring Boot）。

---

## 🧩 一、三个成员

| 框架 | 职责 |
| --- | --- |
| **Spring** | 核心容器：IoC（依赖注入）+ AOP（面向切面） |
| **SpringMVC** | Web 层：接收请求、路由分发、返回视图 |
| **MyBatis** | 持久层：SQL 映射，操作数据库 |

```
浏览器请求
   → DispatcherServlet（SpringMVC 入口）
   → Controller（处理业务）
   → Service（Spring 管理）
   → Mapper（MyBatis）
   → 数据库
```

```xml
<!-- MyBatis 示例：SQL 映射 -->
<select id="findById" resultType="User">
  SELECT * FROM user WHERE id = #{id}
</select>
```

---

## 🔄 二、与 Spring Boot 的关系

Spring Boot 基于 Spring 生态做了自动配置，**内置了 SpringMVC 并简化 MyBatis 集成**。SSM 是"手动拼装"，Spring Boot 是"一键启动"。现代新项目直接学 Spring Boot 即可。

- [Spring Boot](./SpringBoot.md)

---

## 🗺️ 学习价值

- 理解 Web 框架的分层与配置原理
- 阅读老项目（大量遗留 SSM 代码）需要
- 对理解 Spring 生态底层很有帮助

> 💡 本页内容正在建设中。

---
