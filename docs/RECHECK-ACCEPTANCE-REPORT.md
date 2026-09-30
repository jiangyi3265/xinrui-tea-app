# 第二轮全链路排查与本地验收

> 2026-09-26 追加开发与最终版本见 [功能补齐验收](COMPLETION-ACCEPTANCE-REPORT.md)。本文C26发货提醒和加载警告已在追加报告中更新，其他未完成范围不会自动变为通过。

## 1. 当前结论

**当前不满足所列范围的发布条件。后台不是“什么都有了”。** 15 个若依业务菜单已经存在，商品、会员、商城订单、拍卖、付款/充值/寄卖费审核、投诉、公告与内容管理有真实接口；仓库、提现记录、流水、出价中部分只有查询，不能把菜单存在等同于业务完成。

本轮在 macOS、Node、Java 17、MySQL 9.6、Redis 的本地隔离环境执行：55 项 Node 测试通过、19 组真实 HTTP/数据库集成检查通过、Java/H5/管理端生产构建通过。该结果仅证明表中已实测范围，不等于 81 页全覆盖、全平台兼容、真实第三方支付或商用成熟度。

三端仍指原 H5 5173、独立静态 H5 5180、若依 Vue3 管理端 5174；统一连接若依 Java 8080、私有兼容引擎和 MySQL。原有 H5 CSS、布局与视觉资源没有改动。本轮使用 Impeccable 技能约束权限、错误和重试反馈，未进行视觉重设计。

最少需要业务方补充：

1. 拍卖款是平台代收还是买家直付卖家；原卖方关联、手续费、退款及二次成交分配规则。
2. 提现账户类型、最低额、手续费、审核/打款/撤销规则；团队分佣规则。
3. 拟用短信、支付、实名/银行卡、物流的沙箱资料及回调域名。未提供前不执行真实付款、打款或对外发送信息。

## 2. 版本、时间与证据

最终集成命令：`npm run verify:shared -- --release`，2026-09-25 20:13:51–20:14:32（Asia/Shanghai）。退出码 **1**：本地集成通过，但严格发布门禁因必要业务及环境缺失而阻塞。

本轮最终证据 E：`../.local/shared/mugx9xw9457765/`；浏览器运行证据 B：`../.local/shared/mugt1d0g0ccd8e/`。这两个目录均是本地隔离测试，不是生产环境。证据路径相对本文；凭据、token、运行私钥未写入公开报告。

- [执行结论](../.local/shared/mugx9xw9457765/run-result.json)：命令、开始/完成时间、总退出码和发布阻塞。
- [命令账本](../.local/shared/mugx9xw9457765/commands.jsonl)：`npm test`、Maven package、H5 build、管理端 build:prod，各退出码 0。
- [真实集成结果](../.local/shared/mugx9xw9457765/integration-results.json)：19 组断言结果及时间。
- [源代码差异标识](../.local/shared/mugx9xw9457765/source-manifest.json)：三个仓库 HEAD，加所有已修改/未跟踪代码的 SHA-256；文档不参与运行代码标识。未创建 Git 提交，保留原有修改。
- [Node 测试日志](../.local/shared/mugx9xw9457765/node-tests.log)、[持久化摘要](../.local/shared/mugx9xw9457765/persistence-summary.json)、[隔离恢复结果](../.local/shared/mugx9xw9457765/restore-result.json)。数据库备份含测试状态，仅用于本机，不应上传或公开。
- 基础 HEAD：H5 `a91c7984a0f6174fe25faa71cf7a0bd705e11162`；Java `0cdbba90d69d43de7e931e5fc15f728bc43efb50`；管理端 `1e704aaa09590a2a348bf920cd7e31b804cf33f8`。仅 HEAD 不能标识当前未提交版本，以 source-manifest 为准。

中途真实失败保留于 `../.local/shared/mugww751989c9b/`：新支付通道断言误放入充值测试作用域，`created is not defined`，退出 1；将原断言移到积分订单测试中，不删除或弱化断言，最终重新完整执行通过。此前首轮本轮测试 `mugwl4gc556680` 的 18 组集成不是最终代码证据。

