// Member self-registration, fuel top-up / pause by administrators, and the
// daily settlement statement (对账报表) that administrators export.
import { ok, fail, now, entry, seedUser } from './demo/data.mjs';
import { passwordHash, passwordMatches } from './store.mjs';
import { cents, dayKey, dayStart, fuelFee } from './schedule.mjs';

const DEFAULT_AVATAR = '/h5/static/img/photo.e65d4f32.png';
const text = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max && !/[<>\x00-\x1f]/.test(value);

// Accounts are registered by the users themselves; no SMS provider is involved,
// and identity is verified manually before the first grab.
export function registerMember(store, p, rules) {
  const today = dayKey(Date.now());
  const registered = store.state.registrations?.[today] || 0;
  if (rules.registerDailyLimit <= 0) return fail('自助注册暂未开放，请联系管理员');
  if (registered >= rules.registerDailyLimit) return fail('今日注册人数已达上限，请明天再试或联系管理员');
  const phone = String(p.mobile || p.phone || '');
  if (!/^1[3-9]\d{9}$/.test(phone)) return fail('请输入正确的手机号');
  const password = String(p.password || '');
  if (password.length < 8 || password.length > 128) return fail('请设置 8 至 128 位登录密码');
  const confirm = p.rest_password ?? p.real_pwd;
  if (confirm !== undefined && confirm !== password) return fail('两次输入的密码不一致');
  const nickName = String(p.nickname || p.nickName || '').trim() || '会员' + phone.slice(-4);
  if (!text(nickName, 40)) return fail('昵称不能为空且不超过 40 字');
  if (store.state.users.some(u => u.phone === phone)) return fail('该手机号已注册，请直接登录');
  const code = String(p.invi_code || p.invitationCode || '').trim();
  const parent = code ? store.state.users.find(u => u.invitation_code === code && u.status !== '1') : null;
  if (code && !parent) return fail('邀请码不正确或邀请人已被暂停');
  const member = { member_id: store.id(), phone, nickName, passwordHash: passwordHash(password), amount: '0.00', score: '0.00', e_card_number: '0.00',
    status: '0', headimg: DEFAULT_AVATAR, create_time: now(), registered_by: 'self' };
  member.invitation_code = 'M' + member.member_id;
  member.parentId = parent?.member_id || 0;
  seedUser(store, member);
  store.state.users.push(member);
  store.state.registrations = { [today]: registered + 1 };
  return ok({ token: store.login(member) }, '注册成功');
}

export function disabledLoginMessage(store, p) {
  const account = store.state.users.find(u => u.phone === String(p.phone || ''));
  return account?.status === '1' && passwordMatches(String(p.password || ''), account.passwordHash) ? '账号已被暂停使用，请联系管理员' : '';
}

const adminOK = (data = {}, msg = '操作成功') => ({ code: 200, msg, data });
const adminFail = msg => ({ code: 400, msg, data: {} });

// Fuel is topped up offline through the member's upline and recorded here.
export function rechargeFuel(store, member, p, actor) {
  const amount = String(p.amount ?? '');
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(amount) || Number(amount) <= 0 || Number(amount) > 1000000) return adminFail('请输入大于 0 且最多两位小数的充值金额');
  if (!text(p.remark || '线下收款', 200)) return adminFail('备注不合法');
  member.ledger ||= [];
  entry(store, member, 'e_card_number', Number(amount), '燃料费充值（后台）' + (p.remark ? '：' + p.remark : ''), '');
  member.ledger[0].operator = actor.userName;
  return adminOK({ fuel: member.e_card_number }, '燃料费已充值');
}

export function pauseMember(member, pause, reason) {
  member.status = pause ? '1' : '0';
  if (pause) Object.assign(member, { pausedAt: now(), pauseReason: String(reason || '').slice(0, 200) });
  else delete member.pauseReason;
  return adminOK({}, pause ? '账号已暂停使用，已登录的会话立即失效' : '账号已恢复使用');
}

// ---- daily statement ---------------------------------------------------
// 差额 = 当日卖单 - 当日买单; 实际收付 = 差额 - 当日买单 x 燃料费率 (floored to cents),
// which reproduces the operators' spreadsheet (e.g. 172066.54 - 221930.63 = -49864.09,
// then minus 2% x 221930.63 = -54302.70).
export function dailyStatement(store, rules, date) {
  const target = /^\d{4}-\d{2}-\d{2}$/.test(date || '') ? date : dayKey(Date.now());
  const previous = dayKey(dayStart(Date.parse(target + 'T00:00:00+08:00')) - 1);
  const rows = store.state.users.map(u => {
    const bought = day => u.warehouse.filter(w => w.grab_day === day && w.pay_status !== '已取消').reduce((s, w) => s + cents(w.pay_price), 0);
    const sold = day => u.warehouse.filter(w => w.sold_day === day && w.pay_status === '已售出').reduce((s, w) => s + cents(w.sold_price || w.sale_price), 0);
    const buy = bought(target), sell = sold(target), prevBuy = bought(previous);
    const diff = sell - buy, fuel = cents(fuelFee(buy / 100, rules));
    return { memberId: u.member_id, nickName: u.nickName, phone: u.phone, prevBuy: prevBuy / 100, sell: sell / 100, buy: buy / 100,
      diff: diff / 100, fuel: fuel / 100, actual: (diff - fuel) / 100, remark: '' };
  }).filter(row => row.prevBuy || row.sell || row.buy);
  const sum = key => rows.reduce((s, r) => s + cents(r[key]), 0) / 100;
  return { date: target, previousDate: previous, count: rows.length, memberTotal: store.state.users.length,
    totals: { prevBuy: sum('prevBuy'), sell: sum('sell'), buy: sum('buy'), diff: sum('diff'), fuel: sum('fuel'), actual: sum('actual') }, rows };
}
