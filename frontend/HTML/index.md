---
title: HTML 入门：网页的骨架
date: 2025-09-02
categories: [frontend, HTML]
tags: [前端, HTML]
---

# 🌐 HTML 入门：网页的骨架

HTML（HyperText Markup Language，超文本标记语言）是构成网页的基础语言。如果把网页比作一栋房子，那么 HTML 就是它的 **骨架** —— 定义了房间、门、窗户在哪里。

---

## 📄 一、什么是 HTML？

HTML 是一种 **标记语言**，它通过一组 **标签（tag）** 来描述网页的内容结构。

```html
<h1>这是一级标题</h1>
<p>这是一个段落。</p>
```

- `<h1>` 告诉浏览器："这里是一级标题"
- `<p>` 告诉浏览器："这里是一个段落"
- 浏览器读取这些标签，把它们渲染成用户看到的页面

> 💡 记住：HTML **不是** 编程语言，它没有逻辑判断和循环，只负责"描述内容长什么样"。

---

## 🧱 二、网页的三大核心技术

一个完整的现代网页通常由三部分组成：

| 技术 | 角色 | 类比 |
| --- | --- | --- |
| **HTML** | 结构 | 房子的骨架 |
| **CSS** | 样式 | 房子的装修 |
| **JavaScript** | 行为 | 房子的电器 |

三者各司其职：

```html
<!-- HTML：结构 -->
<button id="btn">点我</button>
```

```css
/* CSS：样式 */
#btn {
  color: white;
  background: #41d1ff;
}
```

```js
// JavaScript：行为
document.getElementById('btn').onclick = () => {
  alert('你点了我！')
}
```

---

## 🏗️ 三、一个标准 HTML 文档的结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的第一个网页</title>
</head>
<body>
  <h1>你好，世界！</h1>
  <p>这是我的第一个网页。</p>
</body>
</html>
```

各部分的作用：

- `<!DOCTYPE html>`：声明文档类型，告诉浏览器使用 HTML5 标准
- `<html>`：整个文档的根元素
- `<head>`：**不可见** 的元信息区（编码、标题、样式引用等）
- `<meta charset="UTF-8">`：指定字符编码，**中文页面必须有**
- `<title>`：浏览器标签页上显示的标题
- `<body>`：**可见** 的内容区，页面所有实际内容都写在这里

---

## 🛠️ 四、学习 HTML 需要什么工具？

1. **一个现代浏览器**：Chrome、Edge、Firefox 均可，用于查看效果
2. **一个编辑器**：推荐 VSCode（免费、插件丰富），也可以用记事本起步
3. **浏览器开发者工具（DevTools）**：按 `F12` 打开，可实时查看和修改页面

**本地快速预览**：双击 `.html` 文件即可在浏览器中打开，无需任何服务器。

---

## 🎯 五、小结

- HTML 是网页的骨架，用标签描述内容结构
- HTML + CSS + JavaScript 三者配合构成完整网页
- 标准文档由 `<!DOCTYPE html>`、`<html>`、`<head>`、`<body>` 组成

接下来，建议从「常用标签」学起，掌握最常见的元素写法。

---
