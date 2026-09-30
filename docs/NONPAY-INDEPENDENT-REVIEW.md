# 非支付核心独立只读复核

复核日期：2026-09-27（Asia/Shanghai）  
复核者：独立子代理复核  
范围：共享模式会员资料、地址、登录/退出、商品与订单读写；重点检查 `shared-api → demo-api` 的鉴权、方法约束、输入验证、用户隔离、演示数据回落与假成功。  
边界：未修改业务代码；未启动或停止全栈，未改变隔离数据库或浏览器状态；仅运行 Node 内存复现和既有共享单测。

## 结论（最新复核）

本轮只读复核命令 `node --test tests/order-safety.test.mjs tests/admin-api.test.mjs tests/shared-api.test.mjs tests/nonpay.test.mjs tests/shared-pages.test.mjs tests/auction.test.mjs` 已实际通过 **63/63**；主代理最新证据目录 `.local/shared/muj3v8b2ca579f/` 的完整 `npm test` 为 **87/87**，25/25 真实 HTTP/SQL 组均为“已实测通过”。新增空拍卖/公告兼容、真实场次窗口、公开拍卖列表/详情可见性、预约关闭、H5 图片/倒计时/终态渲染、空图片回退、已结算赢家查看入口、订单地址归属和拍卖上下架保护均有回归证据；历史 NP-01、NP-02、NP-03、NP-05、NP-06、NP-07、NP-09、NP-10 的修复均有回归证据。NP-04 短信注册仍是明确的“未配置”阻塞，不能算注册已实现。

NP-09 已在本轮修复并通过纯 Node 回归：shared checkout 门禁和 `commerceApi` shared-mode 防线均拒绝 scheduled/running 场次的普通/积分购单，取消场次后才允许正常下单。修复前失败证据仍保留在 `.local/shared/muj2lx787afac4/auction-gate-before.log`。

上轮指出的已结算赢家按钮和空图片数组回退已通过限定回归；本轮进一步复核了订单地址/重复收货和拍卖商品上下架边界。此前 NP-11 的本地 `adminApi/demoApi` 演示兼容问题已在当前底层管理路径增加拦截；`sharedAdmin`（真实 Java 业务执行前的共享引擎入口）从始至终也会先做字段校验和预占库存保护，未确认生产共享路径存在该缺陷。最终全栈证据目录已由主代理提供并完成证据阅读，但本子代理没有重新启动或操作其服务。NP-04 注册仍是环境/功能阻塞，不能把本报告结论扩大为除支付外全部功能已商用。

### 本轮历史问题状态

| 编号 | 最新状态 | 实际证据 |
| --- | --- | --- |
| NP-01 密码修改撤销全部旧会话 | 已实测通过 | `tests/nonpay.test.mjs` 第 7 项；旧 token 均返回 `-500`，其他会员会话仍可用 |
| NP-02 写接口 HTTP 方法 | 已实测通过 | 第 6 项；GET/PUT/DELETE 均拒绝且前后 state JSON 不变 |
| NP-03 服务端 logout | 已实测通过 | 第 8 项；只撤销当前 token，另一 token 保持有效，重复 logout 幂等 |
| NP-04 短信注册/验证码 | 环境阻塞（未实现） | 第 10 项；注册和短信均明确返回“短信服务未配置”，无用户创建；不应标记为注册通过 |
| NP-05 地址类型/长度校验 | 已实测通过 | 第 9 项；对象、空白、超长输入原子拒绝，合法输入 trim 后保存 |
| NP-06 空拍卖/寄卖公开回落 | 已实测通过 | 第 12～14 项；空数据不生成未来时间/寄卖行，真实场次按精确 auction_id 返回 |
| NP-07 缺少 `adminNotices` 异常 | 已实测通过 | 第 11 项；旧 state 返回空列表/缺详情，不抛异常、不回落 fixture |
| NP-09 竞价商品绕过普通/积分购单 | 已实测通过 | 第 15 项；scheduled/running × 两购单路由 × 余额/积分均拒绝且 state 不变，取消场次后正常下单 |
| NP-10 公开拍卖列表/详情暴露 draft、下架商品或错误 ID 回退 | 已实测通过 | 第 16 项；列表/详情仅返回已发布真实场次，draft/下架为空，显式无效 ID 不回退、不出价 |

## 本轮 H5 竞价详情最终复核（独立子代理复核）

### 已复核通过

