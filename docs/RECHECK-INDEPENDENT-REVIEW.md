# sharedH5 会员资金与权限独立复核

复核时间：2026-09-25（Asia/Shanghai）  
复核者：独立子代理复核（只读；本报告为本人唯一写入文件）  
范围：`server/shared-api.mjs` 复用的 sharedH5 会员接口，以及相关 H5 支付/转赠页面；重点为 `/member/toTransfer`、`/pay/pointsPayment`、`/pay/balancePay`、`/order/toPayGoods`、`/order/evaluation`、`/order/toOrderReport` 和地址接口。  
边界：未修改业务代码、未启动会占用集成端口的全栈；本轮本人实际执行的是内存 shared store 与 Node 回归。最终真实 HTTP/SQL 结果仅作为主代理生成的证据读取并单独标注。

## 结论

本轮没有发现上一版报告所列三组资金/权限缺陷在当前代码中的新复现：

1. 支付接口现在按订单固化的 `pay_type/order_type` 绑定余额或积分，切换支付科目被拒绝。
2. 转赠现在要求稳定 `request_id`，金额限制为正数且最多两位小数；相同请求重试只返回原结果，不重复写双边流水。
3. `toPayGoods` 对未接入的第三方支付类型返回业务失败，不再以 `code=1` 携带缺失的 `payment/jump_url`。

本人内存复测 `node --test tests/shared-api.test.mjs` 为 17/17 通过；另以自定义只读复现覆盖了跨会员支付/订单、支付凭证修改、转赠双向余额守恒。主代理最终真实验收证据显示 INT-01～INT-19 全部“已实测通过”，但 `run-result.json` 的总退出码仍为 1，原因是已知外部/业务/UI 范围未满足发布条件。因此，本报告不把当前版本写成全范围可发布。

## 修复前历史证据（保留，不代表当前状态）

以下是上一轮在同一内存 shared store 的实际复现，保留用于证明本轮复测针对的是原问题：

- 普通订单 `pay_type=2` 调 `/pay/pointsPayment` 曾返回 `code=1` 并扣积分；积分订单 `pay_type=4` 调 `/pay/balancePay` 曾返回 `code=1` 并扣余额。
- 相同无幂等键的转赠请求曾重复扣/入账；`price="0.001"` 曾返回成功并留下金额 `0.00` 流水。
- `toPayGoods` 传第三方 `pay_type=1/3/5/6` 曾返回 `code=1`，但 shared 层删除了 `payment/jump_url`，H5 成功分支仍会读取缺失字段。

这些历史输出不能作为当前失败结论；当前状态见下一节和状态表。

## 当前修复复测

### 支付通道绑定

代码位置：`server/shared-api.mjs:170-180`。接口先找到当前会员自己的订单，再计算订单固化通道和请求通道；通道不一致或不属于余额/积分时直接失败。订单待支付状态也在 `toPayGoods` 中检查。

本人内存复测输入与结果：

```text
普通订单：pay_type=2、order_type=4；调用 /pay/pointsPayment + 正确交易密码 -> code=0
积分订单：pay_type=4、order_type=5；调用 /pay/balancePay + 正确交易密码 -> code=0
普通订单：/order/toPayGoods 的 pay_type=1/3/5/6 -> 四次均 code=0
```

随后分别用正确通道支付，余额和积分各只扣一次；余额支付带密码重试返回已完成结果，未再次写流水。积分待付款入口先由 H5 `existing_order_id` 加载原订单，再复用同一个交易密码弹窗；`tests/shared-pages.test.mjs` 的组件回归确认不会创建新订单。

### 转赠幂等与金额精度

代码位置：`server/shared-api.mjs:147-168`，H5 请求键生成在 `src/pages/pages-personal-transfer.js:630,675-678`。服务端要求 8～80 位请求键，按收款人和两位舍入金额保存请求哈希；同键不同载荷拒绝，同键同载荷返回同一结果。

本人内存复测：

```text
无 request_id -> code=0
price="0.001" -> code=0，双边余额和流水均不变
price="1.23" + request_id -> 首次 code=1
同 request_id、同收款人、同金额重试 -> code=1，同一 transfer_id，双方各一条流水
同 request_id 改成 price="2" -> code=0，余额不再变化
```

H5 组件回归确认请求键符合服务端格式，支付 PIN 不再通过 `console.log` 输出。自定义跨会员复测还确认 A→B 与 B→A 的两笔合法转赠均按各自会员隔离，双边余额守恒。

### `toPayGoods` 与直接相关绕过

