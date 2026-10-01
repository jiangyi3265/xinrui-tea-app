import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.mjs';
import { sharedAdmin, sharedH5 } from '../server/shared-api.mjs';

function setup() {
  const store=createMemoryStore({users:[],sessions:{},nextId:100,catalog:[],auctions:[],auctionBids:[],adminNotices:[],content:{}},()=>{},'shared');
  const admin=(route,p={},method='GET')=>sharedAdmin(store,'/tea'+route,p,{userName:'warehouse',userId:24},method);
  const h5=(route,p={},token='',method='POST')=>sharedH5(store,route,p,token,method);
  for(const i of [1,2]) admin('/members',{phone:'1380013800'+i,nickName:'验收会员'+i,password:'local-password',payPassword:'246810'},'POST');
  const token=h5('/member/accountLogin',{phone:'13800138001',password:'local-password'}).data.token;
  const user=store.state.users[0];
  user.orders.push({order_id:810,order_sn:'T810',status:'forwarding',pay_status:{value:20,text:'已付款'},receipt_status:{value:10},goods:[]});
  return {store,admin,h5,token,user};
}

test('shared shipping requires valid parcel information before any fulfilment mutation',()=>{
  const {admin,user}=setup();
  for(const payload of [{},{expressCompany:'测试快递'},{expressCompany:'<script>',expressNo:'TEST810001'},{expressCompany:'测试快递',expressNo:'\n'}]) {
    const before=JSON.stringify(user.orders[0]);
    assert.notEqual(admin('/orders/810',{status:'received',...payload},'PUT').code,200);
    assert.equal(JSON.stringify(user.orders[0]),before);
  }
  user.orders[0].pay_status.value=10;
  assert.notEqual(admin('/orders/810',{status:'received',expressCompany:'测试快递',expressNo:'TEST810001'},'PUT').code,200);
});

test('shared shipping persists parcel details, remains idempotent after receipt and rejects conflicting retries',()=>{
  const {admin,h5,token,user}=setup();
  const payload={status:'received',expressCompany:'测试快递',expressNo:'TEST810001',expressPhone:'400-000-0000'};
  assert.equal(admin('/orders/810',payload,'PUT').code,200);
  const order=user.orders[0], shippedAt=order.shippedAt;
  assert.ok(shippedAt); assert.equal(order.express_company,payload.expressCompany); assert.equal(order.express_no,payload.expressNo);
  const row=admin('/orders').data.rows[0]; assert.equal(row.expressNo,payload.expressNo);
  const detail=h5('/order/express',{order_id:810},token);
  assert.equal(detail.data.order.express_no,payload.expressNo); assert.equal(detail.data.order.tel,payload.expressPhone);
  assert.equal(detail.data.courier[0].source,'merchant');
  assert.equal(admin('/orders/810',payload,'PUT').code,200); assert.equal(order.shippedAt,shippedAt);
  assert.notEqual(admin('/orders/810',{...payload,expressNo:'OTHER810002'},'PUT').code,200);
  assert.equal(order.express_no,payload.expressNo);
  assert.equal(h5('/order/receipt',{order_id:810},token).code,1);
  assert.equal(admin('/orders/810',payload,'PUT').code,200); assert.equal(order.status,'evaluation');
  const other=h5('/member/accountLogin',{phone:'13800138002',password:'local-password'}).data.token;
  assert.equal(h5('/order/express',{order_id:810},other).code,0);
});

test('shared catalogue categories come from saved configuration, not fixture position',()=>{
  const {admin,h5}=setup();
  assert.equal(admin('/content/categories',{value:[{category_id:31,name:'红茶'},{category_id:32,name:'绿茶'}]},'PUT').code,200);
  const one=admin('/products',{goods_name:'分类红茶',price:10,stock:3,category_id:31,description:'已核实的商品描述'},'POST').data;
  admin('/products',{goods_name:'分类绿茶',price:20,stock:3,category_id:32},'POST');
  assert.deepEqual(h5('/goods/getCategory').data.categoryList.map(c=>c.category_id),[0,31,32]);
  assert.deepEqual(h5('/category/getCategoryGoodsList',{category_id:31}).data.list.data.map(x=>x.goods_id),[one.goods_id]);
  assert.equal(h5('/category/getCategoryGoodsList',{category_id:999}).data.list.total,0);
  assert.equal(h5('/shopgoods/getDetails',{goods_id:one.goods_id}).data.detail.content,'已核实的商品描述');
  assert.notEqual(admin('/content/categories',{value:[{category_id:32,name:'绿茶'}]},'PUT').code,200);
  assert.notEqual(admin('/products',{goods_name:'无效类目',price:20,stock:3,category_id:999},'POST').code,200);
});

