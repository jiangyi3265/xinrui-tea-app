import {
  catalog,
  clone,
  makeWarehouse,
  money,
  now,
  ok,
  fail,
  payInfo,
} from "./data.mjs";

// Auction state is deliberately kept in the same store as products, users and
// orders.  This makes the H5 demo, the admin adapter and browser-local mode use
// the same business rules instead of maintaining separate fake states.
export const AUCTION_STATUSES = [
  "draft",
  "scheduled",
  "running",
  "ended",
  "settled",
  "cancelled",
];

const timestamp = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const iso = (value = Date.now()) => new Date(value).toISOString();

const roundMoney = (value) => money(Math.max(0, Number(value) || 0));

function auctionProduct(store, auction) {
  return catalog(store).find(
    (product) => String(product.goods_id) === String(auction.goodsId),
  );
}

function highestBid(store, auction) {
  return (store.state.auctionBids || [])
    .filter((bid) => String(bid.auctionId) === String(auction.auctionId))
    .sort((a, b) => Number(b.amount) - Number(a.amount) || Number(b.bidId) - Number(a.bidId))[0];
}

function releaseAuctionStock(store, auction) {
  if (!auction?.stockReserved || auction.stockReleased) return;
  const product = auctionProduct(store, auction);
  if (product?.spec?.[0]) {
    product.spec[0].stock_num = Number(product.spec[0].stock_num || 0) + Number(auction.quantity || 1);
  }
  auction.stockReserved = false;
  auction.stockReleased = true;
}

function refreshAuction(store, auction, at = Date.now()) {
  if (!auction || auction.status === "cancelled") return auction;
  const start = timestamp(auction.startTime);
  const end = timestamp(auction.endTime);
  if (auction.status === "scheduled" && start && at >= start) auction.status = "running";
  if (auction.status === "running" && end && at >= end) auction.status = "ended";
  const bid = highestBid(store, auction);
  auction.bidCount = (store.state.auctionBids || []).filter(
    (item) => String(item.auctionId) === String(auction.auctionId),
  ).length;
  auction.currentPrice = roundMoney(bid?.amount ?? auction.startPrice);
  auction.currentBidId = bid?.bidId || null;
  auction.highestBidderId = bid?.userId || null;
  if (auction.status === "ended" && bid) {
    auction.winnerUserId = bid.userId;
    auction.winnerBidId = bid.bidId;
    auction.winnerAmount = roundMoney(bid.amount);
    auction.endedAt ||= iso(at);
  } else if (auction.status === "ended" && !bid) {
    // A no-bid auction no longer needs its inventory reservation.
    releaseAuctionStock(store, auction);
  }
  return auction;
}

export function ensureAuctions(store) {
  const state = store.state;
  state.auctions ||= [];
  state.auctionBids ||= [];
  let changed = false;
  // Shared/production catalogs never implicitly open a demo auction. Only an
  // authenticated administrator may create and reserve a real auction.
  if (store.mode === 'shared' && !state.auctionSeedVersion) {
    state.auctionSeedVersion = 1;
    changed = true;
  }
  if (!state.auctionSeedVersion && state.auctions.length === 0) {
    const product = catalog(store).find((item) => Number(item.approvalStatus ?? 10) === 10);
    if (product) {
      const startPrice = Number(product.goods_min_price || 0);
      state.auctions.push({
        auctionId: store.id(),
        goodsId: product.goods_id,
        title: product.goods_name,
        image: product.goods_image,
        startPrice: roundMoney(startPrice),
        currentPrice: roundMoney(startPrice),
        bidIncrement: roundMoney(Math.max(10, startPrice * 0.01)),
        quantity: 1,
        startTime: iso(Date.now() - 5 * 60 * 1000),
        endTime: iso(Date.now() + 60 * 60 * 1000),
        status: "running",
        bidCount: 0,
        currentBidId: null,
        highestBidderId: null,
        winnerUserId: null,
        winnerBidId: null,
        settlementOrderId: null,
        createdBy: "system",
        createdAt: iso(),
        stockReserved: false,
        stockReleased: false,
      });
      const auction = state.auctions[state.auctions.length - 1];
      const quantity = Number(auction.quantity || 1);
      if (Number(product.spec?.[0]?.stock_num || 0) >= quantity) {
        product.spec[0].stock_num = Number(product.spec[0].stock_num || 0) - quantity;
        auction.stockReserved = true;
      }
    }
    state.auctionSeedVersion = 1;
    changed = true;
  } else if (!state.auctionSeedVersion) {
    // Persist the schema marker when loading data created before auctions
    // existed, so the seed/migration is not repeated after a restart.
    state.auctionSeedVersion = 1;
    changed = true;
  }
  for (const auction of state.auctions) {
    const before = JSON.stringify({
      status: auction.status,
      currentPrice: auction.currentPrice,
      currentBidId: auction.currentBidId,
      highestBidderId: auction.highestBidderId,
      winnerUserId: auction.winnerUserId,
      winnerBidId: auction.winnerBidId,
      winnerAmount: auction.winnerAmount,
      endedAt: auction.endedAt,
      stockReserved: auction.stockReserved,
      stockReleased: auction.stockReleased,
    });
    const product = auctionProduct(store, auction);
    if (product) {
      auction.title = auction.title || product.goods_name;
      auction.image = auction.image || product.goods_image;
    }
    refreshAuction(store, auction);
    const after = JSON.stringify({
      status: auction.status,
      currentPrice: auction.currentPrice,
      currentBidId: auction.currentBidId,
      highestBidderId: auction.highestBidderId,
      winnerUserId: auction.winnerUserId,
      winnerBidId: auction.winnerBidId,
      winnerAmount: auction.winnerAmount,
      endedAt: auction.endedAt,
      stockReserved: auction.stockReserved,
      stockReleased: auction.stockReleased,
    });
    if (before !== after) changed = true;
  }
  if (changed) store.save();
  return state.auctions;
}

