import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'acorn';
import prettier from 'prettier';

// Recover editable, formatted webpack module bodies without executing downloaded code.
const root = 'reference/runtime/static/js';
await fs.mkdir('src/pages', { recursive: true });
await fs.mkdir('src/runtime', { recursive: true });
const chunks = [];
for (const file of (await fs.readdir(root)).sort()) {
  const code = await fs.readFile(path.join(root, file), 'utf8');
  if (file.startsWith('chunk-vendors')) continue;
  const ast = parse(code, { ecmaVersion: 'latest' });
  const expression = ast.body[0].expression;
  const modules = file.startsWith('index.')
    ? expression.arguments[0]
    : expression.arguments[0].elements[1];
  const name = file.startsWith('index.') ? 'runtime/application' : 'pages/' + file.replace(/\.[a-f0-9]+\.js$/, '');
  const source = 'src/' + name + '.js';
  const body = code.slice(modules.start, modules.end);
  await fs.writeFile(source, await prettier.format(`/* Recovered H5 module map. See README.md for source limitations. */\nexport default ${body};`, { parser: 'babel' }));
  chunks.push({ file, source, prefix: code.slice(0, modules.start), suffix: code.slice(modules.end) });
}
await fs.writeFile('src/chunks.json', JSON.stringify(chunks, null, 2));
const application = await fs.readFile('reference/index.original.js', 'utf8');
const routes = [...new Set(application.match(/pages\/[A-Za-z0-9_/-]+/g))];
const endpointMap = JSON.parse(await fs.readFile('reference/endpoints.json', 'utf8'));
const catalog = routes.map(route => {
  const chunk = chunks.find(c => c.file.startsWith(route.replaceAll('/', '-') + '.'));
  return { route, source: chunk?.source, endpoints: chunk ? endpointMap[chunk.file] || [] : [] };
});
await fs.mkdir('docs', { recursive: true });
await fs.writeFile('docs/routes.json', JSON.stringify(catalog, null, 2));
await fs.writeFile('docs/PAGES.md', '# 页面与接口清单\n\n' + catalog.map(r => `## ${r.route}\n\n源模块：\`${r.source}\`\n\n${r.endpoints.map(e => '- `' + e + '`').join('\n') || '无直接接口调用。'}\n`).join('\n'));
console.log(`Recovered ${chunks.length} editable chunks and ${routes.length} page routes.`);
