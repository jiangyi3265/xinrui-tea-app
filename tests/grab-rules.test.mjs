import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.mjs';
import { sharedAdmin, sharedH5 } from '../server/shared-api.mjs';
import { defaults } from '../server/workflows.mjs';
import { clock, fuelFee, profitFee, upliftPrice, lootTime, scheduleDefaults } from '../server/schedule.mjs';

const at = (hm, day = '2026-10-02') => { clock.now = () => Date.parse(day + 'T' + hm + ':00+08:00'); };
const PAY = '246810';

function setup(members = 3) {
  const state = { users: [], sessions: {}, nextId: 100, catalog: [], auctions: [], auctionBids: [], adminNotices: [], content: {} };
  const store = createMemoryStore(state, () => {}, 'shared');
  const admin = (route, p = {}, method = 'GET') => sharedAdmin(store, '/tea' + route, p, { userName: 'qa', userId: 1 }, method);
  const h5 = (route, p = {}, token = '', method = 'POST') => sharedH5(store, route, p, token, method);
  for (let i = 0; i < members; i++) assert.equal(admin('/members', { phone: '1990000000' + i, nickName: '会员' + i, password: 'test-password', payPassword: PAY }, 'POST').code, 200);
  const tokens = state.users.map(u => h5('/member/accountLogin', { phone: u.phone, password: 'test-password' }).data.token);
  for (const u of state.users) { u.amount = '5000.00'; u.e_card_number = '500.00'; u.certification = { status: '已通过', name: '测试', lastFour: '1234' }; }
  at('09:31');
  return { store, state, admin, h5, tokens, users: state.users };
}
const product = (admin, price = 1000, stock = 5) => admin('/products', { goods_name: '抢购茶', price, stock }, 'POST').data;

test('money helpers truncate to cents and reproduce the operators\' worked examples', () => {
  assert.equal(upliftPrice(1000, defaults), 1030);
  assert.equal(upliftPrice(1030, defaults), 1060.9);
  assert.equal(fuelFee(1060.9, defaults), 21.21);
  assert.equal(profitFee(1060.9, defaults), 10.6);
  assert.equal(fuelFee(1030, defaults), 20.6);
  assert.equal(profitFee(1030, defaults), 10.3);
  assert.equal(fuelFee(221930.63, defaults), 4438.61);
});

test('grab window: closed before 09:30 and after 09:35, open inside, next day reopens with a start countdown', () => {
  const { h5, admin, tokens } = setup(); const p = product(admin);
  at('09:29'); let r = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]);
  assert.equal(r.code, 0); assert.match(r.msg, /未到抢购时间/);
  assert.equal(h5('/index/close_consignment').data.value, 20);
  const before = h5('/goods/getLootList').data.list[0].time_list.time;
  assert.equal(before.status, 10); assert.equal(before.time, 60); assert.equal(before.start_end_time, '09:30'); assert.equal(before.start_end_time1, '09:35');
  at('09:30'); assert.equal(h5('/index/close_consignment').data.value, 10);
  assert.equal(h5('/goods/getLootList').data.list[0].time_list.time.time, 300);
  at('09:35'); assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).code, 1);
  at('09:36'); r = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]);
  assert.equal(r.code, 0); assert.match(r.msg, /已闭馆/);
  assert.equal(h5('/goods/getLootList').data.list[0].time_list.time.status, 20);
  at('00:05', '2026-10-03'); const next = h5('/goods/getLootList').data.list[0].time_list.time;
  assert.equal(next.status, 10); assert.ok(next.time > 0); assert.equal(next.start_time * 1000, Date.parse('2026-10-03T09:30:00+08:00'));
  at('09:31', '2026-10-03'); assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).code, 1);
});

test('administrators can move the windows; invalid schedules are rejected and keep the old rules', () => {
  const { h5, admin, tokens } = setup(); const p = product(admin);
  for (const bad of [{ grabStart: '9:30' }, { grabStart: '10:00', grabEnd: '09:35' }, { consignStart: '18:00', consignEnd: '17:30' }, { grabLimit: 0 }, { grabLimit: 1.5 }, { fuelRate: 101 }, { consignUpliftRate: -1 }])
    assert.equal(admin('/content/business', { value: { ...defaults, ...bad } }, 'PUT').code, 400);
  assert.equal(admin('/content/business', { value: { ...defaults, grabStart: '20:00', grabEnd: '20:10' } }, 'PUT').code, 200);
  at('09:31'); assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).code, 0);
  at('20:05'); assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).code, 1);
});

