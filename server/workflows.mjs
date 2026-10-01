import { ok, fail, money, now, entry, clone, paginate, makeWarehouse, makeOrder, isPublished } from './demo/data.mjs';
import { passwordMatches, passwordHash } from './store.mjs';
import { scheduleDefaults, scheduleValid, phase } from './schedule.mjs';
import { grab, grabGoodsList, consignWindowProblem, defaultSalePrice, consignable, listItem, consignAll, consignEveryone, GRAB_SESSION_ID, grabPool } from './grab.mjs';
import { rechargeFuel, pauseMember, dailyStatement } from './members.mjs';

export const defaults = { directRate: 0, indirectRate: 0, consignmentFeeRate: 0, withdrawalFeeRate: 0, withdrawalMinimum: 1, ...scheduleDefaults, levels: [{ name: '普通会员', minimumSpend: 0 }] };
const cents = value => Math.round(Number(value) * 100);
const amountValid = value => /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(String(value)) && Number(value) > 0 && Number(value) <= 1000000;
const textValid = (value, max = 120) => typeof value === 'string' && value.trim().length > 0 && value.length <= max && !/[<>\x00-\x1f]/.test(value);
const accountValid = p => textValid(p.bank, 60) && textValid(p.bank_name, 40) && /^\d{12,30}$/.test(String(p.bank_card));
const requestValid = p => /^[A-Za-z0-9_-]{8,80}$/.test(String(p.request_id || ''));
export function rules(state) { return { ...defaults, ...state.content?.business }; }
function ready(store) { for (const u of store.state.users) { u.profits ||= []; u.notifications ||= []; } }
function verified(store, u, p, token) { return passwordMatches(p.pay_password, u.payPasswordHash) || (!p.pay_password && store.state.sessions[token]?.payVerifiedUntil > Date.now()); }
function consume(store, token) { if (store.state.sessions[token]) delete store.state.sessions[token].payVerifiedUntil; }
function notify(store, user, title, content) { user.notifications.unshift({ id: store.id(), title, content, create_time: now(), read: false }); }
function memberView(u) { return { member_id: u.member_id, nickName: u.nickName, mobile: u.phone.slice(0,3)+'****'+u.phone.slice(-4), headimg: u.headimg, avatarUrl:u.headimg, create_time:u.create_time, consumption_amount: money(spend(u)), total_price:money(spend(u)), message:'已建立会员', drive_num:0 }; }
function spend(user) { return user.orders.filter(o=>o.receipt_status?.value===20 && !o.warehouse_order_id && o.pay_type?.value===2).reduce((s,o)=>s+Number(o.pay_price),0); }
function levelFor(user, policy) { return policy.levels.filter(l=>spend(user)>=l.minimumSpend).at(-1)?.name || '未达到等级门槛'; }
function family(store,u) { const direct=store.state.users.filter(x=>x.parentId===u.member_id); return { direct, indirect:store.state.users.filter(x=>direct.some(d=>d.member_id===x.parentId)) }; }
export function settleCommission(store, buyer, order) {
  ready(store);
  if (!order || order.commissionSettled || order.receipt_status?.value !== 20 || order.pay_status?.value !== 20 || order.pay_type?.value !== 2 || order.warehouse_order_id) return;
  // Snapshot rules and recipients when the order is created; never reinterpret old orders.
  const snapshot=order.commissionPolicy;
  order.commissionSettled = true;
  if (!snapshot) return;
  for (const [i,item] of snapshot.entries()) {
    const receiver=store.state.users.find(u=>u.member_id===item.memberId);
    const value=Math.floor(cents(order.pay_price)*item.rate/100)/100;
    if (!receiver || value<=0) continue;
    const record={id:store.id(),order_id:order.order_id,order_no:order.order_sn,goods_name:order.goods?.[0]?.goods_name,goods_image:order.goods?.[0]?.goods_image,buyer_name:buyer.nickName,owner_name:receiver.nickName,profit:money(value),amount:money(value),type:i+1,rate:item.rate,create_time:now(),status_text:'已结算'};
    receiver.profits.unshift(record);
    entry(store,receiver,'amount',value,'订单收货分佣',order.order_id);
    notify(store,receiver,'分佣到账',`订单 ${order.order_sn} 已确认收货，分佣 ${money(value)} 元。`);
  }
}
export function commissionSnapshot(store, user) {
  const parent=store.state.users.find(u=>u.member_id===user.parentId), grand=store.state.users.find(u=>u.member_id===parent?.parentId), r=rules(store.state);
  return [{memberId:parent?.member_id || 0,rate:r.directRate},{memberId:grand?.member_id || 0,rate:r.indirectRate}];
}
function inventoryView(x) { return { ...clone(x), pay_status_text:x.pay_status, status_text:x.pay_status }; }
const publicReads=new Set(['/index/close_consignment','/loodgoods/getCategoryGoodsList','/goods/getPurchaseNum','/index/getSubscribeSetting','/team/getTypesList','/team/getIsCollageList','/index/getInvitationNotice','/market/list']);
const routes=new Set([...publicReads,'/member/getMyProfit','/member/personProfit','/team/getTeamInfo','/member/getMyIndirection','/member/getLevelList','/team/memberList','/team/driveDetail','/team/memberInfo','/team/capitalDetail','/team/orderDetail','/member/withdraw','/member/withdrawalInfo','/member/notifications','/member/readNotification','/member/changePayPassword','/certification/getIsRealName','/certification/addRealName','/certification/status','/merchant/isStoreApply','/member/isOpening','/card/cardList','/card/bindingCard','/card/bindAdaPayCard','/member/accountOpening','/order/subscribe','/order/subscribePay','/order/subscriptions','/warehouse/list','/warehouse/delivery','/order/toSplitOrder','/warehouse/listing','/warehouse/cancelListing','/market/buy','/order/toAddOrder','/warehouse/consignAll','/order/getServiceCharge','/order/toServiceCharge','/order/toServiceChargeWithVoucher','/order/getConsignmentCollection','/order/confirm_payment_voucher','/circle/download','/member/share','/index/getMemberId']);
const writes=new Set(['/member/withdraw','/member/readNotification','/member/changePayPassword','/certification/addRealName','/card/bindingCard','/card/bindAdaPayCard','/member/accountOpening','/order/subscribe','/order/subscribePay','/warehouse/delivery','/order/toSplitOrder','/warehouse/listing','/warehouse/cancelListing','/market/buy','/order/toAddOrder','/warehouse/consignAll','/order/toServiceCharge','/order/toServiceChargeWithVoucher','/order/getConsignmentCollection','/order/confirm_payment_voucher','/circle/download']);
export function workflowsH5(store,route,p,token,method) {
  if (!routes.has(route) && route!=='/warehouse/pay') return;
  ready(store);
  if ((writes.has(route) || route==='/warehouse/pay') && method!=='POST') return fail('请使用 POST 提交操作');
  const u=store.user(token), r=rules(store.state);
  if (!u && !publicReads.has(route)) return {code:-500,msg:'请先登录',data:{}};
  const ctx={rules,notify};
  if (route==='/index/close_consignment') return ok({value:phase(r,'grab')==='open'?10:20});
  if (route==='/loodgoods/getCategoryGoodsList' && String(p.specialarea_id)===GRAB_SESSION_ID) return grabGoodsList(store,u,r,p);
  if (route==='/goods/getPurchaseNum' && p.order_id && grabPool(store,u).some(x=>String(x.order_id)===String(p.order_id))) return ok({num:1,purchase_num:1,limit_num:1,source:'consignment'});
  if (['/loodgoods/getCategoryGoodsList','/goods/getPurchaseNum'].includes(route)) return;
  if (route==='/order/toAddOrder') return grab(ctx,store,u,p);
  if (route==='/index/getSubscribeSetting') return ok({is_open:1,amount:'0.00',subscribe_e_card:'0.00',e_card_number:u?.e_card_number || '0.00',message:'免费预约，开拍提醒可在站内消息查看'});
  if (route==='/team/getTypesList') return ok({list:paginate([],p)});
  if (route==='/team/getIsCollageList') return ok([]);
  if (route==='/index/getInvitationNotice') return ok({content:'会员账号由管理员建立。邀请关系由管理员核实后在建立账号时绑定。'});
  if (route==='/market/list') return ok(store.state.users.flatMap(s=>s.warehouse.filter(w=>w.pay_status==='寄卖中').map(w=>({order_id:w.order_id,goods_name:w.goods_name,goods_image:w.image,price:w.sale_price,quantity:w.goods_num || 1,seller:s.nickName,owner:s.member_id===u?.member_id}))));
  if (route==='/index/getMemberId') return ok(u.member_id);
  if (route==='/member/share') return ok({member_id:u.member_id,invitation_code:u.invitation_code,path:'/#/pages/login/register?member_id='+u.member_id});
  if (route==='/member/notifications') {
    for (const id of u.subscriptions) {
      const a=store.state.auctions.find(x=>String(x.auctionId)===String(id));
      if (a && !['cancelled','draft'].includes(a.status) && Date.parse(a.startTime)<=Date.now() && !u.notifications.some(x=>x.auctionId===a.auctionId)) { notify(store,u,Date.parse(a.endTime)<=Date.now()?'预约场次已结束':'预约场次已开拍',a.title+'，请查看场次当前状态。'); u.notifications[0].auctionId=a.auctionId; }
    }
    return ok(u.notifications);
  }
  if (route==='/member/readNotification') { const n=u.notifications.find(x=>String(x.id)===String(p.id)); if(!n)return fail('消息不存在'); n.read=true; return ok(); }
  if (route==='/order/subscriptions') return ok(u.subscriptions.map(id=>store.state.auctions.find(a=>String(a.auctionId)===String(id))).filter(Boolean).map(a=>({auction_id:a.auctionId,title:a.title,startTime:a.startTime,status:a.status})));
  if (['/order/subscribe','/order/subscribePay'].includes(route)) {
    const a=store.state.auctions.find(x=>String(x.auctionId)===String(p.specialarea_id));
    if (!a || !['scheduled','running'].includes(a.status) || Date.parse(a.endTime)<=Date.now()) return fail('该场次不可预约');
    if (!u.subscriptions.includes(String(a.auctionId))) {u.subscriptions.push(String(a.auctionId));notify(store,u,'预约成功',a.title+'，开拍时间 '+a.startTime+'。预约不收费。');}
    return ok({auction_id:a.auctionId},'预约成功，请在站内消息查看提醒');
  }
  if (route==='/member/changePayPassword') {
    if(!passwordMatches(p.password,u.passwordHash) || !/^\d{6}$/.test(p.pay_password || ''))return fail('请核对登录密码并填写六位交易密码');
    u.payPasswordHash=passwordHash(p.pay_password);
    for(const session of Object.values(store.state.sessions)) if(session.memberId===u.member_id) delete session.payVerifiedUntil;
    return ok({},'交易密码已更新');
  }
  if(['/card/bindingCard','/card/bindAdaPayCard','/member/accountOpening'].includes(route)) {
    if(!verified(store,u,p,token))return fail('请输入正确交易密码');
    if(!accountValid(p))return fail('请填写银行、收款人及12至30位银行卡号');
    u.payment={bank:p.bank.trim(),bank_name:p.bank_name.trim(),bank_card:String(p.bank_card),bank_branch:String(p.bank_branch || '').slice(0,120)};
    consume(store,token);return ok({},'收款账户已保存');
  }
  if(route==='/member/isOpening')return ok(u.payment.bank_card?1:0);
  if(route==='/card/cardList')return ok(u.payment.bank_card?[{...u.payment,card_no:u.payment.bank_card}]:[]);
  if(route==='/merchant/isStoreApply')return ok(0,'请联系管理员办理商家入驻');
  if(route==='/certification/status')return ok(u.certification || {status:'未提交'});
  if(route==='/certification/getIsRealName')return u.certification?.status==='已通过'?ok(1,'人工核验已通过'):fail(u.certification?.status==='待审核'?'身份资料待人工审核':'请提交身份资料供人工核验');
  if(route==='/certification/addRealName') {
    if(!textValid(p.certification_name,40) || !/^\d{3}[\dXx]$/.test(p.id_last_four || ''))return fail('请填写姓名及证件末四位，完整证件请通过线下核验');
    if(u.certification?.status==='已通过')return fail('已核验资料需联系管理员变更');
    u.certification={name:p.certification_name.trim(),lastFour:p.id_last_four.toUpperCase(),status:'待审核',submittedAt:now()};
    return ok({},'已提交人工审核');
  }
  if(route==='/member/withdrawalInfo')return ok({available:u.amount,minimum:r.withdrawalMinimum,feeRate:r.withdrawalFeeRate,account:u.payment,records:u.withdrawals});
  if(route==='/member/withdraw') {
    if(!requestValid(p) || !amountValid(p.amount))return fail('请输入有效金额并使用有效请求编号');
    const previous=u.withdrawals.find(x=>x.request_id===p.request_id);
    if(previous)return cents(previous.amount)===cents(p.amount)?ok(previous,'申请已提交'):fail('同一请求编号的金额不一致');
    if(!verified(store,u,p,token))return fail('请输入正确交易密码');
    if(!accountValid(u.payment))return fail('请先设置收款银行卡');
    if(Number(p.amount)<r.withdrawalMinimum || cents(p.amount)>cents(u.amount))return fail('金额低于最低提现额或超过可用余额');
    const fee=Math.floor(cents(p.amount)*r.withdrawalFeeRate/100);
    if(p.feeRate!==undefined && Number(p.feeRate)!==r.withdrawalFeeRate)return fail('提现费率已更新，请刷新页面后确认');
    const record={id:store.id(),request_id:p.request_id,amount:money(p.amount),actual_amount:money((cents(p.amount)-fee)/100),fee:money(fee/100),pay_type:4,account:clone(u.payment),status:0,status_text:'待审核',create_time:now()};
    entry(store,u,'amount',-Number(record.amount),'提现冻结',record.id);u.withdrawals.unshift(record);consume(store,token);
    return ok(record,'提现已申请，金额已冻结');
  }
  if(route==='/warehouse/list')return ok(u.warehouse.map(inventoryView));
  const warehouse=u.warehouse.find(w=>String(w.order_id)===String(p.order_id));
  if(route==='/warehouse/pay') {
    const settlement=u.settlements.find(s=>s.order_id===warehouse?.order_id && s.direction==='out');
    if(!warehouse || !settlement)return fail('待付款订单不存在');
    if(settlement.pay_status===2)return ok({},'已付款，无需重复支付');
    if(warehouse.pay_status!=='待支付' || settlement.pay_status!==0)return fail('仅待付款订单可以支付');
    if(!verified(store,u,p,token))return fail('请输入正确交易密码');
    if(cents(u.amount)<cents(warehouse.pay_price))return fail('余额不足');
    entry(store,u,'amount',-Number(warehouse.pay_price),'仓库订单余额支付',warehouse.order_id);
    settlement.pay_status=2;settlement.pay_type=2;warehouse.pay_status='结算完毕';warehouse.pay_time=now();consume(store,token);return ok({},'付款成功，商品已入库');
  }
  if(route==='/warehouse/delivery') {
    if(warehouse?.delivery_order_id)return ok({order_id:warehouse.delivery_order_id},'提货申请已存在');
    if(!warehouse || warehouse.pay_status!=='结算完毕' || warehouse.is_consignment || warehouse.is_delivery)return fail('仅已结算且未寄卖的库存可提货');
    const address=u.addresses.find(a=>String(a.address_id)===String(p.address_id));
    if(!address)return fail('请选择本账号收货地址');
    const product=store.state.catalog.find(x=>x.goods_id===warehouse.goods_id);
    if(!product)return fail('商品信息不存在');
    const order=makeOrder(store.id(),{...product,goods_min_price:money(Number(warehouse.pay_price)/Number(warehouse.goods_num || 1))},'forwarding',4,address,Number(warehouse.goods_num || 1));
    Object.assign(order,{order_no:'P'+order.order_id,order_sn:'P'+order.order_id,warehouse_order_id:warehouse.order_id,create_time:now(),express_company:'',express_no:'',pay_type:{value:0,text:'仓库提货'}});
    u.orders.unshift(order);warehouse.is_delivery=1;warehouse.delivery_order_id=order.order_id;warehouse.pay_status='提货待发货';
    return ok({order_id:order.order_id},'提货已提交，等待商家发货');
  }
  if(route==='/order/toSplitOrder') {
    const count=Number(p.quantity);
    if(!warehouse || warehouse.pay_status!=='结算完毕' || warehouse.is_consignment || warehouse.is_delivery || !Number.isSafeInteger(count) || count<1 || count>=Number(warehouse.goods_num || 1))return fail('拆分数量必须小于现有整件数量，单件商品不能拆分');
    const total=Number(warehouse.goods_num), first=Math.floor(cents(warehouse.pay_price)*count/total);
    for(const [quantity,value] of [[count,first],[total-count,cents(warehouse.pay_price)-first]]) {
      const child={...clone(warehouse),order_id:store.id(),parent_order_id:warehouse.order_id,goods_num:quantity,total_num:quantity,pay_price:money(value/100),create_time:now()};child.order_no='W'+child.order_id;u.warehouse.unshift(child);
    }
    warehouse.pay_status='已拆分';warehouse.is_split=1;return ok({},'库存已按整件拆分，总数量和金额保持一致');
  }
  if(route==='/order/getServiceCharge') {
    if(!warehouse)return fail('仓库订单不存在');
    return ok({e_price:money(Number(warehouse.pay_price)*r.consignmentFeeRate/100),goods_price:warehouse.pay_price,consignment_goods_price:defaultSalePrice(warehouse,r),price:defaultSalePrice(warehouse,r),uplift_rate:r.consignUpliftRate,amount:u.amount,e_card_number:u.e_card_number,fee_rate:r.consignmentFeeRate});
  }
  if(['/warehouse/listing','/order/toServiceCharge','/order/toServiceChargeWithVoucher'].includes(route)) {
    if(!warehouse || !consignable(warehouse))return fail('仅已结算的在库商品可寄卖');
    const timing=consignWindowProblem(r);if(timing)return fail(timing);
    const price=p.sale_price===undefined || p.sale_price==='' ? defaultSalePrice(warehouse,r) : p.sale_price;
    if(!amountValid(price))return fail('请输入本批商品总寄卖价');
    const fee=Number(money(Number(warehouse.pay_price)*r.consignmentFeeRate/100));
    // The H5 consignment page sends no password: listing at the default +3% price with no fee moves no money.
    const custom=cents(price)!==cents(defaultSalePrice(warehouse,r));
    if((custom || fee>0) && !verified(store,u,p,token))return fail('请输入正确交易密码');
    if(p.quoted_fee!==undefined && cents(p.quoted_fee)!==cents(fee))return fail('服务费已更新，请重新选择寄卖并核对金额');
    const problem=listItem(store,u,warehouse,price,r);if(problem)return fail(problem);
    consume(store,token);return ok({},'商品已发布到寄卖市场，售价 '+money(price)+' 元');
  }
  if(route==='/warehouse/consignAll') {
    const timing=consignWindowProblem(r);if(timing)return fail(timing);
    if(!u.warehouse.some(consignable))return fail('暂无可寄售的在库商品');
    if(r.consignmentFeeRate>0 && !verified(store,u,p,token))return fail('请输入正确交易密码');
    const result=consignAll(store,u,r);if(result.problem)return fail(result.problem);
    consume(store,token);return ok({count:result.count},'已一键寄售 '+result.count+' 件，价格为原价上浮 '+r.consignUpliftRate+'%');
  }
  if(route==='/warehouse/cancelListing') {
    if(!warehouse || warehouse.pay_status!=='寄卖中')return fail('仅未被购买的寄卖商品可撤回');
    Object.assign(warehouse,{pay_status:'结算完毕',is_consignment:0,side:0});return ok({},'已撤回寄卖，已收取服务费不退');
  }
  if(route==='/market/buy') {
    if(!requestValid(p))return fail('缺少有效请求编号');
    const previous=u.warehouse.find(w=>w.purchase_request===p.request_id);
    if(previous)return String(previous.source_order_id)===String(p.order_id)?ok({order_id:previous.order_id},'订单已存在'):fail('同一请求不能购买不同商品');
    if(!store.state.users.some(s=>s.warehouse.some(w=>String(w.order_id)===String(p.order_id) && w.pay_status==='寄卖中' && s.member_id!==u.member_id)))return fail('商品不可购买或不能购买自己的商品');
    return grab(ctx,store,u,p);
  }
  if(['/order/getConsignmentCollection','/order/confirm_payment_voucher'].includes(route)) {
    const settlement=u.settlements.find(s=>s.direction==='in' && (String(s.id)===String(p.id) || String(s.order_id)===String(p.order_id)));
    return settlement?.pay_status===2?ok({},'收款已结算，无需重复入账'):fail('请等待后台核实结算，不能自行确认未核实资金');
  }
  if(route==='/circle/download') {const item=(store.state.content.circle || []).find(x=>String(x.id)===String(p.id));if(!item)return fail('素材不存在');store.state.circleDownloads ||= {};store.state.circleDownloads[p.id]=(store.state.circleDownloads[p.id] || 0)+1;return ok({},'下载已记录');}
  const {direct,indirect}=family(store,u), members=[...direct,...indirect], profits=u.profits;
  if(route==='/member/personProfit')return ok(money(profits.reduce((s,x)=>s+Number(x.amount),0)));
  if(route==='/member/getMyProfit') {const list=profits.filter(x=>(!Number(p.type)||x.type===Number(p.type))&&(!p.start_time||x.create_time>=p.start_time)&&(!p.end_time||x.create_time.slice(0,10)<=p.end_time));const total=money(list.reduce((s,x)=>s+Number(x.amount),0));return ok({list:paginate(list,p).data,total:list.length,total_profit:total,profit:total,all:total});}
  if(route==='/member/getLevelList')return ok(r.levels.map(l=>({...l,current:levelFor(u,r)===l.name,consumption_amount:money(spend(u))})));
  if(route==='/team/getTeamInfo')return ok({level:levelFor(u,r),ownSpend:money(spend(u)),userInfo:{total_commission:money(profits.reduce((s,x)=>s+Number(x.amount),0)),total_num:members.length},total:members.length,direct:direct.length,indirect:indirect.length,member_num:members.length,money:money(profits.reduce((s,x)=>s+Number(x.amount),0))});
  if(route==='/member/getMyIndirection')return ok({list:paginate(members.map(memberView),p).data,total_team_num:members.length,total:members.length,direct_count:direct.length,indirect_count:indirect.length,total_performance:money(members.reduce((s,x)=>s+spend(x),0))});
  if(route==='/team/memberList')return ok(members.filter(x=>!p.keywords || x.nickName.includes(p.keywords)).map(memberView));
  if(route==='/team/driveDetail')return ok({statistics:{totalCount:members.length,driveCount:direct.length},list:direct.map(memberView)});
  if(route==='/team/memberInfo') {const person=members.find(x=>String(x.member_id)===String(p.member_id));return person?ok({info:memberView(person),statistics:{activate_num:0,perfect_num:0,register_num:0}}):fail('仅能查看本人团队成员');}
  if(['/team/capitalDetail','/team/orderDetail'].includes(route))return ok(profits.map(x=>({...x,face_value:x.amount,remarks:x.goods_name})));
}

