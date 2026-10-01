import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.mjs';
import { sharedAdmin, sharedH5 } from '../server/shared-api.mjs';
import { defaults } from '../server/workflows.mjs';

const PAY = '246810', PNG = 'data:image/png;base64,AQIDBA==';
function setup() {
  const state = { users: [], sessions: {}, nextId: 100, catalog: [], auctions: [], auctionBids: [], adminNotices: [], content: {} };
  const store = createMemoryStore(state, () => {}, 'shared');
  const admin = (route, p = {}, method = 'GET') => sharedAdmin(store, '/tea' + route, p, { userName: 'qa', userId: 1 }, method);
  const h5 = (route, p = {}, token = '', method = 'POST') => sharedH5(store, route, p, token, method);
  assert.equal(admin('/members', { phone: '19900000000', nickName: '上家', password: 'test-password', payPassword: PAY }, 'POST').code, 200);
  const token = h5('/member/accountLogin', { phone: '19900000000', password: 'test-password' }).data.token;
  return { store, state, admin, h5, token, user: state.users[0] };
}
const upload = (h5, token, image = PNG) => h5('/_upload', { image }, token);

test('registration page never asks for an SMS code and an invitation link resolves the inviter without login', () => {
  const { h5, user, store } = setup();
  assert.equal(h5('/index/getStoreInfo', {}, '', 'GET').data.register_verify, '0');
  assert.equal(h5('/member/getInvitationCode', { member_id: user.member_id }, '', 'GET').data, user.invitation_code);
  assert.equal(h5('/member/getInvitationCode', { member_id: 99999 }, '', 'GET').code, 0);
  const made = h5('/member/registerAnAccount', { mobile: '13800138222', password: 'long-password', rest_password: 'long-password', invi_code: user.invitation_code });
  assert.equal(made.code, 1);
  assert.equal(store.state.users.at(-1).parentId, user.member_id);
  user.status = '1';
  assert.equal(h5('/member/getInvitationCode', { member_id: user.member_id }, '', 'GET').code, 0, 'a paused inviter cannot recruit');
  assert.equal(h5('/member/registerAnAccount', { mobile: '13800138223', password: 'long-password', invi_code: user.invitation_code }).code, 0);
});

test('the invitation poster is available to logged-in members only', () => {
  const { h5, token, user } = setup();
  assert.equal(h5('/member/member/getPoster', {}, '', 'GET').code, -500);
  const poster = h5('/member/member/getPoster', {}, token, 'GET');
  assert.equal(poster.code, 1); assert.equal(poster.data.member.member_id, user.member_id); assert.equal(poster.data.member.invitation_code, user.invitation_code);
  assert.ok(poster.data.bg_img.length);
});

test('receiving accounts: bank, WeChat and Alipay save independently behind the transaction password', () => {
  const { h5, token, user } = setup();
  const bank = { bank: '工商银行', bank_name: '张三', bank_card: '6222000011112222', mobile: '13800138000' };
  assert.equal(h5('/member/setPay', bank, token).code, 0, 'no password');
  assert.equal(h5('/member/setPay', { ...bank, code: 'wrong' }, token).code, 0);
  assert.equal(h5('/member/setPay', { ...bank, bank_card: '12ab' , code: PAY }, token).code, 0);
  assert.equal(h5('/member/setPay', { ...bank, code: PAY }, token).code, 1);
  assert.equal(user.payment.bank_card, '6222000011112222');
  // WeChat needs an uploaded QR image that belongs to the member
  const wx = { wx_name: '张三', wx_account: 'zhangsan', wx_mobile: '13800138000', wx_image: PNG };
  assert.equal(h5('/member/setPay', { ...wx, code: PAY }, token).code, 0, 'image was not uploaded by this member');
  assert.equal(upload(h5, token).code, 1);
  assert.equal(h5('/member/setPay', { ...wx, code: PAY }, token).code, 1);
  assert.equal(upload(h5, token, 'data:image/png;base64,BQYHCA==').code, 1);
  const zfb = { zfb_name: '张三', zfb_account: '13800138000', zfb_mobile: '13800138000', zfb_image: 'data:image/png;base64,BQYHCA==' };
  assert.equal(h5('/member/setPay', { ...zfb, code: PAY }, token).code, 1);
  assert.equal(user.payment.bank, '工商银行'); assert.equal(user.payment.wx_name, '张三'); assert.equal(user.payment.zfb_account, '13800138000');
  const details = h5('/member/getMemberDetails', {}, token, 'GET').data;
  assert.equal(details.pay_info.wx_image, PNG); assert.equal(details.pay_info.bank_card, '6222000011112222');
  assert.equal(h5('/member/setPay', { wx_name: '', wx_image: PNG, code: PAY }, token).code, 0);
  assert.equal(h5('/member/setPay', { code: PAY }, token).code, 0);
});

test('self-registration has a daily cap that administrators can change or set to 0 to close it', () => {
  const { h5, admin, store } = setup();
  const signup = n => h5('/member/registerAnAccount', { mobile: '1390000' + String(1000 + n), password: 'long-password' });
  assert.equal(admin('/content/business', { value: { ...defaults, registerDailyLimit: 2 } }, 'PUT').code, 200);
  assert.equal(signup(1).code, 1); assert.equal(signup(2).code, 1);
  const third = signup(3); assert.equal(third.code, 0); assert.match(third.msg, /上限/);
  assert.equal(store.state.users.length, 3);
  assert.equal(admin('/content/business', { value: { ...defaults, registerDailyLimit: 0 } }, 'PUT').code, 200);
  assert.match(signup(4).msg, /暂未开放/);
  assert.equal(admin('/content/business', { value: { ...defaults, registerDailyLimit: -1 } }, 'PUT').code, 400);
  assert.equal(admin('/content/business', { value: { ...defaults, registerDailyLimit: 10 } }, 'PUT').code, 200);
  assert.equal(signup(5).code, 1);
});
