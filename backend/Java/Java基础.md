---
title: Java 基础语法
date: 2025-09-02
categories: [backend, Java]
tags: [后端, Java]
---

# 📘 Java 基础语法

本文覆盖 Java 入门必备：基本类型、流程控制、数组、面向对象、集合框架、异常处理与常用 API。

---

## 🔢 一、变量与基本类型

Java 有 **8 种基本类型**：

| 类型 | 大小 | 范围/示例 |
| --- | --- | --- |
| `byte` | 1 字节 | -128 ~ 127 |
| `short` | 2 字节 | -32768 ~ 32767 |
| `int` | 4 字节 | ±21 亿（最常用整数） |
| `long` | 8 字节 | 需加 `L` 后缀 |
| `float` | 4 字节 | 需加 `f` 后缀 |
| `double` | 8 字节 | 浮点数默认 |
| `char` | 2 字节 | 单个字符 `'a'` |
| `boolean` | 1 位 | `true` / `false` |

```java
int age = 18;
double price = 99.5;
char grade = 'A';
boolean isStudent = true;
String name = "张三";  // String 是引用类型，不是基本类型
```

> 💡 整数默认 `int`，浮点默认 `double`；大数值用 `long` / `double` 时注意加后缀。

---

## 🔀 二、流程控制

```java
// if-else
int score = 85;
if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}

// switch
switch (score / 10) {
    case 10: case 9: System.out.println("A"); break;
    default: System.out.println("其他");
}

// for / while
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
int i = 0;
while (i < 5) { i++; }
```

---

## 📦 三、数组

```java
// 声明与初始化
int[] nums = new int[3];       // 默认值 0
nums[0] = 10;
int[] scores = {85, 92, 78};   // 直接初始化

// 遍历
for (int s : scores) {
    System.out.println(s);
}

// 二维数组
int[][] matrix = { {1, 2}, {3, 4} };
System.out.println(matrix[0][1]); // 2
```

---

## 🧱 四、面向对象

Java 是 **纯面向对象** 语言，一切皆对象（除基本类型外）。

### 类与对象

```java
public class Student {
    private String name;      // 封装：私有字段
    private int age;

    // 构造方法
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // getter / setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

// 使用
Student s = new Student("张三", 18);
System.out.println(s.getName());
```

### 三大特性

| 特性 | 含义 | 示例 |
| --- | --- | --- |
| **封装** | 隐藏内部细节，通过方法访问 | `private` + getter/setter |
| **继承** | 子类复用父类代码 | `extends` |
| **多态** | 同一接口，不同实现 | 父类引用指向子类对象 |

```java
// 继承
class Animal {
    public void speak() { System.out.println("叫声"); }
}
class Dog extends Animal {
    @Override
    public void speak() { System.out.println("汪汪"); }
}

// 多态
Animal a = new Dog();
a.speak(); // 汪汪
```

---

## 🔌 五、接口与抽象类

| 对比 | 抽象类 | 接口 |
| --- | --- | --- |
| 关键字 | `abstract class` | `interface` |
| 可以含字段 | ✅ | ❌（只能常量） |
| 可以含实现方法 | ✅ | 默认方法（default） |
| 多继承 | ❌ | ✅（可实现多个接口） |
| 使用场景 | "is-a" 关系 | "has-a" / 能力约定 |

```java
interface Flyable {
    void fly();  // 抽象方法
}
class Bird implements Flyable {
    public void fly() { System.out.println("飞翔"); }
}
```

> 💡 经验法则：能抽象出行为约定用接口，有公共字段/状态用抽象类。

---

## 🗂️ 六、集合框架

```java
import java.util.*;

// List：有序可重复
List<String> list = new ArrayList<>();
list.add("a"); list.get(0);

// Set：无序去重
Set<Integer> set = new HashSet<>();
set.add(1); set.add(1); // 只有一个 1

// Map：键值对
Map<String, Integer> map = new HashMap<>();
map.put("age", 18); map.get("age");
```

| 接口 | 实现类 | 特点 |
| --- | --- | --- |
| `List` | `ArrayList` / `LinkedList` | 有序可重复，按索引访问 |
| `Set` | `HashSet` / `TreeSet` | 去重；HashSet 无序，TreeSet 有序 |
| `Map` | `HashMap` / `TreeMap` | 键值对；HashMap 快，TreeMap 有序 |

---

## 🧯 七、异常体系

```
Throwable
 ├── Error（系统级错误，如 OutOfMemoryError，一般不捕获）
 └── Exception
      ├── RuntimeException（运行时异常，如 NullPointerException）
      └── 受检异常（如 IOException，必须处理）
```

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("除数不能为 0：" + e.getMessage());
} finally {
    System.out.println("无论是否异常都会执行");
}

// 自定义异常
class MyException extends Exception {
    public MyException(String msg) { super(msg); }
}
```

---

## 🧰 八、常用 API

```java
// String
String s = "Hello";
s.length(); s.toUpperCase(); s.substring(0, 2);
s.startsWith("He"); s.equals("hello"); // 注意用 equals 而非 ==

// 字符串与数字互转
int n = Integer.parseInt("42");
String str = String.valueOf(42);

// 日期
import java.time.LocalDate;
LocalDate today = LocalDate.now();
System.out.println(today.plusDays(1));
```

---

## 🎯 九、小结

- 8 种基本类型，字符串比较用 `equals`
- 面向对象三特性：封装、继承、多态
- 集合框架：List / Set / Map 三件套
- 异常分运行时与受检异常，善用 try-catch-finally
- 下一步建议学习 Spring Boot，把 Java 用于真实后端开发

---
