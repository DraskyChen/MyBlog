---
title: Spring Boot
date: 2025-09-02
categories: [backend, Java]
tags: [后端, Java, SpringBoot]
---

# 🍃 Spring Boot

Spring Boot 是 Java 后端的事实标准框架，大幅简化了 Spring 的配置，让"开箱即用"成为可能。

---

## 🧠 一、Spring Boot 是什么？

- 基于 Spring 框架的 **快速开发脚手架**
- **自动配置**：约定优于配置，减少样板代码
- **内嵌服务器**：自带 Tomcat/Jetty，无需部署 WAR
- **生态丰富**：Spring Cloud、Spring Data、Spring Security

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

```java
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "你好，Spring Boot！";
    }
}
```

---

## 🗺️ 学习路线

1. **前置**：[Java基础](./Java基础.md) + Maven/Gradle 构建工具
2. **Web 开发**：Controller、参数绑定、REST API
3. **数据访问**：Spring Data JPA / MyBatis + MySQL
4. **进阶**：Spring Security、Spring Cloud 微服务
5. **实践**：Docker 部署、CI/CD

> 💡 本页内容正在建设中，后续补充完整教程。

---
