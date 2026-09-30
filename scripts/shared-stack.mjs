import fs from 'node:fs/promises';
import { createWriteStream, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import { passwordHash } from '../server/store.mjs';

export const root = fileURLToPath(new URL('..', import.meta.url));
const javaRoot = path.resolve(root, '../RuoYi-Vue');
const adminRoot = path.resolve(root, '../RuoYi-Vue3');
const currentFile = path.join(root, '.local/shared/current.json');
function sql(text, db) {
  const args = [...(process.env.TEA_MYSQL_DEFAULTS ? ['--defaults-extra-file=' + process.env.TEA_MYSQL_DEFAULTS] : ['-uroot']), '--batch', '--raw', '--skip-column-names', ...(db ? [db] : [])];
  const result = spawnSync('mysql', args, { input: text, encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  if (result.status !== 0) throw new Error('MySQL preparation failed: ' + (result.stderr || result.error?.message));
  return result.stdout;
}
export function database(config, query) { return sql(query, config.database); }
export async function captureSource(config) {
  const repositories=[];
  for(const cwd of [root,javaRoot,adminRoot]) {
    const git=(...args)=>{const r=spawnSync('git',args,{cwd,encoding:'utf8'}); if(r.status!==0) throw new Error('Unable to record source version'); return r.stdout;};
    const files=[...new Set([...git('diff','--name-only','HEAD').trim().split('\n'),...git('ls-files','--others','--exclude-standard').trim().split('\n')])].filter(file=>file&&!file.endsWith('.md')&&!file.startsWith('docs/')&&existsSync(path.join(cwd,file)));
    const entries=[];
    for(const file of files) entries.push({file,sha256:crypto.createHash('sha256').update(await fs.readFile(path.join(cwd,file))).digest('hex')});
    repositories.push({repository:cwd,head:git('rev-parse','HEAD').trim(),files:entries});
  }
  await fs.writeFile(path.join(config.dir,'source-manifest.json'),JSON.stringify({capturedAt:new Date().toISOString(),repositories},null,2),{mode:0o600});
}
export async function verifyRestore(config) {
  if (!/^tea_local_[a-z0-9]+$/.test(config.database)) throw new Error('Refusing non-local backup');
  const restored = config.database + '_restore';
  const backup = path.join(config.dir,'isolated-backup.sql');
  const args = [...(process.env.TEA_MYSQL_DEFAULTS ? ['--defaults-extra-file='+process.env.TEA_MYSQL_DEFAULTS] : ['-uroot']), '--single-transaction','--no-tablespaces','--set-gtid-purged=OFF',config.database];
  const dumped = spawnSync('mysqldump',args,{encoding:'utf8',maxBuffer:100*1024*1024});
  if (dumped.status !== 0) throw new Error('Isolated backup failed: '+dumped.stderr);
  await fs.writeFile(backup,dumped.stdout,{mode:0o600});
  sql('CREATE DATABASE '+restored+' CHARACTER SET utf8mb4;');
  sql(dumped.stdout,restored);
  const query='SELECT SHA2(state_json,256),revision FROM tea_business_state; SELECT COUNT(*) FROM tea_business_audit; SELECT COUNT(*) FROM tea_voucher_claim; SELECT COUNT(*) FROM sys_role_menu;';
  if (sql(query,restored)!==database(config,query)) throw new Error('Restored state/audit/claims/roles do not match');
  await fs.writeFile(path.join(config.dir,'restore-result.json'),JSON.stringify({source:config.database,restored,backup,status:'已实测通过',finishedAt:new Date().toISOString(),checks:'state SHA256 + revision, audit/claim/role-menu counts; fresh isolated schema only'},null,2));
}
export async function prepare({ fresh = false, test = false } = {}) {
  await fs.mkdir(path.dirname(currentFile), { recursive: true, mode: 0o700 });
  if (!fresh && existsSync(currentFile)) {
    const saved = JSON.parse(await fs.readFile(currentFile, 'utf8'));
    if (!/^tea_local_[a-z0-9]+$/.test(saved.database)) throw new Error('Refusing non-local schema');
    database(saved, await fs.readFile(path.join(javaRoot, 'sql/tea_business.sql'), 'utf8'));
    return saved;
  }
  const id = Date.now().toString(36) + crypto.randomBytes(3).toString('hex');
  const dir = path.join(root, '.local/shared', id);
  await fs.mkdir(dir, { recursive: true, mode: 0o700 });
  const config = { id, dir, database: 'tea_local_' + id, engineSecret: crypto.randomBytes(32).toString('hex'), jwtSecret: crypto.randomBytes(32).toString('hex'), ports: test ? { java: 18080, engine: 18091, h5: 15173, second: 15180, admin: 15174 } : { java: 8080, engine: 8091, h5: 5173, second: 5180, admin: 5174 } };
  // Only create a fresh randomly named schema. Never run destructive RuoYi
  // bootstrap SQL against an existing/user-owned database.
  sql('CREATE DATABASE ' + config.database + ' CHARACTER SET utf8mb4;');
  database(config, await fs.readFile(path.join(javaRoot, 'sql/ry_20250522.sql'), 'utf8'));
  database(config, await fs.readFile(path.join(javaRoot, 'sql/tea_business.sql'), 'utf8'));
  database(config, "UPDATE sys_config SET config_value='false' WHERE config_key='sys.account.captchaEnabled';");
  database(config, "INSERT INTO sys_role(role_id,role_name,role_key,role_sort,data_scope,status,del_flag) VALUES(20,'验收只读角色','tea_viewer',20,'1','0','0'); INSERT INTO sys_user(user_id,dept_id,user_name,nick_name,password,status,del_flag,create_time) SELECT 20,101,'tea_viewer','验收只读账号',password,'0','0',NOW() FROM sys_user WHERE user_id=1; INSERT INTO sys_user_role VALUES(20,20); INSERT INTO sys_role_menu SELECT 20,menu_id FROM sys_menu WHERE menu_id BETWEEN 8700 AND 8715;");
  database(config, "INSERT INTO sys_user(user_id,dept_id,user_name,nick_name,password,status,del_flag,create_time) SELECT 21,101,'tea_finance_test','验收财务账号',password,'0','0',NOW() FROM sys_user WHERE user_id=1; INSERT INTO sys_user_role SELECT 21,role_id FROM sys_role WHERE role_key='tea_finance';");
  for (const [id,key] of [[22,'tea_operator'],[23,'tea_content'],[24,'tea_warehouse']]) {
    database(config, `INSERT INTO sys_user(user_id,dept_id,user_name,nick_name,password,status,del_flag,create_time) SELECT ${id},101,'${key}_test','隔离角色验收',password,'0','0',NOW() FROM sys_user WHERE user_id=1; INSERT INTO sys_user_role SELECT ${id},role_id FROM sys_role WHERE role_key='${key}';`);
  }
  const state = JSON.parse(database(config, 'SELECT state_json FROM tea_business_state WHERE id=1;'));
  state.content = { store: { store_name: '本地联调商城', pay: { bank_name: '隔离测试账户，请勿转账', bank_card: 'TEST-NOT-A-BANK-ACCOUNT', bank_username: '测试收款' } } };
  state.users = [1,2].map(id => ({
    member_id: id, phone: '1380013800' + id, nickName: '本地验收会员' + id,
    passwordHash: passwordHash('tea-local-2026'), payPasswordHash: passwordHash('246810'),
    amount: '1000.00', score: '1000.00', e_card_number: '100.00',
    invitation_code: 'LOCAL' + id, status: '0', headimg: '/h5/static/img/photo.e65d4f32.png',
  }));
  database(config, "UPDATE tea_business_state SET state_json=CONVERT(0x" + Buffer.from(JSON.stringify(state)).toString('hex') + " USING utf8mb4) WHERE id=1;");
  await fs.writeFile(path.join(dir, 'config.json'), JSON.stringify(config, null, 2), { mode: 0o600 });
  if (!test) await fs.writeFile(currentFile, JSON.stringify(config, null, 2), { mode: 0o600 });
  console.log('Created isolated local schema: ' + config.database);
  return config;
}
export async function runCheck(config, name, command, args, cwd = root, env = {}) {
  const logfile = path.join(config.dir, name + '.log');
  const stream = createWriteStream(logfile, { mode: 0o600 });
  const start = new Date().toISOString();
  const child = spawn(command, args, { cwd, env: { ...process.env, ...env } });
  child.stdout.pipe(stream); child.stderr.pipe(stream);
  const code = await new Promise((resolve, reject) => { child.on('error',reject); child.on('exit',resolve); });
  await new Promise(resolve => stream.end(resolve));
  const record = { name, command: [command,...args], cwd, startedAt: start, finishedAt: new Date().toISOString(), exitCode: code, log: logfile };
  await fs.appendFile(path.join(config.dir,'commands.jsonl'), JSON.stringify(record) + '\n', { mode: 0o600 });
  console.log(name + ': exit ' + code + ' (' + logfile + ')');
  if (code !== 0) throw new Error(name + ' failed; see ' + logfile);
}
export async function build(config, { tests = false } = {}) {
  const bundledMaven = '/Applications/IntelliJ IDEA.app/Contents/plugins/maven/lib/maven3/bin/mvn';
  const maven = process.env.MAVEN_BIN || (existsSync(bundledMaven) ? bundledMaven : 'mvn');
  // Sequential H5 builds/tests avoid test build output racing the served bundle.
  if (tests) await runCheck(config, 'node-tests', 'npm', ['test']);
  await runCheck(config, 'java-package', maven, ['-q','-pl','ruoyi-admin','-am','package'], javaRoot);
  await runCheck(config, 'h5-build', 'npm', ['run','build'], root, { H5_API_BASE: '/app' });
  await runCheck(config, 'admin-build', 'npm', ['run','build:prod'], adminRoot);
}
export async function start(config) {
  // The running process must not read a jar that a subsequent build overwrites.
  const runtimeJar = path.join(config.dir,'ruoyi-admin-runtime.jar');
  await fs.copyFile(path.join(javaRoot,'ruoyi-admin/target/ruoyi-admin.jar'),runtimeJar);
  const children = [];
  const base = { ...process.env, TEA_ENGINE_SECRET: config.engineSecret, JWT_SECRET: config.jwtSecret, TEA_ENGINE_PORT: String(config.ports.engine), TEA_ENGINE_URL: 'http://127.0.0.1:' + config.ports.engine + '/execute', TEA_JAVA_PORT: String(config.ports.java), DB_URL: 'jdbc:mysql://127.0.0.1:3306/' + config.database + '?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai', DB_USERNAME: process.env.DB_USERNAME || 'root', DB_PASSWORD: process.env.DB_PASSWORD || '', TEA_UPLOAD_DIR: path.join(config.dir, 'uploads') };
  function launch(name, command, args, cwd, extra = {}) {
    const stream = createWriteStream(path.join(config.dir,name+'.log'), { flags: 'a', mode: 0o600 });
    const child = spawn(command,args,{cwd,env:{...base,TEA_LOG_DIR:path.join(config.dir,'java-logs'),...extra},detached:true});
    child.stdout.pipe(stream); child.stderr.pipe(stream);
    child.on('exit',() => stream.end());
    child.on('error',error => console.error(name + ': ' + error.message));
    children.push(child);
    return child;
  }
  const processes = {};
  processes.engine = launch('engine','node',['server/shared-engine.mjs'],root);
  processes.java = launch('java','java',['-jar',runtimeJar,'--spring.profiles.active=druid,tea','--spring.datasource.druid.statViewServlet.enabled=false'],javaRoot);
  processes.h5 = launch('h5','node',['server/index.mjs'],root,{API_MODE:'ruoyi',PORT:String(config.ports.h5),RUOYI_ORIGIN:'http://127.0.0.1:'+config.ports.java});
  processes.second = launch('second','node',['scripts/preview.mjs','--dir','dist','--port',String(config.ports.second)],root,{H5_API_BASE:'http://127.0.0.1:'+config.ports.java+'/app'});
  processes.admin = launch('admin','npm',['run','dev','--','--host','127.0.0.1','--port',String(config.ports.admin),'--strictPort'],adminRoot,{TEA_API_ORIGIN:'http://127.0.0.1:'+config.ports.java,TEA_ASSET_ORIGIN:'http://127.0.0.1:'+config.ports.h5});
  async function stop() {
    const exited = child => child.exitCode !== null || child.signalCode !== null;
    for (const child of children) if (!exited(child)) { try { process.kill(-child.pid,'SIGTERM'); } catch {} }
    await Promise.all(children.map(child => exited(child) ? Promise.resolve() : new Promise(resolve => {
      const timer=setTimeout(()=>{ try { process.kill(-child.pid,'SIGKILL'); } catch {} resolve(); },5000);
      child.once('exit',()=>{ clearTimeout(timer); resolve(); });
    })));
  }
  try {
    const deadline = Date.now() + 60000;
    let ready = false;
    while (Date.now() < deadline) {
      if (children.some(c => c.exitCode !== null)) throw new Error('A local service exited; inspect logs in ' + config.dir);
      try { const r = await fetch('http://127.0.0.1:'+config.ports.java+'/captchaImage'); if (r.ok) { ready = true; break; } } catch {}
      await new Promise(resolve => setTimeout(resolve,500));
    }
    if (!ready) throw new Error('Java startup timed out; inspect ' + config.dir);
  } catch (error) { await stop(); throw error; }
  console.log('Shared stack ready: H5 '+config.ports.h5+', second H5 '+config.ports.second+', RuoYi admin '+config.ports.admin);
  return { processes, stop };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const config = await prepare({ fresh: process.argv.includes('--fresh') });
  if (!process.argv.includes('--no-build')) await build(config);
  const stack = await start(config);
  console.log('Local-only accounts: admin/admin123; tea_viewer/admin123; member 13800138001 or 13800138002 / tea-local-2026 (payment password 246810). Do not use these fixtures in production.');
  for (const signal of ['SIGINT','SIGTERM']) process.on(signal,async()=>{ await stack.stop(); process.exit(0); });
}
