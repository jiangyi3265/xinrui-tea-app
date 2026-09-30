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
    excluded:excludePayment?['第三方支付SDK与支付回调（用户本轮明确排除）']:[],
    blockers:[
      '短信注册/找回密码、实名和承运商轨迹未接入或未完成沙箱验收',
      '提现/分佣/卖方二次交易结算是否排除待确认，相关业务规则未齐备',
      '尚未完成全部非支付页面操作及目标设备验证',
      '生产域名、目标容量、监控告警及生产部署/恢复未验收',
      ...(!excludePayment?['第三方支付未接入及验收']:[]),
    ],
  };
}
