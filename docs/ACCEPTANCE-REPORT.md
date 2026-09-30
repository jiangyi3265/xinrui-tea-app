# 鑫芮茶业项目验收报告

> 历史 demo 验收，保留原证据。2026-09-25 已新增真实若依 Java/MySQL 共享模式；最新范围、状态和阻塞以 [共享验收报告](SHARED-ACCEPTANCE-REPORT.md) 为准。下文 Java/静态互通相关旧结论不代表当前版本；demo 测试通过不能算真实集成通过。

验收时间：2026-09-22 23:04（Asia/Shanghai）

验收快照：当前工作区源码快照；关键后端文件 SHA-256 见“可复查证据”。本报告不等同于 Git commit，因项目根目录没有统一 Git 仓库。

## 1. 当前结论

Node demo 业务服务 + RuoYi-Vue3 管理端的本地联调范围已通过：H5、抢购与竞价拍卖、后台登录/动态路由、商品/订单/会员/公告/拍卖管理、共享 JSON 数据、重启持久化和核心业务回归均有实际证据。

当前不满足所列范围的发布条件。原因不是本地回归失败，而是正式三端范围仍缺少：Java RuoYi 茶叶业务后端接入、静态 H5 与运营数据共享、生产/upstream 管理 API、真实第三方支付/短信/实名/物流验证，以及细粒度角色权限。

## 2. 本轮修复记录

| 问题 | 根因 | 修改位置 | 实际验证 |
| --- | --- | --- | --- |
| 会员停用后旧会话仍可访问 | `store.user()` 未检查会员状态 | `server/store.mjs`、`server/demo-api.mjs` | `member disable blocks both fresh login and existing H5 sessions`；HTTP 真实请求覆盖 |
| 下架商品仍可浏览/下单 | 公共目录直接读取完整目录，交易未检查上架状态 | `server/demo/data.mjs`、`server/demo-api.mjs`、`server/demo/community.mjs`、`server/demo/commerce.mjs` | `unpublished products disappear from H5 and cannot be ordered` |
| 下单不扣库存、取消不能恢复 | 订单创建没有库存预占/释放标记 | `server/demo/commerce.mjs`、`server/admin-api.mjs` | 用户取消和后台取消各有回归；HTTP 下单→后台库存→取消也已实测 |
| 不同测试/部署之间库存串数据 | `catalog()` 回退到模块级 fixture 后被原地修改 | `server/demo/data.mjs` | 全量测试稳定通过，库存隔离回归通过 |
| 后台改名/价格后积分和抢购详情仍为旧 fixture | 详情接口按商品 ID直接返回旧 fixture | `server/demo-api.mjs`、`server/demo/community.mjs` | 普通、积分、抢购详情同步回归通过 |
| 隐藏公告仍出现在 H5 | 公告接口未按 `status` 过滤 | `server/demo/community.mjs` | 隐藏→启用的公告回归通过 |
| 后台可把未付款订单直接改成已完成并伪造支付 | 状态接口任意跳转并自动填充支付/物流状态 | `server/admin-api.mjs` | 未付款完成被拒绝；合法履约状态回归通过 |
| 概览“在售商品”包含下架商品 | 指标使用完整目录长度 | `server/admin-api.mjs` | 下架后指标减少的回归通过 |
| 重复构建会把旧资源带入部署包 | 构建前未清理生成目录 | `scripts/build.mjs` | 重新构建后部署包文件数稳定，部署包回归通过 |
| RuoYi 订单状态标签产生 Element Plus warning | `el-tag` 传入空类型 | `RuoYi-Vue3/src/views/tea/orders.vue` | 新浏览器会话订单页实际打开，控制台无 error/warn |
| 原有抢购没有真正的出价/最高价/成交闭环 | 只有 `/order/toAddOrder` 固定价抢购，没有竞价状态模型和后台场次管理 | `server/demo/auction.mjs`、`server/demo-api.mjs`、`server/index.mjs`、`server/demo/community.mjs`、`src/pages/pages-loot-lootdet.js`、`RuoYi-Vue3/src/views/tea/auctions.vue` | 竞价回归与真实 HTTP 验收覆盖低价拒绝、多人出价覆盖、结束选胜、赢家结算幂等和重启持久化 |
| 拍卖场次存在状态回退、库存竞争和数量边界风险 | 结束场次仍可取消、取消场次仍被详情接口返回、同商品可重复开有效场次、创建数量隐式转换；后台库存编辑/删除还可能覆盖或遗留预占库存；赢家结算单可被普通取消 | `server/demo/auction.mjs`、`server/demo/commerce.mjs`、`server/admin-api.mjs`、`src/pages/pages-loot-lootdet.js`、`tests/auction.test.mjs`、`tests/admin-api.test.mjs` | 新增结束不可取消、取消后详情为空、创建时库存预占、同商品有效场次唯一、正整数数量、未完成拍卖禁止改库存/删商品、H5 终态文案、竞价结算单禁止普通取消及历史取消单不可复用回归；相关测试通过 |

