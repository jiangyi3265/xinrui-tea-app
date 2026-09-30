/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "316e": function (e, t, n) {
    "use strict";
    var a;
    (n.d(t, "b", function () {
      return i;
    }),
      n.d(t, "c", function () {
        return r;
      }),
      n.d(t, "a", function () {
        return a;
      }));
    var i = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t;
        return n(
          "v-uni-view",
          { staticClass: "userserver" },
          [
            n(
              "v-uni-view",
              { staticClass: "content" },
              [
                n(
                  "v-uni-view",
                  { staticClass: "tiaoyue" },
                  [
                    n(
                      "v-uni-view",
                      [n("v-uni-rich-text", { attrs: { nodes: e.agreement } })],
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
        );
      },
      r = [];
  },
  "6c88": function (e, t, n) {
    var a = n("24fb");
    ((t = a(!1)),
      t.push([
        e.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.userserver .content[data-v-f5e4cbb2]{margin:%?30?% 4% 0}.userserver .tiaoyue uni-view[data-v-f5e4cbb2]{line-height:%?35?%}.userserver .regisBtn[data-v-f5e4cbb2]{margin:%?30?% 6% 0;height:%?88?%;line-height:%?88?%;color:#fff;text-align:center;background:#fa3534;border-radius:%?10?%}',
        "",
      ]),
      (e.exports = t));
  },
  "71bb": function (e, t, n) {
    var a = n("6c88");
    ("string" === typeof a && (a = [[e.i, a, ""]]),
      a.locals && (e.exports = a.locals));
    var i = n("4f06").default;
    i("33fb3b62", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "71fa": function (e, t, n) {
    "use strict";
    n.r(t);
    var a = n("e3f6"),
      i = n.n(a);
    for (var r in a)
      ["default"].indexOf(r) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return a[e];
          });
        })(r);
    t["default"] = i.a;
  },
  e3f6: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = void 0));
    t.default = {
      data: function () {
        return { ll: "", agreement: "", type: 0 };
      },
      onLoad: function (e) {
        var t = this;
        ((this.ll = e.ll || this.$route.query.ll),
          e.type && (this.type = e.type || this.$route.query.type),
          this.request("/index/getInvitationNotice").then(function (e) {
            1 == e.data.code
              ? 1 == t.ll
                ? ((t.agreement = e.data.data.prompt_values),
                  uni.setNavigationBarTitle({ title: "用户协议" }))
                : 2 == t.ll &&
                  ((t.agreement = e.data.data.replace_agreement),
                  uni.setNavigationBarTitle({ title: "购买及委托代卖协议" }))
              : t.$tip(e.data.res);
          }));
      },
      methods: {
        toPage: function () {
          uni.navigateTo({ url: "login" });
        },
      },
    };
  },
  ea47: function (e, t, n) {
    "use strict";
    var a = n("71bb"),
      i = n.n(a);
    i.a;
  },
  f892: function (e, t, n) {
    "use strict";
    n.r(t);
    var a = n("316e"),
      i = n("71fa");
    for (var r in i)
      ["default"].indexOf(r) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return i[e];
          });
        })(r);
    n("ea47");
    var u,
      s = n("f0c5"),
      o = Object(s["a"])(
        i["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "f5e4cbb2",
        null,
        !1,
        a["a"],
        u,
      );
    t["default"] = o.exports;
  },
};
