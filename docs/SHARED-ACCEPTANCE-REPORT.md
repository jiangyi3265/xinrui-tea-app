# 若依三端共享开发与本地验收报告

> 最新追加排查、修复和最终版本证据见 [第二轮验收报告](RECHECK-ACCEPTANCE-REPORT.md)。本文保留首轮范围和证据，不代表最新测试统计；局部接口通过不等于后台功能已经齐全。

验收日期：2026-09-25，Asia/Shanghai。本文替代历史 demo 报告中的当前结论，旧证据保留不覆盖。

## 1. 当前结论及需要确认的事项

已实现并实际运行：原 H5 用户端、独立静态 H5、若依 Vue3 管理端，经真实若依 Java 后端访问同一 MySQL 状态。保留 H5 CSS、布局和原有视觉资源；改动了接口连接、下单幂等参数及积分交易密码交互，新增后台使用若依现有组件。

当前版本在本文列明的本地 API 集成及局部浏览器范围内通过。**当前不满足所列范围的发布条件**，不能宣称全部页面、全业务、真实支付或商用成熟度通过。

需要业务方集中确认：① 拍卖成交款由平台代收后结算卖家，还是买家直接付给卖家？如何关联原卖方、计费及退款？② 提现允许哪个账户、最低额、手续费、审核和打款方式？③ 提供拟用短信、支付、实名/银行卡、物流的沙箱资料及允许联调的回调域名。未提供前不会伪造这些业务成功。团队分佣、寄卖定价/拆分规则也需业务确认后才能作为发布验收规则。

本次“三端”明确指仓库中可运行的两个 H5 入口与若依管理端；没有发现已提供可独立验收的原生 App/小程序工程，不将浏览器测试写成真机测试。

## 2. 实现方式与边界

- `RuoYi-Vue3`：15 个茶叶业务菜单，沿用动态路由、Element Plus、RBAC 按钮权限。新增付款/充值/上架费审核、投诉处理、仓库/流水/出价查询和商城内容配置；新增零资产会员开户。
- `RuoYi-Vue`：`TeaController` 承接 `/admin/tea/**` 和 `/app/**`；管理员身份来自真实 RuoYi JWT，权限按模块和 HTTP 方法检查。会员 token 与系统管理员账号分离，不能互相冒用。
- Java `TeaBusinessService` 使用 MySQL 事务和 `SELECT … FOR UPDATE` 覆盖状态计算、库存、账本、凭证唯一声明和审计提交；失败不保存部分状态。Redis 记录登录/交易密码失败次数，5 次失败锁定十分钟，重新登录不能绕过会员交易密码锁。
- 私有 Node 引擎只监听 loopback，验证至少 32 字符密钥，复用恢复后的 H5 业务契约，无独立 JSON 持久化。Java 是唯一持久化入口。该方案是**Java 若依 + 私有兼容引擎**，不是所有业务已重写为纯 Java。
- 追加迁移 `sql/tea_business.sql` 创建 `tea_business_state`、`tea_business_audit`、`tea_voucher_claim` 及四类角色模板。当前业务保存在聚合 JSON 中，单行锁确保本地并发一致性，但未做容量验证；生产分表、敏感字段保护及容量上限仍是阻塞。
- 上传先验证会员、真实图片以及解码前像素限制（4096 单边、800 万像素），再绑定图片哈希到上传者（有效期 24 小时）；金融凭证必须属于该会员的已验证上传，同一图片不能跨业务/跨用户重复核销。图片实际到账仍须财务核实。
- 生产迁移初始会员/商品/拍卖为空，不注入 demo 资产。隔离启动脚本明确生成两个测试会员和虚拟测试资产，严禁直接作生产初始化。
- 未配置短信、真实支付、实名、银行卡/开户等接口明确失败；没有回退到浏览器模拟支付。现有微信/支付宝开关 `20` 表示关闭，余额和积分 `10` 表示开启（以实际 H5 判断逻辑为准）。

## 3. 功能验收表