`mugwxy9m86d37f` 的 54 项测试和 `ui-followup` 为中间证据；之后浏览器发现积分金额/现金统计问题，修复后已统一重新完整验收，最终仅以上述 E 为准。三仓库 `git diff --check` 均退出 0。后续只更新报告和采集证据，不修改运行代码。

## 3. 新发现问题、修复和验证

| 编号 | 复现步骤与预期/实际 | 根因及影响 | 修改位置 | 修复后证据 |
| --- | --- | --- | --- | --- |
| R01 | 凭证待审后轮询付款状态；原来审核中也返回已支付，预期必须财务通过 | 将非待支付文本视为付款完成，影响前端业务推进 | `server/shared-api.mjs` | Node payment polling；INT-06 待审 0、审核后 1 |
| R02 | 上传合法凭证充值 0.29；原来拒绝合法两位小数 | 二进制浮点乘 100 整数检查不可靠 | `server/shared-api.mjs` | Node decimal；INT-07 SQL 价格 0.29、待审不入账 |
| R03 | 管理员直接将订单设为待评价/已完成；原来可代会员收货 | 后台状态变更缺真实收货/评价条件 | `shared-api.mjs`、管理端 `tea/orders.vue` | Node admin receipt；INT-04/16 |
| R04 | 打开自己的投诉页面；原返回字段与 H5 期待的订单/商品字段不一致 | 复用 demo 通用结构，不是页面契约 | `shared-api.mjs` | Node complaint；INT-17 归属、空内容、后台处理和再次读取 |
| R05 | 只读账号进入商品/会员/公告/拍卖；原能看到无权写入按钮 | 页面缺若依按钮权限指令，后端仍会拒绝 | 管理端 `tea/products,members,notices,auctions,orders.vue` | INT-18 服务端矩阵；B/recheck-viewer-products.png |
| R06 | 普通订单调用积分支付、积分订单调用余额支付；原来都能扣错误科目 | 支付没有绑定订单保存的通道 | `shared-api.mjs` | 独立复核先复现；Node channel；INT-04/16 拒绝且正常通道成功 |
| R07 | 转赠同一请求重复提交；原来重复扣/入账；0.001 返回成功但只记零额流水 | 缺幂等键和小数精度验证 | `shared-api.mjs`、`pages-personal-transfer.js` | Node transfer；INT-19 两入口并发、双边流水各一笔、重新登录重试不扣款 |
| R08 | 未开启的支付类型 1/3/5/6 调用 toPayGoods；原来 code=1 但没有支付参数 | 清除模拟 payment 时保留成功码 | `shared-api.mjs` | Node channel；INT-04 各类型明确失败 |
| R09 | 积分待付款列表继续支付；原来没有交易密码入口而被服务端拒绝 | 第一次下单和继续支付路径不同 | `pages-integral-jforder.js`、`pages-classify-submit.js` | H5 组件 Mock 复用原订单/密码框；浏览器结果另列 |
| R10 | 输入交易密码；5 个页面将完整 PIN 打到控制台 | 恢复源码含调试输出，泄露支付口令 | checkout/transfer/loot/listProduct/shoporder 相关页面 | 删除对应输入日志；组件输入日志回归；浏览器日志检查另列 |
| R11 | 新订单查物流；原来返回 DEMO 单号及模拟顺丰 | shared 创建订单继承 demo 字段 | `shared-api.mjs` | INT-04 无虚构物流字段，明确轨迹未接入 |
| R12 | 点击提醒发货；原来只弹成功，没有请求 | 假按钮成功反馈 | 四个商城/积分订单列表/详情页面 | 共享模式明确提示尚未接入；真实提醒功能仍标为失败，不算已实现 |
| R13 | 验收命令失败后读取 latest；可能保留上一次成功结论 | 缺开始/失败写入状态 | `scripts/verify-shared.mjs`、`shared-stack.mjs` | 中途失败 run-result、最终 source-manifest、严格发布门禁仍 exit1 |
| R14 | 积分支付密码框显示付款￥0.00；后台积分订单显示人民币，10元+50积分被统计为60元 | 现金字段用于积分展示；概览混加不同资产、商品当前价乘预占销量 | checkout `paymentLabel`、`admin-api.mjs`、后台 orders/dashboard | 新回归先实际失败60≠10，修后通过；INT-16积分付款不增加现金统计，已付件数3/余额金额100；实际浏览器88积分 |

