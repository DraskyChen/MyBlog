---
title: Spring AI
date: 2025-09-02
categories: [backend, Java]
tags: [后端, Java, AI, SpringAI]
---

# 🤖 Spring AI

Spring AI 是 Spring 官方推出的 AI 集成框架，让 Java 开发者能便捷地接入大语言模型（OpenAI、Anthropic、本地模型等），就像用 Spring 操作数据库一样自然。

---

## 🧠 一、核心能力

| 能力 | 说明 |
| --- | --- |
| **Chat Client** | 统一的对话 API，对接各家 LLM |
| **Prompt 模板** | 结构化提示词 |
| **RAG（检索增强）** | 结合向量数据库，基于私有知识问答 |
| **Function Calling** | 让模型调用 Java 方法 |
| **结构化输出** | 解析模型输出为 Java 对象 |

```java
@Service
public class ChatService {
    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String ask(String question) {
        return chatClient.prompt()
                .user(question)
                .call()
                .content();
    }
}
```

---

## 🗺️ 学习路线

1. **前置**：[Spring Boot](./SpringBoot.md) 基础 + 一门 LLM 概念
2. **快速开始**：接入 OpenAI / 本地模型，跑通 ChatClient
3. **进阶**：Prompt 模板、结构化输出、Function Calling
4. **实战**：RAG 问答系统、向量数据库集成

> 💡 本页内容正在建设中。LLM 与 Agent 概念可参考 [AI Agent](../../ai/LLM/Agent/index.md)。

---
