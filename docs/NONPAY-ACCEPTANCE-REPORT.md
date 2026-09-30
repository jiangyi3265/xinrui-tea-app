# 非支付业务补齐与发布验收

日期：2026-09-27，Asia/Shanghai。

后续复查已发现并修复订单地址/重复收货和底层拍品下架保护，当前最终结果为87项/25组，见 [再次复查报告](NONPAY-RECHECK-20260927.md)。以下83项/24组及其源码指纹保留为上一轮历史证据；完整范围与发布阻塞继续有效。

## ① 当前结论

本轮已实际修复并验证发货/运单、商品分类和描述、会话撤销、地址校验、拍卖真实数据及页面契约等问题。原 H5 的 CSS、图片资源和布局未重设计；Impeccable 仅用于表单、状态、失败/重试反馈，后台沿用若依组件。

最终本地：**83 项 Node 测试、24 组真实 HTTP/SQL 集成检查、Java/H5/若依后台构建通过**，没有跳过测试。**当前不满足所列范围的发布条件**。排除第三方支付后，仍有未实现业务、第三方环境和未完成验收，不能称为“除支付全部可商用”。

当前实现是若依 Java 鉴权/RBAC/事务 + 私有 Node 兼容业务引擎 + MySQL 聚合状态 + Redis；不是全部业务已迁入 Java 的独立关系模型。测试的三个入口是 H5 网关、独立静态 H5、若依管理端，不能等同于原生 App/微信小程序/真机均已通过。

未执行生产迁移、真实支付/打款、短信、实名、外发通知或删除原业务数据。所有下单/余额/凭证验收只用隔离库虚拟数据。提现、分佣、卖方结算是否属于用户所说的“支付排除”仍待确认，没有擅自扩大排除范围。

## ② 版本、环境与可复查证据

最终证据目录 E：`../.local/shared/muj3iml2920579/`。
统一命令 `npm run verify:nonpay` 实际运行于 **08:44:06–08:44:59**；总退出码 **1**，是明确保留发布阻塞，不是本地 24 组测试失败。

- [运行结论](../.local/shared/muj3iml2920579/run-result.json)：范围、时间、退出码、阻塞。
- [命令及退出码](../.local/shared/muj3iml2920579/commands.jsonl)：npm test、Maven package、H5 build、admin build:prod 均退出 0。
- [83 项 Node 日志](../.local/shared/muj3iml2920579/node-tests.log)：包括内存业务、组件/render/请求 Mock、源码及构建测试；不能全部称为真实集成。
- [24 组真实集成](../.local/shared/muj3iml2920579/integration-results.json)：实际若依 JWT/权限、会员 HTTP、跨入口、MySQL 数据、不变量、并发、故障、重启、隔离备份恢复。
- [最终源码指纹](../.local/shared/muj3iml2920579/source-manifest.json)：3 仓库 HEAD 和全部变更代码（含未跟踪文件）的 SHA-256。未提交 Git；保留用户原修改。08:45:50 最终独立 SQL 采集同时验证 **61 个代码文件** 指纹匹配。后续只更新证据/文档。
- [浏览器操作记录](../.local/shared/muj3iml2920579/browser-completion.json)、[SQL 及审计](../.local/shared/muj3iml2920579/browser-sql.json)、[采集脚本](../.local/shared/muj3iml2920579/capture-browser-sql.mjs)。浏览器为实际操作，不冒充全自动 UI runner；未在浏览器更改凭据。
- [拍卖结束 H5](../.local/shared/muj3iml2920579/browser-auction-ended-h5.png)、[拍卖结束后台](../.local/shared/muj368cyd4060b/browser-auction-ended-admin.png)、[修复后运行中倒计时/图片](../.local/shared/muj33higce95c8/browser-auction-h5.png)。
- [后台物流](../.local/shared/muj284gsbbe041/browser-shipping-admin.png)、[H5 物流](../.local/shared/muj284gsbbe041/browser-shipping-h5.png)、[商品配置](../.local/shared/muj2lx787afac4/browser-product-admin.png)、[分类空态](../.local/shared/muj2lx787afac4/browser-category-empty.png)、[分类有数据](../.local/shared/muj2lx787afac4/browser-category-filled.png)、[退出登录](../.local/shared/muj2lx787afac4/browser-logout.png)。这些截图来自本轮中间验证；最终 SQL 再核对持久化结果，不能把中间版本测试冒充最终统一检查。
- [独立复核](NONPAY-INDEPENDENT-REVIEW.md)：复核者直接读代码、运行限定测试并查高风险路径，不曾操作本轮浏览器或数据库。其发现经修复后回归。

