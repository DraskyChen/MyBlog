---
title: Flask 快速上手
date: 2025-09-02
categories: [backend, Python]
tags: [后端, Python, Flask]
---

# 🌶️ Flask 快速上手

Flask 是 Python 最经典的轻量级 Web 框架，**简单、灵活、无强制约束**，适合快速搭建 Web 应用和 API。本文带你从零写一个 Flask 应用。

---

## 🎯 一、为什么选 Flask？

| 特性 | 说明 |
| --- | --- |
| 轻量 | 核心极小，只做路由和渲染 |
| 灵活 | 数据库、模板、认证等都可按需选择 |
| 简单 | 10 行代码跑通一个应用 |
| 生态成熟 | 插件丰富（Flask-SQLAlchemy、Flask-Login 等） |
| 适用 | 小型应用、API、学习 Web 开发 |

> 💡 对比 FastAPI：想要类型校验和自动文档 → FastAPI；想要极简经典 WSGI 应用 → Flask。

---

## 📦 二、安装与第一个应用

```bash
pip install flask
```

```python
# app.py
from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "<h1>你好，Flask！</h1>"


if __name__ == "__main__":
    app.run(debug=True)
```

**运行：**

```bash
python app.py
```

访问 `http://localhost:5000`，看到页面输出。

> 💡 `debug=True` 开启自动重载和错误调试页，开发必备。

---

## 🔀 三、路由与视图

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "首页"


@app.route("/user/<name>")
def user(name):
    return f"你好，{name}！"


@app.route("/post/<int:post_id>")
def post(post_id):                 # 类型转换器
    return f"文章 {post_id}"


@app.route("/about")
@app.route("/about/")              # 多个路由映射同一视图
def about():
    return "关于我们"
```

**路由类型转换器：**

| 转换器 | 匹配内容 |
| --- | --- |
| `<string>` | 字符串（默认） |
| `<int>` | 整数 |
| `<float>` | 浮点数 |
| `<path>` | 含 `/` 的路径 |

---

## 🎨 四、模板（Jinja2）

Flask 内置 Jinja2 模板引擎，让 HTML 与数据分离。

```python
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/profile/<name>")
def profile(name):
    return render_template("profile.html", name=name, age=18)
```

创建 `templates/profile.html`：

```html
<!DOCTYPE html>
<html>
<body>
  <h1>欢迎 {{ name }}！</h1>
  {% if age >= 18 %}
    <p>已成年</p>
  {% else %}
    <p>未成年</p>
  {% endif %}
</body>
</html>
```

---

## 📥 五、请求与响应

```python
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/login", methods=["POST"])
def login():
    # 表单数据
    username = request.form.get("username")
    # JSON 数据
    data = request.get_json(silent=True)
    # 查询参数
    page = request.args.get("page", 1)

    if username:
        return jsonify({"ok": True, "user": username})
    return jsonify({"ok": False}), 401
```

| 对象 | 用途 |
| --- | --- |
| `request.form` | 表单提交数据 |
| `request.get_json()` | JSON 请求体 |
| `request.args` | URL 查询参数 |
| `request.files` | 上传文件 |
| `jsonify()` | 返回 JSON 响应 |
| 返回 `(resp, code)` | 指定状态码 |

---

## 🧩 六、蓝图（Blueprint）

蓝图用于模块化组织路由，项目变大后必备：

```python
# auth.py —— 认证模块
from flask import Blueprint

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login")
def login():
    return "登录页"
```

```python
# app.py —— 注册蓝图
from flask import Flask
from auth import auth_bp

app = Flask(__name__)
app.register_blueprint(auth_bp, url_prefix="/auth")
# 现在 /auth/login 可访问
```

---

## 🗃️ 七、接入数据库（Flask-SQLAlchemy）

```bash
pip install flask-sqlalchemy
```

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///blog.db"
db = SQLAlchemy(app)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)


@app.route("/posts")
def posts():
    return [{"id": p.id, "title": p.title} for p in Post.query.all()]


with app.app_context():
    db.create_all()
```

---

## 🎯 八、小结

- Flask 核心是路由 + 模板 + 请求响应，轻量灵活
- Jinja2 模板用 `{{ }}` 输出、`{% %}` 逻辑
- 蓝图按模块拆分路由，`url_prefix` 统一前缀
- 配合 SQLAlchemy 接数据库，可支撑真实应用

---
