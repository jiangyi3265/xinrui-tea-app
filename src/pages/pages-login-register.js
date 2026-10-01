/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "1b18": function (e, i, t) {
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
          { staticClass: "register-page" },
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
                      e._v("欢迎注册"),
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
                        t(
                          "v-uni-text",
                          { staticClass: "login-label login-label--wide" },
                          [e._v("昵称")],
                        ),
                        t("v-uni-input", {
                          staticClass: "login-input",
                          attrs: {
                            type: "text",
                            placeholder: "请输入昵称",
                            "placeholder-style": "color:#b8bcc8",
                          },
                          model: {
                            value: e.nickname,
                            callback: function (i) {
                              e.nickname = i;
                            },
                            expression: "nickname",
                          },
                        }),
                      ],
                      1,
                    ),
                    t("v-uni-view", { staticClass: "login-line" }),
                    t(
                      "v-uni-view",
                      { staticClass: "login-field" },
                      [
                        t(
                          "v-uni-text",
                          { staticClass: "login-label login-label--wide" },
                          [e._v("手机号")],
                        ),
                        t("v-uni-input", {
                          staticClass: "login-input",
                          attrs: {
                            type: "number",
                            maxlength: "11",
                            placeholder: "请输入手机号",
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
                      { staticClass: "login-field login-field-rowcode" },
                      [
                        t(
                          "v-uni-text",
                          { staticClass: "login-label login-label--wide" },
                          [e._v("验证码")],
                        ),
                        t("v-uni-input", {
                          staticClass: "login-input login-input-code",
                          attrs: {
                            type: "text",
                            placeholder: "请输入短信验证码",
                            "placeholder-style": "color:#b8bcc8",
                          },
                          model: {
                            value: e.code,
                            callback: function (i) {
                              e.code = i;
                            },
                            expression: "code",
                          },
                        }),
                        t(
                          "v-uni-text",
                          {
                            staticClass: "reg-getcode",
                            on: {
                              click: function (i) {
                                ((arguments[0] = i = e.$handleEvent(i)),
                                  e.getCode.apply(void 0, arguments));
                              },
                            },
                          },
                          [e._v(e._s(e.initcode))],
                        ),
                      ],
                      1,
                    ),
                    t("v-uni-view", { staticClass: "login-line" }),
                    t(
                      "v-uni-view",
                      { staticClass: "login-field login-field-pwd" },
                      [
                        t(
                          "v-uni-text",
                          { staticClass: "login-label login-label--wide" },
                          [e._v("登录密码")],
                        ),
                        "checkbox" === (e.pwd1Visible ? "text" : "password")
                          ? t("v-uni-input", {
                              staticClass: "login-input login-input-pwd",
                              attrs: {
                                placeholder: "请输入密码",
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
                          : "radio" === (e.pwd1Visible ? "text" : "password")
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
                                  placeholder: "请输入密码",
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
                                  placeholder: "请输入密码",
                                  "placeholder-style": "color:#b8bcc8",
                                  type: e.pwd1Visible ? "text" : "password",
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
                                  (e.pwd1Visible = !e.pwd1Visible));
                              },
                            },
                          },
                          [
                            t("uni-icons", {
                              attrs: {
                                type: e.pwd1Visible
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
                      { staticClass: "login-field login-field-pwd" },
                      [
                        t(
                          "v-uni-text",
                          { staticClass: "login-label login-label--wide" },
                          [e._v("重复密码")],
                        ),
                        "checkbox" === (e.pwd2Visible ? "text" : "password")
                          ? t("v-uni-input", {
                              staticClass: "login-input login-input-pwd",
                              attrs: {
                                placeholder: "请输入重新输入密码",
                                "placeholder-style": "color:#b8bcc8",
                                type: "checkbox",
                              },
                              model: {
                                value: e.rest_password,
                                callback: function (i) {
                                  e.rest_password = i;
                                },
                                expression: "rest_password",
                              },
                            })
                          : "radio" === (e.pwd2Visible ? "text" : "password")
                            ? t("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: e.rest_password,
                                    expression: "rest_password",
                                  },
                                ],
                                staticClass: "login-input login-input-pwd",
                                attrs: {
                                  placeholder: "请输入重新输入密码",
                                  "placeholder-style": "color:#b8bcc8",
                                  type: "radio",
                                },
                                domProps: {
                                  checked: e._q(e.rest_password, null),
                                },
                                on: {
                                  change: function (i) {
                                    e.rest_password = null;
                                  },
                                },
                              })
                            : t("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: e.rest_password,
                                    expression: "rest_password",
                                  },
                                ],
                                staticClass: "login-input login-input-pwd",
                                attrs: {
                                  placeholder: "请输入重新输入密码",
                                  "placeholder-style": "color:#b8bcc8",
                                  type: e.pwd2Visible ? "text" : "password",
                                },
                                domProps: { value: e.rest_password },
                                on: {
                                  input: function (i) {
                                    i.target.composing ||
                                      (e.rest_password = i.target.value);
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
                                  (e.pwd2Visible = !e.pwd2Visible));
                              },
                            },
                          },
                          [
                            t("uni-icons", {
                              attrs: {
                                type: e.pwd2Visible
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
                      { staticClass: "login-field" },
                      [
                        t(
                          "v-uni-text",
                          { staticClass: "login-label login-label--wide" },
                          [e._v("邀请码")],
                        ),
                        t("v-uni-input", {
                          staticClass: "login-input",
                          attrs: {
                            type: "text",
                            placeholder: "请输入邀请码",
                            "placeholder-style": "color:#b8bcc8",
                          },
                          model: {
                            value: e.invi_code,
                            callback: function (i) {
                              e.invi_code = i;
                            },
                            expression: "invi_code",
                          },
                        }),
                      ],
                      1,
                    ),
                    t("v-uni-text", { staticClass: "reg-hint" }, [
                      e._v("请使用本人手机号完成注册"),
                    ]),
                    t(
                      "v-uni-view",
                      {
                        staticClass: "login-submit",
                        on: {
                          click: function (i) {
                            ((arguments[0] = i = e.$handleEvent(i)),
                              e.zcdl.apply(void 0, arguments));
                          },
                        },
                      },
                      [e._v("注册并登录")],
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
  2816: function (e, i, t) {
    "use strict";
    t.r(i);
    var n = t("1b18"),
      a = t("8ade");
    for (var o in a)
      ["default"].indexOf(o) < 0 &&
        (function (e) {
          t.d(i, e, function () {
            return a[e];
          });
        })(o);
    t("b4eb");
    var s,
      l = t("f0c5"),
      c = Object(l["a"])(
        a["default"],
        n["b"],
        n["c"],
        !1,
        null,
        "09c44984",
        null,
        !1,
        n["a"],
        s,
      );
    i["default"] = (typeof window !== "undefined" && window.__H5_SERVER_MODE__ === "ruoyi" && window.__teaWorkflowPage) ? window.__teaWorkflowPage("register") : c.exports;
  },
  "4ae3": function (e, i, t) {
    var n = t("b8a2");
    ("string" === typeof n && (n = [[e.i, n, ""]]),
      n.locals && (e.exports = n.locals));
    var a = t("4f06").default;
    a("48e5b22b", n, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "8ade": function (e, i, t) {
    "use strict";
    t.r(i);
    var n = t("fd64"),
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
  b4eb: function (e, i, t) {
    "use strict";
    var n = t("4ae3"),
      a = t.n(n);
    a.a;
  },
  b8a2: function (e, i, t) {
    var n = t("24fb"),
      a = t("1de5"),
      o = t("c89c");
    i = n(!1);
    var s = a(o);
    (i.push([
      e.i,
      '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.register-page[data-v-09c44984]{min-height:100vh;background-color:#f2f4fd;background-image:url(' +
        s +
        ");background-repeat:no-repeat;background-size:100%;position:relative;box-sizing:border-box}.login-inner[data-v-09c44984]{position:relative;z-index:1;padding:0 %?48?% %?48?%;box-sizing:border-box}.login-close[data-v-09c44984]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?60?% 0}.login-head[data-v-09c44984]{margin-bottom:%?56?%}.login-head-line1[data-v-09c44984]{display:block;font-size:%?52?%;font-weight:700;color:#111;line-height:1.25}.login-head-line2[data-v-09c44984]{display:block;margin-top:%?12?%;font-size:%?52?%;font-weight:700;color:#111;line-height:1.25}.login-card[data-v-09c44984]{background:#fff;border-radius:%?28?%;padding:%?48?% %?40?% %?40?%;box-shadow:0 %?12?% %?48?% rgba(80,100,180,.08)}.login-field[data-v-09c44984]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:%?96?%;margin-bottom:0}.login-field-rowcode[data-v-09c44984]{-webkit-flex-wrap:nowrap;flex-wrap:nowrap}.login-field-pwd[data-v-09c44984]{position:relative}.login-label[data-v-09c44984]{-webkit-flex-shrink:0;flex-shrink:0;width:%?100?%;font-size:%?30?%;color:#333;font-weight:500}.login-label--wide[data-v-09c44984]{width:%?148?%}.login-input[data-v-09c44984]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?28?%;color:#333;height:%?96?%;line-height:%?96?%;border:none;outline:none;background:transparent;box-shadow:none;min-width:0}.login-input[data-v-09c44984]:focus{border:none!important;outline:none!important;box-shadow:none!important;-webkit-appearance:none;appearance:none}.login-input-code[data-v-09c44984]{-webkit-box-flex:1;-webkit-flex:1;flex:1;padding-right:%?16?%}.login-input-pwd[data-v-09c44984]{padding-right:%?72?%}.reg-getcode[data-v-09c44984]{-webkit-flex-shrink:0;flex-shrink:0;padding:0 %?20?%;height:%?56?%;line-height:%?52?%;text-align:center;font-size:%?24?%;color:#3b7cff;border:%?2?% solid #3b7cff;border-radius:%?999?%;box-sizing:border-box}.login-eye[data-v-09c44984]{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);padding:%?12?%}.login-line[data-v-09c44984]{height:1px;background:#eef0f5;width:100%;margin:0;-webkit-flex-shrink:0;flex-shrink:0;-webkit-transform:scaleY(1);transform:scaleY(1)}.reg-hint[data-v-09c44984]{display:block;font-size:%?24?%;color:#8a8f9c;margin-top:%?24?%;margin-bottom:%?8?%;line-height:1.5}.login-submit[data-v-09c44984]{margin-top:%?40?%;height:%?96?%;line-height:%?96?%;text-align:center;font-size:%?32?%;font-weight:600;color:#fff;border-radius:%?48?%;background:-webkit-linear-gradient(left,#5ee7df,#4facfe 50%,#6eb6ff);background:linear-gradient(90deg,#5ee7df,#4facfe 50%,#6eb6ff);box-shadow:0 %?8?% %?24?% rgba(79,172,254,.35)}.login-agree[data-v-09c44984]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;margin-top:%?80?%;padding:0 %?8?%}.login-check[data-v-09c44984]{-webkit-flex-shrink:0;flex-shrink:0;width:%?36?%;height:%?36?%;border-radius:50%;border:%?2?% solid #c5c8d4;margin-right:%?16?%;margin-top:%?4?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;box-sizing:border-box}.login-check--on[data-v-09c44984]{background:#3b7cff;border-color:#3b7cff}.login-check-mark[data-v-09c44984]{color:#fff;font-size:%?22?%;font-weight:700;line-height:1}.login-agree-text[data-v-09c44984]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?24?%}.login-agree-text uni-text[data-v-09c44984]{font-size:%?28?%}.login-agree-gray[data-v-09c44984]{color:#8a8f9c}.login-agree-blue[data-v-09c44984]{color:#3b7cff}",
      "",
    ]),
      (e.exports = i));
  },
  c89c: function (e, i, t) {
    e.exports = t.p + "static/img/bg.7867479a.7867479a.png";
  },
  fd64: function (e, i, t) {
    "use strict";
    var n = t("4ea4");
    (Object.defineProperty(i, "__esModule", { value: !0 }),
      (i.default = void 0));
    var a = n(t("2ba4"));
    i.default = {
      components: { uniIcons: a.default },
      data: function () {
        return {
          nickname: "",
          phone: "",
          password: "",
          rest_password: "",
          invi_code: "",
          code: "",
          chooseflag: !1,
          toExamine: "",
          register_verify: "0",
          pwd1Visible: !1,
          pwd2Visible: !1,
          second: 60,
          initcode: "获取验证码",
        };
      },
      onShow: function () {
        var e = this;
        this.request("/index/getStoreInfo").then(function (i) {
          1 == i.data.code &&
            ((e.toExamine = i.data.data.toExamine),
            (e.register_verify = i.data.data.register_verify || "0"));
        });
      },
      onLoad: function (e) {
        e.member_id && this.getInviCode(e.member_id);
      },
      methods: {
        getInviCode: function (e) {
          var i = this;
          this.request("/member/getInvitationCode", { member_id: e }).then(
            function (e) {
              1 == e.data.code
                ? (i.invi_code = e.data.data)
                : i.$tip(e.data.msg);
            },
          );
        },
        goBack: function () {
          uni.navigateBack({
            delta: 1,
            fail: function () {
              uni.redirectTo({ url: "/pages/index/index" });
            },
          });
        },
        choosedui: function () {
          this.chooseflag = !this.chooseflag;
        },
        getCode: function () {
          var e = this,
            i = this;
          "获取验证码" == this.initcode &&
            (this.phone
              ? /^1[3456789]\d{9}$/.test(this.phone)
                ? this.request("/v1/sms", {
                    phone: this.phone,
                    sendType: "register",
                  }).then(function (t) {
                    if (1 == t.data.code) {
                      e.$tip(t.data.msg || "发送成功");
                      var n = setInterval(function () {
                        (--i.second, (i.initcode = i.second + "s"));
                      }, 1e3);
                      setTimeout(function () {
                        (clearInterval(n),
                          (i.initcode = "获取验证码"),
                          (i.second = 60));
                      }, 6e4);
                    } else e.$tip(t.data.msg);
                  })
                : this.$tip("请输入正确的手机号")
              : this.$tip("请先输入手机号"));
        },
        zcdl: function () {
          var e = this;
          if (this.chooseflag)
            if ("1" != this.register_verify || this.code) {
              var i = {
                mobile: this.phone,
                nickname: this.nickname,
                password: this.password,
                rest_password: this.rest_password,
                invi_code: this.invi_code,
                code: this.code || "",
              };
              this.request("/member/registerAnAccount", i).then(function (i) {
                1 == i.data.code
                  ? (e.$tip(i.data.msg),
                    setTimeout(function () {
                      (uni.setStorageSync("TOKEN", i.data.data.token),
                        uni.switchTab({ url: "/pages/index/index" }));
                    }, 500))
                  : e.$tip(i.data.msg);
              });
            } else this.$tip("请输入短信验证码");
          else this.$tip("请先同意协议~");
        },
        toPage: function (e) {
          uni.navigateTo({ url: e });
        },
      },
    };
  },
};
