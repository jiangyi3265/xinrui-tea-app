// Daily grab (抢购) and consignment (寄售) rules: time windows, per-session
// limit, fuel fee (燃料费 = e_card_number) and the 1% seller profit
// (我的利润 = score).  Registered from workflows.mjs; no route here reads state
// that another route could leave half-written, because the engine commits a
// request atomically or not at all.
import crypto from 'node:crypto';
import { ok, fail, money, now, entry, clone, paginate, makeWarehouse, publicCatalog, isPublished } from './demo/data.mjs';
import { ensureAuctions } from './demo/auction.mjs';
import { clock, phase, dayKey, cents, fuelFee, profitFee, upliftPrice, lootTime } from './schedule.mjs';

export const GRAB_SESSION_ID = 'grab';
const requestValid = p => /^[A-Za-z0-9_-]{8,80}$/.test(String(p.request_id || ''));
const zh = n => ({ 1: '一', 2: '两', 3: '三', 4: '四', 5: '五' })[n] || String(n);
const stockOf = product => Number(product.spec?.[0]?.stock_num || 0);
const maskName = name => String(name || '').slice(0, 1) + '**';

function biddingGoods(store) {
  return new Set(ensureAuctions(store).filter(a => ['scheduled', 'running'].includes(a.status)).map(a => String(a.goodsId)));
}

// Everything that can be grabbed right now: platform stock plus consigned items.
export function grabPool(store, viewer) {
  const bidding = biddingGoods(store), list = [];
  for (const product of publicCatalog(store)) {
    if (stockOf(product) < 1 || bidding.has(String(product.goods_id))) continue;
    list.push({ ...clone(product), goods_price: product.goods_min_price, image: product.goods_image, goods_no: 'TEA-' + product.goods_id,
      consignment_member_name: '平台', pay_status: '待抢购', is_order: 0, order_id: 0 });
  }
  for (const seller of store.state.users) {
    if (viewer && seller.member_id === viewer.member_id) continue;
    for (const item of seller.warehouse) {
      if (item.pay_status !== '寄卖中') continue;
      const product = store.state.catalog.find(x => String(x.goods_id) === String(item.goods_id)) || {};
      list.push({ ...clone(product), goods_id: item.goods_id, goods_name: item.goods_name, goods_image: item.image, image: item.image,
        goods_min_price: item.sale_price, goods_price: item.sale_price, goods_no: 'W' + item.order_id,
        consignment_member_name: maskName(seller.nickName), pay_status: '寄卖中', is_order: 0, order_id: item.order_id });
    }
  }
  return list;
}

export function grabSession(store, user, rules) {
  const pool = grabPool(store, user), time = lootTime(rules, pool.length === 0);
  return {
    status: time.status, name: 'grab', srot: 0, auction_id: GRAB_SESSION_ID,
    time_list: {
      specialarea_id: GRAB_SESSION_ID, is_subscribe: 0, is_introduction_order: 0, is_ordinary_order: 0,
      title: { ordinary_title_main: '抢购', ordinary_title: '每日抢购', introduction_title: '' },
      images: { ordinary_images: '', introduction_images: '' },
      time,
    },
  };
}

export function grabGoodsList(store, user, rules, p) {
  const pool = grabPool(store, user);
  return ok({ time_info: lootTime(rules, pool.length === 0), list: paginate(pool, p) });
}

function identityProblem(u) {
  const status = u.certification?.status;
  if (status === '已通过') return '';
  return status === '待审核' ? '身份资料待人工审核，通过后才能抢购' : '请提交身份资料供人工核验';
}

function grabGate(store, u, r) {
  if (u.status === '1') return '账号已被暂停使用，请联系管理员';
  const identity = identityProblem(u);
  if (identity) return identity;
  const ph = phase(r, 'grab');
  if (ph === 'before') return `未到抢购时间，今日 ${r.grabStart} 开始`;
  if (ph === 'after') return `今日抢购已结束（已闭馆），请明日 ${r.grabStart} 再来`;
  const today = dayKey(clock.now());
  const got = u.warehouse.filter(w => w.grab_day === today && w.pay_status !== '已取消').length;
  if (got >= r.grabLimit) return `每人每次只能抢${zh(r.grabLimit)}单`;
  return '';
}