const adminOK=(data={},msg='操作成功')=>({code:200,msg,data}), adminFail=msg=>({code:400,msg,data:{}});
export function workflowsAdmin(store,route,p,actor,method) {
  ready(store);const [, ,resource,id]=route.split('/');
  if(resource==='content' && id==='business' && method==='PUT') {
    const v=p.value && {...defaults,...store.state.content.business,...p.value};
    if(!v || !['directRate','indirectRate','consignmentFeeRate','withdrawalFeeRate','withdrawalMinimum'].every(k=>typeof v[k]==='number' && Number.isFinite(v[k]) && v[k]>=0) || v.directRate+v.indirectRate>100 || v.consignmentFeeRate>100 || v.withdrawalFeeRate>=100 || v.withdrawalMinimum>1000000 || !Array.isArray(v.levels) || !v.levels.length || v.levels.length>20 || v.levels.some(x=>!textValid(x.name,20) || typeof x.minimumSpend!=='number' || !Number.isFinite(x.minimumSpend) || x.minimumSpend<0))return adminFail('请填写有效比例、最低额和等级规则；分佣比例合计不能超过100%');
    if(!scheduleValid(v))return adminFail('抢购/寄售时间须为 HH:mm 且开始早于结束，每人限抢数量为 1–100 的整数，燃料费、利润、上浮比例须在 0–100 之间');
    store.state.content.business={...Object.fromEntries(Object.keys(defaults).filter(k=>k!=='levels').map(k=>[k,v[k]])),levels:v.levels.map(x=>({name:x.name,minimumSpend:x.minimumSpend})).sort((a,b)=>a.minimumSpend-b.minimumSpend)};return adminOK({},'业务规则已保存，新订单使用新规则');
  }
  if(resource==='warehouse' && id==='consign-all' && method==='PUT') {
    const result=consignEveryone(store,rules(store.state));
    return adminOK(result,result.items?`已一键转寄售：${result.members} 位会员共 ${result.items} 件，价格为原价上浮 ${rules(store.state).consignUpliftRate}%`:'暂无可转寄售的在库商品');
  }
  if(resource==='ledger' && p.view==='statement' && method==='GET') return adminOK(dailyStatement(store,rules(store.state),p.date));
  if(resource==='members' && id && method==='PUT' && p.action) {
    const u=store.state.users.find(x=>String(x.member_id)===id);if(!u)return adminFail('会员不存在');
    if(p.action==='rechargeFuel')return rechargeFuel(store,u,p,actor);
    if(['pause','resume'].includes(p.action))return pauseMember(u,p.action==='pause',p.remark);
    if(p.action==='resetPassword') {if(!textValid(p.password,128) || p.password.length<8)return adminFail('新密码至少八位');u.passwordHash=passwordHash(p.password);for(const [key,s] of Object.entries(store.state.sessions))if(s.memberId===u.member_id)delete store.state.sessions[key];return adminOK({},'密码已重置，原登录会话已撤销');}
    if(['verify','rejectIdentity'].includes(p.action)) {if(!u.certification || u.certification.status!=='待审核' || !textValid(p.remark,500))return adminFail('仅待审核资料可处理，必须填写线下核验或驳回说明');Object.assign(u.certification,{status:p.action==='verify'?'已通过':'已驳回',remark:p.remark,reviewedBy:actor.userName,reviewedAt:now()});if(p.action==='verify')u.identity_name=u.certification.name;notify(store,u,'身份资料审核结果',u.certification.status+'：'+p.remark);return adminOK();}
    return adminFail('未知会员操作');
  }
  if(resource==='withdrawals' && method==='PUT') {
    const u=store.state.users.find(x=>x.withdrawals.some(w=>String(w.id)===id)), record=u?.withdrawals.find(w=>String(w.id)===id);
    if(!record || (p.memberId && String(u.member_id)!==String(p.memberId)))return adminFail('提现申请不存在');
    if(p.action==='approve') {if(record.status===2)return adminOK({},'已审核');if(record.status!==0)return adminFail('仅待审核申请可通过');record.status=2;record.status_text='待打款';}
    else if(p.action==='reject') {if(record.status===-1)return adminOK({},'已驳回，未重复解冻');if(![0,2].includes(record.status) || !textValid(p.remark,500))return adminFail('请填写驳回原因，仅未打款申请可驳回');entry(store,u,'amount',Number(record.amount),'提现驳回解冻',record.id);record.status=-1;record.status_text='已驳回';}
    else if(p.action==='paid') {
      if(record.status===1)return record.bankReference===p.bankReference?adminOK({},'已登记，未重复打款'):adminFail('不可覆盖已登记的打款记录');
      if(record.status!==2 || !textValid(p.bankReference,100) || !textValid(p.remark,500) || !/^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(p.voucher || '') || p.voucher.length>1400000)return adminFail('需先审核，并填写银行流水号、打款说明和图片凭证');
      if(store.state.users.some(x=>x.withdrawals.some(w=>w.bankReference===p.bankReference)))return adminFail('银行流水号已登记');
      Object.assign(record,{status:1,status_text:'已打款',bankReference:p.bankReference,voucher:p.voucher,paidAt:now(),paidBy:actor.userName});
    } else return adminFail('未知提现操作');
    record.remark=String(p.remark || '').slice(0,500);record.reviewedBy=actor.userName;record.reviewedAt=now();notify(store,u,'提现状态更新',record.amount+' 元提现'+record.status_text+(record.remark?'：'+record.remark:''));return adminOK({},'提现状态已保存');
  }
}
