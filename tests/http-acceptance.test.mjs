import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();

async function waitForHealth(port, child) {
  const deadline = Date.now() + 8000;
  let lastError;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`server exited with ${child.exitCode}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/health`);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  throw lastError || new Error('server health check timed out');
}

async function startServer(dataFile) {
  const port = 5400 + Math.floor(Math.random() * 500);
  const child = spawn(process.execPath, ['server/index.mjs'], {
    cwd: root,
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', DATA_FILE: dataFile, API_MODE: 'demo' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  child.stdout.on('data', (chunk) => { logs += chunk.toString(); });
  child.stderr.on('data', (chunk) => { logs += chunk.toString(); });
  try {
    await waitForHealth(port, child);
  } catch (error) {
    child.kill('SIGTERM');
    throw new Error(`${error.message}\n${logs}`);
  }
  return { port, child, logs: () => logs };
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  child.kill('SIGTERM');
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 1500);
    child.once('exit', () => { clearTimeout(timer); resolve(); });
  });
}

async function request(port, pathname, options = {}) {
  const response = await fetch(`http://127.0.0.1:${port}${pathname}`, {
    ...options,
    headers: { 'content-type': 'application/json', ...(options.headers || {}) },
  });
  let body = {};
  try { body = await response.json(); } catch { /* health/static responses are not used here */ }
  return { response, body };
}

test('HTTP acceptance covers auth, shared data, disablement and persistence across restart', async (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tea-http-acceptance-'));
  const dataFile = path.join(dir, 'data.json');
  let running = await startServer(dataFile);
  t.after(async () => {
    await stopServer(running.child);
    fs.rmSync(dir, { recursive: true, force: true });
  });

  const unauthenticated = await request(running.port, '/admin/tea/products');
  assert.equal(unauthenticated.response.status, 401);

  const login = await request(running.port, '/admin/login', {
    method: 'POST', body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });
  assert.equal(login.response.status, 200);
  assert.equal(login.body.code, 200);
  const adminToken = login.body.token;
  assert.ok(adminToken);

  const info = await request(running.port, '/admin/getInfo', { headers: { authorization: `Bearer ${adminToken}` } });
  assert.equal(info.body.user.userName, 'admin');
  const products = await request(running.port, '/dev-api/admin/tea/products', { headers: { authorization: `Bearer ${adminToken}` } });
  assert.equal(products.body.code, 200);

  const created = await request(running.port, '/admin/tea/products', {
    method: 'POST', headers: { authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({ goods_name: 'HTTP验收茶', goods_min_price: '12.50', stock: 3 }),
  });
  assert.equal(created.body.code, 200);
  const productId = created.body.data.goods_id;
  const membersBeforeOrder = await request(running.port, '/admin/tea/members?pageSize=100', { headers: { authorization: `Bearer ${adminToken}` } });
  const member = membersBeforeOrder.body.data.rows[0];
  const userLogin = await request(running.port, '/member/accountLogin', {
    method: 'POST', body: JSON.stringify({ phone: member.phone, password: 'tea-demo-2026' }),
  });
  assert.equal(userLogin.body.code, 1);
  const auctionList = await request(running.port, '/auction/list');
  assert.equal(auctionList.body.code, 1);
  const auction = auctionList.body.data.list[0];
  const bid = await request(running.port, '/auction/bid', {
    method: 'POST', headers: { token: userLogin.body.data.token }, body: JSON.stringify({ auction_id: auction.auctionId, amount: auction.minimumBid }),
  });
  assert.equal(bid.body.code, 1);
  const closeAuction = await request(running.port, `/admin/tea/auctions/${auction.auctionId}`, {
    method: 'PUT', headers: { authorization: `Bearer ${adminToken}` }, body: JSON.stringify({ status: 'ended' }),
  });
  assert.equal(closeAuction.body.code, 200);
  const auctionSettlement = await request(running.port, '/auction/settle', {
    method: 'POST', headers: { token: userLogin.body.data.token }, body: JSON.stringify({ auction_id: auction.auctionId }),
  });
  assert.equal(auctionSettlement.body.code, 1);
  const settledAuctions = await request(running.port, '/admin/tea/auctions?status=settled&pageSize=100', { headers: { authorization: `Bearer ${adminToken}` } });
  assert.ok(settledAuctions.body.data.rows.some((row) => row.auctionId === auction.auctionId));
  const order = await request(running.port, '/order/order/buyNow', {
    method: 'POST', headers: { token: userLogin.body.data.token }, body: JSON.stringify({ goods_id: productId, goods_num: 1 }),
  });
  assert.equal(order.body.code, 1);
  const afterOrder = await request(running.port, `/admin/tea/products?pageSize=100&keyword=HTTP验收茶`, { headers: { authorization: `Bearer ${adminToken}` } });
  assert.equal(afterOrder.body.data.rows[0].stock, 2);
  const cancel = await request(running.port, '/order/cancel', {
    method: 'POST', headers: { token: userLogin.body.data.token }, body: JSON.stringify({ order_id: order.body.data.order_id }),
  });
  assert.equal(cancel.body.code, 1);
  const afterCancel = await request(running.port, `/admin/tea/products?pageSize=100&keyword=HTTP验收茶`, { headers: { authorization: `Bearer ${adminToken}` } });
  assert.equal(afterCancel.body.data.rows[0].stock, 3);
  const publicList = await request(running.port, '/category/getCategoryGoodsList?page=1&listRows=100');
  assert.ok(publicList.body.data.list.data.some((item) => item.goods_id === productId));

  const hidden = await request(running.port, `/admin/tea/products/${productId}`, {
    method: 'PUT', headers: { authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({ approvalStatus: 20 }),
  });
  assert.equal(hidden.body.code, 200);
  const publicAfterHidden = await request(running.port, '/category/getCategoryGoodsList?page=1&listRows=100');
  assert.ok(!publicAfterHidden.body.data.list.data.some((item) => item.goods_id === productId));

  const disabled = await request(running.port, `/admin/tea/members/${member.memberId}`, {
    method: 'PUT', headers: { authorization: `Bearer ${adminToken}` }, body: JSON.stringify({ status: '1' }),
  });
  assert.equal(disabled.body.code, 200);
  const blockedLogin = await request(running.port, '/member/accountLogin', {
    method: 'POST', body: JSON.stringify({ phone: member.phone, password: 'tea-demo-2026' }),
  });
  assert.equal(blockedLogin.body.code, 0);
  const blockedExisting = await request(running.port, '/member/getMemberDetails', { headers: { token: userLogin.body.data.token } });
  assert.equal(blockedExisting.body.code, -500);

  await stopServer(running.child);
  running = await startServer(dataFile);
  const relogin = await request(running.port, '/admin/login', {
    method: 'POST', body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });
  const persisted = await request(running.port, '/admin/tea/products?pageSize=100', { headers: { authorization: `Bearer ${relogin.body.token}` } });
  assert.ok(persisted.body.data.rows.some((item) => item.goods_id === productId && item.approvalStatus === 20));
  const persistedAuctions = await request(running.port, '/admin/tea/auctions?status=settled&pageSize=100', { headers: { authorization: `Bearer ${relogin.body.token}` } });
  assert.ok(persistedAuctions.body.data.rows.some((item) => item.auctionId === auction.auctionId && item.status === 'settled'));
});
