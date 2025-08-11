# TypeScript 学习笔记

## 1. 类型声明

类型声明是 TypeScript 的核心特性，用于为变量、函数参数、返回值等指定类型。

### 基本语法
```typescript
// 变量类型声明
let name: string = "张三";
let age: number = 25;
let isStudent: boolean = true;

// 函数参数和返回值类型声明
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// 函数表达式类型声明
const add: (a: number, b: number) => number = (a, b) => a + b;

// 对象类型声明
let person: { name: string; age: number } = {
    name: "李四",
    age: 30
};

// 数组类型声明
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Alice", "Bob", "Charlie"];
```

### 类型断言
```typescript
// 使用 as 关键字
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// 使用尖括号语法（JSX 中不推荐）
let strLength2: number = (<string>someValue).length;
```

## 2. 类型推断

TypeScript 编译器能够根据上下文自动推断变量的类型，减少显式类型声明的需要。

### 自动类型推断
```typescript
// TypeScript 自动推断为 string 类型
let message = "Hello World";

// 自动推断为 number 类型
let count = 42;

// 自动推断为 boolean 类型
let isActive = true;

// 函数返回值类型推断
function multiply(a: number, b: number) {
    return a * b; // 自动推断返回类型为 number
}

// 数组类型推断
let fruits = ["apple", "banana", "orange"]; // 推断为 string[]
let scores = [85, 92, 78, 96]; // 推断为 number[]
```

### 上下文类型推断
```typescript
// 根据上下文推断参数类型
window.onmousedown = function(mouseEvent) {
    // mouseEvent 自动推断为 MouseEvent 类型
    console.log(mouseEvent.button);
};

// 数组方法中的类型推断
const numbers = [1, 2, 3, 4, 5];
numbers.map(num => num * 2); // num 自动推断为 number
```

## 3. 类型总览

TypeScript 提供了丰富的类型系统，包括基础类型、复合类型和高级类型。

### 基础类型分类
```typescript
// 原始类型
let str: string = "文本";
let num: number = 123;
let bool: boolean = true;
let sym: symbol = Symbol("key");
let big: bigint = 100n;

// 特殊类型
let u: undefined = undefined;
let n: null = null;
let v: void = undefined; // 通常用于函数返回值
let nev: never = (() => { throw new Error(); })(); // 永不返回

// 任意类型
let anything: any = "可以是任何类型";
let unknown: unknown = "需要类型检查才能使用";
```

### 复合类型
```typescript
// 对象类型
type Person = {
    name: string;
    age: number;
};

// 数组类型
type StringArray = string[];
type NumberList = Array<number>;

// 元组类型
type Coordinate = [number, number];
type NamedCoordinate = [x: number, y: number];

// 函数类型
type Handler = (event: Event) => void;
type Calculator = (a: number, b: number) => number;
```

## 4. 常用类型

### 联合类型（Union Types）
```typescript
// 基本联合类型
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // 也是有效的

// 字面量联合类型
type Theme = "light" | "dark" | "auto";
type Size = "small" | "medium" | "large";

function setTheme(theme: Theme) {
    // 只能传入指定的值
}
```

### 交叉类型（Intersection Types）
```typescript
type Nameable = { name: string };
type Ageable = { age: number };

// 交叉类型包含所有属性
type Person = Nameable & Ageable;

let person: Person = {
    name: "王五",
    age: 28
}; // 必须包含 name 和 age
```

### 条件类型
```typescript
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
```

### 映射类型
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type User = {
    id: number;
    name: string;
    email: string;
};

type ReadonlyUser = Readonly<User>; // 所有属性都是只读的
type PartialUser = Partial<User>; // 所有属性都是可选的
```

## 5. 自定义类型

### 类型别名（Type Aliases）
```typescript
// 基本类型别名
type ID = string | number;
type Status = "pending" | "success" | "error";

// 对象类型别名
type User = {
    id: ID;
    name: string;
    status: Status;
    createdAt: Date;
};

// 函数类型别名
type EventHandler<T> = (event: T) => void;
type AsyncFunction<T> = () => Promise<T>;
```

### 枚举（Enums）
```typescript
// 数字枚举
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

// 字符串枚举
enum Color {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

// 使用枚举
function move(direction: Direction) {
    switch (direction) {
        case Direction.Up:
            console.log("向上移动");
            break;
        case Direction.Down:
            console.log("向下移动");
            break;
    }
}
```

### 字面量类型
```typescript
// 字符串字面量类型
type EventName = "click" | "scroll" | "mousemove";

// 数字字面量类型
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// 布尔字面量类型
type IsTrue = true;
```

## 6. 抽象类

抽象类是不能被直接实例化的类，通常用作其他类的基类。

### 基本抽象类
```typescript
abstract class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    // 抽象方法，必须在子类中实现
    abstract makeSound(): void;
    
    // 具体方法，可以被子类继承
    move(): void {
        console.log(`${this.name} is moving`);
    }
    
