# 2026-09-30 公开数据与一键部署验收

## 当前结论

本轮交付是 **新库初始化 + 三仓 Docker 部署**，不是把真实业务数据库公开。当前版本在下列本地环境和部署验收范围内通过：真实 MySQL、Redis、若依 Java、私有 Node 引擎、商城 Nginx、后台 Nginx；首次数据导入、登录、跨端读写、重启持久化和数据库备份恢复均有实际结果。

**当前不满足所列完整业务范围的发布条件。** 本轮没有完成此前的预约通知、团队分佣、二次寄卖/拆单/提货、提现及未接入页面，也没有完成短信/实名/承运商集成、全部真机、生产 HTTPS、监控和容量验收。详见 [非支付验收报告](NONPAY-ACCEPTANCE-REPORT.md) 与 [页面范围](NONPAY-PAGE-MATRIX.md)。不能用部署成功或 87 项回归通过代替商业功能完整性。

本轮没有更改前端页面、CSS 或图片。真实会员、地址、订单、余额流水、会话、凭证、数据库备份和运行密钥不提交到 Public 仓库；公开数据为表结构、菜单权限、两个明确标注且零库存的示例商品、分类和初始化说明。

## 版本、环境和证据

- backend：`b7b42d5b3f7aa472e0588ba39a025254b221145f`。
- admin：`2e80dba4465f709ca1dc8496082b65e9ece2794d`。
- app：以包含本报告的提交为准；`git rev-parse HEAD` 可取得完整版本，最终三仓远端/本地提交核对保存到私密发布记录。
- 宿主机：macOS ARM64，Node 26、Java 17、本机 MySQL/Redis/Nginx；使用随机隔离数据库、账号和端口，测试结束清理本次资源，不操作原业务库。
- 容器：隔离 Colima Linux ARM64，MySQL 8.4、Redis 7.4、Java 17、Node 22、Nginx 1.28。实际从源码构建四个镜像，不是仅验证 Compose 语法；六个常驻服务健康，初始化服务正常退出。
- 本次独立代理复核因额度限制未能执行，**仅自审**。未借用以往独立评审冒充本轮评审。

以下 E 均指 app 本机 `.local/deployment/`，已被 Git 与 Docker 构建上下文排除。私密原始日志保留在本地；GitHub 仅发布本摘要，不上传凭据、SQL 备份或运行日志。

| 实际命令/检查 | 时间（2026-09-30，北京时间） | 退出码/结果 | 证据 |
| --- | --- | --- | --- |
| `npm run verify:deploy:local` | 18:55:44–18:56:30 | 0；7 组真实宿主机集成通过 | E/munzored7b25e0/result.json；逐命令日志 |
| `DOCKER_CONTEXT=colima-xinrui-deploy-check TEA_COMPOSE_PROJECT=xinrui-deploy-check bash deploy/deploy.sh` | 当日容器构建与启动 | 0；真实构建、初始化、健康检查和代理读取通过 | 当次终端输出；E/docker-final-utf8/result.json 复核实际运行容器 |
| `node .local/deployment/docker-check.mjs` | 18:54:31–18:54:41 | 0；5 组真实容器检查通过 | E/docker-final-utf8/result.json；本机验证脚本 |
| `npm test` | 18:58:27–18:58:31 | 0；87/87，无跳过 | E/final-gates.json；node-tests-final.log |
| `npm run test:deploy` | 18:58:32 | 0；2/2，无跳过 | E/seed-tests-final.log |
| `bash -n deploy/{deploy,compose,backup}.sh`（分别执行） | 18:58:32 | 全部 0 | E/final-gates.json；syntax-*.log |
| Java、H5、后台构建 | 宿主机与容器各实际执行 | 0 | 宿主机 result.json 与 java-build/h5-build/admin-build.log；Docker 构建终端输出 |

宿主机记录中两次初始化 **预期退出 1**，用于证明拒绝覆盖非空库/中断库；它们是负向断言通过，不是吞掉失败。87 项原回归包含内存业务、组件/请求 Mock 和 HTTP 检查，不全部称为真实集成。2 项部署种子测试是数据契约/内存测试，与真实宿主机、容器和浏览器检查分开报告。

## 问题与修复

| 编号 | 复现、预期与实际 | 根因/影响 | 修改位置 | 验证 |
| --- | --- | --- | --- | --- |
| D-F01 | 新生成管理员凭据应可登录；最初 48 位密码被真实登录拒绝 | 若依已有登录约束最长 20 位，生成器未遵守 | deploy/deploy.sh；backend DeploymentInitializer；本地集成脚本 | 改为 20 位随机密码、保留原登录校验；真实验证码开启，宿主机与容器均成功登录 |
| D-F02 | 中文应能经 SQL 查询和页面读取一致；初次容器验收 SQL 输出问号 | MySQL CLI 未显式指定字符集；浏览器与 HTTP 原始数据正常 | 本机 Docker 检查与 scripts/verify-deployment.mjs 的 SQL 客户端增加 utf8mb4 | 原失败 E/docker-final/result.json 保留；修后中文 SQL、H5 一致，备份恢复哈希一致 |
| D-F03 | 旧初始化 SQL 含 DROP TABLE，不可重跑覆盖业务数据 | 直接重复导入基础脚本有数据破坏风险 | backend DeploymentInitializer：空库门禁、数据库互斥锁、初始化标记、事务 | 新库成功；重复不改密码/数据；非空/中断库退出 1 且原表记录不变 |
| D-F04 | 容器中的私有引擎需供 Java 访问，但不能公开端口 | 既有引擎默认仅监听回环 | shared-engine.mjs 可配置绑定地址；compose 内部网络，无主机端口映射 | 容器真实业务请求通过；配置断言 MySQL/Redis/引擎/Java 均无公网映射，缺省非容器仍绑定回环 |