test('grab requires an approved identity and an active account, otherwise nothing changes', () => {
  const { h5, admin, tokens, users, store } = setup(); const p = product(admin);
  for (const status of [undefined, '待审核', '已驳回']) {
    users[0].certification = status ? { status } : undefined; if (!status) delete users[0].certification;
    const before = JSON.stringify(store.state);
    const r = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]);
    assert.equal(r.code, 0); assert.match(r.msg, status === '待审核' ? /待人工审核/ : /请提交身份资料供人工核验/);
    assert.equal(JSON.stringify(store.state), before);
  }
});

test('each member may grab only two orders per session; cancelled grabs free a slot; the next day resets', () => {
  const { h5, admin, tokens, users } = setup(); const p = product(admin, 1000, 10); const u = users[0];
  const a = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]), b = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]);
  assert.equal(a.code, 1); assert.equal(b.code, 1); assert.notEqual(a.data.order_id, b.data.order_id);
  const third = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]);
  assert.equal(third.code, 0); assert.equal(third.msg, '每人每次只能抢两单');
  assert.equal(u.e_card_number, '460.00'); assert.equal(u.warehouse.length, 2);
  assert.equal(h5('/order/cancel_grab', { order_id: a.data.order_id }, tokens[0]).code, 1);
  assert.equal(u.e_card_number, '480.00'); assert.equal(store0(u, a.data.order_id).fuel_refunded, true);
  assert.equal(h5('/order/cancel_grab', { order_id: a.data.order_id }, tokens[0]).code, 0);
  assert.equal(u.e_card_number, '480.00');
  assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).code, 1);
  assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).code, 0);
  assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[1]).code, 1, 'the limit is per member');
  at('09:32', '2026-10-03'); assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).code, 1);
});
const store0 = (user, id) => user.warehouse.find(w => w.order_id === id);

test('fuel balance is required and deducted at 2% of the price; insufficient fuel blocks the grab without side effects', () => {
  const { h5, admin, tokens, users, store } = setup(); const p = product(admin, 1000, 3); const u = users[0];
  u.e_card_number = '19.99'; const before = JSON.stringify(store.state);
  const r = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]);
  assert.equal(r.code, 0); assert.match(r.msg, /燃料费余额不足/); assert.equal(JSON.stringify(store.state), before);
  assert.equal(store.state.catalog[0].spec[0].stock_num, 3);
  u.e_card_number = '20.00'; assert.equal(h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).code, 1);
  assert.equal(u.e_card_number, '0.00'); assert.equal(store.state.catalog[0].spec[0].stock_num, 2);
  assert.equal(u.ledger[0].remark, '抢购燃料费');
});

test('grabbing without a product picks one from all products with stock', () => {
  const { h5, admin, tokens, users } = setup(); const a = product(admin, 1000, 0), b = product(admin, 500, 2);
  const r = h5('/order/toAddOrder', {}, tokens[0]); assert.equal(r.code, 1);
  assert.equal(users[0].warehouse[0].goods_id, b.goods_id); assert.notEqual(users[0].warehouse[0].goods_id, a.goods_id);
  assert.equal(users[0].e_card_number, '490.00');
  const list = h5('/loodgoods/getCategoryGoodsList', { specialarea_id: 'grab' }).data;
  assert.equal(list.list.total, 1); assert.equal(list.time_info.status, 10);
});

