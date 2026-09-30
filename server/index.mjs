import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { createStore } from './store.mjs';
import { demoApi } from './demo-api.mjs';
import { adminApi } from './admin-api.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2' };
const endpoints = new Set(Object.values(JSON.parse(await fs.readFile(path.join(root, 'reference/endpoints.json'), 'utf8'))).flat());
endpoints.add('/upload/image');
for (const endpoint of ['/dg/uploadImage', '/index/getShareUrl', '/index/getVision', '/demo/coupons', '/demo/orders/delivery', '/demo/pay']) endpoints.add(endpoint);
for (const endpoint of ['/auction/list', '/auction/detail', '/auction/bids', '/auction/bid', '/auction/settle']) endpoints.add(endpoint);
const mode = process.env.API_MODE || 'demo';
if (!['demo', 'upstream', 'ruoyi'].includes(mode)) throw new Error('API_MODE must be demo, upstream or ruoyi');
if (mode === 'upstream' && !process.env.UPSTREAM_ORIGIN) throw new Error('UPSTREAM_ORIGIN is required');
const upstream = new URL(process.env.UPSTREAM_ORIGIN || 'http://127.0.0.1:8080');
const ruoyi = new URL(process.env.RUOYI_ORIGIN || 'http://127.0.0.1:8080');
const store = mode === 'demo' ? createStore(process.env.DATA_FILE || path.join(root, '.local/data.json')) : null;
const json = (res, data, status = 200) => {
  res.writeHead(status, { 'Content-Type': mime['.json'], 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
};
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/health') return json(res, { status: 'ok', mode, pages: 81 });
    const adminApiPrefix = /^\/(admin|dev-api|stage-api|prod-api)(\/|$)/.test(url.pathname);
    if (mode === 'ruoyi' && (endpoints.has(url.pathname) || url.pathname.startsWith('/app/') || adminApiPrefix || ['/login','/logout','/getInfo','/getRouters','/captchaImage'].includes(url.pathname))) {
      if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return json(res, { code: 403, msg: '不允许跨站请求' }, 403);
      let size = 0; const buffers = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 2 * 1024 * 1024) return json(res, { code: 413, msg: '请求体过大' }, 413);
        buffers.push(chunk);
      }
      const route = endpoints.has(url.pathname) ? '/app' + url.pathname : url.pathname.replace(/^\/(dev-api|stage-api|prod-api)(?=\/|$)/, '');
      const headers = {};
      for (const key of ['content-type','token','authorization']) if (req.headers[key]) headers[key] = req.headers[key];
      const response = await fetch(new URL(route + url.search, ruoyi), { method: req.method, headers, body: ['GET','HEAD'].includes(req.method) ? undefined : Buffer.concat(buffers), redirect: 'manual', signal: AbortSignal.timeout(25000) });
      res.writeHead(response.status, { 'Content-Type': response.headers.get('content-type') || mime['.json'], 'Cache-Control': 'no-store' });
      return res.end(Buffer.from(await response.arrayBuffer()));
    }
    if (mode === 'demo' && (adminApiPrefix || ['/login', '/logout', '/getInfo', '/getRouters', '/captchaImage'].includes(url.pathname))) {
      // 管理端开发服务器通过 Vite 代理访问本服务，允许本机端口间的受控调用；
      // 生产环境可通过 ADMIN_ORIGIN 指定唯一管理端来源。
      const requestOrigin = req.headers.origin || '';
      const allowedAdminOrigin = process.env.ADMIN_ORIGIN || '';
      const isLocalAdmin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(requestOrigin);
      if (requestOrigin && new URL(requestOrigin).host !== req.headers.host && !isLocalAdmin && requestOrigin !== allowedAdminOrigin) return json(res, { code: 0, msg: '不允许跨站请求' }, 403);
      if (requestOrigin) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Vary', 'Origin');
      }
      if (req.method === 'OPTIONS') return json(res, { code: 200, msg: 'ok' });
      let size = 0; const buffers = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 2 * 1024 * 1024) return json(res, { code: 0, msg: '请求体过大' }, 413);
        buffers.push(chunk);
      }
      const body = Buffer.concat(buffers);
      const params = Object.fromEntries(url.searchParams);
      if (body.length) {
        const contentType = req.headers['content-type'] || '';
        try {
          Object.assign(params, contentType.includes('application/json') ? JSON.parse(body.toString()) : Object.fromEntries(new URLSearchParams(body.toString())));
        } catch {
          return json(res, { code: 400, msg: '请求参数格式错误' }, 400);
        }
      }
      const bearer = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
      const adminPath = (url.pathname.replace(/^\/(admin|dev-api|stage-api|prod-api)(?=\/|$)/, '').replace(/^\/admin(?=\/|$)/, '')) || '/';
      const result = adminApi(store, adminPath, params, bearer, req.method);
      // RuoYi 约定业务错误也返回 HTTP 200，由响应拦截器根据 body.code 展示提示；
      // 只有未登录才使用 HTTP 401 触发重新登录流程。
      return json(res, result, result.code === 401 ? 401 : 200);
    }
    if (endpoints.has(url.pathname)) {
      if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return json(res, { code: 0, msg: '不允许跨站请求' }, 403);
      let size = 0; const buffers = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 8 * 1024 * 1024) return json(res, { code: 0, msg: '上传文件过大' }, 413);
        buffers.push(chunk);
      }
      const body = Buffer.concat(buffers);
      if (mode === 'upstream') {
        const destination = new URL(url.pathname + url.search, upstream);
        const headers = { Version: '102' };
        if (req.headers.token) headers.token = req.headers.token;
        if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
        const result = await fetch(destination, { method: req.method, headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : body, redirect: 'manual', signal: AbortSignal.timeout(20000) });
        res.writeHead(result.status, { 'Content-Type': result.headers.get('content-type') || mime['.json'], 'Cache-Control': 'no-store' });
        return res.end(Buffer.from(await result.arrayBuffer()));
      }
      if (url.pathname === '/upload/image' || url.pathname === '/dg/uploadImage') {
        if (!store.user(req.headers.token)) return json(res, { code: -500, msg: '请先登录' });
        const form = await new Request('http://localhost/upload', { method: 'POST', headers: { 'Content-Type': req.headers['content-type'] }, body }).formData();
        const file = [...form.values()].find(value => typeof value.arrayBuffer === 'function');
        if (!file) return json(res, { code: 0, msg: '请选择图片' });
        const bytes = Buffer.from(await file.arrayBuffer());
        const ext = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ? '.png'
          : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 ? '.jpg'
          : bytes.subarray(0, 6).toString().match(/^GIF8[79]a$/) ? '.gif'
          : bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP' ? '.webp' : '';
        if (!ext) return json(res, { code: 0, msg: '仅支持 PNG、JPEG、GIF 和 WebP 图片' });
        const id = crypto.randomUUID();
        await fs.mkdir(path.join(root, '.local/uploads'), { recursive: true });
        await fs.writeFile(path.join(root, '.local/uploads', id + ext), bytes, { mode: 0o600 });
        return json(res, { code: 1, msg: '图片已保存到本地', data: { file_id: id, file_path: '/uploads/' + id + ext } });
      }
      const params = Object.fromEntries(url.searchParams);
      if (body.length) Object.assign(params, req.headers['content-type']?.includes('application/json') ? JSON.parse(body) : Object.fromEntries(new URLSearchParams(body.toString())));
      return json(res, demoApi(store, url.pathname, params, req.headers.token, req.method));
    }
    if (!['GET', 'HEAD'].includes(req.method)) return json(res, { code: 0, msg: '接口不存在' }, 404);
    if (/^\/uploads\/[a-f0-9-]+\.(png|jpg|gif|webp)$/.test(url.pathname)) {
      const image = await fs.readFile(path.join(root, '.local', url.pathname));
      res.writeHead(200, { 'Content-Type': mime[path.extname(url.pathname)] || 'image/webp', 'X-Content-Type-Options': 'nosniff' });
      return res.end(image);
    }
    let resource = decodeURIComponent(url.pathname);
    if (resource === '/' || resource === '/index.html' || resource === '/h5/' || resource === '/h5/h5.html') resource = '/h5/h5.html';
    if (resource.startsWith('/static/')) resource = '/h5' + resource;
    const target = path.resolve(root, 'dist', '.' + resource);
    if (!target.startsWith(path.join(root, 'dist') + path.sep)) return json(res, { error: 'Forbidden' }, 403);
    let data = await fs.readFile(target);
    if(path.extname(target)==='.html') data=Buffer.from(data.toString().replace('<head>', '<head><script>window.__H5_SERVER_MODE__='+JSON.stringify(mode)+';</script>'));
    res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch (error) {
    const missing = error.code === 'ENOENT';
    json(res, { code: 0, msg: missing ? '资源不存在，请先执行 npm run build' : '请求失败，请检查服务配置' }, missing ? 404 : 502);
  }
});
const port = Number(process.env.PORT || 5173);
server.listen(port, process.env.HOST || '127.0.0.1', () => {
  console.log(`鑫芮商贸 H5: http://localhost:${port}/h5/h5.html#/`);
  console.log(`API mode: ${mode}${mode === 'demo' ? ' (local data only)' : ' (uses the configured live backend)'}`);
});