环境：本机 macOS、Node 26、Java 17、MySQL 9.6、Redis；Maven 使用本机 IDEA 附带版本。预览 5173/5180/5174/8080/8091；自动验收 15173/15180/15174/18080/18091。最终自动隔离库 `tea_local_muj3iml2920579`；浏览器独立预览库 `tea_local_mugt1d0g0ccd8e`，二者不混同。

HEAD 基线：
- H5：a91c7984a0f6174fe25faa71cf7a0bd705e11162
- Java：0cdbba90d69d43de7e931e5fc15f728bc43efb50
- 管理端：1e704aaa09590a2a348bf920cd7e31b804cf33f8

无新增生产 DDL，本轮新增字段按兼容字段保存。源码 diff --check 已运行；Java/admin 有历史 CRLF 提示，未批量格式化。备份含测试账户散列/会话等，不作为公开附件；本报告和摘要证据不写密码、token、密钥。

## ③ 修复记录：复现 → 根因 → 修改 → 验证

| 编号 | 复现、预期与原实际 | 根因/影响 | 修改位置 | 实際验证 |
| --- | --- | --- | --- | --- |
| F01 | 后台直接把订单改为待收货，却没有运单；应有效登记后发货 | 只有状态下拉，无物流字段/服务端门禁 | shared-api/admin-api、admin orders.vue、H5 wuliu | 无运单/未付拒绝；并发同单幂等、冲突拒绝；INT21；浏览器 T10010 及 SQL |
| F02 | 分类按商品位置虚构，详情回落“原产地直供”；应来自后台配置 | demo 公共读取被共享模式复用 | shared-public、shared-api、products.vue、records.vue | 后台 31/32 分类、描述，H5 分类筛选和刷新；INT22 |
| F03 | 缺公告数组抛 TypeError；不存在 ID 可回落另一公告 | 非空假设/fixture fallback | shared-public | 旧状态缺失数组、隐藏/不存在公告均精确失败或空列表；nonpay、INT22 |
| F04 | GET/PUT 可写资料、地址、订单；应只允许约定方法 | 共享门禁只检查路由和身份 | shared-api postOnly/method | 内存状态全量前后比较；HTTP/SQL revision 不变，INT23 |
| F05 | 改密后旧 token 继续可用，退出仅清浏览器 | 未撤销服务端会话，旧 reset grant 可绕过旧密码 | shared-api、TeaBusinessService、settings/password H5、runtime | 正确旧密码、撤销所有本人会话、他人不受影响；HTTP5次限速；浏览器 logout 会话7→6 |
| F06 | 地址对象/空白/超长值可持久化 | 缺类型长度约束 | shared-api | 拒绝且无部分写入，合法值trim；nonpay、INT23 |
| F07 | 无拍卖也返回寄卖中、未来时段、固定10额度；预约先写后失败 | 共享公开入口继续调用 demo | shared-public/shared-api、loot/listProduct/lootdet | 空场次空列表、真实时间/库存、精确ID；预约未配置时不写记录；INT24。预约功能本身仍失败/待补 |
| F08 | 普通/积分 buyNow 可绕过拍卖预检创建订单 | 只有抢购入口限制，普通购单漏校验 | shared-api checkout、commerce shared防线 | scheduled/running×两购单路径×两通道拒绝且订单/库存/state不变；取消后可购；INT24 |
| F09 | 公开auction别名暴露草稿/下架商品；错误ID回落另一场次 | 公开别名过滤遗漏、findAuction fallback | shared-public、auction.mjs | draft/下架/取消不可公开；显式错误ID不出价、不写state；nonpay/INT24 |
| F10 | 实际H5拍卖图片空白、倒计时空白；结束后赢家按钮被售空分支挡住 | image与goods_image契约错；小数秒被当毫秒；模板分支优先级错 | pages-loot-lootdet.js、shared-public stock_num | 修前2项render/countdown失败；修后图片、倒计时、timer清理、获胜者结算入口及“查看结算单”导航Mock，已结算不重复发起写请求；image空数组回退；真实浏览器场次10012创建/运行/结束/SQL释放库存，最终重载截图 |
| F11 | 商品编辑出现 ElementPlus 价格类型警告 | 金额API字符串直接传input-number | admin products.vue openEdit | 转Number，浏览器再打开保留88.00且无新增warning |
| F12 | 明确生产构建未配置API仍可能静态demo | 构建缺显式生产守卫 | release-policy、build、package；Java密钥启动校验 | 生产缺H5_API_BASE实际退出1且在写产物前拒绝；release-policy回归；合法本地随机独立密钥启动通过 |

