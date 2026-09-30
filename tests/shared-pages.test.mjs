import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import checkoutModules from '../src/pages/pages-classify-submit.js';
import transferModules from '../src/pages/pages-personal-transfer.js';
import applicationModules from '../src/runtime/application.js';
import shopOrderModules from '../src/pages/pages-order-shoporder.js';
import shopDetailModules from '../src/pages/pages-order-shordetail.js';
import pointsOrderModules from '../src/pages/pages-integral-jforder.js';
import pointsDetailModules from '../src/pages/pages-integral-jfdetail.js';
import settingsModules from '../src/pages/pages-personal-set.js';
import passwordModules from '../src/pages/pages-personal-passwordtow.js';
import lootListModules from '../src/pages/pages-loot-listProduct.js';
import lootDetailModules from '../src/pages/pages-loot-lootdet.js';
import lootModules from '../src/pages/pages-loot-loot.js';

function component(modules,key) {
  const exports={};
  modules[key]({},exports,id=>id==='4ea4' ? value=>({default:value}) : {});
  return exports.default;
}

test('H5 component mock: resume points order uses original order and password dialog, never creates another order',async()=>{
  const page=component(checkoutModules,'16fc');
  const requests=[];
  const vm={...page.data(),...page.methods,existingOrderId:'123',request:async(route,p)=>{
    requests.push([route,p]);
    return {data:{code:1,data:route==='/order/detail'?{order:{order_id:123,order_sn:'T123',order_type:5,status:'payment',address:{name:'验收'},goods:[{image:{file_path:'/test.jpg'},goods_price:'0.00',score_price:'50.00'}],order_total_score_price:'50.00'}}:1}};
  },$tip:message=>assert.fail(message)};
  await vm.getinit();
  assert.equal(vm.trade_no,'T123'); assert.equal(vm.data.goods_list[0].product_types,3);
  assert.equal(vm.data.order_total_score_price,'50.00');
  assert.equal(vm.paymentLabel(),'支付 50.00 积分');
  vm.pointsPending=false; vm.data.order_pay_price='20.00';
  assert.equal(vm.paymentLabel(),'付款￥20.00');
  vm.sumbitinfo(); await Promise.resolve();
  assert.equal(vm.zhifuflag,true);
  assert.deepEqual(requests.map(x=>x[0]),['/order/detail','/member/getIsPayPassword']);
});

test('H5 request mock: ordinary requests do not close caller loading and preserve transport errors',async()=>{
  const prior=globalThis.uni; const exported={}; let hidden=0; let result=[null,{data:{code:1}}];
  const transport=new Error('offline');
  globalThis.uni={getStorageSync:()=>'',hideLoading:()=>hidden++,stopPullDownRefresh:()=>{},request:()=>result instanceof Error ? Promise.reject(result) : Promise.resolve(result)};
  applicationModules['6879']({},exported,id=>id==='4ea4' ? value=>({default:value}) : id==='3835' ? value=>value : {url:'http://local-test/app'});
  try {
    assert.equal((await exported.default('/order/detail')).data.code,1);
    assert.equal(hidden,0);
    result=[transport,null]; await assert.rejects(exported.default('/order/detail'),e=>e===transport);
    result=transport; await assert.rejects(exported.default('/order/detail'),e=>e===transport);
    result=[null,{data:'Not found'}]; await assert.rejects(exported.default('/order/remindShipment'),/响应格式/);
    assert.equal(hidden,0);
  } finally { globalThis.uni=prior; }
});

