# 共享三端独立子代理复核报告

复核时间：2026-09-25（Asia/Shanghai）  
复核者：独立子代理复核（只读业务复核）  
复核范围：`server/shared-api.mjs`、`server/shared-engine.mjs`、`server/demo/auction.mjs`、`RuoYi-Vue/ruoyi-admin/src/main/java/com/ruoyi/web/tea/*`、`RuoYi-Vue/sql/tea_business.sql`、共享回归测试和最终集成证据。  
执行边界：未修改业务代码；只更新本报告。直接执行了共享 API 单测；最终共享集成、构建和备份恢复证据为复读工作区中主流程产生的独立证据，不冒充本轮重新执行。

## 当前结论

本轮安全修复已成立，且没有发现会推翻已覆盖核心闭环的新权限或事务漏洞：

- 会员与管理员是两个身份域；Java 管理入口从 RuoYi JWT/`SecurityUtils` 构造 actor，客户端提交的 `actor` 不会提升权限。
- 业务状态由 MySQL `tea_business_state` 行锁和事务提交；引擎失败不会提交部分状态。
- 凭证上传已改为真实 multipart 鉴权，并绑定到上传会员的短期 SHA-256；直接伪造 data URI 不能提交业务凭证。
- 登录/交易密码失败限速使用 Redis；会员停用会吊销既有会话；交易密码限速不会因重新登录换 token 绕过。
- SQL 已包含茶叶角色模板及 `sys_role_menu` 分配语句，角色和隔离数据库恢复均有最终集成证据。
- shared 模式不再因读取商品目录而隐式创建 demo 拍卖场次；库存 0/3 且缺少 schema marker 的回归已通过，库存不变。
- multipart 图片先用 `ImageReader` 检查尺寸，再解码像素；4096 单边、800 万像素上限和超大 IHDR 拒绝均有回归证据。
- 支付开关不是本轮缺陷：前端按 `10=开启、20=关闭` 解释；共享模式第三方支付为关闭，余额/积分为开启；`pages-classify-submit.js` 与 `/wx/payGateway` 语义一致。

当前仍不满足完整商用发布条件。阻塞项是：短信注册和第三方服务未接入、提现申请/打款未形成闭环、卖方收款关联与二次结算规则未完成、聚合 JSON 状态的生产容量和敏感数据风险尚未解决，以及完整页面/真机验收未覆盖。故本报告结论是“共享 MySQL 本地集成范围通过，完整发布仍阻塞”。

## 直接实测与复读证据

### 本轮直接执行

命令：

```text
cd /Users/jiangyi/Desktop/程序/分销茶叶总/分销茶叶
node --test tests/shared-api.test.mjs
```

时间：2026-09-25 18:55（Asia/Shanghai）  
结果：退出码 0，10/10 通过，约 2.42 秒。

这 10 条回归实际判断了：零资产会员、凭证跨账号/跨业务复用、充值驳回不入账、内容脚本拦截、停用会话吊销、外部服务不假成功、非法商品拒绝、未验证图片拒绝、shared 拍卖不隐式造场次、下单请求幂等和库存只预占一次。

### 工作区中最终集成证据（本轮只读复核）

证据目录：

`/Users/jiangyi/Desktop/程序/分销茶叶总/分销茶叶/.local/shared/mugufxfie05b17/`

- `integration-results.json`：INT-01～INT-15 全部“已实测通过”，包括真实 RuoYi JWT/RBAC、会员登录与零资产开户、商品事务回滚、真实 multipart 上传、下单/支付幂等、并发竞价、凭证审核、公告内容、停用吊销、Redis 交易密码限速、引擎故障 503 且 revision 不变、全服务重启恢复、隔离数据库备份恢复。
- `commands.jsonl`：`npm test`、Java Maven package、H5 build、RuoYi-Vue3 `build:prod` 子命令均退出码 0。
- `node-tests.log`：最终 46 条 Node 测试通过。
- `persistence-summary.json`：revision 36、3 members、1 product、1 order、1 auction、1 settlement、36 audit rows。
- `restore-result.json`：隔离 schema 的 state SHA-256、revision、审计/凭证/角色菜单计数一致。

`npm run verify:shared -- --release` 的总退出码为 1，是脚本按已知外部/业务/UI阻塞主动触发的发布门禁，不是 INT-01～15 或构建断言失败；最终证据目录和 `latest-verification.json` 的 `releaseReady:false` 均指向 `mugufxfie05b17`。

## 独立代码复核

### 已确认没有新问题的修复点

