/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "0e1d": function (e, t, i) {
    "use strict";
    i.r(t);
    var a = i("2604"),
      n = i("2a00");
    for (var o in n)
      ["default"].indexOf(o) < 0 &&
        (function (e) {
          i.d(t, e, function () {
            return n[e];
          });
        })(o);
    i("c5b5");
    var s,
      r = i("f0c5"),
      c = Object(r["a"])(
        n["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "c4eda240",
        null,
        !1,
        a["a"],
        s,
      );
    t["default"] = (typeof window !== "undefined" && window.__H5_SERVER_MODE__ === "ruoyi" && window.__teaWorkflowPage) ? window.__teaWorkflowPage("warehouse") : c.exports;
  },
  2604: function (e, t, i) {
    "use strict";
    var a;
    (i.d(t, "b", function () {
      return n;
    }),
      i.d(t, "c", function () {
        return o;
      }),
      i.d(t, "a", function () {
        return a;
      }));
    var n = function () {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i(
          "v-uni-view",
          { staticClass: "pay-page" },
          [
            i(
              "v-uni-view",
              { staticClass: "amount-card" },
              [
                i("v-uni-view", { staticClass: "amount-label" }, [
                  e._v("支付金额"),
                ]),
                i("v-uni-view", { staticClass: "amount-value" }, [
                  e._v("¥" + e._s(e.formatMoney(e.payAmount))),
                ]),
                i(
                  "v-uni-view",
                  { staticClass: "amount-footer" },
                  [
                    i("v-uni-text", { staticClass: "order-no" }, [
                      e._v("订单编号：" + e._s(e.orderNo || "--")),
                    ]),
                  ],
                  1,
                ),
              ],
              1,
            ),
            i(
              "v-uni-view",
              { staticClass: "section-card" },
              [
                i(
                  "v-uni-view",
                  { staticClass: "section-title" },
                  [
                    i("v-uni-view", { staticClass: "title-bar" }),
                    i("v-uni-text", [e._v("选择支付方式")]),
                  ],
                  1,
                ),
                e.showMethodTabs
                  ? i(
                      "v-uni-view",
                      { staticClass: "method-tabs" },
                      [
                        1 == e.mobanopen.wx_open
                          ? i(
                              "v-uni-view",
                              {
                                class: [
                                  "method-tab",
                                  1 === e.payType ? "active" : "",
                                ],
                                on: {
                                  click: function (t) {
                                    ((arguments[0] = t = e.$handleEvent(t)),
                                      (e.payType = 1));
                                  },
                                },
                              },
                              [e._v("微信")],
                            )
                          : e._e(),
                        1 == e.mobanopen.zfb_open
                          ? i(
                              "v-uni-view",
                              {
                                class: [
                                  "method-tab",
                                  3 === e.payType ? "active" : "",
                                ],
                                on: {
                                  click: function (t) {
                                    ((arguments[0] = t = e.$handleEvent(t)),
                                      (e.payType = 3));
                                  },
                                },
                              },
                              [e._v("支付宝")],
                            )
                          : e._e(),
                        1 == e.mobanopen.bank_open
                          ? i(
                              "v-uni-view",
                              {
                                class: [
                                  "method-tab",
                                  8 === e.payType ? "active" : "",
                                ],
                                on: {
                                  click: function (t) {
                                    ((arguments[0] = t = e.$handleEvent(t)),
                                      (e.payType = 8));
                                  },
                                },
                              },
                              [e._v("银行卡")],
                            )
                          : e._e(),
                      ],
                      1,
                    )
                  : e._e(),
                1 === e.payType && 1 == e.mobanopen.wx_open
                  ? i(
                      "v-uni-view",
                      { staticClass: "pay-method active" },
                      [
                        i(
                          "v-uni-view",
                          { staticClass: "method-head" },
                          [
                            i("v-uni-text", [e._v("微信")]),
                            i("v-uni-view", { staticClass: "method-check" }, [
                              e._v("✓"),
                            ]),
                          ],
                          1,
                        ),
                        e.payInfo.wx_image
                          ? i("v-uni-image", {
                              staticClass: "qr-image",
                              attrs: {
                                src: e.payInfo.wx_image,
                                mode: "aspectFit",
                              },
                            })
                          : i("v-uni-view", { staticClass: "qr-placeholder" }, [
                              e._v("暂无收款码"),
                            ]),
                        i("v-uni-view", { staticClass: "payee-name" }, [
                          e._v("收款人：" + e._s(e.payInfo.wx_name || "--")),
                        ]),
                      ],
                      1,
                    )
                  : 3 === e.payType && 1 == e.mobanopen.zfb_open
                    ? i(
                        "v-uni-view",
                        { staticClass: "pay-method active" },
                        [
                          i(
                            "v-uni-view",
                            { staticClass: "method-head" },
                            [
                              i("v-uni-text", [e._v("支付宝")]),
                              i("v-uni-view", { staticClass: "method-check" }, [
                                e._v("✓"),
                              ]),
                            ],
                            1,
                          ),
                          e.payInfo.zfb_image
                            ? i("v-uni-image", {
                                staticClass: "qr-image",
                                attrs: {
                                  src: e.payInfo.zfb_image,
                                  mode: "aspectFit",
                                },
                              })
                            : i(
                                "v-uni-view",
                                { staticClass: "qr-placeholder" },
                                [e._v("暂无收款码")],
                              ),
                          i("v-uni-view", { staticClass: "payee-name" }, [
                            e._v("收款人：" + e._s(e.payInfo.zfb_name || "--")),
                          ]),
                        ],
                        1,
                      )
                    : 8 === e.payType && 1 == e.mobanopen.bank_open
                      ? i(
                          "v-uni-view",
                          { staticClass: "bank-info" },
                          [
                            i(
                              "v-uni-view",
                              { staticClass: "bank-row" },
                              [
                                i("v-uni-text", [e._v("姓名")]),
                                i("v-uni-text", [
                                  e._v(e._s(e.payInfo.bank_name || "--")),
                                ]),
                              ],
                              1,
                            ),
                            i(
                              "v-uni-view",
                              { staticClass: "bank-row" },
                              [
                                i("v-uni-text", [e._v("开户行")]),
                                i("v-uni-text", [
                                  e._v(e._s(e.payInfo.bank || "--")),
                                ]),
                              ],
                              1,
                            ),
                            i(
                              "v-uni-view",
                              { staticClass: "bank-row" },
                              [
                                i("v-uni-text", [e._v("卡号")]),
                                i("v-uni-text", [
                                  e._v(e._s(e.payInfo.bank_card || "--")),
                                ]),
                              ],
                              1,
                            ),
                            e.payInfo.mobile
                              ? i(
                                  "v-uni-view",
                                  { staticClass: "bank-row" },
                                  [
                                    i("v-uni-text", [e._v("手机号")]),
                                    i("v-uni-text", [
                                      e._v(e._s(e.payInfo.mobile)),
                                    ]),
                                  ],
                                  1,
                                )
                              : e._e(),
                          ],
                          1,
                        )
                      : e._e(),
              ],
              1,
            ),
            i(
              "v-uni-view",
              { staticClass: "section-card" },
              [
                i(
                  "v-uni-view",
                  { staticClass: "section-title" },
                  [
                    i("v-uni-view", { staticClass: "title-bar" }),
                    i("v-uni-text", [e._v("上传付款凭证")]),
                  ],
                  1,
                ),
                i(
                  "v-uni-view",
                  {
                    staticClass: "upload-box",
                    on: {
                      click: function (t) {
                        ((arguments[0] = t = e.$handleEvent(t)),
                          e.uploadVoucher.apply(void 0, arguments));
                      },
                    },
                  },
                  [
                    e.voucherImage
                      ? i("v-uni-image", {
                          staticClass: "voucher-image",
                          attrs: { src: e.voucherImage, mode: "aspectFill" },
                        })
                      : i("v-uni-view", { staticClass: "upload-placeholder" }, [
                          e._v("+"),
                        ]),
                  ],
                  1,
                ),
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
                      e.confirmPay.apply(void 0, arguments));
                  },
                },
              },
              [e._v("确认已付款")],
            ),
          ],
          1,
        );
      },
      o = [];
  },
  "2a00": function (e, t, i) {
    "use strict";
    i.r(t);
    var a = i("57c5"),
      n = i.n(a);
    for (var o in a)
      ["default"].indexOf(o) < 0 &&
        (function (e) {
          i.d(t, e, function () {
            return a[e];
          });
        })(o);
    t["default"] = n.a;
  },
  "57c5": function (e, t, i) {
    "use strict";
    var a = i("4ea4");
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = void 0),
      i("fca0"),
      i("7514"));
    var n = a(i("53ca"));
    i("c5f6");
    t.default = {
      data: function () {
        return {
          order_id: "",
          goods_id: "",
          voucher_id: "",
          isUploadMode: !1,
          useCoupon: "1",
          serviceInfo: {},
          payInfo: {},
          mobanopen: {},
          payType: 1,
          voucherImage: "",
          submitting: !1,
        };
      },
      computed: {
        payAmount: function () {
          var e = Number(this.serviceInfo.cash_amount || 0);
          if (e > 0 || this.isUploadMode) return e > 0 ? e : 0;
          var t = Number(
            this.serviceInfo.e_price ||
              this.serviceInfo.total_fee ||
              this.serviceInfo.service_charge ||
              this.serviceInfo.fee ||
              0,
          );
          if ("0" === this.useCoupon) return t;
          var i = Number(
              this.serviceInfo.coupon_deduct ||
                this.serviceInfo.member_amount ||
                0,
            ),
            a = t - i;
          return a > 0 ? a : 0;
        },
        orderNo: function () {
          return this.serviceInfo.order_no || this.serviceInfo.order_sn || "";
        },
        showMethodTabs: function () {
          var e = 0;
          return (
            1 == this.mobanopen.wx_open && e++,
            1 == this.mobanopen.zfb_open && e++,
            1 == this.mobanopen.bank_open && e++,
            e > 1
          );
        },
      },
      onLoad: function (e) {
        ((this.order_id = e.order_id || ""),
          (this.goods_id = e.goods_id || ""),
          (this.voucher_id = e.voucher_id || ""),
          (this.isUploadMode = !!this.voucher_id),
          (this.useCoupon = null != e.use_coupon ? String(e.use_coupon) : "1"),
          this.isUploadMode
            ? (this.serviceInfo = {
                order_no: e.order_no ? decodeURIComponent(e.order_no) : "",
                cash_amount: e.cash_amount || 0,
                e_price: e.cash_amount || 0,
                total_fee: e.total_fee || 0,
                coupon_deduct: e.coupon_deduct || 0,
              })
            : (this.serviceInfo =
                uni.getStorageSync("consign_service_info") || {}),
          this.loadPaySetting(),
          this.isUploadMode || this.loadServiceCharge(),
          this.loadStorePayInfo());
      },
      methods: {
        loadPaySetting: function () {
          var e = this;
          this.request("/index/getPaySeeting").then(function (t) {
            1 == t.data.code &&
              ((e.mobanopen = t.data.data || {}), e.applyDefaultPayType());
          });
        },
        loadStorePayInfo: function () {
          var e = this;
          this.request("/index/getStoreInfo").then(function (t) {
            if (1 == t.data.code) {
              var i = t.data.data || {},
                a = i.pay_info || i.payInfo || i.pay || i;
              ((e.payInfo = {
                mobile: a.mobile || "",
                wx_name: a.wx_name || "",
                wx_account: a.wx_account || "",
                wx_mobile: a.wx_mobile || "",
                wx_image: a.wx_image || "",
                zfb_name: a.zfb_name || "",
                zfb_account: a.zfb_account || "",
                zfb_mobile: a.zfb_mobile || "",
                zfb_image: a.zfb_image || "",
                bank_name: a.bank_username || "",
                bank: a.bank_name || "",
                bank_card: a.bankcard_number || "",
              }),
                e.applyDefaultPayType());
            } else e.$tip(t.data.msg);
          });
        },
        applyDefaultPayType: function () {
          this.mobanopen &&
            "object" === (0, n.default)(this.mobanopen) &&
            (1 != this.mobanopen.wx_open ||
            (!this.payInfo.wx_image && !this.payInfo.wx_name)
              ? 1 != this.mobanopen.zfb_open ||
                (!this.payInfo.zfb_image && !this.payInfo.zfb_name)
                ? 1 == this.mobanopen.bank_open &&
                  (this.payInfo.bank_name ||
                    this.payInfo.bank_card ||
                    this.payInfo.bank)
                  ? (this.payType = 8)
                  : 1 == this.mobanopen.wx_open
                    ? (this.payType = 1)
                    : 1 == this.mobanopen.zfb_open
                      ? (this.payType = 3)
                      : 1 == this.mobanopen.bank_open && (this.payType = 8)
                : (this.payType = 3)
              : (this.payType = 1));
        },
        loadServiceCharge: function () {
          var e = this,
            t = uni.getStorageSync("warehouse_goods_detail") || {};
          this.request("/order/getServiceCharge", {
            order_id: this.order_id || t.order_id,
            goods_id: this.goods_id || t.goods_id,
            type: 2,
          }).then(function (t) {
            1 == t.data.code
              ? ((e.serviceInfo = t.data.data || {}),
                uni.setStorageSync("consign_service_info", e.serviceInfo))
              : e.$tip(t.data.msg);
          });
        },
        syncOrderNoFromListingOrders: function () {
          var e = this;
          this.voucher_id &&
            !this.serviceInfo.order_no &&
            this.request("/order/getListingFeeOrders", {}).then(function (t) {
              if (1 == t.data.code) {
                var i = t.data.data || {},
                  a = i.data || i.items || i || [];
                if (Array.isArray(a)) {
                  var n = a.find(function (t) {
                    return String(t.voucher_id) === String(e.voucher_id);
                  });
                  n &&
                    n.order_no &&
                    (e.serviceInfo = Object.assign({}, e.serviceInfo, {
                      order_no: n.order_no,
                    }));
                }
              }
            });
        },
        uploadVoucher: function () {
          var e = this;
          uni.chooseImage({
            count: 1,
            sourceType: ["album", "camera"],
            success: function (t) {
              (uni.showLoading({ title: "上传中" }),
                uni.uploadFile({
                  url: e.$Config.url + "/upload/image",
                  filePath: t.tempFilePaths[0],
                  name: "iFile",
                  header: {
                    token: uni.getStorageSync("TOKEN"),
                    Version: "102",
                  },
                  success: function (t) {
                    var i = JSON.parse(t.data || "{}");
                    1 == i.code
                      ? (e.voucherImage = i.data.file_path)
                      : e.$tip(i.msg || "上传失败");
                  },
                  fail: function () {
                    e.$tip("上传失败");
                  },
                  complete: function () {
                    uni.hideLoading();
                  },
                }));
            },
          });
        },
        formatMoney: function (e) {
          var t = Number(e || 0);
          return Number.isFinite(t) ? t.toFixed(2) : "0.00";
        },
        confirmPay: function () {
          var e = this;
          if (!this.submitting)
            if (this.voucherImage)
              if (
                ((this.submitting = !0),
                uni.showLoading({ title: "提交中" }),
                this.isUploadMode && this.voucher_id)
              )
                this.request("/order/uploadListingFeeVoucher", {
                  voucher_id: this.voucher_id,
                  voucher_image: this.voucherImage,
                })
                  .then(function (t) {
                    1 == t.data.code
                      ? (e.$tip(t.data.msg || "凭证上传成功，等待审核"),
                        setTimeout(function () {
                          uni.navigateBack({ delta: 1 });
                        }, 1e3))
                      : e.$tip(t.data.msg);
                  })
                  .finally(function () {
                    ((e.submitting = !1), uni.hideLoading());
                  });
              else {
                var t = this.order_id || this.serviceInfo.order_id;
                if (!t)
                  return (
                    this.$tip("订单信息异常"),
                    (this.submitting = !1),
                    void uni.hideLoading()
                  );
                this.request("/order/toServiceChargeWithVoucher", {
                  order_id: t,
                  use_coupon: this.useCoupon,
                  voucher_image: this.voucherImage,
                })
                  .then(function (t) {
                    1 == t.data.code
                      ? (e.$tip(t.data.msg || "提交成功"),
                        setTimeout(function () {
                          uni.switchTab({ url: "/pages/order/order" });
                        }, 1e3))
                      : e.$tip(t.data.msg);
                  })
                  .finally(function () {
                    ((e.submitting = !1), uni.hideLoading());
                  });
              }
            else this.$tip("请上传付款凭证");
        },
      },
    };
  },
  "6d9e": function (e, t, i) {
    var a = i("e4e7");
    ("string" === typeof a && (a = [[e.i, a, ""]]),
      a.locals && (e.exports = a.locals));
    var n = i("4f06").default;
    n("c82b53a0", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  c5b5: function (e, t, i) {
    "use strict";
    var a = i("6d9e"),
      n = i.n(a);
    n.a;
  },
  e4e7: function (e, t, i) {
    var a = i("24fb");
    ((t = a(!1)),
      t.push([
        e.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pay-page[data-v-c4eda240]{min-height:100vh;background:#f5f5f5;padding:%?24?% %?24?% %?160?%;box-sizing:border-box}.amount-card[data-v-c4eda240],\n.section-card[data-v-c4eda240]{background:#fff;border-radius:%?16?%;margin-bottom:%?24?%;overflow:hidden}.amount-card[data-v-c4eda240]{padding:%?36?% %?28?% 0}.amount-label[data-v-c4eda240]{font-size:%?28?%;color:#666}.amount-value[data-v-c4eda240]{margin-top:%?16?%;font-size:%?64?%;font-weight:700;color:#ff6b2c;line-height:1.2}.amount-footer[data-v-c4eda240]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?28?%;padding:%?22?% 0;border-top:%?1?% solid #f0f0f0;font-size:%?24?%;color:#999}.order-no[data-v-c4eda240]{max-width:65%;text-align:right;word-break:break-all}.section-card[data-v-c4eda240]{padding:%?28?%}.section-title[data-v-c4eda240]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-bottom:%?24?%;font-size:%?30?%;font-weight:600;color:#222}.title-bar[data-v-c4eda240]{width:%?6?%;height:%?28?%;border-radius:%?4?%;background:#ffc400;margin-right:%?12?%}.method-tabs[data-v-c4eda240]{display:-webkit-box;display:-webkit-flex;display:flex;gap:%?16?%;margin-bottom:%?20?%}.method-tab[data-v-c4eda240]{min-width:%?120?%;height:%?56?%;padding:0 %?20?%;border-radius:%?8?%;border:%?1?% solid #ddd;font-size:%?26?%;line-height:%?56?%;text-align:center;color:#666}.method-tab.active[data-v-c4eda240]{border-color:#ff6b2c;color:#ff6b2c;background:#fff7f2}.pay-method[data-v-c4eda240]{border:%?2?% solid #ff6b2c;border-radius:%?12?%;padding:%?24?%;background:#fff}.method-head[data-v-c4eda240]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?30?%;font-weight:600;color:#222;margin-bottom:%?20?%}.method-check[data-v-c4eda240]{width:%?36?%;height:%?36?%;border-radius:50%;background:#ff6b2c;color:#fff;font-size:%?22?%;line-height:%?36?%;text-align:center}.qr-image[data-v-c4eda240]{display:block;width:%?360?%;height:%?360?%;margin:0 auto;background:#f8f8f8}.qr-placeholder[data-v-c4eda240]{width:%?360?%;height:%?360?%;margin:0 auto;background:#f8f8f8;color:#999;font-size:%?28?%;line-height:%?360?%;text-align:center}.payee-name[data-v-c4eda240]{margin-top:%?20?%;text-align:center;font-size:%?28?%;color:#333}.payee-extra[data-v-c4eda240]{margin-top:%?12?%;text-align:center;font-size:%?26?%;color:#666}.bank-info[data-v-c4eda240]{border:%?2?% solid #ff6b2c;border-radius:%?12?%;padding:%?8?% %?24?%}.bank-row[data-v-c4eda240]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:%?72?%;font-size:%?28?%;color:#333;border-bottom:%?1?% solid #f2f2f2}.bank-row[data-v-c4eda240]:last-child{border-bottom:none}.upload-box[data-v-c4eda240]{width:%?180?%;height:%?180?%;background:#f3f3f3;border-radius:%?8?%;overflow:hidden}.upload-placeholder[data-v-c4eda240]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?72?%;color:#bbb;line-height:1}.voucher-image[data-v-c4eda240]{width:100%;height:100%}.submit-btn[data-v-c4eda240]{position:fixed;left:%?24?%;right:%?24?%;bottom:%?48?%;height:%?88?%;line-height:%?88?%;text-align:center;border-radius:%?44?%;background:-webkit-linear-gradient(left,#f44,#d22);background:linear-gradient(90deg,#f44,#d22);color:#fff;font-size:%?32?%;font-weight:600}',
        "",
      ]),
      (e.exports = t));
  },
  fca0: function (e, t, i) {
    var a = i("5ca1"),
      n = i("7726").isFinite;
    a(a.S, "Number", {
      isFinite: function (e) {
        return "number" == typeof e && n(e);
      },
    });
  },
};