新增测试初次编写时还暴露了两处测试参数错误：后台商品集合在 `data.rows`，商品更新需传价格。测试已按实际接口契约纠正，没有删除服务端校验或弱化业务结果断言。初始失败文件保留在 E/munxq15l8e31d4 等目录。

## 部署验收表

| 功能编号 | 操作入口 | 角色 | 预期业务结果 | 接口与数据 | 验证方式 | 当前状态 | 证据位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D01 | deploy.sh 配置准备 | 运维 | 随机独立凭据，文件 600，重跑不换密钥 | .local/deploy/.env | 真实文件/重复命令断言 | 已实测通过 | 宿主机组 1 |
| D02 | init 服务 | 运维 | 新库完整建表、菜单角色与公开种子 | sys_*、tea_business_state | 真实 Java/MySQL | 已实测通过 | 宿主机组 2；容器组 1 |
| D03 | 重复初始化 | 运维 | 不重置管理员、不覆盖保存数据 | 初始化标记、密码散列、状态哈希 | 真实 SQL 前后比较 | 已实测通过 | 宿主机组 3/7；容器组 4 |
| D04 | 非空/部分初始化库 | 运维 | 明确失败，原数据不变 | sentinel、initializing 标记 | 真实负向命令/SQL | 已实测通过 | 宿主机组 4 |
| D05 | 两个 Nginx 入口 | 游客 | 静态资产、真实 API 和商品图片可用 | /app、/prod-api、/h5 | 真实 HTTP/MIME/浏览器 | 已实测通过 | 宿主机组 5；容器组 2 |
| D06 | 后台登录与未登录访问 | 管理员/游客 | 随机密码可登录，验证码开启，未登录业务 401 | captchaImage/login/admin/tea | 真实 HTTP、隔离 Redis 验证码、JWT | 已实测通过 | 宿主机组 5/6；容器组 2/3 |
| D07 | 商品编辑跨端同步 | 管理员/游客 | 后台修改→SQL持久化→H5展示一致 | products/1001、getDetails、state_json | 真实 HTTP/SQL；首页浏览器观察修改值 | 已实测通过 | 宿主机组 6；容器组 3 |
| D08 | 后端重启 | 运维/游客 | 已保存商品不丢失 | MySQL、Java | 实际重启后重新请求 | 已实测通过 | 宿主机组 7；容器组 4 |
| D09 | 私密备份及恢复 | 运维 | 备份 600，在隔离新库恢复哈希/版本一致 | mysqldump、state_json/revision | 真实 Docker MySQL 导出/恢复 | 已实测通过 | 容器组 5；备份不入 Git |
| D10 | 容器数据隔离 | 运维 | 仅 Web 回环端口，数据卷持续保存 | Compose 网络/端口/卷 | 配置断言、实际服务健康/重启 | 已实测通过 | 宿主机组 1；容器组 1/4 |
| D11 | 首页、游客商品点击、后台登录页 | 游客/管理员 | 示例商品显示，受限详情提示登录，验证码可见 | 实际 18000/18001 页面 | 实际浏览器，所查窗口错误/警告为空 | 已实测通过 | 当次工具记录；E/browser-check.json |
| D12 | 无商品 empty 初始化模式 | 运维 | 无示例商品的全新库 | TEA_SEED_MODE=empty | 本次只执行默认 sample 模式 | 未测试 | 不从 sample 通过推定 |
| D13 | 真实用户/订单私密迁移 | 运维 | 数据与上传文件完整私密迁移 | 现有数据库/上传卷 | 本轮未操作原数据 | 未测试 | 需要单独私密迁移范围 |
| D14 | 公网 HTTPS/生产容量/告警/生产恢复 | 运维 | 目标生产环境可运维 | 域名/证书/服务器 | 未提供目标环境与容量目标 | 环境阻塞 | 部署不等于生产验收 |
| D15 | 全部业务页面/真机/第三方服务 | 各角色 | 完整业务闭环 | 历史页面范围及外部依赖 | 本轮未做全量验收 | 未测试 | 原报告中的失败与阻塞仍有效 |

浏览器检查没有填写验证码或提交管理员登录表单；管理员实际登录和保存由独立 HTTP 集成完成。没有把浏览器登录页可见冒充管理端全部页面已测试。

## 一键使用与最少人工事项

按 [部署说明](../deploy/README.md) 执行：

```bash
git clone https://github.com/jiangyi3265/xinrui-tea-app.git
cd xinrui-tea-app
bash deploy/deploy.sh
```

前置 Docker Engine/Desktop、Compose v2+、Git、Bash、OpenSSL 和依赖仓库网络可达。脚本自动取得另外两仓，生成私密凭据，只初始化空库；全部服务健康且真实 API 读到有效业务数据才退出 0。失败退出非零，不自动删库或绕过鉴权。后台 `admin` 密码读取部署机器 `.local/deploy/admin-login.txt`，登录页的预填值不是该随机密码。

可再次运行 `npm run test:deploy` 和 `npm run verify:deploy:local`；后者宿主机依赖、隔离数据与清理方式见部署说明。原商业发布验收仍用 `npm run verify:nonpay`，本次未重跑该全范围入口，也未移除其已有发布阻塞。

不需要用户重做上述机械验证。正式上线还需要：确认实际商品/库存及图片使用权；提供目标服务器、域名与容量目标；若需原有会员/订单数据，明确私密迁移源与目的地，先备份并在隔离环境验迁。真实数据不能因“一键部署”进入公开仓库。

本次没有生产迁移。恢复策略是保留代码版本、数据库、上传卷和私密 .env；只在隔离库恢复演练，不能以 `down -v` 或删库作为回滚。容器初始化器不承担旧库自动升级职责。