## 4. 完整功能验收表（本轮执行范围）

下表“已实测通过”仅限预期结果所写范围。完整 81 页入口及接口清单继续见 [逐页验收表](SHARED-PAGE-MATRIX.md)，其中未执行整页闭环的条目仍为未测试；历史实现和验收标准见 [共享后台验收报告](SHARED-ACCEPTANCE-REPORT.md)。本轮表覆盖或补充旧报告 S01–S32，不能把局部接口断言扩大为整页通过。

| 功能编号 | 操作入口 | 角色 | 预期业务结果 | 关联接口与数据 | 验证方式 | 当前状态 | 证据位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C01 | 构建与启动 | 开发 | 三端构建、隔离整栈启动 | Maven/Node/Vite/MySQL/Redis | 实际命令 | 已实测通过 | E/commands.jsonl |
| C02 | 若依登录/权限 | 管理员/只读/财务 | 真 JWT、菜单；无权写入 403 | login/getInfo/getRouters/sys_role | HTTP | 已实测通过 | INT-01 |
| C03 | H5 登录/会员开户 | 会员/运营 | 跨入口登录；新账号零资产；无敏感哈希输出 | member/members/state | HTTP+SQL | 已实测通过 | INT-02 |
| C04 | 15 模块角色权限 | 运营/财务/内容/仓管/只读 | 四角色逐资源授权；只读修改拒绝 | admin/tea/*/sys_role_menu | 60 个资源读取＋正反向写入 | 已实测通过 | INT-18 |
| C05 | 商品管理→两个 H5 | 运营/游客 | CRUD 同步、失败事务不保存 | products/catalog | HTTP+SQL | 已实测通过 | INT-03 |
| C06 | 上传凭证 | 会员/游客 | 图片、像素、归属校验；内部接口拒绝 | upload/image/uploads | multipart+SQL | 已实测通过 | INT-12 |
| C07 | 余额订单闭环 | 会员/仓管 | 同请求一订单、扣款一次、真实发货收货、不能代收货、拒绝换支付科目 | buyNow/balancePay/orders/receipt | HTTP+SQL | 已实测通过 | INT-04 |
| C08 | 拍卖 | 运营/两会员 | 并发同价一个成功、库存数量一致、赢家结算幂等 | auction/warehouse/settlements | 并发 HTTP+SQL | 已实测通过 | INT-05 |
| C09 | 拍卖付款审核 | 买家/财务 | 待审不是已付款，审核后完成；凭证不跨用户复用 | payment_voucher/settlements/claims | HTTP+SQL | 已实测通过 | INT-06 |
| C10 | 积分充值 | 会员/财务 | 两位小数合法；待审不入账；通过一次、驳回不入账 | recharge/recharges/ledger | HTTP+SQL | 已实测通过 | INT-07 |
| C11 | 寄卖上架费 | 会员/财务 | 待审→通过→仓库寄卖中 | fees/warehouse | HTTP+SQL | 已实测通过 | INT-08 |
| C12 | 公告/商城内容 | 内容角色/游客 | 保存跨端可读，脚本内容拒绝 | notices/content | HTTP+SQL | 已实测通过 | INT-09 |
| C13 | 积分订单闭环 | 会员/仓管 | 密码、扣积分一次、发货/收货/评价、重复评价和跨用户拒绝 | pointsPayment/receipt/evaluation | HTTP+SQL | 已实测通过 | INT-16 |
| C14 | 投诉提交/处理 | 会员/仓管 | 合约字段齐全、仅本人、非空、处理结果重读持久化 | getOrderReport/toOrderReport/reports | HTTP+SQL（非整页浏览器） | 已实测通过 | INT-17 |
| C15 | 上架券转赠 | 两会员 | 0.29 双边准确；并发与重登录重试同一流水；非法精度/改请求拒绝 | toTransfer/transferRequests/ledger | 跨入口并发 HTTP+SQL | 已实测通过 | INT-19 |
| C16 | 模块查询/停用/外部失败 | 管理员/会员 | 15 真实集合；停用旧会话失效；未接入明确失败 | admin/tea/*/sessions/providers | HTTP+SQL | 已实测通过 | INT-10 |
| C17 | 交易密码限速 | 会员 | 5 次错锁十分钟，重登录不绕过 | verificationPayPassword/Redis | HTTP | 已实测通过 | INT-14 |
| C18 | 业务引擎断开 | 运维/会员 | 返回失败，无 MySQL 部分提交 | Java→engine→MySQL | 故障注入 | 已实测通过 | INT-13 |
| C19 | 重启恢复 | 三端 | 商品/业务数据仍在同一库 | MySQL/state | 停止/重启真实服务 | 已实测通过 | INT-11 |
| C20 | 备份恢复 | 运维 | 恢复库业务、审计、凭证、角色一致 | mysqldump/*_restore | 隔离恢复+SQL | 已实测通过 | INT-15 |
| C21 | 前端组件契约 | 会员 | 继续积分支付不重新下单；转赠生成重试键；输入不打印 PIN | checkout/transfer | **Mock 组件测试** | 已实测通过 | tests/shared-pages.test.mjs |
| C22 | 后台只读页面 | 只读 | 商品新增/编辑/删除及会员停用按钮不出现 | products/members.vue | 实际浏览器 DOM+截图 | 已实测通过 | B/recheck-viewer-products.png；B/recheck-browser-results.json |
| C23 | 已有积分订单继续支付 | 会员 | 使用原单付款、刷新与后台状态一致 | H5积分列表/checkout/order | 实际浏览器+SQL | 已实测通过 | B/recheck-browser-results.json；T10003积分1000→912、现金1000不变、一订单一流水 |
| C24 | 提现申请/审核/打款 | 会员/财务 | 提现资金闭环 | withdrawals | 目前仅查询，无写入流程 | 失败 | 业务规则及实现缺失 |
| C25 | 二次寄卖原卖家结算 | 卖家/财务 | 原卖家到账、退款/费用一致 | sellerId/settlements in | 原卖家关联/规则不完整 | 失败 | shared-api.mjs |
| C26 | 真正提醒商家发货 | 会员/商家 | 实际写入/送达通知 | 四个订单页面 | 已移除假成功；后端未接入 | 失败 | R12 |
| C27 | 短信/支付/实名/银行卡/物流 | 用户/第三方 | 沙箱正反向及回调闭环 | provider | 缺凭据/环境 | 环境阻塞 | INT-10只证明拒绝、INT-04物流不造假 |
| C28 | 团队分佣及收益规则 | 会员/业务方 | 规则正确并能对账 | team/profit | 规则未确认 | 未测试 | 逐页清单 |
| C29 | 全部81页/所有按钮与角色 | 所有 | 整页正常/失败/刷新闭环 | routes.json/逐页清单 | 只完成局部浏览器 | 未测试 | SHARED-PAGE-MATRIX.md |
| C30 | 真机/性能/生产环境 | 用户/运维 | 硬件兼容、容量、监控、安全、恢复 | 目标设备/环境 | 未覆盖 | 未测试 | 发布仍阻塞 |
| C31 | 现金与积分统计分离 | 管理员 | 积分不计现金，未付预占不计销量，销售额用已付快照 | dashboard/orderType/pay_status | 内存回归+HTTP+SQL | 已实测通过 | Node dashboard；INT-16 |

### 浏览器终验补充

2026-09-25 20:18 最后读库核实 T10003：仅一个订单、一条扣积分流水；积分 `1000→912`，现金余额仍 `1000`；后台实际登记发货后，H5 刷新/服务重启均能读取待收货；会员实际点确认收货后，后台重读为待评价，数据库 `receipt_status=20`、`status=evaluation`。证据：[操作与 DOM](../.local/shared/mugt1d0g0ccd8e/recheck-browser-results.json)、[SQL 断言](../.local/shared/mugt1d0g0ccd8e/recheck-browser-sql.json)、[后台同单截图](../.local/shared/mugt1d0g0ccd8e/recheck-admin-order.png)、[H5 同单截图](../.local/shared/mugt1d0g0ccd8e/recheck-h5-order.png)。最终逐项核对源清单的 50 个变更文件哈希未变。

日志没有隐瞒：管理端保留 20:05:16、20:15:01 两条 `AxiosError`，与本轮主动重启服务时的请求相邻，重启就绪后刷新成功。H5 收货后出现一条 `showLoading 与 hideLoading 必须配对使用` 警告，业务与数据断言通过，但该加载提示配对问题仍未修复，作为低优先级剩余问题保留；不能宣称全会话零错误/警告。下一步针对公共请求层与收货调用的 loading 生命周期增加回归，不需要用户提供凭据。未采集 HAR，不能把截图当成网络逐包证据；请求与持久化由独立真实 HTTP/SQL 测试证明。

真实支付、对外通知、真机操作均未执行；浏览器交易只使用明确的本地虚拟测试资产。只读按钮验证覆盖商品与会员，其他页面权限由服务端矩阵和代码复核验证，不冒充所有页面浏览器覆盖。

## 5. 一键复查及环境准备

在 H5 目录执行：

```sh
npm run verify:shared -- --release
```

前置：Node >=22、Java 17、可用 Maven（脚本支持 JAVA_HOME/MAVEN_BIN）、H5 和管理端依赖已安装；本机 MySQL 和 Redis 已运行。MySQL 需能创建隔离测试库；具体 SQL 环境变量及可覆盖路径见 `scripts/shared-stack.mjs`。测试占用 15173/15174/15180/18080/18091，不能被其他进程占用；应用本地预览使用 5173/5174/5180/8080/8091。

该入口实际完成 Node 测试、三端构建、真实 HTTP+SQL、故障注入、整栈重启和隔离备份恢复；成功的本地分项应全部通过且各构建退出 0。**严格发布命令当前必须退出 1**，不得将这些阻塞删掉使其变绿。不带 `--release` 只表示有限本地集成，不能作为全部发布验收。

每次创建唯一 `tea_local_*` 库及恢复库，虚拟账号资产明确为测试数据，不读写原业务库。脚本结束自动停止本轮测试进程；数据库、恢复库、日志、备份保留便于复核，不自动删除用户数据。需要清理时先按该次 config 的确切库名和证据目录核对备份，再只清理这次隔离数据，严禁通配删除。

日常预览：`npm run local:shared -- --no-build` 使用已构建产物及 `.local/shared/current.json` 的本地隔离库；修改代码后应先构建。配置文件含本地运行密钥，不要贴到公开报告。

## 6. 独立复核与最少人工验收

独立复核者读取业务代码、验收规则并实际复现出支付换通道、转赠重复/精度、关闭通道假成功等问题，主代理修复后再请其重测。详见 [独立复核记录](RECHECK-INDEPENDENT-REVIEW.md)；该文件明确区分内存测试与真实集成，不能相互冒充。

不要求用户重做已完成的机械 API 检查。仅需：

- 业务负责人书面确认第 1 节规则；预期产物是可执行的资金状态/分配/撤销规则，因为源码不能决定真实合同含义。
- 提供第三方沙箱资料后由开发继续执行联调，不要求用户手工替代接口测试；真机目标型号/微信环境需要明确，未执行前保持未测试。
- 如需要主观体验验收，对照保留样式的本地页面确认文案与原业务习惯；不是对功能安全或数据一致性的替代验收。

生产发布仍需：提现和卖方结算实现、通知送达、全页闭环、第三方签名回调对账、聚合 JSON/全局行锁方案的容量与敏感信息保护、HTTPS/监控告警、生产迁移和可执行回滚。没有容量目标和相应压测，不能声明性能达标。
