# xinrui-tea-app · 鑫芮茶业 H5 用户端

恢复并维护茶叶商城 H5 页面，通过 xinrui-tea-backend 提供的共享接口与 xinrui-tea-admin 管理后台联动。

## 项目简介

本项目包含从既有 H5 发布资源恢复的 81 个页面路由、可维护页面模块、自定义构建脚本和本地业务服务。商品、分类、订单、物流、会员、拍卖与内容等已有共享接口；原页面风格保留。仓库同时包含独立 demo 模式与供 Java 调用的私有 Node 兼容引擎，二者不是同一种运行环境。

共享模式架构：H5/后台 → 若依 Java 鉴权及数据库事务 → 私有 Node 业务引擎 → Java 提交 MySQL 状态。当前 MySQL 业务状态采用聚合 JSON。已接入后台开户、站内预约、订单收货分佣、提现审核和凭证登记、寄卖成交、拆分及提货；短信自助注册已删除，真实微信/支付宝支付按要求不接入。身份资料采用人工核验，物流显示商家登记信息，提现由财务实际打款后登记凭证。分佣与手续费默认零，后台可配置。当前功能验收覆盖 H5、管理后台和 Java API，不代表原生真机、外部认证、承运商实时轨迹或生产容量验收。最新证据见工作区根目录《三端完整联调与上线报告.txt》。

## 技术栈

- JavaScript ES Modules、Node.js 22+、原生 HTTP 服务。
- uni-app/Vue 页面与恢复后的 H5 运行时；Vue SFC/HBuilderX 入口文件保留。
- esbuild、Acorn、fflate、自定义静态构建与发布包检查。
- Node.js 内置 node:test；内存/组件 Mock、真实 HTTP/SQL 集成验收。
- 共享服务依赖若依 Java、MySQL、Redis；独立 demo 使用浏览器或本地 JSON 状态。

当前实际验证目标为 H5 浏览器，不声称已完成原生 App、微信小程序或真机验收。

## 关联仓库

