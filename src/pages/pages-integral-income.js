/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "1bb2": function (t, e, i) {
    "use strict";
    i.r(e);
    var a = i("d5f3"),
      n = i.n(a);
    for (var o in a)
      ["default"].indexOf(o) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return a[t];
          });
        })(o);
    e["default"] = n.a;
  },
  "1d34": function (t, e, i) {
    "use strict";
    var a = i("3fa9"),
      n = i.n(a);
    n.a;
  },
  "2e08": function (t, e, i) {
    var a = i("9def"),
      n = i("9744"),
      o = i("be13");
    t.exports = function (t, e, i, r) {
      var s = String(o(t)),
        c = s.length,
        d = void 0 === i ? " " : String(i),
        l = a(e);
      if (l <= c || "" == d) return s;
      var f = l - c,
        b = n.call(d, Math.ceil(f / d.length));
      return (b.length > f && (b = b.slice(0, f)), r ? b + s : s + b);
    };
  },
  "3fa9": function (t, e, i) {
    var a = i("a00a");
    ("string" === typeof a && (a = [[t.i, a, ""]]),
      a.locals && (t.exports = a.locals));
    var n = i("4f06").default;
    n("58ee8157", a, !0, { sourceMap: !1, shadowMode: !1 });
  },
  4584: function (t, e, i) {
    t.exports = i.p + "static/img/noimg.89728664.png";
  },
  9744: function (t, e, i) {
    "use strict";
    var a = i("4588"),
      n = i("be13");
    t.exports = function (t) {
      var e = String(n(this)),
        i = "",
        o = a(t);
      if (o < 0 || o == 1 / 0) throw RangeError("Count can't be negative");
      for (; o > 0; (o >>>= 1) && (e += e)) 1 & o && (i += e);
      return i;
    };
  },
  a00a: function (t, e, i) {
    var a = i("24fb");
    ((e = a(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-72e94b56]{background:#f1f3fd}.income-page[data-v-72e94b56]{min-height:100vh;background:#f1f3fd;padding:0 %?18?% %?30?%;box-sizing:border-box}.date-filter[data-v-72e94b56]{height:%?96?%;margin:0 %?-18?%;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?34?%;color:#111}.date-placeholder[data-v-72e94b56]{color:#999}.date-arrow[data-v-72e94b56]{width:0;height:0;border-left:%?12?% solid transparent;border-right:%?12?% solid transparent;border-top:%?14?% solid #111;margin-left:%?12?%}.profit-card[data-v-72e94b56]{margin:%?40?% 0 %?36?%;padding:%?42?% %?40?%;height:%?294?%;background:#3478f6;border-radius:%?16?%;box-shadow:0 %?16?% %?26?% rgba(52,120,246,.25);box-sizing:border-box}.profit-title[data-v-72e94b56]{font-size:%?34?%;color:#fff;line-height:%?44?%}.profit-money[data-v-72e94b56]{font-size:%?58?%;font-weight:700;color:#fff;line-height:%?76?%;margin-top:%?34?%}.profit-item[data-v-72e94b56]{background:#fff;border-radius:%?16?%;padding:%?22?% %?26?% 0;margin-bottom:%?26?%;box-sizing:border-box;overflow:hidden}.item-head[data-v-72e94b56]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-bottom:%?26?%}.order-no[data-v-72e94b56]{font-size:%?34?%;font-weight:700;color:#000}.order-status[data-v-72e94b56]{font-size:%?30?%;font-weight:700;color:#ff8a00}.item-body[data-v-72e94b56]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.goods-img[data-v-72e94b56]{width:%?184?%;height:%?184?%;background:#f5f5f5;-webkit-flex-shrink:0;flex-shrink:0}.goods-info[data-v-72e94b56]{-webkit-box-flex:1;-webkit-flex:1;flex:1;min-width:0;margin-left:%?36?%}.goods-name[data-v-72e94b56]{font-size:%?36?%;font-weight:700;color:#162333;line-height:%?48?%;margin-bottom:%?18?%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.price-profit-row[data-v-72e94b56]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:stretch;-webkit-align-items:stretch;align-items:stretch;margin-bottom:%?20?%}.price-box[data-v-72e94b56],\n.profit-box[data-v-72e94b56]{-webkit-box-flex:1;-webkit-flex:1;flex:1;padding:%?10?% %?8?%;font-size:%?30?%;font-weight:700;line-height:%?42?%;box-sizing:border-box}.price-box[data-v-72e94b56]{background:#fff1f0;color:#ff3b30}.profit-box[data-v-72e94b56]{background:#e5f8f1;color:#00b875}.price-box uni-text[data-v-72e94b56],\n.profit-box uni-text[data-v-72e94b56]{display:block}.member-row[data-v-72e94b56]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?30?%;color:#8a3a2d;line-height:%?42?%}.member-row uni-text[data-v-72e94b56]{width:48%}.item-footer[data-v-72e94b56]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:%?90?%;margin-top:%?18?%;border-top:%?1?% solid #eee;font-size:%?28?%;color:#8a93a3}.buy-btn[data-v-72e94b56]{width:%?140?%;height:%?62?%;line-height:%?62?%;text-align:center;border-radius:%?28?% 0 0 %?28?%;background:#02c27a;color:#fff;font-size:%?30?%}.empty-box[data-v-72e94b56]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-top:%?160?%;color:#999;font-size:%?28?%}.empty-box uni-image[data-v-72e94b56]{width:%?280?%;height:%?220?%;margin-bottom:%?20?%}.uni-loadmore[data-v-72e94b56]{text-align:center;font-size:%?26?%;color:#999;padding:%?24?% 0}.date-mask[data-v-72e94b56]{position:fixed;left:0;right:0;top:0;bottom:0;z-index:999;background:rgba(0,0,0,.55);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.date-panel[data-v-72e94b56]{position:relative;width:100%;background:#fff;border-radius:%?16?% %?16?% 0 0;padding:%?46?% 0 %?38?%;box-sizing:border-box}.date-panel-title[data-v-72e94b56]{text-align:center;font-size:%?34?%;color:#333;line-height:%?48?%}.date-panel-close[data-v-72e94b56]{position:absolute;top:%?36?%;right:%?42?%;font-size:%?58?%;line-height:%?58?%;color:#8b919b}.month-switch[data-v-72e94b56]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;gap:%?34?%;margin-top:%?44?%;font-size:%?48?%;color:#8b919b;line-height:%?58?%}.current-month[data-v-72e94b56]{min-width:%?220?%;text-align:center;font-size:%?40?%;font-weight:700;color:#333}.week-row[data-v-72e94b56],\n.calendar-grid[data-v-72e94b56]{display:grid;grid-template-columns:repeat(7,1fr)}.week-row[data-v-72e94b56]{margin-top:%?44?%;padding:0 %?18?%;font-size:%?28?%;color:#555;text-align:center}.week-row uni-text[data-v-72e94b56]{height:%?46?%;line-height:%?46?%}.calendar-grid[data-v-72e94b56]{position:relative;padding:%?16?% 0 0}.calendar-grid[data-v-72e94b56]::after{content:attr(data-month)}.day-cell[data-v-72e94b56]{position:relative;height:%?70?%;font-size:%?32?%;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;box-sizing:border-box}.day-cell.empty[data-v-72e94b56]{pointer-events:none}.day-cell.in-range[data-v-72e94b56]{background:#e5efff;color:#2678ff}.day-cell.range-start[data-v-72e94b56],\n.day-cell.range-end[data-v-72e94b56]{background:#2f7bff;color:#fff;border-radius:%?6?%}.range-label[data-v-72e94b56]{font-size:%?18?%;line-height:%?22?%;color:inherit}.selected-range[data-v-72e94b56]{text-align:center;font-size:%?26?%;color:#8b919b;margin-top:%?46?%}.date-actions[data-v-72e94b56]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;gap:%?24?%;margin:%?26?% %?56?% 0}.date-reset[data-v-72e94b56]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?104?%;line-height:%?104?%;text-align:center;border-radius:%?56?%;background:#f2f4f8;color:#666;font-size:%?34?%}.date-confirm[data-v-72e94b56]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?104?%;line-height:%?104?%;text-align:center;border-radius:%?56?%;background:#2f7bff;color:#fff;font-size:%?36?%;font-weight:600}body.?%PAGE?%[data-v-72e94b56]{background:#f1f3fd}',
        "",
      ]),
      (t.exports = e));
  },
  b8aa: function (t, e, i) {
    "use strict";
    i.r(e);
    var a = i("ce13"),
      n = i("1bb2");
    for (var o in n)
      ["default"].indexOf(o) < 0 &&
        (function (t) {
          i.d(e, t, function () {
            return n[t];
          });
        })(o);
    i("1d34");
    var r,
      s = i("f0c5"),
      c = Object(s["a"])(
        n["default"],
        a["b"],
        a["c"],
        !1,
        null,
        "72e94b56",
        null,
        !1,
        a["a"],
        r,
      );
    e["default"] = c.exports;
  },
  ce13: function (t, e, i) {
    "use strict";
    var a;
    (i.d(e, "b", function () {
      return n;
    }),
      i.d(e, "c", function () {
        return o;
      }),
      i.d(e, "a", function () {
        return a;
      }));
    var n = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "v-uni-view",
          { staticClass: "income-page" },
          [
            a(
              "v-uni-view",
              {
                staticClass: "date-filter",
                on: {
                  click: function (e) {
                    ((arguments[0] = e = t.$handleEvent(e)),
                      t.openDatePicker.apply(void 0, arguments));
                  },
                },
              },
              [
                t.startDate && t.endDate
                  ? a("v-uni-text", [
                      t._v(t._s(t.startDate) + " - " + t._s(t.endDate)),
                    ])
                  : a("v-uni-text", { staticClass: "date-placeholder" }, [
                      t._v("全部"),
                    ]),
                a("v-uni-text", { staticClass: "date-arrow" }),
              ],
              1,
            ),
            a(
              "v-uni-view",
              { staticClass: "profit-card" },
              [
                a("v-uni-view", { staticClass: "profit-title" }, [
                  t._v("我的利润"),
                ]),
                a("v-uni-view", { staticClass: "profit-money" }, [
                  t._v("¥" + t._s(t.formatMoney(t.totalProfit))),
                ]),
              ],
              1,
            ),
            a(
              "v-uni-view",
              { staticClass: "profit-list" },
              t._l(t.rows, function (e, i) {
                return a(
                  "v-uni-view",
                  { key: i, staticClass: "profit-item" },
                  [
                    a(
                      "v-uni-view",
                      { staticClass: "item-head" },
                      [
                        a("v-uni-text", { staticClass: "order-no" }, [
                          t._v(t._s(t.getOrderNo(e))),
                        ]),
                        a("v-uni-text", { staticClass: "order-status" }, [
                          t._v(t._s(t.getStatusText(e))),
                        ]),
                      ],
                      1,
                    ),
                    a(
                      "v-uni-view",
                      { staticClass: "item-body" },
                      [
                        a("v-uni-image", {
                          staticClass: "goods-img",
                          attrs: {
                            src: t.getGoodsImage(e),
                            mode: "aspectFill",
                          },
                        }),
                        a(
                          "v-uni-view",
                          { staticClass: "goods-info" },
                          [
                            a("v-uni-view", { staticClass: "goods-name" }, [
                              t._v(t._s(t.getGoodsName(e))),
                            ]),
                            a(
                              "v-uni-view",
                              { staticClass: "price-profit-row" },
                              [
                                a(
                                  "v-uni-view",
                                  { staticClass: "price-box" },
                                  [
                                    a("v-uni-text", [t._v("价格:")]),
                                    a("v-uni-text", [
                                      t._v(
                                        t._s(t.formatMoney(t.getGoodsPrice(e))),
                                      ),
                                    ]),
                                  ],
                                  1,
                                ),
                                a(
                                  "v-uni-view",
                                  { staticClass: "profit-box" },
                                  [
                                    a("v-uni-text", [t._v("利润:")]),
                                    a("v-uni-text", [
                                      t._v(t._s(t.formatMoney(t.getProfit(e)))),
                                    ]),
                                  ],
                                  1,
                                ),
                              ],
                              1,
                            ),
                            a(
                              "v-uni-view",
                              { staticClass: "member-row" },
                              [
                                a("v-uni-text", [
                                  t._v("归属人: " + t._s(t.getOwnerName(e))),
                                ]),
                                a("v-uni-text", [
                                  t._v("购买人: " + t._s(t.getBuyerName(e))),
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
                    a(
                      "v-uni-view",
                      { staticClass: "item-footer" },
                      [
                        a("v-uni-text", [
                          t._v("下单时间: " + t._s(t.getOrderTime(e))),
                        ]),
                        a("v-uni-view", { staticClass: "buy-btn" }, [
                          t._v("买单"),
                        ]),
                      ],
                      1,
                    ),
                  ],
                  1,
                );
              }),
              1,
            ),
            0 != t.rows.length || t.loading
              ? t._e()
              : a(
                  "v-uni-view",
                  { staticClass: "empty-box" },
                  [
                    a("v-uni-image", {
                      attrs: { src: i("4584"), mode: "aspectFit" },
                    }),
                    a("v-uni-text", [t._v("暂无数据")]),
                  ],
                  1,
                ),
            t.rows.length > 0
              ? a("v-uni-view", { staticClass: "uni-loadmore" }, [
                  t._v(t._s(t.loadingText)),
                ])
              : t._e(),
            t.showDatePicker
              ? a(
                  "v-uni-view",
                  {
                    staticClass: "date-mask",
                    on: {
                      click: function (e) {
                        ((arguments[0] = e = t.$handleEvent(e)),
                          t.closeDatePicker.apply(void 0, arguments));
                      },
                    },
                  },
                  [
                    a(
                      "v-uni-view",
                      {
                        staticClass: "date-panel",
                        on: {
                          click: function (e) {
                            (e.stopPropagation(),
                              (arguments[0] = e = t.$handleEvent(e)));
                          },
                        },
                      },
                      [
                        a("v-uni-view", { staticClass: "date-panel-title" }, [
                          t._v("选择日期"),
                        ]),
                        a(
                          "v-uni-view",
                          {
                            staticClass: "date-panel-close",
                            on: {
                              click: function (e) {
                                ((arguments[0] = e = t.$handleEvent(e)),
                                  t.closeDatePicker.apply(void 0, arguments));
                              },
                            },
                          },
                          [t._v("×")],
                        ),
                        a(
                          "v-uni-view",
                          { staticClass: "month-switch" },
                          [
                            a(
                              "v-uni-text",
                              {
                                on: {
                                  click: function (e) {
                                    ((arguments[0] = e = t.$handleEvent(e)),
                                      t.changeMonth(-12));
                                  },
                                },
                              },
                              [t._v("«")],
                            ),
                            a(
                              "v-uni-text",
                              {
                                on: {
                                  click: function (e) {
                                    ((arguments[0] = e = t.$handleEvent(e)),
                                      t.changeMonth(-1));
                                  },
                                },
                              },
                              [t._v("‹")],
                            ),
                            a("v-uni-text", { staticClass: "current-month" }, [
                              t._v(
                                t._s(t.pickerYear) +
                                  "年" +
                                  t._s(t.pickerMonth) +
                                  "月",
                              ),
                            ]),
                            a(
                              "v-uni-text",
                              {
                                on: {
                                  click: function (e) {
                                    ((arguments[0] = e = t.$handleEvent(e)),
                                      t.changeMonth(1));
                                  },
                                },
                              },
                              [t._v("›")],
                            ),
                            a(
                              "v-uni-text",
                              {
                                on: {
                                  click: function (e) {
                                    ((arguments[0] = e = t.$handleEvent(e)),
                                      t.changeMonth(12));
                                  },
                                },
                              },
                              [t._v("»")],
                            ),
                          ],
                          1,
                        ),
                        a(
                          "v-uni-view",
                          { staticClass: "week-row" },
                          t._l(t.weeks, function (e) {
                            return a("v-uni-text", { key: e }, [t._v(t._s(e))]);
                          }),
                          1,
                        ),
                        a(
                          "v-uni-view",
                          { staticClass: "calendar-grid" },
                          t._l(t.calendarDays, function (e, i) {
                            return a(
                              "v-uni-view",
                              {
                                key: i,
                                staticClass: "day-cell",
                                class: t.getDayClass(e),
                                on: {
                                  click: function (i) {
                                    ((arguments[0] = i = t.$handleEvent(i)),
                                      t.selectDate(e));
                                  },
                                },
                              },
                              [
                                a("v-uni-text", [t._v(t._s(e.day || ""))]),
                                e.date === t.tempStartDate
                                  ? a(
                                      "v-uni-text",
                                      { staticClass: "range-label" },
                                      [t._v("开始")],
                                    )
                                  : t._e(),
                                e.date === t.tempEndDate
                                  ? a(
                                      "v-uni-text",
                                      { staticClass: "range-label" },
                                      [t._v("结束")],
                                    )
                                  : t._e(),
                              ],
                              1,
                            );
                          }),
                          1,
                        ),
                        a("v-uni-view", { staticClass: "selected-range" }, [
                          t._v(
                            t._s(t.tempStartDate || "请选择开始日期") +
                              "至" +
                              t._s(t.tempEndDate || "请选择结束日期"),
                          ),
                        ]),
                        a(
                          "v-uni-view",
                          { staticClass: "date-actions" },
                          [
                            a(
                              "v-uni-view",
                              {
                                staticClass: "date-reset",
                                on: {
                                  click: function (e) {
                                    ((arguments[0] = e = t.$handleEvent(e)),
                                      t.resetDateRange.apply(
                                        void 0,
                                        arguments,
                                      ));
                                  },
                                },
                              },
                              [t._v("查看全部")],
                            ),
                            a(
                              "v-uni-view",
                              {
                                staticClass: "date-confirm",
                                on: {
                                  click: function (e) {
                                    ((arguments[0] = e = t.$handleEvent(e)),
                                      t.confirmDateRange.apply(
                                        void 0,
                                        arguments,
                                      ));
                                  },
                                },
                              },
                              [t._v("确定")],
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
          ],
          1,
        );
      },
      o = [];
  },
  d5f3: function (t, e, i) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      i("fca0"),
      i("c5f6"),
      i("28a5"),
      i("f576"));
    e.default = {
      data: function () {
        return {
          pageIndex: 1,
          pageSize: 10,
          loadingText: "上拉加载更多...",
          rows: [],
          totalProfit: 0,
          startDate: "",
          endDate: "",
          loading: !1,
          finished: !1,
          showDatePicker: !1,
          pickerYear: 0,
          pickerMonth: 0,
          tempStartDate: "",
          tempEndDate: "",
          weeks: ["日", "一", "二", "三", "四", "五", "六"],
        };
      },
      computed: {
        calendarDays: function () {
          if (!this.pickerYear || !this.pickerMonth) return [];
          for (
            var t = new Date(this.pickerYear, this.pickerMonth - 1, 1).getDay(),
              e = new Date(this.pickerYear, this.pickerMonth, 0).getDate(),
              i = [],
              a = 0;
            a < t;
            a++
          )
            i.push({ day: "", date: "" });
          for (var n = 1; n <= e; n++) {
            var o = ""
              .concat(this.pickerYear, "-")
              .concat(String(this.pickerMonth).padStart(2, "0"), "-")
              .concat(String(n).padStart(2, "0"));
            i.push({ day: n, date: o });
          }
          return i;
        },
      },
      onLoad: function () {
        this.open_init(!0);
      },
      onShow: function () {
        this.loading || 0 !== this.rows.length || this.open_init(!0);
      },
      onReachBottom: function () {
        this.finished || this.loading || (this.pageIndex++, this.open_init());
      },
      methods: {
        openDatePicker: function () {
          var t = this.parseDate(this.endDate) || new Date();
          ((this.pickerYear = t.getFullYear()),
            (this.pickerMonth = t.getMonth() + 1),
            (this.tempStartDate = this.startDate),
            (this.tempEndDate = this.endDate),
            (this.showDatePicker = !0));
        },
        closeDatePicker: function () {
          this.showDatePicker = !1;
        },
        changeMonth: function (t) {
          var e = new Date(this.pickerYear, this.pickerMonth - 1 + t, 1);
          ((this.pickerYear = e.getFullYear()),
            (this.pickerMonth = e.getMonth() + 1));
        },
        selectDate: function (t) {
          if (t.date)
            return !this.tempStartDate ||
              (this.tempStartDate && this.tempEndDate)
              ? ((this.tempStartDate = t.date), void (this.tempEndDate = ""))
              : void (this.compareDate(t.date, this.tempStartDate) < 0
                  ? ((this.tempEndDate = this.tempStartDate),
                    (this.tempStartDate = t.date))
                  : (this.tempEndDate = t.date));
        },
        confirmDateRange: function () {
          this.tempStartDate && this.tempEndDate
            ? ((this.startDate = this.tempStartDate),
              (this.endDate = this.tempEndDate),
              (this.showDatePicker = !1),
              this.open_init(!0))
            : this.$tip("请选择日期范围");
        },
        resetDateRange: function () {
          ((this.tempStartDate = ""),
            (this.tempEndDate = ""),
            (this.startDate = ""),
            (this.endDate = ""),
            (this.showDatePicker = !1),
            this.open_init(!0));
        },
        getDayClass: function (t) {
          if (!t.date) return "empty";
          var e = [];
          return (
            t.date === this.tempStartDate && e.push("range-start"),
            t.date === this.tempEndDate && e.push("range-end"),
            this.tempStartDate &&
              this.tempEndDate &&
              this.compareDate(t.date, this.tempStartDate) > 0 &&
              this.compareDate(t.date, this.tempEndDate) < 0 &&
              e.push("in-range"),
            e.join(" ")
          );
        },
        parseDate: function (t) {
          if (!t) return null;
          var e = t.split("-").map(Number);
          return new Date(e[0], e[1] - 1, e[2]);
        },
        compareDate: function (t, e) {
          return this.parseDate(t).getTime() - this.parseDate(e).getTime();
        },
        open_init: function (t) {
          var e = this;
          (t && ((this.pageIndex = 1), (this.finished = !1), (this.rows = [])),
            (this.loading = !0),
            (this.loadingText = "加载中..."));
          var i = { type: 0, page: this.pageIndex, limit: this.pageSize };
          (this.startDate && (i.start_time = this.startDate + " 00:00:00"),
            this.endDate && (i.end_time = this.endDate + " 23:59:59"),
            this.request("/member/getMyProfit", i)
              .then(function (i) {
                if (((e.loading = !1), 1 == i.data.code)) {
                  var a = i.data.data || {},
                    n = e.normalizeList(a),
                    o = a.total_profit;
                  ((void 0 !== o && null !== o && "" !== o) || (o = a.profit),
                    (void 0 !== o && null !== o && "" !== o) || (o = a.all),
                    (e.totalProfit =
                      void 0 !== o && null !== o && "" !== o
                        ? o
                        : e.sumProfit(t ? n : e.rows.concat(n))),
                    (e.rows = 1 == e.pageIndex ? n : e.rows.concat(n)),
                    (e.finished = n.length < e.pageSize),
                    (e.loadingText = e.finished
                      ? "暂无更多数据"
                      : "上拉加载更多..."));
                } else ((e.loadingText = "暂无更多数据"), e.$tip(i.data.msg));
              })
              .catch(function () {
                ((e.loading = !1), (e.loadingText = "加载失败"));
              }));
        },
        normalizeList: function (t) {
          return Array.isArray(t)
            ? t
            : Array.isArray(t.list)
              ? t.list
              : Array.isArray(t.rows)
                ? t.rows
                : t.data && Array.isArray(t.data)
                  ? t.data
                  : [];
        },
        sumProfit: function (t) {
          var e = this;
          return t.reduce(function (t, i) {
            return t + Number(e.getProfit(i) || 0);
          }, 0);
        },
        formatDate: function (t) {
          var e = t.getFullYear(),
            i = String(t.getMonth() + 1).padStart(2, "0"),
            a = String(t.getDate()).padStart(2, "0");
          return "".concat(e, "-").concat(i, "-").concat(a);
        },
        formatMoney: function (t) {
          var e = Number(t || 0);
          return Number.isFinite(e) ? e.toFixed(2) : "0.00";
        },
        getOrderNo: function (t) {
          return t.order_no || t.order_sn || t.no || "--";
        },
        getStatusText: function (t) {
          return (
            t.status_text ||
            t.pay_status_text ||
            t.order_status_text ||
            "结算完毕"
          );
        },
        getGoodsImage: function (t) {
          return (
            t.image ||
            t.goods_image ||
            t.goods_img ||
            (t.goods && (t.goods.image || t.goods.goods_image)) ||
            "../../static/images/noimg.png"
          );
        },
        getGoodsName: function (t) {
          return (
            t.goods_name || t.title || (t.goods && t.goods.goods_name) || "--"
          );
        },
        getGoodsPrice: function (t) {
          return t.goods_price || t.price || t.pay_price || t.amount || 0;
        },
        getProfit: function (t) {
          return t.profit || t.profit_price || t.commission || t.money || 0;
        },
        getOwnerName: function (t) {
          return (
            t.owner_name ||
            t.belong_name ||
            t.seller_name ||
            (t.seller && t.seller.member_nickName) ||
            "--"
          );
        },
        getBuyerName: function (t) {
          return (
            t.buyer_name ||
            t.member_name ||
            t.buyer_nickName ||
            (t.member && t.member.member_nickName) ||
            "--"
          );
        },
        getOrderTime: function (t) {
          return (
            t.create_time ||
            t.createtime ||
            t.order_time ||
            t.consignment_complete_time ||
            "--"
          );
        },
      },
    };
  },
  f576: function (t, e, i) {
    "use strict";
    var a = i("5ca1"),
      n = i("2e08"),
      o = i("a25f"),
      r = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
    a(a.P + a.F * r, "String", {
      padStart: function (t) {
        return n(this, t, arguments.length > 1 ? arguments[1] : void 0, !0);
      },
    });
  },
  fca0: function (t, e, i) {
    var a = i("5ca1"),
      n = i("7726").isFinite;
    a(a.S, "Number", {
      isFinite: function (t) {
        return "number" == typeof t && n(t);
      },
    });
  },
};