## 3. 功能验收表

状态只使用：已实测通过／失败／未测试／环境阻塞／不适用。

| 功能编号 | 操作入口 | 角色 | 预期业务结果 | 关联接口与数据 | 验证方式 | 当前状态 | 证据位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F01 | H5 81 个页面路由 | 用户 | 页面资源存在且可构建 | `docs/routes.json`、`dist/h5` | Node 路由/JS 解析测试 | 已实测通过 | `tests/app.test.mjs` |
| F02 | H5 首页/分类/搜索/详情 | 游客/用户 | 只展示上架商品，详情与后台商品字段一致 | `/category/getCategoryGoodsList`、`/goods/searchShop`、`/shopgoods/getDetails` | 单元+共享目录实测 | 已实测通过 | `tests/app.test.mjs`、`tests/admin-api.test.mjs` |
| F03 | RuoYi 登录页 | 管理员 | 登录返回 token，错误凭据拒绝 | `/login`、`/getInfo`、`/logout` | HTTP 子进程请求+浏览器 | 已实测通过 | `tests/http-acceptance.test.mjs` |
| F04 | RuoYi 动态菜单 | 管理员 | 显示茶叶业务 6 个菜单并可路由进入 | `/getRouters` | HTTP 响应+浏览器 AX 树 | 已实测通过 | `tests/http-acceptance.test.mjs`、浏览器 5174 |
| F05 | 后台经营概览 | 管理员 | 在售商品、会员、订单、成交额及最近订单可见 | `/admin/tea/dashboard` | HTTP、浏览器首页 | 已实测通过 | `tests/admin-api.test.mjs`、浏览器首页 |
| F06 | 后台商品管理 | 管理员 | 新增/编辑/删除/上下架/库存变更持久化并同步 H5 | `/admin/tea/products*`、共享 `state.catalog` | HTTP、单元、浏览器商品页 | 已实测通过 | `tests/http-acceptance.test.mjs`、`tests/admin-api.test.mjs` |
| F07 | H5 下单与取消 | 用户 | 参数/地址/库存校验；下单预占库存，取消只释放一次 | `/order/order/buyNow`、`/order/cancel` | 单元+HTTP真实请求 | 已实测通过 | `tests/app.test.mjs`、`tests/http-acceptance.test.mjs` |
| F08 | H5 余额/积分/微信/支付宝模拟支付 | 用户 | 扣减对应余额或积分，重复支付不重复扣款 | `/pay/balancePay`、`/pay/pointsPayment`、`/demo/pay` | 业务回归 | 已实测通过 | `tests/app.test.mjs` |
| F09 | H5 发货/物流/收货/评价 | 用户 | 状态按顺序推进，重复评价拒绝 | `/order/express`、`/order/receipt`、`/order/evaluation` | 业务回归 | 已实测通过 | `tests/app.test.mjs` |
| F10 | 后台订单管理 | 管理员 | 只能合法推进履约；未付款不能伪造成已完成；取消释放预占库存 | `/admin/tea/orders*` | 单元+浏览器订单页 | 已实测通过 | `tests/admin-api.test.mjs` |
| F11 | 后台会员管理 | 管理员 | 停用阻断新登录和既有 H5 会话，启用可恢复 | `/admin/tea/members*`、`/member/accountLogin` | 单元+HTTP+浏览器会员页 | 已实测通过 | `tests/http-acceptance.test.mjs` |
| F12 | 后台公告管理 | 管理员/游客 | 新增/编辑/删除；隐藏公告不出现在 H5 | `/admin/tea/notices*`、`/notice/getNotice` | 单元+浏览器公告页 | 已实测通过 | `tests/admin-api.test.mjs` |
| F13 | H5 地址、账户、充值、银行卡、签约 | 用户 | 输入校验、持久化和模拟流水一致 | `/address/*`、`/recharge/*`、`/card/*`、`/certification/*` | 业务回归 | 已实测通过 | `tests/app.test.mjs` |
| F14 | H5 仓库/寄卖/上架费/提货 | 用户 | 凭证、费用、状态和余额/券流水联动 | `/order/*` 仓库与寄卖接口 | 业务回归 | 已实测通过 | `tests/app.test.mjs` |
| F15 | H5 团队/收益/优惠券/内容 | 用户 | 查询、筛选、抵扣及隔离行为符合演示规则 | `/team/*`、`/member/getMyProfit`、`/demo/coupons` | 业务回归+全部 reference endpoint 检查 | 已实测通过 | `tests/app.test.mjs` |
| F16 | 管理端与 H5 重启 | 管理员/用户 | JSON 数据重启后保留，token/商品/公告可继续读取 | `DATA_FILE`、`state.*` | HTTP 子进程停止/重启 | 已实测通过 | `tests/http-acceptance.test.mjs` |
| F17 | H5 生产构建与部署包 | 发布人员 | 构建、资源校验、部署 ZIP 一致 | `npm run build`、`dist.zip` | 实际构建+静态包测试 | 已实测通过 | `tests/static-build.test.mjs`、`dist.zip` |
| F18 | RuoYi-Vue3 生产构建 | 发布人员 | 管理端可打包 | `npm run build:prod` | 实际构建 | 已实测通过 | `RuoYi-Vue3/dist/` |
| F19 | Java RuoYi 茶叶后端 | 管理员/用户 | Java Controller/Service/Mapper/SQL 与前端统一认证和数据 | `RuoYi-Vue` | 代码检查；无法编译/启动 | 环境阻塞 | Java 工程无茶叶业务 Controller；本机无 `mvn` |
| F20 | 静态 H5 与后台共享 | 游客/管理员 | 静态 H5 不应与后台各自维护一份数据 | `src/browser/runtime.mjs`、`localStorage` | 代码检查 | 失败 | `docs/STATIC-FLOWS.md` 明确静态版与 `.local/data.json` 隔离 |
| F21 | upstream/生产模式后台接口 | 管理员 | `/prod-api/admin/*` 应转 Java/正式后台 | `server/index.mjs` `API_MODE=upstream` | 代码检查；未有可用上游后台 | 失败 | demo 分支才处理 admin API |
| F22 | 细粒度角色/越权 | 多角色 | 非管理员不能访问管理接口，菜单权限与服务端一致 | admin session、RuoYi RBAC | 只有单管理员 wildcard，未覆盖角色矩阵 | 未测试 | `server/admin-api.mjs` 固定 `roles/permissions` |
| F23 | 真实支付/短信/银行/实名/物流回调 | 用户/外部服务 | 真实外部状态、签名、重试、幂等和对账 | 外部服务凭据/回调 | 当前仅本地模拟，无授权凭据 | 环境阻塞 | README 与 `docs/STATIC-FLOWS.md` |
| F24 | 性能、并发、真机/多浏览器兼容 | 用户/发布人员 | 达到明确容量目标且跨目标环境稳定 | 未定义容量目标/设备矩阵 | 未执行压测和真机矩阵 | 未测试 | 无适用目标与环境 |
| F25 | H5 竞价拍卖 | 用户/管理员 | 展示起拍价和当前价；出价必须达到最低加价；多人出价后只保留最高价；有效场次预占库存且同商品不可重复创建；未完成拍卖商品不能改库存或删除；取消场次不再展示；结束/成交后 H5 按状态显示去结算或终态文案；赢家待付款结算单不可普通取消，历史取消单不可复用；结束后最高价者可生成唯一待付款结算单；非赢家不可结算 | `/auction/list`、`/auction/detail`、`/auction/bid`、`/auction/bids`、`/auction/settle`、`/order/cancel`、`/demo/pay`、`/admin/tea/auctions*`、`state.auctions`/`state.auctionBids` | 单元、真实 HTTP 子进程、浏览器后台拍卖页、源码回归 | 已实测通过 | `tests/auction.test.mjs`、`tests/admin-api.test.mjs`、`tests/http-acceptance.test.mjs`、`RuoYi-Vue3/src/views/tea/auctions.vue` |