| 检查点 | 独立实测/证据 | 结果 |
| --- | --- | --- |
| `image` 数组渲染真实商品图片 | `tests/shared-pages.test.mjs` 的 H5 render mock，断言 `/real.png` 进入 `v-uni-image` | 已实测通过（Mock） |
| 结束场次优先按业务状态显示 | 同一 render mock 使用 `status=ended`、`end_time` 仍在未来，断言显示“拍卖已结束”、不生成 `count-down`，赢家按钮为“去结算” | 已实测通过（Mock） |
| 赢家首次结算入口 | `auctionButtonText`/`paymoney` 代码阅读及上述 render mock；`ended + isWinner + 无 settlementOrderId` 调 `/auction/settle` | 已实测通过（Mock/代码） |
| 秒、毫秒及小数秒时间值 | `tests/shared-pages.test.mjs` countdown mock：`1800000300.123` 转为 `1800000300123` | 已实测通过（Mock） |
| 定时器重复启动与卸载清理 | 同一 countdown mock 第二次 `gogogo()` 清理旧 timer，`beforeDestroy` 清理当前 timer | 已实测通过（Mock） |
| 结束后重读场次、竞价库存展示 | 上一轮历史证据目录 `muj3iml2920579/` 的浏览器截图与 SQL/持久化结果记录场次结束及库存状态；代码位置 `src/pages/pages-loot-lootdet.js:629-654`、`server/shared-public.mjs:42` | 代码/历史真实证据阅读通过；非本子代理重新操作浏览器 |

主代理最新证据目录 `.local/shared/muj3v8b2ca579f/` 的 `commands.jsonl` 记录：`npm test`、Java package、H5 build、若依管理端 build 均 exit 0；`node-tests.log` 明确为 87/87，`integration-results.json` 的 25 组均为“已实测通过”。`run-result.json` 明确总 `npm run verify:nonpay` exit 1 是发布门禁阻塞（短信/实名/承运商、提现/分佣规则、未完成全部非支付页面/目标设备、生产部署恢复），不是断言失败。`persistence-summary.json` 记录隔离库 `tea_local_muj3v8b2ca579f`、revision 60、members 4、products 1、orders 2、auctions 1、settlements 1、auditRows 60；这是证据指纹，不等于容量或生产成熟度。`source-manifest.json` 记录 H5 提交 `a91c7984a0f6174fe25faa71cf7a0bd705e11162`，RuoYi Java 提交 `0cdbba90d69d43de7e931e5fc15f728bc43efb50`，RuoYi-Vue3 提交 `1e704aaa09590a2a348bf920cd7e31b804cf33f8`。我独立执行的 63/63 结果未启动 Java、MySQL、Redis、真实 HTTP 或浏览器；旧目录 `.local/shared/muj3iml2920579/` 的浏览器竞价截图和 83/83 结果仅保留为历史证据。`.local/shared/muj2wgl76a01c9/auction-browser-before.log` 保留修复前图片节点缺失及小数秒误转毫秒的失败证据，不能把该失败日志误读成当前失败。

### 上轮残余风险复核结果

1. 已结算赢家按钮已修复：`auctionButtonText()` 在 `settled + isWinner` 返回“查看结算单”，`paymoney()` 仅执行 `uni.reLaunch({url:'/pages/order/order'})`，不再调用 `/auction/settle` 或产生重复业务写入。新增 `H5 settled auction mock` 断言标签、跳转和“request 不应调用”，16/16 通过。

2. 空图片数组回退已修复：`detailImages()` 仅在 `image` 为非空数组时使用，否则将字符串 `goods_image` 包装为 `{file_path}`；render mock 将 `image:[]` 重渲染并断言 `/real.png` 节点存在。该 helper 位于 e9ec 主页面模块，未误放倒计时组件 c963；限定测试已捕获并排除该结构错误。

上述两项已在上一轮限定回归中复核通过；没有发现新的订单/库存/竞价权限绕过。真实浏览器图片、倒计时和结束状态截图属于上一轮证据 `.local/shared/muj3iml2920579/browser-auction-ended-h5.png`；本轮未重新操作浏览器，不把组件 Mock 冒充浏览器实测。

## 本次拍卖/库存/上下架边界审查：NP-11 修复复核

### NP-11（修复后通过共享/底层定向回归；历史 P2 仅限本地演示路径）活跃预占拍卖不得直接下架

