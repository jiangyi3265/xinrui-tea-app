/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "1de5": function (e, i, t) {
    "use strict";
    e.exports = function (e, i) {
      return (
        i || (i = {}),
        (e = e && e.__esModule ? e.default : e),
        "string" !== typeof e
          ? e
          : (/^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
            i.hash && (e += i.hash),
            /["'() \t\n]/.test(e) || i.needQuotes
              ? '"'.concat(e.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"')
              : e)
      );
    };
  },
  3285: function (e, i, t) {
    "use strict";
    t.r(i);
    var n = t("6263"),
      a = t.n(n);
    for (var o in n)
      ["default"].indexOf(o) < 0 &&
        (function (e) {
          t.d(i, e, function () {
            return n[e];
          });
        })(o);
    i["default"] = a.a;
  },
  6263: function (e, i, t) {
    "use strict";
    var n = t("4ea4");
    (Object.defineProperty(i, "__esModule", { value: !0 }),
      (i.default = void 0));
    var a = n(t("2ba4"));
    i.default = {
      data: function () {
        return {
          name: "",
          type: 0,
          phone: "",
          password: "",
          initcode: "获取验证码",
          second: 60,
          chooseflag: !0,
          code: "",
          logo_url: "",
          toExamine: "",
          pwdVisible: !1,
        };
      },
      onShow: function () {
        var e = this;
        this.request("/index/getStoreInfo").then(function (i) {
          1 == i.data.code && (e.toExamine = i.data.data.toExamine);
        });
      },
      onLoad: function () {
        var e = this;
        this.request("/index/getShareInfo").then(function (i) {
          1 == i.data.code &&
            ((e.logo_url = i.data.data.images), (e.name = i.data.data.name));
        });
      },
      methods: {
        goBack: function () {
          uni.navigateBack({
            delta: 1,
            fail: function () {
              uni.reLaunch({ url: "/pages/index/index" });
            },
          });
        },
        changeType: function (e) {
          this.type = e;
        },
        choosedui: function () {
          this.chooseflag = !this.chooseflag;
        },
        login: function () {
          var e = this;
          this.chooseflag
            ? this.request("/member/accountLogin", {
                phone: this.phone,
                password: this.password,
              }).then(function (i) {
                1 == i.data.code
                  ? (e.$tip(i.data.msg),
                    uni.setStorageSync("TOKEN", i.data.data.token),
                    uni.reLaunch({ url: "/pages/index/index" }))
                  : e.$tip(i.data.msg);
              })
            : this.$tip("请先同意《用户协议》");
        },
        toPage: function (e) {
          uni.navigateTo({ url: e });
        },
      },
      components: { uniIcons: a.default },
    };
  },
  "857b": function (e, i, t) {
    var n = t("aec0");
    ("string" === typeof n && (n = [[e.i, n, ""]]),
      n.locals && (e.exports = n.locals));
    var a = t("4f06").default;
    a("7f99a836", n, !0, { sourceMap: !1, shadowMode: !1 });
  },
  a5ce: function (e, i, t) {
    "use strict";
    (t.d(i, "b", function () {
      return a;
    }),
      t.d(i, "c", function () {
        return o;
      }),
      t.d(i, "a", function () {
        return n;
      }));
    var n = { uniIcons: t("2ba4").default },
      a = function () {
        var e = this,
          i = e.$createElement,
          t = e._self._c || i;
        return t(
          "v-uni-view",
          { staticClass: "login" },
          [
            t("v-uni-view", { staticClass: "sheight" }),
            t(
              "v-uni-view",
              { staticClass: "login-inner" },
              [
                t(
                  "v-uni-view",
                  {
                    staticClass: "login-close",
                    on: {
                      click: function (i) {
                        ((arguments[0] = i = e.$handleEvent(i)),
                          e.goBack.apply(void 0, arguments));
                      },
                    },
                  },
                  [
                    t("uni-icons", {
                      attrs: { type: "close", size: "26", color: "#c5c8d4" },
                    }),
                  ],
                  1,
                ),
                t(
                  "v-uni-view",
                  { staticClass: "login-head" },
                  [
                    t("v-uni-text", { staticClass: "login-head-line1" }, [
                      e._v("您好!"),
                    ]),
                    t("v-uni-text", { staticClass: "login-head-line2" }, [
                      e._v("欢迎登录" + e._s(e.name)),
                    ]),
                  ],
                  1,
                ),
                t(
                  "v-uni-view",
                  { staticClass: "login-card" },
                  [
                    t(
                      "v-uni-view",
                      { staticClass: "login-field" },
                      [
                        t("v-uni-text", { staticClass: "login-label" }, [
                          e._v("账号"),
                        ]),
                        t("v-uni-input", {
                          staticClass: "login-input",
                          attrs: {
                            type: "text",
                            placeholder: "请输入您的账号",
                            "placeholder-style": "color:#b8bcc8",
                          },
                          model: {
                            value: e.phone,
                            callback: function (i) {
                              e.phone = i;
                            },
                            expression: "phone",
                          },
                        }),
                      ],
                      1,
                    ),
                    t("v-uni-view", { staticClass: "login-line" }),
                    t(
                      "v-uni-view",
                      { staticClass: "login-field login-field-pwd" },
                      [
                        t("v-uni-text", { staticClass: "login-label" }, [
                          e._v("密码"),
                        ]),
                        "checkbox" === (e.pwdVisible ? "text" : "password")
                          ? t("v-uni-input", {
                              staticClass: "login-input login-input-pwd",
                              attrs: {
                                placeholder: "请输入您的密码",
                                "placeholder-style": "color:#b8bcc8",
                                type: "checkbox",
                              },
                              model: {
                                value: e.password,
                                callback: function (i) {
                                  e.password = i;
                                },
                                expression: "password",
                              },
                            })
                          : "radio" === (e.pwdVisible ? "text" : "password")
                            ? t("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: e.password,
                                    expression: "password",
                                  },
                                ],
                                staticClass: "login-input login-input-pwd",
                                attrs: {
                                  placeholder: "请输入您的密码",
                                  "placeholder-style": "color:#b8bcc8",
                                  type: "radio",
                                },
                                domProps: { checked: e._q(e.password, null) },
                                on: {
                                  change: function (i) {
                                    e.password = null;
                                  },
                                },
                              })
                            : t("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: e.password,
                                    expression: "password",
                                  },
                                ],
                                staticClass: "login-input login-input-pwd",
                                attrs: {
                                  placeholder: "请输入您的密码",
                                  "placeholder-style": "color:#b8bcc8",
                                  type: e.pwdVisible ? "text" : "password",
                                },
                                domProps: { value: e.password },
                                on: {
                                  input: function (i) {
                                    i.target.composing ||
                                      (e.password = i.target.value);
                                  },
                                },
                              }),
                        t(
                          "v-uni-view",
                          {
                            staticClass: "login-eye",
                            on: {
                              click: function (i) {
                                ((arguments[0] = i = e.$handleEvent(i)),
                                  (e.pwdVisible = !e.pwdVisible));
                              },
                            },
                          },
                          [
                            t("uni-icons", {
                              attrs: {
                                type: e.pwdVisible
                                  ? "eye-filled"
                                  : "eye-slash-filled",
                                size: "22",
                                color: "#c5c8d4",
                              },
                            }),
                          ],
                          1,
                        ),
                      ],
                      1,
                    ),
                    t("v-uni-view", { staticClass: "login-line" }),
                    t(
                      "v-uni-view",
                      {
                        staticClass: "login-submit",
                        on: {
                          click: function (i) {
                            ((arguments[0] = i = e.$handleEvent(i)),
                              e.login.apply(void 0, arguments));
                          },
                        },
                      },
                      [e._v("登录")],
                    ),
                    t(
                      "v-uni-view",
                      { staticClass: "login-extra" },
                      [
                        e._e(),
                        t(
                          "v-uni-text",
                          {
                            staticClass: "login-link",
                            on: {
                              click: function (i) {
                                ((arguments[0] = i = e.$handleEvent(i)),
                                  e.$tip("忘记密码请联系管理员重置"));
                              },
                            },
                          },
                          [e._v("忘记密码")],
                        ),
                      ],
                      1,
                    ),
                  ],
                  1,
                ),
                t(
                  "v-uni-view",
                  { staticClass: "login-agree" },
                  [
                    t(
                      "v-uni-view",
                      {
                        staticClass: "login-check",
                        class: { "login-check--on": e.chooseflag },
                        on: {
                          click: function (i) {
                            ((arguments[0] = i = e.$handleEvent(i)),
                              e.choosedui.apply(void 0, arguments));
                          },
                        },
                      },
                      [
                        e.chooseflag
                          ? t(
                              "v-uni-text",
                              { staticClass: "login-check-mark" },
                              [e._v("✓")],
                            )
                          : e._e(),
                      ],
                      1,
                    ),
                    t(
                      "v-uni-view",
                      { staticClass: "login-agree-text" },
                      [
                        t("v-uni-text", { staticClass: "login-agree-gray" }, [
                          e._v("我已同意"),
                        ]),
                        t(
                          "v-uni-text",
                          {
                            staticClass: "login-agree-blue",
                            on: {
                              click: function (i) {
                                ((arguments[0] = i = e.$handleEvent(i)),
                                  e.toPage("userserver?ll=1"));
                              },
                            },
                          },
                          [e._v("《用户协议》")],
                        ),
                        t("v-uni-text", { staticClass: "login-agree-gray" }, [
                          e._v("和"),
                        ]),
                        10 == e.toExamine
                          ? [
                              t(
                                "v-uni-text",
                                {
                                  staticClass: "login-agree-blue",
                                  on: {
                                    click: function (i) {
                                      ((arguments[0] = i = e.$handleEvent(i)),
                                        e.toPage("userserver?ll=2"));
                                    },
                                  },
                                },
                                [e._v("《购买及委托代卖协议》")],
                              ),
                              t(
                                "v-uni-text",
                                { staticClass: "login-agree-gray" },
                                [e._v("后登陆平台")],
                              ),
                            ]
                          : e._e(),
                      ],
                      2,
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
      o = [];
  },
  a86a: function (e, i, t) {
    "use strict";
    t.r(i);
    var n = t("a5ce"),
      a = t("3285");
    for (var o in a)
      ["default"].indexOf(o) < 0 &&
        (function (e) {
          t.d(i, e, function () {
            return a[e];
          });
        })(o);
    t("fbaa");
    var l,
      s = t("f0c5"),
      c = Object(s["a"])(
        a["default"],
        n["b"],
        n["c"],
        !1,
        null,
        "12367dc9",
        null,
        !1,
        n["a"],
        l,
      );
    i["default"] = c.exports;
  },
  aec0: function (e, i, t) {
    var n = t("24fb"),
      a = t("1de5"),
      o = t("c89c");
    i = n(!1);
    var l = a(o);
    (i.push([
      e.i,
      '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.login[data-v-12367dc9]{min-height:100vh;background-color:#f2f4fd;background-image:url(' +
        l +
        ");background-repeat:no-repeat;background-size:100%;position:relative;box-sizing:border-box}.login-inner[data-v-12367dc9]{position:relative;z-index:1;padding:0 %?48?% %?48?%;box-sizing:border-box}.login-close[data-v-12367dc9]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?60?% 0}.login-close-x[data-v-12367dc9]{font-size:%?52?%;color:#1a1a1a;line-height:1;font-weight:300}.login-head[data-v-12367dc9]{margin-bottom:%?56?%}.login-head-line1[data-v-12367dc9]{display:block;font-size:%?52?%;font-weight:700;color:#111;line-height:1.25}.login-head-line2[data-v-12367dc9]{display:block;margin-top:%?12?%;font-size:%?52?%;font-weight:700;color:#111;line-height:1.25}.login-card[data-v-12367dc9]{background:#fff;border-radius:%?28?%;padding:%?48?% %?40?% %?40?%;box-shadow:0 %?12?% %?48?% rgba(80,100,180,.08)}.login-field[data-v-12367dc9]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:%?96?%;margin-bottom:%?20?%}.login-field-pwd[data-v-12367dc9]{position:relative}.login-label[data-v-12367dc9]{-webkit-flex-shrink:0;flex-shrink:0;width:%?100?%;font-size:%?30?%;color:#333;font-weight:500}.login-input[data-v-12367dc9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?28?%;color:#333;height:%?96?%;line-height:%?96?%;border:none;outline:none;background:transparent;box-shadow:none}.login-input[data-v-12367dc9]:focus{border:none!important;outline:none!important;box-shadow:none!important;-webkit-appearance:none;appearance:none}.login-input-pwd[data-v-12367dc9]{padding-right:%?72?%}.login-eye[data-v-12367dc9]{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);padding:%?12?%}.login-line[data-v-12367dc9]{height:%?1?%;background:#eef0f5;margin:0}.login-submit[data-v-12367dc9]{margin-top:%?56?%;height:%?96?%;line-height:%?96?%;text-align:center;font-size:%?32?%;font-weight:600;color:#fff;border-radius:%?48?%;background:-webkit-linear-gradient(left,#5ee7df,#4facfe 50%,#6eb6ff);background:linear-gradient(90deg,#5ee7df,#4facfe 50%,#6eb6ff);box-shadow:0 %?8?% %?24?% rgba(79,172,254,.35)}.login-extra[data-v-12367dc9]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?36?%;padding:0 %?4?%}.login-link[data-v-12367dc9]{font-size:%?28?%;color:#3b7cff}.login-agree[data-v-12367dc9]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;margin-top:%?180?%;padding:0 %?8?%}.login-check[data-v-12367dc9]{-webkit-flex-shrink:0;flex-shrink:0;width:%?32?%;height:%?32?%;border-radius:50%;border:%?2?% solid #c5c8d4;margin-right:%?16?%;margin-top:%?4?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;box-sizing:border-box}.login-check--on[data-v-12367dc9]{background:#3b7cff;border-color:#3b7cff}.login-check-mark[data-v-12367dc9]{color:#fff;font-size:%?22?%;font-weight:700;line-height:1}.login-agree-text[data-v-12367dc9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;line-height:1.65}.login-agree-text uni-text[data-v-12367dc9]{font-size:%?28?%}.login-agree-gray[data-v-12367dc9]{color:#8a8f9c}.login-agree-blue[data-v-12367dc9]{color:#3b7cff}",
      "",
    ]),
      (e.exports = i));
  },
  c89c: function (e, i, t) {
    e.exports = t.p + "static/img/bg.7867479a.7867479a.png";
  },
  fbaa: function (e, i, t) {
    "use strict";
    var n = t("857b"),
      a = t.n(n);
    a.a;
  },
};