test('shared catalogue never substitutes demo descriptions or a different notice',()=>{
  const {admin,h5}=setup();
  const product=admin('/products',{goods_name:'没有描述',price:10,stock:2},'POST').data;
  assert.equal(h5('/shopgoods/getDetails',{goods_id:product.goods_id}).data.detail.content,'');
  const notice=admin('/notices',{noticeTitle:'已发布公告',noticeContent:'仅此公告',status:'0'},'POST').data;
  assert.equal(h5('/notice/getNoticeInfo',{id:notice.noticeId}).data.content,'仅此公告');
  assert.equal(h5('/notice/getNoticeInfo',{id:99999}).code,0);
  admin('/notices/'+notice.noticeId,{noticeTitle:'已隐藏公告',noticeContent:'已隐藏',status:'1'},'PUT');
  assert.equal(h5('/notice/getNoticeInfo',{id:notice.noticeId}).code,0);
});

test('shared product reviews are public read-only persisted reviews, with real pagination and no samples',()=>{
  const {h5,user}=setup();
  assert.deepEqual(h5('/goods/getGoodsEvaluation',{goods_id:88}).data.list.data,[]);
  user.reviews.push(...Array.from({length:3},(_,i)=>({id:i+1,goods_id:88,content:'真实评价'+i})));
  const page=h5('/goods/getGoodsEvaluation',{goods_id:88,page:2,listRows:2});
  assert.equal(page.code,1); assert.equal(page.data.list.total,3); assert.equal(page.data.list.data.length,1); assert.equal(page.data.list.data[0].id,3);
});

test('shared member writes reject wrong HTTP methods without mutating business state',()=>{
  const {store,h5,token}=setup();
  const regions=h5('/region/getAllList').data, region=[regions[0].id,regions[0].city[0].id,regions[0].city[0].region[0].id].join(',');
  for (const [route,p] of [
    ['/member/editMember',{nickName:'方法越界'}],['/address/add',{name:'测试',phone:'13800138001',detail:'测试地址',region}],
    ['/order/order/buyNow',{goods_id:1,pay_type:2}],['/order/toAddOrder',{goods_id:1}],
    ['/order/cancel',{order_id:810}],['/order/receipt',{order_id:810}],['/member/setSignImage',{url:'x'}]
  ]) for (const method of route==='/order/order/buyNow'?['PUT','DELETE']:['GET','PUT','DELETE']) {
    const before=JSON.stringify(store.state);
    assert.equal(h5(route,p,token,method).code,0,route+':'+method);
    assert.equal(JSON.stringify(store.state),before,route+':'+method);
  }
});

test('shared password change verifies current password and revokes all sessions, not other members',()=>{
  const {h5,token,user}=setup();
  const second=h5('/member/accountLogin',{phone:user.phone,password:'local-password'}).data.token;
  const other=h5('/member/accountLogin',{phone:'13800138002',password:'local-password'}).data.token;
  user.passwordResetUntil=Date.now()+60000;
  assert.equal(h5('/member/editPwd',{password:'changed-password',real_pwd:'changed-password'},token).code,0);
  assert.equal(h5('/member/editPwd',{old_password:'local-password',password:'changed-password',real_pwd:'changed-password'},token).code,1);
  for(const old of [token,second]) assert.equal(h5('/member/getMemberDetails',{},old).code,-500);
  assert.equal(h5('/member/getMemberDetails',{},other).code,1);
  assert.equal(h5('/member/accountLogin',{phone:user.phone,password:'local-password'}).code,0);
  assert.equal(h5('/member/accountLogin',{phone:user.phone,password:'changed-password'}).code,1);
});