位置：`server/admin-api.mjs:269-278`；公开共享入口为 `server/shared-public.mjs:12-42`，本地演示入口为 `server/demo/auction.mjs:326-337`。

修复前隔离内存复现（命令 exit 0，调用的是本地 `adminApi` + `demoApi`，未启动服务、未触碰共享数据库）:

1. 管理员创建商品，库存 3；创建 `running` 拍卖，数量 1。实际库存从 3 变为 2，`stockReserved=true`。
2. `PUT /tea/products/:goodsId`，参数 `{approvalStatus:20}`。实际返回 `code=200`、`商品更新成功`。
3. 复查 state：商品已下架、库存仍为 2、拍卖仍为 `running` 且 `stockReserved=true`。`DELETE /tea/products/:goodsId` 虽然被正确拒绝（“商品存在未完成拍卖”），但下架操作没有被拒绝。
4. 共享 H5 的 `/auction/list` 不再返回该场次，`/auction/detail` 返回“拍卖场次不存在或未发布”，会员出价返回“拍卖商品已下架”；这说明共享 H5 不会把该本地状态当作第二个公开入口，预占库存仍只能由管理员另查场次并手动结束/取消后释放。
5. 同一隔离库的本地 `demoApi('/auction/list')` 仍返回该已下架商品的场次（`demo/auction.mjs` 的公开列表只过滤 `cancelled`），所以本地演示/兼容入口会继续展示已经下架的拍品，和共享 H5 的隐藏语义不一致。这里的 `demoApi` 结果仅代表本地演示模式，不能当作真实共享 H5/Java 结果。

共享生产路径专项复核（本子代理隔离内存，未启动 Java）：使用 `createMemoryStore(..., 'shared')` 调 `sharedAdmin` 创建商品和 `running` 场次。仅发送 `{approvalStatus:20}` 返回 `code=400`（共享商品写入契约要求名称、价格、库存）；补齐字段后返回 `code=500`（活跃预占场次禁止库存修改），审批状态、库存和场次均保持不变。`TeaController` 将 `/admin/tea/**` 按 RuoYi 权限转发给 `TeaBusinessService`，后者把管理员 actor 交给 shared engine，因此这一路径的业务守卫就是本次 `sharedAdmin` 复核的生产执行分支；本子代理没有把内存结果冒充真实 Java HTTP。

底层兼容管理函数专项复核：`adminBusinessApi` 对仅下架参数同样返回 `code=500`；经 shared/admin 两层取消场次后，`stockReleased=true` 且库存由 2 恢复为 3，随后完整商品 PUT 才返回 `code=200`，共享 H5 详情变为“不存在或未发布”。这验证了“先释放预占，再下架”的顺序和库存数值，不只是看错误码。

测试夹具调整依据：`tests/admin-api.test.mjs` 的 `createStore()` 会自动种植商品 30 的活动拍卖，原有“普通商品下架后从 H5 消失/后台指标减少”用例并非在测活动拍卖阻断。其新增 `cancelSeededAuction()` 先通过公开后台取消该 fixture，并断言取消成功、state 中 `stockReleased=true`、库存增加恰好 `auction.quantity`，再执行原有下架、隐藏详情、不可下单和指标差异断言；没有删除或放宽原断言。活动场次拒绝下架和取消后释放的独立覆盖位于 `tests/order-safety.test.mjs` 第 4 项。

当前定向命令 `node --test tests/order-safety.test.mjs tests/admin-api.test.mjs tests/shared-api.test.mjs tests/nonpay.test.mjs tests/shared-pages.test.mjs tests/auction.test.mjs` 实际 **63/63、exit 0**。其中订单安全用例覆盖 scheduled/running、共享完整/部分 PUT、底层 PUT、取消释放以及状态不变；地址用例覆盖缺失/他人地址不回落默认地址且不写入，重复 `/order/receipt` 与 `/member/order/receipt` 在已评价订单上幂等且跨用户拒绝。共享生产链路本轮未确认可绕过下架保护。

历史本地 `demoApi('/auction/list')` 对手工构造的“下架但仍有活动场次”状态仍可能与共享公开入口呈现不同；但当前本地 `adminApi` 已不能通过正常商品 PUT 制造该状态，且该 demo 入口不是 RuoYi Java 共享 H5。若继续把 demo 模式作为发布目标，仍可补公开列表的发布状态过滤；这不是本轮真实共享生产路径的 P1 阻塞。

