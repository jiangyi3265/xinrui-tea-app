/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "002f": function (t, e, i) {
    "use strict";
    var a = i("96ce"),
      o = i.n(a);
    o.a;
  },
  "19cf": function (t, e, i) {
    "use strict";
    i.r(e);
    var a = i("5f7b"),
      o = i.n(a);
    for (var n in a)
      ["default"].indexOf(n) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return a[t];
          });
        })(n);
    e["default"] = o.a;
  },
  "1a17": function (t, e, i) {
    var a = i("7ddb");
    ("string" === typeof a && (a = [[t.i, a, ""]]),
      a.locals && (t.exports = a.locals));
    var o = i("4f06").default;
    o("add88bd8", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "1bcd": function (t, e, i) {
    "use strict";
    var a;
    (i.d(e, "b", function () {
      return o;
    }),
      i.d(e, "c", function () {
        return n;
      }),
      i.d(e, "a", function () {
        return a;
      }));
    var o = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "v-uni-view",
          { staticClass: "classify" },
          [
            a(
              "v-uni-view",
              { staticClass: "content clearfix" },
              [
                a(
                  "v-uni-view",
                  { staticClass: "box_left" },
                  t._l(t.categoryList, function (e, i) {
                    return a(
                      "v-uni-view",
                      {
                        key: e.category_id,
                        class: t.choosenumber == i ? "active" : "",
                        on: {
                          click: function (a) {
                            ((arguments[0] = a = t.$handleEvent(a)),
                              t.tabindex(i, e.category_id));
                          },
                        },
                      },
                      [a("v-uni-text"), t._v(t._s(e.name))],
                      1,
                    );
                  }),
                  1,
                ),
                a(
                  "v-uni-view",
                  { staticClass: "box_right clearfix" },
                  [
                    t.goodlist.length
                      ? a(
                          "v-uni-scroll-view",
                          {
                            staticClass: "detail_box",
                            attrs: { "scroll-y": "true" },
                            on: {
                              scrolltolower: function (e) {
                                ((arguments[0] = e = t.$handleEvent(e)),
                                  t.scrolltolower.apply(void 0, arguments));
                              },
                            },
                          },
                          [
                            a(
                              "v-uni-view",
                              { staticStyle: { width: "96.5%" } },
                              t._l(t.goodlist, function (e) {
                                return a(
                                  "v-uni-view",
                                  {
                                    key: e.goods_id,
                                    staticClass: "box_list clearfix",
                                    on: {
                                      click: function (i) {
                                        ((arguments[0] = i = t.$handleEvent(i)),
                                          t.toPage(
                                            "goodsdet?id=" + e.goods_id,
                                          ));
                                      },
                                    },
                                  },
                                  [
                                    a("v-uni-image", {
                                      attrs: { src: e.goods_image },
                                    }),
                                    a(
                                      "v-uni-view",
                                      { staticClass: "box_sml" },
                                      [
                                        a(
                                          "v-uni-view",
                                          { staticClass: "title" },
                                          [t._v(t._s(e.goods_name))],
                                        ),
                                        a(
                                          "v-uni-view",
                                          { staticClass: "box_bottom" },
                                          [
                                            a("v-uni-view", [
                                              t._v(
                                                "￥" +
                                                  t._s(e.goods_min_line_price),
                                              ),
                                            ]),
                                            a(
                                              "v-uni-view",
                                              [
                                                a("v-uni-view", [
                                                  t._v(
                                                    "￥" +
                                                      t._s(e.goods_min_price),
                                                  ),
                                                ]),
                                                a("v-uni-view", [
                                                  t._v(
                                                    t._s(e.goods_sales) +
                                                      "人付款",
                                                  ),
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
                                );
                              }),
                              1,
                            ),
                            t.showLoadMore
                              ? a(
                                  "v-uni-view",
                                  { staticClass: "uni-loadmore" },
                                  [t._v(t._s(t.loadMoreText))],
                                )
                              : t._e(),
                          ],
                          1,
                        )
                      : t._e(),
                    0 == t.goodlist.length
                      ? a(
                          "v-uni-view",
                          { staticClass: "nidata" },
                          [
                            a("v-uni-image", {
                              staticStyle: { width: "500rpx" },
                              attrs: { src: i("4584"), mode: "widthFix" },
                            }),
                          ],
                          1,
                        )
                      : t._e(),
                  ],
                  1,
                ),
              ],
              1,
            ),
            a("Footer", { attrs: { selected: "分类" } }),
          ],
          1,
        );
      },
      n = [];
  },
  "245d": function (t, e, i) {
    "use strict";
    var a;
    (i.d(e, "b", function () {
      return o;
    }),
      i.d(e, "c", function () {
        return n;
      }),
      i.d(e, "a", function () {
        return a;
      }));
    var o = function () {
        var t = this,
          e = t.$createElement,
          i = t._self._c || e;
        return i(
          "v-uni-view",
          { staticClass: "tarbar" },
          [
            i(
              "v-uni-view",
              {
                staticClass: ".tarbar-list",
                style: {
                  background: t.tabBar.backgroundColor,
                  color: t.tabBar.color,
                  "border-top":
                    "bottom" == t.tabBar.position
                      ? "1rpx solid " + t.tabBar.borderStyle
                      : 0,
                  "border-bottom":
                    "top" == t.tabBar.position
                      ? "1rpx solid " + t.tabBar.borderStyle
                      : 0,
                },
              },
              [
                i(
                  "v-uni-view",
                  { staticClass: "tarbar-list-ul" },
                  t._l(t.tabBar.list, function (e, a) {
                    return 10 == e.static
                      ? i(
                          "v-uni-view",
                          {
                            key: a,
                            staticClass: "tarbar-list-li",
                            staticStyle: { width: "25%" },
                            on: {
                              click: function (e) {
                                if (
                                  !e.type.indexOf("key") &&
                                  t._k(e.keyCode, "top", void 0, e.key, void 0)
                                )
                                  return null;
                                ((arguments[0] = e = t.$handleEvent(e)),
                                  t.setSelected(a));
                              },
                            },
                          },
                          [
                            [
                              i(
                                "v-uni-view",
                                { staticClass: "tarbar-list-li-icon" },
                                [
                                  i("v-uni-image", {
                                    attrs: {
                                      src:
                                        t.selected == e.text
                                          ? e.selectedIconPath
                                          : e.iconPath,
                                      mode: "",
                                    },
                                  }),
                                ],
                                1,
                              ),
                              i(
                                "v-uni-view",
                                {
                                  staticClass: "tarbar-list-li-name",
                                  style: {
                                    color:
                                      t.selected == e.text ? "#fa3534" : "",
                                  },
                                },
                                [t._v(t._s(e.text))],
                              ),
                            ],
                          ],
                          2,
                        )
                      : t._e();
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
      n = [];
  },
  "26c4": function (t, e, i) {
    var a = i("24fb");
    ((e = a(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.classify[data-v-2859cf42]{overflow:hidden;height:100%}.classify .content[data-v-2859cf42]{height:100%}.classify .content .box_left[data-v-2859cf42]{float:left;overflow-y:auto;width:%?188?%;height:100%;border-right:%?2?% solid #eee;text-align:center}.classify .content .box_left[data-v-2859cf42]::-webkit-scrollbar{display:none}.classify .content .box_left uni-view[data-v-2859cf42]{position:relative;padding:%?46?% 0;line-height:%?34?%;text-align:center}.classify .content .box_left uni-view[data-v-2859cf42]:last-of-type{padding-bottom:%?130?%}.classify .content .box_left uni-view.active[data-v-2859cf42]{color:#fa3534;font-weight:800}.classify .content .box_left uni-view.active uni-text[data-v-2859cf42]{position:absolute;left:0;width:%?8?%;height:%?34?%;background:#fa3534;border-radius:%?4?%}.classify .content .box_right[data-v-2859cf42]{float:left;width:calc(100% - %?190?%);height:100%}.classify .content .box_right .detail_box[data-v-2859cf42]{width:calc(100% + %?20?%);height:calc(100% - %?110?%)}.classify .content .box_right .box_list[data-v-2859cf42]{margin:%?30?% %?14?% 0}.classify .content .box_right .box_list[data-v-2859cf42]:last-of-type{margin-bottom:%?30?%}.classify .content .box_right .box_list > uni-image[data-v-2859cf42]{float:left;width:%?200?%;height:%?200?%;border-radius:%?10?%}.classify .content .box_right .box_list .box_sml[data-v-2859cf42]{float:left;width:calc(100% - %?218?%);height:%?200?%;border-bottom:%?2?% solid #eee;padding-bottom:%?30?%;margin-left:%?18?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;box-sizing:initial}.classify .content .box_right .box_list .box_sml .title[data-v-2859cf42]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;\n  /*! autoprefixer: off */-webkit-box-orient:vertical;\n  /* autoprefixer: on */font-size:%?28?%;margin-top:%?10?%;line-height:%?36?%}.classify .content .box_right .box_list .box_sml .box_bottom uni-view[data-v-2859cf42]{font-size:%?22?%;color:#999}.classify .content .box_right .box_list .box_sml .box_bottom > uni-view[data-v-2859cf42]:first-of-type{text-decoration:line-through}.classify .content .box_right .box_list .box_sml .box_bottom > uni-view[data-v-2859cf42]:last-of-type{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?6?%}.classify .content .box_right .box_list .box_sml .box_bottom > uni-view:last-of-type uni-view[data-v-2859cf42]:first-of-type{color:#fa3534;font-size:%?30?%;font-weight:800}',
        "",
      ]),
      (t.exports = e));
  },
  "2c2e": function (t, e, i) {
    "use strict";
    i.r(e);
    var a = i("1bcd"),
      o = i("f672");
    for (var n in o)
      ["default"].indexOf(n) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return o[t];
          });
        })(n);
    i("002f");
    var s,
      c = i("f0c5"),
      r = Object(c["a"])(
        o["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "2859cf42",
        null,
        !1,
        a["a"],
        s,
      );
    e["default"] = r.exports;
  },
  4584: function (t, e, i) {
    t.exports = i.p + "static/img/noimg.89728664.png";
  },
  "5f7b": function (t, e, i) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0));
    e.default = {
      components: {},
      props: ["selected", "carnum"],
      data: function () {
        return {
          tabBar: {
            color: "#A5A5A5",
            selectedColor: "#fa3534",
            borderStyle: "#eee",
            backgroundColor: "#fff",
            position: "bottom",
            list: [
              {
                pagePath: "/pages/index/index",
                iconPath: "../../static/images/tabbar/tab_home.png",
                selectedIconPath: "../../static/images/tabbar/tab_home_on.png",
                text: "首页",
                static: 10,
              },
              {
                pagePath: "/pages/loot/loot",
                iconPath: "../../static/images/tabbar/tab_capture.png",
                selectedIconPath:
                  "../../static/images/tabbar/tab_capture_on.png",
                text: "抢购",
                static: 10,
              },
              {
                pagePath: "/pages/order/order",
                iconPath: "../../static/images/tabbar/tab_store.png",
                selectedIconPath: "../../static/images/tabbar/tab_store_on.png",
                text: "仓库",
                static: 10,
              },
              {
                pagePath: "/pages/personal/personal",
                iconPath: "../../static/images/tabbar/tab_mine.png",
                selectedIconPath: "../../static/images/tabbar/tab_mine_on.png",
                text: "我的",
                static: 10,
              },
            ],
          },
          oldSelected: 0,
          isShowMask: !1,
          flag: "",
        };
      },
      created: function () {},
      methods: {
        showFotter: function () {
          var t = this;
          this.request("/index/getOpenNavigation").then(function (e) {
            (console.log(e),
              1 == e.data.code
                ? ((t.tabBar.list[0].static = e.data.data.index_open),
                  (t.tabBar.list[2].static = e.data.data.loot_open),
                  (t.tabBar.list[4].static = e.data.data.member_open))
                : t.$tip(e.data.msg));
          });
        },
        setSelected: function (t) {
          ("/pages/index/index" == this.tabBar.list[t].pagePath ||
          "/pages/classify/classify" == this.tabBar.list[t].pagePath ||
          "/pages/loot/loot" == this.tabBar.list[t].pagePath ||
          "/pages/order/order" == this.tabBar.list[t].pagePath ||
          "/pages/personal/personal" == this.tabBar.list[t].pagePath
            ? uni.switchTab({ url: this.tabBar.list[t].pagePath })
            : uni.redirectTo({ url: this.tabBar.list[t].pagePath }),
            this.$forceUpdate());
        },
        closeMask: function () {
          this.isShowMask = !1;
        },
      },
    };
  },
  "7ddb": function (t, e, i) {
    var a = i("24fb");
    ((e = a(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.logo[data-v-8e25e1ec]{text-align:center;margin:%?60?% 0 %?0?%;padding-bottom:%?160?%}.logo uni-image[data-v-8e25e1ec]{width:%?253?%;height:%?60?%}.carnumber[data-v-8e25e1ec]{position:absolute;border-radius:%?20?%;color:#fff;font-size:%?15?%;top:-10%;right:18%;background:#fa3534;background:#fa3534;width:%?30?%;height:%?30?%;line-height:%?30?%;text-align:center}.tarbar[data-v-8e25e1ec]{width:100%;z-index:99;position:fixed;bottom:0;left:0}.tarbar-list[data-v-8e25e1ec]{width:100%;height:%?98?%;background:#4d586f;position:fixed;left:0;bottom:0}.tarbar-list-ul[data-v-8e25e1ec]{width:100%;height:100%;padding:%?10?% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;box-sizing:border-box}.tarbar-list-li[data-v-8e25e1ec]{width:%?80?%;height:%?80?%;position:relative}.tarbar-list-li-icon[data-v-8e25e1ec]{text-align:center;height:%?50?%;margin:0 auto}.tarbar-list-li-icon uni-image[data-v-8e25e1ec]{width:%?44?%;height:%?44?%;margin-top:%?-4?%}.tarbar-list-li-name[data-v-8e25e1ec]{width:100%;text-align:center;line-height:%?30?%;font-size:%?22?%;height:%?30?%;color:#bfbfbf}.tarbar-list-li-center[data-v-8e25e1ec]{width:%?100?%}.tarbar-list-li-center .tarbar-list-li-icon[data-v-8e25e1ec],\n.tarbar-list-li-center .tarbar-list-li-icon uni-image[data-v-8e25e1ec]{width:%?90?%;height:%?60?%}',
        "",
      ]),
      (t.exports = e));
  },
  "96ce": function (t, e, i) {
    var a = i("26c4");
    ("string" === typeof a && (a = [[t.i, a, ""]]),
      a.locals && (t.exports = a.locals));
    var o = i("4f06").default;
    o("0964760c", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  c379: function (t, e, i) {
    "use strict";
    var a = i("4ea4");
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0));
    var o = a(i("e39f"));
    e.default = {
      data: function () {
        return {
          categoryList: [],
          choosenumber: 0,
          category_id: "",
          page: 1,
          last_page: 1,
          goodlist: [],
          loadMoreText: "加载中...",
          showLoadMore: !1,
          max: 0,
          shareInfo: {},
        };
      },
      onShareAppMessage: function () {
        return {
          title: this.shareInfo.title,
          path: "/pages/classify/classify",
        };
      },
      onLoad: function () {
        var t = this;
        ((this.page = 1),
          (this.goodlist = []),
          this.request("/goods/getCategory", { type: 2 }).then(function (e) {
            1 == e.data.code &&
              ((t.categoryList = e.data.data.categoryList),
              (t.category_id = e.data.data.categoryList[0].category_id),
              t.getinit());
          }),
          this.request("/index/getShareInfo").then(function (e) {
            1 == e.data.code && (t.shareInfo = e.data.data);
          }));
      },
      onUnload: function () {
        ((this.max = 0),
          (this.goodlist = []),
          (this.loadMoreText = "加载更多"),
          (this.showLoadMore = !1));
      },
      methods: {
        getinit: function () {
          var t = this;
          this.request("/category/getCategoryGoodsList", {
            category_id: this.category_id,
            page: this.page,
            product_types: 2,
          }).then(function (e) {
            1 == e.data.code &&
              ((t.goodlist = t.goodlist.concat(e.data.data.list.data)),
              (t.last_page = e.data.data.list.last_page));
          });
        },
        scrolltolower: function () {
          ((this.page = this.page + 1),
            this.page > this.last_page
              ? (this.loadMoreText = "没有更多数据了!")
              : ((this.showLoadMore = !0), this.getinit()));
        },
        tabindex: function (t, e) {
          ((this.choosenumber = t),
            (this.category_id = e),
            (this.page = 1),
            (this.goodlist = []),
            (this.loadMoreText = "加载更多"),
            (this.showLoadMore = !1),
            this.getinit());
        },
        toPage: function (t) {
          uni.navigateTo({ url: t });
        },
      },
      components: { Footer: o.default },
    };
  },
  e39f: function (t, e, i) {
    "use strict";
    i.r(e);
    var a = i("245d"),
      o = i("19cf");
    for (var n in o)
      ["default"].indexOf(n) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return o[t];
          });
        })(n);
    i("ea32");
    var s,
      c = i("f0c5"),
      r = Object(c["a"])(
        o["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "8e25e1ec",
        null,
        !1,
        a["a"],
        s,
      );
    e["default"] = r.exports;
  },
  ea32: function (t, e, i) {
    "use strict";
    var a = i("1a17"),
      o = i.n(a);
    o.a;
  },
  f672: function (t, e, i) {
    "use strict";
    i.r(e);
    var a = i("c379"),
      o = i.n(a);
    for (var n in a)
      ["default"].indexOf(n) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return a[t];
          });
        })(n);
    e["default"] = o.a;
  },
};
