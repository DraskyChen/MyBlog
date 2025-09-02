# 🐳 Docker 学习笔记

## 1. Docker 是什么？

* **定义**：Docker 是一个开源的容器化平台，用于打包、分发和运行应用。
* **核心价值**：一次构建，到处运行（Build Once, Run Anywhere）。
* **特点**：

  * 轻量化（相对虚拟机，不需要完整的操作系统）。
  * 快速部署（秒级启动）。
  * 跨平台（无论是本地、测试环境还是云端，都能一致运行）。

---

## 2. Docker 架构原理

Docker 采用 **客户端-服务端（C/S）架构**：

* **Docker Client（客户端）**

  * 用户交互入口，例如：`docker build`、`docker run`。
  * 发送请求给 Docker Daemon。

* **Docker Daemon（守护进程）**

  * 核心服务，负责镜像构建、容器运行、网络和存储管理。

* **Docker Registry（镜像仓库）**

  * 用于存储镜像，官方有 [Docker Hub](https://hub.docker.com/)，企业可以自建私有仓库。

* **工作流程**：

  1. 用户执行 `docker run`。
  2. Docker Client 请求 Daemon。
  3. Daemon 检查镜像（本地/远程仓库）。
  4. 基于镜像创建并运行容器。

---

## 3. Docker 命令基础

### 镜像相关

```bash
docker pull nginx         # 拉取镜像
docker images             # 查看本地镜像
docker rmi <image_id>     # 删除镜像
```

### 容器相关

```bash
docker run -it ubuntu bash   # 启动交互式容器
docker ps                    # 查看运行容器
docker ps -a                 # 查看所有容器
docker stop <container_id>   # 停止容器
docker rm <container_id>     # 删除容器
```

### 日志与进入容器

```bash
docker logs <container_id>   # 查看容器日志
docker exec -it <container_id> bash   # 进入容器
```

### 数据卷与网络

```bash
docker volume ls             # 查看数据卷
docker network ls            # 查看网络
```

---

## 4. Docker 容器和虚拟机的区别

| 对比项      | 容器（Docker）     | 虚拟机（VM）         |
| -------- | -------------- | --------------- |
| **启动速度** | 秒级             | 分钟级             |
| **体积大小** | MB 级           | GB 级            |
| **资源占用** | 共享宿主机内核，开销小    | 需要完整操作系统，开销大    |
| **隔离性**  | 进程级隔离          | 完整 OS 隔离        |
| **适用场景** | 微服务、CI/CD、快速部署 | 需要强隔离、运行不同内核的系统 |

---

## 5. Docker Compose 是什么？

* **定义**：一个用于 **多容器应用编排** 的工具。
* **作用**：通过 `docker-compose.yml` 文件定义多个服务（前端 + 后端 + 数据库）。
* **特点**：

  * 一键启动/关闭所有服务：`docker-compose up`、`docker-compose down`。
  * 简化多容器的管理。

---

## 6. Docker Swarm 是什么？

* **定义**：Docker 自带的 **集群管理和编排工具**。
* **作用**：把多台 Docker 主机组成一个集群（Swarm），统一调度容器。
* **特点**：

  * 内置在 Docker 中，开箱即用。
  * 支持负载均衡、服务扩缩容。

---

## 7. Docker Compose 和 Docker Swarm 的区别

| 对比项      | Docker Compose       | Docker Swarm                         |
| -------- | -------------------- | ------------------------------------ |
| **作用范围** | 单机环境下的多容器编排          | 集群环境下的容器编排                           |
| **使用文件** | `docker-compose.yml` | `docker stack deploy -c compose.yml` |
| **适用场景** | 本地开发、测试环境            | 生产环境的分布式集群部署                         |

---

## 8. Docker 和 Kubernetes (k8s) 的关系

* **Docker**：容器引擎，用于构建和运行单个容器。
* **Kubernetes**：容器编排系统，用于管理大规模容器集群。
* **关系**：

  * Kubernetes 可以使用 Docker 容器作为运行时（Runtime）。
  * 后来逐渐演进到支持 CRI（Container Runtime Interface），也可以用 containerd、CRI-O 等。

---

## 9. Docker Swarm 和 Kubernetes (k8s) 的差异

| 对比项      | Docker Swarm | Kubernetes (k8s)    |
| -------- | ------------ | ------------------- |
| **复杂度**  | 简单，学习成本低     | 功能强大，学习曲线陡峭         |
| **功能**   | 基本的容器编排、负载均衡 | 自动伸缩、服务发现、滚动升级等全面功能 |
| **生态**   | 官方支持逐渐减少     | 社区活跃，云原生标准          |
| **适用场景** | 小规模集群，快速搭建   | 大规模生产环境，企业级集群管理     |