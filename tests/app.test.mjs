import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { createStore } from "../server/store.mjs";
import { demoApi } from "../server/demo-api.mjs";

function setup(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tea-test-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const store = createStore(path.join(dir, "data.json"));
  const token = demoApi(store, "/member/accountLogin", {
    phone: "13800138000",
    password: "tea-demo-2026",
  }).data.token;
  return {
    store,
    token,
    call: (route, params, method) =>
      demoApi(store, route, params, token, method),
  };
}
test("all 81 page routes have editable source and buildable JavaScript", () => {
  const routes = JSON.parse(fs.readFileSync("docs/routes.json", "utf8"));
  assert.equal(routes.length, 81);
  for (const route of routes)
    assert.ok(route.source && fs.existsSync(route.source), route.route);
  for (const file of fs.readdirSync("dist/h5/static/js"))
    new vm.Script(fs.readFileSync("dist/h5/static/js/" + file, "utf8"), {
      filename: file,
    });
});
test("public product catalogue and all four product details use local images", (t) => {
  const { call } = setup(t);
  const catalog = call("/category/getCategoryGoodsList", { page: 1 }).data.list;
  assert.equal(catalog.total, 4);
  for (const product of catalog.data) {
    const detail = call("/shopgoods/getDetails", {
      goods_id: product.goods_id,
    });
    assert.equal(detail.code, 1);
    for (const img of detail.data.detail.image)
      assert.ok(fs.existsSync("dist" + img.file_path));
  }
  assert.equal(
    call("/goods/searchShop", { keywords: "金骏眉" }).data.list.length,
    1,
  );
  assert.equal(
    call("/category/getCategoryGoodsList", { page: 2 }).data.list.data.length,
    0,
  );
});
test("wrong credentials and unauthenticated profile access are rejected", (t) => {
  const { store } = setup(t);
  assert.equal(
    demoApi(store, "/member/accountLogin", {
      phone: "13800138000",
      password: "incorrect",
    }).code,
    0,
  );
  assert.equal(demoApi(store, "/member/getMemberDetails").code, -500);
  assert.ok(!JSON.stringify(store.state).includes("tea-demo-2026"));
});
test("registration matches original form fields and keeps accounts isolated", (t) => {
  const { store, call } = setup(t);
  const result = demoApi(store, "/member/registerAnAccount", {
    mobile: "13900139000",
    nickname: "测试新用户",
    password: "test-pass-2026",
    rest_password: "test-pass-2026",
  });
  assert.equal(result.code, 1);
  assert.equal(
    demoApi(store, "/member/getMemberDetails", {}, result.data.token).data
      .nickName,
    "测试新用户",
  );
  assert.equal(call("/member/getMemberDetails").data.nickName, "本地演示");
  assert.equal(
    demoApi(store, "/member/registerAnAccount", {
      mobile: "13900139000",
      password: "test-pass-2026",
    }).code,
    0,
  );
});
test("address create, edit, default, persistence and delete", (t) => {
  const { call, store } = setup(t);
  const province = call("/region/getAllList").data[0];
  const city = province.city[0];
  const region = city.region[0];
  const fields = {
    name: "本地测试",
    phone: "13800138000",
    detail: "测试路 1 号",
    region: [province.id, city.id, region.id].join(","),
  };
  const created = call("/address/add", fields);
  assert.equal(created.code, 1);
  const id = created.data.address_id;
  assert.equal(call("/address/setDefault", { address_id: id }).code, 1);
  assert.equal(call("/address/list").data.default_id, id);
  assert.equal(
    call("/address/edit", { ...fields, address_id: id, detail: "测试路 2 号" })
      .code,
    1,
  );
  assert.equal(
    call("/address/detail", { address_id: id }).data.detail.detail,
    "测试路 2 号",
  );
  assert.equal(call("/address/edit", { ...fields, address_id: -1 }).code, 0);
  assert.equal(call("/address/delete", { address_id: id }).code, 1);
  assert.equal(store.state.users[0].addresses.length, 1);
});
test("checkout validates address and stock, creates an unpaid order, then cancels", (t) => {
  const { call, store } = setup(t);
  store.state.users[0].addresses = [];
  assert.equal(
    call("/order/order/buyNow", { goods_id: 30, goods_num: 1 }).code,
    0,
  );
  assert.equal(
    call("/order/order/buyNow", { goods_id: 30, goods_num: 2 }, "GET").code,
    0,
  );
  const province = call("/region/getAllList").data[0];
  const city = province.city[0];
  call("/address/add", {
    name: "测试",
    phone: "13800138000",
    detail: "测试地址",
    region: [province.id, city.id, city.region[0].id].join(","),
  });
  const preview = call("/order/order/buyNow", { goods_id: 30 }, "GET");
  assert.equal(preview.data.order_pay_price, "2080.00");
  assert.ok(preview.data.goods_list[0].image[0].file_path);
  const created = call("/order/order/buyNow", { goods_id: 30 });
  assert.equal(created.code, 1);
  const id = created.data.order_id;
  assert.equal(
    call("/order/shopList", { dataType: "payment" }).data.list.length,
    2,
  );
  assert.equal(call("/order/receipt", { order_id: id }).code, 0);
  assert.equal(call("/order/cancel", { order_id: id }).code, 1);
  assert.equal(call("/order/removeOrder", { order_id: id }).code, 1);
});
test("password fields cannot leak into the profile response", (t) => {
  const { call } = setup(t);
  call("/member/editMember", { pay_password: "246810", amount: "999999" });
  const profile = call("/member/getMemberDetails").data;
  assert.equal(profile.amount, "50000.00");
  assert.equal(profile.passwordHash, undefined);
  assert.equal(profile.payPasswordHash, undefined);
  assert.equal(
    call("/member/verificationPayPassword", { password: "246810" }).code,
    1,
  );
  assert.equal(
    call("/member/verificationPayPassword", { password: "999999" }).code,
    0,
  );
});
test("mock transactions validate missing orders and input", (t) => {
  const { call } = setup(t);
  for (const route of [
    "/pay/balancePay",
    "/pay/pointsPayment",
    "/order/payment",
    "/certification/addRealName",
    "/member/setSignImage",
  ]) {
    assert.equal(call(route, {}).code, 0, route);
  }
});
test("balance purchase, shipping, receipt and evaluation update all views once", (t) => {
  const { call, store } = setup(t);
  const user = store.state.users[0];
  const order = call("/order/order/buyNow", { goods_id: 30 }).data;
  const before = Number(user.amount);
  assert.equal(call("/pay/balancePay", { trade_no: order.order_sn }).code, 1);
  assert.equal(Number(user.amount), before - 2080);
  assert.equal(call("/pay/balancePay", { trade_no: order.order_sn }).code, 1);
  assert.equal(Number(user.amount), before - 2080);
  assert.equal(
    call("/order/detail", { order_id: order.order_id }).data.order.status,
    "received",
  );
  assert.equal(
    call("/order/express", { order_id: order.order_id }).data.courier.length,
    3,
  );
  assert.equal(call("/order/receipt", { order_id: order.order_id }).code, 1);
  assert.equal(
    call("/order/evaluation", {
      order_id: order.order_id,
      content_text: "茶香很好",
    }).code,
    1,
  );
  assert.equal(
    call("/order/evaluation", {
      order_id: order.order_id,
      content_text: "重复",
    }).code,
    0,
  );
  assert.ok(
    call("/goods/getGoodsEvaluation", { goods_id: 30 }).data.list.data.some(
      (x) => x.content === "茶香很好",
    ),
  );
  assert.equal(
    call("/order/detail", { order_id: order.order_id }).data.order
      .evaluation_status,
    20,
  );
});
test("points recharge is idempotent and points purchase debits the same balance", (t) => {
  const { call, store } = setup(t),
    user = store.state.users[0],
    before = Number(user.score);
  const result = call("/recharge/toOrder", {
    recharge_id: 1,
    pay_type: 2,
    pay_image: "/uploads/test.png",
  });
  assert.equal(result.code, 1);
  assert.equal(Number(user.score), before + 555);
  assert.equal(
    call("/recharge/toOrder", {
      recharge_id: 1,
      pay_type: 2,
      pay_image: "/uploads/test.png",
    }).data,
    result.data,
  );
  assert.equal(Number(user.score), before + 555);
  const order = call("/order/order/buyNow", {
    goods_id: 31,
    pay_type: 4,
    order_type: 5,
  }).data;
  assert.equal(
    call("/pay/pointsPayment", { trade_no: order.order_sn }).code,
    1,
  );
  assert.equal(Number(user.score), before + 555 - 1580);
  assert.ok(
    call("/recharge/integralList").data.list.some(
      (x) => x.order_id === order.order_id,
    ),
  );
});
test("warehouse voucher, consignment fee and withdrawal form a persistent flow", (t) => {
  const { call, store } = setup(t),
    user = store.state.users[0];
  const pending = user.warehouse.find(
    (x) => x.side === 0 && x.pay_status === "待支付",
  );
  const bill = user.settlements.find(
    (x) => x.order_id === pending.order_id && x.direction === "out",
  );
  assert.equal(
    call("/order/payment_voucher", {
      id: bill.id,
      pay_type: 2,
      payment_voucher: "/uploads/receipt.png",
    }).code,
    1,
  );
  assert.equal(pending.pay_status, "结算完毕");
  const before = Number(user.e_card_number);
  assert.equal(
    call("/order/toServiceChargeWithVoucher", {
      order_id: pending.order_id,
      use_coupon: "1",
      use_amount: "1",
    }).code,
    1,
  );
  assert.equal(pending.pay_status, "寄卖中");
  assert.equal(Number(user.e_card_number), before - 104);
  call("/order/toServiceChargeWithVoucher", {
    order_id: pending.order_id,
    use_coupon: "1",
    use_amount: "1",
  });
  assert.equal(Number(user.e_card_number), before - 104);
  const ready = user.warehouse.find(
    (x) => x.side === 0 && x.pay_status === "结算完毕",
  );
  const delivery = call("/demo/orders/delivery", { order_id: ready.order_id });
  assert.equal(delivery.code, 1);
  assert.equal(
    call("/order/detail", { order_id: delivery.data.order_id }).data.order
      .status,
    "received",
  );
});
test("consignment cash voucher and collection are idempotent", (t) => {
  const { call, store } = setup(t),
    user = store.state.users[0];
  const ready = user.warehouse.find(
    (x) => x.side === 0 && x.pay_status === "结算完毕",
  );
  const result = call("/order/toServiceChargeWithVoucher", {
    order_id: ready.order_id,
    use_coupon: "0",
    use_amount: "0",
  });
  assert.equal(result.code, 1);
  assert.equal(ready.pay_status, "待缴上架费");
  assert.equal(
    call("/order/uploadListingFeeVoucher", {
      voucher_id: result.data.voucher_id,
      voucher_image: "/uploads/test.png",
    }).code,
    1,
  );
  assert.equal(ready.pay_status, "寄卖中");
  const bill = user.settlements.find(
      (x) => x.direction === "in" && x.pay_status === 1,
    ),
    before = Number(user.amount);
  assert.equal(call("/order/confirm_payment_voucher", { id: bill.id }).code, 1);
  assert.equal(Number(user.amount), before + Number(bill.pay_price));
  call("/order/confirm_payment_voucher", { id: bill.id });
  assert.equal(Number(user.amount), before + Number(bill.pay_price));
});
test("SMS reset, collection settings, signature, and card binding are local simulations", (t) => {
  const { call, store } = setup(t);
  assert.match(call("/v1/sms", { phone: "13800138000" }).msg, /123456/);
  assert.equal(
    call("/member/editPwd", { phone: "13800138000", code: "000000" }).code,
    0,
  );
  assert.equal(
    call("/member/editPwd", { phone: "13800138000", code: "123456" }).code,
    1,
  );
  assert.equal(
    call("/member/editPwd", {
      phone: "13800138000",
      password: "updated-demo",
      real_pwd: "updated-demo",
    }).code,
    1,
  );
  assert.equal(
    demoApi(store, "/member/accountLogin", {
      phone: "13800138000",
      password: "updated-demo",
    }).code,
    1,
  );
  assert.equal(
    call("/member/setPay", {
      bank: "演示银行",
      bank_name: "测试",
      bank_card: "DEMO-1111",
      code: "123456",
    }).code,
    1,
  );
  assert.equal(
    call("/member/getMemberDetails").data.pay_info.bank_card,
    "DEMO-1111",
  );
  assert.equal(
    call("/member/setSignImage", { url: "/uploads/sign.png" }).code,
    1,
  );
  assert.equal(
    call("/certification/addRealName", { certification_name: "测试签约" }).code,
    1,
  );
  assert.equal(call("/member/getNotice").data.is_sign, 1);
  const apply = call("/card/bindingCard", {
    card_no: "DEMO-2222",
    card_name: "测试",
    phone: "13800138000",
  }).data.id;
  assert.equal(
    call("/card/bindAdaPayCard", { apply_id: apply, sms_code: "123456" }).code,
    1,
  );
  assert.ok(
    call("/card/cardList").data.fast_cards.some(
      (x) => x.card_no === "DEMO-2222",
    ),
  );
  assert.equal(call("/dg/unbindCard", { token_no: apply }).code, 1);
  assert.ok(
    !call("/card/cardList").data.fast_cards.some(
      (x) => x.card_no === "DEMO-2222",
    ),
  );
});
test("transfer, coupons and new accounts do not leak another account state", (t) => {
  const { call, store } = setup(t);
  const before = Number(call("/member/getMemberDetails").data.e_card_number);
  assert.equal(
    call("/member/toTransfer", { mobile: "13800000001", price: 20 }).code,
    1,
  );
  assert.equal(
    Number(call("/member/getMemberDetails").data.e_card_number),
    before - 20,
  );
  assert.equal(
    call("/member/toTransfer", { mobile: "13800000001", price: 999999 }).code,
    0,
  );
  const coupon = call("/demo/coupons", { status: 0 }).data[0];
  const order = call("/order/order/buyNow", {
    goods_id: 30,
    coupon_id: coupon.id,
  }).data;
  assert.equal(
    call("/order/detail", { order_id: order.order_id }).data.order.pay_price,
    "2030.00",
  );
  call("/pay/balancePay", { trade_no: order.order_sn });
  assert.equal(call("/demo/coupons", { status: 1 }).data.length, 2);
  const registered = demoApi(store, "/member/registerAnAccount", {
    mobile: "13900000001",
    password: "demo-password",
    rest_password: "demo-password",
  });
  const other = store.user(registered.data.token);
  assert.equal(other.orders.length, 12);
  assert.equal(other.reviews.length, 0);
  assert.notEqual(other.coupons[0].id, coupon.id);
});
test("WeChat/Alipay simulators settle orders once without debiting the local wallet", (t) => {
  const { call, store } = setup(t);
  const before = Number(store.state.users[0].amount);
  const order = call("/order/order/buyNow", { goods_id: 31, pay_type: 3 }).data;
  assert.ok(order.jump_url.startsWith("/h5/h5.html#"));
  assert.ok(order.jump_url.includes("demo_pay_order="));
  assert.equal(
    call("/demo/pay", { order_id: order.order_id, channel: "支付宝" }).code,
    1,
  );
  assert.equal(
    call("/demo/pay", { order_id: order.order_id, channel: "支付宝" }).code,
    1,
  );
  assert.equal(Number(store.state.users[0].amount), before);
  assert.equal(
    call("/order/detail", { order_id: order.order_id }).data.order.state_text,
    "待收货",
  );
  const points = call("/score/getDetails", { goods_id: 30 }).data.detail;
  const preview = call(
    "/order/order/buyNow",
    { goods_id: 30, goods_sku_id: points.spec[0].spec_sku_id },
    "GET",
  ).data;
  assert.equal(preview.order_pay_price, "0.00");
  assert.equal(preview.order_total_score_price, "2080.00");
  assert.equal(preview.goods_list[0].goods_price, "0.00");
});
test("all reference endpoints have a concrete mock handler or explicit input validation", (t) => {
  const { call } = setup(t);
  const endpoints = new Set(
    Object.values(
      JSON.parse(fs.readFileSync("reference/endpoints.json")),
    ).flat(),
  );
  for (const route of endpoints) {
    const response = call(route, {}, "GET");
    assert.notEqual(response.msg, "未识别的演示操作", route);
  }
});
