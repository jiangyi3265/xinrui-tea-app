/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "02a9": function (t, e, i) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      i("c5f6"));
    var n = uni.getSystemInfoSync().platform;
    e.default = {
      name: "UniLoadMore",
      props: {
        status: { type: String, default: "more" },
        showIcon: { type: Boolean, default: !0 },
        iconType: { type: String, default: "auto" },
        iconSize: { type: Number, default: 24 },
        color: { type: String, default: "#777777" },
        contentText: {
          type: Object,
          default: function () {
            return {
              contentdown: "上拉显示更多",
              contentrefresh: "正在加载...",
              contentnomore: "没有更多数据了",
            };
          },
        },
      },
      data: function () {
        return { webviewHide: !1, platform: n };
      },
      computed: {
        iconSnowWidth: function () {
          return (
            console.log(2 * (Math.floor(this.iconSize / 24) || 1)),
            2 * (Math.floor(this.iconSize / 24) || 1)
          );
        },
      },
      mounted: function () {},
      methods: {
        onClick: function () {
          this.$emit("clickLoadMore", { detail: { status: this.status } });
        },
      },
    };
  },
  "04bb": function (t, e, i) {
    var n = i("2b6e");
    ("string" === typeof n && (n = [[t.i, n, ""]]),
      n.locals && (t.exports = n.locals));
    var a = i("4f06").default;
    a("179908d2", n, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "09c2": function (t, e, i) {
    "use strict";
    i.r(e);
    var n = i("cb00"),
      a = i("ba86");
    for (var o in a)
      ["default"].indexOf(o) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return a[t];
          });
        })(o);
    i("5cc51");
    var r,
      s = i("f0c5"),
      d = Object(s["a"])(
        a["default"],
        n["b"],
        n["c"],
        !1,
        null,
        "578e2c97",
        null,
        !1,
        n["a"],
        r,
      );
    e["default"] = d.exports;
  },
  "205c": function (t, e, i) {
    "use strict";
    i.r(e);
    var n = i("7cb6"),
      a = i("8805");
    for (var o in a)
      ["default"].indexOf(o) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return a[t];
          });
        })(o);
    i("2af8");
    var r,
      s = i("f0c5"),
      d = Object(s["a"])(
        a["default"],
        n["b"],
        n["c"],
        !1,
        null,
        "dfa521d8",
        null,
        !1,
        n["a"],
        r,
      );
    e["default"] = d.exports;
  },
  2776: function (t, e, i) {
    "use strict";
    i.r(e);
    var n = i("be2a"),
      a = i("98b8");
    for (var o in a)
      ["default"].indexOf(o) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return a[t];
          });
        })(o);
    i("7dae");
    var r,
      s = i("f0c5"),
      d = Object(s["a"])(
        a["default"],
        n["b"],
        n["c"],
        !1,
        null,
        "0984b200",
        null,
        !1,
        n["a"],
        r,
      );
    e["default"] = d.exports;
  },
  "27a0": function (t, e, i) {
    var n = i("24fb");
    ((e = n(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.wallet_class[data-v-dfa521d8]{position:relative;height:100%}.wallet_class .pay-pwd-input[data-v-dfa521d8]{height:100%;line-height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;height:%?70?%;margin:0 auto}.wallet_class .pay-pwd-input .pay-pwd-grid[data-v-dfa521d8]{margin:%?0?% auto;height:100%;line-height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.wallet_class .pay-pwd-input .pay-pwd-grid uni-view[data-v-dfa521d8]{width:%?110?%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border:#cececd solid %?0.1?%;border-radius:%?10?%;font-size:%?36?%;font-weight:600}.wallet_class .pay-pwd-input .pay-pwd-grid .xaunz[data-v-dfa521d8]{border:red solid %?0.1?%}.wallet_class .input-row[data-v-dfa521d8]{height:100%;line-height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.wallet_class .input-row .pay-pwd-grid[data-v-dfa521d8]{margin:%?0?% auto;height:100%;line-height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.wallet_class .input-row .pay-pwd-grid .item[data-v-dfa521d8]{width:%?110?%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?36?%;font-weight:600;border-bottom:1px solid #c8c8c8}.wallet_class .input-row .pay-pwd-grid .item-active[data-v-dfa521d8]{position:relative;-webkit-transform:scale(1.2);transform:scale(1.2)}.wallet_class .input_info[data-v-dfa521d8]{width:200%;height:100%;line-height:100%;opacity:0;position:absolute;top:%?0?%;left:-100%}',
        "",
      ]),
      (t.exports = e));
  },
  "2af8": function (t, e, i) {
    "use strict";
    var n = i("a521"),
      a = i.n(n);
    a.a;
  },
  "2b6e": function (t, e, i) {
    var n = i("24fb");
    ((e = n(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-0984b200]{background-color:#f5f5f5}.noList[data-v-0984b200]{text-align:center}.noimg[data-v-0984b200]{margin-top:%?300?%;width:%?700?%;height:%?500?%}.no_text[data-v-0984b200]{margin-top:%?20?%;font-size:%?28?%;color:#999;text-align:center}.zhuanpai[data-v-0984b200]{position:fixed;bottom:0;left:0;width:100%;height:100%;z-index:100;background:rgba(0,0,0,.4);top:0}.zhuanpai .macon[data-v-0984b200]{position:absolute;border-radius:%?20?%;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;z-index:2}.zhuanpai .macon .cont_yz[data-v-0984b200]{width:%?550?%;height:%?680?%}.zhuanpai .macon .cont_yz uni-image[data-v-0984b200]{width:100%;height:100%}.top_gap[data-v-0984b200]{width:%?1?%;height:%?30?%}.top_gap.app[data-v-0984b200]{height:%?30?%}.top_right_tools[data-v-0984b200]{position:fixed;top:%?10?%;right:%?12?%;z-index:999;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.remain_count_badge[data-v-0984b200]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;min-width:%?72?%;height:%?42?%;padding:0 %?12?%;margin-right:%?10?%;background:#ff4d4f;border-radius:%?8?%;box-shadow:0 %?2?% %?8?% rgba(255,77,79,.28);box-sizing:border-box}.remain_count_num[data-v-0984b200]{color:#fff;font-size:%?26?%;font-weight:700;line-height:%?42?%}.remain_count_unit[data-v-0984b200]{color:#fff;font-size:%?20?%;margin-left:%?2?%;line-height:%?42?%}.refresh_btn[data-v-0984b200]{width:%?72?%;height:%?42?%;line-height:%?42?%;text-align:center;background:#2f80ff;color:#fff;font-size:%?24?%;border-radius:%?8?%;box-shadow:0 %?2?% %?8?% rgba(47,128,255,.25)}.view_one[data-v-0984b200]{z-index:20;position:fixed;width:100%;padding:0 %?24?%;height:%?88?%;line-height:%?88?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;box-sizing:border-box}.view_two[data-v-0984b200]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.view_three[data-v-0984b200]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.mr50[data-v-0984b200]{margin-right:%?50?%}.tor[data-v-0984b200]{margin-right:%?20?%;font-size:%?28?%;color:#b9b9b9}.filter_bar[data-v-0984b200]{position:-webkit-sticky;position:sticky;top:0;z-index:15;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin:0 %?16?% %?24?%;padding:%?26?% 0;background:#fff;border-radius:%?10?%;box-shadow:0 %?2?% %?12?% rgba(0,0,0,.03)}.center_countdown[data-v-0984b200]{position:fixed;left:50%;top:%?220?%;-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:50;padding:%?18?% %?36?%;background:hsla(0,0%,100%,.96);border-radius:%?12?%;box-shadow:0 %?6?% %?24?% rgba(0,0,0,.12);pointer-events:none}.center_countdown_text[data-v-0984b200]{font-size:%?40?%;line-height:1.2;font-weight:700;color:#ff3b30;letter-spacing:%?2?%;font-variant-numeric:tabular-nums}.filter_item[data-v-0984b200]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;font-size:%?28?%;line-height:%?36?%;color:#1f1f1f;font-weight:500}.filter_item.active[data-v-0984b200]{color:#1777ff;font-weight:700}.filter_grid_icon[data-v-0984b200]{width:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.grid_icon[data-v-0984b200]{width:%?36?%;height:%?36?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-align-content:space-between;align-content:space-between}.grid_dot[data-v-0984b200]{width:%?16?%;height:%?16?%;background:#333;border-radius:%?2?%}.content[data-v-0984b200]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:0 %?24?% %?40?%}.v_one[data-v-0984b200]{width:%?340?%;margin-bottom:%?24?%;background:#fff;border-radius:%?14?%;overflow:hidden;border:%?1?% solid #e8e8e8}.img_box[data-v-0984b200]{width:100%;height:%?360?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background:#f8f8f8}.v_img[data-v-0984b200]{width:100%;height:%?360?%;display:block}.v_two[data-v-0984b200]{padding:%?16?% %?16?% %?20?%}.goods_name[data-v-0984b200]{font-size:%?30?%;line-height:%?42?%;color:#222;font-weight:700;-webkit-line-clamp:1;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;min-height:%?42?%}.goods_bottom[data-v-0984b200]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?20?%}.goods_price[data-v-0984b200]{color:#ff3b30;font-weight:700;font-size:%?30?%;line-height:%?42?%}.goods_status[data-v-0984b200]{min-width:%?126?%;height:%?50?%;padding:0 %?18?%;background:#ff4d43;color:#fff;font-size:%?24?%;border-radius:%?6?%;line-height:%?50?%;text-align:center;box-sizing:border-box;white-space:nowrap;border:none}.goods_status.buying[data-v-0984b200]{background-color:#ff4d43!important;color:#fff!important;border:none!important;border-radius:%?6?%!important}.goods_status.waiting[data-v-0984b200]{background-color:#969ba3!important;color:#fff!important;border:none!important;border-radius:%?6?%!important}.goods_status.sold[data-v-0984b200],\n.goods_status.ended[data-v-0984b200]{background-color:initial!important;color:#999!important;border:%?1?% solid #999!important;border-radius:%?6?%!important}.sold_out .v_img[data-v-0984b200]{-webkit-filter:grayscale(100%);filter:grayscale(100%);opacity:.7}.sold_out .goods_name[data-v-0984b200],\n.sold_out .goods_price[data-v-0984b200]{color:#999}.sold_out .goods_status[data-v-0984b200]{background:transparent;color:#999;border:%?1?% solid #999}.confirm_mask[data-v-0984b200]{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:999;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.confirm_dialog[data-v-0984b200]{width:%?560?%;background:#fff;border-radius:%?16?%;overflow:hidden}.confirm_text[data-v-0984b200]{padding:%?60?% %?40?%;text-align:center;font-size:%?32?%;color:#333;line-height:1.5}.confirm_btns[data-v-0984b200]{display:-webkit-box;display:-webkit-flex;display:flex;border-top:%?1?% solid #eee}.confirm_btn[data-v-0984b200]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?100?%;line-height:%?100?%;text-align:center;font-size:%?32?%}.confirm_btn.cancel[data-v-0984b200]{color:#666;border-right:%?1?% solid #eee}.confirm_btn.sure[data-v-0984b200]{color:#2f80ed}.success_mask[data-v-0984b200]{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:999;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.success_dialog[data-v-0984b200]{width:%?580?%;background:transparent;border-radius:%?24?%;padding:0;text-align:center;position:relative;overflow:hidden}.success_img[data-v-0984b200]{width:100%}.success_btn[data-v-0984b200]{width:80%;height:%?88?%;line-height:%?88?%;background:-webkit-linear-gradient(left,#ff6b4a,#ff4d43);background:linear-gradient(90deg,#ff6b4a,#ff4d43);color:#fff;font-size:%?32?%;font-weight:700;border-radius:%?44?%;margin:%?30?% auto 0}.quanping[data-v-0984b200]{position:fixed;width:100%;height:100%;z-index:-1;background:rgba(0,0,0,.3);top:0;opacity:0}.quanping .tankuangpay1[data-v-0984b200]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:%?520?%;border-radius:%?14?%;background:#fff;z-index:-1;opacity:0;-webkit-transition:all .3s;transition:all .3s}.quanping .tankuangpay1 > uni-view[data-v-0984b200]{text-align:center}.quanping .tankuangpay1 > uni-view[data-v-0984b200]:first-of-type{font-size:%?28?%;padding:%?40?% 0 %?30?%}.quanping .tankuangpay1 > uni-view[data-v-0984b200]:nth-of-type(2){padding-bottom:%?50?%}.quanping .tankuangpay1 > uni-view:nth-of-type(2) uni-view[data-v-0984b200]{text-align:center;line-height:%?42?%;font-size:%?22?%;color:#999}.quanping .tankuangpay1 > uni-view:nth-of-type(2) uni-view[data-v-0984b200]:first-of-type{font-size:%?36?%;color:#fa3534;margin-bottom:%?10?%}.quanping .tankuangpay1 > uni-view[data-v-0984b200]:nth-of-type(3){height:%?80?%;border-top:%?2?% solid #eee}.quanping .tankuangpay1 > uni-view:nth-of-type(3) uni-text[data-v-0984b200]{text-align:center;width:50%;height:100%;line-height:%?80?%;display:inline-block;font-size:%?28?%;box-sizing:border-box}.quanping .tankuangpay1 > uni-view:nth-of-type(3) uni-text[data-v-0984b200]:last-of-type{border-left:%?2?% solid #eee;color:#fa3534}.quanping .tip_con[data-v-0984b200]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:80%;text-align:center}.quanping .tip_con .tankuangpay[data-v-0984b200]{border-radius:%?14?%;background:#fff;padding:%?50?% 0;margin-bottom:%?50?%}.quanping .tip_con .tankuangpay > uni-view[data-v-0984b200]{text-align:center}.quanping .tip_con .tankuangpay > uni-view:first-of-type uni-view[data-v-0984b200]{text-align:center;font-size:%?32?%;line-height:%?40?%}.quanping .tip_con .tankuangpay > uni-view:first-of-type uni-view[data-v-0984b200]:last-of-type{font-size:%?28?%;padding-top:%?30?%}.quanping .tip_con .tankuangpay > uni-view:first-of-type uni-view:last-of-type uni-text[data-v-0984b200]{color:#fa3534;font-size:%?28?%}.quanping .tip_con .tankuangpay > uni-view.agent_con[data-v-0984b200]{color:#999;font-size:%?26?%;padding:%?20?% 0}.quanping .tip_con .tankuangpay > uni-view.agent_con uni-text[data-v-0984b200]{color:#fa3534;font-size:%?26?%}.quanping .tip_con .tankuangpay > uni-view.agent_con .icon[data-v-0984b200]{position:relative;top:%?6?%;margin-right:%?10?%}.quanping .tip_con .tankuangpay .paymoney[data-v-0984b200]{font-size:%?28?%!important;margin:%?20?% 0}.quanping .tip_con .tankuangpay .smlbummit[data-v-0984b200]{height:%?70?%;margin:0 14%;background:#fa3534;text-align:center;line-height:%?70?%;border-radius:%?100?%;margin-top:%?30?%;font-size:%?28?%;color:#fff}.quanping .tip_con .tankuangpay .forget[data-v-0984b200]{font-size:%?26?%;color:#6f90cb;margin-top:%?20?%}.sureafter[data-v-0984b200]{opacity:1;z-index:99}.sureafter .tankuangpay[data-v-0984b200],\n.sureafter .tankuangpay1[data-v-0984b200]{opacity:1;z-index:10}body.?%PAGE?%[data-v-0984b200]{background-color:#f5f5f5}',
        "",
      ]),
      (t.exports = e));
  },
  4584: function (t, e, i) {
    t.exports = i.p + "static/img/noimg.89728664.png";
  },
  "4b21": function (t, e, i) {
    t.exports = i.p + "static/img/qianggou_success.9a4bbba3.png";
  },
  "5cc51": function (t, e, i) {
    "use strict";
    var n = i("aa33"),
      a = i.n(n);
    a.a;
  },
  "66dd": function (t, e, i) {
    var n = i("24fb");
    ((e = n(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-load-more[data-v-578e2c97]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:40px;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-load-more__text[data-v-578e2c97]{font-size:15px}.uni-load-more__img[data-v-578e2c97]{width:24px;height:24px;margin-right:8px}.uni-load-more__img--nvue[data-v-578e2c97]{color:#666}.uni-load-more__img--android[data-v-578e2c97],\n.uni-load-more__img--ios[data-v-578e2c97]{width:24px;height:24px;-webkit-transform:rotate(0deg);transform:rotate(0deg)}.uni-load-more__img--android[data-v-578e2c97]{-webkit-animation:loading-ios 1s 0s linear infinite;animation:loading-ios 1s 0s linear infinite}@-webkit-keyframes loading-android-data-v-578e2c97{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading-android-data-v-578e2c97{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.uni-load-more__img--ios-H5[data-v-578e2c97]{position:relative;-webkit-animation:loading-ios-H5-data-v-578e2c97 1s 0s step-end infinite;animation:loading-ios-H5-data-v-578e2c97 1s 0s step-end infinite}.uni-load-more__img--ios-H5 > uni-image[data-v-578e2c97]{position:absolute;width:100%;height:100%;left:0;top:0}@-webkit-keyframes loading-ios-H5-data-v-578e2c97{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}8%{-webkit-transform:rotate(30deg);transform:rotate(30deg)}16%{-webkit-transform:rotate(60deg);transform:rotate(60deg)}24%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}32%{-webkit-transform:rotate(120deg);transform:rotate(120deg)}40%{-webkit-transform:rotate(150deg);transform:rotate(150deg)}48%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}56%{-webkit-transform:rotate(210deg);transform:rotate(210deg)}64%{-webkit-transform:rotate(240deg);transform:rotate(240deg)}73%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}82%{-webkit-transform:rotate(300deg);transform:rotate(300deg)}91%{-webkit-transform:rotate(330deg);transform:rotate(330deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading-ios-H5-data-v-578e2c97{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}8%{-webkit-transform:rotate(30deg);transform:rotate(30deg)}16%{-webkit-transform:rotate(60deg);transform:rotate(60deg)}24%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}32%{-webkit-transform:rotate(120deg);transform:rotate(120deg)}40%{-webkit-transform:rotate(150deg);transform:rotate(150deg)}48%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}56%{-webkit-transform:rotate(210deg);transform:rotate(210deg)}64%{-webkit-transform:rotate(240deg);transform:rotate(240deg)}73%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}82%{-webkit-transform:rotate(300deg);transform:rotate(300deg)}91%{-webkit-transform:rotate(330deg);transform:rotate(330deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.uni-load-more__img--android-H5[data-v-578e2c97]{-webkit-animation:loading-android-H5-rotate-data-v-578e2c97 2s linear infinite;animation:loading-android-H5-rotate-data-v-578e2c97 2s linear infinite;-webkit-transform-origin:center center;transform-origin:center center}.uni-load-more__img--android-H5 > circle[data-v-578e2c97]{display:inline-block;-webkit-animation:loading-android-H5-dash-data-v-578e2c97 1.5s ease-in-out infinite;animation:loading-android-H5-dash-data-v-578e2c97 1.5s ease-in-out infinite;stroke:currentColor;stroke-linecap:round}@-webkit-keyframes loading-android-H5-rotate-data-v-578e2c97{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading-android-H5-rotate-data-v-578e2c97{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes loading-android-H5-dash-data-v-578e2c97{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40}100%{stroke-dasharray:90,150;stroke-dashoffset:-120}}@keyframes loading-android-H5-dash-data-v-578e2c97{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40}100%{stroke-dasharray:90,150;stroke-dashoffset:-120}}',
        "",
      ]),
      (t.exports = e));
  },
  "7cb6": function (t, e, i) {
    "use strict";
    var n;
    (i.d(e, "b", function () {
      return a;
    }),
      i.d(e, "c", function () {
        return o;
      }),
      i.d(e, "a", function () {
        return n;
      }));
    var a = function () {
        var t = this,
          e = t.$createElement,
          i = t._self._c || e;
        return i(
          "v-uni-view",
          { staticClass: "wallet_class", staticStyle: { height: "55px" } },
          [
            "one" === t.pawType
              ? i(
                  "v-uni-view",
                  {
                    staticClass: "pay-pwd-input",
                    style: "width:" + t.width + "rpx",
                    on: {
                      click: function (e) {
                        ((arguments[0] = e = t.$handleEvent(e)),
                          t.tokey.apply(void 0, arguments));
                      },
                    },
                  },
                  t._l(t.payPwdGrid, function (e, n) {
                    return i(
                      "v-uni-view",
                      { key: n, staticClass: "pay-pwd-grid uni-flex uni-row" },
                      [
                        n != t.list.length
                          ? i(
                              "v-uni-view",
                              { style: "width:" + t.width1 + "rpx;" },
                              [t._v(t._s(e.text))],
                            )
                          : t._e(),
                        n == t.list.length
                          ? i(
                              "v-uni-view",
                              {
                                staticStyle: { border: "1px solid #f00" },
                                style: "width:" + t.width1 + "rpx;",
                              },
                              [t._v(t._s(e.text))],
                            )
                          : t._e(),
                      ],
                      1,
                    );
                  }),
                  1,
                )
              : t._e(),
            "two" === t.pawType
              ? i(
                  "v-uni-view",
                  {
                    staticClass: "input-row",
                    style: "width:" + t.width + "rpx",
                    on: {
                      click: function (e) {
                        ((arguments[0] = e = t.$handleEvent(e)),
                          t.tokey.apply(void 0, arguments));
                      },
                    },
                  },
                  t._l(t.payPwdGrid, function (e, n) {
                    return i(
                      "v-uni-view",
                      { key: n, staticClass: "pay-pwd-grid uni-flex uni-row" },
                      [
                        i(
                          "v-uni-view",
                          {
                            class: "item",
                            style:
                              "width:" +
                              t.width1 +
                              "rpx;" +
                              (t.focusType && n == t.list.length
                                ? t.borderCheckStyle
                                : ""),
                          },
                          [t._v(t._s(e.text))],
                        ),
                      ],
                      1,
                    );
                  }),
                  1,
                )
              : t._e(),
            t.keyType
              ? i("v-uni-input", {
                  staticClass: "input_info",
                  attrs: { type: t.inputType, maxlength: t.places },
                  on: {
                    input: function (e) {
                      ((arguments[0] = e = t.$handleEvent(e)),
                        t.inputVal.apply(void 0, arguments));
                    },
                    focus: function (e) {
                      ((arguments[0] = e = t.$handleEvent(e)),
                        t.focus.apply(void 0, arguments));
                    },
                    blur: function (e) {
                      ((arguments[0] = e = t.$handleEvent(e)),
                        t.blur.apply(void 0, arguments));
                    },
                  },
                })
              : t._e(),
          ],
          1,
        );
      },
      o = [];
  },
  "7dae": function (t, e, i) {
    "use strict";
    var n = i("04bb"),
      a = i.n(n);
    a.a;
  },
  "7f6b": function (t, e, i) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      i("28a5"),
      i("c5f6"));
    e.default = {
      name: "wallet_category",
      props: {
        pawType: { type: String, default: "one" },
        places: { type: Number, default: 6 },
        width: { type: Number, default: 750 },
        borderCheckStyle: { type: String, default: "border: 1px solid #f00;" },
        codes: { type: String, default: "123" },
        keyType: { type: Boolean, default: !0 },
        isPwy: { type: Boolean, default: !0 },
        inputType: { type: String, default: "number" },
      },
      data: function () {
        return { focusType: !1, width1: 110, list: [], payPwdGrid: [] };
      },
      mounted: function () {
        ((this.list = this.codes.split("")),
          (this.width1 = (this.width - 90) / this.places),
          (this.payPwdGrid = []));
        for (var t = 0; t < this.places; t++)
          this.payPwdGrid.push({ text: "" });
        if (this.isPwy)
          for (var e = 0; e < this.list.length; e++)
            this.payPwdGrid[e].text = "●";
        else
          for (var i = 0; i < this.list.length; i++)
            this.payPwdGrid[i].text = this.list[i];
      },
      watch: {
        places: function () {
          ((this.list = this.codes.split("")),
            (this.width1 = (this.width - 90) / this.places),
            (this.payPwdGrid = []));
          for (var t = 0; t < this.places; t++)
            this.payPwdGrid.push({ text: "" });
          if (this.isPwy)
            for (var e = 0; e < this.list.length; e++)
              this.payPwdGrid[e].text = "●";
          else
            for (var i = 0; i < this.list.length; i++)
              this.payPwdGrid[i].text = this.list[i];
        },
        codes: function () {
          ((this.list = this.codes.split("")), (this.payPwdGrid = []));
          for (var t = 0; t < this.places; t++)
            this.payPwdGrid.push({ text: "" });
          if (this.isPwy)
            for (var e = 0; e < this.list.length; e++)
              this.payPwdGrid[e].text = "●";
          else
            for (var i = 0; i < this.list.length; i++)
              this.payPwdGrid[i].text = this.list[i];
          this.$emit("inputVal", this.codes);
        },
      },
      methods: {
        focus: function () {
          this.focusType = !0;
        },
        blur: function () {
          this.focusType = !1;
        },
        tokey: function () {
          this.$emit("tokey");
        },
        inputVal: function (t) {
          var e = t.detail.value;
          ((this.list = e.split("")), (this.payPwdGrid = []));
          for (var i = 0; i < this.places; i++)
            this.payPwdGrid.push({ text: "" });
          if (this.isPwy)
            for (var n = 0; n < this.list.length; n++)
              this.payPwdGrid[n].text = "●";
          else
            for (var a = 0; a < this.list.length; a++)
              this.payPwdGrid[a].text = this.list[a];
          this.$emit("inputVal", e);
        },
      },
    };
  },
  8805: function (t, e, i) {
    "use strict";
    i.r(e);
    var n = i("7f6b"),
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
  "98b8": function (t, e, i) {
    "use strict";
    i.r(e);
    var n = i("ec31"),
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
  a521: function (t, e, i) {
    var n = i("27a0");
    ("string" === typeof n && (n = [[t.i, n, ""]]),
      n.locals && (t.exports = n.locals));
    var a = i("4f06").default;
    a("29acad68", n, !0, { sourceMap: !1, shadowMode: !1 });
  },
  aa33: function (t, e, i) {
    var n = i("66dd");
    ("string" === typeof n && (n = [[t.i, n, ""]]),
      n.locals && (t.exports = n.locals));
    var a = i("4f06").default;
    a("0bd60278", n, !0, { sourceMap: !1, shadowMode: !1 });
  },
  ba86: function (t, e, i) {
    "use strict";
    i.r(e);
    var n = i("02a9"),
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
  be2a: function (t, e, i) {
    "use strict";
    var n;
    (i.d(e, "b", function () {
      return a;
    }),
      i.d(e, "c", function () {
        return o;
      }),
      i.d(e, "a", function () {
        return n;
      }));
    var a = function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "v-uni-view",
          [
            n(
              "v-uni-view",
              { staticClass: "top_right_tools" },
              [
                n(
                  "v-uni-view",
                  { staticClass: "remain_count_badge" },
                  [
                    n("v-uni-text", { staticClass: "remain_count_num" }, [
                      t._v(t._s(t.remainGrabCount)),
                    ]),
                    n("v-uni-text", { staticClass: "remain_count_unit" }, [
                      t._v("条"),
                    ]),
                  ],
                  1,
                ),
                n(
                  "v-uni-view",
                  {
                    staticClass: "refresh_btn",
                    on: {
                      click: function (e) {
                        ((arguments[0] = e = t.$handleEvent(e)),
                          t.refreshPage.apply(void 0, arguments));
                      },
                    },
                  },
                  [t._v("刷新")],
                ),
              ],
              1,
            ),
            n("v-uni-view", { staticClass: "top_gap" }),
            n(
              "v-uni-view",
              { staticClass: "filter_bar" },
              [
                n(
                  "v-uni-view",
                  {
                    class:
                      "default" === t.sortType
                        ? "filter_item active"
                        : "filter_item",
                    on: {
                      click: function (e) {
                        ((arguments[0] = e = t.$handleEvent(e)),
                          t.changeSort("default"));
                      },
                    },
                  },
                  [t._v("默认排序")],
                ),
                n(
                  "v-uni-view",
                  {
                    class:
                      "asc" === t.sortType
                        ? "filter_item active"
                        : "filter_item",
                    on: {
                      click: function (e) {
                        ((arguments[0] = e = t.$handleEvent(e)),
                          t.changeSort("asc"));
                      },
                    },
                  },
                  [t._v("价格↑")],
                ),
                n(
                  "v-uni-view",
                  {
                    class:
                      "desc" === t.sortType
                        ? "filter_item active"
                        : "filter_item",
                    on: {
                      click: function (e) {
                        ((arguments[0] = e = t.$handleEvent(e)),
                          t.changeSort("desc"));
                      },
                    },
                  },
                  [t._v("价格↓")],
                ),
                n(
                  "v-uni-view",
                  { staticClass: "filter_grid_icon" },
                  [
                    n(
                      "v-uni-view",
                      { staticClass: "grid_icon" },
                      [
                        n("v-uni-view", { staticClass: "grid_dot" }),
                        n("v-uni-view", { staticClass: "grid_dot" }),
                        n("v-uni-view", { staticClass: "grid_dot" }),
                        n("v-uni-view", { staticClass: "grid_dot" }),
                      ],
                      1,
                    ),
                  ],
                  1,
                ),
              ],
              1,
            ),
            t.showCenterCountdown
              ? n(
                  "v-uni-view",
                  { staticClass: "center_countdown" },
                  [
                    n("v-uni-text", { staticClass: "center_countdown_text" }, [
                      t._v(t._s(t.countdownDisplay)),
                    ]),
                  ],
                  1,
                )
              : t._e(),
            0 != t.listData.length
              ? n(
                  "v-uni-view",
                  { staticClass: "content" },
                  t._l(t.listData, function (e, i) {
                    return n(
                      "v-uni-view",
                      {
                        key: (e.order_id || "g") + "_" + (e.goods_id || i),
                        staticClass: "v_one",
                        class: { sold_out: 2 == e.is_order },
                      },
                      [
                        n(
                          "v-uni-view",
                          {
                            staticClass: "img_box",
                            on: {
                              click: function (i) {
                                ((arguments[0] = i = t.$handleEvent(i)),
                                  t.goGoodsDetail(e));
                              },
                            },
                          },
                          [
                            n("v-uni-image", {
                              staticClass: "v_img",
                              attrs: {
                                src: t.getGoodsImage(e),
                                mode: "aspectFit",
                                "lazy-load": !0,
                              },
                            }),
                          ],
                          1,
                        ),
                        n(
                          "v-uni-view",
                          { staticClass: "v_two" },
                          [
                            n("v-uni-view", { staticClass: "goods_name" }, [
                              t._v(t._s(e.goods_name)),
                            ]),
                            n(
                              "v-uni-view",
                              { staticClass: "goods_bottom" },
                              [
                                n(
                                  "v-uni-view",
                                  { staticClass: "goods_price" },
                                  [t._v("￥" + t._s(e.goods_min_price))],
                                ),
                                2 == e.is_order
                                  ? n(
                                      "v-uni-view",
                                      { staticClass: "goods_status sold" },
                                      [t._v("已售罄")],
                                    )
                                  : 1 == e.is_order
                                    ? n(
                                        "v-uni-view",
                                        { staticClass: "goods_status waiting" },
                                        [t._v("等待抢购")],
                                      )
                                    : t.isSessionEnded
                                      ? n(
                                          "v-uni-view",
                                          { staticClass: "goods_status ended" },
                                          [t._v("已结束")],
                                        )
                                      : t.canBuyNow
                                        ? n(
                                            "v-uni-view",
                                            {
                                              staticClass:
                                                "goods_status buying",
                                              on: {
                                                click: function (n) {
                                                  ((arguments[0] = n =
                                                    t.$handleEvent(n)),
                                                    t.open_goDetail(
                                                      e.goods_id,
                                                      e.order_id,
                                                      e.is_order,
                                                      i,
                                                    ));
                                                },
                                              },
                                            },
                                            [t._v("立即抢购")],
                                          )
                                        : n(
                                            "v-uni-view",
                                            {
                                              staticClass:
                                                "goods_status waiting",
                                            },
                                            [t._v("等待抢购")],
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
                  }),
                  1,
                )
              : t._e(),
            0 == t.listData.length
              ? n(
                  "v-uni-view",
                  { staticClass: "noList" },
                  [
                    n("v-uni-image", {
                      staticClass: "noimg",
                      attrs: { src: i("4584") },
                    }),
                  ],
                  1,
                )
              : t._e(),
            t.payflag1
              ? n(
                  "v-uni-view",
                  {
                    staticClass: "confirm_mask",
                    on: {
                      click: function (e) {
                        if (e.target !== e.currentTarget) return null;
                        ((arguments[0] = e = t.$handleEvent(e)),
                          (t.payflag1 = !1));
                      },
                    },
                  },
                  [
                    n(
                      "v-uni-view",
                      { staticClass: "confirm_dialog" },
                      [
                        n("v-uni-view", { staticClass: "confirm_text" }, [
                          t._v("确认是否抢购此商品"),
                        ]),
                        n(
                          "v-uni-view",
                          { staticClass: "confirm_btns" },
                          [
                            n(
                              "v-uni-view",
                              {
                                staticClass: "confirm_btn cancel",
                                on: {
                                  click: function (e) {
                                    ((arguments[0] = e = t.$handleEvent(e)),
                                      (t.payflag1 = !1));
                                  },
                                },
                              },
                              [t._v("取消")],
                            ),
                            n(
                              "v-uni-view",
                              {
                                staticClass: "confirm_btn sure",
                                on: {
                                  click: function (e) {
                                    ((arguments[0] = e = t.$handleEvent(e)),
                                      t.goDetail.apply(void 0, arguments));
                                  },
                                },
                              },
                              [t._v("确认")],
                            ),
                          ],
                          1,
                        ),
                      ],
                      1,
                    ),
                  ],
                  1,
                )
              : t._e(),
            t.centre
              ? n(
                  "v-uni-view",
                  {
                    staticClass: "success_mask",
                    on: {
                      click: function (e) {
                        ((arguments[0] = e = t.$handleEvent(e)),
                          t.closeCentre.apply(void 0, arguments));
                      },
                    },
                  },
                  [
                    n(
                      "v-uni-view",
                      {
                        staticClass: "success_dialog",
                        on: {
                          click: function (e) {
                            ((arguments[0] = e = t.$handleEvent(e)),
                              t.closeCentre.apply(void 0, arguments));
                          },
                        },
                      },
                      [
                        n("v-uni-image", {
                          staticClass: "success_img",
                          attrs: { src: i("4b21"), mode: "widthFix" },
                        }),
                      ],
                      1,
                    ),
                  ],
                  1,
                )
              : t._e(),
          ],
          1,
        );
      },
      o = [];
  },
  cb00: function (t, e, i) {
    "use strict";
    var n;
    (i.d(e, "b", function () {
      return a;
    }),
      i.d(e, "c", function () {
        return o;
      }),
      i.d(e, "a", function () {
        return n;
      }));
    var a = function () {
        var t = this,
          e = t.$createElement,
          i = t._self._c || e;
        return i(
          "v-uni-view",
          {
            staticClass: "uni-load-more",
            on: {
              click: function (e) {
                ((arguments[0] = e = t.$handleEvent(e)),
                  t.onClick.apply(void 0, arguments));
              },
            },
          },
          [
            !t.webviewHide &&
            ("circle" === t.iconType ||
              ("auto" === t.iconType && "android" === t.platform)) &&
            "loading" === t.status &&
            t.showIcon
              ? i(
                  "svg",
                  {
                    staticClass:
                      "uni-load-more__img uni-load-more__img--android-H5",
                    style: {
                      width: t.iconSize + "px",
                      height: t.iconSize + "px",
                    },
                    attrs: {
                      width: "24",
                      height: "24",
                      viewBox: "25 25 50 50",
                    },
                  },
                  [
                    i("circle", {
                      style: { color: t.color },
                      attrs: {
                        cx: "50",
                        cy: "50",
                        r: "20",
                        fill: "none",
                        "stroke-width": 3,
                      },
                    }),
                  ],
                )
              : !t.webviewHide && "loading" === t.status && t.showIcon
                ? i(
                    "v-uni-view",
                    {
                      staticClass:
                        "uni-load-more__img uni-load-more__img--ios-H5",
                      style: {
                        width: t.iconSize + "px",
                        height: t.iconSize + "px",
                      },
                    },
                    [
                      i("v-uni-image", {
                        attrs: {
                          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZV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",
                          mode: "widthFix",
                        },
                      }),
                    ],
                    1,
                  )
                : t._e(),
            i(
              "v-uni-text",
              { staticClass: "uni-load-more__text", style: { color: t.color } },
              [
                t._v(
                  t._s(
                    "more" === t.status
                      ? t.contentText.contentdown
                      : "loading" === t.status
                        ? t.contentText.contentrefresh
                        : t.contentText.contentnomore,
                  ),
                ),
              ],
            ),
          ],
          1,
        );
      },
      o = [];
  },
  ec31: function (t, e, i) {
    "use strict";
    var n = i("4ea4");
    (i("8e6e"),
      Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      i("55dd"));
    var a = n(i("ade3"));
    i("456d");
    var o = n(i("53ca"));
    (i("ac6a"), i("7514"), i("fca0"), i("c5f6"));
    var r = n(i("09c2")),
      s = n(i("205c"));
    function d(t, e) {
      var i = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        (e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          i.push.apply(i, n));
      }
      return i;
    }
    function c(t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? d(Object(i), !0).forEach(function (e) {
              (0, a.default)(t, e, i[e]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
            : d(Object(i)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(i, e),
                );
              });
      }
      return t;
    }
    e.default = {
      components: { uniLoadMore: r.default, jpCoded: s.default },
      data: function () {
        return {
          timeinfo: "",
          listData: [],
          allListData: [],
          fid: 0,
          sid: 0,
          centre: !1,
          showAll: !1,
          loadStatus: "more",
          showNoList: !1,
          pageInfo: { page: 1, per_page: 10, total_page: 1, total: 0 },
          total_page: 1,
          timestamp: 0,
          timestamp1: 0,
          current: 1,
          sortType: "default",
          payflag: !1,
          payflag1: !1,
          paymmflag: !1,
          zhifuflag: !1,
          zhuanpaiinfo: {},
          codes: "",
          numberpwd: "",
          choosenum: 0,
          chushi: 1,
          goods_id: "",
          order_id: "",
          is_order: "",
          index: "",
          pagelist: "",
          canShowGoodsBeforeOpen: !0,
          preOpenRefreshTimer: null,
          previewMinutes: 40,
          remainSeconds: 0,
          countdownTimer: null,
          showCenterCountdown: !1,
          sessionStartTime: 0,
          sessionBuyStart: 0,
          serverOffsetMs: 0,
          serverTimeSynced: !1,
          liveNowSec: 0,
          liveNowTicker: null,
          buyStartTime: 0,
          countdownTargetSec: 0,
          dataLoading: !1,
          restDataTimer: null,
          lastRestAt: 0,
          countdownTick: 0,
          timeSyncRequesting: !1,
          openingHandled: !1,
          softSyncTimer: null,
          prefetchDone: !1,
        };
      },
      computed: {
        countdownDisplay: function () {
          var t = this.getBuyCountdownLeft(),
            e = Math.floor(t / 3600),
            i = Math.floor((t % 3600) / 60),
            n = t % 60,
            a = function (t) {
              return t < 10 ? "0" + t : "" + t;
            };
          return a(e) + " : " + a(i) + " : " + a(n);
        },
        canBuyNow: function () {
          var t = this.getBuyCountdownLeft();
          if (t > 0) return !1;
          if (this.showCenterCountdown) return !1;
          var e = this.getLiveNowSec(),
            i = this.getBuyStartTime(),
            n = Number(this.timeinfo && this.timeinfo.end_time) || 0;
          return n > e && e >= i && i > 0;
        },
        isSessionEnded: function () {
          var t = this.getLiveNowSec(),
            e = Number(this.timeinfo && this.timeinfo.end_time) || 0;
          return !(e > t);
        },
        remainGrabCount: function () {
          var t = this.listData || [];
          return t.filter(function (t) {
            return t && 2 !== Number(t.is_order);
          }).length;
        },
      },
      watch: {
        remainGrabCount: function (t) {
          var e = Number(t) || 0;
          uni.setNavigationBarTitle({
            title: e > 0 ? "抢购 " + e + "条" : "抢购",
          });
        },
      },
      onBackPress: function (t) {
        return "navigateBack" !== t.from && (this.testBack(), !0);
      },
      onLoad: function (t) {
        ((this.fid = t.fid),
          (this.sid = t.sid),
          (this.previewMinutes = this.normalizePreviewMinutes(
            t.preview_minutes,
            this.previewMinutes,
          )),
          (this.sessionBuyStart =
            Number(t.session_buy_start) || Number(t.session_start) || 0),
          (this.sessionStartTime = Number(t.session_start) || 0),
          this.getPreviewMinutesFromLootList());
      },
      onNavigationBarButtonTap: function (t) {
        window.location.reload();
      },
      onPullDownRefresh: function () {
        this.restData();
      },
      onShow: function () {
        ((this.chushi = 1),
          (this.payflag = !1),
          (this.paymmflag = !1),
          (this.zhifuflag = !1),
          this.serverTimeSynced && this.startLiveNowTicker(),
          this.restData(),
          window.addEventListener("popstate", this.testBack));
      },
      onUnload: function () {
        var t = this;
        (this.clearPreOpenRefreshTimer(),
          this.clearCountdownTimer(),
          this.clearRestDataTimer(),
          this.clearSoftSyncTimer(),
          this.stopLiveNowTicker(),
          setTimeout(function () {
            window.removeEventListener("popstate", t.testBack);
          }, 300));
      },
      onHide: function () {
        (this.clearPreOpenRefreshTimer(),
          this.clearCountdownTimer(),
          this.clearRestDataTimer(),
          this.clearSoftSyncTimer(),
          this.stopLiveNowTicker(),
          window.removeEventListener("popstate", this.testBack));
      },
      methods: {
        getBuyStartTime: function () {
          var t = Number(this.timeinfo && this.timeinfo.start_buy_time);
          if (Number.isFinite(t) && t > 0) return t;
          var e = Number(this.buyStartTime);
          if (Number.isFinite(e) && e > 0) return e;
          var i = Number(this.sessionBuyStart);
          return Number.isFinite(i) && i > 0 ? i : 0;
        },
        getBuyCountdownLeft: function () {
          var t = Number(this.countdownTargetSec) || this.getBuyStartTime();
          if (!t) return 0;
          var e =
            (this.serverTimeSynced && Number(this.liveNowSec)) ||
            this.getLiveNowSec();
          return Math.max(0, Math.floor(t - e));
        },
        startLiveNowTicker: function () {
          var t = this;
          (this.stopLiveNowTicker(),
            this.serverTimeSynced &&
              (this.liveNowTicker = setInterval(function () {
                t.liveNowSec = t.getLiveNowSec();
              }, 1e3)));
        },
        stopLiveNowTicker: function () {
          this.liveNowTicker &&
            (clearInterval(this.liveNowTicker), (this.liveNowTicker = null));
        },
        syncServerTime: function (t) {
          var e = Number(t);
          !Number.isFinite(e) ||
            e <= 0 ||
            ((this.serverOffsetMs = 1e3 * e - Date.now()),
            (this.liveNowSec = e),
            (this.serverTimeSynced = !0),
            this.startLiveNowTicker());
        },
        getLiveNowSec: function () {
          return this.serverTimeSynced
            ? Math.floor((Date.now() + this.serverOffsetMs) / 1e3)
            : Number(this.timeinfo && this.timeinfo.new_time) ||
                Math.floor(Date.now() / 1e3);
        },
        normalizePreviewMinutes: function (t, e) {
          var i = Number(t);
          return Number.isFinite(i) && i >= 0 ? i : e;
        },
        getPreviewMinutesFromLootList: function () {
          var t = this;
          this.request("/goods/getLootList").then(function (e) {
            if (e && e.data && 1 == e.data.code) {
              var i = (e.data.data && e.data.data.list) || [],
                n = i.find(function (e) {
                  return (
                    String(e.time_list && e.time_list.specialarea_id) ===
                    String(t.fid)
                  );
                }),
                a = n && n.time_list && n.time_list.time;
              a &&
                null != a.preview_minutes &&
                ((t.previewMinutes = t.normalizePreviewMinutes(
                  a.preview_minutes,
                  t.previewMinutes,
                )),
                t.updateGoodsVisibleByOpenTime(),
                t.applySortAndPagination());
            }
          });
        },
        refreshPage: function () {
          this.restData(!1);
        },
        timeEnd: function () {
          var t = this;
          this.openingHandled ||
            ((this.openingHandled = !0),
            (this.showCenterCountdown = !1),
            (this.remainSeconds = 0),
            (this.liveNowSec = this.getLiveNowSec()),
            this.allListData && this.allListData.length > 0
              ? this.scheduleSoftSyncSold(400 + Math.floor(800 * Math.random()))
              : setTimeout(
                  function () {
                    t.restData(!0);
                  },
                  200 + Math.floor(600 * Math.random()),
                ));
        },
        closeCentre: function () {
          this.centre = !1;
        },
        clearSoftSyncTimer: function () {
          this.softSyncTimer &&
            (clearTimeout(this.softSyncTimer), (this.softSyncTimer = null));
        },
        scheduleSoftSyncSold: function (t) {
          var e = this;
          (this.clearSoftSyncTimer(),
            (this.softSyncTimer = setTimeout(
              function () {
                ((e.softSyncTimer = null), e.softSyncSoldStatus());
              },
              Math.max(0, Number(t) || 0),
            )));
        },
        softSyncSoldStatus: function () {
          var t = this;
          this.dataLoading ||
            this.timeSyncRequesting ||
            this.request("/loodgoods/getCategoryGoodsList", {
              specialarea_type: this.sid,
              specialarea_id: this.fid,
              page: 1,
            }).then(function (e) {
              if (e && e.data && 1 == e.data.code) {
                var i = e.data.data || {},
                  n = i.time_info || {};
                if (n.new_time) {
                  ((t.timeinfo = Object.assign({}, t.timeinfo || {}, n)),
                    t.syncServerTime(n.new_time));
                  var a =
                    Number(n.start_buy_time) || Number(t.buyStartTime) || 0;
                  a > 0 && ((t.buyStartTime = a), (t.countdownTargetSec = a));
                }
                var o = t.extractGoodsListAndMeta(i),
                  r = o.items;
                if (r && r.length) {
                  var s = {};
                  r.forEach(function (t) {
                    var e =
                      (t.order_id ? "o" + t.order_id : "") +
                      "_g" +
                      (t.goods_id || "");
                    ((s[e] = t.is_order),
                      null != t.goods_id && (s["g" + t.goods_id] = t.is_order));
                  });
                  var d = function (e) {
                      for (var i = !1, n = 0; n < e.length; n++) {
                        var a = e[n];
                        if (a) {
                          var o =
                              (a.order_id ? "o" + a.order_id : "") +
                              "_g" +
                              (a.goods_id || ""),
                            r = s[o];
                          (void 0 === r &&
                            null != a.goods_id &&
                            (r = s["g" + a.goods_id]),
                            void 0 !== r &&
                              2 !== Number(a.is_order) &&
                              Number(a.is_order) !== Number(r) &&
                              (t.$set(e[n], "is_order", r), (i = !0)));
                        }
                      }
                      return i;
                    },
                    c = d(t.allListData),
                    l = d(t.listData);
                  (c || l) && t.applySortAndPagination();
                }
              }
            });
        },
        markItemSold: function (t, e, i) {
          var n = this,
            a = null != e ? e : this.listData[t] && this.listData[t].goods_id,
            o = null != i ? i : this.listData[t] && this.listData[t].order_id,
            r = function (t) {
              return (
                !!t &&
                ((null != o && "" !== o && String(t.order_id) === String(o)) ||
                  (null != a && "" !== a && String(t.goods_id) === String(a)))
              );
            },
            s = !1;
          (this.allListData.forEach(function (t, e) {
            r(t) && (n.$set(n.allListData[e], "is_order", 2), (s = !0));
          }),
            this.listData.forEach(function (t, e) {
              r(t) && (n.$set(n.listData[e], "is_order", 2), (s = !0));
            }),
            !s &&
              Number.isFinite(Number(t)) &&
              Number(t) >= 0 &&
              (this.listData[t] && this.$set(this.listData[t], "is_order", 2),
              this.allListData[t] &&
                this.$set(this.allListData[t], "is_order", 2)),
            this.applySortAndPagination());
        },
        testBack: function () {
          uni.switchTab({ url: "/pages/loot/loot" });
        },
        findConsignmentMemberName: function (t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          if (!t || "object" !== (0, o.default)(t) || e > 4) return "";
          var i = t.consignment_member_name;
          if (null != i && "" !== String(i).trim()) return String(i).trim();
          if (
            "string" === typeof t.consignment_member &&
            t.consignment_member.trim()
          )
            return t.consignment_member.trim();
          if (
            t.consignment_member &&
            "object" === (0, o.default)(t.consignment_member)
          ) {
            var n =
              t.consignment_member.member_name ||
              t.consignment_member.member_nickName ||
              t.consignment_member.nickName ||
              t.consignment_member.name;
            if (n) return String(n).trim();
          }
          for (var a = 0, r = Object.keys(t); a < r.length; a++) {
            var s = r[a],
              d = t[s];
            if (null != d && "" !== d && /consignment.*member.*name/i.test(s))
              return String(d).trim();
          }
          for (var c = 0, l = Object.keys(t); c < l.length; c++) {
            var u = l[c],
              f = t[u];
            if (f && "object" === (0, o.default)(f)) {
              var h = this.findConsignmentMemberName(f, e + 1);
              if (h) return h;
            }
          }
          return "";
        },
        getConsignmentMemberName: function (t) {
          return this.findConsignmentMemberName(t);
        },
        goGoodsDetail: function (t) {
          if (2 != t.is_order) {
            var e = this.getConsignmentMemberName(t),
              i = c(
                c({}, t),
                {},
                {
                  _detailFrom: "lootList",
                  consignment_member_name: e,
                  image: t.goods_image,
                  goods_price: t.goods_min_price,
                },
              );
            (uni.setStorageSync("warehouse_goods_detail", i),
              uni.setStorageSync("warehouse_goods_detail_from", "lootList"),
              e
                ? uni.setStorageSync("loot_goods_consignment_member_name", e)
                : uni.removeStorageSync("loot_goods_consignment_member_name"));
            var n =
              "/pages/order/goodsDetail?order_id=" +
              (t.order_id || "") +
              "&goods_id=" +
              (t.goods_id || "") +
              "&detailFrom=lootList";
            (e && (n += "&ownerName=" + encodeURIComponent(e)),
              uni.navigateTo({ url: n }));
          }
        },
        open_goDetail: function (t, e, i, n) {
          var item = this.listData[n];
          if (item && item.auction) {
            uni.navigateTo({ url: "/pages/loot/lootdet?id=" + item.goods_id });
            return;
          }
          this.showCenterCountdown && Number(this.remainSeconds) > 0
            ? this.$tip("未到开抢时间")
            : this.canBuyNow
              ? ((this.payflag1 = !0),
                (this.goods_id = t),
                (this.order_id = e),
                (this.is_order = i),
                (this.index = n))
              : this.$tip("未到开抢时间");
        },
        goDetail: function () {
          var t = this;
          1 == this.chushi &&
            ((this.chushi = 2),
            (this.choosenum = this.index),
            0 == this.is_order &&
              this.request("/goods/getPurchaseNum", {
                order_id: this.order_id,
                goods_id: this.goods_id,
                specialarea_id: this.fid,
              })
                .then(function (e) {
                  1 == e.data.code
                    ? (uni.showLoading({ title: "抢购中" }),
                      t
                        .request("/order/toAddOrder", {
                          order_id: t.listData[t.choosenum].order_id,
                          total_num: 1,
                          total_price: t.listData[t.choosenum].goods_min_price,
                          goods_id: t.listData[t.choosenum].goods_id,
                        })
                        .then(function (e) {
                          if ((uni.hideLoading(), 1 == e.data.code)) {
                            ((t.zhifuflag = !1),
                              (t.payflag1 = !1),
                              (t.chushi = 1));
                            var i = t.listData[t.choosenum] || {};
                            (t.markItemSold(
                              t.choosenum,
                              i.goods_id,
                              i.order_id,
                            ),
                              uni.showToast({
                                title: "抢购成功",
                                icon: "success",
                                duration: 800,
                              }),
                              t.scheduleSoftSyncSold(500));
                          } else
                            ((t.chushi = 1),
                              (t.payflag1 = !1),
                              t.$tip(e.data.msg));
                        })
                        .catch(function () {
                          (uni.hideLoading(),
                            (t.chushi = 1),
                            (t.payflag1 = !1));
                        }))
                    : 0 == e.data.code
                      ? ((t.chushi = 1),
                        t.$tip(e.data.data),
                        (t.payflag1 = !1),
                        setTimeout(function () {
                          uni.navigateTo({ url: "/pages/order/skmlist" });
                        }, 500))
                      : ((t.chushi = 1), (t.payflag1 = !1), t.$tip(e.data.msg));
                })
                .catch(function () {
                  ((t.chushi = 1), (t.payflag1 = !1), uni.hideLoading());
                }));
        },
        gopay: function () {
          var t = this;
          this.request("/member/getIsPayPassword").then(function (e) {
            1 == e.data.code
              ? ((t.payflag = !1),
                0 == e.data.data ? (t.paymmflag = !0) : (t.zhifuflag = !0))
              : t.$tip(e.data.msg);
          });
        },
        inputVal: function (t) {
          this.numberpwd = t;
        },
        nopaymoney: function () {
          this.zhifuflag = !this.zhifuflag;
        },
        toOpen: function () {},
        noshezhi: function () {
          this.paymmflag = !this.paymmflag;
        },
        payyemoney: function () {
          var t = this;
          this.request("/member/verificationPayPassword", {
            pwd: this.numberpwd,
          }).then(function (e) {
            if (1 == e.data.code)
              if (1 == e.data.data) {
                uni.showLoading({ title: "支付中" });
                var i = Math.floor(1e3 * Math.random()) + 1e3;
                setTimeout(function () {
                  t.request("/order/toAddOrder", {
                    order_id: t.listData[t.choosenum].order_id,
                    total_num: 1,
                    total_price: t.listData[t.choosenum].goods_min_price,
                    goods_id: t.listData[t.choosenum].goods_id,
                  }).finally(function () { uni.hideLoading(); }).then(function (e) {
                    1 == e.data.code
                      ? ((t.zhifuflag = !1),
                        uni.reLaunch({ url: "/pages/order/order" }))
                      : t.$tip(e.data.msg);
                  }).catch(function () { t.$tip('订单结果未确认，请重试'); });
                }, i);
              } else t.$tip(e.data.msg);
            else t.$tip(e.data.msg);
          });
        },
        restData: function () {
          var t = this,
            e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          this.restDataTimer &&
            (clearTimeout(this.restDataTimer), (this.restDataTimer = null));
          var i = e ? 280 : 80;
          this.restDataTimer = setTimeout(function () {
            ((t.restDataTimer = null), t.doRestData(!!e));
          }, i);
        },
        doRestData: function (t) {
          var e = Date.now(),
            i = t ? 900 : 400;
          if (!this.dataLoading && !(e - this.lastRestAt < i)) {
            if (
              t &&
              this.openingHandled &&
              this.allListData &&
              this.allListData.length > 0
            )
              return ((this.lastRestAt = e), void this.softSyncSoldStatus());
            ((this.lastRestAt = e),
              t || (this.sortType = "default"),
              (this.pageInfo.page = 1),
              (this.total_page = 1),
              this.getData(t));
          }
        },
        clearRestDataTimer: function () {
          this.restDataTimer &&
            (clearTimeout(this.restDataTimer), (this.restDataTimer = null));
        },
        extractGoodsListAndMeta: function (t) {
          var e = t && t.list,
            i = this.pageInfo.per_page || 10;
          if (Array.isArray(e))
            return {
              items: e,
              lastPage: Number(t.last_page) || Number(t.total_page) || 0,
              perPage: Number(t.per_page) || i,
              total: Number(t.total) || e.length,
            };
          if (e && "object" === (0, o.default)(e)) {
            var n = Array.isArray(e.data)
              ? e.data
              : Array.isArray(e.list)
                ? e.list
                : [];
            return {
              items: n,
              lastPage: Number(e.last_page) || Number(e.total_page) || 0,
              perPage: Number(e.per_page) || i,
              total: Number(e.total) || n.length,
            };
          }
          return { items: [], lastPage: 1, perPage: i, total: 0 };
        },
        fetchAllGoodsPages: function (t, e, i) {
          var n = this;
          return this.request("/loodgoods/getCategoryGoodsList", {
            specialarea_type: this.sid,
            specialarea_id: this.fid,
            page: t,
          }).then(function (a) {
            if (1 != a.data.code) return { items: e, firstData: i };
            var o = a.data.data || {},
              r = i || o,
              s = n.extractGoodsListAndMeta(o),
              d = s.items,
              c = s.lastPage,
              l = s.perPage;
            l > 0 && (n.pageInfo.per_page = l);
            var u = e.concat(d),
              f = 0 === d.length || d.length < l,
              h = c > 0 && t >= c;
            return f || h
              ? { items: u, firstData: r }
              : n.fetchAllGoodsPages(t + 1, u, r);
          });
        },
        applyTimeCountdown: function () {
          var t = this,
            e = Number(this.timeinfo.end_time) || 0,
            i =
              Number(this.timeinfo.start_buy_time) ||
              Number(this.sessionBuyStart) ||
              0;
          ((this.buyStartTime = i),
            (this.countdownTargetSec = i),
            this.syncServerTime(this.timeinfo.new_time));
          var n = this.getLiveNowSec();
          this.liveNowSec = n;
          var a = Math.floor(i - n),
            o = Math.floor(e - n);
          a <= 0 && o > 0
            ? ((t.timestamp = 0), (t.timestamp1 = 0), t.startCenterCountdown(0))
            : a > 0
              ? ((t.timestamp = a),
                (t.timestamp1 = a),
                t.startCenterCountdown(a))
              : ((t.timestamp = 0),
                (t.timestamp1 = 0),
                t.startCenterCountdown(0));
        },
        recalibrateFromServer: function () {
          var t = this;
          this.timeSyncRequesting ||
            this.dataLoading ||
            ((this.timeSyncRequesting = !0),
            this.request("/loodgoods/getCategoryGoodsList", {
              specialarea_type: this.sid,
              specialarea_id: this.fid,
              page: 1,
            })
              .then(function (e) {
                if (e && e.data && 1 == e.data.code) {
                  var i = (e.data.data && e.data.data.time_info) || {};
                  if (i.new_time) {
                    ((t.timeinfo = Object.assign({}, t.timeinfo || {}, i)),
                      t.syncServerTime(i.new_time));
                    var n =
                      Number(i.start_buy_time) || Number(t.buyStartTime) || 0;
                    (n > 0 &&
                      ((t.buyStartTime = n), (t.countdownTargetSec = n)),
                      (t.liveNowSec = t.getLiveNowSec()));
                    var a = t.getBuyCountdownLeft();
                    ((t.remainSeconds = a),
                      (t.timestamp = a),
                      (t.timestamp1 = a),
                      a <= 0 && t.showCenterCountdown
                        ? ((t.showCenterCountdown = !1),
                          t.clearCountdownTimer(),
                          t.timeEnd())
                        : a <= 0 && !t.showCenterCountdown
                          ? (t.openingHandled = !0)
                          : a > 0 &&
                            ((t.showCenterCountdown = !0),
                            (t.openingHandled = !1)));
                  }
                }
              })
              .finally(function () {
                t.timeSyncRequesting = !1;
              }));
        },
        startCenterCountdown: function (t) {
          var e = this;
          this.clearCountdownTimer();
          var i = Math.max(0, Math.floor(Number(t) || 0));
          ((this.remainSeconds = i),
            (this.showCenterCountdown = i > 0),
            (this.countdownTick = 0),
            (this.prefetchDone = !1),
            i <= 0
              ? this.allListData &&
                this.allListData.length > 0 &&
                (this.openingHandled = !0)
              : ((this.openingHandled = !1),
                (this.countdownTimer = setInterval(function () {
                  (e.countdownTick++, (e.liveNowSec = e.getLiveNowSec()));
                  var t = e.getBuyCountdownLeft();
                  ((e.remainSeconds = t),
                    !e.prefetchDone &&
                      t > 0 &&
                      t <= 20 &&
                      ((e.prefetchDone = !0), e.schedulePrefetchBeforeOpen()));
                  var i = t <= 30 ? 5 : 15;
                  (e.countdownTick % i === 0 && e.recalibrateFromServer(),
                    t <= 0 &&
                      ((e.showCenterCountdown = !1),
                      e.clearCountdownTimer(),
                      e.timeEnd()));
                }, 1e3))));
        },
        schedulePrefetchBeforeOpen: function () {
          var t = this;
          this.allListData && this.allListData.length > 0
            ? this.scheduleSoftSyncSold(100 + Math.floor(400 * Math.random()))
            : this.dataLoading ||
              setTimeout(
                function () {
                  t.dataLoading || t.restData(!0);
                },
                Math.floor(500 * Math.random()),
              );
        },
        clearCountdownTimer: function () {
          this.countdownTimer &&
            (clearInterval(this.countdownTimer), (this.countdownTimer = null));
        },
        getData: function () {
          var t = this,
            e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          this.dataLoading ||
            ((this.dataLoading = !0),
            (this.loadStatus = "more"),
            e || uni.showLoading({ title: "加载中" }),
            this.fetchAllGoodsPages(1, [], null)
              .then(function (i) {
                var n = i.items,
                  a = i.firstData;
                if ((e || uni.hideLoading(), uni.stopPullDownRefresh(), a)) {
                  var o = a;
                  ((t.timeinfo = o.time_info || {}),
                    null != t.timeinfo.preview_minutes &&
                      (t.previewMinutes = t.normalizePreviewMinutes(
                        t.timeinfo.preview_minutes,
                        t.previewMinutes,
                      )),
                    t.updateGoodsVisibleByOpenTime(),
                    (t.allListData = n.map(function (t) {
                      return c(
                        c({}, t),
                        {},
                        { is_order: 2 == t.is_order ? 2 : t.is_order },
                      );
                    })),
                    (t.pageInfo.total = t.allListData.length),
                    t.applySortAndPagination(),
                    (t.showAll = !0),
                    (t.showNoList = !0),
                    t.applyTimeCountdown());
                }
              })
              .catch(function () {
                (e || uni.hideLoading(), uni.stopPullDownRefresh());
              })
              .finally(function () {
                t.dataLoading = !1;
              }));
        },
        getGoodsImage: function (t) {
          var e = (t && t.goods_image) || "";
          if (!e) return e;
          if (-1 !== e.indexOf("imageView2")) return e;
          var i = -1 !== e.indexOf("?") ? "&" : "?";
          return e + i + "imageView2/2/w/750/q/75";
        },
        updateGoodsVisibleByOpenTime: function () {
          var t = this,
            e = Number(this.timeinfo && this.timeinfo.new_time),
            i = Number(this.timeinfo && this.timeinfo.start_time);
          if (!Number.isFinite(e) || !Number.isFinite(i))
            return (
              (this.canShowGoodsBeforeOpen = !0),
              void this.clearPreOpenRefreshTimer()
            );
          var n = i - e,
            a = 60 * this.normalizePreviewMinutes(this.previewMinutes, 40);
          if (
            ((this.canShowGoodsBeforeOpen = n <= a),
            this.clearPreOpenRefreshTimer(),
            n > a)
          ) {
            var o = 1e3 * (n - a);
            this.preOpenRefreshTimer = setTimeout(function () {
              t.restData(!0);
            }, o);
          }
        },
        clearPreOpenRefreshTimer: function () {
          this.preOpenRefreshTimer &&
            (clearTimeout(this.preOpenRefreshTimer),
            (this.preOpenRefreshTimer = null));
        },
        applySortAndPagination: function () {
          if (this.canShowGoodsBeforeOpen) {
            var t = this.allListData.slice();
            ("asc" === this.sortType
              ? t.sort(function (t, e) {
                  return (
                    Number(t.goods_min_price || 0) -
                    Number(e.goods_min_price || 0)
                  );
                })
              : "desc" === this.sortType &&
                t.sort(function (t, e) {
                  return (
                    Number(e.goods_min_price || 0) -
                    Number(t.goods_min_price || 0)
                  );
                }),
              t.sort(function (t, e) {
                var i = 2 === Number(t.is_order) ? 1 : 0,
                  n = 2 === Number(e.is_order) ? 1 : 0;
                return i - n;
              }),
              (this.listData = t));
          } else this.listData = [];
        },
        changeSort: function (t) {
          this.sortType !== t &&
            ((this.sortType = t), this.applySortAndPagination());
        },
        back: function () {
          uni.switchTab({ url: "/pages/loot/loot" });
        },
        toPage: function (t) {
          uni.navigateTo({ url: t });
        },
      },
    };
  },
  fca0: function (t, e, i) {
    var n = i("5ca1"),
      a = i("7726").isFinite;
    n(n.S, "Number", {
      isFinite: function (t) {
        return "number" == typeof t && a(t);
      },
    });
  },
};
