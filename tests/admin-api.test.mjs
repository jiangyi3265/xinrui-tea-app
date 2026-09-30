import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createStore } from '../server/store.mjs';
import { adminApi } from '../server/admin-api.mjs';
import { demoApi } from '../server/demo-api.mjs';

function setup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'xinrui-admin-'));
  const store = createStore(path.join(dir, 'data.json'));
  const login = adminApi(store, '/login', { username: 'admin', password: 'admin123' }, '', 'POST');
  return { store, token: login.token };
}

function cancelSeededAuction(store, token, productId) {
  // The demo seeds an active auction for product 30. Ordinary unpublishing
  // tests must close that reservation first; active rejection is tested separately.
  const listed=adminApi(store, '/tea/auctions', {}, token, 'GET');
  assert.equal(listed.code,200);
  const auction=listed.data.rows.find(a=>a.goodsId===productId && ['scheduled','running'].includes(a.status));
  assert.ok(auction);
  const stock=store.state.catalog.find(p=>p.goods_id===productId).spec[0].stock_num;
  const cancelled=adminApi(store, '/tea/auctions/'+auction.auctionId, {status:'cancelled'}, token, 'PUT');
  assert.equal(cancelled.code,200);
  assert.equal(store.state.auctions.find(a=>a.auctionId===auction.auctionId).stockReleased,true);
  assert.equal(store.state.catalog.find(p=>p.goods_id===productId).spec[0].stock_num,stock+auction.quantity);
}

test('admin can authenticate, edit catalogue and expose the same product to H5 API', () => {
  const { store, token } = setup();
  assert.equal(adminApi(store, '/tea/products', {}, token, 'GET').code, 200);
  const created = adminApi(store, '/tea/products', { goods_name: '后台上架茶', goods_min_price: 88, stock: 9 }, token, 'POST');
  assert.equal(created.code, 200);
  const goodsId = created.data.goods_id;
  const result = demoApi(store, '/category/getCategoryGoodsList', { page: 1, listRows: 100 }, '', 'GET');
  assert.ok(result.data.list.data.some((product) => product.goods_id === goodsId));
  const detail = demoApi(store, '/shopgoods/getDetails', { goods_id: goodsId }, '', 'GET');
  assert.equal(detail.code, 1);
  assert.equal(detail.data.detail.goods_name, '后台上架茶');
});

test('admin order status updates are visible in dashboard and order list', () => {
  const { store, token } = setup();
  const user = store.state.users[0];
  // Seed the normal user flow once so the admin has real order records to manage.
  const userLogin = demoApi(store, '/member/accountLogin', { phone: user.phone, password: 'tea-demo-2026' }, '', 'POST');
  const orderId = user.orders.find((order) => order.status === 'evaluation').order_id;
  const update = adminApi(store, `/tea/orders/${orderId}`, { status: 'completed' }, token, 'PUT');
  assert.equal(update.code, 200);
  assert.equal(update.data.status, 'completed');
  const list = adminApi(store, '/tea/orders', { status: 'completed' }, token, 'GET');
  assert.ok(list.data.rows.some((row) => row.orderId === orderId));
  assert.ok(userLogin.data.token);
});

test('admin cannot mark an unpaid order completed or manufacture payment', () => {
  const { store, token } = setup();
  const unpaid = store.state.users[0].orders.find((order) => order.status === 'payment');
  const result = adminApi(store, `/tea/orders/${unpaid.order_id}`, { status: 'completed' }, token, 'PUT');
  assert.equal(result.code, 500);
  assert.equal(unpaid.status, 'payment');
  assert.equal(unpaid.pay_status.value, 10);
});

test('member disable blocks both fresh login and existing H5 sessions', () => {
  const { store, token } = setup();
  const user = store.state.users[0];
  const userLogin = demoApi(store, '/member/accountLogin', { phone: user.phone, password: 'tea-demo-2026' }, '', 'POST');
  assert.equal(userLogin.code, 1);
  assert.equal(adminApi(store, `/tea/members/${user.member_id}`, { status: '1' }, token, 'PUT').code, 200);
  assert.equal(demoApi(store, '/member/accountLogin', { phone: user.phone, password: 'tea-demo-2026' }).code, 0);
  assert.equal(demoApi(store, '/member/getMemberDetails', {}, userLogin.data.token).code, -500);
  assert.equal(adminApi(store, `/tea/members/${user.member_id}`, { status: '0' }, token, 'PUT').code, 200);
  assert.equal(demoApi(store, '/member/accountLogin', { phone: user.phone, password: 'tea-demo-2026' }).code, 1);
});

