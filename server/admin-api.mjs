import { passwordHash, passwordMatches } from './store.mjs';
import { clone, money, now, products as fixtureProducts, seedUser, isPublished } from './demo/data.mjs';
import { auctionAdminView, closeAuction, ensureAuctions } from './demo/auction.mjs';
import crypto from 'node:crypto';

const ok = (data = {}, msg = '操作成功') => ({ code: 200, msg, data });
const fail = (msg, code = 500) => ({ code, msg, data: {} });

function ensureState(store) {
  const state = store.state;
  if (!Array.isArray(state.catalog)) state.catalog = clone(fixtureProducts);
  if (!Array.isArray(state.adminNotices)) {
    state.adminNotices = [
      { noticeId: 1, noticeTitle: '商城服务公告', noticeType: '1', status: '0', noticeContent: '欢迎使用鑫芮商贸茶叶分销平台。', createBy: 'admin', createTime: now() },
      { noticeId: 2, noticeTitle: '寄卖规则更新', noticeType: '2', status: '0', noticeContent: '寄卖商品请先完成结算并上传必要凭证。', createBy: 'admin', createTime: now(1) },
    ];
  }
  if (!state.admins && store.mode !== 'shared') {
    state.admins = [{ userId: 1, userName: 'admin', nickName: '系统管理员', passwordHash: passwordHash('admin123'), status: '0' }];
  }
  if (!state.adminSessions) state.adminSessions = {};
  ensureAuctions(store);
  // The admin dashboard must be useful even when the first request is made
  // from the admin origin (before an H5 user has logged in).
  for (const user of state.users) seedUser(store, user);
  return state;
}

function adminFromToken(store, token) {
  const state = ensureState(store);
  const session = state.adminSessions[token];
  if (!session || session.expires < Date.now()) return null;
  return state.admins.find((admin) => admin.userId === session.userId) || null;
}

function page(items, params = {}) {
  const pageNum = Math.max(1, Number(params.pageNum || params.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize || params.limit) || 10));
  return { rows: items.slice((pageNum - 1) * pageSize, pageNum * pageSize), total: items.length };
}

function allOrders(state) {
  return state.users.flatMap((user) => (user.orders || []).map((order) => ({ order, user })));
}

function orderView(item, catalog) {
  const { order, user } = item;
  const goods = order.goods?.[0] || catalog.find((product) => String(product.goods_id) === String(order.goods_id));
  return {
    orderId: order.order_id,
    orderSn: order.order_sn || order.order_no,
    userId: user.member_id,
    userName: user.nickName,
    phone: user.phone,
    goodsId: order.goods_id,
    goodsName: goods?.goods_name || '茶叶商品',
    goodsImage: goods?.goods_image || goods?.image?.file_path || '',
    amount: money(order.pay_price || order.total_price || 0),
    quantity: Number(goods?.goods_num || goods?.total_num || 1),
    orderType: order.order_type,
    status: order.status,
    statusText: order.state_text || order.order_status?.text || '',
    payStatus: order.pay_status?.text || '',
    deliveryStatus: order.delivery_status?.text || '',
    createTime: order.create_time,
    payTime: order.pay_time || '',
    expressCompany: order.express_company || '',
    expressNo: order.express_no || '',
    expressPhone: order.express_phone || '',
    shippedAt: order.shippedAt || '',
    reminderAt: order.shipmentReminder?.createdAt || '',
    reminderStatus: order.shipmentReminder ? (order.status === 'forwarding' ? '待处理' : '已处理') : '',
    address: order.address || {},
  };
}

function releaseOrderStock(order, catalog) {
  if (!order.stock_reserved || order.stock_released) return;
  const product = catalog.find((item) => String(item.goods_id) === String(order.goods_id));
  if (product?.spec?.[0]) {
    product.spec[0].stock_num = Number(product.spec[0].stock_num || 0) + Number(order.stock_reserved);
    product.goods_sales = Math.max(0, Number(product.goods_sales || 0) - Number(order.stock_reserved));
  }
  order.stock_released = true;
}

