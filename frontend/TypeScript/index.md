---
title: TypeScript
date: 2025-09-02
categories: [frontend, TypeScript]
tags: [前端, TypeScript]
---

# 🔷 TypeScript

TypeScript（TS）是 JavaScript 的 **类型超集**，编译后仍是 JS，可以运行在任何 JS 环境。它为大型项目提供了类型安全和更好的开发体验。

---

## 🧠 一、为什么需要 TypeScript？

| 痛点（纯 JS） | TypeScript 的解法 |
| --- | --- |
| 变量类型随意变化，易出 bug | 静态类型检查，编译期发现错误 |
| 大型项目重构困难 | 类型即文档，IDE 智能提示 |
| 函数参数含义不清 | 显式类型注解，可读性高 |

```ts
// 显式类型
function greet(name: string, age?: number): string {
  return age ? `我叫${name}，${age}岁` : `我叫${name}`
}

// 接口定义对象结构
interface User {
  name: string
  age: number
}

const user: User = { name: '张三', age: 18 }
```

---

## 📚 目录导航

- [📝 TypeScript 学习笔记](./TypeScript学习笔记.md) —— 类型系统、泛型、工程实践

## 🗺️ 学习路线

1. **基础类型**：string / number / boolean / array / tuple
2. **进阶类型**：interface / type 别名 / 联合类型 / 泛型
3. **工程化**：`tsconfig.json` 配置、Vue/React + TS 结合

> 💡 完整笔记见 [TypeScript 学习笔记](./TypeScript学习笔记.md)。

---
