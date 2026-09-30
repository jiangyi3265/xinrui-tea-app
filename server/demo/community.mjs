import {
  ok,
  clone,
  fixtures,
  products,
  avatar,
  now,
  paginate,
  receipt,
  payInfo,
  publicCatalog,
} from "./data.mjs";
import { auctionView, ensureAuctions, findAuction } from "./auction.mjs";
export function publicApi(store, user, route, p) {
  const products = publicCatalog(store);
  if (route === "/v1/sms")
    return ok({ expires_in: 600 }, "演示验证码：123456（不会发送短信）");
  if (route === "/index/getStoreInfo")
    return ok({
      ...clone(fixtures[route].data),
      pay: payInfo,
      register_verify: "1",
    });
  if (route === "/index/getPaySeeting")
    return ok({ wx_open: "1", zfb_open: "1", bank_open: "1" });
  if (route === "/wx/payGateway")
    return ok({
      alipay_open: 10,
      wx_open: 10,
      balance_open: 10,
      points_open: 10,
    });
  if (route === "/getPayGatWay") return ok({ is_open: 0 });
  if (route === "/index/getSubscribeSetting")
    return ok({ is_open: 1, amount: "0.00" });
  if (route === "/notice/getNotice") {
    const notices = (store.state.adminNotices || fixtures[route]?.data || [])
      .filter((notice) => String(notice.status ?? "0") === "0");
    return ok(notices.map((notice) => ({
      ...clone(notice),
      id: notice.id ?? notice.noticeId,
      title: notice.title ?? notice.noticeTitle,
      content: notice.content ?? notice.noticeContent,
    })));
  }
  if (route === "/index/close_consignment") return ok({ value: 10 });
  if (route === "/goods/getLootList") {
    const data = clone(fixtures[route].data);
    const auction = ensureAuctions(store).find((item) => item.status !== "cancelled");
    const time = Math.floor(Date.now() / 1000);
    const slot = data.list[0];
    slot.status = 10;
    Object.assign(slot.time_list.time, {
      new_time: time,
      start_time: time - 300,
      start_buy_time: time - 300,
      end_time: time + 3600,
      settle_start_time: time - 300,
      settle_end_time: time + 7200,
      start_end_time: "00:00",
      start_end_time1: "23:59",
      settle_start_time_text: "00:00:00",
      settle_end_time_text: "23:59:59",
    });
    slot.time_list.is_subscribe = user?.subscriptions?.includes("1") ? 1 : 0;
    if (auction) {
      slot.auction_id = auction.auctionId;
      slot.auction = auctionView(store, auction, user?.member_id, false);
    }
    return ok(data);
  }
  if (route === "/goods/getLootDetails") {
    const product = products.find(
      (x) => String(x.goods_id) === String(p.goods_id || 30),
    );
    if (!product) return { code: 0, msg: "商品不存在", data: {} };
    const order = user?.warehouse?.find(
      (x) => String(x.order_id) === String(p.order_id),
    );
    const auction = findAuction(store, { goods_id: product.goods_id });
    const auctionData = auctionView(store, auction, user?.member_id);
    const time = Math.floor(Date.now() / 1000);
    const fixtureDetail = fixtures["/shopgoods/getDetails:" + product.goods_id]?.data?.detail;
    const detail = fixtureDetail
      ? { ...clone(fixtureDetail), ...clone(product) }
      : {
          goods_id: product.goods_id,
          goods_name: product.goods_name,
          goods_min_price: product.goods_min_price,
          spec: clone(product.spec || []),
          content: '<p>精选茶叶，原产地直供。</p>',
        };
    return ok({
      ...detail,
      ...order,
      goods_image: product.goods_image,
      image: [{ file_path: product.goods_image }],
      goods_no: "TEA-" + product.goods_id,
      value: auctionData?.currentPrice || product.goods_min_price,
      goods_price: auctionData?.currentPrice || product.goods_min_price,
      is_order: 0,
      consignment_member_name: "茶友小林",
      time_info: {
        new_time: time,
        start_time: time - 300,
        start_buy_time: time - 300,
        end_time: time + 3600,
      },
      auction: auctionData,
    });
  }
  if (route === "/loodgoods/getCategoryGoodsList")
    return ok({
      time_info: {
        new_time: Math.floor(Date.now() / 1000),
        start_time: Math.floor(Date.now() / 1000) - 300,
        start_buy_time: Math.floor(Date.now() / 1000) - 300,
        end_time: Math.floor(Date.now() / 1000) + 3600,
      },
      list: paginate(
        products.map((x, i) => {
          const auction = findAuction(store, { goods_id: x.goods_id });
          const auctionData = auctionView(store, auction, user?.member_id, false);
          return {
            ...clone(x),
            order_id: 900 + i,
            goods_price: auctionData?.currentPrice || x.goods_min_price,
            image: x.goods_image,
            consignment_member_name: "茶友小林",
            goods_no: "TEA-" + x.goods_id,
            pay_status: "寄卖中",
            is_order: 0,
            auction: auctionData,
          };
        }),
        p,
      ),
    });
  if (route === "/category/getCategoryGoodsList") {
    let list = products.filter(
      (x, i) =>
        !Number(p.category_id) ||
        Number(p.category_id) === 22 ||
        (Number(p.category_id) === 23 && i % 2 === 1),
    );
    if (Number(p.product_types) === 3)
      list = list.map((x) => ({
        ...clone(x),
        product_types: 3,
        score_price: x.goods_min_price,
      }));
    return ok({ list: paginate(list, p) });
  }
  if (route === "/score/getScoreShopList")
    return ok({
      list: paginate(
        products.map((x) => ({
          ...clone(x),
          product_types: 3,
          score_price: x.goods_min_price,
        })),
        p,
      ),
    });
  if (route === "/score/getDetails") {
    const product = products.find((item) => String(item.goods_id) === String(p.goods_id || 30)) || products[0];
    const x = clone(fixtures["/shopgoods/getDetails:" + (p.goods_id || 30)] || fixtures["/shopgoods/getDetails:30"] || { code: 1, data: { detail: { ...product } } });
    x.data ||= {};
    x.data.detail ||= { ...product };
    x.data.detail = {
      ...x.data.detail,
      ...clone(product),
      goods_price: product.goods_min_price,
      value: product.goods_min_price,
      goods_image: product.goods_image,
      image: [{ file_path: product.goods_image }],
      spec: clone(product.spec || x.data.detail.spec || []),
    };
    x.data.detail.product_types = 3;
    x.data.detail.score_price = x.data.detail.goods_min_price;
    x.data.detail.spec.forEach((s) => {
      s.score_price = s.goods_price;
      s.goods_price = "0.00";
      s.spec_sku_id = "score" + s.spec_sku_id;
    });
    return x;
  }
  if (route === "/goods/getPurchaseNum")
    return ok({ num: 10, purchase_num: 10, limit_num: 10 });
  if (route === "/goods/getIsAuction") return ok(1);
  if (route === "/goods/getGoodsEvaluation") {
    const list = [
      ...(user?.reviews || []),
      ...products.map((x, i) => ({
        id: 500 + i,
        goods_id: x.goods_id,
        content: "茶香清雅，包装完整，送礼很合适。",
        content_text: "茶香清雅，包装完整，送礼很合适。",
        content_thumbs: [],
        score: 5,
        member: { nickName: "茶友" + (i + 1), avatarUrl: avatar },
        create_time: now(i + 1),
      })),
    ].filter((x) => !p.goods_id || String(x.goods_id) === String(p.goods_id));
    return ok({ list: paginate(list, p) });
  }
  if (route === "/notice/getNoticeInfo") {
    const notices = (store.state.adminNotices || fixtures["/notice/getNotice"].data)
      .filter((notice) => String(notice.status ?? "0") === "0");
    const notice = notices.find(
      (x) => String(x.id ?? x.noticeId) === String(p.id || p.notice_id),
    );
    const selected = notice || notices[0];
    return ok(selected ? { ...clone(selected), id: selected.id ?? selected.noticeId, title: selected.title ?? selected.noticeTitle, content: selected.content ?? selected.noticeContent } : {});
  }
  if (route === "/index/getGroupAfterSalesAgreement")
    return ok({
      shop_agreement:
        "<h3>商城购物须知</h3><p>下单前请确认商品规格、价格和收货地址。付款后可查看物流、确认收货和评价。</p>",
      transaction_agreement:
        "<h3>交易须知</h3><p>请核对订单信息，付款后上传凭证，收款方确认后完成结算。本地演示不发生实际资金交易。</p>",
      consignment_rule:
        "<h3>寄卖须知</h3><p>已结算商品可以提货或寄卖，寄卖支持上架券与余额抵扣服务费。</p>",
    });
  if (route === "/finance/getSystemInfo")
    return ok({
      consignment_rule:
        "<h3>寄卖规则</h3><p>选择已结算的在库商品，确认寄卖价格和服务费，可使用上架券或余额抵扣。完成付款后进入卖家仓库。</p><p>静态演示中的付款、审核和发货均在本机模拟。</p>",
    });
  if (route === "/circle/getList")
    return ok(
      products.map((x, i) => ({
        id: i + 1,
        title: x.goods_name,
        content:
          "一盏好茶，静享时光。" + x.goods_name + "，精选原叶，邀您共品。",
        images: [x.goods_image],
        image: x.goods_image,
        thumb: x.goods_image,
        num: store.state.circleDownloads?.[i + 1] || 0,
        create_time: now(i),
      })),
    );
  if (route === "/circle/download") {
    store.state.circleDownloads ||= {};
    store.state.circleDownloads[p.id] =
      (store.state.circleDownloads[p.id] || 0) + 1;
    store.save();
    return ok();
  }
  if (route === "/goods/getShopPosterDetails")
    return ok({ details: { poster_url: "/h5/static/demo/poster.jpg" } });
  if (route === "/wx/getXcxBgPoster") return ok("/h5/static/demo/poster.jpg");
  if (route === "/index/getShareUrl") return ok("/h5/h5.html#/");
  if (route === "/index/getVision")
    return ok({ version: "1.0.0", is_update: 0 });
  if (route === "/wx/getCodeToken") return ok("DEMO-OPENID");
  if (route === "/wx/getPayWxLogin")
    return ok("/h5/h5.html#/pages/order/order");
  if (route === "/wx/getSubscriptionId")
    return ok({ wxapp_order_pay: "demo", wxapp_order_ship: "demo" });
}
export function communityApi(store, user, route, p) {
  const products = publicCatalog(store);
  const members = [
    "茶友小林",
    "茶友小陈",
    "茶友小周",
    "茶友小许",
    "茶友小吴",
    "茶友小郑",
  ].map((nickName, i) => ({
    member_id: 200 + i,
    nickName,
    avatarUrl: avatar,
    headimg: avatar,
    mobile: "1380000000" + i,
    phone: "1380000000" + i,
    create_time: now(8 + i),
    consumption_amount: String(1580 * (i + 1)),
    total_price: String(1580 * (i + 1)),
    message: i % 2 ? "已激活" : "普通会员",
    drive_num: i + 2,
    total_earnings: String(180 + i * 20),
    week_earnings: String(50 + i * 5),
  }));
  const profits = products.map((x, i) => ({
    id: 700 + i,
    goods_name: x.goods_name,
    goods_image: x.goods_image,
    image: x.goods_image,
    goods_price: x.goods_min_price,
    order_no: "DEMO-P" + i,
    owner_name: "茶友小林",
    buyer_name: user.nickName,
    profit: String(50 + i * 30),
    amount: String(50 + i * 30),
    create_time: now(i),
    status_text: "已结算",
    type: (i % 2) + 1,
  }));
  if (route === "/member/getMyProfit") {
    let list = profits
      .filter((x) => !Number(p.type) || x.type === Number(p.type))
      .filter(
        (x) =>
          (!p.start_time || x.create_time >= p.start_time) &&
          (!p.end_time || x.create_time.slice(0, 10) <= p.end_time),
      );
    return ok({
      list: paginate(list, p).data,
      total_profit: "380.00",
      profit: "380.00",
      all: "380.00",
      total: list.length,
    });
  }
  if (route === "/member/personProfit") return ok("380.00");
  if (route === "/team/getTeamInfo")
    return ok({
      userInfo: { total_commission: "380.00", total_num: 6 },
      total: 6,
      direct: 3,
      indirect: 3,
      today: 1,
      member_num: 6,
      money: "380.00",
    });
  if (route === "/member/getMyIndirection")
    return ok({
      list: paginate(members, p).data,
      total_team_num: 6,
      total_performance: "33180.00",
      direct_count: 3,
      indirect_count: 3,
      total: 6,
    });
  if (route === "/member/getLevelList") return ok(members.slice(0, 3));
  if (route === "/team/memberList")
    return ok(
      members.filter((x) =>
        [x.nickName, x.mobile]
          .join()
          .includes(p.keywords || p.search || p.keyword || ""),
      ),
    );
  if (route === "/team/driveDetail")
    return ok({ statistics: { totalCount: 6, driveCount: 3 }, list: members });
  if (route === "/team/memberInfo") {
    const info =
      members.find((x) => String(x.member_id) === String(p.member_id)) ||
      members[0];
    return ok({
      info: {
        ...info,
        last_month_award: "120.00",
        month_award: "180.00",
        today_total_price: "1580.00",
        total_month_award: "380.00",
      },
      statistics: { activate_num: 3, perfect_num: 5, register_num: 6 },
    });
  }
  if (["/team/capitalDetail", "/team/orderDetail"].includes(route))
    return ok(
      profits.map((x) => ({
        ...x,
        face_value: x.goods_price,
        remarks: x.goods_name + "交易记录",
      })),
    );
}
