---
title: FastAPI 快速上手
date: 2025-09-02
categories: [backend, Python]
tags: [后端, Python, FastAPI]
---

# ⚡ FastAPI 快速上手

FastAPI 是 Python 生态最受欢迎的现代 Web 框架，以 **高性能**（基于 Starlette + Pydantic）和 **自动生成 API 文档** 著称。本文带你从零写一个 REST API。

---

## 🎯 一、为什么选 FastAPI？

| 特性 | 说明 |
| --- | --- |
| 高性能 | 与 Node.js/Go 同级（基于 ASGI 异步） |
| 自动文档 | 自动生成 Swagger UI 和 ReDoc |
| 类型提示 | 基于 Python 类型注解，IDE 补全友好 |
| 请求校验 | Pydantic 模型自动校验 |
| 现代异步 | 原生支持 `async/await` |

---

## 📦 二、安装

```bash
pip install fastapi "uvicorn[standard]"
```

## ✍️ 三、第一个接口

```python
from fastapi import FastAPI

app = FastAPI(title="我的 API")


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

**运行：**

```bash
uvicorn main:app --reload
```

打开 `http://localhost:8000/docs` 查看自动生成的 Swagger 文档；访问 `http://localhost:8000/items/42?q=hello` 测试接口。

---

## 🔍 四、路径参数与查询参数

```python
@app.get("/users/{user_id}")
def get_user(user_id: int):            # 路径参数（类型自动校验）
    return {"user_id": user_id}


@app.get("/search")
def search(q: str, limit: int = 10):   # 查询参数，limit 有默认值
    return {"q": q, "limit": limit}
```

| 参数类型 | 写法 | 说明 |
| --- | --- | --- |
| 路径参数 | `{item_id}` | 写在 URL 中，必须提供 |
| 查询参数 | `?q=x` | 函数参数，可带默认值 |
| 请求体 | 见下文 | 通过 Pydantic 模型 |

---

## 📦 五、请求体与 Pydantic 校验

```python
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None      # 可选字段


@app.post("/items/")
def create_item(item: Item):
    # 传入非法数据（如 name 缺省）会自动返回 422 校验错误
    return {"name": item.name, "price": item.price}
```

测试：向 `POST /items/` 发送 `{"name": "手机", "price": 2999}`，返回 200；发送缺少 `name` 的数据则返回 422。

---

## 💉 六、依赖注入

FastAPI 的依赖注入让"公共逻辑"（认证、数据库连接）复用简洁：

```python
from fastapi import Depends


def get_token(authorization: str):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="未认证")
    return authorization.removeprefix("Bearer ")


@app.get("/protected")
def protected(token: str = Depends(get_token)):
    return {"token": token, "msg": "已认证"}
```

---

## 🔌 七、中间件与跨域

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 允许的前端地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🗃️ 八、完整 CRUD 示例（内存存储）

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
db: dict[int, dict] = {}


class Todo(BaseModel):
    title: str
    done: bool = False


@app.get("/todos")
def list_todos():
    return db


@app.post("/todos")
def create_todo(todo: Todo):
    todo_id = len(db) + 1
    db[todo_id] = todo.model_dump()
    return {"id": todo_id, **db[todo_id]}


@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: Todo):
    if todo_id not in db:
        raise HTTPException(status_code=404, detail="不存在")
    db[todo_id] = todo.model_dump()
    return db[todo_id]


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    return db.pop(todo_id, None)
```

---

## 🎯 九、小结

- FastAPI 基于类型注解，自动校验 + 自动文档
- 路径/查询/请求体三类参数，Pydantic 兜底校验
- `Depends` 实现依赖注入，`add_middleware` 加跨域
- 生产部署：`uvicorn main:app --host 0.0.0.0 --port 8000`

---