独立复核者已复读验收标准并完成最终复测：无出价到期释放库存、状态写入并跨重启保持；有出价到期的最高出价者、成交价和预占库存保持一致；结算取消保护、重复结算幂等及 H5/管理端状态同步均无回归。该复核结论来自独立复核者，不是主代理自审。

## 4. 可复查证据

### 自动化命令

最终执行：

```bash
cd /Users/jiangyi/Desktop/程序/分销茶叶总/分销茶叶
npm run verify
```

最终结果：退出码 0；H5 构建成功（86 chunks，部署包 148 files）；36 个 Node 测试全部通过；RuoYi-Vue3 `npm run build:prod` 成功。

直接回归命令 `npm test` 在干净构建产物上也为 36/36 通过，退出码 0。

### HTTP 与浏览器

- `tests/http-acceptance.test.mjs` 启动真实 `server/index.mjs` 子进程，覆盖 401 鉴权、管理员登录、动态路由、商品新增/上下架、H5 下单/取消库存、竞价出价/结束/赢家结算、会员停用、重启后持久化。
- 真实服务探测：`/health` 200；`/prod-api/login` 200 且返回 token；`/prod-api/getInfo` 返回 admin；`/prod-api/getRouters` 返回 6 个茶叶子路由；dashboard/product/notice/auction 接口分别返回 200；H5 token 访问 admin 接口返回 401。
- 127.0.0.1:5174 浏览器实际打开首页、商品、订单、会员、公告、拍卖管理页面；拍卖页面可见场次、当前价、出价次数、结束拍卖操作，控制台 error/warn 为空。
- 127.0.0.1:5180 H5 拍卖详情实际显示“立即竞价”；登录后的出价、结束、赢家结算使用真实 HTTP 请求和持久化断言验证，未把未登录页面显示当成业务闭环通过。

