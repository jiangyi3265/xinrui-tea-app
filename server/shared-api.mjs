import { demoApi } from './demo-api.mjs';
import { adminBusinessApi } from './admin-api.mjs';
import { ok, fail, money, now, entry, seedUser, fixtures, clone, makeWarehouse, isPublished } from './demo/data.mjs';
import { passwordMatches, passwordHash } from './store.mjs';
import crypto from 'node:crypto';
import { auctionView, ensureAuctions } from './demo/auction.mjs';
import { sharedPublic, categories } from './shared-public.mjs';

// External providers are deliberately NOT simulated in shared mode.
const publicRoutes = new Set([
  '/member/accountLogin', '/index/getStoreInfo', '/index/getPaySeeting',
  '/index/getBannerList', '/index/getNavLists', '/index/getOpenNavigation',
  '/index/getShareInfo', '/index/getShareUrl', '/index/getVision',
  '/goods/getCategory', '/category/getCategoryGoodsList', '/goods/searchShop',
  '/shopgoods/getDetails', '/score/getDetails', '/score/getScoreShopList',
  '/goods/getLootList', '/goods/getLootDetails', '/goods/getIsAuction',
  '/goods/getPurchaseNum', '/loodgoods/getCategoryGoodsList',
  '/notice/getNotice', '/notice/getNoticeInfo', '/region/getAllList',
  '/auction/list', '/auction/detail', '/wx/payGateway', '/getPayGatWay',
  '/index/getSubscribeSetting', '/index/close_consignment',
]);
const memberRoutes = new Set([
  '/member/getMemberDetails', '/member/getIsPayPassword', '/member/verificationPayPassword',
  '/member/editMember', '/member/editPwd', '/member/getNotice', '/member/setSignImage',
  '/address/list', '/address/detail', '/address/add', '/address/edit', '/address/delete', '/address/setDefault',
  '/order/order/buyNow', '/order/originalPricePurchase', '/order/toPayGoods',
  '/pay/balancePay', '/pay/pointsPayment', '/order/detail', '/order/shopList', '/order/scoreLists',
  '/order/cancel', '/order/receipt', '/member/order/receipt', '/order/removeOrder', '/member/order/removeOrder',
  '/order/evaluation', '/goods/getGoodsEvaluation', '/order/getLootList',
  '/order/get_balance_pay_in', '/order/get_balance_pay_out', '/order/get_balance_pay_count',
  '/order/getServiceCharge', '/order/toServiceCharge', '/order/toServiceChargeWithVoucher',
  '/order/getListingFeeOrders', '/order/uploadListingFeeVoucher', '/order/payment_voucher',
  '/order/getOrderReport', '/order/toOrderReport', '/order/subscribe', '/order/getPayOrderStatus',
  '/finance/getAmountInfo', '/finance/getAmountLogList', '/member/getECardList', '/recharge/integralList',
  '/recharge/lists', '/recharge/getOrder', '/recharge/toOrder', '/recharge/getOk', '/ustd/rechargeLog',
  '/member/getApplyList', '/member/getTransfer', '/member/toTransfer', '/demo/coupons',
  '/auction/bids', '/auction/bid', '/auction/settle', '/_upload', '/order/toAddOrder', '/order/cancel_grab',
  '/order/express', '/member/setPay', '/member/getInvitationCode',
  '/order/remindShipment',
]);
const postOnly = new Set([
  '/member/accountLogin','/member/logout','/member/editMember','/member/setSignImage','/member/verificationPayPassword',
  '/address/add','/address/edit','/address/delete','/address/setDefault',
  '/order/toPayGoods','/pay/balancePay','/pay/pointsPayment','/order/cancel','/order/cancel_grab',
  '/order/receipt','/member/order/receipt','/order/removeOrder','/member/order/removeOrder','/order/evaluation',
  '/order/toServiceCharge','/order/toServiceChargeWithVoucher','/order/uploadListingFeeVoucher','/order/payment_voucher',
  '/order/toOrderReport','/order/subscribe','/order/toAddOrder','/order/remindShipment','/recharge/toOrder',
  '/member/toTransfer','/member/setPay','/auction/bid','/auction/settle','/_upload',
]);
const contents = {
  store: '/index/getStoreInfo', banners: '/index/getBannerList',
  navigation: '/index/getNavLists', share: '/index/getShareInfo',
  rules: '/finance/getSystemInfo', agreement: '/index/getGroupAfterSalesAgreement',
  circle: '/circle/getList',
  categories: '/goods/getCategory',
};
const ownedImage = (image) => typeof image === 'string' && /^data:image\/(png|jpeg|gif);base64,[A-Za-z0-9+/=]+$/.test(image) && image.length <= 1500000;
function claimVoucher(store, image, owner) {
  const hash = crypto.createHash('sha256').update(Buffer.from(image.split(',')[1], 'base64')).digest('hex');
  store.state.voucherClaims ||= {};
  if (store.state.voucherClaims[hash] && store.state.voucherClaims[hash] !== owner) return false;
  store.state.voucherClaims[hash] = owner;
  return true;
}
function verifiedImage(user, image) {
  if (!ownedImage(image)) return false;
  const hash = crypto.createHash('sha256').update(Buffer.from(image.split(',')[1], 'base64')).digest('hex');
  return user.uploads?.[hash] > Date.now();
}
function safeContent(value) {
  if (JSON.stringify(value).length > 100000) return false;
  if (typeof value === 'string') return !/[<>]|(?:javascript|data|vbscript)\s*:|on\w+\s*=/i.test(value);
  if (Array.isArray(value)) return value.every(safeContent);
  if (value && typeof value === 'object') return Object.entries(value).every(([key,v]) => !['__proto__','constructor','prototype'].includes(key) && safeContent(v));
  return true;
}
function initialize(store) {
  const s = store.state;
  for (const user of s.users) seedUser(store, user);
  s.content ||= {};
  s.content.store ||= { ...clone(fixtures['/index/getStoreInfo'].data), pay: {}, register_verify: '1' };
}
function validatePaymentPassword(store, user, p, token) {
  return passwordMatches(p.pay_password || p.pwd || p.password, user.payPasswordHash) || store.state.sessions[token]?.payVerifiedUntil > Date.now();
}
export function sharedH5(store, route, p, token, method) {
  initialize(store);
  if (!['GET','POST'].includes(method) || (postOnly.has(route) && method!=='POST')) return fail('此接口不支持该请求方法，操作未执行');
  if (['/member/registerAnAccount','/v1/sms'].includes(route)) return fail('短信服务未配置，当前不能自助注册或发送验证码，请联系管理员');
  if (route==='/member/logout') { delete store.state.sessions[token]; return ok({},'已退出登录'); }
  const user = store.user(token);
  const publicResult=sharedPublic(store,route,p,user);
  if (publicResult) return publicResult;
  const contentKey = Object.keys(contents).find(k => contents[k] === route);
  if (contentKey) {
    if (store.state.content[contentKey] !== undefined) return ok(clone(store.state.content[contentKey]));
    if (['banners','navigation','circle'].includes(contentKey)) return ok([]);
    return fail('请先在后台配置此内容');
  }
  if (route === '/index/getPaySeeting') return ok({ wx_open: '0', zfb_open: '0', bank_open: Object.keys(store.state.content.store.pay || {}).length ? '1' : '0' });
  if (route === '/wx/payGateway') return ok({ alipay_open: 20, wx_open: 20, balance_open: 10, points_open: 10 });
  if (route === '/getPayGatWay') return ok({ is_open: 0 });
  if (route === '/goods/getLootList') {
    const auctions=ensureAuctions(store).filter(a => ['scheduled','running'].includes(a.status) && store.state.catalog.some(x=>isPublished(x) && String(x.goods_id)===String(a.goodsId)));
    return ok({list:auctions.map(a => ({
      status: a.status === 'running' ? 10 : 20, name:'auction-'+a.auctionId, srot:a.auctionId,
      auction_id:a.auctionId, auction:auctionView(store,a,user?.member_id,false),
      time_list:{specialarea_id:a.auctionId,title:{ordinary_title_main:a.title,ordinary_title:'真实竞价场次',introduction_title:''},images:{ordinary_images:a.image,introduction_images:''},is_subscribe:user?.subscriptions?.includes(String(a.auctionId)) ? 1 : 0,is_introduction_order:0,is_ordinary_order:0,time:{new_time:Math.floor(Date.now()/1000),start_time:Date.parse(a.startTime)/1000,start_buy_time:Date.parse(a.startTime)/1000,end_time:Date.parse(a.endTime)/1000,start_end_time:a.startTime.slice(11,16),start_end_time1:a.endTime.slice(11,16)}}
    }))});
  }
  if (['/shopgoods/getDetails','/score/getDetails','/goods/getLootDetails'].includes(route) && !store.state.catalog.some(x => isPublished(x) && String(x.goods_id) === String(p.goods_id))) return fail('商品不存在或已下架');
  if (!publicRoutes.has(route) && !user) return { code: -500, msg: '请先登录', data: {} };
  if (!publicRoutes.has(route) && !memberRoutes.has(route)) return fail('此业务尚未接入真实服务，未执行操作');
  if (route==='/order/subscribe') return fail('预约收费及通知规则尚未配置，预约未提交');
  if (route === '/member/accountLogin' && String(p.password || '').length > 128) return fail('账号或密码不正确');
  if (route === '/_upload') {
    if (!ownedImage(p.image)) return fail('图片格式或大小不符合要求');
    const hash=crypto.createHash('sha256').update(Buffer.from(p.image.split(',')[1],'base64')).digest('hex');
    user.uploads ||= {};
    for (const [key,expires] of Object.entries(user.uploads)) if (expires < Date.now()) delete user.uploads[key];
    user.uploads[hash]=Date.now()+86400000;
    return ok({file_id:hash,file_path:p.image});
  }
  if (route === '/member/getApplyList') return ok(user.withdrawals);
  if (route === '/order/remindShipment') {
    if (method !== 'POST') return fail('请使用 POST 提交发货提醒');
    const order = user.orders.find(o => String(o.order_id) === String(p.order_id));
    if (!order) return fail('订单不存在');
    if (order.status !== 'forwarding' || order.pay_status?.value !== 20) return fail('仅已付款待发货订单可以提醒');
    if (order.shipmentReminder) return ok(clone(order.shipmentReminder), '提醒已在商家后台待处理，请勿重复提交');
    order.shipmentReminder = { reminderId: store.id(), createdAt: now() };
    return ok(clone(order.shipmentReminder), '提醒已保存至商家后台');
  }
  if (route === '/order/getPayOrderStatus') {
    const goods = user.warehouse.find(x => String(x.order_id) === String(p.order_id));
    const payment = user.settlements.find(x => x.direction === 'out' && String(x.order_id) === String(p.order_id));
    return goods && goods.pay_status !== '已取消' && payment?.pay_status === 2
      ? ok(1) : fail('付款尚未审核通过');
  }
  if (route === '/member/getInvitationCode') return ok(user.invitation_code);
  if (route === '/member/setPay') {
    if (p.code) return fail('短信核验服务尚未接入，收款信息未修改');
    return fail('收款信息修改需身份核验，当前未开放');
  }
  if (route === '/member/getNotice') return store.state.content.agreement ? ok({is_sign:user.sign_image ? 1 : 0,content:store.state.content.agreement.consignment_rule || ''}) : fail('请先由后台配置寄卖协议');
  if (route === '/order/express') {
    const order = user.orders.find(o => String(o.order_id) === String(p.order_id));
    if (!order) return fail('订单不存在');
    return ok({ order: {...order,express_company:/模拟/.test(order.express_company || '') ? '' : order.express_company || '',express_no:/^DEMO/.test(order.express_no || '') ? '' : order.express_no || '',tel:order.express_phone || '',thumb:order.goods?.[0]?.goods_image || ''},courier:order.shippedAt ? [{AcceptTime:order.shippedAt,AcceptStation:'商家已登记发货，以下不是承运商实时轨迹',source:'merchant'}] : [],trackingAvailable:false });
  }
  if (['/order/getOrderReport','/order/toOrderReport'].includes(route)) {
    const reported = [...user.orders,...user.warehouse].find(o => String(o.order_id) === String(p.order_id));
    if (!reported) return fail('只能查看或投诉自己的订单');
    if (route === '/order/getOrderReport') {
      const goods=reported.goods?.[0] || reported;
      return ok({order_id:reported.order_id,order_no:reported.order_sn || reported.order_no,
        goods_name:goods.goods_name,goods_no:String(reported.goods_id || ''),goods_price:goods.goods_price || reported.pay_price,
        goods_thumb:goods.goods_image || goods.image?.file_path || goods.image?.[0]?.file_path || reported.image || '',
        reports:user.reports.filter(r=>String(r.order_id)===String(p.order_id)).map(r=>({id:r.id,content_text:r.content_text,status:r.status,remark:r.remark || '',reviewedAt:r.reviewedAt || ''}))});
    }
    if (!String(p.content_text || '').trim() || String(p.content_text).length > 500) return fail('请填写 1 至 500 字的投诉内容');
  }
  if (route === '/member/verificationPayPassword') {
    if (!passwordMatches(p.pwd || p.password || p.pay_password, user.payPasswordHash)) return fail('支付密码不正确');
    store.state.sessions[token].payVerifiedUntil = Date.now() + 60000;
    return ok(1);
  }
  if (route === '/member/editPwd' && p.code) return fail('短信服务未配置，请使用原密码修改');
  if (route==='/member/editPwd' && method==='POST') {
    const old=p.old_password || p.oldpassword;
    if (typeof old!=='string' || old.length>128 || !passwordMatches(old,user.passwordHash)) return fail('原登录密码不正确');
    if (typeof p.password!=='string' || p.password.length<8 || p.password.length>128 || p.real_pwd!==p.password) return fail('请输入8至128位新密码，两次输入须一致');
    user.passwordHash=passwordHash(p.password); delete user.passwordResetUntil;
    for (const [key,session] of Object.entries(store.state.sessions)) if (session.memberId===user.member_id) delete store.state.sessions[key];
    return ok({},'密码已修改，请重新登录');
  }
  if (['/address/add','/address/edit'].includes(route)) {
    if (typeof p.name!=='string' || !p.name.trim() || p.name.length>40 || typeof p.detail!=='string' || !p.detail.trim() || p.detail.length>200 || typeof p.phone!=='string' || !/^1\d{10}$/.test(p.phone) || typeof p.region!=='string' || !/^\d+,\d+,\d+$/.test(p.region) || /[<>\x00-\x1f]/.test(p.name+p.detail)) return fail('请填写有效姓名、手机号、省市区和200字以内详细地址');
    p={...p,name:p.name.trim(),detail:p.detail.trim()};
  }
  if (route === '/member/editMember' && (p.pay_password || p.phone || p.mobile)) return fail('交易密码及手机号修改需核验身份，尚未开放');
  if (route === '/member/toTransfer') {
    if (!/^[a-zA-Z0-9_-]{8,80}$/.test(String(p.request_id || ''))) return fail('缺少有效转赠请求编号，请更新页面后重试');
    if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(String(p.price)) || Number(p.price) <= 0 || Number(p.price) > 1000000) return fail('转赠数量必须为正数且最多两位小数');
    const payloadHash=crypto.createHash('sha256').update(JSON.stringify([String(p.mobile),money(p.price)])).digest('hex');
    user.transferRequests ||= {};
    const existing=user.transferRequests[p.request_id];
    if (existing) {
      if (existing.hash !== payloadHash) return fail('同一请求编号不能用于不同转赠');
      if (p.pay_password && !passwordMatches(p.pay_password,user.payPasswordHash)) return fail('请输入正确交易密码');
      return clone(existing.result);
    }
    if (!validatePaymentPassword(store, user, p, token)) return fail('请输入正确交易密码');
    const recipient=store.state.users.find(u => u.phone === p.mobile && u.status !== '1');
    if (!recipient || recipient.member_id === user.member_id) return fail('收款会员不存在、已停用或不能转赠给自己');
    if (Number(p.price)>Number(user.e_card_number)) return fail('可转赠上架券不足');
    const transferId=store.id();
    entry(store,user,'e_card_number',-Number(p.price),'转赠给 '+recipient.phone,transferId);
    entry(store,recipient,'e_card_number',Number(p.price),'收到 '+user.phone+' 的转赠',transferId);
    const result=ok({transfer_id:transferId},'转赠成功');
    user.transferRequests[p.request_id]={hash:payloadHash,result:clone(result)};
    delete store.state.sessions[token].payVerifiedUntil;
    return result;
  }
  if (['/order/toPayGoods','/pay/balancePay','/pay/pointsPayment'].includes(route)) {
    const order=user.orders.find(o=>String(o.order_id)===String(p.order_id) || [p.trade_no,p.order_sn,p.order_no].filter(Boolean).includes(o.order_sn));
    if (!order) return fail('订单不存在');
    const expected=Number(order.pay_type?.value || (order.order_type===5?4:2));
    const requested=route==='/pay/balancePay'?2:route==='/pay/pointsPayment'?4:Number(p.pay_type);
    if (![2,4].includes(requested)) return fail('此支付通道尚未接入，请选择订单已开通的支付方式');
    if (requested!==expected) return fail('支付方式与订单不一致，请使用下单时的支付方式');
    if (route==='/order/toPayGoods') {
      if (order.status !== 'payment' || order.pay_status?.value !== 10) return fail('此订单不是待付款状态');
      return ok({order_id:order.order_id,order_sn:order.order_sn},'待支付，请验证交易密码');
    }
  }
  if (['/pay/balancePay','/pay/pointsPayment'].includes(route) && !validatePaymentPassword(store, user, p, token)) return fail('请输入正确交易密码');
  if (['/order/order/buyNow','/order/originalPricePurchase'].includes(route) && p.goods_num !== undefined && !/^[1-9]\d*$/.test(String(p.goods_num))) return fail('购买数量必须是正整数');
  const checkout = ['/order/order/buyNow','/order/originalPricePurchase'].includes(route) && method === 'POST';
  let requestHash;
  if (checkout) {
    if (ensureAuctions(store).some(a=>String(a.goodsId)===String(p.goods_id || p.id) && ['scheduled','running'].includes(a.status))) return fail('竞价商品请通过出价参与');
    if (![2,4].includes(Number(p.pay_type))) return fail('该支付通道尚未接入，请选择余额或积分');
    if (p.request_id) {
      if (!/^[a-zA-Z0-9_-]{8,80}$/.test(p.request_id)) return fail('下单请求编号不合法');
      user.orderRequests ||= {};
      requestHash = crypto.createHash('sha256').update(JSON.stringify(p)).digest('hex');
      const existing = user.orderRequests[p.request_id];
      if (existing) return existing.hash === requestHash ? clone(existing.result) : fail('同一请求编号不能用于不同订单');
    }
  }
  if (route === '/order/toAddOrder') {
    const product = store.state.catalog.find(x => String(x.goods_id) === String(p.goods_id));
    if (!product || !isPublished(product)) return fail('商品不存在或已下架');
    if (ensureAuctions(store).some(x => String(x.goodsId) === String(product.goods_id) && ['running','scheduled'].includes(x.status))) return fail('竞价商品请通过出价参与');
    const existing = user.warehouse.find(x => x.goods_id === product.goods_id && x.pay_status === '待支付' && !x.auctionId);
    if (existing) return ok({ order_id: existing.order_id }, '已生成待付款单');
    if (Number(product.spec?.[0]?.stock_num || 0) < 1) return fail('库存不足');
    const goods = makeWarehouse(store.id(), product);
    goods.member_id = user.member_id; goods.stock_reserved = 1;
    product.spec[0].stock_num -= 1;
    user.warehouse.unshift(goods);
    user.settlements.unshift({ id: store.id(), order_id: goods.order_id, order_no: goods.order_no, direction: 'out', pay_status: 0, pay_price: goods.pay_price, specialarea_id: 1, create_time: now(), createtime: now(), goods_name: goods.goods_name, goods_image: goods.image, goods_price: goods.goods_price, pay: clone(store.state.content.store.pay || {}), user: { nickName: '平台收款', mobile: '' } });
    return ok({ order_id: goods.order_id }, '已生成待付款单');
  }
  if (route === '/order/cancel_grab' || route === '/order/cancel') {
    const goods = user.warehouse.find(x => String(x.order_id) === String(p.order_id));
    if (goods) {
      if (goods.auctionId || goods.pay_status !== '待支付') return fail('该仓库订单不可取消');
      const product = store.state.catalog.find(x => x.goods_id === goods.goods_id);
      if (goods.stock_reserved && !goods.stock_released && product) product.spec[0].stock_num += goods.stock_reserved;
      goods.stock_released = true; goods.pay_status = '已取消';
      user.settlements = user.settlements.filter(x => x.order_id !== goods.order_id);
      return ok({}, '订单已取消，库存已释放');
    }
  }
  if (route === '/recharge/lists') {
    const result = demoApi(store, route, p, token, method);
    result.data.set = '上传凭证后等待财务审核；审核通过才增加积分。';
    return result;
  }
  if (route === '/recharge/getOrder') {
    const result = demoApi(store, route, p, token, method);
    result.data.payInfo = clone(store.state.content.store.pay || {});
    return result;
  }
  if (route === '/recharge/getOk' && !user.recharges.some(x => String(x.order_id) === String(p.order_id))) return fail('充值订单不存在');
  if (route === '/recharge/toOrder') {
    const packages = [555,666,888,999,1299,3999];
    const inputAmount = String(p.custom_price === '' || p.custom_price == null ? packages[Number(p.recharge_id) - 1] : p.custom_price);
    const amount = Number(inputAmount);
    if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(inputAmount) || !Number.isFinite(amount) || amount <= 0 || amount > 1000000) return fail('请输入有效充值金额');
    if (!verifiedImage(user, p.pay_image)) return fail('请通过上传接口上传本账号的有效图片凭证');
    const duplicate = user.recharges.find(x => x.pay_image === p.pay_image);
    if (duplicate) return Number(duplicate.price) === amount ? ok(duplicate.order_id, '该凭证已提交') : fail('同一凭证不可重复充值');
    const id = store.id();
    if (!claimVoucher(store, p.pay_image, 'recharge:' + user.member_id + ':' + id)) return fail('此凭证已用于其他业务，请勿重复提交');
    user.recharges.unshift({ order_id: id, order_no: 'R' + id, price: money(amount), amount: money(amount), actual_score: money(amount), face_value: money(amount), pay_image: p.pay_image, pay_type: Number(p.pay_type || 3), status: 0, status_text: '待审核', create_time: now() });
    return ok(id, '充值申请已提交，等待审核');
  }
  if (route === '/order/payment_voucher') {
    const item = user.settlements.find(x => String(x.id) === String(p.id) && x.direction === 'out');
    if (!item || !verifiedImage(user, p.payment_voucher)) return fail('结算单不存在或凭证未通过本账号上传校验');
    if (item.pay_status === 2) return ok({}, '结算已完成');
    const goods = user.warehouse.find(x => x.order_id === item.order_id);
    if (!goods || ['已取消','寄卖中'].includes(goods.pay_status)) return fail('当前订单不可付款');
    if (!claimVoucher(store, p.payment_voucher, 'settlement:' + user.member_id + ':' + item.id)) return fail('此凭证已用于其他业务');
    Object.assign(item, { payment_voucher: p.payment_voucher, pay_image: p.payment_voucher, pay_status: 1, pay_type: Number(p.pay_type || 3) });
    goods.pay_status = '审核中';
    return ok({}, '付款凭证已提交，等待审核');
  }
  if (route === '/order/uploadListingFeeVoucher') {
    const item = user.listingFees.find(x => String(x.voucher_id) === String(p.voucher_id));
    if (!item || !verifiedImage(user, p.voucher_image)) return fail('服务费单不存在或凭证未通过本账号上传校验');
    if (item.status === 2) return ok({}, '已审核通过');
    if (!claimVoucher(store, p.voucher_image, 'fee:' + user.member_id + ':' + item.voucher_id)) return fail('此凭证已用于其他业务');
    item.voucher_image = p.voucher_image; item.status = 1; item.status_text = '待审核';
    return ok({}, '凭证已提交，等待审核');
  }
  if (['/order/toServiceCharge','/order/toServiceChargeWithVoucher'].includes(route)) {
    if (p.voucher_image && !verifiedImage(user, p.voucher_image)) return fail('请通过上传接口上传有效图片凭证');
    const result = demoApi(store, route, p, token, method);
    if (result.code === 1 && result.data.voucher_id) {
      const fee = user.listingFees.find(x => x.voucher_id === result.data.voucher_id);
      if (fee.voucher_image && !claimVoucher(store, fee.voucher_image, 'fee:' + user.member_id + ':' + fee.voucher_id)) return fail('此凭证已用于其他业务');
      if (Number(fee.cash_amount) > 0) {
        fee.status = fee.voucher_image ? 1 : 0; fee.status_text = fee.status ? '待审核' : '待上传凭证';
        const goods = user.warehouse.find(x => x.order_id === fee.order_id);
        goods.pay_status = '待缴上架费';
      }
    }
    return { ...result, msg: result.code === 1 ? '申请已保存，请查看审核状态' : result.msg };
  }
  const result = demoApi(store, route, p, token, method);
  if (result.code === 1 && ['/order/receipt','/member/order/receipt'].includes(route)) result.msg = '收货已确认';
  if (route === '/member/accountLogin' && result.code !== 1) result.msg = '账号或密码错误，或账号已停用';
  if (result.code === 1 && (checkout || route === '/order/toPayGoods')) {
    delete result.data.payment;
    delete result.data.jump_url;
    result.msg = checkout ? '订单已创建，请完成支付' : '请使用已开通的支付方式';
    if (checkout) {
      const created = user.orders.find(o => o.order_id === result.data.order_id);
      created.order_sn = 'T' + created.order_id;
      created.order_no = created.order_sn;
      created.express_company = ''; created.express_no = '';
      created.create_time = now();
      result.data.order_sn = created.order_sn;
      if (p.request_id) user.orderRequests[p.request_id] = { hash:requestHash,result:clone(result) };
    }
  }
  if (result.code === 1 && ['/pay/balancePay','/pay/pointsPayment'].includes(route)) {
    const order = user.orders.find(x => String(x.order_id) === String(result.data.order_id));
    // Real fulfilment is performed by the administrator, never by payment.
    if (order && !order.shippedAt) {
      order.status = 'forwarding'; order.state_text = '待发货';
      order.delivery_status = { value: 10, text: '待发货' };
    }
    delete store.state.sessions[token].payVerifiedUntil;
    result.msg = '支付已完成，请等待发货';
  }
  if (result.code === 1 && route === '/member/toTransfer') delete store.state.sessions[token].payVerifiedUntil;
  // Never return fictional seller/payment details in shared auction settlement.
  if (route === '/auction/settle' && result.code === 1) {
    const goods = user.warehouse.find(x => x.order_id === result.data.order_id);
    goods.member_id = user.member_id;
    const settlement = user.settlements.find(x => x.order_id === goods.order_id);
    settlement.pay = clone(store.state.content.store.pay || {});
    settlement.user = { nickName: '平台收款', mobile: '' };
  }
  return result;
}

