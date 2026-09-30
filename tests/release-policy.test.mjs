import test from 'node:test';
import assert from 'node:assert/strict';
import {validateReleaseBuild,releaseScope} from '../scripts/release-policy.mjs';
test('explicit production H5 cannot silently build the demo or embed unsafe API origins',()=>{
  for(const H5_API_BASE of ['', 'http://example.com/app','https://localhost/app','https://user:password@example.com/app','https://example.com/app?token=x','https://example.com/not-api']) assert.throws(()=>validateReleaseBuild({TEA_RELEASE_BUILD:'1',H5_API_BASE}));
  assert.doesNotThrow(()=>validateReleaseBuild({TEA_RELEASE_BUILD:'1',H5_API_BASE:'https://api.example.com/app'}));
  assert.doesNotThrow(()=>validateReleaseBuild({})); // explicitly retained local demo build
});
test('non-payment scope excludes only the payment provider, never unrelated readiness gaps',()=>{
  const scope=releaseScope(true);
  assert.equal(scope.scope,'non-payment'); assert.equal(scope.excluded.length,1);
  assert.ok(scope.blockers.some(x=>x.includes('短信')));assert.ok(scope.blockers.some(x=>x.includes('目标容量')));
  assert.ok(releaseScope().blockers.some(x=>x==='第三方支付未接入及验收'));
});
