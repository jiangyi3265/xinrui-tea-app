import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore, passwordHash } from '../server/store.mjs';
import { sharedAdmin, sharedH5 } from '../server/shared-api.mjs';

function setup() {
  const state={users:[],sessions:{},nextId:100,catalog:[],auctions:[],auctionBids:[],adminNotices:[],content:{}};
  const store=createMemoryStore(state,()=>{},'shared');
  const admin=(route,p={},method='GET')=>sharedAdmin(store,'/tea'+route,p,{userName:'test',userId:1},method);
  const h5=(route,p={},token='',method='POST')=>sharedH5(store,route,p,token,method);
  for(const i of [1,2]) admin('/members',{phone:'1380013800'+i,nickName:'测试'+i,password:'local-password',payPassword:'246810'},'POST');
  const token=h5('/member/accountLogin',{phone:'13800138001',password:'local-password'}).data.token;
  return {store,admin,h5,token,user:state.users[0]};
}
test('shared shipment reminder persists once, reaches admin and rejects other owners or invalid states',()=>{
  const {h5,admin,token,user}=setup();
  const order={order_id:810,order_sn:'T810',status:'forwarding',pay_status:{value:20},goods:[]};
  user.orders.push(order);
  const other=h5('/member/accountLogin',{phone:'13800138002',password:'local-password'}).data.token;
  assert.equal(h5('/order/remindShipment',{order_id:810},other).code,0);
  assert.equal(h5('/order/remindShipment',{order_id:810},token,'GET').code,0);
  const first=h5('/order/remindShipment',{order_id:810},token);
  assert.equal(first.code,1); assert.ok(first.data.reminderId);
  assert.deepEqual(h5('/order/remindShipment',{order_id:810},token).data,first.data);
  const row=admin('/orders').data.rows.find(x=>x.orderId===810);
  assert.equal(row.reminderAt,first.data.createdAt); assert.equal(row.reminderStatus,'待处理');
  order.status='received';
  assert.equal(h5('/order/remindShipment',{order_id:810},token).code,0);
  assert.equal(admin('/orders').data.rows[0].reminderStatus,'已处理');
  assert.equal(admin('/orders',{reminded:'1'}).data.rows.length,0);
  order.status='forwarding'; order.pay_status.value=10;
  assert.equal(h5('/order/remindShipment',{order_id:810},token).code,0);
});
test('shared dashboard counts paid units and cash revenue separately from points or unpaid reservations',()=>{
  const {admin,user}=setup();
  const product=admin('/products',{goods_name:'统计茶',price:100,stock:20},'POST').data;
  const order=(id,type,price,paid,quantity)=>({order_id:id,goods_id:product.goods_id,order_type:type,pay_type:{value:type===5?4:2},pay_price:price,pay_status:{value:paid?20:10},goods:[{goods_id:product.goods_id,goods_name:'统计茶',goods_num:quantity}],create_time:'2026-09-25'});
  user.orders.push(order(901,4,10,true,2),order(902,5,50,true,1),order(903,4,80,false,1));
  const data=admin('/dashboard').data;
  assert.equal(data.metrics.revenue,'10.00');
  assert.equal(data.topProducts[0].sales,3);
  assert.equal(data.topProducts[0].amount,'10.00');
});
test('shared members never receive demo funds, cards, warehouse or default password',()=>{
  const {store,user}=setup();
  assert.equal(user.amount,'0.00'); assert.equal(user.score,'0.00');
  for(const key of ['orders','warehouse','recharges','cards','ledger']) assert.deepEqual(user[key],[]);
  assert.equal(store.state.admins,undefined);
});
test('shared payment voucher waits for review and cannot cross-account or cross-business reuse',()=>{
  const {store,admin,h5,token,user}=setup();
  const image='data:image/png;base64,AQIDBA==';
  h5('/_upload',{image},token); // private handler; real image decoding is tested over Java multipart.
  const id=h5('/recharge/toOrder',{custom_price:50,pay_image:image},token).data;
  assert.equal(user.score,'0.00');
  const other=h5('/member/accountLogin',{phone:'13800138002',password:'local-password'}).data.token;
  h5('/_upload',{image},other);
  assert.equal(h5('/recharge/toOrder',{custom_price:50,pay_image:image},other).code,0);
  assert.equal(admin('/recharges/'+id,{action:'approve'},'PUT').code,200);
  assert.equal(admin('/recharges/'+id,{action:'approve'},'PUT').code,200);
  assert.equal(user.score,'50.00'); assert.equal(user.ledger.length,1);
});
test('rejected recharge does not credit account and cannot later be approved',()=>{
  const {admin,h5,token,user}=setup();
  h5('/_upload',{image:'data:image/png;base64,AAEE'},token);
  const id=h5('/recharge/toOrder',{custom_price:50,pay_image:'data:image/png;base64,AAEE'},token).data;
  assert.equal(admin('/recharges/'+id,{action:'reject'},'PUT').code,400);
  assert.equal(admin('/recharges/'+id,{action:'reject',remark:'未到账'},'PUT').code,200);
  assert.equal(admin('/recharges/'+id,{action:'approve'},'PUT').code,400);
  assert.equal(user.score,'0.00'); assert.equal(user.ledger.length,0);
});
test('shared content rejects HTML and script URLs without modifying existing content',()=>{
  const {admin,store}=setup();
  assert.equal(admin('/content/banners',{value:[]},'PUT').code,200);
  assert.equal(admin('/content/banners',{value:[{url:'javascript:alert(1)'}]},'PUT').code,400);
  assert.equal(admin('/notices',{noticeContent:'<img onerror=alert(1)>'},'POST').code,400);
  assert.deepEqual(store.state.content.banners,[]);
});
test('shared membership disable revokes issued sessions permanently',()=>{
  const {admin,h5,token,user}=setup();
  admin('/members/'+user.member_id,{status:'1'},'PUT');
  assert.equal(h5('/member/getMemberDetails',{},token).code,-500);
  admin('/members/'+user.member_id,{status:'0'},'PUT');
  assert.equal(h5('/member/getMemberDetails',{},token).code,-500);
});
test('shared external payment and unauthenticated actor injection do not fabricate success',()=>{
  const {h5,token}=setup();
  for(const route of ['/demo/pay','/order/upOrderStatus','/dg/openAccount','/usdt/addvoucher']) assert.equal(h5(route,{},token).code,0);
  assert.equal(h5('/admin/tea/products',{actor:{userId:1,userName:'admin'}},'').code,-500);
});
test('shared invalid goods id fails explicitly rather than returning fixture goods',()=>{
  const {h5}=setup();
  assert.equal(h5('/score/getDetails',{goods_id:999}).code,0);
  assert.equal(h5('/shopgoods/getDetails',{goods_id:999}).code,0);
  assert.deepEqual(h5('/goods/getLootList').data.list.filter(x=>x.auction_id!=='grab'),[]);
});
test('shared direct fake voucher cannot bypass verified upload ownership',()=>{
  const {h5,token,user}=setup();
  assert.equal(h5('/recharge/toOrder',{custom_price:50,pay_image:'data:image/png;base64,AQIDBA=='},token).code,0);
  assert.equal(user.recharges.length,0);
});
test('shared product listing never creates demo auctions, even with zero inventory',()=>{
  for (const stock of [0,3]) {
    const {admin,h5,store}=setup();
    admin('/products',{goods_name:'未开拍茶品',price:20,stock},'POST');
    // Loading an existing catalog before any auction schema marker exists.
    delete store.state.auctionSeedVersion;
    assert.deepEqual(h5('/goods/getLootList').data.list.filter(x=>x.auction_id!=='grab'),[]);
    assert.deepEqual(store.state.auctions,[]);
    assert.equal(store.state.catalog[0].spec[0].stock_num,stock);
  }
});
test('shared checkout duplicate request creates one order and reserves stock once',()=>{
  const {admin,h5,token,user,store}=setup();
  const p=admin('/products',{goods_name:'幂等茶',price:20,stock:3},'POST').data;
  user.addresses.push({address_id:1,is_default:1,name:'收货人',phone:user.phone,detail:'测试地址'});
  const params={goods_id:p.goods_id,goods_num:1,pay_type:2,request_id:'local_checkout_001'};
  const first=h5('/order/order/buyNow',params,token);
  const second=h5('/order/order/buyNow',params,token);
  assert.equal(first.code,1); assert.equal(first.data.order_id,second.data.order_id);
  assert.equal(user.orders.length,1); assert.equal(store.state.catalog[0].spec[0].stock_num,2);
  assert.equal(h5('/order/order/buyNow',{...params,goods_num:2},token).code,0);
});
test('shared payment polling never treats pending review or cancellation as paid',()=>{
  const {h5,token,user}=setup();
  user.warehouse.push({order_id:910,goods_id:1,pay_status:'审核中'});
  user.settlements.push({id:911,order_id:910,direction:'out',pay_status:1});
  for (const status of ['待支付','审核中','已取消']) {
    user.warehouse[0].pay_status=status;
    assert.equal(h5('/order/getPayOrderStatus',{order_id:910},token).code,0,status);
  }
  user.warehouse[0].pay_status='结算完毕'; user.settlements[0].pay_status=2;
  assert.equal(h5('/order/getPayOrderStatus',{order_id:910},token).data,1);
});
test('shared valid decimal recharge amount is accepted without binary rounding rejection',()=>{
  const {h5,token,user}=setup();
  const image='data:image/png;base64,AQID'; h5('/_upload',{image},token);
  assert.equal(h5('/recharge/toOrder',{custom_price:'0.29',pay_image:image},token).code,1);
  assert.equal(user.recharges[0].price,'0.29');
  assert.equal(h5('/recharge/toOrder',{custom_price:'0.291',pay_image:image},token).code,0);
});
test('shared admin cannot manufacture member receipt or product review',()=>{
  const {admin,user}=setup();
  user.orders.push({order_id:920,status:'received',pay_status:{value:20},delivery_status:{value:20},receipt_status:{value:10},evaluation_status:10,goods:[]});
  assert.notEqual(admin('/orders/920',{status:'evaluation'},'PUT').code,200);
  assert.equal(user.orders[0].receipt_status.value,10);
});
test('shared complaint details match the H5 fields and enforce order ownership',()=>{
  const {h5,token,user}=setup();
  user.orders.push({order_id:930,order_sn:'T930',goods_id:12,pay_price:'20.00',goods:[{goods_name:'投诉茶品',goods_image:'/h5/test.png',goods_price:'20.00'}]});
  const detail=h5('/order/getOrderReport',{order_id:930},token);
  assert.equal(detail.data.order_no,'T930');
  assert.equal(detail.data.goods_name,'投诉茶品');
  assert.equal(detail.data.goods_thumb,'/h5/test.png');
  assert.equal(h5('/order/getOrderReport',{order_id:999},token).code,0);
});
test('shared payments stay bound to the recorded channel and disabled channels fail',()=>{
  const {h5,token,user}=setup();
  user.amount=user.score='100.00';
  user.orders.push({order_id:940,order_sn:'T940',order_type:4,pay_price:'10.00',pay_type:{value:2},pay_status:{value:10},order_status:{value:10}},
    {order_id:941,order_sn:'T941',order_type:5,pay_price:'10.00',pay_type:{value:4},pay_status:{value:10},order_status:{value:10}});
  assert.equal(h5('/pay/pointsPayment',{trade_no:'T940',pay_password:'246810'},token).code,0);
  assert.equal(h5('/pay/balancePay',{trade_no:'T941',pay_password:'246810'},token).code,0);
  for(const pay_type of [1,3,5,6]) assert.equal(h5('/order/toPayGoods',{order_id:940,pay_type},token).code,0);
  assert.equal(user.amount,'100.00'); assert.equal(user.score,'100.00');
});
test('shared transfer has exact positive precision and durable request idempotency',()=>{
  const {store,h5,token,user}=setup();
  user.e_card_number='10.00';
  assert.equal(h5('/member/toTransfer',{mobile:'13800138002',price:'0.001',pay_password:'246810',request_id:'transfer-bad-001'},token).code,0);
  h5('/member/verificationPayPassword',{pwd:'246810'},token);
  const p={mobile:'13800138002',price:'1.23',request_id:'transfer-good-001'};
  const first=h5('/member/toTransfer',p,token), second=h5('/member/toTransfer',p,token);
  assert.equal(first.code,1); assert.deepEqual(second.data,first.data);
  assert.equal(user.e_card_number,'8.77'); assert.equal(store.state.users[1].e_card_number,'1.23');
  assert.equal(user.ledger.length,1); assert.equal(store.state.users[1].ledger.length,1);
  assert.equal(h5('/member/toTransfer',{...p,price:'2'},token).code,0);
});
