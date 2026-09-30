// Real, isolated host integration for the SAME initializer and Nginx templates.
// This does not pretend that host execution is a Docker image test.
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('..',import.meta.url));
const backend=path.resolve(root,'../RuoYi-Vue'),admin=path.resolve(root,'../RuoYi-Vue3');
const id=Date.now().toString(36)+crypto.randomBytes(3).toString('hex');
const directory=path.join(root,'.local/deployment',id);
fs.mkdirSync(directory,{recursive:true,mode:0o700});
const evidence={startedAt:new Date().toISOString(),kind:'REAL HOST MySQL/Redis/Java/Node/Nginx (not Docker)',checks:[],commands:[]};
const save=()=>fs.writeFileSync(path.join(directory,'result.json'),JSON.stringify(evidence,null,2),{mode:0o600});
const checks=(name,details={})=>{evidence.checks.push({name,status:'PASS',...details});save();console.log('PASS '+name)};
const secret=()=>crypto.randomBytes(32).toString('hex');
const db='tea_deploy_'+id,user='tea_'+id;
const schemas=[db,db+'_existing',db+'_partial'];
const dbPassword=secret(),adminPassword=crypto.randomBytes(15).toString('base64'),redisPassword=secret();
const knownSecrets=[dbPassword,adminPassword,redisPassword];
function redacted(value){for(const s of knownSecrets)value=value.replaceAll(s,'[REDACTED]');return value;}
function run(command,args,{cwd=root,env={},input,expected=0,label=command}={}){
  const r=spawnSync(command,args,{cwd,env:{...process.env,...env},input,encoding:'utf8',maxBuffer:50*1024*1024,timeout:240000});
  evidence.commands.push({at:new Date().toISOString(),command:[command,...args],cwd,exitCode:r.status,label});save();
  fs.writeFileSync(path.join(directory,label.replace(/[^a-z0-9_-]/gi,'_')+'.log'),redacted((r.stdout||'')+(r.stderr||'')),{mode:0o600});
  if(r.status!==expected)throw new Error(`${label}: expected exit ${expected}, actual ${r.status}; inspect private log`);
  return r.stdout;
}
let sqlCounter=0;
function sql(query,schema){return run('mysql',[...(process.env.TEA_MYSQL_DEFAULTS?['--defaults-extra-file='+process.env.TEA_MYSQL_DEFAULTS]:['-uroot']),'--default-character-set=utf8mb4','--batch','--raw','--skip-column-names',...(schema?[schema]:[])],{input:query,label:'sql_'+(++sqlCounter)}).trim();}
const children=[];
function launch(name,command,args,env={}){
  const log=fs.openSync(path.join(directory,name+'.log'),'a',0o600);
  const child=spawn(command,args,{cwd:root,env:{...process.env,...env},stdio:['ignore',log,log]});fs.closeSync(log);
  child.on('error',error=>{child.launchError=error.message});children.push(child);return child;
}
async function stop(child){if(child.exitCode!==null||child.signalCode!==null)return;await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve()},5000);child.once('exit',()=>{clearTimeout(timer);resolve()});child.kill('SIGTERM')});}
async function port(){return await new Promise((resolve,reject)=>{const s=net.createServer();s.once('error',reject);s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p))})});}
async function ready(url,child){const deadline=Date.now()+60000;while(Date.now()<deadline){if(child.exitCode!==null||child.launchError)throw Error('Service failed before ready: '+url);try{if((await fetch(url,{signal:AbortSignal.timeout(1000)})).ok)return}catch{}await new Promise(r=>setTimeout(r,250));}throw Error('Service timeout: '+url);}
async function json(url,options={}){const r=await fetch(url,{...options,signal:AbortSignal.timeout(30000)});return {status:r.status,body:await r.json()};}
let databaseCreated=false;
try{
  const maven=process.env.MAVEN_BIN||(fs.existsSync('/Applications/IntelliJ IDEA.app/Contents/plugins/maven/lib/maven3/bin/mvn')?'/Applications/IntelliJ IDEA.app/Contents/plugins/maven/lib/maven3/bin/mvn':'mvn');
  run(maven,['-q','-pl','ruoyi-admin','-am','package'],{cwd:backend,label:'java-build'});
  run('npm',['run','test:deploy'],{label:'seed-tests'});
  run('npm',['run','build','--','--out-dir',path.join(directory,'h5')],{env:{H5_API_BASE:'/app'},label:'h5-build'});
  run('npm',['run','build:prod'],{cwd:admin,label:'admin-build'});
  const prepared=path.join(directory,'deployment-settings');
  run('bash',['deploy/deploy.sh','--prepare-only'],{env:{TEA_DEPLOY_DIR:prepared},label:'prepare-config'});
  const credentials=fs.readFileSync(path.join(prepared,'.env'),'utf8');
  const configuration=Object.fromEntries(credentials.trim().split('\n').map(line=>line.split('=')));
  assert.equal(fs.statSync(path.join(prepared,'.env')).mode&0o777,0o600);
  const keys=['MYSQL_ROOT_PASSWORD','DB_PASSWORD','REDIS_PASSWORD','JWT_SECRET','TEA_ENGINE_SECRET','TEA_ADMIN_PASSWORD'].map(k=>configuration[k]);
  assert.ok(keys.slice(0,-1).every(k=>k.length>=32));assert.equal(keys.at(-1).length,20);assert.equal(new Set(keys).size,keys.length);knownSecrets.push(...keys);
  run('bash',['deploy/deploy.sh','--prepare-only'],{env:{TEA_DEPLOY_DIR:prepared},label:'prepare-repeat'});
  assert.equal(fs.readFileSync(path.join(prepared,'.env'),'utf8'),credentials);
  // Parse in memory only: Compose rendered JSON includes private environment values.
  const compose=spawnSync('bash',['deploy/compose.sh','config','--format','json'],{cwd:root,env:{...process.env,TEA_DEPLOY_DIR:prepared},encoding:'utf8'});
  assert.equal(compose.status,0,'Compose config must validate');
  const config=JSON.parse(compose.stdout);
  for(const name of ['mysql','redis','engine','backend','init'])assert.ok(!config.services[name].ports?.length,name+' must not publish private ports');
  assert.equal(config.networks.data.internal,true);
  assert.equal(config.services.backend.depends_on.init.condition,'service_completed_successfully');
  for(const name of ['admin','storefront'])assert.equal(config.services[name].ports[0].host_ip,'127.0.0.1');
  checks('private randomized persistent configuration and validated Compose isolation');
  const runtime=path.join(directory,'runtime');fs.mkdirSync(runtime);
  run('jar',['-xf',path.join(backend,'ruoyi-admin/target/ruoyi-admin.jar')],{cwd:runtime,label:'unpack-java'});
  const classpath=path.join(runtime,'BOOT-INF/classes')+path.delimiter+path.join(runtime,'BOOT-INF/lib/*');
  sql(schemas.map(s=>`CREATE DATABASE ${s} CHARACTER SET utf8mb4;`).join('\n'));
  databaseCreated=true;
  sql(`CREATE USER '${user}'@'127.0.0.1' IDENTIFIED BY '${dbPassword}';`+schemas.map(s=>`GRANT ALL ON ${s}.* TO '${user}'@'127.0.0.1';`).join('\n'));
  const url=schema=>'jdbc:mysql://127.0.0.1:3306/'+schema+'?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai';
  const initialEnv={DB_URL:url(db),DB_USERNAME:user,DB_PASSWORD:dbPassword,TEA_ADMIN_PASSWORD:adminPassword,TEA_BOOTSTRAP_DIR:path.join(backend,'sql'),TEA_LOG_DIR:path.join(directory,'java-logs')};
  function initialize(schema=db,extra={},expected=0){return run('java',['-cp',classpath,'com.ruoyi.web.tea.DeploymentInitializer'],{env:{...initialEnv,DB_URL:url(schema),...extra},expected,label:'initialize_'+schema+'_'+evidence.commands.length})}
  initialize();
  assert.equal(sql("SELECT status FROM tea_deployment_bootstrap WHERE id=1",db),'ready');
  let state=JSON.parse(sql('SELECT state_json FROM tea_business_state WHERE id=1',db));
  assert.deepEqual(state,JSON.parse(fs.readFileSync(path.join(backend,'sql/tea_seed.public.json'),'utf8')));
  assert.equal(sql("SELECT COUNT(*) FROM sys_user",db),'1');
  assert.equal(sql("SELECT config_value FROM sys_config WHERE config_key='sys.account.captchaEnabled'",db),'true');
  checks('fresh database imports schema, menu roles, zero-stock public seed and enabled captcha');
  const before=sql('SELECT SHA2(state_json,256) FROM tea_business_state; SELECT password FROM sys_user WHERE user_id=1;',db);
  initialize(db,{TEA_ADMIN_PASSWORD:crypto.randomBytes(15).toString('base64')});
  assert.equal(sql('SELECT SHA2(state_json,256) FROM tea_business_state; SELECT password FROM sys_user WHERE user_id=1;',db),before);
  checks('repeat initialization does not reset data or administrator credentials');
  sql('CREATE TABLE sentinel(id INT); INSERT INTO sentinel VALUES(7);',schemas[1]);initialize(schemas[1],{},1);
  assert.equal(sql('SELECT id FROM sentinel',schemas[1]),'7');
  assert.equal(sql('SELECT COUNT(*) FROM information_schema.tables WHERE table_schema=DATABASE()',schemas[1]),'1');
  sql("CREATE TABLE tea_deployment_bootstrap(id INT PRIMARY KEY,version INT,status VARCHAR(32)); INSERT INTO tea_deployment_bootstrap VALUES(1,1,'initializing');",schemas[2]);initialize(schemas[2],{},1);
  checks('nonempty databases and partial initialization are refused without overwriting');
  const ports={java:await port(),engine:await port(),redis:await port(),h5:await port(),admin:await port()};
  const redisFile=path.join(directory,'redis.conf');
  fs.writeFileSync(redisFile,`bind 127.0.0.1\nport ${ports.redis}\nsave ""\nappendonly no\nrequirepass ${redisPassword}\n`,{mode:0o600});
  launch('redis','redis-server',[redisFile]);
  const engineSecret=secret(),jwtSecret=secret();knownSecrets.push(engineSecret,jwtSecret);
  launch('engine','node',['server/shared-engine.mjs'],{TEA_ENGINE_SECRET:engineSecret,TEA_ENGINE_PORT:String(ports.engine)});
  const env={...initialEnv,JWT_SECRET:jwtSecret,TEA_ENGINE_SECRET:engineSecret,TEA_ENGINE_URL:`http://127.0.0.1:${ports.engine}/execute`,TEA_BIND_ADDRESS:'127.0.0.1',TEA_JAVA_PORT:String(ports.java),SPRING_REDIS_HOST:'127.0.0.1',SPRING_REDIS_PORT:String(ports.redis),TEA_REDIS_DATABASE:'0',REDIS_PASSWORD:redisPassword,TEA_UPLOAD_DIR:path.join(directory,'uploads')};
  const javaArgs=['-cp',classpath,'com.ruoyi.RuoYiApplication','--spring.profiles.active=druid,tea','--spring.datasource.druid.statViewServlet.enabled=false','--swagger.enabled=false'];
  let java=launch('java','java',javaArgs,env);
  await ready(`http://127.0.0.1:${ports.java}/captchaImage`,java);
  const h5Template=fs.readFileSync(path.join(root,'deploy/storefront.conf.template'),'utf8').replaceAll('${API_UPSTREAM}',`http://127.0.0.1:${ports.java}`).replace('listen 80;',`listen 127.0.0.1:${ports.h5};`).replace('root /usr/share/nginx/html;',`root "${path.join(directory,'h5')}";`);
  const adminTemplate=fs.readFileSync(path.join(admin,'deploy/admin.conf.template'),'utf8').replaceAll('${API_UPSTREAM}',`http://127.0.0.1:${ports.java}`).replaceAll('${H5_UPSTREAM}',`http://127.0.0.1:${ports.h5}`).replace('listen 80;',`listen 127.0.0.1:${ports.admin};`).replace('root /usr/share/nginx/html;',`root "${path.join(admin,'dist')}";`);
  const mime=process.env.NGINX_MIME_TYPES||['/etc/nginx/mime.types','/opt/homebrew/etc/nginx/mime.types'].find(p=>fs.existsSync(p));
  assert.ok(mime,'Nginx mime.types is required');
  const nginxConfig=path.join(directory,'nginx.conf');
  fs.writeFileSync(nginxConfig,`pid "${directory}/nginx.pid";\nerror_log "${directory}/nginx-error.log";\nevents {}\nhttp {include "${mime}";access_log off;${h5Template}\n${adminTemplate}}\n`,{mode:0o600});
  run('nginx',['-t','-c',nginxConfig,'-p',directory],{label:'nginx-config'});
  const nginx=launch('nginx','nginx',['-c',nginxConfig,'-p',directory,'-g','daemon off;']);
  const h5=`http://127.0.0.1:${ports.h5}`,dashboard=`http://127.0.0.1:${ports.admin}`;
  await ready(h5+'/health',nginx);await ready(dashboard+'/health',nginx);
  assert.match(await (await fetch(h5+'/')).text(),/<div id="app"><\/div>/);
  assert.match(await (await fetch(h5+'/h5/static/demo/config.js')).text(),/__H5_API_BASE__="\/app"/);
  const adminHtml=await (await fetch(dashboard+'/login')).text();assert.match(adminHtml,/type="module"/);
  const asset=adminHtml.match(/src="([^"]+\.js)"/)[1];
  assert.match((await fetch(dashboard+asset)).headers.get('content-type'),/javascript/);
  const catalogue=await json(h5+'/app/category/getCategoryGoodsList');
  assert.equal(catalogue.body.code,1);assert.equal(catalogue.body.data.list.data.length,2);
  assert.equal((await fetch(dashboard+state.catalog[0].goods_image)).status,200);
  assert.equal((await json(dashboard+'/prod-api/admin/tea/products')).body.code,401);
  assert.equal((await fetch(dashboard+'/prod-api/druid/')).status,404);
  checks('built web entries, asset MIME, reverse proxies, seed images and unauthenticated protection');
  const captcha=(await json(dashboard+'/prod-api/captchaImage')).body;assert.equal(captcha.captchaEnabled,true);
  const answer=JSON.parse(run('redis-cli',['-p',String(ports.redis),'--raw','GET','captcha_codes:'+captcha.uuid],{env:{REDISCLI_AUTH:redisPassword},label:'isolated-captcha'}).trim());
  const login=await json(dashboard+'/prod-api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({username:'admin',password:adminPassword,code:String(answer),uuid:captcha.uuid})});
  assert.equal(login.body.code,200,'generated administrator password must actually log in');
  const headers={'content-type':'application/json',Authorization:'Bearer '+login.body.token};
  const list=await json(dashboard+'/prod-api/admin/tea/products',{headers});assert.equal(list.body.code,200);
  assert.deepEqual(list.body.data.rows.map(p=>p.goods_id).sort(),catalogue.body.data.list.data.map(p=>p.goods_id).sort());
  const renamed='隔离部署验收商品';
  const update=await json(dashboard+'/prod-api/admin/tea/products/1001',{method:'PUT',headers,body:JSON.stringify({goods_name:renamed,goods_min_price:'68.00',stock:0})});assert.equal(update.body.code,200);
  state=JSON.parse(sql('SELECT state_json FROM tea_business_state WHERE id=1',db));assert.equal(state.catalog.find(p=>p.goods_id===1001).goods_name,renamed);
  assert.equal((await json(h5+'/app/shopgoods/getDetails?goods_id=1001')).body.data.detail.goods_name,renamed);
  checks('generated admin login with real captcha; admin write → MySQL → H5 read');
  await stop(java);java=launch('java-restart','java',javaArgs,env);await ready(`http://127.0.0.1:${ports.java}/captchaImage`,java);
  assert.equal((await json(h5+'/app/shopgoods/getDetails?goods_id=1001')).body.data.detail.goods_name,renamed);
  const persisted=sql('SELECT SHA2(state_json,256),revision FROM tea_business_state',db);initialize();
  assert.equal(sql('SELECT SHA2(state_json,256),revision FROM tea_business_state',db),persisted);
  checks('Java restart and repeat initializer retain real saved edits');
  evidence.status='PASS (host integration; Docker must be reported separately)';
}catch(error){evidence.status='FAIL';evidence.error=redacted(error.stack||String(error));console.error(evidence.error);process.exitCode=1;}
finally{
  for(const child of children.reverse())await stop(child);
  if(databaseCreated){try{
    assert.ok(schemas.every(s=>/^tea_deploy_[a-z0-9]+(?:_existing|_partial)?$/.test(s)));
    sql(schemas.map(s=>`DROP DATABASE ${s};`).join('\n')+`DROP USER IF EXISTS '${user}'@'127.0.0.1';`);
    evidence.cleanup='isolated schemas/user and child services removed; original project services and data untouched';
  }catch(error){evidence.cleanup='FAILED: '+redacted(error.message);evidence.status='FAIL';process.exitCode=1;}}
  evidence.finishedAt=new Date().toISOString();save();console.log('Evidence: '+path.join(directory,'result.json'));
}
