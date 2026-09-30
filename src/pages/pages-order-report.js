/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "3e19": function (t, e, i) {
    "use strict";
    i.r(e);
    var n = i("c4f5"),
      a = i.n(n);
    for (var o in n)
      ["default"].indexOf(o) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return n[t];
          });
        })(o);
    e["default"] = a.a;
  },
  "681c": function (t, e, i) {
    var n = i("b479");
    ("string" === typeof n && (n = [[t.i, n, ""]]),
      n.locals && (t.exports = n.locals));
    var a = i("4f06").default;
    a("4fbdf174", n, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "86a0": function (t, e, i) {
    "use strict";
    i.r(e);
    var n = i("8dde"),
      a = i("3e19");
    for (var o in a)
      ["default"].indexOf(o) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return a[t];
          });
        })(o);
    i("e3e1");
    var r,
      d = i("f0c5"),
      s = Object(d["a"])(
        a["default"],
        n["b"],
        n["c"],
        !1,
        null,
        "6d64f722",
        null,
        !1,
        n["a"],
        r,
      );
    e["default"] = s.exports;
  },
  "8dde": function (t, e, i) {
    "use strict";
    (i.d(e, "b", function () {
      return a;
    }),
      i.d(e, "c", function () {
        return o;
      }),
      i.d(e, "a", function () {
        return n;
      }));
    var n = { shoproLoginModal: i("4935").default },
      a = function () {
        var t = this,
          e = t.$createElement,
          i = t._self._c || e;
        return i(
          "v-uni-view",
          { staticClass: "report" },
          [
            i(
              "v-uni-view",
              { staticClass: "every bgbottom" },
              [
                i("v-uni-view", { staticClass: "order_title" }, [
                  t._v("订单编号:" + t._s(t.detail.order_no)),
                ]),
                i(
                  "v-uni-view",
                  { staticClass: "detail_con clearfix" },
                  [
                    i("v-uni-image", { attrs: { src: t.detail.goods_thumb } }),
                    i(
                      "v-uni-view",
                      { staticClass: "detail_right" },
                      [
                        i(
                          "v-uni-view",
                          [
                            i("v-uni-view", [t._v(t._s(t.detail.goods_name))]),
                            i("v-uni-view", [t._v(t._s(t.detail.goods_no))]),
                          ],
                          1,
                        ),
                        i("v-uni-view", [
                          t._v("￥" + t._s(t.detail.goods_price)),
                        ]),
                      ],
                      1,
                    ),
                  ],
                  1,
                ),
              ],
              1,
            ),
            i(
              "v-uni-view",
              { staticClass: "mainBox" },
              [
                i("v-uni-view", { staticClass: "bigtitle" }, [
                  t._v("举报原因"),
                ]),
                i(
                  "v-uni-view",
                  { staticClass: "smlmain clearfix" },
                  [
                    i(
                      "v-uni-view",
                      {
                        class: "长时间不支付" == t.typename ? "active" : "",
                        on: {
                          click: function (e) {
                            ((arguments[0] = e = t.$handleEvent(e)),
                              t.typeTab("长时间不支付"));
                          },
                        },
                      },
                      [t._v("长时间不支付")],
                    ),
                    i(
                      "v-uni-view",
                      {
                        class: "支付金额不符" == t.typename ? "active" : "",
                        on: {
                          click: function (e) {
                            ((arguments[0] = e = t.$handleEvent(e)),
                              t.typeTab("支付金额不符"));
                          },
                        },
                      },
                      [t._v("支付金额不符")],
                    ),
                    i(
                      "v-uni-view",
                      {
                        class: "未收到款项" == t.typename ? "active" : "",
                        on: {
                          click: function (e) {
                            ((arguments[0] = e = t.$handleEvent(e)),
                              t.typeTab("未收到款项"));
                          },
                        },
                      },
                      [t._v("未收到款项")],
                    ),
                  ],
                  1,
                ),
              ],
              1,
            ),
            i(
              "v-uni-view",
              {
                staticClass: "jubao",
                on: {
                  click: function (e) {
                    ((arguments[0] = e = t.$handleEvent(e)),
                      t.submit.apply(void 0, arguments));
                  },
                },
              },
              [t._v("提交举报")],
            ),
            i("shopro-login-modal", {
              attrs: { showLogin: t.showLogin },
              on: {
                loginhidden: function (e) {
                  ((arguments[0] = e = t.$handleEvent(e)),
                    t.loginhidden.apply(void 0, arguments));
                },
              },
            }),
          ],
          1,
        );
      },
      o = [];
  },
  b479: function (t, e, i) {
    var n = i("24fb");
    ((e = n(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.report .every[data-v-6d64f722]{padding:0 4%}.report .every .order_title[data-v-6d64f722]{height:%?76?%;border-bottom:%?2?% solid #eee;font-size:%?26?%;line-height:%?76?%}.report .every .detail_con[data-v-6d64f722]{height:%?200?%;padding:%?20?% 0}.report .every .detail_con > uni-image[data-v-6d64f722]{float:left;width:%?200?%;height:100%;border-radius:%?10?%}.report .every .detail_con .detail_right[data-v-6d64f722]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;float:left;width:calc(100% - %?220?%);height:100%;margin-left:%?20?%}.report .every .detail_con .detail_right > uni-view:first-of-type uni-view[data-v-6d64f722]:first-of-type{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.report .every .detail_con .detail_right > uni-view:first-of-type uni-view[data-v-6d64f722]:last-of-type{color:#fa3534;font-size:%?24?%;margin-top:%?10?%}.report .every .detail_con .detail_right > uni-view[data-v-6d64f722]:last-of-type{color:#fa3534;font-weight:800}.report .mainBox[data-v-6d64f722]{padding:0 4%}.report .mainBox .bigtitle[data-v-6d64f722]{font-weight:800;padding-top:%?30?%}.report .mainBox .smlmain[data-v-6d64f722]{width:calc(100% + %?24?%)}.report .mainBox .smlmain uni-view[data-v-6d64f722]{float:left;width:%?216?%;height:%?70?%;font-size:%?26?%;background:#f5f5f5;text-align:center;line-height:%?70?%;margin-right:%?20?%;margin-top:%?30?%;border-radius:%?4?%}.report .mainBox .smlmain uni-view.active[data-v-6d64f722]{background:#fa3534;color:#fff}.report .jubao[data-v-6d64f722]{height:%?88?%;line-height:%?88?%;background:#fa3534;font-weight:800;text-align:center;box-shadow:0 %?3?% %?14?% 0 hsla(0,0%,60%,.52);border-radius:%?4?%;color:#fff;margin:%?80?% 4% 0}',
        "",
      ]),
      (t.exports = e));
  },
  c4f5: function (t, e, i) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0));
    e.default = {
      data: function () {
        return { id: "", detail: {}, typename: "长时间不支付", showLogin: !1 };
      },
      onLoad: function (t) {
        var e = this;
        ((this.order_id = t.order_id || this.$route.query.order_id),
          this.request("/order/getOrderReport", {
            order_id: this.order_id,
            type: "transaction",
          }).then(function (t) {
            (-500 == t.data.code && (e.showLogin = !0),
              1 == t.data.code && (e.detail = t.data.data));
          }));
      },
      methods: {
        typeTab: function (t) {
          this.typename = t;
        },
        loginhidden: function (t) {
          this.showLogin = t;
        },
        submit: function () {
          var t = this;
          this.request("/order/toOrderReport", {
            order_id: this.order_id,
            content_text: this.typename,
          }).then(function (e) {
            1 == e.data.code
              ? (t.$tip(e.data.msg),
                setTimeout(function () {
                  uni.navigateBack();
                }, 500))
              : t.$tip(e.data.msg);
          });
        },
      },
    };
  },
  e3e1: function (t, e, i) {
    "use strict";
    var n = i("681c"),
      a = i.n(n);
    a.a;
  },
};