| 项目 | 说明 | GitHub |
| --- | --- | --- |
| xinrui-tea-backend | 后端服务 | [xinrui-tea-backend](https://github.com/jiangyi3265/xinrui-tea-backend) |
| xinrui-tea-admin | 管理后台 | [xinrui-tea-admin](https://github.com/jiangyi3265/xinrui-tea-admin) |
| xinrui-tea-app | 用户端 | [xinrui-tea-app](https://github.com/jiangyi3265/xinrui-tea-app) |

## 快速启动

### 一键部署（包括新数据库）

服务器已有 Docker Engine/Compose、Git、Bash、OpenSSL 时，在本仓库运行：

```bash
bash deploy/deploy.sh
```

自动克隆相邻的 backend/admin 源码，构建并启动真实 MySQL、Redis、Java、私有 Node 引擎及两个 Nginx；首次导入表结构和公开示例商品。默认入口为本机 18000/18001，随机管理员密码在 `.local/deploy/admin-login.txt`。真实业务数据、备份与密钥不会公开上传。完整配置、数据范围和备份操作见 [部署说明](deploy/README.md)。这不代表原商业发布阻塞已经解决。

### 独立 H5 演示（无真实支付/短信）

```bash
npm ci
npm run dev
```

访问 `http://127.0.0.1:5173/index`。默认是 demo 服务；演示资产、验证码和固定测试账户不用于生产。Node 服务不会自动加载 `.env`，配置需通过启动进程环境传入。

静态预览：

```bash
npm run build
npm run preview
```

### 真实共享接口本地联调

三个仓库的本地目录名应保持为下面的名称（联调脚本按相邻目录定位）：

```bash
git clone https://github.com/jiangyi3265/xinrui-tea-backend.git RuoYi-Vue
git clone https://github.com/jiangyi3265/xinrui-tea-admin.git RuoYi-Vue3
git clone https://github.com/jiangyi3265/xinrui-tea-app.git 分销茶叶
```

需 JDK 17、Maven、本地 MySQL 和 Redis，以及后台依赖。准备阶段仅限隔离开发机：

```bash
cd ../RuoYi-Vue3
npm ci
cp .env.development.example .env.development
cd ../分销茶叶
npm ci
npm run local:shared
```

脚本创建新的 `tea_local_*` 测试库、生成独立随机服务密钥并启动三个仓库。支持 `MAVEN_BIN`、`JAVA_HOME`；数据库可通过 `TEA_MYSQL_DEFAULTS` 指定本机 MySQL defaults 文件，Java 连接凭据通过 `DB_USERNAME`/`DB_PASSWORD` 提供，二者须使用同一数据库账号。本机 MySQL/Redis 的端口及其他约束请查 `scripts/shared-stack.mjs`，不要将脚本用于生产初始化。

入口：H5网关5173、独立H5静态站5180、若依后台5174、Java8080；Node引擎8091只用于内部通信。所谓“三端联调”在当前源码里指这些共享入口，不等于存在独立小程序源码。

### 构建与验收

```bash
npm test
npm run verify:nonpay
```

`verify:nonpay` 会执行 Node 回归、Java/H5/后台构建、真实接口和 SQL、角色/用户隔离、并发幂等、重启和隔离恢复检查。必须条件尚未齐备时会退出1，不能以删除阻塞清单来制造发布通过。

正式 H5 构建要求通过环境配置 `H5_API_BASE` 为公开 HTTPS 的 `/app` API 地址，再运行 `npm run build:release`；未设置会失败，避免把 demo 包误作正式产品。产物在 `dist/` 和 `dist.zip`，不纳入 Git。

## 项目结构

| 路径 | 用途 |
| --- | --- |
| src/pages/ | 恢复并维护的页面业务模块 |
| src/runtime/、src/browser/ | H5运行时及浏览器适配 |
| src/chunks.json、src/shell.html | 模块重组索引及HTML入口 |
| reference/runtime/ | 重建H5所需原始资源基线，不是本次生成的dist |
| server/ | demo服务、共享业务适配、私有引擎 |
| scripts/ | 构建、静态预览、联调和验收脚本 |
| tests/ | Node业务、页面契约、构建与接口回归 |
| docs/ | 页面清单、验收报告和剩余阻塞 |
| pages/、App.vue、manifest.json | 保留的uni-app/HBuilderX入口 |

## 当前验收状态

最近一次业务复查（2026-09-27）记录87项Node测试、25组HTTP/SQL检查及三套构建通过；这不是2026-09-30公开导入时重新执行全业务验收的声明。**当前仍不满足所列范围的发布条件。**

- [本轮复查报告](docs/NONPAY-RECHECK-20260927.md)
- [完整非支付验收范围](docs/NONPAY-ACCEPTANCE-REPORT.md)
- [81页范围表](docs/NONPAY-PAGE-MATRIX.md)

报告中的 `.local/` 证据、数据库、配置与日志只保留本机，不随公开仓库上传；可按上述命令重新生成隔离验收证据。

## 简历描述示例

参与茶叶商城H5工程恢复与维护，在保留原界面的基础上对接若依共享接口，实现商品、订单履约和竞价拍卖的数据联动。编写业务回归与跨端HTTP/SQL验收，覆盖越权、库存、重复提交和服务故障场景。

## 安全与来源

真实配置、`.local/` 数据、凭据、日志、上传、依赖和构建包均不上传。代码中的公开demo/隔离测试凭据仅用于生成测试数据，不可作为生产账户。保留已有静态资源与上游许可证；公开仓库不代表第三方图片、品牌或依赖获得额外使用授权。

已移除原始H5资源内嵌的腾讯地图Key。若需要地图能力，应在应用加载前通过部署端运行时配置注入 `window.__TEA_QQ_MAP_KEY__`，使用自己的浏览器端Key并限制允许访问的域名；未配置时不调用原项目的Key。该浏览器配置不得存放服务端AppSecret，真实配置不要提交到仓库。
