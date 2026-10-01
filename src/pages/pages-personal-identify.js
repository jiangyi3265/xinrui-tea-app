/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "17cb": function (t, a, n) {
    "use strict";
    var i;
    (n.d(a, "b", function () {
      return e;
    }),
      n.d(a, "c", function () {
        return s;
      }),
      n.d(a, "a", function () {
        return i;
      }));
    var e = function () {
        var t = this,
          a = t.$createElement,
          n = t._self._c || a;
        return n(
          "v-uni-view",
          { staticClass: "sign-page" },
          [
            n(
              "v-uni-view",
              { staticClass: "form-group" },
              [
                n(
                  "v-uni-view",
                  { staticClass: "form-row" },
                  [
                    n("v-uni-text", { staticClass: "form-label" }, [
                      t._v("姓名"),
                    ]),
                    n("v-uni-input", {
                      staticClass: "form-input",
                      attrs: {
                        type: "text",
                        placeholder: "请输入姓名",
                        "placeholder-style": "color:#999",
                      },
                      model: {
                        value: t.name,
                        callback: function (a) {
                          t.name = a;
                        },
                        expression: "name",
                      },
                    }),
                  ],
                  1,
                ),
                n(
                  "v-uni-view",
                  { staticClass: "form-row" },
                  [
                    n("v-uni-text", { staticClass: "form-label" }, [
                      t._v("银行卡姓名"),
                    ]),
                    n("v-uni-input", {
                      staticClass: "form-input",
                      attrs: {
                        type: "text",
                        placeholder: "请输入银行卡姓名",
                        "placeholder-style": "color:#999",
                      },
                      model: {
                        value: t.bank_name,
                        callback: function (a) {
                          t.bank_name = a;
                        },
                        expression: "bank_name",
                      },
                    }),
                  ],
                  1,
                ),
              ],
              1,
            ),
            n("v-uni-view", { staticClass: "form-gap" }),
            n(
              "v-uni-view",
              { staticClass: "form-group" },
              [
                n(
                  "v-uni-view",
                  { staticClass: "form-row" },
                  [
                    n("v-uni-text", { staticClass: "form-label" }, [
                      t._v("银行卡号"),
                    ]),
                    n("v-uni-input", {
                      staticClass: "form-input",
                      attrs: {
                        type: "text",
                        placeholder: "请输入银行卡号",
                        "placeholder-style": "color:#999",
                      },
                      model: {
                        value: t.bank_card,
                        callback: function (a) {
                          t.bank_card = a;
                        },
                        expression: "bank_card",
                      },
                    }),
                  ],
                  1,
                ),
                n(
                  "v-uni-view",
                  { staticClass: "form-row" },
                  [
                    n("v-uni-text", { staticClass: "form-label" }, [
                      t._v("开户行"),
                    ]),
                    n("v-uni-input", {
                      staticClass: "form-input",
                      attrs: {
                        type: "text",
                        placeholder: "请输入开户行",
                        "placeholder-style": "color:#999",
                      },
                      model: {
                        value: t.bank,
                        callback: function (a) {
                          t.bank = a;
                        },
                        expression: "bank",
                      },
                    }),
                  ],
                  1,
                ),
              ],
              1,
            ),
            n(
              "v-uni-view",
              { staticClass: "sign-section" },
              [
                n("v-uni-text", { staticClass: "sign-label" }, [t._v("签名")]),
                n(
                  "v-uni-view",
                  { staticClass: "sign-box" },
                  [
                    t.signPreview && !t.hasDrawn
                      ? n("v-uni-image", {
                          staticClass: "sign-preview",
                          attrs: { src: t.signPreview, mode: "aspectFit" },
                        })
                      : n("v-uni-canvas", {
                          staticClass: "sign-canvas",
nativeOn: {
 mousedown:function(event){t.mouseSign(event,"touchstart");},
 mousemove:function(event){if(event.buttons===1)t.mouseSign(event,"touchmove");},
 mouseup:function(event){t.mouseSign(event,"touchend");},
 },
                          attrs: {
                            "canvas-id": "signCanvas",
                            "disable-scroll": !0,
                          },
                          on: {
                            touchstart: function (a) {
                              ((arguments[0] = a = t.$handleEvent(a)),
                                t.onTouchStart.apply(void 0, arguments));
                            },
                            touchmove: function (a) {
                              ((arguments[0] = a = t.$handleEvent(a)),
                                t.onTouchMove.apply(void 0, arguments));
                            },
                            touchend: function (a) {
                              ((arguments[0] = a = t.$handleEvent(a)),
                                t.onTouchEnd.apply(void 0, arguments));
                            },
                          },
                        }),
                  n("v-uni-view",{staticClass:"sign-reset",on:{click:function(){t.resetSign();}}},[t._v("重新签名")]),],
                  1,
                ),
              ],
              1,
            ),
          n("v-uni-view",{staticClass:"submit-btn",on:{click:function(){t.sureup();}}},[t._v(t.submitting?"提交中…":"确认签约")]),],
          1,
        );
      },
      s = [];
  },
  "1e6f": function (t, a, n) {
    "use strict";
    var i = n("4c1e"),
      e = n.n(i);
    e.a;
  },
  "32da": function (t, a, n) {
    "use strict";
    n.r(a);
    var i = n("be33"),
      e = n.n(i);
    for (var s in i)
      ["default"].indexOf(s) < 0 &&
        (function (t) {
          n.d(a, t, function () {
            return i[t];
          });
        })(s);
    a["default"] = e.a;
  },
  "3ab9": function (t, a, n) {
    var i = n("24fb");
    ((a = i(!1)),
      a.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.sign-page[data-v-acfe7ad2]{min-height:100vh;background:#f1f3fd;padding-bottom:%?160?%;box-sizing:border-box}.form-group[data-v-acfe7ad2]{background:#fff}.form-row[data-v-acfe7ad2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:%?110?%;padding:0 %?28?%;border-bottom:%?1?% solid #f0f0f0;box-sizing:border-box}.form-row.no-border[data-v-acfe7ad2]{border-bottom:none}.form-label[data-v-acfe7ad2]{width:%?200?%;font-size:%?32?%;color:#333;-webkit-flex-shrink:0;flex-shrink:0}.form-input[data-v-acfe7ad2]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?32?%;color:#333;min-height:%?80?%;line-height:%?48?%}.form-gap[data-v-acfe7ad2]{height:%?24?%;background:#f1f3fd}.sign-section[data-v-acfe7ad2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;padding:%?28?%;background:#fff;margin-top:%?24?%}.sign-label[data-v-acfe7ad2]{width:%?200?%;font-size:%?32?%;color:#333;line-height:%?48?%;-webkit-flex-shrink:0;flex-shrink:0}.sign-box[data-v-acfe7ad2]{position:relative;-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?280?%;background:#f3f3f3;border-radius:%?8?%;overflow:hidden}.sign-preview[data-v-acfe7ad2]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;background:#f3f3f3}.sign-canvas[data-v-acfe7ad2]{width:100%;height:100%;position:relative;z-index:2}.sign-reset[data-v-acfe7ad2]{position:absolute;right:%?16?%;bottom:%?12?%;z-index:3;font-size:%?24?%;color:#999;padding:%?8?% %?12?%}.submit-btn[data-v-acfe7ad2]{position:fixed;left:%?28?%;right:%?28?%;bottom:%?48?%;height:%?88?%;line-height:%?88?%;text-align:center;border-radius:%?8?%;background:#5581ff;color:#fff;font-size:%?32?%;font-weight:600}',
        "",
      ]),
      (t.exports = a));
  },
  "4c1e": function (t, a, n) {
    var i = n("3ab9");
    ("string" === typeof i && (i = [[t.i, i, ""]]),
      i.locals && (t.exports = i.locals));
    var e = n("4f06").default;
    e("12906e7e", i, !0, { sourceMap: !1, shadowMode: !1 });
  },
  7293: function (t, a, n) {
    "use strict";
    n.r(a);
    var i = n("17cb"),
      e = n("32da");
    for (var s in e)
      ["default"].indexOf(s) < 0 &&
        (function (t) {
          n.d(a, t, function () {
            return e[t];
          });
        })(s);
    n("1e6f");
    var o,
      r = n("f0c5"),
      c = Object(r["a"])(
        e["default"],
        i["b"],
        i["c"],
        !1,
        null,
        "acfe7ad2",
        null,
        !1,
        i["a"],
        o,
      );
    a["default"] = (typeof window !== "undefined" && window.__H5_SERVER_MODE__ === "ruoyi" && window.__teaWorkflowPage) ? window.__teaWorkflowPage("identity") : c.exports;
  },
  be33: function (t, a, n) {
    "use strict";
    var i = n("4ea4");
    (Object.defineProperty(a, "__esModule", { value: !0 }),
      (a.default = void 0));
    var e = i(n("3835"));
    (n("ac6a"), n("5df3"));
    a.default = {
      data: function () {
        return {
          name: "",
          bank_name: "",
          bank_card: "",
          bank: "",
          bank_branch: "",
          signPreview: "",
          ctx: null,
          canvasWidth: 0,
          canvasHeight: 0,
          hasDrawn: !1,
          lastPoint: null,
          submitting: !1,
        };
      },
      onLoad: function () {
        this.loadMemberInfo();
      },
      onReady: function () {
        this.signPreview || this.initCanvas();
      },
      methods: {
mouseSign:function(event,phase){var rect=event.currentTarget.getBoundingClientRect(),point={x:event.clientX-rect.left,y:event.clientY-rect.top};var data={type:phase,touches:[point],changedTouches:[point]}; if(phase==="touchstart")this.onTouchStart(data);else if(phase==="touchmove")this.onTouchMove(data);else this.onTouchEnd(data);},
        loadMemberInfo: function () {
          var t = this;
          this.request("/member/getMemberDetails").then(function (a) {
            if (1 == a.data.code) {
              var n = a.data.data || {},
                i = n.pay_info || {};
              ((t.name = n.identity_name || n.nickName || n.nickname || ""),
                (t.bank_name = i.bank_name || ""),
                (t.bank_card = i.bank_card || ""),
                (t.bank = i.bank || ""),
                (t.bank_branch = i.bank_branch || i.branch || ""),
                (t.signPreview = n.sign_image || n.signImage || ""));
            }
          });
        },
        initCanvas: function () {
          var t = this;
          this.ctx = uni.createCanvasContext("signCanvas", this);
          var a = uni.createSelectorQuery().in(this);
          a.select(".sign-box")
            .boundingClientRect(function (a) {
              a &&
                ((t.canvasWidth = a.width),
                (t.canvasHeight = a.height),
                t.clearCanvas());
            })
            .exec();
        },
        clearCanvas: function () {
          this.ctx &&
            (this.ctx.setFillStyle("#f3f3f3"),
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight),
            this.ctx.draw(),
            (this.hasDrawn = !1),
            (this.lastPoint = null));
        },
        resetSign: function () {
          var t = this;
          ((this.signPreview = ""),
            (this.hasDrawn = !1),
            this.$nextTick(function () {
              t.initCanvas();
            }));
        },
        onTouchStart: function (t) {
          var a = { x: t.touches[0].x, y: t.touches[0].y };
          ((this.lastPoint = a), (this.hasDrawn = !0), (this.signPreview = ""));
        },
        onTouchMove: function (t) {
          if (this.ctx && this.lastPoint) {
            var a = { x: t.touches[0].x, y: t.touches[0].y };
            (this.ctx.setStrokeStyle("#222"),
              this.ctx.setLineWidth(3),
              this.ctx.setLineCap("round"),
              this.ctx.setLineJoin("round"),
              this.ctx.beginPath(),
              this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y),
              this.ctx.lineTo(a.x, a.y),
              this.ctx.stroke(),
              this.ctx.draw(!0),
              (this.lastPoint = a));
          }
        },
        onTouchEnd: function () {
          this.lastPoint = null;
        },
        validateForm: function () {
          return this.name
            ? this.bank_name
              ? this.bank_card
                ? this.bank
                  ? !(!this.hasDrawn && !this.signPreview) ||
                    (this.$tip("请填写签名"), !1)
                  : (this.$tip("请输入开户行"), !1)
                : (this.$tip("请输入银行卡号"), !1)
              : (this.$tip("请输入银行卡姓名"), !1)
            : (this.$tip("请输入姓名"), !1);
        },
        exportSignImage: function () {
          var t = this;
          return new Promise(function (a, n) {
            t.hasDrawn
              ? uni.canvasToTempFilePath(
                  {
                    canvasId: "signCanvas",
                    fileType: "png",
                    quality: 1,
                    success: function (i) {
                      uni.uploadFile({
                        url: t.$Config.url + "/upload/image",
                        filePath: i.tempFilePath,
                        name: "iFile",
                        header: {
                          token: uni.getStorageSync("TOKEN"),
                          Version: "102",
                        },
                        success: function (t) {
                          var i = JSON.parse(t.data || "{}");
                          1 == i.code
                            ? a(i.data.file_path)
                            : n(i.msg || "签名上传失败");
                        },
                        fail: function () {
                          return n("签名上传失败");
                        },
                      });
                    },
                    fail: function () {
                      return n("签名生成失败");
                    },
                  },
                  t,
                )
              : a(t.signPreview || "");
          });
        },
        sureup: function () {
          var t = this;
          this.submitting ||
            (this.validateForm() &&
              ((this.submitting = !0),
              uni.showLoading({ title: "提交中" }),
              this.exportSignImage()
                .then(function (a) {
                  return Promise.all([
                    t.request("/member/setPay", {
                      bank_name: t.bank_name,
                      bank_card: t.bank_card,
                      bank: t.bank,
                      bank_branch: t.bank_branch,
                    }),
                    t.request("/member/setSignImage", { url: a }),
                    t.request("/certification/addRealName", {
                      certification_name: t.name,
                    }),
                  ]).then(function (a) {
                    var n = (0, e.default)(a, 3),
                      i = n[0],
                      s = n[1],
                      o = n[2];
                    1 == i.data.code
                      ? 1 == s.data.code
                        ? 1 == o.data.code || -500 == o.data.code
                          ? (t.$tip("提交成功"),
                            setTimeout(function () {
                              uni.navigateBack();
                            }, 500))
                          : t.$tip(o.data.msg)
                        : t.$tip(s.data.msg)
                      : t.$tip(i.data.msg);
                  });
                })
                .catch(function (a) {
                  t.$tip("string" === typeof a ? a : "提交失败");
                })
                .finally(function () {
                  ((t.submitting = !1), uni.hideLoading());
                })));
        },
      },
    };
  },
};