test('shared logout revokes only the current token and remains idempotent',()=>{
  const {h5,token,user}=setup();
  const second=h5('/member/accountLogin',{phone:user.phone,password:'local-password'}).data.token;
  assert.equal(h5('/member/logout',{},token).code,1);
  assert.equal(h5('/member/getMemberDetails',{},token).code,-500);
  assert.equal(h5('/member/getMemberDetails',{},second).code,1);
  assert.equal(h5('/member/logout',{},token).code,1);
});

test('shared address schema rejects objects, blank and oversized fields atomically',()=>{
  const {h5,token,user}=setup();
  const regions=h5('/region/getAllList').data, region=[regions[0].id,regions[0].city[0].id,regions[0].city[0].region[0].id].join(',');
  for(const extra of [{name:{}},{detail:{}},{name:'   '},{detail:'x'.repeat(201)}]) {
    assert.equal(h5('/address/add',{name:'测试',phone:user.phone,detail:'测试地址',region,...extra},token).code,0);
    assert.equal(user.addresses.length,0);
  }
  assert.equal(h5('/address/add',{name:' 收货人 ',phone:user.phone,detail:' 测试地址 ',region},token).code,1);
  assert.equal(user.addresses[0].name,'收货人'); assert.equal(user.addresses[0].detail,'测试地址');
});

test('removed registration and SMS remain closed and never create accounts',()=>{
  const {h5,store}=setup(), n=store.state.users.length;
  for(const route of ['/member/registerAnAccount','/v1/sms']) {
    const r=h5(route,{phone:'13800138111',password:'local-password',code:'123456'});
    assert.equal(r.code,0); assert.match(r.msg,/接口已关闭/);
  }
  assert.equal(store.state.users.length,n);
});

test('legacy shared states return an empty notice list and missing detail, never demo or exceptions',()=>{
  const {store,h5}=setup(); delete store.state.adminNotices;
  assert.deepEqual(h5('/notice/getNotice').data,[]);
  assert.equal(h5('/notice/getNoticeInfo',{id:1}).code,0);
});

test('shared empty auctions never fabricate listings, future times, purchase limits or enabled gates',()=>{
  const {h5,admin}=setup();
  const product=admin('/products',{goods_name:'普通商品',price:10,stock:3},'POST').data;
  assert.deepEqual(h5('/goods/getLootList').data.list,[]);
  const list=h5('/loodgoods/getCategoryGoodsList',{specialarea_id:999}).data;
  assert.equal(list.list.total,0); assert.equal(list.time_info.end_time,0);
  const detail=h5('/goods/getLootDetails',{goods_id:product.goods_id}).data;
  assert.equal(detail.auction,null); assert.equal(detail.time_info.end_time,0); assert.equal(detail.content,'');
  assert.equal(h5('/goods/getPurchaseNum').code,0); assert.equal(h5('/goods/getIsAuction').code,0);
  assert.equal(h5('/goods/getPurchaseNum',{goods_id:product.goods_id}).data.num,3);
  assert.equal(h5('/goods/getIsAuction',{goods_id:product.goods_id}).code,1);
  admin('/products/'+product.goods_id,{...product,stock:0},'PUT');
  assert.equal(h5('/goods/getPurchaseNum',{goods_id:product.goods_id}).code,0);
  assert.equal(h5('/goods/getIsAuction',{goods_id:product.goods_id}).code,0);
});

test('shared auction catalogue uses exact saved auction, time and product and rejects direct purchase bypass',()=>{
  const {store,h5,admin,token}=setup();
  const product=admin('/products',{goods_name:'实际竞价商品',price:10,stock:3,description:'实际描述'},'POST').data;
  const other=admin('/products',{goods_name:'不在场次的商品',price:20,stock:2},'POST').data;
  const startTime=new Date(Date.now()-60000).toISOString(), endTime=new Date(Date.now()+600000).toISOString();
  const auction=admin('/auctions',{goodsId:product.goods_id,startPrice:10,bidIncrement:1,quantity:1,startTime,endTime,status:'running'},'POST').data;
  const list=h5('/loodgoods/getCategoryGoodsList',{specialarea_id:auction.auctionId}).data;
  assert.equal(list.list.total,1); assert.equal(list.list.data[0].goods_id,product.goods_id);
  assert.equal(list.list.data[0].auction.auctionId,auction.auctionId); assert.equal(list.list.data[0].pay_status,'竞价中');
  assert.equal(list.time_info.end_time,Date.parse(endTime)/1000);
  const detail=h5('/goods/getLootDetails',{goods_id:product.goods_id}).data;
  assert.equal(detail.time_info.start_time,Date.parse(startTime)/1000); assert.equal(detail.content,'实际描述');
  assert.equal(h5('/goods/getLootDetails',{goods_id:other.goods_id,auction_id:auction.auctionId}).code,0);
  assert.equal(h5('/goods/getLootDetails',{goods_id:product.goods_id,auction_id:999999}).code,0);
  assert.equal(h5('/goods/getPurchaseNum',{goods_id:product.goods_id}).code,0);
  assert.equal(h5('/goods/getIsAuction',{goods_id:product.goods_id}).code,0);
  const before=JSON.stringify(store.state);
  assert.equal(h5('/order/toAddOrder',{goods_id:product.goods_id},token).code,0);
  assert.equal(JSON.stringify(store.state),before);
});