function catalogProduct(payload, id, catalog) {
  const existing = id ? catalog.find((item) => String(item.goods_id) === String(id)) : null;
  const price = money(payload.goods_min_price ?? payload.price ?? existing?.goods_min_price ?? 0);
  const stock = Math.max(0, Number(payload.stock ?? payload.stock_num ?? payload.spec?.[0]?.stock_num ?? existing?.spec?.[0]?.stock_num ?? 0));
  const product = existing ? { ...existing, ...payload } : {
    goods_id: id,
    goods_name: String(payload.goods_name || payload.name || '新茶品'),
    goods_sort: Number(payload.goods_sort || 100),
    create_time: now(),
    periods_num: 1,
    product_types: Number(payload.product_types || 2),
    approvalStatus: Number(payload.approvalStatus ?? 10),
    is_merchant: 0,
    is_tripartite: 0,
    goods_pay_type: 0,
    goods_sales: 0,
    goods_min_price: price,
    goods_min_line_price: money(payload.goods_min_line_price ?? price),
    goods_image: String(payload.goods_image || payload.image || '/h5/static/catalog/a5134ccd3282cce5.jpg'),
    spec: [],
  };
  product.goods_name = String(payload.goods_name ?? payload.name ?? product.goods_name).slice(0, 120);
  product.category_id = Number(payload.category_id ?? product.category_id ?? 0);
  product.description = String(payload.description ?? product.description ?? '');
  product.goods_min_price = price;
  product.goods_min_line_price = money(payload.goods_min_line_price ?? payload.line_price ?? price);
  product.goods_sort = Number(payload.goods_sort ?? product.goods_sort ?? 100);
  product.approvalStatus = Number(payload.approvalStatus ?? product.approvalStatus ?? 10);
  product.goods_image = String(payload.goods_image ?? payload.image ?? product.goods_image);
  product.spec = [{ ...(product.spec?.[0] || {}), goods_spec_id: product.spec?.[0]?.goods_spec_id || id, goods_id: id, goods_price: price, line_price: product.goods_min_line_price, stock_num: stock, goods_sales: Number(product.goods_sales || 0), goods_weight: 1, spec_sku_id: product.spec?.[0]?.spec_sku_id || '' }];
  return product;
}

export function adminApi(store, route, params = {}, token = '', method = 'GET') {
  const state = ensureState(store);
  if (route === '/captchaImage') return { code: 200, msg: '操作成功', captchaEnabled: false, data: {} };
  if (route === '/login' && method === 'POST') {
    const admin = state.admins.find((item) => item.userName === params.username);
    if (!admin || admin.status === '1' || !passwordMatches(params.password, admin.passwordHash)) return fail('管理员账号或密码错误', 401);
    const adminToken = `${cryptoRandom()}${cryptoRandom()}`;
    state.adminSessions[adminToken] = { userId: admin.userId, expires: Date.now() + 86400000 };
    store.save();
    return { code: 200, msg: '登录成功', token: adminToken };
  }
  if (route === '/logout') {
    delete state.adminSessions[token];
    store.save();
    return ok({}, '退出成功');
  }
  const admin = adminFromToken(store, token);
  if (route === '/health/admin') return ok({ status: 'ok', admin: !!admin });
  if (!admin) return fail('登录状态已过期', 401);
  if (route === '/getInfo') return { code: 200, msg: '操作成功', user: { userId: admin.userId, userName: admin.userName, nickName: admin.nickName, avatar: '' }, roles: ['admin'], permissions: ['*:*:*'] };
  if (route === '/getRouters') {
    return ok([
      { path: '/tea', component: 'Layout', redirect: '/tea/dashboard', name: 'Tea', meta: { title: '茶叶业务', icon: 'shopping' }, children: [
        { path: 'dashboard', component: 'tea/dashboard', name: 'TeaDashboard', meta: { title: '经营概览', icon: 'dashboard' } },
        { path: 'products', component: 'tea/products', name: 'TeaProducts', meta: { title: '商品管理', icon: 'shopping' } },
      { path: 'orders', component: 'tea/orders', name: 'TeaOrders', meta: { title: '订单管理', icon: 'list' } },
        { path: 'auctions', component: 'tea/auctions', name: 'TeaAuctions', meta: { title: '拍卖管理', icon: 'druid' } },
        { path: 'members', component: 'tea/members', name: 'TeaMembers', meta: { title: '会员管理', icon: 'peoples' } },
        { path: 'notices', component: 'tea/notices', name: 'TeaNotices', meta: { title: '公告管理', icon: 'message' } },
      ] },
    ]);
  }
  return adminBusinessApi(store, route, params, admin, method);
}