1. **Java 事务和失败回滚**：`RuoYi-Vue/ruoyi-admin/src/main/java/com/ruoyi/web/tea/TeaBusinessService.java:44-103` 对状态行 `FOR UPDATE`，引擎只在成功码下更新 JSON、凭证 claim 和审计；异常由 Controller 返回 503，失败状态不提交。
2. **客户端 actor 防伪**：`TeaController.java:41-44` 只从 `SecurityUtils` 取管理员身份；`/app/**` 以 member token 进入，`/app/_*` 被拒绝；共享引擎只接受 Java 私有 secret。共享回归还实际提交了伪造 body actor 并确认拒绝。
3. **凭证归属和真实性**：`TeaController.java:90-109` 要求已登录会员、multipart、1MB 上限、`ImageIO.read` 成功及 PNG/JPEG/GIF magic；`shared-api.mjs:53-56,98-104,184-205` 用上传会员的 hash 有效期和全局 claim 约束充值、结算、服务费凭证。旧的“4 字节伪 PNG 直接入账”问题已被 `tests/shared-api.test.mjs` 和 INT-12/06 覆盖，当前不能再报告为存在。
4. **Redis 失败限速**：`TeaBusinessService.java:49-90` 用 engine secret 派生 login/pay subject key，失败累计十分钟、达到 5 次拒绝，成功清除；INT-14 已用重新登录后的新 token 验证不能绕过。
5. **角色模板**：`RuoYi-Vue/sql/tea_business.sql:91-99` 创建 `tea_operator`、`tea_finance`、`tea_content`、`tea_warehouse` 并写入 `sys_role_menu`；INT-01、INT-15 验证了角色接口权限和隔离恢复。该项已不再是“SQL 没有菜单分配”。
6. **退出生命周期**：`RuoYi-Vue/ruoyi-framework/src/main/java/com/ruoyi/framework/manager/ShutdownManager.java:23-37` 使用 `@PreDestroy` 关闭已注入的 `scheduledExecutorService`；最终 Java package 和重启集成证据通过。
7. **shared 拍卖种子隔离**：`server/demo/auction.mjs:86-91` 在 `store.mode === 'shared'` 时只写 schema marker，不创建 demo 场次；`tests/shared-api.test.mjs:73-83` 实测库存 0 和 3、无 marker 两种情况均返回空列表且库存不变。此前“零库存自动拍卖展示”风险已关闭；demo 模式保留 fixture 种子属于非生产演示路径。
8. **图片解压资源限制**：`TeaController.java:102-115` 先通过 `ImageReader` 读取宽高，限制单边 4096、总像素 800 万，再调用 `reader.read(0)`；`scripts/verify-shared.mjs:95-105` 用 50000x50000 IHDR 实测返回 400 且 MySQL revision 不变。此前“只校验文件大小、不限像素”风险已关闭。

### 新发现的实际风险

#### [P2] 聚合 JSON 状态的生产容量和敏感数据风险仍存在

位置：`RuoYi-Vue/sql/tea_business.sql:3-9`、`server/shared-engine.mjs:15-24`。

会员 session、支付配置、账本、凭证 data URI 和业务记录集中于一行 `LONGTEXT`；引擎请求体上限 32MB，所有业务争用同一行锁。当前集成证明了事务、重启和备份恢复，但没有容量压测、字段加密、session 哈希/轮换或按业务表拆分证据。该风险不会否定当前本地共享模式，但不能据此宣称生产容量或敏感数据合规。

## 明确保留的发布阻塞

这些是代码/接口当前明确未完成的业务，不应被 46 条 Node 测试或 15 组集成查询掩盖：

1. **短信注册/验证码及第三方服务**：共享路由拒绝未接入的短信、微信/支付宝、实名、银行卡、物流和外部回调；当前没有真实凭据、签名、重试、对账或回调验收。
2. **提现**：`/member/getApplyList` 只能查询已有 `withdrawals`；共享管理集合对 `withdrawals` 只支持 GET，PUT 会返回“不支持的修改”，没有申请、风控、打款、回调和幂等闭环。
3. **卖方收款关联与二次结算**：`/member/setPay` 明确返回身份核验未开放；拍卖结算当前使用平台收款配置，缺少卖方账户归属、冻结、分账和退款规则。
4. **页面和设备范围**：集成脚本验证了 H5/静态入口配置、CORS 和关键 HTTP 闭环，但不是全部 81 页面、真实第三方沙箱或真机/多浏览器矩阵；不能宣称所有平台兼容。

## 最终复核结论

本复核是“独立子代理复核”，不是主代理自审。就当前代码和证据，Java RuoYi JWT、独立会员身份域、共享 MySQL 事务/回滚、真实上传归属、Redis 限速、角色菜单模板和核心订单/拍卖/凭证流程没有发现新的高危回归；支付开关也已按 10/20 语义核对无误。

两项上一轮发现的风险已由本轮代码和回归关闭；本轮没有发现新的高危回归。提现、卖方收款/二次结算、外部服务、聚合 JSON 生产化和完整设备验收仍是发布阻塞。因此不能把当前版本描述为“全部功能完成”或“满足完整商用发布条件”。