const fuelProblem = (u, price, r) => cents(u.e_card_number) < cents(fuelFee(price, r))
  ? `燃料费余额不足，本单需 ${money(fuelFee(price, r))} 元，请联系上家充值后再抢购` : '';
function chargeFuel(store, u, price, r, orderId) {
  const fee = fuelFee(price, r);
  if (fee > 0) entry(store, u, 'e_card_number', -fee, '抢购燃料费', orderId);
  return fee;
}

// Seller earns the profit share when somebody grabs the consigned item.
function payProfit(store, seller, buyer, item, price, r) {
  const profit = profitFee(price, r);
  if (profit <= 0) return 0;
  entry(store, seller, 'score', profit, '寄售利润', item.order_id);
  seller.profits.unshift({ id: store.id(), order_id: item.order_id, order_no: item.order_no, goods_name: item.goods_name, goods_image: item.image,
    buyer_name: buyer.nickName, owner_name: seller.nickName, profit: money(profit), amount: money(profit), type: 3, rate: r.profitRate,
    create_time: now(), status_text: '寄售利润' });
  return profit;
}

function grabConsigned(ctx, store, u, p, seller, item, r) {
  // Money between members is settled offline in the daily statement, so only the
  // fuel balance gates a grab and no in-system balance moves here.
  const price = item.sale_price;
  const short = fuelProblem(u, price, r);
  if (short) return fail(short);
  const fuel = chargeFuel(store, u, price, r, item.order_id);
  const purchased = { ...clone(item), order_id: store.id(), member_id: u.member_id, pay_status: '结算完毕', pay_price: price,
    goods_price: money(Number(price) / Number(item.goods_num || 1)), is_consignment: 0, side: 0, purchase_request: p.request_id || undefined,
    source_order_id: item.order_id, grab_day: dayKey(clock.now()), fuel_paid: money(fuel), create_time: now(), pay_time: now() };
  purchased.order_no = 'W' + purchased.order_id; delete purchased.sale_price; delete purchased.listed_day;
  payProfit(store, seller, u, item, price, r);
  Object.assign(item, { pay_status: '已售出', buyer_id: u.member_id, soldAt: now(), sold_day: dayKey(clock.now()), sold_price: price });
  u.warehouse.unshift(purchased);
  const settlement = { pay_status: 2, pay_price: price, create_time: now(), goods_name: item.goods_name, goods_image: item.image, pay_type: 2 };
  seller.settlements.unshift({ ...settlement, id: store.id(), order_id: item.order_id, direction: 'in', user: { nickName: u.nickName }, order_no: item.order_no });
  u.settlements.unshift({ ...settlement, id: store.id(), order_id: purchased.order_id, direction: 'out', user: { nickName: seller.nickName }, order_no: purchased.order_no });
  ctx.notify(store, seller, '寄卖已成交', item.goods_name + ' 已被抢购，收入 ' + price + ' 元，利润已记入「我的利润」。');
  return ok({ order_id: purchased.order_id }, '抢购成功，商品已入库');
}

function grabPlatform(store, u, p, r) {
  const bidding = biddingGoods(store);
  let product;
  if (p.goods_id !== undefined && p.goods_id !== '' && p.goods_id !== null) {
    product = store.state.catalog.find(x => String(x.goods_id) === String(p.goods_id));
    if (!product || !isPublished(product)) return fail('商品不存在或已下架');
    if (bidding.has(String(product.goods_id))) return fail('竞价商品请通过出价参与');
  } else {
    const candidates = publicCatalog(store).filter(x => stockOf(x) >= 1 && !bidding.has(String(x.goods_id)));
    if (!candidates.length) return fail('当前没有可抢购的商品');
    product = candidates[crypto.randomInt(candidates.length)];
  }
  if (stockOf(product) < 1) return fail('库存不足，已被抢完');
  const short = fuelProblem(u, product.goods_min_price, r);
  if (short) return fail(short);
  const goods = makeWarehouse(store.id(), product);
  const fuel = chargeFuel(store, u, goods.pay_price, r, goods.order_id);
  Object.assign(goods, { member_id: u.member_id, stock_reserved: 1, grab_day: dayKey(clock.now()), fuel_paid: money(fuel) });
  product.spec[0].stock_num -= 1;
  u.warehouse.unshift(goods);
  u.settlements.unshift({ id: store.id(), order_id: goods.order_id, order_no: goods.order_no, direction: 'out', pay_status: 0, pay_price: goods.pay_price,
    specialarea_id: 1, create_time: now(), createtime: now(), goods_name: goods.goods_name, goods_image: goods.image, goods_price: goods.goods_price });
  return ok({ order_id: goods.order_id }, '抢购成功，请前往仓库完成付款');
}

