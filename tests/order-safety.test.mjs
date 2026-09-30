import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.mjs';
import { sharedAdmin, sharedH5 } from '../server/shared-api.mjs';
import { adminBusinessApi } from '../server/admin-api.mjs';

function setup() {
  const store=createMemoryStore({users:[],sessions:{},nextId:100,catalog:[],auctions:[],auctionBids:[],adminNotices:[],content:{}},()=>{},'shared');
  const admin=(route,p={},method='GET')=>sharedAdmin(store,'/tea'+route,p,{userName:'test',userId:1},method);
  const h5=(route,p={},token='',method='POST')=>sharedH5(store,route,p,token,method);
  for(const i of [1,2]) admin('/members',{phone:'1380013800'+i,nickName:'测试'+i,password:'local-password',payPassword:'246810'},'POST');
  const token=h5('/member/accountLogin',{phone:'13800138001',password:'local-password'}).data.token;
  const other=h5('/member/accountLogin',{phone:'13800138002',password:'local-password'}).data.token;
  const regions=h5('/region/getAllList').data;
  const region=[regions[0].id,regions[0].city[0].id,regions[0].city[0].region[0].id].join(',');
  for(const [t,name] of [[token,'本人收货人'],[other,'他人收货人']]) assert.equal(h5('/address/add',{name,phone:'13800138001',detail:'隔离测试地址',region},t).code,1);
  const product=admin('/products',{goods_name:'订单安全验收',price:10,stock:10},'POST').data;
  return {store,admin,h5,token,other,product,user:store.state.users[0]};
}

test('shared checkout rejects explicit missing or foreign addresses without substituting a default or reserving stock',()=>{
  const {store,h5,token,product,user}=setup();
  for(const route of ['/order/order/buyNow','/order/originalPricePurchase']) {
    for(const method of ['GET','POST']) for(const address_id of [999999,store.state.users[1].addresses[0].address_id,'bad-id']) {
      const before=JSON.stringify(store.state);
      const result=h5(route,{goods_id:product.goods_id,goods_num:1,pay_type:2,address_id},token,method);
      assert.equal(result.code,0,route+':'+address_id);
      assert.match(result.msg,/地址/);
      assert.equal(JSON.stringify(store.state),before);
    }
    assert.equal(h5(route,{goods_id:product.goods_id,goods_num:1,pay_type:2,address_id:user.addresses[0].address_id},token).code,1);
  }
});

test('shared checkout keeps default preview compatibility and persists a separate immutable address snapshot',()=>{
  const {h5,token,product,user}=setup();
  const params={goods_id:product.goods_id,goods_num:1,pay_type:2};
  assert.equal(h5('/order/order/buyNow',params,token,'GET').data.address.address_id,user.addresses[0].address_id);
  const result=h5('/order/order/buyNow',params,token);
  assert.equal(result.code,1);
  const order=user.orders.find(x=>x.order_id===result.data.order_id);
  user.addresses[0].detail='后来修改的地址';
  assert.equal(order.address.detail,'隔离测试地址');
});

test('repeated receipt through either alias never rolls a completed reviewed order back to awaiting evaluation',()=>{
  const {store,h5,token,other,product,user}=setup();
  user.orders.push({order_id:900,goods_id:product.goods_id,status:'received',pay_status:{value:20},delivery_status:{value:20},receipt_status:{value:10},evaluation_status:10,order_status:{value:10},goods:[]});
  assert.equal(h5('/order/receipt',{order_id:900},token).code,1);
  assert.equal(h5('/order/evaluation',{order_id:900,content_text:'真实收货评价'},token).code,1);
  for(const route of ['/order/receipt','/member/order/receipt']) {
    const before=JSON.stringify(store.state);
    assert.equal(h5(route,{order_id:900},token).code,1);
    assert.equal(user.orders.find(x=>x.order_id===900).status,'completed');
    assert.equal(JSON.stringify(store.state),before);
    assert.equal(h5(route,{order_id:900},other).code,0);
    assert.equal(JSON.stringify(store.state),before);
  }
});

test('reserved auctions reject unpublishing in both shared and underlying admin handlers, then allow it after cancellation',()=>{
  for(const status of ['scheduled','running']) {
    const {store,admin,h5,product}=setup();
    const auction=admin('/auctions',{goodsId:product.goods_id,startPrice:10,bidIncrement:1,quantity:1,startTime:new Date(Date.now()+(status==='scheduled'?60000:-60000)).toISOString(),endTime:new Date(Date.now()+600000).toISOString()},'POST').data;
    const before=JSON.stringify(store.state);
    for(const params of [{approvalStatus:20},{...product,stock:9,approvalStatus:20}]) {
      assert.notEqual(admin('/products/'+product.goods_id,params,'PUT').code,200);
      assert.equal(JSON.stringify(store.state),before);
    }
    assert.notEqual(adminBusinessApi(store,'/tea/products/'+product.goods_id,{approvalStatus:20},{userName:'test'},'PUT').code,200);
    assert.equal(JSON.stringify(store.state),before);
    assert.equal(h5('/auction/detail',{auction_id:auction.auctionId}).code,1);
    assert.equal(admin('/auctions/'+auction.auctionId,{status:'cancelled'},'PUT').code,200);
    assert.equal(store.state.catalog[0].spec[0].stock_num,10);
    assert.equal(admin('/products/'+product.goods_id,{...product,stock:10,approvalStatus:20},'PUT').code,200);
    assert.equal(h5('/auction/detail',{auction_id:auction.auctionId}).code,0);
  }
});