当前 `toPayGoods` 只返回待付款订单号和明确待支付消息；未接入通道不会落入 demo 的模拟支付成功分支。跨会员使用另一会员的 `order_id/trade_no` 调用 `toPayGoods`、`balancePay`、`order/detail` 均被拒绝。

本人还复测了：

- `/member/editMember` 携带 `pay_password`：被拒绝；`/member/setPay` 伪造收款信息：被拒绝。
- 无会员 token 调用资金接口：被登录门禁拒绝。
- 转赠同一请求键不能改收款人/金额；停用收款会员不能接收转赠。
- `/order/evaluation` 只允许当前会员自己的、已收货且未评价订单；重复评价和跨会员订单均拒绝。
- `/order/getOrderReport` 返回 H5 所需订单字段，并按订单归属隔离；地址 detail/delete/edit/setDefault 从当前会员地址集合查找，未发现跨会员地址读写。

有一个可用性注意项：已付款订单再次调用积分支付时，如果没有重新提供交易密码/短时验证，会先得到“请输入正确交易密码”，而不是无密码的“已支付”提示；这不会再次扣款，H5 正常恢复路径会重新打开原订单的交易密码弹窗。本轮将其记录为非资金越权风险。

## 验收状态表

状态值仅使用：`已实测通过／失败／未测试／环境阻塞／不适用`。

| 功能/检查项 | 当前状态 | 证据位置与范围 |
| --- | --- | --- |
| 余额/积分交易密码校验 | 已实测通过 | 本人内存调用；错误密码、无 token 均拒绝 |
| 订单固化支付通道 | 已实测通过 | 本人内存复测；`tests/shared-api.test.mjs:128-137` |
| 关闭第三方通道的 `toPayGoods` | 已实测通过 | 本人内存复测；`tests/shared-api.test.mjs:135` |
| 余额/积分支付不重复扣款 | 已实测通过 | 本人内存复测；最终 HTTP INT-16（证据文件） |
| 转赠收款人停用/自转赠隔离 | 已实测通过 | 本人内存复测；`shared-api.mjs:159-160` |
| 转赠 request_id 幂等 | 已实测通过 | 本人内存复测；`tests/shared-api.test.mjs:138-149` |
| 转赠金额正数与两位精度 | 已实测通过 | 本人内存复测；`.001` 被拒绝且无流水 |
| 转赠持久化、跨入口并发重试 | 已实测通过 | 最终真实 HTTP INT-19（主代理证据，非本人本轮启动） |
| 待付款订单归属 | 已实测通过 | 本人内存跨会员 `toPayGoods/order/detail/payment` |
| H5 积分待付款恢复 | 已实测通过 | `tests/shared-pages.test.mjs:12-25`，使用 `existing_order_id` |
| H5 积分支付密码框金额文案 | 已实测通过 | `paymentLabel()` 与 `tests/shared-pages.test.mjs:22-24`；最终 E Node/build/浏览器证据 |
| H5 转赠稳定请求键与 PIN 不泄漏 | 已实测通过 | `tests/shared-pages.test.mjs:27-34` |
| 后台现金成交额排除积分订单和未付款预占 | 已实测通过 | `tests/shared-api.test.mjs:15-23`；最终 E Node/浏览器证据 |
| 后台热销数量只计已付款件数、销售额按已付现金订单 | 已实测通过 | `tests/shared-api.test.mjs:15-23`；最终 E Node/浏览器证据 |
| 后台订单/仪表盘积分金额显示积分单位 | 已实测通过 | 最终 E 浏览器证据；`RuoYi-Vue3/src/views/tea/dashboard.vue`、`orders.vue` |
| 评价归属与重复评价 | 已实测通过 | 本人内存复测；最终 HTTP INT-16（主代理证据） |
| 投诉字段/归属/处理结果重读 | 已实测通过 | `tests/shared-api.test.mjs:119-126`；最终 HTTP INT-17（主代理证据） |
| 地址跨会员 detail/delete/edit/setDefault | 已实测通过 | 本人内存复测 |
| 真实微信/支付宝支付、回调和对账 | 环境阻塞 | 当前配置关闭第三方通道，缺真实商户凭据/回调环境；不以模拟接口代替 |
| 短信注册、第三方短信服务 | 环境阻塞 | 本轮范围无可用短信服务与凭据 |
| 提现规则与卖方收款关联 | 环境阻塞 | 业务规则/收款账户关联尚未提供或接入 |

## 证据索引

### 本人实际执行

```text
命令：node --test tests/shared-api.test.mjs
结果：exit 0；17 tests，17 pass，0 fail
模式：createMemoryStore(..., 'shared') 直接调用 sharedH5/sharedAdmin；未启动全栈
```