## 缺陷记录

以下 NP-01～NP-10 保留修复前复现证据，便于追溯；当前状态以“本轮历史问题状态”表和最新回归为准，不应把这些历史实际结果误读为当前仍可复现。

### NP-01（P1）修改密码不会撤销既有会员会话

位置：`server/demo/account.mjs:65-83`、`server/store.mjs:37-49`。

复现：

1. 共享内存创建会员，登录得到 `token_old`。
2. 使用 `token_old` 调 `/member/editPwd`，提交正确 `old_password` 和新密码。
3. 使用同一个 `token_old` 调 `/member/getMemberDetails`。

预期：密码凭据改变后，旧会话失效，返回未登录。  
实际：密码修改返回 `code=1`、`密码已修改`，旧 token 仍返回 `code=1` 的会员资料；新密码也能另行登录，状态中同时保留两个 session。

根因：`accountApi` 只更新 `passwordHash`、删除 `passwordResetUntil`，没有删除该会员的 `state.sessions`；`store.user()` 只检查过期和停用状态，不检查密码版本/撤销标记。  
影响：已泄露的旧 token 在 24 小时有效期内继续读写地址、订单及资料，即使会员已经主动修改密码。  
最小修复方向：密码修改成功后撤销该 member 的全部 session，或维护 password/session version 并在 `store.user()` 校验；同时补真实 Java/Redis HTTP 回归。

### NP-02（P1）共享会员写接口缺少 HTTP 方法约束，GET/PUT 可触发实际写入

位置：`server/shared-api.mjs:75-97`（只校验是否为 member route，没有通用方法表）；`server/demo-api.mjs:192-256`；`server/demo/commerce.mjs:75-170,255-331`；`server/shared-api.mjs:206-228`。

复现（同一次内存运行）：

| 请求 | 预期 | 实际 |
| --- | --- | --- |
| `GET /address/add`，合法地址参数 | 拒绝，新增必须使用写方法 | `code=1`，新增地址 |
| `GET /address/delete`，本人地址 ID | 拒绝 | `code=1`，地址被删除 |
| `PUT /order/order/buyNow`，商品和 `pay_type=2` | 拒绝，checkout 仅 POST | `code=1`，创建订单并预占库存 |
| `GET /order/toAddOrder`，商品 ID | 拒绝，抢购写入不能 GET | `code=1`，创建仓库待付款单 |
| `GET /order/cancel`，本人待付款订单 ID | 拒绝 | `code=1`，订单变为 `cancelled` |
| `GET /member/editMember`，`nickName=GET改名` | 拒绝 | `code=1`，资料被修改 |

根因：`sharedH5` 的成员路由门禁只判断 token 和路由集合；随后将请求转给 `demoApi`，而地址、资料和订单 handler 大多不判断 `method`。仅 `/order/remindShipment`、部分竞价路径和 checkout 的 `method === 'POST'` 分支有局部约束，无法覆盖其余写接口。  
影响：错误重试、代理探测、爬虫或客户端方法配置错误都可能造成重复订单、库存预占、地址删除、订单取消或评价/资料写入；这也破坏了只读 GET 的缓存和审计语义。  
最小修复方向：在共享 API 建立显式 `route → allowed methods` 表，在进入 `demoApi` 前拒绝不匹配方法；写操作统一要求 POST/PUT/DELETE，并给每个核心写入口增加实际状态断言回归，不要仅依靠页面调用约定。

### NP-03（P1）会员退出没有服务端撤销，旧 token 仍有效

位置：`src/pages/pages-personal-set.js:375-377`；`server/shared-api.mjs:13-44,75-97`；`server/store.mjs:37-49`。

复现：

1. 登录得到 token。
2. 前端退出只执行 `uni.removeStorageSync("TOKEN")`，不发服务端请求。
3. 直接调用共享 API 的 `/logout`，返回 `code=0`、`此业务尚未接入真实服务，未执行操作`。
4. 使用退出前 token 调 `/member/getMemberDetails`，仍返回 `code=1`。

预期：退出后 token 服务端失效。  
实际：服务端没有会员 logout 路由；旧 token 直到过期或管理员停用会员前仍可使用。  
影响：设备丢失、浏览器扩展或代理日志泄露 token 后，会员无法主动远程撤销会话。  
最小修复方向：增加会员 logout/revoke 路由，删除当前 token 或写入撤销记录；前端退出完成服务端撤销后再清本地 token。若产品明确仅采用本地退出，也必须在发布范围和安全说明中明确其不等同于会话注销。