修复前证据保留：
- `muj284gsbbe041/review-before.log`：空拍卖/公告/预约失败（最初复合命令的外层退出码是 tail 的0，不当作 Node 退出码）。
- [购单绕过失败](../.local/shared/muj2lx787afac4/auction-gate-before.log)、[公开场次失败](../.local/shared/muj2sbptfeafec/auction-visibility-before.log)、[图片/倒计时失败](../.local/shared/muj2wgl76a01c9/auction-browser-before.log)：runCheck 记录的定向测试均 exit1。
- 最早 `muj1yewga09597` 后台构建失败：帮助文案 JSON 引号破坏 Vue 属性，已改 computed 内容并重构建；保留原失败。
- `muj3f1nwa9ee92/node-tests.log`：最后一次图片兜底 helper 初放在倒计时子组件，render 测试捕获函数缺失；已移到正确主组件。原静态测试按新业务动作把“已生成结算单”更新为“查看结算单”，并增加导航及不重复写入断言。定向16项通过后执行本次83项整体验收，不是靠重跑掩盖偶发失败。
- [生产构建负向日志](../.local/shared/muj368cyd4060b/release-build-negative.log)：预期守卫拒绝，不当作生产构建成功。

## ④ 完整验收表

下表按业务结果判定；完整 **81 页整页范围**见 [NONPAY-PAGE-MATRIX.md](NONPAY-PAGE-MATRIX.md)。整页未覆盖的状态不因局部测试通过而升级。已有宣称和历史核心结果重新纳入最终 INT01–24。

