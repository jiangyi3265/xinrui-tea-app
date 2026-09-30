/* Recovered H5 module map. See README.md for source limitations. */
export default {
  5674: function (A, e, t) {
    "use strict";
    var r,
      n,
      B = t("4ea4");
    (t("6c7b"),
      t("4917"),
      t("a481"),
      t("3846"),
      t("456d"),
      t("5df3"),
      t("1c4c"),
      t("6b54"),
      t("9c29"),
      t("ac6a"),
      t("af56"),
      t("34ef"),
      t("5695"),
      t("ac4d"),
      t("8a81"),
      t("fd24"));
    var s = B(t("53ca"));
    /*!
     * html2canvas 1.0.0-rc.7 <https://html2canvas.hertzen.com>
     * Copyright (c) 2020 Niklas von Hertzen <https://hertzen.com>
     * Released under MIT License
     */ !(function (B, o) {
      "object" == (0, s.default)(e) && "undefined" != typeof A
        ? (A.exports = o())
        : ((r = o),
          (n = "function" === typeof r ? r.call(e, t, e, A) : r),
          void 0 === n || (A.exports = n));
    })(0, function () {
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
  
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
  
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */
      var A = function (e, t) {
        return (A =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (A, e) {
              A.__proto__ = e;
            }) ||
          function (A, e) {
            for (var t in e) e.hasOwnProperty(t) && (A[t] = e[t]);
          })(e, t);
      };
      function e(e, t) {
        function r() {
          this.constructor = e;
        }
        (A(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((r.prototype = t.prototype), new r())));
      }
      var t = function () {
        return (t =
          Object.assign ||
          function (A) {
            for (var e, t = 1, r = arguments.length; t < r; t++)
              for (var n in (e = arguments[t]))
                Object.prototype.hasOwnProperty.call(e, n) && (A[n] = e[n]);
            return A;
          }).apply(this, arguments);
      };
      function r(A, e, t, r) {
        return new (t || (t = Promise))(function (n, B) {
          function s(A) {
            try {
              i(r.next(A));
            } catch (A) {
              B(A);
            }
          }
          function o(A) {
            try {
              i(r.throw(A));
            } catch (A) {
              B(A);
            }
          }
          function i(A) {
            A.done
              ? n(A.value)
              : new t(function (e) {
                  e(A.value);
                }).then(s, o);
          }
          i((r = r.apply(A, e || [])).next());
        });
      }
      function n(A, e) {
        var t,
          r,
          n,
          B,
          s = {
            label: 0,
            sent: function () {
              if (1 & n[0]) throw n[1];
              return n[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (B = { next: o(0), throw: o(1), return: o(2) }),
          "function" == typeof Symbol &&
            (B[Symbol.iterator] = function () {
              return this;
            }),
          B
        );
        function o(B) {
          return function (o) {
            return (function (B) {
              if (t) throw new TypeError("Generator is already executing.");
              for (; s;)
                try {
                  if (
                    ((t = 1),
                    r &&
                      (n =
                        2 & B[0]
                          ? r.return
                          : B[0]
                            ? r.throw || ((n = r.return) && n.call(r), 0)
                            : r.next) &&
                      !(n = n.call(r, B[1])).done)
                  )
                    return n;
                  switch (((r = 0), n && (B = [2 & B[0], n.value]), B[0])) {
                    case 0:
                    case 1:
                      n = B;
                      break;
                    case 4:
                      return (s.label++, { value: B[1], done: !1 });
                    case 5:
                      (s.label++, (r = B[1]), (B = [0]));
                      continue;
                    case 7:
                      ((B = s.ops.pop()), s.trys.pop());
                      continue;
                    default:
                      if (
                        !(n = 0 < (n = s.trys).length && n[n.length - 1]) &&
                        (6 === B[0] || 2 === B[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === B[0] && (!n || (B[1] > n[0] && B[1] < n[3]))) {
                        s.label = B[1];
                        break;
                      }
                      if (6 === B[0] && s.label < n[1]) {
                        ((s.label = n[1]), (n = B));
                        break;
                      }
                      if (n && s.label < n[2]) {
                        ((s.label = n[2]), s.ops.push(B));
                        break;
                      }
                      (n[2] && s.ops.pop(), s.trys.pop());
                      continue;
                  }
                  B = e.call(A, s);
                } catch (o) {
                  ((B = [6, o]), (r = 0));
                } finally {
                  t = n = 0;
                }
              if (5 & B[0]) throw B[1];
              return { value: B[0] ? B[1] : void 0, done: !0 };
            })([B, o]);
          };
        }
      }
      var B =
        ((o.prototype.add = function (A, e, t, r) {
          return new o(
            this.left + A,
            this.top + e,
            this.width + t,
            this.height + r,
          );
        }),
        (o.fromClientRect = function (A) {
          return new o(A.left, A.top, A.width, A.height);
        }),
        o);
      function o(A, e, t, r) {
        ((this.left = A), (this.top = e), (this.width = t), (this.height = r));
      }
      for (
        var i = function (A) {
            return B.fromClientRect(A.getBoundingClientRect());
          },
          a = function (A) {
            for (var e = [], t = 0, r = A.length; t < r;) {
              var n = A.charCodeAt(t++);
              if (55296 <= n && n <= 56319 && t < r) {
                var B = A.charCodeAt(t++);
                56320 == (64512 & B)
                  ? e.push(((1023 & n) << 10) + (1023 & B) + 65536)
                  : (e.push(n), t--);
              } else e.push(n);
            }
            return e;
          },
          c = function () {
            for (var A = [], e = 0; e < arguments.length; e++)
              A[e] = arguments[e];
            if (String.fromCodePoint)
              return String.fromCodePoint.apply(String, A);
            var t = A.length;
            if (!t) return "";
            for (var r = [], n = -1, B = ""; ++n < t;) {
              var s = A[n];
              (s <= 65535
                ? r.push(s)
                : ((s -= 65536), r.push(55296 + (s >> 10), (s % 1024) + 56320)),
                (n + 1 === t || 16384 < r.length) &&
                  ((B += String.fromCharCode.apply(String, r)),
                  (r.length = 0)));
            }
            return B;
          },
          Q =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          w = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
          u = 0;
        u < Q.length;
        u++
      )
        w[Q.charCodeAt(u)] = u;
      function U(A, e, t) {
        return A.slice
          ? A.slice(e, t)
          : new Uint16Array(Array.prototype.slice.call(A, e, t));
      }
      var l =
        ((C.prototype.get = function (A) {
          var e;
          if (0 <= A) {
            if (A < 55296 || (56319 < A && A <= 65535))
              return (
                (e = ((e = this.index[A >> 5]) << 2) + (31 & A)),
                this.data[e]
              );
            if (A <= 65535)
              return (
                (e =
                  ((e = this.index[2048 + ((A - 55296) >> 5)]) << 2) +
                  (31 & A)),
                this.data[e]
              );
            if (A < this.highStart)
              return (
                (e = 2080 + (A >> 11)),
                (e = this.index[e]),
                (e += (A >> 5) & 63),
                (e = ((e = this.index[e]) << 2) + (31 & A)),
                this.data[e]
              );
            if (A <= 1114111) return this.data[this.highValueIndex];
          }
          return this.errorValue;
        }),
        C);
      function C(A, e, t, r, n, B) {
        ((this.initialValue = A),
          (this.errorValue = e),
          (this.highStart = t),
          (this.highValueIndex = r),
          (this.index = n),
          (this.data = B));
      }
      function g(A, e, t, r) {
        var n = r[t];
        if (Array.isArray(A) ? -1 !== A.indexOf(n) : A === n)
          for (var B = t; B <= r.length;) {
            if ((i = r[++B]) === e) return !0;
            if (i !== T) break;
          }
        if (n === T)
          for (B = t; 0 < B;) {
            var s = r[--B];
            if (Array.isArray(A) ? -1 !== A.indexOf(s) : A === s)
              for (var o = t; o <= r.length;) {
                var i;
                if ((i = r[++o]) === e) return !0;
                if (i !== T) break;
              }
            if (s !== T) break;
          }
        return !1;
      }
      function E(A, e) {
        for (var t = A; 0 <= t;) {
          var r = e[t];
          if (r !== T) return r;
          t--;
        }
        return 0;
      }
      function F(A, e, t, r, n) {
        if (0 === t[r]) return j;
        var B = r - 1;
        if (Array.isArray(n) && !0 === n[B]) return j;
        var s = B - 1,
          o = 1 + B,
          i = e[B],
          a = 0 <= s ? e[s] : 0,
          c = e[o];
        if (2 === i && 3 === c) return j;
        if (-1 !== eA.indexOf(i)) return "!";
        if (-1 !== eA.indexOf(c)) return j;
        if (-1 !== tA.indexOf(c)) return j;
        if (8 === E(B, e)) return "÷";
        if (11 === $.get(A[B]) && (c === k || c === z || c === X)) return j;
        if (7 === i || 7 === c) return j;
        if (9 === i) return j;
        if (-1 === [T, m, R].indexOf(i) && 9 === c) return j;
        if (-1 !== [L, v, O, M, x].indexOf(c)) return j;
        if (E(B, e) === S) return j;
        if (g(23, S, B, e)) return j;
        if (g([L, v], b, B, e)) return j;
        if (g(12, 12, B, e)) return j;
        if (i === T) return "÷";
        if (23 === i || 23 === c) return j;
        if (16 === c || 16 === i) return "÷";
        if (-1 !== [m, R, b].indexOf(c) || 14 === i) return j;
        if (36 === a && -1 !== sA.indexOf(i)) return j;
        if (i === x && 36 === c) return j;
        if (c === D && -1 !== AA.concat(D, O, y, k, z, X).indexOf(i)) return j;
        if (
          (-1 !== AA.indexOf(c) && i === y) ||
          (-1 !== AA.indexOf(i) && c === y)
        )
          return j;
        if (
          (i === P && -1 !== [k, z, X].indexOf(c)) ||
          (-1 !== [k, z, X].indexOf(i) && c === _)
        )
          return j;
        if (
          (-1 !== AA.indexOf(i) && -1 !== rA.indexOf(c)) ||
          (-1 !== rA.indexOf(i) && -1 !== AA.indexOf(c))
        )
          return j;
        if (
          (-1 !== [P, _].indexOf(i) &&
            (c === y || (-1 !== [S, R].indexOf(c) && e[1 + o] === y))) ||
          (-1 !== [S, R].indexOf(i) && c === y) ||
          (i === y && -1 !== [y, x, M].indexOf(c))
        )
          return j;
        if (-1 !== [y, x, M, L, v].indexOf(c))
          for (var Q = B; 0 <= Q;) {
            if ((w = e[Q]) === y) return j;
            if (-1 === [x, M].indexOf(w)) break;
            Q--;
          }
        if (-1 !== [P, _].indexOf(c))
          for (Q = -1 !== [L, v].indexOf(i) ? s : B; 0 <= Q;) {
            var w;
            if ((w = e[Q]) === y) return j;
            if (-1 === [x, M].indexOf(w)) break;
            Q--;
          }
        if (
          (W === i && -1 !== [W, Y, J, G].indexOf(c)) ||
          (-1 !== [Y, J].indexOf(i) && -1 !== [Y, q].indexOf(c)) ||
          (-1 !== [q, G].indexOf(i) && c === q)
        )
          return j;
        if (
          (-1 !== BA.indexOf(i) && -1 !== [D, _].indexOf(c)) ||
          (-1 !== BA.indexOf(c) && i === P)
        )
          return j;
        if (-1 !== AA.indexOf(i) && -1 !== AA.indexOf(c)) return j;
        if (i === M && -1 !== AA.indexOf(c)) return j;
        if (
          (-1 !== AA.concat(y).indexOf(i) && c === S) ||
          (-1 !== AA.concat(y).indexOf(c) && i === v)
        )
          return j;
        if (41 === i && 41 === c) {
          for (var u = t[B], U = 1; 0 < u && 41 === e[--u];) U++;
          if (U % 2 != 0) return j;
        }
        return i === z && c === X ? j : "÷";
      }
      function h(A, e) {
        e || (e = { lineBreak: "normal", wordBreak: "normal" });
        var t = (function (A, e) {
            void 0 === e && (e = "strict");
            var t = [],
              r = [],
              n = [];
            return (
              A.forEach(function (A, B) {
                var s = $.get(A);
                if (
                  (50 < s ? (n.push(!0), (s -= 50)) : n.push(!1),
                  -1 !== ["normal", "auto", "loose"].indexOf(e) &&
                    -1 !== [8208, 8211, 12316, 12448].indexOf(A))
                )
                  return (r.push(B), t.push(16));
                if (4 !== s && 11 !== s)
                  return (
                    r.push(B),
                    31 === s
                      ? t.push("strict" === e ? b : k)
                      : s === Z || 29 === s
                        ? t.push(V)
                        : 43 === s
                          ? (131072 <= A && A <= 196605) ||
                            (196608 <= A && A <= 262141)
                            ? t.push(k)
                            : t.push(V)
                          : void t.push(s)
                  );
                if (0 === B) return (r.push(B), t.push(V));
                var o = t[B - 1];
                return -1 === nA.indexOf(o)
                  ? (r.push(r[B - 1]), t.push(o))
                  : (r.push(B), t.push(V));
              }),
              [r, t, n]
            );
          })(A, e.lineBreak),
          r = t[0],
          n = t[1],
          B = t[2];
        return (
          ("break-all" !== e.wordBreak && "break-word" !== e.wordBreak) ||
            (n = n.map(function (A) {
              return -1 !== [y, V, Z].indexOf(A) ? k : A;
            })),
          [
            r,
            n,
            "keep-all" === e.wordBreak
              ? B.map(function (e, t) {
                  return e && 19968 <= A[t] && A[t] <= 40959;
                })
              : void 0,
          ]
        );
      }
      var H,
        d,
        f,
        p,
        N,
        K,
        I,
        T = 10,
        m = 13,
        R = 15,
        L = 17,
        v = 18,
        O = 19,
        D = 20,
        b = 21,
        S = 22,
        M = 24,
        y = 25,
        _ = 26,
        P = 27,
        x = 28,
        V = 30,
        z = 32,
        X = 33,
        J = 34,
        G = 35,
        k = 37,
        W = 38,
        Y = 39,
        q = 40,
        Z = 42,
        j = "×",
        $ =
          ((H = (function (A) {
            var e,
              t,
              r,
              n,
              B,
              s = 0.75 * A.length,
              o = A.length,
              i = 0;
            "=" === A[A.length - 1] && (s--, "=" === A[A.length - 2] && s--);
            var a =
                "undefined" != typeof ArrayBuffer &&
                "undefined" != typeof Uint8Array &&
                void 0 !== Uint8Array.prototype.slice
                  ? new ArrayBuffer(s)
                  : new Array(s),
              c = Array.isArray(a) ? a : new Uint8Array(a);
            for (e = 0; e < o; e += 4)
              ((t = w[A.charCodeAt(e)]),
                (r = w[A.charCodeAt(e + 1)]),
                (n = w[A.charCodeAt(e + 2)]),
                (B = w[A.charCodeAt(e + 3)]),
                (c[i++] = (t << 2) | (r >> 4)),
                (c[i++] = ((15 & r) << 4) | (n >> 2)),
                (c[i++] = ((3 & n) << 6) | (63 & B)));
            return a;
          })(
            "KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA",
          )),
          (d = Array.isArray(H)
            ? (function (A) {
                for (var e = A.length, t = [], r = 0; r < e; r += 4)
                  t.push(
                    (A[r + 3] << 24) |
                      (A[r + 2] << 16) |
                      (A[r + 1] << 8) |
                      A[r],
                  );
                return t;
              })(H)
            : new Uint32Array(H)),
          (f = Array.isArray(H)
            ? (function (A) {
                for (var e = A.length, t = [], r = 0; r < e; r += 2)
                  t.push((A[r + 1] << 8) | A[r]);
                return t;
              })(H)
            : new Uint16Array(H)),
          (p = U(f, 12, d[4] / 2)),
          (N =
            2 === d[5]
              ? U(f, (24 + d[4]) / 2)
              : (function (A, e, t) {
                  return A.slice
                    ? A.slice(e, t)
                    : new Uint32Array(Array.prototype.slice.call(A, e, t));
                })(d, Math.ceil((24 + d[4]) / 4))),
          new l(d[0], d[1], d[2], d[3], p, N)),
        AA = [V, 36],
        eA = [1, 2, 3, 5],
        tA = [T, 8],
        rA = [P, _],
        nA = eA.concat(tA),
        BA = [W, Y, q, J, G],
        sA = [R, m],
        oA =
          ((iA.prototype.slice = function () {
            return c.apply(void 0, this.codePoints.slice(this.start, this.end));
          }),
          iA);
      function iA(A, e, t, r) {
        ((this.codePoints = A),
          (this.required = "!" === e),
          (this.start = t),
          (this.end = r));
      }
      function aA(A) {
        return 48 <= A && A <= 57;
      }
      function cA(A) {
        return aA(A) || (65 <= A && A <= 70) || (97 <= A && A <= 102);
      }
      function QA(A) {
        return 10 === A || 9 === A || 32 === A;
      }
      function wA(A) {
        return (
          (function (A) {
            return (
              (function (A) {
                return 97 <= A && A <= 122;
              })(A) ||
              (function (A) {
                return 65 <= A && A <= 90;
              })(A)
            );
          })(A) ||
          (function (A) {
            return 128 <= A;
          })(A) ||
          95 === A
        );
      }
      function uA(A) {
        return wA(A) || aA(A) || 45 === A;
      }
      function UA(A, e) {
        return 92 === A && 10 !== e;
      }
      function lA(A, e, t) {
        return 45 === A
          ? wA(e) || UA(e, t)
          : !!wA(A) || !(92 !== A || !UA(A, e));
      }
      function CA(A, e, t) {
        return 43 === A || 45 === A
          ? !!aA(e) || (46 === e && aA(t))
          : aA(46 === A ? e : A);
      }
      (((I = K || (K = {}))[(I.STRING_TOKEN = 0)] = "STRING_TOKEN"),
        (I[(I.BAD_STRING_TOKEN = 1)] = "BAD_STRING_TOKEN"),
        (I[(I.LEFT_PARENTHESIS_TOKEN = 2)] = "LEFT_PARENTHESIS_TOKEN"),
        (I[(I.RIGHT_PARENTHESIS_TOKEN = 3)] = "RIGHT_PARENTHESIS_TOKEN"),
        (I[(I.COMMA_TOKEN = 4)] = "COMMA_TOKEN"),
        (I[(I.HASH_TOKEN = 5)] = "HASH_TOKEN"),
        (I[(I.DELIM_TOKEN = 6)] = "DELIM_TOKEN"),
        (I[(I.AT_KEYWORD_TOKEN = 7)] = "AT_KEYWORD_TOKEN"),
        (I[(I.PREFIX_MATCH_TOKEN = 8)] = "PREFIX_MATCH_TOKEN"),
        (I[(I.DASH_MATCH_TOKEN = 9)] = "DASH_MATCH_TOKEN"),
        (I[(I.INCLUDE_MATCH_TOKEN = 10)] = "INCLUDE_MATCH_TOKEN"),
        (I[(I.LEFT_CURLY_BRACKET_TOKEN = 11)] = "LEFT_CURLY_BRACKET_TOKEN"),
        (I[(I.RIGHT_CURLY_BRACKET_TOKEN = 12)] = "RIGHT_CURLY_BRACKET_TOKEN"),
        (I[(I.SUFFIX_MATCH_TOKEN = 13)] = "SUFFIX_MATCH_TOKEN"),
        (I[(I.SUBSTRING_MATCH_TOKEN = 14)] = "SUBSTRING_MATCH_TOKEN"),
        (I[(I.DIMENSION_TOKEN = 15)] = "DIMENSION_TOKEN"),
        (I[(I.PERCENTAGE_TOKEN = 16)] = "PERCENTAGE_TOKEN"),
        (I[(I.NUMBER_TOKEN = 17)] = "NUMBER_TOKEN"),
        (I[(I.FUNCTION = 18)] = "FUNCTION"),
        (I[(I.FUNCTION_TOKEN = 19)] = "FUNCTION_TOKEN"),
        (I[(I.IDENT_TOKEN = 20)] = "IDENT_TOKEN"),
        (I[(I.COLUMN_TOKEN = 21)] = "COLUMN_TOKEN"),
        (I[(I.URL_TOKEN = 22)] = "URL_TOKEN"),
        (I[(I.BAD_URL_TOKEN = 23)] = "BAD_URL_TOKEN"),
        (I[(I.CDC_TOKEN = 24)] = "CDC_TOKEN"),
        (I[(I.CDO_TOKEN = 25)] = "CDO_TOKEN"),
        (I[(I.COLON_TOKEN = 26)] = "COLON_TOKEN"),
        (I[(I.SEMICOLON_TOKEN = 27)] = "SEMICOLON_TOKEN"),
        (I[(I.LEFT_SQUARE_BRACKET_TOKEN = 28)] = "LEFT_SQUARE_BRACKET_TOKEN"),
        (I[(I.RIGHT_SQUARE_BRACKET_TOKEN = 29)] = "RIGHT_SQUARE_BRACKET_TOKEN"),
        (I[(I.UNICODE_RANGE_TOKEN = 30)] = "UNICODE_RANGE_TOKEN"),
        (I[(I.WHITESPACE_TOKEN = 31)] = "WHITESPACE_TOKEN"),
        (I[(I.EOF_TOKEN = 32)] = "EOF_TOKEN"));
      var gA = { type: K.LEFT_PARENTHESIS_TOKEN },
        EA = { type: K.RIGHT_PARENTHESIS_TOKEN },
        FA = { type: K.COMMA_TOKEN },
        hA = { type: K.SUFFIX_MATCH_TOKEN },
        HA = { type: K.PREFIX_MATCH_TOKEN },
        dA = { type: K.COLUMN_TOKEN },
        fA = { type: K.DASH_MATCH_TOKEN },
        pA = { type: K.INCLUDE_MATCH_TOKEN },
        NA = { type: K.LEFT_CURLY_BRACKET_TOKEN },
        KA = { type: K.RIGHT_CURLY_BRACKET_TOKEN },
        IA = { type: K.SUBSTRING_MATCH_TOKEN },
        TA = { type: K.BAD_URL_TOKEN },
        mA = { type: K.BAD_STRING_TOKEN },
        RA = { type: K.CDO_TOKEN },
        LA = { type: K.CDC_TOKEN },
        vA = { type: K.COLON_TOKEN },
        OA = { type: K.SEMICOLON_TOKEN },
        DA = { type: K.LEFT_SQUARE_BRACKET_TOKEN },
        bA = { type: K.RIGHT_SQUARE_BRACKET_TOKEN },
        SA = { type: K.WHITESPACE_TOKEN },
        MA = { type: K.EOF_TOKEN },
        yA =
          ((_A.prototype.write = function (A) {
            this._value = this._value.concat(a(A));
          }),
          (_A.prototype.read = function () {
            for (var A = [], e = this.consumeToken(); e !== MA;)
              (A.push(e), (e = this.consumeToken()));
            return A;
          }),
          (_A.prototype.consumeToken = function () {
            var A = this.consumeCodePoint();
            switch (A) {
              case 34:
                return this.consumeStringToken(34);
              case 35:
                var e = this.peekCodePoint(0),
                  t = this.peekCodePoint(1),
                  r = this.peekCodePoint(2);
                if (uA(e) || UA(t, r)) {
                  var n = lA(e, t, r) ? 2 : 1,
                    B = this.consumeName();
                  return { type: K.HASH_TOKEN, value: B, flags: n };
                }
                break;
              case 36:
                if (61 === this.peekCodePoint(0))
                  return (this.consumeCodePoint(), hA);
                break;
              case 39:
                return this.consumeStringToken(39);
              case 40:
                return gA;
              case 41:
                return EA;
              case 42:
                if (61 === this.peekCodePoint(0))
                  return (this.consumeCodePoint(), IA);
                break;
              case 43:
                if (CA(A, this.peekCodePoint(0), this.peekCodePoint(1)))
                  return (
                    this.reconsumeCodePoint(A),
                    this.consumeNumericToken()
                  );
                break;
              case 44:
                return FA;
              case 45:
                var s = A,
                  o = this.peekCodePoint(0),
                  i = this.peekCodePoint(1);
                if (CA(s, o, i))
                  return (
                    this.reconsumeCodePoint(A),
                    this.consumeNumericToken()
                  );
                if (lA(s, o, i))
                  return (
                    this.reconsumeCodePoint(A),
                    this.consumeIdentLikeToken()
                  );
                if (45 === o && 62 === i)
                  return (this.consumeCodePoint(), this.consumeCodePoint(), LA);
                break;
              case 46:
                if (CA(A, this.peekCodePoint(0), this.peekCodePoint(1)))
                  return (
                    this.reconsumeCodePoint(A),
                    this.consumeNumericToken()
                  );
                break;
              case 47:
                if (42 === this.peekCodePoint(0))
                  for (this.consumeCodePoint(); ;) {
                    var a = this.consumeCodePoint();
                    if (42 === a && 47 === (a = this.consumeCodePoint()))
                      return this.consumeToken();
                    if (-1 === a) return this.consumeToken();
                  }
                break;
              case 58:
                return vA;
              case 59:
                return OA;
              case 60:
                if (
                  33 === this.peekCodePoint(0) &&
                  45 === this.peekCodePoint(1) &&
                  45 === this.peekCodePoint(2)
                )
                  return (this.consumeCodePoint(), this.consumeCodePoint(), RA);
                break;
              case 64:
                var Q = this.peekCodePoint(0),
                  w = this.peekCodePoint(1),
                  u = this.peekCodePoint(2);
                if (lA(Q, w, u))
                  return (
                    (B = this.consumeName()),
                    { type: K.AT_KEYWORD_TOKEN, value: B }
                  );
                break;
              case 91:
                return DA;
              case 92:
                if (UA(A, this.peekCodePoint(0)))
                  return (
                    this.reconsumeCodePoint(A),
                    this.consumeIdentLikeToken()
                  );
                break;
              case 93:
                return bA;
              case 61:
                if (61 === this.peekCodePoint(0))
                  return (this.consumeCodePoint(), HA);
                break;
              case 123:
                return NA;
              case 125:
                return KA;
              case 117:
              case 85:
                var U = this.peekCodePoint(0),
                  l = this.peekCodePoint(1);
                return (
                  43 !== U ||
                    (!cA(l) && 63 !== l) ||
                    (this.consumeCodePoint(), this.consumeUnicodeRangeToken()),
                  this.reconsumeCodePoint(A),
                  this.consumeIdentLikeToken()
                );
              case 124:
                if (61 === this.peekCodePoint(0))
                  return (this.consumeCodePoint(), fA);
                if (124 === this.peekCodePoint(0))
                  return (this.consumeCodePoint(), dA);
                break;
              case 126:
                if (61 === this.peekCodePoint(0))
                  return (this.consumeCodePoint(), pA);
                break;
              case -1:
                return MA;
            }
            return QA(A)
              ? (this.consumeWhiteSpace(), SA)
              : aA(A)
                ? (this.reconsumeCodePoint(A), this.consumeNumericToken())
                : wA(A)
                  ? (this.reconsumeCodePoint(A), this.consumeIdentLikeToken())
                  : { type: K.DELIM_TOKEN, value: c(A) };
          }),
          (_A.prototype.consumeCodePoint = function () {
            var A = this._value.shift();
            return void 0 === A ? -1 : A;
          }),
          (_A.prototype.reconsumeCodePoint = function (A) {
            this._value.unshift(A);
          }),
          (_A.prototype.peekCodePoint = function (A) {
            return A >= this._value.length ? -1 : this._value[A];
          }),
          (_A.prototype.consumeUnicodeRangeToken = function () {
            for (
              var A = [], e = this.consumeCodePoint();
              cA(e) && A.length < 6;
            )
              (A.push(e), (e = this.consumeCodePoint()));
            for (var t = !1; 63 === e && A.length < 6;)
              (A.push(e), (e = this.consumeCodePoint()), (t = !0));
            if (t) {
              var r = parseInt(
                  c.apply(
                    void 0,
                    A.map(function (A) {
                      return 63 === A ? 48 : A;
                    }),
                  ),
                  16,
                ),
                n = parseInt(
                  c.apply(
                    void 0,
                    A.map(function (A) {
                      return 63 === A ? 70 : A;
                    }),
                  ),
                  16,
                );
              return { type: K.UNICODE_RANGE_TOKEN, start: r, end: n };
            }
            var B = parseInt(c.apply(void 0, A), 16);
            if (45 === this.peekCodePoint(0) && cA(this.peekCodePoint(1))) {
              (this.consumeCodePoint(), (e = this.consumeCodePoint()));
              for (var s = []; cA(e) && s.length < 6;)
                (s.push(e), (e = this.consumeCodePoint()));
              return (
                (n = parseInt(c.apply(void 0, s), 16)),
                { type: K.UNICODE_RANGE_TOKEN, start: B, end: n }
              );
            }
            return { type: K.UNICODE_RANGE_TOKEN, start: B, end: B };
          }),
          (_A.prototype.consumeIdentLikeToken = function () {
            var A = this.consumeName();
            return "url" === A.toLowerCase() && 40 === this.peekCodePoint(0)
              ? (this.consumeCodePoint(), this.consumeUrlToken())
              : 40 === this.peekCodePoint(0)
                ? (this.consumeCodePoint(),
                  { type: K.FUNCTION_TOKEN, value: A })
                : { type: K.IDENT_TOKEN, value: A };
          }),
          (_A.prototype.consumeUrlToken = function () {
            var A = [];
            if ((this.consumeWhiteSpace(), -1 === this.peekCodePoint(0)))
              return { type: K.URL_TOKEN, value: "" };
            var e,
              t = this.peekCodePoint(0);
            if (39 === t || 34 === t) {
              var r = this.consumeStringToken(this.consumeCodePoint());
              return r.type === K.STRING_TOKEN &&
                (this.consumeWhiteSpace(),
                -1 === this.peekCodePoint(0) || 41 === this.peekCodePoint(0))
                ? (this.consumeCodePoint(),
                  { type: K.URL_TOKEN, value: r.value })
                : (this.consumeBadUrlRemnants(), TA);
            }
            for (;;) {
              var n = this.consumeCodePoint();
              if (-1 === n || 41 === n)
                return { type: K.URL_TOKEN, value: c.apply(void 0, A) };
              if (QA(n))
                return (
                  this.consumeWhiteSpace(),
                  -1 === this.peekCodePoint(0) || 41 === this.peekCodePoint(0)
                    ? (this.consumeCodePoint(),
                      { type: K.URL_TOKEN, value: c.apply(void 0, A) })
                    : (this.consumeBadUrlRemnants(), TA)
                );
              if (
                34 === n ||
                39 === n ||
                40 === n ||
                (0 <= (e = n) && e <= 8) ||
                11 === e ||
                (14 <= e && e <= 31) ||
                127 === e
              )
                return (this.consumeBadUrlRemnants(), TA);
              if (92 === n) {
                if (!UA(n, this.peekCodePoint(0)))
                  return (this.consumeBadUrlRemnants(), TA);
                A.push(this.consumeEscapedCodePoint());
              } else A.push(n);
            }
          }),
          (_A.prototype.consumeWhiteSpace = function () {
            for (; QA(this.peekCodePoint(0));) this.consumeCodePoint();
          }),
          (_A.prototype.consumeBadUrlRemnants = function () {
            for (;;) {
              var A = this.consumeCodePoint();
              if (41 === A || -1 === A) return;
              UA(A, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
            }
          }),
          (_A.prototype.consumeStringSlice = function (A) {
            for (var e = ""; 0 < A;) {
              var t = Math.min(6e4, A);
              ((e += c.apply(void 0, this._value.splice(0, t))), (A -= t));
            }
            return (this._value.shift(), e);
          }),
          (_A.prototype.consumeStringToken = function (A) {
            for (var e = "", t = 0; ;) {
              var r = this._value[t];
              if (-1 === r || void 0 === r || r === A)
                return (
                  (e += this.consumeStringSlice(t)),
                  { type: K.STRING_TOKEN, value: e }
                );
              if (10 === r) return (this._value.splice(0, t), mA);
              if (92 === r) {
                var n = this._value[t + 1];
                -1 !== n &&
                  void 0 !== n &&
                  (10 === n
                    ? ((e += this.consumeStringSlice(t)),
                      (t = -1),
                      this._value.shift())
                    : UA(r, n) &&
                      ((e += this.consumeStringSlice(t)),
                      (e += c(this.consumeEscapedCodePoint())),
                      (t = -1)));
              }
              t++;
            }
          }),
          (_A.prototype.consumeNumber = function () {
            var A = [],
              e = 4,
              t = this.peekCodePoint(0);
            for (
              (43 !== t && 45 !== t) || A.push(this.consumeCodePoint());
              aA(this.peekCodePoint(0));
            )
              A.push(this.consumeCodePoint());
            t = this.peekCodePoint(0);
            var r = this.peekCodePoint(1);
            if (46 === t && aA(r))
              for (
                A.push(this.consumeCodePoint(), this.consumeCodePoint()), e = 8;
                aA(this.peekCodePoint(0));
              )
                A.push(this.consumeCodePoint());
            ((t = this.peekCodePoint(0)), (r = this.peekCodePoint(1)));
            var n = this.peekCodePoint(2);
            if (
              (69 === t || 101 === t) &&
              (((43 === r || 45 === r) && aA(n)) || aA(r))
            )
              for (
                A.push(this.consumeCodePoint(), this.consumeCodePoint()), e = 8;
                aA(this.peekCodePoint(0));
              )
                A.push(this.consumeCodePoint());
            return [
              (function (A) {
                var e = 0,
                  t = 1;
                (43 !== A[e] && 45 !== A[e]) || (45 === A[e] && (t = -1), e++);
                for (var r = []; aA(A[e]);) r.push(A[e++]);
                var n = r.length ? parseInt(c.apply(void 0, r), 10) : 0;
                46 === A[e] && e++;
                for (var B = []; aA(A[e]);) B.push(A[e++]);
                var s = B.length,
                  o = s ? parseInt(c.apply(void 0, B), 10) : 0;
                (69 !== A[e] && 101 !== A[e]) || e++;
                var i = 1;
                (43 !== A[e] && 45 !== A[e]) || (45 === A[e] && (i = -1), e++);
                for (var a = []; aA(A[e]);) a.push(A[e++]);
                var Q = a.length ? parseInt(c.apply(void 0, a), 10) : 0;
                return t * (n + o * Math.pow(10, -s)) * Math.pow(10, i * Q);
              })(A),
              e,
            ];
          }),
          (_A.prototype.consumeNumericToken = function () {
            var A = this.consumeNumber(),
              e = A[0],
              t = A[1],
              r = this.peekCodePoint(0),
              n = this.peekCodePoint(1),
              B = this.peekCodePoint(2);
            if (lA(r, n, B)) {
              var s = this.consumeName();
              return { type: K.DIMENSION_TOKEN, number: e, flags: t, unit: s };
            }
            return 37 === r
              ? (this.consumeCodePoint(),
                { type: K.PERCENTAGE_TOKEN, number: e, flags: t })
              : { type: K.NUMBER_TOKEN, number: e, flags: t };
          }),
          (_A.prototype.consumeEscapedCodePoint = function () {
            var A = this.consumeCodePoint();
            if (cA(A)) {
              for (var e = c(A); cA(this.peekCodePoint(0)) && e.length < 6;)
                e += c(this.consumeCodePoint());
              QA(this.peekCodePoint(0)) && this.consumeCodePoint();
              var t = parseInt(e, 16);
              return 0 === t ||
                (function (A) {
                  return 55296 <= A && A <= 57343;
                })(t) ||
                1114111 < t
                ? 65533
                : t;
            }
            return -1 === A ? 65533 : A;
          }),
          (_A.prototype.consumeName = function () {
            for (var A = ""; ;) {
              var e = this.consumeCodePoint();
              if (uA(e)) A += c(e);
              else {
                if (!UA(e, this.peekCodePoint(0)))
                  return (this.reconsumeCodePoint(e), A);
                A += c(this.consumeEscapedCodePoint());
              }
            }
          }),
          _A);
      function _A() {
        this._value = [];
      }
      var PA =
        ((xA.create = function (A) {
          var e = new yA();
          return (e.write(A), new xA(e.read()));
        }),
        (xA.parseValue = function (A) {
          return xA.create(A).parseComponentValue();
        }),
        (xA.parseValues = function (A) {
          return xA.create(A).parseComponentValues();
        }),
        (xA.prototype.parseComponentValue = function () {
          for (var A = this.consumeToken(); A.type === K.WHITESPACE_TOKEN;)
            A = this.consumeToken();
          if (A.type === K.EOF_TOKEN)
            throw new SyntaxError(
              "Error parsing CSS component value, unexpected EOF",
            );
          this.reconsumeToken(A);
          for (
            var e = this.consumeComponentValue();
            (A = this.consumeToken()).type === K.WHITESPACE_TOKEN;
          );
          if (A.type === K.EOF_TOKEN) return e;
          throw new SyntaxError(
            "Error parsing CSS component value, multiple values found when expecting only one",
          );
        }),
        (xA.prototype.parseComponentValues = function () {
          for (var A = []; ;) {
            var e = this.consumeComponentValue();
            if (e.type === K.EOF_TOKEN) return A;
            (A.push(e), A.push());
          }
        }),
        (xA.prototype.consumeComponentValue = function () {
          var A = this.consumeToken();
          switch (A.type) {
            case K.LEFT_CURLY_BRACKET_TOKEN:
            case K.LEFT_SQUARE_BRACKET_TOKEN:
            case K.LEFT_PARENTHESIS_TOKEN:
              return this.consumeSimpleBlock(A.type);
            case K.FUNCTION_TOKEN:
              return this.consumeFunction(A);
          }
          return A;
        }),
        (xA.prototype.consumeSimpleBlock = function (A) {
          for (var e = { type: A, values: [] }, t = this.consumeToken(); ;) {
            if (t.type === K.EOF_TOKEN || se(t, A)) return e;
            (this.reconsumeToken(t),
              e.values.push(this.consumeComponentValue()),
              (t = this.consumeToken()));
          }
        }),
        (xA.prototype.consumeFunction = function (A) {
          for (var e = { name: A.value, values: [], type: K.FUNCTION }; ;) {
            var t = this.consumeToken();
            if (t.type === K.EOF_TOKEN || t.type === K.RIGHT_PARENTHESIS_TOKEN)
              return e;
            (this.reconsumeToken(t),
              e.values.push(this.consumeComponentValue()));
          }
        }),
        (xA.prototype.consumeToken = function () {
          var A = this._tokens.shift();
          return void 0 === A ? MA : A;
        }),
        (xA.prototype.reconsumeToken = function (A) {
          this._tokens.unshift(A);
        }),
        xA);
      function xA(A) {
        this._tokens = A;
      }
      function VA(A) {
        return A.type === K.DIMENSION_TOKEN;
      }
      function zA(A) {
        return A.type === K.NUMBER_TOKEN;
      }
      function XA(A) {
        return A.type === K.IDENT_TOKEN;
      }
      function JA(A) {
        return A.type === K.STRING_TOKEN;
      }
      function GA(A, e) {
        return XA(A) && A.value === e;
      }
      function kA(A) {
        return A.type !== K.WHITESPACE_TOKEN;
      }
      function WA(A) {
        return A.type !== K.WHITESPACE_TOKEN && A.type !== K.COMMA_TOKEN;
      }
      function YA(A) {
        var e = [],
          t = [];
        return (
          A.forEach(function (A) {
            if (A.type === K.COMMA_TOKEN) {
              if (0 === t.length)
                throw new Error(
                  "Error parsing function args, zero tokens for arg",
                );
              return (e.push(t), void (t = []));
            }
            A.type !== K.WHITESPACE_TOKEN && t.push(A);
          }),
          t.length && e.push(t),
          e
        );
      }
      function qA(A) {
        return A.type === K.NUMBER_TOKEN || A.type === K.DIMENSION_TOKEN;
      }
      function ZA(A) {
        return A.type === K.PERCENTAGE_TOKEN || qA(A);
      }
      function jA(A) {
        return 1 < A.length ? [A[0], A[1]] : [A[0]];
      }
      function $A(A, e, t) {
        var r = A[0],
          n = A[1];
        return [ce(r, e), ce(void 0 !== n ? n : r, t)];
      }
      function Ae(A) {
        return (
          A.type === K.DIMENSION_TOKEN &&
          ("deg" === A.unit ||
            "grad" === A.unit ||
            "rad" === A.unit ||
            "turn" === A.unit)
        );
      }
      function ee(A) {
        switch (
          A.filter(XA)
            .map(function (A) {
              return A.value;
            })
            .join(" ")
        ) {
          case "to bottom right":
          case "to right bottom":
          case "left top":
          case "top left":
            return [oe, oe];
          case "to top":
          case "bottom":
            return we(0);
          case "to bottom left":
          case "to left bottom":
          case "right top":
          case "top right":
            return [oe, ae];
          case "to right":
          case "left":
            return we(90);
          case "to top left":
          case "to left top":
          case "right bottom":
          case "bottom right":
            return [ae, ae];
          case "to bottom":
          case "top":
            return we(180);
          case "to top right":
          case "to right top":
          case "left bottom":
          case "bottom left":
            return [ae, oe];
          case "to left":
          case "right":
            return we(270);
        }
        return 0;
      }
      function te(A) {
        return 0 == (255 & A);
      }
      function re(A) {
        var e = 255 & A,
          t = 255 & (A >> 8),
          r = 255 & (A >> 16),
          n = 255 & (A >> 24);
        return e < 255
          ? "rgba(" + n + "," + r + "," + t + "," + e / 255 + ")"
          : "rgb(" + n + "," + r + "," + t + ")";
      }
      function ne(A, e) {
        if (A.type === K.NUMBER_TOKEN) return A.number;
        if (A.type !== K.PERCENTAGE_TOKEN) return 0;
        var t = 3 === e ? 1 : 255;
        return 3 === e
          ? (A.number / 100) * t
          : Math.round((A.number / 100) * t);
      }
      function Be(A) {
        var e = A.filter(WA);
        if (3 === e.length) {
          var t = e.map(ne),
            r = t[0],
            n = t[1],
            B = t[2];
          return Ue(r, n, B, 1);
        }
        if (4 !== e.length) return 0;
        var s = e.map(ne),
          o = ((r = s[0]), (n = s[1]), (B = s[2]), s[3]);
        return Ue(r, n, B, o);
      }
      var se = function (A, e) {
          return (
            (e === K.LEFT_CURLY_BRACKET_TOKEN &&
              A.type === K.RIGHT_CURLY_BRACKET_TOKEN) ||
            (e === K.LEFT_SQUARE_BRACKET_TOKEN &&
              A.type === K.RIGHT_SQUARE_BRACKET_TOKEN) ||
            (e === K.LEFT_PARENTHESIS_TOKEN &&
              A.type === K.RIGHT_PARENTHESIS_TOKEN)
          );
        },
        oe = { type: K.NUMBER_TOKEN, number: 0, flags: 4 },
        ie = { type: K.PERCENTAGE_TOKEN, number: 50, flags: 4 },
        ae = { type: K.PERCENTAGE_TOKEN, number: 100, flags: 4 },
        ce = function (A, e) {
          if (A.type === K.PERCENTAGE_TOKEN) return (A.number / 100) * e;
          if (VA(A))
            switch (A.unit) {
              case "rem":
              case "em":
                return 16 * A.number;
              case "px":
              default:
                return A.number;
            }
          return A.number;
        },
        Qe = function (A) {
          if (A.type === K.DIMENSION_TOKEN)
            switch (A.unit) {
              case "deg":
                return (Math.PI * A.number) / 180;
              case "grad":
                return (Math.PI / 200) * A.number;
              case "rad":
                return A.number;
              case "turn":
                return 2 * Math.PI * A.number;
            }
          throw new Error("Unsupported angle type");
        },
        we = function (A) {
          return (Math.PI * A) / 180;
        },
        ue = function (A) {
          if (A.type === K.FUNCTION) {
            var e = He[A.name];
            if (void 0 === e)
              throw new Error(
                'Attempting to parse an unsupported color function "' +
                  A.name +
                  '"',
              );
            return e(A.values);
          }
          if (A.type === K.HASH_TOKEN) {
            if (3 === A.value.length) {
              var t = A.value.substring(0, 1),
                r = A.value.substring(1, 2),
                n = A.value.substring(2, 3);
              return Ue(
                parseInt(t + t, 16),
                parseInt(r + r, 16),
                parseInt(n + n, 16),
                1,
              );
            }
            if (4 === A.value.length) {
              ((t = A.value.substring(0, 1)),
                (r = A.value.substring(1, 2)),
                (n = A.value.substring(2, 3)));
              var B = A.value.substring(3, 4);
              return Ue(
                parseInt(t + t, 16),
                parseInt(r + r, 16),
                parseInt(n + n, 16),
                parseInt(B + B, 16) / 255,
              );
            }
            if (6 === A.value.length)
              return (
                (t = A.value.substring(0, 2)),
                (r = A.value.substring(2, 4)),
                (n = A.value.substring(4, 6)),
                Ue(parseInt(t, 16), parseInt(r, 16), parseInt(n, 16), 1)
              );
            if (8 === A.value.length)
              return (
                (t = A.value.substring(0, 2)),
                (r = A.value.substring(2, 4)),
                (n = A.value.substring(4, 6)),
                (B = A.value.substring(6, 8)),
                Ue(
                  parseInt(t, 16),
                  parseInt(r, 16),
                  parseInt(n, 16),
                  parseInt(B, 16) / 255,
                )
              );
          }
          if (A.type === K.IDENT_TOKEN) {
            var s = de[A.value.toUpperCase()];
            if (void 0 !== s) return s;
          }
          return de.TRANSPARENT;
        },
        Ue = function (A, e, t, r) {
          return (
            ((A << 24) | (e << 16) | (t << 8) | (Math.round(255 * r) << 0)) >>>
            0
          );
        };
      function le(A, e, t) {
        return (
          t < 0 && (t += 1),
          1 <= t && (t -= 1),
          t < 1 / 6
            ? (e - A) * t * 6 + A
            : t < 0.5
              ? e
              : t < 2 / 3
                ? 6 * (e - A) * (2 / 3 - t) + A
                : A
        );
      }
      function Ce(A) {
        var e = A.filter(WA),
          t = e[0],
          r = e[1],
          n = e[2],
          B = e[3],
          s =
            (t.type === K.NUMBER_TOKEN ? we(t.number) : Qe(t)) / (2 * Math.PI),
          o = ZA(r) ? r.number / 100 : 0,
          i = ZA(n) ? n.number / 100 : 0,
          a = void 0 !== B && ZA(B) ? ce(B, 1) : 1;
        if (0 == o) return Ue(255 * i, 255 * i, 255 * i, 1);
        var c = i <= 0.5 ? i * (1 + o) : i + o - i * o,
          Q = 2 * i - c,
          w = le(Q, c, s + 1 / 3),
          u = le(Q, c, s),
          U = le(Q, c, s - 1 / 3);
        return Ue(255 * w, 255 * u, 255 * U, a);
      }
      var ge,
        Ee,
        Fe,
        he,
        He = { hsl: Ce, hsla: Ce, rgb: Be, rgba: Be },
        de = {
          ALICEBLUE: 4042850303,
          ANTIQUEWHITE: 4209760255,
          AQUA: 16777215,
          AQUAMARINE: 2147472639,
          AZURE: 4043309055,
          BEIGE: 4126530815,
          BISQUE: 4293182719,
          BLACK: 255,
          BLANCHEDALMOND: 4293643775,
          BLUE: 65535,
          BLUEVIOLET: 2318131967,
          BROWN: 2771004159,
          BURLYWOOD: 3736635391,
          CADETBLUE: 1604231423,
          CHARTREUSE: 2147418367,
          CHOCOLATE: 3530104575,
          CORAL: 4286533887,
          CORNFLOWERBLUE: 1687547391,
          CORNSILK: 4294499583,
          CRIMSON: 3692313855,
          CYAN: 16777215,
          DARKBLUE: 35839,
          DARKCYAN: 9145343,
          DARKGOLDENROD: 3095837695,
          DARKGRAY: 2846468607,
          DARKGREEN: 6553855,
          DARKGREY: 2846468607,
          DARKKHAKI: 3182914559,
          DARKMAGENTA: 2332068863,
          DARKOLIVEGREEN: 1433087999,
          DARKORANGE: 4287365375,
          DARKORCHID: 2570243327,
          DARKRED: 2332033279,
          DARKSALMON: 3918953215,
          DARKSEAGREEN: 2411499519,
          DARKSLATEBLUE: 1211993087,
          DARKSLATEGRAY: 793726975,
          DARKSLATEGREY: 793726975,
          DARKTURQUOISE: 13554175,
          DARKVIOLET: 2483082239,
          DEEPPINK: 4279538687,
          DEEPSKYBLUE: 12582911,
          DIMGRAY: 1768516095,
          DIMGREY: 1768516095,
          DODGERBLUE: 512819199,
          FIREBRICK: 2988581631,
          FLORALWHITE: 4294635775,
          FORESTGREEN: 579543807,
          FUCHSIA: 4278255615,
          GAINSBORO: 3705462015,
          GHOSTWHITE: 4177068031,
          GOLD: 4292280575,
          GOLDENROD: 3668254975,
          GRAY: 2155905279,
          GREEN: 8388863,
          GREENYELLOW: 2919182335,
          GREY: 2155905279,
          HONEYDEW: 4043305215,
          HOTPINK: 4285117695,
          INDIANRED: 3445382399,
          INDIGO: 1258324735,
          IVORY: 4294963455,
          KHAKI: 4041641215,
          LAVENDER: 3873897215,
          LAVENDERBLUSH: 4293981695,
          LAWNGREEN: 2096890111,
          LEMONCHIFFON: 4294626815,
          LIGHTBLUE: 2916673279,
          LIGHTCORAL: 4034953471,
          LIGHTCYAN: 3774873599,
          LIGHTGOLDENRODYELLOW: 4210742015,
          LIGHTGRAY: 3553874943,
          LIGHTGREEN: 2431553791,
          LIGHTGREY: 3553874943,
          LIGHTPINK: 4290167295,
          LIGHTSALMON: 4288707327,
          LIGHTSEAGREEN: 548580095,
          LIGHTSKYBLUE: 2278488831,
          LIGHTSLATEGRAY: 2005441023,
          LIGHTSLATEGREY: 2005441023,
          LIGHTSTEELBLUE: 2965692159,
          LIGHTYELLOW: 4294959359,
          LIME: 16711935,
          LIMEGREEN: 852308735,
          LINEN: 4210091775,
          MAGENTA: 4278255615,
          MAROON: 2147483903,
          MEDIUMAQUAMARINE: 1724754687,
          MEDIUMBLUE: 52735,
          MEDIUMORCHID: 3126187007,
          MEDIUMPURPLE: 2473647103,
          MEDIUMSEAGREEN: 1018393087,
          MEDIUMSLATEBLUE: 2070474495,
          MEDIUMSPRINGGREEN: 16423679,
          MEDIUMTURQUOISE: 1221709055,
          MEDIUMVIOLETRED: 3340076543,
          MIDNIGHTBLUE: 421097727,
          MINTCREAM: 4127193855,
          MISTYROSE: 4293190143,
          MOCCASIN: 4293178879,
          NAVAJOWHITE: 4292783615,
          NAVY: 33023,
          OLDLACE: 4260751103,
          OLIVE: 2155872511,
          OLIVEDRAB: 1804477439,
          ORANGE: 4289003775,
          ORANGERED: 4282712319,
          ORCHID: 3664828159,
          PALEGOLDENROD: 4008225535,
          PALEGREEN: 2566625535,
          PALETURQUOISE: 2951671551,
          PALEVIOLETRED: 3681588223,
          PAPAYAWHIP: 4293907967,
          PEACHPUFF: 4292524543,
          PERU: 3448061951,
          PINK: 4290825215,
          PLUM: 3718307327,
          POWDERBLUE: 2967529215,
          PURPLE: 2147516671,
          REBECCAPURPLE: 1714657791,
          RED: 4278190335,
          ROSYBROWN: 3163525119,
          ROYALBLUE: 1097458175,
          SADDLEBROWN: 2336560127,
          SALMON: 4202722047,
          SANDYBROWN: 4104413439,
          SEAGREEN: 780883967,
          SEASHELL: 4294307583,
          SIENNA: 2689740287,
          SILVER: 3233857791,
          SKYBLUE: 2278484991,
          SLATEBLUE: 1784335871,
          SLATEGRAY: 1887473919,
          SLATEGREY: 1887473919,
          SNOW: 4294638335,
          SPRINGGREEN: 16744447,
          STEELBLUE: 1182971135,
          TAN: 3535047935,
          TEAL: 8421631,
          THISTLE: 3636451583,
          TOMATO: 4284696575,
          TRANSPARENT: 0,
          TURQUOISE: 1088475391,
          VIOLET: 4001558271,
          WHEAT: 4125012991,
          WHITE: 4294967295,
          WHITESMOKE: 4126537215,
          YELLOW: 4294902015,
          YELLOWGREEN: 2597139199,
        };
      function fe(A) {
        var e = ue(A[0]),
          t = A[1];
        return t && ZA(t) ? { color: e, stop: t } : { color: e, stop: null };
      }
      function pe(A, e) {
        var t = A[0],
          r = A[A.length - 1];
        (null === t.stop && (t.stop = oe), null === r.stop && (r.stop = ae));
        for (var n = [], B = 0, s = 0; s < A.length; s++) {
          var o = A[s].stop;
          if (null !== o) {
            var i = ce(o, e);
            (B < i ? n.push(i) : n.push(B), (B = i));
          } else n.push(null);
        }
        var a = null;
        for (s = 0; s < n.length; s++) {
          var c = n[s];
          if (null === c) null === a && (a = s);
          else if (null !== a) {
            for (
              var Q = s - a, w = (c - n[a - 1]) / (1 + Q), u = 1;
              u <= Q;
              u++
            )
              n[a + u - 1] = w * u;
            a = null;
          }
        }
        return A.map(function (A, t) {
          return { color: A.color, stop: Math.max(Math.min(1, n[t] / e), 0) };
        });
      }
      function Ne(A, e, t) {
        var r =
            "number" == typeof A
              ? A
              : (function (A, e, t) {
                  var r = e / 2,
                    n = t / 2,
                    B = ce(A[0], e) - r,
                    s = n - ce(A[1], t);
                  return (Math.atan2(s, B) + 2 * Math.PI) % (2 * Math.PI);
                })(A, e, t),
          n = Math.abs(e * Math.sin(r)) + Math.abs(t * Math.cos(r)),
          B = e / 2,
          s = t / 2,
          o = n / 2,
          i = Math.sin(r - Math.PI / 2) * o,
          a = Math.cos(r - Math.PI / 2) * o;
        return [n, B - a, B + a, s - i, s + i];
      }
      function Ke(A, e) {
        return Math.sqrt(A * A + e * e);
      }
      function Ie(A, e, t, r, n) {
        return [
          [0, 0],
          [0, e],
          [A, 0],
          [A, e],
        ].reduce(
          function (A, e) {
            var B = e[0],
              s = e[1],
              o = Ke(t - B, r - s);
            return (n ? o < A.optimumDistance : o > A.optimumDistance)
              ? { optimumCorner: e, optimumDistance: o }
              : A;
          },
          { optimumDistance: n ? 1 / 0 : -1 / 0, optimumCorner: null },
        ).optimumCorner;
      }
      function Te(A) {
        var e = we(180),
          t = [];
        return (
          YA(A).forEach(function (A, r) {
            if (0 === r) {
              var n = A[0];
              if (
                n.type === K.IDENT_TOKEN &&
                -1 !== ["top", "left", "right", "bottom"].indexOf(n.value)
              )
                return void (e = ee(A));
              if (Ae(n)) return void (e = (Qe(n) + we(270)) % we(360));
            }
            var B = fe(A);
            t.push(B);
          }),
          { angle: e, stops: t, type: Ve.LINEAR_GRADIENT }
        );
      }
      function me(A) {
        return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3];
      }
      (((Ee = ge || (ge = {}))[(Ee.VALUE = 0)] = "VALUE"),
        (Ee[(Ee.LIST = 1)] = "LIST"),
        (Ee[(Ee.IDENT_VALUE = 2)] = "IDENT_VALUE"),
        (Ee[(Ee.TYPE_VALUE = 3)] = "TYPE_VALUE"),
        (Ee[(Ee.TOKEN_VALUE = 4)] = "TOKEN_VALUE"),
        ((he = Fe || (Fe = {}))[(he.BORDER_BOX = 0)] = "BORDER_BOX"),
        (he[(he.PADDING_BOX = 1)] = "PADDING_BOX"));
      var Re = {
          name: "background-clip",
          initialValue: "border-box",
          prefix: !(he[(he.CONTENT_BOX = 2)] = "CONTENT_BOX"),
          type: ge.LIST,
          parse: function (A) {
            return A.map(function (A) {
              if (XA(A))
                switch (A.value) {
                  case "padding-box":
                    return Fe.PADDING_BOX;
                  case "content-box":
                    return Fe.CONTENT_BOX;
                }
              return Fe.BORDER_BOX;
            });
          },
        },
        Le = {
          name: "background-color",
          initialValue: "transparent",
          prefix: !1,
          type: ge.TYPE_VALUE,
          format: "color",
        },
        ve = function (A, e, t, r, n) {
          var B = "http://www.w3.org/2000/svg",
            s = document.createElementNS(B, "svg"),
            o = document.createElementNS(B, "foreignObject");
          return (
            s.setAttributeNS(null, "width", A.toString()),
            s.setAttributeNS(null, "height", e.toString()),
            o.setAttributeNS(null, "width", "100%"),
            o.setAttributeNS(null, "height", "100%"),
            o.setAttributeNS(null, "x", t.toString()),
            o.setAttributeNS(null, "y", r.toString()),
            o.setAttributeNS(null, "externalResourcesRequired", "true"),
            s.appendChild(o),
            o.appendChild(n),
            s
          );
        },
        Oe = function (A) {
          return new Promise(function (e, t) {
            var r = new Image();
            ((r.onload = function () {
              return e(r);
            }),
              (r.onerror = t),
              (r.src =
                "data:image/svg+xml;charset=utf-8," +
                encodeURIComponent(new XMLSerializer().serializeToString(A))));
          });
        },
        De = {
          get SUPPORT_RANGE_BOUNDS() {
            var A = (function (A) {
              if (A.createRange) {
                var e = A.createRange();
                if (e.getBoundingClientRect) {
                  var t = A.createElement("boundtest");
                  ((t.style.height = "123px"),
                    (t.style.display = "block"),
                    A.body.appendChild(t),
                    e.selectNode(t));
                  var r = e.getBoundingClientRect(),
                    n = Math.round(r.height);
                  if ((A.body.removeChild(t), 123 === n)) return !0;
                }
              }
              return !1;
            })(document);
            return (
              Object.defineProperty(De, "SUPPORT_RANGE_BOUNDS", { value: A }),
              A
            );
          },
          get SUPPORT_SVG_DRAWING() {
            var A = (function (A) {
              var e = new Image(),
                t = A.createElement("canvas"),
                r = t.getContext("2d");
              if (!r) return !1;
              e.src =
                "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
              try {
                (r.drawImage(e, 0, 0), t.toDataURL());
              } catch (A) {
                return !1;
              }
              return !0;
            })(document);
            return (
              Object.defineProperty(De, "SUPPORT_SVG_DRAWING", { value: A }),
              A
            );
          },
          get SUPPORT_FOREIGNOBJECT_DRAWING() {
            var A =
              "function" == typeof Array.from &&
              "function" == typeof window.fetch
                ? (function (A) {
                    var e = A.createElement("canvas"),
                      t = 100;
                    ((e.width = t), (e.height = t));
                    var r = e.getContext("2d");
                    if (!r) return Promise.reject(!1);
                    ((r.fillStyle = "rgb(0, 255, 0)"), r.fillRect(0, 0, t, t));
                    var n = new Image(),
                      B = e.toDataURL();
                    n.src = B;
                    var s = ve(t, t, 0, 0, n);
                    return (
                      (r.fillStyle = "red"),
                      r.fillRect(0, 0, t, t),
                      Oe(s)
                        .then(function (e) {
                          r.drawImage(e, 0, 0);
                          var n = r.getImageData(0, 0, t, t).data;
                          ((r.fillStyle = "red"), r.fillRect(0, 0, t, t));
                          var s = A.createElement("div");
                          return (
                            (s.style.backgroundImage = "url(" + B + ")"),
                            (s.style.height = "100px"),
                            me(n) ? Oe(ve(t, t, 0, 0, s)) : Promise.reject(!1)
                          );
                        })
                        .then(function (A) {
                          return (
                            r.drawImage(A, 0, 0),
                            me(r.getImageData(0, 0, t, t).data)
                          );
                        })
                        .catch(function () {
                          return !1;
                        })
                    );
                  })(document)
                : Promise.resolve(!1);
            return (
              Object.defineProperty(De, "SUPPORT_FOREIGNOBJECT_DRAWING", {
                value: A,
              }),
              A
            );
          },
          get SUPPORT_CORS_IMAGES() {
            var A = void 0 !== new Image().crossOrigin;
            return (
              Object.defineProperty(De, "SUPPORT_CORS_IMAGES", { value: A }),
              A
            );
          },
          get SUPPORT_RESPONSE_TYPE() {
            var A = "string" == typeof new XMLHttpRequest().responseType;
            return (
              Object.defineProperty(De, "SUPPORT_RESPONSE_TYPE", { value: A }),
              A
            );
          },
          get SUPPORT_CORS_XHR() {
            var A = "withCredentials" in new XMLHttpRequest();
            return (
              Object.defineProperty(De, "SUPPORT_CORS_XHR", { value: A }),
              A
            );
          },
        },
        be =
          ((Se.prototype.debug = function () {
            for (var A = [], e = 0; e < arguments.length; e++)
              A[e] = arguments[e];
            this.enabled &&
              ("undefined" != typeof window &&
              window.console &&
              "function" == typeof console.debug
                ? console.debug.apply(
                    console,
                    [this.id, this.getTime() + "ms"].concat(A),
                  )
                : this.info.apply(this, A));
          }),
          (Se.prototype.getTime = function () {
            return Date.now() - this.start;
          }),
          (Se.create = function (A) {
            Se.instances[A.id] = new Se(A);
          }),
          (Se.destroy = function (A) {
            delete Se.instances[A];
          }),
          (Se.getInstance = function (A) {
            var e = Se.instances[A];
            if (void 0 === e)
              throw new Error("No logger instance found with id " + A);
            return e;
          }),
          (Se.prototype.info = function () {
            for (var A = [], e = 0; e < arguments.length; e++)
              A[e] = arguments[e];
            this.enabled &&
              "undefined" != typeof window &&
              window.console &&
              "function" == typeof console.info &&
              console.info.apply(
                console,
                [this.id, this.getTime() + "ms"].concat(A),
              );
          }),
          (Se.prototype.error = function () {
            for (var A = [], e = 0; e < arguments.length; e++)
              A[e] = arguments[e];
            this.enabled &&
              ("undefined" != typeof window &&
              window.console &&
              "function" == typeof console.error
                ? console.error.apply(
                    console,
                    [this.id, this.getTime() + "ms"].concat(A),
                  )
                : this.info.apply(this, A));
          }),
          (Se.instances = {}),
          Se);
      function Se(A) {
        var e = A.id,
          t = A.enabled;
        ((this.id = e), (this.enabled = t), (this.start = Date.now()));
      }
      var Me =
        ((ye.create = function (A, e) {
          return (ye._caches[A] = new _e(A, e));
        }),
        (ye.destroy = function (A) {
          delete ye._caches[A];
        }),
        (ye.open = function (A) {
          var e = ye._caches[A];
          if (void 0 !== e) return e;
          throw new Error('Cache with key "' + A + '" not found');
        }),
        (ye.getOrigin = function (A) {
          var e = ye._link;
          return e
            ? ((e.href = A),
              (e.href = e.href),
              e.protocol + e.hostname + e.port)
            : "about:blank";
        }),
        (ye.isSameOrigin = function (A) {
          return ye.getOrigin(A) === ye._origin;
        }),
        (ye.setContext = function (A) {
          ((ye._link = A.document.createElement("a")),
            (ye._origin = ye.getOrigin(A.location.href)));
        }),
        (ye.getInstance = function () {
          var A = ye._current;
          if (null === A) throw new Error("No cache instance attached");
          return A;
        }),
        (ye.attachInstance = function (A) {
          ye._current = A;
        }),
        (ye.detachInstance = function () {
          ye._current = null;
        }),
        (ye._caches = {}),
        (ye._origin = "about:blank"),
        (ye._current = null),
        ye);
      function ye() {}
      var _e =
        ((Pe.prototype.addImage = function (A) {
          var e = Promise.resolve();
          return (
            this.has(A) ||
              ((At(A) || Ze(A)) && (this._cache[A] = this.loadImage(A))),
            e
          );
        }),
        (Pe.prototype.match = function (A) {
          return this._cache[A];
        }),
        (Pe.prototype.loadImage = function (A) {
          return r(this, void 0, void 0, function () {
            var e,
              t,
              r,
              B,
              s = this;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  return (
                    (e = Me.isSameOrigin(A)),
                    (t =
                      !je(A) &&
                      !0 === this._options.useCORS &&
                      De.SUPPORT_CORS_IMAGES &&
                      !e),
                    (r =
                      !je(A) &&
                      !e &&
                      "string" == typeof this._options.proxy &&
                      De.SUPPORT_CORS_XHR &&
                      !t),
                    e || !1 !== this._options.allowTaint || je(A) || r || t
                      ? ((B = A), r ? [4, this.proxy(B)] : [3, 2])
                      : [2]
                  );
                case 1:
                  ((B = n.sent()), (n.label = 2));
                case 2:
                  return (
                    be
                      .getInstance(this.id)
                      .debug("Added image " + A.substring(0, 256)),
                    [
                      4,
                      new Promise(function (A, e) {
                        var r = new Image();
                        ((r.onload = function () {
                          return A(r);
                        }),
                          (r.onerror = e),
                          ($e(B) || t) && (r.crossOrigin = "anonymous"),
                          (r.src = B),
                          !0 === r.complete &&
                            setTimeout(function () {
                              return A(r);
                            }, 500),
                          0 < s._options.imageTimeout &&
                            setTimeout(function () {
                              return e(
                                "Timed out (" +
                                  s._options.imageTimeout +
                                  "ms) loading image",
                              );
                            }, s._options.imageTimeout));
                      }),
                    ]
                  );
                case 3:
                  return [2, n.sent()];
              }
            });
          });
        }),
        (Pe.prototype.has = function (A) {
          return void 0 !== this._cache[A];
        }),
        (Pe.prototype.keys = function () {
          return Promise.resolve(Object.keys(this._cache));
        }),
        (Pe.prototype.proxy = function (A) {
          var e = this,
            t = this._options.proxy;
          if (!t) throw new Error("No proxy defined");
          var r = A.substring(0, 256);
          return new Promise(function (n, B) {
            var s = De.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
              o = new XMLHttpRequest();
            if (
              ((o.onload = function () {
                if (200 === o.status)
                  if ("text" == s) n(o.response);
                  else {
                    var A = new FileReader();
                    (A.addEventListener(
                      "load",
                      function () {
                        return n(A.result);
                      },
                      !1,
                    ),
                      A.addEventListener(
                        "error",
                        function (A) {
                          return B(A);
                        },
                        !1,
                      ),
                      A.readAsDataURL(o.response));
                  }
                else
                  B(
                    "Failed to proxy resource " +
                      r +
                      " with status code " +
                      o.status,
                  );
              }),
              (o.onerror = B),
              o.open(
                "GET",
                t + "?url=" + encodeURIComponent(A) + "&responseType=" + s,
              ),
              "text" != s &&
                o instanceof XMLHttpRequest &&
                (o.responseType = s),
              e._options.imageTimeout)
            ) {
              var i = e._options.imageTimeout;
              ((o.timeout = i),
                (o.ontimeout = function () {
                  return B("Timed out (" + i + "ms) proxying " + r);
                }));
            }
            o.send();
          });
        }),
        Pe);
      function Pe(A, e) {
        ((this.id = A), (this._options = e), (this._cache = {}));
      }
      function xe(A) {
        var e = Xe.CIRCLE,
          t = Ge.FARTHEST_CORNER,
          r = [],
          n = [];
        return (
          YA(A).forEach(function (A, B) {
            var s = !0;
            if (
              (0 === B
                ? (s = A.reduce(function (A, e) {
                    if (XA(e))
                      switch (e.value) {
                        case "center":
                          return (n.push(ie), !1);
                        case "top":
                        case "left":
                          return (n.push(oe), !1);
                        case "right":
                        case "bottom":
                          return (n.push(ae), !1);
                      }
                    else if (ZA(e) || qA(e)) return (n.push(e), !1);
                    return A;
                  }, s))
                : 1 === B &&
                  (s = A.reduce(function (A, r) {
                    if (XA(r))
                      switch (r.value) {
                        case "circle":
                          return ((e = Xe.CIRCLE), !1);
                        case st:
                          return ((e = Xe.ELLIPSE), !1);
                        case ot:
                        case tt:
                          return ((t = Ge.CLOSEST_SIDE), !1);
                        case rt:
                          return ((t = Ge.FARTHEST_SIDE), !1);
                        case nt:
                          return ((t = Ge.CLOSEST_CORNER), !1);
                        case "cover":
                        case Bt:
                          return ((t = Ge.FARTHEST_CORNER), !1);
                      }
                    else if (qA(r) || ZA(r))
                      return (Array.isArray(t) || (t = []), t.push(r), !1);
                    return A;
                  }, s)),
              s)
            ) {
              var o = fe(A);
              r.push(o);
            }
          }),
          { size: t, shape: e, stops: r, position: n, type: Ve.RADIAL_GRADIENT }
        );
      }
      var Ve,
        ze,
        Xe,
        Je,
        Ge,
        ke,
        We = /^data:image\/svg\+xml/i,
        Ye = /^data:image\/.*;base64,/i,
        qe = /^data:image\/.*/i,
        Ze = function (A) {
          return De.SUPPORT_SVG_DRAWING || !et(A);
        },
        je = function (A) {
          return qe.test(A);
        },
        $e = function (A) {
          return Ye.test(A);
        },
        At = function (A) {
          return "blob" === A.substr(0, 4);
        },
        et = function (A) {
          return "svg" === A.substr(-3).toLowerCase() || We.test(A);
        },
        tt = "closest-side",
        rt = "farthest-side",
        nt = "closest-corner",
        Bt = "farthest-corner",
        st = "ellipse",
        ot = "contain";
      (((ze = Ve || (Ve = {}))[(ze.URL = 0)] = "URL"),
        (ze[(ze.LINEAR_GRADIENT = 1)] = "LINEAR_GRADIENT"),
        (ze[(ze.RADIAL_GRADIENT = 2)] = "RADIAL_GRADIENT"),
        ((Je = Xe || (Xe = {}))[(Je.CIRCLE = 0)] = "CIRCLE"),
        (Je[(Je.ELLIPSE = 1)] = "ELLIPSE"),
        ((ke = Ge || (Ge = {}))[(ke.CLOSEST_SIDE = 0)] = "CLOSEST_SIDE"),
        (ke[(ke.FARTHEST_SIDE = 1)] = "FARTHEST_SIDE"),
        (ke[(ke.CLOSEST_CORNER = 2)] = "CLOSEST_CORNER"),
        (ke[(ke.FARTHEST_CORNER = 3)] = "FARTHEST_CORNER"));
      var it,
        at,
        ct = function (A) {
          if (A.type === K.URL_TOKEN) {
            var e = { url: A.value, type: Ve.URL };
            return (Me.getInstance().addImage(A.value), e);
          }
          if (A.type !== K.FUNCTION) throw new Error("Unsupported image type");
          var t = Qt[A.name];
          if (void 0 === t)
            throw new Error(
              'Attempting to parse an unsupported image function "' +
                A.name +
                '"',
            );
          return t(A.values);
        },
        Qt = {
          "linear-gradient": function (A) {
            var e = we(180),
              t = [];
            return (
              YA(A).forEach(function (A, r) {
                if (0 === r) {
                  var n = A[0];
                  if (n.type === K.IDENT_TOKEN && "to" === n.value)
                    return void (e = ee(A));
                  if (Ae(n)) return void (e = Qe(n));
                }
                var B = fe(A);
                t.push(B);
              }),
              { angle: e, stops: t, type: Ve.LINEAR_GRADIENT }
            );
          },
          "-moz-linear-gradient": Te,
          "-ms-linear-gradient": Te,
          "-o-linear-gradient": Te,
          "-webkit-linear-gradient": Te,
          "radial-gradient": function (A) {
            var e = Xe.CIRCLE,
              t = Ge.FARTHEST_CORNER,
              r = [],
              n = [];
            return (
              YA(A).forEach(function (A, B) {
                var s = !0;
                if (0 === B) {
                  var o = !1;
                  s = A.reduce(function (A, r) {
                    if (o)
                      if (XA(r))
                        switch (r.value) {
                          case "center":
                            return (n.push(ie), A);
                          case "top":
                          case "left":
                            return (n.push(oe), A);
                          case "right":
                          case "bottom":
                            return (n.push(ae), A);
                        }
                      else (ZA(r) || qA(r)) && n.push(r);
                    else if (XA(r))
                      switch (r.value) {
                        case "circle":
                          return ((e = Xe.CIRCLE), !1);
                        case st:
                          return ((e = Xe.ELLIPSE), !1);
                        case "at":
                          return !(o = !0);
                        case tt:
                          return ((t = Ge.CLOSEST_SIDE), !1);
                        case "cover":
                        case rt:
                          return ((t = Ge.FARTHEST_SIDE), !1);
                        case ot:
                        case nt:
                          return ((t = Ge.CLOSEST_CORNER), !1);
                        case Bt:
                          return ((t = Ge.FARTHEST_CORNER), !1);
                      }
                    else if (qA(r) || ZA(r))
                      return (Array.isArray(t) || (t = []), t.push(r), !1);
                    return A;
                  }, s);
                }
                if (s) {
                  var i = fe(A);
                  r.push(i);
                }
              }),
              {
                size: t,
                shape: e,
                stops: r,
                position: n,
                type: Ve.RADIAL_GRADIENT,
              }
            );
          },
          "-moz-radial-gradient": xe,
          "-ms-radial-gradient": xe,
          "-o-radial-gradient": xe,
          "-webkit-radial-gradient": xe,
          "-webkit-gradient": function (A) {
            var e = we(180),
              t = [],
              r = Ve.LINEAR_GRADIENT,
              n = Xe.CIRCLE,
              B = Ge.FARTHEST_CORNER;
            return (
              YA(A).forEach(function (A, e) {
                var n = A[0];
                if (0 === e) {
                  if (XA(n) && "linear" === n.value)
                    return void (r = Ve.LINEAR_GRADIENT);
                  if (XA(n) && "radial" === n.value)
                    return void (r = Ve.RADIAL_GRADIENT);
                }
                if (n.type === K.FUNCTION)
                  if ("from" === n.name) {
                    var B = ue(n.values[0]);
                    t.push({ stop: oe, color: B });
                  } else if ("to" === n.name)
                    ((B = ue(n.values[0])), t.push({ stop: ae, color: B }));
                  else if ("color-stop" === n.name) {
                    var s = n.values.filter(WA);
                    if (2 === s.length) {
                      B = ue(s[1]);
                      var o = s[0];
                      zA(o) &&
                        t.push({
                          stop: {
                            type: K.PERCENTAGE_TOKEN,
                            number: 100 * o.number,
                            flags: o.flags,
                          },
                          color: B,
                        });
                    }
                  }
              }),
              r === Ve.LINEAR_GRADIENT
                ? { angle: (e + we(180)) % we(360), stops: t, type: r }
                : { size: B, shape: n, stops: t, position: [], type: r }
            );
          },
        },
        wt = {
          name: "background-image",
          initialValue: "none",
          type: ge.LIST,
          prefix: !1,
          parse: function (A) {
            if (0 === A.length) return [];
            var e = A[0];
            return e.type === K.IDENT_TOKEN && "none" === e.value
              ? []
              : A.filter(function (A) {
                  return (
                    WA(A) &&
                    (function (A) {
                      return A.type !== K.FUNCTION || Qt[A.name];
                    })(A)
                  );
                }).map(ct);
          },
        },
        ut = {
          name: "background-origin",
          initialValue: "border-box",
          prefix: !1,
          type: ge.LIST,
          parse: function (A) {
            return A.map(function (A) {
              if (XA(A))
                switch (A.value) {
                  case "padding-box":
                    return 1;
                  case "content-box":
                    return 2;
                }
              return 0;
            });
          },
        },
        Ut = {
          name: "background-position",
          initialValue: "0% 0%",
          type: ge.LIST,
          prefix: !1,
          parse: function (A) {
            return YA(A)
              .map(function (A) {
                return A.filter(ZA);
              })
              .map(jA);
          },
        };
      (((at = it || (it = {}))[(at.REPEAT = 0)] = "REPEAT"),
        (at[(at.NO_REPEAT = 1)] = "NO_REPEAT"),
        (at[(at.REPEAT_X = 2)] = "REPEAT_X"));
      var lt,
        Ct,
        gt = {
          name: "background-repeat",
          initialValue: "repeat",
          prefix: !(at[(at.REPEAT_Y = 3)] = "REPEAT_Y"),
          type: ge.LIST,
          parse: function (A) {
            return YA(A)
              .map(function (A) {
                return A.filter(XA)
                  .map(function (A) {
                    return A.value;
                  })
                  .join(" ");
              })
              .map(Et);
          },
        },
        Et = function (A) {
          switch (A) {
            case "no-repeat":
              return it.NO_REPEAT;
            case "repeat-x":
            case "repeat no-repeat":
              return it.REPEAT_X;
            case "repeat-y":
            case "no-repeat repeat":
              return it.REPEAT_Y;
            case "repeat":
            default:
              return it.REPEAT;
          }
        };
      function Ft(A) {
        return {
          name: "border-" + A + "-color",
          initialValue: "transparent",
          prefix: !1,
          type: ge.TYPE_VALUE,
          format: "color",
        };
      }
      function ht(A) {
        return {
          name: "border-radius-" + A,
          initialValue: "0 0",
          prefix: !1,
          type: ge.LIST,
          parse: function (A) {
            return jA(A.filter(ZA));
          },
        };
      }
      (((Ct = lt || (lt = {})).AUTO = "auto"), (Ct.CONTAIN = "contain"));
      var Ht,
        dt,
        ft = {
          name: "background-size",
          initialValue: "0",
          prefix: !(Ct.COVER = "cover"),
          type: ge.LIST,
          parse: function (A) {
            return YA(A).map(function (A) {
              return A.filter(pt);
            });
          },
        },
        pt = function (A) {
          return XA(A) || ZA(A);
        },
        Nt = Ft("top"),
        Kt = Ft("right"),
        It = Ft("bottom"),
        Tt = Ft("left"),
        mt = ht("top-left"),
        Rt = ht("top-right"),
        Lt = ht("bottom-right"),
        vt = ht("bottom-left");
      function Ot(A) {
        return {
          name: "border-" + A + "-style",
          initialValue: "solid",
          prefix: !1,
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "none":
                return Ht.NONE;
            }
            return Ht.SOLID;
          },
        };
      }
      function Dt(A) {
        return {
          name: "border-" + A + "-width",
          initialValue: "0",
          type: ge.VALUE,
          prefix: !1,
          parse: function (A) {
            return VA(A) ? A.number : 0;
          },
        };
      }
      (((dt = Ht || (Ht = {}))[(dt.NONE = 0)] = "NONE"),
        (dt[(dt.SOLID = 1)] = "SOLID"));
      var bt,
        St,
        Mt = Ot("top"),
        yt = Ot("right"),
        _t = Ot("bottom"),
        Pt = Ot("left"),
        xt = Dt("top"),
        Vt = Dt("right"),
        zt = Dt("bottom"),
        Xt = Dt("left"),
        Jt = {
          name: "color",
          initialValue: "transparent",
          prefix: !1,
          type: ge.TYPE_VALUE,
          format: "color",
        },
        Gt = {
          name: "display",
          initialValue: "inline-block",
          prefix: !1,
          type: ge.LIST,
          parse: function (A) {
            return A.filter(XA).reduce(function (A, e) {
              return A | kt(e.value);
            }, 0);
          },
        },
        kt = function (A) {
          switch (A) {
            case "block":
              return 2;
            case "inline":
              return 4;
            case "run-in":
              return 8;
            case "flow":
              return 16;
            case "flow-root":
              return 32;
            case "table":
              return 64;
            case "flex":
            case "-webkit-flex":
              return 128;
            case "grid":
            case "-ms-grid":
              return 256;
            case "ruby":
              return 512;
            case "subgrid":
              return 1024;
            case "list-item":
              return 2048;
            case "table-row-group":
              return 4096;
            case "table-header-group":
              return 8192;
            case "table-footer-group":
              return 16384;
            case "table-row":
              return 32768;
            case "table-cell":
              return 65536;
            case "table-column-group":
              return 131072;
            case "table-column":
              return 262144;
            case "table-caption":
              return 524288;
            case "ruby-base":
              return 1048576;
            case "ruby-text":
              return 2097152;
            case "ruby-base-container":
              return 4194304;
            case "ruby-text-container":
              return 8388608;
            case "contents":
              return 16777216;
            case "inline-block":
              return 33554432;
            case "inline-list-item":
              return 67108864;
            case "inline-table":
              return 134217728;
            case "inline-flex":
              return 268435456;
            case "inline-grid":
              return 536870912;
          }
          return 0;
        };
      (((St = bt || (bt = {}))[(St.NONE = 0)] = "NONE"),
        (St[(St.LEFT = 1)] = "LEFT"),
        (St[(St.RIGHT = 2)] = "RIGHT"),
        (St[(St.INLINE_START = 3)] = "INLINE_START"));
      var Wt,
        Yt,
        qt,
        Zt,
        jt = {
          name: "float",
          initialValue: "none",
          prefix: !(St[(St.INLINE_END = 4)] = "INLINE_END"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "left":
                return bt.LEFT;
              case "right":
                return bt.RIGHT;
              case "inline-start":
                return bt.INLINE_START;
              case "inline-end":
                return bt.INLINE_END;
            }
            return bt.NONE;
          },
        },
        $t = {
          name: "letter-spacing",
          initialValue: "0",
          prefix: !1,
          type: ge.VALUE,
          parse: function (A) {
            return A.type === K.IDENT_TOKEN && "normal" === A.value
              ? 0
              : A.type === K.NUMBER_TOKEN || A.type === K.DIMENSION_TOKEN
                ? A.number
                : 0;
          },
        },
        Ar = {
          name: "line-break",
          initialValue: ((Yt = Wt || (Wt = {})).NORMAL = "normal"),
          prefix: !(Yt.STRICT = "strict"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "strict":
                return Wt.STRICT;
              case "normal":
              default:
                return Wt.NORMAL;
            }
          },
        },
        er = {
          name: "line-height",
          initialValue: "normal",
          prefix: !1,
          type: ge.TOKEN_VALUE,
        },
        tr = {
          name: "list-style-image",
          initialValue: "none",
          type: ge.VALUE,
          prefix: !1,
          parse: function (A) {
            return A.type === K.IDENT_TOKEN && "none" === A.value
              ? null
              : ct(A);
          },
        };
      (Zt = qt || (qt = {}))[(Zt.INSIDE = 0)] = "INSIDE";
      var rr,
        nr,
        Br = {
          name: "list-style-position",
          initialValue: "outside",
          prefix: !(Zt[(Zt.OUTSIDE = 1)] = "OUTSIDE"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "inside":
                return qt.INSIDE;
              case "outside":
              default:
                return qt.OUTSIDE;
            }
          },
        };
      function sr(A) {
        return {
          name: "margin-" + A,
          initialValue: "0",
          prefix: !1,
          type: ge.TOKEN_VALUE,
        };
      }
      (((nr = rr || (rr = {}))[(nr.NONE = -1)] = "NONE"),
        (nr[(nr.DISC = 0)] = "DISC"),
        (nr[(nr.CIRCLE = 1)] = "CIRCLE"),
        (nr[(nr.SQUARE = 2)] = "SQUARE"),
        (nr[(nr.DECIMAL = 3)] = "DECIMAL"),
        (nr[(nr.CJK_DECIMAL = 4)] = "CJK_DECIMAL"),
        (nr[(nr.DECIMAL_LEADING_ZERO = 5)] = "DECIMAL_LEADING_ZERO"),
        (nr[(nr.LOWER_ROMAN = 6)] = "LOWER_ROMAN"),
        (nr[(nr.UPPER_ROMAN = 7)] = "UPPER_ROMAN"),
        (nr[(nr.LOWER_GREEK = 8)] = "LOWER_GREEK"),
        (nr[(nr.LOWER_ALPHA = 9)] = "LOWER_ALPHA"),
        (nr[(nr.UPPER_ALPHA = 10)] = "UPPER_ALPHA"),
        (nr[(nr.ARABIC_INDIC = 11)] = "ARABIC_INDIC"),
        (nr[(nr.ARMENIAN = 12)] = "ARMENIAN"),
        (nr[(nr.BENGALI = 13)] = "BENGALI"),
        (nr[(nr.CAMBODIAN = 14)] = "CAMBODIAN"),
        (nr[(nr.CJK_EARTHLY_BRANCH = 15)] = "CJK_EARTHLY_BRANCH"),
        (nr[(nr.CJK_HEAVENLY_STEM = 16)] = "CJK_HEAVENLY_STEM"),
        (nr[(nr.CJK_IDEOGRAPHIC = 17)] = "CJK_IDEOGRAPHIC"),
        (nr[(nr.DEVANAGARI = 18)] = "DEVANAGARI"),
        (nr[(nr.ETHIOPIC_NUMERIC = 19)] = "ETHIOPIC_NUMERIC"),
        (nr[(nr.GEORGIAN = 20)] = "GEORGIAN"),
        (nr[(nr.GUJARATI = 21)] = "GUJARATI"),
        (nr[(nr.GURMUKHI = 22)] = "GURMUKHI"),
        (nr[(nr.HEBREW = 22)] = "HEBREW"),
        (nr[(nr.HIRAGANA = 23)] = "HIRAGANA"),
        (nr[(nr.HIRAGANA_IROHA = 24)] = "HIRAGANA_IROHA"),
        (nr[(nr.JAPANESE_FORMAL = 25)] = "JAPANESE_FORMAL"),
        (nr[(nr.JAPANESE_INFORMAL = 26)] = "JAPANESE_INFORMAL"),
        (nr[(nr.KANNADA = 27)] = "KANNADA"),
        (nr[(nr.KATAKANA = 28)] = "KATAKANA"),
        (nr[(nr.KATAKANA_IROHA = 29)] = "KATAKANA_IROHA"),
        (nr[(nr.KHMER = 30)] = "KHMER"),
        (nr[(nr.KOREAN_HANGUL_FORMAL = 31)] = "KOREAN_HANGUL_FORMAL"),
        (nr[(nr.KOREAN_HANJA_FORMAL = 32)] = "KOREAN_HANJA_FORMAL"),
        (nr[(nr.KOREAN_HANJA_INFORMAL = 33)] = "KOREAN_HANJA_INFORMAL"),
        (nr[(nr.LAO = 34)] = "LAO"),
        (nr[(nr.LOWER_ARMENIAN = 35)] = "LOWER_ARMENIAN"),
        (nr[(nr.MALAYALAM = 36)] = "MALAYALAM"),
        (nr[(nr.MONGOLIAN = 37)] = "MONGOLIAN"),
        (nr[(nr.MYANMAR = 38)] = "MYANMAR"),
        (nr[(nr.ORIYA = 39)] = "ORIYA"),
        (nr[(nr.PERSIAN = 40)] = "PERSIAN"),
        (nr[(nr.SIMP_CHINESE_FORMAL = 41)] = "SIMP_CHINESE_FORMAL"),
        (nr[(nr.SIMP_CHINESE_INFORMAL = 42)] = "SIMP_CHINESE_INFORMAL"),
        (nr[(nr.TAMIL = 43)] = "TAMIL"),
        (nr[(nr.TELUGU = 44)] = "TELUGU"),
        (nr[(nr.THAI = 45)] = "THAI"),
        (nr[(nr.TIBETAN = 46)] = "TIBETAN"),
        (nr[(nr.TRAD_CHINESE_FORMAL = 47)] = "TRAD_CHINESE_FORMAL"),
        (nr[(nr.TRAD_CHINESE_INFORMAL = 48)] = "TRAD_CHINESE_INFORMAL"),
        (nr[(nr.UPPER_ARMENIAN = 49)] = "UPPER_ARMENIAN"),
        (nr[(nr.DISCLOSURE_OPEN = 50)] = "DISCLOSURE_OPEN"));
      var or,
        ir,
        ar = {
          name: "list-style-type",
          initialValue: "none",
          prefix: !(nr[(nr.DISCLOSURE_CLOSED = 51)] = "DISCLOSURE_CLOSED"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "disc":
                return rr.DISC;
              case "circle":
                return rr.CIRCLE;
              case "square":
                return rr.SQUARE;
              case "decimal":
                return rr.DECIMAL;
              case "cjk-decimal":
                return rr.CJK_DECIMAL;
              case "decimal-leading-zero":
                return rr.DECIMAL_LEADING_ZERO;
              case "lower-roman":
                return rr.LOWER_ROMAN;
              case "upper-roman":
                return rr.UPPER_ROMAN;
              case "lower-greek":
                return rr.LOWER_GREEK;
              case "lower-alpha":
                return rr.LOWER_ALPHA;
              case "upper-alpha":
                return rr.UPPER_ALPHA;
              case "arabic-indic":
                return rr.ARABIC_INDIC;
              case "armenian":
                return rr.ARMENIAN;
              case "bengali":
                return rr.BENGALI;
              case "cambodian":
                return rr.CAMBODIAN;
              case "cjk-earthly-branch":
                return rr.CJK_EARTHLY_BRANCH;
              case "cjk-heavenly-stem":
                return rr.CJK_HEAVENLY_STEM;
              case "cjk-ideographic":
                return rr.CJK_IDEOGRAPHIC;
              case "devanagari":
                return rr.DEVANAGARI;
              case "ethiopic-numeric":
                return rr.ETHIOPIC_NUMERIC;
              case "georgian":
                return rr.GEORGIAN;
              case "gujarati":
                return rr.GUJARATI;
              case "gurmukhi":
                return rr.GURMUKHI;
              case "hebrew":
                return rr.HEBREW;
              case "hiragana":
                return rr.HIRAGANA;
              case "hiragana-iroha":
                return rr.HIRAGANA_IROHA;
              case "japanese-formal":
                return rr.JAPANESE_FORMAL;
              case "japanese-informal":
                return rr.JAPANESE_INFORMAL;
              case "kannada":
                return rr.KANNADA;
              case "katakana":
                return rr.KATAKANA;
              case "katakana-iroha":
                return rr.KATAKANA_IROHA;
              case "khmer":
                return rr.KHMER;
              case "korean-hangul-formal":
                return rr.KOREAN_HANGUL_FORMAL;
              case "korean-hanja-formal":
                return rr.KOREAN_HANJA_FORMAL;
              case "korean-hanja-informal":
                return rr.KOREAN_HANJA_INFORMAL;
              case "lao":
                return rr.LAO;
              case "lower-armenian":
                return rr.LOWER_ARMENIAN;
              case "malayalam":
                return rr.MALAYALAM;
              case "mongolian":
                return rr.MONGOLIAN;
              case "myanmar":
                return rr.MYANMAR;
              case "oriya":
                return rr.ORIYA;
              case "persian":
                return rr.PERSIAN;
              case "simp-chinese-formal":
                return rr.SIMP_CHINESE_FORMAL;
              case "simp-chinese-informal":
                return rr.SIMP_CHINESE_INFORMAL;
              case "tamil":
                return rr.TAMIL;
              case "telugu":
                return rr.TELUGU;
              case "thai":
                return rr.THAI;
              case "tibetan":
                return rr.TIBETAN;
              case "trad-chinese-formal":
                return rr.TRAD_CHINESE_FORMAL;
              case "trad-chinese-informal":
                return rr.TRAD_CHINESE_INFORMAL;
              case "upper-armenian":
                return rr.UPPER_ARMENIAN;
              case "disclosure-open":
                return rr.DISCLOSURE_OPEN;
              case "disclosure-closed":
                return rr.DISCLOSURE_CLOSED;
              case "none":
              default:
                return rr.NONE;
            }
          },
        },
        cr = sr("top"),
        Qr = sr("right"),
        wr = sr("bottom"),
        ur = sr("left");
      function Ur(A) {
        return {
          name: "padding-" + A,
          initialValue: "0",
          prefix: !1,
          type: ge.TYPE_VALUE,
          format: "length-percentage",
        };
      }
      (((ir = or || (or = {}))[(ir.VISIBLE = 0)] = "VISIBLE"),
        (ir[(ir.HIDDEN = 1)] = "HIDDEN"),
        (ir[(ir.SCROLL = 2)] = "SCROLL"));
      var lr,
        Cr,
        gr,
        Er,
        Fr = {
          name: "overflow",
          initialValue: "visible",
          prefix: !(ir[(ir.AUTO = 3)] = "AUTO"),
          type: ge.LIST,
          parse: function (A) {
            return A.filter(XA).map(function (A) {
              switch (A.value) {
                case "hidden":
                  return or.HIDDEN;
                case "scroll":
                  return or.SCROLL;
                case "auto":
                  return or.AUTO;
                case "visible":
                default:
                  return or.VISIBLE;
              }
            });
          },
        },
        hr = {
          name: "overflow-wrap",
          initialValue: ((Cr = lr || (lr = {})).NORMAL = "normal"),
          prefix: !(Cr.BREAK_WORD = "break-word"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "break-word":
                return lr.BREAK_WORD;
              case "normal":
              default:
                return lr.NORMAL;
            }
          },
        },
        Hr = Ur("top"),
        dr = Ur("right"),
        fr = Ur("bottom"),
        pr = Ur("left");
      (((Er = gr || (gr = {}))[(Er.LEFT = 0)] = "LEFT"),
        (Er[(Er.CENTER = 1)] = "CENTER"));
      var Nr,
        Kr,
        Ir = {
          name: "text-align",
          initialValue: "left",
          prefix: !(Er[(Er.RIGHT = 2)] = "RIGHT"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "right":
                return gr.RIGHT;
              case "center":
              case "justify":
                return gr.CENTER;
              case "left":
              default:
                return gr.LEFT;
            }
          },
        };
      (((Kr = Nr || (Nr = {}))[(Kr.STATIC = 0)] = "STATIC"),
        (Kr[(Kr.RELATIVE = 1)] = "RELATIVE"),
        (Kr[(Kr.ABSOLUTE = 2)] = "ABSOLUTE"),
        (Kr[(Kr.FIXED = 3)] = "FIXED"));
      var Tr,
        mr,
        Rr = {
          name: "position",
          initialValue: "static",
          prefix: !(Kr[(Kr.STICKY = 4)] = "STICKY"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "relative":
                return Nr.RELATIVE;
              case "absolute":
                return Nr.ABSOLUTE;
              case "fixed":
                return Nr.FIXED;
              case "sticky":
                return Nr.STICKY;
            }
            return Nr.STATIC;
          },
        },
        Lr = {
          name: "text-shadow",
          initialValue: "none",
          type: ge.LIST,
          prefix: !1,
          parse: function (A) {
            return 1 === A.length && GA(A[0], "none")
              ? []
              : YA(A).map(function (A) {
                  for (
                    var e = {
                        color: de.TRANSPARENT,
                        offsetX: oe,
                        offsetY: oe,
                        blur: oe,
                      },
                      t = 0,
                      r = 0;
                    r < A.length;
                    r++
                  ) {
                    var n = A[r];
                    qA(n)
                      ? (0 === t
                          ? (e.offsetX = n)
                          : 1 === t
                            ? (e.offsetY = n)
                            : (e.blur = n),
                        t++)
                      : (e.color = ue(n));
                  }
                  return e;
                });
          },
        };
      (((mr = Tr || (Tr = {}))[(mr.NONE = 0)] = "NONE"),
        (mr[(mr.LOWERCASE = 1)] = "LOWERCASE"),
        (mr[(mr.UPPERCASE = 2)] = "UPPERCASE"));
      var vr,
        Or,
        Dr = {
          name: "text-transform",
          initialValue: "none",
          prefix: !(mr[(mr.CAPITALIZE = 3)] = "CAPITALIZE"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "uppercase":
                return Tr.UPPERCASE;
              case "lowercase":
                return Tr.LOWERCASE;
              case "capitalize":
                return Tr.CAPITALIZE;
            }
            return Tr.NONE;
          },
        },
        br = {
          name: "transform",
          initialValue: "none",
          prefix: !0,
          type: ge.VALUE,
          parse: function (A) {
            if (A.type === K.IDENT_TOKEN && "none" === A.value) return null;
            if (A.type !== K.FUNCTION) return null;
            var e = Sr[A.name];
            if (void 0 === e)
              throw new Error(
                'Attempting to parse an unsupported transform function "' +
                  A.name +
                  '"',
              );
            return e(A.values);
          },
        },
        Sr = {
          matrix: function (A) {
            var e = A.filter(function (A) {
              return A.type === K.NUMBER_TOKEN;
            }).map(function (A) {
              return A.number;
            });
            return 6 === e.length ? e : null;
          },
          matrix3d: function (A) {
            var e = A.filter(function (A) {
                return A.type === K.NUMBER_TOKEN;
              }).map(function (A) {
                return A.number;
              }),
              t = e[0],
              r = e[1],
              n = (e[2], e[3], e[4]),
              B = e[5],
              s = (e[6], e[7], e[8], e[9], e[10], e[11], e[12]),
              o = e[13];
            return (e[14], e[15], 16 === e.length ? [t, r, n, B, s, o] : null);
          },
        },
        Mr = { type: K.PERCENTAGE_TOKEN, number: 50, flags: 4 },
        yr = [Mr, Mr],
        _r = {
          name: "transform-origin",
          initialValue: "50% 50%",
          prefix: !0,
          type: ge.LIST,
          parse: function (A) {
            var e = A.filter(ZA);
            return 2 !== e.length ? yr : [e[0], e[1]];
          },
        };
      (((Or = vr || (vr = {}))[(Or.VISIBLE = 0)] = "VISIBLE"),
        (Or[(Or.HIDDEN = 1)] = "HIDDEN"));
      var Pr,
        xr,
        Vr = {
          name: "visible",
          initialValue: "none",
          prefix: !(Or[(Or.COLLAPSE = 2)] = "COLLAPSE"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "hidden":
                return vr.HIDDEN;
              case "collapse":
                return vr.COLLAPSE;
              case "visible":
              default:
                return vr.VISIBLE;
            }
          },
        };
      (((xr = Pr || (Pr = {})).NORMAL = "normal"),
        (xr.BREAK_ALL = "break-all"));
      var zr,
        Xr,
        Jr = {
          name: "word-break",
          initialValue: "normal",
          prefix: !(xr.KEEP_ALL = "keep-all"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "break-all":
                return Pr.BREAK_ALL;
              case "keep-all":
                return Pr.KEEP_ALL;
              case "normal":
              default:
                return Pr.NORMAL;
            }
          },
        },
        Gr = {
          name: "z-index",
          initialValue: "auto",
          prefix: !1,
          type: ge.VALUE,
          parse: function (A) {
            if (A.type === K.IDENT_TOKEN) return { auto: !0, order: 0 };
            if (zA(A)) return { auto: !1, order: A.number };
            throw new Error("Invalid z-index number parsed");
          },
        },
        kr = {
          name: "opacity",
          initialValue: "1",
          type: ge.VALUE,
          prefix: !1,
          parse: function (A) {
            return zA(A) ? A.number : 1;
          },
        },
        Wr = {
          name: "text-decoration-color",
          initialValue: "transparent",
          prefix: !1,
          type: ge.TYPE_VALUE,
          format: "color",
        },
        Yr = {
          name: "text-decoration-line",
          initialValue: "none",
          prefix: !1,
          type: ge.LIST,
          parse: function (A) {
            return A.filter(XA)
              .map(function (A) {
                switch (A.value) {
                  case "underline":
                    return 1;
                  case "overline":
                    return 2;
                  case "line-through":
                    return 3;
                  case "none":
                    return 4;
                }
                return 0;
              })
              .filter(function (A) {
                return 0 !== A;
              });
          },
        },
        qr = {
          name: "font-family",
          initialValue: "",
          prefix: !1,
          type: ge.LIST,
          parse: function (A) {
            var e = [],
              t = [];
            return (
              A.forEach(function (A) {
                switch (A.type) {
                  case K.IDENT_TOKEN:
                  case K.STRING_TOKEN:
                    e.push(A.value);
                    break;
                  case K.NUMBER_TOKEN:
                    e.push(A.number.toString());
                    break;
                  case K.COMMA_TOKEN:
                    (t.push(e.join(" ")), (e.length = 0));
                }
              }),
              e.length && t.push(e.join(" ")),
              t.map(function (A) {
                return -1 === A.indexOf(" ") ? A : "'" + A + "'";
              })
            );
          },
        },
        Zr = {
          name: "font-size",
          initialValue: "0",
          prefix: !1,
          type: ge.TYPE_VALUE,
          format: "length",
        },
        jr = {
          name: "font-weight",
          initialValue: "normal",
          type: ge.VALUE,
          prefix: !1,
          parse: function (A) {
            if (zA(A)) return A.number;
            if (XA(A))
              switch (A.value) {
                case "bold":
                  return 700;
                case "normal":
                default:
                  return 400;
              }
            return 400;
          },
        },
        $r = {
          name: "font-variant",
          initialValue: "none",
          type: ge.LIST,
          prefix: !1,
          parse: function (A) {
            return A.filter(XA).map(function (A) {
              return A.value;
            });
          },
        };
      function An(A, e) {
        return 0 != (A & e);
      }
      function en(A, e, t) {
        if (!A) return "";
        var r = A[Math.min(e, A.length - 1)];
        return r ? (t ? r.open : r.close) : "";
      }
      (((Xr = zr || (zr = {})).NORMAL = "normal"), (Xr.ITALIC = "italic"));
      var tn = {
          name: "font-style",
          initialValue: "normal",
          prefix: !(Xr.OBLIQUE = "oblique"),
          type: ge.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case "oblique":
                return zr.OBLIQUE;
              case "italic":
                return zr.ITALIC;
              case "normal":
              default:
                return zr.NORMAL;
            }
          },
        },
        rn = {
          name: "content",
          initialValue: "none",
          type: ge.LIST,
          prefix: !1,
          parse: function (A) {
            if (0 === A.length) return [];
            var e = A[0];
            return e.type === K.IDENT_TOKEN && "none" === e.value ? [] : A;
          },
        },
        nn = {
          name: "counter-increment",
          initialValue: "none",
          prefix: !0,
          type: ge.LIST,
          parse: function (A) {
            if (0 === A.length) return null;
            var e = A[0];
            if (e.type === K.IDENT_TOKEN && "none" === e.value) return null;
            for (var t = [], r = A.filter(kA), n = 0; n < r.length; n++) {
              var B = r[n],
                s = r[n + 1];
              if (B.type === K.IDENT_TOKEN) {
                var o = s && zA(s) ? s.number : 1;
                t.push({ counter: B.value, increment: o });
              }
            }
            return t;
          },
        },
        Bn = {
          name: "counter-reset",
          initialValue: "none",
          prefix: !0,
          type: ge.LIST,
          parse: function (A) {
            if (0 === A.length) return [];
            for (var e = [], t = A.filter(kA), r = 0; r < t.length; r++) {
              var n = t[r],
                B = t[r + 1];
              if (XA(n) && "none" !== n.value) {
                var s = B && zA(B) ? B.number : 0;
                e.push({ counter: n.value, reset: s });
              }
            }
            return e;
          },
        },
        sn = {
          name: "quotes",
          initialValue: "none",
          prefix: !0,
          type: ge.LIST,
          parse: function (A) {
            if (0 === A.length) return null;
            var e = A[0];
            if (e.type === K.IDENT_TOKEN && "none" === e.value) return null;
            var t = [],
              r = A.filter(JA);
            if (r.length % 2 != 0) return null;
            for (var n = 0; n < r.length; n += 2) {
              var B = r[n].value,
                s = r[n + 1].value;
              t.push({ open: B, close: s });
            }
            return t;
          },
        },
        on = {
          name: "box-shadow",
          initialValue: "none",
          type: ge.LIST,
          prefix: !1,
          parse: function (A) {
            return 1 === A.length && GA(A[0], "none")
              ? []
              : YA(A).map(function (A) {
                  for (
                    var e = {
                        color: 255,
                        offsetX: oe,
                        offsetY: oe,
                        blur: oe,
                        spread: oe,
                        inset: !1,
                      },
                      t = 0,
                      r = 0;
                    r < A.length;
                    r++
                  ) {
                    var n = A[r];
                    GA(n, "inset")
                      ? (e.inset = !0)
                      : qA(n)
                        ? (0 === t
                            ? (e.offsetX = n)
                            : 1 === t
                              ? (e.offsetY = n)
                              : 2 === t
                                ? (e.blur = n)
                                : (e.spread = n),
                          t++)
                        : (e.color = ue(n));
                  }
                  return e;
                });
          },
        },
        an =
          ((cn.prototype.isVisible = function () {
            return (
              0 < this.display &&
              0 < this.opacity &&
              this.visibility === vr.VISIBLE
            );
          }),
          (cn.prototype.isTransparent = function () {
            return te(this.backgroundColor);
          }),
          (cn.prototype.isTransformed = function () {
            return null !== this.transform;
          }),
          (cn.prototype.isPositioned = function () {
            return this.position !== Nr.STATIC;
          }),
          (cn.prototype.isPositionedWithZIndex = function () {
            return this.isPositioned() && !this.zIndex.auto;
          }),
          (cn.prototype.isFloating = function () {
            return this.float !== bt.NONE;
          }),
          (cn.prototype.isInlineLevel = function () {
            return (
              An(this.display, 4) ||
              An(this.display, 33554432) ||
              An(this.display, 268435456) ||
              An(this.display, 536870912) ||
              An(this.display, 67108864) ||
              An(this.display, 134217728)
            );
          }),
          cn);
      function cn(A) {
        ((this.backgroundClip = Un(Re, A.backgroundClip)),
          (this.backgroundColor = Un(Le, A.backgroundColor)),
          (this.backgroundImage = Un(wt, A.backgroundImage)),
          (this.backgroundOrigin = Un(ut, A.backgroundOrigin)),
          (this.backgroundPosition = Un(Ut, A.backgroundPosition)),
          (this.backgroundRepeat = Un(gt, A.backgroundRepeat)),
          (this.backgroundSize = Un(ft, A.backgroundSize)),
          (this.borderTopColor = Un(Nt, A.borderTopColor)),
          (this.borderRightColor = Un(Kt, A.borderRightColor)),
          (this.borderBottomColor = Un(It, A.borderBottomColor)),
          (this.borderLeftColor = Un(Tt, A.borderLeftColor)),
          (this.borderTopLeftRadius = Un(mt, A.borderTopLeftRadius)),
          (this.borderTopRightRadius = Un(Rt, A.borderTopRightRadius)),
          (this.borderBottomRightRadius = Un(Lt, A.borderBottomRightRadius)),
          (this.borderBottomLeftRadius = Un(vt, A.borderBottomLeftRadius)),
          (this.borderTopStyle = Un(Mt, A.borderTopStyle)),
          (this.borderRightStyle = Un(yt, A.borderRightStyle)),
          (this.borderBottomStyle = Un(_t, A.borderBottomStyle)),
          (this.borderLeftStyle = Un(Pt, A.borderLeftStyle)),
          (this.borderTopWidth = Un(xt, A.borderTopWidth)),
          (this.borderRightWidth = Un(Vt, A.borderRightWidth)),
          (this.borderBottomWidth = Un(zt, A.borderBottomWidth)),
          (this.borderLeftWidth = Un(Xt, A.borderLeftWidth)),
          (this.boxShadow = Un(on, A.boxShadow)),
          (this.color = Un(Jt, A.color)),
          (this.display = Un(Gt, A.display)),
          (this.float = Un(jt, A.cssFloat)),
          (this.fontFamily = Un(qr, A.fontFamily)),
          (this.fontSize = Un(Zr, A.fontSize)),
          (this.fontStyle = Un(tn, A.fontStyle)),
          (this.fontVariant = Un($r, A.fontVariant)),
          (this.fontWeight = Un(jr, A.fontWeight)),
          (this.letterSpacing = Un($t, A.letterSpacing)),
          (this.lineBreak = Un(Ar, A.lineBreak)),
          (this.lineHeight = Un(er, A.lineHeight)),
          (this.listStyleImage = Un(tr, A.listStyleImage)),
          (this.listStylePosition = Un(Br, A.listStylePosition)),
          (this.listStyleType = Un(ar, A.listStyleType)),
          (this.marginTop = Un(cr, A.marginTop)),
          (this.marginRight = Un(Qr, A.marginRight)),
          (this.marginBottom = Un(wr, A.marginBottom)),
          (this.marginLeft = Un(ur, A.marginLeft)),
          (this.opacity = Un(kr, A.opacity)));
        var e = Un(Fr, A.overflow);
        ((this.overflowX = e[0]),
          (this.overflowY = e[1 < e.length ? 1 : 0]),
          (this.overflowWrap = Un(hr, A.overflowWrap)),
          (this.paddingTop = Un(Hr, A.paddingTop)),
          (this.paddingRight = Un(dr, A.paddingRight)),
          (this.paddingBottom = Un(fr, A.paddingBottom)),
          (this.paddingLeft = Un(pr, A.paddingLeft)),
          (this.position = Un(Rr, A.position)),
          (this.textAlign = Un(Ir, A.textAlign)),
          (this.textDecorationColor = Un(Wr, A.textDecorationColor || A.color)),
          (this.textDecorationLine = Un(Yr, A.textDecorationLine)),
          (this.textShadow = Un(Lr, A.textShadow)),
          (this.textTransform = Un(Dr, A.textTransform)),
          (this.transform = Un(br, A.transform)),
          (this.transformOrigin = Un(_r, A.transformOrigin)),
          (this.visibility = Un(Vr, A.visibility)),
          (this.wordBreak = Un(Jr, A.wordBreak)),
          (this.zIndex = Un(Gr, A.zIndex)));
      }
      var Qn,
        wn = function (A) {
          ((this.content = Un(rn, A.content)),
            (this.quotes = Un(sn, A.quotes)));
        },
        un = function (A) {
          ((this.counterIncrement = Un(nn, A.counterIncrement)),
            (this.counterReset = Un(Bn, A.counterReset)));
        },
        Un = function (A, e) {
          var t = new yA(),
            r = null != e ? e.toString() : A.initialValue;
          t.write(r);
          var n = new PA(t.read());
          switch (A.type) {
            case ge.IDENT_VALUE:
              var B = n.parseComponentValue();
              return A.parse(XA(B) ? B.value : A.initialValue);
            case ge.VALUE:
              return A.parse(n.parseComponentValue());
            case ge.LIST:
              return A.parse(n.parseComponentValues());
            case ge.TOKEN_VALUE:
              return n.parseComponentValue();
            case ge.TYPE_VALUE:
              switch (A.format) {
                case "angle":
                  return Qe(n.parseComponentValue());
                case "color":
                  return ue(n.parseComponentValue());
                case "image":
                  return ct(n.parseComponentValue());
                case "length":
                  var s = n.parseComponentValue();
                  return qA(s) ? s : oe;
                case "length-percentage":
                  var o = n.parseComponentValue();
                  return ZA(o) ? o : oe;
              }
          }
          throw new Error(
            "Attempting to parse unsupported css format type " + A.format,
          );
        },
        ln = function (A) {
          ((this.styles = new an(window.getComputedStyle(A, null))),
            (this.textNodes = []),
            (this.elements = []),
            null !== this.styles.transform &&
              uB(A) &&
              (A.style.transform = "none"),
            (this.bounds = i(A)),
            (this.flags = 0));
        },
        Cn = function (A, e) {
          ((this.text = A), (this.bounds = e));
        },
        gn = function (A) {
          var e = A.ownerDocument;
          if (e) {
            var t = e.createElement("html2canvaswrapper");
            t.appendChild(A.cloneNode(!0));
            var r = A.parentNode;
            if (r) {
              r.replaceChild(t, A);
              var n = i(t);
              return (t.firstChild && r.replaceChild(t.firstChild, t), n);
            }
          }
          return new B(0, 0, 0, 0);
        },
        En = function (A, e, t) {
          var r = A.ownerDocument;
          if (!r) throw new Error("Node has no owner document");
          var n = r.createRange();
          return (
            n.setStart(A, e),
            n.setEnd(A, e + t),
            B.fromClientRect(n.getBoundingClientRect())
          );
        },
        Fn = function (A, e) {
          return 0 !== e.letterSpacing
            ? a(A).map(function (A) {
                return c(A);
              })
            : hn(A, e);
        },
        hn = function (A, e) {
          for (
            var t,
              r = (function (A, e) {
                var t = a(A),
                  r = h(t, e),
                  n = r[0],
                  B = r[1],
                  s = r[2],
                  o = t.length,
                  i = 0,
                  c = 0;
                return {
                  next: function () {
                    if (o <= c) return { done: !0, value: null };
                    for (var A = j; c < o && (A = F(t, B, n, ++c, s)) === j;);
                    if (A === j && c !== o) return { done: !0, value: null };
                    var e = new oA(t, A, i, c);
                    return ((i = c), { value: e, done: !1 });
                  },
                };
              })(A, {
                lineBreak: e.lineBreak,
                wordBreak:
                  e.overflowWrap === lr.BREAK_WORD ? "break-word" : e.wordBreak,
              }),
              n = [];
            !(t = r.next()).done;
          )
            t.value && n.push(t.value.slice());
          return n;
        },
        Hn = function (A, e) {
          ((this.text = dn(A.data, e.textTransform)),
            (this.textBounds = (function (A, e, t) {
              var r = Fn(A, e),
                n = [],
                B = 0;
              return (
                r.forEach(function (A) {
                  if (e.textDecorationLine.length || 0 < A.trim().length)
                    if (De.SUPPORT_RANGE_BOUNDS)
                      n.push(new Cn(A, En(t, B, A.length)));
                    else {
                      var r = t.splitText(A.length);
                      (n.push(new Cn(A, gn(t))), (t = r));
                    }
                  else De.SUPPORT_RANGE_BOUNDS || (t = t.splitText(A.length));
                  B += A.length;
                }),
                n
              );
            })(this.text, e, A)));
        },
        dn = function (A, e) {
          switch (e) {
            case Tr.LOWERCASE:
              return A.toLowerCase();
            case Tr.CAPITALIZE:
              return A.replace(fn, pn);
            case Tr.UPPERCASE:
              return A.toUpperCase();
            default:
              return A;
          }
        },
        fn = /(^|\s|:|-|\(|\))([a-z])/g,
        pn = function (A, e, t) {
          return 0 < A.length ? e + t.toUpperCase() : A;
        },
        Nn = (e(Kn, (Qn = ln)), Kn);
      function Kn(A) {
        var e = Qn.call(this, A) || this;
        return (
          (e.src = A.currentSrc || A.src),
          (e.intrinsicWidth = A.naturalWidth),
          (e.intrinsicHeight = A.naturalHeight),
          Me.getInstance().addImage(e.src),
          e
        );
      }
      var In,
        Tn = (e(mn, (In = ln)), mn);
      function mn(A) {
        var e = In.call(this, A) || this;
        return (
          (e.canvas = A),
          (e.intrinsicWidth = A.width),
          (e.intrinsicHeight = A.height),
          e
        );
      }
      var Rn,
        Ln = (e(vn, (Rn = ln)), vn);
      function vn(A) {
        var e = Rn.call(this, A) || this,
          t = new XMLSerializer();
        return (
          (e.svg =
            "data:image/svg+xml," + encodeURIComponent(t.serializeToString(A))),
          (e.intrinsicWidth = A.width.baseVal.value),
          (e.intrinsicHeight = A.height.baseVal.value),
          Me.getInstance().addImage(e.svg),
          e
        );
      }
      var On,
        Dn = (e(bn, (On = ln)), bn);
      function bn(A) {
        var e = On.call(this, A) || this;
        return ((e.value = A.value), e);
      }
      var Sn,
        Mn = (e(yn, (Sn = ln)), yn);
      function yn(A) {
        var e = Sn.call(this, A) || this;
        return (
          (e.start = A.start),
          (e.reversed = "boolean" == typeof A.reversed && !0 === A.reversed),
          e
        );
      }
      var _n,
        Pn = [{ type: K.DIMENSION_TOKEN, flags: 0, unit: "px", number: 3 }],
        xn = [{ type: K.PERCENTAGE_TOKEN, flags: 0, number: 50 }],
        Vn = "checkbox",
        zn = "radio",
        Xn = "password",
        Jn = 707406591,
        Gn = (e(kn, (_n = ln)), kn);
      function kn(A) {
        var e = _n.call(this, A) || this;
        switch (
          ((e.type = A.type.toLowerCase()),
          (e.checked = A.checked),
          (e.value = (function (A) {
            var e =
              A.type === Xn ? new Array(A.value.length + 1).join("•") : A.value;
            return 0 === e.length ? A.placeholder || "" : e;
          })(A)),
          (e.type !== Vn && e.type !== zn) ||
            ((e.styles.backgroundColor = 3739148031),
            (e.styles.borderTopColor =
              e.styles.borderRightColor =
              e.styles.borderBottomColor =
              e.styles.borderLeftColor =
                2779096575),
            (e.styles.borderTopWidth =
              e.styles.borderRightWidth =
              e.styles.borderBottomWidth =
              e.styles.borderLeftWidth =
                1),
            (e.styles.borderTopStyle =
              e.styles.borderRightStyle =
              e.styles.borderBottomStyle =
              e.styles.borderLeftStyle =
                Ht.SOLID),
            (e.styles.backgroundClip = [Fe.BORDER_BOX]),
            (e.styles.backgroundOrigin = [0]),
            (e.bounds = (function (A) {
              return A.width > A.height
                ? new B(
                    A.left + (A.width - A.height) / 2,
                    A.top,
                    A.height,
                    A.height,
                  )
                : A.width < A.height
                  ? new B(
                      A.left,
                      A.top + (A.height - A.width) / 2,
                      A.width,
                      A.width,
                    )
                  : A;
            })(e.bounds))),
          e.type)
        ) {
          case Vn:
            e.styles.borderTopRightRadius =
              e.styles.borderTopLeftRadius =
              e.styles.borderBottomRightRadius =
              e.styles.borderBottomLeftRadius =
                Pn;
            break;
          case zn:
            e.styles.borderTopRightRadius =
              e.styles.borderTopLeftRadius =
              e.styles.borderBottomRightRadius =
              e.styles.borderBottomLeftRadius =
                xn;
        }
        return e;
      }
      var Wn,
        Yn = (e(qn, (Wn = ln)), qn);
      function qn(A) {
        var e = Wn.call(this, A) || this,
          t = A.options[A.selectedIndex || 0];
        return ((e.value = (t && t.text) || ""), e);
      }
      var Zn,
        jn = (e($n, (Zn = ln)), $n);
      function $n(A) {
        var e = Zn.call(this, A) || this;
        return ((e.value = A.value), e);
      }
      function AB(A) {
        return ue(PA.create(A).parseComponentValue());
      }
      var eB,
        tB = (e(rB, (eB = ln)), rB);
      function rB(A) {
        var e = eB.call(this, A) || this;
        ((e.src = A.src),
          (e.width = parseInt(A.width, 10) || 0),
          (e.height = parseInt(A.height, 10) || 0),
          (e.backgroundColor = e.styles.backgroundColor));
        try {
          if (
            A.contentWindow &&
            A.contentWindow.document &&
            A.contentWindow.document.documentElement
          ) {
            e.tree = iB(A.contentWindow.document.documentElement);
            var t = A.contentWindow.document.documentElement
                ? AB(
                    getComputedStyle(A.contentWindow.document.documentElement)
                      .backgroundColor,
                  )
                : de.TRANSPARENT,
              r = A.contentWindow.document.body
                ? AB(
                    getComputedStyle(A.contentWindow.document.body)
                      .backgroundColor,
                  )
                : de.TRANSPARENT;
            e.backgroundColor = te(t)
              ? te(r)
                ? e.styles.backgroundColor
                : r
              : t;
          }
        } catch (A) {}
        return e;
      }
      function nB(A) {
        return "STYLE" === A.tagName;
      }
      var BB = ["OL", "UL", "MENU"],
        sB = function A(e, t, r) {
          for (var n = e.firstChild, B = void 0; n; n = B)
            if (((B = n.nextSibling), QB(n) && 0 < n.data.trim().length))
              t.textNodes.push(new Hn(n, t.styles));
            else if (wB(n)) {
              var s = oB(n);
              s.styles.isVisible() &&
                (aB(n, s, r) ? (s.flags |= 4) : cB(s.styles) && (s.flags |= 2),
                -1 !== BB.indexOf(n.tagName) && (s.flags |= 8),
                t.elements.push(s),
                fB(n) || EB(n) || pB(n) || A(n, s, r));
            }
        },
        oB = function (A) {
          return HB(A)
            ? new Nn(A)
            : hB(A)
              ? new Tn(A)
              : EB(A)
                ? new Ln(A)
                : lB(A)
                  ? new Dn(A)
                  : CB(A)
                    ? new Mn(A)
                    : gB(A)
                      ? new Gn(A)
                      : pB(A)
                        ? new Yn(A)
                        : fB(A)
                          ? new jn(A)
                          : dB(A)
                            ? new tB(A)
                            : new ln(A);
        },
        iB = function (A) {
          var e = oB(A);
          return ((e.flags |= 4), sB(A, e, e), e);
        },
        aB = function (A, e, t) {
          return (
            e.styles.isPositionedWithZIndex() ||
            e.styles.opacity < 1 ||
            e.styles.isTransformed() ||
            (FB(A) && t.styles.isTransparent())
          );
        },
        cB = function (A) {
          return A.isPositioned() || A.isFloating();
        },
        QB = function (A) {
          return A.nodeType === Node.TEXT_NODE;
        },
        wB = function (A) {
          return A.nodeType === Node.ELEMENT_NODE;
        },
        uB = function (A) {
          return wB(A) && void 0 !== A.style && !UB(A);
        },
        UB = function (A) {
          return "object" == (0, s.default)(A.className);
        },
        lB = function (A) {
          return "LI" === A.tagName;
        },
        CB = function (A) {
          return "OL" === A.tagName;
        },
        gB = function (A) {
          return "INPUT" === A.tagName;
        },
        EB = function (A) {
          return "svg" === A.tagName;
        },
        FB = function (A) {
          return "BODY" === A.tagName;
        },
        hB = function (A) {
          return "CANVAS" === A.tagName;
        },
        HB = function (A) {
          return "IMG" === A.tagName;
        },
        dB = function (A) {
          return "IFRAME" === A.tagName;
        },
        fB = function (A) {
          return "TEXTAREA" === A.tagName;
        },
        pB = function (A) {
          return "SELECT" === A.tagName;
        },
        NB =
          ((KB.prototype.getCounterValue = function (A) {
            var e = this.counters[A];
            return e && e.length ? e[e.length - 1] : 1;
          }),
          (KB.prototype.getCounterValues = function (A) {
            var e = this.counters[A];
            return e || [];
          }),
          (KB.prototype.pop = function (A) {
            var e = this;
            A.forEach(function (A) {
              return e.counters[A].pop();
            });
          }),
          (KB.prototype.parse = function (A) {
            var e = this,
              t = A.counterIncrement,
              r = A.counterReset,
              n = !0;
            null !== t &&
              t.forEach(function (A) {
                var t = e.counters[A.counter];
                t &&
                  0 !== A.increment &&
                  ((n = !1), (t[Math.max(0, t.length - 1)] += A.increment));
              });
            var B = [];
            return (
              n &&
                r.forEach(function (A) {
                  var t = e.counters[A.counter];
                  (B.push(A.counter),
                    t || (t = e.counters[A.counter] = []),
                    t.push(A.reset));
                }),
              B
            );
          }),
          KB);
      function KB() {
        this.counters = {};
      }
      function IB(A, e, t, r, n, B) {
        return A < e || t < A
          ? _B(A, n, 0 < B.length)
          : r.integers.reduce(function (e, t, n) {
              for (; t <= A;) ((A -= t), (e += r.values[n]));
              return e;
            }, "") + B;
      }
      function TB(A, e, t, r) {
        for (var n = ""; t || A--, (n = r(A) + n), e <= (A /= e) * e;);
        return n;
      }
      function mB(A, e, t, r, n) {
        var B = t - e + 1;
        return (
          (A < 0 ? "-" : "") +
          (TB(Math.abs(A), B, r, function (A) {
            return c(Math.floor(A % B) + e);
          }) +
            n)
        );
      }
      function RB(A, e, t) {
        void 0 === t && (t = ". ");
        var r = e.length;
        return (
          TB(Math.abs(A), r, !1, function (A) {
            return e[Math.floor(A % r)];
          }) + t
        );
      }
      function LB(A, e, t, r, n, B) {
        if (A < -9999 || 9999 < A) return _B(A, rr.CJK_DECIMAL, 0 < n.length);
        var s = Math.abs(A),
          o = n;
        if (0 === s) return e[0] + o;
        for (var i = 0; 0 < s && i <= 4; i++) {
          var a = s % 10;
          (0 == a && An(B, 1) && "" !== o
            ? (o = e[a] + o)
            : 1 < a ||
                (1 == a && 0 === i) ||
                (1 == a && 1 === i && An(B, 2)) ||
                (1 == a && 1 === i && An(B, 4) && 100 < A) ||
                (1 == a && 1 < i && An(B, 8))
              ? (o = e[a] + (0 < i ? t[i - 1] : "") + o)
              : 1 == a && 0 < i && (o = t[i - 1] + o),
            (s = Math.floor(s / 10)));
        }
        return (A < 0 ? r : "") + o;
      }
      var vB,
        OB,
        DB = {
          integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
          values: [
            "M",
            "CM",
            "D",
            "CD",
            "C",
            "XC",
            "L",
            "XL",
            "X",
            "IX",
            "V",
            "IV",
            "I",
          ],
        },
        bB = {
          integers: [
            9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600,
            500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8,
            7, 6, 5, 4, 3, 2, 1,
          ],
          values: [
            "Ք",
            "Փ",
            "Ւ",
            "Ց",
            "Ր",
            "Տ",
            "Վ",
            "Ս",
            "Ռ",
            "Ջ",
            "Պ",
            "Չ",
            "Ո",
            "Շ",
            "Ն",
            "Յ",
            "Մ",
            "Ճ",
            "Ղ",
            "Ձ",
            "Հ",
            "Կ",
            "Ծ",
            "Խ",
            "Լ",
            "Ի",
            "Ժ",
            "Թ",
            "Ը",
            "Է",
            "Զ",
            "Ե",
            "Դ",
            "Գ",
            "Բ",
            "Ա",
          ],
        },
        SB = {
          integers: [
            1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200,
            100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8,
            7, 6, 5, 4, 3, 2, 1,
          ],
          values: [
            "י׳",
            "ט׳",
            "ח׳",
            "ז׳",
            "ו׳",
            "ה׳",
            "ד׳",
            "ג׳",
            "ב׳",
            "א׳",
            "ת",
            "ש",
            "ר",
            "ק",
            "צ",
            "פ",
            "ע",
            "ס",
            "נ",
            "מ",
            "ל",
            "כ",
            "יט",
            "יח",
            "יז",
            "טז",
            "טו",
            "י",
            "ט",
            "ח",
            "ז",
            "ו",
            "ה",
            "ד",
            "ג",
            "ב",
            "א",
          ],
        },
        MB = {
          integers: [
            1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700,
            600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9,
            8, 7, 6, 5, 4, 3, 2, 1,
          ],
          values: [
            "ჵ",
            "ჰ",
            "ჯ",
            "ჴ",
            "ხ",
            "ჭ",
            "წ",
            "ძ",
            "ც",
            "ჩ",
            "შ",
            "ყ",
            "ღ",
            "ქ",
            "ფ",
            "ჳ",
            "ტ",
            "ს",
            "რ",
            "ჟ",
            "პ",
            "ო",
            "ჲ",
            "ნ",
            "მ",
            "ლ",
            "კ",
            "ი",
            "თ",
            "ჱ",
            "ზ",
            "ვ",
            "ე",
            "დ",
            "გ",
            "ბ",
            "ა",
          ],
        },
        yB = "마이너스",
        _B = function (A, e, t) {
          var r = t ? ". " : "",
            n = t ? "、" : "",
            B = t ? ", " : "",
            s = t ? " " : "";
          switch (e) {
            case rr.DISC:
              return "•" + s;
            case rr.CIRCLE:
              return "◦" + s;
            case rr.SQUARE:
              return "◾" + s;
            case rr.DECIMAL_LEADING_ZERO:
              var o = mB(A, 48, 57, !0, r);
              return o.length < 4 ? "0" + o : o;
            case rr.CJK_DECIMAL:
              return RB(A, "〇一二三四五六七八九", n);
            case rr.LOWER_ROMAN:
              return IB(A, 1, 3999, DB, rr.DECIMAL, r).toLowerCase();
            case rr.UPPER_ROMAN:
              return IB(A, 1, 3999, DB, rr.DECIMAL, r);
            case rr.LOWER_GREEK:
              return mB(A, 945, 969, !1, r);
            case rr.LOWER_ALPHA:
              return mB(A, 97, 122, !1, r);
            case rr.UPPER_ALPHA:
              return mB(A, 65, 90, !1, r);
            case rr.ARABIC_INDIC:
              return mB(A, 1632, 1641, !0, r);
            case rr.ARMENIAN:
            case rr.UPPER_ARMENIAN:
              return IB(A, 1, 9999, bB, rr.DECIMAL, r);
            case rr.LOWER_ARMENIAN:
              return IB(A, 1, 9999, bB, rr.DECIMAL, r).toLowerCase();
            case rr.BENGALI:
              return mB(A, 2534, 2543, !0, r);
            case rr.CAMBODIAN:
            case rr.KHMER:
              return mB(A, 6112, 6121, !0, r);
            case rr.CJK_EARTHLY_BRANCH:
              return RB(A, "子丑寅卯辰巳午未申酉戌亥", n);
            case rr.CJK_HEAVENLY_STEM:
              return RB(A, "甲乙丙丁戊己庚辛壬癸", n);
            case rr.CJK_IDEOGRAPHIC:
            case rr.TRAD_CHINESE_INFORMAL:
              return LB(A, "零一二三四五六七八九", "十百千萬", "負", n, 14);
            case rr.TRAD_CHINESE_FORMAL:
              return LB(A, "零壹貳參肆伍陸柒捌玖", "拾佰仟萬", "負", n, 15);
            case rr.SIMP_CHINESE_INFORMAL:
              return LB(A, "零一二三四五六七八九", "十百千萬", "负", n, 14);
            case rr.SIMP_CHINESE_FORMAL:
              return LB(A, "零壹贰叁肆伍陆柒捌玖", "拾佰仟萬", "负", n, 15);
            case rr.JAPANESE_INFORMAL:
              return LB(
                A,
                "〇一二三四五六七八九",
                "十百千万",
                "マイナス",
                n,
                0,
              );
            case rr.JAPANESE_FORMAL:
              return LB(
                A,
                "零壱弐参四伍六七八九",
                "拾百千万",
                "マイナス",
                n,
                7,
              );
            case rr.KOREAN_HANGUL_FORMAL:
              return LB(A, "영일이삼사오육칠팔구", "십백천만", yB, B, 7);
            case rr.KOREAN_HANJA_INFORMAL:
              return LB(A, "零一二三四五六七八九", "十百千萬", yB, B, 0);
            case rr.KOREAN_HANJA_FORMAL:
              return LB(A, "零壹貳參四五六七八九", "拾百千", yB, B, 7);
            case rr.DEVANAGARI:
              return mB(A, 2406, 2415, !0, r);
            case rr.GEORGIAN:
              return IB(A, 1, 19999, MB, rr.DECIMAL, r);
            case rr.GUJARATI:
              return mB(A, 2790, 2799, !0, r);
            case rr.GURMUKHI:
              return mB(A, 2662, 2671, !0, r);
            case rr.HEBREW:
              return IB(A, 1, 10999, SB, rr.DECIMAL, r);
            case rr.HIRAGANA:
              return RB(
                A,
                "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん",
              );
            case rr.HIRAGANA_IROHA:
              return RB(
                A,
                "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす",
              );
            case rr.KANNADA:
              return mB(A, 3302, 3311, !0, r);
            case rr.KATAKANA:
              return RB(
                A,
                "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",
                n,
              );
            case rr.KATAKANA_IROHA:
              return RB(
                A,
                "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",
                n,
              );
            case rr.LAO:
              return mB(A, 3792, 3801, !0, r);
            case rr.MONGOLIAN:
              return mB(A, 6160, 6169, !0, r);
            case rr.MYANMAR:
              return mB(A, 4160, 4169, !0, r);
            case rr.ORIYA:
              return mB(A, 2918, 2927, !0, r);
            case rr.PERSIAN:
              return mB(A, 1776, 1785, !0, r);
            case rr.TAMIL:
              return mB(A, 3046, 3055, !0, r);
            case rr.TELUGU:
              return mB(A, 3174, 3183, !0, r);
            case rr.THAI:
              return mB(A, 3664, 3673, !0, r);
            case rr.TIBETAN:
              return mB(A, 3872, 3881, !0, r);
            case rr.DECIMAL:
            default:
              return mB(A, 48, 57, !0, r);
          }
        },
        PB = "data-html2canvas-ignore",
        xB =
          ((VB.prototype.toIFrame = function (A, e) {
            var t = this,
              B = JB(A, e);
            if (!B.contentWindow)
              return Promise.reject("Unable to find iframe window");
            var s = A.defaultView.pageXOffset,
              o = A.defaultView.pageYOffset,
              i = B.contentWindow,
              a = i.document,
              c = GB(B).then(function () {
                return r(t, void 0, void 0, function () {
                  var A;
                  return n(this, function (t) {
                    switch (t.label) {
                      case 0:
                        return (
                          this.scrolledElements.forEach(qB),
                          i &&
                            (i.scrollTo(e.left, e.top),
                            !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) ||
                              (i.scrollY === e.top && i.scrollX === e.left) ||
                              ((a.documentElement.style.top = -e.top + "px"),
                              (a.documentElement.style.left = -e.left + "px"),
                              (a.documentElement.style.position = "absolute"))),
                          (A = this.options.onclone),
                          void 0 === this.clonedReferenceElement
                            ? [
                                2,
                                Promise.reject(
                                  "Error finding the " +
                                    this.referenceElement.nodeName +
                                    " in the cloned document",
                                ),
                              ]
                            : a.fonts && a.fonts.ready
                              ? [4, a.fonts.ready]
                              : [3, 2]
                        );
                      case 1:
                        (t.sent(), (t.label = 2));
                      case 2:
                        return "function" == typeof A
                          ? [
                              2,
                              Promise.resolve()
                                .then(function () {
                                  return A(a);
                                })
                                .then(function () {
                                  return B;
                                }),
                            ]
                          : [2, B];
                    }
                  });
                });
              });
            return (
              a.open(),
              a.write(WB(document.doctype) + "<html></html>"),
              YB(this.referenceElement.ownerDocument, s, o),
              a.replaceChild(
                a.adoptNode(this.documentElement),
                a.documentElement,
              ),
              a.close(),
              c
            );
          }),
          (VB.prototype.createElementClone = function (A) {
            if (hB(A)) return this.createCanvasClone(A);
            if (nB(A)) return this.createStyleClone(A);
            var e = A.cloneNode(!1);
            return (HB(e) && "lazy" === e.loading && (e.loading = "eager"), e);
          }),
          (VB.prototype.createStyleClone = function (A) {
            try {
              var e = A.sheet;
              if (e && e.cssRules) {
                var t = [].slice.call(e.cssRules, 0).reduce(function (A, e) {
                    return e && "string" == typeof e.cssText
                      ? A + e.cssText
                      : A;
                  }, ""),
                  r = A.cloneNode(!1);
                return ((r.textContent = t), r);
              }
            } catch (A) {
              if (
                (be
                  .getInstance(this.options.id)
                  .error("Unable to access cssRules property", A),
                "SecurityError" !== A.name)
              )
                throw A;
            }
            return A.cloneNode(!1);
          }),
          (VB.prototype.createCanvasClone = function (A) {
            if (this.options.inlineImages && A.ownerDocument) {
              var e = A.ownerDocument.createElement("img");
              try {
                return ((e.src = A.toDataURL()), e);
              } catch (A) {
                be.getInstance(this.options.id).info(
                  "Unable to clone canvas contents, canvas is tainted",
                );
              }
            }
            var t = A.cloneNode(!1);
            try {
              ((t.width = A.width), (t.height = A.height));
              var r = A.getContext("2d"),
                n = t.getContext("2d");
              return (
                n &&
                  (r
                    ? n.putImageData(
                        r.getImageData(0, 0, A.width, A.height),
                        0,
                        0,
                      )
                    : n.drawImage(A, 0, 0)),
                t
              );
            } catch (A) {}
            return t;
          }),
          (VB.prototype.cloneNode = function (A) {
            if (QB(A)) return document.createTextNode(A.data);
            if (!A.ownerDocument) return A.cloneNode(!1);
            var e = A.ownerDocument.defaultView;
            if (e && wB(A) && (uB(A) || UB(A))) {
              var t = this.createElementClone(A),
                r = e.getComputedStyle(A),
                n = e.getComputedStyle(A, ":before"),
                B = e.getComputedStyle(A, ":after");
              (this.referenceElement === A &&
                uB(t) &&
                (this.clonedReferenceElement = t),
                FB(t) && As(t));
              for (
                var s = this.counters.parse(new un(r)),
                  o = this.resolvePseudoContent(A, t, n, vB.BEFORE),
                  i = A.firstChild;
                i;
                i = i.nextSibling
              )
                (wB(i) &&
                  ("SCRIPT" === i.tagName ||
                    i.hasAttribute(PB) ||
                    ("function" == typeof this.options.ignoreElements &&
                      this.options.ignoreElements(i)))) ||
                  (this.options.copyStyles && wB(i) && nB(i)) ||
                  t.appendChild(this.cloneNode(i));
              o && t.insertBefore(o, t.firstChild);
              var a = this.resolvePseudoContent(A, t, B, vB.AFTER);
              return (
                a && t.appendChild(a),
                this.counters.pop(s),
                r && (this.options.copyStyles || UB(A)) && !dB(A) && kB(r, t),
                (0 === A.scrollTop && 0 === A.scrollLeft) ||
                  this.scrolledElements.push([t, A.scrollLeft, A.scrollTop]),
                (fB(A) || pB(A)) && (fB(t) || pB(t)) && (t.value = A.value),
                t
              );
            }
            return A.cloneNode(!1);
          }),
          (VB.prototype.resolvePseudoContent = function (A, e, t, r) {
            var n = this;
            if (t) {
              var B = t.content,
                s = e.ownerDocument;
              if (
                s &&
                B &&
                "none" !== B &&
                "-moz-alt-content" !== B &&
                "none" !== t.display
              ) {
                this.counters.parse(new un(t));
                var o = new wn(t),
                  i = s.createElement("html2canvaspseudoelement");
                (kB(t, i),
                  o.content.forEach(function (e) {
                    if (e.type === K.STRING_TOKEN)
                      i.appendChild(s.createTextNode(e.value));
                    else if (e.type === K.URL_TOKEN) {
                      var t = s.createElement("img");
                      ((t.src = e.value),
                        (t.style.opacity = "1"),
                        i.appendChild(t));
                    } else if (e.type === K.FUNCTION) {
                      if ("attr" === e.name) {
                        var r = e.values.filter(XA);
                        r.length &&
                          i.appendChild(
                            s.createTextNode(A.getAttribute(r[0].value) || ""),
                          );
                      } else if ("counter" === e.name) {
                        var B = e.values.filter(WA),
                          a = B[0],
                          c = B[1];
                        if (a && XA(a)) {
                          var Q = n.counters.getCounterValue(a.value),
                            w = c && XA(c) ? ar.parse(c.value) : rr.DECIMAL;
                          i.appendChild(s.createTextNode(_B(Q, w, !1)));
                        }
                      } else if ("counters" === e.name) {
                        var u = e.values.filter(WA),
                          U = ((a = u[0]), u[1]);
                        if (((c = u[2]), a && XA(a))) {
                          var l = n.counters.getCounterValues(a.value),
                            C = c && XA(c) ? ar.parse(c.value) : rr.DECIMAL,
                            g = U && U.type === K.STRING_TOKEN ? U.value : "",
                            E = l
                              .map(function (A) {
                                return _B(A, C, !1);
                              })
                              .join(g);
                          i.appendChild(s.createTextNode(E));
                        }
                      }
                    } else if (e.type === K.IDENT_TOKEN)
                      switch (e.value) {
                        case "open-quote":
                          i.appendChild(
                            s.createTextNode(en(o.quotes, n.quoteDepth++, !0)),
                          );
                          break;
                        case "close-quote":
                          i.appendChild(
                            s.createTextNode(en(o.quotes, --n.quoteDepth, !1)),
                          );
                          break;
                        default:
                          i.appendChild(s.createTextNode(e.value));
                      }
                  }),
                  (i.className = ZB + " " + jB));
                var a = r === vB.BEFORE ? " " + ZB : " " + jB;
                return (
                  UB(e) ? (e.className.baseValue += a) : (e.className += a),
                  i
                );
              }
            }
          }),
          (VB.destroy = function (A) {
            return !!A.parentNode && (A.parentNode.removeChild(A), !0);
          }),
          VB);
      function VB(A, e) {
        if (
          ((this.options = e),
          (this.scrolledElements = []),
          (this.referenceElement = A),
          (this.counters = new NB()),
          (this.quoteDepth = 0),
          !A.ownerDocument)
        )
          throw new Error("Cloned element does not have an owner document");
        this.documentElement = this.cloneNode(A.ownerDocument.documentElement);
      }
      (((OB = vB || (vB = {}))[(OB.BEFORE = 0)] = "BEFORE"),
        (OB[(OB.AFTER = 1)] = "AFTER"));
      var zB,
        XB,
        JB = function (A, e) {
          var t = A.createElement("iframe");
          return (
            (t.className = "html2canvas-container"),
            (t.style.visibility = "hidden"),
            (t.style.position = "fixed"),
            (t.style.left = "-10000px"),
            (t.style.top = "0px"),
            (t.style.border = "0"),
            (t.width = e.width.toString()),
            (t.height = e.height.toString()),
            (t.scrolling = "no"),
            t.setAttribute(PB, "true"),
            A.body.appendChild(t),
            t
          );
        },
        GB = function (A) {
          return new Promise(function (e, t) {
            var r = A.contentWindow;
            if (!r) return t("No window assigned for iframe");
            var n = r.document;
            r.onload =
              A.onload =
              n.onreadystatechange =
                function () {
                  r.onload = A.onload = n.onreadystatechange = null;
                  var t = setInterval(function () {
                    0 < n.body.childNodes.length &&
                      "complete" === n.readyState &&
                      (clearInterval(t), e(A));
                  }, 50);
                };
          });
        },
        kB = function (A, e) {
          for (var t = A.length - 1; 0 <= t; t--) {
            var r = A.item(t);
            "content" !== r && e.style.setProperty(r, A.getPropertyValue(r));
          }
          return e;
        },
        WB = function (A) {
          var e = "";
          return (
            A &&
              ((e += "<!DOCTYPE "),
              A.name && (e += A.name),
              A.internalSubset && (e += A.internalSubset),
              A.publicId && (e += '"' + A.publicId + '"'),
              A.systemId && (e += '"' + A.systemId + '"'),
              (e += ">")),
            e
          );
        },
        YB = function (A, e, t) {
          A &&
            A.defaultView &&
            (e !== A.defaultView.pageXOffset ||
              t !== A.defaultView.pageYOffset) &&
            A.defaultView.scrollTo(e, t);
        },
        qB = function (A) {
          var e = A[0],
            t = A[1],
            r = A[2];
          ((e.scrollLeft = t), (e.scrollTop = r));
        },
        ZB = "___html2canvas___pseudoelement_before",
        jB = "___html2canvas___pseudoelement_after",
        $B = '{\n    content: "" !important;\n    display: none !important;\n}',
        As = function (A) {
          es(
            A,
            "." + ZB + ":before" + $B + "\n         ." + jB + ":after" + $B,
          );
        },
        es = function (A, e) {
          var t = A.ownerDocument;
          if (t) {
            var r = t.createElement("style");
            ((r.textContent = e), A.appendChild(r));
          }
        };
      function ts(A, e) {
        return (
          A.length === e.length &&
          A.some(function (A, t) {
            return A === e[t];
          })
        );
      }
      (((XB = zB || (zB = {}))[(XB.VECTOR = 0)] = "VECTOR"),
        (XB[(XB.BEZIER_CURVE = 1)] = "BEZIER_CURVE"));
      var rs =
        ((ns.prototype.add = function (A, e) {
          return new ns(this.x + A, this.y + e);
        }),
        ns);
      function ns(A, e) {
        ((this.type = zB.VECTOR), (this.x = A), (this.y = e));
      }
      function Bs(A, e, t) {
        return new rs(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
      }
      var ss =
        ((os.prototype.subdivide = function (A, e) {
          var t = Bs(this.start, this.startControl, A),
            r = Bs(this.startControl, this.endControl, A),
            n = Bs(this.endControl, this.end, A),
            B = Bs(t, r, A),
            s = Bs(r, n, A),
            o = Bs(B, s, A);
          return e ? new os(this.start, t, B, o) : new os(o, s, n, this.end);
        }),
        (os.prototype.add = function (A, e) {
          return new os(
            this.start.add(A, e),
            this.startControl.add(A, e),
            this.endControl.add(A, e),
            this.end.add(A, e),
          );
        }),
        (os.prototype.reverse = function () {
          return new os(
            this.end,
            this.endControl,
            this.startControl,
            this.start,
          );
        }),
        os);
      function os(A, e, t, r) {
        ((this.type = zB.BEZIER_CURVE),
          (this.start = A),
          (this.startControl = e),
          (this.endControl = t),
          (this.end = r));
      }
      function is(A) {
        return A.type === zB.BEZIER_CURVE;
      }
      var as,
        cs,
        Qs = function (A) {
          var e = A.styles,
            t = A.bounds,
            r = $A(e.borderTopLeftRadius, t.width, t.height),
            n = r[0],
            B = r[1],
            s = $A(e.borderTopRightRadius, t.width, t.height),
            o = s[0],
            i = s[1],
            a = $A(e.borderBottomRightRadius, t.width, t.height),
            c = a[0],
            Q = a[1],
            w = $A(e.borderBottomLeftRadius, t.width, t.height),
            u = w[0],
            U = w[1],
            l = [];
          (l.push((n + o) / t.width),
            l.push((u + c) / t.width),
            l.push((B + U) / t.height),
            l.push((i + Q) / t.height));
          var C = Math.max.apply(Math, l);
          1 < C &&
            ((n /= C),
            (B /= C),
            (o /= C),
            (i /= C),
            (c /= C),
            (Q /= C),
            (u /= C),
            (U /= C));
          var g = t.width - o,
            E = t.height - Q,
            F = t.width - c,
            h = t.height - U,
            H = e.borderTopWidth,
            d = e.borderRightWidth,
            f = e.borderBottomWidth,
            p = e.borderLeftWidth,
            N = ce(e.paddingTop, A.bounds.width),
            K = ce(e.paddingRight, A.bounds.width),
            I = ce(e.paddingBottom, A.bounds.width),
            T = ce(e.paddingLeft, A.bounds.width);
          ((this.topLeftBorderBox =
            0 < n || 0 < B
              ? Us(t.left, t.top, n, B, as.TOP_LEFT)
              : new rs(t.left, t.top)),
            (this.topRightBorderBox =
              0 < o || 0 < i
                ? Us(t.left + g, t.top, o, i, as.TOP_RIGHT)
                : new rs(t.left + t.width, t.top)),
            (this.bottomRightBorderBox =
              0 < c || 0 < Q
                ? Us(t.left + F, t.top + E, c, Q, as.BOTTOM_RIGHT)
                : new rs(t.left + t.width, t.top + t.height)),
            (this.bottomLeftBorderBox =
              0 < u || 0 < U
                ? Us(t.left, t.top + h, u, U, as.BOTTOM_LEFT)
                : new rs(t.left, t.top + t.height)),
            (this.topLeftPaddingBox =
              0 < n || 0 < B
                ? Us(
                    t.left + p,
                    t.top + H,
                    Math.max(0, n - p),
                    Math.max(0, B - H),
                    as.TOP_LEFT,
                  )
                : new rs(t.left + p, t.top + H)),
            (this.topRightPaddingBox =
              0 < o || 0 < i
                ? Us(
                    t.left + Math.min(g, t.width + p),
                    t.top + H,
                    g > t.width + p ? 0 : o - p,
                    i - H,
                    as.TOP_RIGHT,
                  )
                : new rs(t.left + t.width - d, t.top + H)),
            (this.bottomRightPaddingBox =
              0 < c || 0 < Q
                ? Us(
                    t.left + Math.min(F, t.width - p),
                    t.top + Math.min(E, t.height + H),
                    Math.max(0, c - d),
                    Q - f,
                    as.BOTTOM_RIGHT,
                  )
                : new rs(t.left + t.width - d, t.top + t.height - f)),
            (this.bottomLeftPaddingBox =
              0 < u || 0 < U
                ? Us(
                    t.left + p,
                    t.top + h,
                    Math.max(0, u - p),
                    U - f,
                    as.BOTTOM_LEFT,
                  )
                : new rs(t.left + p, t.top + t.height - f)),
            (this.topLeftContentBox =
              0 < n || 0 < B
                ? Us(
                    t.left + p + T,
                    t.top + H + N,
                    Math.max(0, n - (p + T)),
                    Math.max(0, B - (H + N)),
                    as.TOP_LEFT,
                  )
                : new rs(t.left + p + T, t.top + H + N)),
            (this.topRightContentBox =
              0 < o || 0 < i
                ? Us(
                    t.left + Math.min(g, t.width + p + T),
                    t.top + H + N,
                    g > t.width + p + T ? 0 : o - p + T,
                    i - (H + N),
                    as.TOP_RIGHT,
                  )
                : new rs(t.left + t.width - (d + K), t.top + H + N)),
            (this.bottomRightContentBox =
              0 < c || 0 < Q
                ? Us(
                    t.left + Math.min(F, t.width - (p + T)),
                    t.top + Math.min(E, t.height + H + N),
                    Math.max(0, c - (d + K)),
                    Q - (f + I),
                    as.BOTTOM_RIGHT,
                  )
                : new rs(
                    t.left + t.width - (d + K),
                    t.top + t.height - (f + I),
                  )),
            (this.bottomLeftContentBox =
              0 < u || 0 < U
                ? Us(
                    t.left + p + T,
                    t.top + h,
                    Math.max(0, u - (p + T)),
                    U - (f + I),
                    as.BOTTOM_LEFT,
                  )
                : new rs(t.left + p + T, t.top + t.height - (f + I))));
        };
      function ws(A) {
        return [
          A.topLeftBorderBox,
          A.topRightBorderBox,
          A.bottomRightBorderBox,
          A.bottomLeftBorderBox,
        ];
      }
      function us(A) {
        return [
          A.topLeftPaddingBox,
          A.topRightPaddingBox,
          A.bottomRightPaddingBox,
          A.bottomLeftPaddingBox,
        ];
      }
      (((cs = as || (as = {}))[(cs.TOP_LEFT = 0)] = "TOP_LEFT"),
        (cs[(cs.TOP_RIGHT = 1)] = "TOP_RIGHT"),
        (cs[(cs.BOTTOM_RIGHT = 2)] = "BOTTOM_RIGHT"),
        (cs[(cs.BOTTOM_LEFT = 3)] = "BOTTOM_LEFT"));
      var Us = function (A, e, t, r, n) {
          var B = ((Math.sqrt(2) - 1) / 3) * 4,
            s = t * B,
            o = r * B,
            i = A + t,
            a = e + r;
          switch (n) {
            case as.TOP_LEFT:
              return new ss(
                new rs(A, a),
                new rs(A, a - o),
                new rs(i - s, e),
                new rs(i, e),
              );
            case as.TOP_RIGHT:
              return new ss(
                new rs(A, e),
                new rs(A + s, e),
                new rs(i, a - o),
                new rs(i, a),
              );
            case as.BOTTOM_RIGHT:
              return new ss(
                new rs(i, e),
                new rs(i, e + o),
                new rs(A + s, a),
                new rs(A, a),
              );
            case as.BOTTOM_LEFT:
            default:
              return new ss(
                new rs(i, a),
                new rs(i - s, a),
                new rs(A, e + o),
                new rs(A, e),
              );
          }
        },
        ls = function (A, e, t) {
          ((this.type = 0),
            (this.offsetX = A),
            (this.offsetY = e),
            (this.matrix = t),
            (this.target = 6));
        },
        Cs = function (A, e) {
          ((this.type = 1), (this.target = e), (this.path = A));
        },
        gs = function (A) {
          ((this.element = A),
            (this.inlineLevel = []),
            (this.nonInlineLevel = []),
            (this.negativeZIndex = []),
            (this.zeroOrAutoZIndexOrTransformedOrOpacity = []),
            (this.positiveZIndex = []),
            (this.nonPositionedFloats = []),
            (this.nonPositionedInlineLevel = []));
        },
        Es =
          ((Fs.prototype.getParentEffects = function () {
            var A = this.effects.slice(0);
            if (this.container.styles.overflowX !== or.VISIBLE) {
              var e = ws(this.curves),
                t = us(this.curves);
              ts(e, t) || A.push(new Cs(t, 6));
            }
            return A;
          }),
          Fs);
      function Fs(A, e) {
        if (
          ((this.container = A),
          (this.effects = e.slice(0)),
          (this.curves = new Qs(A)),
          null !== A.styles.transform)
        ) {
          var t = A.bounds.left + A.styles.transformOrigin[0].number,
            r = A.bounds.top + A.styles.transformOrigin[1].number,
            n = A.styles.transform;
          this.effects.push(new ls(t, r, n));
        }
        if (A.styles.overflowX !== or.VISIBLE) {
          var B = ws(this.curves),
            s = us(this.curves);
          ts(B, s)
            ? this.effects.push(new Cs(B, 6))
            : (this.effects.push(new Cs(B, 2)),
              this.effects.push(new Cs(s, 4)));
        }
      }
      function hs(A) {
        var e = A.bounds,
          t = A.styles;
        return e.add(
          t.borderLeftWidth,
          t.borderTopWidth,
          -(t.borderRightWidth + t.borderLeftWidth),
          -(t.borderTopWidth + t.borderBottomWidth),
        );
      }
      function Hs(A) {
        var e = A.styles,
          t = A.bounds,
          r = ce(e.paddingLeft, t.width),
          n = ce(e.paddingRight, t.width),
          B = ce(e.paddingTop, t.width),
          s = ce(e.paddingBottom, t.width);
        return t.add(
          r + e.borderLeftWidth,
          B + e.borderTopWidth,
          -(e.borderRightWidth + e.borderLeftWidth + r + n),
          -(e.borderTopWidth + e.borderBottomWidth + B + s),
        );
      }
      function ds(A, e, t) {
        var r = (function (A, e) {
            return 0 === A ? e.bounds : 2 === A ? Hs(e) : hs(e);
          })(ms(A.styles.backgroundOrigin, e), A),
          n = (function (A, e) {
            return A === Fe.BORDER_BOX
              ? e.bounds
              : A === Fe.CONTENT_BOX
                ? Hs(e)
                : hs(e);
          })(ms(A.styles.backgroundClip, e), A),
          B = Ts(ms(A.styles.backgroundSize, e), t, r),
          s = B[0],
          o = B[1],
          i = $A(ms(A.styles.backgroundPosition, e), r.width - s, r.height - o);
        return [
          Rs(ms(A.styles.backgroundRepeat, e), i, B, r, n),
          Math.round(r.left + i[0]),
          Math.round(r.top + i[1]),
          s,
          o,
        ];
      }
      function fs(A) {
        return XA(A) && A.value === lt.AUTO;
      }
      function ps(A) {
        return "number" == typeof A;
      }
      var Ns = function A(e, t, r, n) {
          e.container.elements.forEach(function (B) {
            var s = An(B.flags, 4),
              o = An(B.flags, 2),
              i = new Es(B, e.getParentEffects());
            An(B.styles.display, 2048) && n.push(i);
            var a = An(B.flags, 8) ? [] : n;
            if (s || o) {
              var c = s || B.styles.isPositioned() ? r : t,
                Q = new gs(i);
              if (
                B.styles.isPositioned() ||
                B.styles.opacity < 1 ||
                B.styles.isTransformed()
              ) {
                var w = B.styles.zIndex.order;
                if (w < 0) {
                  var u = 0;
                  (c.negativeZIndex.some(function (A, e) {
                    return w > A.element.container.styles.zIndex.order
                      ? ((u = e), !1)
                      : 0 < u;
                  }),
                    c.negativeZIndex.splice(u, 0, Q));
                } else if (0 < w) {
                  var U = 0;
                  (c.positiveZIndex.some(function (A, e) {
                    return w >= A.element.container.styles.zIndex.order
                      ? ((U = e + 1), !1)
                      : 0 < U;
                  }),
                    c.positiveZIndex.splice(U, 0, Q));
                } else c.zeroOrAutoZIndexOrTransformedOrOpacity.push(Q);
              } else
                B.styles.isFloating()
                  ? c.nonPositionedFloats.push(Q)
                  : c.nonPositionedInlineLevel.push(Q);
              A(i, Q, s ? Q : r, a);
            } else
              (B.styles.isInlineLevel()
                ? t.inlineLevel.push(i)
                : t.nonInlineLevel.push(i),
                A(i, t, r, a));
            An(B.flags, 8) && Ks(B, a);
          });
        },
        Ks = function (A, e) {
          for (
            var t = A instanceof Mn ? A.start : 1,
              r = A instanceof Mn && A.reversed,
              n = 0;
            n < e.length;
            n++
          ) {
            var B = e[n];
            (B.container instanceof Dn &&
              "number" == typeof B.container.value &&
              0 !== B.container.value &&
              (t = B.container.value),
              (B.listValue = _B(t, B.container.styles.listStyleType, !0)),
              (t += r ? -1 : 1));
          }
        },
        Is = function (A, e, t, r) {
          var n = [];
          return (
            is(A) ? n.push(A.subdivide(0.5, !1)) : n.push(A),
            is(t) ? n.push(t.subdivide(0.5, !0)) : n.push(t),
            is(r) ? n.push(r.subdivide(0.5, !0).reverse()) : n.push(r),
            is(e) ? n.push(e.subdivide(0.5, !1).reverse()) : n.push(e),
            n
          );
        },
        Ts = function (A, e, t) {
          var r = e[0],
            n = e[1],
            B = e[2],
            s = A[0],
            o = A[1];
          if (ZA(s) && o && ZA(o)) return [ce(s, t.width), ce(o, t.height)];
          var i = ps(B);
          if (XA(s) && (s.value === lt.CONTAIN || s.value === lt.COVER))
            return ps(B)
              ? t.width / t.height < B != (s.value === lt.COVER)
                ? [t.width, t.width / B]
                : [t.height * B, t.height]
              : [t.width, t.height];
          var a = ps(r),
            c = ps(n),
            Q = a || c;
          if (fs(s) && (!o || fs(o)))
            return a && c
              ? [r, n]
              : i || Q
                ? Q && i
                  ? [a ? r : n * B, c ? n : r / B]
                  : [a ? r : t.width, c ? n : t.height]
                : [t.width, t.height];
          if (i) {
            var w = 0,
              u = 0;
            return (
              ZA(s) ? (w = ce(s, t.width)) : ZA(o) && (u = ce(o, t.height)),
              fs(s) ? (w = u * B) : (o && !fs(o)) || (u = w / B),
              [w, u]
            );
          }
          var U = null,
            l = null;
          if (
            (ZA(s) ? (U = ce(s, t.width)) : o && ZA(o) && (l = ce(o, t.height)),
            null === U ||
              (o && !fs(o)) ||
              (l = a && c ? (U / r) * n : t.height),
            null !== l && fs(s) && (U = a && c ? (l / n) * r : t.width),
            null !== U && null !== l)
          )
            return [U, l];
          throw new Error("Unable to calculate background-size for element");
        },
        ms = function (A, e) {
          var t = A[e];
          return void 0 === t ? A[0] : t;
        },
        Rs = function (A, e, t, r, n) {
          var B = e[0],
            s = e[1],
            o = t[0],
            i = t[1];
          switch (A) {
            case it.REPEAT_X:
              return [
                new rs(Math.round(r.left), Math.round(r.top + s)),
                new rs(Math.round(r.left + r.width), Math.round(r.top + s)),
                new rs(Math.round(r.left + r.width), Math.round(i + r.top + s)),
                new rs(Math.round(r.left), Math.round(i + r.top + s)),
              ];
            case it.REPEAT_Y:
              return [
                new rs(Math.round(r.left + B), Math.round(r.top)),
                new rs(Math.round(r.left + B + o), Math.round(r.top)),
                new rs(
                  Math.round(r.left + B + o),
                  Math.round(r.height + r.top),
                ),
                new rs(Math.round(r.left + B), Math.round(r.height + r.top)),
              ];
            case it.NO_REPEAT:
              return [
                new rs(Math.round(r.left + B), Math.round(r.top + s)),
                new rs(Math.round(r.left + B + o), Math.round(r.top + s)),
                new rs(Math.round(r.left + B + o), Math.round(r.top + s + i)),
                new rs(Math.round(r.left + B), Math.round(r.top + s + i)),
              ];
            default:
              return [
                new rs(Math.round(n.left), Math.round(n.top)),
                new rs(Math.round(n.left + n.width), Math.round(n.top)),
                new rs(
                  Math.round(n.left + n.width),
                  Math.round(n.height + n.top),
                ),
                new rs(Math.round(n.left), Math.round(n.height + n.top)),
              ];
          }
        },
        Ls = "Hidden Text",
        vs =
          ((Os.prototype.parseMetrics = function (A, e) {
            var t = this._document.createElement("div"),
              r = this._document.createElement("img"),
              n = this._document.createElement("span"),
              B = this._document.body;
            ((t.style.visibility = "hidden"),
              (t.style.fontFamily = A),
              (t.style.fontSize = e),
              (t.style.margin = "0"),
              (t.style.padding = "0"),
              B.appendChild(t),
              (r.src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
              (r.width = 1),
              (r.height = 1),
              (r.style.margin = "0"),
              (r.style.padding = "0"),
              (r.style.verticalAlign = "baseline"),
              (n.style.fontFamily = A),
              (n.style.fontSize = e),
              (n.style.margin = "0"),
              (n.style.padding = "0"),
              n.appendChild(this._document.createTextNode(Ls)),
              t.appendChild(n),
              t.appendChild(r));
            var s = r.offsetTop - n.offsetTop + 2;
            (t.removeChild(n),
              t.appendChild(this._document.createTextNode(Ls)),
              (t.style.lineHeight = "normal"),
              (r.style.verticalAlign = "super"));
            var o = r.offsetTop - t.offsetTop + 2;
            return (B.removeChild(t), { baseline: s, middle: o });
          }),
          (Os.prototype.getMetrics = function (A, e) {
            var t = A + " " + e;
            return (
              void 0 === this._data[t] &&
                (this._data[t] = this.parseMetrics(A, e)),
              this._data[t]
            );
          }),
          Os);
      function Os(A) {
        ((this._data = {}), (this._document = A));
      }
      var Ds =
        ((bs.prototype.applyEffects = function (A, e) {
          for (var t = this; this._activeEffects.length;) this.popEffect();
          A.filter(function (A) {
            return An(A.target, e);
          }).forEach(function (A) {
            return t.applyEffect(A);
          });
        }),
        (bs.prototype.applyEffect = function (A) {
          (this.ctx.save(),
            (function (A) {
              return 0 === A.type;
            })(A) &&
              (this.ctx.translate(A.offsetX, A.offsetY),
              this.ctx.transform(
                A.matrix[0],
                A.matrix[1],
                A.matrix[2],
                A.matrix[3],
                A.matrix[4],
                A.matrix[5],
              ),
              this.ctx.translate(-A.offsetX, -A.offsetY)),
            (function (A) {
              return 1 === A.type;
            })(A) && (this.path(A.path), this.ctx.clip()),
            this._activeEffects.push(A));
        }),
        (bs.prototype.popEffect = function () {
          (this._activeEffects.pop(), this.ctx.restore());
        }),
        (bs.prototype.renderStack = function (A) {
          return r(this, void 0, void 0, function () {
            var e;
            return n(this, function (t) {
              switch (t.label) {
                case 0:
                  return (e = A.element.container.styles).isVisible()
                    ? ((this.ctx.globalAlpha = e.opacity),
                      [4, this.renderStackContent(A)])
                    : [3, 2];
                case 1:
                  (t.sent(), (t.label = 2));
                case 2:
                  return [2];
              }
            });
          });
        }),
        (bs.prototype.renderNode = function (A) {
          return r(this, void 0, void 0, function () {
            return n(this, function (e) {
              switch (e.label) {
                case 0:
                  return A.container.styles.isVisible()
                    ? [4, this.renderNodeBackgroundAndBorders(A)]
                    : [3, 3];
                case 1:
                  return (e.sent(), [4, this.renderNodeContent(A)]);
                case 2:
                  (e.sent(), (e.label = 3));
                case 3:
                  return [2];
              }
            });
          });
        }),
        (bs.prototype.renderTextWithLetterSpacing = function (A, e) {
          var t = this;
          0 === e
            ? this.ctx.fillText(
                A.text,
                A.bounds.left,
                A.bounds.top + A.bounds.height,
              )
            : a(A.text)
                .map(function (A) {
                  return c(A);
                })
                .reduce(function (e, r) {
                  return (
                    t.ctx.fillText(r, e, A.bounds.top + A.bounds.height),
                    e + t.ctx.measureText(r).width
                  );
                }, A.bounds.left);
        }),
        (bs.prototype.createFontStyle = function (A) {
          var e = A.fontVariant
              .filter(function (A) {
                return "normal" === A || "small-caps" === A;
              })
              .join(""),
            t = A.fontFamily.join(", "),
            r = VA(A.fontSize)
              ? "" + A.fontSize.number + A.fontSize.unit
              : A.fontSize.number + "px";
          return [[A.fontStyle, e, A.fontWeight, r, t].join(" "), t, r];
        }),
        (bs.prototype.renderTextNode = function (A, e) {
          return r(this, void 0, void 0, function () {
            var t,
              r,
              B,
              s,
              o = this;
            return n(this, function (n) {
              return (
                (t = this.createFontStyle(e)),
                (r = t[0]),
                (B = t[1]),
                (s = t[2]),
                (this.ctx.font = r),
                A.textBounds.forEach(function (A) {
                  ((o.ctx.fillStyle = re(e.color)),
                    o.renderTextWithLetterSpacing(A, e.letterSpacing));
                  var t = e.textShadow;
                  (t.length &&
                    A.text.trim().length &&
                    (t
                      .slice(0)
                      .reverse()
                      .forEach(function (e) {
                        ((o.ctx.shadowColor = re(e.color)),
                          (o.ctx.shadowOffsetX =
                            e.offsetX.number * o.options.scale),
                          (o.ctx.shadowOffsetY =
                            e.offsetY.number * o.options.scale),
                          (o.ctx.shadowBlur = e.blur.number),
                          o.ctx.fillText(
                            A.text,
                            A.bounds.left,
                            A.bounds.top + A.bounds.height,
                          ));
                      }),
                    (o.ctx.shadowColor = ""),
                    (o.ctx.shadowOffsetX = 0),
                    (o.ctx.shadowOffsetY = 0),
                    (o.ctx.shadowBlur = 0)),
                    e.textDecorationLine.length &&
                      ((o.ctx.fillStyle = re(e.textDecorationColor || e.color)),
                      e.textDecorationLine.forEach(function (e) {
                        switch (e) {
                          case 1:
                            var t = o.fontMetrics.getMetrics(B, s).baseline;
                            o.ctx.fillRect(
                              A.bounds.left,
                              Math.round(A.bounds.top + t),
                              A.bounds.width,
                              1,
                            );
                            break;
                          case 2:
                            o.ctx.fillRect(
                              A.bounds.left,
                              Math.round(A.bounds.top),
                              A.bounds.width,
                              1,
                            );
                            break;
                          case 3:
                            var r = o.fontMetrics.getMetrics(B, s).middle;
                            o.ctx.fillRect(
                              A.bounds.left,
                              Math.ceil(A.bounds.top + r),
                              A.bounds.width,
                              1,
                            );
                        }
                      })));
                }),
                [2]
              );
            });
          });
        }),
        (bs.prototype.renderReplacedElement = function (A, e, t) {
          if (t && 0 < A.intrinsicWidth && 0 < A.intrinsicHeight) {
            var r = Hs(A),
              n = us(e);
            (this.path(n),
              this.ctx.save(),
              this.ctx.clip(),
              this.ctx.drawImage(
                t,
                0,
                0,
                A.intrinsicWidth,
                A.intrinsicHeight,
                r.left,
                r.top,
                r.width,
                r.height,
              ),
              this.ctx.restore());
          }
        }),
        (bs.prototype.renderNodeContent = function (A) {
          return r(this, void 0, void 0, function () {
            var e, t, r, s, o, i, a, c, Q, w, u, U, l, C;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  (this.applyEffects(A.effects, 4),
                    (e = A.container),
                    (t = A.curves),
                    (r = e.styles),
                    (s = 0),
                    (o = e.textNodes),
                    (n.label = 1));
                case 1:
                  return s < o.length
                    ? ((i = o[s]), [4, this.renderTextNode(i, r)])
                    : [3, 4];
                case 2:
                  (n.sent(), (n.label = 3));
                case 3:
                  return (s++, [3, 1]);
                case 4:
                  if (!(e instanceof Nn)) return [3, 8];
                  n.label = 5;
                case 5:
                  return (
                    n.trys.push([5, 7, , 8]),
                    [4, this.options.cache.match(e.src)]
                  );
                case 6:
                  return (
                    (U = n.sent()),
                    this.renderReplacedElement(e, t, U),
                    [3, 8]
                  );
                case 7:
                  return (
                    n.sent(),
                    be
                      .getInstance(this.options.id)
                      .error("Error loading image " + e.src),
                    [3, 8]
                  );
                case 8:
                  if (
                    (e instanceof Tn &&
                      this.renderReplacedElement(e, t, e.canvas),
                    !(e instanceof Ln))
                  )
                    return [3, 12];
                  n.label = 9;
                case 9:
                  return (
                    n.trys.push([9, 11, , 12]),
                    [4, this.options.cache.match(e.svg)]
                  );
                case 10:
                  return (
                    (U = n.sent()),
                    this.renderReplacedElement(e, t, U),
                    [3, 12]
                  );
                case 11:
                  return (
                    n.sent(),
                    be
                      .getInstance(this.options.id)
                      .error("Error loading svg " + e.svg.substring(0, 255)),
                    [3, 12]
                  );
                case 12:
                  return e instanceof tB && e.tree
                    ? [
                        4,
                        new bs({
                          id: this.options.id,
                          scale: this.options.scale,
                          backgroundColor: e.backgroundColor,
                          x: 0,
                          y: 0,
                          scrollX: 0,
                          scrollY: 0,
                          width: e.width,
                          height: e.height,
                          cache: this.options.cache,
                          windowWidth: e.width,
                          windowHeight: e.height,
                        }).render(e.tree),
                      ]
                    : [3, 14];
                case 13:
                  ((a = n.sent()),
                    e.width &&
                      e.height &&
                      this.ctx.drawImage(
                        a,
                        0,
                        0,
                        e.width,
                        e.height,
                        e.bounds.left,
                        e.bounds.top,
                        e.bounds.width,
                        e.bounds.height,
                      ),
                    (n.label = 14));
                case 14:
                  if (
                    (e instanceof Gn &&
                      ((c = Math.min(e.bounds.width, e.bounds.height)),
                      e.type === Vn
                        ? e.checked &&
                          (this.ctx.save(),
                          this.path([
                            new rs(
                              e.bounds.left + 0.39363 * c,
                              e.bounds.top + 0.79 * c,
                            ),
                            new rs(
                              e.bounds.left + 0.16 * c,
                              e.bounds.top + 0.5549 * c,
                            ),
                            new rs(
                              e.bounds.left + 0.27347 * c,
                              e.bounds.top + 0.44071 * c,
                            ),
                            new rs(
                              e.bounds.left + 0.39694 * c,
                              e.bounds.top + 0.5649 * c,
                            ),
                            new rs(
                              e.bounds.left + 0.72983 * c,
                              e.bounds.top + 0.23 * c,
                            ),
                            new rs(
                              e.bounds.left + 0.84 * c,
                              e.bounds.top + 0.34085 * c,
                            ),
                            new rs(
                              e.bounds.left + 0.39363 * c,
                              e.bounds.top + 0.79 * c,
                            ),
                          ]),
                          (this.ctx.fillStyle = re(Jn)),
                          this.ctx.fill(),
                          this.ctx.restore())
                        : e.type === zn &&
                          e.checked &&
                          (this.ctx.save(),
                          this.ctx.beginPath(),
                          this.ctx.arc(
                            e.bounds.left + c / 2,
                            e.bounds.top + c / 2,
                            c / 4,
                            0,
                            2 * Math.PI,
                            !0,
                          ),
                          (this.ctx.fillStyle = re(Jn)),
                          this.ctx.fill(),
                          this.ctx.restore())),
                    Ss(e) && e.value.length)
                  ) {
                    switch (
                      ((this.ctx.font = this.createFontStyle(r)[0]),
                      (this.ctx.fillStyle = re(r.color)),
                      (this.ctx.textBaseline = "middle"),
                      (this.ctx.textAlign = ys(e.styles.textAlign)),
                      (C = Hs(e)),
                      (Q = 0),
                      e.styles.textAlign)
                    ) {
                      case gr.CENTER:
                        Q += C.width / 2;
                        break;
                      case gr.RIGHT:
                        Q += C.width;
                    }
                    ((w = C.add(Q, 0, 0, -C.height / 2 + 1)),
                      this.ctx.save(),
                      this.path([
                        new rs(C.left, C.top),
                        new rs(C.left + C.width, C.top),
                        new rs(C.left + C.width, C.top + C.height),
                        new rs(C.left, C.top + C.height),
                      ]),
                      this.ctx.clip(),
                      this.renderTextWithLetterSpacing(
                        new Cn(e.value, w),
                        r.letterSpacing,
                      ),
                      this.ctx.restore(),
                      (this.ctx.textBaseline = "bottom"),
                      (this.ctx.textAlign = "left"));
                  }
                  if (!An(e.styles.display, 2048)) return [3, 20];
                  if (null === e.styles.listStyleImage) return [3, 19];
                  if ((u = e.styles.listStyleImage).type !== Ve.URL)
                    return [3, 18];
                  ((U = void 0), (l = u.url), (n.label = 15));
                case 15:
                  return (
                    n.trys.push([15, 17, , 18]),
                    [4, this.options.cache.match(l)]
                  );
                case 16:
                  return (
                    (U = n.sent()),
                    this.ctx.drawImage(
                      U,
                      e.bounds.left - (U.width + 10),
                      e.bounds.top,
                    ),
                    [3, 18]
                  );
                case 17:
                  return (
                    n.sent(),
                    be
                      .getInstance(this.options.id)
                      .error("Error loading list-style-image " + l),
                    [3, 18]
                  );
                case 18:
                  return [3, 20];
                case 19:
                  (A.listValue &&
                    e.styles.listStyleType !== rr.NONE &&
                    ((this.ctx.font = this.createFontStyle(r)[0]),
                    (this.ctx.fillStyle = re(r.color)),
                    (this.ctx.textBaseline = "middle"),
                    (this.ctx.textAlign = "right"),
                    (C = new B(
                      e.bounds.left,
                      e.bounds.top + ce(e.styles.paddingTop, e.bounds.width),
                      e.bounds.width,
                      (function (A, e) {
                        return XA(A) && "normal" === A.value
                          ? 1.2 * e
                          : A.type === K.NUMBER_TOKEN
                            ? e * A.number
                            : ZA(A)
                              ? ce(A, e)
                              : e;
                      })(r.lineHeight, r.fontSize.number) /
                        2 +
                        1,
                    )),
                    this.renderTextWithLetterSpacing(
                      new Cn(A.listValue, C),
                      r.letterSpacing,
                    ),
                    (this.ctx.textBaseline = "bottom"),
                    (this.ctx.textAlign = "left")),
                    (n.label = 20));
                case 20:
                  return [2];
              }
            });
          });
        }),
        (bs.prototype.renderStackContent = function (A) {
          return r(this, void 0, void 0, function () {
            var e, t, r, B, s, o, i, a, c, Q, w, u, U, l, C;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, this.renderNodeBackgroundAndBorders(A.element)];
                case 1:
                  (n.sent(), (e = 0), (t = A.negativeZIndex), (n.label = 2));
                case 2:
                  return e < t.length
                    ? ((C = t[e]), [4, this.renderStack(C)])
                    : [3, 5];
                case 3:
                  (n.sent(), (n.label = 4));
                case 4:
                  return (e++, [3, 2]);
                case 5:
                  return [4, this.renderNodeContent(A.element)];
                case 6:
                  (n.sent(), (r = 0), (B = A.nonInlineLevel), (n.label = 7));
                case 7:
                  return r < B.length
                    ? ((C = B[r]), [4, this.renderNode(C)])
                    : [3, 10];
                case 8:
                  (n.sent(), (n.label = 9));
                case 9:
                  return (r++, [3, 7]);
                case 10:
                  ((s = 0), (o = A.nonPositionedFloats), (n.label = 11));
                case 11:
                  return s < o.length
                    ? ((C = o[s]), [4, this.renderStack(C)])
                    : [3, 14];
                case 12:
                  (n.sent(), (n.label = 13));
                case 13:
                  return (s++, [3, 11]);
                case 14:
                  ((i = 0), (a = A.nonPositionedInlineLevel), (n.label = 15));
                case 15:
                  return i < a.length
                    ? ((C = a[i]), [4, this.renderStack(C)])
                    : [3, 18];
                case 16:
                  (n.sent(), (n.label = 17));
                case 17:
                  return (i++, [3, 15]);
                case 18:
                  ((c = 0), (Q = A.inlineLevel), (n.label = 19));
                case 19:
                  return c < Q.length
                    ? ((C = Q[c]), [4, this.renderNode(C)])
                    : [3, 22];
                case 20:
                  (n.sent(), (n.label = 21));
                case 21:
                  return (c++, [3, 19]);
                case 22:
                  ((w = 0),
                    (u = A.zeroOrAutoZIndexOrTransformedOrOpacity),
                    (n.label = 23));
                case 23:
                  return w < u.length
                    ? ((C = u[w]), [4, this.renderStack(C)])
                    : [3, 26];
                case 24:
                  (n.sent(), (n.label = 25));
                case 25:
                  return (w++, [3, 23]);
                case 26:
                  ((U = 0), (l = A.positiveZIndex), (n.label = 27));
                case 27:
                  return U < l.length
                    ? ((C = l[U]), [4, this.renderStack(C)])
                    : [3, 30];
                case 28:
                  (n.sent(), (n.label = 29));
                case 29:
                  return (U++, [3, 27]);
                case 30:
                  return [2];
              }
            });
          });
        }),
        (bs.prototype.mask = function (A) {
          (this.ctx.beginPath(),
            this.ctx.moveTo(0, 0),
            this.ctx.lineTo(this.canvas.width, 0),
            this.ctx.lineTo(this.canvas.width, this.canvas.height),
            this.ctx.lineTo(0, this.canvas.height),
            this.ctx.lineTo(0, 0),
            this.formatPath(A.slice(0).reverse()),
            this.ctx.closePath());
        }),
        (bs.prototype.path = function (A) {
          (this.ctx.beginPath(), this.formatPath(A), this.ctx.closePath());
        }),
        (bs.prototype.formatPath = function (A) {
          var e = this;
          A.forEach(function (A, t) {
            var r = is(A) ? A.start : A;
            (0 === t ? e.ctx.moveTo(r.x, r.y) : e.ctx.lineTo(r.x, r.y),
              is(A) &&
                e.ctx.bezierCurveTo(
                  A.startControl.x,
                  A.startControl.y,
                  A.endControl.x,
                  A.endControl.y,
                  A.end.x,
                  A.end.y,
                ));
          });
        }),
        (bs.prototype.renderRepeat = function (A, e, t, r) {
          (this.path(A),
            (this.ctx.fillStyle = e),
            this.ctx.translate(t, r),
            this.ctx.fill(),
            this.ctx.translate(-t, -r));
        }),
        (bs.prototype.resizeImage = function (A, e, t) {
          if (A.width === e && A.height === t) return A;
          var r = this.canvas.ownerDocument.createElement("canvas");
          return (
            (r.width = e),
            (r.height = t),
            r
              .getContext("2d")
              .drawImage(A, 0, 0, A.width, A.height, 0, 0, e, t),
            r
          );
        }),
        (bs.prototype.renderBackgroundImage = function (A) {
          return r(this, void 0, void 0, function () {
            var e, t, r, B, s, o;
            return n(this, function (i) {
              switch (i.label) {
                case 0:
                  ((e = A.styles.backgroundImage.length - 1),
                    (t = function (t) {
                      var B,
                        s,
                        o,
                        i,
                        a,
                        c,
                        Q,
                        w,
                        u,
                        U,
                        l,
                        C,
                        g,
                        E,
                        F,
                        h,
                        H,
                        d,
                        f,
                        p,
                        N,
                        K,
                        I,
                        T,
                        m,
                        R,
                        L,
                        v,
                        O,
                        D,
                        b;
                      return n(this, function (n) {
                        switch (n.label) {
                          case 0:
                            if (t.type !== Ve.URL) return [3, 5];
                            ((B = void 0), (s = t.url), (n.label = 1));
                          case 1:
                            return (
                              n.trys.push([1, 3, , 4]),
                              [4, r.options.cache.match(s)]
                            );
                          case 2:
                            return ((B = n.sent()), [3, 4]);
                          case 3:
                            return (
                              n.sent(),
                              be
                                .getInstance(r.options.id)
                                .error("Error loading background-image " + s),
                              [3, 4]
                            );
                          case 4:
                            return (
                              B &&
                                ((o = ds(A, e, [
                                  B.width,
                                  B.height,
                                  B.width / B.height,
                                ])),
                                (h = o[0]),
                                (K = o[1]),
                                (I = o[2]),
                                (f = o[3]),
                                (p = o[4]),
                                (E = r.ctx.createPattern(
                                  r.resizeImage(B, f, p),
                                  "repeat",
                                )),
                                r.renderRepeat(h, E, K, I)),
                              [3, 6]
                            );
                          case 5:
                            (!(function (A) {
                              return A.type === Ve.LINEAR_GRADIENT;
                            })(t)
                              ? (function (A) {
                                  return A.type === Ve.RADIAL_GRADIENT;
                                })(t) &&
                                ((F = ds(A, e, [null, null, null])),
                                (h = F[0]),
                                (H = F[1]),
                                (d = F[2]),
                                (f = F[3]),
                                (p = F[4]),
                                (N =
                                  0 === t.position.length ? [ie] : t.position),
                                (K = ce(N[0], f)),
                                (I = ce(N[N.length - 1], p)),
                                (T = (function (A, e, t, r, n) {
                                  var B = 0,
                                    s = 0;
                                  switch (A.size) {
                                    case Ge.CLOSEST_SIDE:
                                      A.shape === Xe.CIRCLE
                                        ? (B = s =
                                            Math.min(
                                              Math.abs(e),
                                              Math.abs(e - r),
                                              Math.abs(t),
                                              Math.abs(t - n),
                                            ))
                                        : A.shape === Xe.ELLIPSE &&
                                          ((B = Math.min(
                                            Math.abs(e),
                                            Math.abs(e - r),
                                          )),
                                          (s = Math.min(
                                            Math.abs(t),
                                            Math.abs(t - n),
                                          )));
                                      break;
                                    case Ge.CLOSEST_CORNER:
                                      if (A.shape === Xe.CIRCLE)
                                        B = s = Math.min(
                                          Ke(e, t),
                                          Ke(e, t - n),
                                          Ke(e - r, t),
                                          Ke(e - r, t - n),
                                        );
                                      else if (A.shape === Xe.ELLIPSE) {
                                        var o =
                                            Math.min(
                                              Math.abs(t),
                                              Math.abs(t - n),
                                            ) /
                                            Math.min(
                                              Math.abs(e),
                                              Math.abs(e - r),
                                            ),
                                          i = Ie(r, n, e, t, !0),
                                          a = i[0],
                                          c = i[1];
                                        s = o * (B = Ke(a - e, (c - t) / o));
                                      }
                                      break;
                                    case Ge.FARTHEST_SIDE:
                                      A.shape === Xe.CIRCLE
                                        ? (B = s =
                                            Math.max(
                                              Math.abs(e),
                                              Math.abs(e - r),
                                              Math.abs(t),
                                              Math.abs(t - n),
                                            ))
                                        : A.shape === Xe.ELLIPSE &&
                                          ((B = Math.max(
                                            Math.abs(e),
                                            Math.abs(e - r),
                                          )),
                                          (s = Math.max(
                                            Math.abs(t),
                                            Math.abs(t - n),
                                          )));
                                      break;
                                    case Ge.FARTHEST_CORNER:
                                      if (A.shape === Xe.CIRCLE)
                                        B = s = Math.max(
                                          Ke(e, t),
                                          Ke(e, t - n),
                                          Ke(e - r, t),
                                          Ke(e - r, t - n),
                                        );
                                      else if (A.shape === Xe.ELLIPSE) {
                                        o =
                                          Math.max(
                                            Math.abs(t),
                                            Math.abs(t - n),
                                          ) /
                                          Math.max(
                                            Math.abs(e),
                                            Math.abs(e - r),
                                          );
                                        var Q = Ie(r, n, e, t, !1);
                                        ((a = Q[0]),
                                          (c = Q[1]),
                                          (s =
                                            o * (B = Ke(a - e, (c - t) / o))));
                                      }
                                  }
                                  return (
                                    Array.isArray(A.size) &&
                                      ((B = ce(A.size[0], r)),
                                      (s =
                                        2 === A.size.length
                                          ? ce(A.size[1], n)
                                          : B)),
                                    [B, s]
                                  );
                                })(t, K, I, f, p)),
                                (m = T[0]),
                                (R = T[1]),
                                0 < m &&
                                  0 < m &&
                                  ((L = r.ctx.createRadialGradient(
                                    H + K,
                                    d + I,
                                    0,
                                    H + K,
                                    d + I,
                                    m,
                                  )),
                                  pe(t.stops, 2 * m).forEach(function (A) {
                                    return L.addColorStop(A.stop, re(A.color));
                                  }),
                                  r.path(h),
                                  (r.ctx.fillStyle = L),
                                  m !== R
                                    ? ((v =
                                        A.bounds.left + 0.5 * A.bounds.width),
                                      (O =
                                        A.bounds.top + 0.5 * A.bounds.height),
                                      (b = 1 / (D = R / m)),
                                      r.ctx.save(),
                                      r.ctx.translate(v, O),
                                      r.ctx.transform(1, 0, 0, D, 0, 0),
                                      r.ctx.translate(-v, -O),
                                      r.ctx.fillRect(
                                        H,
                                        b * (d - O) + O,
                                        f,
                                        p * b,
                                      ),
                                      r.ctx.restore())
                                    : r.ctx.fill()))
                              : ((i = ds(A, e, [null, null, null])),
                                (h = i[0]),
                                (K = i[1]),
                                (I = i[2]),
                                (f = i[3]),
                                (p = i[4]),
                                (a = Ne(t.angle, f, p)),
                                (c = a[0]),
                                (Q = a[1]),
                                (w = a[2]),
                                (u = a[3]),
                                (U = a[4]),
                                ((l = document.createElement("canvas")).width =
                                  f),
                                (l.height = p),
                                (C = l.getContext("2d")),
                                (g = C.createLinearGradient(Q, u, w, U)),
                                pe(t.stops, c).forEach(function (A) {
                                  return g.addColorStop(A.stop, re(A.color));
                                }),
                                (C.fillStyle = g),
                                C.fillRect(0, 0, f, p),
                                0 < f &&
                                  0 < p &&
                                  ((E = r.ctx.createPattern(l, "repeat")),
                                  r.renderRepeat(h, E, K, I))),
                              (n.label = 6));
                          case 6:
                            return (e--, [2]);
                        }
                      });
                    }),
                    (r = this),
                    (B = 0),
                    (s = A.styles.backgroundImage.slice(0).reverse()),
                    (i.label = 1));
                case 1:
                  return B < s.length ? ((o = s[B]), [5, t(o)]) : [3, 4];
                case 2:
                  (i.sent(), (i.label = 3));
                case 3:
                  return (B++, [3, 1]);
                case 4:
                  return [2];
              }
            });
          });
        }),
        (bs.prototype.renderBorder = function (A, e, t) {
          return r(this, void 0, void 0, function () {
            return n(this, function (r) {
              return (
                this.path(
                  (function (A, e) {
                    switch (e) {
                      case 0:
                        return Is(
                          A.topLeftBorderBox,
                          A.topLeftPaddingBox,
                          A.topRightBorderBox,
                          A.topRightPaddingBox,
                        );
                      case 1:
                        return Is(
                          A.topRightBorderBox,
                          A.topRightPaddingBox,
                          A.bottomRightBorderBox,
                          A.bottomRightPaddingBox,
                        );
                      case 2:
                        return Is(
                          A.bottomRightBorderBox,
                          A.bottomRightPaddingBox,
                          A.bottomLeftBorderBox,
                          A.bottomLeftPaddingBox,
                        );
                      case 3:
                      default:
                        return Is(
                          A.bottomLeftBorderBox,
                          A.bottomLeftPaddingBox,
                          A.topLeftBorderBox,
                          A.topLeftPaddingBox,
                        );
                    }
                  })(t, e),
                ),
                (this.ctx.fillStyle = re(A)),
                this.ctx.fill(),
                [2]
              );
            });
          });
        }),
        (bs.prototype.renderNodeBackgroundAndBorders = function (A) {
          return r(this, void 0, void 0, function () {
            var e,
              t,
              r,
              B,
              s,
              o,
              i,
              a,
              c = this;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  return (
                    this.applyEffects(A.effects, 2),
                    (e = A.container.styles),
                    (t = !te(e.backgroundColor) || e.backgroundImage.length),
                    (r = [
                      { style: e.borderTopStyle, color: e.borderTopColor },
                      { style: e.borderRightStyle, color: e.borderRightColor },
                      {
                        style: e.borderBottomStyle,
                        color: e.borderBottomColor,
                      },
                      { style: e.borderLeftStyle, color: e.borderLeftColor },
                    ]),
                    (B = Ms(ms(e.backgroundClip, 0), A.curves)),
                    t || e.boxShadow.length
                      ? (this.ctx.save(),
                        this.path(B),
                        this.ctx.clip(),
                        te(e.backgroundColor) ||
                          ((this.ctx.fillStyle = re(e.backgroundColor)),
                          this.ctx.fill()),
                        [4, this.renderBackgroundImage(A.container)])
                      : [3, 2]
                  );
                case 1:
                  (n.sent(),
                    this.ctx.restore(),
                    e.boxShadow
                      .slice(0)
                      .reverse()
                      .forEach(function (e) {
                        c.ctx.save();
                        var t = ws(A.curves),
                          r = e.inset ? 0 : 1e4,
                          n = (function (A, e, t, r, n) {
                            return A.map(function (A, B) {
                              switch (B) {
                                case 0:
                                  return A.add(e, t);
                                case 1:
                                  return A.add(e + r, t);
                                case 2:
                                  return A.add(e + r, t + n);
                                case 3:
                                  return A.add(e, t + n);
                              }
                              return A;
                            });
                          })(
                            t,
                            -r + (e.inset ? 1 : -1) * e.spread.number,
                            (e.inset ? 1 : -1) * e.spread.number,
                            e.spread.number * (e.inset ? -2 : 2),
                            e.spread.number * (e.inset ? -2 : 2),
                          );
                        (e.inset
                          ? (c.path(t), c.ctx.clip(), c.mask(n))
                          : (c.mask(t), c.ctx.clip(), c.path(n)),
                          (c.ctx.shadowOffsetX = e.offsetX.number + r),
                          (c.ctx.shadowOffsetY = e.offsetY.number),
                          (c.ctx.shadowColor = re(e.color)),
                          (c.ctx.shadowBlur = e.blur.number),
                          (c.ctx.fillStyle = e.inset
                            ? re(e.color)
                            : "rgba(0,0,0,1)"),
                          c.ctx.fill(),
                          c.ctx.restore());
                      }),
                    (n.label = 2));
                case 2:
                  ((o = s = 0), (i = r), (n.label = 3));
                case 3:
                  return o < i.length
                    ? (a = i[o]).style === Ht.NONE || te(a.color)
                      ? [3, 5]
                      : [4, this.renderBorder(a.color, s, A.curves)]
                    : [3, 7];
                case 4:
                  (n.sent(), (n.label = 5));
                case 5:
                  (s++, (n.label = 6));
                case 6:
                  return (o++, [3, 3]);
                case 7:
                  return [2];
              }
            });
          });
        }),
        (bs.prototype.render = function (A) {
          return r(this, void 0, void 0, function () {
            var e;
            return n(this, function (t) {
              switch (t.label) {
                case 0:
                  return (
                    this.options.backgroundColor &&
                      ((this.ctx.fillStyle = re(this.options.backgroundColor)),
                      this.ctx.fillRect(
                        this.options.x - this.options.scrollX,
                        this.options.y - this.options.scrollY,
                        this.options.width,
                        this.options.height,
                      )),
                    (e = (function (A) {
                      var e = new Es(A, []),
                        t = new gs(e),
                        r = [];
                      return (Ns(e, t, t, r), Ks(e.container, r), t);
                    })(A)),
                    [4, this.renderStack(e)]
                  );
                case 1:
                  return (t.sent(), this.applyEffects([], 2), [2, this.canvas]);
              }
            });
          });
        }),
        bs);
      function bs(A) {
        ((this._activeEffects = []),
          (this.canvas = A.canvas
            ? A.canvas
            : document.createElement("canvas")),
          (this.ctx = this.canvas.getContext("2d")),
          (this.options = A).canvas ||
            ((this.canvas.width = Math.floor(A.width * A.scale)),
            (this.canvas.height = Math.floor(A.height * A.scale)),
            (this.canvas.style.width = A.width + "px"),
            (this.canvas.style.height = A.height + "px")),
          (this.fontMetrics = new vs(document)),
          this.ctx.scale(this.options.scale, this.options.scale),
          this.ctx.translate(-A.x + A.scrollX, -A.y + A.scrollY),
          (this.ctx.textBaseline = "bottom"),
          (this._activeEffects = []),
          be
            .getInstance(A.id)
            .debug(
              "Canvas renderer initialized (" +
                A.width +
                "x" +
                A.height +
                " at " +
                A.x +
                "," +
                A.y +
                ") with scale " +
                A.scale,
            ));
      }
      var Ss = function (A) {
          return (
            A instanceof jn ||
            A instanceof Yn ||
            (A instanceof Gn && A.type !== zn && A.type !== Vn)
          );
        },
        Ms = function (A, e) {
          switch (A) {
            case Fe.BORDER_BOX:
              return ws(e);
            case Fe.CONTENT_BOX:
              return (function (A) {
                return [
                  A.topLeftContentBox,
                  A.topRightContentBox,
                  A.bottomRightContentBox,
                  A.bottomLeftContentBox,
                ];
              })(e);
            case Fe.PADDING_BOX:
            default:
              return us(e);
          }
        },
        ys = function (A) {
          switch (A) {
            case gr.CENTER:
              return "center";
            case gr.RIGHT:
              return "right";
            case gr.LEFT:
            default:
              return "left";
          }
        },
        _s =
          ((Ps.prototype.render = function (A) {
            return r(this, void 0, void 0, function () {
              var e, t;
              return n(this, function (r) {
                switch (r.label) {
                  case 0:
                    return (
                      (e = ve(
                        Math.max(this.options.windowWidth, this.options.width) *
                          this.options.scale,
                        Math.max(
                          this.options.windowHeight,
                          this.options.height,
                        ) * this.options.scale,
                        this.options.scrollX * this.options.scale,
                        this.options.scrollY * this.options.scale,
                        A,
                      )),
                      [4, Vs(e)]
                    );
                  case 1:
                    return (
                      (t = r.sent()),
                      this.options.backgroundColor &&
                        ((this.ctx.fillStyle = re(
                          this.options.backgroundColor,
                        )),
                        this.ctx.fillRect(
                          0,
                          0,
                          this.options.width * this.options.scale,
                          this.options.height * this.options.scale,
                        )),
                      this.ctx.drawImage(
                        t,
                        -this.options.x * this.options.scale,
                        -this.options.y * this.options.scale,
                      ),
                      [2, this.canvas]
                    );
                }
              });
            });
          }),
          Ps);
      function Ps(A) {
        ((this.canvas = A.canvas ? A.canvas : document.createElement("canvas")),
          (this.ctx = this.canvas.getContext("2d")),
          (this.options = A),
          (this.canvas.width = Math.floor(A.width * A.scale)),
          (this.canvas.height = Math.floor(A.height * A.scale)),
          (this.canvas.style.width = A.width + "px"),
          (this.canvas.style.height = A.height + "px"),
          this.ctx.scale(this.options.scale, this.options.scale),
          this.ctx.translate(-A.x + A.scrollX, -A.y + A.scrollY),
          be
            .getInstance(A.id)
            .debug(
              "EXPERIMENTAL ForeignObject renderer initialized (" +
                A.width +
                "x" +
                A.height +
                " at " +
                A.x +
                "," +
                A.y +
                ") with scale " +
                A.scale,
            ));
      }
      function xs(A) {
        return ue(PA.create(A).parseComponentValue());
      }
      var Vs = function (A) {
        return new Promise(function (e, t) {
          var r = new Image();
          ((r.onload = function () {
            e(r);
          }),
            (r.onerror = t),
            (r.src =
              "data:image/svg+xml;charset=utf-8," +
              encodeURIComponent(new XMLSerializer().serializeToString(A))));
        });
      };
      "undefined" != typeof window && Me.setContext(window);
      var zs = function (A, e) {
        return r(void 0, void 0, void 0, function () {
          var r,
            s,
            o,
            a,
            c,
            Q,
            w,
            u,
            U,
            l,
            C,
            g,
            E,
            F,
            h,
            H,
            d,
            f,
            p,
            N,
            K,
            I,
            T;
          return n(this, function (n) {
            switch (n.label) {
              case 0:
                if (!(r = A.ownerDocument))
                  throw new Error("Element is not attached to a Document");
                if (!(s = r.defaultView))
                  throw new Error("Document is not attached to a Window");
                return (
                  (o = (Math.round(1e3 * Math.random()) + Date.now()).toString(
                    16,
                  )),
                  (a =
                    FB(A) ||
                    (function (A) {
                      return "HTML" === A.tagName;
                    })(A)
                      ? (function (A) {
                          var e = A.body,
                            t = A.documentElement;
                          if (!e || !t)
                            throw new Error("Unable to get document size");
                          var r = Math.max(
                              Math.max(e.scrollWidth, t.scrollWidth),
                              Math.max(e.offsetWidth, t.offsetWidth),
                              Math.max(e.clientWidth, t.clientWidth),
                            ),
                            n = Math.max(
                              Math.max(e.scrollHeight, t.scrollHeight),
                              Math.max(e.offsetHeight, t.offsetHeight),
                              Math.max(e.clientHeight, t.clientHeight),
                            );
                          return new B(0, 0, r, n);
                        })(r)
                      : i(A)),
                  (c = a.width),
                  (Q = a.height),
                  (w = a.left),
                  (u = a.top),
                  (U = t(
                    {},
                    {
                      allowTaint: !1,
                      imageTimeout: 15e3,
                      proxy: void 0,
                      useCORS: !1,
                    },
                    e,
                  )),
                  (l = {
                    backgroundColor: "#ffffff",
                    cache: e.cache ? e.cache : Me.create(o, U),
                    logging: !0,
                    removeContainer: !0,
                    foreignObjectRendering: !1,
                    scale: s.devicePixelRatio || 1,
                    windowWidth: s.innerWidth,
                    windowHeight: s.innerHeight,
                    scrollX: s.pageXOffset,
                    scrollY: s.pageYOffset,
                    x: w,
                    y: u,
                    width: Math.ceil(c),
                    height: Math.ceil(Q),
                    id: o,
                  }),
                  (C = t({}, l, U, e)),
                  (g = new B(
                    C.scrollX,
                    C.scrollY,
                    C.windowWidth,
                    C.windowHeight,
                  )),
                  be.create({ id: o, enabled: C.logging }),
                  be.getInstance(o).debug("Starting document clone"),
                  (E = new xB(A, {
                    id: o,
                    onclone: C.onclone,
                    ignoreElements: C.ignoreElements,
                    inlineImages: C.foreignObjectRendering,
                    copyStyles: C.foreignObjectRendering,
                  })),
                  (F = E.clonedReferenceElement)
                    ? [4, E.toIFrame(r, g)]
                    : [
                        2,
                        Promise.reject(
                          "Unable to find element in cloned iframe",
                        ),
                      ]
                );
              case 1:
                return (
                  (h = n.sent()),
                  (H = r.documentElement
                    ? xs(getComputedStyle(r.documentElement).backgroundColor)
                    : de.TRANSPARENT),
                  (d = r.body
                    ? xs(getComputedStyle(r.body).backgroundColor)
                    : de.TRANSPARENT),
                  (f = e.backgroundColor),
                  (p =
                    "string" == typeof f
                      ? xs(f)
                      : null === f
                        ? de.TRANSPARENT
                        : 4294967295),
                  (N =
                    A === r.documentElement
                      ? te(H)
                        ? te(d)
                          ? p
                          : d
                        : H
                      : p),
                  (K = {
                    id: o,
                    cache: C.cache,
                    canvas: C.canvas,
                    backgroundColor: N,
                    scale: C.scale,
                    x: C.x,
                    y: C.y,
                    scrollX: C.scrollX,
                    scrollY: C.scrollY,
                    width: C.width,
                    height: C.height,
                    windowWidth: C.windowWidth,
                    windowHeight: C.windowHeight,
                  }),
                  C.foreignObjectRendering
                    ? (be
                        .getInstance(o)
                        .debug(
                          "Document cloned, using foreign object rendering",
                        ),
                      [4, new _s(K).render(F)])
                    : [3, 3]
                );
              case 2:
                return ((I = n.sent()), [3, 5]);
              case 3:
                return (
                  be
                    .getInstance(o)
                    .debug("Document cloned, using computed rendering"),
                  Me.attachInstance(C.cache),
                  be.getInstance(o).debug("Starting DOM parsing"),
                  (T = iB(F)),
                  Me.detachInstance(),
                  N === T.styles.backgroundColor &&
                    (T.styles.backgroundColor = de.TRANSPARENT),
                  be.getInstance(o).debug("Starting renderer"),
                  [4, new Ds(K).render(T)]
                );
              case 4:
                ((I = n.sent()), (n.label = 5));
              case 5:
                return (
                  !0 === C.removeContainer &&
                    (xB.destroy(h) ||
                      be
                        .getInstance(o)
                        .error(
                          "Cannot detach cloned iframe as it is not in the DOM anymore",
                        )),
                  be.getInstance(o).debug("Finished rendering"),
                  be.destroy(o),
                  Me.destroy(o),
                  [2, I]
                );
            }
          });
        });
      };
      return function (A, e) {
        return (void 0 === e && (e = {}), zs(A, e));
      };
    });
  },
  5695: function (A, e, t) {
    var r = t("5ca1"),
      n = t("77f1"),
      B = String.fromCharCode,
      s = String.fromCodePoint;
    r(r.S + r.F * (!!s && 1 != s.length), "String", {
      fromCodePoint: function (A) {
        var e,
          t = [],
          r = arguments.length,
          s = 0;
        while (r > s) {
          if (((e = +arguments[s++]), n(e, 1114111) !== e))
            throw RangeError(e + " is not a valid code point");
          t.push(
            e < 65536
              ? B(e)
              : B(55296 + ((e -= 65536) >> 10), (e % 1024) + 56320),
          );
        }
        return t.join("");
      },
    });
  },
  "6c7b": function (A, e, t) {
    var r = t("5ca1");
    (r(r.P, "Array", { fill: t("36bd7") }), t("9c6c")("fill"));
  },
  "9c29": function (A, e, t) {
    t("ec30")("Uint32", 4, function (A) {
      return function (e, t, r) {
        return A(this, e, t, r);
      };
    });
  },
  af56: function (A, e, t) {
    t("ec30")("Uint16", 2, function (A) {
      return function (e, t, r) {
        return A(this, e, t, r);
      };
    });
  },
};