状态仅使用：已实测通过／失败／未测试／环境阻塞／不适用。表中“通过”严格限于预期结果列；只读接口通过不等于该模块全部写入流程通过。81 个页面的完整逐项范围另见 [页面验收表](SHARED-PAGE-MATRIX.md)，未实测整页保持未测试。

证据代号：E=`../.local/shared/mugufxfie05b17/`；B=`../.local/shared/mugt1d0g0ccd8e/`。路径相对本报告目录；这些本地证据不提交到 Git。

| 功能编号 | 操作入口 | 角色 | 预期业务结果 | 关联接口与数据 | 验证方式 | 当前状态 | 证据位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S01 | 启动及生产构建 | 开发 | Java/H5/管理端构建并启动 | Maven、H5 build、Vite、MySQL/Redis | 实际构建和 HTTP 探测 | 已实测通过 | E/commands.jsonl、构建日志 |
| S02 | 若依登录/菜单 | 管理员 | JWT 登录、15 茶叶子菜单 | /login、/getInfo、/getRouters | 真实集成＋浏览器 | 已实测通过 | INT-01；B 浏览器证据 |
| S03 | 商品写入/充值读取 | 只读/财务 | 无权限写入 403；财务可读充值但不能建商品 | sys_role/menu、/admin/tea/* | 三账号真实请求 | 已实测通过 | INT-01 |
| S04 | H5 登录及开户 | 会员/运营 | 真实登录；后台新会员零资产；无密码哈希泄露 | /member/accountLogin、/admin/tea/members | API＋SQL | 已实测通过 | INT-02 |
| S05 | 停用会员 | 运营/会员 | 旧 token 立即失效，重新启用不恢复旧会话 | /admin/tea/members/:id、sessions | API、共享单测 | 已实测通过 | INT-10；tests/shared-api.test.mjs |
| S06 | 商品管理→两 H5 | 运营/游客 | 新增/编辑后同源与静态端数据一致，非法价格不保存 | /admin/tea/products、/category/getCategoryGoodsList、catalog | API＋SQL＋浏览器 | 已实测通过 | INT-03；B 商品截图 |
| S07 | 下单、支付、履约 | 会员/运营 | 重复请求不重建订单；扣余额一次；不自动发货；发货后重复支付不回退；收货持久化 | /order/order/buyNow、/pay/balancePay、/admin/tea/orders、/order/receipt | 真实 API＋SQL 断言 | 已实测通过 | INT-04 |
| S08 | 查看他人订单 | 另一会员 | 不可读取或处理别人的订单 | /order/detail | 两会员真实请求 | 已实测通过 | INT-04 |
| S09 | 库存取消/积分支付边界 | 会员/运营 | 库存预占释放一次，支付口令必需 | commerce、sharedH5 | 内存/Node 回归；不冒充积分全程 UI | 已实测通过 | Node 日志、共享/拍卖测试 |
| S10 | 拍卖创建/出价/结算 | 运营/多会员 | 场次数量 2 与库存一致；并发同价只一个成功；非赢家不能结算；重复成交单唯一 | /auction/*、/admin/tea/auctions、auctions/warehouse | 并发真实 API＋SQL | 已实测通过 | INT-05 |
| S11 | 拍卖取消边界/空场次 | 会员/游客 | 赢家成交单不能普通取消；空库不显示虚构场次 | /order/cancel_grab、/goods/getLootList | API＋共享单测 | 已实测通过 | INT-05；共享单测 |
| S12 | 上传及金融凭证 | 会员 | 未登录拒绝；伪造 data URI/私有上传路径拒绝；真实 PNG 可上传 | /app/upload/image、/_upload、uploads | 实际 multipart＋SQL | 已实测通过 | INT-12 |
| S13 | 拍卖付款审核 | 买家/财务 | 上传只待审；不能自确认；审批幂等；仓库结算状态同步 | /order/payment_voucher、/admin/tea/settlements、claims | API＋SQL | 已实测通过 | INT-06 |
| S14 | 积分充值审核 | 会员/财务 | 提交不入账；通过只入账一次；驳回不入账；凭证不能复用 | /recharge/toOrder、/admin/tea/recharges、ledger | API＋SQL | 已实测通过 | INT-07 |
| S15 | 寄卖现金服务费 | 会员/财务 | 上传待审；通过后仓库寄卖中 | /order/toServiceChargeWithVoucher、/order/uploadListingFeeVoucher、/admin/tea/fees | API＋SQL | 已实测通过 | INT-08 |
| S16 | 公告和商城内容 | 内容管理员/游客 | 后台保存后两入口重读一致；脚本内容拒绝 | /admin/tea/notices、/admin/tea/content、content | API＋SQL | 已实测通过 | INT-09 |
| S17 | 15 管理资源查询 | 管理员 | 返回真实集合/空集合，不把读操作称为审核通过 | /admin/tea/dashboard/products/orders/auctions/members/notices/warehouse/settlements/fees/recharges/withdrawals/reports/ledger/bids/content | 真实 GET；局部 UI | 已实测通过 | INT-10 |
| S18 | H5 改昵称→后台 | 会员/运营 | 修改后后台及刷新仍一致 | /member/editMember、members | 浏览器实际点击＋SQL | 已实测通过 | B/browser-results.json、browser-members.png |
| S19 | 独立静态 H5 | 游客/会员 | 不使用本地 demo 数据，跨源接 Java；静态服务不提供业务 API | config.js、Java /app、CORS | API＋浏览器详情 | 已实测通过 | INT-02/03；B/final-browser-results.json |
| S20 | 交易密码限速 | 会员 | 连错 5 次锁定；新 session 仍拒绝 | verificationPayPassword、Redis | 真实请求＋重新登录 | 已实测通过 | INT-14 |
| S21 | 引擎故障 | 用户 | HTTP 503，revision 不变、无部分保存 | Java→私有 engine→MySQL | 停止引擎故障注入 | 已实测通过 | INT-13 |
| S22 | 全服务重启 | 多端 | 同一库商品/业务记录不丢失 | MySQL 持久化 | 停止/重新启动整栈 | 已实测通过 | INT-11 |
| S23 | 隔离备份恢复 | 运维 | 新库恢复状态哈希、revision、审计/凭证/权限条数一致 | mysqldump、*_restore | 真实备份/恢复/SQL 比对 | 已实测通过 | INT-15；restore-result.json |
| S24 | 投诉处理全部分支 | 会员/仓管 | 提交、处理意见、再次进入一致 | /order/toOrderReport、/admin/tea/reports | 代码实现；本轮完整 UI/集成闭环未覆盖 | 未测试 | shared-api.mjs、records.vue |
| S25 | 提现申请/审核/打款 | 会员/财务 | 完整资金流与撤销、失败处理 | withdrawals；当前只读 | 代码检查，缺规则且未实现写入 | 失败 | shared-api.mjs；待确认规则 |
| S26 | 寄卖二次成交给原卖家结算 | 卖家/财务 | 原卖家关联、付款归属、卖方入账正确 | settlements direction=in、sellerId | 代码检查，缺真实卖方关联和结算规则 | 失败 | shared-api.mjs |
| S27 | 短信注册/实名/银行卡/外部支付及回调 | 用户/外部服务 | 沙箱身份、签名、回调幂等和对账 | 第三方 provider | 无授权沙箱凭据，明确拒绝未接入操作 | 环境阻塞 | INT-10 仅证明拒绝，不证明提供方成功 |
| S28 | 真实物流轨迹 | 用户/商家 | 真实物流单号和轨迹同步 | /order/express、物流商 | 仅支持已登记发货说明，无物流商接入 | 环境阻塞 | shared-api.mjs |
| S29 | 团队分佣/收益计算/拆单规则 | 会员/业务方 | 按确认规则计算且账本一致 | team/profit/warehouse | 未完成真实收益规则验收 | 未测试 | 页面清单＋规则待确认 |
| S30 | 81 页面每个操作及全部角色矩阵 | 所有角色 | 整页闭环、刷新、边界、全部按钮可用 | docs/routes.json | 构建校验不是整页 UI 验收 | 未测试 | SHARED-PAGE-MATRIX.md |
| S31 | 真机/浏览器矩阵/容量目标 | 用户 | 目标设备与容量满足约定 | 无明确容量目标和真机矩阵 | 未执行 | 未测试 | 不宣称全平台或性能达标 |
| S32 | 生产反代/监控/密钥/恢复演练 | 运维 | HTTPS、告警、权限、恢复可执行 | 生产环境 | 本地有审计与故障证据，未部署生产 | 未测试 | 本报告发布清单 |

## 4. 复现与修复记录

| 编号 | 复现 → 预期/实际 | 根因与影响 | 修改位置 | 验证 |
| --- | --- | --- | --- | --- |
| D01 | 静态 H5 改数据，后台应同步；原先分别 localStorage/JSON | 互不共享，三端断开 | runtime.mjs、server/index.mjs、TeaController/Service、tea_business.sql | INT-02/03/11，真实静态 UI |
| D02 | macOS 启动 Java 应成功；写 /home/ruoyi/logs 失败 | Linux 硬编码日志目录阻断本机启动 | logback.xml | Java 启动日志；原失败 mugt1d0g0ccd8e/java.log |
| D03 | H5 JSON 登录应正常；实测 HTTP 400 | 每次 getInputStream 返回重复包装流，循环重复读 | TeaController.parameters | 原 mugt9ux97c8914；最终 INT-02 |
| D04 | 服务运行时重新构建应不中断；出现 ClassNotFoundException | 正在读取的 jar 被新构建覆盖 | shared-stack.mjs 复制独立 runtime jar | 最终构建/双栈运行及重启 |
| D05 | 新会员应零资产；原 demo 自动生成余额、卡和订单 | demo 种子复用风险 | demo/data.mjs、shared-api.mjs | INT-02，开户后 SQL |
| D06 | 无交易密码不能扣款；原余额/积分直接支付 | 支付验证缺失，前端积分绕过弹窗 | shared-api.mjs、pages-classify-submit.js | 共享单测、INT-04/14 |
| D07 | 重复 checkout 应同一订单；原重复预占库存 | 缺请求幂等键；付款还会假发货 | shared-api.mjs、pages-classify-submit.js | INT-04：扣款/发货/收货和重复支付 |
| D08 | 数量为 2 的拍卖结算应入库 2；原入库固定 1 | 拍卖与仓库字段错配 | demo/auction.mjs | INT-05；取消成交单保护回归 |
| D09 | 凭证只是待审证据；原 demo 直接视作完成 | 模拟业务不能作为真实财务结果 | shared-api.mjs、records.vue、tea_voucher_claim | INT-06/07/08/12 |
| D10 | 空数据库抢购应为空；独立复核发现仍有 fixture 场次 | 未覆盖同类列表旧 fixture 回退 | shared-api.mjs /goods/getLootList | 共享单测真实空库分支 |
| D11 | 伪造 PNG data URI 应失败；复核用任意字节可申请充值 | 仅正则校验，绕过 ImageIO 上传 | 已验证上传哈希与会员绑定 | INT-12＋共享单测；有效上传仍可提交 |
| D12 | 支付密码错误应限速；原可无限尝试 | 安全计数不能随失败业务回滚 | TeaBusinessService Redis 计数 | INT-14，重新登录仍锁定 |
| D13 | 非超管应按职责使用；原只有菜单未分配角色模板 | 缺生产角色菜单迁移 | tea_business.sql | INT-01 财务/只读/超管；不表示全角色矩阵 |
| D14 | 测试结束应有确定退出码；原 top-level await exit13 | 只检查 exitCode，没有识别 signalCode；shutdown 懒初始化顺序 | shared-stack.stop、ShutdownManager | 最终故障/重启/结束正常，无关闭时初始化异常 |
| D16 | 初次加载已有目录且无拍卖标记时，零库存仍展示运行场次 | 旧 demo 自动开场逻辑进入共享模式 | demo/auction.mjs 共享模式禁用所有自动开场 | 新回归修复前 exit1、修复后通过；最终 46 条回归 |
| D17 | 小压缩文件可声明超大图片，可能耗尽内存 | 解码前没读宽高 | TeaController ImageReader 预检像素 | INT-12：50000×50000 声明被 400 拒绝，revision 不变 |
| D15 | 静态端配置应覆盖真实加载路径；检查发现测试查了无用路径 | preview config 路径不是 HTML 引用路径 | preview.mjs、verify-shared.mjs | 最终检查 /h5/static/demo/config.js；静态页面读真实商品 |

中间失败如实保留：`mugtbr1wa3cedd` 地址测试用了错误分散字段，读取原 H5 后改为实际 `region=省,市,区` 契约；未修改业务接口或放宽断言。`mugtis376de3c4` 的 exit13 不作整体通过证据。历史报告的 Java/Maven 不可用已通过发现 IntelliJ 内置 Maven 解决。

## 5. 可复查证据与最终版本

三个 Git 仓库开始时已有未提交修改，本轮未清理或替换用户修改，也未提交 Git。基准 HEAD：H5 `a91c7984a0f6174fe25faa71cf7a0bd705e11162`；Java `0cdbba90d69d43de7e931e5fc15f728bc43efb50`；管理端 `1e704aaa09590a2a348bf920cd7e31b804cf33f8`。最终源码差异/文件哈希见 E/source-manifest.json（包含未跟踪源码，不含密钥/数据库内容）。

最终统一命令：`npm run verify:shared -- --release`，2026-09-25 18:54:31–18:55:14（北京时间）执行本地检查；总退出码 **1**，原因是严格发布门禁发现已知必要范围未完成，不是局部测试失败。

| 实际检查 | 结果 | 证据 |
| --- | --- | --- |
| npm test | 46 tests，46 pass，0 fail/skip | E/node-tests.log |
| Maven -q -pl ruoyi-admin -am package | 退出 0；未传 skipTests；不虚构 Java 单测数量 | E/java-package.log |
| H5_API_BASE=/app npm run build | 退出 0 | E/h5-build.log |
| RuoYi-Vue3 npm run build:prod | 退出 0 | E/admin-build.log |
| 真实 Java/MySQL/Redis 共享集成 | 15 组通过；不是 15 个完整模块全部覆盖 | E/integration-results.json |
| 隔离持久化核对 | revision 36，3 会员，1 商品、商城订单、场次和付款单，36 审计 | E/persistence-summary.json |
| 隔离库备份恢复 | SHA256/revision 与审计/凭证/角色菜单计数一致 | E/restore-result.json |
| 浏览器局部闭环 | 后台新增商品、H5 详情/登录/改名、后台刷新；重启后静态端商品仍一致 | B/browser-results.json、B/final-browser-results.json 及截图 |
| 独立子代理复核 | 直接读代码和实际回归；结论见独立报告，不冒充自审 | SHARED-INDEPENDENT-REVIEW.md |

最终集成后仅清除了 logback.xml 原有行末空格，`xmllint --noout` 与 Java `git diff --check` 均退出 0，无业务代码变化。

E/commands.jsonl 包含子命令、开始/结束时间、cwd、退出码和日志路径。共享单测 10 条属于内存隔离测试；其余既有 Node 用例包括 demo/HTTP/build 回归，**46 不能全部称为真实集成**。真实数据库业务证据单独为 15 组 INT。浏览器是 Codex 内置桌面浏览器；不是手机真机。当前工具未提供浏览器完整 HAR，HTTP 参数/响应/持久化的证据由真实请求集成脚本记录断言。独立静态 H5 最终控制台无 error/warn；管理端历史记录包含 10:56:02Z 主动重启服务期间的 1 次 AxiosError，重启后刷新已恢复并读出已存配置，未隐去该记录，不宣称全部页面无错误。最后额外实测内容编辑：非法 JSON 被拒绝、有效空数组保存，刷新后“已配置”；SQL revision=5 且 banners=[]。

隔离 SQL 备份和配置文件包含本地测试资产/会话，仅存权限受限且 Git 忽略的 `.local`，不放入公开报告。不要分享 `config.json`、`current.json` 或 `isolated-backup.sql`。没有修改原 `xc_jiedan` 数据库，也没有真实付款或对外发送信息。

## 6. 一键验收与运行方法

前置：Node 22+（实测 26）、Java 17、Maven、运行中的 MySQL/Redis；三个相邻仓库已安装依赖；上述测试端口空闲。默认连接本机无密码 root 仅为此开发机准备，可通过 README 的 CLI 配置和 Java 环境变量改为隔离账号。

```bash
cd /Users/jiangyi/Desktop/程序/分销茶叶总/分销茶叶
npm run verify:shared
# 严格发布门禁（本轮实际执行，当前必须退出 1）
npm run verify:shared -- --release
# 保持可供人工查看的本地服务
npm run local:shared
```

普通验收的成功条件：全部本地检查和 15 组真实断言完成、无失败；退出 0 仅为本地范围结果。`.local/shared/latest-verification.json` 仍写 `releaseReady:false`。`--release` 需要完整发布范围满足后才允许通过；目前明确失败，不能删除阻塞列表制造通过。

运行地址：管理端 `http://127.0.0.1:5174/`；H5 `http://127.0.0.1:5173/`；独立静态 H5 `http://127.0.0.1:5180/`。账号见 README，仅限隔离本机。`local:shared -- --no-build` 可复用已构建产物；代码改动后须先构建，不能用旧 jar 验证新源码。

测试数据：每次验收新建随机 `tea_local_*`，恢复使用另一个新 `*_restore` 库，均保留用于复核。Ctrl+C 停止进程组，不删除数据库；本轮没有清理用户数据库或证据。若需清理，只能在核对 `config.json`/`restore-result.json` 精确库名并确认无须保留后删除这些隔离库；不要批量匹配原库或复跑带 DROP 的若依初始化。生产备份、回滚到已发布版本、HTTPS/反代部署、监控告警仍需专门演练，本地恢复不代替生产恢复。

## 7. 剩余问题与最少人工清单

| 严重程度 | 未完成项/影响 | 下一步及最少补充 |
| --- | --- | --- |
| 发布阻塞 | 原卖方与成交款归属未定义，不能正确给卖家结算 | 业务方给一笔完整示例：买家、原卖家、成交价、各项费率、收款方和最终入账金额；据此补模型/结算/退款/幂等测试 |
| 发布阻塞 | 提现仅有列表，无申请扣款/审核/打款闭环 | 明确账户来源、最低额、手续费、审核/拒绝及打款渠道；开发和自动化由代理继续完成 |
| 发布阻塞 | 短信、支付/实名/开户/银行/物流提供方未接入 | 提供沙箱和授权回调环境；只给测试凭据，不需要生产付款授权 |
| 发布阻塞 | 聚合 JSON、单锁及图片数据增长；会话 token 仍在 DB 中原文存储（24h 过期） | 生产前设计业务分表/对象存储/令牌哈希及轮换/敏感数据保护，明确容量目标后压测；本轮无性能结论 |
| 发布阻塞 | 81 页面并未逐按钮完整验收，部分 demo 旧流程在共享模式会被明确拒绝 | 继续按页面矩阵补后台能力与 UI 集成回归，不把拒绝未接入当成功 |
| 发布阻塞 | 全角色矩阵、生产配置、监控告警、真机未验收 | 继续自动化角色/状态覆盖；确定目标 iOS/Android/浏览器版本及实际设备 |
| 业务确认 | 团队收益和寄卖费率/拆分规则可能只代表原 demo 假设 | 提供规则或一组输入→应付/应收结果，避免根据现有实现反推需求 |

人工只需确认关键规则、提供沙箱/目标设备和主观确认原样式是否符合预期；已经由脚本验证的登录、并发、幂等、数据恢复不要求再次机械点击。需要真机的原因是桌面浏览器无法证明微信环境、系统支付跳转及相册上传行为；给定设备后由开发方执行能执行的检查，不把工作转交用户。

本轮新增管理页面遵循已读取的 Impeccable 界面技能：沿用若依组件、明确加载/失败/空数据、只读与未配置提示；没有进行 H5 视觉重设计。