test('price chain: 1000 -> 1030 -> 1060.90, fuel 2% from the buyer, 1% profit to the seller, truncated to cents', () => {
  const { h5, admin, tokens, users } = setup(); const p = product(admin, 1000, 1);
  const [a, b, c] = users;
  const first = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).data.order_id;
  assert.equal(a.e_card_number, '480.00');
  assert.equal(h5('/warehouse/pay', { order_id: first, pay_password: PAY }, tokens[0]).code, 1);
  at('15:00'); assert.equal(h5('/order/getServiceCharge', { order_id: first, type: 2 }, tokens[0], 'GET').data.consignment_goods_price, '1030.00');
  assert.equal(h5('/warehouse/listing', { order_id: first, pay_password: PAY }, tokens[0]).code, 1, 'default price needs no manual input');
  assert.equal(a.warehouse[0].sale_price, '1030.00');
  at('09:31', '2026-10-03');
  const second = h5('/market/buy', { order_id: first, request_id: 'chain-order-1', pay_password: PAY }, tokens[1]);
  assert.equal(second.code, 1, second.msg);
  assert.equal(b.e_card_number, '479.40'); assert.equal(a.score, '10.30'); assert.equal(a.profits[0].amount, '10.30');
  assert.equal(a.amount, '4000.00'); assert.equal(b.amount, '5000.00', 'no balance moves between members');
  assert.equal(b.warehouse[0].pay_price, '1030.00'); assert.equal(a.warehouse[0].sold_price, '1030.00');
  at('15:00', '2026-10-03');
  const held = b.warehouse.find(w => w.order_id === second.data.order_id);
  assert.equal(h5('/order/getServiceCharge', { order_id: held.order_id, type: 2 }, tokens[1], 'GET').data.consignment_goods_price, '1060.90');
  const ca = h5('/warehouse/consignAll', { pay_password: PAY }, tokens[1]);
  assert.equal(ca.code, 1, ca.msg); assert.equal(ca.data.count, 1);
  assert.equal(held.sale_price, '1060.90');
  at('09:31', '2026-10-04');
  assert.equal(h5('/market/buy', { order_id: held.order_id, request_id: 'chain-order-2', pay_password: PAY }, tokens[2]).code, 1);
  assert.equal(c.e_card_number, '478.79'); assert.equal(b.score, '10.60'); assert.equal(b.profits[0].amount, '10.60');
  assert.equal(b.amount, '5000.00'); assert.equal(c.amount, '5000.00');
});

test('consignment is only accepted inside the consignment window; the one-click action lists everything once', () => {
  const { h5, admin, tokens, users } = setup(); const p = product(admin, 100, 4); const u = users[0];
  const orders = [0, 1].map(() => h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).data.order_id);
  for (const id of orders) assert.equal(h5('/warehouse/pay', { order_id: id, pay_password: PAY }, tokens[0]).code, 1);
  at('14:29'); assert.match(h5('/warehouse/consignAll', { pay_password: PAY }, tokens[0]).msg, /未到寄售时间/);
  assert.match(h5('/warehouse/listing', { order_id: orders[0], pay_password: PAY }, tokens[0]).msg, /未到寄售时间/);
  at('17:31'); assert.match(h5('/warehouse/consignAll', { pay_password: PAY }, tokens[0]).msg, /今日寄售已结束/);
  at('17:30'); assert.equal(h5('/warehouse/consignAll', { pay_password: PAY }, tokens[0]).code, 1, 'the last minute is still open');
  assert.equal(u.warehouse.filter(w => w.pay_status === '寄卖中').length, 2);
  assert.equal(h5('/warehouse/consignAll', { pay_password: PAY }, tokens[0]).code, 0, 'nothing left to list');
  assert.equal(h5('/market/list').data.length, 2);
});

test('default-price consignment needs no password (the H5 page sends none); a custom price does', () => {
  const { h5, admin, tokens } = setup(); const p = product(admin, 100, 4);
  const orders = [0, 1].map(() => h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[0]).data.order_id);
  for (const id of orders) h5('/warehouse/pay', { order_id: id, pay_password: PAY }, tokens[0]);
  at('15:00');
  assert.equal(h5('/order/toServiceChargeWithVoucher', { order_id: orders[0], use_coupon: '1', coupon_deduct: '0.00', amount_deduct: '0.00' }, tokens[0]).code, 1);
  assert.match(h5('/warehouse/listing', { order_id: orders[1], sale_price: 150 }, tokens[0]).msg, /交易密码/);
  assert.equal(h5('/warehouse/listing', { order_id: orders[1], sale_price: 150, pay_password: PAY }, tokens[0]).code, 1);
});