const collections = { warehouse: ['warehouse','order_id'], settlements: ['settlements','id'], fees: ['listingFees','voucher_id'], recharges: ['recharges','order_id'], withdrawals: ['withdrawals','id'], reports: ['reports','id'], ledger: ['ledger','id'] };
const adminOK = (data, msg = '操作成功') => ({ code: 200, msg, data });
const adminFail = msg => ({ code: 400, msg, data: {} });
export function sharedAdmin(store, route, p, actor, method) {
  initialize(store);
  const parts = route.split('/');
  const resource = parts[2], id = parts[3];
  if (resource==='products' && id==='categories' && method==='GET') return adminOK({categoryList:categories(store.state)});
  if (resource === 'members' && method === 'POST') {
    if (!/^1\d{10}$/.test(p.phone || '') || !String(p.nickName || '').trim() || String(p.password || '').length < 8 || !/^\d{6}$/.test(p.payPassword || '')) return adminFail('请输入手机号、昵称、至少八位登录密码及六位交易密码');
    if (store.state.users.some(user => user.phone === p.phone)) return adminFail('手机号已存在');
    const member = { member_id: store.id(), phone: p.phone, nickName: String(p.nickName).slice(0,40), passwordHash: passwordHash(p.password), payPasswordHash: passwordHash(p.payPassword), amount: '0.00', score: '0.00', e_card_number: '0.00', status: '0', headimg: '/h5/static/img/photo.e65d4f32.png', create_time: now() };
    member.invitation_code = 'M' + member.member_id;
    seedUser(store, member); store.state.users.push(member);
    return adminOK({ memberId: member.member_id }, '会员已建立，资产初始为零');
  }
  if (resource === 'content') {
    if (method === 'GET') return adminOK({ rows: Object.keys(contents).map(key => ({ id: key, route: contents[key], value: store.state.content[key] ?? null })), total: Object.keys(contents).length });
    if (method === 'PUT' && Object.hasOwn(contents, id) && p.value !== undefined) {
      if (!safeContent(p.value)) return adminFail('内容过长或包含不允许的 HTML/脚本，请使用纯文本和 HTTPS 图片地址');
      if (id==='categories') {
        if (!Array.isArray(p.value) || p.value.length>100 || p.value.some(c=>!c || !Number.isSafeInteger(c.category_id) || c.category_id<=0 || typeof c.name!=='string' || !c.name.trim() || c.name.length>30) || new Set(p.value.map(c=>c.category_id)).size!==p.value.length) return adminFail('分类应为最多100项数组，每项包含唯一正整数 category_id 和1至30字 name');
        if (store.state.catalog.some(x=>Number(x.category_id)>0 && !p.value.some(c=>c.category_id===Number(x.category_id)))) return adminFail('仍有商品使用此分类，请先调整商品分类');
      }
      if (['banners','navigation','circle'].includes(id) && !Array.isArray(p.value)) return adminFail('该内容必须为数组');
      if (id === 'store' && (!p.value || typeof p.value !== 'object' || Array.isArray(p.value))) return adminFail('商城设置必须为对象');
      store.state.content[id] = clone(p.value);
      return adminOK({}, '内容已保存');
    }
    return adminFail('不支持的内容操作');
  }
  if (resource === 'bids' && method === 'GET') return adminOK(paginateAdmin(store.state.auctionBids, p));
  if (Object.hasOwn(collections, resource)) {
    const [field, key] = collections[resource];
    const items = store.state.users.flatMap(user => user[field].map(record => ({ user, record })));
    if (method === 'GET') {
      const rows = items.map(({ user, record }) => ({ ...record, recordId: record[key], memberId: user.member_id, memberName: user.nickName, phone: user.phone }))
        .filter(row => !p.keyword || JSON.stringify([row.order_no,row.memberName,row.phone,row.goods_name]).includes(String(p.keyword)))
        .filter(row => !p.status || String(row.status ?? row.pay_status) === String(p.status));
      return adminOK(paginateAdmin(rows, p));
    }
    const found = items.find(({ user, record }) => String(record[key]) === id && (!p.memberId || String(user.member_id) === String(p.memberId)));
    if (method !== 'PUT' || !found) return adminFail('记录不存在或操作不支持');
    const { user, record } = found;
    const approved = p.action === 'approve';
    if (!['approve','reject','resolve'].includes(p.action)) return adminFail('请选择有效操作');
    if (p.action === 'reject' && !String(p.remark || '').trim()) return adminFail('驳回必须填写原因');
    if (resource === 'reports' && p.action === 'resolve') {
      if (!String(p.remark || '').trim()) return adminFail('请填写处理结果');
      record.status = '已处理';
    } else if (['fees','recharges','settlements'].includes(resource) && ['approve','reject'].includes(p.action)) {
      const status = resource === 'settlements' ? record.pay_status : record.status;
      const completed = resource === 'recharges' ? 1 : 2;
      if (status === completed) return approved ? adminOK({}, '已经审核通过，未重复入账') : adminFail('已通过记录不可驳回');
      if (status !== (resource === 'recharges' ? 0 : 1)) return adminFail('仅待审核记录可审核');
      const goods = user.warehouse.find(x => x.order_id === record.order_id);
      if (resource === 'recharges') {
        record.status = approved ? 1 : 2; record.status_text = approved ? '已到账' : '已驳回';
        if (approved) entry(store, user, 'score', Number(record.actual_score), '充值审核通过', record.order_id);
      } else if (resource === 'settlements') {
        if (record.direction !== 'out' || !goods) return adminFail('此入口仅审核买方付款单');
        record.pay_status = approved ? 2 : 0;
        goods.pay_status = approved ? '结算完毕' : '待支付';
        if (approved) goods.pay_time = now();
      } else {
        if (!goods) return adminFail('仓库订单不存在');
        record.status = approved ? 2 : 3; record.status_text = approved ? '已通过' : '已驳回';
        goods.pay_status = approved ? '寄卖中' : '待缴上架费';
      }
    } else return adminFail('该业务目前仅支持查询，未执行修改');
    record.remark = String(p.remark || '').slice(0, 500);
    record.reviewedBy = actor.userName; record.reviewedAt = now();
    return adminOK({}, '处理完成');
  }
  if (resource === 'products' && ['POST','PUT'].includes(method)) {
    const price = Number(p.goods_min_price ?? p.price);
    const stock = Number(p.stock ?? p.stock_num ?? p.spec?.[0]?.stock_num);
    if (!String(p.goods_name ?? p.name ?? '').trim() || !Number.isFinite(price) || price <= 0 || price > 1000000 || !Number.isSafeInteger(stock) || stock < 0) return adminFail('商品名称、价格或库存不合法');
    if (id && p.goods_id !== undefined && String(p.goods_id) !== id) return adminFail('不能修改商品编号');
    if (p.category_id!==undefined && !categories(store.state).some(c=>c.category_id===Number(p.category_id))) return adminFail('请选择已配置的商品分类');
    if (p.description!==undefined && (typeof p.description!=='string' || p.description.length>5000 || !safeContent(p.description))) return adminFail('商品描述仅支持5000字以内纯文本');
  }
  if (resource === 'notices' && ['POST','PUT'].includes(method) && !safeContent(p)) return adminFail('公告仅支持纯文本，不能包含 HTML 或脚本');
  if (resource === 'members' && method === 'PUT' && p.status !== undefined && !['0','1'].includes(String(p.status))) return adminFail('会员状态不合法');
  if (resource === 'orders' && method === 'PUT') {
    const order = store.state.users.flatMap(u => u.orders).find(o => String(o.order_id) === id);
    const next = p.status || p.orderStatus;
    if (next === 'received') {
      if (!order) return adminFail('订单不存在');
      const company=String(p.expressCompany || '').trim(), number=String(p.expressNo || '').trim(), phone=String(p.expressPhone || '').trim();
      if (!company || company.length>40 || /[<>\x00-\x1f]/.test(company) || !/^[A-Za-z0-9-]{6,40}$/.test(number) || (phone && !/^[+()\d -]{5,30}$/.test(phone))) return adminFail('请填写有效快递公司、6至40位运单号及可选联系电话');
      if (order.shippedAt) {
        if (order.express_company===company && order.express_no===number && (order.express_phone || '')===phone) return adminOK({orderId:order.order_id,status:order.status,expressCompany:company,expressNo:number,shippedAt:order.shippedAt},'已登记该运单，未重复发货');
        return adminFail('此订单已发货，不能用不同运单覆盖历史记录');
      }
      if (order.status!=='forwarding' || order.pay_status?.value!==20) return adminFail('仅已付款待发货订单可以登记发货');
      const result=adminBusinessApi(store,route,p,actor,method);
      if (result.code===200) {
        Object.assign(order,{express_company:company,express_no:number,express_phone:phone,shippedAt:now(),shippedBy:actor.userName});
        Object.assign(result.data,{expressCompany:company,expressNo:number,expressPhone:phone,shippedAt:order.shippedAt});
        result.msg='发货信息已保存';
      }
      return result;
    }
    if (order && ['evaluation','completed'].includes(next) && order.receipt_status?.value !== 20) return adminFail('请等待会员实际确认收货，后台不能代替会员收货');
    if (order && next === 'completed' && order.evaluation_status !== 20) return adminFail('请等待会员评价，后台不能生成虚假评价状态');
  }
  const result = adminBusinessApi(store, route, p, actor, method);
  if (result.code === 200 && resource === 'members' && method === 'PUT' && String(p.status) === '1') {
    for (const [key,session] of Object.entries(store.state.sessions)) if (String(session.memberId) === id) delete store.state.sessions[key];
  }
  return result;
}
function paginateAdmin(rows = [], p) {
  const size = Math.min(100, Math.max(1, Number(p.pageSize) || 10));
  const start = (Math.max(1, Number(p.pageNum) || 1) - 1) * size;
  return { rows: rows.slice(start, start + size), total: rows.length };
}
