import test from 'node:test';
import assert from 'node:assert/strict';
import {createMemoryStore} from '../server/store.mjs';
import {sharedAdmin,sharedH5} from '../server/shared-api.mjs';
import {defaults} from '../server/workflows.mjs';
import {clock} from '../server/schedule.mjs';
// Business clock helper: Asia/Shanghai wall-clock time, e.g. at('09:31') is inside the default grab window.
const at=(hm,day='2026-10-02')=>{clock.now=()=>Date.parse(day+'T'+hm+':00+08:00');};
function setup(){
 const state={users:[],sessions:{},nextId:100,catalog:[],auctions:[],auctionBids:[],adminNotices:[],content:{}};
 const store=createMemoryStore(state,()=>{},'shared');
 const admin=(route,p={},method='GET')=>sharedAdmin(store,'/tea'+route,p,{userName:'qa',userId:1},method);
 const h5=(route,p={},token='',method='POST')=>sharedH5(store,route,p,token,method);
 for(let i=0;i<3;i++)assert.equal(admin('/members',{phone:'1990000000'+i,nickName:'隔离测试'+i,password:'test-password',payPassword:'246810',invitationCode:i?state.users[i-1].invitation_code:''},'POST').code,200);
 const tokens=state.users.map(u=>h5('/member/accountLogin',{phone:u.phone,password:'test-password'}).data.token);
 // Explicit synthetic balances exist only inside this isolated in-memory fixture.
 for(const u of state.users){u.amount='1000.00';u.e_card_number='1000.00';u.certification={status:'已通过',name:'测试',lastFour:'1234'};}
 at('09:31');
 return {store,state,admin,h5,tokens,users:state.users};
}
test('withdrawals freeze once, reject once, approve without paying, require unique payout evidence',()=>{
 const {h5,admin,tokens,users}=setup();const token=tokens[0],u=users[0];
 assert.equal(h5('/member/setPay',{bank:'验收银行',bank_name:'验收会员',bank_card:'6222000000000000',pay_password:'246810'},token).code,1);
 assert.equal(h5('/member/withdraw',{amount:50,request_id:'request-first',pay_password:'wrong'},token).code,0);
 assert.equal(h5('/member/withdraw',{amount:50,request_id:'request-first',pay_password:'246810'},token,'GET').code,0);
 const first=h5('/member/withdraw',{amount:50,request_id:'request-first',pay_password:'246810'},token);assert.equal(first.code,1);assert.equal(u.amount,'950.00');
 assert.equal(h5('/member/withdraw',{amount:50,request_id:'request-first'},token).code,1);assert.equal(u.amount,'950.00');
 assert.equal(h5('/member/withdraw',{amount:60,request_id:'request-first'},token).code,0);
 assert.equal(admin('/withdrawals/'+first.data.id,{action:'reject'},'PUT').code,400);
 for(let i=0;i<2;i++)assert.equal(admin('/withdrawals/'+first.data.id,{action:'reject',remark:'验收驳回'},'PUT').code,200);
 assert.equal(u.amount,'1000.00');assert.equal(u.ledger.length,2);
 const second=h5('/member/withdraw',{amount:100,request_id:'request-second',pay_password:'246810'},token).data;
 assert.equal(admin('/withdrawals/'+second.id,{action:'paid'},'PUT').code,400);
 assert.equal(admin('/withdrawals/'+second.id,{action:'approve'},'PUT').code,200);assert.equal(second.status,2);assert.equal(u.amount,'900.00');
 const paid={action:'paid',bankReference:'QA-UNIQUE-001',remark:'隔离验收凭证，不发生实际打款',voucher:'data:image/png;base64,AQIDBA=='};
 for(let i=0;i<2;i++)assert.equal(admin('/withdrawals/'+second.id,paid,'PUT').code,200);
 assert.equal(second.status,1);assert.equal(u.amount,'900.00');assert.equal(admin('/withdrawals/'+second.id,{action:'reject',remark:'非法回退'},'PUT').code,400);
 const third=h5('/member/withdraw',{amount:10,request_id:'request-third',pay_password:'246810'},token).data;admin('/withdrawals/'+third.id,{action:'approve'},'PUT');assert.equal(admin('/withdrawals/'+third.id,paid,'PUT').code,400);
});
test('commission snapshots two actual referral levels, settles only at receipt and never twice',()=>{
 const {h5,admin,tokens,users}=setup(),buyer=users[2],token=tokens[2];
 assert.equal(admin('/content/business',{value:{...defaults,directRate:10,indirectRate:5}},'PUT').code,200);
 const product=admin('/products',{goods_name:'分佣验收茶',price:100,stock:5},'POST').data;
 const regions=h5('/region/getAllList').data,region=[regions[0].id,regions[0].city[0].id,regions[0].city[0].region[0].id].join(',');
 h5('/address/add',{name:'验收',phone:buyer.phone,detail:'隔离地址',region},token);
 const created=h5('/order/originalPricePurchase',{goods_id:product.goods_id,goods_num:1,pay_type:2,request_id:'commission-order'},token);assert.equal(created.code,1);
 const id=created.data.order_id;assert.equal(h5('/pay/balancePay',{order_id:id,pay_password:'246810'},token).code,1);
 assert.equal(users[1].amount,'1000.00');assert.equal(users[0].amount,'1000.00');
 admin('/content/business',{value:{...defaults,directRate:25}},'PUT');
 assert.equal(admin('/orders/'+id,{status:'received',expressCompany:'手工验收',expressNo:'QA12345678'},'PUT').code,200);
 for(let i=0;i<2;i++)assert.equal(h5('/order/receipt',{order_id:id},token).code,1);
 assert.equal(users[1].amount,'1010.00');assert.equal(users[0].amount,'1005.00');assert.equal(users[1].profits.length,1);
 assert.equal(h5('/member/getMyIndirection',{},tokens[0]).data.total,2);
 assert.equal(h5('/team/memberInfo',{member_id:users[0].member_id},tokens[2]).code,0);
});
test('consignment conserves balance and stock, concurrent repeat purchase cannot transfer twice; pickup waits for shipment',()=>{
 const {h5,admin,tokens,users}=setup();const seller=users[0],buyer=users[1];
 const product=admin('/products',{goods_name:'寄卖验收茶',price:100,stock:4},'POST').data;
 const order=h5('/order/toAddOrder',{goods_id:product.goods_id},tokens[0]).data.order_id;assert.equal(seller.e_card_number,'998.00');
 assert.equal(h5('/warehouse/pay',{order_id:order,pay_password:'246810'},tokens[0]).code,1);
 assert.equal(seller.amount,'900.00');assert.equal(h5('/warehouse/pay',{order_id:order,pay_password:'246810'},tokens[0]).code,1);assert.equal(seller.amount,'900.00');
 assert.equal(h5('/order/toSplitOrder',{order_id:order,quantity:1},tokens[0]).code,0);
 at('15:00');
 assert.equal(h5('/warehouse/listing',{order_id:order,sale_price:120,pay_password:'wrong'},tokens[0]).code,0);
 assert.equal(h5('/warehouse/listing',{order_id:order,sale_price:120,pay_password:'246810'},tokens[0]).code,1);
 at('09:31','2026-10-03');
 assert.equal(h5('/market/buy',{order_id:order,request_id:'self-purchase',pay_password:'246810'},tokens[0]).code,0);
 const bought=h5('/market/buy',{order_id:order,request_id:'market-purchase',pay_password:'246810'},tokens[1]);assert.equal(bought.code,1);
 assert.equal(h5('/market/buy',{order_id:order,request_id:'market-purchase'},tokens[1]).code,1);
 assert.equal(h5('/market/buy',{order_id:order,request_id:'competing-buy',pay_password:'246810'},tokens[2]).code,0);
 assert.equal(seller.amount,'900.00');assert.equal(buyer.amount,'1000.00','member-to-member money is settled offline, not moved in the system');assert.equal(buyer.e_card_number,'997.60');assert.equal(seller.score,'1.20');assert.equal(buyer.warehouse.length,1);assert.equal(h5('/market/list').data.length,0);
 const item=buyer.warehouse[0];buyer.addresses.push({address_id:567,name:'验收',phone:buyer.phone,detail:'隔离地址'});
 assert.equal(h5('/warehouse/delivery',{order_id:item.order_id,address_id:888},tokens[1]).code,0);
 const pickup=h5('/warehouse/delivery',{order_id:item.order_id,address_id:567},tokens[1]);assert.equal(pickup.code,1);
 assert.equal(h5('/warehouse/delivery',{order_id:item.order_id,address_id:567},tokens[1]).data.order_id,pickup.data.order_id);
  assert.equal(h5('/order/receipt',{order_id:pickup.data.order_id},tokens[1]).code,0);
  assert.equal(h5('/order/receipt',{order_id:item.order_id},tokens[1]).code,0,'inventory receipt cannot bypass shipment');
 assert.equal(admin('/orders/'+pickup.data.order_id,{status:'received',expressCompany:'手工验收',expressNo:'QA98765432'},'PUT').code,200);
 assert.equal(h5('/order/receipt',{order_id:pickup.data.order_id},tokens[1]).code,1);assert.equal(item.pay_status,'已提货');assert.equal(buyer.orders.length,1);
});
test('whole-unit split preserves odd cents and cannot split original inventory twice',()=>{
 const {h5,tokens,users}=setup();users[0].warehouse.push({order_id:900,goods_num:3,total_num:3,pay_price:'10.01',pay_status:'结算完毕'});
 assert.equal(h5('/order/toSplitOrder',{order_id:900,quantity:1},tokens[1]).code,0);
 assert.equal(h5('/order/toSplitOrder',{order_id:900,quantity:1},tokens[0]).code,1);
 const children=users[0].warehouse.filter(w=>w.parent_order_id===900);assert.equal(children.reduce((s,w)=>s+w.goods_num,0),3);assert.equal(children.reduce((s,w)=>s+Math.round(Number(w.pay_price)*100),0),1001);
 assert.equal(h5('/order/toSplitOrder',{order_id:900,quantity:1},tokens[0]).code,0);
});
test('reservations are free and idempotent and generate only in-app notifications for saved auctions',()=>{
 const {h5,tokens,users,state}=setup();state.auctions.push({auctionId:900,title:'验收场次',status:'running',startTime:new Date(Date.now()-1000).toISOString(),endTime:new Date(Date.now()+60000).toISOString()});
 for(let i=0;i<2;i++)assert.equal(h5('/order/subscribe',{specialarea_id:900},tokens[0]).code,1);
 assert.equal(users[0].subscriptions.length,1);assert.equal(users[0].amount,'1000.00');
  h5('/member/notifications',{},tokens[0]);h5('/member/notifications',{},tokens[0]);assert.equal(users[0].notifications.length,2);
  state.auctions.push({auctionId:901,title:'已取消场次',status:'cancelled',startTime:new Date(Date.now()-1000).toISOString()});users[0].subscriptions.push('901');h5('/member/notifications',{},tokens[0]);assert.equal(users[0].notifications.length,2,'cancelled auctions never announce opening');
 assert.equal(h5('/member/readNotification',{id:users[0].notifications[0].id},tokens[1]).code,0);
});
test('manual identity is pending until explicit review; password changes revoke sessions and authorizations',()=>{
 const {h5,admin,tokens,users}=setup();const t=tokens[0];delete users[0].certification;
 assert.equal(h5('/certification/addRealName',{certification_name:'验收会员',id_last_four:'123X'},t).code,1);
 assert.equal(h5('/certification/getIsRealName',{},t).code,0);
 assert.equal(admin('/members/'+users[0].member_id,{action:'verify',remark:'仅隔离验收线下核验记录'},'PUT').code,200);
 assert.equal(h5('/certification/getIsRealName',{},t).code,1);
 assert.equal(h5('/member/changePayPassword',{password:'wrong',pay_password:'123456'},t).code,0);
 assert.equal(h5('/member/changePayPassword',{password:'test-password',pay_password:'123456'},t).code,1);
 assert.equal(admin('/members/'+users[0].member_id,{action:'resetPassword',password:'new-password'},'PUT').code,200);
 assert.equal(h5('/member/getMemberDetails',{},t).code,-500);
});
