import {createStore} from './store.mjs';
import {demoApi} from '../../server/demo-api.mjs';
import endpointMap from '../../reference/endpoints.json';
// Both index.html and h5/h5.html derive asset paths from this script, supporting subdirectories.
const scriptUrl = document.currentScript.src;
window.__H5_BASE__ = new URL('../../', scriptUrl).pathname;
const appRoot = new URL('../../../', scriptUrl).pathname;
if (window.__H5_API_BASE__) installRemoteApi(window.__H5_API_BASE__);
else if (!window.__H5_SERVER_MODE__) installStaticDemo();
function installRemoteApi(base) {
  window.__H5_SERVER_MODE__ = 'ruoyi';
  const routes = new Set([...Object.values(endpointMap).flat(), '/upload/image','/dg/uploadImage','/demo/coupons','/demo/orders/delivery','/auction/list','/auction/detail','/auction/bids','/auction/bid','/auction/settle','/order/remindShipment','/member/logout']);
  const destination = new URL(base.replace(/\/$/, '') + '/', location.origin);
  const map = (url) => {
    const source = new URL(url, location.href);
    return source.origin === location.origin && routes.has(source.pathname) ? new URL(source.pathname.slice(1) + source.search, destination).href : url;
  };
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) { return open.call(this, method, map(url), ...args); };
  const fetch = window.fetch.bind(window);
  window.fetch = (input, options) => input instanceof Request ? fetch(new Request(map(input.url), input), options) : fetch(map(input), options);
}
function installStaticDemo() {
  let store;
  const getStore = () => store || (store = createStore(localStorage, 'xinrui-h5-static-demo-v1:' + appRoot));
  const endpoints = new Set([...Object.values(endpointMap).flat(),'/upload/image','/dg/uploadImage','/index/getShareUrl','/index/getVision','/demo/coupons','/demo/orders/delivery','/demo/pay','/auction/list','/auction/detail','/auction/bids','/auction/bid','/auction/settle']);
  const nativeFetch=window.fetch.bind(window);
  const nativeOpen=XMLHttpRequest.prototype.open;
  const nativeSend=XMLHttpRequest.prototype.send;
  const nativeHeader=XMLHttpRequest.prototype.setRequestHeader;
  const nativeAbort=XMLHttpRequest.prototype.abort;
  const nativeHeaders=XMLHttpRequest.prototype.getAllResponseHeaders;
  const nativeResponseHeader=XMLHttpRequest.prototype.getResponseHeader;
  const requests=new WeakMap();
  function routeFor(url){const parsed=new URL(url,location.href);return parsed.origin===location.origin&&endpoints.has(parsed.pathname)?parsed:null;}
  function relocate(value){if(typeof value==='string')return value.replaceAll('/h5/',window.__H5_BASE__);if(Array.isArray(value))return value.map(relocate);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,relocate(v)]));return value;}
  async function dispatch(url,method,headers,body){
    try {
      const state=getStore(),token=headers.get('token')||'';
      if(url.pathname==='/upload/image'||url.pathname==='/dg/uploadImage'){
        if(!state.user(token))return {code:-500,msg:'请先登录',data:{}};
        const file=body instanceof FormData?[...body.values()].find(v=>v instanceof Blob):null;
        if(!file||!/^image\/(png|jpeg|gif|webp)$/.test(file.type))return {code:0,msg:'请选择 PNG、JPEG、GIF 或 WebP 图片',data:{}};
        if(file.size>2*1024*1024)return {code:0,msg:'纯静态演示请上传小于 2MB 的图片',data:{}};
        const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
        return {code:1,msg:'图片已载入本地演示',data:{file_id:String(state.id()),file_path:data}};
      }
      const params=Object.fromEntries(url.searchParams);
      if(body instanceof FormData||body instanceof URLSearchParams)Object.assign(params,Object.fromEntries(body));
      else if(typeof body==='string'&&body)Object.assign(params,headers.get('content-type')?.includes('application/json')?JSON.parse(body):Object.fromEntries(new URLSearchParams(body)));
      return relocate(demoApi(state,url.pathname,params,token,method.toUpperCase()));
    } catch(error) {return {code:0,msg:error.name==='QuotaExceededError'?'浏览器演示存储已满，请使用较小的凭证图片':'本地模拟处理失败：'+error.message,data:{}};}
  }
  window.fetch=async function(input,options={}){
    const url=routeFor(input instanceof Request?input.url:input);
    if(!url)return nativeFetch(input,options);
    const headers=new Headers(options.headers||(input instanceof Request?input.headers:{}));
    const body=options.body??(input instanceof Request&&input.method!=='GET'?await input.clone().text():undefined);
    const result=await dispatch(url,options.method||(input instanceof Request?input.method:'GET'),headers,body);
    return new Response(JSON.stringify(result),{status:200,headers:{'Content-Type':'application/json'}});
  };
  XMLHttpRequest.prototype.open=function(method,url,...args){const route=routeFor(url);if(route)requests.set(this,{url:route,method,headers:new Headers(),aborted:false});else requests.delete(this);return nativeOpen.call(this,method,url,...args);};
  XMLHttpRequest.prototype.setRequestHeader=function(key,value){const r=requests.get(this);if(r)r.headers.set(key,value);return nativeHeader.call(this,key,value);};
  XMLHttpRequest.prototype.getAllResponseHeaders=function(){return requests.has(this)?'content-type: application/json\r\n':nativeHeaders.call(this);};
  XMLHttpRequest.prototype.getResponseHeader=function(name){return requests.has(this)?(name.toLowerCase()==='content-type'?'application/json':null):nativeResponseHeader.call(this,name);};
  XMLHttpRequest.prototype.abort=function(){const r=requests.get(this);if(r)r.aborted=true;return nativeAbort.call(this);};
  XMLHttpRequest.prototype.send=function(body){const r=requests.get(this);if(!r)return nativeSend.call(this,body);const xhr=this;
    Promise.resolve().then(()=>dispatch(r.url,r.method,r.headers,body)).then(data=>{
      if(r.aborted)return;
      const text=JSON.stringify(data);
      for(const[key,value]of Object.entries({readyState:4,status:200,statusText:'OK',responseURL:r.url.href,responseText:text,response:xhr.responseType==='json'?data:text}))Object.defineProperty(xhr,key,{configurable:true,get:()=>value});
      xhr.dispatchEvent(new Event('readystatechange'));xhr.dispatchEvent(new ProgressEvent('load',{lengthComputable:true,loaded:text.length,total:text.length}));xhr.dispatchEvent(new Event('loadend'));
    });
  };
  window.__H5_STATIC_DEMO__=true;
}
