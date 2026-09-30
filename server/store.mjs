import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export function passwordHash(password, salt = crypto.randomBytes(16).toString('hex')) {
  return `${salt}:${crypto.scryptSync(String(password), salt, 32).toString('hex')}`;
}
export function passwordMatches(password, stored) {
  if (!stored) return false;
  const [salt, digest] = stored.split(':');
  if (!salt || !/^[a-f0-9]{64}$/.test(digest || '')) return false;
  const actual = passwordHash(password, salt).split(':')[1];
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(digest, 'hex'));
}
export function createStore(file = '.local/data.json') {
  const state = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {
    users: [{
      member_id: 1, phone: '13800138000', nickName: '本地演示',
      passwordHash: passwordHash('tea-demo-2026'),
      headimg: '/h5/static/img/photo.e65d4f32.png',
      amount: '0.00', e_card_number: '0.00', score: '0.00',
      invitation_code: 'DEMO001', is_advance: 0, advance_expired: '',
      addresses: [], orders: [], ledger: [], payment: {},
    }], sessions: {}, nextId: 100,
  };
  const save = () => {
    fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
    fs.writeFileSync(file + '.tmp', JSON.stringify(state, null, 2), { mode: 0o600 });
    fs.renameSync(file + '.tmp', file);
  };
  save();
  return createMemoryStore(state, save);
}

// One request owns this object. In shared mode RuoYi commits the resulting
// state in MySQL; the compatibility engine never writes a second data store.
export function createMemoryStore(state, save = () => {}, mode = 'demo') {
  return { state, save, mode, id: () => ++state.nextId, user(token) {
    const session = state.sessions[token];
    if (!session || session.expires < Date.now()) return null;
    const user = state.users.find(user => user.member_id === session.memberId);
    // A member disabled by the RuoYi admin must lose access immediately,
    // including already-issued H5 sessions.
    return user?.status === '1' ? null : user;
  }, login(user) {
    const token = crypto.randomBytes(32).toString('hex');
    state.sessions[token] = { memberId: user.member_id, expires: Date.now() + 86400000 };
    save();
    return token;
  } };
}
