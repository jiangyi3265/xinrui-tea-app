/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "1acf": function (e, t, i) {
    "use strict";
    var n = i("743b"),
      o = i.n(n);
    o.a;
  },
  2790: function (e, t, i) {
    "use strict";
    var n = i("4ea4");
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = void 0));
    var o = n(i("baf2"));
    t.default = {
      data: function () {
        return { id: "", details: {}, courier: [], type: 1 };
      },
      onLoad: function (e) {
        var t = this;
        ((this.id = e.id || this.$route.query.id),
          (this.type = e.type || this.$route.query.type),
          this.request("/order/express", {
            type: this.type,
            order_id: this.id,
          }).then(function (e) {
            (-500 == e.data.code && (t.showLogin = !0),
              1 == e.data.code ? ((t.details = e.data.data.order), (t.courier = e.data.data.courier || [])) : uni.showToast({title:e.data.msg || '物流信息读取失败',icon:'none'}));
          }).catch(function () { uni.showToast({title:'物流信息读取失败，请重试',icon:'none'}); }));
      },
      methods: {
        copyurl: function () {
          if (!this.details.express_no) { uni.showToast({title:'暂无运单号',icon:'none'}); return; }
          (0, o.default)({
            content: this.details.express_no,
            success: function (e) {
              uni.showToast({ title: e, icon: "none" });
            },
            error: function (e) {
              uni.showToast({ title: e, icon: "none", duration: 3e3 });
            },
          });
        },
      },
    };
  },
  "52e3": function (e, t, i) {
    "use strict";
    i.r(t);
    var n = i("2790"),
      o = i.n(n);
    for (var u in n)
      ["default"].indexOf(u) < 0 &&
        (function (e) {
          i.d(t, e, function () {
            return n[e];
          });
        })(u);
    t["default"] = o.a;
  },
  5759: function (e, t, i) {
    "use strict";
    var n;
    (i.d(t, "b", function () {
      return o;
    }),
      i.d(t, "c", function () {
        return u;
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
          { staticClass: "wuliu" },
          [
            i(
              "v-uni-view",
              { staticClass: "wuliuinfo" },
              [
                i(
                  "v-uni-view",
                  { staticClass: "item_detail" },
                  [
                    i(
                      "v-uni-view",
                      { staticClass: "item_top clearfix" },
                      [
                        i("v-uni-image", { attrs: { src: e.details.thumb } }),
                        i(
                          "v-uni-view",
                          { staticClass: "item_dec" },
                          [
                            i("v-uni-view", { staticClass: "infoname" }, [
                              e._v(e._s(e.details.express_company)),
                            ]),
                            i("v-uni-view", { staticClass: "kefu" }, [
                              e._v("联系电话: " + e._s(e.details.tel || '暂未提供')),
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
              ],
              1,
            ),
            i(
              "v-uni-view",
              { staticClass: "wuliu_con" },
              [
                i(
                  "v-uni-view",
                  { staticClass: "item_bottom" },
                  [
                    i("v-uni-text", [
                      e._v("快递单号：" + e._s(e.details.express_no || '暂未登记')),
                    ]),
                    i(
                      "v-uni-text",
                      {
                        staticClass: "copy",
                        attrs: { "data-clipboard-text": e.details.express_no },
                        on: {
                          click: function (t) {
                            ((arguments[0] = t = e.$handleEvent(t)),
                              e.copyurl.apply(void 0, arguments));
                          },
                        },
                      },
                      [e._v("复制")],
                    ),
                  ],
                  1,
                ),
                i(
                  "v-uni-view",
                  { staticClass: "content" },
                  e._l(e.courier, function (t, n) {
                    return i(
                      "v-uni-view",
                      { key: n, staticClass: "every" },
                      [
                        i("v-uni-view", {
                          style: { background: 0 == n ? "#fa3534" : "" },
                        }),
                        i(
                          "v-uni-view",
                          [
                            i(
                              "v-uni-text",
                              { style: { color: 0 == n ? "#323232" : "" } },
                              [e._v(e._s(t.AcceptTime))],
                            ),
                            i(
                              "v-uni-text",
                              { style: { color: 0 == n ? "#323232" : "" } },
                              [e._v(e._s(t.AcceptStation))],
                            ),
                          ],
                          1,
                        ),
                      ],
                      1,
                    );
                  }),
                  1,
                ),
              ],
              1,
            ),
          ],
          1,
        );
      },
      u = [];
  },
  "743b": function (e, t, i) {
    var n = i("b8b1");
    ("string" === typeof n && (n = [[e.i, n, ""]]),
      n.locals && (e.exports = n.locals));
    var o = i("4f06").default;
    o("241620fc", n, !0, { sourceMap: !1, shadowMode: !1 });
  },
  b8b1: function (e, t, i) {
    var n = i("24fb");
    ((t = n(!1)),
      t.push([
        e.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.wuliu[data-v-e7ff6e86]{background-color:#f8f8f8;padding-top:%?10?%;min-height:100%}.wuliu .wuliuinfo[data-v-e7ff6e86]{margin:%?0?% 3%;background-color:#fff;border-radius:%?20?%}.wuliu .wuliuinfo .item_detail .item_top[data-v-e7ff6e86]{padding:4%}.wuliu .wuliuinfo .item_detail .item_top uni-image[data-v-e7ff6e86]{float:left;width:%?88?%;height:%?88?%;border-radius:50%}.wuliu .wuliuinfo .item_detail .item_top .item_dec[data-v-e7ff6e86]{float:left;margin-left:%?20?%}.wuliu .wuliuinfo .item_detail .item_top .item_dec .infoname[data-v-e7ff6e86]{font-weight:800}.wuliu .wuliuinfo .item_detail .item_top .item_dec .kefu[data-v-e7ff6e86]{color:#999;font-size:%?20?%;margin-top:%?10?%}.wuliu .wuliu_con[data-v-e7ff6e86]{background-color:#fff;border-radius:%?20?%;margin:%?20?% 3%}.wuliu .wuliu_con .content[data-v-e7ff6e86]{border-radius:%?10?%;padding:0 %?20?%}.wuliu .wuliu_con .content .every[data-v-e7ff6e86]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?30?% 0}.wuliu .wuliu_con .content .every uni-view[data-v-e7ff6e86]:nth-of-type(1){width:%?24?%;height:%?24?%;border-radius:50%;background:#999;margin:auto 0}.wuliu .wuliu_con .content .every uni-view[data-v-e7ff6e86]:nth-of-type(2){margin-left:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%}.wuliu .wuliu_con .content .every uni-view:nth-of-type(2) uni-text[data-v-e7ff6e86]{color:#999}.wuliu .wuliu_con .content .every uni-view:nth-of-type(2) uni-text[data-v-e7ff6e86]:nth-of-type(1){font-size:%?26?%}.wuliu .wuliu_con .content .every uni-view:nth-of-type(2) uni-text[data-v-e7ff6e86]:nth-of-type(2){font-size:%?22?%;margin-top:%?10?%}.wuliu .wuliu_con .item_bottom[data-v-e7ff6e86]{padding:%?20?% 4%;background:#fa3534}.wuliu .wuliu_con .item_bottom uni-text[data-v-e7ff6e86]{color:#fff}.wuliu .wuliu_con .item_bottom .copy[data-v-e7ff6e86]{color:#fff;margin-left:%?20?%;border:%?2?% solid #fff;font-size:%?22?%;padding:0 %?10?%;border-radius:%?4?%}',
        "",
      ]),
      (e.exports = t));
  },
  baf2: function (e, t, i) {
    "use strict";
    function n(e) {
      var t = e.content,
        i = e.success,
        n = e.error;
      ((t = "string" === typeof t ? t : t.toString()),
        document.queryCommandSupported("copy") || n("浏览器不支持"));
      var o = document.createElement("textarea");
      ((o.value = t),
        (o.readOnly = "readOnly"),
        document.body.appendChild(o),
        o.select(),
        o.setSelectionRange(0, t.length));
      var u = document.execCommand("copy");
      (u
        ? i("复制成功~")
        : n(
            "复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！",
          ),
        o.remove());
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = n),
      i("6b54"));
  },
  f9cf: function (e, t, i) {
    "use strict";
    i.r(t);
    var n = i("5759"),
      o = i("52e3");
    for (var u in o)
      ["default"].indexOf(u) < 0 &&
        (function (e) {
          i.d(t, e, function () {
            return o[e];
          });
        })(u);
    i("1acf");
    var a,
      r = i("f0c5"),
      f = Object(r["a"])(
        o["default"],
        n["b"],
        n["c"],
        !1,
        null,
        "e7ff6e86",
        null,
        !1,
        n["a"],
        a,
      );
    t["default"] = f.exports;
  },
};
