/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "06f8": function (t, e, n) {
    "use strict";
    n.r(e);
    var r = n("3c60"),
      o = n("1a7c");
    for (var i in o)
      ["default"].indexOf(i) < 0 &&
        (function (t) {
          n.d(e, t, function () {
            return o[t];
          });
        })(i);
    n("6242");
    var a,
      c = n("f0c5"),
      u = Object(c["a"])(
        o["default"],
        r["b"],
        r["c"],
        !1,
        null,
        "3da77082",
        null,
        !1,
        r["a"],
        a,
      );
    e["default"] = u.exports;
  },
  "1a7c": function (t, e, n) {
    "use strict";
    n.r(e);
    var r = n("d010"),
      o = n.n(r);
    for (var i in r)
      ["default"].indexOf(i) < 0 &&
        (function (t) {
          n.d(e, t, function () {
            return r[t];
          });
        })(i);
    e["default"] = o.a;
  },
  "1da1": function (t, e, n) {
    "use strict";
    function r(t, e, n, r, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (s) {
        return void n(s);
      }
      c.done ? e(u) : Promise.resolve(u).then(r, o);
    }
    function o(t) {
      return function () {
        var e = this,
          n = arguments;
        return new Promise(function (o, i) {
          var a = t.apply(e, n);
          function c(t) {
            r(a, o, i, c, u, "next", t);
          }
          function u(t) {
            r(a, o, i, c, u, "throw", t);
          }
          c(void 0);
        });
      };
    }
    (n.r(e),
      n.d(e, "default", function () {
        return o;
      }));
  },
  "21c0": function (t, e, n) {
    var r = n("38e2");
    ("string" === typeof r && (r = [[t.i, r, ""]]),
      r.locals && (t.exports = r.locals));
    var o = n("4f06").default;
    o("6330caf2", r, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "38e2": function (t, e, n) {
    var r = n("24fb");
    ((e = r(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 长按视觉反馈 */[data-v-3da77082] .anchor-url{-webkit-transition:background-color .2s;transition:background-color .2s}[data-v-3da77082] .anchor-url:active{background-color:rgba(0,0,0,.1)}.msgDetail[data-v-3da77082]{width:100%;padding:%?30?%;box-sizing:border-box}.msginfo[data-v-3da77082]{font-size:%?24?%;line-height:%?36?%;word-break:break-all}.tit[data-v-3da77082]{text-align:center;font-size:%?26?%;font-weight:700;padding:%?30?% 0}',
        "",
      ]),
      (t.exports = e));
  },
  "3c60": function (t, e, n) {
    "use strict";
    var r;
    (n.d(e, "b", function () {
      return o;
    }),
      n.d(e, "c", function () {
        return i;
      }),
      n.d(e, "a", function () {
        return r;
      }));
    var o = function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "v-uni-view",
          { staticClass: "msgDetail" },
          [
            n("v-uni-view", { staticClass: "tit" }, [t._v(t._s(t.info.title))]),
            n("v-uni-rich-text", {
              staticClass: "msginfo",
              attrs: { nodes: t.richText },
            }),
          ],
          1,
        );
      },
      i = [];
  },
  6242: function (t, e, n) {
    "use strict";
    var r = n("21c0"),
      o = n.n(r);
    o.a;
  },
  "96cf": function (t, e) {
    !(function (e) {
      "use strict";
      var n,
        r = Object.prototype,
        o = r.hasOwnProperty,
        i = "function" === typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        c = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag",
        s = "object" === typeof t,
        l = e.regeneratorRuntime;
      if (l) s && (t.exports = l);
      else {
        ((l = e.regeneratorRuntime = s ? t.exports : {}), (l.wrap = w));
        var f = "suspendedStart",
          h = "suspendedYield",
          d = "executing",
          p = "completed",
          v = {},
          y = {};
        y[a] = function () {
          return this;
        };
        var m = Object.getPrototypeOf,
          g = m && m(m(F([])));
        g && g !== r && o.call(g, a) && (y = g);
        var b = (_.prototype = k.prototype = Object.create(y));
        ((E.prototype = b.constructor = _),
          (_.constructor = E),
          (_[u] = E.displayName = "GeneratorFunction"),
          (l.isGeneratorFunction = function (t) {
            var e = "function" === typeof t && t.constructor;
            return (
              !!e &&
              (e === E || "GeneratorFunction" === (e.displayName || e.name))
            );
          }),
          (l.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, _)
                : ((t.__proto__ = _), u in t || (t[u] = "GeneratorFunction")),
              (t.prototype = Object.create(b)),
              t
            );
          }),
          (l.awrap = function (t) {
            return { __await: t };
          }),
          L(S.prototype),
          (S.prototype[c] = function () {
            return this;
          }),
          (l.AsyncIterator = S),
          (l.async = function (t, e, n, r) {
            var o = new S(w(t, e, n, r));
            return l.isGeneratorFunction(e)
              ? o
              : o.next().then(function (t) {
                  return t.done ? t.value : o.next();
                });
          }),
          L(b),
          (b[u] = "Generator"),
          (b[a] = function () {
            return this;
          }),
          (b.toString = function () {
            return "[object Generator]";
          }),
          (l.keys = function (t) {
            var e = [];
            for (var n in t) e.push(n);
            return (
              e.reverse(),
              function n() {
                while (e.length) {
                  var r = e.pop();
                  if (r in t) return ((n.value = r), (n.done = !1), n);
                }
                return ((n.done = !0), n);
              }
            );
          }),
          (l.values = F),
          (A.prototype = {
            constructor: A,
            reset: function (t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = n),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = n),
                this.tryEntries.forEach(P),
                !t)
              )
                for (var e in this)
                  "t" === e.charAt(0) &&
                    o.call(this, e) &&
                    !isNaN(+e.slice(1)) &&
                    (this[e] = n);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0],
                e = t.completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (t) {
              if (this.done) throw t;
              var e = this;
              function r(r, o) {
                return (
                  (c.type = "throw"),
                  (c.arg = t),
                  (e.next = r),
                  o && ((e.method = "next"), (e.arg = n)),
                  !!o
                );
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var a = this.tryEntries[i],
                  c = a.completion;
                if ("root" === a.tryLoc) return r("end");
                if (a.tryLoc <= this.prev) {
                  var u = o.call(a, "catchLoc"),
                    s = o.call(a, "finallyLoc");
                  if (u && s) {
                    if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                  } else if (u) {
                    if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                  } else {
                    if (!s)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, e) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  o.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var i = r;
                  break;
                }
              }
              i &&
                ("break" === t || "continue" === t) &&
                i.tryLoc <= e &&
                e <= i.finallyLoc &&
                (i = null);
              var a = i ? i.completion : {};
              return (
                (a.type = t),
                (a.arg = e),
                i
                  ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                  : this.complete(a)
              );
            },
            complete: function (t, e) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                v
              );
            },
            finish: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.finallyLoc === t)
                  return (this.complete(n.completion, n.afterLoc), P(n), v);
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.tryLoc === t) {
                  var r = n.completion;
                  if ("throw" === r.type) {
                    var o = r.arg;
                    P(n);
                  }
                  return o;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (t, e, r) {
              return (
                (this.delegate = { iterator: F(t), resultName: e, nextLoc: r }),
                "next" === this.method && (this.arg = n),
                v
              );
            },
          }));
      }
      function w(t, e, n, r) {
        var o = e && e.prototype instanceof k ? e : k,
          i = Object.create(o.prototype),
          a = new A(r || []);
        return ((i._invoke = T(t, n, a)), i);
      }
      function x(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (r) {
          return { type: "throw", arg: r };
        }
      }
      function k() {}
      function E() {}
      function _() {}
      function L(t) {
        ["next", "throw", "return"].forEach(function (e) {
          t[e] = function (t) {
            return this._invoke(e, t);
          };
        });
      }
      function S(t) {
        function e(n, r, i, a) {
          var c = x(t[n], t, r);
          if ("throw" !== c.type) {
            var u = c.arg,
              s = u.value;
            return s && "object" === typeof s && o.call(s, "__await")
              ? Promise.resolve(s.__await).then(
                  function (t) {
                    e("next", t, i, a);
                  },
                  function (t) {
                    e("throw", t, i, a);
                  },
                )
              : Promise.resolve(s).then(
                  function (t) {
                    ((u.value = t), i(u));
                  },
                  function (t) {
                    return e("throw", t, i, a);
                  },
                );
          }
          a(c.arg);
        }
        var n;
        function r(t, r) {
          function o() {
            return new Promise(function (n, o) {
              e(t, r, n, o);
            });
          }
          return (n = n ? n.then(o, o) : o());
        }
        this._invoke = r;
      }
      function T(t, e, n) {
        var r = f;
        return function (o, i) {
          if (r === d) throw new Error("Generator is already running");
          if (r === p) {
            if ("throw" === o) throw i;
            return C();
          }
          ((n.method = o), (n.arg = i));
          while (1) {
            var a = n.delegate;
            if (a) {
              var c = j(a, n);
              if (c) {
                if (c === v) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (r === f) throw ((r = p), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            r = d;
            var u = x(t, e, n);
            if ("normal" === u.type) {
              if (((r = n.done ? p : h), u.arg === v)) continue;
              return { value: u.arg, done: n.done };
            }
            "throw" === u.type &&
              ((r = p), (n.method = "throw"), (n.arg = u.arg));
          }
        };
      }
      function j(t, e) {
        var r = t.iterator[e.method];
        if (r === n) {
          if (((e.delegate = null), "throw" === e.method)) {
            if (
              t.iterator.return &&
              ((e.method = "return"),
              (e.arg = n),
              j(t, e),
              "throw" === e.method)
            )
              return v;
            ((e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a 'throw' method",
              )));
          }
          return v;
        }
        var o = x(r, t.iterator, e.arg);
        if ("throw" === o.type)
          return (
            (e.method = "throw"),
            (e.arg = o.arg),
            (e.delegate = null),
            v
          );
        var i = o.arg;
        return i
          ? i.done
            ? ((e[t.resultName] = i.value),
              (e.next = t.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = n)),
              (e.delegate = null),
              v)
            : i
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            v);
      }
      function O(t) {
        var e = { tryLoc: t[0] };
        (1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e));
      }
      function P(t) {
        var e = t.completion || {};
        ((e.type = "normal"), delete e.arg, (t.completion = e));
      }
      function A(t) {
        ((this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(O, this),
          this.reset(!0));
      }
      function F(t) {
        if (t) {
          var e = t[a];
          if (e) return e.call(t);
          if ("function" === typeof t.next) return t;
          if (!isNaN(t.length)) {
            var r = -1,
              i = function e() {
                while (++r < t.length)
                  if (o.call(t, r)) return ((e.value = t[r]), (e.done = !1), e);
                return ((e.value = n), (e.done = !0), e);
              };
            return (i.next = i);
          }
        }
        return { next: C };
      }
      function C() {
        return { value: n, done: !0 };
      }
    })(
      (function () {
        return this || ("object" === typeof self && self);
      })() || Function("return this")(),
    );
  },
  d010: function (t, e, n) {
    "use strict";
    var r = n("4ea4");
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      n("96cf"));
    var o = r(n("1da1"));
    (n("ac6a"), n("a481"));
    (r(n("f71e")),
      (e.default = {
        data: function () {
          return { id: "", info: {}, richText: "" };
        },
        onShareAppMessage: function () {
          return {
            title: this.info.title,
            path:
              "/pages/personal/msgDetail?id=" +
              this.member_id +
              "&member_id=" +
              this.member_ids,
          };
        },
        watch: {
          richText: function () {
            this.$nextTick(this.bindLongPress);
          },
        },
        onLoad: function (t) {
          var e = this;
          ((this.id = t.id),
            this.request("/notice/getNoticeInfo", { id: this.id }).then(
              function (t) {
                1 == t.data.code
                  ? ((e.info = t.data.data),
                    (t.data.data.content = t.data.data.content.replace(
                      /\<img/gi,
                      '<img style="max-width:100%;height:auto;display:block" ',
                    )),
                    (e.richText = t.data.data.content.replace(
                      /white-space: pre/g,
                      "white-space: break-spaces",
                    )))
                  : e.$tip(t.data.msg);
              },
            ));
        },
        methods: {
          bindLongPress: function () {
            var t = this;
            this.$nextTick(function () {
              var e = document.querySelectorAll(".anchor-url");
              (console.log("找到链接节点:", e),
                e.forEach(function (e) {
                  (e.removeEventListener("touchstart", t.startPress),
                    e.removeEventListener("touchend", t.cancelPress),
                    e.removeEventListener("touchmove", t.cancelPress),
                    e.addEventListener("touchstart", t.startPress),
                    e.addEventListener("touchend", t.cancelPress),
                    e.addEventListener("touchmove", t.cancelPress),
                    e.addEventListener("contextmenu", function (t) {
                      return t.preventDefault();
                    }),
                    console.log("绑定事件到:", e.href));
                }));
            });
          },
          startPress: function (t) {
            var e = this,
              n = t.currentTarget.innerHTML;
            this.pressTimer = setTimeout(function () {
              var t = n;
              e.copyLink(t);
            }, 700);
          },
          cancelPress: function () {
            clearTimeout(this.pressTimer);
          },
          copyLink: (function () {
            var t = (0, o.default)(
              regeneratorRuntime.mark(function t(e) {
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            (t.next = 3),
                            uni.setClipboardData({
                              data: e,
                              success: function () {
                                uni.showToast({
                                  title: "复制成功",
                                  icon: "none",
                                });
                              },
                            })
                          );
                        case 3:
                          t.next = 8;
                          break;
                        case 5:
                          ((t.prev = 5),
                            (t.t0 = t["catch"](0)),
                            uni.showToast({ title: "复制失败", icon: "none" }));
                        case 8:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[0, 5]],
                );
              }),
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
      }));
  },
  f71e: function (t, e, n) {
    "use strict";
    (function (t) {
      var r,
        o,
        i,
        a = n("4ea4");
      (n("28a5"), n("6b54"), n("ac6a"), n("fd24"), n("ac4d"), n("8a81"));
      var c = a(n("53ca"));
      !(function (n, a) {
        try {
          window.ClipboardJS = a();
        } catch (a) {}
        "object" == (0, c.default)(e) && "object" == (0, c.default)(t)
          ? (t.exports = a())
          : ((o = []),
            (r = a),
            (i = "function" === typeof r ? r.apply(e, o) : r),
            void 0 === i || (t.exports = i));
      })(0, function () {
        return (function (t) {
          var e = {};
          function n(r) {
            if (e[r]) return e[r].exports;
            var o = (e[r] = { i: r, l: !1, exports: {} });
            return (
              t[r].call(o.exports, o, o.exports, n),
              (o.l = !0),
              o.exports
            );
          }
          return (
            (n.m = t),
            (n.c = e),
            (n.d = function (t, e, r) {
              n.o(t, e) ||
                Object.defineProperty(t, e, { enumerable: !0, get: r });
            }),
            (n.r = function (t) {
              ("undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, {
                  value: "Module",
                }),
                Object.defineProperty(t, "__esModule", { value: !0 }));
            }),
            (n.t = function (t, e) {
              if ((1 & e && (t = n(t)), 8 & e)) return t;
              if (4 & e && "object" == (0, c.default)(t) && t && t.__esModule)
                return t;
              var r = Object.create(null);
              if (
                (n.r(r),
                Object.defineProperty(r, "default", {
                  enumerable: !0,
                  value: t,
                }),
                2 & e && "string" != typeof t)
              )
                for (var o in t)
                  n.d(
                    r,
                    o,
                    function (e) {
                      return t[e];
                    }.bind(null, o),
                  );
              return r;
            }),
            (n.n = function (t) {
              var e =
                t && t.__esModule
                  ? function () {
                      return t.default;
                    }
                  : function () {
                      return t;
                    };
              return (n.d(e, "a", e), e);
            }),
            (n.o = function (t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (n.p = ""),
            n((n.s = 0))
          );
        })([
          function (t, e, n) {
            var r =
                "function" == typeof Symbol &&
                "symbol" == (0, c.default)(Symbol.iterator)
                  ? function (t) {
                      return (0, c.default)(t);
                    }
                  : function (t) {
                      return t &&
                        "function" == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? "symbol"
                        : (0, c.default)(t);
                    },
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    ((r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r));
                  }
                }
                return function (e, n, r) {
                  return (n && t(e.prototype, n), r && t(e, r), e);
                };
              })(),
              i = s(n(1)),
              a = s(n(3)),
              u = s(n(4));
            function s(t) {
              return t && t.__esModule ? t : { default: t };
            }
            var l = (function (t) {
              function e(t, n) {
                !(function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e);
                var r = (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e ||
                    ("object" != (0, c.default)(e) && "function" != typeof e)
                    ? t
                    : e;
                })(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return (r.resolveOptions(n), r.listenClick(t), r);
              }
              return (
                (function (t, e) {
                  if ("function" != typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " +
                        (0, c.default)(e),
                    );
                  ((t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e)));
                })(e, a.default),
                o(
                  e,
                  [
                    {
                      key: "resolveOptions",
                      value: function () {
                        var t =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                        ((this.action =
                          "function" == typeof t.action
                            ? t.action
                            : this.defaultAction),
                          (this.target =
                            "function" == typeof t.target
                              ? t.target
                              : this.defaultTarget),
                          (this.text =
                            "function" == typeof t.text
                              ? t.text
                              : this.defaultText),
                          (this.container =
                            "object" === r(t.container)
                              ? t.container
                              : document.body));
                      },
                    },
                    {
                      key: "listenClick",
                      value: function (t) {
                        var e = this;
                        this.listener = (0, u.default)(
                          t,
                          "click",
                          function (t) {
                            return e.onClick(t);
                          },
                        );
                      },
                    },
                    {
                      key: "onClick",
                      value: function (t) {
                        var e = t.delegateTarget || t.currentTarget;
                        (this.clipboardAction && (this.clipboardAction = null),
                          (this.clipboardAction = new i.default({
                            action: this.action(e),
                            target: this.target(e),
                            text: this.text(e),
                            container: this.container,
                            trigger: e,
                            emitter: this,
                          })));
                      },
                    },
                    {
                      key: "defaultAction",
                      value: function (t) {
                        return f("action", t) || "copy";
                      },
                    },
                    {
                      key: "defaultTarget",
                      value: function (t) {
                        var e = f("target", t);
                        if (e) return document.querySelector(e);
                      },
                    },
                    {
                      key: "defaultText",
                      value: function (t) {
                        return f("text", t) || this.text;
                      },
                    },
                    {
                      key: "destroy",
                      value: function () {
                        (this.listener.destroy(),
                          this.clipboardAction &&
                            (this.clipboardAction.destroy(),
                            (this.clipboardAction = null)));
                      },
                    },
                  ],
                  [
                    {
                      key: "isSupported",
                      value: function () {
                        var t =
                            0 < arguments.length && void 0 !== arguments[0]
                              ? arguments[0]
                              : ["copy", "cut"],
                          e = "string" == typeof t ? [t] : t,
                          n = !!document.queryCommandSupported;
                        return (
                          e.forEach(function (t) {
                            n = n && !!document.queryCommandSupported(t);
                          }),
                          n
                        );
                      },
                    },
                  ],
                ),
                e
              );
            })();
            function f(t, e) {
              var n = "data-clipboard-" + t,
                r = e && "function" === typeof e.hasAttribute;
              if (r && e.hasAttribute(n)) return e.getAttribute(n);
            }
            t.exports = l;
          },
          function (t, e, n) {
            var r,
              o =
                "function" == typeof Symbol &&
                "symbol" == (0, c.default)(Symbol.iterator)
                  ? function (t) {
                      return (0, c.default)(t);
                    }
                  : function (t) {
                      return t &&
                        "function" == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? "symbol"
                        : (0, c.default)(t);
                    },
              i = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    ((r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r));
                  }
                }
                return function (e, n, r) {
                  return (n && t(e.prototype, n), r && t(e, r), e);
                };
              })(),
              a = n(2),
              u = (r = a) && r.__esModule ? r : { default: r },
              s = (function () {
                function e(t) {
                  (!(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, e),
                    this.resolveOptions(t),
                    this.initSelection());
                }
                return (
                  i(e, [
                    {
                      key: "resolveOptions",
                      value: function () {
                        var t =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                        ((this.action = t.action),
                          (this.container = t.container),
                          (this.emitter = t.emitter),
                          (this.target = t.target),
                          (this.text = t.text),
                          (this.trigger = t.trigger),
                          (this.selectedText = ""));
                      },
                    },
                    {
                      key: "initSelection",
                      value: function () {
                        this.text
                          ? this.selectFake()
                          : this.target && this.selectTarget();
                      },
                    },
                    {
                      key: "selectFake",
                      value: function () {
                        var t = this,
                          e =
                            "rtl" ==
                            document.documentElement.getAttribute("dir");
                        (this.removeFake(),
                          (this.fakeHandlerCallback = function () {
                            return t.removeFake();
                          }),
                          (this.fakeHandler =
                            this.container.addEventListener(
                              "click",
                              this.fakeHandlerCallback,
                            ) || !0),
                          (this.fakeElem = document.createElement("textarea")),
                          (this.fakeElem.style.fontSize = "12pt"),
                          (this.fakeElem.style.border = "0"),
                          (this.fakeElem.style.padding = "0"),
                          (this.fakeElem.style.margin = "0"),
                          (this.fakeElem.style.position = "absolute"),
                          (this.fakeElem.style[e ? "right" : "left"] =
                            "-9999px"));
                        var n =
                          window.pageYOffset ||
                          document.documentElement.scrollTop;
                        ((this.fakeElem.style.top = n + "px"),
                          this.fakeElem.setAttribute("readonly", ""),
                          (this.fakeElem.value = this.text),
                          this.container.appendChild(this.fakeElem),
                          (this.selectedText = (0, u.default)(this.fakeElem)),
                          this.copyText());
                      },
                    },
                    {
                      key: "removeFake",
                      value: function () {
                        (this.fakeHandler &&
                          (this.container.removeEventListener(
                            "click",
                            this.fakeHandlerCallback,
                          ),
                          (this.fakeHandler = null),
                          (this.fakeHandlerCallback = null)),
                          this.fakeElem &&
                            (this.container.removeChild(this.fakeElem),
                            (this.fakeElem = null)));
                      },
                    },
                    {
                      key: "selectTarget",
                      value: function () {
                        ((this.selectedText = (0, u.default)(this.target)),
                          this.copyText());
                      },
                    },
                    {
                      key: "copyText",
                      value: function () {
                        var e = void 0;
                        try {
                          e = document.execCommand(this.action);
                        } catch (t) {
                          e = !1;
                        }
                        this.handleResult(e);
                      },
                    },
                    {
                      key: "handleResult",
                      value: function (t) {
                        this.emitter.emit(t ? "success" : "error", {
                          action: this.action,
                          text: this.selectedText,
                          trigger: this.trigger,
                          clearSelection: this.clearSelection.bind(this),
                        });
                      },
                    },
                    {
                      key: "clearSelection",
                      value: function () {
                        (this.trigger && this.trigger.focus(),
                          window.getSelection().removeAllRanges());
                      },
                    },
                    {
                      key: "destroy",
                      value: function () {
                        this.removeFake();
                      },
                    },
                    {
                      key: "action",
                      set: function () {
                        var t =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : "copy";
                        if (
                          ((this._action = t),
                          "copy" !== this._action && "cut" !== this._action)
                        )
                          throw new Error(
                            'Invalid "action" value, use either "copy" or "cut"',
                          );
                      },
                      get: function () {
                        return this._action;
                      },
                    },
                    {
                      key: "target",
                      set: function (t) {
                        if (void 0 !== t) {
                          if (
                            !t ||
                            "object" !== (void 0 === t ? "undefined" : o(t)) ||
                            1 !== t.nodeType
                          )
                            throw new Error(
                              'Invalid "target" value, use a valid Element',
                            );
                          if (
                            "copy" === this.action &&
                            t.hasAttribute("disabled")
                          )
                            throw new Error(
                              'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute',
                            );
                          if (
                            "cut" === this.action &&
                            (t.hasAttribute("readonly") ||
                              t.hasAttribute("disabled"))
                          )
                            throw new Error(
                              'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes',
                            );
                          this._target = t;
                        }
                      },
                      get: function () {
                        return this._target;
                      },
                    },
                  ]),
                  e
                );
              })();
            t.exports = s;
          },
          function (t, e) {
            t.exports = function (t) {
              var e;
              if ("SELECT" === t.nodeName) (t.focus(), (e = t.value));
              else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
                var n = t.hasAttribute("readonly");
                (n || t.setAttribute("readonly", ""),
                  t.select(),
                  t.setSelectionRange(0, t.value.length),
                  n || t.removeAttribute("readonly"),
                  (e = t.value));
              } else {
                t.hasAttribute("contenteditable") && t.focus();
                var r = window.getSelection(),
                  o = document.createRange();
                (o.selectNodeContents(t),
                  r.removeAllRanges(),
                  r.addRange(o),
                  (e = r.toString()));
              }
              return e;
            };
          },
          function (t, e) {
            function n() {}
            ((n.prototype = {
              on: function (t, e, n) {
                var r = this.e || (this.e = {});
                return ((r[t] || (r[t] = [])).push({ fn: e, ctx: n }), this);
              },
              once: function (t, e, n) {
                var r = this;
                function o() {
                  (r.off(t, o), e.apply(n, arguments));
                }
                return ((o._ = e), this.on(t, o, n));
              },
              emit: function (t) {
                for (
                  var e = [].slice.call(arguments, 1),
                    n = ((this.e || (this.e = {}))[t] || []).slice(),
                    r = 0,
                    o = n.length;
                  r < o;
                  r++
                )
                  n[r].fn.apply(n[r].ctx, e);
                return this;
              },
              off: function (t, e) {
                var n = this.e || (this.e = {}),
                  r = n[t],
                  o = [];
                if (r && e)
                  for (var i = 0, a = r.length; i < a; i++)
                    r[i].fn !== e && r[i].fn._ !== e && o.push(r[i]);
                return (o.length ? (n[t] = o) : delete n[t], this);
              },
            }),
              (t.exports = n));
          },
          function (t, e, n) {
            var r = n(5),
              o = n(6);
            t.exports = function (t, e, n) {
              if (!t && !e && !n) throw new Error("Missing required arguments");
              if (!r.string(e))
                throw new TypeError("Second argument must be a String");
              if (!r.fn(n))
                throw new TypeError("Third argument must be a Function");
              if (r.node(t))
                return (
                  (h = e),
                  (d = n),
                  (f = t).addEventListener(h, d),
                  {
                    destroy: function () {
                      f.removeEventListener(h, d);
                    },
                  }
                );
              if (r.nodeList(t))
                return (
                  (u = t),
                  (s = e),
                  (l = n),
                  Array.prototype.forEach.call(u, function (t) {
                    t.addEventListener(s, l);
                  }),
                  {
                    destroy: function () {
                      Array.prototype.forEach.call(u, function (t) {
                        t.removeEventListener(s, l);
                      });
                    },
                  }
                );
              if (r.string(t))
                return ((i = t), (a = e), (c = n), o(document.body, i, a, c));
              throw new TypeError(
                "First argument must be a String, HTMLElement, HTMLCollection, or NodeList",
              );
              var i, a, c, u, s, l, f, h, d;
            };
          },
          function (t, e) {
            ((e.node = function (t) {
              return (
                void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
              );
            }),
              (e.nodeList = function (t) {
                var n = Object.prototype.toString.call(t);
                return (
                  void 0 !== t &&
                  ("[object NodeList]" === n ||
                    "[object HTMLCollection]" === n) &&
                  "length" in t &&
                  (0 === t.length || e.node(t[0]))
                );
              }),
              (e.string = function (t) {
                return "string" == typeof t || t instanceof String;
              }),
              (e.fn = function (t) {
                return (
                  "[object Function]" === Object.prototype.toString.call(t)
                );
              }));
          },
          function (t, e, n) {
            var r = n(7);
            function o(t, e, n, o, i) {
              var a = function (t, e, n, o) {
                return function (n) {
                  ((n.delegateTarget = r(n.target, e)),
                    n.delegateTarget && o.call(t, n));
                };
              }.apply(this, arguments);
              return (
                t.addEventListener(n, a, i),
                {
                  destroy: function () {
                    t.removeEventListener(n, a, i);
                  },
                }
              );
            }
            t.exports = function (t, e, n, r, i) {
              return "function" == typeof t.addEventListener
                ? o.apply(null, arguments)
                : "function" == typeof n
                  ? o.bind(null, document).apply(null, arguments)
                  : ("string" == typeof t && (t = document.querySelectorAll(t)),
                    Array.prototype.map.call(t, function (t) {
                      return o(t, e, n, r, i);
                    }));
            };
          },
          function (t, e) {
            if ("undefined" != typeof Element && !Element.prototype.matches) {
              var n = Element.prototype;
              n.matches =
                n.matchesSelector ||
                n.mozMatchesSelector ||
                n.msMatchesSelector ||
                n.oMatchesSelector ||
                n.webkitMatchesSelector;
            }
            t.exports = function (t, e) {
              for (; t && 9 !== t.nodeType;) {
                if ("function" == typeof t.matches && t.matches(e)) return t;
                t = t.parentNode;
              }
            };
          },
        ]);
      });
      var u = {
        isFunction: function (t) {
          var e = Object.prototype.toString.call(t);
          return "[object Function]" == e;
        },
        isObject: function (t) {
          var e = Object.prototype.toString.call(t);
          return "[object Object]" == e;
        },
        isString: function (t) {
          var e = Object.prototype.toString.call(t);
          return "[object String]" == e;
        },
      };
      function s(t) {
        var e = document.createElement("a");
        (e.setAttribute("href", t.blob),
          e.setAttribute("downLoad", t.name),
          e.click());
      }
      ((uni.setClipboardData = function (t) {
        var e = function () {},
          n = { data: null, event: null, success: e, fail: e, complete: e };
        (t && u.isObject(t) && (n = Object.assign({}, n, t)),
          t && u.isString(t) && (n = Object.assign({}, n, { data: t })));
        var r = n.data,
          o = n.success || e,
          i = n.fail || e,
          a = n.complete || e,
          c = n.event || window.event || {},
          s = new ClipboardJS(".null", {
            text: function () {
              return r;
            },
          });
        (s.on("success", function (t) {
          ((window.__clipboard__ = r),
            o && u.isFunction(o) && o({ data: t.text }),
            a && u.isFunction(a) && a(),
            s.off("error"),
            s.off("success"),
            s.destroy());
        }),
          s.on("error", function (t) {
            (i && u.isFunction(i) && i(t),
              a && u.isFunction(a) && a(),
              s.off("error"),
              s.off("success"),
              s.destroy());
          }),
          s.onClick(c));
      }),
        (uni.getClipboardData = function (t) {
          var e = function () {},
            n = { data: null, event: null, success: e, fail: e, complete: e };
          t && u.isObject(t) && (n = Object.assign({}, n, t));
          var r = n.success || e,
            o = n.fail || e,
            i = n.complete || e;
          (void 0 !== window.__clipboard__
            ? r && u.isFunction(r) && r({ data: window.__clipboard__ })
            : o && u.isFunction(o) && o({ data: null }),
            i && u.isFunction(i) && i());
        }),
        (uni.saveImageToPhotosAlbum = uni.saveVideoToPhotosAlbum =
          function (t) {
            var e = function () {},
              n = { filePath: null, success: e, fail: e, complete: e };
            (t && u.isObject(t) && (n = Object.assign({}, n, t)),
              t &&
                u.isString(t) &&
                (n = Object.assign({}, n, { filePath: t })));
            var r = n.filePath,
              o = n.success || e,
              i = n.fail || e,
              a = n.complete || e;
            if (!r)
              return (
                i && u.isFunction(i) && i({ msg: "no File" }),
                void (a && u.isFunction(a) && a())
              );
            var c = r.split("/"),
              l = c[c.length - 1];
            uni.downloadFile({
              url: r,
              success: function (t) {
                var e = t.tempFilePath;
                (s({ name: l, blob: e }),
                  o && u.isFunction(o) && o({ filePath: r }));
              },
              fail: function (t) {
                i && u.isFunction(i) && i({ msg: t });
              },
              complete: function () {
                a && u.isFunction(a) && a();
              },
            });
          }));
    }).call(this, n("62e4")(t));
  },
};