### NP-04（P1，功能闭环）共享模式没有会员注册入口

位置：`server/shared-api.mjs:13-44,96-97`；demo-only 实现位于 `server/demo-api.mjs:65-101`；H5 页面调用位于 `src/pages/pages-login-register.js:667-687`。

复现：未登录调用 `/member/registerAnAccount`，提交手机号、密码、确认密码和验证码。  
预期：在已有短信/身份服务契约下创建零资产会员并登录，或返回明确的外部服务未配置错误。  
实际：共享 API 因该路由不在 `publicRoutes`/`memberRoutes`，先返回 `code=-500`、`请先登录`；不会到达 `demo-api` 的注册实现。共享报告已把短信注册列为环境阻塞，因此这里不是建议恢复 demo 注册，而是确认当前 H5 注册入口没有共享后端闭环。  
影响：新会员无法通过产品原有注册页面进入共享系统；不能将登录通过等同于会员身份域完整可用。  
最小修复方向：接入真实短信注册/验证码和 Java 会员创建事务；外部服务未配置时保持明确失败，但将页面/验收状态标为环境阻塞，不伪造成功。

### NP-05（P2）地址字段未做 JSON 类型和长度校验

位置：`server/demo-api.mjs:219-256`。

复现：本人登录后调用 `/address/add`，将 `name`、`detail` 传为对象而不是字符串，手机号和合法 `region` 保持正确。  
预期：返回参数校验失败。  
实际：返回 `code=1`，对象原样写入会员地址；后续页面/订单地址字段契约被破坏。当前未发现跨用户读取或脚本执行，但这是可持久化的脏 JSON 输入。  
最小修复方向：要求 name/detail 为字符串、限制长度并 trim；对 edit 使用同一 schema；增加对象、超长和空白边界回归。

### NP-06（历史 P1，已修复并回归）公开寄卖/拍卖接口返回演示业务状态

位置：`server/shared-api.mjs:103-111,312-316`、`server/shared-public.mjs`（没有对应寄卖/拍卖详情处理）；实际回落为 `server/demo/community.mjs:72-138,188-190`。

复现（本轮独立内存脚本，`store.mode='shared'`，只创建一个后台商品，不创建任何 auction/consignment 记录）：

```text
/goods/getIsAuction(goods_id)             -> code=1, data=1
/goods/getPurchaseNum(goods_id)           -> code=1, num=10, purchase_num=10, limit_num=10
/goods/getLootDetails(goods_id)           -> code=1, auction=null,
                                             time_info.end_time=当前时间+3600,
                                             content='<p>精选茶叶，原产地直供。</p>'
/loodgoods/getCategoryGoodsList           -> code=1, 每件商品 pay_status='寄卖中',
                                             consignment_member_name='平台自营', 同一组未来 time_info
```

预期：没有实际拍卖时详情不应伪造未来竞价时段；没有寄卖仓库记录时列表应为空或仅返回真实寄卖记录；拍卖开关/购买上限应来自持久化商品和真实场次，而不是固定值。实际结果会让 H5 显示“寄卖中/拍卖中”并可能引导用户进入不存在的业务，且商品详情描述被 demo 文案覆盖。`shared-api` 只对名称做了“平台自营”覆盖，未消除 `time_info`、`pay_status`、固定开关/上限和 fixture content。

修复后：`shared-public.mjs` 直接读取持久化 `state.auctions` 和商品库存；无场次时返回空列表、时间戳 0、无详情描述和明确失败的购买预检；有场次时按精确 `auction_id`/`specialarea_id` 返回真实商品与时间，且预约关闭时不写入订阅。第 12～14 项 nonpay 回归及 H5 拍卖组件回归已通过。历史复现结果保留在本节，仅用于说明修复前行为。

### NP-07（历史 P1，已修复并回归）旧共享状态缺少 `adminNotices` 会导致公告接口未处理异常

位置：`server/shared-public.mjs:27` 直接执行 `store.state.adminNotices.find(...)`；`server/shared-api.mjs:80-84` 的 `initialize` 没有为旧状态补 `adminNotices=[]`。新建 SQL 默认 JSON 有该字段，但已有部署/迁移前状态不能假定具备它。

复现：

