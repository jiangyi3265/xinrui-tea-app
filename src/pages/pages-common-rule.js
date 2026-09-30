/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "0385": function (n, t, e) {
    "use strict";
    var a = e("3f4a"),
      r = e.n(a);
    r.a;
  },
  "17a0": function (n, t, e) {
    "use strict";
    var a;
    (e.d(t, "b", function () {
      return r;
    }),
      e.d(t, "c", function () {
        return i;
      }),
      e.d(t, "a", function () {
        return a;
      }));
    var r = function () {
        var n = this,
          t = n.$createElement,
          e = n._self._c || t;
        return e(
          "v-uni-view",
          { staticClass: "rule_con" },
          [
            2 != n.type ? e("Hearder", { attrs: { name: "协议" } }) : n._e(),
            2 == n.type
              ? e("Hearder", { attrs: { name: "寄卖规则" } })
              : n._e(),
            e(
              "v-uni-view",
              { staticClass: "sml_rule" },
              [e("v-uni-rich-text", { attrs: { nodes: n.xieyi } })],
              1,
            ),
          ],
          1,
        );
      },
      i = [];
  },
  "3f4a": function (n, t, e) {
    var a = e("6130");
    ("string" === typeof a && (a = [[n.i, a, ""]]),
      a.locals && (n.exports = a.locals));
    var r = e("4f06").default;
    r("50041861", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  5456: function (n, t, e) {
    "use strict";
    e.r(t);
    var a = e("bc5d"),
      r = e.n(a);
    for (var i in a)
      ["default"].indexOf(i) < 0 &&
        (function (n) {
          e.d(t, n, function () {
            return a[n];
          });
        })(i);
    t["default"] = r.a;
  },
  6130: function (n, t, e) {
    var a = e("24fb");
    ((t = a(!1)),
      t.push([
        n.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.rule_con .sml_rule[data-v-b67f1852]{padding:4%}',
        "",
      ]),
      (n.exports = t));
  },
  b857: function (n, t, e) {
    "use strict";
    e.r(t);
    var a = e("17a0"),
      r = e("5456");
    for (var i in r)
      ["default"].indexOf(i) < 0 &&
        (function (n) {
          e.d(t, n, function () {
            return r[n];
          });
        })(i);
    e("0385");
    var u,
      s = e("f0c5"),
      o = Object(s["a"])(
        r["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "b67f1852",
        null,
        !1,
        a["a"],
        u,
      );
    t["default"] = o.exports;
  },
  bc5d: function (n, t, e) {
    "use strict";
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = void 0));
    t.default = {
      data: function () {
        return { xieyi: "", type: 0 };
      },
      onLoad: function (n) {
        var t = this;
        (n.type && (this.type = n.type || this.$route.query.type),
          this.request("/index/getGroupAfterSalesAgreement").then(function (n) {
            1 == n.data.code &&
              (0 == t.type
                ? (t.xieyi = n.data.data.shop_agreement)
                : 1 == t.type
                  ? (t.xieyi = n.data.data.transaction_agreement)
                  : 2 == t.type && (t.xieyi = n.data.data.consignment_rule));
          }));
      },
    };
  },
};