### 环境检查

- `java -version`：17.0.19；项目 README 要求 JDK 8。
- `mvn -version`：退出码 127，`mvn` 不在本机 PATH，且项目没有 `mvnw`。
- `mysqladmin ping`：`mysqld is alive`；`redis-cli ping`：`PONG`。这不能替代 Java 后端编译、迁移和接口验证。
- `RuoYi-Vue` 当前仅有若依通用系统模块；未发现茶叶商品/订单/会员业务 Controller、Service、Mapper 和迁移。
- 独立启动 `API_MODE=upstream PORT=5190 node server/index.mjs` 后请求 `POST /admin/login` 实测 HTTP 404（`接口不存在`）。

### 关键源码快照

```text
server/index.mjs       82e892c59005a59bf694bc57812755173c39d325a211bce05cb75abc1d646215
server/admin-api.mjs   400ae42234ec4de07e7a64ce25b2fd2fa464659b03d4281220c32e165730b461
server/demo-api.mjs    7081f4385a76e668d219cbbbce5e40d041d378b747ef6e15409032c4a38fb7e2
server/demo/community.mjs aac5cb6702b4b169be3996cccfb4f453a41a31025d6b7e966a71178a36f3f4d1
server/demo/commerce.mjs  dc49bad5505466e37307ba7865e7378c54c156019768d8922c4b57aff78508c9
server/demo/auction.mjs    ea493b12f434a54986a1d6f45846529e36a53dfd3d97e65aa63d061fccfd528b
scripts/verify.mjs     10c4ce90ed42c8accff85913abcc395f54201e6826fa4f3bf59b9c5e37e30fbb
tests/http-acceptance.test.mjs 79a6299ea6f33d66a8ad9958d36f2606cef5aaae19913b223f3f03f6e8ff4d80
tests/auction.test.mjs a785ccc55dfcc20e1fe0e46884cb39e1735232c18a5dc65b70abe8eeb7b999b7
tests/admin-api.test.mjs ee6d375f672af03c5f138ffe5a21be8042d1d015c0c668714233ae1a3156d75e
src/pages/pages-loot-lootdet.js 46ae878951ebf8bf888f3acff136aaceab5962d3993a1c7f75b610de714350da
```

