/* Recovered H5 module map. See README.md for source limitations. */
export default {
  "0737": function (t, e, o) {
    "use strict";
    o.r(e);
    var r = o("d12f"),
      n = o("6bc0");
    for (var i in n)
      ["default"].indexOf(i) < 0 &&
        (function (t) {
          o.d(e, t, function () {
            return n[t];
          });
        })(i);
    o("1777");
    var a,
      u = o("f0c5"),
      s = Object(u["a"])(
        n["default"],
        r["b"],
        r["c"],
        !1,
        null,
        "e76b01a2",
        null,
        !1,
        r["a"],
        a,
      );
    e["default"] = s.exports;
  },
  "08e6": function (t, e, o) {
    (function (e) {
      !(function (e, o) {
        t.exports = o();
      })("undefined" !== typeof window && window, function () {
        function t(t) {
          ((this.mode = o.MODE_8BIT_BYTE), (this.data = t));
        }
        function e(t, e) {
          ((this.typeNumber = t),
            (this.errorCorrectLevel = e),
            (this.modules = null),
            (this.moduleCount = 0),
            (this.dataCache = null),
            (this.dataList = new Array()));
        }
        ((t.prototype = {
          getLength: function (t) {
            return this.data.length;
          },
          write: function (t) {
            for (var e = 0; e < this.data.length; e++)
              t.put(this.data.charCodeAt(e), 8);
          },
        }),
          (e.prototype = {
            addData: function (e) {
              var o = new t(e);
              (this.dataList.push(o), (this.dataCache = null));
            },
            isDark: function (t, e) {
              if (
                t < 0 ||
                this.moduleCount <= t ||
                e < 0 ||
                this.moduleCount <= e
              )
                throw new Error(t + "," + e);
              return this.modules[t][e];
            },
            getModuleCount: function () {
              return this.moduleCount;
            },
            make: function () {
              if (this.typeNumber < 1) {
                var t = 1;
                for (t = 1; t < 40; t++) {
                  for (
                    var e = v.getRSBlocks(t, this.errorCorrectLevel),
                      o = new p(),
                      r = 0,
                      n = 0;
                    n < e.length;
                    n++
                  )
                    r += e[n].dataCount;
                  for (n = 0; n < this.dataList.length; n++) {
                    var i = this.dataList[n];
                    (o.put(i.mode, 4),
                      o.put(i.getLength(), c.getLengthInBits(i.mode, t)),
                      i.write(o));
                  }
                  if (o.getLengthInBits() <= 8 * r) break;
                }
                this.typeNumber = t;
              }
              this.makeImpl(!1, this.getBestMaskPattern());
            },
            makeImpl: function (t, o) {
              ((this.moduleCount = 4 * this.typeNumber + 17),
                (this.modules = new Array(this.moduleCount)));
              for (var r = 0; r < this.moduleCount; r++) {
                this.modules[r] = new Array(this.moduleCount);
                for (var n = 0; n < this.moduleCount; n++)
                  this.modules[r][n] = null;
              }
              (this.setupPositionProbePattern(0, 0),
                this.setupPositionProbePattern(this.moduleCount - 7, 0),
                this.setupPositionProbePattern(0, this.moduleCount - 7),
                this.setupPositionAdjustPattern(),
                this.setupTimingPattern(),
                this.setupTypeInfo(t, o),
                this.typeNumber >= 7 && this.setupTypeNumber(t),
                null == this.dataCache &&
                  (this.dataCache = e.createData(
                    this.typeNumber,
                    this.errorCorrectLevel,
                    this.dataList,
                  )),
                this.mapData(this.dataCache, o));
            },
            setupPositionProbePattern: function (t, e) {
              for (var o = -1; o <= 7; o++)
                if (!(t + o <= -1 || this.moduleCount <= t + o))
                  for (var r = -1; r <= 7; r++)
                    e + r <= -1 ||
                      this.moduleCount <= e + r ||
                      (this.modules[t + o][e + r] =
                        (0 <= o && o <= 6 && (0 == r || 6 == r)) ||
                        (0 <= r && r <= 6 && (0 == o || 6 == o)) ||
                        (2 <= o && o <= 4 && 2 <= r && r <= 4));
            },
            getBestMaskPattern: function () {
              for (var t = 0, e = 0, o = 0; o < 8; o++) {
                this.makeImpl(!0, o);
                var r = c.getLostPoint(this);
                (0 == o || t > r) && ((t = r), (e = o));
              }
              return e;
            },
            createMovieClip: function (t, e, o) {
              var r = t.createEmptyMovieClip(e, o);
              this.make();
              for (var n = 0; n < this.modules.length; n++)
                for (var i = 1 * n, a = 0; a < this.modules[n].length; a++) {
                  var u = 1 * a;
                  this.modules[n][a] &&
                    (r.beginFill(0, 100),
                    r.moveTo(u, i),
                    r.lineTo(u + 1, i),
                    r.lineTo(u + 1, i + 1),
                    r.lineTo(u, i + 1),
                    r.endFill());
                }
              return r;
            },
            setupTimingPattern: function () {
              for (var t = 8; t < this.moduleCount - 8; t++)
                null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
              for (var e = 8; e < this.moduleCount - 8; e++)
                null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
            },
            setupPositionAdjustPattern: function () {
              for (
                var t = c.getPatternPosition(this.typeNumber), e = 0;
                e < t.length;
                e++
              )
                for (var o = 0; o < t.length; o++) {
                  var r = t[e],
                    n = t[o];
                  if (null == this.modules[r][n])
                    for (var i = -2; i <= 2; i++)
                      for (var a = -2; a <= 2; a++)
                        this.modules[r + i][n + a] =
                          -2 == i ||
                          2 == i ||
                          -2 == a ||
                          2 == a ||
                          (0 == i && 0 == a);
                }
            },
            setupTypeNumber: function (t) {
              for (
                var e = c.getBCHTypeNumber(this.typeNumber), o = 0;
                o < 18;
                o++
              ) {
                var r = !t && 1 == ((e >> o) & 1);
                this.modules[Math.floor(o / 3)][
                  (o % 3) + this.moduleCount - 8 - 3
                ] = r;
              }
              for (o = 0; o < 18; o++)
                ((r = !t && 1 == ((e >> o) & 1)),
                  (this.modules[(o % 3) + this.moduleCount - 8 - 3][
                    Math.floor(o / 3)
                  ] = r));
            },
            setupTypeInfo: function (t, e) {
              for (
                var o = (this.errorCorrectLevel << 3) | e,
                  r = c.getBCHTypeInfo(o),
                  n = 0;
                n < 15;
                n++
              ) {
                var i = !t && 1 == ((r >> n) & 1);
                n < 6
                  ? (this.modules[n][8] = i)
                  : n < 8
                    ? (this.modules[n + 1][8] = i)
                    : (this.modules[this.moduleCount - 15 + n][8] = i);
              }
              for (n = 0; n < 15; n++)
                ((i = !t && 1 == ((r >> n) & 1)),
                  n < 8
                    ? (this.modules[8][this.moduleCount - n - 1] = i)
                    : n < 9
                      ? (this.modules[8][15 - n - 1 + 1] = i)
                      : (this.modules[8][15 - n - 1] = i));
              this.modules[this.moduleCount - 8][8] = !t;
            },
            mapData: function (t, e) {
              for (
                var o = -1,
                  r = this.moduleCount - 1,
                  n = 7,
                  i = 0,
                  a = this.moduleCount - 1;
                a > 0;
                a -= 2
              )
                for (6 == a && a--; ;) {
                  for (var u = 0; u < 2; u++)
                    if (null == this.modules[r][a - u]) {
                      var s = !1;
                      (i < t.length && (s = 1 == ((t[i] >>> n) & 1)),
                        c.getMask(e, r, a - u) && (s = !s),
                        (this.modules[r][a - u] = s),
                        -1 == --n && (i++, (n = 7)));
                    }
                  if ((r += o) < 0 || this.moduleCount <= r) {
                    ((r -= o), (o = -o));
                    break;
                  }
                }
            },
          }),
          (e.PAD0 = 236),
          (e.PAD1 = 17),
          (e.createData = function (t, o, r) {
            for (
              var n = v.getRSBlocks(t, o), i = new p(), a = 0;
              a < r.length;
              a++
            ) {
              var u = r[a];
              (i.put(u.mode, 4),
                i.put(u.getLength(), c.getLengthInBits(u.mode, t)),
                u.write(i));
            }
            var s = 0;
            for (a = 0; a < n.length; a++) s += n[a].dataCount;
            if (i.getLengthInBits() > 8 * s)
              throw new Error(
                "code length overflow. (" +
                  i.getLengthInBits() +
                  ">" +
                  8 * s +
                  ")",
              );
            for (
              i.getLengthInBits() + 4 <= 8 * s && i.put(0, 4);
              i.getLengthInBits() % 8 != 0;
            )
              i.putBit(!1);
            for (
              ;
              !(
                i.getLengthInBits() >= 8 * s ||
                (i.put(e.PAD0, 8), i.getLengthInBits() >= 8 * s)
              );
            )
              i.put(e.PAD1, 8);
            return e.createBytes(i, n);
          }),
          (e.createBytes = function (t, e) {
            for (
              var o = 0,
                r = 0,
                n = 0,
                i = new Array(e.length),
                a = new Array(e.length),
                u = 0;
              u < e.length;
              u++
            ) {
              var s = e[u].dataCount,
                d = e[u].totalCount - s;
              ((r = Math.max(r, s)),
                (n = Math.max(n, d)),
                (i[u] = new Array(s)));
              for (var l = 0; l < i[u].length; l++)
                i[u][l] = 255 & t.buffer[l + o];
              o += s;
              var g = c.getErrorCorrectPolynomial(d),
                h = new m(i[u], g.getLength() - 1).mod(g);
              for (
                a[u] = new Array(g.getLength() - 1), l = 0;
                l < a[u].length;
                l++
              ) {
                var f = l + h.getLength() - a[u].length;
                a[u][l] = f >= 0 ? h.get(f) : 0;
              }
            }
            var v = 0;
            for (l = 0; l < e.length; l++) v += e[l].totalCount;
            var p = new Array(v),
              b = 0;
            for (l = 0; l < r; l++)
              for (u = 0; u < e.length; u++)
                l < i[u].length && (p[b++] = i[u][l]);
            for (l = 0; l < n; l++)
              for (u = 0; u < e.length; u++)
                l < a[u].length && (p[b++] = a[u][l]);
            return p;
          }));
        for (
          var o = {
              MODE_NUMBER: 1,
              MODE_ALPHA_NUM: 2,
              MODE_8BIT_BYTE: 4,
              MODE_KANJI: 8,
            },
            r = { L: 1, M: 0, Q: 3, H: 2 },
            n = 0,
            i = 1,
            a = 2,
            u = 3,
            s = 4,
            d = 5,
            l = 6,
            g = 7,
            c = {
              PATTERN_POSITION_TABLE: [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170],
              ],
              G15: 1335,
              G18: 7973,
              G15_MASK: 21522,
              getBCHTypeInfo: function (t) {
                for (
                  var e = t << 10;
                  c.getBCHDigit(e) - c.getBCHDigit(c.G15) >= 0;
                )
                  e ^= c.G15 << (c.getBCHDigit(e) - c.getBCHDigit(c.G15));
                return ((t << 10) | e) ^ c.G15_MASK;
              },
              getBCHTypeNumber: function (t) {
                for (
                  var e = t << 12;
                  c.getBCHDigit(e) - c.getBCHDigit(c.G18) >= 0;
                )
                  e ^= c.G18 << (c.getBCHDigit(e) - c.getBCHDigit(c.G18));
                return (t << 12) | e;
              },
              getBCHDigit: function (t) {
                for (var e = 0; 0 != t;) (e++, (t >>>= 1));
                return e;
              },
              getPatternPosition: function (t) {
                return c.PATTERN_POSITION_TABLE[t - 1];
              },
              getMask: function (t, e, o) {
                switch (t) {
                  case n:
                    return (e + o) % 2 == 0;
                  case i:
                    return e % 2 == 0;
                  case a:
                    return o % 3 == 0;
                  case u:
                    return (e + o) % 3 == 0;
                  case s:
                    return (Math.floor(e / 2) + Math.floor(o / 3)) % 2 == 0;
                  case d:
                    return ((e * o) % 2) + ((e * o) % 3) == 0;
                  case l:
                    return (((e * o) % 2) + ((e * o) % 3)) % 2 == 0;
                  case g:
                    return (((e * o) % 3) + ((e + o) % 2)) % 2 == 0;
                  default:
                    throw new Error("bad maskPattern:" + t);
                }
              },
              getErrorCorrectPolynomial: function (t) {
                for (var e = new m([1], 0), o = 0; o < t; o++)
                  e = e.multiply(new m([1, h.gexp(o)], 0));
                return e;
              },
              getLengthInBits: function (t, e) {
                if (1 <= e && e < 10)
                  switch (t) {
                    case o.MODE_NUMBER:
                      return 10;
                    case o.MODE_ALPHA_NUM:
                      return 9;
                    case o.MODE_8BIT_BYTE:
                    case o.MODE_KANJI:
                      return 8;
                    default:
                      throw new Error("mode:" + t);
                  }
                else if (e < 27)
                  switch (t) {
                    case o.MODE_NUMBER:
                      return 12;
                    case o.MODE_ALPHA_NUM:
                      return 11;
                    case o.MODE_8BIT_BYTE:
                      return 16;
                    case o.MODE_KANJI:
                      return 10;
                    default:
                      throw new Error("mode:" + t);
                  }
                else {
                  if (!(e < 41)) throw new Error("type:" + e);
                  switch (t) {
                    case o.MODE_NUMBER:
                      return 14;
                    case o.MODE_ALPHA_NUM:
                      return 13;
                    case o.MODE_8BIT_BYTE:
                      return 16;
                    case o.MODE_KANJI:
                      return 12;
                    default:
                      throw new Error("mode:" + t);
                  }
                }
              },
              getLostPoint: function (t) {
                for (var e = t.getModuleCount(), o = 0, r = 0; r < e; r++)
                  for (var n = 0; n < e; n++) {
                    for (var i = 0, a = t.isDark(r, n), u = -1; u <= 1; u++)
                      if (!(r + u < 0 || e <= r + u))
                        for (var s = -1; s <= 1; s++)
                          n + s < 0 ||
                            e <= n + s ||
                            (0 == u && 0 == s) ||
                            (a == t.isDark(r + u, n + s) && i++);
                    i > 5 && (o += 3 + i - 5);
                  }
                for (r = 0; r < e - 1; r++)
                  for (n = 0; n < e - 1; n++) {
                    var d = 0;
                    (t.isDark(r, n) && d++,
                      t.isDark(r + 1, n) && d++,
                      t.isDark(r, n + 1) && d++,
                      t.isDark(r + 1, n + 1) && d++,
                      (0 != d && 4 != d) || (o += 3));
                  }
                for (r = 0; r < e; r++)
                  for (n = 0; n < e - 6; n++)
                    t.isDark(r, n) &&
                      !t.isDark(r, n + 1) &&
                      t.isDark(r, n + 2) &&
                      t.isDark(r, n + 3) &&
                      t.isDark(r, n + 4) &&
                      !t.isDark(r, n + 5) &&
                      t.isDark(r, n + 6) &&
                      (o += 40);
                for (n = 0; n < e; n++)
                  for (r = 0; r < e - 6; r++)
                    t.isDark(r, n) &&
                      !t.isDark(r + 1, n) &&
                      t.isDark(r + 2, n) &&
                      t.isDark(r + 3, n) &&
                      t.isDark(r + 4, n) &&
                      !t.isDark(r + 5, n) &&
                      t.isDark(r + 6, n) &&
                      (o += 40);
                var l = 0;
                for (n = 0; n < e; n++)
                  for (r = 0; r < e; r++) t.isDark(r, n) && l++;
                return o + (Math.abs((100 * l) / e / e - 50) / 5) * 10;
              },
            },
            h = {
              glog: function (t) {
                if (t < 1) throw new Error("glog(" + t + ")");
                return h.LOG_TABLE[t];
              },
              gexp: function (t) {
                for (; t < 0;) t += 255;
                for (; t >= 256;) t -= 255;
                return h.EXP_TABLE[t];
              },
              EXP_TABLE: new Array(256),
              LOG_TABLE: new Array(256),
            },
            f = 0;
          f < 8;
          f++
        )
          h.EXP_TABLE[f] = 1 << f;
        for (f = 8; f < 256; f++)
          h.EXP_TABLE[f] =
            h.EXP_TABLE[f - 4] ^
            h.EXP_TABLE[f - 5] ^
            h.EXP_TABLE[f - 6] ^
            h.EXP_TABLE[f - 8];
        for (f = 0; f < 255; f++) h.LOG_TABLE[h.EXP_TABLE[f]] = f;
        function m(t, e) {
          if (null == t.length) throw new Error(t.length + "/" + e);
          for (var o = 0; o < t.length && 0 == t[o];) o++;
          this.num = new Array(t.length - o + e);
          for (var r = 0; r < t.length - o; r++) this.num[r] = t[r + o];
        }
        function v(t, e) {
          ((this.totalCount = t), (this.dataCount = e));
        }
        function p() {
          ((this.buffer = new Array()), (this.length = 0));
        }
        function b(t) {
          return (
            (t.setFillStyle =
              t.setFillStyle ||
              function (e) {
                t.fillStyle = e;
              }),
            (t.setFontSize =
              t.setFontSize ||
              function (e) {
                t.font = e + "px";
              }),
            (t.setTextAlign =
              t.setTextAlign ||
              function (e) {
                t.textAlign = e;
              }),
            (t.setTextBaseline =
              t.setTextBaseline ||
              function (e) {
                t.textBaseline = e;
              }),
            (t.setGlobalAlpha =
              t.setGlobalAlpha ||
              function (e) {
                t.globalAlpha = e;
              }),
            (t.setStrokeStyle =
              t.setStrokeStyle ||
              function (e) {
                t.strokeStyle = e;
              }),
            (t.setShadow =
              t.setShadow ||
              function (e, o, r, n) {
                ((t.shadowOffsetX = e),
                  (t.shadowOffsetY = o),
                  (t.shadowBlur = r),
                  (t.shadowColor = n));
              }),
            (t.draw =
              t.draw ||
              function (t, e) {
                e && e();
              }),
            t
          );
        }
        function y(t, e) {
          var o = (this.data = "");
          this.dataEncode = !0;
          var r = (this.size = 200);
          ((this.useDynamicSize = !1), (this.dynamicSize = r));
          var n = (this.typeNumber = -1);
          this.errorCorrectLevel = y.errorCorrectLevel.H;
          var i = (this.margin = 0);
          ((this.areaColor = "#FFFFFF"),
            (this.backgroundColor = "rgba(255,255,255,0)"),
            (this.backgroundImageSrc = void 0));
          var a = (this.backgroundImageWidth = void 0),
            u = (this.backgroundImageHeight = void 0),
            s = (this.backgroundImageX = void 0),
            d = (this.backgroundImageY = void 0);
          ((this.backgroundImageAlpha = 1),
            (this.backgroundImageBorderRadius = 0));
          var l = (this.backgroundPadding = 0);
          ((this.foregroundColor = "#000000"),
            (this.foregroundImageSrc = void 0));
          var g = (this.foregroundImageWidth = void 0),
            c = (this.foregroundImageHeight = void 0),
            h = (this.foregroundImageX = void 0),
            f = (this.foregroundImageY = void 0),
            m = (this.foregroundImagePadding = 0);
          this.foregroundImageBackgroundColor = "#FFFFFF";
          var v = (this.foregroundImageBorderRadius = 0),
            p = (this.foregroundImageShadowOffsetX = 0),
            w = (this.foregroundImageShadowOffsetY = 0),
            C = (this.foregroundImageShadowBlur = 0);
          this.foregroundImageShadowColor = "#808080";
          var k = (this.foregroundPadding = 0),
            A = (this.positionProbeBackgroundColor = void 0),
            B = (this.positionProbeForegroundColor = void 0),
            I = (this.separatorColor = void 0),
            S = (this.positionAdjustBackgroundColor = void 0),
            x = (this.positionAdjustForegroundColor = void 0),
            L = (this.timingBackgroundColor = void 0),
            P = (this.timingForegroundColor = void 0),
            E = (this.typeNumberBackgroundColor = void 0),
            T = (this.typeNumberForegroundColor = void 0),
            D = (this.darkBlockColor = void 0);
          ((this.base = void 0),
            (this.modules = []),
            (this.moduleCount = 0),
            (this.drawModules = []));
          var N = (this.canvasContext = void 0);
          (this.loadImage,
            (this.drawReserve = !1),
            (this.isMaked = !1),
            Object.defineProperties(this, {
              data: {
                get() {
                  if ("" === o || void 0 === o)
                    throw (
                      console.error("[uQRCode]: data must be set!"),
                      new y.Error("data must be set!")
                    );
                  return o;
                },
                set(t) {
                  o = String(t);
                },
              },
              size: {
                get: () => r,
                set(t) {
                  r = Number(t);
                },
              },
              typeNumber: {
                get: () => n,
                set(t) {
                  n = Number(t);
                },
              },
              margin: {
                get: () => i,
                set(t) {
                  i = Number(t);
                },
              },
              backgroundImageWidth: {
                get() {
                  return void 0 === a
                    ? this.dynamicSize
                    : this.useDynamicSize
                      ? (this.dynamicSize / this.size) * a
                      : a;
                },
                set(t) {
                  a = Number(t);
                },
              },
              backgroundImageHeight: {
                get() {
                  return void 0 === u
                    ? this.dynamicSize
                    : this.useDynamicSize
                      ? (this.dynamicSize / this.size) * u
                      : u;
                },
                set(t) {
                  u = Number(t);
                },
              },
              backgroundImageX: {
                get() {
                  return void 0 === s
                    ? 0
                    : this.useDynamicSize
                      ? (this.dynamicSize / this.size) * s
                      : s;
                },
                set(t) {
                  s = Number(t);
                },
              },
              backgroundImageY: {
                get() {
                  return void 0 === d
                    ? 0
                    : this.useDynamicSize
                      ? (this.dynamicSize / this.size) * d
                      : d;
                },
                set(t) {
                  d = Number(t);
                },
              },
              backgroundPadding: {
                get: () => l,
                set(t) {
                  l = t > 1 ? 1 : t < 0 ? 0 : t;
                },
              },
              foregroundImageWidth: {
                get() {
                  return void 0 === g
                    ? (this.dynamicSize - 2 * this.margin) / 4
                    : this.useDynamicSize
                      ? (this.dynamicSize / this.size) * g
                      : g;
                },
                set(t) {
                  g = Number(t);
                },
              },
              foregroundImageHeight: {
                get() {
                  return void 0 === c
                    ? (this.dynamicSize - 2 * this.margin) / 4
                    : this.useDynamicSize
                      ? (this.dynamicSize / this.size) * c
                      : c;
                },
                set(t) {
                  c = Number(t);
                },
              },
              foregroundImageX: {
                get() {
                  return void 0 === h
                    ? this.dynamicSize / 2 - this.foregroundImageWidth / 2
                    : this.useDynamicSize
                      ? (this.dynamicSize / this.size) * h
                      : h;
                },
                set(t) {
                  h = Number(t);
                },
              },
              foregroundImageY: {
                get() {
                  return void 0 === f
                    ? this.dynamicSize / 2 - this.foregroundImageHeight / 2
                    : this.useDynamicSize
                      ? (this.dynamicSize / this.size) * f
                      : f;
                },
                set(t) {
                  f = Number(t);
                },
              },
              foregroundImagePadding: {
                get() {
                  return this.useDynamicSize
                    ? (this.dynamicSize / this.size) * m
                    : m;
                },
                set(t) {
                  m = Number(t);
                },
              },
              foregroundImageBorderRadius: {
                get() {
                  return this.useDynamicSize
                    ? (this.dynamicSize / this.size) * v
                    : v;
                },
                set(t) {
                  v = Number(t);
                },
              },
              foregroundImageShadowOffsetX: {
                get() {
                  return this.useDynamicSize
                    ? (this.dynamicSize / this.size) * p
                    : p;
                },
                set(t) {
                  p = Number(t);
                },
              },
              foregroundImageShadowOffsetY: {
                get() {
                  return this.useDynamicSize
                    ? (this.dynamicSize / this.size) * w
                    : w;
                },
                set(t) {
                  w = Number(t);
                },
              },
              foregroundImageShadowBlur: {
                get() {
                  return this.useDynamicSize
                    ? (this.dynamicSize / this.size) * C
                    : C;
                },
                set(t) {
                  C = Number(t);
                },
              },
              foregroundPadding: {
                get: () => k,
                set(t) {
                  k = t > 1 ? 1 : t < 0 ? 0 : t;
                },
              },
              positionProbeBackgroundColor: {
                get() {
                  return A || this.backgroundColor;
                },
                set(t) {
                  A = t;
                },
              },
              positionProbeForegroundColor: {
                get() {
                  return B || this.foregroundColor;
                },
                set(t) {
                  B = t;
                },
              },
              separatorColor: {
                get() {
                  return I || this.backgroundColor;
                },
                set(t) {
                  I = t;
                },
              },
              positionAdjustBackgroundColor: {
                get() {
                  return S || this.backgroundColor;
                },
                set(t) {
                  S = t;
                },
              },
              positionAdjustForegroundColor: {
                get() {
                  return x || this.foregroundColor;
                },
                set(t) {
                  x = t;
                },
              },
              timingBackgroundColor: {
                get() {
                  return L || this.backgroundColor;
                },
                set(t) {
                  L = t;
                },
              },
              timingForegroundColor: {
                get() {
                  return P || this.foregroundColor;
                },
                set(t) {
                  P = t;
                },
              },
              typeNumberBackgroundColor: {
                get() {
                  return E || this.backgroundColor;
                },
                set(t) {
                  E = t;
                },
              },
              typeNumberForegroundColor: {
                get() {
                  return T || this.foregroundColor;
                },
                set(t) {
                  T = t;
                },
              },
              darkBlockColor: {
                get() {
                  return D || this.foregroundColor;
                },
                set(t) {
                  D = t;
                },
              },
              canvasContext: {
                get() {
                  if (void 0 === N)
                    throw (
                      console.error(
                        "[uQRCode]: use drawCanvas, you need to set the canvasContext!",
                      ),
                      new y.Error(
                        "use drawCanvas, you need to set the canvasContext!",
                      )
                    );
                  return N;
                },
                set(t) {
                  N = b(t);
                },
              },
            }),
            y.plugins.forEach((t) => t(y, this, !1)),
            t && this.setOptions(t),
            e && (this.canvasContext = b(e)));
        }
        return (
          (m.prototype = {
            get: function (t) {
              return this.num[t];
            },
            getLength: function () {
              return this.num.length;
            },
            multiply: function (t) {
              for (
                var e = new Array(this.getLength() + t.getLength() - 1), o = 0;
                o < this.getLength();
                o++
              )
                for (var r = 0; r < t.getLength(); r++)
                  e[o + r] ^= h.gexp(h.glog(this.get(o)) + h.glog(t.get(r)));
              return new m(e, 0);
            },
            mod: function (t) {
              if (this.getLength() - t.getLength() < 0) return this;
              for (
                var e = h.glog(this.get(0)) - h.glog(t.get(0)),
                  o = new Array(this.getLength()),
                  r = 0;
                r < this.getLength();
                r++
              )
                o[r] = this.get(r);
              for (r = 0; r < t.getLength(); r++)
                o[r] ^= h.gexp(h.glog(t.get(r)) + e);
              return new m(o, 0).mod(t);
            },
          }),
          (v.RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16],
          ]),
          (v.getRSBlocks = function (t, e) {
            var o = v.getRsBlockTable(t, e);
            if (null == o)
              throw new Error(
                "bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e,
              );
            for (var r = o.length / 3, n = new Array(), i = 0; i < r; i++)
              for (
                var a = o[3 * i + 0], u = o[3 * i + 1], s = o[3 * i + 2], d = 0;
                d < a;
                d++
              )
                n.push(new v(u, s));
            return n;
          }),
          (v.getRsBlockTable = function (t, e) {
            switch (e) {
              case r.L:
                return v.RS_BLOCK_TABLE[4 * (t - 1) + 0];
              case r.M:
                return v.RS_BLOCK_TABLE[4 * (t - 1) + 1];
              case r.Q:
                return v.RS_BLOCK_TABLE[4 * (t - 1) + 2];
              case r.H:
                return v.RS_BLOCK_TABLE[4 * (t - 1) + 3];
              default:
                return;
            }
          }),
          (p.prototype = {
            get: function (t) {
              var e = Math.floor(t / 8);
              return 1 == ((this.buffer[e] >>> (7 - (t % 8))) & 1);
            },
            put: function (t, e) {
              for (var o = 0; o < e; o++)
                this.putBit(1 == ((t >>> (e - o - 1)) & 1));
            },
            getLengthInBits: function () {
              return this.length;
            },
            putBit: function (t) {
              var e = Math.floor(this.length / 8);
              (this.buffer.length <= e && this.buffer.push(0),
                t && (this.buffer[e] |= 128 >>> (this.length % 8)),
                this.length++);
            },
          }),
          (e.errorCorrectLevel = r),
          (y.errorCorrectLevel = e.errorCorrectLevel),
          (y.Error = function (t) {
            this.errMsg = "[uQRCode]: " + t;
          }),
          (y.plugins = []),
          (y.use = function (t) {
            "function" == typeof t && y.plugins.push(t);
          }),
          (y.prototype.loadImage = function (t) {
            return Promise.resolve(t);
          }),
          (y.prototype.setOptions = function (t) {
            var e,
              o,
              r,
              n,
              i,
              a,
              u,
              s,
              d,
              l,
              g,
              c,
              h,
              f,
              m,
              v,
              p,
              b,
              y,
              w,
              C,
              k,
              A,
              B,
              I,
              S,
              x,
              L,
              P,
              E,
              T,
              D,
              N,
              z,
              M,
              F,
              R,
              O,
              _,
              H,
              j,
              U,
              X,
              Y,
              G,
              Q,
              W,
              J,
              q,
              K,
              V,
              Z,
              $,
              tt,
              et,
              ot;
            t &&
              (Object.keys(t).forEach((e) => {
                this[e] = t[e];
              }),
              (function (t = {}, e = {}, o = !1) {
                let r;
                for (var n in ((r = o ? t : { ...t }), e)) {
                  var i = e[n];
                  null != i &&
                    (i.constructor == Object
                      ? (r[n] = this.deepReplace(r[n], i))
                      : i.constructor != String || i
                        ? (r[n] = i)
                        : (r[n] = r[n]));
                }
              })(
                this,
                {
                  data: t.data || t.text,
                  dataEncode: t.dataEncode,
                  size: t.size,
                  useDynamicSize: t.useDynamicSize,
                  typeNumber: t.typeNumber,
                  errorCorrectLevel: t.errorCorrectLevel,
                  margin: t.margin,
                  areaColor: t.areaColor,
                  backgroundColor:
                    t.backgroundColor ||
                    (null === (e = t.background) || void 0 === e
                      ? void 0
                      : e.color),
                  backgroundImageSrc:
                    t.backgroundImageSrc ||
                    (null === (o = t.background) ||
                    void 0 === o ||
                    null === (r = o.image) ||
                    void 0 === r
                      ? void 0
                      : r.src),
                  backgroundImageWidth:
                    t.backgroundImageWidth ||
                    (null === (n = t.background) ||
                    void 0 === n ||
                    null === (i = n.image) ||
                    void 0 === i
                      ? void 0
                      : i.width),
                  backgroundImageHeight:
                    t.backgroundImageHeight ||
                    (null === (a = t.background) ||
                    void 0 === a ||
                    null === (u = a.image) ||
                    void 0 === u
                      ? void 0
                      : u.height),
                  backgroundImageX:
                    t.backgroundImageX ||
                    (null === (s = t.background) ||
                    void 0 === s ||
                    null === (d = s.image) ||
                    void 0 === d
                      ? void 0
                      : d.x),
                  backgroundImageY:
                    t.backgroundImageY ||
                    (null === (l = t.background) ||
                    void 0 === l ||
                    null === (g = l.image) ||
                    void 0 === g
                      ? void 0
                      : g.y),
                  backgroundImageAlpha:
                    t.backgroundImageAlpha ||
                    (null === (c = t.background) ||
                    void 0 === c ||
                    null === (h = c.image) ||
                    void 0 === h
                      ? void 0
                      : h.alpha),
                  backgroundImageBorderRadius:
                    t.backgroundImageBorderRadius ||
                    (null === (f = t.background) ||
                    void 0 === f ||
                    null === (m = f.image) ||
                    void 0 === m
                      ? void 0
                      : m.borderRadius),
                  backgroundPadding: t.backgroundPadding,
                  foregroundColor:
                    t.foregroundColor ||
                    (null === (v = t.foreground) || void 0 === v
                      ? void 0
                      : v.color),
                  foregroundImageSrc:
                    t.foregroundImageSrc ||
                    (null === (p = t.foreground) ||
                    void 0 === p ||
                    null === (b = p.image) ||
                    void 0 === b
                      ? void 0
                      : b.src),
                  foregroundImageWidth:
                    t.foregroundImageWidth ||
                    (null === (y = t.foreground) ||
                    void 0 === y ||
                    null === (w = y.image) ||
                    void 0 === w
                      ? void 0
                      : w.width),
                  foregroundImageHeight:
                    t.foregroundImageHeight ||
                    (null === (C = t.foreground) ||
                    void 0 === C ||
                    null === (k = C.image) ||
                    void 0 === k
                      ? void 0
                      : k.height),
                  foregroundImageX:
                    t.foregroundImageX ||
                    (null === (A = t.foreground) ||
                    void 0 === A ||
                    null === (B = A.image) ||
                    void 0 === B
                      ? void 0
                      : B.x),
                  foregroundImageY:
                    t.foregroundImageY ||
                    (null === (I = t.foreground) ||
                    void 0 === I ||
                    null === (S = I.image) ||
                    void 0 === S
                      ? void 0
                      : S.y),
                  foregroundImagePadding:
                    t.foregroundImagePadding ||
                    (null === (x = t.foreground) ||
                    void 0 === x ||
                    null === (L = x.image) ||
                    void 0 === L
                      ? void 0
                      : L.padding),
                  foregroundImageBackgroundColor:
                    t.foregroundImageBackgroundColor ||
                    (null === (P = t.foreground) ||
                    void 0 === P ||
                    null === (E = P.image) ||
                    void 0 === E
                      ? void 0
                      : E.backgroundColor),
                  foregroundImageBorderRadius:
                    t.foregroundImageBorderRadius ||
                    (null === (T = t.foreground) ||
                    void 0 === T ||
                    null === (D = T.image) ||
                    void 0 === D
                      ? void 0
                      : D.borderRadius),
                  foregroundImageShadowOffsetX:
                    t.foregroundImageShadowOffsetX ||
                    (null === (N = t.foreground) ||
                    void 0 === N ||
                    null === (z = N.image) ||
                    void 0 === z
                      ? void 0
                      : z.shadowOffsetX),
                  foregroundImageShadowOffsetY:
                    t.foregroundImageShadowOffsetY ||
                    (null === (M = t.foreground) ||
                    void 0 === M ||
                    null === (F = M.image) ||
                    void 0 === F
                      ? void 0
                      : F.shadowOffsetY),
                  foregroundImageShadowBlur:
                    t.foregroundImageShadowBlur ||
                    (null === (R = t.foreground) ||
                    void 0 === R ||
                    null === (O = R.image) ||
                    void 0 === O
                      ? void 0
                      : O.shadowBlur),
                  foregroundImageShadowColor:
                    t.foregroundImageShadowColor ||
                    (null === (_ = t.foreground) ||
                    void 0 === _ ||
                    null === (H = _.image) ||
                    void 0 === H
                      ? void 0
                      : H.shadowColor),
                  foregroundPadding: t.foregroundPadding,
                  positionProbeBackgroundColor:
                    t.positionProbeBackgroundColor ||
                    (null === (j = t.positionProbe) || void 0 === j
                      ? void 0
                      : j.backgroundColor) ||
                    (null === (U = t.positionDetection) || void 0 === U
                      ? void 0
                      : U.backgroundColor),
                  positionProbeForegroundColor:
                    t.positionProbeForegroundColor ||
                    (null === (X = t.positionProbe) || void 0 === X
                      ? void 0
                      : X.foregroundColor) ||
                    (null === (Y = t.positionDetection) || void 0 === Y
                      ? void 0
                      : Y.foregroundColor),
                  separatorColor:
                    t.separatorColor ||
                    (null === (G = t.separator) || void 0 === G
                      ? void 0
                      : G.color),
                  positionAdjustBackgroundColor:
                    t.positionAdjustBackgroundColor ||
                    (null === (Q = t.positionAdjust) || void 0 === Q
                      ? void 0
                      : Q.backgroundColor) ||
                    (null === (W = t.alignment) || void 0 === W
                      ? void 0
                      : W.backgroundColor),
                  positionAdjustForegroundColor:
                    t.positionAdjustForegroundColor ||
                    (null === (J = t.positionAdjust) || void 0 === J
                      ? void 0
                      : J.foregroundColor) ||
                    (null === (q = t.alignment) || void 0 === q
                      ? void 0
                      : q.foregroundColor),
                  timingBackgroundColor:
                    t.timingBackgroundColor ||
                    (null === (K = t.timing) || void 0 === K
                      ? void 0
                      : K.backgroundColor),
                  timingForegroundColor:
                    t.timingForegroundColor ||
                    (null === (V = t.timing) || void 0 === V
                      ? void 0
                      : V.foregroundColor),
                  typeNumberBackgroundColor:
                    t.typeNumberBackgroundColor ||
                    (null === (Z = t.typeNumber) || void 0 === Z
                      ? void 0
                      : Z.backgroundColor) ||
                    (null === ($ = t.versionInformation) || void 0 === $
                      ? void 0
                      : $.backgroundColor),
                  typeNumberForegroundColor:
                    t.typeNumberForegroundColor ||
                    (null === (tt = t.typeNumber) || void 0 === tt
                      ? void 0
                      : tt.foregroundColor) ||
                    (null === (et = t.versionInformation) || void 0 === et
                      ? void 0
                      : et.foregroundColor),
                  darkBlockColor:
                    t.darkBlockColor ||
                    (null === (ot = t.darkBlock) || void 0 === ot
                      ? void 0
                      : ot.color),
                },
                !0,
              ));
          }),
          (y.prototype.make = function () {
            let {
              foregroundColor: t,
              backgroundColor: o,
              typeNumber: r,
              errorCorrectLevel: n,
              data: i,
              dataEncode: a,
              size: u,
              margin: s,
              useDynamicSize: d,
            } = this;
            if (t === o)
              throw (
                console.error(
                  "[uQRCode]: foregroundColor and backgroundColor cannot be the same!",
                ),
                new y.Error(
                  "foregroundColor and backgroundColor cannot be the same!",
                )
              );
            a &&
              (i = (function (t) {
                t = t.toString();
                for (var e, o = "", r = 0; r < t.length; r++)
                  (e = t.charCodeAt(r)) >= 1 && e <= 127
                    ? (o += t.charAt(r))
                    : e > 2047
                      ? ((o += String.fromCharCode(224 | ((e >> 12) & 15))),
                        (o += String.fromCharCode(128 | ((e >> 6) & 63))),
                        (o += String.fromCharCode(128 | ((e >> 0) & 63))))
                      : ((o += String.fromCharCode(192 | ((e >> 6) & 31))),
                        (o += String.fromCharCode(128 | ((e >> 0) & 63))));
                return o;
              })(i));
            var l = new e(r, n);
            (l.addData(i),
              l.make(),
              (this.base = l),
              (this.typeNumber = l.typeNumber),
              (this.modules = l.modules),
              (this.moduleCount = l.moduleCount),
              (this.dynamicSize = d
                ? Math.ceil((u - 2 * s) / l.moduleCount) * l.moduleCount + 2 * s
                : u),
              (function (t) {
                let {
                  dynamicSize: e,
                  margin: o,
                  backgroundColor: r,
                  backgroundPadding: n,
                  foregroundColor: i,
                  foregroundPadding: a,
                  modules: u,
                  moduleCount: s,
                } = t;
                var d = (e - 2 * o) / s,
                  l = d,
                  g = 0;
                n > 0 && (l -= 2 * (g = (l * n) / 2));
                var c = d,
                  h = 0;
                a > 0 && (c -= 2 * (h = (c * a) / 2));
                for (var f = 0; f < s; f++)
                  for (var m = 0; m < s; m++) {
                    var v = m * d + o,
                      p = f * d + o;
                    if (u[f][m]) {
                      var b = h,
                        y = v + h,
                        w = p + h,
                        C = c,
                        k = c;
                      u[f][m] = {
                        type: ["foreground"],
                        color: i,
                        isBlack: !0,
                        isDrawn: !1,
                        destX: v,
                        destY: p,
                        destWidth: d,
                        destHeight: d,
                        x: y,
                        y: w,
                        width: C,
                        height: k,
                        paddingTop: b,
                        paddingRight: b,
                        paddingBottom: b,
                        paddingLeft: b,
                      };
                    } else
                      ((b = g),
                        (y = v + g),
                        (w = p + g),
                        (C = l),
                        (k = l),
                        (u[f][m] = {
                          type: ["background"],
                          color: r,
                          isBlack: !1,
                          isDrawn: !1,
                          destX: v,
                          destY: p,
                          destWidth: d,
                          destHeight: d,
                          x: y,
                          y: w,
                          width: C,
                          height: k,
                          paddingTop: b,
                          paddingRight: b,
                          paddingBottom: b,
                          paddingLeft: b,
                        }));
                  }
              })(this),
              (function (t) {
                let {
                  modules: e,
                  moduleCount: o,
                  positionProbeBackgroundColor: r,
                  positionProbeForegroundColor: n,
                } = t;
                var i = o - 7;
                [
                  [0, 0, 1],
                  [1, 0, 1],
                  [2, 0, 1],
                  [3, 0, 1],
                  [4, 0, 1],
                  [5, 0, 1],
                  [6, 0, 1],
                  [0, 1, 1],
                  [1, 1, 0],
                  [2, 1, 0],
                  [3, 1, 0],
                  [4, 1, 0],
                  [5, 1, 0],
                  [6, 1, 1],
                  [0, 2, 1],
                  [1, 2, 0],
                  [2, 2, 1],
                  [3, 2, 1],
                  [4, 2, 1],
                  [5, 2, 0],
                  [6, 2, 1],
                  [0, 3, 1],
                  [1, 3, 0],
                  [2, 3, 1],
                  [3, 3, 1],
                  [4, 3, 1],
                  [5, 3, 0],
                  [6, 3, 1],
                  [0, 4, 1],
                  [1, 4, 0],
                  [2, 4, 1],
                  [3, 4, 1],
                  [4, 4, 1],
                  [5, 4, 0],
                  [6, 4, 1],
                  [0, 5, 1],
                  [1, 5, 0],
                  [2, 5, 0],
                  [3, 5, 0],
                  [4, 5, 0],
                  [5, 5, 0],
                  [6, 5, 1],
                  [0, 6, 1],
                  [1, 6, 1],
                  [2, 6, 1],
                  [3, 6, 1],
                  [4, 6, 1],
                  [5, 6, 1],
                  [6, 6, 1],
                ].forEach((t) => {
                  var o = e[t[0]][t[1]],
                    a = e[t[0] + i][t[1]],
                    u = e[t[0]][t[1] + i];
                  (u.type.push("positionProbe"),
                    a.type.push("positionProbe"),
                    o.type.push("positionProbe"),
                    (o.color = 1 == t[2] ? n : r),
                    (a.color = 1 == t[2] ? n : r),
                    (u.color = 1 == t[2] ? n : r));
                });
              })(this),
              (function (t) {
                let { modules: e, moduleCount: o, separatorColor: r } = t;
                [
                  [7, 0],
                  [7, 1],
                  [7, 2],
                  [7, 3],
                  [7, 4],
                  [7, 5],
                  [7, 6],
                  [7, 7],
                  [0, 7],
                  [1, 7],
                  [2, 7],
                  [3, 7],
                  [4, 7],
                  [5, 7],
                  [6, 7],
                ].forEach((t) => {
                  var n = e[t[0]][t[1]],
                    i = e[o - t[0] - 1][t[1]],
                    a = e[t[0]][o - t[1] - 1];
                  (a.type.push("separator"),
                    i.type.push("separator"),
                    n.type.push("separator"),
                    (n.color = r),
                    (i.color = r),
                    (a.color = r));
                });
              })(this),
              (function (t) {
                let {
                  typeNumber: e,
                  modules: o,
                  moduleCount: r,
                  foregroundColor: n,
                  backgroundColor: i,
                  positionAdjustForegroundColor: a,
                  positionAdjustBackgroundColor: u,
                  timingForegroundColor: s,
                  timingBackgroundColor: d,
                } = t;
                var l = [
                  [],
                  [6, 18],
                  [6, 22],
                  [6, 26],
                  [6, 30],
                  [6, 34],
                  [6, 22, 38],
                  [6, 24, 42],
                  [6, 26, 46],
                  [6, 28, 50],
                  [6, 30, 54],
                  [6, 32, 58],
                  [6, 34, 62],
                  [6, 26, 46, 66],
                  [6, 26, 48, 70],
                  [6, 26, 50, 74],
                  [6, 30, 54, 78],
                  [6, 30, 56, 82],
                  [6, 30, 58, 86],
                  [6, 34, 62, 90],
                  [6, 28, 50, 72, 94],
                  [6, 26, 50, 74, 98],
                  [6, 30, 54, 78, 102],
                  [6, 28, 54, 80, 106],
                  [6, 32, 58, 84, 110],
                  [6, 30, 58, 86, 114],
                  [6, 34, 62, 90, 118],
                  [6, 26, 50, 74, 98, 122],
                  [6, 30, 54, 78, 102, 126],
                  [6, 26, 52, 78, 104, 130],
                  [6, 30, 56, 82, 108, 134],
                  [6, 34, 60, 86, 112, 138],
                  [6, 30, 58, 86, 114, 142],
                  [6, 34, 62, 90, 118, 146],
                  [6, 30, 54, 78, 102, 126, 150],
                  [6, 24, 50, 76, 102, 128, 154],
                  [6, 28, 54, 80, 106, 132, 158],
                  [6, 32, 58, 84, 110, 136, 162],
                  [6, 26, 54, 82, 110, 138, 166],
                  [6, 30, 58, 86, 114, 142, 170],
                ][e - 1];
                if (l)
                  for (
                    var g = [
                        [-2, -2, 1],
                        [-1, -2, 1],
                        [0, -2, 1],
                        [1, -2, 1],
                        [2, -2, 1],
                        [-2, -1, 1],
                        [-1, -1, 0],
                        [0, -1, 0],
                        [1, -1, 0],
                        [2, -1, 1],
                        [-2, 0, 1],
                        [-1, 0, 0],
                        [0, 0, 1],
                        [1, 0, 0],
                        [2, 0, 1],
                        [-2, 1, 1],
                        [-1, 1, 0],
                        [0, 1, 0],
                        [1, 1, 0],
                        [2, 1, 1],
                        [-2, 2, 1],
                        [-1, 2, 1],
                        [0, 2, 1],
                        [1, 2, 1],
                        [2, 2, 1],
                      ],
                      c = l.length,
                      h = 0;
                    h < c;
                    h++
                  )
                    for (var f = 0; f < c; f++) {
                      var { x: m, y: v } = { x: l[h], y: l[f] };
                      (m < 9 && v < 9) ||
                        (m > r - 9 - 1 && v < 9) ||
                        (v > r - 9 - 1 && m < 9) ||
                        g.forEach((t) => {
                          var e = o[m + t[0]][v + t[1]];
                          (e.type.push("positionAdjust"),
                            e.type.includes("timing")
                              ? 1 == t[2]
                                ? (e.color = a == n ? s : a)
                                : (e.color = a == n && u == i ? d : u)
                              : (e.color = 1 == t[2] ? a : u));
                        });
                    }
              })(this),
              (function (t) {
                let {
                  modules: e,
                  moduleCount: o,
                  timingForegroundColor: r,
                  timingBackgroundColor: n,
                } = t;
                for (var i = o - 16, a = 0; a < i; a++) {
                  var u = e[6][8 + a],
                    s = e[8 + a][6];
                  (u.type.push("timing"),
                    s.type.push("timing"),
                    (u.color = (1 & a) ^ 1 ? r : n),
                    (s.color = (1 & a) ^ 1 ? r : n));
                }
              })(this),
              (function (t) {
                let { modules: e, moduleCount: o, darkBlockColor: r } = t;
                var n = e[o - 7 - 1][8];
                (n.type.push("darkBlock"), (n.color = r));
              })(this),
              (function (t) {
                let {
                  typeNumber: e,
                  modules: o,
                  moduleCount: r,
                  typeNumberBackgroundColor: n,
                  typeNumberForegroundColor: i,
                } = t;
                if (e < 7) return o;
                var a = [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    "000111110010010100",
                    "001000010110111100",
                    "001001101010011001",
                    "001010010011010011",
                    "001011101111110110",
                    "001100011101100010",
                    "001101100001000111",
                    "001110011000001101",
                    "001111100100101000",
                    "010000101101111000",
                    "010001010001011101",
                    "010010101000010111",
                    "010011010100110010",
                    "010100100110100110",
                    "010101011010000011",
                    "010110100011001001",
                    "010111011111101100",
                    "011000111011000100",
                    "011001000111100001",
                    "011010111110101011",
                    "011011000010001110",
                    "011100110000011010",
                    "011101001100111111",
                    "011110110101110101",
                    "011111001001010000",
                    "100000100111010101",
                    "100001011011110000",
                    "100010100010111010",
                    "100011011110011111",
                    "100100101100001011",
                    "100101010000101110",
                    "100110101001100100",
                    "100111010101000001",
                    "101000110001101001",
                  ],
                  u = a[e] + a[e],
                  s = [r - 11, r - 10, r - 9];
                [
                  [5, s[2]],
                  [5, s[1]],
                  [5, s[0]],
                  [4, s[2]],
                  [4, s[1]],
                  [4, s[0]],
                  [3, s[2]],
                  [3, s[1]],
                  [3, s[0]],
                  [2, s[2]],
                  [2, s[1]],
                  [2, s[0]],
                  [1, s[2]],
                  [1, s[1]],
                  [1, s[0]],
                  [0, s[2]],
                  [0, s[1]],
                  [0, s[0]],
                  [s[2], 5],
                  [s[1], 5],
                  [s[0], 5],
                  [s[2], 4],
                  [s[1], 4],
                  [s[0], 4],
                  [s[2], 3],
                  [s[1], 3],
                  [s[0], 3],
                  [s[2], 2],
                  [s[1], 2],
                  [s[0], 2],
                  [s[2], 1],
                  [s[1], 1],
                  [s[0], 1],
                  [s[2], 0],
                  [s[1], 0],
                  [s[0], 0],
                ].forEach((t, e) => {
                  var r = o[t[0]][t[1]];
                  (r.type.push("typeNumber"), (r.color = "1" == u[e] ? i : n));
                });
              })(this),
              (this.isMaked = !0),
              (this.drawModules = []));
          }),
          (y.prototype.getDrawModules = function () {
            if (this.drawModules && this.drawModules.length > 0)
              return this.drawModules;
            let t = (this.drawModules = []),
              {
                modules: e,
                moduleCount: o,
                dynamicSize: r,
                areaColor: n,
                backgroundImageSrc: i,
                backgroundImageX: a,
                backgroundImageY: u,
                backgroundImageWidth: s,
                backgroundImageHeight: d,
                backgroundImageAlpha: l,
                backgroundImageBorderRadius: g,
                foregroundImageSrc: c,
                foregroundImageX: h,
                foregroundImageY: f,
                foregroundImageWidth: m,
                foregroundImageHeight: v,
                foregroundImagePadding: p,
                foregroundImageBackgroundColor: b,
                foregroundImageBorderRadius: y,
                foregroundImageShadowOffsetX: w,
                foregroundImageShadowOffsetY: C,
                foregroundImageShadowBlur: k,
                foregroundImageShadowColor: A,
              } = this;
            (n &&
              t.push({
                name: "area",
                type: "area",
                color: n,
                x: 0,
                y: 0,
                width: r,
                height: r,
              }),
              i &&
                t.push({
                  name: "backgroundImage",
                  type: "image",
                  imageSrc: i,
                  mappingName: "backgroundImageSrc",
                  x: a,
                  y: u,
                  width: s,
                  height: d,
                  alpha: l,
                  borderRadius: g,
                }));
            for (var B = 0; B < o; B++)
              for (var I = 0; I < o; I++) {
                var S = e[B][I];
                S.isDrawn ||
                  (S.type.includes("foreground")
                    ? t.push({
                        name: "foreground",
                        type: "tile",
                        color: S.color,
                        destX: S.destX,
                        destY: S.destY,
                        destWidth: S.destWidth,
                        destHeight: S.destHeight,
                        x: S.x,
                        y: S.y,
                        width: S.width,
                        height: S.height,
                        paddingTop: S.paddingTop,
                        paddingRight: S.paddingRight,
                        paddingBottom: S.paddingBottom,
                        paddingLeft: S.paddingLeft,
                        rowIndex: B,
                        colIndex: I,
                      })
                    : t.push({
                        name: "background",
                        type: "tile",
                        color: S.color,
                        destX: S.destX,
                        destY: S.destY,
                        destWidth: S.destWidth,
                        destHeight: S.destHeight,
                        x: S.x,
                        y: S.y,
                        width: S.width,
                        height: S.height,
                        paddingTop: S.paddingTop,
                        paddingRight: S.paddingRight,
                        paddingBottom: S.paddingBottom,
                        paddingLeft: S.paddingLeft,
                        rowIndex: B,
                        colIndex: I,
                      }),
                  (S.isDrawn = !0));
              }
            return (
              c &&
                t.push({
                  name: "foregroundImage",
                  type: "image",
                  imageSrc: c,
                  mappingName: "foregroundImageSrc",
                  x: h,
                  y: f,
                  width: m,
                  height: v,
                  padding: p,
                  backgroundColor: b,
                  borderRadius: y,
                  shadowOffsetX: w,
                  shadowOffsetY: C,
                  shadowBlur: k,
                  shadowColor: A,
                }),
              t
            );
          }),
          (y.prototype.isBlack = function (t, e) {
            var o = this.moduleCount;
            return (
              !(0 > t || 0 > e || t >= o || e >= o) &&
              this.modules[t][e].isBlack
            );
          }),
          (y.prototype.drawCanvas = function (t) {
            let {
              isMaked: e,
              canvasContext: o,
              useDynamicSize: r,
              dynamicSize: n,
              foregroundColor: i,
              foregroundPadding: a,
              backgroundColor: u,
              backgroundPadding: s,
              drawReserve: d,
              margin: l,
            } = this;
            if (!e)
              return (
                console.error(
                  "[uQRCode]: please execute the make method first!",
                ),
                Promise.reject(
                  new y.Error("please execute the make method first!"),
                )
              );
            let g = this.getDrawModules(),
              c = async (e, r) => {
                try {
                  o.draw(t);
                  for (var n = 0; n < g.length; n++) {
                    var i = g[n];
                    switch ((o.save(), i.type)) {
                      case "area":
                        (o.setFillStyle(i.color),
                          o.fillRect(i.x, i.y, i.width, i.height));
                        break;
                      case "tile":
                        var a = i.x,
                          u = i.y,
                          s = i.width,
                          l = i.height;
                        (o.setFillStyle(i.color), o.fillRect(a, u, s, l));
                        break;
                      case "image":
                        if ("backgroundImage" === i.name) {
                          ((a = Math.round(i.x)),
                            (u = Math.round(i.y)),
                            (s = Math.round(i.width)),
                            (l = Math.round(i.height)),
                            s < 2 * (h = Math.round(i.borderRadius)) &&
                              (h = s / 2),
                            l < 2 * h && (h = l / 2),
                            o.setGlobalAlpha(i.alpha),
                            h > 0 &&
                              (o.beginPath(),
                              o.moveTo(a + h, u),
                              o.arcTo(a + s, u, a + s, u + l, h),
                              o.arcTo(a + s, u + l, a, u + l, h),
                              o.arcTo(a, u + l, a, u, h),
                              o.arcTo(a, u, a + s, u, h),
                              o.closePath(),
                              o.setStrokeStyle("rgba(0,0,0,0)"),
                              o.stroke(),
                              o.clip()));
                          try {
                            var c = await this.loadImage(i.imageSrc);
                            o.drawImage(c, a, u, s, l);
                          } catch (t) {
                            throw (
                              console.error(
                                `[uQRCode]: ${i.mappingName} invalid!`,
                              ),
                              new y.Error(i.mappingName + " invalid!")
                            );
                          }
                        } else if ("foregroundImage" === i.name) {
                          ((a = Math.round(i.x)),
                            (u = Math.round(i.y)),
                            (s = Math.round(i.width)),
                            (l = Math.round(i.height)));
                          var h,
                            f = Math.round(i.padding);
                          (s < 2 * (h = Math.round(i.borderRadius)) &&
                            (h = s / 2),
                            l < 2 * h && (h = l / 2));
                          var m = a - f,
                            v = u - f,
                            p = s + 2 * f,
                            b = l + 2 * f,
                            w = Math.round((p / s) * h);
                          (p < 2 * w && (w = p / 2),
                            b < 2 * w && (w = b / 2),
                            o.save(),
                            o.setShadow(
                              i.shadowOffsetX,
                              i.shadowOffsetY,
                              i.shadowBlur,
                              i.shadowColor,
                            ),
                            w > 0
                              ? (o.beginPath(),
                                o.moveTo(m + w, v),
                                o.arcTo(m + p, v, m + p, v + b, w),
                                o.arcTo(m + p, v + b, m, v + b, w),
                                o.arcTo(m, v + b, m, v, w),
                                o.arcTo(m, v, m + p, v, w),
                                o.closePath(),
                                o.setFillStyle(i.backgroundColor),
                                o.fill())
                              : (o.setFillStyle(i.backgroundColor),
                                o.fillRect(m, v, p, b)),
                            o.restore(),
                            o.save(),
                            w > 0
                              ? (o.beginPath(),
                                o.moveTo(m + w, v),
                                o.arcTo(m + p, v, m + p, v + b, w),
                                o.arcTo(m + p, v + b, m, v + b, w),
                                o.arcTo(m, v + b, m, v, w),
                                o.arcTo(m, v, m + p, v, w),
                                o.closePath(),
                                o.setFillStyle(
                                  f > 0 ? i.backgroundColor : "rgba(0,0,0,0)",
                                ),
                                o.fill())
                              : (o.setFillStyle(
                                  f > 0 ? i.backgroundColor : "rgba(0,0,0,0)",
                                ),
                                o.fillRect(m, v, p, b)),
                            o.restore(),
                            h > 0 &&
                              (o.beginPath(),
                              o.moveTo(a + h, u),
                              o.arcTo(a + s, u, a + s, u + l, h),
                              o.arcTo(a + s, u + l, a, u + l, h),
                              o.arcTo(a, u + l, a, u, h),
                              o.arcTo(a, u, a + s, u, h),
                              o.closePath(),
                              o.setStrokeStyle("rgba(0,0,0,0)"),
                              o.stroke(),
                              o.clip()));
                          try {
                            ((c = await this.loadImage(i.imageSrc)),
                              o.drawImage(c, a, u, s, l));
                          } catch (t) {
                            throw (
                              console.error(
                                `[uQRCode]: ${i.mappingName} invalid!`,
                              ),
                              new y.Error(i.mappingName + " invalid!")
                            );
                          }
                        }
                    }
                    (d && o.draw(!0), o.restore());
                  }
                  (o.draw(!0), setTimeout(e, 150));
                } catch (t) {
                  r(t);
                }
              };
            return new Promise((t, e) => {
              c(t, e);
            });
          }),
          (y.prototype.draw = function (t) {
            return this.drawCanvas(t);
          }),
          (y.prototype.register = function (t) {
            t && t(y, this, !0);
          }),
          y
        );
      });
    }).call(this, o("c8ba"));
  },
  1777: function (t, e, o) {
    "use strict";
    var r = o("e06c"),
      n = o.n(r);
    n.a;
  },
  "1da1": function (t, e, o) {
    "use strict";
    function r(t, e, o, r, n, i, a) {
      try {
        var u = t[i](a),
          s = u.value;
      } catch (d) {
        return void o(d);
      }
      u.done ? e(s) : Promise.resolve(s).then(r, n);
    }
    function n(t) {
      return function () {
        var e = this,
          o = arguments;
        return new Promise(function (n, i) {
          var a = t.apply(e, o);
          function u(t) {
            r(a, n, i, u, s, "next", t);
          }
          function s(t) {
            r(a, n, i, u, s, "throw", t);
          }
          u(void 0);
        });
      };
    }
    (o.r(e),
      o.d(e, "default", function () {
        return n;
      }));
  },
  "32d9": function (t, e, o) {
    var r = o("24fb");
    ((e = r(!1)),
      e.push([
        t.i,
        '@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.yunajia[data-v-e76b01a2]{width:%?690?%;height:%?90?%;background:#fa3534;border-radius:%?100?%;text-align:center;line-height:%?90?%;color:#fff;margin:0 auto;margin-top:%?60?%}.link-box[data-v-e76b01a2]{margin:%?30?% %?28?%;padding:%?30?% %?54?%}.link-box .title[data-v-e76b01a2]{font-weight:700;font-size:%?30?%;color:#12120c}.link-box .link-btn-box[data-v-e76b01a2]{margin-top:%?20?%;word-break:break-all}.link-box .link-btn-box .link[data-v-e76b01a2]{max-width:%?447?%;font-weight:700;font-size:%?28?%;color:#12120c}.chongzhi-code[data-v-e76b01a2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;width:100%;height:100%;top:0;left:0;padding-top:%?100?%}.chongzhi-code .code-bg[data-v-e76b01a2]{background:-webkit-linear-gradient(bottom,rgba(255,157,17,.23),rgba(255,198,125,.23));background:linear-gradient(0deg,rgba(255,157,17,.23),rgba(255,198,125,.23));border-radius:%?28?%;padding:%?38?% %?36?%;margin-top:%?30?%}.chongzhi-code .code-bg .code-text[data-v-e76b01a2]{font-weight:500;font-size:%?35?%;color:#2c2f37;text-align:center;margin-top:%?33?%}.chongzhi-code .title-box[data-v-e76b01a2]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:relative}.chongzhi-code .title-box .title[data-v-e76b01a2]{font-weight:800;font-size:%?34?%;color:#f84340;margin-left:%?15?%}.chongzhi-code .text[data-v-e76b01a2]{font-weight:700;font-size:%?30?%;color:#f84340;margin-top:%?37?%;padding:0 %?95?%;word-break:break-all}.tabs[data-v-e76b01a2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin:0 %?28?%;margin-top:%?30?%;background:#f3f3f3;border-radius:%?39?%}.tabs .tab-item[data-v-e76b01a2]{padding:%?20?% %?76?%;font-weight:700;font-size:%?30?%;color:#12120c;border-radius:%?39?%}.tabs .tab-item-active[data-v-e76b01a2]{color:#fff;font-weight:700;background:#fa3534}.chongzhi-box[data-v-e76b01a2]{margin:%?28?%;position:relative}',
        "",
      ]),
      (t.exports = e));
  },
  "6bc0": function (t, e, o) {
    "use strict";
    o.r(e);
    var r = o("ddcf"),
      n = o.n(r);
    for (var i in r)
      ["default"].indexOf(i) < 0 &&
        (function (t) {
          o.d(e, t, function () {
            return r[t];
          });
        })(i);
    e["default"] = n.a;
  },
  "6fa3": function (t, e) {
    t.exports =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAACZdJREFUaEPt2neXZFUVBfA9ImIAQVHMCmLAhAHMARUQMH0F//eD+An8EPxpXuYsKBgBFVRwGMXAGMYxjBjQ/vU6p9edR3X1q67utnst71q1qrvq1X1337PPPuG+Y9ndOCfJBUmeleQVSa5M8tIkT6/Pfe/V4z9JvNYdx5I8Kon3fyf5Z5K/JPldkp8nuSfJXUnuS/KbJP9w4arDb85L8pQklyd5TZKrkrwsyTOSnF/g9hvgwwAUwN8nuTfJD5N8N8ndSe5P8tBuAD4myVOTXJHklQXw5QUWuP/FeCjJL8uCAP4gyY+TnF4VIHpclORFSd6c5LUF9Jll0Z5vSslV77Nok6YUN+c47+miJevdmeR7SU6ucmPgHpvk2Ulen+TGAgicz1Hy70UZ73ykR/vNOtbtTWugj06CTY9P8riamCX53k+SfCfJL1YBCMSTymJvS3JDklcNk/81ya9MmoRPANnzA7/KvbazIL+zceYC6sJiztOSPLk22n1/m+T7hGfuTV33xBKRVycB8O0F1mL+leR4TYr/HBzgphGA61qR5agmgOai4lT7siQvLrchcgZLUtT75gL0IxM+N8nVSd6R5C0lLHb1wQL31Q3qfrPAnqmbtbTPBTj61nR9ANpMc7EeQPSAkr8uyQuLsm6NSbMt6AcoIe4BeF2Sa5I8v3yOY399w6pfTvLtAjz64FQQlvliXzu+u54FzWlDffeEJBcneUFpwrXlMtzIEBuPz7Fg36jDg6DOggA+J8kfS7HaeqjR1ltHVPq34xpHJSUyQD4vyRuTvLuA8keDDiwFeG4SL8D4kOCOFqwmsLOkePiHkmWW+1EJDSoZHewXZTHTzWUdgbt/O2dzgOQ2b9oI8O+v0EXVDevaFiDFJCr8jgwD6jMvtLi0/M81fyqf6/Toz0Naxle2GyNtW0D+JjgX7YEdaT6dx++tC4sAfF/pQgvNWRR1sd32A9kIyWVq6RiQrOc7C2ZRwHDd3+h4ql4kun3EgrZzgf68NwBAgGwOap0sCwBrfsIyZYHf0oW2IIoCSlkNc2yJTKvSJbUjfiSgsxaAwKFDB1t/N2A3R6uRlsssN/rWmPkACAyAvy5WnCjKA0r6xzH1wZuSvKEM4zrKvgmQFewE2qkI5JfkFpdZEy0tmIUBZCHv07TMZ33d+N0iivb33tsyNsrcqgOLI1ZSLtWBGAv46J+zAQJCPJQ9Yok0jJCgKfBzrDFHEOZew+/49c8K4LeS3FHVAsVuv7ThUxVdaEFyj5qCpRcL+n+RynWa1DvfllwlzgHaVuvfs8Z0sJiMSNIM5G1V5/FTw8YDiHkdJhYC/GAFcMCkPPyP5VCGaPALaReFa4BN190CbJo3rd3PYrkKlyBq7s/30FN29Nmq9eS7Y7CXqi0F+OEC1RW5G3F4Miszl7iihp0bAY47PidhGK+3wAbZykzMxFXZEiXk/zbAfW/fiL0f30gwvpLkp7XZ5hPCuJPSbVuR+VhlAy4EDgiglBxSMPGN5LpR79zcvHI7vxstaHNQ1GJlJSoUetBMMocE/lMbce7z5Zc2H3jWtu63LgMoh8RjO2dQMcBuqZ2jZiZE01Hi54rGousWFa9AyitVKe8soOKtYbO/UC8Vu0QahVEZQNXNNFXbChNSLADFPIO1FIufSfKNogRfsOv7PWzyuzY29j1Fuw7aaMkQX6pN12ASF/muvtBSgApDAIUKQ5C9dSPX/ESSr1W3alnKtJeghSaJPIBdrZifm2AUgNRUg4n47QrgA2U5Ts2CTYe9BLLdXERGncmKAGps8VEWA/CL6wLkGwCiA/ExKVlelAvuB2AA5ZPXDwD5ZgNkQTFxJQtyWrFEtwxAgABkQVT1v7BxED4owSD5APIrcbkBjj64EkCCAmBXwgChJh8EkEU59EH4oQoGRRugdoSkgg9aU/ug/2f74BQgkUHNBqihOm0D7gc9zQmgmMYHWVDSL+YCNFrw/wDHcumoW3AM9AuT7aMMUNFNP9D6vVXwPqKiP2oAu2yiCxRWktIApy2LzabTUQEoq+o4SGSErhGgppOyqS241XQ6SgBVE2pD1X4PCbqsZ0rRrb7oUQAosLOgigJAFpR4KJBfUiHFYZBerU5gFw2bTaejAJDFmqJaGJKRjptqR9SUAcldFc6Gaw41QMIh0MtkulySWbGe9gkg3QkEUtbD/yQGshz566EWGSkbgIQEQNTURtRkRk3dQCHCy98SdeWTwlyx6wj7xGGlqFy0AYp1fJArsQqLAsR6mtN98Gkj9E01i1FanfvAYQbIpyiktgRgrMcyqh5VPIBdIPA5lZDQoIfKT23Ig0cFoNahR0ScGFFJ6Zn2Rj/VIeijruskAl4aVad2Aoj3KvqDriaaoizIr1jQgrUxdd+ICWrqAgoX/M53qMx6NsNvzgA4Frwtr92T8a5cokoHUfB2PahcahXlW3xKb1R3zVq6QezdurQ0hQWdcFbU9mTRhwGEmBJ102lsWXTBy3n34lGsnepISsj3uiejou8woUblVzZcAQ4Y/7SuVk4dwT6J2izQAWR6AMWV7sk4jv7o0JM5COtZD/8StGUl+qOyFHGNBVX0XuSfmIiFvuuzRcB8dpYhAKQ6FKkBMjWAHxlaFgcFsJtODbC7at2y0Lon/6wIUI9+MO8RLGuKAkh+Dc6qc6VVTmTwGu/7bG4829uJctt9P12IDURFx9F8j8igKrU0AJSqeYqDL4p1fcq0dA0WS1IBtHuGgxYxpxs8sgiZOZ73adK6Ty5Nzyb8TxG7MkBPDzp06YOiWNUAWdARw44DQBk6H3TwgdNCAomlrujgbILwUCVU6LP8HSdfcsF4umQN/ZCf1IzlHMLKLbmNaz29YcMBtCaNsVmPqpj85qICh+7AyWJAsh568MtN2d0ngEIBFcckz+HwvU6cFbZAfbqOz4iMgD89s1+4nwB+qCZ2uiu3QxWdbMfIZNcLbTsW9jn8Ohbshxma8uYUwKmoPFMDWIA3xDSa8MkSPXGuD2N3XAOAH6i0x/m8nZMCuZmb2iWTee/2/X6d2UuqBW4vFuUqhIT/icefq5Bmw61l1gAQMALTB49Oeu2iVGg8ud3vQD8+mWFT+Rm1JHiO+Lz877vZw6T9IDkHVziiKksSnc5uZk+4BxdyBaGqHyORafE74UrsW+kIoY+PpTwegQLSwwgeMKdicsPxQSDrb4lfB8v0qYx+lIsr9NMVXfawIBUXFlYCZ4FNC5x3wstqrOel5uLsjpH7gbwGuA64/u2U/hKJBqiCURF4CKiP0KnpyuO/vuRSRPYAQIwAAAAASUVORK5CYII=";
  },
  "8cfa": function (t, e, o) {
    t.exports = o.p + "static/img/chongzhi_bg.7a704519.png";
  },
  "96cf": function (t, e) {
    !(function (e) {
      "use strict";
      var o,
        r = Object.prototype,
        n = r.hasOwnProperty,
        i = "function" === typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        s = i.toStringTag || "@@toStringTag",
        d = "object" === typeof t,
        l = e.regeneratorRuntime;
      if (l) d && (t.exports = l);
      else {
        ((l = e.regeneratorRuntime = d ? t.exports : {}), (l.wrap = w));
        var g = "suspendedStart",
          c = "suspendedYield",
          h = "executing",
          f = "completed",
          m = {},
          v = {};
        v[a] = function () {
          return this;
        };
        var p = Object.getPrototypeOf,
          b = p && p(p(D([])));
        b && b !== r && n.call(b, a) && (v = b);
        var y = (B.prototype = k.prototype = Object.create(v));
        ((A.prototype = y.constructor = B),
          (B.constructor = A),
          (B[s] = A.displayName = "GeneratorFunction"),
          (l.isGeneratorFunction = function (t) {
            var e = "function" === typeof t && t.constructor;
            return (
              !!e &&
              (e === A || "GeneratorFunction" === (e.displayName || e.name))
            );
          }),
          (l.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, B)
                : ((t.__proto__ = B), s in t || (t[s] = "GeneratorFunction")),
              (t.prototype = Object.create(y)),
              t
            );
          }),
          (l.awrap = function (t) {
            return { __await: t };
          }),
          I(S.prototype),
          (S.prototype[u] = function () {
            return this;
          }),
          (l.AsyncIterator = S),
          (l.async = function (t, e, o, r) {
            var n = new S(w(t, e, o, r));
            return l.isGeneratorFunction(e)
              ? n
              : n.next().then(function (t) {
                  return t.done ? t.value : n.next();
                });
          }),
          I(y),
          (y[s] = "Generator"),
          (y[a] = function () {
            return this;
          }),
          (y.toString = function () {
            return "[object Generator]";
          }),
          (l.keys = function (t) {
            var e = [];
            for (var o in t) e.push(o);
            return (
              e.reverse(),
              function o() {
                while (e.length) {
                  var r = e.pop();
                  if (r in t) return ((o.value = r), (o.done = !1), o);
                }
                return ((o.done = !0), o);
              }
            );
          }),
          (l.values = D),
          (T.prototype = {
            constructor: T,
            reset: function (t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = o),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = o),
                this.tryEntries.forEach(E),
                !t)
              )
                for (var e in this)
                  "t" === e.charAt(0) &&
                    n.call(this, e) &&
                    !isNaN(+e.slice(1)) &&
                    (this[e] = o);
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
              function r(r, n) {
                return (
                  (u.type = "throw"),
                  (u.arg = t),
                  (e.next = r),
                  n && ((e.method = "next"), (e.arg = o)),
                  !!n
                );
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var a = this.tryEntries[i],
                  u = a.completion;
                if ("root" === a.tryLoc) return r("end");
                if (a.tryLoc <= this.prev) {
                  var s = n.call(a, "catchLoc"),
                    d = n.call(a, "finallyLoc");
                  if (s && d) {
                    if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                  } else if (s) {
                    if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                  } else {
                    if (!d)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, e) {
              for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var r = this.tryEntries[o];
                if (
                  r.tryLoc <= this.prev &&
                  n.call(r, "finallyLoc") &&
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
                  ? ((this.method = "next"), (this.next = i.finallyLoc), m)
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
                m
              );
            },
            finish: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var o = this.tryEntries[e];
                if (o.finallyLoc === t)
                  return (this.complete(o.completion, o.afterLoc), E(o), m);
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var o = this.tryEntries[e];
                if (o.tryLoc === t) {
                  var r = o.completion;
                  if ("throw" === r.type) {
                    var n = r.arg;
                    E(o);
                  }
                  return n;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (t, e, r) {
              return (
                (this.delegate = { iterator: D(t), resultName: e, nextLoc: r }),
                "next" === this.method && (this.arg = o),
                m
              );
            },
          }));
      }
      function w(t, e, o, r) {
        var n = e && e.prototype instanceof k ? e : k,
          i = Object.create(n.prototype),
          a = new T(r || []);
        return ((i._invoke = x(t, o, a)), i);
      }
      function C(t, e, o) {
        try {
          return { type: "normal", arg: t.call(e, o) };
        } catch (r) {
          return { type: "throw", arg: r };
        }
      }
      function k() {}
      function A() {}
      function B() {}
      function I(t) {
        ["next", "throw", "return"].forEach(function (e) {
          t[e] = function (t) {
            return this._invoke(e, t);
          };
        });
      }
      function S(t) {
        function e(o, r, i, a) {
          var u = C(t[o], t, r);
          if ("throw" !== u.type) {
            var s = u.arg,
              d = s.value;
            return d && "object" === typeof d && n.call(d, "__await")
              ? Promise.resolve(d.__await).then(
                  function (t) {
                    e("next", t, i, a);
                  },
                  function (t) {
                    e("throw", t, i, a);
                  },
                )
              : Promise.resolve(d).then(
                  function (t) {
                    ((s.value = t), i(s));
                  },
                  function (t) {
                    return e("throw", t, i, a);
                  },
                );
          }
          a(u.arg);
        }
        var o;
        function r(t, r) {
          function n() {
            return new Promise(function (o, n) {
              e(t, r, o, n);
            });
          }
          return (o = o ? o.then(n, n) : n());
        }
        this._invoke = r;
      }
      function x(t, e, o) {
        var r = g;
        return function (n, i) {
          if (r === h) throw new Error("Generator is already running");
          if (r === f) {
            if ("throw" === n) throw i;
            return N();
          }
          ((o.method = n), (o.arg = i));
          while (1) {
            var a = o.delegate;
            if (a) {
              var u = L(a, o);
              if (u) {
                if (u === m) continue;
                return u;
              }
            }
            if ("next" === o.method) o.sent = o._sent = o.arg;
            else if ("throw" === o.method) {
              if (r === g) throw ((r = f), o.arg);
              o.dispatchException(o.arg);
            } else "return" === o.method && o.abrupt("return", o.arg);
            r = h;
            var s = C(t, e, o);
            if ("normal" === s.type) {
              if (((r = o.done ? f : c), s.arg === m)) continue;
              return { value: s.arg, done: o.done };
            }
            "throw" === s.type &&
              ((r = f), (o.method = "throw"), (o.arg = s.arg));
          }
        };
      }
      function L(t, e) {
        var r = t.iterator[e.method];
        if (r === o) {
          if (((e.delegate = null), "throw" === e.method)) {
            if (
              t.iterator.return &&
              ((e.method = "return"),
              (e.arg = o),
              L(t, e),
              "throw" === e.method)
            )
              return m;
            ((e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a 'throw' method",
              )));
          }
          return m;
        }
        var n = C(r, t.iterator, e.arg);
        if ("throw" === n.type)
          return (
            (e.method = "throw"),
            (e.arg = n.arg),
            (e.delegate = null),
            m
          );
        var i = n.arg;
        return i
          ? i.done
            ? ((e[t.resultName] = i.value),
              (e.next = t.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = o)),
              (e.delegate = null),
              m)
            : i
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            m);
      }
      function P(t) {
        var e = { tryLoc: t[0] };
        (1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e));
      }
      function E(t) {
        var e = t.completion || {};
        ((e.type = "normal"), delete e.arg, (t.completion = e));
      }
      function T(t) {
        ((this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(P, this),
          this.reset(!0));
      }
      function D(t) {
        if (t) {
          var e = t[a];
          if (e) return e.call(t);
          if ("function" === typeof t.next) return t;
          if (!isNaN(t.length)) {
            var r = -1,
              i = function e() {
                while (++r < t.length)
                  if (n.call(t, r)) return ((e.value = t[r]), (e.done = !1), e);
                return ((e.value = o), (e.done = !0), e);
              };
            return (i.next = i);
          }
        }
        return { next: N };
      }
      function N() {
        return { value: o, done: !0 };
      }
    })(
      (function () {
        return this || ("object" === typeof self && self);
      })() || Function("return this")(),
    );
  },
  d12f: function (t, e, o) {
    "use strict";
    var r;
    (o.d(e, "b", function () {
      return n;
    }),
      o.d(e, "c", function () {
        return i;
      }),
      o.d(e, "a", function () {
        return r;
      }));
    var n = function () {
        var t = this,
          e = t.$createElement,
          r = t._self._c || e;
        return r(
          "v-uni-view",
          { staticClass: "hide" },
          [
            r(
              "v-uni-view",
              { staticClass: "tabs" },
              t._l(t.tabs, function (e, o) {
                return r(
                  "v-uni-view",
                  {
                    key: o,
                    staticClass: "tab-item",
                    class: e.type == t.type ? "tab-item-active" : "",
                    on: {
                      click: function (o) {
                        ((arguments[0] = o = t.$handleEvent(o)),
                          t.changeType(e));
                      },
                    },
                  },
                  [t._v(t._s(e.name))],
                );
              }),
              1,
            ),
            r(
              "v-uni-view",
              { staticClass: "chongzhi-box" },
              [
                r("v-uni-image", {
                  staticStyle: { width: "100%" },
                  attrs: { src: o("8cfa"), mode: "widthFix" },
                }),
                r(
                  "v-uni-view",
                  { staticClass: "chongzhi-code" },
                  [
                    r(
                      "v-uni-view",
                      { staticClass: "title-box" },
                      [
                        r("v-uni-image", {
                          staticStyle: { width: "36rpx" },
                          attrs: { src: o("f438"), mode: "widthFix" },
                        }),
                        r("v-uni-view", { staticClass: "title" }, [
                          t._v("温馨提示"),
                        ]),
                      ],
                      1,
                    ),
                    r("v-uni-view", { staticClass: "text" }, [
                      t._v(t._s(t.infoData.suffix)),
                    ]),
                    r(
                      "v-uni-view",
                      { staticClass: "code-bg" },
                      [
                        r(
                          "v-uni-view",
                          {
                            staticClass: "code",
                            staticStyle: {
                              padding: "20rpx",
                              background: "#ffffff",
                            },
                          },
                          [
                            r("v-uni-canvas", {
                              staticStyle: { width: "160px", height: "160px" },
                              attrs: { id: "qrcode", "canvas-id": "qrcode" },
                            }),
                          ],
                          1,
                        ),
                        r("v-uni-view", { staticClass: "code-text" }, [
                          t._v(t._s(t.checkName)),
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
            r(
              "v-uni-view",
              { staticClass: "link-box" },
              [
                r(
                  "v-uni-view",
                  { staticClass: "link-btn-box" },
                  [
                    r("v-uni-text", { staticClass: "title" }, [
                      t._v("充币地址："),
                    ]),
                    r("v-uni-text", { staticClass: "link" }, [
                      t._v(t._s(t.infoData.address)),
                    ]),
                    r("v-uni-image", {
                      staticStyle: { width: "28rpx", "margin-left": "14rpx" },
                      attrs: { src: o("6fa3"), mode: "widthFix" },
                      on: {
                        click: function (e) {
                          ((arguments[0] = e = t.$handleEvent(e)),
                            t.onCopy.apply(void 0, arguments));
                        },
                      },
                    }),
                  ],
                  1,
                ),
              ],
              1,
            ),
            r(
              "v-uni-view",
              {
                staticClass: "yunajia",
                on: {
                  click: function (e) {
                    ((arguments[0] = e = t.$handleEvent(e)),
                      t.goUploadPz.apply(void 0, arguments));
                  },
                },
              },
              [t._v("上传凭证")],
            ),
          ],
          1,
        );
      },
      i = [];
  },
  ddcf: function (t, e, o) {
    "use strict";
    var r = o("4ea4");
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      o("96cf"));
    var n = r(o("1da1")),
      i = r(o("08e6"));
    e.default = {
      data: function () {
        return {
          type: 1,
          tabs: [
            { name: "USDT-TRC20", type: 1 },
            { name: "USDT-BEP20", type: 2 },
          ],
          checkName: "USDT-TRC20",
          infoData: {},
        };
      },
      created: function () {
        this.initCode();
      },
      onNavigationBarButtonTap: function (t) {
        this.goList();
      },
      methods: {
        goUploadPz: function () {
          uni.navigateTo({ url: "/pages/personal/uploadPz" });
        },
        changeType: function (t) {
          ((this.type = t.type), (this.checkName = t.name), this.initCode());
        },
        getAddress: function () {
          var t = this,
            e = this;
          return new Promise(function (o) {
            t.request("/ustd/recharge", { type: e.type }).then(function (t) {
              1 == t.data.code &&
                ((e.infoData = t.data.data), o(t.data.data.address));
            });
          });
        },
        initCode: (function () {
          var t = (0, n.default)(
            regeneratorRuntime.mark(function t() {
              var e, o, r;
              return regeneratorRuntime.wrap(
                function (t) {
                  while (1)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (e = new i.default()),
                          (t.next = 3),
                          this.getAddress()
                        );
                      case 3:
                        ((o = t.sent),
                          (e.data = o),
                          (e.size = 160),
                          e.make(),
                          (r = uni.createCanvasContext("qrcode", this)),
                          (e.canvasContext = r),
                          e.drawCanvas());
                      case 10:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                this,
              );
            }),
          );
          function e() {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        onCopy: function () {
          var t = document.createElement("textarea");
          return (
            (t.value = this.infoData.address),
            document.body.appendChild(t),
            t.focus(),
            t.select(),
            new Promise(function (e, o) {
              (document.execCommand("copy") ? e() : o(new Error("出错了")),
                t.remove());
            }).then(
              function () {
                uni.showToast({ title: "复制成功" });
              },
              function () {
                uni.showToast({ title: "复制失败" });
              },
            )
          );
        },
        goList: function () {
          uni.navigateTo({ url: "/pages/personal/rechargeRecord" });
        },
      },
    };
  },
  e06c: function (t, e, o) {
    var r = o("32d9");
    ("string" === typeof r && (r = [[t.i, r, ""]]),
      r.locals && (t.exports = r.locals));
    var n = o("4f06").default;
    n("615ae515", r, !0, { sourceMap: !1, shadowMode: !1 });
  },
  f438: function (t, e, o) {
    t.exports = o.p + "static/img/tishi.a9a55442.png";
  },
};
