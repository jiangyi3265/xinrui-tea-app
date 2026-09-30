# 发货提醒与请求加载生命周期独立复核

复核时间：2026-09-26（Asia/Shanghai）  
复核者：独立子代理复核（只读；仅写入本报告）  
范围：`/order/remindShipment`、若依后台订单提醒展示/筛选、四个 H5 发货提醒按钮，以及公共 H5 `request` 的错误与 loading 生命周期。  
边界：未修改业务代码，未启动全栈或占用集成端口。

## 结论

本轮限定改动复核通过：发货提醒按当前会员订单归属、POST 方法、已付款且待发货状态校验；同一订单重复提醒返回原提醒记录，不重复创建；后台能查询提醒时间、待处理状态并按待处理筛选，订单进入已发货/收货后显示已处理。四个 H5 入口均传入实际订单号，并在服务端失败或网络异常时给出提示。

公共 `request` 已不再无条件关闭调用方 loading；非 JSON/非业务契约响应会明确 reject，transport error 保留原始错误对象，调用方自行负责 loading 的支付流程已补 `finally`。末次增量还把 `/order/remindShipment` 加入独立静态 H5 的远程路由映射，并覆盖 fetch 与 XHR；静态素材及外域请求不会被改写。checkout 的成功、建单失败、支付业务失败和网络失败四种路径均验证为一次 `show → hide → tip`。本轮独立限定测试 24/24 通过；随后读取最终验收证据中的全量 Node 60/60、20 组 HTTP/SQL、三端构建 exit 0。收货两个兼容别名均返回“收货已确认”并实际把订单收货状态持久化为已确认，未发现越权、重复写入或 loading 生命周期回归。

## 实际复测

### 发货提醒权限、状态与幂等

代码位置：`server/shared-api.mjs:108-115`。

- 其他会员使用该订单号：`code=0`，不会读取或写入提醒。
- GET 请求：`code=0`，只接受 POST。
- 非 `forwarding` 或 `pay_status.value !== 20`：`code=0`，不写提醒。
- 本人已付款待发货订单首次提醒：`code=1`，生成 `reminderId/createdAt`。
- 同订单再次提醒：`code=1`，返回同一提醒对象，不新增记录。
- 订单状态进入 `received` 后再次提醒：`code=0`。

提醒对象直接挂在会员自己的订单上，由 shared engine 返回的完整状态参与 RuoYi MySQL 事务提交；Java 侧行锁串行化同一状态快照，因此没有看到可绕过会员归属或重复生成提醒的路径。

### 后台订单查询与筛选

代码位置：`server/admin-api.mjs:46-69,283-289`，前端为 `RuoYi-Vue3/src/views/tea/orders.vue`。

订单列表显示 `reminderAt` 和 `reminderStatus`；`reminded=1` 仅保留 `待处理`。订单完成发货后状态不再是 `forwarding`，同一提醒显示 `已处理`，不会继续出现在待处理筛选中。后台查询不接受会员传入的 actor，仍由 RuoYi 管理员权限入口提供 actor。

### 四个 H5 入口

实读并由组件测试覆盖：

- 商城订单列表：`pages-order-shoporder.js` 将列表项 `order_id` 传给 `fahuotixing`。
- 商城订单详情：`pages-order-shordetail.js` 使用详情自身的 `this.order_id`。
- 积分订单列表：`pages-integral-jforder.js` 将列表项 `t.order_id` 传给 `fahuotixing`。
- 积分订单详情：`pages-integral-jfdetail.js` 使用详情自身的 `this.order_id`。

四个入口均在 `window.__H5_SERVER_MODE__ === 'ruoyi'` 时调用 `/order/remindShipment`；业务失败展示服务端消息，网络异常展示“提醒未确认，请重试”，不会把失败伪装成“已提醒发货”。非共享/若依模式明确提示该能力不可用，不伪造成功。

### 公共 request 与 loading

代码位置：`src/runtime/application.js:432-473`。

- 成功响应只停止下拉刷新，不调用全局 `uni.hideLoading()`。
- `uni.request` 返回错误时直接 reject 原始错误对象。
- 响应缺失或格式异常时 reject 明确错误。
- transport reject 时直接 reject原始错误对象，并停止下拉刷新。
- 原本在支付中调用 `showLoading` 的支付/下单流程已在调用链上补 `catch/finally`，因此不会依赖公共 request 的隐式 hideLoading。

### 末次增量：远程映射、契约拒绝与 loading 顺序

代码位置：`src/browser/runtime.mjs:10-21`、`src/runtime/application.js:432-473`、`src/pages/pages-classify-submit.js:416-472`、`src/pages/pages-loot-listProduct.js:1411-1499`。

- 独立静态 H5 的远程路由集合包含 `/order/remindShipment`；同源 fetch 和 XHR 都映射到配置的 Java 基址，`/h5/static/logo.png` 等静态资源和外域 URL 保持原 URL。
- 公共 request 对 `Not found` 这类缺少 `data.code` 的非 JSON/非业务响应拒绝为“接口响应格式异常”，不会把它转换为空成功提示，也不会吞掉原始 transport error。
- checkout 用幂等 `closePaymentLoading` 统一关闭支付 loading；成功、建单失败、支付失败、网络失败四种 mock 分支都在 toast 前完成且只完成一次关闭。
- 抢购/订单付款路径在结果反馈前关闭 loading；其中抢购成功/业务失败路径先 hide 再 toast，订单余额付款路径使用 `finally`，没有重新依赖公共 request 的隐式关闭。