// Single entry for both ways of grabbing: platform stock and consigned items.
export function grab(ctx, store, u, p) {
  const r = ctx.rules(store.state), problem = grabGate(store, u, r);
  if (problem) return fail(problem);
  const seller = p.order_id ? store.state.users.find(s => s.warehouse.some(w => String(w.order_id) === String(p.order_id) && w.pay_status === '寄卖中')) : null;
  const item = seller?.warehouse.find(w => String(w.order_id) === String(p.order_id));
  if (item) {
    if (seller.member_id === u.member_id) return fail('不能抢购自己寄售的商品');
    return grabConsigned(ctx, store, u, p, seller, item, r);
  }
  return grabPlatform(store, u, p, r);
}

export function cancelGrab(store, u, goods) {
  if (goods.fuel_paid && !goods.fuel_refunded && Number(goods.fuel_paid) > 0) {
    entry(store, u, 'e_card_number', Number(goods.fuel_paid), '取消抢购退回燃料费', goods.order_id);
    goods.fuel_refunded = true;
  }
}

// ---- consignment -------------------------------------------------------

export function consignWindowProblem(r) {
  const ph = phase(r, 'consign');
  if (ph === 'open') return '';
  return ph === 'before' ? `未到寄售时间，今日 ${r.consignStart}—${r.consignEnd} 开放寄售` : `今日寄售已结束，请明日 ${r.consignStart}—${r.consignEnd} 再来`;
}

export const defaultSalePrice = (warehouse, r) => money(upliftPrice(warehouse.pay_price, r));
export const consignable = w => w.pay_status === '结算完毕' && !w.is_delivery && !w.is_consignment;

export function listItem(store, u, warehouse, salePrice, r) {
  const fee = Number(money(Number(warehouse.pay_price) * r.consignmentFeeRate / 100));
  if (cents(u.amount) < cents(fee)) return '余额不足以支付寄卖服务费';
  if (fee) entry(store, u, 'amount', -fee, '寄卖服务费', warehouse.order_id);
  Object.assign(warehouse, { sale_price: money(salePrice), is_consignment: 1, side: 1, pay_status: '寄卖中', listed_day: dayKey(clock.now()) });
  u.listingFees.unshift({ voucher_id: store.id(), order_id: warehouse.order_id, goods_name: warehouse.goods_name, total_fee: money(fee), amount_deduct: money(fee),
    cash_amount: '0.00', status: 2, status_text: '已通过', create_time: now() });
  return '';
}

// One click: list every settled item of the member at the default +3% price.
export function consignAll(store, u, r) {
  let count = 0;
  for (const w of u.warehouse.filter(consignable)) {
    const problem = listItem(store, u, w, defaultSalePrice(w, r), r);
    if (problem) return { count, problem };
    count += 1;
  }
  return { count, problem: '' };
}

// Admin: put every member's settled inventory on consignment at once.
export function consignEveryone(store, r) {
  let items = 0; const members = new Set(); const skipped = [];
  for (const u of store.state.users) {
    for (const w of u.warehouse.filter(consignable)) {
      const problem = listItem(store, u, w, defaultSalePrice(w, r), r);
      if (problem) { skipped.push({ memberId: u.member_id, nickName: u.nickName, reason: problem }); break; }
      items += 1; members.add(u.member_id);
    }
  }
  return { items, members: members.size, skipped };
}