test('administrator one-click consign lists every member\'s settled inventory without a window', () => {
  const { h5, admin, tokens, users } = setup(); const p = product(admin, 200, 5);
  for (const i of [0, 1]) { const id = h5('/order/toAddOrder', { goods_id: p.goods_id }, tokens[i]).data.order_id; h5('/warehouse/pay', { order_id: id, pay_password: PAY }, tokens[i]); }
  at('03:00'); const r = admin('/warehouse/consign-all', {}, 'PUT');
  assert.equal(r.code, 200); assert.equal(r.data.items, 2); assert.equal(r.data.members, 2);
  assert.equal(users[0].warehouse[0].sale_price, '206.00'); assert.equal(users[1].warehouse[0].pay_status, '寄卖中');
  assert.equal(admin('/warehouse/consign-all', {}, 'PUT').data.items, 0);
  const listed = admin('/warehouse').data.rows;
  assert.deepEqual(listed.map(r => r.status_text), ['寄卖中', '寄卖中'], 'the admin list shows the live warehouse status, not the creation-time one');
});

test('pausing a member blocks login and kills existing sessions immediately; resume restores access', () => {
  const { h5, admin, tokens, users } = setup(); const id = users[0].member_id;
  assert.equal(h5('/member/getMemberDetails', {}, tokens[0]).code, 1);
  assert.equal(admin('/members/' + id, { action: 'pause', remark: '风控' }, 'PUT').code, 200);
  assert.equal(h5('/member/getMemberDetails', {}, tokens[0]).code, -500);
  const login = h5('/member/accountLogin', { phone: users[0].phone, password: 'test-password' });
  assert.equal(login.code, 0); assert.match(login.msg, /暂停使用/);
  assert.match(h5('/member/accountLogin', { phone: users[0].phone, password: 'wrong-password' }).msg, /账号或密码错误/);
  assert.equal(admin('/members/' + id, { action: 'resume' }, 'PUT').code, 200);
  assert.equal(h5('/member/accountLogin', { phone: users[0].phone, password: 'test-password' }).code, 1);
});

test('fuel is topped up by administrators only, with a validated amount and a ledger line', () => {
  const { h5, admin, tokens, users } = setup(); const u = users[0], id = u.member_id;
  for (const bad of ['0', '-5', '1.234', 'abc', '', '1000001']) assert.equal(admin('/members/' + id, { action: 'rechargeFuel', amount: bad }, 'PUT').code, 400);
  assert.equal(u.e_card_number, '500.00');
  const r = admin('/members/' + id, { action: 'rechargeFuel', amount: '120.50', remark: '线下收款' }, 'PUT');
  assert.equal(r.code, 200); assert.equal(u.e_card_number, '620.50'); assert.equal(u.ledger[0].operator, 'qa');
  assert.equal(h5('/member/getECardList', {}, tokens[0], 'GET').code, 1);
  assert.equal(h5('/member/rechargeFuel', { amount: 5 }, tokens[0]).code, 0);
});

test('daily statement reproduces the spreadsheet: diff = sell - buy, actual = diff - 2% of buy', () => {
  const { admin, users } = setup(1); const u = users[0];
  const row = (price, extra) => ({ order_id: Math.random(), pay_price: price, ...extra });
  u.warehouse.push(row('221930.63', { grab_day: '2026-10-02', pay_status: '结算完毕' }));
  u.warehouse.push(row('172066.54', { sold_day: '2026-10-02', sold_price: '172066.54', pay_status: '已售出' }));
  u.warehouse.push(row('167054.93', { grab_day: '2026-10-01', pay_status: '结算完毕' }));
  const r = admin('/ledger', { view: 'statement', date: '2026-10-02' });
  assert.equal(r.code, 200); assert.equal(r.data.count, 1); assert.equal(r.data.previousDate, '2026-10-01');
  const [x] = r.data.rows;
  assert.deepEqual([x.prevBuy, x.sell, x.buy, x.diff, x.fuel, x.actual], [167054.93, 172066.54, 221930.63, -49864.09, 4438.61, -54302.7]);
  assert.equal(r.data.totals.actual, -54302.7);
});

test('lootTime reports a closed hall once today\'s window is over or the pool is empty', () => {
  at('09:32'); assert.equal(lootTime(scheduleDefaults, false).status, 10);
  assert.equal(lootTime(scheduleDefaults, true).status, 20);
  at('09:36'); assert.equal(lootTime(scheduleDefaults, false).status, 20);
});
