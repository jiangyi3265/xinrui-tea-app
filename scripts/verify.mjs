import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';

const h5Root = process.cwd();
const adminRoot = path.resolve(h5Root, '..', 'RuoYi-Vue3');
const checks = [
  { cwd: h5Root, args: ['run', 'build'], label: 'H5 production build' },
  { cwd: h5Root, args: ['test'], label: 'H5 unit and HTTP acceptance tests' },
  { cwd: adminRoot, args: ['run', 'build:prod'], label: 'RuoYi-Vue3 production build' },
];

for (const check of checks) {
  console.log(`\n[verify] ${check.label}`);
  const result = spawnSync('npm', check.args, { cwd: check.cwd, stdio: 'inherit' });
  if (result.error) {
    console.error(`[verify] ${check.label} could not start: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`[verify] ${check.label} failed with exit code ${result.status}`);
    process.exit(result.status || 1);
  }
}
console.log('\n[verify] all local demo/admin checks passed');