    // 抽象属性访问器
    abstract get species(): string;
}

class Dog extends Animal {
    makeSound(): void {
        console.log(`${this.name} barks: Woof! Woof!`);
    }
    
    get species(): string {
        return "Canine";
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} meows: Meow!`);
    }
    
    get species(): string {
        return "Feline";
    }
}

// 使用示例
const dog = new Dog("Buddy");
dog.makeSound(); // Buddy barks: Woof! Woof!
dog.move(); // Buddy is moving

// const animal = new Animal("Generic"); // 错误：不能实例化抽象类
```

### 抽象类的高级用法
```typescript
abstract class Shape {
    protected color: string;
    
    constructor(color: string) {
        this.color = color;
    }
    
    // 抽象方法
    abstract calculateArea(): number;
    abstract draw(): void;
    
    // 模板方法模式
    public render(): void {
        console.log(`Drawing a ${this.color} shape`);
        this.draw();
        console.log(`Area: ${this.calculateArea()}`);
    }
}

class Circle extends Shape {
    private radius: number;
    
    constructor(color: string, radius: number) {
        super(color);
        this.radius = radius;
    }
    
    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
    
    draw(): void {
        console.log(`Drawing a circle with radius ${this.radius}`);
    }
}
```

## 7. 接口

接口定义了对象的结构，是 TypeScript 中定义契约的主要方式。

### 基本接口
```typescript
interface Person {
    name: string;
    age: number;
    email?: string; // 可选属性
    readonly id: number; // 只读属性
}

// 实现接口
const user: Person = {
    id: 1,
    name: "张三",
    age: 25,
    email: "zhangsan@example.com"
};

// user.id = 2; // 错误：id 是只读的
```

### 函数接口
```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = function(source, subString) {
    return source.search(subString) > -1;
};

// 或者使用箭头函数
const mySearch2: SearchFunc = (source, subString) => {
    return source.includes(subString);
};
```

### 可索引接口
```typescript
interface StringArray {
    [index: number]: string;
}

interface StringDictionary {
    [key: string]: string;
}

const myArray: StringArray = ["Alice", "Bob", "Charlie"];
const myDict: StringDictionary = {
    name: "张三",
    city: "北京"
};
```

### 类接口
```typescript
interface Flyable {
    fly(): void;
    altitude: number;
}

interface Swimmable {
    swim(): void;
    depth: number;
}

// 类实现接口
class Bird implements Flyable {
    altitude: number = 0;
    
    fly(): void {
        this.altitude += 100;
        console.log(`Flying at altitude ${this.altitude}`);
    }
}

// 类实现多个接口
class Duck implements Flyable, Swimmable {
    altitude: number = 0;
    depth: number = 0;
    
    fly(): void {
        this.altitude += 50;
        console.log(`Duck flying at ${this.altitude}m`);
    }
    
    swim(): void {
        this.depth += 10;
        console.log(`Duck swimming at ${this.depth}m depth`);
    }
}
```

### 接口继承
```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

interface Circle extends Shape {
    radius: number;
}

// 多重继承
interface ColoredCircle extends Circle, Shape {
    borderColor: string;
}
```

## 8. 属性修饰符

TypeScript 提供了多种属性修饰符来控制类成员的访问性和行为。

### 访问修饰符
```typescript
class Employee {
    public name: string;        // 公共的，默认修饰符
    private salary: number;     // 私有的，只能在类内部访问
    protected department: string; // 受保护的，可以在子类中访问
    
    constructor(name: string, salary: number, department: string) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
    
    public getInfo(): string {
        return `${this.name} works in ${this.department}`;
    }
    
    private calculateBonus(): number {
        return this.salary * 0.1;
    }
    
    protected getBaseSalary(): number {
        return this.salary;
    }
}

class Manager extends Employee {
    private teamSize: number;
    
    constructor(name: string, salary: number, department: string, teamSize: number) {
        super(name, salary, department);
        this.teamSize = teamSize;
    }
    
    public getTeamInfo(): string {
        // 可以访问 protected 成员
        return `Manager in ${this.department} with team of ${this.teamSize}`;
    }
    
    public getSalaryInfo(): string {
        // 可以访问 protected 方法
        return `Base salary: ${this.getBaseSalary()}`;
    }
}
```

### readonly 修饰符
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

class Circle {
    readonly radius: number;
    readonly center: Point;
    
    constructor(radius: number, center: Point) {
        this.radius = radius;
        this.center = center;
    }
    
    // 只读属性不能被修改
    // changeRadius(newRadius: number) {
    //     this.radius = newRadius; // 错误
    // }
}

// ReadonlyArray 类型
let readonlyNumbers: ReadonlyArray<number> = [1, 2, 3, 4, 5];
// readonlyNumbers.push(6); // 错误：ReadonlyArray 没有 push 方法
```

### 可选修饰符
```typescript
interface Config {
    host: string;
    port?: number;    // 可选属性
    timeout?: number; // 可选属性
}

class DatabaseConnection {
    private config: Config;
    
