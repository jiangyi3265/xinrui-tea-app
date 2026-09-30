import http from 'node:http';
import crypto from 'node:crypto';
import { createMemoryStore } from './store.mjs';
import { sharedAdmin, sharedH5 } from './shared-api.mjs';

const secret = process.env.TEA_ENGINE_SECRET;
if (!secret || secret.length < 32) throw new Error('TEA_ENGINE_SECRET must contain at least 32 characters');
const expected = crypto.createHash('sha256').update(secret).digest();
http.createServer(async (req, res) => {
  const reply = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };
  const provided = crypto.createHash('sha256').update(String(req.headers['x-tea-engine-secret'] || '')).digest();
  if (!crypto.timingSafeEqual(provided, expected)) return reply(403, { error: 'Forbidden' });
  if (req.method !== 'POST' || req.url !== '/execute') return reply(404, { error: 'Not found' });
  try {
    const chunks = []; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > 32 * 1024 * 1024) return reply(413, { error: 'State too large' }); chunks.push(chunk); }
    const { state, route, params = {}, token = '', method, actor } = JSON.parse(Buffer.concat(chunks));
    const before = structuredClone(state);
    const store = createMemoryStore(state, () => {}, 'shared');
    const subject = actor ? 'admin:' + actor.userId : store.user(token)?.member_id ? 'member:' + store.user(token).member_id : 'anonymous';
    const result = actor ? sharedAdmin(store, route, params, actor, method) : sharedH5(store, route, params, token, method);
    // Failed operations never persist partial mutations from compatibility code.
    const success = result.code === (actor ? 200 : 1);
    reply(200, { result, state: success ? state : before, subject });
  } catch (error) {
    console.error('Business execution failed:', error.name);
    reply(500, { error: 'Business execution failed; no state committed' });
  }
}).listen(Number(process.env.TEA_ENGINE_PORT || 8091), '127.0.0.1', () => console.log('Private tea engine listening on loopback'));
