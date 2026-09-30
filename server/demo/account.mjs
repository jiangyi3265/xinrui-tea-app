import { passwordHash, passwordMatches } from "../store.mjs";
import {
  ok,
  fail,
  clone,
  money,
  now,
  entry,
  payInfo,
  receipt,
  paginate,
  products,
  avatar,
} from "./data.mjs";
const packages = [555, 666, 888, 999, 1299, 3999].map((n, i) => ({
  recharge_id: i + 1,
  face_value: String(n),
  price: String(n),
  give_price: "0",
  title: n + "积分",
}));
export function accountApi(store, user, route, p, method) {
  const done = (data = {}, msg = "操作成功（本地模拟）") => {
    store.save();
    return ok(data, msg);
  };
  if (route === "/member/getMemberDetails") {
    const fields = [
      "member_id",
      "phone",
      "nickName",
      "headimg",
      "amount",
      "score",
      "e_card_number",
      "invitation_code",
      "is_advance",
      "advance_expired",
      "identity_name",
      "sign_image",
    ];
    const profile = Object.fromEntries(fields.map((k) => [k, user[k] ?? ""]));
    return ok({
      ...profile,
      avatarUrl: user.headimg,
      mobile: user.phone,
      z_phone: user.phone,
      pay_info: user.payment,
      ...user.payment,
    });
  }
  if (route === "/member/verificationPayPassword")
    return passwordMatches(
      p.pwd || p.password || p.pay_password,
      user.payPasswordHash,
    )
      ? ok(1)
      : fail("支付密码不正确");
  if (
    route === "/member/editMember" &&
    p.pay_password &&
    !/^\d{6}$/.test(p.pay_password)
  )
    return fail("支付密码必须为六位数字");
  if (route === "/member/editPwd") {
    if (method === "GET") return ok({ z_phone: user.phone });
    if (p.code) {
      if (p.phone !== user.phone || p.code !== "123456")
        return fail("演示验证码为 123456");
      user.passwordResetUntil = Date.now() + 600000;
      return done();
    }
    if (String(p.password || "").length < 6) return fail("密码至少六位");
    if (p.real_pwd !== undefined && p.real_pwd !== p.password)
      return fail("两次密码不一致");
    if (
      !(user.passwordResetUntil > Date.now()) &&
      !passwordMatches(p.old_password || p.oldpassword, user.passwordHash)
    )
      return fail("请先验证手机号或当前密码");
    user.passwordHash = passwordHash(p.password);
    delete user.passwordResetUntil;
    return done({}, "密码已修改");
  }
  if (route === "/member/setPay") {
    const keys = [...Object.keys(payInfo), "bank_branch"];
    const changed = Object.fromEntries(
      keys
        .filter((k) => p[k] !== undefined)
        .map((k) => [k, String(p[k]).slice(0, 500)]),
    );
    if (!Object.keys(changed).length) return fail("请填写收款信息");
    if (p.code && p.code !== "123456") return fail("演示验证码为 123456");
    Object.assign(user.payment, changed);
    return done();
  }
  if (route === "/member/getNotice")
    return ok({
      is_sign: user.sign_image ? 1 : 0,
      content:
        "鑫芮商贸寄卖服务协议\n\n一、商品以详情页展示的名称、价格及规格为准。\n二、寄卖前请核对商品、上架券抵扣与余额支付金额。\n三、付款后请上传凭证，收款方核实后确认。\n四、请妥善保管账号与交易凭证。\n\n当前为静态演示，签名仅保存在本机，用于体验签约流程，不形成实际合同。",
    });
  if (route === "/member/setSignImage") {
    if (!p.url) return fail("请先签名");
    user.sign_image = p.url;
    return done();
  }
  if (route === "/certification/getIsRealName")
    return user.identity_name
      ? ok(1, "已完成模拟认证")
      : fail("请先完成签约认证");
  if (route === "/certification/addRealName") {
    if (!p.certification_name) return fail("请填写姓名");
    user.identity_name = p.certification_name;
    return done({}, "模拟签约完成");
  }
  if (route === "/member/isOpening")
    return {
      code: 1,
      msg: { status: user.bankOpened ? 1 : 0 },
      data: user.bankOpened ? 1 : 0,
    };
  if (route === "/dg/getIsOpen") return ok(user.bankOpened ? 2 : 0);
  if (["/dg/openAccount", "/member/accountOpening"].includes(route)) {
    user.bankOpened = true;
    return done({}, "模拟账户已开通");
  }
  if (route === "/card/cardList")
    return ok({ fast_cards: user.cards, list: user.cards });
  if (route === "/dg/getBankList") return ok(user.cards);
  if (["/card/bindingCard", "/dg/bankApply"].includes(route)) {
    if (!p.card_no && !p.card_id) return fail("请填写银行卡号");
    const id = String(store.id());
    user.pendingCards[id] = {
      ...p,
      card_no: p.card_no || p.card_id,
      card_mp: p.phone || p.card_mp,
      card_name: p.card_name,
      bank_name: p.bank || "演示银行",
    };
    return done(
      { id, trans_id: id, order_id: id, order_date: now() },
      "演示验证码：123456",
    );
  }
  if (["/card/bindAdaPayCard", "/dg/bankApplyConfirm"].includes(route)) {
    if ((p.sms_code || p.verify_code) !== "123456")
      return fail("演示验证码为 123456");
    const id = String(p.apply_id || p.trans_id || p.order_id),
      pending = user.pendingCards[id];
    if (!pending) return fail("请先申请绑卡");
    user.cards.push({ ...pending, card_id: id, token_no: id });
    delete user.pendingCards[id];
    return done({}, "模拟绑定成功");
  }
  if (route === "/dg/unbindCard") {
    user.cards = user.cards.filter((c) => c.token_no !== p.token_no);
    return done();
  }
  if (route === "/member/getTransfer")
    return ok({ e_card_number: user.e_card_number, mobile: user.phone });
  if (route === "/member/toTransfer") {
    const amount = Number(p.price);
    if (!Number.isFinite(amount) || amount <= 0)
      return fail("请输入正确转赠数量");
    if (!/^1\d{10}$/.test(p.mobile || "") || p.mobile === user.phone)
      return fail("请输入其他用户的手机号");
    if (amount > Number(user.e_card_number)) return fail("可转赠上架券不足");
    entry(store, user, "e_card_number", -amount, "转赠给 " + p.mobile);
    const recipient = store.state.users.find((u) => u.phone === p.mobile);
    if (recipient)
      entry(
        store,
        recipient,
        "e_card_number",
        amount,
        "收到 " + user.phone + " 的转赠",
      );
    return done({}, "模拟转赠成功");
  }
  if (route === "/finance/getAmountInfo")
    return ok({
      amount: { member_amount: user.amount },
      balance: user.amount,
      total: user.amount,
    });
  if (
    [
      "/finance/getAmountLogList",
      "/member/getECardList",
      "/recharge/integralList",
    ].includes(route)
  ) {
    const field =
      route === "/finance/getAmountLogList"
        ? "amount"
        : route === "/member/getECardList"
          ? "e_card_number"
          : "score";
    let list = user.ledger.filter((x) => x.field === field);
    if (p.type === "1" || p.type === "2")
      list = list.filter((x) => String(x.type) === p.type);
    return ok({
      list: paginate(list, p).data,
      total: list.length,
      score: user.score,
      amount: user.amount,
      e_card_number: user.e_card_number,
    });
  }
  if (route === "/recharge/lists")
    return ok({
      list: packages,
      balance: user.amount,
      set: "充值成功后即时增加演示积分。仅用于本地体验，不会产生真实扣款。",
    });
  if (route === "/recharge/getOrder") {
    const pack =
      p.custom_price && Number(p.custom_price) > 0
        ? {
            face_value: money(p.custom_price),
            price: money(p.custom_price),
            recharge_id: 0,
          }
        : packages.find(
            (x) => String(x.recharge_id) === String(p.recharge_id),
          ) || packages[0];
    return ok({ recharge_info: pack, payInfo });
  }
  if (route === "/recharge/toOrder") {
    const pack = packages.find(
      (x) => String(x.recharge_id) === String(p.recharge_id),
    );
    const value = Number(p.custom_price || pack?.price);
    if (!Number.isFinite(value) || value <= 0 || value > 1000000)
      return fail("请输入有效充值金额");
    if (!p.pay_image) return fail("请上传付款凭证");
    const existing = user.recharges.find(
      (x) => x.pay_image === p.pay_image && Number(x.price) === value,
    );
    if (existing) return ok(existing.order_id, "该充值凭证已处理");
    const order_id = store.id();
    const record = {
      ...p,
      order_id,
      order_no: "DEMO-R" + order_id,
      face_value: money(value),
      actual_score: money(value),
      amount: money(value),
      price: money(value),
      create_time: now(),
      status: 1,
      status_text: "已到账",
    };
    user.recharges.unshift(record);
    entry(store, user, "score", value, "充值积分（模拟）", order_id);
    return done(order_id, "模拟充值成功");
  }
  if (route === "/recharge/getOk") {
    const r =
      user.recharges.find((x) => String(x.order_id) === String(p.order_id)) ||
      user.recharges[0];
    return ok({
      ...r,
      pay_time: r.create_time,
      pay_price: r.price,
      pay_type: {
        value: r.pay_type,
        text:
          Number(r.pay_type) === 1
            ? "微信（模拟）"
            : Number(r.pay_type) === 2
              ? "支付宝（模拟）"
              : "银行卡（模拟）",
      },
      recharge_info: r,
    });
  }
  if (route === "/ustd/recharge")
    return ok({
      address:
        Number(p.type) === 2
          ? "DEMO-ERC20-NOT-A-PAYMENT-ADDRESS"
          : "DEMO-TRC20-NOT-A-PAYMENT-ADDRESS",
      min_price: 1,
      rate: 7,
      recharge_min: 1,
      tips: "模拟充值地址，请勿转入真实资产。",
      content: "上传凭证后在本地模拟到账 100 积分。",
    });
  if (route === "/usdt/addvoucher") {
    if (!p.image) return fail("请上传充值凭证");
    if (user.recharges.some((x) => x.pay_image === p.image))
      return ok({}, "该凭证已处理");
    const id = store.id();
    user.recharges.unshift({
      order_id: id,
      order_no: "DEMO-U" + id,
      amount: "100.00",
      price: "100.00",
      actual_score: "100.00",
      face_value: "100.00",
      pay_image: p.image,
      status: 1,
      status_text: "已到账",
      create_time: now(),
    });
    entry(store, user, "score", 100, "凭证充值（模拟）", id);
    return done();
  }
  if (route === "/ustd/rechargeLog")
    return ok(
      paginate(
        user.recharges.map((x) => ({
          ...x,
          remarks:
            x.status_text + " · " + (x.recharge_id ? "积分充值" : "凭证充值"),
        })),
        p,
      ),
    );
  if (route === "/member/getApplyList")
    return ok([
      {
        id: 1,
        money: "200.00",
        amount: "200.00",
        actual_money: "200.00",
        actual_amount: "200.00",
        pay_type: 1,
        status: 1,
        status_text: "已完成",
        create_time: now(4),
        type: "余额提现",
        remark: "历史演示记录",
      },
    ]);
  if (route === "/demo/coupons")
    return ok(
      user.coupons.filter(
        (x) => p.status === undefined || String(x.status) === String(p.status),
      ),
    );
  if (route === "/member/member/getPoster")
    return ok({
      bg_img: ["/h5/static/demo/poster.jpg"],
      member: {
        member_id: user.member_id,
        nickName: user.nickName,
        nickname: user.nickName,
        invitation_code: user.invitation_code,
        mobile: user.phone,
        avatarUrl: user.headimg,
      },
    });
  if (route === "/merchant/isStoreApply") return ok(0);
  if (route === "/member/getIsOpenId") return ok(1);
  if (route === "/member/bindOpenId") return done();
}
