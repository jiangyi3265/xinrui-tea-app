import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createStore } from '../server/store.mjs';
import { adminApi } from '../server/admin-api.mjs';
import { demoApi } from '../server/demo-api.mjs';
import { ensureAuctions } from '../server/demo/auction.mjs';

function setup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'xinrui-auction-'));
  const store = createStore(path.join(dir, 'data.json'));
  const adminLogin = adminApi(store, '/login', { username: 'admin', password: 'admin123' }, '', 'POST');
  const firstLogin = demoApi(store, '/member/accountLogin', { phone: '13800138000', password: 'tea-demo-2026' }, '', 'POST');
  const secondLogin = demoApi(store, '/member/registerAnAccount', { mobile: '13800138001', password: 'tea-demo-2026', rest_password: 'tea-demo-2026', code: '123456', nickname: '竞价用户' }, '', 'POST');
  return { store, dir, adminToken: adminLogin.token, firstToken: firstLogin.data.token, secondToken: secondLogin.data.token };
}

test('auction supports bidding, outbid state, close and winner settlement', () => {
  const { store, dir, adminToken, firstToken, secondToken } = setup();
  try {
    const listed = demoApi(store, '/auction/list', {}, '', 'GET');
    assert.equal(listed.code, 1);
    const auction = listed.data.list[0];
    assert.equal(auction.status, 'running');
    assert.equal(auction.bidCount, 0);

    const firstBid = demoApi(store, '/auction/bid', { auction_id: auction.auctionId, amount: auction.minimumBid }, firstToken, 'POST');
    assert.equal(firstBid.code, 1);
    assert.equal(firstBid.data.auction.isLeading, true);
    assert.equal(firstBid.data.auction.bidCount, 1);

    const tooLow = demoApi(store, '/auction/bid', { auction_id: auction.auctionId, amount: auction.minimumBid }, secondToken, 'POST');
    assert.equal(tooLow.code, 0);
    assert.match(tooLow.msg, /不低于/);

    const secondAmount = Number(firstBid.data.auction.currentPrice) + Number(firstBid.data.auction.bidIncrement);
    const secondBid = demoApi(store, '/auction/bid', { auction_id: auction.auctionId, amount: secondAmount }, secondToken, 'POST');
    assert.equal(secondBid.code, 1);
    assert.equal(secondBid.data.auction.isLeading, true);
    assert.equal(secondBid.data.auction.bidCount, 2);

    const ownBids = demoApi(store, '/auction/bids', { auction_id: auction.auctionId }, firstToken, 'GET');
    assert.equal(ownBids.code, 1);
    assert.equal(ownBids.data.list.length, 1);
    assert.equal(store.state.auctionBids.find((bid) => bid.userId === 1).status, 'outbid');

    const ended = adminApi(store, `/tea/auctions/${auction.auctionId}`, { status: 'ended' }, adminToken, 'PUT');
    assert.equal(ended.code, 200);
    assert.equal(ended.data.status, 'ended');

    const cannotCancelEnded = adminApi(store, `/tea/auctions/${auction.auctionId}`, {}, adminToken, 'DELETE');
    assert.equal(cannotCancelEnded.code, 500);
    assert.match(cannotCancelEnded.msg, /不可取消/);
    assert.equal(adminApi(store, '/tea/auctions', { status: 'ended', pageSize: 100 }, adminToken, 'GET').data.rows.find((row) => row.auctionId === auction.auctionId).status, 'ended');

    const loserSettlement = demoApi(store, '/auction/settle', { auction_id: auction.auctionId }, firstToken, 'POST');
    assert.equal(loserSettlement.code, 0);
    assert.match(loserSettlement.msg, /最高出价者/);

    const winnerSettlement = demoApi(store, '/auction/settle', { auction_id: auction.auctionId }, secondToken, 'POST');
    assert.equal(winnerSettlement.code, 1);
    const orderId = winnerSettlement.data.order_id;
    const winnerWarehouse = store.state.users.find((user) => user.member_id !== 1).warehouse.find((item) => item.order_id === orderId);
    assert.equal(winnerWarehouse.auctionId, auction.auctionId);
    assert.equal(winnerWarehouse.pay_price, secondBid.data.auction.currentPrice);

    const cancelSettlement = demoApi(store, '/order/cancel', { order_id: orderId }, secondToken, 'POST');
    assert.equal(cancelSettlement.code, 0);
    assert.match(cancelSettlement.msg, /竞价结算单不可直接取消/);
    assert.equal(winnerWarehouse.pay_status, '待支付');

    const repeatedSettlement = demoApi(store, '/auction/settle', { auction_id: auction.auctionId }, secondToken, 'POST');
    assert.equal(repeatedSettlement.code, 1);
    assert.equal(repeatedSettlement.data.order_id, orderId);

    const adminList = adminApi(store, '/tea/auctions', { status: 'settled', pageSize: 100 }, adminToken, 'GET');
    assert.equal(adminList.code, 200);
    assert.ok(adminList.data.rows.some((row) => row.auctionId === auction.auctionId && row.winnerName === '竞价用户'));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('admin auction creation validates quantity, reserves stock, and prevents duplicate active auctions', () => {
  const { store, dir, adminToken } = setup();
  try {
    const decimal = adminApi(store, '/tea/auctions', { goodsId: 32, quantity: '1.5' }, adminToken, 'POST');
    assert.equal(decimal.code, 500);
    assert.match(decimal.msg, /正整数/);

    const product = store.state.catalog.find((item) => item.goods_id === 31);
    assert.equal(product.spec[0].stock_num, 1);
    const created = adminApi(store, '/tea/auctions', { goodsId: 31, quantity: 1 }, adminToken, 'POST');
    assert.equal(created.code, 200);
    assert.equal(created.data.stockReserved, true);
    assert.equal(product.spec[0].stock_num, 0);

    const duplicate = adminApi(store, '/tea/auctions', { goodsId: 31, quantity: 1 }, adminToken, 'POST');
    assert.equal(duplicate.code, 500);
    assert.match(duplicate.msg, /有效拍卖/);

    const stockEdit = adminApi(store, '/tea/products/31', { stock: 2 }, adminToken, 'PUT');
    assert.equal(stockEdit.code, 500);
    assert.match(stockEdit.msg, /未完成拍卖/);
    const deleteProduct = adminApi(store, '/tea/products/31', {}, adminToken, 'DELETE');
    assert.equal(deleteProduct.code, 500);
    assert.match(deleteProduct.msg, /未完成拍卖/);

    const detailWhileActive = demoApi(store, '/goods/getLootDetails', { goods_id: 31 }, '', 'GET');
    assert.equal(detailWhileActive.data.auction.auctionId, created.data.auctionId);
    const cancelled = adminApi(store, `/tea/auctions/${created.data.auctionId}`, {}, adminToken, 'DELETE');
    assert.equal(cancelled.code, 200);
    assert.equal(product.spec[0].stock_num, 1);
    const detailAfterCancel = demoApi(store, '/goods/getLootDetails', { goods_id: 31 }, '', 'GET');
    assert.equal(detailAfterCancel.data.auction, null);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('auction detail is included in the existing H5 loot detail without changing its route', () => {
  const { store, dir } = setup();
  try {
    const detail = demoApi(store, '/goods/getLootDetails', { goods_id: 30 }, '', 'GET');
    assert.equal(detail.code, 1);
    assert.equal(detail.data.auction.goodsId, 30);
    assert.equal(detail.data.auction.currentPrice, detail.data.goods_price);
    assert.ok(detail.data.auction.minimumBid);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('H5 auction terminal states use state-aware action labels', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'src/pages/pages-loot-lootdet.js'), 'utf8');
  assert.match(source, /auctionButtonText/);
  assert.match(source, /去结算/);
  assert.match(source, /查看结算单/);
  assert.match(source, /拍卖已结束/);
});

test('automatic no-bid ending persists released inventory across restart', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'xinrui-auction-expiry-'));
  const dataFile = path.join(dir, 'data.json');
  try {
    const store = createStore(dataFile);
    const auction = ensureAuctions(store)[0];
    const product = store.state.catalog.find((item) => item.goods_id === auction.goodsId);
    auction.endTime = new Date(Date.now() - 1000).toISOString();
    assert.equal(product.spec[0].stock_num, 0);
    const listed = demoApi(store, '/auction/list', {}, '', 'GET');
    assert.equal(listed.data.list[0].status, 'ended');
    assert.equal(product.spec[0].stock_num, 1);
    const persisted = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    assert.equal(persisted.auctions[0].status, 'ended');
    assert.equal(persisted.catalog.find((item) => item.goods_id === auction.goodsId).spec[0].stock_num, 1);
    const restarted = createStore(dataFile);
    assert.equal(restarted.state.auctions[0].status, 'ended');
    assert.equal(restarted.state.catalog.find((item) => item.goods_id === auction.goodsId).spec[0].stock_num, 1);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
