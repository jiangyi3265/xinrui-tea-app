# 2026-09-26 功能补齐与验收记录

后续版本以 [2026-09-27 非支付验收报告](NONPAY-ACCEPTANCE-REPORT.md) 为准；本文件保留历史证据，不是当前最终版本结论。

## 当前结论

本轮补齐了真实发货提醒，完成用户端四个入口、若依后台待办、数据库保存、重复提交保护及发货后处理状态的连接；修复公共请求/支付加载提示和独立 H5 新接口转发问题。原 H5 样式、布局、图片未改，后台新增控件沿用若依组件。Impeccable 技能仅用于状态、错误和重试反馈，不作视觉重设计。

最终本地结果：**60 项 Node 测试、20 组真实 HTTP/数据库检查、Java/H5/后台构建通过**。测试通过不等于业务覆盖完整。**当前不满足所列范围的发布条件**，提现、卖方二次成交结算、团队分佣的业务规则仍未确认，第三方沙箱未提供，全部页面和真机尚未验收。

本轮未擅自制定提现最低额、手续费、分佣比例或真实付款规则；未执行真实支付、打款、短信、实名核验、生产迁移或删除原业务数据。

## 最终版本与证据

E：`../.local/shared/muhplw6n0ca2fa/`。命令 `npm run verify:shared -- --release`，2026-09-26 09:26:57–09:27:37，Asia/Shanghai。总退出码 **1**，因为严格发布门禁保留未完成业务及环境阻塞；不是这 20 组集成失败。

- [run-result.json](../.local/shared/muhplw6n0ca2fa/run-result.json)：时间、命令、退出码和发布结论。
- [commands.jsonl](../.local/shared/muhplw6n0ca2fa/commands.jsonl)：`npm test`、Maven package、H5 build、后台 build:prod，退出码均 0。
- [Node 日志](../.local/shared/muhplw6n0ca2fa/node-tests.log)：60/60，无跳过；包含内存 API、组件 Mock、转发 Mock、已有回归，不将这些全部称为真实集成。
- [真实集成结果](../.local/shared/muhplw6n0ca2fa/integration-results.json)：INT-01–20，包括跨入口并发、若依角色、SQL、故障注入、重启及备份恢复。
- [source-manifest.json](../.local/shared/muhplw6n0ca2fa/source-manifest.json)：3 个仓库 HEAD 和全部变更代码 SHA-256，含未跟踪文件。未提交 Git，保留原有修改；文档不参与运行代码指纹。
- [浏览器记录](../.local/shared/muhplw6n0ca2fa/browser-completion.json)、[浏览器后 SQL](../.local/shared/muhplw6n0ca2fa/browser-sql.json)、[催发货待办截图](../.local/shared/muhphtzba8585f/browser-reminder-pending.png)。仅本地虚拟资产和测试账号，未写入密码/token。
- [独立复核](COMPLETION-INDEPENDENT-REVIEW.md)。复核者实际运行限定 Node 测试，并单独读取主代理真实集成证据；不冒充亲自执行浏览器。

中间证据 `muhp8mbx2a73c6`（58 项）与 `muhphtzba8585f`（60 项）保留。前者 HTTP 通过但浏览器暴露了新接口转发遗漏，不能作为最终版本。后者之后仅修正真实收货成功文案，已重新完整验收，以上述 E 为最终代码。

## 复现与修复

| 编号 | 复现→预期与实际 | 根因/影响 | 修改位置 | 验证 |
| --- | --- | --- | --- | --- |
| F01 | 点击提醒发货，应保存并让后台看到；原先没有接口、仅提示未接入 | 四页面按钮未传订单号，无服务端记录 | `shared-api.mjs`、`admin-api.mjs`、4 个订单列表/详情、后台 `tea/orders.vue` | 新测试先失败0≠1；修后 Node、INT-20、实际浏览器 |
| F02 | 同一单重复/跨端并发提醒，应只有一条待办；他人或非待发货单应拒绝 | 新写入需归属、状态、POST 与幂等 | `order.shipmentReminder`、`/order/remindShipment` | 内存正常/非法方法/未付/已发货/跨用户；HTTP 并发、未登录、SQL |
| F03 | 后台筛选催发货，应看到待处理记录，发货后退出待办 | 新增字段和待办筛选 | `reminderAt/reminderStatus`、`reminded=1`、订单列与复选框 | INT-20 + INT-04 后续断言；浏览器筛选/发货 |
| F04 | 普通查询/收货没有打开 loading，却被公共请求关闭；出现配对警告 | request 隐式操作了页面所属 UI；错误响应还丢失原始 error | `src/runtime/application.js`、原依赖隐式关闭的支付调用 | Mock 修前hidden=1≠0；修后保留原始错误，不关闭别人的loading |
| F05 | 付款成功先弹Toast再关闭loading，仍会告警 | uni 的Toast与Loading共用提示层，关闭次序错误 | checkout、订单余额支付、抢购支付、海报失败清理 | Mock 4 分支均show→hide→tip各一次；最终浏览器现金付款/收货无新警告 |
| F06 | 独立静态 H5 点提醒，MySQL无记录；API直接调用却成功 | 新接口未加入远程映射，打到静态服务，返回非业务正文 | `src/browser/runtime.mjs`、公共响应格式检查 | fetch/XHR映射Mock，素材/外域不变；浏览器修后后台出现记录 |
| F07 | 真实收货成功后提示仍写“本地模拟”，与真实数据保存不符 | 兼容业务函数复用了demo默认消息 | shared仅成功收货两别名改为“收货已确认” | INT-04明确断言文案及SQL收货状态，不通用删模拟标记制造通过 |