// Only the private engine may supply an actor authenticated by RuoYi.
export function adminBusinessApi(store, route, params, admin, method) {
  const state = ensureState(store);
  if (route === '/tea/dashboard') {
    const auctions = ensureAuctions(store);
    const orders = allOrders(state);
    const paid = orders.filter(({ order }) => order.pay_status?.value === 20);
    const cashOrders = paid.filter(({ order }) => Number(order.order_type) !== 5 && Number(order.pay_type?.value) !== 4);
    const revenue = cashOrders.reduce((sum, { order }) => sum + Number(order.pay_price || 0), 0);
    const productSales = product => paid.filter(({order}) => String(order.goods_id) === String(product.goods_id));
    const soldUnits = product => productSales(product).reduce((sum,{order}) => sum + Number(order.goods?.[0]?.goods_num || order.goods?.[0]?.total_num || 1),0);
    return ok({
      metrics: {
        products: state.catalog.filter(isPublished).length,
        members: state.users.length,
        orders: orders.length,
        auctions: auctions.filter((item) => ['scheduled', 'running'].includes(item.status)).length,
        revenue: money(revenue),
      },
      recentOrders: orders
        .sort((a, b) => String(b.order.create_time).localeCompare(String(a.order.create_time)))
        .slice(0, 8)
        .map((item) => orderView(item, state.catalog)),
      topProducts: state.catalog
        .filter(isPublished)
        .slice()
        .sort((a, b) => soldUnits(b) - soldUnits(a))
        .slice(0, 5)
        .map((product) => ({
          goodsId: product.goods_id,
          goodsName: product.goods_name,
          sales: soldUnits(product),
          amount: money(cashOrders.filter(({order})=>String(order.goods_id)===String(product.goods_id)).reduce((sum,{order})=>sum+Number(order.pay_price || 0),0)),
        })),
    });
  }
  if (route === '/tea/auctions' && method === 'GET') {
    const keyword = String(params.keyword || params.title || '').trim();
    const status = String(params.status || '');
    const rows = ensureAuctions(store)
      .map((auction) => auctionAdminView(store, auction))
      .filter((auction) => (!keyword || [auction.title, auction.goodsId, auction.winnerName].some((value) => String(value).includes(keyword))) && (!status || auction.status === status));
    return ok(page(rows, params));
  }
  if (route === '/tea/auctions' && method === 'POST') {
    const goodsId = params.goodsId ?? params.goods_id;
    const product = state.catalog.find((item) => String(item.goods_id) === String(goodsId));
    if (!product || !isPublished(product)) return fail('请选择已上架商品');
    const activeAuction = ensureAuctions(store).find((item) => String(item.goodsId) === String(product.goods_id) && ['draft', 'scheduled', 'running'].includes(item.status));
    if (activeAuction) return fail('该商品已有有效拍卖场次');
    const startPrice = Number(params.startPrice ?? params.start_price ?? product.goods_min_price);
    const bidIncrement = Number(params.bidIncrement ?? params.bid_increment ?? Math.max(10, startPrice * 0.01));
    const quantityRaw = params.quantity ?? 1;
    if (!/^[1-9]\d*$/.test(String(quantityRaw).trim())) return fail('拍卖数量必须是正整数');
    const quantity = Number(quantityRaw);
    const startTime = params.startTime || params.start_time || new Date().toISOString();
    const endTime = params.endTime || params.end_time || new Date(Date.now() + 3600000).toISOString();
    if (!Number.isFinite(startPrice) || startPrice <= 0 || !Number.isFinite(bidIncrement) || bidIncrement <= 0) return fail('起拍价和加价幅度必须大于 0');
    if (!Number.isSafeInteger(quantity) || quantity <= 0) return fail('拍卖数量必须是正整数');
    if (Number(product.spec?.[0]?.stock_num || 0) < quantity) return fail('拍卖库存不足');
    if (!Number.isFinite(Date.parse(startTime)) || !Number.isFinite(Date.parse(endTime)) || Date.parse(endTime) <= Date.parse(startTime)) return fail('请输入有效的开始和结束时间，且结束时间必须晚于开始时间');
    product.spec[0].stock_num = Number(product.spec[0].stock_num || 0) - quantity;
    const auction = { auctionId: store.id(), goodsId: product.goods_id, title: String(params.title || product.goods_name).slice(0, 120), image: product.goods_image, startPrice: money(startPrice), currentPrice: money(startPrice), bidIncrement: money(bidIncrement), quantity, startTime, endTime, status: Date.parse(startTime) > Date.now() ? 'scheduled' : 'running', bidCount: 0, currentBidId: null, highestBidderId: null, winnerUserId: null, winnerBidId: null, settlementOrderId: null, createdBy: admin.userName, createdAt: now(), stockReserved: true, stockReleased: false };
    state.auctions.push(auction);
    store.save();
    return ok(auctionAdminView(store, auction), '拍卖场次创建成功');
  }
  const auctionMatch = route.match(/^\/tea\/auctions\/(\d+)$/);
  if (auctionMatch && method === 'PUT') {
    const auction = ensureAuctions(store).find((item) => String(item.auctionId) === auctionMatch[1]);
    if (!auction) return fail('拍卖场次不存在', 404);
    if (params.status === 'ended' || params.status === 'cancelled') {
      const result = closeAuction(store, auction, params.status);
      return result.code === 1 ? ok(result.data, result.msg) : fail(result.msg);
    }
    if (['ended', 'settled', 'cancelled'].includes(auction.status)) return fail('已结束拍卖不可编辑');
    const startPrice = params.startPrice ?? params.start_price;
    const bidIncrement = params.bidIncrement ?? params.bid_increment;
    if (auction.bidCount > 0 && (startPrice !== undefined || bidIncrement !== undefined || params.startTime || params.start_time || params.endTime || params.end_time)) return fail('已有出价的拍卖只能结束，不能修改价格或时间');
    if (startPrice !== undefined) {
      if (!Number.isFinite(Number(startPrice)) || Number(startPrice) <= 0) return fail('起拍价必须大于 0');
      auction.startPrice = money(Number(startPrice));
    }
    if (bidIncrement !== undefined) {
      if (!Number.isFinite(Number(bidIncrement)) || Number(bidIncrement) <= 0) return fail('加价幅度必须大于 0');
      auction.bidIncrement = money(Number(bidIncrement));
    }
    if (params.title !== undefined) auction.title = String(params.title).slice(0, 120);
    if (params.startTime || params.start_time) auction.startTime = params.startTime || params.start_time;
    if (params.endTime || params.end_time) auction.endTime = params.endTime || params.end_time;
    if (!Number.isFinite(Date.parse(auction.startTime)) || !Number.isFinite(Date.parse(auction.endTime)) || Date.parse(auction.endTime) <= Date.parse(auction.startTime)) return fail('请输入有效的开始和结束时间，且结束时间必须晚于开始时间');
    auction.status = Date.parse(auction.startTime) > Date.now() ? 'scheduled' : 'running';
    store.save();
    return ok(auctionAdminView(store, auction), '拍卖场次已更新');
  }
  if (auctionMatch && method === 'DELETE') {
    const auction = ensureAuctions(store).find((item) => String(item.auctionId) === auctionMatch[1]);
    if (!auction) return fail('拍卖场次不存在', 404);
    const result = closeAuction(store, auction, 'cancelled');
    return result.code === 1 ? ok(result.data, result.msg) : fail(result.msg);
  }
  if (route === '/tea/products' && method === 'GET') {
    const keyword = String(params.keyword || params.goodsName || '').trim();
    const rows = state.catalog.filter((product) => !keyword || product.goods_name.includes(keyword)).map((product) => ({ ...clone(product), stock: Number(product.spec?.[0]?.stock_num || 0), status: Number(product.approvalStatus) === 10 ? '上架' : '下架' }));
    return ok(page(rows, params));
  }
  if (route === '/tea/products' && method === 'POST') {
    const id = store.id();
    const product = catalogProduct(params, id, state.catalog);
    state.catalog.unshift(product);
    store.save();
    return ok(product, '商品创建成功');
  }
  const productMatch = route.match(/^\/tea\/products\/(\d+)$/);
  if (productMatch && method === 'PUT') {
    const hasReservedAuction = ensureAuctions(store).some((item) => String(item.goodsId) === productMatch[1] && item.stockReserved && !['cancelled', 'settled'].includes(item.status));
    const changesStock = params.stock !== undefined || params.stock_num !== undefined || params.spec?.[0]?.stock_num !== undefined;
    if (hasReservedAuction && changesStock) return fail('商品存在未完成拍卖，暂不能修改库存');
    const product = catalogProduct(params, productMatch[1], state.catalog);
    if (hasReservedAuction && !isPublished(product)) return fail('商品存在未完成拍卖，请先取消或结算拍卖再下架');
    const index = state.catalog.findIndex((item) => String(item.goods_id) === productMatch[1]);
    if (index < 0) return fail('商品不存在', 404);
    state.catalog[index] = product;
    store.save();
    return ok(product, '商品更新成功');
  }
  if (productMatch && method === 'DELETE') {
    const hasAuction = ensureAuctions(store).some((item) => String(item.goodsId) === productMatch[1] && item.stockReserved && !['cancelled', 'settled'].includes(item.status));
    if (hasAuction) return fail('商品存在未完成拍卖，请先取消或结算拍卖');
    const before = state.catalog.length;
    state.catalog = state.catalog.filter((item) => String(item.goods_id) !== productMatch[1]);
    if (before === state.catalog.length) return fail('商品不存在', 404);
    store.save();
    return ok({}, '商品已删除');
  }
  if (route === '/tea/orders' && method === 'GET') {
    const keyword = String(params.keyword || params.orderSn || params.userName || '').trim();
    const status = String(params.status || '');
    let rows = allOrders(state).map((item) => orderView(item, state.catalog));
    rows = rows.filter((row) => (!keyword || [row.orderSn, row.userName, row.phone].some((value) => String(value).includes(keyword))) && (!status || row.status === status));
    if (String(params.reminded) === '1') rows = rows.filter(row => row.reminderStatus === '待处理');
    return ok(page(rows, params));
  }
  const orderMatch = route.match(/^\/tea\/orders\/(\d+)$/);
  if (orderMatch && method === 'PUT') {
    const found = allOrders(state).find(({ order }) => String(order.order_id) === orderMatch[1]);
    if (!found) return fail('订单不存在', 404);
    const { order } = found;
    const next = String(params.status || params.orderStatus || '');
    if (!['payment', 'forwarding', 'received', 'evaluation', 'completed', 'cancelled'].includes(next)) return fail('不支持的订单状态');
    if (['completed', 'cancelled'].includes(order.status) && next !== order.status) return fail('已结束订单不可恢复或回退');
    if (next === 'cancelled' && order.pay_status?.value === 20) return fail('已支付订单不可直接取消，请先走退款流程');
    const orderRank = { payment: 0, forwarding: 1, received: 2, evaluation: 3, completed: 4 };
    if (next !== 'cancelled' && order.status !== next && order.status !== undefined && orderRank[next] < orderRank[order.status]) return fail('订单状态不可回退');
    if (next !== 'payment' && next !== 'cancelled' && order.pay_status?.value !== 20) return fail('未付款订单不能直接进入履约状态');
    if (next === 'evaluation' && order.delivery_status?.value !== 20) return fail('未发货订单不能进入待评价');
    if (next === 'completed' && (order.delivery_status?.value !== 20 || order.receipt_status?.value !== 20)) return fail('未收货订单不能直接完成');
    order.status = next;
    const statusText = { payment: '待付款', forwarding: '待发货', received: '待收货', evaluation: '待评价', completed: '已完成', cancelled: '已取消' }[next];
    order.state_text = statusText;
    order.order_status = { value: next === 'cancelled' ? 20 : next === 'completed' ? 30 : 10, text: statusText };
    if (['forwarding', 'received', 'evaluation', 'completed'].includes(next)) {
      // Payment is established by the H5 payment flow. Admin status changes
      // may advance fulfilment, but must never manufacture a payment record.
      order.pay_status = { value: 20, text: '已付款' };
    }
    if (['received', 'evaluation', 'completed'].includes(next)) order.delivery_status = { value: 20, text: '已发货' };
    if (next === 'forwarding') order.delivery_status = { value: 10, text: '待发货' };
    if (next === 'payment') {
      order.pay_status = { value: 10, text: '待付款' };
      order.delivery_status = { value: 10, text: '待发货' };
    }
    if (next === 'cancelled') releaseOrderStock(order, state.catalog);
    if (['evaluation', 'completed'].includes(next)) order.receipt_status = { value: 20, text: '已收货' };
    if (next === 'completed') order.evaluation_status = 20;
    store.save();
    return ok(orderView(found, state.catalog), '订单状态已更新');
  }
  if (route === '/tea/members' && method === 'GET') {
    const keyword = String(params.keyword || params.nickName || params.phone || '').trim();
    const rows = state.users.filter((user) => !keyword || [user.nickName, user.phone, user.invitation_code].some((value) => String(value).includes(keyword))).map((user) => ({ memberId: user.member_id, member_id: user.member_id, nickName: user.nickName, phone: user.phone, amount: user.amount, score: user.score, eCardNumber: user.e_card_number, invitationCode: user.invitation_code, parentId:user.parentId || 0, certification:user.certification || {status:'未提交'}, status: user.status === '1' ? '停用' : '正常', createTime: user.create_time || '' }));
    return ok(page(rows, params));
  }
  const memberMatch = route.match(/^\/tea\/members\/(\d+)$/);
  if (memberMatch && method === 'PUT') {
    const user = state.users.find((item) => String(item.member_id) === memberMatch[1]);
    if (!user) return fail('会员不存在', 404);
    if (params.nickName !== undefined) user.nickName = String(params.nickName).slice(0, 40);
    if (params.status !== undefined) user.status = String(params.status);
    store.save();
    return ok({}, '会员资料已更新');
  }
  if (route === '/tea/notices' && method === 'GET') {
    const keyword = String(params.keyword || params.noticeTitle || '').trim();
    return ok(page(state.adminNotices.filter((notice) => !keyword || notice.noticeTitle.includes(keyword)), params));
  }
  if (route === '/tea/notices' && method === 'POST') {
    const notice = { noticeId: store.id(), noticeTitle: String(params.noticeTitle || '未命名公告'), noticeType: String(params.noticeType || '1'), status: String(params.status ?? '0'), noticeContent: String(params.noticeContent || ''), createBy: admin.userName, createTime: now() };
    state.adminNotices.unshift(notice);
    store.save();
    return ok(notice, '公告创建成功');
  }
  const noticeMatch = route.match(/^\/tea\/notices\/(\d+)$/);
  if (noticeMatch && method === 'PUT') {
    const notice = state.adminNotices.find((item) => String(item.noticeId) === noticeMatch[1]);
    if (!notice) return fail('公告不存在', 404);
    Object.assign(notice, { noticeTitle: params.noticeTitle ?? notice.noticeTitle, noticeType: params.noticeType ?? notice.noticeType, status: params.status ?? notice.status, noticeContent: params.noticeContent ?? notice.noticeContent });
    store.save();
    return ok(notice, '公告更新成功');
  }
  if (noticeMatch && method === 'DELETE') {
    const before = state.adminNotices.length;
    state.adminNotices = state.adminNotices.filter((item) => String(item.noticeId) !== noticeMatch[1]);
    if (before === state.adminNotices.length) return fail('公告不存在', 404);
    store.save();
    return ok({}, '公告已删除');
  }
  return fail('未识别的管理端接口', 404);
}

function cryptoRandom() {
  return crypto.randomBytes(24).toString('hex');
}

export { ensureState, adminFromToken };