```js
const state = { users: [], sessions: {}, nextId: 1, content: {} };
const store = createMemoryStore(state, () => {}, 'shared');
sharedH5(store, '/notice/getNoticeInfo', { id: 999 }, '', 'GET');
```

实际：抛出 `TypeError: Cannot read properties of undefined (reading 'find')`（`server/shared-public.mjs:27`），而不是 `{code:0,...}`；因此通过 Java engine 时会变成 500/业务失败，公告页无法正常展示。该复现没有启动全栈或触碰数据库。

修复后：`sharedPublic` 对缺失的公告集合按空数组处理，公告列表不回落 fixture，详情返回明确“公告不存在或已停用”；第 11 项 `legacy shared states...` 已验证缺失字段时不抛异常。本轮未验证 `adminNotices` 为其他非数组类型时的行为，不能扩大为任意旧 JSON 形态均已兼容。历史 TypeError 复现保留在本节，不代表当前仍可复现。

### NP-09（历史 P1，已修复并回归）进行中竞价商品可绕过预检直接创建普通订单

位置：`server/shared-public.mjs:15-42`（`/goods/getPurchaseNum` 在进行中竞价时明确拒绝）；`server/shared-api.mjs:218-240` 与 `server/demo/commerce.mjs:75-170`（普通 checkout 未检查 active auction）。

修复前复现（独立内存脚本，只有一个会员、一个上架商品和一个 `running` 场次；证据：`.local/shared/muj2lx787afac4/auction-gate-before.log`，该定向测试实际 exit 1）：

```text
创建场次 quantity=1 后商品库存：4 -> 3（已预占）
GET /goods/getPurchaseNum(goods_id) -> code=0，竞价商品请通过出价参与
POST /order/order/buyNow(goods_id,pay_type=2,address_id,goods_num=1)
  -> code=1，订单已创建，请完成支付，订单数 +1，库存 3 -> 2
POST /order/originalPricePurchase(goods_id,pay_type=4,address_id,goods_num=1)
  -> code=1，订单已创建，请完成支付，订单数再 +1，库存 2 -> 1
```

预期：只要同商品存在 `scheduled`/`running` 场次，普通商城 checkout 和 `originalPricePurchase` 都应拒绝，库存和会员订单不变；用户必须走 `/auction/bid`，由胜出结算生成仓库结算单。修复前只有 H5 预检和 `/order/toAddOrder` 被拦截，攻击者/旧客户端可直接 POST 普通下单绕过竞价。

修复后：`shared-api.mjs:221-223` 在进入 checkout 前统一门禁，`demo/commerce.mjs:76-80` 在 shared mode 再做兼容层防线。第 15 项覆盖 `scheduled`/`running`、`/order/order/buyNow`/`/order/originalPricePurchase`、余额/积分四组合，断言失败后订单和库存 state 完全不变；取消场次后普通下单成功。最新四文件 Node 回归 46/46 通过。

### NP-10（历史 P1，已修复并回归）公开拍卖列表/详情暴露草稿、下架商品或错误 ID 回退

位置：`server/shared-public.mjs:15-22`、`server/demo/auction.mjs:171-183`；修复前公开别名可能走通用 auction handler，显式无效 `auction_id` 还有按 `goods_id` 选择其他场次的风险。

修复前证据：`.local/shared/muj2sbptfeafec/auction-visibility-before.log`，定向命令 `node --test --test-name-pattern='all shared public auction aliases' tests/nonpay.test.mjs` 实际 exit 1。

修复后第 16 项验证：`/auction/list`、`/auction/detail` 只读取已发布商品且过滤 `draft`/取消场次；下架商品不再出现在列表、详情或 H5 loot 列表；显式无效场次 ID 返回失败，不按商品 ID 回退到其他场次；已登录会员对无效 `/auction/bid` 不产生出价或 state 变化。历史限定测试与全量 47/47 均通过；最新 `npm test` 已扩展并通过 87/87。

### NP-08（P2，兼容层残留，未作为通过依据）共享普通写入仍经 demo handler

范围：会员昵称/头像、地址写入及部分非支付订单操作仍由 `sharedH5 → demoApi → demo/account.mjs|demo/commerce.mjs` 执行；当前内存测试证明这些路径确实落盘并受 token/方法门禁保护，但不能把它们当成独立的 Java 业务实现。`demo` 默认消息或固定字段仍可能出现在未专门覆盖的入口。