test('H5 remote adapter mock: shipment reminder uses Java for fetch and XHR, assets and external URLs stay unchanged',async()=>{
  const source=(await fs.readFile(new URL('../src/browser/runtime.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');
  const calls=[]; class XHR { open(method,url){calls.push(url);} }
  const context={URL,Request,XMLHttpRequest:XHR,endpointMap:{},location:{href:'http://127.0.0.1:5180/',origin:'http://127.0.0.1:5180'},document:{currentScript:{src:'http://127.0.0.1:5180/h5/static/demo/runtime.js'}},window:{__H5_API_BASE__:'http://127.0.0.1:8080/app',fetch:url=>{calls.push(url);return Promise.resolve();}}};
  vm.runInNewContext(source,context);
  await context.window.fetch('/order/remindShipment');
  new XHR().open('POST','/order/remindShipment?order_id=123');
  await context.window.fetch('/h5/static/logo.png');
  await context.window.fetch('https://external.invalid/order/remindShipment');
  await context.window.fetch('/member/logout');
  assert.deepEqual(calls,['http://127.0.0.1:8080/app/order/remindShipment','http://127.0.0.1:8080/app/order/remindShipment?order_id=123','/h5/static/logo.png','https://external.invalid/order/remindShipment','http://127.0.0.1:8080/app/member/logout']);
});

test('H5 account mock: logout waits for server revocation; password change clears credentials and returns to login',async()=>{
  const priorWindow=globalThis.window,priorUni=globalThis.uni;
  globalThis.window={__H5_SERVER_MODE__:'ruoyi'};
  try {
    const events=[]; globalThis.uni={removeStorageSync:()=>events.push('clear'),reLaunch:()=>events.push('login')};
    const settings=component(settingsModules,'a3bd'); let failure=true;
    const vm={...settings.data(),...settings.methods,$tip:()=>events.push('error'),request:async route=>{assert.equal(route,'/member/logout');if(failure)throw Error('offline');return {data:{code:1}};}};
    await vm.outline(); assert.deepEqual(events,['error']); assert.equal(vm.logoutPending,false);
    failure=false;events.length=0;await vm.outline();assert.deepEqual(events,['clear','login']);
    const password=component(passwordModules,'ae1e');events.length=0;
    const form={...password.data(),...password.methods,old_password:'local-old',password:'local-new',real_pwd:'local-new',$tip:()=>{},request:async(route,p)=>{assert.equal(route,'/member/editPwd');assert.equal(p.old_password,'local-old');return {data:{code:1,msg:'已修改'}};}};
    await form.saveBtn(); assert.deepEqual(events,['clear','login']); assert.equal(form.old_password,''); assert.equal(form.password,'');assert.equal(form.saving,false);
  } finally {globalThis.window=priorWindow;globalThis.uni=priorUni;}
});

test('H5 checkout mock: loading closes exactly once before toast for success, business failure and transport failure',async()=>{
  const prior=globalThis.uni, priorTimeout=globalThis.setTimeout;
  try {
    globalThis.setTimeout=callback=>{queueMicrotask(callback);return 0;};
    for(const mode of ['success','createFailure','payFailure','offline']) {
      const page=component(checkoutModules,'16fc');const events=[];let open=false;
      globalThis.uni={getStorageSync:()=>'',showLoading:()=>{open=true;events.push('show');},hideLoading:()=>{assert.equal(open,true);open=false;events.push('hide');},redirectTo:()=>{}};
      const instance={...page.data(),...page.methods,id:1,goods_num:1,choosenum:2,data:{exist_address:true,order_pay_price:'20.00',goods_list:[{product_types:2}]},$tip:()=>{assert.equal(open,false);events.push('tip');},request:async(route)=>{
        if(route==='/member/verificationPayPassword')return {data:{code:1,data:1}};
        if(route==='/order/order/buyNow')return mode==='createFailure'?{data:{code:0,msg:'库存不足'}}:{data:{code:1,data:{order_sn:'T123'}}};
        if(mode==='offline')throw new Error('offline');
        return {data:{code:mode==='payFailure'?0:1,msg:'支付结果'}};
      }};
      instance.payyemoney(); await new Promise(setImmediate); await new Promise(setImmediate);
      assert.deepEqual(events,['show','hide','tip'],mode);
    }
  } finally {globalThis.uni=prior;globalThis.setTimeout=priorTimeout;}
});

test('H5 component mock: all four shipment reminder entries submit the selected order and show server failures',async()=>{
  const prior=globalThis.window; globalThis.window={__H5_SERVER_MODE__:'ruoyi'};
  try {
    for(const modules of [shopOrderModules,shopDetailModules,pointsOrderModules,pointsDetailModules]) {
      const key=Object.keys(modules).find(k=>modules[k].toString().includes('fahuotixing: function'));
      const page=component(modules,key); const requests=[]; const tips=[];
      const vm={order_id:123,request:async(route,params)=>{requests.push({route,params});return {data:{code:0,msg:'仅已付款待发货订单可以提醒'}};},$tip:message=>tips.push(message)};
      await page.methods.fahuotixing.call(vm,123);
      assert.deepEqual(requests,[{route:'/order/remindShipment',params:{order_id:123}}]);
      assert.deepEqual(tips,['仅已付款待发货订单可以提醒']);
      vm.request=async()=>{throw new Error('offline');};
      await page.methods.fahuotixing.call(vm,123);
      assert.match(tips[1],/未确认/);
    }
  } finally { globalThis.window=prior; }
});

test('H5 component mock: transfer carries a stable retry key and password input does not log PIN',()=>{
  const page=component(transferModules,'cd36'); const vm=page.data();
  assert.match(vm.transferRequestId,/^[a-zA-Z0-9_-]{8,80}$/);
  const original=console.log; let logs=0;
  try { console.log=()=>logs++; page.methods.inputVal.call(vm,'246810'); }
  finally { console.log=original; }
  assert.equal(vm.numberpwd,'246810'); assert.equal(logs,0);
});

test('H5 auction mock: real auction action opens bidding detail, ordinary availability carries goods ID, disabled reservation stays closed',async()=>{
  const priorUni=globalThis.uni,priorWindow=globalThis.window;
  try {
    const navigations=[]; globalThis.uni={navigateTo:({url})=>navigations.push(url)}; globalThis.window={__H5_SERVER_MODE__:'ruoyi'};
    const listKey=Object.keys(lootListModules).find(k=>lootListModules[k].toString().includes('open_goDetail: function'));
    const list=component(lootListModules,listKey);
    const listVm={...list.data(),listData:[{goods_id:88,auction:{auctionId:9}}]};
    list.methods.open_goDetail.call(listVm,88,undefined,0,0);
    assert.deepEqual(navigations,['/pages/loot/lootdet?id=88']); assert.equal(listVm.payflag1,false);
    const detailKey=Object.keys(lootDetailModules).find(k=>lootDetailModules[k].toString().includes('auctionButtonText: function'));
    const detail=component(lootDetailModules,detailKey),calls=[];
    const vm={...detail.data(),id:88,$tip:message=>assert.fail(message),request:async(route,p)=>{calls.push([route,p]);return {data:{code:1}};}};
    detail.methods.paymoney.call(vm); await new Promise(setImmediate);
    assert.equal(vm.payflag,true); assert.deepEqual(calls.map(c=>c[1].goods_id),[88,88]);
    const lootKey=Object.keys(lootModules).find(k=>lootModules[k].toString().includes('yyshow: function'));
    const loot=component(lootModules,lootKey),tips=[];
    const reservation={...loot.data(),subscribe:{is_open:0,message:'未配置'},$tip:message=>tips.push(message)};
    loot.methods.yyshow.call(reservation,9); assert.equal(reservation.payflag,false); assert.deepEqual(tips,['未配置']);
  } finally {globalThis.uni=priorUni;globalThis.window=priorWindow;}
});

test('H5 auction render mock: saved image renders and ended winner can reach settlement, not sold-out branch',()=>{
  const page=component(lootDetailModules,'e9ec');
  const key=Object.keys(lootDetailModules).find(k=>lootDetailModules[k].toString().includes('t.detail.time_info.stock_num'));
  const exported={},require=()=>({}); require.d=(out,name,get)=>Object.defineProperty(out,name,{get});
  lootDetailModules[key]({},exported,require);
  function create(tag,data,children) { if(Array.isArray(data)){children=data;data={};} return {tag,data:data||{},children:children||[]}; }
  const vm={...page.data(),...page.methods,detail:{goods_name:'真实商品',goods_image:'/real.png',image:[{file_path:'/real.png'}],is_order:0,time_info:{new_time:200,start_time:50,end_time:1000,stock_num:1},auction:{status:'ended',isWinner:true}},$createElement:create,_self:{_c:create},_v:x=>x,_s:x=>String(x ?? ''),_e:()=>null,_l:(list,fn)=>Array.from(list||[]).map(fn)};
  const tree=exported.b.call(vm),nodes=[];
  const visit=x=>{if(Array.isArray(x))x.forEach(visit);else if(x&&typeof x==='object'){nodes.push(x);visit(x.children);}};visit(tree);
  assert.ok(nodes.some(n=>n.tag==='v-uni-image'&&n.data.attrs?.src==='/real.png'));
  assert.ok(nodes.some(n=>n.data.staticClass==='goqiang'&&n.data.on?.click&&n.children.includes('去结算')));
  assert.ok(nodes.some(n=>n.children.includes('拍卖已结束')));
  assert.ok(!nodes.some(n=>n.tag==='count-down'));
  vm.detail.image=[]; nodes.length=0;visit(exported.b.call(vm));
  assert.ok(nodes.some(n=>n.tag==='v-uni-image'&&n.data.attrs?.src==='/real.png'));
});

test('H5 settled auction mock: winner opens existing warehouse settlement without another write',()=>{
  const page=component(lootDetailModules,'e9ec'),prior=globalThis.uni,urls=[];
  globalThis.uni={reLaunch:({url})=>urls.push(url)};
  try {
    const vm={...page.data(),...page.methods,detail:{auction:{status:'settled',isWinner:true,settlementOrderId:123}},request:()=>assert.fail('must not create another settlement'),$tip:message=>assert.fail(message)};
    assert.equal(vm.auctionButtonText(),'查看结算单');vm.paymoney();assert.deepEqual(urls,['/pages/order/order']);
  } finally {globalThis.uni=prior;}
});

test('H5 countdown mock: fractional epoch seconds stay seconds and timers stop on unmount',()=>{
  const page=component(lootDetailModules,'c963'),priorSet=globalThis.setTimeout,priorClear=globalThis.clearTimeout;
  let next=0,cleared=[];
  globalThis.setTimeout=()=>++next;globalThis.clearTimeout=id=>cleared.push(id);
  try {
    const vm={...page.data(),...page.methods,startTime:1800000000,currentTime:1800000000,endTime:1800000300.123,$set:(obj,key,value)=>obj[key]=value,$emit:()=>{}};
    vm.gogogo(); assert.equal(vm.end,1800000300123); assert.equal(vm.msTime.show,true); assert.ok(vm.countdownTimer);
    const old=vm.countdownTimer; vm.gogogo(); assert.ok(cleared.includes(old));
    const pending=vm.countdownTimer;page.beforeDestroy.call(vm);assert.ok(cleared.includes(pending));
  } finally {globalThis.setTimeout=priorSet;globalThis.clearTimeout=priorClear;}
});
