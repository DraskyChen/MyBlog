---
title: React
date: 2025-09-02
categories: [frontend, React]
tags: [前端, React]
---

# ⚛️ React

React 是目前最流行的前端 UI 库之一，由 Meta（Facebook）开源，以 **组件化** 和 **虚拟 DOM** 著称，支撑着大量一线产品（Instagram、Airbnb 等）。

---

## 📚 目录导航

- [🧠 一、React 是什么？](./1.React是什么.md) —— 组件化、声明式、虚拟 DOM
- [🧩 二、组件与 JSX](./2.组件与JSX.md) —— 函数组件、props、条件渲染
- [🪝 三、Hooks 入门](./3.Hooks入门.md) —— useState、useEffect、useContext
- [🗺️ 四、学习路线](./4.学习路线.md) —— 从入门到工程化

---

## 💡 快速认识 React

- **组件化**：UI 由一个个组件拼装而成
- **声明式**：描述"界面应该长什么样"，React 负责更新
- **单向数据流**：数据从父组件流向子组件
- **虚拟 DOM**：先比对虚拟树，再最小化真实 DOM 操作

```jsx
function Welcome({ name }) {
  return <h1>你好，{name}！</h1>
}

// 使用
<Welcome name="张三" />
```

---

## 🗺️ 建议阅读顺序

1. [React 是什么？](./1.React是什么.md) 建立认知
2. [组件与 JSX](./2.组件与JSX.md) 掌握基础语法
3. [Hooks 入门](./3.Hooks入门.md) 理解状态管理（现代 React 核心）
4. 按 [学习路线](./4.学习路线.md) 深入工程化

> 💡 想对比 Vue？见 [Vue](../Vue/index.md) 系列笔记。

---
