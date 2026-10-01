import fs from 'node:fs/promises';
import {parse} from 'acorn';
const pages={
  'pages-login-register':'register','pages-personal-passwordone':'password','pages-classify-setpwd':'password',
  'pages-personal-record':'withdraw','pages-personal-identify':'identity','pages-personal-poster':'hub',
  'pages-order-shoukm':'account','pages-order-skmlist':'account','pages-order-bankCard':'account','pages-order-binding':'account','pages-order-account':'account',
  'pages-order-dgAccount-account':'account','pages-order-dgAccount-bankCard':'account','pages-order-dgAccount-binding':'account',
  'pages-personal-team':'team','pages-personal-direct':'team','pages-welfare-welfare':'team','pages-welfare-direct':'team','pages-welfare-friends':'team','pages-welfare-mydetail':'team',
  'pages-order-order':'warehouse','pages-order-orderdetail':'warehouse','pages-order-consignGoods':'warehouse','pages-order-consignPay':'warehouse',
  'pages-index-faquan':'circle','pages-personal-recharge':'recharge','pages-personal-energyjf':'recharge','pages-personal-energyjf1':'recharge','pages-personal-uploadPz':'recharge'
};
const application=await fs.readFile('src/runtime/application.js','utf8');
for(const [file,kind] of Object.entries(pages)) {
  const name='src/pages/'+file+'.js';let source=await fs.readFile(name,'utf8');
  source=source.replace(/([a-zA-Z]+)\["default"\] = \(typeof window !== "undefined" && window\.__H5_SERVER_MODE__ === "ruoyi" && window\.__teaWorkflowPage\) \? window\.__teaWorkflowPage\("[^"]+"\) : ([a-zA-Z]+)\.exports;/g,'$1["default"] = $2.exports;');
  const registration=application.slice(application.indexOf('component("'+file+'",'));
  const entry=registration.match(/return n\(o\("([a-z0-9]+)"\)\)/)?.[1];
  const map=parse(source,{ecmaVersion:'latest',sourceType:'module'}).body.find(n=>n.type==='ExportDefaultDeclaration').declaration;
  const target=map.properties.find(p=>String(p.key.value ?? p.key.name)===entry)?.value;
  if(!target)throw new Error('Missing route entry module: '+name);
  const component=source.slice(target.start,target.end),pattern=/([a-zA-Z]+)\["default"\] = ([a-zA-Z]+)\.exports;/;
  if(!pattern.test(component))throw new Error('Missing component export: '+name);
  const replacement=component.replace(pattern,`$1["default"] = (typeof window !== "undefined" && window.__H5_SERVER_MODE__ === "ruoyi" && window.__teaWorkflowPage) ? window.__teaWorkflowPage(${JSON.stringify(kind)}) : $2.exports;`);
  source=source.slice(0,target.start)+replacement+source.slice(target.end);
  await fs.writeFile(name,source);
}
// Remove the complete registration element, rather than CSS-hiding an active link.
const name='src/pages/pages-login-login.js';let source=await fs.readFile(name,'utf8');
const ast=parse(source,{ecmaVersion:'latest',sourceType:'module'}), edits=[];
function walk(n){if(!n || typeof n!=='object')return;if(n.type==='CallExpression' && n.callee.type==='Identifier' && n.callee.name==='t' && n.arguments[0]?.value==='v-uni-text' && source.slice(n.start,n.end).includes('注册账号'))edits.push([n.start,n.end]);for(const value of Object.values(n))if(Array.isArray(value))value.forEach(walk);else if(value?.type)walk(value);}
walk(ast);for(const [start,end] of edits.sort((a,b)=>b[0]-a[0]))source=source.slice(0,start)+'e._e()'+source.slice(end);
source=source.replace('e.toPage("/pages/personal/passwordone")','e.$tip("忘记密码请联系管理员重置")');
await fs.writeFile(name,source);
const personal='src/pages/pages-personal-personal.js';source=await fs.readFile(personal,'utf8');source=source.replaceAll('推广海报','业务中心').replaceAll('分享海报','业务中心').replaceAll('我的海报','业务中心');await fs.writeFile(personal,source);
console.log('Wired '+Object.keys(pages).length+' shared workflow pages; removed registration link');