    constructor(config: Config) {
        this.config = {
            host: config.host,
            port: config.port || 3306,
            timeout: config.timeout || 5000
        };
    }
}

// 可选参数
function createConnection(host: string, port?: number): DatabaseConnection {
    return new DatabaseConnection({
        host,
        port: port || 3306
    });
}
```

### 参数属性
```typescript
// 在构造函数参数中使用修饰符
class User {
    constructor(
        public readonly id: number,
        public name: string,
        private email: string,
        protected createdAt: Date = new Date()
    ) {
        // 构造函数体可以为空
        // TypeScript 会自动创建并初始化这些属性
    }
    
    public getEmail(): string {
        return this.email;
    }
}

// 等价于传统写法
class UserTraditional {
    public readonly id: number;
    public name: string;
    private email: string;
    protected createdAt: Date;
    
    constructor(id: number, name: string, email: string, createdAt: Date = new Date()) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }
}
```

## 9. 泛型

泛型允许我们创建可重用的组件，这些组件可以支持多种类型而不失去类型信息。

### 基本泛型函数
```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 使用方式
let output1 = identity<string>("hello");    // 显式指定类型
let output2 = identity("world");            // 类型推断
let output3 = identity<number>(42);

// 泛型箭头函数
const reverse = <T>(items: T[]): T[] => {
    return items.reverse();
};
```

### 泛型接口
```typescript
// 泛型接口
interface GenericResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface ApiClient {
    get<T>(url: string): Promise<GenericResponse<T>>;
    post<T, U>(url: string, data: U): Promise<GenericResponse<T>>;
}

// 使用泛型接口
type User = { id: number; name: string };
type CreateUserRequest = { name: string; email: string };

const apiClient: ApiClient = {
    async get<T>(url: string): Promise<GenericResponse<T>> {
        // 实现细节
        throw new Error("Not implemented");
    },
    
    async post<T, U>(url: string, data: U): Promise<GenericResponse<T>> {
        // 实现细节
        throw new Error("Not implemented");
    }
};

// 使用示例
const userResponse = apiClient.get<User>("/users/1");
const createResponse = apiClient.post<User, CreateUserRequest>("/users", {
    name: "新用户",
    email: "user@example.com"
});
```

### 泛型类
```typescript
class GenericRepository<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    getById<K extends keyof T>(key: K, value: T[K]): T | undefined {
        return this.items.find(item => item[key] === value);
    }
    
    getAll(): T[] {
        return [...this.items];
    }
    
    update(predicate: (item: T) => boolean, updates: Partial<T>): boolean {
        const index = this.items.findIndex(predicate);
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updates };
            return true;
        }
        return false;
    }
}

// 使用泛型类
type Product = {
    id: number;
    name: string;
    price: number;
};

const productRepo = new GenericRepository<Product>();
productRepo.add({ id: 1, name: "笔记本电脑", price: 5999 });
productRepo.add({ id: 2, name: "鼠标", price: 199 });

const laptop = productRepo.getById("id", 1);
```

### 泛型约束
```typescript
// 使用 extends 关键字约束泛型
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // 现在可以访问 length 属性
    return arg;
}

// 可以传入数组、字符串等有 length 属性的类型
logLength("hello");        // OK
logLength([1, 2, 3]);      // OK
logLength({ length: 10, name: "test" }); // OK
// logLength(123);         // 错误：number 没有 length 属性

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "张三", age: 30, city: "北京" };
const name = getProperty(person, "name");    // string 类型
const age = getProperty(person, "age");      // number 类型
// const invalid = getProperty(person, "height"); // 错误：height 不存在
```

### 条件类型与泛型
```typescript
// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;
type ApiResponse<T> = T extends string ? { message: T } : { data: T };

// 实用工具类型
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
};

// 使用示例
type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

type PublicUser = MyPick<User, "id" | "name" | "email">;
type CreateUser = MyOmit<User, "id">;
```

### 映射类型与泛型
```typescript
// 自定义映射类型
type Optional<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
} & {
    [P in K]?: T[P];
};

type Required<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
} & {
    [P in K]-?: T[P];
};

// 使用示例
type User = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
};

type UserWithOptionalContact = Optional<User, "email" | "phone">; // email 和 phone 变为可选
type UserWithRequiredEmail = Required<User, "email">; // email 变为必填
```

---

## 学习建议

1. **循序渐进**：从基础类型声明开始，逐步掌握复杂的泛型和高级类型
2. **实践为主**：在实际项目中应用这些概念，加深理解
3. **阅读源码**：研究优秀开源项目的 TypeScript 代码
4. **善用工具**：配置好 IDE 的 TypeScript 支持，利用类型检查和自动补全
5. **持续学习**：TypeScript 在不断发展，关注新版本的特性更新

记住，TypeScript 的核心价值在于提供类型安全和更好的开发体验。掌握这些概念后，你将能够编写更加健壮和可维护的代码。