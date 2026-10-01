import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parse} from 'acorn';
import {build as bundle} from 'esbuild';
import {writeDeploymentZip} from './deployment.mjs';
import {validateReleaseBuild} from './release-policy.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
function assetPaths(source,ast){
  const edits=[];
  function walk(node){if(!node||typeof node!=='object')return;
    if(node.type==='Literal'&&typeof node.value==='string'){
      const prefix=node.value.startsWith('/h5/')?'/h5/':node.value.startsWith('../../static/')?'../../':null;
      if(prefix)edits.push({start:node.start,end:node.end,text:'(window.__H5_BASE__ || "/h5/") + '+JSON.stringify(node.value.slice(prefix.length))});
    }
    for(const value of Object.values(node))if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object')walk(value);
  }walk(ast);
  for(const edit of edits.sort((a,b)=>b.start-a.start))source=source.slice(0,edit.start)+edit.text+source.slice(edit.end);
  return source;
}
export async function buildH5(outputDir=path.join(root,'dist')){
  validateReleaseBuild();
  const out=path.resolve(outputDir),h5=path.join(out,'h5');
  // Generated output must be reproducible. Keeping files from a previous
  // build made deployment.zip depend on stale duplicate assets.
  await fs.rm(out,{recursive:true,force:true});
  await fs.mkdir(h5,{recursive:true});
  await fs.cp(path.join(root,'reference/runtime'),h5,{recursive:true});
  const chunks=JSON.parse(await fs.readFile(path.join(root,'src/chunks.json'),'utf8'));
  for(const chunk of chunks){
    const original=await fs.readFile(path.join(root,chunk.source),'utf8');
    const source=assetPaths(original,parse(original,{ecmaVersion:'latest',sourceType:'module'}));
    const node=parse(source,{ecmaVersion:'latest',sourceType:'module'}).body.find(n=>n.type==='ExportDefaultDeclaration').declaration;
    const prefix=chunk.prefix.replaceAll('"/h5/"','(window.__H5_BASE__ || "/h5/")');
    await fs.writeFile(path.join(h5,'static/js',chunk.file),prefix+source.slice(node.start,node.end)+chunk.suffix);
  }
  await bundle({entryPoints:[path.join(root,'src/browser/runtime.mjs')],outfile:path.join(h5,'static/demo/runtime.js'),bundle:true,format:'iife',platform:'browser',target:['es2021'],minify:true,plugins:[{name:'browser-demo-store',setup(b){b.onResolve({filter:/store\.mjs$/},args=>args.importer.includes(path.sep+'server'+path.sep)?{path:path.join(root,'src/browser/store.mjs')}:undefined);}}]});
  await fs.copyFile(path.join(root,'src/demo-bridge.js'),path.join(h5,'static/demo/bridge.js'));
  await bundle({entryPoints:[path.join(root,'src/browser/workflows.js')],outfile:path.join(h5,'static/demo/workflows.js'),bundle:true,format:'iife',platform:'browser',target:['es2021'],minify:true});
  await fs.writeFile(path.join(h5,'static/demo/config.js'), 'window.__H5_API_BASE__=' + JSON.stringify(process.env.H5_API_BASE || '') + ';');
  const html=await fs.readFile(path.join(root,'src/shell.html'),'utf8');
  await fs.writeFile(path.join(out,'index.html'),html.replaceAll('/h5/','./h5/'));
  await fs.writeFile(path.join(h5,'h5.html'),html.replaceAll('/h5/','./'));
  await fs.writeFile(path.join(h5,'index.html'),html.replaceAll('/h5/','./'));
  await fs.writeFile(path.join(out,'README.txt'),process.env.H5_API_BASE
    ? '鑫芮商贸 H5 共享接口版\n使用 HTTP 静态服务器打开 index.html，或 h5/h5.html。\n接口地址：'+process.env.H5_API_BASE+'\n需要可用的若依 Java 与私有业务引擎；不使用浏览器模拟数据。不得用演示账号部署生产。\n'
    : '鑫芮商贸 H5 静态演示包\n使用 HTTP 静态服务器打开 index.html，或 h5/h5.html。\n无需 Node API 服务；模拟数据保存在当前浏览器。\n账号 13800138000 / tea-demo-2026；交易密码 246810；验证码 123456。\n');
  await writeDeploymentZip(out);
  console.log(`Built ${chunks.length} chunks + browser demo → ${out}`);
  return out;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const index=process.argv.indexOf('--out-dir');
  await buildH5(index>=0?process.argv[index+1]:undefined);
}
