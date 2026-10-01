/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "14b1": function (e, t, i) {
    var n = i("91f8");
    ("string" === typeof n && (n = [[e.i, n, ""]]),
      n.locals && (e.exports = n.locals));
    var o = i("4f06").default;
    o("27edc400", n, !0, { sourceMap: !1, shadowMode: !1 });
  },
  2871: function (e, t, i) {
    "use strict";
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = void 0),
      i("fca0"),
      i("c5f6"));
    t.default = {
      data: function () {
        return {
          goods: {},
          order_id: "",
          serviceInfo: {},
          e_card_number: 0,
          amount: 0,
          useCoupon: !0,
          useAmount: !1,
          amountDeductOpen: !0,
          submitting: !1,
        };
      },
      computed: {
        serviceFee: function () {
          return Number(
            this.serviceInfo.e_price ||
              this.serviceInfo.service_charge ||
              this.serviceInfo.fee ||
              0,
          );
        },
        memberCoupon: function () {
          return Number(this.e_card_number || 0);
        },
        memberAmount: function () {
          return Number(this.amount || 0);
        },
        displayServiceFee: function () {
          return this.serviceFee;
        },
        payableServiceFee: function () {
          return this.serviceFee;
        },
        couponDeduct: function () {
          if (!this.useCoupon) return 0;
          var e = this.serviceFee,
            t = this.memberCoupon;
          return Math.min(t, e);
        },
        amountDeduct: function () {
          if (!this.amountDeductOpen || !this.useAmount) return 0;
          var e = Math.max(0, this.serviceFee - this.couponDeduct);
          return Math.min(this.memberAmount, e);
        },
        totalDeduct: function () {
          return (
            Math.round(100 * (this.couponDeduct + this.amountDeduct)) / 100
          );
        },
        needMorePay: function () {
          return this.totalDeduct + 1e-4 < this.serviceFee;
        },
        needRechargeAmount: function () {
          var e = this.serviceFee - this.totalDeduct;
          return !Number.isFinite(e) || e <= 0 ? 0 : Math.round(100 * e) / 100;
        },
      },
      onLoad: function (e) {
        ((this.order_id = e.order_id || ""),
          (this.goods = uni.getStorageSync("warehouse_goods_detail") || {}),
          this.getServiceCharge(),
          this.getMemberDetails());
      },
      methods: {
        syncDeductDefaults: function () {
          this.amountDeductOpen
            ? ((this.useCoupon = Number(this.e_card_number) > 0),
              (this.useAmount = Number(this.amount) > 0),
              this.useCoupon ||
                this.useAmount ||
                ((this.useCoupon = !0), (this.useAmount = !0)))
            : ((this.useCoupon = !0), (this.useAmount = !1));
        },
        getMemberDetails: function () {
          var e = this;
          this.request("/member/getMemberDetails").then(function (t) {
            if (1 == t.data.code) {
              var i = t.data.data || {};
              ((e.e_card_number = i.e_card_number || 0),
                (e.amount = i.amount || 0),
                e.syncDeductDefaults());
            }
          });
        },
        getServiceCharge: function () {
          var e = this;
          this.request("/order/getServiceCharge", {
            order_id: this.order_id || this.goods.order_id,
            goods_id: this.goods.goods_id,
            type: 2,
          }).then(function (t) {
            if (1 == t.data.code) {
              e.serviceInfo = t.data.data || {};
              var i = e.serviceInfo.amount_deduct_open;
              ((e.amountDeductOpen =
                void 0 === i || null === i || "" === i || "10" === String(i)),
                e.syncDeductDefaults());
            } else e.$tip(t.data.msg);
          });
        },
        toggleCoupon: function () {
          this.useCoupon = !this.useCoupon;
        },
        toggleAmount: function () {
          this.amountDeductOpen && (this.useAmount = !this.useAmount);
        },
        formatMoney: function (e) {
          var t = Number(e || 0);
          return Number.isFinite(t) ? t.toFixed(2) : "0.00";
        },
        submitConsign: function () {
          var e = this;
          if (!this.submitting) {
            var t = this.order_id || this.goods.order_id;
            if (t) {
              var i = this.amountDeductOpen && this.useAmount;
              if (this.useCoupon || i)
                if (this.needMorePay)
                  this.$tip(
                    this.amountDeductOpen
                      ? "优惠券与余额合计不足，请先充值后再寄售"
                      : "优惠券不足，请先充值后再寄售",
                  );
                else {
                  var n = {
                    order_id: t,
                    use_coupon: this.useCoupon ? "1" : "0",
                    use_amount: i ? "1" : "0",
                    coupon_deduct: this.formatMoney(this.couponDeduct),
                    amount_deduct: this.formatMoney(i ? this.amountDeduct : 0),
                  };
                  ((this.submitting = !0),
                    uni.showLoading({ title: "提交中" }),
                    this.request("/order/toServiceChargeWithVoucher", n)
                      .then(function (t) {
                        1 == t.data.code
                          ? (e.$tip(t.data.msg || "寄售成功"),
                            uni.setStorageSync("warehouse_showTab", "payment"),
                            uni.setStorageSync("warehouse_smltype", 0),
                            setTimeout(function () {
                              uni.switchTab({ url: "/pages/order/order" });
                            }, 1e3))
                          : e.$tip(
                              t.data.msg || "余额/优惠券不足，请先充值后再寄售",
                            );
                      })
                      .finally(function () {
                        ((e.submitting = !1), uni.hideLoading());
                      }));
                }
              else
                this.$tip(
                  this.amountDeductOpen
                    ? "请至少选择一种抵扣方式"
                    : "请勾选优惠券抵扣",
                );
            } else this.$tip("订单信息异常");
          }
        },
      },
    };
  },
  4828: function (e, t, i) {
    "use strict";
    i.r(t);
    var n = i("c337"),
      o = i("99b0");
    for (var s in o)
      ["default"].indexOf(s) < 0 &&
        (function (e) {
          i.d(t, e, function () {
            return o[e];
          });
        })(s);
    i("d56d");
    var a,
      u = i("f0c5"),
      r = Object(u["a"])(
        o["default"],
        n["b"],
        n["c"],
        !1,
        null,
        "274d023e",
        null,
        !1,
        n["a"],
        a,
      );
    t["default"] = (typeof window !== "undefined" && window.__H5_SERVER_MODE__ === "ruoyi" && window.__teaWorkflowPage) ? window.__teaWorkflowPage("warehouse") : r.exports;
  },
  "91f8": function (e, t, i) {
    var n = i("24fb");
    ((t = n(!1)),
      t.push([
        e.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.consign-page[data-v-274d023e]{min-height:100vh;background:#f1edf7;padding-bottom:%?140?%;box-sizing:border-box}.goods-card[data-v-274d023e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#fff;padding:%?28?% %?20?%;border-top:%?1?% solid #eee}.goods-img[data-v-274d023e]{width:%?120?%;height:%?120?%;background:#f5f5f5;margin-right:%?28?%}.goods-info[data-v-274d023e]{-webkit-box-flex:1;-webkit-flex:1;flex:1;min-width:0}.goods-name[data-v-274d023e]{font-size:%?30?%;font-weight:600;color:#222;line-height:%?42?%;margin-bottom:%?34?%}.goods-price[data-v-274d023e]{font-size:%?30?%;font-weight:700;color:#e52222}.form-box[data-v-274d023e]{background:#fff;margin-top:%?16?%}.form-row[data-v-274d023e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:%?86?%;padding:0 %?28?%;font-size:%?30?%;font-weight:600;color:#222;box-sizing:border-box}.selectable[data-v-274d023e]{cursor:pointer}.select-left[data-v-274d023e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.check-box[data-v-274d023e]{width:%?36?%;height:%?36?%;border-radius:%?8?%;border:%?2?% solid #ccc;margin-right:%?16?%;display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?24?%;color:#fff;box-sizing:border-box}.check-box.on[data-v-274d023e]{background:#2f80ed;border-color:#2f80ed}.voucher-tip[data-v-274d023e]{padding:0 %?28?% %?20?%;font-size:%?24?%;color:#e52222;line-height:%?36?%}.balance-amount[data-v-274d023e]{color:#e52222;font-weight:700}.fee-amount[data-v-274d023e]{color:#222;font-weight:700}.recharge-amount[data-v-274d023e]{color:#e52222;font-weight:700}.tips-box[data-v-274d023e]{margin:%?24?% %?28?%;padding:%?24?%;background:rgba(140,110,200,.12);border-radius:%?12?%;font-size:%?24?%;color:#666;line-height:%?40?%}.tips-box uni-text[data-v-274d023e]{color:#e52222;font-weight:600}.submit-btn[data-v-274d023e]{position:fixed;left:%?28?%;right:%?28?%;bottom:%?40?%;height:%?88?%;line-height:%?88?%;text-align:center;background:#09bd59;color:#fff;font-size:%?32?%;font-weight:600;border-radius:%?44?%}',
        "",
      ]),
      (e.exports = t));
  },
  "99b0": function (e, t, i) {
    "use strict";
    i.r(t);
    var n = i("2871"),
      o = i.n(n);
    for (var s in n)
      ["default"].indexOf(s) < 0 &&
        (function (e) {
          i.d(t, e, function () {
            return n[e];
          });
        })(s);
    t["default"] = o.a;
  },
  c337: function (e, t, i) {
    "use strict";
    var n;
    (i.d(t, "b", function () {
      return o;
    }),
      i.d(t, "c", function () {
        return s;
      }),
      i.d(t, "a", function () {
        return n;
      }));
    var o = function () {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i(
          "v-uni-view",
          { staticClass: "consign-page" },
          [
            i(
              "v-uni-view",
              { staticClass: "goods-card" },
              [
                i("v-uni-image", {
                  staticClass: "goods-img",
                  attrs: {
                    src: e.goods.image || "../../static/images/noimg.png",
                    mode: "aspectFill",
                  },
                }),
                i(
                  "v-uni-view",
                  { staticClass: "goods-info" },
                  [
                    i("v-uni-view", { staticClass: "goods-name" }, [
                      e._v(e._s(e.goods.goods_name || "--")),
                    ]),
                    i("v-uni-view", { staticClass: "goods-price" }, [
                      e._v("¥" + e._s(e.formatMoney(e.goods.goods_price))),
                    ]),
                  ],
                  1,
                ),
              ],
              1,
            ),
            i(
              "v-uni-view",
              { staticClass: "form-box" },
              [
                i(
                  "v-uni-view",
                  { staticClass: "form-row" },
                  [
                    i("v-uni-text", [e._v("商品编号")]),
                    i("v-uni-text", [
                      e._v(
                        e._s(
                          e.goods.goods_id ||
                            e.goods.order_id ||
                            e.order_id ||
                            0,
                        ),
                      ),
                    ]),
                  ],
                  1,
                ),
                i(
                  "v-uni-view",
                  { staticClass: "form-row" },
                  [
                    i("v-uni-text", [e._v("委托价格")]),
                    i("v-uni-text", [
                      e._v(
                        "¥ " +
                          e._s(
                            e.formatMoney(
                              e.serviceInfo.consignment_goods_price ||
                                e.serviceInfo.price ||
                                e.goods.consignment_goods_price ||
                                e.goods.goods_price,
                            ),
                          ),
                      ),
                    ]),
                  ],
                  1,
                ),
                i(
                  "v-uni-view",
                  { staticClass: "form-row" },
                  [
                    i("v-uni-text", [e._v("手续费")]),
                    i("v-uni-text", { staticClass: "fee-amount" }, [
                      e._v("¥ " + e._s(e.formatMoney(e.displayServiceFee))),
                    ]),
                  ],
                  1,
                ),
                i(
                  "v-uni-view",
                  {
                    staticClass: "form-row selectable",
                    on: {
                      click: function (t) {
                        ((arguments[0] = t = e.$handleEvent(t)),
                          e.toggleCoupon.apply(void 0, arguments));
                      },
                    },
                  },
                  [
                    i(
                      "v-uni-view",
                      { staticClass: "select-left" },
                      [
                        i(
                          "v-uni-text",
                          {
                            staticClass: "check-box",
                            class: { on: e.useCoupon },
                          },
                          [e._v(e._s(e.useCoupon ? "✓" : ""))],
                        ),
                        i("v-uni-text", [e._v("优惠券抵扣")]),
                      ],
                      1,
                    ),
                    i("v-uni-text", { staticClass: "balance-amount" }, [
                      e._v("¥ " + e._s(e.formatMoney(e.memberCoupon))),
                    ]),
                  ],
                  1,
                ),
                e.amountDeductOpen
                  ? i(
                      "v-uni-view",
                      {
                        staticClass: "form-row selectable",
                        on: {
                          click: function (t) {
                            ((arguments[0] = t = e.$handleEvent(t)),
                              e.toggleAmount.apply(void 0, arguments));
                          },
                        },
                      },
                      [
                        i(
                          "v-uni-view",
                          { staticClass: "select-left" },
                          [
                            i(
                              "v-uni-text",
                              {
                                staticClass: "check-box",
                                class: { on: e.useAmount },
                              },
                              [e._v(e._s(e.useAmount ? "✓" : ""))],
                            ),
                            i("v-uni-text", [e._v("余额抵扣")]),
                          ],
                          1,
                        ),
                        i("v-uni-text", { staticClass: "balance-amount" }, [
                          e._v("¥ " + e._s(e.formatMoney(e.memberAmount))),
                        ]),
                      ],
                      1,
                    )
                  : e._e(),
                e.useCoupon
                  ? i(
                      "v-uni-view",
                      { staticClass: "form-row" },
                      [
                        i("v-uni-text", [e._v("优惠券本次抵扣")]),
                        i("v-uni-text", { staticClass: "fee-amount" }, [
                          e._v("¥ " + e._s(e.formatMoney(e.couponDeduct))),
                        ]),
                      ],
                      1,
                    )
                  : e._e(),
                e.amountDeductOpen && e.useAmount
                  ? i(
                      "v-uni-view",
                      { staticClass: "form-row" },
                      [
                        i("v-uni-text", [e._v("余额本次抵扣")]),
                        i("v-uni-text", { staticClass: "fee-amount" }, [
                          e._v("¥ " + e._s(e.formatMoney(e.amountDeduct))),
                        ]),
                      ],
                      1,
                    )
                  : e._e(),
                i(
                  "v-uni-view",
                  { staticClass: "form-row" },
                  [
                    i("v-uni-text", [e._v("还需支付")]),
                    i("v-uni-text", { staticClass: "recharge-amount" }, [
                      e._v("¥ " + e._s(e.formatMoney(e.needRechargeAmount))),
                    ]),
                  ],
                  1,
                ),
                e.needMorePay
                  ? i("v-uni-view", { staticClass: "voucher-tip" }, [
                      e._v(
                        e._s(
                          e.amountDeductOpen
                            ? "请勾选优惠券/余额，合计需覆盖手续费"
                            : "请勾选优惠券，需覆盖手续费",
                        ),
                      ),
                    ])
                  : e._e(),
              ],
              1,
            ),
            i(
              "v-uni-view",
              { staticClass: "tips-box" },
              [
                i(
                  "v-uni-view",
                  [
                    e._v("您在委托前所需支付价格的"),
                    i("v-uni-text", [
                      e._v(e._s(e.serviceInfo.e_percentage) + "%"),
                    ]),
                    e._v("作为上架手续费，支付前请明确如下："),
                  ],
                  1,
                ),
                i(
                  "v-uni-view",
                  [
                    e._v("委托价格为:"),
                    i("v-uni-text", [
                      e._v(
                        e._s(
                          e.formatMoney(
                            e.serviceInfo.consignment_goods_price ||
                              e.serviceInfo.price ||
                              e.goods.consignment_goods_price ||
                              e.goods.goods_price,
                          ),
                        ) + "元",
                      ),
                    ]),
                    e._v(", 需支付手续费:"),
                    i("v-uni-text", [
                      e._v(e._s(e.formatMoney(e.payableServiceFee)) + "元"),
                    ]),
                  ],
                  1,
                ),
                i("v-uni-view", [
                  e._v(
                    e._s(
                      e.amountDeductOpen
                        ? "可同时勾选优惠券与余额共同抵扣。"
                        : "可勾选优惠券抵扣手续费。",
                    ),
                  ),
                ]),
              ],
              1,
            ),
            i(
              "v-uni-view",
              {
                staticClass: "submit-btn",
                on: {
                  click: function (t) {
                    ((arguments[0] = t = e.$handleEvent(t)),
                      e.submitConsign.apply(void 0, arguments));
                  },
                },
              },
              [e._v("委托上架")],
            ),
          ],
          1,
        );
      },
      s = [];
  },
  d56d: function (e, t, i) {
    "use strict";
    var n = i("14b1"),
      o = i.n(n);
    o.a;
  },
  fca0: function (e, t, i) {
    var n = i("5ca1"),
      o = i("7726").isFinite;
    n(n.S, "Number", {
      isFinite: function (e) {
        return "number" == typeof e && o(e);
      },
    });
  },
};