test('shared reservation rejects nonexistent auctions without partial records',()=>{
  const {h5,user,token}=setup(); const before=JSON.stringify(user.subscriptions);
  assert.equal(h5('/index/getSubscribeSetting').data.is_open,1);
  assert.equal(h5('/order/subscribe',{specialarea_id:999999},token).code,0);
  assert.equal(JSON.stringify(user.subscriptions),before);
});

test('shared auction gate also rejects direct ordinary and points checkout without order or stock writes',()=>{
  const {store,h5,admin,token}=setup();
  const product=admin('/products',{goods_name:'仅竞价商品',price:10,stock:5},'POST').data;
  const regions=h5('/region/getAllList').data, region=[regions[0].id,regions[0].city[0].id,regions[0].city[0].region[0].id].join(',');
  assert.equal(h5('/address/add',{name:'测试',phone:'13800138001',detail:'隔离测试地址',region},token).code,1);
  for(const status of ['scheduled','running']) {
    const auction=admin('/auctions',{goodsId:product.goods_id,startPrice:10,bidIncrement:1,quantity:1,startTime:new Date(Date.now()+(status==='scheduled'?60000:-60000)).toISOString(),endTime:new Date(Date.now()+600000).toISOString(),status},'POST').data;
    for(const route of ['/order/order/buyNow','/order/originalPricePurchase']) for(const pay_type of [2,4]) {
      const before=JSON.stringify(store.state);
      const r=h5(route,{goods_id:product.goods_id,goods_num:1,pay_type},token);
      assert.equal(r.code,0,route+':'+pay_type); assert.match(r.msg,/出价/);
      assert.equal(JSON.stringify(store.state),before);
    }
    assert.equal(admin('/auctions/'+auction.auctionId,{status:'cancelled'},'PUT').code,200);
  }
  assert.equal(h5('/order/order/buyNow',{goods_id:product.goods_id,goods_num:1,pay_type:2},token).code,1);
});

test('all shared public auction aliases hide drafts and unpublished products and reject mismatched IDs',()=>{
  const {store,h5,admin,token}=setup();
  const product=admin('/products',{goods_name:'场次可见性',price:10,stock:4},'POST').data;
  const auction=admin('/auctions',{goodsId:product.goods_id,startPrice:10,bidIncrement:1,quantity:1,startTime:new Date(Date.now()-60000).toISOString(),endTime:new Date(Date.now()+600000).toISOString()},'POST').data;
  const saved=store.state.auctions.find(a=>a.auctionId===auction.auctionId);
  assert.equal(h5('/auction/detail',{auction_id:999999,goods_id:product.goods_id}).code,0);
  const before=JSON.stringify(store.state);
  assert.equal(h5('/auction/bid',{auction_id:999999,goods_id:product.goods_id,amount:10},token).code,0);
  assert.equal(JSON.stringify(store.state),before);
  for(const hide of [()=>{saved.status='draft';},()=>{saved.status='running';store.state.catalog[0].approvalStatus=20;}]) {
    hide();
    assert.deepEqual(h5('/auction/list').data.list,[]);
    assert.equal(h5('/auction/detail',{auction_id:auction.auctionId}).code,0);
    assert.deepEqual(h5('/goods/getLootList').data.list,[]);
  }
});