另行执行：`node --test tests/admin-api.test.mjs`，exit 0；9 tests，9 pass，0 fail，用于确认管理端订单/仪表盘相关回归未破坏既有管理流程。

另有一次独立内存脚本覆盖跨会员支付/订单、支付凭证修改和双向转赠，进程退出码 0；未把该临时脚本冒充正式测试文件。

### 主代理最终真实证据（读取，不冒充本人执行）

- 证据目录：`.local/shared/mugx9xw9457765/`
- `node-tests.log`：55/55 Node tests 通过。
- `integration-results.json`：INT-01～INT-19 全部 `已实测通过`，包含 INT-16 积分支付、INT-19 转赠并发重试及双边流水持久化。
- `run-result.json`：`npm run verify:shared -- --release`，`exitCode=1`，`localIntegration=已实测通过`，`releaseReady=false`；退出 1 是严格发布门禁因必要业务/第三方/UI 范围未完成，不是上述 Node/HTTP 断言失败。
- `commands.jsonl`：Node 测试、Java package、H5 build、若依管理端 build 均 exit 0。
- `source-manifest.json`：H5 HEAD `a91c7984a0f6174fe25faa71cf7a0bd705e11162`；RuoYi Java HEAD `0cdbba90d69d43de7e931e5fc15f728bc43efb50`；RuoYi-Vue3 HEAD `1e704aaa09590a2a348bf920cd7e31b804cf33f8`；最终 `server/admin-api.mjs` SHA-256 为 `13f80244e4915871295ece52ef5ddb191ae279cb24b1eb63a8ea0ac2d5fc0326`，`tests/shared-api.test.mjs` SHA-256 为 `478cb891c4174ed9b6980eaf7c66082c79d64c221c3a8f52a216b26c8a252364`。

### 最终 UI 与财务统计差异复核（主代理证据读取）

本轮仅复核 `src/pages/pages-classify-submit.js` 的 `paymentLabel()` 及对应组件断言：积分待付款时展示 `支付 50.00 积分`，普通现金订单仍展示 `付款￥20.00`；模板已改为调用该标签函数，未改页面布局或后端接口。`tests/shared-pages.test.mjs:22-24` 同时覆盖两种文案，未发现回归。

证据目录：`.local/shared/mugx9xw9457765/`（主代理最终运行，非本人本轮执行）：

- `node-tests.log`：55/55 通过，exit 0。
- `h5-build.log`、`admin-build.log`、`java-package.log`：H5、RuoYi-Vue3 和 Java 构建均 exit 0。
- `commands.jsonl`：记录了上述命令、时间和退出码。
- `source-manifest.json`：`pages-classify-submit.js` SHA-256 为 `7087190220b6c15e20370ce8fe0bff06e4ea86f9c8666b5b4d42e9721c3c853b`，`dashboard.vue` SHA-256 为 `d38b76d1eef6c3cf5389e4b836238e40db1663da1dbf3a1c0b25ad1ea8e02a6c`，`orders.vue` SHA-256 为 `6b6f891b44ba20b204443730519f72dd68cf0db22157cd3a2f6ab0d109752637`。
- 浏览器/真实共享数据复核：积分订单以 88 积分支付后刷新为待发货；MySQL 记录积分 912、余额 1000、订单 1、流水 1；后台同单显示 88 积分已付款，随后登记发货。该证据由主代理执行，非本人本轮启动。

财务统计限定复核：`admin-api.mjs` 使用已付款订单集合；现金成交额排除 `order_type=5`/积分支付和未付款预占，热销数量按已付款件数，销售额按已付款现金订单快照金额；后台订单和仪表盘按订单类型显示 `积分` 或 `¥`，指标文案为“已付余额订单金额/余额销售额”。新增回归用现金 10、积分 50、未付款 80 验证成交额为 10、已付销量为 3，未发现积分或未付款预占污染现金指标。

## 最终复核结论

就本报告列出的会员支付、转赠幂等/精度、待付款归属、评价/投诉/地址隔离、积分支付文案和后台财务统计范围，当前代码没有发现新的可复现绕过或回归；上一版三项 P1、积分金额文案及现金/积分统计隔离均有当前 Node/HTTP/浏览器证据覆盖。仍不能据此宣称整个三端项目可发布：真实第三方支付/回调、短信服务、提现规则与卖方收款关联，以及完整页面/设备验收仍是环境或业务阻塞。该结论为独立子代理复核，不是“自审”或对未执行环境的假设性通过。
