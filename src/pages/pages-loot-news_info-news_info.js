/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "0a23": function (t, e, n) {
    "use strict";
    (n.d(e, "b", function () {
      return r;
    }),
      n.d(e, "c", function () {
        return a;
      }),
      n.d(e, "a", function () {
        return i;
      }));
    var i = { uParse: n("98ef").default },
      r = function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "v-uni-view",
          { staticClass: "newsdetail" },
          [
            n("v-uni-view", { staticClass: "title" }, [
              t._v(t._s(t.data.title)),
            ]),
            n(
              "v-uni-view",
              { staticClass: "con_txt" },
              [n("u-parse", { attrs: { html: t.data.content } })],
              1,
            ),
          ],
          1,
        );
      },
      a = [];
  },
  "2b21": function (t, e, n) {
    "use strict";
    n.r(e);
    var i = n("8800"),
      r = n.n(i);
    for (var a in i)
      ["default"].indexOf(a) < 0 &&
        (function (t) {
          n.d(e, t, function () {
            return i[t];
          });
        })(a);
    e["default"] = r.a;
  },
  "35fe": function (t, e, n) {
    "use strict";
    n.r(e);
    var i = n("ba11"),
      r = n.n(i);
    for (var a in i)
      ["default"].indexOf(a) < 0 &&
        (function (t) {
          n.d(e, t, function () {
            return i[t];
          });
        })(a);
    e["default"] = r.a;
  },
  "3fbe": function (t, e, n) {
    "use strict";
    var i;
    (n.d(e, "b", function () {
      return r;
    }),
      n.d(e, "c", function () {
        return a;
      }),
      n.d(e, "a", function () {
        return i;
      }));
    var r = function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "v-uni-view",
          [
            t.nodes.length ? t._e() : t._t("default"),
            n(
              "v-uni-view",
              {
                style:
                  t.showAm +
                  (t.selectable
                    ? ";user-select:text;-webkit-user-select:text"
                    : ""),
                attrs: { id: "_top" },
              },
              [n("div", { attrs: { id: "rtf" + t.uid } })],
            ),
          ],
          2,
        );
      },
      a = [];
  },
  "4c48": function (t, e) {
    var n = {
      errorImg: null,
      filter: null,
      highlight: null,
      onText: null,
      entities: {
        quot: '"',
        apos: "'",
        semi: ";",
        nbsp: " ",
        ensp: " ",
        emsp: " ",
        ndash: "–",
        mdash: "—",
        middot: "·",
        lsquo: "‘",
        rsquo: "’",
        ldquo: "“",
        rdquo: "”",
        bull: "•",
        hellip: "…",
      },
      blankChar: i(" , ,\t,\r,\n,\f"),
      boolAttrs: i(
        "allowfullscreen,autoplay,autostart,controls,ignore,loop,muted",
      ),
      blockTags: i(
        "address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section",
      ),
      ignoreTags: i(
        "area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr",
      ),
      richOnlyTags: i("a,colgroup,fieldset,legend"),
      selfClosingTags: i(
        "area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr",
      ),
      trustTags: i(
        "a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video",
      ),
      userAgentStyles: {
        address: "font-style:italic",
        big: "display:inline;font-size:1.2em",
        blockquote:
          "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",
        caption: "display:table-caption;text-align:center",
        center: "text-align:center",
        cite: "font-style:italic",
        dd: "margin-left:40px",
        mark: "background-color:yellow",
        pre: "font-family:monospace;white-space:pre;overflow:scroll",
        s: "text-decoration:line-through",
        small: "display:inline;font-size:0.8em",
        u: "text-decoration:underline",
      },
    };
    function i(t) {
      for (var e = Object.create(null), n = t.split(","), i = n.length; i--;)
        e[n[i]] = !0;
      return e;
    }
    (wx.canIUse("editor") &&
      ((n.blockTags.pre = void 0),
      (n.ignoreTags.rp = !0),
      Object.assign(n.richOnlyTags, i("bdi,bdo,caption,rt,ruby")),
      Object.assign(n.trustTags, i("bdi,bdo,caption,pre,rt,ruby"))),
      (n.ignoreTags.iframe = void 0),
      Object.assign(n.trustTags, i("embed,iframe")),
      (t.exports = n));
  },
  "4e1e": function (t, e, n) {
    "use strict";
    n.r(e);
    var i = n("0a23"),
      r = n("35fe");
    for (var a in r)
      ["default"].indexOf(a) < 0 &&
        (function (t) {
          n.d(e, t, function () {
            return r[t];
          });
        })(a);
    n("da69");
    var o,
      s = n("f0c5"),
      c = Object(s["a"])(
        r["default"],
        i["b"],
        i["c"],
        !1,
        null,
        "4e6ff2c2",
        null,
        !1,
        i["a"],
        o,
      );
    e["default"] = c.exports;
  },
  8630: function (t, e, n) {
    var i = n("e50b");
    ("string" === typeof i && (i = [[t.i, i, ""]]),
      i.locals && (t.exports = i.locals));
    var r = n("4f06").default;
    r("fbd11f72", i, !0, { sourceMap: !1, shadowMode: !1 });
  },
  8800: function (t, e, n) {
    "use strict";
    function i(t, e) {
      var n =
        ("undefined" !== typeof Symbol && t[Symbol.iterator]) ||
        t["@@iterator"];
      if (!n) {
        if (
          Array.isArray(t) ||
          (n = r(t)) ||
          (e && t && "number" === typeof t.length)
        ) {
          n && (t = n);
          var i = 0,
            a = function () {};
          return {
            s: a,
            n: function () {
              return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] };
            },
            e: function (t) {
              throw t;
            },
            f: a,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      }
      var o,
        s = !0,
        c = !1;
      return {
        s: function () {
          n = n.call(t);
        },
        n: function () {
          var t = n.next();
          return ((s = t.done), t);
        },
        e: function (t) {
          ((c = !0), (o = t));
        },
        f: function () {
          try {
            s || null == n.return || n.return();
          } finally {
            if (c) throw o;
          }
        },
      };
    }
    function r(t, e) {
      if (t) {
        if ("string" === typeof t) return a(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? a(t, e)
              : void 0
        );
      }
    }
    function a(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
      return i;
    }
    var o;
    (n("ac4d"),
      n("8a81"),
      n("5df3"),
      n("1c4c"),
      n("6b54"),
      Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      n("a481"),
      n("4917"),
      n("28a5"),
      n("6762"),
      n("2fdb"));
    var s = uni.getSystemInfoSync(),
      c = s.windowWidth,
      l = (s.platform, n("4c48"));
    e.default = {
      name: "parser",
      data: function () {
        return { uid: this._uid, showAm: "", nodes: [] };
      },
      props: {
        html: String,
        autopause: { type: Boolean, default: !0 },
        autoscroll: Boolean,
        autosetTitle: { type: Boolean, default: !0 },
        domain: String,
        lazyLoad: Boolean,
        selectable: Boolean,
        tagStyle: Object,
        showWithAnimation: Boolean,
        useAnchor: Boolean,
      },
      watch: {
        html: function (t) {
          this.setContent(t);
        },
      },
      created: function () {
        ((this.imgList = []),
          (this.imgList.each = function (t) {
            for (var e = 0, n = this.length; e < n; e++)
              this.setItem(e, t(this[e], e, this));
          }),
          (this.imgList.setItem = function (t, e) {
            if (void 0 != t && e) {
              if (0 == e.indexOf("http") && this.includes(e)) {
                for (
                  var n, i = e.split("://")[0], r = i.length;
                  (n = e[r]);
                  r++
                ) {
                  if ("/" == n && "/" != e[r - 1] && "/" != e[r + 1]) break;
                  i += Math.random() > 0.5 ? n.toUpperCase() : n;
                }
                return ((i += e.substr(r)), (this[t] = i));
              }
              if (((this[t] = e), e.includes("data:image"))) {
                var a = e.match(/data:image\/(\S+?);(\S+?),(.+)/);
                if (!a) return;
              }
            }
          }));
      },
      mounted: function () {
        var t = this;
        ((this.document = document.getElementById("rtf" + this._uid)),
          o &&
            (this.search = function (e) {
              return o(t, e);
            }),
          this.html && this.setContent(this.html));
      },
      beforeDestroy: function () {
        (this._observer && this._observer.disconnect(),
          this.imgList.each(function (t) {}),
          clearInterval(this._timer));
      },
      methods: {
        setContent: function (t, e) {
          var n = this;
          if (t) {
            var r = document.createElement("div");
            (e
              ? this.rtf
                ? this.rtf.appendChild(r)
                : (this.rtf = r)
              : (this.rtf && this.rtf.parentNode.removeChild(this.rtf),
                (this.rtf = r)),
              (r.innerHTML = this._handleHtml(t, e)));
            for (
              var a, o = this.rtf.getElementsByTagName("style"), s = 0;
              (a = o[s++]);
            )
              ((a.innerHTML = a.innerHTML.replace(/body/g, "#rtf" + this._uid)),
                a.setAttribute("scoped", "true"));
            !this._observer &&
              this.lazyLoad &&
              IntersectionObserver &&
              (this._observer = new IntersectionObserver(
                function (t) {
                  for (var e, i = 0; (e = t[i++]);)
                    e.isIntersecting &&
                      ((e.target.src = e.target.getAttribute("data-src")),
                      e.target.removeAttribute("data-src"),
                      n._observer.unobserve(e.target));
                },
                { rootMargin: "500px 0px 500px 0px" },
              ));
            var u = this,
              f = this.rtf.getElementsByTagName("title");
            f.length &&
              this.autosetTitle &&
              uni.setNavigationBarTitle({ title: f[0].innerText });
            var d = function (t) {
              var e = t.getAttribute("src");
              n.domain &&
                e &&
                ("/" == e[0]
                  ? "/" == e[1]
                    ? (t.src =
                        (n.domain.includes("://")
                          ? n.domain.split("://")[0]
                          : "") +
                        ":" +
                        e)
                    : (t.src = n.domain + e)
                  : e.includes("://") ||
                    0 == e.indexOf("data:") ||
                    (t.src = n.domain + "/" + e));
            };
            this.imgList.length = 0;
            for (
              var h, p = this.rtf.getElementsByTagName("img"), g = 0, m = 0;
              (h = p[g]);
              g++
            )
              (parseInt(h.style.width || h.getAttribute("width")) > c &&
                (h.style.height = "auto"),
                d(h),
                h.hasAttribute("ignore") ||
                  "A" == h.parentElement.nodeName ||
                  ((h.i = m++),
                  u.imgList.push(
                    h.getAttribute("original-src") ||
                      h.src ||
                      h.getAttribute("data-src"),
                  ),
                  (h.onclick = function (t) {
                    t.stopPropagation();
                    var e = !0;
                    ((this.ignore = function () {
                      return (e = !1);
                    }),
                      u.$emit("imgtap", this),
                      e &&
                        uni.previewImage({ current: this.i, urls: u.imgList }));
                  })),
                (h.onerror = function () {
                  (l.errorImg && (u.imgList[this.i] = this.src = l.errorImg),
                    u.$emit("error", { source: "img", target: this }));
                }),
                u.lazyLoad &&
                  this._observer &&
                  h.src &&
                  0 != h.i &&
                  (h.setAttribute("data-src", h.src),
                  h.removeAttribute("src"),
                  this._observer.observe(h)));
            var v,
              b = this.rtf.getElementsByTagName("a"),
              y = i(b);
            try {
              for (y.s(); !(v = y.n()).done;) {
                var x = v.value;
                x.onclick = function (t) {
                  t.stopPropagation();
                  var e = !0,
                    n = this.getAttribute("href");
                  if (
                    (u.$emit("linkpress", {
                      href: n,
                      ignore: function () {
                        return (e = !1);
                      },
                    }),
                    e && n)
                  )
                    if ("#" == n[0])
                      u.useAnchor && u.navigateTo({ id: n.substr(1) });
                    else {
                      if (0 == n.indexOf("http") || 0 == n.indexOf("//"))
                        return !0;
                      uni.navigateTo({ url: n });
                    }
                  return !1;
                };
              }
            } catch (j) {
              y.e(j);
            } finally {
              y.f();
            }
            var w = this.rtf.getElementsByTagName("video");
            u.videoContexts = w;
            for (var _, T = 0; (_ = w[T++]);)
              (d(_),
                (_.style.maxWidth = "100%"),
                (_.onerror = function () {
                  u.$emit("error", { source: "video", target: this });
                }),
                (_.onplay = function () {
                  if (u.autopause)
                    for (var t, e = 0; (t = u.videoContexts[e++]);)
                      t != this && t.pause();
                }));
            var A,
              C,
              O = this.rtf.getElementsByTagName("audio"),
              k = i(O);
            try {
              for (k.s(); !(A = k.n()).done;) {
                var I = A.value;
                (d(I),
                  (I.onerror = function () {
                    u.$emit("error", { source: "audio", target: this });
                  }));
              }
            } catch (j) {
              k.e(j);
            } finally {
              k.f();
            }
            if (this.autoscroll) {
              var S,
                B = this.rtf.getElementsByTagName("table"),
                L = i(B);
              try {
                for (L.s(); !(S = L.n()).done;) {
                  var E = S.value,
                    N = document.createElement("div");
                  ((N.style.overflow = "scroll"),
                    E.parentNode.replaceChild(N, E),
                    N.appendChild(E));
                }
              } catch (j) {
                L.e(j);
              } finally {
                L.f();
              }
            }
            (e || this.document.appendChild(this.rtf),
              this.$nextTick(function () {
                ((n.nodes = [1]), n.$emit("load"));
              }),
              setTimeout(function () {
                return (n.showAm = "");
              }, 500),
              clearInterval(this._timer),
              (this._timer = setInterval(function () {
                ((n.rect = n.rtf.getBoundingClientRect()),
                  n.rect.height == C &&
                    (n.$emit("ready", n.rect), clearInterval(n._timer)),
                  (C = n.rect.height));
              }, 350)),
              this.showWithAnimation &&
                !e &&
                (this.showAm = "animation:_show .5s"));
          } else this.rtf && !e && this.rtf.parentNode.removeChild(this.rtf);
        },
        getText: function () {
          (arguments.length > 0 && void 0 !== arguments[0]) || this.nodes;
          var t = "";
          return ((t = this.rtf.innerText), t);
        },
        in: function (t) {
          t.page && t.selector && t.scrollTop && (this._in = t);
        },
        navigateTo: function (t) {
          var e = this;
          if (!this.useAnchor) return t.fail && t.fail("Anchor is disabled");
          var n = " ",
            i = uni
              .createSelectorQuery()
              .in(this._in ? this._in.page : this)
              .select(
                (this._in ? this._in.selector : "#_top") +
                  (t.id
                    ? ""
                        .concat(n, "#")
                        .concat(t.id, ",")
                        .concat(this._in ? this._in.selector : "#_top")
                        .concat(n, ".")
                        .concat(t.id)
                    : ""),
              )
              .boundingClientRect();
          (this._in
            ? i
                .select(this._in.selector)
                .scrollOffset()
                .select(this._in.selector)
                .boundingClientRect()
            : i.selectViewport().scrollOffset(),
            i.exec(function (n) {
              if (!n[0]) return t.fail && t.fail("Label not found");
              var i =
                n[1].scrollTop +
                n[0].top -
                (n[2] ? n[2].top : 0) +
                (t.offset || 0);
              (e._in
                ? (e._in.page[e._in.scrollTop] = i)
                : uni.pageScrollTo({ scrollTop: i, duration: 300 }),
                t.success && t.success());
            }));
        },
        getVideoContext: function (t) {
          if (!t) return this.videoContexts;
          for (var e = this.videoContexts.length; e--;)
            if (this.videoContexts[e].id == t) return this.videoContexts[e];
        },
        _handleHtml: function (t, e) {
          if (!e) {
            var n =
              "<style scoped>@keyframes _show{0%{opacity:0}100%{opacity:1}}img{max-width:100%}";
            for (var i in l.userAgentStyles)
              n += "".concat(i, "{").concat(l.userAgentStyles[i], "}");
            for (i in this.tagStyle)
              n += "".concat(i, "{").concat(this.tagStyle[i], "}");
            ((n += "</style>"), (t = n + t));
          }
          return (
            t.includes("rpx") &&
              (t = t.replace(/[0-9.]+\s*rpx/g, function (t) {
                return (parseFloat(t) * c) / 750 + "px";
              })),
            t
          );
        },
      },
    };
  },
  8834: function (t, e, n) {
    "use strict";
    var i = n("956d"),
      r = n.n(i);
    r.a;
  },
  "94a1": function (t, e, n) {
    var i = n("24fb");
    ((e = i(!1)),
      e.push([
        t.i,
        "@-webkit-keyframes _show-data-v-5189efcc{0%{opacity:0}100%{opacity:1}}@keyframes _show-data-v-5189efcc{0%{opacity:0}100%{opacity:1}}\n\n\n\n",
        "",
      ]),
      (t.exports = e));
  },
  "956d": function (t, e, n) {
    var i = n("94a1");
    ("string" === typeof i && (i = [[t.i, i, ""]]),
      i.locals && (t.exports = i.locals));
    var r = n("4f06").default;
    r("e06b7926", i, !0, { sourceMap: !1, shadowMode: !1 });
  },
  "98ef": function (t, e, n) {
    "use strict";
    n.r(e);
    var i = n("3fbe"),
      r = n("2b21");
    for (var a in r)
      ["default"].indexOf(a) < 0 &&
        (function (t) {
          n.d(e, t, function () {
            return r[t];
          });
        })(a);
    n("8834");
    var o,
      s = n("f0c5"),
      c = Object(s["a"])(
        r["default"],
        i["b"],
        i["c"],
        !1,
        null,
        "5189efcc",
        null,
        !1,
        i["a"],
        o,
      );
    e["default"] = c.exports;
  },
  ba11: function (t, e, n) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      n("a481"));
    e.default = {
      data: function () {
        return { id: "", data: {} };
      },
      onLoad: function (t) {
        var e = this;
        ((this.id = t.id || this.$route.query.id),
          this.request("/notice/getNoticeInfo", { id: this.id }).then(
            function (t) {
              1 == t.data.code &&
                ((e.data = t.data.data),
                (e.data.content = t.data.data.content.replace(
                  /\<img/gi,
                  '<img class="rich-img"',
                )));
            },
          ));
      },
    };
  },
  da69: function (t, e, n) {
    "use strict";
    var i = n("8630"),
      r = n.n(i);
    r.a;
  },
  e50b: function (t, e, n) {
    var i = n("24fb");
    ((e = i(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.newsdetail .title[data-v-4e6ff2c2]{font-weight:800;text-align:center;padding:%?30?% 0}.newsdetail .con_txt[data-v-4e6ff2c2]{margin:0 3%}',
        "",
      ]),
      (t.exports = e));
  },
};