| 功能编号 | 操作入口 | 角色 | 预期业务结果 | 接口与数据 | 验证方式 | 当前状态 | 证据位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NP01 | 登录/菜单/15业务模块 | 管理员/只读/运营/财务/内容/仓管 | JWT有效、逐模块权限隔离、无权写入403 | admin/tea/*、sys_role_menu | 真实HTTP/SQL | 已实测通过 | E/INT01、18 |
| NP02 | 会员开户/登录/停用 | 管理员/会员 | 无demo资产；停用旧会话失效、跨入口同身份 | members/sessions | 内存+HTTP/SQL | 已实测通过 | INT02、10 |
| NP03 | 退出/修改密码 | 会员/其他会员 | 本次退出撤销当前会话；改密撤销全部本人会话 | logout/editPwd/sessions/Redis | HTTP/Mock；退出实际浏览器 | 已实测通过 | INT23、UI-NP03 |
| NP04 | 地址写入及查询 | 会员/其他会员 | 合法字符串、归属隔离、失败无脏数据 | address/users.addresses | 内存+HTTP | 已实测通过 | nonpay、INT23 |
| NP05 | 商品/分类/描述 | 运营/内容/游客 | 保存、筛选、刷新一致，无fixture文案 | catalog/content.categories | CRUD HTTP、浏览器、SQL | 已实测通过 | INT03、22；UI-NP02 |
| NP06 | 公告/内容/公开评价 | 内容/游客 | 只读发布数据，精确ID；脚本拦截 | notices/content/reviews | 内存+HTTP/SQL | 已实测通过 | INT09、22 |
| NP07 | 商城下单及取消 | 会员/另一会员 | 数量库存正确、请求幂等、状态和归属受控 | orders/catalog | HTTP/SQL并发 | 已实测通过 | INT04、16；shared-api |
| NP08 | 发货提醒 | 会员/仓管 | 站内一次待办、后台可查，发货关闭 | orders.shipmentReminder | Mock+HTTP/SQL | 已实测通过 | INT20及历史实际UI |
| NP09 | 录入发货 | 仓管/只读 | 已付待发货+有效运单，重试同结果，冲突不写 | admin orders/express/shippedAt | 内存+并发HTTP+浏览器 | 已实测通过 | INT21、UI-NP01 |
| NP10 | 查物流/收货/评价 | 本人/其他会员 | 运单一致、本人确认、真实评价保存 | express/receipt/evaluation | HTTP/SQL；物流实际UI | 已实测通过 | INT04、16、21 |
| NP11 | 场次发布/详情 | 运营/游客 | 只读真实可见场次，无假时段/草稿泄漏 | auctions/catalog | 内存+HTTP+浏览器 | 已实测通过 | INT24、UI-NP05 |
| NP12 | 竞价/结束/赢家结算单 | 两会员/运营 | 最低价、并发最高价、赢家唯一单、库存一致 | bids/auctions/warehouse | 内存+HTTP/SQL | 已实测通过 | INT05；不是全程浏览器点击 |
| NP13 | 普通购单绕过竞价 | 会员 | 所有普通/积分写入口拒绝活跃拍卖 | checkout/toAddOrder | 内存+HTTP/SQL | 已实测通过 | nonpay15、INT24 |
| NP14 | 图片/倒计时/结束按钮 | 会员/赢家 | 图片可见、时间正确、结束可达正确后续 | lootdet/countdown | render/组件Mock+局部实际UI | 已实测通过 | shared-pages、UI-NP05/06 |
| NP15 | 无人出价结束/库存释放 | 运营 | 预占一次、结束释放一次，状态刷新一致 | auction.stockReleased/catalog.stock | HTTP/SQL+浏览器 | 已实测通过 | INT05；10012库存8→7→8 |
| NP16 | 投诉提交/处理/重读 | 本人/其他会员/仓管 | 只能本人订单，结果持久化可查 | reports/orders | HTTP/SQL | 已实测通过 | INT17 |
| NP17 | 上传/凭证隔离 | 会员/其他会员 | 格式像素限制、凭证归属不可重用 | upload/voucherClaims | multipart HTTP/SQL | 已实测通过 | INT06、12 |
| NP18 | 既有虚拟资产审核回归 | 财务/会员 | 不重复入账/扣款、拒绝不增加资产 | recharges/fees/ledger | 本地虚拟HTTP/SQL | 已实测通过 | INT06–08、16、19；非真实支付 |
| NP19 | 中断/重启/恢复 | 运维 | 失败503无部分提交，隔离恢复一致 | engine/MySQL/audit | 故障注入/实际备份恢复 | 已实测通过 | INT11、13、15 |
| NP20 | 构建及生产配置守卫 | 开发 | 构建可重现，缺正式API不回落demo | scripts/Java config | 实际命令+负向检查 | 已实测通过 | E/commands；不是正式部署验收 |
| NP21 | 自助注册/验证码/实名 | 游客/会员 | 真实身份验证及失败分支 | SMS/KYC | 未获服务商/沙箱，当前未完成实现 | 环境阻塞 | 缺配置，明确拒绝不算业务通过 |
| NP22 | 实时承运商轨迹 | 会员 | 承运商真实轨迹/更新 | provider tracking | 仅商家登记事件可用 | 环境阻塞 | trackingAvailable=false |
| NP23 | 场次预约/通知 | 会员 | 确认规则后完整预约与通知 | subscribe/subscribePay | 当前明确拒绝，无部分写入 | 失败 | 规则/通知方式缺失，功能未完成 |
| NP24 | 团队分佣/等级/收益 | 会员/财务 | 可核算、可对账、无固定假收益 | team/profit | 规则及对应闭环未齐备 | 失败 | 81页表相关入口 |
| NP25 | 卖方二次寄卖/拆单/提货 | 会员/仓管 | 商品归属、结算及履约完整 | warehouse/seller/split/delivery | 部分路径未实现；规则待确认 | 失败 | 不把已有服务费审核等同全流程 |
| NP26 | 提现申请/审核/打款 | 会员/财务 | 完整资金状态机 | withdrawals | 只有记录查询；排除范围待确认 | 失败 | 非“提现功能都有” |
| NP27 | 海报/发圈/其他非支付页面 | 会员 | 真实生成/下载/内容业务 | poster/circle/81pages | 存在未接入入口 | 失败 | NONPAY-PAGE-MATRIX |
| NP28 | 全部页面分支/真机/原生App/小程序 | 全角色 | 目标平台完整闭环 | 全客户端 | 局部浏览器不能替代 | 未测试 | 81页表、需目标平台 |
| NP29 | 生产部署/容量/告警/生产回滚 | 运维 | 目标环境及负载可验收 | HTTPS/DB/Redis/engine | 尚无目标与正式环境 | 环境阻塞 | 不宣称性能/商用成熟度 |
| NP30 | 第三方支付SDK/回调 | 会员/财务 | 本轮排除 | 微信/支付宝等 | 不执行真实支付 | 不适用 | 用户明确排除支付；保留旧虚拟回归防退化 |

### 后台到底“有什么”

15 个菜单与服务端权限已接入，但“菜单存在”不是“完整业务完成”：

| 后台模块 | 当前可用内容 | 未完成边界 |
| --- | --- | --- |
| 概览、商品、商城订单、拍卖、会员、公告 | 真实查询与相关创建/编辑/发货/关闭/停用 | 非全量运营场景及生产规模验证 |
| 拍卖仓库 | 真实记录查询 | 拆单、卖方二次交易、提货全流程未齐 |
| 付款审核、寄卖服务费、充值审核 | 凭证审核及现有状态/账本联动 | 不等于银行已收到钱；真实支付本轮排除，业务费率仍待确认 |
| 提现记录 | 真实记录查询 | 没有完整提现申请/打款流程 |
| 投诉处理 | 查看及填写处理意见 | 不等于已完成退款或外部客服处理 |
| 流水、出价记录 | 真实只读数据 | 不代表完整财务会计/监管报表 |
| 商城内容 | 8项配置，含分类 | 当前是受校验JSON编辑，不是所有内容都有可视化运营表单 |

## ⑤ 一键验收与数据准备

在 H5 项目目录执行（本轮实际跑过）：

    npm run verify:nonpay

前置：Node>=22、Java17、Maven、依赖已安装、本地MySQL和Redis可访问；支持 MAVEN_BIN、JAVA_HOME、TEA_MYSQL_DEFAULTS。测试端口须空闲。脚本自动建唯一 tea_local_* 隔离库、测试角色/虚拟资产，运行测试、三套构建、真实接口/SQL、故障重启与恢复。退出时停止测试服务。

成功判定：本地全部子检查成功，且范围内必要项目无失败/未测试/环境阻塞，发布门禁才可通过。目前脚本明确保留未完成清单，总退出1；不能删除阻塞数组来制造发布成功。只想看本地子结果可读 integration-results 和 commands，不把子检查绿色当作发布绿色。

开发预览：

    npm run local:shared -- --no-build

需先有构建产物。预览保留当前隔离测试数据。正式构建入口是 npm run build:release，必须显式配置正式 HTTPS /app 地址；本轮仅验了缺失配置的拒绝，不声称已对正式域名部署。

日志、隔离库及备份保留供复核；没有通配清理或删除用户数据。清理应按某次 config 精确确认库名/目录后执行；不能把备份/本地配置打包到公网。当前预览测试场次10012已结束、无人出价、库存已归还，记录保留。

## ⑥ 最少人工确认与剩余发布阻塞

这些是缺失业务决策/外部条件，不要求用户重复机械测试：

1. **确认非支付范围和拍卖规则**：拍卖金额是整批价还是单价（当前实现整场成交总额）；是否包括预约、提现、分佣、卖方二次成交、拆单和提货；提供各流程状态/费用/归属规则。为什么需要用户：不能从demo的固定费率或字段推定真实合同业务。预期：确定可实现、可断言的业务规则；本轮未擅改比例或新增真实资金流。
2. **提供非支付服务商与沙箱配置位置**：短信、实名、物流，以及需要短信/微信/站内哪种通知。密钥放本地受控配置，不贴聊天。预期：随后由开发完成适配和正反向联调；当前只有安全拒绝或商家登记。
3. **确认第三端及部署目标**：若三端包含小程序/原生App，提供对应源码/构建方式；提供正式部署目标、HTTPS域名和容量目标（会员、峰值在线、同时出价）。预期：补目标平台构建/真机和容量验收；目前只验证两种H5入口加若依管理端。
4. **运营内容/主观体验**：提供正式协议、隐私/售后文案和商品信息；需要验视觉时只关注现有风格是否保留及文案准确性，不重复已证实的机械CRUD。此处不提供法律合规结论。

剩余影响：NP21–29 中环境/未实现/未测项均可阻断全范围发布；全局JSON行锁、内嵌图片和兼容引擎架构仍需生产容量/存储/可观测性评估，未做容量承诺。退款、二次资金清算、分佣、实名和生产安全不因“支付排除”自动完成。

恢复准备：隔离SQL备份恢复已实测；正式环境仍需代码产物与数据库一致的备份、监控告警、部署演练和回退手册验证。回退不能清空状态，不能仅回前端却继续使用不兼容后台。未经授权不操作生产库。

## ⑦ 交付说明

本轮实际修复已经落到代码，最终统一检查已执行，并保留失败→修复→回归及独立复核证据。报告仍明确有未完成项；不是“所有功能都已完成”的交付承诺。下一步应先得到上面的最少规则/环境信息，再补未实现流程及剩余页面/平台验收。测试通过率不等于业务覆盖率，更不等于商用成熟度。
