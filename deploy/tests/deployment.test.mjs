import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createMemoryStore} from '../../server/store.mjs';
import {sharedH5, sharedAdmin} from '../../server/shared-api.mjs';

const root=fileURLToPath(new URL('../..',import.meta.url));
const seedFile=path.resolve(root,'../RuoYi-Vue/sql/tea_seed.public.json');
// The seed is authoritative in the backend repository, as documented.
test('public deployment data contains no private member, session, transaction or payment records',()=>{
  const seed=JSON.parse(fs.readFileSync(seedFile,'utf8'));
  assert.deepEqual(seed.users,[]);assert.deepEqual(seed.sessions,{});
  assert.deepEqual(seed.auctions,[]);assert.deepEqual(seed.auctionBids,[]);
  assert.deepEqual(seed.content.store.pay,{});
  assert.equal(seed.auctionSeedVersion,1);
  assert.deepEqual(Object.keys(seed).sort(),['users','sessions','nextId','catalog','auctions','auctionBids','auctionSeedVersion','adminNotices','content'].sort());
  assert.ok(seed.catalog.length>0);
  for(const item of seed.catalog){
    assert.match(item.goods_name,/示例/);assert.equal(item.goods_sales,0);assert.equal(item.spec[0].stock_num,0);
    assert.ok(fs.existsSync(path.join(root,'reference/runtime',item.goods_image.replace('/h5/',''))));
    assert.ok(seed.content.categories.some(c=>c.category_id===item.category_id));
  }
});

test('public seed is read consistently by shared H5 and admin; does not create demo accounts or auctions',()=>{
  const state=JSON.parse(fs.readFileSync(seedFile,'utf8'));
  const store=createMemoryStore(state,()=>{},'shared');
  const h5=sharedH5(store,'/category/getCategoryGoodsList',{},'','GET');
  const admin=sharedAdmin(store,'/tea/products',{}, {userId:1,userName:'admin'},'GET');
  assert.equal(h5.code,1);assert.equal(admin.code,200);
  assert.deepEqual(h5.data.list.data.map(p=>p.goods_id).sort(),admin.data.rows.map(p=>p.goods_id).sort());
  assert.deepEqual(state.users,[]);assert.deepEqual(state.auctions,[]);assert.equal(state.admins,undefined);
});
