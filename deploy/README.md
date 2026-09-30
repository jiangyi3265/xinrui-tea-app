# 三仓一键部署与公开初始化数据

这个入口启动真实 MySQL、Redis、若依 Java、私有 Node 业务引擎、H5 Nginx 和后台 Nginx。不是浏览器 Mock，也不会把本地会员/订单数据库上传到 GitHub。

## 一键启动

前置：Linux Docker Engine 或 Docker Desktop、Docker Compose v2+、Git、Bash、OpenSSL；能够访问 GitHub、Docker Hub、npm 与 Maven 仓库。不要求宿主机安装 Java、Node 或 MySQL。首次构建会下载依赖，耗时取决于网络。

```bash
git clone https://github.com/jiangyi3265/xinrui-tea-app.git
cd xinrui-tea-app
bash deploy/deploy.sh
```

脚本自动在相邻目录克隆 `xinrui-tea-backend → RuoYi-Vue` 和 `xinrui-tea-admin → RuoYi-Vue3`。已存在的目录直接使用，**不会 pull、reset 或删除你的修改**；旧版本缺少 Dockerfile 时会明确报错，需要你先正常更新源码。

默认只绑定本机回环地址，避免未完成配置的后台直接暴露公网：

| 入口 | 默认地址 |
| --- | --- |
| H5 用户端 | http://127.0.0.1:18000 |
| 若依管理后台 | http://127.0.0.1:18001 |
| 管理员账户 | admin；随机密码只在 `.local/deploy/admin-login.txt` |

服务全部健康且真实业务接口返回有效数据后，脚本才报告启动成功。终端不打印密码。若在远程服务器运行，可先用 SSH 隧道访问这两个端口；对外提供服务时请使用你控制的 HTTPS 反向代理、域名和访问策略。不要为了省事直接公开数据库或引擎端口。

可先运行 `bash deploy/deploy.sh --prepare-only`，检查 `.local/deploy/.env` 中的端口和 `TEA_SEED_MODE`，然后运行正常启动。`empty` 模式不导入示例商品；默认为 `sample`。不要修改已经初始化过的数据库密码；MySQL 已有数据卷不会根据环境变量自动改密。

## 仓库里究竟有哪些数据

| 数据 | 位置/处理方式 |
| --- | --- |
| 若依表结构、菜单、字典、权限等基础配置 | backend/sql/ry_20250522.sql |
| 茶叶共享状态表、业务审计、凭证唯一约束、角色菜单 | backend/sql/tea_business.sql |
| 两个示例茶品、分类、初始化公告和空商城配置 | backend/sql/tea_seed.public.json |
| 真实会员、手机号、地址、密码哈希、订单、余额、流水、出价、上传凭证、会话 | **不公开；不从当前本地数据库导出到仓库** |
| 正式服务密码、JWT、引擎密钥 | 在部署机器上随机生成，`.local/deploy/` 已被 Git 和 Docker 构建上下文排除 |

示例商品明确标注“初始化示例”，库存和销量均为零，没有活跃拍卖或虚构成交。图片复用已有资源，仅用于确认部署读写与资源路径，不代表实际可销售商品或新增图片授权。后台核实并录入实际数据后再开展业务。

H5 与管理端共用 MySQL 中的同一份业务状态。新库没有示例会员，管理员可以在会员管理中建立业务允许的账号；短信自助注册等外部依赖仍按原验收报告处理。

## 首次初始化与数据保护

1. MySQL 健康后，独立 init 服务才连接数据库。
2. `DeploymentInitializer` 获取该数据库的初始化互斥锁。
3. 只向**没有任何表的新库**执行若依基础 SQL 和业务 SQL。
4. 用随机 20 位密码替换默认管理员密码，清空上游示例联系方式，导入公开种子数据。验证码保持开启。
5. 初始化成功后写入版本标记。后续启动检测标记并跳过，**不重置密码、不覆盖商品和业务数据**。
6. 非空但没有完成标记、或中途失败的数据库，初始化会拒绝继续并阻止后端启动。不会自动删库“重试成功”。

**禁止手工把 `ry_20250522.sql` 导入已有业务库**，其中包含 DROP TABLE。已有真实数据迁移必须单独备份、核对版本并私密传输，不属于这个新库初始化流程。

## 日常操作与备份

```bash
# 状态；不要把带凭据的 compose config 完整输出发到公开渠道
bash deploy/compose.sh ps

# 查看日志（对外分享前脱敏）
bash deploy/compose.sh logs --tail 100 backend init

# 停止，不删除 MySQL、Redis 和上传卷
bash deploy/compose.sh stop

# 再次启动/按当前源码重新构建，不重置已有数据
bash deploy/deploy.sh

# 私密数据库备份；退出非零即失败
bash deploy/backup.sh
```

数据在 Docker 命名卷中持久化：`mysql-data`、`redis-data`、`uploads`、`java-logs`，实际卷名前缀为 Compose 项目名。不要使用 `down -v`、`docker volume prune` 或删除数据卷。数据库备份保存在 `.local/deploy/backups/`，同时应另行备份上传卷与 `.env`；恢复前先在隔离环境校验。不要把真实备份加入 Git，即使当前任务说“上传数据”。

默认项目名 `xinrui-tea`。同机多套部署须同时设置不同的 `TEA_COMPOSE_PROJECT`、`TEA_DEPLOY_DIR`、两个 Web 端口，防止共用卷或占用端口；设置后要在所有后续部署、备份命令中保持一致。

## 可重复验证

```bash
# 需要三个相邻源码仓库；只检查公开数据契约
npm run test:deploy

# 真实宿主机隔离测试（不是容器测试）
# 需要 JDK17、Maven、Node22+、MySQL 客户端与本地服务、redis-server/cli、Nginx、Compose CLI
npm run verify:deploy:local
```

隔离检查创建随机 `tea_deploy_*` 数据库与临时账号，验证首次导入、重复初始化、防覆盖、真实验证码登录、后台编辑 → SQL → H5、Java 重启持久化和 Nginx 代理，结束后只清理本次创建的数据库、账号与子进程。MySQL 管理连接可用 `TEA_MYSQL_DEFAULTS` 指定受保护的客户端配置文件。证据只保存在 `.local/deployment/`，不提交 Git。

Compose 配置通过不是容器运行通过，部署启动成功也不等于所有商业功能通过。最终实测范围见 [部署验收报告](../docs/DEPLOYMENT-20260930.md)。原非支付业务的发布阻塞没有因增加部署脚本而消失。

## 参考

启动顺序使用 Docker 官方的健康检查与完成条件：[Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/)。持久化 MySQL 的首次初始化和已有卷行为见 [MySQL official image](https://hub.docker.com/_/mysql)。
