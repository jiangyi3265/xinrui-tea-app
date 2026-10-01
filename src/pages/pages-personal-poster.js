/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "3a77": function (e, t, i) {
    "use strict";
    i.r(t);
    var a = i("c926"),
      n = i("b2f4");
    for (var o in n)
      ["default"].indexOf(o) < 0 &&
        (function (e) {
          i.d(t, e, function () {
            return n[e];
          });
        })(o);
    i("5e93");
    var r,
      s = i("f0c5"),
      c = Object(s["a"])(
        n["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "95c4ff7e",
        null,
        !1,
        a["a"],
        r,
      );
    t["default"] = (typeof window !== "undefined" && window.__H5_SERVER_MODE__ === "ruoyi" && window.__teaWorkflowPage) ? window.__teaWorkflowPage("hub") : c.exports;
  },
  "5bed": function (e, t, i) {
    var a = i("c5bd");
    ("string" === typeof a && (a = [[e.i, a, ""]]),
      a.locals && (e.exports = a.locals));
    var n = i("4f06").default;
    n("a02c8800", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "5e93": function (e, t, i) {
    "use strict";
    var a = i("5bed"),
      n = i.n(a);
    n.a;
  },
  b2f4: function (e, t, i) {
    "use strict";
    i.r(t);
    var a = i("ea20"),
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
  baf2: function (e, t, i) {
    "use strict";
    function a(e) {
      var t = e.content,
        i = e.success,
        a = e.error;
      ((t = "string" === typeof t ? t : t.toString()),
        document.queryCommandSupported("copy") || a("浏览器不支持"));
      var n = document.createElement("textarea");
      ((n.value = t),
        (n.readOnly = "readOnly"),
        document.body.appendChild(n),
        n.select(),
        n.setSelectionRange(0, t.length));
      var o = document.execCommand("copy");
      (o
        ? i("复制成功~")
        : a(
            "复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！",
          ),
        n.remove());
    }
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = a),
      i("6b54"));
  },
  c5bd: function (e, t, i) {
    var a = i("24fb");
    ((t = a(!1)),
      t.push([
        e.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.poster[data-v-95c4ff7e]{min-height:100vh;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.poster-nav[data-v-95c4ff7e]{background:#fff;border-bottom:%?1?% solid #eee;-webkit-flex-shrink:0;flex-shrink:0}.poster-nav-inner[data-v-95c4ff7e]{height:%?88?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 %?8?% 0 %?12?%}.poster-nav-back[data-v-95c4ff7e]{width:%?72?%;height:%?88?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.poster-nav-title[data-v-95c4ff7e]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;font-size:%?34?%;font-weight:700;color:#111}.poster-nav-placeholder[data-v-95c4ff7e]{width:%?72?%;height:%?1?%}.poster-body[data-v-95c4ff7e]{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden}.poster_box[data-v-95c4ff7e]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.hiddenshow[data-v-95c4ff7e]{position:absolute;top:-10000px}.invite-poster-card[data-v-95c4ff7e]{position:relative;width:100%;min-height:calc(100vh - %?88?% - %?116?%);background:-webkit-linear-gradient(305deg,#c90000,#fb2500);background:linear-gradient(145deg,#c90000,#fb2500);padding:%?238?% %?58?% %?18?%;box-sizing:border-box;overflow:hidden}.poster-corner[data-v-95c4ff7e]{position:absolute;right:%?-78?%;top:%?-78?%;width:%?210?%;height:%?210?%;background:rgba(107,0,0,.35);-webkit-transform:rotate(45deg);transform:rotate(45deg)}.poster-dot-grid[data-v-95c4ff7e]{position:absolute;width:%?180?%;height:%?180?%;background-image:-webkit-radial-gradient(rgba(255,165,0,.5) %?7?%,transparent %?8?%);background-image:radial-gradient(rgba(255,165,0,.5) %?7?%,transparent %?8?%);background-size:%?34?% %?34?%}.dot-grid-left[data-v-95c4ff7e]{left:%?18?%;top:%?74?%}.dot-grid-right[data-v-95c4ff7e]{right:%?-6?%;top:%?330?%}.welcome-row[data-v-95c4ff7e]{position:relative;z-index:2;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;color:#fff;font-size:%?28?%;letter-spacing:%?2?%}.brand-name[data-v-95c4ff7e]{font-size:%?54?%;margin-left:%?28?%;font-weight:500}.sub-title[data-v-95c4ff7e]{position:relative;z-index:2;margin-top:%?30?%;text-align:center;font-size:%?30?%;letter-spacing:%?8?%;color:#fff}.hero-illustration[data-v-95c4ff7e]{position:relative;height:%?560?%;margin-top:%?70?%}.hero-illustration[data-v-95c4ff7e]::before{content:"";position:absolute;left:%?48?%;right:%?22?%;bottom:%?16?%;height:%?250?%;background:-webkit-linear-gradient(305deg,#db5a00,#ff9a00);background:linear-gradient(145deg,#db5a00,#ff9a00);border-radius:48% 52% 28% 28%;opacity:.9}.chart-board[data-v-95c4ff7e]{position:absolute;left:%?210?%;top:%?34?%;width:%?300?%;height:%?236?%;background:#fff;border:%?14?% solid #ff991d;border-radius:%?22?%;box-shadow:0 %?8?% 0 #f16b00}.chart-line[data-v-95c4ff7e]{position:absolute;left:%?58?%;top:%?122?%;width:%?160?%;height:%?14?%;background:#ff4558;-webkit-transform:rotate(-24deg);transform:rotate(-24deg)}.chart-arrow[data-v-95c4ff7e]{position:absolute;right:%?46?%;top:%?62?%;width:0;height:0;border-left:%?42?% solid transparent;border-right:%?42?% solid transparent;border-bottom:%?86?% solid #ff4558;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.person[data-v-95c4ff7e]{position:absolute;bottom:%?58?%;width:%?52?%;height:%?158?%;background:#ffd1a3;border-radius:%?28?% %?28?% %?12?% %?12?%}.person[data-v-95c4ff7e]::before{content:"";position:absolute;left:%?9?%;top:%?-42?%;width:%?34?%;height:%?34?%;border-radius:50%;background:#ffd1a3}.person-left[data-v-95c4ff7e]{left:%?164?%;background:#ff5b43}.person-center[data-v-95c4ff7e]{left:%?360?%;height:%?220?%;background:#ffc54b}.person-right[data-v-95c4ff7e]{right:%?110?%;height:%?92?%;background:#ff7b57}.coin-stack[data-v-95c4ff7e]{position:absolute;left:%?72?%;bottom:%?40?%;width:%?90?%;height:%?150?%;background:-webkit-repeating-linear-gradient(top,#ffd15a,#ffd15a %?18?%,#ff9b00 %?18?%,#ff9b00 %?24?%);background:repeating-linear-gradient(180deg,#ffd15a 0,#ffd15a %?18?%,#ff9b00 %?18?%,#ff9b00 %?24?%);border-radius:%?8?%}.share-card[data-v-95c4ff7e]{position:relative;z-index:3;height:%?370?%;margin-top:%?680?%;background:#fff;border-radius:%?26?%;display:grid;grid-template-columns:minmax(0,1fr) %?250?%;-webkit-column-gap:%?20?%;column-gap:%?20?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?34?% %?28?% %?30?% %?52?%;box-sizing:border-box}.share-title[data-v-95c4ff7e]{font-size:%?32?%;font-weight:700;margin-bottom:%?22?%;color:#222;line-height:%?46?%}.blue-line[data-v-95c4ff7e]{width:%?112?%;height:%?8?%;background:#5575ff;border-radius:%?8?%;margin:%?28?% 0 %?38?%}.scan-text[data-v-95c4ff7e]{font-size:%?28?%;color:#333}.qrcode-area[data-v-95c4ff7e]{width:%?250?%;text-align:center;font-size:%?20?%;color:#333;overflow:visible}.canvas-code[data-v-95c4ff7e]{display:block;width:%?220?%;height:%?220?%;margin:0 auto;background:#fff}.qrcode-hidden-canvas[data-v-95c4ff7e]{position:fixed;left:-9999px;top:-9999px;width:220px;height:220px}.invite-code[data-v-95c4ff7e]{margin-top:%?8?%;white-space:nowrap;font-size:%?30?%;line-height:%?28?%}.invite-account[data-v-95c4ff7e]{margin-top:%?2?%;white-space:nowrap;font-size:%?30?%;line-height:%?28?%}.poster-preview-img[data-v-95c4ff7e]{width:100%}.canvas-poster[data-v-95c4ff7e]{width:100%;height:100%}.poster-actions[data-v-95c4ff7e]{height:%?116?%;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-around;justify-content:space-around;-webkit-flex-shrink:0;flex-shrink:0}.poster-action[data-v-95c4ff7e]{width:50%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?26?%;font-weight:600;color:#111}.action-icon[data-v-95c4ff7e]{position:relative;width:%?42?%;height:%?42?%;margin-bottom:%?8?%}.save-icon[data-v-95c4ff7e]::before{content:"";position:absolute;left:%?18?%;top:%?2?%;width:%?6?%;height:%?24?%;background:#1f2933}.save-icon[data-v-95c4ff7e]::after{content:"";position:absolute;left:%?8?%;top:%?20?%;width:%?22?%;height:%?22?%;border-left:%?6?% solid #1f2933;border-bottom:%?6?% solid #1f2933;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.copy-icon[data-v-95c4ff7e]::before,\n.copy-icon[data-v-95c4ff7e]::after{content:"";position:absolute;width:%?24?%;height:%?28?%;border:%?5?% solid #4b5563;border-radius:%?4?%}.copy-icon[data-v-95c4ff7e]::before{left:%?6?%;top:%?10?%}.copy-icon[data-v-95c4ff7e]::after{left:%?14?%;top:%?2?%;background:#fff}',
        "",
      ]),
      (e.exports = t));
  },
  c926: function (e, t, i) {
    "use strict";
    (i.d(t, "b", function () {
      return n;
    }),
      i.d(t, "c", function () {
        return o;
      }),
      i.d(t, "a", function () {
        return a;
      }));
    var a = { uIcon: i("f86b").default, shoproLoginModal: i("4935").default },
      n = function () {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i(
          "v-uni-view",
          { staticClass: "poster" },
          [
            i(
              "v-uni-view",
              { staticClass: "poster-nav" },
              [
                i("v-uni-view", { staticClass: "sheight" }),
                i(
                  "v-uni-view",
                  { staticClass: "poster-nav-inner" },
                  [
                    i(
                      "v-uni-view",
                      {
                        staticClass: "poster-nav-back",
                        on: {
                          click: function (t) {
                            ((arguments[0] = t = e.$handleEvent(t)),
                              e.goBack.apply(void 0, arguments));
                          },
                        },
                      },
                      [
                        i("u-icon", {
                          attrs: {
                            name: "arrow-left",
                            size: "36",
                            color: "#111",
                          },
                        }),
                      ],
                      1,
                    ),
                    i("v-uni-text", { staticClass: "poster-nav-title" }, [
                      e._v("邀请海报"),
                    ]),
                    i("v-uni-view", { staticClass: "poster-nav-placeholder" }),
                  ],
                  1,
                ),
              ],
              1,
            ),
            i(
              "v-uni-view",
              { staticClass: "poster-body" },
              [
                i(
                  "v-uni-view",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !e.open_hidden,
                        expression: "!open_hidden",
                      },
                    ],
                    staticClass: "poster_box hiddenshow",
                    attrs: { id: "posterHtml" },
                  },
                  [
                    i(
                      "v-uni-view",
                      {
                        staticClass: "invite-poster-card",
                        style: e.invitePosterBgStyle,
                      },
                      [
                        i(
                          "v-uni-view",
                          { staticClass: "share-card" },
                          [
                            i(
                              "v-uni-view",
                              { staticClass: "share-text" },
                              [
                                i(
                                  "v-uni-view",
                                  { staticClass: "share-title" },
                                  [e._v("转发海报分享给好友")],
                                ),
                                i("v-uni-view", { staticClass: "scan-text" }, [
                                  e._v("扫码进入"),
                                ]),
                              ],
                              1,
                            ),
                            i(
                              "v-uni-view",
                              { staticClass: "qrcode-area" },
                              [
                                e.qrcode
                                  ? i("v-uni-image", {
                                      staticClass: "canvas-code",
                                      attrs: {
                                        src: e.qrcode,
                                        mode: "aspectFit",
                                      },
                                    })
                                  : e._e(),
                                i("v-uni-canvas", {
                                  staticClass: "qrcode-hidden-canvas",
                                  attrs: { "canvas-id": "myQrcode" },
                                }),
                                i(
                                  "v-uni-view",
                                  { staticClass: "invite-code" },
                                  [
                                    e._v(
                                      "邀请码: " +
                                        e._s(e.member.invitation_code || "--"),
                                    ),
                                  ],
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
                  ],
                  1,
                ),
                i(
                  "v-uni-view",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: e.open_hidden,
                        expression: "open_hidden",
                      },
                    ],
                    staticClass: "poster_box",
                    staticStyle: { padding: "0" },
                  },
                  [
                    i("v-uni-image", {
                      staticClass: "poster-preview-img",
                      attrs: { src: e.posterHtmlBg, mode: "widthFix" },
                    }),
                  ],
                  1,
                ),
              ],
              1,
            ),
            i(
              "v-uni-view",
              { staticClass: "poster-actions" },
              [
                i(
                  "v-uni-view",
                  {
                    staticClass: "poster-action",
                    on: {
                      click: function (t) {
                        ((arguments[0] = t = e.$handleEvent(t)),
                          e.savePoster.apply(void 0, arguments));
                      },
                    },
                  },
                  [
                    i("v-uni-view", { staticClass: "action-icon save-icon" }),
                    i("v-uni-view", [e._v("保存")]),
                  ],
                  1,
                ),
                i(
                  "v-uni-view",
                  {
                    staticClass: "poster-action",
                    on: {
                      click: function (t) {
                        ((arguments[0] = t = e.$handleEvent(t)),
                          e.copyLink.apply(void 0, arguments));
                      },
                    },
                  },
                  [
                    i("v-uni-view", { staticClass: "action-icon copy-icon" }),
                    i("v-uni-view", [e._v("复制链接")]),
                  ],
                  1,
                ),
              ],
              1,
            ),
            i("shopro-login-modal", {
              attrs: { showLogin: e.showLogin },
              on: {
                loginhidden: function (t) {
                  ((arguments[0] = t = e.$handleEvent(t)),
                    e.loginhidden.apply(void 0, arguments));
                },
              },
            }),
          ],
          1,
        );
      },
      o = [];
  },
  ea20: function (e, t, i) {
    "use strict";
    var a = i("4ea4");
    (Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = void 0));
    var n = a(i("5674")),
      o = a(i("2ba4")),
      r = a(i("baf2")),
      s = i("78cd");
    t.default = {
      components: { uniIcons: o.default },
      data: function () {
        return {
          width: "",
          height: "",
          systemInfo: {},
          qrcode: "",
          poster: "",
          bg_img: "",
          member: {},
          open_hidden: !1,
          posterHtmlBg: "",
          showLogin: !1,
          avatarLocalPath: "",
          codeBgCanvasPath: "",
        };
      },
      computed: {
        memberAvatar: function () {
          var e = this.member || {};
          return (
            e.avatarUrl ||
            e.avatar_url ||
            e.headimgurl ||
            e.headImg ||
            e.avatar ||
            ""
          );
        },
        avatarImgSrc: function () {
          return this.avatarLocalPath || this.memberAvatar;
        },
        invitePosterBgStyle: function () {
          return this.bg_img
            ? {
                backgroundImage: "url(" + this.bg_img + ")",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }
            : {};
        },
      },
      onLoad: function (e) {
        var t = this;
        (uni.showLoading({ title: "加载中" }),
          this.request("/member/member/getPoster").then(function (e) {
            if ((-500 == e.data.code && (t.showLogin = !0), 1 == e.data.code)) {
              var i = e.data.data || {},
                a = i.bg_img;
              ((t.bg_img = Array.isArray(a) && a.length ? a[0] : ""),
                (t.member = i.member || {}),
                (t.avatarLocalPath = ""),
                t.bg_img &&
                  new s("myQrcode", {
                    text: t.inviteLink(),
                    width: 220,
                    height: 220,
                    padding: 16,
                    correctLevel: s.CorrectLevel.H,
                    callback: function (e) {
                      ((t.qrcode = e.path),
                        setTimeout(function () {
                          (0, n.default)(
                            document.getElementById("posterHtml"),
                            { backgroundColor: null, useCORS: !0, scale: 2 },
                          ).then(function (e) {
                            var i = e.toDataURL("image/png");
                            ((t.posterHtmlBg = i),
                              (t.open_hidden = !0),
                              uni.hideLoading());
                          }).catch(function () { uni.hideLoading(); t.$tip('海报生成失败，请重试'); });
                        }, 300));
                    },
                  }));
              if (!t.bg_img) uni.hideLoading();
            } else { uni.hideLoading(); t.$tip(e.data.msg || '海报未加载'); }
          }).catch(function () { uni.hideLoading(); t.$tip('海报加载失败，请重试'); }));
      },
      methods: {
        onAvatarImageError: function (e) {
          console.warn("poster avatar load error", e);
        },
        goBack: function () {
          uni.navigateBack({
            delta: 1,
            fail: function () {
              uni.switchTab({ url: "/pages/personal/personal" });
            },
          });
        },
        loginhidden: function (e) {
          this.showLogin = e;
        },
        inviteLink: function () {
          return (
            this.$Config.url +
            "/h5/h5.html#/pages/login/register?member_id=" +
            this.member.member_id
          );
        },
        maskPhone: function (e) {
          if (!e) return "--";
          var t = String(e);
          return t.length < 7 ? t : t.slice(0, 3) + "****" + t.slice(-4);
        },
        savePoster: function () {
          if(this.posterHtmlBg){var link=document.createElement("a");link.href=this.posterHtmlBg;link.download="鑫芮商贸邀请海报.png";document.body.appendChild(link);link.click();link.remove();}else uni.showToast({title:"海报生成中，请稍后重试",icon:"none"});
        },
        copyLink: function () {
          var e = this.inviteLink();
          e && -1 === e.indexOf("undefined")
            ? (0, r.default)({
                content: e,
                success: function (e) {
                  uni.showToast({
                    title: "string" === typeof e ? e : "复制成功",
                    icon: "none",
                  });
                },
                error: function (e) {
                  uni.showToast({
                    title: "string" === typeof e ? e : "复制失败",
                    icon: "none",
                  });
                },
              })
            : uni.showToast({ title: "链接未生成，请稍后重试", icon: "none" });
        },
        saveImage: function () {
          (uni.showLoading({ title: "正在保存" }),
            uni.saveImageToPhotosAlbum({
              filePath: this.poster,
              success: function () {
                uni.showToast({ title: "图片保存成功～" });
              },
              fail: function (e) {
                ("saveImageToPhotosAlbum:fail:auth denied" !== e.errMsg &&
                  "saveImageToPhotosAlbum:fail auth deny" !== e.errMsg) ||
                  wx.showModal({
                    title: "提示",
                    content: "需要您授权保存相册",
                    showCancel: !1,
                    success: function (e) {
                      wx.openSetting({
                        success: function (e) {
                          (console.log("settingdata", e),
                            e.authSetting["scope.writePhotosAlbum"]
                              ? wx.showModal({
                                  title: "提示",
                                  content: "获取权限成功,再次点击图片即可保存",
                                  showCancel: !1,
                                })
                              : wx.showModal({
                                  title: "提示",
                                  content: "获取权限失败，将无法保存到相册哦~",
                                  showCancel: !1,
                                }));
                        },
                        fail: function (e) {
                          console.log("failData", e);
                        },
                        complete: function (e) {
                          console.log("finishData", e);
                        },
                      });
                    },
                  });
              },
              complete: function () {
                uni.hideLoading();
              },
            }));
        },
        roundRectColor: function (e, t, i, a, n, o, r) {
          if ((e.save(), 1 == r)) {
            var s = e.createLinearGradient(t, i, t, i + n);
            (s.addColorStop(0, "#FF9B20"),
              s.addColorStop(1, "#F4412E"),
              (e.fillStyle = s),
              (e.strokeStyle = s));
          } else
            2 == r && ((e.fillStyle = "#ffffff"), (e.strokeStyle = "#ffffff"));
          ((e.lineJoin = "round"),
            (e.lineWidth = o + 1),
            e.strokeRect(t + o / 2, i + o / 2, a - o, n - o),
            e.fillRect(t + o, i + o, a - 2 * o, n - 2 * o),
            e.stroke(),
            e.closePath());
        },
        drawImage: function (e) {
          var t = this,
            i = this,
            a = e.width,
            n = e.height,
            o = function () {
              var o = uni.createCanvasContext("canvasPoster", t),
                r = a / 10,
                s = 0.05 * a,
                c = s,
                d = 1.5 * s + r,
                f = 1.8 * c,
                l = 1.5 * f,
                u = 0.9 * e.width,
                g = 100,
                h = n - g - 10,
                b = 0.4 * u,
                p = 24,
                v = (a - b) / 2,
                w = h - p / 2,
                m = v + (b - 7 * e.tuigma.length) / 2,
                k = w + p / 1.5,
                x = s + 0.04 * u,
                y = w + 2.2 * p,
                C = 0.1 * u,
                _ = 3,
                P = y + p / 1.6,
                S = P + _ + p / 1.5,
                I = 60,
                L = u - I + s / 2,
                z = y - 14,
                T = i.codeBgCanvasPath || e.bgImg;
              (o.drawImage(T, 0, 0, a, n),
                o.save(),
                t.roundRectColor(o, s, h, u, g, 10, 2),
                t.roundRectColor(o, v, w, b, p, 22, 1),
                o.setFillStyle("#ffffff"),
                (o.font = "bold 10px PingFang SC"),
                o.fillText(e.tuigma, m, k),
                o.save(),
                o.setFillStyle("#323232"),
                (o.font = "bold 10px PingFang SC"),
                o.fillText(e.zhuanfa, x, y),
                o.save(),
                t.roundRectColor(o, x, P, C, _, 0, 1),
                o.drawImage(e.qrcode, L, z, I, I),
                o.save(),
                o.setFillStyle("#999999"),
                (o.font = "8px PingFang SC"),
                o.fillText(e.tips, x, S),
                o.save(),
                o.setStrokeStyle("rgba(0,0,0,.2)"),
                (o.lineWidth = 1),
                o.arc(s + r / 2, c + r / 2, r / 2, 0, 2 * Math.PI),
                o.stroke(),
                o.clip(),
                o.drawImage(e.headerImg, s, c, r, r),
                o.restore(),
                o.save(),
                o.setFillStyle("#ffffff"),
                (o.font = "bold 10px PingFang SC"),
                o.fillText(e.yonghu, d, f),
                o.save(),
                o.setFillStyle("#ffffff"),
                (o.font = "bold 10px PingFang SC"),
                o.fillText(e.username, d, l),
                o.save(),
                o.draw(),
                setTimeout(function () {
                  uni.canvasToTempFilePath({
                    canvasId: "canvasPoster",
                    width: a,
                    height: n,
                    destWidth: a * i.systemInfo.pixelRatio,
                    destHeight: n * i.systemInfo.pixelRatio,
                    success: function (e) {
                      ((t.poster = e.tempFilePath),
                        console.log(t.poster),
                        uni.hideLoading());
                    },
                    fail: function (e) {
                      console.log(e);
                    },
                  });
                }, 1500));
            };
          this.codeBgCanvasPath
            ? o()
            : uni.getImageInfo({
                src: "/static/images/code_bg.png",
                success: function (e) {
                  ((t.codeBgCanvasPath = e.path), o());
                },
                fail: function () {
                  o();
                },
              });
        },
      },
    };
  },
};
