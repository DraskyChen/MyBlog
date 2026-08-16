---
title: JavaScript 入门指南
date: 2025-09-02
categories: [frontend, JavaScript]
tags: [前端, JavaScript]
---

# ⚡ JavaScript 入门指南

JavaScript（简称 JS）是网页的"灵魂"，负责 **行为** 与 **交互**：点击按钮、校验表单、请求数据、动画效果……一切"动起来"的东西都离不开它。

---

## 🧠 一、JavaScript 是什么？

- 一门 **动态弱类型** 的脚本语言，最初由 Netscape 在 1995 年发明
- 与 Java **没有关系**，只是名字相似
- 现在不仅能跑在浏览器，还能通过 **Node.js** 跑在服务器上

```js
console.log('Hello, JavaScript!')
```

---

## 📥 二、在页面中引入 JavaScript

### 1. 行内（不推荐）

```html
<button onclick="alert('点了！')">按钮</button>
```

### 2. 内嵌 `<script>`

```html
<script>
  console.log('页面加载了')
</script>
```

### 3. 外部文件（推荐）

```html
<script src="app.js"></script>
```

> 💡 推荐把 `<script>` 放在 `</body>` 之前，或使用 `defer` 属性，避免阻塞页面渲染。

---

## 🔄 三、运行原理

浏览器解析 HTML → 遇到 `<script>` → 交给 JS 引擎（V8/SpiderMonkey 等）执行：

1. **解析**：词法/语法分析，生成抽象语法树
2. **执行**：解释执行（现代引擎会 JIT 编译优化）
3. **事件循环**：处理异步任务（点击、网络请求、定时器）

```js
// 异步示例：2 秒后输出
setTimeout(() => {
  console.log('2 秒到了')
}, 2000)
```

---

## 🧩 四、与 TypeScript / 框架的关系

| 技术 | 关系 |
| --- | --- |
| **JavaScript** | 基础，浏览器原生支持 |
| **TypeScript** | JS 的超集，加上了类型系统，编译后仍是 JS |
| **Vue / React** | 基于 JS 的 UI 框架，构建复杂应用 |

> 💡 建议：先用 JS 打好基础，再学 TS，然后学框架。

---

## 🎯 五、学习路线

1. **基础语法**：变量、类型、运算符、流程控制、函数 → 见 [基础语法](./1.基础语法.md)
2. **进阶**：作用域、闭包、原型链、事件循环 → 见 [进阶](./2.进阶.md)
3. **ES6+**：解构、Promise、async/await、class → 见 [ES6+](./ES6+.md)
4. **实践**：DOM 操作、事件、Fetch 请求
5. **工程化**：模块化、构建工具、框架

---