## 5. 一键验收方法

前置条件：Node.js 22+；`分销茶叶/node_modules` 和 `RuoYi-Vue3/node_modules` 已安装；无需真实支付/短信凭据。运行 `npm run verify`，成功判定为退出码 0 且输出 `36 pass / 0 fail` 和两端构建成功。该命令只覆盖本地 demo + RuoYi-Vue3 联调范围，不得据此宣称 Java/第三方/静态跨部署已通过。

## 6. 最少人工验收清单

1. 提供并确认正式 Java RuoYi 后端的茶叶业务模块、数据库迁移、JDK8/Maven 构建环境和部署地址；需要人工确认是因为当前工作区没有这些 Controller/Service/Mapper，Node demo 不能替代生产后端。
2. 决定静态 H5 是否纳入三端范围。若纳入，需要提供共享 API 域名/鉴权方案，并验证静态 H5 修改后能被后台读取；当前静态包按设计使用 localStorage。
3. 在隔离的第三方沙箱配置支付、短信、实名和物流回调，执行签名、超时、重试、重复回调及对账验收；本地 demo 明确不会连接这些服务。
4. 提供生产角色矩阵和容量/设备目标，补做多角色越权、并发库存和真机/浏览器矩阵；当前没有可据以宣称达标的目标或环境。

## 7. 剩余问题与阻塞

| 严重度 | 问题 | 影响 | 下一步 | 需要补充 |
| --- | --- | --- | --- | --- |
| P1 | Java RuoYi 未接入茶叶业务，且本机无 Maven/JDK8 | 正式 RuoYi 后端链路无法发布 | 实现 Java 业务模块/迁移并接入同一认证和数据源 | Java/Maven、数据库 schema、业务字段确认 |
| P1 | 静态 H5 与 Node/admin 数据隔离 | 静态部署不满足三端互通 | 增加远端 API 模式或将静态 H5 排除正式范围 | API 域名、CORS、鉴权方案 |
| P1 | upstream 模式不提供 admin API | 生产代理到正式后端时后台不可用 | 在正式后端实现 `/admin/tea/*`，再做 upstream 联调 | 正式后端地址与凭据 |
| P1 | 当前只有 admin + `*:*:*` | 无法证明角色级越权安全 | 接入 RuoYi RBAC、菜单权限和服务端注解/策略 | 角色权限矩阵 |
| P1 | 支付/短信/实名/物流仍是 demo | 不能用于真实商业交易 | 沙箱联调并验证回调、重试、对账、回滚 | 各服务沙箱凭据与回调地址 |
| P2 | 尚未执行性能/真机兼容矩阵 | 不能宣称容量或所有设备兼容 | 明确目标后补压测和设备矩阵 | 容量目标、设备/浏览器清单 |
| P2 | 本地竞价出价不冻结余额，且未做分布式并发锁 | 可验证竞价规则和赢家结算，但不能直接承载真实保证金/高并发竞价 | Java 正式后端中加入保证金、事务/行锁、幂等键和超时回滚 | 保证金规则、并发目标、正式数据库 |
