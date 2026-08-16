---
title: CI/CD 持续集成与部署
date: 2025-09-02
categories: [devops, CI_CD]
tags: [DevOps, CI/CD]
---

# 🔁 CI/CD 持续集成与部署

CI/CD（Continuous Integration / Continuous Delivery）让代码从提交到上线全自动，是现代软件交付的核心实践。

---

## 📚 目录导航

- [⚙️ GitHub Action 详解](./GitHub Action详解.md) —— 用 GitHub Actions 搭建流水线

---

## 🧠 一、什么是 CI/CD？

```
代码提交 ──> 自动构建 ──> 自动测试 ──> 自动部署 ──> 上线
    CI（持续集成）                    CD（持续交付/部署）
```

| 环节 | 作用 |
| --- | --- |
| **CI（持续集成）** | 每次提交自动编译 + 测试，尽早发现问题 |
| **CD（持续交付）** | 构建产物自动进入可发布状态 |
| **CD（持续部署）** | 通过测试后自动部署到生产 |

---

## 🔧 二、主流工具

| 工具 | 特点 |
| --- | --- |
| **GitHub Actions** | 与 GitHub 深度集成，生态丰富 |
| GitLab CI | 与 GitLab 集成 |
| Jenkins | 老牌自建 CI，插件多 |
| CircleCI / Travis | 云端 CI 服务 |

> 💡 本站用 GitHub Actions 自动构建部署到 GitHub Pages，完整讲解见 [GitHub Action 详解](./GitHub Action详解.md)。

---
