/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "2a50": function (t, e, n) {
    "use strict";
    n.r(e);
    var a = n("ea34"),
      i = n("c1b2");
    for (var r in i)
      ["default"].indexOf(r) < 0 &&
        (function (t) {
          n.d(e, t, function () {
            return i[t];
          });
        })(r);
    n("61fa");
    var o,
      c = n("f0c5"),
      s = Object(c["a"])(
        i["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "26fb84e1",
        null,
        !1,
        a["a"],
        o,
      );
    e["default"] = s.exports;
  },
  3898: function (t, e, n) {
    var a = n("d2b2");
    ("string" === typeof a && (a = [[t.i, a, ""]]),
      a.locals && (t.exports = a.locals));
    var i = n("4f06").default;
    i("28f50a69", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "61fa": function (t, e, n) {
    "use strict";
    var a = n("3898"),
      i = n.n(a);
    i.a;
  },
  "72f3": function (t, e, n) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      n("a481"));
    var a = {
      register: { title: "注册协议", id: 12 },
      privacy: { title: "隐私政策", id: 7 },
      notice: { title: "用户须知", id: 10 },
      c2c: { title: "C2C个人支付风险", id: 9 },
      entrust: { title: "委托服务协议", id: 11 },
    };
    e.default = {
      data: function () {
        return { type: "", title: "", content: "" };
      },
      onLoad: function (t) {
        this.type = t.type || "";
        var e = a[this.type];
        e
          ? ((this.title = e.title),
            uni.setNavigationBarTitle({ title: e.title }),
            this.loadContent(e.id))
          : (this.title = "协议");
      },
      methods: {
        loadContent: function (t) {
          var e = this;
          this.request("/notice/getNoticeInfo", { id: t }).then(function (t) {
            if (1 == t.data.code) {
              var n = t.data.data || {},
                a = n.content || "";
              ((a = a.replace(
                /\<img/gi,
                '<img style="max-width:100%;height:auto;display:block" ',
              )),
                (e.content = a.replace(
                  /white-space: pre/g,
                  "white-space: break-spaces",
                )));
            } else e.$tip(t.data.msg || "加载失败");
          });
        },
      },
    };
  },
  c1b2: function (t, e, n) {
    "use strict";
    n.r(e);
    var a = n("72f3"),
      i = n.n(a);
    for (var r in a)
      ["default"].indexOf(r) < 0 &&
        (function (t) {
          n.d(e, t, function () {
            return a[t];
          });
        })(r);
    e["default"] = i.a;
  },
  d2b2: function (t, e, n) {
    var a = n("24fb");
    ((e = a(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.agreement-page[data-v-26fb84e1]{min-height:100%;background:#fff}.agreement-page .agreement-content[data-v-26fb84e1]{padding:%?30?% 4%;line-height:1.6;font-size:%?28?%;color:#333;word-break:break-all}',
        "",
      ]),
      (t.exports = e));
  },
  ea34: function (t, e, n) {
    "use strict";
    var a;
    (n.d(e, "b", function () {
      return i;
    }),
      n.d(e, "c", function () {
        return r;
      }),
      n.d(e, "a", function () {
        return a;
      }));
    var i = function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "v-uni-view",
          { staticClass: "agreement-page" },
          [
            n(
              "v-uni-view",
              { staticClass: "agreement-content" },
              [n("v-uni-rich-text", { attrs: { nodes: t.content } })],
              1,
            ),
          ],
          1,
        );
      },
      r = [];
  },
};