## 验收状态表

状态值仅使用：`已实测通过／失败／未测试／环境阻塞／不适用`。

| 检查项 | 当前状态 | 证据 |
| --- | --- | --- |
| 本人订单归属校验 | 已实测通过 | `tests/shared-api.test.mjs:15-33`，跨会员提醒被拒绝 |
| 仅 POST 可提交提醒 | 已实测通过 | 同上，GET 被拒绝 |
| 仅已付款待发货可提交 | 已实测通过 | 同上，非支付/非待发货被拒绝 |
| 同订单提醒幂等 | 已实测通过 | 同上，重复返回同一 `reminderId` |
| 后台提醒时间与状态展示 | 已实测通过 | 同上；`server/admin-api.mjs:46-69` |
| 后台仅待处理提醒筛选 | 已实测通过 | `server/admin-api.mjs:283-289`；测试确认发货后筛选为空 |
| 发货后提醒显示已处理 | 已实测通过 | 测试把订单改为 `received` 后确认 `已处理` |
| 四个 H5 按钮传实际订单号 | 已实测通过 | `tests/shared-pages.test.mjs:49-64`，4 个组件循环验证 |
| H5 业务失败提示 | 已实测通过 | 组件 mock 返回 `code=0`，显示服务端错误 |
| H5 网络异常提示 | 已实测通过 | 组件 mock reject，显示“未确认/请重试” |
| 公共 request 不关闭调用方 loading | 已实测通过 | `tests/shared-pages.test.mjs:35-47`，成功与失败均 `hidden=0` |
| 公共 request 保留原始 transport error | 已实测通过 | 同上，reject 对象与原始 error 相同 |
| 独立静态 H5 fetch/XHR 映射发货提醒到 Java | 已实测通过 | `tests/shared-pages.test.mjs` 远程适配器 mock；fetch/XHR 均改写，素材与外域不改写 |
| 非 JSON/非契约响应明确拒绝 | 已实测通过 | `tests/shared-pages.test.mjs`，`Not found` 被拒绝为响应格式异常 |
| checkout 四分支 loading 只关闭一次且先于 toast | 已实测通过 | `tests/shared-pages.test.mjs`，success/createFailure/payFailure/offline 均为 `show, hide, tip` |
| 订单/抢购反馈前关闭 loading | 未测试 | 本轮完成源码顺序复核；没有对真实 uni 运行时逐场景执行，checkout mock 不覆盖所有抢购组件分支 |
| 收货两个接口别名返回真实确认文案并持久化状态 | 已实测通过 | 独立内存复测 `/order/receipt`、`/member/order/receipt`，均返回“收货已确认”，`receipt_status.value` 从 10 变为 20 |
| 真实浏览器 loading 动画逐场景观察 | 未测试 | 本轮未启动浏览器；Node 组件/请求 mock 已覆盖生命周期契约 |
| 真实 RuoYi/MySQL 发货提醒跨重启 | 未测试 | 主代理正在进行全栈与浏览器验证，本轮未占端口 |

## 最终集成证据（读取主代理最终产物）

最终证据目录：`.local/shared/muhplw6n0ca2fa/`。

- `node-tests.log`：`npm test`，60 tests / 60 pass / 0 fail，exit 0。
- `integration-results.json`：INT-01 至 INT-20 均为“已实测通过”，包括发货提醒归属、跨端并发幂等、后台待办与发货后关闭（INT-20）。
- `run-result.json`：`npm run verify:shared -- --release` 的 Node、HTTP/SQL 和构建检查完成，但总 exit 1，`releaseReady=false`，原因明确为必要业务、第三方环境和完整页面验收尚未完成；这不是测试断言失败，不能写成发布通过。
- `commands.jsonl`：Java `mvn ... package`、H5 `npm run build`、RuoYi-Vue3 `npm run build:prod` 均 exit 0。
- 主代理浏览器提醒截图仍位于上一最终证据目录 `.local/shared/muhphtzba8585f/browser-reminder-pending.png`：静态 H5 点击 T10005 提醒后，后台待处理筛选出现记录；重复提醒返回原记录，管理员发货后待办为空。该截图是主代理浏览器证据，不冒充本人的 Node mock 实测。

本轮针对收货文案的独立命令复测：

```text
node --input-type=module -e '<shared-memory setup; call both receipt aliases>'
exit 0；/order/receipt 与 /member/order/receipt 均返回“收货已确认”，状态值均为 20
```

## 执行证据

本人实际执行：

```text
node --test tests/shared-pages.test.mjs tests/shared-api.test.mjs
exit 0；24 tests，24 pass，0 fail
```

覆盖 18 个 shared API 回归和 6 个 H5/请求组件回归；未运行全量发布脚本，未将内存 shared store/mock 当作真实 HTTP、MySQL 或浏览器验收。

## 剩余风险

本轮没有发现发货提醒相关的新越权或幂等缺陷，也没有发现收货成功文案与状态持久化、远程映射、非契约响应或 checkout loading 顺序的新回归。最终集成已实测提醒跨端闭环，但真实浏览器 loading 视觉行为、订单/抢购所有 uni 运行时分支仍不是本人的独立实测，不应由本报告替代。`.local/shared/muhplw6n0ca2fa/run-result.json` 明确 release gate 为 exit 1；真实第三方支付、短信、提现及卖方收款关联等既有发布阻塞不属于本次改动，也未因本报告而解除。
