// Fail closed for explicit production artifacts. This is configuration
// validation, not a substitute for business, third-party or capacity tests.
export function validateReleaseBuild(env=process.env) {
  if (env.TEA_RELEASE_BUILD!=='1') return;
  let api;
  try { api=new URL(env.H5_API_BASE); } catch { throw new Error('Production H5 requires H5_API_BASE; demo fallback is forbidden'); }
  if (api.protocol!=='https:' || api.username || api.password || api.search || api.hash || !api.pathname.endsWith('/app') || /^(localhost|127\.|0\.0\.0\.0$|\[?::1\]?$)/i.test(api.hostname)) throw new Error('Production H5 requires a credential-free public HTTPS /app API URL');
}

export function releaseScope(excludePayment=false) {
  return {
    scope:excludePayment?'non-payment':'full',
    excluded:['短信自助注册（已删除）',...(excludePayment?['真实微信及支付宝支付（用户明确排除）']:[])],
    blockers:[
      '自动实名认证及承运商实时轨迹未集成；当前提供人工核验和商家发货登记',
      '原生 App 及小程序真机未验收；当前验收范围为 H5、管理后台和 Java API',
      '目标容量、告警及全量数据库恢复演练未验收；功能测试不能代替容量验收',
      ...(!excludePayment?['第三方支付未接入及验收']:[]),
    ],
  };
}