export function findAuction(store, params = {}) {
  const auctions = ensureAuctions(store);
  const requested = params.auction_id ?? params.auctionId ?? params.id;
  const available = auctions.filter((item) => item.status !== "cancelled");
  let auction = requested
    ? available.find((item) => String(item.auctionId) === String(requested))
    : null;
  if (!requested && params.goods_id) {
    auction = available
      .filter((item) => String(item.goodsId) === String(params.goods_id))
      .sort((a, b) => timestamp(b.createdAt) - timestamp(a.createdAt))[0];
  }
  return auction || null;
}

export function auctionView(store, auction, userId = null, includeHistory = true) {
  if (!auction) return null;
  refreshAuction(store, auction);
  const bids = (store.state.auctionBids || []).filter(
    (bid) => String(bid.auctionId) === String(auction.auctionId),
  );
  const ownBids = userId ? bids.filter((bid) => String(bid.userId) === String(userId)) : [];
  const minimumBid = bids.length
    ? Number(auction.currentPrice) + Number(auction.bidIncrement)
    : Number(auction.startPrice);
  return {
    auctionId: auction.auctionId,
    goodsId: auction.goodsId,
    title: auction.title,
    image: auction.image,
    startPrice: roundMoney(auction.startPrice),
    currentPrice: roundMoney(auction.currentPrice),
    bidIncrement: roundMoney(auction.bidIncrement),
    minimumBid: roundMoney(minimumBid),
    quantity: Number(auction.quantity || 1),
    startTime: auction.startTime,
    endTime: auction.endTime,
    status: auction.status,
    bidCount: bids.length,
    isLeading: !!userId && String(auction.highestBidderId) === String(userId),
    isWinner: !!userId && String(auction.winnerUserId) === String(userId),
    myHighestBid: ownBids.length
      ? roundMoney(Math.max(...ownBids.map((bid) => Number(bid.amount))))
      : null,
    winnerAmount: auction.winnerAmount ? roundMoney(auction.winnerAmount) : null,
    settlementOrderId: auction.settlementOrderId || null,
    bids: includeHistory
      ? bids
          .slice()
          .sort((a, b) => Number(b.amount) - Number(a.amount) || Number(b.bidId) - Number(a.bidId))
          .slice(0, 20)
          .map((bid) => ({ bidId: bid.bidId, amount: roundMoney(bid.amount), createdAt: bid.createdAt }))
      : undefined,
  };
}

export function placeBid(store, user, params = {}) {
  const auction = findAuction(store, params);
  if (!auction) return fail("拍卖场次不存在");
  refreshAuction(store, auction);
  if (auction.status !== "running") return fail(auction.status === "ended" || auction.status === "settled" ? "拍卖已结束" : "拍卖尚未开始");
  const product = auctionProduct(store, auction);
  if (!product || Number(product.approvalStatus ?? 10) !== 10) return fail("拍卖商品已下架");
  if (!auction.stockReserved && Number(product.spec?.[0]?.stock_num || 0) < Number(auction.quantity || 1)) return fail("拍卖库存不足");
  const amount = Number(params.amount);
  if (!Number.isFinite(amount) || amount <= 0) return fail("请输入有效出价");
  const bids = (store.state.auctionBids || []).filter(
    (bid) => String(bid.auctionId) === String(auction.auctionId),
  );
  const minimum = bids.length
    ? Number(auction.currentPrice) + Number(auction.bidIncrement)
    : Number(auction.startPrice);
  if (amount + 1e-8 < minimum) return fail(`出价必须不低于 ¥${roundMoney(minimum)}`);
  for (const bid of bids) {
    if (bid.status === "leading") bid.status = "outbid";
  }
  const bid = {
    bidId: store.id(),
    auctionId: auction.auctionId,
    userId: user.member_id,
    amount: roundMoney(amount),
    status: "leading",
    createdAt: iso(),
  };
  store.state.auctionBids.push(bid);
  refreshAuction(store, auction);
  store.save();
  return ok({ auction: auctionView(store, auction, user.member_id), bid: clone(bid) }, "出价成功");
}

