---
title: JavaScript ES6+ 新特性
date: 2025-09-02
categories: [frontend, JavaScript]
tags: [前端, JavaScript]
---

# ✨ JavaScript ES6+ 新特性

ES6（ECMAScript 2015）是 JS 的一次重大更新，之后的每个版本（ES2016~ES2024）也持续带来新语法。本文整理开发中最常用的新特性，配示例快速上手。

---

## 🧩 一、解构赋值

从数组或对象中快速取值：

```js
// 数组解构
const [a, b] = [1, 2]        // a=1, b=2
const [first, , third] = [1, 2, 3] // first=1, third=3

// 对象解构
const user = { name: '张三', age: 18 }
const { name, age } = user   // name='张三', age=18

// 重命名 + 默认值
const { name: n, gender = '未知' } = user
```

---

## 🧵 二、模板字符串

用反引号拼接字符串，支持换行和插值：

```js
const name = '张三'
const age = 18
console.log(`我叫${name}，今年${age}岁。`)
// 我叫张三，今年18岁。

// 多行
const html = `
  <div>
    <p>内容</p>
  </div>
`
```

---

## 🌊 三、展开运算符与 Rest 参数

```js
// 展开数组
const arr = [1, 2, 3]
const copy = [...arr]        // [1,2,3] 拷贝
const merged = [...arr, 4]   // [1,2,3,4]

// 展开对象（合并属性）
const base = { a: 1 }
const obj = { ...base, b: 2 } // {a:1, b:2}

// Rest 参数（收集剩余参数）
function sum(...nums) {
  return nums.reduce((t, n) => t + n, 0)
}
sum(1, 2, 3) // 6
```

---

## 🤝 四、Promise 与 async/await

### Promise

表示一个异步操作的最终结果：

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('成功'), 1000)
})
p.then(msg => console.log(msg))      // 1 秒后输出 成功
p.catch(err => console.error(err))
```

### async/await

让异步代码像同步一样写：

```js
async function getUser() {
  try {
    const res = await fetch('/api/user')
    const data = await res.json()
    return data
  } catch (err) {
    console.error('请求失败', err)
  }
}

// Promise.all 并发
const [a, b] = await Promise.all([fetch('/a'), fetch('/b')])
```

> 💡 `await` 只能在 `async` 函数中使用。

---

## 🧬 五、class 类

面向对象写法：

```js
class Animal {
  constructor(name) {
    this.name = name
  }
  speak() {
    console.log(`${this.name} 叫了一声`)
  }
  static create(name) {
    return new Animal(name)
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name}：汪汪！`)
  }
}

const dog = new Dog('旺财')
dog.speak() // 旺财：汪汪！
```

---

## 📚 六、Set 与 Map

```js
// Set：去重
const set = new Set([1, 2, 2, 3])
[...set] // [1, 2, 3]

// Map：键可以是任意类型
const map = new Map()
map.set('name', '张三')
map.get('name') // '张三'
map.has('name') // true
```

---

## 🧊 七、可选链与空值合并

```js
// 可选链 ?.：避免层层判空
const user = { info: { age: 18 } }
user.info?.age    // 18
user.other?.age   // undefined（不报错）

// 空值合并 ??.：仅在 null/undefined 时用默认值
const val = null
const result = val ?? '默认值' // '默认值'
const zero = 0 ?? '默认值'     // 0（0 是有效值，不会被替换）

// 两者结合
user.address?.city ?? '未知城市'
```

---

## 🔧 八、常用新 API

```js
// 数组
[1, 2, 3].includes(2)            // true
Array.from('abc')                // ['a','b','c']
[1, 2, 3].flat()                 // 扁平化
[1, 2, 3].at(-1)                 // 3 倒数第一个

// 对象
Object.assign({}, { a: 1 }, { b: 2 }) // {a:1, b:2}
Object.keys({ a: 1 })            // ['a']
Object.entries({ a: 1 })         // [['a',1]]

// 字符串
'abc'.startsWith('a')            // true
'abc'.includes('b')              // true
'abc'.padStart(5, '*')           // '**abc'
```

---

## 🎯 九、小结

- 解构、模板字符串、展开运算符让代码更简洁
- `async/await` 是异步编程的最佳实践
- `?.` 和 `??` 有效减少判空代码
- Set 去重、Map 任意键，各有适用场景

---