本项目前没有单独判定为越权漏洞：共享 engine 在成功时提交同一 state，失败时以快照回滚；但发布前仍需审计所有 `memberRoutes` 的 demo 回落和响应契约，至少保证每个写入口都有真实持久化断言，而不是只看到 `code=1`。本报告不把兼容层“能执行”表述为商用资金/履约能力。

## 已实际复核且未发现越权的范围

独立内存检查确认：

- 无 token 访问 `/member/getMemberDetails` 返回 `-500`。
- 会员 B 用会员 A 的地址 ID 查询/删除均返回 `code=0`。
- 会员 B 查询会员 A 的商城订单详情返回 `code=0`，会员 A 自己查询返回 `code=1`。
- 共享会员初始化不注入 demo 余额、卡、仓库和默认订单；本报告没有把 demo 分支的旧模拟支付/充值当作共享商用能力。

这些是内存 `sharedH5/sharedAdmin` 证据，不等同于真实 Java/MySQL/Redis HTTP 或浏览器验收。

## 实际命令与证据

### 最新复核命令（2026-09-27）

```text
npm test
exit 0；主代理最新证据目录 `.local/shared/muj3v8b2ca579f/node-tests.log` 为 87 tests，87 pass，0 fail；本子代理本轮限定命令为 63/63

node --test tests/shared-pages.test.mjs tests/auction.test.mjs
exit 0；16 tests，16 pass，0 fail；约 0.92s（本子代理最后一次执行）

本轮订单/管理/共享边界联合命令：
node --test tests/order-safety.test.mjs tests/admin-api.test.mjs tests/shared-api.test.mjs tests/nonpay.test.mjs tests/shared-pages.test.mjs tests/auction.test.mjs
exit 0；63 tests，63 pass，0 fail；本子代理实际执行，未启动集成端口
```

上述限定命令是本子代理实际执行的纯 Node 内存/H5 组件证据，不包含本子代理重新启动的 Java、MySQL、Redis、真实 HTTP、浏览器或第三方短信服务。主代理最终目录 `.local/shared/muj3v8b2ca579f/commands.jsonl` 记录 `npm test`、Java package、H5 build 和若依管理端 build 均 exit 0，`integration-results.json` 记录 25/25 真实 HTTP/SQL 组通过，并保存浏览器截图、持久化与 source-manifest；我只读取并复核这些文件，不把它们冒充为本子代理重新执行。修复前竞价门禁和公开可见性定向命令分别在 `.local/shared/muj2lx787afac4/commands.jsonl`、`.local/shared/muj2sbptfeafec/commands.jsonl` 记录 exit 1；修复后第 15、16 项、订单安全及上下架保护定向回归通过，未占用集成端口。

此前历史轮执行：

```text
node --test tests/shared-api.test.mjs
exit 0；18 tests，18 pass，0 fail
```

该既有测试集通过，但没有覆盖上述方法矩阵、密码改后撤销、会员 logout 或共享注册缺失，因此不能作为这些问题已解决的证据。

另执行两次隔离 `node --input-type=module` 内存脚本：

- 方法矩阵脚本 exit 0，实际观察到 GET 地址新增/删除、PUT 下单、GET 抢购、GET 取消、GET 改名均返回成功并改变状态；密码修改后旧 session 仍为 `code=1`；`/logout` 返回未接入且旧 token 仍为 `code=1`；注册返回 `code=-500`。
- 隔离归属脚本 exit 0：未登录、跨用户地址详情/删除、跨用户订单详情均被拒绝，自己的订单可读。
- 地址类型脚本 exit 0：对象 `name/detail` 被 `code=1` 接受并持久化。

未启动全栈，故本报告没有声称真实 Java、MySQL、Redis、CORS 或浏览器已复现这些结果。代码修改后的验收应至少补充：真实 HTTP 方法矩阵、密码修改后旧 token、logout 撤销、注册明确阻塞/成功契约及地址 schema。

## 交付判断

本复核范围当前为“历史会话/方法/地址/公开拍卖/公告/竞价购单门禁问题已回归通过”。NP-04 仍需产品和短信/身份提供方确认是否纳入本次发布，不能用 demo 注册替代；NP-08 需要在全量 endpoint 审计中继续收敛兼容层回落。本结论仅覆盖本报告列明的内存和组件测试，不替代最终真实 HTTP/SQL/浏览器验收。
