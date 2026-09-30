import fixtures from "../fixtures/public.json" with {type:"json"};
import { passwordHash } from "../store.mjs";

export const clone = (value) => structuredClone(value);
export const ok = (data = {}, msg = "操作成功") => ({ code: 1, msg, data });
export const fail = (msg) => ({ code: 0, msg, data: {} });
export const money = (value) =>
  (Math.round(Number(value) * 100) / 100).toFixed(2);
export const now = (days = 0) =>
  new Date(Date.now() - days * 86400000).toLocaleString("sv-SE", {
    timeZone: "Asia/Shanghai",
  });
export const paginate = (items, p = {}) => {
  const page = Math.max(1, Number(p.page) || 1),
    size = Math.max(1, Math.min(100, Number(p.listRows || p.limit) || 10));
  return {
    data: items.slice((page - 1) * size, page * size),
    total: items.length,
    current_page: page,
    last_page: Math.max(1, Math.ceil(items.length / size)),
    per_page: size,
  };
};
export const products =
  fixtures["/category/getCategoryGoodsList"].data.list.data;
// 管理后台和用户端共享的商品目录。首次使用时仍回退到发布包内置目录，
// 管理端修改后会把目录写入 data.json，并由所有用户接口读取同一份数据。
export const catalog = (store) => {
  if (!store?.state) return products;
  // Never mutate the module-level fixture: each test/deployment needs an
  // isolated catalogue so stock reservations cannot leak across stores.
  if (!Array.isArray(store.state.catalog)) store.state.catalog = clone(products);
  return store.state.catalog;
};
export const isPublished = (product) => Number(product?.approvalStatus ?? 10) === 10;
export const publicCatalog = (store) => catalog(store).filter(isPublished);
export const avatar = "/h5/static/img/photo.e65d4f32.png";
export const receipt = "/h5/static/demo/receipt.svg";
export const payInfo = {
  bank: "演示银行",
  bank_name: "鑫芮商贸（模拟账户）",
  bank_card: "DEMO-0000-0000",
  branch: "演示支行",
  mobile: "13800138000",
  wx_name: "鑫芮商贸（模拟）",
  wx_account: "DEMO-WECHAT",
  wx_mobile: "13800138000",
  wx_image: receipt,
  zfb_name: "鑫芮商贸（模拟）",
  zfb_account: "DEMO-ALIPAY",
  zfb_mobile: "13800138000",
  zfb_image: receipt,
};
export const states = {
  payment: "待付款",
  forwarding: "待发货",
  received: "待收货",
  evaluation: "待评价",
  completed: "已完成",
  cancelled: "已取消",
};
export function makeOrder(
  id,
  product,
  status,
  type = 4,
  address = {},
  quantity = 1,
) {
  const price = money(Number(product.goods_min_price) * quantity),
    paid = !["payment", "cancelled"].includes(status),
    delivered = ["received", "evaluation", "completed"].includes(status),
    received = ["evaluation", "completed"].includes(status);
  return {
    order_id: id,
    order_sn: "DEMO" + id,
    order_no: "DEMO" + id,
    goods_id: product.goods_id,
    order_type: type,
    status,
    state_text: states[status],
    pay_price: price,
    total_price: price,
    order_total_price: price,
    order_pay_price: price,
    order_total_score_price: price,
    express_price: "0.00",
    address: clone(address),
    exist_address: true,
    create_time: now(2),
    pay_time: paid ? now(1) : "",
    leave_message: "",
    pay_type: {
      value: type === 5 ? 4 : 2,
      text: type === 5 ? "积分支付" : "余额支付",
    },
    pay_status: { value: paid ? 20 : 10, text: paid ? "已付款" : "待付款" },
    delivery_status: {
      value: delivered ? 20 : 10,
      text: delivered ? "已发货" : "待发货",
    },
    receipt_status: {
      value: received ? 20 : 10,
      text: received ? "已收货" : "待收货",
    },
    order_status: {
      value: status === "cancelled" ? 20 : received ? 30 : 10,
      text: states[status],
    },
    evaluation_status: status === "completed" ? 20 : 10,
    goods: [
      {
        ...clone(product),
        image: { file_path: product.goods_image },
        goods_price: product.goods_min_price,
        score_price: product.goods_min_price,
        goods_attr: "精品礼盒装",
        total_num: quantity,
        goods_num: quantity,
        total_price: price,
      },
    ],
    express_company: "顺丰速运（模拟）",
    express_no: "DEMO" + id,
  };
}
export function makeWarehouse(id, product, status = "待支付", side = 0) {
  return {
    order_id: id,
    order_no: "DEMO-W" + id,
    goods_id: product.goods_id,
    goods_name: product.goods_name,
    image: product.goods_image,
    goods_image: product.goods_image,
    goods_price: product.goods_min_price,
    pay_price: product.goods_min_price,
    pay_status: status,
    pay_status_text: status,
    status_text: status,
    side,
    member_id: 1,
    specialarea_id: 1,
    create_time: now(2),
    pay_time: status === "待支付" ? "" : now(1),
    total_num: 1,
    goods_num: 1,
    e_price: money(Number(product.goods_min_price) * 0.05),
    value: product.goods_min_price,
    cancel_btn_show: { value: status === "待支付" ? 10 : 20 },
    is_delivery: 0,
    is_split: 0,
    is_consignment: 0,
    transposition_time_text: "随时可寄卖",
    sell_member: {
      member_nickName: "茶友小林",
      nickName: "茶友小林",
      phone: "13800000001",
      mobile: "13800000001",
    },
    member: {
      nickName: "本地演示",
      phone: "13800138000",
      mobile: "13800138000",
    },
    consignment_member_name: "茶友小林",
    content:
      fixtures["/shopgoods/getDetails:" + product.goods_id]?.data.detail
        .content || "<p>精选茶叶，原产地直供。请置于阴凉干燥处保存。</p>",
  };
}
export function entry(store, user, field, delta, remark, orderId = "") {
  const value = Number(delta);
  if (!Number.isFinite(value)) throw new Error("Invalid ledger amount");
  user[field] = money(Number(user[field]) + value);
  user.ledger.unshift({
    id: store.id(),
    field,
    amount: money(value),
    money: money(value),
    value: money(value),
    score: money(value),
    e_card_number: money(value),
    change_amount: money(value),
    balance: user[field],
    type: value >= 0 ? 1 : 2,
    remark,
    remarks: remark,
    title: remark,
    content: remark,
    order_id: orderId,
    create_time: now(),
    status_text: "已完成",
  });
}
export function seedUser(store, user) {
  if (store.mode === 'shared') {
    for (const key of ['addresses','orders','ledger','warehouse','settlements','listingFees','recharges','cards','reviews','reports','subscriptions','coupons','withdrawals']) user[key] ||= [];
    user.payment ||= {};
    user.pendingCards ||= {};
    return;
  }
  if (!user.payPasswordHash) {
    user.payPasswordHash = passwordHash("246810");
    store.save();
  }
  if (user.demoVersion === 2) return;
  user.demoVersion = 2;
  user.amount = "50000.00";
  user.score = "20000.00";
  user.e_card_number = "2000.00";
  user.payment = { ...payInfo, ...(user.payment || {}) };
  user.avatarUrl = user.headimg || avatar;
  user.addresses ||= [];
  user.orders ||= [];
  user.ledger ||= [];
  if (!user.addresses.length) {
    const province =
      fixtures["/region/getAllList"].data.find((x) => x.name === "福建省") ||
      fixtures["/region/getAllList"].data[0];
    const city =
        province.city.find((x) => x.name === "福州市") || province.city[0],
      region = city.region.find((x) => x.name === "鼓楼区") || city.region[0];
    user.addresses.push({
      address_id: store.id(),
      name: "演示用户",
      phone: user.phone,
      detail: "茶文化园 1 栋 101 室",
      region: { province: province.name, city: city.name, region: region.name },
      province_id: province.id,
      city_id: city.id,
      region_id: region.id,
      is_default: 1,
    });
  }
  for (const type of [4, 5])
    for (const [index, status] of Object.keys(states).entries())
      user.orders.push(
        makeOrder(
          store.id(),
          products[index % products.length],
          status,
          type,
          user.addresses[0],
        ),
      );
  user.warehouse = ["待支付", "审核中", "结算完毕", "结算完毕"].map((s, i) =>
    makeWarehouse(store.id(), products[i], s),
  );
  user.warehouse.push(
    ...["寄卖中", "待收款", "结算完毕"].map((s, i) =>
      makeWarehouse(store.id(), products[i], s, 1),
    ),
  );
  user.settlements = [];
  for (const direction of ["out", "in"])
    for (let i = 0; i < 3; i++) {
      const order =
        user.warehouse[direction === "out" ? Math.min(i, 2) : i + 4];
      user.settlements.push({
        id: store.id(),
        order_id: order.order_id,
        order_no: order.order_no,
        direction,
        specialarea_id: 1,
        pay_price: order.pay_price,
        pay_status: i,
        createtime: now(2 - i),
        create_time: now(2 - i),
        pay_image: i ? receipt : "",
        payment_voucher: i ? receipt : "",
        pay_type: 2,
        user: {
          nickName: direction === "out" ? "茶友小林" : "茶友小陈",
          mobile: "13800000001",
        },
        pay: clone(payInfo),
        goods_name: order.goods_name,
        goods_image: order.image,
        goods_price: order.goods_price,
      });
    }
  user.listingFees = [0, 1, 2, 3].map((status, i) => ({
    voucher_id: store.id(),
    order_id: user.warehouse[2].order_id,
    order_no: "DEMO-F" + i,
    goods_name: products[i].goods_name,
    goods_image: products[i].goods_image,
    cash_amount: "54.00",
    coupon_deduct: "50.00",
    total_fee: "104.00",
    status,
    status_text: ["待上传凭证", "待审核", "已通过", "已驳回"][status],
    voucher_image: status ? receipt : "",
    remark: status === 3 ? "演示：图片不清晰，请重新上传" : "",
    create_time: now(i),
  }));
  user.recharges = [
    {
      order_id: store.id(),
      order_no: "DEMO-R001",
      recharge_id: 1,
      price: "555.00",
      face_value: "555.00",
      amount: "555.00",
      actual_score: "555.00",
      status: 1,
      status_text: "已到账",
      create_time: now(3),
      pay_type: 2,
      pay_image: receipt,
    },
  ];
  user.cards = [
    {
      card_id: "DEMO-C1",
      token_no: "DEMO-C1",
      bank_name: "演示银行",
      bank: "演示银行",
      card_no: "6222000000000000",
      card_id_text: "尾号 0000",
      card_name: "演示用户",
      card_mp: user.phone,
      bank_card_type: "1",
    },
  ];
  user.bankOpened = true;
  user.pendingCards = {};
  user.reviews = [];
  user.reports = [];
  user.subscriptions = [];
  user.coupons = [
    {
      id: store.id(),
      amount: 50,
      title: "新人礼券",
      min_amount: 500,
      status: 0,
      expires: "2027-12-31",
    },
    {
      id: store.id(),
      amount: 100,
      title: "茶礼满减券",
      min_amount: 1500,
      status: 0,
      expires: "2027-12-31",
    },
    {
      id: store.id(),
      amount: 30,
      title: "会员回馈券",
      min_amount: 300,
      status: 1,
      expires: "2027-12-31",
    },
    {
      id: store.id(),
      amount: 20,
      title: "限时礼券",
      min_amount: 200,
      status: 2,
      expires: "2026-01-01",
    },
  ];
  for (const [field, amount, title] of [
    ["amount", 50000, "演示初始余额"],
    ["score", 20000, "演示初始积分"],
    ["e_card_number", 2000, "演示初始上架券"],
  ]) {
    const previous = user[field];
    user[field] = "0.00";
    entry(store, user, field, amount, title);
    user[field] = previous;
  }
  store.save();
}
export function feeInfo(user, order) {
  const fee = Number(order.e_price || Number(order.goods_price) * 0.05);
  return {
    ...order,
    e_price: money(fee),
    e_percentage: 5,
    total_fee: money(fee),
    member_amount: user.amount,
    amount_deduct_open: "10",
    coupon_deduct: money(Math.min(Number(user.e_card_number), fee)),
    cash_amount: money(Math.max(0, fee - Number(user.e_card_number))),
    consignment_goods_price: money(Number(order.goods_price) * 1.1),
    goods_price: order.goods_price,
  };
}

export {fixtures};
