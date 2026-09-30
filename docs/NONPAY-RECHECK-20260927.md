# 非支付业务再次复查（2026-09-27 08:53 最终版本）

## 结论

本次新增发现并修复两个共享订单缺陷，另补齐一个底层后台保护。最终 **87/87 Node 测试、25 组真实 HTTP/SQL 检查、Java/H5/若依后台构建通过**，没有跳过失败测试。原前端样式未修改。

**当前不满足所列范围的发布条件。** 预约、分佣、二次寄卖/拆单/提货等未完成流程，短信/实名/承运商环境以及正式部署/设备/容量验收仍是阻塞。本轮通过不等于全部功能无问题或达到商用。

完整业务范围继续以 [30项验收表](NONPAY-ACCEPTANCE-REPORT.md#④-完整验收表) 和 [81页范围表](NONPAY-PAGE-MATRIX.md) 为准；本报告补充新发现并更新最终版本证据，不把以前“未测试/环境阻塞/失败”升级为通过。

## 本轮问题与验收

| 编号 | 操作入口/角色 | 原实际与根因 | 预期业务结果、修改位置 | 验证方式 | 当前状态 | 证据 |
| --- | --- | --- | --- | --- | --- | --- |
| RC01 | 普通/积分下单；会员 | 明确传入无效或他人地址ID，仍静默使用本人默认地址并预占库存；commerce地址查找直接fallback | 明确选择失效时拒绝，不换目的地、不创建订单/扣库存；未传ID保留默认预览，订单保存独立地址快照。server/demo/commerce.mjs | 内存：两路由×GET/POST×错误/他人ID；真实HTTP：两路由×余额/积分；SQL全state/revision不变 | 已实测通过 | order-safety第1/2项；INT25 |
| RC02 | 两个确认收货接口；本人/他人 | 已评价完成后再次收货，status从completed回到evaluation；收货逻辑未检查已收货 | 重试成功但保持完成/评价记录，不倒退、不重复写；commerce.mjs | 内存、两个别名跨入口并发、跨用户拒绝、H5/API与后台重读completed、SQL全state/revision不变 | 已实测通过 | order-safety第3项；INT25 |
| RC03 | 拍品下架；管理员 | 底层adminBusinessApi仅防库存修改/删除，没有防下架；演示兼容入口可将活跃预占拍品隐藏 | 活跃预占时拒绝下架；取消释放后可下架。server/admin-api.mjs | scheduled/running×共享/底层；取消后库存返还再下架 | 已实测通过 | order-safety第4项；独立复核 |
| RC04 | 后台订单/会员订单；管理员/会员 | 检查重启后的读取一致性 | T10010两端显示待收货，后台保留承运商与运单；旧测试数据不删除 | 实际浏览器只读、独立SQL，非自动UI runner | 已实测通过 | E/browser-orders-{admin,h5}.png、browser-sql.json |

RC03 影响边界：真实共享入口原本就会因参数校验/活跃库存保护拒绝这类更新，未复现共享生产接口可直接下架；本次是补齐底层防线，不把演示模式问题夸大为生产越权。底层修复不自动清理已有异常业务数据；本地预览的“已评价但非completed”只读检查返回空数组。

## 复现、修复及失败记录

证据目录 R：`../.local/rechecks/20260927-orders/`。

- [修前订单日志](../.local/rechecks/20260927-orders/before-order-safety.log)：3项中2项失败，实际exit1；证明RC01/02存在。
- [修前底层拍品下架日志](../.local/rechecks/20260927-orders/before-auction-unpublish.log)：4项中下架保护失败，exit1。
- [修后定向日志](../.local/rechecks/20260927-orders/after-order-auction-verified.log)：18/18、exit0。
- [定向命令/时间/退出码](../.local/rechecks/20260927-orders/commands.jsonl)。

加入底层保护后，旧admin-api中两项测试直接下架默认活跃拍品30，被正确拒绝，导致 `.local/shared/muj3tknmeffe8b/node-tests.log` 整体验收失败。按“下架前先关闭预占”的验收依据，给这两项增加真实API取消场次前置；保留原隐藏、无法下单、商品数量断言。第一次前置误从close响应读取stockReleased（该响应没有字段），定向测试再次失败；已改为验证持久state标记和确切库存返还数量。所有失败日志保留；没有删除测试、跳过或弱化原断言。

## 最终可复查证据

E：`../.local/shared/muj3v8b2ca579f/`。本机macOS、Node26、Java17、MySQL9.6、Redis。最终统一运行于 **08:53:54–08:54:43（Asia/Shanghai）**。

- [统一结论](../.local/shared/muj3v8b2ca579f/run-result.json)：`npm run verify:nonpay` 总exit **1**，因为必要业务/外部环境/完整页面尚未通过，不是25组集成失败。
- [命令与退出码](../.local/shared/muj3v8b2ca579f/commands.jsonl)：npm test、Maven package、H5构建、admin build:prod均exit0。
- [87项Node日志](../.local/shared/muj3v8b2ca579f/node-tests.log)、[25组真实集成结果](../.local/shared/muj3v8b2ca579f/integration-results.json)、[持久化摘要](../.local/shared/muj3v8b2ca579f/persistence-summary.json)。Node包含内存/组件Mock/构建测试，不统称真实集成。
- [源码版本指纹](../.local/shared/muj3v8b2ca579f/source-manifest.json)：保留3仓库HEAD及未提交/未跟踪变更SHA-256；最终SQL采集同时核验 **62个源码文件**，均匹配。未提交Git，未覆盖用户既有改动。
- [预览SQL/审计](../.local/shared/muj3v8b2ca579f/browser-sql.json)：08:56:05采集，revision38，商品库存8、无出价场次已结束并释放库存、运单保留。执行 `node .local/shared/muj3v8b2ca579f/capture-browser-sql.mjs`，exit0。
- [浏览器记录](../.local/shared/muj3v8b2ca579f/browser-recheck.json)：本轮没有在UI下单/支付/确认收货/修改凭据；接口并发边界由真实HTTP/SQL验证，浏览器只读不能替代这些测试。
- [独立复核](NONPAY-INDEPENDENT-REVIEW.md)：直接阅读差异和测试证据，并独立运行限定测试；不是只有主代理自审。
- [最终检查记录](../.local/shared/muj3v8b2ca579f/final-checks.json)：3仓库git diff --check均exit0；Java/admin仅历史CRLF提示，未批量格式化。

隔离自动测试库 `tea_local_muj3v8b2ca579f` 与浏览器预览库 `tea_local_mugt1d0g0ccd8e` 分开。预览已按当前代码重启，保留数据；自动测试服务已停止。截图与摘要仅含隔离测试信息，不公开配置/令牌/备份。

## 一键复查及最少人工事项

在 `分销茶叶` 目录执行 `npm run verify:nonpay`。前置：Node>=22、Java17、Maven、本地MySQL/Redis、依赖已安装，测试端口15173/15180/15174/18080/18091可用。脚本自动创建隔离库及虚拟数据，完成构建、接口、数据库、并发、权限、重启和恢复检查。日志和测试库保留；清理前应逐次确认精确目标，不删除生产数据。

只有必要业务、页面和环境均完成后才允许发布门禁成功；目前退出1是预期真实结论，不能通过移除阻塞清单来“通过”。无需用户重复本轮机械检查。仍只需此前集中列出的业务规则、非支付服务商沙箱配置位置、第三端定义及正式部署/容量目标；没有新增需要用户代测的事项。