发货提醒是**站内后台待办**，不是短信、推送或已向真实商家外发消息。时间采用已有服务器时间格式。每个订单在待发货阶段最多一个提醒，重复请求返回原编号；发货后原记录保留，展示已处理。已有订单缺此字段时正常显示未提醒，无删除或批量改写历史数据。

## 验收表

完整历史业务范围见 [上一轮报告](RECHECK-ACCEPTANCE-REPORT.md) 和 [81 页入口表](SHARED-PAGE-MATRIX.md)。下面追加/更新本轮范围，未实测整页不自动改为通过。

| 功能编号 | 操作入口 | 角色 | 预期业务结果 | 接口与数据 | 验证方式 | 当前状态 | 证据位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| N01 | 商城/积分列表和详情提醒按钮 | 会员 | 传入本单，显示实际服务端结果 | remindShipment/order_id | 四组件Mock；商城列表实浏览器 | 已实测通过 | shared-pages、browser-completion |
| N02 | 提醒写入 | 会员/另一会员/游客 | 本人已付待发货、POST限定；越权/未登录失败 | user.orders.shipmentReminder | 内存+真实HTTP/SQL | 已实测通过 | shared-api；INT-20 |
| N03 | 两入口同时提醒 | 同会员 | 同一编号和时间，仅一份记录 | MySQL聚合状态事务/行锁 | 并发真实HTTP+SQL | 已实测通过 | INT-20 |
| N04 | 后台查看/筛选 | 仓管/管理员 | 待处理筛选可见，发货后已处理 | admin/tea/orders?reminded=1 | 真实HTTP+浏览器 | 已实测通过 | INT-20/04；待办截图 |
| N05 | 普通请求/失败响应 | 会员/游客 | 不操作他人loading；错误、非JSON契约明确失败 | application request | 请求Mock | 已实测通过 | shared-pages |
| N06 | 新订单现金支付加载 | 会员 | 成功/业务失败/网络失败关闭一次，先关闭再反馈 | checkout/balancePay | 4分支Mock | 已实测通过 | shared-pages |
| N07 | 已有现金订单付款/收货 | 会员/管理员 | 扣款一次，状态真实，无本轮配对警告 | T10007、T10005/orders/ledger | 实际浏览器+SQL | 已实测通过 | browser-completion、browser-sql |
| N08 | 独立静态端新接口 | 会员 | 实际请求Java，不请求静态文件/不回落demo | runtime远程映射 | fetch/XHR Mock+实际浏览器 | 已实测通过 | shared-pages；浏览器后台记录 |
| N09 | 原19组共享核心回归 | 所有测试角色 | 订单、积分、拍卖、审核、权限、资产、恢复保持通过 | 若依/MySQL/Redis/引擎 | 真实HTTP+SQL+故障/恢复 | 已实测通过 | INT-01–19 |
| N10 | 构建/源码检查 | 开发 | Java/H5/admin构建成功 | Maven/npm/build/source hashes | 实际命令 | 已实测通过 | E/commands.jsonl；diff --check |
| N11 | 短信/支付/实名/银行卡/物流 | 第三方 | 沙箱正反向与回调验收 | provider | 未获得资料/环境 | 环境阻塞 | 本文待确认项 |
| N12 | 提现/卖方结算 | 会员/财务 | 真实资金闭环 | withdrawals/seller settlement | 关键规则未确定，未实现完整写入 | 失败 | 前报告C24/C25，未伪造通过 |
| N13 | 团队分佣 | 会员 | 按规则计算可对账 | team/profit | 比例、层级和计提时点未确认 | 未测试 | 本文待确认项 |
| N14 | 81页全部操作/全部加载场景/真机/容量 | 所有 | 全范围业务及设备覆盖 | 全项目 | 局部浏览器不代表全面覆盖 | 未测试 | SHARED-PAGE-MATRIX.md |

## 一键验收、测试数据与恢复

H5目录运行实际执行过的命令：

```sh
npm run verify:shared -- --release
```

需要 Node >=22、Java17、Maven、已安装依赖、本地 MySQL/Redis；支持 `MAVEN_BIN`、`JAVA_HOME`、`TEA_MYSQL_DEFAULTS` 等配置，具体见 `scripts/shared-stack.mjs`。测试端口 15173/15174/15180/18080/18091 需空闲。脚本自动生成唯一 `tea_local_*` 隔离库及虚拟账号/资产；结束停止测试服务。原业务库不变；日志、隔离库及备份保留以供复核，清理前按该次 config 精确核对，不通配删除。

本地分项应全部通过，但严格发布入口在仍有必要阻塞时应保持退出1。不带release仅是有限本地验收，不代表可上线。开发预览仍是 H5 5173、静态H5 5180、管理端5174、Java8080。

本次仅增加可选订单字段，无新DDL或生产迁移。既有备份恢复检查仍已执行。若需部署，应先保存对应代码产物和数据库备份；回退要一起回退H5、后台和兼容引擎版本，保留新增提醒数据，不能用清空状态作为回滚。生产配置、HTTPS、监控和实际容量仍另行验收。

## 需要用户一次性确认的最少事项

1. **拍卖/二次寄卖**：款由平台代收还是买家直接付卖家；原卖家如何关联；手续费、退款及分佣比例/触发时点。预期是明确资金流规则，不能从旧demo推定真实合同含义。
2. **提现**：可提现账户、最低额、手续费；人工审核后线下打款或支付平台自动打款；拒绝、撤销、失败如何处理。预期是可落到状态机和账本断言的规则。
3. **第三方环境**：服务商名称、沙箱配置文件位置和可用回调域名。密钥不贴聊天，不使用未经授权的生产支付/短信。

无需用户重复机械点击已验证流程。上述回复后才能继续相关资金实现/沙箱验证；目前不能承诺“所有功能已好使”，也不应因本轮测试全绿解除发布门禁。
