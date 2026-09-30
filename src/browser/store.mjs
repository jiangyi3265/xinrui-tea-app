import { scrypt } from '@noble/hashes/scrypt.js';
const hex = bytes => Array.from(bytes, n => n.toString(16).padStart(2, '0')).join('');
const random = () => hex(crypto.getRandomValues(new Uint8Array(16)));
export function passwordHash(password, salt = random()) {
  return `${salt}:${hex(scrypt(String(password), salt, {N:16384,r:8,p:1,dkLen:32}))}`;
}
export function passwordMatches(password, stored) {
  if (!stored) return false;
  const [salt, digest] = stored.split(':');
  return passwordHash(password, salt).split(':')[1] === digest;
}
export function createStore(storage = localStorage, key = 'xinrui-h5-static-demo-v1') {
  const saved = storage.getItem(key);
  const state = saved ? JSON.parse(saved) : {
    users: [{member_id:1,phone:'13800138000',nickName:'本地演示',passwordHash:passwordHash('tea-demo-2026'),headimg:'/h5/static/img/photo.e65d4f32.png',amount:'0.00',score:'0.00',e_card_number:'0.00',invitation_code:'DEMO001',is_advance:0,advance_expired:'',addresses:[],orders:[],ledger:[],payment:{}}], sessions:{},nextId:100
  };
  const save = () => storage.setItem(key, JSON.stringify(state));
  save();
  return {state,save,id:()=>++state.nextId,user(token){const session=state.sessions[token];return session && session.expires>Date.now()?state.users.find(x=>x.member_id===session.memberId):null;},login(user){const token=random()+random();state.sessions[token]={memberId:user.member_id,expires:Date.now()+86400000};save();return token;}};
}
