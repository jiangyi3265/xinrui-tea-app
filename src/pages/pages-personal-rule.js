/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "1dbd": function (n, t, e) {
    "use strict";
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = void 0));
    t.default = {
      data: function () {
        return { id: "", content: "" };
      },
      onLoad: function () {
        var n = this;
        this.request("/finance/getSystemInfo").then(function (t) {
          1 == t.data.code && (n.content = t.data.data.consignment_rule);
        });
      },
    };
  },
  "28f6": function (n, t, e) {
    "use strict";
    e.r(t);
    var a = e("1dbd"),
      i = e.n(a);
    for (var s in a)
      ["default"].indexOf(s) < 0 &&
        (function (n) {
          e.d(t, n, function () {
            return a[n];
          });
        })(s);
    t["default"] = i.a;
  },
  4584: function (n, t, e) {
    n.exports = e.p + "static/img/noimg.89728664.png";
  },
  5801: function (n, t, e) {
    var a = e("e9dd");
    ("string" === typeof a && (a = [[n.i, a, ""]]),
      a.locals && (n.exports = a.locals));
    var i = e("4f06").default;
    i("b190ceee", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "66ba": function (n, t, e) {
    "use strict";
    var a;
    (e.d(t, "b", function () {
      return i;
    }),
      e.d(t, "c", function () {
        return s;
      }),
      e.d(t, "a", function () {
        return a;
      }));
    var i = function () {
        var n = this,
          t = n.$createElement,
          a = n._self._c || t;
        return a(
          "v-uni-view",
          { staticClass: "newsdetail" },
          [
            a(
              "v-uni-view",
              { staticClass: "con_txt" },
              [a("v-uni-view", [n._v(n._s(n.content))])],
              1,
            ),
            0 == n.content
              ? a(
                  "v-uni-view",
                  { staticClass: "nidata" },
                  [a("v-uni-image", { attrs: { src: e("4584") } })],
                  1,
                )
              : n._e(),
          ],
          1,
        );
      },
      s = [];
  },
  b939: function (n, t, e) {
    "use strict";
    var a = e("5801"),
      i = e.n(a);
    i.a;
  },
  e9dd: function (n, t, e) {
    var a = e("24fb");
    ((t = a(!1)),
      t.push([
        n.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.newsdetail .title[data-v-2066e9b4]{font-weight:800;text-align:center;padding:%?30?% 0}.newsdetail .con_txt[data-v-2066e9b4]{margin:%?30?% 3%}.newsdetail .con_txt uni-view[data-v-2066e9b4]{white-space:pre-wrap}',
        "",
      ]),
      (n.exports = t));
  },
  ec45: function (n, t, e) {
    "use strict";
    e.r(t);
    var a = e("66ba"),
      i = e("28f6");
    for (var s in i)
      ["default"].indexOf(s) < 0 &&
        (function (n) {
          e.d(t, n, function () {
            return i[n];
          });
        })(s);
    e("b939");
    var c,
      r = e("f0c5"),
      u = Object(r["a"])(
        i["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "2066e9b4",
        null,
        !1,
        a["a"],
        c,
      );
    t["default"] = u.exports;
  },
};
