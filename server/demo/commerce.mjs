import {
  ok,
  fail,
  clone,
  money,
  now,
  products,
  makeOrder,
  makeWarehouse,
  entry,
  feeInfo,
  receipt,
  payInfo,
  paginate,
  catalog,
  isPublished,
} from "./data.mjs";
import { ensureAuctions } from './auction.mjs';
const viewOrder = (o) =>
  o.order_type === 5
    ? {
        ...o,
        pay_price: "0.00",
        total_price: "0.00",
        goods: o.goods.map((g) => ({ ...g, goods_price: "0.00" })),
      }
    : o;
export function commerceApi(store, user, route, p, method) {
  const products = catalog(store);
  const done = (data = {}, msg = "操作成功（本地模拟）") => {
    store.save();
    return ok(data, msg);
  };
  const product = products.find(
    (x) => String(x.goods_id) === String(p.goods_id || p.id || 30),
  );
  const order = user.orders.find(
    (x) =>
      String(x.order_id) === String(p.order_id) ||
      [p.trade_no, p.order_sn, p.order_no].filter(Boolean).includes(x.order_sn),
  );
  const warehouse = user.warehouse.find(
    (x) =>
      String(x.order_id) === String(p.order_id) ||
      (p.order_no && x.order_no === p.order_no),
  );
  const charge = (o, field) => {
    if (o.pay_status.value === 20)
      return ok({ order_id: o.order_id }, "订单已支付，请勿重复付款");
    if (o.order_status.value !== 10) return fail("订单已关闭");
    if (Number(user[field]) < Number(o.pay_price))
      return fail(field === "score" ? "积分不足，请先充值" : "余额不足");
    const coupon = user.coupons.find((x) => x.id === o.coupon_id);
    if (coupon && coupon.status !== 0) return fail("优惠券已使用，请重新下单");
    if (coupon) coupon.status = 1;
    entry(
      store,
      user,
      field,
      -Number(o.pay_price),
      field === "score" ? "积分兑换" : "商城购物",
      o.order_id,
    );
    o.pay_status = { value: 20, text: "已付款" };
    o.pay_time = now();
    o.status = "received";
    o.state_text = "待收货";
    o.delivery_status = { value: 20, text: "已发货" };
    o.pay_type = {
      value: field === "score" ? 4 : 2,
      text: field === "score" ? "积分支付" : "余额支付",
    };
    // The mock warehouse dispatches immediately, making logistics/receipt/review usable without an admin service.
    return done({ order_id: o.order_id }, "模拟支付成功，商品已模拟发货");
  };
  if (["/order/order/buyNow", "/order/originalPricePurchase"].includes(route)) {
    const quantity = Math.max(1, Math.floor(Number(p.goods_num) || 1));
    if (!product || !isPublished(product)) return fail("商品已下架");
    if (store.mode === 'shared' && ensureAuctions(store).some(a=>String(a.goodsId)===String(product.goods_id) && ['scheduled','running'].includes(a.status))) return fail('竞价商品请通过出价参与');
    if (quantity > Number(product.spec?.[0]?.stock_num || 0))
      return fail("商品库存不足");
    const selectedAddress = user.addresses.find(
      (a) => String(a.address_id) === String(p.address_id),
    );
    // An explicitly selected stale/foreign address must never silently turn
    // into a different delivery destination. Omitted IDs retain default preview.
    if (store.mode === 'shared' && p.address_id !== undefined && p.address_id !== null && p.address_id !== '' && !selectedAddress)
      return fail('收货地址不存在或不可用，请重新选择本人的地址');
    const address =
      selectedAddress ||
      user.addresses.find((a) => a.is_default) ||
      user.addresses[0];
    const gross = Number(product.goods_min_price) * quantity;
    const coupon = user.coupons.find(
      (x) =>
        String(x.id) === String(p.coupon_id) &&
        x.status === 0 &&
        gross >= x.min_amount,
    );
    const total = money(gross - (coupon?.amount || 0));
    const points =
      String(p.order_type) === "5" ||
      String(p.pay_type) === "4" ||
      String(p.goods_sku_id || "").startsWith("score");
    const goods = {
      ...clone(product),
      product_types: points ? 3 : 2,
      goods_price: product.goods_min_price,
      score_price: product.goods_min_price,
      total_num: quantity,
      goods_num: quantity,
      total_price: total,
      image: [{ file_path: product.goods_image }],
      goods_sku: {
        ...product.spec[0],
        goods_attr: "精品礼盒装",
        score_price: product.goods_min_price,
      },
    };
    const preview = {
      exist_address: !!address,
      address: address || {},
      goods_list: [goods],
      express_price: "0.00",
      order_total_price: total,
      order_pay_price: total,
      order_total_score_price: total,
      teams_subsidy_price: "0.00",
    };
    if (points) {
      goods.goods_price = "0.00";
      goods.goods_sku.goods_price = "0.00";
      preview.order_total_price = "0.00";
      preview.order_pay_price = "0.00";
    }
    if (method === "GET") return ok(preview);
    if (!address) return fail("请先添加收货地址");
    const created = makeOrder(
      store.id(),
      product,
      "payment",
      points ? 5 : 4,
      address,
      quantity,
    );
    created.pay_price = total;
    created.order_pay_price = total;
    created.coupon_id = coupon?.id;
    created.coupon_discount = coupon?.amount || 0;
    created.create_time = now();
    created.leave_message = p.leave_message || "";
    // Reserve stock at order creation. Cancellation below releases it once;
    // seeded demo orders intentionally have no reservation marker.
    product.spec[0].stock_num = Math.max(0, Number(product.spec[0].stock_num || 0) - quantity);
    product.goods_sales = Number(product.goods_sales || 0) + quantity;
    created.stock_reserved = quantity;
    created.stock_released = false;
    user.orders.unshift(created);
    return done(
      {
        order_id: created.order_id,
        order_sn: created.order_sn,
        payment: {
          app_id: "demo",
          timeStamp: String(Math.floor(Date.now() / 1000)),
          nonceStr: created.order_sn,
          prepay_id: created.order_sn,
          paySign: "demo",
        },
        jump_url:
          "/h5/h5.html#/pages/order/shoporder?demo_pay_order=" +
          created.order_id +
          "&order_type=" +
          created.order_type,
      },
      "演示订单已创建",
    );
  }
  if (["/order/shopList", "/order/scoreLists"].includes(route)) {
    const type = route === "/order/scoreLists" ? 5 : 4,
      status = p.dataType || p.type || "all";
    const list = user.orders
      .filter((o) => o.order_type === type)
      .filter(
        (o) =>
          status === "all" ||
          o.status === status ||
          (status === "delivery" && o.status === "forwarding"),
      );
    return ok({
      list: paginate(list, p).data.map(viewOrder),
      total: list.length,
    });
  }
  if (route === "/order/detail") {
    const selected = order || warehouse;
    return selected
      ? ok({
          order: viewOrder(selected),
          detail: viewOrder(selected),
          goods_list: selected.goods || [],
        })
      : fail("订单不存在");
  }
  if (route === "/order/toPayGoods")
    return order
      ? ok({
          order_id: order.order_id,
          order_sn: order.order_sn,
          payment: {
            app_id: "demo",
            timeStamp: String(Math.floor(Date.now() / 1000)),
            nonceStr: order.order_sn,
            prepay_id: order.order_sn,
            paySign: "demo",
          },
          jump_url:
            "/h5/h5.html#/pages/order/shoporder?demo_pay_order=" +
            order.order_id +
            "&order_type=" +
            order.order_type,
        })
      : fail("订单不存在");
  if (route === "/demo/pay") {
    if (order) {
      if (order.pay_status.value === 20) return ok({}, "已支付");
      if (order.order_status.value !== 10) return fail("订单已关闭");
      const coupon = user.coupons.find((x) => x.id === order.coupon_id);
      if (coupon && coupon.status !== 0) return fail("优惠券已使用");
      if (coupon) coupon.status = 1;
      order.pay_status = { value: 20, text: "已付款" };
      order.delivery_status = { value: 20, text: "已发货" };
      order.status = "received";
      order.state_text = "待收货";
      order.pay_time = now();
      order.pay_type = {
        value: p.channel === "微信" ? 1 : 3,
        text: p.channel + "（模拟）",
      };
      entry(
        store,
        user,
        "amount",
        0,
        p.channel + "模拟支付 " + order.pay_price + " 元",
        order.order_id,
      );
      return done({ order_id: order.order_id }, "模拟支付成功");
    }
    const item =
      warehouse || user.warehouse.find((x) => x.order_no === p.trade_no);
    if (!item) return fail("订单不存在");
    if (item.pay_status !== "待支付") return fail("订单已关闭");
    item.pay_status = "结算完毕";
    item.pay_time = now();
    return done({}, "模拟支付成功");
  }
  if (["/pay/balancePay", "/pay/pointsPayment"].includes(route))
    return order
      ? charge(order, route === "/pay/pointsPayment" ? "score" : "amount")
      : fail("订单不存在");
  if (
    [
      "/order/cancel",
      "/order/removeOrder",
      "/member/order/removeOrder",
      "/order/receipt",
      "/member/order/receipt",
    ].includes(route)
  ) {
    if (!order && warehouse) {
      if (route.includes("removeOrder")) {
        if (!["已取消", "已完成"].includes(warehouse.pay_status))
          return fail("进行中的订单不可删除");
        user.warehouse = user.warehouse.filter((x) => x !== warehouse);
      } else if (route.includes("receipt")) {
        if (!warehouse.is_delivery) return fail("尚未申请提货");
        warehouse.pay_status = "已完成";
      } else {
        if (warehouse.pay_status !== "待支付")
          return fail("已支付订单不可直接取消");
        if (warehouse.auctionId || warehouse.auction_id)
          return fail("竞价结算单不可直接取消，请完成支付或联系管理员");
        warehouse.pay_status = "已取消";
      }
      return done();
    }
    if (!order) return fail("订单不存在");
    if (route.includes("cancel")) {
      if (order.pay_status.value !== 10) return fail("已支付订单不可直接取消");
      Object.assign(order, {
        status: "cancelled",
        state_text: "已取消",
        order_status: { value: 20, text: "已取消" },
      });
      if (order.stock_reserved && !order.stock_released) {
        const reservedProduct = products.find((item) => String(item.goods_id) === String(order.goods_id));
        if (reservedProduct?.spec?.[0]) {
          reservedProduct.spec[0].stock_num = Number(reservedProduct.spec[0].stock_num || 0) + Number(order.stock_reserved);
          reservedProduct.goods_sales = Math.max(0, Number(reservedProduct.goods_sales || 0) - Number(order.stock_reserved));
        }
        order.stock_released = true;
      }
    } else if (route.includes("removeOrder")) {
      if (order.order_status.value === 10) return fail("进行中的订单不可删除");
      user.orders = user.orders.filter((x) => x !== order);
    } else {
      if (order.pay_status.value !== 20 || order.delivery_status.value !== 20)
        return fail("尚未发货");
      if (order.receipt_status?.value === 20)
        return ok({}, '收货已确认');
      Object.assign(order, {
        status: "evaluation",
        state_text: "待评价",
        receipt_status: { value: 20, text: "已收货" },
        order_status: { value: 30, text: "已完成" },
      });
    }
    return done();
  }
  if (route === "/order/evaluation") {
    if (!order || !["evaluation", "completed"].includes(order.status))
      return fail("请先确认收货");
    if (!String(p.content_text || "").trim()) return fail("请输入评价内容");
    if (order.evaluation_status === 20) return fail("已评价，请勿重复提交");
    order.evaluation_status = 20;
    order.status = "completed";
    order.state_text = "已完成";
    user.reviews.unshift({
      id: store.id(),
      goods_id: order.goods_id,
      order_id: order.order_id,
      content: p.content_text,
      content_text: p.content_text,
      content_thumbs: p.content_thumbs || [],
      score: 5,
      member: { nickName: user.nickName, avatarUrl: user.headimg },
      create_time: now(),
    });
    return done();
  }
  if (route === "/order/express") {
    const selected = order || warehouse;
    if (!selected) return fail("订单不存在");
    return ok({
      order: {
        ...selected,
        express_company: "顺丰速运（模拟）",
        express_no: "DEMO" + selected.order_id,
        tel: "95338",
        thumb: selected.goods?.[0].image.file_path || selected.image,
      },
      courier: [
        {
          AcceptTime: now(),
          AcceptStation: "快件正在派送中，请保持电话畅通。",
        },
        { AcceptTime: now(1), AcceptStation: "快件已到达当地分拨中心。" },
        { AcceptTime: now(2), AcceptStation: "商家已发货，快件已揽收。" },
      ],
    });
  }
  if (route === "/order/getLootList") {
    const side = Number(p.type) || 0,
      status = p.dataType || (side ? "auction" : "payment");
    const list = user.warehouse
      .filter((o) => o.side === side)
      .filter(
        (o) =>
          status === "all" ||
          (status === "payment" &&
            !["已取消", "已完成"].includes(o.pay_status)) ||
          (status === "auction" &&
            ["寄卖中", "待收款", "结算完毕"].includes(o.pay_status)) ||
          (status === "received" && o.is_delivery) ||
          (status === "completed" &&
            ["已完成", "结算完毕"].includes(o.pay_status)) ||
          o.pay_status === status,
      );
    return ok({ list });
  }
  if (route === "/order/toAddOrder") {
    if (!product) return fail("商品不存在");
    const active = user.warehouse.find(
      (o) =>
        o.goods_id === product.goods_id &&
        o.side === 0 &&
        o.pay_status === "待支付",
    );
    if (active)
      return ok({ order_id: active.order_id }, "已抢购，请前往仓库付款");
    const created = makeWarehouse(store.id(), product);
    created.create_time = now();
    user.warehouse.unshift(created);
    user.settlements.unshift({
      id: store.id(),
      order_id: created.order_id,
      order_no: created.order_no,
      direction: "out",
      specialarea_id: 1,
      pay_price: created.pay_price,
      pay_status: 0,
      createtime: now(),
      create_time: now(),
      payment_voucher: "",
      pay: clone(payInfo),
      user: { nickName: "茶友小林", mobile: "13800000001" },
      goods_name: created.goods_name,
      goods_image: created.image,
      goods_price: created.goods_price,
    });
    return done(
      { order_id: created.order_id },
      "模拟抢购成功，请到仓库完成付款",
    );
  }
  if (route === "/order/cancel_grab") {
    if (warehouse?.auctionId) return fail("竞价成交订单不能直接取消");
    if (!warehouse || warehouse.pay_status !== "待支付")
      return fail("该商品不可取消");
    warehouse.pay_status = "已取消";
    user.settlements = user.settlements.filter(
      (x) => x.order_id !== warehouse.order_id,
    );
    return done();
  }
  if (route === "/order/getServiceCharge")
    return warehouse
      ? ok(feeInfo(user, warehouse))
      : product
        ? ok(feeInfo(user, makeWarehouse(0, product, "结算完毕")))
        : fail("商品不存在");
  if (
    ["/order/toServiceCharge", "/order/toServiceChargeWithVoucher"].includes(
      route,
    )
  ) {
    if (!warehouse) return fail("商品不存在");
    if (warehouse.is_consignment) return ok({}, "商品已寄卖，请勿重复提交");
    if (warehouse.pay_status !== "结算完毕" || warehouse.is_delivery)
      return fail("结算完毕的在库商品才可寄卖");
    const fee = Number(feeInfo(user, warehouse).e_price);
    const coupon =
      String(p.use_coupon) === "1"
        ? Math.min(Number(user.e_card_number), fee)
        : 0;
    const amount =
      String(p.use_amount) === "1" || route === "/order/toServiceCharge"
        ? fee - coupon
        : 0;
    if (amount > Number(user.amount)) return fail("余额不足");
    const cash = Number(money(fee - coupon - amount));
    if (coupon)
      entry(
        store,
        user,
        "e_card_number",
        -coupon,
        "商品寄卖上架券抵扣",
        warehouse.order_id,
      );
    if (amount)
      entry(
        store,
        user,
        "amount",
        -amount,
        "商品寄卖服务费",
        warehouse.order_id,
      );
    const voucher_id = store.id();
    user.listingFees.unshift({
      voucher_id,
      order_id: warehouse.order_id,
      order_no: warehouse.order_no,
      goods_name: warehouse.goods_name,
      goods_image: warehouse.image,
      total_fee: money(fee),
      coupon_deduct: money(coupon),
      amount_deduct: money(amount),
      cash_amount: money(cash),
      status: cash ? (p.voucher_image ? 2 : 0) : 2,
      status_text: cash && !p.voucher_image ? "待上传凭证" : "已通过",
      voucher_image: p.voucher_image || "",
      create_time: now(),
    });
    warehouse.is_consignment = 1;
    warehouse.side = 1;
    warehouse.pay_status = cash && !p.voucher_image ? "待缴上架费" : "寄卖中";
    return done(
      { voucher_id, order_id: warehouse.order_id, cash_amount: money(cash) },
      cash && !p.voucher_image
        ? "寄卖申请已保存，请上传上架费凭证"
        : "模拟寄卖成功",
    );
  }
  if (route === "/order/getListingFeeOrders")
    return ok(
      user.listingFees.filter(
        (x) =>
          p.status === undefined ||
          p.status === "" ||
          String(x.status) === String(p.status),
      ),
    );
  if (route === "/order/uploadListingFeeVoucher") {
    const item = user.listingFees.find(
      (x) => String(x.voucher_id) === String(p.voucher_id),
    );
    if (!item || !p.voucher_image) return fail("请选择订单并上传凭证");
    if (item.status === 2) return ok({}, "凭证已通过");
    item.voucher_image = p.voucher_image;
    item.status = 2;
    item.status_text = "已通过";
    const goods = user.warehouse.find((x) => x.order_id === item.order_id);
    if (goods) {
      goods.side = 1;
      goods.is_consignment = 1;
      goods.pay_status = "寄卖中";
    }
    return done({}, "凭证已模拟审核通过");
  }
  if (route === "/demo/orders/delivery") {
    if (
      !warehouse ||
      warehouse.pay_status !== "结算完毕" ||
      warehouse.is_consignment
    )
      return fail("当前商品不可提货");
    const address =
      user.addresses.find((x) => x.is_default) || user.addresses[0];
    if (!address) return fail("请先添加收货地址");
    if (warehouse.is_delivery) return ok({}, "已申请提货");
    warehouse.is_delivery = 1;
    const deliveryOrder = makeOrder(
      store.id(),
      products.find((x) => x.goods_id === warehouse.goods_id),
      "received",
      4,
      address,
    );
    deliveryOrder.pay_type.text = "仓库提货";
    deliveryOrder.warehouse_order_id = warehouse.order_id;
    user.orders.unshift(deliveryOrder);
    return done(
      { order_id: deliveryOrder.order_id },
      "已模拟发货，可在商城订单查看物流",
    );
  }
  if (route === "/order/toSplitOrder") {
    if (!warehouse || warehouse.pay_status !== "结算完毕" || warehouse.is_split)
      return fail("当前商品不可拆分");
    warehouse.is_split = 1;
    warehouse.pay_status = "已完成";
    for (let i = 0; i < 2; i++) {
      const child = clone(warehouse);
      Object.assign(child, {
        order_id: store.id(),
        goods_price: money(Number(warehouse.goods_price) / 2),
        pay_price: money(Number(warehouse.pay_price) / 2),
        pay_status: "结算完毕",
        is_split: 1,
      });
      child.order_no = "DEMO-W" + child.order_id;
      user.warehouse.unshift(child);
    }
    return done();
  }
  if (
    ["/order/get_balance_pay_out", "/order/get_balance_pay_in"].includes(route)
  ) {
    const list = user.settlements
      .filter((x) => x.direction === (route.endsWith("_in") ? "in" : "out"))
      .filter(
        (x) =>
          !p.specialarea_id ||
          String(x.specialarea_id) === String(p.specialarea_id),
      );
    return ok({
      list: list.map((x) => ({ ...x, to_user: x.user })),
      goods_list: list.map((x) => ({ ...x, image: x.goods_image })),
      pay_price: money(
        list
          .filter((x) => x.pay_status !== 2)
          .reduce((s, x) => s + Number(x.pay_price), 0),
      ),
    });
  }
  if (route === "/order/get_balance_pay_count") {
    const sum = (direction) =>
      money(
        user.settlements
          .filter((x) => x.direction === direction && x.pay_status !== 2)
          .reduce((s, x) => s + Number(x.pay_price), 0),
      );
    return ok({ out: sum("out"), in: sum("in") });
  }
  if (route === "/order/payment_voucher") {
    const item = user.settlements.find(
      (x) => String(x.id) === String(p.id) && x.direction === "out",
    );
    if (!item || !p.payment_voucher) return fail("请上传付款凭证");
    if (item.pay_status === 2) return ok({}, "订单已完成");
    item.payment_voucher = p.payment_voucher;
    item.pay_image = p.payment_voucher;
    item.pay_type = Number(p.pay_type);
    item.pay_status = 2;
    const goods = user.warehouse.find((x) => x.order_id === item.order_id);
    if (goods) {
      goods.pay_status = "结算完毕";
      goods.pay_time = now();
    }
    return done({}, "付款凭证已模拟确认，商品已入库");
  }
  if (
    [
      "/order/confirm_payment_voucher",
      "/order/getConsignmentCollection",
    ].includes(route)
  ) {
    const item = user.settlements.find(
      (x) =>
        (String(x.id) === String(p.id) ||
          String(x.order_id) === String(p.order_id)) &&
        x.direction === "in",
    );
    if (!item) return fail("收款单不存在");
    if (item.pay_status === 2) return ok({}, "已确认收款");
    if (item.pay_status === 0) return fail("买家尚未上传凭证");
    item.pay_status = 2;
    const goods = user.warehouse.find((x) => x.order_id === item.order_id);
    if (goods) goods.pay_status = "结算完毕";
    entry(
      store,
      user,
      "amount",
      Number(item.pay_price),
      "寄卖收款（模拟）",
      item.order_id,
    );
    return done();
  }
  if (route === "/order/getOrderReport")
    return ok({
      list: ["长时间不支付", "凭证异常", "商品问题", "其他"],
      content: ["长时间不支付", "凭证异常", "商品问题", "其他"],
    });
  if (route === "/order/toOrderReport") {
    if (!p.content_text) return fail("请填写投诉内容");
    user.reports.unshift({
      ...p,
      id: store.id(),
      create_time: now(),
      status: "处理中",
    });
    return done({}, "投诉已保存到本地");
  }
  if (route === "/order/subscribe") {
    if (!user.subscriptions.includes(String(p.specialarea_id || 1)))
      user.subscriptions.push(String(p.specialarea_id || 1));
    return done({}, "预约成功");
  }
  if (route === "/order/subscribePay") return done({}, "模拟预约成功");
  if (route === "/order/smsCodeSend") return ok({}, "演示验证码：123456");
  if (route === "/order/getPayOrderStatus")
    return warehouse && warehouse.pay_status !== "待支付"
      ? ok(1)
      : fail("尚未支付");
  if (route === "/order/upOrderStatus") {
    if (!warehouse) return fail("订单不存在");
    warehouse.pay_status = "结算完毕";
    return done();
  }
  if (route === "/order/payment") {
    if (!warehouse) return fail("订单不存在");
    user.pendingPayment = warehouse.order_id;
    return done(
      {
        id: warehouse.order_id,
        order_no: warehouse.order_no,
        pay_url: "/h5/h5.html#/pages/order/order",
        app_id: "demo",
        timeStamp: String(Math.floor(Date.now() / 1000)),
        nonceStr: "demo",
        prepay_id: warehouse.order_no,
        paySign: "demo",
        org_req_date: now(),
        org_hf_seq_id: warehouse.order_id,
        org_req_seq_id: warehouse.order_id,
      },
      "已创建模拟支付",
    );
  }
  if (["/dg/quickpayConfirm", "/dg/onlinepaymentQuery"].includes(route)) {
    const pending = user.warehouse.find(
      (x) => x.order_id === user.pendingPayment,
    );
    if (!pending) return fail("没有待处理支付");
    pending.pay_status = "结算完毕";
    pending.pay_time = now();
    return done({}, "模拟支付完成");
  }
}
