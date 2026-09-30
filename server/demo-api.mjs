import { seedUser, publicCatalog } from "./demo/data.mjs";
import { accountApi } from "./demo/account.mjs";
import { commerceApi } from "./demo/commerce.mjs";
import { publicApi, communityApi } from "./demo/community.mjs";
import { auctionApi } from "./demo/auction.mjs";
import fixtures from "./fixtures/public.json" with {type:"json"};
import { passwordHash, passwordMatches } from "./store.mjs";


const copy = (value) => structuredClone(value);
const ok = (data = {}, msg = "操作成功") => ({ code: 1, msg, data });
const fail = (msg) => ({ code: 0, msg, data: {} });
const page = (items, params = {}) => {
  const current = Math.max(1, Number(params.page) || 1);
  const size = Math.min(
    100,
    Math.max(1, Number(params.listRows || params.limit) || 10),
  );
  return {
    total: items.length,
    per_page: size,
    current_page: current,
    last_page: Math.max(1, Math.ceil(items.length / size)),
    data: items.slice((current - 1) * size, current * size),
  };
};
const products = fixtures["/category/getCategoryGoodsList"].data.list.data;
const unavailable = () => fail("未识别的演示操作");

export function demoApi(
  store,
  route,
  params = {},
  token = "",
  method = "POST",
) {
  for (const account of store.state.users) seedUser(store, account);
  const currentProducts = publicCatalog(store);
  const user = store.user(token);
  const auctionResult = auctionApi(store, user, route, params, method);
  if (auctionResult) return auctionResult;
  const publicResult = publicApi(store, user, route, params);
  if (publicResult) return publicResult;
  if (user) {
    for (const handler of [accountApi, commerceApi, communityApi]) {
      const result = handler(store, user, route, params, method);
      if (result) return result;
    }
  }
  const persist = (data = {}, msg) => {
    store.save();
    return ok(data, msg);
  };
  const getProduct = () =>
    currentProducts.find(
      (p) => String(p.goods_id) === String(params.goods_id || params.id || 30),
    );
  if (route === "/member/accountLogin") {
    const account = store.state.users.find((u) => u.phone === params.phone);
    if (account?.status === "1") return fail("账号已停用，请联系管理员");
    if (!account || !passwordMatches(params.password, account.passwordHash))
      return fail("账号或密码错误，请使用本地演示账号");
    return ok({ token: store.login(account) }, "登录成功");
  }
  if (route === "/member/registerAnAccount") {
    params = { ...params, phone: params.mobile || params.phone };
    if (params.code !== undefined && params.code !== "123456")
      return fail("演示验证码为 123456");
    if (!/^1\d{10}$/.test(params.phone || ""))
      return fail("请输入正确的手机号");
    if (String(params.password || "").length < 6) return fail("密码至少 6 位");
    if (
      params.rest_password !== undefined &&
      params.rest_password !== params.password
    )
      return fail("两次输入的密码不一致");
    if (store.state.users.some((u) => u.phone === params.phone))
      return fail("该手机号已注册");
    const newUser = {
      member_id: store.id(),
      phone: params.phone,
      headimg: "/h5/static/img/photo.e65d4f32.png",
      is_advance: 0,
      nickName: String(params.nickname || "新用户").slice(0, 40),
      passwordHash: passwordHash(params.password),
      amount: "0.00",
      score: "0.00",
      e_card_number: "0.00",
      addresses: [],
      orders: [],
      ledger: [],
      payment: {},
      invitation_code: "DEMO" + store.state.nextId,
    };
    delete newUser.payPasswordHash;
    delete newUser.demoVersion;
    delete newUser.identity_name;
    delete newUser.sign_image;
    seedUser(store, newUser);
    store.state.users.push(newUser);
    return persist({ token: store.login(newUser) }, "本地账号注册成功");
  }
  if (route === "/member/getInvitationCode") return ok("DEMO001");

  if (
    route === "/goods/searchShop" ||
    route === "/category/getCategoryGoodsList" ||
    route === "/score/getScoreShopList" ||
    route === "/loodgoods/getCategoryGoodsList"
  ) {
    const keyword = String(
      params.keywords || params.goods_name || params.search || "",
    );
    const items = currentProducts.filter((p) => p.goods_name.includes(keyword));
    return ok({
      list: route === "/goods/searchShop" ? copy(items) : page(items, params),
    });
  }
  if (
    [
      "/shopgoods/getDetails",
      "/score/getDetails",
      "/goods/getLootDetails",
    ].includes(route)
  ) {
    const product = getProduct();
    if (product && route === "/goods/getLootDetails")
      return ok({
        ...copy(
          fixtures["/shopgoods/getDetails:" + product.goods_id].data.detail,
        ),
        goods_image: product.goods_image,
        goods_price: product.goods_min_price,
        goods_no: "",
        value: product.goods_min_price,
        is_order: 0,
        time_info: copy(
          fixtures["/goods/getLootList"].data.list[0].time_list.time,
        ),
      });
    if (!product) return fail("商品不存在");
    const detail = fixtures["/shopgoods/getDetails:" + product.goods_id];
    const fixtureDetail = detail?.data?.detail || {};
    const mergedDetail = {
      ...copy(fixtureDetail),
      ...copy(product),
      goods_price: product.goods_min_price,
      value: product.goods_min_price,
      goods_image: product.goods_image,
      image: [{ file_path: product.goods_image }],
      content: fixtureDetail.content || '<p>精选茶叶，原产地直供。请置于阴凉干燥处保存。</p>',
    };
    return ok({ detail: mergedDetail });
  }
  if (route === "/goods/getLootList") return copy(fixtures[route]);
  if (fixtures[route]) return copy(fixtures[route]);
  if (route === "/index/getOpenNavigation")
    return ok({ index_open: 10, loot_open: 10, member_open: 10 });
  if (route === "/index/getPaySeeting")
    return ok({ wx_open: "0", zfb_open: "0", bank_open: "0" });
  if (route === "/index/getSubscribeSetting")
    return ok({ is_open: 0, amount: "0.00" });
  if (route === "/team/getIsCollageList") return ok([]);
  if (route === "/team/getTypesList") return ok({ list: page([]) });
  if (route === "/goods/getGoodsEvaluation")
    return ok({ list: page([], params) });
  if (route === "/wx/payGateway")
    return ok({
      alipay_open: 20,
      wx_open: 20,
      balance_open: 10,
      points_open: 10,
    });

  if (!user) return { code: -500, msg: "请先登录", data: {} };
  if (route === "/index/getMemberId") return ok(user.member_id);
  if (route === "/member/editMember") {
    for (const key of ["nickName", "headimg"])
      if (typeof params[key] === "string")
        user[key] = params[key].slice(0, 500);
    if (
      typeof params.avatarUrl === "string" &&
      (params.avatarUrl.startsWith("/uploads/") || /^data:image\/(png|jpeg|gif|webp);base64,/.test(params.avatarUrl))
    )
      user.headimg = params.avatarUrl;
    if (params.pay_password)
      user.payPasswordHash = passwordHash(params.pay_password);
    return persist();
  }
  if (route === "/member/getIsPayPassword")
    return ok(user.payPasswordHash ? 1 : 0);
  if (route.startsWith("/address/")) {
    const address = user.addresses.find(
      (a) => String(a.address_id) === String(params.address_id),
    );
    if (route === "/address/list")
      return ok({
        list: user.addresses,
        default_id: user.addresses.find((a) => a.is_default)?.address_id || 0,
      });
    if (route === "/address/detail")
      return address
        ? ok({ detail: address, region: Object.values(address.region || {}) })
        : fail("地址不存在");
    if (route === "/address/delete") {
      if (!address) return fail("地址不存在");
      user.addresses = user.addresses.filter((a) => a !== address);
      if (address.is_default && user.addresses[0])
        user.addresses[0].is_default = 1;
      return persist();
    }
    if (route === "/address/setDefault") {
      if (!address) return fail("地址不存在");
      user.addresses.forEach((a) => {
        a.is_default = a === address ? 1 : 0;
      });
      return persist();
    }
    if (route === "/address/add" || route === "/address/edit") {
      if (
        !params.name ||
        !/^1\d{10}$/.test(params.phone || "") ||
        !params.detail
      )
        return fail("请填写姓名、正确手机号和详细地址");
      const ids = String(params.region || "")
        .split(",")
        .map(Number);
      const provinces = fixtures["/region/getAllList"].data;
      const province = provinces.find((p) => Number(p.id) === ids[0]);
      const city = province?.city.find((c) => Number(c.id) === ids[1]);
      const region = city?.region.find((r) => Number(r.id) === ids[2]);
      if (!region) return fail("请选择完整的省市区");
      const target =
        route === "/address/add"
          ? {
              address_id: store.id(),
              is_default: user.addresses.length === 0 ? 1 : 0,
            }
          : address;
      if (!target) return fail("地址不存在");
      Object.assign(target, {
        name: params.name,
        phone: params.phone,
        detail: params.detail,
        province_id: ids[0],
        city_id: ids[1],
        region_id: ids[2],
        region: {
          province: province.name,
          city: city.name,
          region: region.name,
        },
      });
      if (route === "/address/add") user.addresses.push(target);
      return persist(target);
    }
  }
  return unavailable();
}
