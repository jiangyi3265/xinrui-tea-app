import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const arg=(name,fallback)=>{const i=process.argv.indexOf(name);return i>=0?process.argv[i+1]:fallback;};
const root=path.resolve(arg('--dir','dist')),port=Number(arg('--port','5175'));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.gif':'image/gif','.webp':'image/webp','.woff':'font/woff','.ttf':'font/ttf'};
http.createServer(async(req,res)=>{try{let file=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
if(process.env.H5_API_BASE && file==='/h5/static/demo/config.js') {
  res.writeHead(200,{'Content-Type':'text/javascript; charset=utf-8','Cache-Control':'no-store'});
  return res.end('window.__H5_API_BASE__='+JSON.stringify(process.env.H5_API_BASE)+';');
}
if(file.endsWith('/'))file+='index.html';const target=path.resolve(root,'.'+file);if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}const data=await fs.readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`Static preview (no API): http://localhost:${port}/\nServing ${root}`));