test('unpublished products disappear from H5 and cannot be ordered', () => {
  const { store, token } = setup();
  const productId = 30;
  cancelSeededAuction(store, token, productId);
  assert.equal(adminApi(store, `/tea/products/${productId}`, { approvalStatus: 20 }, token, 'PUT').code, 200);
  const list = demoApi(store, '/category/getCategoryGoodsList', { page: 1, listRows: 100 }, '', 'GET');
  assert.ok(!list.data.list.data.some((product) => product.goods_id === productId));
  assert.equal(demoApi(store, '/shopgoods/getDetails', { goods_id: productId }, '', 'GET').code, 0);
  const user = store.state.users[0];
  const userLogin = demoApi(store, '/member/accountLogin', { phone: user.phone, password: 'tea-demo-2026' }, '', 'POST');
  assert.equal(demoApi(store, '/order/order/buyNow', { goods_id: productId }, userLogin.data.token).code, 0);
});

test('product edits flow into detail and stock reservation is released on cancellation', () => {
  const { store, token } = setup();
  assert.equal(adminApi(store, '/tea/products/31', { goods_name: '更新后的金骏眉', goods_min_price: 99, stock: 2 }, token, 'PUT').code, 200);
  const detail = demoApi(store, '/shopgoods/getDetails', { goods_id: 31 }, '', 'GET');
  assert.equal(detail.data.detail.goods_name, '更新后的金骏眉');
  assert.equal(detail.data.detail.goods_min_price, '99.00');
  assert.equal(demoApi(store, '/score/getDetails', { goods_id: 31 }, '', 'GET').data.detail.goods_name, '更新后的金骏眉');
  assert.equal(demoApi(store, '/goods/getLootDetails', { goods_id: 31 }, '', 'GET').data.goods_name, '更新后的金骏眉');
  const user = store.state.users[0];
  const userLogin = demoApi(store, '/member/accountLogin', { phone: user.phone, password: 'tea-demo-2026' }, '', 'POST');
  const before = Number(store.state.catalog.find((product) => product.goods_id === 31).spec[0].stock_num);
  const order = demoApi(store, '/order/order/buyNow', { goods_id: 31, goods_num: 2 }, userLogin.data.token).data;
  assert.equal(Number(store.state.catalog.find((product) => product.goods_id === 31).spec[0].stock_num), before - 2);
  assert.equal(demoApi(store, '/order/cancel', { order_id: order.order_id }, userLogin.data.token).code, 1);
  assert.equal(Number(store.state.catalog.find((product) => product.goods_id === 31).spec[0].stock_num), before);
});

test('hidden notices stay hidden from the H5 notice list and reappear when enabled', () => {
  const { store, token } = setup();
  const created = adminApi(store, '/tea/notices', { noticeTitle: '隐藏验收公告', status: '1', noticeContent: '不应展示' }, token, 'POST');
  assert.equal(created.code, 200);
  let notices = demoApi(store, '/notice/getNotice', {}, '', 'GET');
  assert.ok(!notices.data.some((notice) => notice.title === '隐藏验收公告'));
  assert.equal(adminApi(store, `/tea/notices/${created.data.noticeId}`, { status: '0' }, token, 'PUT').code, 200);
  notices = demoApi(store, '/notice/getNotice', {}, '', 'GET');
  assert.ok(notices.data.some((notice) => notice.title === '隐藏验收公告'));
});

test('dashboard product metric excludes unpublished catalogue entries', () => {
  const { store, token } = setup();
  cancelSeededAuction(store, token, 30);
  const before = adminApi(store, '/tea/dashboard', {}, token, 'GET').data.metrics.products;
  assert.equal(adminApi(store, '/tea/products/30', { approvalStatus: 20 }, token, 'PUT').code, 200);
  const after = adminApi(store, '/tea/dashboard', {}, token, 'GET').data.metrics.products;
  assert.equal(after, before - 1);
});

test('admin cancellation releases a reserved order exactly once', () => {
  const { store, token } = setup();
  const user = store.state.users[0];
  const userLogin = demoApi(store, '/member/accountLogin', { phone: user.phone, password: 'tea-demo-2026' }, '', 'POST');
  const before = Number(store.state.catalog.find((product) => product.goods_id === 31).spec[0].stock_num);
  const order = demoApi(store, '/order/order/buyNow', { goods_id: 31 }, userLogin.data.token).data;
  assert.equal(Number(store.state.catalog.find((product) => product.goods_id === 31).spec[0].stock_num), before - 1);
  assert.equal(adminApi(store, `/tea/orders/${order.order_id}`, { status: 'cancelled' }, token, 'PUT').code, 200);
  assert.equal(Number(store.state.catalog.find((product) => product.goods_id === 31).spec[0].stock_num), before);
  assert.equal(adminApi(store, `/tea/orders/${order.order_id}`, { status: 'cancelled' }, token, 'PUT').code, 200);
  assert.equal(Number(store.state.catalog.find((product) => product.goods_id === 31).spec[0].stock_num), before);
});
