---
title: Java 入门指南
date: 2025-09-02
categories: [backend, Java]
tags: [后端, Java]
---

# ☕ Java 入门指南

Java 是后端开发中使用最广泛的语言之一，在企业级应用、微服务、大数据领域占据重要地位。本文介绍 Java 的核心特性与入门路径。

---

## 🏛️ 一、Java 是什么？

Java 由 Sun 公司于 1995 年发布（现属 Oracle），是一种 **面向对象、跨平台** 的编程语言。

核心口号：**"Write Once, Run Anywhere"**（一次编写，到处运行）——编译后的字节码可以在任何安装了 JVM 的平台上运行。

---

## 🧩 二、JDK / JRE / JVM

理解这三个概念是入门第一步：

```
JDK（Java Development Kit，开发工具包）
 ├── JRE（Java Runtime Environment，运行环境）
 │    └── JVM（Java Virtual Machine，虚拟机）★
 └── 编译器 javac、调试器等开发工具
```

| 概念 | 作用 |
| --- | --- |
| **JVM** | 解释执行字节码，是"跨平台"的关键 |
| **JRE** | JVM + 核心类库，用于运行 Java 程序 |
| **JDK** | JRE + 开发工具，用于编写和编译 Java 程序 |

```bash
# 检查是否安装
java -version
javac -version
```

---

## 🛠️ 三、开发环境搭建

1. **安装 JDK**：推荐 JDK 17（LTS）或 21（最新 LTS），从 Oracle 或 OpenJDK 下载
2. **安装 IDE**：推荐 IntelliJ IDEA（社区版免费）
3. **验证**：

```bash
java -version
```

4. **第一个程序**：

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("你好，Java！");
    }
}
```

编译运行：

```bash
javac Hello.java    # 编译生成 Hello.class
java Hello          # 运行，输出：你好，Java！
```

---

## ⚖️ 四、与其他语言对比

| 特性 | Java | Python | Go |
| --- | --- | --- | --- |
| 类型 | 静态强类型 | 动态弱类型 | 静态强类型 |
| 运行方式 | JVM 字节码 | 解释执行 | 编译为机器码 |
| 启动速度 | 较慢 | 慢 | 快 |
| 生态 | 企业级丰富 | 数据科学/AI 强 | 云原生 |
| 适用场景 | 大型后端/微服务 | 脚本/ML/Web | 中间件/云原生 |

> 💡 选择建议：想要稳健、成熟的企业级后端 → Java；快速原型/数据分析 → Python；高性能云原生服务 → Go。

---

## 🗺️ 五、Java 学习路线

1. **基础语法** → 见 [Java基础](./Java基础.md)
2. **集合框架**：List / Set / Map
3. **IO 与网络**：文件、Socket、HTTP
4. **并发编程**：多线程、线程池、锁
5. **数据库**：JDBC、MyBatis、JPA
6. **框架**：Spring Boot（Java 后端的事实标准）
7. **工程实践**：Maven/Gradle、单元测试、Docker 部署

---

## 🎯 六、小结

- Java 靠 JVM 实现跨平台，JDK = JRE + 开发工具
- 推荐用 JDK 17/21 LTS 版本 + IntelliJ IDEA
- 静态强类型 + 成熟生态，适合大型企业级应用
- 从基础语法起步，逐步走向 Spring Boot 全家桶

---