export function settleAuction(store, user, params = {}) {
  const auction = findAuction(store, params);
  if (!auction) return fail("拍卖场次不存在");
  refreshAuction(store, auction);
  if (auction.status === "running" || auction.status === "scheduled") return fail("拍卖尚未结束");
  if (auction.status === "cancelled") return fail("拍卖已取消");
  if (!auction.winnerUserId) return fail("本场无人出价");
  if (String(auction.winnerUserId) !== String(user.member_id)) return fail("只有最高出价者可以结算");
  const existing = (user.warehouse || []).find(
    (item) => String(item.auctionId) === String(auction.auctionId),
  );
  if (existing) {
    if (existing.pay_status === "已取消") return fail("竞价结算单已取消，请联系管理员处理");
    auction.status = "settled";
    auction.settlementOrderId = existing.order_id;
    store.save();
    return ok({ order_id: existing.order_id, auction: auctionView(store, auction, user.member_id) }, "已生成结算单");
  }
  const product = auctionProduct(store, auction);
  if (!product) return fail("拍卖商品不存在");
  const stock = Number(product.spec?.[0]?.stock_num || 0);
  if (!auction.stockReserved) {
    if (stock < Number(auction.quantity || 1)) return fail("拍卖商品库存不足，无法结算");
    product.spec[0].stock_num = stock - Number(auction.quantity || 1);
  }
  const created = makeWarehouse(store.id(), product, "待支付", 0);
  created.total_num = Number(auction.quantity || 1);
  created.goods_num = created.total_num;
  created.auctionId = auction.auctionId;
  created.auctionStatus = "won";
  created.goods_price = roundMoney(auction.currentPrice);
  created.pay_price = roundMoney(auction.currentPrice);
  created.value = roundMoney(auction.currentPrice);
  created.e_price = roundMoney(Number(auction.currentPrice) * 0.05);
  created.create_time = now();
  user.warehouse ||= [];
  user.warehouse.unshift(created);
  user.settlements ||= [];
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
    auction_id: auction.auctionId,
  });
  auction.status = "settled";
  auction.stockReserved = false;
  auction.stockConsumed = true;
  auction.settlementOrderId = created.order_id;
  auction.settledAt = iso();
  store.save();
  return ok({ order_id: created.order_id, auction: auctionView(store, auction, user.member_id) }, "拍卖成交，已生成待付款结算单");
}

export function auctionApi(store, user, route, params = {}, method = "GET") {
  const publicRoute = route === "/auction/list" || route === "/auction/detail";
  if (publicRoute) {
    ensureAuctions(store);
    if (route === "/auction/list") {
      const list = ensureAuctions(store)
        .filter((auction) => auction.status !== "cancelled")
        .map((auction) => auctionView(store, auction, user?.member_id, false));
      return ok({ list });
    }
    const auction = findAuction(store, params);
    return auction ? ok(auctionView(store, auction, user?.member_id)) : fail("拍卖场次不存在");
  }
  const authenticatedRoute = ["/auction/bids", "/auction/bid", "/auction/settle"].includes(route);
  if (!authenticatedRoute) return null;
  if (!user) return { code: -500, msg: "请先登录", data: {} };
  if (route === "/auction/bids" && method === "GET") {
    const auction = findAuction(store, params);
    if (!auction) return fail("拍卖场次不存在");
    const bids = (store.state.auctionBids || [])
      .filter((bid) => String(bid.auctionId) === String(auction.auctionId) && String(bid.userId) === String(user.member_id))
      .sort((a, b) => Number(b.bidId) - Number(a.bidId));
    return ok({ list: bids.map((bid) => ({ ...clone(bid), amount: roundMoney(bid.amount) })) });
  }
  if (route === "/auction/bid" && method === "POST") return placeBid(store, user, params);
  if (route === "/auction/settle" && method === "POST") return settleAuction(store, user, params);
  return null;
}

export function closeAuction(store, auction, status = "ended") {
  if (!auction) return fail("拍卖场次不存在");
  if (!["ended", "cancelled"].includes(status)) return fail("不支持的拍卖状态");
  if (["settled", "cancelled"].includes(auction.status) && auction.status !== status) return fail("已结束拍卖不可回退");
  if (status === "cancelled" && ["ended", "settled"].includes(auction.status)) return fail("已结束拍卖不可取消");
  auction.status = status;
  refreshAuction(store, auction);
  if (status === "ended") auction.endedAt ||= iso();
  if (status === "cancelled") releaseAuctionStock(store, auction);
  store.save();
  return ok(auctionView(store, auction), status === "ended" ? "拍卖已结束" : "拍卖已取消");
}

export function auctionAdminView(store, auction) {
  const view = auctionView(store, auction);
  const winner = auction.winnerUserId
    ? store.state.users.find((user) => String(user.member_id) === String(auction.winnerUserId))
    : null;
  return {
    ...view,
    winnerUserId: auction.winnerUserId || null,
    winnerName: winner?.nickName || "",
    winnerPhone: winner?.phone || "",
    createdBy: auction.createdBy,
    createdAt: auction.createdAt,
    stockReserved: !!auction.stockReserved,
    stockReleased: !!auction.stockReleased,
  };
}
