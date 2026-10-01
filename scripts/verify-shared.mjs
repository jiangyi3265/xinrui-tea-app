import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { prepare, build, start, database, verifyRestore, captureSource, root } from './shared-stack.mjs';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';
import { releaseScope } from './release-policy.mjs';

function png(seed, width=1, height=1) {
  function chunk(type, data) {
    const name=Buffer.from(type), block=Buffer.concat([name,data]); let crc=0xffffffff;
    for(const byte of block) { crc ^= byte; for(let n=0;n<8;n++) crc=(crc>>>1)^((crc&1)?0xedb88320:0); }
    const head=Buffer.alloc(4), end=Buffer.alloc(4); head.writeUInt32BE(data.length); end.writeUInt32BE((crc^0xffffffff)>>>0);
    return Buffer.concat([head,block,end]);
  }
  const header=Buffer.alloc(13); header.writeUInt32BE(width,0); header.writeUInt32BE(height,4); header[8]=8;header[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',deflateSync(Buffer.from([0,seed,10,20,255]))),chunk('IEND',Buffer.alloc(0))]);
}

export async function integration(config) {
  const results = [];
  const java = 'http://127.0.0.1:' + config.ports.java;
  const h5 = 'http://127.0.0.1:' + config.ports.h5;
  const second = 'http://127.0.0.1:' + config.ports.second;
  const adminOrigin = 'http://127.0.0.1:' + config.ports.admin + '/dev-api';
  let admin, viewer, token, other, product, auction, warehouse, settlement, recharge;
  let fixtureImage;
  const roles = {};
  const resources = ['dashboard','products','orders','auctions','members','notices','warehouse','settlements','fees','recharges','withdrawals','reports','ledger','bids','content'];
  const dbState = () => JSON.parse(database(config,'SELECT state_json FROM tea_business_state WHERE id=1;'));
  async function request(origin, route, data, auth, method) {
    const headers = {};
    if(origin === second) { headers.Origin=second; origin=java; }
    if (auth?.admin) headers.Authorization = 'Bearer ' + auth.admin;
    if (auth?.token) headers.token = auth.token;
    if (data !== undefined) headers['Content-Type'] = 'application/json';
    const response = await fetch(origin + route, { method: method || (data === undefined ? 'GET' : 'POST'), headers, body: data === undefined ? undefined : JSON.stringify(data), signal: AbortSignal.timeout(30000) });
    const result = await response.json();
    if(headers.Origin) assert.equal(response.headers.get('access-control-allow-origin'),second);
    return { ...result, httpStatus: response.status };
  }
  const a = (route, data, method) => request(adminOrigin, '/admin/tea' + route, data, { admin }, method);
  const m = (route, data, method = data === undefined ? 'GET' : 'POST', origin = h5, memberToken = token) => request(origin, '/app' + route, data, { token: memberToken }, method);
  const good = (result, code) => { assert.equal(result.code, code, result.msg || 'unexpected response'); return result.data; };
  async function upload(seed, uploadToken=token, width=1, height=1) {
    const body=new FormData(); body.append('file',new Blob([png(seed,width,height)],{type:'image/png'}),'local-test.png');
    const response=await fetch(h5+'/app/upload/image',{method:'POST',headers:{token:uploadToken},body});
    return response.json();
  }
  async function check(id, title, action) {
    const startedAt = new Date().toISOString();
    try { await action(); results.push({ id, title, status: '已实测通过', startedAt, finishedAt: new Date().toISOString() }); console.log(id + ' PASS ' + title); }
    catch (error) {
      results.push({ id, title, status: '失败', startedAt, error: error.message });
      await fs.writeFile(path.join(config.dir,'integration-results.json'),JSON.stringify(results,null,2));
      throw error;
    }
  }
  await check('INT-01','真实若依管理员 JWT、角色与接口权限',async()=>{
    const login = await request(java,'/login',{ username:'admin',password:'admin123' });
    assert.equal(login.code,200); assert.ok(login.token); admin=login.token;
    const limited = await request(java,'/login',{username:'tea_viewer',password:'admin123'});
    assert.equal(limited.code,200); viewer=limited.token;
    assert.equal((await request(java,'/admin/tea/products')).code,401);
    assert.equal((await request(java,'/admin/tea/products',{goods_name:'unauthorized',price:1,stock:1},{admin:viewer})).httpStatus,403);
    good(await request(java,'/admin/tea/products',undefined,{admin:viewer}),200);
    const financeLogin=await request(java,'/login',{username:'tea_finance_test',password:'admin123'});
    assert.equal(financeLogin.code,200);
    good(await request(java,'/admin/tea/recharges',undefined,{admin:financeLogin.token}),200);
    assert.equal((await request(java,'/admin/tea/products',{goods_name:'forbidden',price:1,stock:1},{admin:financeLogin.token})).httpStatus,403);
    const routers = good(await request(java,'/getRouters',undefined,{admin}),200);
    assert.equal(routers.find(x=>x.path==='/tea').children.length,15);
    const privateResult = await fetch('http://127.0.0.1:'+config.ports.engine+'/execute',{method:'POST',body:'{}'});
    assert.equal(privateResult.status,403);
  });
  await check('INT-02','会员登录、零资产开户及跨入口会话',async()=>{
    assert.match(await (await fetch(second+'/h5/static/demo/config.js')).text(),new RegExp(java+'/app'));
    assert.equal((await fetch(second+'/app/member/getMemberDetails')).status,404);
    token = good(await m('/member/accountLogin',{phone:'13800138001',password:'tea-local-2026'}),1).token;
    other = good(await m('/member/accountLogin',{phone:'13800138002',password:'tea-local-2026'}),1).token;
    assert.equal(good(await m('/member/getMemberDetails',undefined,'GET',second),1).member_id,1);
    const member = good(await a('/members',{phone:'13900000009',nickName:'新建验收会员',password:'local-password-2026',payPassword:'123456'}),200);
    const saved = dbState().users.find(x=>x.member_id===member.memberId);
    assert.equal(saved.amount,'0.00'); assert.equal(saved.score,'0.00'); assert.equal(saved.orders.length,0);
    assert.ok(!JSON.stringify(good(await a('/members'),200)).includes('passwordHash'));
    assert.equal((await m('/member/getMemberDetails',undefined,'GET',h5,'invalid')).code,-500);
  });
  await check('INT-18','运营/财务/内容/仓管角色逐模块服务端权限矩阵',async()=>{
    const grants={tea_operator:['dashboard','products','orders','auctions','members','warehouse','bids'],tea_finance:['dashboard','settlements','fees','recharges','withdrawals','ledger'],tea_content:['notices','content'],tea_warehouse:['orders','warehouse','reports']};
    for(const [role,allowed] of Object.entries(grants)) {
      const login=await request(java,'/login',{username:role+'_test',password:'admin123'});
      assert.equal(login.code,200); roles[role]=login.token;
      for(const resource of resources) {
        const response=await request(java,'/admin/tea/'+resource,undefined,{admin:roles[role]});
        assert.equal(response.httpStatus,allowed.includes(resource)?200:403,role+':'+resource);
      }
    }
    for(const resource of ['products','members','orders','notices','auctions','recharges']) {
      assert.equal((await request(java,'/admin/tea/'+resource+'/999',{action:'approve',status:'received'},{admin:viewer},'PUT')).httpStatus,403);
    }
  });
  await check('INT-23','非支付身份域：写方法限制、地址校验、退出撤销、修改密码撤销全部会话',async()=>{
    const before=database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
    for(const [route,params,method] of [
      ['/member/editMember?nickName=GET-write',undefined,'GET'],
      ['/address/add',{name:{bad:true},phone:'13800138001',detail:'隔离地址',region:'1,2,3'},'POST'],
      ['/order/order/buyNow',{goods_id:1,pay_type:2},'PUT'],
      ['/order/toAddOrder?goods_id=1',undefined,'GET']
    ]) assert.equal((await m(route,params,method)).code,0);
    assert.equal(database(config,'SELECT revision FROM tea_business_state WHERE id=1;'),before);
    const member=good(await a('/members',{phone:'13900000008',nickName:'会话撤销验收',password:'local-original-2026',payPassword:'123456'}),200);
    const one=good(await m('/member/accountLogin',{phone:'13900000008',password:'local-original-2026'}),1).token;
    const two=good(await m('/member/accountLogin',{phone:'13900000008',password:'local-original-2026'}),1).token;
    good(await m('/member/logout',{},'POST',second,one),1);
    assert.equal((await m('/member/getMemberDetails',undefined,'GET',h5,one)).code,-500);
    good(await m('/member/logout',{},'POST',h5,one),1);
    good(await m('/member/getMemberDetails',undefined,'GET',h5,two),1);
    const three=good(await m('/member/accountLogin',{phone:'13900000008',password:'local-original-2026'}),1).token;
    assert.equal((await m('/member/editPwd',{password:'local-changed-2026',real_pwd:'local-changed-2026'},'POST',h5,two)).code,0);
    good(await m('/member/editPwd',{old_password:'local-original-2026',password:'local-changed-2026',real_pwd:'local-changed-2026'},'POST',second,two),1);
    for(const old of [two,three]) assert.equal((await m('/member/getMemberDetails',undefined,'GET',h5,old)).code,-500);
    assert.equal(Object.values(dbState().sessions).filter(x=>x.memberId===member.memberId).length,0);
    assert.equal((await m('/member/accountLogin',{phone:'13900000008',password:'local-original-2026'})).code,0);
    const fresh=good(await m('/member/accountLogin',{phone:'13900000008',password:'local-changed-2026'}),1).token;
    good(await m('/member/getMemberDetails',undefined,'GET',h5,token),1);
    for(let i=0;i<5;i++) assert.equal((await m('/member/editPwd',{old_password:'wrong',password:'ignored-2026',real_pwd:'ignored-2026'},'POST',h5,fresh)).code,0);
    const locked=await m('/member/editPwd',{old_password:'local-changed-2026',password:'ignored-2026',real_pwd:'ignored-2026'},'POST',second,fresh);
    assert.equal(locked.code,0); assert.match(locked.msg,/十分钟/);
    const sms=await m('/v1/sms',{},'POST',h5,'');assert.equal(sms.code,0);assert.match(sms.msg,/无需短信/);
    const invalidSignup=await m('/member/registerAnAccount',{},'POST',h5,'');assert.equal(invalidSignup.code,0);
  });
  await check('INT-03','商品 CRUD、两入口实时数据及失败事务回滚',async()=>{
    product=good(await request(java,'/admin/tea/products',{goods_name:'三端联调茶品',goods_min_price:50,stock:20,approvalStatus:10},{admin:roles.tea_operator}),200);
    const rows=good(await m('/category/getCategoryGoodsList',undefined,'GET',second),1).list.data;
    assert.ok(rows.some(x=>x.goods_id===product.goods_id));
    const before=database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
    assert.notEqual((await a('/products',{goods_name:'错误价格',goods_min_price:-1,stock:1})).code,200);
    assert.equal(database(config,'SELECT revision FROM tea_business_state WHERE id=1;'),before);
    good(await a('/products/'+product.goods_id,{...product,goods_name:'三端同步茶品',stock:20},'PUT'),200);
    assert.equal(good(await m('/category/getCategoryGoodsList'),1).list.data[0].goods_name,'三端同步茶品');
  });
  await check('INT-12','实际 multipart 图片上传、未登录拒绝及内部路径隔离',async()=>{
    fixtureImage=good(await upload(1),1).file_path;
    assert.match(fixtureImage,/^data:image\/png;base64,/);
    assert.notEqual((await upload(2,'invalid')).code,1);
    assert.notEqual((await m('/_upload',{image:fixtureImage})).code,1);
    assert.notEqual((await m('/recharge/toOrder',{custom_price:50,pay_image:'data:image/png;base64,AQIDBA=='})).code,1);
    const before=database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
    const giant=await upload(5,token,50000,50000);
    assert.equal(giant.code,400); assert.match(giant.msg,/像素/);
    assert.equal(database(config,'SELECT revision FROM tea_business_state WHERE id=1;'),before);
  });
  let order;
  await check('INT-04','商城下单、余额扣款幂等、发货收货与跨用户隔离',async()=>{
    const regions = good(await m('/region/getAllList'),1);
    const province=regions[0], city=province.city[0], region=city.region[0];
    good(await m('/address/add',{name:'验收收货人',phone:'13800138001',detail:'隔离测试地址',region:[province.id,city.id,region.id].join(',')}),1);
    const params={goods_id:product.goods_id,goods_num:2,pay_type:2,order_type:4,request_id:'integration-checkout-001'};
    const created=good(await m('/order/order/buyNow',params),1);
    const repeat=good(await m('/order/order/buyNow',params),1);
    assert.equal(repeat.order_id,created.order_id);
    order=created.order_id;
    assert.notEqual((await m('/order/detail',{order_id:order},'POST',second,other)).code,1);
    const before=Number(dbState().users[0].amount);
    assert.notEqual((await m('/pay/pointsPayment',{trade_no:created.order_sn,pay_password:'246810'})).code,1);
    for (const pay_type of [1,3,5,6]) assert.notEqual((await m('/order/toPayGoods',{order_id:order,pay_type})).code,1);
    good(await m('/member/verificationPayPassword',{pwd:'246810'}),1);
    good(await m('/pay/balancePay',{trade_no:created.order_sn}),1);
    const after=dbState().users[0];
    assert.equal(Number(after.amount),before-100);
    assert.equal(after.orders.find(x=>x.order_id===order).status,'forwarding');
    await check('INT-20','发货提醒归属、跨端并发幂等、后台待办及发货后关闭',async()=>{
      assert.notEqual((await m('/order/remindShipment',{order_id:order},'POST',second,other)).code,1);
      assert.equal((await m('/order/remindShipment',{order_id:order},'POST',h5,'')).code,-500);
      const pair=await Promise.all([m('/order/remindShipment',{order_id:order}),m('/order/remindShipment',{order_id:order},'POST',second)]);
      const first=good(pair[0],1); assert.deepEqual(good(pair[1],1),first);
      assert.deepEqual(dbState().users[0].orders.find(x=>x.order_id===order).shipmentReminder,first);
      const row=good(await request(java,'/admin/tea/orders?reminded=1',undefined,{admin:roles.tea_warehouse},'GET'),200).rows.find(x=>x.orderId===order);
      assert.equal(row.reminderStatus,'待处理'); assert.equal(row.reminderAt,first.createdAt);
    });
    assert.notEqual((await a('/orders/'+order,{status:'evaluation'},'PUT')).code,200);
    good(await m('/pay/balancePay',{trade_no:created.order_sn,pay_password:'246810'}),1);
    assert.equal(Number(dbState().users[0].amount),before-100);
    await check('INT-21','非支付履约：必填运单、重复与冲突发货、归属及数据库持久化',async()=>{
      const revision=database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
      assert.notEqual((await request(java,'/admin/tea/orders/'+order,{status:'received'},{admin:roles.tea_warehouse},'PUT')).code,200);
      assert.equal(database(config,'SELECT revision FROM tea_business_state WHERE id=1;'),revision);
      const parcel={status:'received',expressCompany:'隔离测试承运商',expressNo:'LOCAL'+order+'001',expressPhone:'400-000-0000'};
      const pair=await Promise.all([request(java,'/admin/tea/orders/'+order,parcel,{admin:roles.tea_warehouse},'PUT'),a('/orders/'+order,parcel,'PUT')]);
      pair.forEach(r=>good(r,200));
      const shipped=dbState().users[0].orders.find(x=>x.order_id===order);
      assert.equal(shipped.express_no,parcel.expressNo); assert.ok(shipped.shippedAt);
      assert.notEqual((await a('/orders/'+order,{...parcel,expressNo:'CONFLICT0001'},'PUT')).code,200);
      assert.equal(dbState().users[0].orders.find(x=>x.order_id===order).express_no,parcel.expressNo);
      assert.equal(dbState().users[0].orders.find(x=>x.order_id===order).shippedAt,shipped.shippedAt);
      assert.notEqual((await m('/order/express',{order_id:order},'POST',second,other)).code,1);
      assert.equal(good(await m('/order/express',{order_id:order},'POST',second),1).order.express_no,parcel.expressNo);
    });
    assert.notEqual((await m('/order/remindShipment',{order_id:order})).code,1);
    assert.equal(good(await a('/orders?reminded=1'),200).rows.some(x=>x.orderId===order),false);
    assert.equal(good(await a('/orders'),200).rows.find(x=>x.orderId===order).reminderStatus,'已处理');
    const tracking=good(await m('/order/express',{order_id:order}),1);
    assert.equal(tracking.order.express_no,'LOCAL'+order+'001'); assert.equal(tracking.order.express_company,'隔离测试承运商');
    assert.equal(tracking.trackingAvailable,false); assert.equal(tracking.courier[0].source,'merchant');
    assert.notEqual((await a('/orders/'+order,{status:'evaluation'},'PUT')).code,200);
    good(await m('/pay/balancePay',{trade_no:created.order_sn,pay_password:'246810'}),1);
    assert.equal(dbState().users[0].orders.find(x=>x.order_id===order).status,'received');
    const receipt=await m('/order/receipt',{order_id:order});
    good(receipt,1); assert.equal(receipt.msg,'收货已确认');
    assert.equal(dbState().users[0].orders.find(x=>x.order_id===order).receipt_status.value,20);
  });
  await check('INT-05','拍卖并发竞价、最高价成交、数量和库存一致',async()=>{
    auction=good(await a('/auctions',{goodsId:product.goods_id,title:'并发拍卖验收',startPrice:80,bidIncrement:10,quantity:2,startTime:new Date(Date.now()-60000).toISOString(),endTime:new Date(Date.now()+3600000).toISOString()}),200);
    const savedPrice=dbState().auctions.find(x=>x.auctionId===auction.auctionId).startPrice;
    assert.notEqual((await a('/auctions/'+auction.auctionId,{startPrice:999,bidIncrement:-1},'PUT')).code,200);
    assert.equal(dbState().auctions.find(x=>x.auctionId===auction.auctionId).startPrice,savedPrice);
    const oldStock=dbState().catalog.find(x=>x.goods_id===product.goods_id).spec[0].stock_num;
    await check('INT-24','拍卖真实场次列表/详情/时间、空场次及预约失败无部分写入',async()=>{
      const empty=good(await m('/loodgoods/getCategoryGoodsList',{specialarea_id:999999},'POST',second),1);
      assert.equal(empty.list.total,0); assert.equal(empty.time_info.end_time,0);
      const list=good(await m('/loodgoods/getCategoryGoodsList',{specialarea_id:auction.auctionId},'POST',second),1);
      assert.equal(list.list.total,1); assert.equal(list.list.data[0].goods_id,product.goods_id);
      assert.equal(list.list.data[0].pay_status,'竞价中');
      const saved=dbState().auctions.find(x=>x.auctionId===auction.auctionId);
      assert.equal(list.time_info.end_time,Date.parse(saved.endTime)/1000);
      const detail=good(await m('/goods/getLootDetails',{goods_id:product.goods_id},'POST',second),1);
      assert.equal(detail.auction.auctionId,auction.auctionId); assert.equal(detail.time_info.start_time,Date.parse(saved.startTime)/1000);
      const revision=database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
      for(const route of ['/goods/getPurchaseNum','/goods/getIsAuction','/order/toAddOrder']) assert.equal((await m(route,{goods_id:product.goods_id})).code,0);
      for(const route of ['/order/order/buyNow','/order/originalPricePurchase']) for(const pay_type of [2,4]) {
        const rejected=await m(route,{goods_id:product.goods_id,goods_num:1,pay_type});
        assert.equal(rejected.code,0); assert.match(rejected.msg,/出价/);
      }
      assert.equal((await m('/goods/getLootDetails',{goods_id:product.goods_id,auction_id:999999})).code,0);
      assert.equal((await m('/auction/detail',{goods_id:product.goods_id,auction_id:999999})).code,0);
      assert.equal((await m('/auction/bid',{goods_id:product.goods_id,auction_id:999999,amount:90})).code,0);
      assert.equal(good(await m('/index/getSubscribeSetting'),1).is_open,1);
      assert.equal((await m('/order/subscribe',{specialarea_id:999999})).code,0);
      assert.equal(database(config,'SELECT revision FROM tea_business_state WHERE id=1;'),revision);
    });
    const bids=await Promise.all([m('/auction/bid',{auction_id:auction.auctionId,amount:90}),m('/auction/bid',{auction_id:auction.auctionId,amount:90},'POST',second,other)]);
    assert.equal(bids.filter(x=>x.code===1).length,1);
    const winner = bids[0].code === 1 ? token : other, loser = winner===token ? other : token;
    good(await a('/auctions/'+auction.auctionId,{status:'ended'},'PUT'),200);
    assert.notEqual((await m('/auction/settle',{auction_id:auction.auctionId},'POST',h5,loser)).code,1);
    const settled=good(await m('/auction/settle',{auction_id:auction.auctionId},'POST',h5,winner),1);
    good(await m('/auction/settle',{auction_id:auction.auctionId},'POST',second,winner),1);
    warehouse=settled.order_id;
    const state=dbState(), user=state.users.find(u=>u.warehouse.some(w=>w.order_id===warehouse));
    assert.equal(user.warehouse.find(x=>x.order_id===warehouse).total_num,2);
    assert.equal(state.catalog.find(x=>x.goods_id===product.goods_id).spec[0].stock_num,oldStock);
    assert.equal(user.warehouse.filter(x=>x.auctionId===auction.auctionId).length,1);
    settlement=user.settlements.find(x=>x.order_id===warehouse);
    config.winnerToken = winner; config.winnerId = user.member_id;
    assert.notEqual((await m('/order/cancel_grab',{order_id:warehouse},'POST',h5,winner)).code,1);
  });
  await check('INT-06','付款凭证待审、后台审核和跨用户凭证复用拦截',async()=>{
    fixtureImage=good(await upload(1,config.winnerToken),1).file_path;
    good(await m('/order/payment_voucher',{id:settlement.id,payment_voucher:fixtureImage},'POST',h5,config.winnerToken),1);
    const pending=dbState().users.find(u=>u.member_id===config.winnerId).warehouse.find(x=>x.order_id===warehouse);
    assert.equal(pending.pay_status,'审核中');
    assert.notEqual((await m('/order/getPayOrderStatus',{order_id:warehouse},'POST',h5,config.winnerToken)).code,1);
    assert.notEqual((await m('/order/upOrderStatus',{order_id:warehouse},'POST',h5,config.winnerToken)).code,1);
    good(await a('/settlements/'+settlement.id,{action:'approve'},'PUT'),200);
    good(await a('/settlements/'+settlement.id,{action:'approve'},'PUT'),200);
    assert.equal(dbState().users.find(u=>u.member_id===config.winnerId).warehouse.find(x=>x.order_id===warehouse).pay_status,'结算完毕');
    assert.equal(good(await m('/order/getPayOrderStatus',{order_id:warehouse},'POST',h5,config.winnerToken),1),1);
    assert.notEqual((await m('/recharge/toOrder',{custom_price:50,pay_image:fixtureImage})).code,1);
    assert.equal(Number(database(config,'SELECT COUNT(*) FROM tea_voucher_claim;').trim()),1);
  });
  await check('INT-07','充值待审、驳回不入账、通过幂等和账户流水',async()=>{
    const image2=good(await upload(2),1).file_path;
    const before=Number(dbState().users[0].score);
    recharge=good(await m('/recharge/toOrder',{custom_price:55,pay_image:image2}),1);
    assert.equal(Number(dbState().users[0].score),before);
    good(await request(java,'/admin/tea/recharges/'+recharge,{action:'approve'},{admin:roles.tea_finance},'PUT'),200);
    good(await a('/recharges/'+recharge,{action:'approve'},'PUT'),200);
    assert.equal(Number(dbState().users[0].score),before+55);
    const decimal=good(await m('/recharge/toOrder',{custom_price:'0.29',pay_image:good(await upload(6),1).file_path}),1);
    assert.equal(dbState().users[0].recharges.find(x=>x.order_id===decimal).price,'0.29');
    assert.equal(dbState().users[0].ledger.filter(x=>x.order_id===recharge).length,1);
    good(await upload(2,other),1);
    assert.notEqual((await m('/recharge/toOrder',{custom_price:55,pay_image:image2},'POST',second,other)).code,1);
    const rejected=good(await m('/recharge/toOrder',{custom_price:66,pay_image:good(await upload(3),1).file_path}),1);
    good(await a('/recharges/'+rejected,{action:'reject',remark:'未核实到账'},'PUT'),200);
    assert.equal(Number(dbState().users[0].score),before+55);
  });
  await check('INT-08','寄售仅限寄售时段、默认上浮 3% 价格直接上架且失败无写入',async()=>{
    const nowMinutes=(()=>{const [h,min]=new Date(Date.now()+8*3600000).toISOString().slice(11,16).split(':').map(Number);return h*60+min;})();
    const hm=value=>String(Math.floor(value/60)).padStart(2,'0')+':'+String(value%60).padStart(2,'0');
    // A one-hour window that does not contain the current Beijing time.
    const closedStart=nowMinutes<1200?nowMinutes+60:nowMinutes-120;
    good(await a('/content/business',{value:{consignStart:hm(closedStart),consignEnd:hm(closedStart+60)}},'PUT'),200);
    const revision=database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
    const closed=await m('/order/toServiceChargeWithVoucher',{order_id:warehouse,use_amount:0,use_coupon:0},'POST',h5,config.winnerToken);
    assert.equal(closed.code,0); assert.match(closed.msg,/寄售时间/);
    assert.equal(database(config,'SELECT revision FROM tea_business_state WHERE id=1;'),revision);
    good(await a('/content/business',{value:{consignStart:'00:00',consignEnd:'23:59'}},'PUT'),200);
    const item=()=>dbState().users.find(u=>u.member_id===config.winnerId).warehouse.find(x=>x.order_id===warehouse);
    const paid=Number(item().pay_price);
    good(await m('/order/toServiceChargeWithVoucher',{order_id:warehouse,use_amount:0,use_coupon:0},'POST',h5,config.winnerToken),1);
    assert.equal(item().pay_status,'寄卖中');
    assert.equal(item().sale_price,(Math.floor(paid*103+1e-6)/100).toFixed(2));
  });
  await check('INT-09','公告与商城内容后台修改、H5重读、脚本内容拦截',async()=>{
    const notice=good(await request(java,'/admin/tea/notices',{noticeTitle:'三端公告验收',noticeContent:'已从若依保存至 MySQL',status:'0'},{admin:roles.tea_content}),200);
    assert.ok(good(await m('/notice/getNotice',undefined,'GET',second),1).some(x=>x.id===notice.noticeId));
    good(await a('/content/banners',{value:[{id:1,image:'/h5/static/catalog/a5134ccd3282cce5.jpg',title:'后台轮播验收'}]},'PUT'),200);
    assert.equal(good(await m('/index/getBannerList'),1)[0].title,'后台轮播验收');
    assert.notEqual((await a('/content/banners',{value:[{image:'javascript:alert(1)'}]},'PUT')).code,200);
  });
  await check('INT-16','积分支付、重复扣款防护、真实收货评价与跨用户隔离',async()=>{
    const revenueBefore=good(await a('/dashboard'),200).metrics.revenue;
    const created=good(await m('/order/order/buyNow',{goods_id:product.goods_id,goods_num:1,pay_type:4,order_type:5,request_id:'points-checkout-001'}),1);
    const before=Number(dbState().users[0].score);
    assert.notEqual((await m('/pay/balancePay',{trade_no:created.order_sn,pay_password:'246810'})).code,1);
    assert.notEqual((await m('/pay/pointsPayment',{trade_no:created.order_sn})).code,1);
    good(await m('/pay/pointsPayment',{trade_no:created.order_sn,pay_password:'246810'}),1);
    good(await m('/pay/pointsPayment',{trade_no:created.order_sn,pay_password:'246810'}),1);
    assert.equal(Number(dbState().users[0].score),before-50);
    const dashboard=good(await a('/dashboard'),200);
    assert.equal(dashboard.metrics.revenue,revenueBefore);
    assert.equal(dashboard.topProducts.find(p=>p.goodsId===product.goods_id).amount,'100.00');
    assert.equal(dashboard.topProducts.find(p=>p.goodsId===product.goods_id).sales,3);
    assert.equal(dbState().users[0].orders.find(o=>o.order_id===created.order_id).status,'forwarding');
    assert.notEqual((await m('/order/receipt',{order_id:created.order_id})).code,1);
    good(await a('/orders/'+created.order_id,{status:'received',expressCompany:'隔离测试承运商',expressNo:'POINTS'+created.order_id},'PUT'),200);
    assert.notEqual((await m('/order/receipt',{order_id:created.order_id},'POST',second,other)).code,1);
    good(await m('/order/receipt',{order_id:created.order_id}),1);
    good(await m('/order/evaluation',{order_id:created.order_id,content_text:'隔离验收真实评价'}),1);
    assert.notEqual((await m('/order/evaluation',{order_id:created.order_id,content_text:'重复评价'})).code,1);
    const detail=good(await m('/order/detail',{order_id:created.order_id},'POST',second),1);
    assert.equal(detail.order.status,'completed');
    assert.equal(dbState().users[0].reviews.filter(r=>r.order_id===created.order_id).length,1);
    await check('INT-25','订单重试边界：无效/跨用户地址不替换，重复收货不回退已评价订单',async()=>{
      const regions=good(await m('/region/getAllList'),1),province=regions[0],city=province.city[0],region=city.region[0];
      const foreign=good(await m('/address/add',{name:'另一会员地址',phone:'13800138002',detail:'仅用于隔离验收',region:[province.id,city.id,region.id].join(',')},'POST',second,other),1);
      const before=dbState(),revision=database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
      for(const route of ['/order/order/buyNow','/order/originalPricePurchase']) for(const address_id of [999999,foreign.address_id]) for(const pay_type of [2,4]) {
        const response=await m(route,{goods_id:product.goods_id,goods_num:1,pay_type,address_id},'POST',second);
        assert.equal(response.code,0);assert.match(response.msg,/地址/);
      }
      for(const route of ['/order/receipt','/member/order/receipt']) {
        const pair=await Promise.all([m(route,{order_id:created.order_id}),m(route,{order_id:created.order_id},'POST',second)]);
        pair.forEach(r=>good(r,1));
        assert.equal((await m(route,{order_id:created.order_id},'POST',second,other)).code,0);
      }
      assert.deepEqual(dbState(),before);
      assert.equal(database(config,'SELECT revision FROM tea_business_state WHERE id=1;'),revision);
      assert.equal(good(await m('/order/detail',{order_id:created.order_id},'POST',second),1).order.status,'completed');
      assert.equal(good(await a('/orders'),200).rows.find(x=>x.orderId===created.order_id).status,'completed');
    });
  });
  await check('INT-22','非支付商品分类/描述/公告/公开评价：配置、精确查找、零演示回落',async()=>{
    const category={category_id:31,name:'验收红茶'};
    good(await request(java,'/admin/tea/content/categories',{value:[category]},{admin:roles.tea_content},'PUT'),200);
    const item=good(await a('/products',{goods_name:'分类核验商品',price:10,stock:1,category_id:31,description:'后台填写的商品描述'}),200);
    assert.deepEqual(good(await m('/goods/getCategory',undefined,'GET',second),1).categoryList.map(c=>c.category_id),[0,31]);
    assert.deepEqual(good(await m('/category/getCategoryGoodsList',{category_id:31},'POST',second),1).list.data.map(x=>x.goods_id),[item.goods_id]);
    assert.equal(good(await m('/category/getCategoryGoodsList',{category_id:999}),1).list.total,0);
    assert.equal(good(await m('/shopgoods/getDetails',{goods_id:item.goods_id}),1).detail.content,'后台填写的商品描述');
    assert.equal(dbState().catalog.find(x=>x.goods_id===item.goods_id).category_id,31);
    assert.notEqual((await a('/content/categories',{value:[]},'PUT')).code,200);
    assert.notEqual((await m('/notice/getNoticeInfo',{id:999999})).code,1);
    const reviews=good(await m('/goods/getGoodsEvaluation',{goods_id:product.goods_id},'POST',h5,''),1).list;
    assert.equal(reviews.total,1); assert.equal(reviews.data[0].content_text,'隔离验收真实评价');
    good(await a('/products/'+item.goods_id,undefined,'DELETE'),200);
    good(await a('/content/categories',{value:[]},'PUT'),200);
  });
  await check('INT-17','投诉页面数据契约、归属校验、后台处理及结果重读',async()=>{
    const detail=good(await m('/order/getOrderReport',{order_id:order}),1);
    assert.ok(detail.order_no); assert.equal(detail.goods_name,'三端同步茶品'); assert.ok(detail.goods_thumb);
    assert.notEqual((await m('/order/getOrderReport',{order_id:order},'POST',second,other)).code,1);
    assert.notEqual((await m('/order/toOrderReport',{order_id:order,content_text:''})).code,1);
    good(await m('/order/toOrderReport',{order_id:order,content_text:'隔离测试投诉'}),1);
    const report=dbState().users[0].reports.find(x=>Number(x.order_id)===order);
    good(await request(java,'/admin/tea/reports/'+report.id,{action:'resolve',remark:'已核实并处理'},{admin:roles.tea_warehouse},'PUT'),200);
    const reread=good(await m('/order/getOrderReport',{order_id:order},'POST',second),1);
    assert.equal(reread.reports[0].status,'已处理'); assert.equal(reread.reports[0].remark,'已核实并处理');
  });
  await check('INT-19','转赠精度、跨入口并发幂等、持久化双边流水及重试',async()=>{
    const before=dbState().users.map(u=>Number(u.e_card_number));
    const params={mobile:'13800138002',price:'0.29',request_id:'integration-transfer-001',pay_password:'246810'};
    const [first,secondResult]=await Promise.all([m('/member/toTransfer',params),m('/member/toTransfer',params,'POST',second)]);
    const id=good(first,1).transfer_id; assert.equal(good(secondResult,1).transfer_id,id);
    const state=dbState();
    assert.equal(Number(state.users[0].e_card_number),Number((before[0]-.29).toFixed(2)));
    assert.equal(Number(state.users[1].e_card_number),Number((before[1]+.29).toFixed(2)));
    for(const user of state.users.slice(0,2)) assert.equal(user.ledger.filter(x=>x.order_id===id).length,1);
    const fresh=good(await m('/member/accountLogin',{phone:'13800138001',password:'tea-local-2026'}),1).token;
    assert.equal(good(await m('/member/toTransfer',{...params,pay_password:undefined},'POST',second,fresh),1).transfer_id,id);
    assert.notEqual((await m('/member/toTransfer',{...params,price:'0.001',request_id:'integration-transfer-002'})).code,1);
    assert.notEqual((await m('/member/toTransfer',{...params,price:'1.00'})).code,1);
    assert.deepEqual(dbState().users.map(u=>u.e_card_number),state.users.map(u=>u.e_card_number));
  });
  await check('INT-10','管理模块真实查询、停用会话立即失效、外部业务不假成功',async()=>{
    for (const resource of ['dashboard','products','orders','auctions','members','notices','warehouse','settlements','fees','recharges','withdrawals','reports','ledger','bids','content']) good(await a('/'+resource),200);
    good(await a('/members/2',{status:'1'},'PUT'),200);
    assert.equal((await m('/member/getMemberDetails',undefined,'GET',second,other)).code,-500);
    good(await a('/members/2',{status:'0'},'PUT'),200);
    for (const route of ['/v1/sms','/dg/openAccount','/demo/pay','/usdt/addvoucher','/order/upOrderStatus']) assert.notEqual((await m(route,{})).code,1);
    assert.ok(Number(database(config,"SELECT COUNT(*) FROM tea_business_audit WHERE actor='member:1';"))>0);
  });
  await check('INT-14','会员交易密码失败限速不被重新登录绕过',async()=>{
    for(let i=0;i<5;i++) assert.notEqual((await m('/member/verificationPayPassword',{pwd:'000000'})).code,1);
    const limited=await m('/member/verificationPayPassword',{pwd:'246810'});
    assert.equal(limited.code,0); assert.match(limited.msg,/十分钟/);
    const freshToken=good(await m('/member/accountLogin',{phone:'13800138001',password:'tea-local-2026'}),1).token;
    assert.match((await m('/member/verificationPayPassword',{pwd:'246810'},'POST',second,freshToken)).msg,/十分钟/);
  });
  await check('INT-26','自助注册、抢购时段/限单/燃料费/利润、暂停账号、收款管理、对账报表与权限（真实 Java + MySQL）',async()=>{
    const PAY='246810', PASSWORD='local-password-2026';
    const rules=value=>a('/content/business',{value},'PUT');
    const revision=()=>database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
    const user=id=>dbState().users.find(x=>x.member_id===id);
    const cstMinutes=()=>{const [h,min]=new Date(Date.now()+8*3600000).toISOString().slice(11,16).split(':').map(Number);return h*60+min;};
    const hm=value=>String(Math.floor(value/60)).padStart(2,'0')+':'+String(value%60).padStart(2,'0');
    good(await rules({grabStart:'00:00',grabEnd:'23:59',consignStart:'00:00',consignEnd:'23:59',grabLimit:2,registerDailyLimit:300}),200);
    // 1. Self-registration through Java: no SMS, public inviter lookup, bad input rejected, state committed to MySQL.
    const inviter=good(await a('/members',{phone:'13900001001',nickName:'上家验收',password:PASSWORD,payPassword:PAY}),200);
    const inviterCode=user(inviter.memberId).invitation_code;
    assert.equal(good(await m('/index/getStoreInfo',undefined,'GET',h5,''),1).register_verify,'0');
    assert.equal(good(await m('/member/getInvitationCode?member_id='+inviter.memberId,undefined,'GET',h5,''),1),inviterCode);
    for(const bad of [{mobile:'13900001002',password:'short'},{mobile:'13900001002',password:PASSWORD,invi_code:'NOPE'},{mobile:'139',password:PASSWORD}]) assert.equal((await m('/member/registerAnAccount',bad,'POST',h5,'')).code,0);
    const before=Number(revision());
    const signup=good(await m('/member/registerAnAccount',{mobile:'13900001002',nickname:'自助注册会员',password:PASSWORD,rest_password:PASSWORD,invi_code:inviterCode},'POST',h5,''),1);
    assert.ok(signup.token); assert.ok(Number(revision())>before);
    const member=dbState().users.find(x=>x.phone==='13900001002'), S=member.member_id;
    assert.equal(member.parentId,inviter.memberId); assert.equal(member.amount,'0.00'); assert.equal(member.e_card_number,'0.00'); assert.equal(member.score,'0.00');
    assert.equal((await m('/member/registerAnAccount',{mobile:'13900001002',password:PASSWORD},'POST',h5,'')).code,0);
    assert.equal(good(await m('/member/getMemberDetails',undefined,'GET',h5,signup.token),1).phone,'13900001002');
    good(await m('/member/changePayPassword',{password:PASSWORD,pay_password:PAY},'POST',h5,signup.token),1);
    // 2. Registration cap is configurable and 0 closes it.
    good(await rules({registerDailyLimit:0}),200);
    assert.match((await m('/member/registerAnAccount',{mobile:'13900001009',password:PASSWORD},'POST',h5,'')).msg,/暂未开放/);
    good(await rules({registerDailyLimit:300}),200);
    // 3. Grab needs an approved identity, then fuel; both come from the real admin endpoints.
    const product=good(await a('/products',{goods_name:'抢购联调茶',price:1000,stock:10}),200);
    const grab=(tk,body={goods_id:product.goods_id})=>m('/order/toAddOrder',body,'POST',h5,tk);
    let denied=await grab(signup.token); assert.equal(denied.code,0); assert.match(denied.msg,/请提交身份资料供人工核验/);
    good(await m('/certification/addRealName',{certification_name:'自助会员',id_last_four:'123X'},'POST',h5,signup.token),1);
    assert.match((await grab(signup.token)).msg,/待人工审核/);
    good(await a('/members/'+S,{action:'verify',remark:'联调线下核验'},'PUT'),200);
    denied=await grab(signup.token); assert.equal(denied.code,0); assert.match(denied.msg,/燃料费余额不足/);
    for(const bad of ['0','-5','12.345','abc','']) assert.notEqual((await a('/members/'+S,{action:'rechargeFuel',amount:bad},'PUT')).code,200);
    assert.equal(user(S).e_card_number,'0.00');
    good(await a('/members/'+S,{action:'rechargeFuel',amount:'100.00',remark:'联调线下收款'},'PUT'),200);
    assert.equal(user(S).e_card_number,'100.00');
    // 4. Two grabs per day, 2% fuel each; cancelling refunds and frees one slot.
    const first=good(await grab(signup.token),1).order_id, second1=good(await grab(signup.token),1).order_id;
    const limited=await grab(signup.token); assert.equal(limited.code,0); assert.equal(limited.msg,'每人每次只能抢两单');
    assert.equal(user(S).e_card_number,'60.00');
    good(await m('/order/cancel_grab',{order_id:second1},'POST',h5,signup.token),1);
    assert.equal(user(S).e_card_number,'80.00');
    good(await grab(signup.token),1);
    assert.equal(user(S).e_card_number,'60.00');
    // 5. Windows come from the configuration endpoint: invalid schedules rejected, closed window blocks without writing.
    assert.notEqual((await rules({grabStart:'9:30'})).code,200);
    assert.notEqual((await rules({grabStart:'10:00',grabEnd:'09:00'})).code,200);
    const closedStart=cstMinutes()<1200?cstMinutes()+60:cstMinutes()-120;
    good(await rules({grabStart:hm(closedStart),grabEnd:hm(closedStart+5)}),200);
    assert.equal(good(await m('/goods/getLootList',undefined,'GET',h5,signup.token),1).list[0].time_list.time.start_end_time,hm(closedStart));
    const frozen=revision(); denied=await grab(signup.token); assert.equal(denied.code,0); assert.match(denied.msg,/抢购/);
    assert.equal(revision(),frozen);
    good(await rules({grabStart:'00:00',grabEnd:'23:59'}),200);
    // 6. Seller consigns at +3%; a second verified member grabs it: fuel 2% from the buyer, 1% profit to the seller, no balance moves.
    const voucher=good(await upload(61,signup.token),1).file_path;
    good(await a('/recharges/'+good(await m('/recharge/toOrder',{asset:'amount',custom_price:2000,pay_image:voucher},'POST',h5,signup.token),1),{action:'approve'},'PUT'),200);
    good(await m('/warehouse/pay',{order_id:first,pay_password:PAY},'POST',h5,signup.token),1);
    assert.equal(user(S).amount,'1000.00');
    good(await m('/warehouse/listing',{order_id:first},'POST',h5,signup.token),1);
    assert.equal(user(S).warehouse.find(x=>x.order_id===first).sale_price,'1030.00');
    const buyerMember=good(await a('/members',{phone:'13900001003',nickName:'买方联调',password:PASSWORD,payPassword:PAY}),200), B=buyerMember.memberId;
    const buyerToken=good(await m('/member/accountLogin',{phone:'13900001003',password:PASSWORD},'POST',h5,''),1).token;
    good(await m('/certification/addRealName',{certification_name:'买方联调',id_last_four:'4567'},'POST',h5,buyerToken),1);
    good(await a('/members/'+B,{action:'verify',remark:'联调线下核验'},'PUT'),200);
    good(await a('/members/'+B,{action:'rechargeFuel',amount:'100.00'},'PUT'),200);
    assert.equal(good(await m('/goods/getPurchaseNum',{order_id:first,goods_id:product.goods_id},'POST',h5,buyerToken),1).source,'consignment');
    const pool=good(await m('/loodgoods/getCategoryGoodsList',{specialarea_id:'grab'},'POST',h5,buyerToken),1).list.data;
    assert.ok(pool.some(x=>x.order_id===first&&x.goods_price==='1030.00'));
    const bought=good(await grab(buyerToken,{order_id:first,goods_id:product.goods_id}),1);
    assert.equal(user(B).e_card_number,'79.40'); assert.equal(user(S).score,'10.30'); assert.equal(user(S).profits[0].amount,'10.30');
    assert.equal(user(S).warehouse.find(x=>x.order_id===first).pay_status,'已售出');
    assert.equal(user(B).warehouse.find(x=>x.order_id===bought.order_id).pay_price,'1030.00');
    assert.equal(user(S).amount,'1000.00'); assert.equal(user(B).amount,'0.00');
    assert.equal(good(await m('/member/getMemberDetails',undefined,'GET',h5,buyerToken),1).e_card_number,'79.40');
    // 7. Buyer's one-click consignment (+3% again) and the administrator's one-click for everyone else.
    assert.equal(good(await m('/warehouse/consignAll',{},'POST',h5,buyerToken),1).count,1);
    assert.equal(user(B).warehouse.find(x=>x.order_id===bought.order_id).sale_price,'1060.90');
    const everyone=good(await a('/warehouse/consign-all',{},'PUT'),200);
    assert.ok(Number.isInteger(everyone.items) && Array.isArray(everyone.skipped));
    // 8. Daily statement: diff = sell - buy, actual = diff - 2% of buy.
    const today=new Date(Date.now()+8*3600000).toISOString().slice(0,10);
    const report=good(await a('/ledger?view=statement&date='+today),200);
    const rowS=report.rows.find(x=>x.memberId===S), rowB=report.rows.find(x=>x.memberId===B);
    assert.deepEqual([rowS.buy,rowS.sell,rowS.diff,rowS.fuel,rowS.actual],[2000,1030,-970,40,-1010]);
    assert.deepEqual([rowB.buy,rowB.sell,rowB.diff,rowB.fuel,rowB.actual],[1030,0,-1030,20.6,-1050.6]);
    assert.equal(report.totals.actual,Math.round((report.rows.reduce((sum,r)=>sum+Math.round(r.actual*100),0)))/100);
    // 9. Pause kills sessions at once; resume restores login.
    good(await a('/members/'+S,{action:'pause',remark:'联调暂停'},'PUT'),200);
    assert.equal((await m('/member/getMemberDetails',undefined,'GET',h5,signup.token)).code,-500);
    const paused=await m('/member/accountLogin',{phone:'13900001002',password:PASSWORD},'POST',h5,''); assert.equal(paused.code,0); assert.match(paused.msg,/暂停使用/);
    assert.equal((await m('/member/getInvitationCode?member_id='+S,undefined,'GET',h5,'')).code,0);
    good(await a('/members/'+S,{action:'resume'},'PUT'),200);
    const sellerToken=good(await m('/member/accountLogin',{phone:'13900001002',password:PASSWORD},'POST',h5,''),1).token;
    // 10. Receiving accounts: bank, WeChat and Alipay behind the transaction password; QR images must be the member's own real uploads.
    const bank={bank:'工商银行',bank_name:'自助会员',bank_card:'6222000011112222',mobile:'13900001002'};
    assert.equal((await m('/member/setPay',{...bank},'POST',h5,sellerToken)).code,0);
    assert.equal((await m('/member/setPay',{...bank,pay_password:'000000'},'POST',h5,sellerToken)).code,0);
    good(await m('/member/setPay',{...bank,pay_password:PAY},'POST',h5,sellerToken),1);
    const wxImage=good(await upload(62,sellerToken),1).file_path;
    assert.equal((await m('/member/setPay',{wx_name:'自助会员',wx_account:'wx-account',wx_image:'data:image/png;base64,AQIDBA==',pay_password:PAY},'POST',h5,sellerToken)).code,0);
    good(await m('/member/setPay',{wx_name:'自助会员',wx_account:'wx-account',wx_image:wxImage,pay_password:PAY},'POST',h5,sellerToken),1);
    good(await m('/member/setPay',{zfb_name:'自助会员',zfb_account:'13900001002',zfb_image:good(await upload(63,sellerToken),1).file_path,pay_password:PAY},'POST',h5,sellerToken),1);
    const info=good(await m('/member/getMemberDetails',undefined,'GET',h5,sellerToken),1).pay_info;
    assert.equal(info.bank_card,'6222000011112222'); assert.equal(info.wx_account,'wx-account'); assert.equal(info.zfb_account,'13900001002'); assert.equal(info.wx_image,wxImage);
    assert.equal(user(S).payment.bank,'工商银行');
    // 11. The new administrator actions use the existing RuoYi permission checks: the read-only role cannot use them.
    for(const [route,data] of [['/admin/tea/members/'+S,{action:'rechargeFuel',amount:'1.00'}],['/admin/tea/members/'+S,{action:'pause'}],['/admin/tea/warehouse/consign-all',{}]])
      assert.equal((await request(java,route,data,{admin:viewer},'PUT')).httpStatus,403);
    assert.equal(user(S).status,'0'); assert.equal(user(S).e_card_number,'60.00');
    assert.equal((await request(java,'/admin/tea/ledger?view=statement&date='+today,undefined,{admin:viewer})).code,200);
    // 12. Nothing sensitive leaks through the member list.
    assert.ok(!JSON.stringify(good(await a('/members'),200)).includes('passwordHash'));
  });
  const snapshot = dbState();
  delete config.winnerToken; delete config.winnerId;
  await fs.writeFile(path.join(config.dir,'integration-results.json'),JSON.stringify(results,null,2));
  await fs.writeFile(path.join(config.dir,'persistence-summary.json'),JSON.stringify({ database:config.database,revision:database(config,'SELECT revision FROM tea_business_state WHERE id=1;').trim(),members:snapshot.users.length,products:snapshot.catalog.length,orders:snapshot.users.reduce((n,u)=>n+u.orders.length,0),auctions:snapshot.auctions.length,settlements:snapshot.users.reduce((n,u)=>n+u.settlements.length,0),auditRows:Number(database(config,'SELECT COUNT(*) FROM tea_business_audit;'))},null,2));
  return results;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const config=await prepare({fresh:true,test:true});
  const startedAt=new Date().toISOString();
  const latest=path.join(root,'.local/shared/latest-verification.json');
  await fs.writeFile(latest,JSON.stringify({evidence:config.dir,startedAt,localIntegration:'未测试',releaseReady:false},null,2));
  let stack;
  try {
    await captureSource(config);
    await build(config,{tests:true});
    stack=await start(config);
    const results=await integration(config);
    const revision=database(config,'SELECT revision FROM tea_business_state WHERE id=1;');
    stack.processes.engine.kill('SIGTERM');
    await new Promise(resolve=>stack.processes.engine.once('exit',resolve));
    const failed=await fetch('http://127.0.0.1:'+config.ports.java+'/app/member/accountLogin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:'13800138001',password:'tea-local-2026'})});
    assert.equal(failed.status,503);
    assert.equal(database(config,'SELECT revision FROM tea_business_state WHERE id=1;'),revision);
    results.push({id:'INT-13',title:'私有业务服务中断返回失败且 MySQL 无部分提交',status:'已实测通过',finishedAt:new Date().toISOString()});
    await stack.stop();
    stack=await start(config);
    const response=await fetch('http://127.0.0.1:'+config.ports.java+'/app/category/getCategoryGoodsList');
    const data=await response.json();
    assert.ok(data.data.list.data.some(x=>x.goods_name==='三端同步茶品'));
    results.push({id:'INT-11',title:'全部服务重启后从同一 MySQL 恢复商品与业务记录',status:'已实测通过',finishedAt:new Date().toISOString()});
    await verifyRestore(config);
    results.push({id:'INT-15',title:'隔离数据库备份恢复：业务内容、审计、凭证和角色分配一致',status:'已实测通过',finishedAt:new Date().toISOString()});
    await fs.writeFile(path.join(config.dir,'integration-results.json'),JSON.stringify(results,null,2));
    const scope=releaseScope(process.argv.includes('--exclude-payment'));
    await fs.writeFile(path.join(root,'.local/shared/latest-verification.json'),JSON.stringify({evidence:config.dir,localIntegration:'已实测通过',releaseReady:false,releaseBlockers:scope.blockers,...scope},null,2));
    console.log('Local shared integration passed. Release gate: BLOCKED (see report). Evidence: '+config.dir);
    await fs.writeFile(path.join(config.dir,'run-result.json'),JSON.stringify({command:process.argv.includes('--exclude-payment')?'npm run verify:nonpay':'npm run verify:shared'+(process.argv.includes('--release')?' -- --release':''),startedAt,finishedAt:new Date().toISOString(),exitCode:process.argv.includes('--release')?1:0,localIntegration:'已实测通过',releaseReady:false,reason:'必要业务、第三方环境和完整页面验收尚未完成',integrationGroups:results.length,...scope},null,2));
    if (process.argv.includes('--release')) process.exitCode=1;
  } catch(error) {
    console.error(error); process.exitCode=1;
    const failed={evidence:config.dir,startedAt,finishedAt:new Date().toISOString(),exitCode:1,localIntegration:'失败',releaseReady:false,error:error.message};
    await fs.writeFile(latest,JSON.stringify(failed,null,2));
    await fs.writeFile(path.join(config.dir,'run-result.json'),JSON.stringify(failed,null,2));
  }
  finally { if(stack) await stack.stop(); }
}
