import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {passwordHash as nodeHash} from '../server/store.mjs';
import {createStore,passwordHash,passwordMatches} from '../src/browser/store.mjs';

test('browser demo passwords remain compatible with the shared business handlers',()=>{
  const hash=passwordHash('example-pass','fixed-test-salt');
  assert.equal(hash,nodeHash('example-pass','fixed-test-salt'));
  assert.equal(passwordMatches('example-pass',hash),true);
  assert.equal(passwordMatches('wrong',hash),false);
});

test('browser demo persists sessions and changed orders and isolates deployments',()=>{
  const entries=new Map();
  const storage={getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,value)};
  const first=createStore(storage,'site-a');
  const token=first.login(first.state.users[0]);
  first.state.users[0].orders.push({order_id:first.id(),status:'paid'});
  first.save();
  const restored=createStore(storage,'site-a');
  assert.equal(restored.user(token).orders[0].status,'paid');
  assert.equal(createStore(storage,'site-b').user(token),null);
  assert.equal(entries.get('site-a').includes('tea-demo-2026'),false);
  restored.state.sessions[token].expires=Date.now()-1000;
  assert.equal(restored.user(token),null);
});

test('standalone entries load local assets and mock bootstrap before the application',()=>{
  for(const entry of ['dist/index.html','dist/h5/index.html','dist/h5/h5.html']){
    const html=fs.readFileSync(entry,'utf8');
    const assets=[...html.matchAll(/(?:src|href)="([^"?#]+)[^"]*"/g)].map(x=>x[1]).filter(x=>!/^https?:/.test(x));
    for(const asset of assets){
      assert.ok(asset.startsWith('./'),`${entry}: ${asset} must be relative`);
      assert.ok(fs.existsSync(path.resolve(path.dirname(entry),asset)),asset);
    }
    assert.ok(html.indexOf('demo/runtime.js')<html.indexOf('static/js/chunk-vendors'));
    assert.ok(html.indexOf('demo/bridge.js')>html.indexOf('static/js/index'));
  }
});

test('deployment archive contains the application and excludes the unrelated starter',async()=>{
  const {unzipSync}=await import('fflate');
  const {deploymentFiles}=await import('../scripts/deployment.mjs');
  const expected=await deploymentFiles('dist');
  const archive=unzipSync(fs.readFileSync('dist.zip'));
  assert.deepEqual(Object.keys(archive).sort(),Object.keys(expected).sort());
  for(const [name,bytes] of Object.entries(expected))assert.deepEqual(archive[name],bytes,name);
  assert.ok(archive['h5/static/demo/runtime.js']);
  assert.equal(Object.keys(archive).some(name=>name.startsWith('assets/')),false);
});

test('deployment validation rejects missing page resources',async(t)=>{
  const os=await import('node:os');
  const {deploymentFiles}=await import('../scripts/deployment.mjs');
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'tea-missing-assets-'));
  t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
  fs.mkdirSync(path.join(dir,'h5'));
  for(const entry of ['index.html','h5/index.html','h5/h5.html'])fs.writeFileSync(path.join(dir,entry),'<script src="./missing.js"></script>');
  fs.writeFileSync(path.join(dir,'README.txt'),'test');
  await assert.rejects(deploymentFiles(dir),/部署包缺少资源/);
});
