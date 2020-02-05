/*
 jquery.inputmask.bundle.js
 https://github.com/RobinHerbots/Inputmask
 Copyright (c) 2010 - 2017 Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 3.3.11
*/
! function(C) {
    function x(p) {
        if (m[p]) return m[p].exports;
        var v = m[p] = {
            i: p,
            l: !1,
            exports: {}
        };
        return C[p].call(v.exports, v, v.exports, x), v.l = !0, v.exports
    }
    var m = {};
    x.m = C;
    x.c = m;
    x.d = function(p, m, E) {
        x.o(p, m) || Object.defineProperty(p, m, {
            configurable: !1,
            enumerable: !0,
            get: E
        })
    };
    x.n = function(p) {
        var m = p && p.__esModule ? function() {
            return p.default
        } : function() {
            return p
        };
        return x.d(m, "a", m), m
    };
    x.o = function(p, m) {
        return Object.prototype.hasOwnProperty.call(p, m)
    };
    x.p = "";
    x(x.s = 3)
}([function(C, x, m) {
        var p, v, E;
        "function" == typeof Symbol &&
            Symbol.iterator;
        ! function(B) {
            v = [m(2)];
            void 0 !== (E = "function" == typeof(p = B) ? p.apply(x, v) : p) && (C.exports = E)
        }(function(p) {
            return p
        })
    }, function(C, x, m) {
        var p, v, E, B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(f) {
            return typeof f
        } : function(f) {
            return f && "function" == typeof Symbol && f.constructor === Symbol && f !== Symbol.prototype ? "symbol" : typeof f
        };
        ! function(f) {
            v = [m(0), m(10), m(11)];
            void 0 !== (E = "function" == typeof(p = f) ? p.apply(x, v) : p) && (C.exports = E)
        }(function(f, c, h, b) {
            function d(c, g, k) {
                if (!(this instanceof d)) return new d(c, g, k);
                this.el = b;
                this.events = {};
                this.maskset = b;
                this.refreshValue = !1;
                !0 !== k && (f.isPlainObject(c) ? g = c : (g = g || {}).alias = c, this.opts = f.extend(!0, {}, this.defaults, g), this.noMasksCache = g && g.definitions !== b, this.userOptions = g || {}, this.isRTL = this.opts.numericInput, a(this.opts.alias, g, this.opts))
            }

            function a(c, g, k) {
                var e = d.prototype.aliases[c];
                return e ? (e.alias && a(e.alias, b, k), f.extend(!0, k, e), f.extend(!0, k, g), !0) : (null === k.mask && (k.mask = c), !1)
            }

            function e(a, c) {
                function k(a, k, g) {
                    var e = !1;
                    if (null !==
                        a && "" !== a || ((e = null !== g.regex) ? a = (a = g.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (e = !0, a = ".*")), 1 === a.length && !1 === g.greedy && 0 !== g.repeat && (g.placeholder = ""), 0 < g.repeat || "*" === g.repeat || "+" === g.repeat) a = g.groupmarker.start + a + g.groupmarker.end + g.quantifiermarker.start + ("*" === g.repeat ? 0 : "+" === g.repeat ? 1 : g.repeat) + "," + g.repeat + g.quantifiermarker.end;
                    var h, t = e ? "regex_" + g.regex : g.numericInput ? a.split("").reverse().join("") : a;
                    return d.prototype.masksCache[t] === b || !0 === c ? (h = {
                        mask: a,
                        maskToken: d.prototype.analyseMask(a,
                            e, g),
                        validPositions: {},
                        _buffer: b,
                        buffer: b,
                        tests: {},
                        metadata: k,
                        maskLength: b
                    }, !0 !== c && (d.prototype.masksCache[t] = h, h = f.extend(!0, {}, d.prototype.masksCache[t]))) : h = f.extend(!0, {}, d.prototype.masksCache[t]), h
                }
                if (f.isFunction(a.mask) && (a.mask = a.mask(a)), f.isArray(a.mask)) {
                    if (1 < a.mask.length) {
                        a.keepStatic = null === a.keepStatic || a.keepStatic;
                        var g = a.groupmarker.start;
                        return f.each(a.numericInput ? a.mask.reverse() : a.mask, function(k, c) {
                            1 < g.length && (g += a.groupmarker.end + a.alternatormarker + a.groupmarker.start);
                            c.mask === b || f.isFunction(c.mask) ? g += c : g += c.mask
                        }), g += a.groupmarker.end, k(g, a.mask, a)
                    }
                    a.mask = a.mask.pop()
                }
                return a.mask && a.mask.mask !== b && !f.isFunction(a.mask.mask) ? k(a.mask.mask, a.mask, a) : k(a.mask, a.mask, a)
            }

            function q(a, g, k) {
                function e(a, c, r) {
                    c = c || 0;
                    var l, d, u, f = [],
                        e = 0,
                        h = G();
                    do !0 === a && g.validPositions[e] ? (d = (u = g.validPositions[e]).match, l = u.locator.slice(), f.push(!0 === r ? u.input : !1 === r ? d.nativeDef : N(e, d))) : (d = (u = T(e, l, e - 1)).match, l = u.locator.slice(), (!1 === k.jitMasking || e < h || "number" == typeof k.jitMasking &&
                        isFinite(k.jitMasking) && k.jitMasking > e) && f.push(!1 === r ? d.nativeDef : N(e, d))), e++; while ((ba === b || e < ba) && (null !== d.fn || "" !== d.def) || c > e);
                    return "" === f[f.length - 1] && f.pop(), g.maskLength = e + 1, f
                }

                function F(a) {
                    var l = g;
                    l.buffer = b;
                    !0 !== a && (l.validPositions = {}, l.p = 0)
                }

                function G(a, k, c) {
                    var l = -1,
                        d = -1;
                    c = c || g.validPositions;
                    a === b && (a = -1);
                    for (var r in c) {
                        var f = parseInt(r);
                        c[f] && (k || !0 !== c[f].generatedInput) && (f <= a && (l = f), f >= a && (d = f))
                    }
                    return -1 !== l && 1 < a - l || d < a ? l : d
                }

                function H(a, c, d, e) {
                    var l = a,
                        r = f.extend(!0, {}, g.validPositions),
                        u = !1;
                    g.p = a;
                    for (a = c - 1; a >= l; a--)
                        if (g.validPositions[a] !== b) {
                            if (c = !0 !== d) {
                                if (c = !g.validPositions[a].match.optionality) {
                                    c = a;
                                    var h = g.validPositions[c];
                                    h !== b && null === h.match.fn ? (h = g.validPositions[c + 1], c = g.validPositions[c - 1] !== b && h !== b) : c = !1
                                }
                                c = c || !1 === k.canClearPosition(g, a, G(), e, k)
                            }
                            c || delete g.validPositions[a]
                        }
                    F(!0);
                    for (a = l + 1; a <= G();) {
                        for (; g.validPositions[l] !== b;) l++;
                        (a < l && (a = l + 1), g.validPositions[a] === b && R(a)) ? a++ : (d = T(a), !1 === u && r[l] && r[l].match.def === d.match.def ? (g.validPositions[l] = f.extend(!0, {}, r[l]), g.validPositions[l].input = d.input, delete g.validPositions[a], a++) : Z(l, d.match.def) ? !1 !== W(l, d.input || N(a), !0) && (delete g.validPositions[a], a++, u = !0) : R(a) || (a++, l--), l++)
                    }
                    F(!0)
                }

                function p(a, c) {
                    var l, d = G();
                    d = g.validPositions[d] || v(0)[0];
                    for (var f = d.alternation !== b ? d.locator[d.alternation].toString().split(",") : [], u = 0; u < a.length && (!((l = a[u]).match && (k.greedy && !0 !== l.match.optionalQuantifier || (!1 === l.match.optionality || !1 === l.match.newBlockMarker) && !0 !== l.match.optionalQuantifier) && (d.alternation ===
                            b || d.alternation !== l.alternation || l.locator[d.alternation] !== b && pa(l.locator[d.alternation].toString().split(","), f))) || !0 === c && (null !== l.match.fn || /[0-9a-bA-Z]/.test(l.match.def))); u++);
                    return l
                }

                function T(b, a, k) {
                    return g.validPositions[b] || p(v(b, a ? a.slice() : a, k))
                }

                function E(b) {
                    return g.validPositions[b] ? g.validPositions[b] : v(b)[0]
                }

                function Z(b, a) {
                    var l = !1;
                    b = v(b);
                    for (var k = 0; k < b.length; k++)
                        if (b[k].match && b[k].match.def === a) {
                            l = !0;
                            break
                        }
                    return l
                }

                function v(a, c, d) {
                    function l(c, d, r, e) {
                        function S(r, e,
                            z) {
                            function D(b, a) {
                                var c = 0 === f.inArray(b, a.matches);
                                return c || f.each(a.matches, function(d, l) {
                                    if (!0 === l.isQuantifier && (c = D(b, a.matches[d - 1]))) return !1
                                }), c
                            }

                            function aa(a, c, d) {
                                var l, k;
                                if (g.validPositions[a - 1] && d && g.tests[a])
                                    for (var r = g.validPositions[a - 1].locator, u = g.tests[a][0].locator, e = 0; e < d; e++)
                                        if (r[e] !== u[e]) return r.slice(d + 1);
                                return (g.tests[a] || g.validPositions[a]) && f.each(g.tests[a] || [g.validPositions[a]], function(a, r) {
                                    a = d !== b ? d : r.alternation;
                                    a = r.locator[a] !== b ? r.locator[a].toString().indexOf(c) :
                                        -1;
                                    (k === b || a < k) && -1 !== a && (l = r, k = a)
                                }), l ? l.locator.slice((d !== b ? d : l.alternation) + 1) : d !== b ? aa(a, c) : b
                            }
                            if (1E4 < h) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + g.mask;
                            if (h === a && r.matches === b) return t.push({
                                match: r,
                                locator: e.reverse(),
                                cd: G
                            }), !0;
                            if (r.matches !== b)
                                if (r.isGroup && z !== r) {
                                    if (r = S(c.matches[f.inArray(r, c.matches) + 1], e)) return !0
                                } else if (r.isOptional) {
                                var q = r;
                                if (r = l(r, d, e, z)) {
                                    if (u = t[t.length -
                                            1].match, !D(u, q)) return !0;
                                    F = !0;
                                    h = a
                                }
                            } else if (r.isAlternator) {
                                q = r;
                                var n = [],
                                    Ba = t.slice(),
                                    ka = e.length,
                                    H = 0 < d.length ? d.shift() : -1;
                                if (-1 === H || "string" == typeof H) {
                                    var p, y = h,
                                        T = d.slice(),
                                        X = [];
                                    if ("string" == typeof H) X = H.split(",");
                                    else
                                        for (p = 0; p < q.matches.length; p++) X.push(p);
                                    for (var qa = 0; qa < X.length; qa++) {
                                        if (p = parseInt(X[qa]), t = [], d = aa(h, p, ka) || T.slice(), !0 !== (r = S(q.matches[p] || c.matches[p], [p].concat(e), z) || r) && r !== b && X[X.length - 1] < q.matches.length) {
                                            var ca = f.inArray(r, c.matches) + 1;
                                            c.matches.length > ca && (r = S(c.matches[ca], [ca].concat(e.slice(1, e.length)), z)) && (X.push(ca.toString()), f.each(t, function(b, a) {
                                                a.alternation = e.length - 1
                                            }))
                                        }
                                        ca = t.slice();
                                        h = y;
                                        t = [];
                                        for (var A = 0; A < ca.length; A++) {
                                            var m = ca[A],
                                                la = !1;
                                            m.alternation = m.alternation || ka;
                                            for (var N = 0; N < n.length; N++) {
                                                var w = n[N];
                                                if ("string" != typeof H || -1 !== f.inArray(m.locator[m.alternation].toString(), X)) {
                                                    if (m.match.nativeDef === w.match.nativeDef || m.match.def === w.match.nativeDef || m.match.nativeDef === w.match.def) {
                                                        la = !0;
                                                        m.alternation === w.alternation && -1 === w.locator[w.alternation].toString().indexOf(m.locator[m.alternation]) &&
                                                            (w.locator[w.alternation] = w.locator[w.alternation] + "," + m.locator[m.alternation], w.alternation = m.alternation);
                                                        m.match.nativeDef === w.match.def && (m.locator[m.alternation] = w.locator[w.alternation], n.splice(n.indexOf(w), 1, m));
                                                        break
                                                    }
                                                    if (m.match.def === w.match.def) {
                                                        la = !1;
                                                        break
                                                    }
                                                    if (null === m.match.fn && null !== w.match.fn && w.match.fn.test(m.match.def, g, a, !1, k, !1) || null !== m.match.fn && null !== w.match.fn && w.match.fn.test(m.match.def.replace(/[\[\]]/g, ""), g, a, !1, k, !1)) {
                                                        m.alternation === w.alternation && -1 === m.locator[m.alternation].toString().indexOf(w.locator[w.alternation].toString().split("")[0]) &&
                                                            (m.na = m.na || m.locator[m.alternation].toString(), -1 === m.na.indexOf(m.locator[m.alternation].toString().split("")[0]) && (m.na = m.na + "," + m.locator[w.alternation].toString().split("")[0]), la = !0, m.locator[m.alternation] = w.locator[w.alternation].toString().split("")[0] + "," + m.locator[m.alternation], n.splice(n.indexOf(w), 0, m));
                                                        break
                                                    }
                                                }
                                            }
                                            la || n.push(m)
                                        }
                                    }
                                    "string" == typeof H && (n = f.map(n, function(a, c) {
                                        if (isFinite(c)) {
                                            c = a.alternation;
                                            var d = a.locator[c].toString().split(",");
                                            a.locator[c] = b;
                                            a.alternation = b;
                                            for (var l =
                                                    0; l < d.length; l++) - 1 !== f.inArray(d[l], X) && (a.locator[c] !== b ? (a.locator[c] += ",", a.locator[c] += d[l]) : a.locator[c] = parseInt(d[l]), a.alternation = c);
                                            if (a.locator[c] !== b) return a
                                        }
                                    }));
                                    t = Ba.concat(n);
                                    h = a;
                                    F = 0 < t.length;
                                    r = 0 < n.length;
                                    d = T.slice()
                                } else r = S(q.matches[H] || c.matches[H], [H].concat(e), z);
                                if (r) return !0
                            } else if (r.isQuantifier && z !== c.matches[f.inArray(r, c.matches) - 1])
                                for (z = r, q = 0 < d.length ? d.shift() : 0; q < (isNaN(z.quantifier.max) ? q + 1 : z.quantifier.max) && h <= a; q++) {
                                    if (n = c.matches[f.inArray(z, c.matches) - 1], r = S(n, [q].concat(e), n)) {
                                        if ((u = t[t.length - 1].match, u.optionalQuantifier = q > z.quantifier.min - 1, D(u, n)) && q > z.quantifier.min - 1) {
                                            F = !0;
                                            h = a;
                                            break
                                        }
                                        return !0
                                    }
                                } else {
                                    if (r = l(r, d, e, z)) return !0
                                } else h++
                        }
                        for (var z = 0 < d.length ? d.shift() : 0; z < c.matches.length; z++)
                            if (!0 !== c.matches[z].isQuantifier) {
                                var D = S(c.matches[z], [z].concat(r), e);
                                if (D && h === a) return D;
                                if (h > a) break
                            }
                    }

                    function r(c) {
                        return k.keepStatic && 0 < a && c.length > 1 + ("" === c[c.length - 1].match.def ? 1 : 0) && !0 !== c[0].match.optionality && !0 !== c[0].match.optionalQuantifier && null ===
                            c[0].match.fn && !/[0-9a-bA-Z]/.test(c[0].match.def) && (g.validPositions[a - 1] === b || g.validPositions[a - 1].alternation === c[0].alternation || g.validPositions[a - 1]) ? [p(c)] : c
                    }
                    var u, e = g.maskToken,
                        h = c ? d : 0;
                    d = c ? c.slice() : [0];
                    var t = [],
                        F = !1,
                        G = c ? c.join("") : "";
                    if (-1 < a) {
                        if (c === b) {
                            for (var q, n = a - 1;
                                (q = g.validPositions[n] || g.tests[n]) === b && -1 < n;) n--;
                            q !== b && -1 < n && (d = function(a) {
                                var c = [];
                                return f.isArray(a) || (a = [a]), 0 < a.length && (a[0].alternation === b ? 0 === (c = p(a.slice()).locator.slice()).length && (c = a[0].locator.slice()) : f.each(a,
                                    function(b, a) {
                                        if ("" !== a.def)
                                            if (0 === c.length) c = a.locator.slice();
                                            else
                                                for (b = 0; b < c.length; b++) a.locator[b] && -1 === c[b].toString().indexOf(a.locator[b]) && (c[b] += "," + a.locator[b])
                                    })), c
                            }(q), G = d.join(""), h = n)
                        }
                        if (g.tests[a] && g.tests[a][0].cd === G) return r(g.tests[a]);
                        for (q = d.shift(); q < e.length && !(l(e[q], d, [q]) && h === a || h > a); q++);
                    }
                    return (0 === t.length || F) && t.push({
                        match: {
                            fn: null,
                            cardinality: 0,
                            optionality: !0,
                            casing: null,
                            def: "",
                            placeholder: ""
                        },
                        locator: [],
                        cd: G
                    }), c !== b && g.tests[a] ? r(f.extend(!0, [], t)) : (g.tests[a] =
                        f.extend(!0, [], t), r(g.tests[a]))
                }

                function w() {
                    return g._buffer === b && (g._buffer = e(!1, 1), g.buffer === b && (g.buffer = g._buffer.slice())), g._buffer
                }

                function A(a) {
                    return g.buffer !== b && !0 !== a || (g.buffer = e(!0, G(), !0)), g.buffer
                }

                function C(a, c, d) {
                    var l, r;
                    if (!0 === a) F(), a = 0, c = d.length;
                    else
                        for (l = a; l < c; l++) delete g.validPositions[l];
                    for (l = r = a; l < c; l++)
                        if (F(!0), d[l] !== k.skipOptionalPartCharacter) a = W(r, d[l], !0, !0), !1 !== a && (F(!0), r = a.caret !== b ? a.caret : a.pos + 1)
                }

                function ha(b, a, c) {
                    switch (k.casing || a.casing) {
                        case "upper":
                            b =
                                b.toUpperCase();
                            break;
                        case "lower":
                            b = b.toLowerCase();
                            break;
                        case "title":
                            var l = g.validPositions[c - 1];
                            b = 0 === c || l && l.input === String.fromCharCode(d.keyCode.SPACE) ? b.toUpperCase() : b.toLowerCase();
                            break;
                        default:
                            f.isFunction(k.casing) && (l = Array.prototype.slice.call(arguments), l.push(g.validPositions), b = k.casing.apply(this, l))
                    }
                    return b
                }

                function pa(a, c, d) {
                    var l;
                    c = k.greedy ? c : c.slice(0, 1);
                    var r = !1;
                    d = d !== b ? d.split(",") : [];
                    for (var g = 0; g < d.length; g++) - 1 !== (l = a.indexOf(d[g])) && a.splice(l, 1);
                    for (l = 0; l < a.length; l++)
                        if (-1 !==
                            f.inArray(a[l], c)) {
                            r = !0;
                            break
                        }
                    return r
                }

                function W(a, c, r, e, h, D) {
                    function l(b) {
                        var a = K ? 1 < b.begin - b.end || 1 == b.begin - b.end : 1 < b.end - b.begin || 1 == b.end - b.begin;
                        return a && 0 === b.begin && b.end === g.maskLength ? "full" : a
                    }

                    function u(c, d, r) {
                        var u = !1;
                        return f.each(v(c), function(h, z) {
                            for (var t = z.match, D = d ? 1 : 0, q = "", n = t.cardinality; n > D; n--) q += U(c - (n - 1));
                            if (d && (q += d), A(!0), !1 !== (u = null != t.fn ? t.fn.test(q, g, c, r, k, l(a)) : (d === t.def || d === k.skipOptionalPartCharacter) && "" !== t.def && {
                                    c: N(c, t, !0) || t.def,
                                    pos: c
                                })) {
                                D = u.c !== b ? u.c : d;
                                D = D === k.skipOptionalPartCharacter && null === t.fn ? N(c, t, !0) || t.def : D;
                                n = c;
                                q = A();
                                if (u.remove !== b && (f.isArray(u.remove) || (u.remove = [u.remove]), f.each(u.remove.sort(function(b, a) {
                                        return a - b
                                    }), function(b, a) {
                                        H(a, a + 1, !0)
                                    })), u.insert !== b && (f.isArray(u.insert) || (u.insert = [u.insert]), f.each(u.insert.sort(function(b, a) {
                                        return b - a
                                    }), function(b, a) {
                                        W(a.pos, a.c, !0, e)
                                    })), u.refreshFromBuffer) {
                                    n = u.refreshFromBuffer;
                                    if (C(!0 === n ? n : n.start, n.end, q), u.pos === b && u.c === b) return u.pos = G(), !1;
                                    if ((n = u.pos !== b ? u.pos : c) !== c) return u =
                                        f.extend(u, W(n, D, !0, e)), !1
                                } else if (!0 !== u && u.pos !== b && u.pos !== c && (n = u.pos, C(c, n, A().slice()), n !== c)) return u = f.extend(u, W(n, D, !0)), !1;
                                return (!0 === u || u.pos !== b || u.c !== b) && (0 < h && F(!0), S(n, f.extend({}, z, {
                                    input: ha(D, t, n)
                                }), e, l(a)) || (u = !1), !1)
                            }
                        }), u
                    }

                    function S(a, c, d, l) {
                        if (l || k.insertMode && g.validPositions[a] !== b && d === b) {
                            l = f.extend(!0, {}, g.validPositions);
                            var r = G(b, !0);
                            for (d = a; d <= r; d++) delete g.validPositions[d];
                            g.validPositions[a] = f.extend(!0, {}, c);
                            var u;
                            c = !0;
                            var e = g.validPositions,
                                h = !1,
                                z = g.maskLength;
                            for (d = u = a; d <= r; d++) {
                                a = l[d];
                                if (a !== b)
                                    for (var D = u; D < g.maskLength && (null === a.match.fn && e[d] && (!0 === e[d].match.optionalQuantifier || !0 === e[d].match.optionality) || null != a.match.fn);) {
                                        if (D++, !1 === h && l[D] && l[D].match.def === a.match.def) g.validPositions[D] = f.extend(!0, {}, l[D]), g.validPositions[D].input = a.input, t(D), u = D, c = !0;
                                        else if (Z(D, a.match.def)) h = W(D, a.input, !0, !0), c = !1 !== h, u = h.caret || h.insert ? G() : D, h = !0;
                                        else if (!(c = !0 === a.generatedInput) && D >= g.maskLength - 1) break;
                                        if (g.maskLength < z && (g.maskLength = z), c) break
                                    }
                                if (!c) break
                            }
                            if (!c) return g.validPositions =
                                f.extend(!0, {}, l), F(!0), !1
                        } else g.validPositions[a] = f.extend(!0, {}, c);
                        return F(!0), !0
                    }

                    function t(a) {
                        for (var c = a - 1; - 1 < c && !g.validPositions[c]; c--);
                        var d, l;
                        for (c++; c < a; c++) g.validPositions[c] === b && (!1 === k.jitMasking || k.jitMasking > c) && ("" === (l = v(c, T(c - 1).locator, c - 1).slice())[l.length - 1].match.def && l.pop(), (d = p(l)) && (d.match.def === k.radixPointDefinitionSymbol || !R(c, !0) || f.inArray(k.radixPoint, A()) < c && d.match.fn && d.match.fn.test(N(c), g, c, !1, k)) && !1 !== (q = u(c, N(c, d.match, !0) || (null == d.match.fn ? d.match.def :
                            "" !== N(c) ? N(c) : A()[c]), !0)) && (g.validPositions[q.pos || c].generatedInput = !0))
                    }
                    r = !0 === r;
                    var z = a;
                    a.begin !== b && (z = K && !l(a) ? a.end : a.begin);
                    var q = !0,
                        m = f.extend(!0, {}, g.validPositions);
                    if (f.isFunction(k.preValidation) && !r && !0 !== e && !0 !== D && (q = k.preValidation(A(), z, c, l(a), k)), !0 === q) {
                        if (t(z), l(a) && (ra(b, d.keyCode.DELETE, a, !0, !0), z = g.p), z < g.maskLength && (ba === b || z < ba) && (q = u(z, c, r), (!r || !0 === e) && !1 === q && !0 !== D)) {
                            var n = g.validPositions[z];
                            if (!n || null !== n.match.fn || n.match.def !== c && c !== k.skipOptionalPartCharacter) {
                                if ((k.insertMode ||
                                        g.validPositions[L(z)] === b) && !R(z, !0)) {
                                    n = z + 1;
                                    for (var w = L(z); n <= w; n++)
                                        if (!1 !== (q = u(n, c, r))) {
                                            ! function(a, c) {
                                                var d = g.validPositions[c];
                                                if (d)
                                                    for (var l = d.locator, k = l.length; a < c; a++)
                                                        if (g.validPositions[a] === b && !R(a, !0)) {
                                                            var r = v(a).slice(),
                                                                e = p(r, !0),
                                                                h = -1;
                                                            "" === r[r.length - 1].match.def && r.pop();
                                                            f.each(r, function(a, c) {
                                                                for (a = 0; a < k; a++) {
                                                                    if (c.locator[a] === b || !pa(c.locator[a].toString().split(","), l[a].toString().split(","), c.na)) {
                                                                        var d = l[a];
                                                                        d - e.locator[a] > Math.abs(d - c.locator[a]) && (e = c);
                                                                        break
                                                                    }
                                                                    h < a && (h = a, e = c)
                                                                }
                                                            });
                                                            (e = f.extend({}, e, {
                                                                input: N(a, e.match, !0) || e.match.def
                                                            })).generatedInput = !0;
                                                            S(a, e, !0);
                                                            g.validPositions[c] = b;
                                                            u(c, d.input, !0)
                                                        }
                                            }(z, q.pos !== b ? q.pos : n);
                                            z = n;
                                            break
                                        }
                                }
                            } else q = {
                                caret: L(z)
                            }
                        }!1 === q && k.keepStatic && !r && !0 !== h && (q = function(a, c, d) {
                            var l, r, u, h, D, t, z, S = f.extend(!0, {}, g.validPositions),
                                q = !1,
                                n = G();
                            for (h = g.validPositions[n]; 0 <= n; n--)
                                if ((u = g.validPositions[n]) && u.alternation !== b) {
                                    if (l = n, r = g.validPositions[l].alternation, h.locator[u.alternation] !== u.locator[u.alternation]) break;
                                    h = u
                                }
                            if (r !== b) {
                                var m = parseInt(l);
                                var aa = h.locator[h.alternation || r] !== b ? h.locator[h.alternation || r] : z[0];
                                0 < aa.length && (aa = aa.split(",")[0]);
                                var w = g.validPositions[m];
                                l = g.validPositions[m - 1];
                                f.each(v(m, l ? l.locator : b, m - 1), function(l, u) {
                                    z = u.locator[r] ? u.locator[r].toString().split(",") : [];
                                    for (l = 0; l < z.length; l++) {
                                        var h = [],
                                            n = 0,
                                            H = 0,
                                            p = !1;
                                        if (aa < z[l] && (u.na === b || -1 === f.inArray(z[l], u.na.split(",")) || -1 === f.inArray(aa.toString(), z))) {
                                            g.validPositions[m] = f.extend(!0, {}, u);
                                            var ka = g.validPositions[m].locator;
                                            g.validPositions[m].locator[r] = parseInt(z[l]);
                                            null == u.match.fn ? (w.input !== u.match.def && (p = !0, !0 !== w.generatedInput && h.push(w.input)), H++, g.validPositions[m].generatedInput = !/[0-9a-bA-Z]/.test(u.match.def), g.validPositions[m].input = u.match.def) : g.validPositions[m].input = w.input;
                                            for (D = m + 1; D < G(b, !0) + 1; D++)(t = g.validPositions[D]) && !0 !== t.generatedInput && /[0-9a-bA-Z]/.test(t.input) ? h.push(t.input) : D < a && n++, delete g.validPositions[D];
                                            p && h[0] === u.match.def && h.shift();
                                            F(!0);
                                            for (q = !0; 0 < h.length && (p = h.shift(), p === k.skipOptionalPartCharacter || (q = W(G(b, !0) + 1, p, !1, e, !0))););
                                            if (q) {
                                                g.validPositions[m].locator = ka;
                                                h = G(a) + 1;
                                                for (D = m + 1; D < G() + 1; D++)((t = g.validPositions[D]) === b || null == t.match.fn) && D < a + (H - n) && H++;
                                                q = W((a += H - n) > h ? h : a, c, d, e, !0)
                                            }
                                            if (q) return !1;
                                            F();
                                            g.validPositions = f.extend(!0, {}, S)
                                        }
                                    }
                                })
                            }
                            return q
                        }(z, c, r));
                        !0 === q && (q = {
                            pos: z
                        })
                    }
                    f.isFunction(k.postValidation) && !1 !== q && !r && !0 !== e && !0 !== D && (c = k.postValidation(A(!0), q, k), c.refreshFromBuffer && c.buffer && (r = c.refreshFromBuffer, C(!0 === r ? r : r.start, r.end, c.buffer)), q = !0 === c ? q : c);
                    return q && q.pos === b && (q.pos = z), !1 !== q && !0 !== D || (F(!0), g.validPositions = f.extend(!0, {}, m)), q
                }

                function R(b, a) {
                    var c = T(b).match;
                    return ("" === c.def && (c = E(b).match), null != c.fn) ? c.fn : !0 !== a && -1 < b ? (b = v(b), b.length > 1 + ("" === b[b.length - 1].match.def ? 1 : 0)) : !1
                }

                function L(b, a) {
                    var c = g.maskLength;
                    if (b >= c) return c;
                    for (1 < v(c + 1).length && (e(!0, c + 1, !0), c = g.maskLength); ++b < c && (!0 === a && (!0 !== E(b).match.newBlockMarker || !R(b)) || !0 !== a && !R(b)););
                    return b
                }

                function da(b, a) {
                    var c;
                    if (0 >= b) return 0;
                    for (; 0 < --b && (!0 === a && !0 !== E(b).match.newBlockMarker || !0 !== a &&
                            !R(b) && (2 > (c = v(b)).length || 2 === c.length && "" === c[1].match.def)););
                    return b
                }

                function U(a) {
                    return g.validPositions[a] === b ? N(a) : g.validPositions[a].input
                }

                function P(a, c, d, g, e) {
                    if (g && f.isFunction(k.onBeforeWrite)) {
                        var l = k.onBeforeWrite.call(Y, g, c, d, k);
                        if (l) {
                            if (l.refreshFromBuffer) {
                                var r = l.refreshFromBuffer;
                                C(!0 === r ? r : r.start, r.end, l.buffer || c);
                                c = A(!0)
                            }
                            d !== b && (d = l.caret !== b ? l.caret : d)
                        }
                    }
                    a !== b && (a.inputmask._valueSet(c.join("")), d === b || g !== b && "blur" === g.type ? sa(a, d, 0 === c.length) : O && g && "input" === g.type ? setTimeout(function() {
                        I(a,
                            d)
                    }, 0) : I(a, d), !0 === e && (ma = !0, f(a).trigger("input")))
                }

                function N(a, c, d) {
                    if ((c = c || E(a).match).placeholder !== b || !0 === d) return f.isFunction(c.placeholder) ? c.placeholder(k) : c.placeholder;
                    if (null === c.fn) {
                        if (-1 < a && g.validPositions[a] === b) {
                            var l;
                            d = v(a);
                            var r = [];
                            if (d.length > 1 + ("" === d[d.length - 1].match.def ? 1 : 0))
                                for (var e = 0; e < d.length; e++)
                                    if (!0 !== d[e].match.optionality && !0 !== d[e].match.optionalQuantifier && (null === d[e].match.fn || l === b || !1 !== d[e].match.fn.test(l.match.def, g, a, !0, k)) && (r.push(d[e]), null === d[e].match.fn &&
                                            (l = d[e]), 1 < r.length && /[0-9a-bA-Z]/.test(r[0].match.def))) return k.placeholder.charAt(a % k.placeholder.length)
                        }
                        return c.def
                    }
                    return k.placeholder.charAt(a % k.placeholder.length)
                }

                function ea(a, c, e, t, S) {
                    var l = t.slice(),
                        r = "",
                        u = -1,
                        z = b;
                    if (F(), e || !0 === k.autoUnmask) u = L(u);
                    else {
                        t = w().slice(0, L(-1)).join("");
                        var q = l.join("").match(new RegExp("^" + d.escapeRegex(t), "g"));
                        q && 0 < q.length && (l.splice(0, q.length * t.length), u = L(u))
                    }
                    if (-1 === u ? (g.p = L(u), u = 0) : g.p = u, f.each(l, function(c, d) {
                            if (d !== b)
                                if (g.validPositions[c] === b &&
                                    l[c] === N(c) && R(c, !0) && !1 === W(c, l[c], !0, b, b, !0)) g.p++;
                                else {
                                    var h = new f.Event("_checkval");
                                    h.which = d.charCodeAt(0);
                                    r += d;
                                    d = G(b, !0);
                                    var t = g.validPositions[d];
                                    t = T(d + 1, t ? t.locator.slice() : b, d);
                                    var D = u,
                                        q = r; - 1 === w().slice(D, L(D)).join("").indexOf(q) || R(D) || E(D).match.nativeDef !== q.charAt(q.length - 1) || e || k.autoUnmask ? (c = e ? c : null == t.match.fn && t.match.optionality && d + 1 < g.p ? d + 1 : g.p, z = M.keypressEvent.call(a, h, !0, !1, e, c), u = c + 1, r = "") : z = M.keypressEvent.call(a, h, !0, !1, !0, d + 1);
                                    !1 !== z && !e && f.isFunction(k.onBeforeWrite) &&
                                        (c = z, z = k.onBeforeWrite.call(Y, h, A(), z.forwardPosition, k), (z = f.extend(c, z)) && z.refreshFromBuffer) && (h = z.refreshFromBuffer, C(!0 === h ? h : h.start, h.end, z.buffer), F(!0), z.caret && (g.p = z.caret, z.forwardPosition = z.caret))
                                }
                        }), c) c = b, h.activeElement === a && z && (c = k.numericInput ? da(z.forwardPosition) : z.forwardPosition), P(a, A(), c, S || new f.Event("checkval"), S && "input" === S.type)
                }

                function za(a) {
                    if (a) {
                        if (a.inputmask === b) return a.value;
                        a.inputmask && a.inputmask.refreshValue && M.setValueEvent.call(a)
                    }
                    a = [];
                    var c = g.validPositions;
                    for (d in c) c[d].match && null != c[d].match.fn && a.push(c[d].input);
                    var d = 0 === a.length ? "" : (K ? a.reverse() : a).join("");
                    f.isFunction(k.onUnMask) && (a = (K ? A().slice().reverse() : A()).join(""), d = k.onUnMask.call(Y, a, d, k));
                    return d
                }

                function I(a, d, g, e) {
                    function l(a) {
                        return !0 === e || !K || "number" != typeof a || k.greedy && "" === k.placeholder || (a = A().join("").length - a), a
                    }
                    var f;
                    if (d === b) return a.setSelectionRange ? (d = a.selectionStart, g = a.selectionEnd) : c.getSelection ? (f = c.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !==
                        a && f.commonAncestorContainer !== a || (d = f.startOffset, g = f.endOffset) : h.selection && h.selection.createRange && (g = (d = 0 - (f = h.selection.createRange()).duplicate().moveStart("character", -a.inputmask._valueGet().length)) + f.text.length), {
                            begin: l(d),
                            end: l(g)
                        };
                    if (d.begin !== b && (g = d.end, d = d.begin), "number" == typeof d) {
                        d = l(d);
                        g = "number" == typeof(g = l(g)) ? g : d;
                        var r = parseInt(((a.ownerDocument.defaultView || c).getComputedStyle ? (a.ownerDocument.defaultView || c).getComputedStyle(a, null) : a.currentStyle).fontSize) * g;
                        if (a.scrollLeft =
                            r > a.scrollWidth ? r : 0, m || !1 !== k.insertMode || d !== g || g++, a.setSelectionRange) a.selectionStart = d, a.selectionEnd = g;
                        else if (c.getSelection) {
                            if (f = h.createRange(), a.firstChild === b || null === a.firstChild) r = h.createTextNode(""), a.appendChild(r);
                            f.setStart(a.firstChild, d < a.inputmask._valueGet().length ? d : a.inputmask._valueGet().length);
                            f.setEnd(a.firstChild, g < a.inputmask._valueGet().length ? g : a.inputmask._valueGet().length);
                            f.collapse(!0);
                            r = c.getSelection();
                            r.removeAllRanges();
                            r.addRange(f)
                        } else a.createTextRange &&
                            ((f = a.createTextRange()).collapse(!0), f.moveEnd("character", g), f.moveStart("character", d), f.select());
                        sa(a, {
                            begin: d,
                            end: g
                        })
                    }
                }

                function ta(a) {
                    var c, d, k = A(),
                        l = k.length,
                        e = G(),
                        h = {},
                        t = g.validPositions[e],
                        q = t !== b ? t.locator.slice() : b;
                    for (c = e + 1; c < k.length; c++) q = (d = T(c, q, c - 1)).locator.slice(), h[c] = f.extend(!0, {}, d);
                    q = t && t.alternation !== b ? t.locator[t.alternation] : b;
                    for (c = l - 1; c > e && ((d = h[c]).match.optionality || d.match.optionalQuantifier && d.match.newBlockMarker || q && (q !== h[c].locator[t.alternation] && null != d.match.fn ||
                            null === d.match.fn && d.locator[t.alternation] && pa(d.locator[t.alternation].toString().split(","), q.toString().split(",")) && "" !== v(c)[0].def)) && k[c] === N(c, d.match); c--) l--;
                    return a ? {
                        l: l,
                        def: h[l] ? h[l].match : b
                    } : l
                }

                function ja(a) {
                    for (var c, d = ta(), l = a.length, e = g.validPositions[G()]; d < l && !R(d, !0) && (c = e !== b ? T(d, e.locator.slice(""), e) : E(d)) && !0 !== c.match.optionality && (!0 !== c.match.optionalQuantifier && !0 !== c.match.newBlockMarker || d + 1 === l && "" === (e !== b ? T(d + 1, e.locator.slice(""), e) : E(d + 1)).match.def);) d++;
                    for (;
                        (c =
                            g.validPositions[d - 1]) && c && c.match.optionality && c.input === k.skipOptionalPartCharacter;) d--;
                    return a.splice(d), a
                }

                function fa(a) {
                    if (f.isFunction(k.isComplete)) return k.isComplete(a, k);
                    if ("*" === k.repeat) return b;
                    var c = !1,
                        d = ta(!0),
                        e = da(d.l);
                    if (d.def === b || d.def.newBlockMarker || d.def.optionality || d.def.optionalQuantifier)
                        for (c = !0, d = 0; d <= e; d++) {
                            var l = T(d).match;
                            if (null !== l.fn && g.validPositions[d] === b && !0 !== l.optionality && !0 !== l.optionalQuantifier || null === l.fn && a[d] !== N(d, l)) {
                                c = !1;
                                break
                            }
                        }
                    return c
                }

                function ra(a,
                    c, e, h, t) {
                    if ((k.numericInput || K) && (c === d.keyCode.BACKSPACE ? c = d.keyCode.DELETE : c === d.keyCode.DELETE && (c = d.keyCode.BACKSPACE), K)) {
                        var l = e.end;
                        e.end = e.begin;
                        e.begin = l
                    }
                    c === d.keyCode.BACKSPACE && (1 > e.end - e.begin || !1 === k.insertMode) ? (e.begin = da(e.begin), g.validPositions[e.begin] !== b && g.validPositions[e.begin].input === k.groupSeparator && e.begin--) : c === d.keyCode.DELETE && e.begin === e.end && (e.end = R(e.end, !0) && g.validPositions[e.end] && g.validPositions[e.end].input !== k.radixPoint ? e.end + 1 : L(e.end) + 1, g.validPositions[e.begin] !==
                        b && g.validPositions[e.begin].input === k.groupSeparator && e.end++);
                    H(e.begin, e.end, !1, h);
                    if (!0 !== h && k.keepStatic) {
                        c = [];
                        l = G(-1, !0);
                        for (var u = f.extend(!0, {}, g.validPositions), r = g.validPositions[l]; 0 <= l; l--) {
                            var q = g.validPositions[l];
                            if (q) {
                                if (!0 !== q.generatedInput && /[0-9a-bA-Z]/.test(q.input) && c.push(q.input), delete g.validPositions[l], q.alternation !== b && q.locator[q.alternation] !== r.locator[q.alternation]) break;
                                r = q
                            }
                        }
                        if (-1 < l)
                            for (g.p = L(G(-1, !0)); 0 < c.length;) l = new f.Event("keypress"), l.which = c.pop().charCodeAt(0),
                                M.keypressEvent.call(a, l, !0, !1, !1, g.p);
                        else g.validPositions = f.extend(!0, {}, u)
                    }
                    a = G(e.begin, !0);
                    if (a < e.begin) g.p = L(a);
                    else if (!0 !== h && (g.p = e.begin, !0 !== t))
                        for (; g.p < a && g.validPositions[g.p] === b;) g.p++
                }

                function Aa(a) {
                    var b = (a.ownerDocument.defaultView || c).getComputedStyle(a, null),
                        d = h.createElement("div");
                    d.style.width = b.width;
                    d.style.textAlign = b.textAlign;
                    (ia = h.createElement("div")).className = "im-colormask";
                    a.parentNode.insertBefore(ia, a);
                    a.parentNode.removeChild(a);
                    ia.appendChild(d);
                    ia.appendChild(a);
                    a.style.left = d.offsetLeft + "px";
                    f(a).on("click", function(c) {
                        var d = I,
                            k = c.clientX;
                        var e = h.createElement("span");
                        for (t in b) isNaN(t) && -1 !== t.indexOf("font") && (e.style[t] = b[t]);
                        e.style.textTransform = b.textTransform;
                        e.style.letterSpacing = b.letterSpacing;
                        e.style.position = "absolute";
                        e.style.height = "auto";
                        e.style.width = "auto";
                        e.style.visibility = "hidden";
                        e.style.whiteSpace = "nowrap";
                        h.body.appendChild(e);
                        var g, l = a.inputmask._valueGet(),
                            f = 0;
                        var t = 0;
                        for (g = l.length; t <= g; t++) {
                            if (e.innerHTML += l.charAt(t) || "_", e.offsetWidth >=
                                k) {
                                g = k - f;
                                k = e.offsetWidth - k;
                                e.innerHTML = l.charAt(t);
                                t = g - e.offsetWidth / 3 < k ? t - 1 : t;
                                break
                            }
                            f = e.offsetWidth
                        }
                        e = (h.body.removeChild(e), t);
                        return d(a, e), M.clickEvent.call(a, [c])
                    });
                    f(a).on("keydown", function(b) {
                        b.shiftKey || !1 === k.insertMode || setTimeout(function() {
                            sa(a)
                        }, 0)
                    })
                }

                function sa(a, c, d) {
                    function e() {
                        q || null !== l.fn && t.input !== b ? q && (null !== l.fn && t.input !== b || "" === l.def) && (q = !1, r += "</span>") : (q = !0, r += "<span class='im-static'>")
                    }

                    function f(b) {
                        !0 !== b && n !== c.begin || h.activeElement !== a || (r += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>")
                    }
                    var l, t, u, r = "",
                        q = !1,
                        n = 0;
                    if (ia !== b) {
                        var F = A();
                        if (c === b ? c = I(a) : c.begin === b && (c = {
                                begin: c,
                                end: c
                            }), !0 !== d) {
                            d = G();
                            do f(), g.validPositions[n] ? (t = g.validPositions[n], l = t.match, u = t.locator.slice(), e(), r += F[n]) : (t = T(n, u, n - 1), l = t.match, u = t.locator.slice(), (!1 === k.jitMasking || n < d || "number" == typeof k.jitMasking && isFinite(k.jitMasking) && k.jitMasking > n) && (e(), r += N(n, l))), n++; while ((ba === b || n < ba) && (null !== l.fn || "" !== l.def) || d > n || q); - 1 === r.indexOf("im-caret") && f(!0);
                            q && e()
                        }
                        u = ia.getElementsByTagName("div")[0];
                        u.innerHTML =
                            r;
                        a.inputmask.positionColorMask(a, u)
                    }
                }
                g = g || this.maskset;
                k = k || this.opts;
                var V, ba, ia, Y = this,
                    y = this.el,
                    K = this.isRTL,
                    ua = !1,
                    ma = !1,
                    va = !1,
                    na = !1,
                    J = {
                        on: function(a, c, e) {
                            var g = function(a) {
                                if (this.inputmask === b && "FORM" !== this.nodeName) {
                                    var c = f.data(this, "_inputmask_opts");
                                    c ? (new d(c)).mask(this) : J.off(this)
                                } else {
                                    if ("setvalue" === a.type || "FORM" === this.nodeName || !this.disabled && (!this.readOnly || "keydown" === a.type && a.ctrlKey && 67 === a.keyCode || !1 === k.tabThrough && a.keyCode === d.keyCode.TAB)) {
                                        switch (a.type) {
                                            case "input":
                                                if (!0 ===
                                                    ma) return ma = !1, a.preventDefault();
                                                break;
                                            case "keydown":
                                                ma = ua = !1;
                                                break;
                                            case "keypress":
                                                if (!0 === ua) return a.preventDefault();
                                                ua = !0;
                                                break;
                                            case "click":
                                                if (x || n) {
                                                    var g = this,
                                                        l = arguments;
                                                    return setTimeout(function() {
                                                        e.apply(g, l)
                                                    }, 0), !1
                                                }
                                        }
                                        c = e.apply(this, arguments);
                                        return !1 === c && (a.preventDefault(), a.stopPropagation()), c
                                    }
                                    a.preventDefault()
                                }
                            };
                            a.inputmask.events[c] = a.inputmask.events[c] || [];
                            a.inputmask.events[c].push(g); - 1 !== f.inArray(c, ["submit", "reset"]) ? null !== a.form && f(a.form).on(c, g) : f(a).on(c, g)
                        },
                        off: function(a,
                            b) {
                            if (a.inputmask && a.inputmask.events) {
                                var c;
                                b ? (c = [])[b] = a.inputmask.events[b] : c = a.inputmask.events;
                                f.each(c, function(b, c) {
                                    for (; 0 < c.length;) {
                                        var d = c.pop(); - 1 !== f.inArray(b, ["submit", "reset"]) ? null !== a.form && f(a.form).off(b, d) : f(a).off(b, d)
                                    }
                                    delete a.inputmask.events[b]
                                })
                            }
                        }
                    },
                    M = {
                        keydownEvent: function(a) {
                            var b = this,
                                c = f(b),
                                e = a.keyCode,
                                l = I(b);
                            e === d.keyCode.BACKSPACE || e === d.keyCode.DELETE || n && e === d.keyCode.BACKSPACE_SAFARI || a.ctrlKey && e === d.keyCode.X && ! function(a) {
                                    var b = h.createElement("input");
                                    a = "on" + a;
                                    var c = a in b;
                                    return c || (b.setAttribute(a, "return;"), c = "function" == typeof b[a]), c
                                }("cut") ? (a.preventDefault(), ra(b, e, l), P(b, A(!0), g.p, a, b.inputmask._valueGet() !== A().join("")), b.inputmask._valueGet() === w().join("") ? c.trigger("cleared") : !0 === fa(A()) && c.trigger("complete")) : e === d.keyCode.END || e === d.keyCode.PAGE_DOWN ? (a.preventDefault(), c = L(G()), k.insertMode || c !== g.maskLength || a.shiftKey || c--, I(b, a.shiftKey ? l.begin : c, c, !0)) : e === d.keyCode.HOME && !a.shiftKey || e === d.keyCode.PAGE_UP ? (a.preventDefault(), I(b,
                                    0, a.shiftKey ? l.begin : 0, !0)) : (k.undoOnEscape && e === d.keyCode.ESCAPE || 90 === e && a.ctrlKey) && !0 !== a.altKey ? (ea(b, !0, !1, V.split("")), c.trigger("click")) : e !== d.keyCode.INSERT || a.shiftKey || a.ctrlKey ? !0 === k.tabThrough && e === d.keyCode.TAB ? (!0 === a.shiftKey ? (null === E(l.begin).match.fn && (l.begin = L(l.begin)), l.end = da(l.begin, !0), l.begin = da(l.end, !0)) : (l.begin = L(l.begin, !0), l.end = L(l.begin, !0), l.end < g.maskLength && l.end--), l.begin < g.maskLength && (a.preventDefault(), I(b, l.begin, l.end))) : a.shiftKey || !1 === k.insertMode &&
                                (e === d.keyCode.RIGHT ? setTimeout(function() {
                                    var a = I(b);
                                    I(b, a.begin)
                                }, 0) : e === d.keyCode.LEFT && setTimeout(function() {
                                    var a = I(b);
                                    I(b, K ? a.begin + 1 : a.begin - 1)
                                }, 0)) : (k.insertMode = !k.insertMode, I(b, k.insertMode || l.begin !== g.maskLength ? l.begin : l.begin - 1));
                            k.onKeyDown.call(this, a, A(), I(b).begin, k);
                            va = -1 !== f.inArray(e, k.ignorables)
                        },
                        keypressEvent: function(a, c, e, h, t) {
                            var l = this,
                                q = f(l),
                                r = a.which || a.charCode || a.keyCode;
                            if (!(!0 === c || a.ctrlKey && a.altKey) && (a.ctrlKey || a.metaKey || va)) return r === d.keyCode.ENTER && V !==
                                A().join("") && (V = A().join(""), setTimeout(function() {
                                    q.trigger("change")
                                }, 0)), !0;
                            if (r) {
                                46 === r && !1 === a.shiftKey && "" !== k.radixPoint && (r = k.radixPoint.charCodeAt(0));
                                var n;
                                t = c ? {
                                    begin: t,
                                    end: t
                                } : I(l);
                                var u = String.fromCharCode(r);
                                g.writeOutBuffer = !0;
                                var m = W(t, u, h);
                                if (!1 !== m && (F(!0), n = m.caret !== b ? m.caret : c ? m.pos + 1 : L(m.pos), g.p = n), !1 !== e && (setTimeout(function() {
                                        k.onKeyValidation.call(l, r, m, k)
                                    }, 0), g.writeOutBuffer && !1 !== m)) {
                                    var z = A();
                                    P(l, z, k.numericInput && m.caret === b ? da(n) : n, a, !0 !== c);
                                    !0 !== c && setTimeout(function() {
                                        !0 ===
                                            fa(z) && q.trigger("complete")
                                    }, 0)
                                }
                                if (a.preventDefault(), c) return !1 !== m && (m.forwardPosition = n), m
                            }
                        },
                        pasteEvent: function(a) {
                            var b, d = a.originalEvent || a,
                                e = f(this),
                                g = this.inputmask._valueGet(!0),
                                l = I(this);
                            K && (b = l.end, l.end = l.begin, l.begin = b);
                            var h = g.substr(0, l.begin);
                            g = g.substr(l.end, g.length);
                            if (h === (K ? w().reverse() : w()).slice(0, l.begin).join("") && (h = ""), g === (K ? w().reverse() : w()).slice(l.end).join("") && (g = ""), K && (b = h, h = g, g = b), c.clipboardData && c.clipboardData.getData) g = h + c.clipboardData.getData("Text") +
                                g;
                            else {
                                if (!d.clipboardData || !d.clipboardData.getData) return !0;
                                g = h + d.clipboardData.getData("text/plain") + g
                            }
                            b = g;
                            if (f.isFunction(k.onBeforePaste)) {
                                if (!1 === (b = k.onBeforePaste.call(Y, g, k))) return a.preventDefault();
                                b || (b = g)
                            }
                            return ea(this, !1, !1, K ? b.split("").reverse() : b.toString().split("")), P(this, A(), L(G()), a, V !== A().join("")), !0 === fa(A()) && e.trigger("complete"), a.preventDefault()
                        },
                        inputFallBackEvent: function(a) {
                            var b = this,
                                c = b.inputmask._valueGet();
                            if (A().join("") !== c) {
                                var e = I(b);
                                if (!1 === function(a,
                                        b, c) {
                                        if ("." === b.charAt(c.begin - 1) && "" !== k.radixPoint && ((b = b.split(""))[c.begin - 1] = k.radixPoint.charAt(0), b = b.join("")), b.charAt(c.begin - 1) === k.radixPoint && b.length > A().length) return b = new f.Event("keypress"), b.which = k.radixPoint.charCodeAt(0), M.keypressEvent.call(a, b, !0, !0, !1, c.begin - 1), !1
                                    }(b, c, e) || (c = c.replace(new RegExp("(" + d.escapeRegex(w().join("")) + ")*"), ""), !1 === function(a, b, c) {
                                        if (x && (b = b.replace(A().join(""), ""), 1 === b.length)) {
                                            var d = new f.Event("keypress");
                                            return d.which = b.charCodeAt(0), M.keypressEvent.call(a,
                                                d, !0, !0, !1, g.validPositions[c.begin - 1] ? c.begin : c.begin - 1), !1
                                        }
                                    }(b, c, e))) return !1;
                                e.begin > c.length && (I(b, c.length), e = I(b));
                                var l = A().join(""),
                                    h = c.substr(0, e.begin);
                                c = c.substr(e.begin);
                                var t = l.substr(0, e.begin);
                                l = l.substr(e.begin);
                                var q = "",
                                    n = !1;
                                if (h !== t) {
                                    e.begin = 0;
                                    for (var m = (n = h.length >= t.length) ? h.length : t.length, F = 0; h.charAt(F) === t.charAt(F) && F < m; F++) e.begin++;
                                    n && (q += h.slice(e.begin, e.end))
                                }
                                c !== l && (c.length > l.length ? n && (e.end = e.begin) : c.length < l.length ? e.end += l.length - c.length : c.charAt(0) !== l.charAt(0) &&
                                    e.end++);
                                P(b, A(), e);
                                0 < q.length ? f.each(q.split(""), function(a, c) {
                                    a = new f.Event("keypress");
                                    a.which = c.charCodeAt(0);
                                    va = !1;
                                    M.keypressEvent.call(b, a)
                                }) : (e.begin === e.end - 1 && I(b, da(e.begin + 1), e.end), a.keyCode = d.keyCode.DELETE, M.keydownEvent.call(b, a));
                                a.preventDefault()
                            }
                        },
                        setValueEvent: function(a) {
                            this.inputmask.refreshValue = !1;
                            a = this.inputmask._valueGet(!0);
                            f.isFunction(k.onBeforeMask) && (a = k.onBeforeMask.call(Y, a, k) || a);
                            a = a.split("");
                            ea(this, !0, !1, K ? a.reverse() : a);
                            V = A().join("");
                            (k.clearMaskOnLostFocus ||
                                k.clearIncomplete) && this.inputmask._valueGet() === w().join("") && this.inputmask._valueSet("")
                        },
                        focusEvent: function(a) {
                            var b = this.inputmask._valueGet();
                            k.showMaskOnFocus && (!k.showMaskOnHover || k.showMaskOnHover && "" === b) && (this.inputmask._valueGet() !== A().join("") ? P(this, A(), L(G())) : !1 === na && I(this, L(G())));
                            !0 === k.positionCaretOnTab && !1 === na && "" !== b && (P(this, A(), I(this)), M.clickEvent.apply(this, [a, !0]));
                            V = A().join("")
                        },
                        mouseleaveEvent: function(a) {
                            if (na = !1, k.clearMaskOnLostFocus && h.activeElement !== this) {
                                a =
                                    A().slice();
                                var b = this.inputmask._valueGet();
                                b !== this.getAttribute("placeholder") && "" !== b && (-1 === G() && b === w().join("") ? a = [] : ja(a), P(this, a))
                            }
                        },
                        clickEvent: function(a, c) {
                            function d(a) {
                                if ("" !== k.radixPoint) {
                                    var c = g.validPositions;
                                    if (c[a] === b || c[a].input === N(a)) {
                                        if (a < L(-1)) return !0;
                                        a = f.inArray(k.radixPoint, A());
                                        if (-1 !== a) {
                                            for (var d in c)
                                                if (a < d && c[d].input !== N(d)) return !1;
                                            return !0
                                        }
                                    }
                                }
                                return !1
                            }
                            var e = this;
                            setTimeout(function() {
                                if (h.activeElement === e) {
                                    var a = I(e);
                                    if (c && (K ? a.end = a.begin : a.begin = a.end), a.begin ===
                                        a.end) switch (k.positionCaretOnClick) {
                                        case "none":
                                            break;
                                        case "radixFocus":
                                            if (d(a.begin)) {
                                                a = A().join("").indexOf(k.radixPoint);
                                                I(e, k.numericInput ? L(a) : a);
                                                break
                                            }
                                        default:
                                            a = a.begin;
                                            var f = G(a, !0),
                                                l = L(f);
                                            if (a < l) I(e, R(a, !0) || R(a - 1, !0) ? a : L(a));
                                            else {
                                                f = g.validPositions[f];
                                                f = T(l, f ? f.match.locator : b, f);
                                                var t = N(l, f.match);
                                                if ("" !== t && A()[l] !== t && !0 !== f.match.optionalQuantifier && !0 !== f.match.newBlockMarker || !R(l, !0) && f.match.def === t) f = L(l), (a >= f || a === l) && (l = f);
                                                I(e, l)
                                            }
                                    }
                                }
                            }, 0)
                        },
                        dblclickEvent: function(a) {
                            var b = this;
                            setTimeout(function() {
                                I(b, 0, L(G()))
                            }, 0)
                        },
                        cutEvent: function(a) {
                            var b = f(this),
                                e = I(this),
                                k = a.originalEvent || a;
                            k = c.clipboardData || k.clipboardData;
                            var l = K ? A().slice(e.end, e.begin) : A().slice(e.begin, e.end);
                            k.setData("text", K ? l.reverse().join("") : l.join(""));
                            h.execCommand && h.execCommand("copy");
                            ra(this, d.keyCode.DELETE, e);
                            P(this, A(), g.p, a, V !== A().join(""));
                            this.inputmask._valueGet() === w().join("") && b.trigger("cleared")
                        },
                        blurEvent: function(a) {
                            var c = f(this);
                            if (this.inputmask) {
                                var d = this.inputmask._valueGet(),
                                    e = A().slice();
                                "" !== d && (k.clearMaskOnLostFocus && (-1 === G() && d === w().join("") ? e = [] : ja(e)), !1 === fa(e) && (setTimeout(function() {
                                    c.trigger("incomplete")
                                }, 0), k.clearIncomplete && (F(), e = k.clearMaskOnLostFocus ? [] : w().slice())), P(this, e, b, a));
                                V !== A().join("") && (V = e.join(""), c.trigger("change"))
                            }
                        },
                        mouseenterEvent: function(a) {
                            na = !0;
                            h.activeElement !== this && k.showMaskOnHover && this.inputmask._valueGet() !== A().join("") && P(this, A())
                        },
                        submitEvent: function(a) {
                            V !== A().join("") && wa.trigger("change");
                            k.clearMaskOnLostFocus &&
                                -1 === G() && y.inputmask._valueGet && y.inputmask._valueGet() === w().join("") && y.inputmask._valueSet("");
                            k.removeMaskOnSubmit && (y.inputmask._valueSet(y.inputmask.unmaskedvalue(), !0), setTimeout(function() {
                                P(y, A())
                            }, 0))
                        },
                        resetEvent: function(a) {
                            y.inputmask.refreshValue = !0;
                            setTimeout(function() {
                                wa.trigger("setvalue")
                            }, 0)
                        }
                    };
                d.prototype.positionColorMask = function(a, b) {
                    a.style.left = b.offsetLeft + "px"
                };
                var Q;
                if (a !== b) switch (a.action) {
                    case "isComplete":
                        return y = a.el, fa(A());
                    case "unmaskedvalue":
                        return y !== b && a.value ===
                            b || (Q = a.value, Q = (f.isFunction(k.onBeforeMask) ? k.onBeforeMask.call(Y, Q, k) || Q : Q).split(""), ea(b, !1, !1, K ? Q.reverse() : Q), f.isFunction(k.onBeforeWrite) && k.onBeforeWrite.call(Y, b, A(), 0, k)), za(y);
                    case "mask":
                        ! function(a) {
                            J.off(a);
                            var c = function(a, c) {
                                var d = a.getAttribute("type"),
                                    e = "INPUT" === a.tagName && -1 !== f.inArray(d, c.supportsInputType) || a.isContentEditable || "TEXTAREA" === a.tagName;
                                if (!e)
                                    if ("INPUT" === a.tagName) {
                                        var k = h.createElement("input");
                                        k.setAttribute("type", d);
                                        e = "text" === k.type;
                                        k = null
                                    } else e = "partial";
                                return !1 !== e ? function(a) {
                                    function d() {
                                        return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== G() || !0 !== c.nullable ? h.activeElement === this && c.clearMaskOnLostFocus ? (K ? ja(A().slice()).reverse() : ja(A().slice())).join("") : k.call(this) : "" : k.call(this)
                                    }

                                    function e(a) {
                                        g.call(this, a);
                                        this.inputmask && f(this).trigger("setvalue")
                                    }
                                    var k, g;
                                    if (!a.inputmask.__valueGet) {
                                        if (!0 !== c.noValuePatching) {
                                            if (Object.getOwnPropertyDescriptor) {
                                                "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf =
                                                    "object" === B("test".__proto__) ? function(a) {
                                                        return a.__proto__
                                                    } : function(a) {
                                                        return a.constructor.prototype
                                                    });
                                                var l = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(a), "value") : b;
                                                l && l.get && l.set ? (k = l.get, g = l.set, Object.defineProperty(a, "value", {
                                                    get: d,
                                                    set: e,
                                                    configurable: !0
                                                })) : "INPUT" !== a.tagName && (k = function() {
                                                    return this.textContent
                                                }, g = function(a) {
                                                    this.textContent = a
                                                }, Object.defineProperty(a, "value", {
                                                    get: d,
                                                    set: e,
                                                    configurable: !0
                                                }))
                                            } else h.__lookupGetter__ && a.__lookupGetter__("value") &&
                                                (k = a.__lookupGetter__("value"), g = a.__lookupSetter__("value"), a.__defineGetter__("value", d), a.__defineSetter__("value", e));
                                            a.inputmask.__valueGet = k;
                                            a.inputmask.__valueSet = g
                                        }
                                        a.inputmask._valueGet = function(a) {
                                            return K && !0 !== a ? k.call(this.el).split("").reverse().join("") : k.call(this.el)
                                        };
                                        a.inputmask._valueSet = function(a, c) {
                                            g.call(this.el, null === a || a === b ? "" : !0 !== c && K ? a.split("").reverse().join("") : a)
                                        };
                                        k === b && (k = function() {
                                            return this.value
                                        }, g = function(a) {
                                            this.value = a
                                        }, function(a) {
                                            if (f.valHooks && (f.valHooks[a] ===
                                                    b || !0 !== f.valHooks[a].inputmaskpatch)) {
                                                var d = f.valHooks[a] && f.valHooks[a].get ? f.valHooks[a].get : function(a) {
                                                        return a.value
                                                    },
                                                    e = f.valHooks[a] && f.valHooks[a].set ? f.valHooks[a].set : function(a, b) {
                                                        return a.value = b, a
                                                    };
                                                f.valHooks[a] = {
                                                    get: function(a) {
                                                        if (a.inputmask) {
                                                            if (a.inputmask.opts.autoUnmask) return a.inputmask.unmaskedvalue();
                                                            var e = d(a);
                                                            return -1 !== G(b, b, a.inputmask.maskset.validPositions) || !0 !== c.nullable ? e : ""
                                                        }
                                                        return d(a)
                                                    },
                                                    set: function(a, b) {
                                                        var c, d = f(a);
                                                        return c = e(a, b), a.inputmask && d.trigger("setvalue"),
                                                            c
                                                    },
                                                    inputmaskpatch: !0
                                                }
                                            }
                                        }(a.type), function(a) {
                                            J.on(a, "mouseenter", function(a) {
                                                a = f(this);
                                                this.inputmask._valueGet() !== A().join("") && a.trigger("setvalue")
                                            })
                                        }(a))
                                    }
                                }(a) : a.inputmask = b, e
                            }(a, k);
                            !1 !== c && (y = a, wa = f(y), -1 === (ba = y !== b ? y.maxLength : b) && (ba = b), !0 === k.colorMask && Aa(y), O && (y.hasOwnProperty("inputmode") && (y.inputmode = k.inputmode, y.setAttribute("inputmode", k.inputmode)), "rtfm" === k.androidHack && (!0 !== k.colorMask && Aa(y), y.type = "password")), !0 === c && (J.on(y, "submit", M.submitEvent), J.on(y, "reset", M.resetEvent),
                                J.on(y, "mouseenter", M.mouseenterEvent), J.on(y, "blur", M.blurEvent), J.on(y, "focus", M.focusEvent), J.on(y, "mouseleave", M.mouseleaveEvent), !0 !== k.colorMask && J.on(y, "click", M.clickEvent), J.on(y, "dblclick", M.dblclickEvent), J.on(y, "paste", M.pasteEvent), J.on(y, "dragdrop", M.pasteEvent), J.on(y, "drop", M.pasteEvent), J.on(y, "cut", M.cutEvent), J.on(y, "complete", k.oncomplete), J.on(y, "incomplete", k.onincomplete), J.on(y, "cleared", k.oncleared), O || !0 === k.inputEventOnly ? y.removeAttribute("maxLength") : (J.on(y, "keydown",
                                    M.keydownEvent), J.on(y, "keypress", M.keypressEvent)), J.on(y, "compositionstart", f.noop), J.on(y, "compositionupdate", f.noop), J.on(y, "compositionend", f.noop), J.on(y, "keyup", f.noop), J.on(y, "input", M.inputFallBackEvent), J.on(y, "beforeinput", f.noop)), J.on(y, "setvalue", M.setValueEvent), V = w().join(""), "" !== y.inputmask._valueGet(!0) || !1 === k.clearMaskOnLostFocus || h.activeElement === y) && (a = f.isFunction(k.onBeforeMask) ? k.onBeforeMask.call(Y, y.inputmask._valueGet(!0), k) || y.inputmask._valueGet(!0) : y.inputmask._valueGet(!0),
                                "" !== a && ea(y, !0, !1, K ? a.split("").reverse() : a.split("")), a = A().slice(), V = a.join(""), !1 === fa(a) && k.clearIncomplete && F(), k.clearMaskOnLostFocus && h.activeElement !== y && (-1 === G() ? a = [] : ja(a)), P(y, a), h.activeElement === y && I(y, L(G())))
                        }(y);
                        break;
                    case "format":
                        return Q = (f.isFunction(k.onBeforeMask) ? k.onBeforeMask.call(Y, a.value, k) || a.value : a.value).split(""), ea(b, !0, !1, K ? Q.reverse() : Q), a.metadata ? {
                                value: K ? A().slice().reverse().join("") : A().join(""),
                                metadata: q.call(this, {
                                    action: "getmetadata"
                                }, g, k)
                            } : K ? A().slice().reverse().join("") :
                            A().join("");
                    case "isValid":
                        a.value ? (Q = a.value.split(""), ea(b, !0, !0, K ? Q.reverse() : Q)) : a.value = A().join("");
                        Q = A();
                        for (var xa = ta(), oa = Q.length - 1; oa > xa && !R(oa); oa--);
                        return Q.splice(xa, oa + 1 - xa), fa(Q) && a.value === A().join("");
                    case "getemptymask":
                        return w().join("");
                    case "remove":
                        if (y && y.inputmask) {
                            var wa = f(y);
                            y.inputmask._valueSet(k.autoUnmask ? za(y) : y.inputmask._valueGet(!0));
                            J.off(y);
                            Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), "value") &&
                                y.inputmask.__valueGet && Object.defineProperty(y, "value", {
                                    get: y.inputmask.__valueGet,
                                    set: y.inputmask.__valueSet,
                                    configurable: !0
                                }) : h.__lookupGetter__ && y.__lookupGetter__("value") && y.inputmask.__valueGet && (y.__defineGetter__("value", y.inputmask.__valueGet), y.__defineSetter__("value", y.inputmask.__valueSet));
                            y.inputmask = b
                        }
                        return y;
                    case "getmetadata":
                        if (f.isArray(g.metadata)) {
                            var ya = e(!0, 0, !1).join("");
                            return f.each(g.metadata, function(a, b) {
                                if (b.mask === ya) return ya = b, !1
                            }), ya
                        }
                        return g.metadata
                }
            }
            var p = navigator.userAgent,
                m = /mobile/i.test(p),
                x = /iemobile/i.test(p),
                n = /iphone/i.test(p) && !x,
                O = /android/i.test(p) && !x;
            return d.prototype = {
                dataAttribute: "data-inputmask",
                defaults: {
                    placeholder: "_",
                    optionalmarker: {
                        start: "[",
                        end: "]"
                    },
                    quantifiermarker: {
                        start: "{",
                        end: "}"
                    },
                    groupmarker: {
                        start: "(",
                        end: ")"
                    },
                    alternatormarker: "|",
                    escapeChar: "\\",
                    mask: null,
                    regex: null,
                    oncomplete: f.noop,
                    onincomplete: f.noop,
                    oncleared: f.noop,
                    repeat: 0,
                    greedy: !0,
                    autoUnmask: !1,
                    removeMaskOnSubmit: !1,
                    clearMaskOnLostFocus: !0,
                    insertMode: !0,
                    clearIncomplete: !1,
                    alias: null,
                    onKeyDown: f.noop,
                    onBeforeMask: null,
                    onBeforePaste: function(a, b) {
                        return f.isFunction(b.onBeforeMask) ? b.onBeforeMask.call(this, a, b) : a
                    },
                    onBeforeWrite: null,
                    onUnMask: null,
                    showMaskOnFocus: !0,
                    showMaskOnHover: !0,
                    onKeyValidation: f.noop,
                    skipOptionalPartCharacter: " ",
                    numericInput: !1,
                    rightAlign: !1,
                    undoOnEscape: !0,
                    radixPoint: "",
                    radixPointDefinitionSymbol: b,
                    groupSeparator: "",
                    keepStatic: null,
                    positionCaretOnTab: !0,
                    tabThrough: !1,
                    supportsInputType: ["text", "tel", "password"],
                    ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38,
                        39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229
                    ],
                    isComplete: null,
                    canClearPosition: f.noop,
                    preValidation: null,
                    postValidation: null,
                    staticDefinitionSymbol: b,
                    jitMasking: !1,
                    nullable: !0,
                    inputEventOnly: !1,
                    noValuePatching: !1,
                    positionCaretOnClick: "lvp",
                    casing: null,
                    inputmode: "verbatim",
                    colorMask: !1,
                    androidHack: !1,
                    importDataAttributes: !0
                },
                definitions: {
                    9: {
                        validator: "[0-9\uff11-\uff19]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    a: {
                        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\u00c0-\u00ff\u00b5]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    "*": {
                        validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\u00c0-\u00ff\u00b5]",
                        cardinality: 1
                    }
                },
                aliases: {},
                masksCache: {},
                mask: function(n) {
                    function g(d, e, k, g) {
                        if (!0 === e.importDataAttributes) {
                            var h, t, q, n = function(a, e) {
                                    null !== (e = e !== b ? e : d.getAttribute(g + "-" + a)) && ("string" == typeof e && (0 === a.indexOf("on") ? e = c[e] : "false" === e ? e = !1 : "true" === e && (e = !0)), k[a] = e)
                                },
                                m = d.getAttribute(g);
                            if (m && "" !== m && (m = m.replace(/'/g, '"'), t = JSON.parse("{" + m + "}")), t) {
                                var F = b;
                                for (q in t)
                                    if ("alias" ===
                                        q.toLowerCase()) {
                                        F = t[q];
                                        break
                                    }
                            }
                            n("alias", F);
                            k.alias && a(k.alias, k, e);
                            for (h in e) {
                                if (t)
                                    for (q in F = b, t)
                                        if (q.toLowerCase() === h.toLowerCase()) {
                                            F = t[q];
                                            break
                                        }
                                n(h, F)
                            }
                        }
                        return f.extend(!0, e, k), ("rtl" === d.dir || e.rightAlign) && (d.style.textAlign = "right"), ("rtl" === d.dir || e.numericInput) && (d.dir = "ltr", d.removeAttribute("dir"), e.isRTL = !0), e
                    }
                    var k = this;
                    return "string" == typeof n && (n = h.getElementById(n) || h.querySelectorAll(n)), n = n.nodeName ? [n] : n, f.each(n, function(a, c) {
                        a = f.extend(!0, {}, k.opts);
                        g(c, a, f.extend(!0, {}, k.userOptions),
                            k.dataAttribute);
                        var h = e(a, k.noMasksCache);
                        h !== b && (c.inputmask !== b && (c.inputmask.opts.autoUnmask = !0, c.inputmask.remove()), c.inputmask = new d(b, b, !0), c.inputmask.opts = a, c.inputmask.noMasksCache = k.noMasksCache, c.inputmask.userOptions = f.extend(!0, {}, k.userOptions), c.inputmask.isRTL = a.isRTL || a.numericInput, c.inputmask.el = c, c.inputmask.maskset = h, f.data(c, "_inputmask_opts", a), q.call(c.inputmask, {
                            action: "mask"
                        }))
                    }), n && n[0] ? n[0].inputmask || this : this
                },
                option: function(a, b) {
                    return "string" == typeof a ? this.opts[a] :
                        "object" === (void 0 === a ? "undefined" : B(a)) ? (f.extend(this.userOptions, a), this.el && !0 !== b && this.mask(this.el), this) : void 0
                },
                unmaskedvalue: function(a) {
                    return this.maskset = this.maskset || e(this.opts, this.noMasksCache), q.call(this, {
                        action: "unmaskedvalue",
                        value: a
                    })
                },
                remove: function() {
                    return q.call(this, {
                        action: "remove"
                    })
                },
                getemptymask: function() {
                    return this.maskset = this.maskset || e(this.opts, this.noMasksCache), q.call(this, {
                        action: "getemptymask"
                    })
                },
                hasMaskedValue: function() {
                    return !this.opts.autoUnmask
                },
                isComplete: function() {
                    return this.maskset =
                        this.maskset || e(this.opts, this.noMasksCache), q.call(this, {
                            action: "isComplete"
                        })
                },
                getmetadata: function() {
                    return this.maskset = this.maskset || e(this.opts, this.noMasksCache), q.call(this, {
                        action: "getmetadata"
                    })
                },
                isValid: function(a) {
                    return this.maskset = this.maskset || e(this.opts, this.noMasksCache), q.call(this, {
                        action: "isValid",
                        value: a
                    })
                },
                format: function(a, b) {
                    return this.maskset = this.maskset || e(this.opts, this.noMasksCache), q.call(this, {
                        action: "format",
                        value: a,
                        metadata: b
                    })
                },
                analyseMask: function(a, c, e) {
                    function g(a,
                        b, c, d) {
                        this.matches = [];
                        this.openGroup = a || !1;
                        this.alternatorGroup = !1;
                        this.isGroup = a || !1;
                        this.isOptional = b || !1;
                        this.isQuantifier = c || !1;
                        this.isAlternator = d || !1;
                        this.quantifier = {
                            min: 1,
                            max: 1
                        }
                    }

                    function k(a, g, k) {
                        k = k !== b ? k : a.matches.length;
                        var h = a.matches[k - 1];
                        if (c) 0 === g.indexOf("[") || x && /\\d|\\s|\\w]/i.test(g) || "." === g ? a.matches.splice(k++, 0, {
                            fn: new RegExp(g, e.casing ? "i" : ""),
                            cardinality: 1,
                            optionality: a.isOptional,
                            newBlockMarker: h === b || h.def !== g,
                            casing: null,
                            def: g,
                            placeholder: b,
                            nativeDef: g
                        }) : (x && (g = g[g.length -
                            1]), f.each(g.split(""), function(c, d) {
                            h = a.matches[k - 1];
                            a.matches.splice(k++, 0, {
                                fn: null,
                                cardinality: 0,
                                optionality: a.isOptional,
                                newBlockMarker: h === b || h.def !== d && null !== h.fn,
                                casing: null,
                                def: e.staticDefinitionSymbol || d,
                                placeholder: e.staticDefinitionSymbol !== b ? d : b,
                                nativeDef: d
                            })
                        })), x = !1;
                        else {
                            var t = (e.definitions ? e.definitions[g] : b) || d.prototype.definitions[g];
                            if (t && !x) {
                                for (var q = t.prevalidator, n = q ? q.length : 0, m = 1; m < t.cardinality; m++) {
                                    var F = n >= m ? q[m - 1] : [],
                                        w = F.validator;
                                    F = F.cardinality;
                                    a.matches.splice(k++,
                                        0, {
                                            fn: w ? "string" == typeof w ? new RegExp(w, e.casing ? "i" : "") : new function() {
                                                this.test = w
                                            } : /./,
                                            cardinality: F || 1,
                                            optionality: a.isOptional,
                                            newBlockMarker: h === b || h.def !== (t.definitionSymbol || g),
                                            casing: t.casing,
                                            def: t.definitionSymbol || g,
                                            placeholder: t.placeholder,
                                            nativeDef: g
                                        });
                                    h = a.matches[k - 1]
                                }
                                a.matches.splice(k++, 0, {
                                    fn: t.validator ? "string" == typeof t.validator ? new RegExp(t.validator, e.casing ? "i" : "") : new function() {
                                        this.test = t.validator
                                    } : /./,
                                    cardinality: t.cardinality,
                                    optionality: a.isOptional,
                                    newBlockMarker: h ===
                                        b || h.def !== (t.definitionSymbol || g),
                                    casing: t.casing,
                                    def: t.definitionSymbol || g,
                                    placeholder: t.placeholder,
                                    nativeDef: g
                                })
                            } else a.matches.splice(k++, 0, {
                                fn: null,
                                cardinality: 0,
                                optionality: a.isOptional,
                                newBlockMarker: h === b || h.def !== g && null !== h.fn,
                                casing: null,
                                def: e.staticDefinitionSymbol || g,
                                placeholder: e.staticDefinitionSymbol !== b ? g : b,
                                nativeDef: g
                            }), x = !1
                        }
                    }

                    function h(a) {
                        a && a.matches && f.each(a.matches, function(d, g) {
                            d = a.matches[d + 1];
                            (d === b || d.matches === b || !1 === d.isQuantifier) && g && g.isGroup && (g.isGroup = !1, c || (k(g,
                                e.groupmarker.start, 0), !0 !== g.openGroup && k(g, e.groupmarker.end)));
                            h(g)
                        })
                    }

                    function q() {
                        if (0 < B.length) {
                            if (H = B[B.length - 1], k(H, w), H.isAlternator) {
                                C = B.pop();
                                for (var a = 0; a < C.matches.length; a++) C.matches[a].isGroup = !1;
                                0 < B.length ? (H = B[B.length - 1]).matches.push(C) : O.matches.push(C)
                            }
                        } else k(O, w)
                    }

                    function n(a) {
                        a.matches = a.matches.reverse();
                        for (var c in a.matches)
                            if (a.matches.hasOwnProperty(c)) {
                                var d = parseInt(c);
                                if (a.matches[c].isQuantifier && a.matches[d + 1] && a.matches[d + 1].isGroup) {
                                    var g = a.matches[c];
                                    a.matches.splice(c,
                                        1);
                                    a.matches.splice(d + 1, 0, g)
                                }
                                if (a.matches[c].matches !== b) a.matches[c] = n(a.matches[c]);
                                else {
                                    d = a.matches;
                                    g = c;
                                    var k = a.matches[c];
                                    var f = (k === e.optionalmarker.start ? k = e.optionalmarker.end : k === e.optionalmarker.end ? k = e.optionalmarker.start : k === e.groupmarker.start ? k = e.groupmarker.end : k === e.groupmarker.end && (k = e.groupmarker.start), k);
                                    d[g] = f
                                }
                            }
                        return a
                    }
                    var m, w, p, H, v, A = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                        E = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                        x = !1,
                        O = new g,
                        B = [],
                        Z = [];
                    for (c && (e.optionalmarker.start = b, e.optionalmarker.end = b); m = c ? E.exec(a) : A.exec(a);) {
                        if (w = m[0], c) switch (w.charAt(0)) {
                            case "?":
                                w = "{0,1}";
                                break;
                            case "+":
                            case "*":
                                w = "{" + w + "}"
                        }
                        if (x) q();
                        else switch (w.charAt(0)) {
                            case e.escapeChar:
                                x = !0;
                                c && q();
                                break;
                            case e.optionalmarker.end:
                            case e.groupmarker.end:
                                if (p = B.pop(), p.openGroup = !1, p !== b)
                                    if (0 < B.length) {
                                        if ((H = B[B.length - 1]).matches.push(p), H.isAlternator) {
                                            var C = B.pop();
                                            for (m = 0; m < C.matches.length; m++) C.matches[m].isGroup = !1, C.matches[m].alternatorGroup = !1;
                                            0 < B.length ? (H = B[B.length - 1]).matches.push(C) : O.matches.push(C)
                                        }
                                    } else O.matches.push(p);
                                else q();
                                break;
                            case e.optionalmarker.start:
                                B.push(new g(!1, !0));
                                break;
                            case e.groupmarker.start:
                                B.push(new g(!0));
                                break;
                            case e.quantifiermarker.start:
                                var ha = new g(!1, !1, !0),
                                    U = (w = w.replace(/[{}]/g, "")).split(","),
                                    P = isNaN(U[0]) ? U[0] : parseInt(U[0]);
                                U = 1 === U.length ? P : isNaN(U[1]) ? U[1] : parseInt(U[1]);
                                ("*" !== U && "+" !== U || (P = "*" === U ? 0 : 1), ha.quantifier = {
                                    min: P,
                                    max: U
                                }, 0 < B.length) ? (P = B[B.length - 1].matches, (m = P.pop()).isGroup ||
                                    ((v = new g(!0)).matches.push(m), m = v), P.push(m), P.push(ha)) : ((m = O.matches.pop()).isGroup || (c && null === m.fn && "." === m.def && (m.fn = new RegExp(m.def, e.casing ? "i" : "")), (v = new g(!0)).matches.push(m), m = v), O.matches.push(m), O.matches.push(ha));
                                break;
                            case e.alternatormarker:
                                0 < B.length ? (m = (H = B[B.length - 1]).matches[H.matches.length - 1], m = H.openGroup && (m.matches === b || !1 === m.isGroup && !1 === m.isAlternator) ? B.pop() : H.matches.pop()) : m = O.matches.pop();
                                if (m.isAlternator) B.push(m);
                                else if (m.alternatorGroup ? (C = B.pop(), m.alternatorGroup = !1) : C = new g(!1, !1, !1, !0), C.matches.push(m), B.push(C), m.openGroup) m.openGroup = !1, m = new g(!0), m.alternatorGroup = !0, B.push(m);
                                break;
                            default:
                                q()
                        }
                    }
                    for (; 0 < B.length;) p = B.pop(), O.matches.push(p);
                    return 0 < O.matches.length && (h(O), Z.push(O)), (e.numericInput || e.isRTL) && n(Z[0]), Z
                }
            }, d.extendDefaults = function(a) {
                f.extend(!0, d.prototype.defaults, a)
            }, d.extendDefinitions = function(a) {
                f.extend(!0, d.prototype.definitions, a)
            }, d.extendAliases = function(a) {
                f.extend(!0, d.prototype.aliases, a)
            }, d.format = function(a, b, c) {
                return d(b).format(a,
                    c)
            }, d.unmask = function(a, b) {
                return d(b).unmaskedvalue(a)
            }, d.isValid = function(a, b) {
                return d(b).isValid(a)
            }, d.remove = function(a) {
                f.each(a, function(a, b) {
                    b.inputmask && b.inputmask.remove()
                })
            }, d.escapeRegex = function(a) {
                return a.replace(/(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\$|\^)/gim, "\\$1")
            }, d.keyCode = {
                ALT: 18,
                BACKSPACE: 8,
                BACKSPACE_SAFARI: 127,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91,
                X: 88
            }, d
        })
    }, function(C, x) {
        C.exports = jQuery
    }, function(C, x, m) {
        function p(m) {
            return m && m.__esModule ? m : {
                default: m
            }
        }
        m(4);
        m(9);
        m(12);
        m(13);
        m(14);
        m(15);
        C = p(m(1));
        x = p(m(0));
        var v = p(m(2));
        x.default === v.default && m(16);
        window.Inputmask = C.default
    }, function(C, x, m) {
        x = m(5);
        "string" == typeof x && (x = [
            [C.i, x, ""]
        ]);
        m(7)(x, {
            hmr: !0,
            transform: void 0
        });
        x.locals && (C.exports = x.locals)
    }, function(C, x, m) {
        (C.exports = m(6)(void 0)).push([C.i, "span.im-caret {\r\n    -webkit-animation: 1s blink step-end infinite;\r\n    animation: 1s blink step-end infinite;\r\n}\r\n\r\n@keyframes blink {\r\n    from, to {\r\n        border-right-color: black;\r\n    }\r\n    50% {\r\n        border-right-color: transparent;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes blink {\r\n    from, to {\r\n        border-right-color: black;\r\n    }\r\n    50% {\r\n        border-right-color: transparent;\r\n    }\r\n}\r\n\r\nspan.im-static {\r\n    color: grey;\r\n}\r\n\r\ndiv.im-colormask {\r\n    display: inline-block;\r\n    border-style: inset;\r\n    border-width: 2px;\r\n    -webkit-appearance: textfield;\r\n    -moz-appearance: textfield;\r\n    appearance: textfield;\r\n}\r\n\r\ndiv.im-colormask > input {\r\n    position: absolute;\r\n    display: inline-block;\r\n    background-color: transparent;\r\n    color: transparent;\r\n    -webkit-appearance: caret;\r\n    -moz-appearance: caret;\r\n    appearance: caret;\r\n    border-style: none;\r\n    left: 0; /*calculated*/\r\n}\r\n\r\ndiv.im-colormask > input:focus {\r\n    outline: none;\r\n}\r\n\r\ndiv.im-colormask > input::-moz-selection{\r\n    background: none;\r\n}\r\n\r\ndiv.im-colormask > input::selection{\r\n    background: none;\r\n}\r\ndiv.im-colormask > input::-moz-selection{\r\n    background: none;\r\n}\r\n\r\ndiv.im-colormask > div {\r\n    color: black;\r\n    display: inline-block;\r\n    width: 100px; /*calculated*/\r\n}",
            ""
        ])
    }, function(C, x) {
        function m(m, v) {
            var p = m[1] || "",
                B = m[3];
            return B ? v && "function" == typeof btoa ? (m = "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(B)))) + " */", v = B.sources.map(function(f) {
                return "/*# sourceURL=" + B.sourceRoot + f + " */"
            }), [p].concat(v).concat([m]).join("\n")) : [p].join("\n") : p
        }
        C.exports = function(p) {
            var v = [];
            return v.toString = function() {
                    return this.map(function(v) {
                        var B = m(v, p);
                        return v[2] ? "@media " + v[2] + "{" + B + "}" : B
                    }).join("")
                },
                v.i = function(m, p) {
                    "string" == typeof m && (m = [
                        [null, m, ""]
                    ]);
                    for (var f = {}, c = 0; c < this.length; c++) {
                        var h = this[c][0];
                        "number" == typeof h && (f[h] = !0)
                    }
                    for (c = 0; c < m.length; c++) h = m[c], "number" == typeof h[0] && f[h[0]] || (p && !h[2] ? h[2] = p : p && (h[2] = "(" + h[2] + ") and (" + p + ")"), v.push(h))
                }, v
        }
    }, function(C, x, m) {
        function p(a, c) {
            for (var d = 0; d < a.length; d++) {
                var e = a[d],
                    g = q[e.id];
                if (g) {
                    g.refs++;
                    for (k = 0; k < g.parts.length; k++) g.parts[k](e.parts[k]);
                    for (; k < e.parts.length; k++) g.parts.push(b(e.parts[k], c))
                } else {
                    g = [];
                    for (var k = 0; k < e.parts.length; k++) g.push(b(e.parts[k],
                        c));
                    q[e.id] = {
                        id: e.id,
                        refs: 1,
                        parts: g
                    }
                }
            }
        }

        function v(a, b) {
            for (var c = [], d = {}, e = 0; e < a.length; e++) {
                var g = a[e],
                    k = b.base ? g[0] + b.base : g[0];
                g = {
                    css: g[1],
                    media: g[2],
                    sourceMap: g[3]
                };
                d[k] ? d[k].parts.push(g) : c.push(d[k] = {
                    id: k,
                    parts: [g]
                })
            }
            return c
        }

        function E(a, b) {
            var c = Z(a.insertInto);
            if (!c) throw Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var d = O[O.length - 1];
            if ("top" === a.insertAt) d ? d.nextSibling ? c.insertBefore(b, d.nextSibling) : c.appendChild(b) :
                c.insertBefore(b, c.firstChild), O.push(b);
            else if ("bottom" === a.insertAt) c.appendChild(b);
            else {
                if ("object" != typeof a.insertAt || !a.insertAt.before) throw Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                a = Z(a.insertInto + " " + a.insertAt.before);
                c.insertBefore(b, a)
            }
        }

        function B(a) {
            if (null === a.parentNode) return !1;
            a.parentNode.removeChild(a);
            a = O.indexOf(a);
            0 <= a &&
                O.splice(a, 1)
        }

        function f(a) {
            var b = document.createElement("style");
            return a.attrs.type = "text/css", h(b, a.attrs), E(a, b), b
        }

        function c(a) {
            var b = document.createElement("link");
            return a.attrs.type = "text/css", a.attrs.rel = "stylesheet", h(b, a.attrs), E(a, b), b
        }

        function h(a, b) {
            Object.keys(b).forEach(function(c) {
                a.setAttribute(c, b[c])
            })
        }

        function b(b, g) {
            var k;
            if (g.transform && b.css) {
                if (!(k = g.transform(b.css))) return function() {};
                b.css = k
            }
            if (g.singleton) {
                k = n++;
                var h = w || (w = f(g));
                var m = d.bind(null, h, k, !1);
                var q = d.bind(null,
                    h, k, !0)
            } else b.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (h = c(g), m = e.bind(null, h, g), q = function() {
                B(h);
                h.href && URL.revokeObjectURL(h.href)
            }) : (h = f(g), m = a.bind(null, h), q = function() {
                B(h)
            });
            return m(b),
                function(a) {
                    a ? (a.css !== b.css || a.media !== b.media || a.sourceMap !== b.sourceMap) && m(b = a) : q()
                }
        }

        function d(a, b, c, d) {
            c = c ? "" : d.css;
            a.styleSheet ? a.styleSheet.cssText = g(b, c) : (c = document.createTextNode(c),
                d = a.childNodes, d[b] && a.removeChild(d[b]), d.length ? a.insertBefore(c, d[b]) : a.appendChild(c))
        }

        function a(a, b) {
            var c = b.css;
            b = b.media;
            if (b && a.setAttribute("media", b), a.styleSheet) a.styleSheet.cssText = c;
            else {
                for (; a.firstChild;) a.removeChild(a.firstChild);
                a.appendChild(document.createTextNode(c))
            }
        }

        function e(a, b, c) {
            var d = c.css;
            c = c.sourceMap;
            var e = void 0 === b.convertToAbsoluteUrls && c;
            (b.convertToAbsoluteUrls || e) && (d = H(d));
            c && (d += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(c)))) +
                " */");
            b = new Blob([d], {
                type: "text/css"
            });
            d = a.href;
            a.href = URL.createObjectURL(b);
            d && URL.revokeObjectURL(d)
        }
        var q = {},
            ha = function(a) {
                var b;
                return function() {
                    return void 0 === b && (b = a.apply(this, arguments)), b
                }
            }(function() {
                return window && document && document.all && !window.atob
            }),
            Z = function(a) {
                var b = {};
                return function(c) {
                    if (void 0 === b[c]) {
                        var d = a.call(this, c);
                        if (d instanceof window.HTMLIFrameElement) try {
                            d = d.contentDocument.head
                        } catch (Ca) {
                            d = null
                        }
                        b[c] = d
                    }
                    return b[c]
                }
            }(function(a) {
                return document.querySelector(a)
            }),
            w = null,
            n = 0,
            O = [],
            H = m(8);
        C.exports = function(a, b) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw Error("The style-loader cannot be used in a non-browser environment");
            (b = b || {}).attrs = "object" == typeof b.attrs ? b.attrs : {};
            b.singleton || (b.singleton = ha());
            b.insertInto || (b.insertInto = "head");
            b.insertAt || (b.insertAt = "bottom");
            var c = v(a, b);
            return p(c, b),
                function(a) {
                    for (var d = [], e = 0; e < c.length; e++)(g = q[c[e].id]).refs--, d.push(g);
                    a && p(v(a, b), b);
                    for (e = 0; e < d.length; e++) {
                        var g = d[e];
                        if (0 === g.refs) {
                            for (a =
                                0; a < g.parts.length; a++) g.parts[a]();
                            delete q[g.id]
                        }
                    }
                }
        };
        var g = function() {
            var a = [];
            return function(b, c) {
                return a[b] = c, a.filter(Boolean).join("\n")
            }
        }()
    }, function(C, x) {
        C.exports = function(m) {
            var p = "undefined" != typeof window && window.location;
            if (!p) throw Error("fixUrls requires window.location");
            if (!m || "string" != typeof m) return m;
            var v = p.protocol + "//" + p.host,
                x = v + p.pathname.replace(/\/[^\/]*$/, "/");
            return m.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(m, f) {
                f = f.trim().replace(/^"(.*)"$/,
                    function(c, b) {
                        return b
                    }).replace(/^'(.*)'$/, function(c, b) {
                    return b
                });
                if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(f)) return m;
                var c;
                return c = 0 === f.indexOf("//") ? f : 0 === f.indexOf("/") ? v + f : x + f.replace(/^\.\//, ""), "url(" + JSON.stringify(c) + ")"
            })
        }
    }, function(C, x, m) {
        var p, v, E;
        "function" == typeof Symbol && Symbol.iterator;
        ! function(B) {
            v = [m(0), m(1)];
            void 0 !== (E = "function" == typeof(p = B) ? p.apply(x, v) : p) && (C.exports = E)
        }(function(m, f) {
            return f.extendAliases({
                "dd/mm/yyyy": {
                    mask: "1/2/y",
                    placeholder: "dd/mm/yyyy",
                    regex: {
                        val1pre: /[0-3]/,
                        val1: /0[1-9]|[12][0-9]|3[01]/,
                        val2pre: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[1-9]|[12][0-9]|3[01])" + c + "[01])")
                        },
                        val2: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[1-9]|[12][0-9])" + c + "(0[1-9]|1[012]))|(30" + c + "(0[13-9]|1[012]))|(31" + c + "(0[13578]|1[02]))")
                        }
                    },
                    leapday: "29/02/",
                    separator: "/",
                    yearrange: {
                        minyear: 1900,
                        maxyear: 2099
                    },
                    isInYearRange: function(c, h, b) {
                        if (isNaN(c)) return !1;
                        var d = parseInt(c.concat(h.toString().slice(c.length)));
                        c = parseInt(c.concat(b.toString().slice(c.length)));
                        return !isNaN(d) && h <= d && d <= b || !isNaN(c) && h <= c && c <= b
                    },
                    determinebaseyear: function(c, h, b) {
                        var d = (new Date).getFullYear();
                        if (c > d) return c;
                        if (h < d) {
                            d = h.toString().slice(0, 2);
                            for (var a = h.toString().slice(2, 4); h < d + b;) d--;
                            h = d + a;
                            return c > h ? c : h
                        }
                        if (c <= d && d <= h) {
                            for (d = d.toString().slice(0, 2); h < d + b;) d--;
                            h = d + b;
                            return h < c ? c : h
                        }
                        return d
                    },
                    onKeyDown: function(c, h, b, d) {
                        h = m(this);
                        c.ctrlKey && c.keyCode === f.keyCode.RIGHT && (c = new Date, h.val(c.getDate().toString() + (c.getMonth() + 1).toString() + c.getFullYear().toString()), h.trigger("setvalue"))
                    },
                    getFrontValue: function(c, h, b) {
                        for (var d = 0, a = 0, e = 0; e < c.length && "2" !== c.charAt(e); e++) {
                            var f = b.definitions[c.charAt(e)];
                            f ? (d += a, a = f.cardinality) : a++
                        }
                        return h.join("").substr(d, a)
                    },
                    postValidation: function(c, f, b) {
                        var d, a;
                        c = c.join("");
                        0 === b.mask.indexOf("y") ? (a = c.substr(0, 4), d = c.substring(4, 10)) : (a = c.substring(6, 10), d = c.substr(0, 6));
                        f && ((b = d !== b.leapday) || (b = isNaN(a) || 29 === (new Date(a, 2, 0)).getDate()), f = b);
                        return f
                    },
                    definitions: {
                        1: {
                            validator: function(c, f, b, d, a) {
                                var e = a.regex.val1.test(c);
                                return d || e ||
                                    c.charAt(1) !== a.separator && -1 === "-./".indexOf(c.charAt(1)) || !(e = a.regex.val1.test("0" + c.charAt(0))) ? e : (f.buffer[b - 1] = "0", {
                                        refreshFromBuffer: {
                                            start: b - 1,
                                            end: b
                                        },
                                        pos: b,
                                        c: c.charAt(0)
                                    })
                            },
                            cardinality: 2,
                            prevalidator: [{
                                validator: function(c, f, b, d, a) {
                                    var e = c;
                                    isNaN(f.buffer[b + 1]) || (e += f.buffer[b + 1]);
                                    e = 1 === e.length ? a.regex.val1pre.test(e) : a.regex.val1.test(e);
                                    if (e && f.validPositions[b] && (a.regex.val2(a.separator).test(c + f.validPositions[b].input) || (f.validPositions[b].input = "0" === c ? "1" : "0")), !d && !e) {
                                        if (a.regex.val1.test(c +
                                                "0")) return f.buffer[b] = c, f.buffer[++b] = "0", {
                                            pos: b,
                                            c: "0"
                                        };
                                        if (e = a.regex.val1.test("0" + c)) return f.buffer[b] = "0", b++, {
                                            pos: b
                                        }
                                    }
                                    return e
                                },
                                cardinality: 1
                            }]
                        },
                        2: {
                            validator: function(c, f, b, d, a) {
                                var e = a.getFrontValue(f.mask, f.buffer, a); - 1 !== e.indexOf(a.placeholder[0]) && (e = "01" + a.separator);
                                var h = a.regex.val2(a.separator).test(e + c);
                                return d || h || c.charAt(1) !== a.separator && -1 === "-./".indexOf(c.charAt(1)) || !(h = a.regex.val2(a.separator).test(e + "0" + c.charAt(0))) ? h : (f.buffer[b - 1] = "0", {
                                    refreshFromBuffer: {
                                        start: b - 1,
                                        end: b
                                    },
                                    pos: b,
                                    c: c.charAt(0)
                                })
                            },
                            cardinality: 2,
                            prevalidator: [{
                                validator: function(c, f, b, d, a) {
                                    isNaN(f.buffer[b + 1]) || (c += f.buffer[b + 1]);
                                    var e = a.getFrontValue(f.mask, f.buffer, a); - 1 !== e.indexOf(a.placeholder[0]) && (e = "01" + a.separator);
                                    var h = 1 === c.length ? a.regex.val2pre(a.separator).test(e + c) : a.regex.val2(a.separator).test(e + c);
                                    return h && f.validPositions[b] && (a.regex.val2(a.separator).test(c + f.validPositions[b].input) || (f.validPositions[b].input = "0" === c ? "1" : "0")), d || h || !(h = a.regex.val2(a.separator).test(e + "0" + c)) ?
                                        h : (f.buffer[b] = "0", b++, {
                                            pos: b
                                        })
                                },
                                cardinality: 1
                            }]
                        },
                        y: {
                            validator: function(c, f, b, d, a) {
                                return a.isInYearRange(c, a.yearrange.minyear, a.yearrange.maxyear)
                            },
                            cardinality: 4,
                            prevalidator: [{
                                validator: function(c, f, b, d, a) {
                                    var e = a.isInYearRange(c, a.yearrange.minyear, a.yearrange.maxyear);
                                    if (!d && !e) {
                                        d = a.determinebaseyear(a.yearrange.minyear, a.yearrange.maxyear, c + "0").toString().slice(0, 1);
                                        if (a.isInYearRange(d + c, a.yearrange.minyear, a.yearrange.maxyear)) return f.buffer[b++] = d.charAt(0), {
                                            pos: b
                                        };
                                        if (d = a.determinebaseyear(a.yearrange.minyear,
                                                a.yearrange.maxyear, c + "0").toString().slice(0, 2), e = a.isInYearRange(d + c, a.yearrange.minyear, a.yearrange.maxyear)) return f.buffer[b++] = d.charAt(0), f.buffer[b++] = d.charAt(1), {
                                            pos: b
                                        }
                                    }
                                    return e
                                },
                                cardinality: 1
                            }, {
                                validator: function(c, f, b, d, a) {
                                    var e = a.isInYearRange(c, a.yearrange.minyear, a.yearrange.maxyear);
                                    if (!d && !e) {
                                        d = a.determinebaseyear(a.yearrange.minyear, a.yearrange.maxyear, c).toString().slice(0, 2);
                                        if (a.isInYearRange(c[0] + d[1] + c[1], a.yearrange.minyear, a.yearrange.maxyear)) return f.buffer[b++] = d.charAt(1), {
                                            pos: b
                                        };
                                        if (d = a.determinebaseyear(a.yearrange.minyear, a.yearrange.maxyear, c).toString().slice(0, 2), e = a.isInYearRange(d + c, a.yearrange.minyear, a.yearrange.maxyear)) return f.buffer[b - 1] = d.charAt(0), f.buffer[b++] = d.charAt(1), f.buffer[b++] = c.charAt(0), {
                                            refreshFromBuffer: {
                                                start: b - 3,
                                                end: b
                                            },
                                            pos: b
                                        }
                                    }
                                    return e
                                },
                                cardinality: 2
                            }, {
                                validator: function(c, f, b, d, a) {
                                    return a.isInYearRange(c, a.yearrange.minyear, a.yearrange.maxyear)
                                },
                                cardinality: 3
                            }]
                        }
                    },
                    insertMode: !1,
                    autoUnmask: !1
                },
                "mm/dd/yyyy": {
                    placeholder: "mm/dd/yyyy",
                    alias: "dd/mm/yyyy",
                    regex: {
                        val2pre: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])")
                        },
                        val2: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)")
                        },
                        val1pre: /[01]/,
                        val1: /0[1-9]|1[012]/
                    },
                    leapday: "02/29/",
                    onKeyDown: function(c, h, b, d) {
                        h = m(this);
                        c.ctrlKey && c.keyCode === f.keyCode.RIGHT && (c = new Date, h.val((c.getMonth() + 1).toString() + c.getDate().toString() + c.getFullYear().toString()),
                            h.trigger("setvalue"))
                    }
                },
                "yyyy/mm/dd": {
                    mask: "y/1/2",
                    placeholder: "yyyy/mm/dd",
                    alias: "mm/dd/yyyy",
                    leapday: "/02/29",
                    onKeyDown: function(c, h, b, d) {
                        h = m(this);
                        c.ctrlKey && c.keyCode === f.keyCode.RIGHT && (c = new Date, h.val(c.getFullYear().toString() + (c.getMonth() + 1).toString() + c.getDate().toString()), h.trigger("setvalue"))
                    }
                },
                "dd.mm.yyyy": {
                    mask: "1.2.y",
                    placeholder: "dd.mm.yyyy",
                    leapday: "29.02.",
                    separator: ".",
                    alias: "dd/mm/yyyy"
                },
                "dd-mm-yyyy": {
                    mask: "1-2-y",
                    placeholder: "dd-mm-yyyy",
                    leapday: "29-02-",
                    separator: "-",
                    alias: "dd/mm/yyyy"
                },
                "mm.dd.yyyy": {
                    mask: "1.2.y",
                    placeholder: "mm.dd.yyyy",
                    leapday: "02.29.",
                    separator: ".",
                    alias: "mm/dd/yyyy"
                },
                "mm-dd-yyyy": {
                    mask: "1-2-y",
                    placeholder: "mm-dd-yyyy",
                    leapday: "02-29-",
                    separator: "-",
                    alias: "mm/dd/yyyy"
                },
                "yyyy.mm.dd": {
                    mask: "y.1.2",
                    placeholder: "yyyy.mm.dd",
                    leapday: ".02.29",
                    separator: ".",
                    alias: "yyyy/mm/dd"
                },
                "yyyy-mm-dd": {
                    mask: "y-1-2",
                    placeholder: "yyyy-mm-dd",
                    leapday: "-02-29",
                    separator: "-",
                    alias: "yyyy/mm/dd"
                },
                datetime: {
                    mask: "1/2/y h:s",
                    placeholder: "dd/mm/yyyy hh:mm",
                    alias: "dd/mm/yyyy",
                    regex: {
                        hrspre: /[012]/,
                        hrs24: /2[0-4]|1[3-9]/,
                        hrs: /[01][0-9]|2[0-4]/,
                        ampm: /^[a|p|A|P][m|M]/,
                        mspre: /[0-5]/,
                        ms: /[0-5][0-9]/
                    },
                    timeseparator: ":",
                    hourFormat: "24",
                    definitions: {
                        h: {
                            validator: function(c, f, b, d, a) {
                                if ("24" === a.hourFormat && 24 === parseInt(c, 10)) return f.buffer[b - 1] = "0", f.buffer[b] = "0", {
                                    refreshFromBuffer: {
                                        start: b - 1,
                                        end: b
                                    },
                                    c: "0"
                                };
                                var e = a.regex.hrs.test(c);
                                return d || e || c.charAt(1) !== a.timeseparator && -1 === "-.:".indexOf(c.charAt(1)) || !(e = a.regex.hrs.test("0" + c.charAt(0))) ? e && "24" !== a.hourFormat && a.regex.hrs24.test(c) ? (c = parseInt(c,
                                    10), 24 === c ? (f.buffer[b + 5] = "a", f.buffer[b + 6] = "m") : (f.buffer[b + 5] = "p", f.buffer[b + 6] = "m"), 10 > (c -= 12) ? (f.buffer[b] = c.toString(), f.buffer[b - 1] = "0") : (f.buffer[b] = c.toString().charAt(1), f.buffer[b - 1] = c.toString().charAt(0)), {
                                    refreshFromBuffer: {
                                        start: b - 1,
                                        end: b + 6
                                    },
                                    c: f.buffer[b]
                                }) : e : (f.buffer[b - 1] = "0", f.buffer[b] = c.charAt(0), b++, {
                                    refreshFromBuffer: {
                                        start: b - 2,
                                        end: b
                                    },
                                    pos: b,
                                    c: a.timeseparator
                                })
                            },
                            cardinality: 2,
                            prevalidator: [{
                                validator: function(c, f, b, d, a) {
                                    var e = a.regex.hrspre.test(c);
                                    return d || e || !(e = a.regex.hrs.test("0" +
                                        c)) ? e : (f.buffer[b] = "0", b++, {
                                        pos: b
                                    })
                                },
                                cardinality: 1
                            }]
                        },
                        s: {
                            validator: "[0-5][0-9]",
                            cardinality: 2,
                            prevalidator: [{
                                validator: function(c, f, b, d, a) {
                                    var e = a.regex.mspre.test(c);
                                    return d || e || !(e = a.regex.ms.test("0" + c)) ? e : (f.buffer[b] = "0", b++, {
                                        pos: b
                                    })
                                },
                                cardinality: 1
                            }]
                        },
                        t: {
                            validator: function(c, f, b, d, a) {
                                return a.regex.ampm.test(c + "m")
                            },
                            casing: "lower",
                            cardinality: 1
                        }
                    },
                    insertMode: !1,
                    autoUnmask: !1
                },
                datetime12: {
                    mask: "1/2/y h:s t\\m",
                    placeholder: "dd/mm/yyyy hh:mm xm",
                    alias: "datetime",
                    hourFormat: "12"
                },
                "mm/dd/yyyy hh:mm xm": {
                    mask: "1/2/y h:s t\\m",
                    placeholder: "mm/dd/yyyy hh:mm xm",
                    alias: "datetime12",
                    regex: {
                        val2pre: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])")
                        },
                        val2: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)")
                        },
                        val1pre: /[01]/,
                        val1: /0[1-9]|1[012]/
                    },
                    leapday: "02/29/",
                    onKeyDown: function(c, h, b, d) {
                        h = m(this);
                        c.ctrlKey && c.keyCode === f.keyCode.RIGHT && (c = new Date, h.val((c.getMonth() + 1).toString() +
                            c.getDate().toString() + c.getFullYear().toString()), h.trigger("setvalue"))
                    }
                },
                "hh:mm t": {
                    mask: "h:s t\\m",
                    placeholder: "hh:mm xm",
                    alias: "datetime",
                    hourFormat: "12"
                },
                "h:s t": {
                    mask: "h:s t\\m",
                    placeholder: "hh:mm xm",
                    alias: "datetime",
                    hourFormat: "12"
                },
                "hh:mm:ss": {
                    mask: "h:s:s",
                    placeholder: "hh:mm:ss",
                    alias: "datetime",
                    autoUnmask: !1
                },
                "hh:mm": {
                    mask: "h:s",
                    placeholder: "hh:mm",
                    alias: "datetime",
                    autoUnmask: !1
                },
                date: {
                    alias: "dd/mm/yyyy"
                },
                "mm/yyyy": {
                    mask: "1/y",
                    placeholder: "mm/yyyy",
                    leapday: "donotuse",
                    separator: "/",
                    alias: "mm/dd/yyyy"
                },
                shamsi: {
                    regex: {
                        val2pre: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[1-9]|1[012])" + c + "[0-3])")
                        },
                        val2: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + c + "30)|((0[1-6])" + c + "31)")
                        },
                        val1pre: /[01]/,
                        val1: /0[1-9]|1[012]/
                    },
                    yearrange: {
                        minyear: 1300,
                        maxyear: 1499
                    },
                    mask: "y/1/2",
                    leapday: "/12/30",
                    placeholder: "yyyy/mm/dd",
                    alias: "mm/dd/yyyy",
                    clearIncomplete: !0
                },
                "yyyy-mm-dd hh:mm:ss": {
                    mask: "y-1-2 h:s:s",
                    placeholder: "yyyy-mm-dd hh:mm:ss",
                    alias: "datetime",
                    separator: "-",
                    leapday: "-02-29",
                    regex: {
                        val2pre: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])")
                        },
                        val2: function(c) {
                            c = f.escapeRegex.call(this, c);
                            return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)")
                        },
                        val1pre: /[01]/,
                        val1: /0[1-9]|1[012]/
                    },
                    onKeyDown: function(c, f, b, d) {}
                }
            }), f
        })
    }, function(C, x, m) {
        "function" == typeof Symbol && Symbol.iterator;
        x = window;
        void 0 !== x && (C.exports = x)
    },
    function(C, x, m) {
        "function" == typeof Symbol && Symbol.iterator;
        x = document;
        void 0 !== x && (C.exports = x)
    },
    function(C, x, m) {
        var p, v, E;
        "function" == typeof Symbol && Symbol.iterator;
        ! function(B) {
            v = [m(0), m(1)];
            void 0 !== (E = "function" == typeof(p = B) ? p.apply(x, v) : p) && (C.exports = E)
        }(function(m, f) {
            return f.extendDefinitions({
                A: {
                    validator: "[A-Za-z\u0410-\u044f\u0401\u0451\u00c0-\u00ff\u00b5]",
                    cardinality: 1,
                    casing: "upper"
                },
                "&": {
                    validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\u00c0-\u00ff\u00b5]",
                    cardinality: 1,
                    casing: "upper"
                },
                "#": {
                    validator: "[0-9A-Fa-f]",
                    cardinality: 1,
                    casing: "upper"
                }
            }), f.extendAliases({
                url: {
                    definitions: {
                        i: {
                            validator: ".",
                            cardinality: 1
                        }
                    },
                    mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
                    insertMode: !1,
                    autoUnmask: !1,
                    inputmode: "url"
                },
                ip: {
                    mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
                    definitions: {
                        i: {
                            validator: function(c, f, b, d, a) {
                                return -1 < b - 1 && "." !== f.buffer[b - 1] ? (c = f.buffer[b - 1] + c, c = -1 < b - 2 && "." !== f.buffer[b - 2] ? f.buffer[b - 2] + c : "0" + c) : c = "00" + c, /25[0-5]|2[0-4][0-9]|[01][0-9][0-9]/.test(c)
                            },
                            cardinality: 1
                        }
                    },
                    onUnMask: function(c,
                        f, b) {
                        return c
                    },
                    inputmode: "numeric"
                },
                email: {
                    mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                    greedy: !1,
                    onBeforePaste: function(c, f) {
                        return c.toLowerCase().replace("mailto:", "")
                    },
                    definitions: {
                        "*": {
                            validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                            cardinality: 1,
                            casing: "lower"
                        },
                        "-": {
                            validator: "[0-9A-Za-z-]",
                            cardinality: 1,
                            casing: "lower"
                        }
                    },
                    onUnMask: function(c, f, b) {
                        return c
                    },
                    inputmode: "email"
                },
                mac: {
                    mask: "##:##:##:##:##:##"
                },
                vin: {
                    mask: "V{13}9{4}",
                    definitions: {
                        V: {
                            validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                            cardinality: 1,
                            casing: "upper"
                        }
                    },
                    clearIncomplete: !0,
                    autoUnmask: !0
                }
            }), f
        })
    },
    function(C, x, m) {
        var p, v, E;
        "function" == typeof Symbol && Symbol.iterator;
        ! function(B) {
            v = [m(0), m(1)];
            void 0 !== (E = "function" == typeof(p = B) ? p.apply(x, v) : p) && (C.exports = E)
        }(function(m, f, c) {
            function h(b, c) {
                for (var a = "", d = 0; d < b.length; d++) f.prototype.definitions[b.charAt(d)] || c.definitions[b.charAt(d)] || c.optionalmarker.start === b.charAt(d) || c.optionalmarker.end === b.charAt(d) || c.quantifiermarker.start === b.charAt(d) || c.quantifiermarker.end ===
                    b.charAt(d) || c.groupmarker.start === b.charAt(d) || c.groupmarker.end === b.charAt(d) || c.alternatormarker === b.charAt(d) ? a += "\\" + b.charAt(d) : a += b.charAt(d);
                return a
            }
            return f.extendAliases({
                numeric: {
                    mask: function(b) {
                        if (0 !== b.repeat && isNaN(b.integerDigits) && (b.integerDigits = b.repeat), b.repeat = 0, b.groupSeparator === b.radixPoint && ("." === b.radixPoint ? b.groupSeparator = "," : "," === b.radixPoint ? b.groupSeparator = "." : b.groupSeparator = ""), " " === b.groupSeparator && (b.skipOptionalPartCharacter = c), b.autoGroup = b.autoGroup &&
                            "" !== b.groupSeparator, b.autoGroup && ("string" == typeof b.groupSize && isFinite(b.groupSize) && (b.groupSize = parseInt(b.groupSize)), isFinite(b.integerDigits))) {
                            var d = Math.floor(b.integerDigits / b.groupSize),
                                a = b.integerDigits % b.groupSize;
                            b.integerDigits = parseInt(b.integerDigits) + (0 === a ? d - 1 : d);
                            1 > b.integerDigits && (b.integerDigits = "*")
                        }
                        1 < b.placeholder.length && (b.placeholder = b.placeholder.charAt(0));
                        "radixFocus" === b.positionCaretOnClick && "" === b.placeholder && !1 === b.integerOptional && (b.positionCaretOnClick = "lvp");
                        b.definitions[";"] = b.definitions["~"];
                        b.definitions[";"].definitionSymbol = "~";
                        !0 === b.numericInput && (b.positionCaretOnClick = "radixFocus" === b.positionCaretOnClick ? "lvp" : b.positionCaretOnClick, b.digitsOptional = !1, isNaN(b.digits) && (b.digits = 2), b.decimalProtect = !1);
                        d = "[+]";
                        if (d += h(b.prefix, b), !0 === b.integerOptional ? d += "~{1," + b.integerDigits + "}" : d += "~{" + b.integerDigits + "}", b.digits !== c) b.radixPointDefinitionSymbol = b.decimalProtect ? ":" : b.radixPoint, a = b.digits.toString().split(","), isFinite(a[0] && a[1] && isFinite(a[1])) ?
                            d += b.radixPointDefinitionSymbol + ";{" + b.digits + "}" : (isNaN(b.digits) || 0 < parseInt(b.digits)) && (b.digitsOptional ? d += "[" + b.radixPointDefinitionSymbol + ";{1," + b.digits + "}]" : d += b.radixPointDefinitionSymbol + ";{" + b.digits + "}");
                        return d += h(b.suffix, b), d += "[-]", b.greedy = !1, d
                    },
                    placeholder: "",
                    greedy: !1,
                    digits: "*",
                    digitsOptional: !0,
                    enforceDigitsOnBlur: !1,
                    radixPoint: ".",
                    positionCaretOnClick: "radixFocus",
                    groupSize: 3,
                    groupSeparator: "",
                    autoGroup: !1,
                    allowMinus: !0,
                    negationSymbol: {
                        front: "-",
                        back: ""
                    },
                    integerDigits: "+",
                    integerOptional: !0,
                    prefix: "",
                    suffix: "",
                    rightAlign: !0,
                    decimalProtect: !0,
                    min: null,
                    max: null,
                    step: 1,
                    insertMode: !0,
                    autoUnmask: !1,
                    unmaskAsNumber: !1,
                    inputmode: "numeric",
                    preValidation: function(b, d, a, e, f) {
                        return "-" === a || a === f.negationSymbol.front ? !0 === f.allowMinus && (f.isNegative = f.isNegative === c || !f.isNegative, "" === b.join("") || {
                            caret: d,
                            dopost: !0
                        }) : !1 === e && a === f.radixPoint && f.digits !== c && (isNaN(f.digits) || 0 < parseInt(f.digits)) && (b = m.inArray(f.radixPoint, b), -1 !== b) ? !0 === f.numericInput ? d === b : {
                            caret: b + 1
                        } : !0
                    },
                    postValidation: function(b, d, a) {
                        var e = a.suffix.split(""),
                            h = a.prefix.split("");
                        if (d.pos === c && d.caret !== c && !0 !== d.dopost) return d;
                        var p = d.caret !== c ? d.caret : d.pos,
                            v = b.slice();
                        a.numericInput && (p = v.length - p - 1, v = v.reverse());
                        var w = v[p];
                        if (w === a.groupSeparator && (w = v[p += 1]), p === v.length - a.suffix.length - 1 && w === a.radixPoint) return d;
                        w !== c && w !== a.radixPoint && w !== a.negationSymbol.front && w !== a.negationSymbol.back && (v[p] = "?", 0 < a.prefix.length && p >= (!1 === a.isNegative ? 1 : 0) && p < a.prefix.length - 1 + (!1 === a.isNegative ? 1 :
                            0) ? h[p - (!1 === a.isNegative ? 1 : 0)] = "?" : 0 < a.suffix.length && p >= v.length - a.suffix.length - (!1 === a.isNegative ? 1 : 0) && (e[p - (v.length - a.suffix.length - (!1 === a.isNegative ? 1 : 0))] = "?"));
                        h = h.join("");
                        e = e.join("");
                        var n = v.join("").replace(h, "");
                        if (n = n.replace(e, ""), n = n.replace(new RegExp(f.escapeRegex(a.groupSeparator), "g"), ""), n = n.replace(new RegExp("[-" + f.escapeRegex(a.negationSymbol.front) + "]", "g"), ""), n = n.replace(new RegExp(f.escapeRegex(a.negationSymbol.back) + "$"), ""), isNaN(a.placeholder) && (n = n.replace(new RegExp(f.escapeRegex(a.placeholder),
                                "g"), "")), 1 < n.length && 1 !== n.indexOf(a.radixPoint) && ("0" === w && (n = n.replace(/^\?/g, "")), n = n.replace(/^0/g, "")), n.charAt(0) === a.radixPoint && "" !== a.radixPoint && !0 !== a.numericInput && (n = "0" + n), "" !== n) {
                            if (n = n.split(""), (!a.digitsOptional || a.enforceDigitsOnBlur && "blur" === d.event) && isFinite(a.digits)) {
                                var x = m.inArray(a.radixPoint, n),
                                    B = m.inArray(a.radixPoint, v); - 1 === x && (n.push(a.radixPoint), x = n.length - 1);
                                for (var g = 1; g <= a.digits; g++) a.digitsOptional && (!a.enforceDigitsOnBlur || "blur" !== d.event) || n[x + g] !== c && n[x +
                                    g] !== a.placeholder.charAt(0) ? -1 !== B && v[B + g] !== c && (n[x + g] = n[x + g] || v[B + g]) : n[x + g] = d.placeholder || a.placeholder.charAt(0)
                            }
                            if (!0 !== a.autoGroup || "" === a.groupSeparator || w === a.radixPoint && d.pos === c && !d.dopost) n = n.join("");
                            else {
                                v = n[n.length - 1] === a.radixPoint && d.c === a.radixPoint;
                                x = "";
                                if (x += "(" + a.groupSeparator + "*{" + a.groupSize + "}){*}", "" !== a.radixPoint) B = n.join("").split(a.radixPoint), B[1] && (x += a.radixPoint + "*{" + B[1].match(/^\d*\??\d*/)[0].length + "}");
                                n = f(x, {
                                    numericInput: !0,
                                    jitMasking: !0,
                                    definitions: {
                                        "*": {
                                            validator: "[0-9?]",
                                            cardinality: 1
                                        }
                                    }
                                }).format(n.join(""));
                                v && (n += a.radixPoint);
                                n.charAt(0) === a.groupSeparator && n.substr(1)
                            }
                        }
                        if (a.isNegative && "blur" === d.event && (a.isNegative = "0" !== n), n = h + n, n += e, a.isNegative && (n = a.negationSymbol.front + n, n += a.negationSymbol.back), n = n.split(""), w !== c)
                            if (w !== a.radixPoint && w !== a.negationSymbol.front && w !== a.negationSymbol.back) - 1 < (p = m.inArray("?", n)) ? n[p] = w : p = d.caret || 0;
                            else if (w === a.radixPoint || w === a.negationSymbol.front || w === a.negationSymbol.back) e = m.inArray(w, n), -1 !== e && (p = e);
                        a.numericInput &&
                            (p = n.length - p - 1, n = n.reverse());
                        b = {
                            caret: w === c || d.pos !== c ? p + (a.numericInput ? -1 : 1) : p,
                            buffer: n,
                            refreshFromBuffer: d.dopost || b.join("") !== n.join("")
                        };
                        return b.refreshFromBuffer ? b : d
                    },
                    onBeforeWrite: function(b, d, a, e) {
                        if (b) switch (b.type) {
                            case "keydown":
                                return e.postValidation(d, {
                                    caret: a,
                                    dopost: !0
                                }, e);
                            case "blur":
                            case "checkval":
                                var h;
                                e.parseMinMaxOptions === c && (null !== e.min && (e.min = e.min.toString().replace(new RegExp(f.escapeRegex(e.groupSeparator), "g"), ""), "," === e.radixPoint && (e.min = e.min.replace(e.radixPoint,
                                    ".")), e.min = isFinite(e.min) ? parseFloat(e.min) : NaN, isNaN(e.min) && (e.min = Number.MIN_VALUE)), null !== e.max && (e.max = e.max.toString().replace(new RegExp(f.escapeRegex(e.groupSeparator), "g"), ""), "," === e.radixPoint && (e.max = e.max.replace(e.radixPoint, ".")), e.max = isFinite(e.max) ? parseFloat(e.max) : NaN, isNaN(e.max) && (e.max = Number.MAX_VALUE)), e.parseMinMaxOptions = "done");
                                if (null !== e.min || null !== e.max) {
                                    if (h = e.onUnMask(d.join(""), c, m.extend({}, e, {
                                            unmaskAsNumber: !0
                                        })), null !== e.min && h < e.min) return e.isNegative = 0 >
                                        e.min, e.postValidation(e.min.toString().replace(".", e.radixPoint).split(""), {
                                            caret: a,
                                            dopost: !0,
                                            placeholder: "0"
                                        }, e);
                                    if (null !== e.max && h > e.max) return e.isNegative = 0 > e.max, e.postValidation(e.max.toString().replace(".", e.radixPoint).split(""), {
                                        caret: a,
                                        dopost: !0,
                                        placeholder: "0"
                                    }, e)
                                }
                                return e.postValidation(d, {
                                    caret: a,
                                    placeholder: "0",
                                    event: "blur"
                                }, e);
                            case "_checkval":
                                return {
                                    caret: a
                                }
                        }
                    },
                    regex: {
                        integerPart: function(b, c) {
                            return c ? new RegExp("[" + f.escapeRegex(b.negationSymbol.front) + "+]?") : new RegExp("[" + f.escapeRegex(b.negationSymbol.front) +
                                "+]?\\d+")
                        },
                        integerNPart: function(b) {
                            return new RegExp("[\\d" + f.escapeRegex(b.groupSeparator) + f.escapeRegex(b.placeholder.charAt(0)) + "]+")
                        }
                    },
                    definitions: {
                        "~": {
                            validator: function(b, d, a, e, h, m) {
                                var q = e ? (new RegExp("[0-9" + f.escapeRegex(h.groupSeparator) + "]")).test(b) : /[0-9]/.test(b);
                                if (!0 === q) {
                                    if (!0 !== h.numericInput && d.validPositions[a] !== c && "~" === d.validPositions[a].match.def && !m) {
                                        b = d.buffer.join("");
                                        b = b.replace(new RegExp("[-" + f.escapeRegex(h.negationSymbol.front) + "]", "g"), "").replace(new RegExp(f.escapeRegex(h.negationSymbol.back) +
                                            "$"), "").split(h.radixPoint);
                                        1 < b.length && (b[1] = b[1].replace(/0/g, h.placeholder.charAt(0)));
                                        "0" === b[0] && (b[0] = b[0].replace(/0/g, h.placeholder.charAt(0)));
                                        b = b[0] + h.radixPoint + b[1] || "";
                                        d = d._buffer.join("");
                                        for (b === h.radixPoint && (b = d); null === b.match(f.escapeRegex(d) + "$");) d = d.slice(1);
                                        q = b.replace(d, "").split("")[a] === c ? {
                                            pos: a,
                                            remove: a
                                        } : {
                                            pos: a
                                        }
                                    }
                                } else e || b !== h.radixPoint || d.validPositions[a - 1] !== c || (d.buffer[a] = "0", q = {
                                    pos: a + 1
                                });
                                return q
                            },
                            cardinality: 1
                        },
                        "+": {
                            validator: function(b, c, a, e, f) {
                                return f.allowMinus &&
                                    ("-" === b || b === f.negationSymbol.front)
                            },
                            cardinality: 1,
                            placeholder: ""
                        },
                        "-": {
                            validator: function(b, c, a, e, f) {
                                return f.allowMinus && b === f.negationSymbol.back
                            },
                            cardinality: 1,
                            placeholder: ""
                        },
                        ":": {
                            validator: function(b, c, a, e, h) {
                                e = "[" + f.escapeRegex(h.radixPoint) + "]";
                                b = (new RegExp(e)).test(b);
                                return b && c.validPositions[a] && c.validPositions[a].match.placeholder === h.radixPoint && (b = {
                                    caret: a + 1
                                }), b
                            },
                            cardinality: 1,
                            placeholder: function(b) {
                                return b.radixPoint
                            }
                        }
                    },
                    onUnMask: function(b, c, a) {
                        if ("" === c && !0 === a.nullable) return c;
                        b = b.replace(a.prefix, "");
                        return b = b.replace(a.suffix, ""), b = b.replace(new RegExp(f.escapeRegex(a.groupSeparator), "g"), ""), "" !== a.placeholder.charAt(0) && (b = b.replace(new RegExp(a.placeholder.charAt(0), "g"), "0")), a.unmaskAsNumber ? ("" !== a.radixPoint && -1 !== b.indexOf(a.radixPoint) && (b = b.replace(f.escapeRegex.call(this, a.radixPoint), ".")), b = b.replace(new RegExp("^" + f.escapeRegex(a.negationSymbol.front)), "-"), b = b.replace(new RegExp(f.escapeRegex(a.negationSymbol.back) + "$"), ""), Number(b)) : b
                    },
                    isComplete: function(b,
                        c) {
                        var a = b.join("");
                        if (b.slice().join("") !== a) return !1;
                        b = a.replace(c.prefix, "");
                        return b = b.replace(c.suffix, ""), b = b.replace(new RegExp(f.escapeRegex(c.groupSeparator), "g"), ""), "," === c.radixPoint && (b = b.replace(f.escapeRegex(c.radixPoint), ".")), isFinite(b)
                    },
                    onBeforeMask: function(b, d) {
                        if (d.isNegative = c, b = b.toString().charAt(b.length - 1) === d.radixPoint ? b.toString().substr(0, b.length - 1) : b.toString(), "" !== d.radixPoint && isFinite(b)) {
                            var a = b.split("."),
                                e = "" !== d.groupSeparator ? parseInt(d.groupSize) : 0;
                            2 === a.length &&
                                (a[0].length > e || a[1].length > e || a[0].length <= e && a[1].length < e) && (b = b.replace(".", d.radixPoint))
                        }
                        a = b.match(/,/g);
                        e = b.match(/\./g);
                        if (b = e && a ? e.length > a.length ? (b = b.replace(/\./g, "")).replace(",", d.radixPoint) : a.length > e.length ? (b = b.replace(/,/g, "")).replace(".", d.radixPoint) : b.indexOf(".") < b.indexOf(",") ? b.replace(/\./g, "") : b.replace(/,/g, "") : b.replace(new RegExp(f.escapeRegex(d.groupSeparator), "g"), ""), 0 === d.digits && (-1 !== b.indexOf(".") ? b = b.substring(0, b.indexOf(".")) : -1 !== b.indexOf(",") && (b = b.substring(0,
                                b.indexOf(",")))), "" !== d.radixPoint && isFinite(d.digits) && -1 !== b.indexOf(d.radixPoint)) a = b.split(d.radixPoint)[1].match(/\d*/)[0], parseInt(d.digits) < a.toString().length && (a = Math.pow(10, parseInt(d.digits)), b = b.replace(f.escapeRegex(d.radixPoint), "."), b = (b = Math.round(parseFloat(b) * a) / a).toString().replace(".", d.radixPoint));
                        return b
                    },
                    canClearPosition: function(b, c, a, e, f) {
                        e = b.validPositions[c];
                        b = e.input !== f.radixPoint || null !== b.validPositions[c].match.fn && !1 === f.decimalProtect || e.input === f.radixPoint &&
                            b.validPositions[c + 1] && null === b.validPositions[c + 1].match.fn || isFinite(e.input) || c === a || e.input === f.groupSeparator || e.input === f.negationSymbol.front || e.input === f.negationSymbol.back;
                        return !b || "+" !== e.match.nativeDef && "-" !== e.match.nativeDef || (f.isNegative = !1), b
                    },
                    onKeyDown: function(b, c, a, e) {
                        c = m(this);
                        if (b.ctrlKey) switch (b.keyCode) {
                            case f.keyCode.UP:
                                c.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(e.step));
                                c.trigger("setvalue");
                                break;
                            case f.keyCode.DOWN:
                                c.val(parseFloat(this.inputmask.unmaskedvalue()) -
                                    parseInt(e.step)), c.trigger("setvalue")
                        }
                    }
                },
                currency: {
                    prefix: "$ ",
                    groupSeparator: ",",
                    alias: "numeric",
                    placeholder: "0",
                    autoGroup: !0,
                    digits: 2,
                    digitsOptional: !1,
                    clearMaskOnLostFocus: !1
                },
                decimal: {
                    alias: "numeric"
                },
                integer: {
                    alias: "numeric",
                    digits: 0,
                    radixPoint: ""
                },
                percentage: {
                    alias: "numeric",
                    digits: 2,
                    digitsOptional: !0,
                    radixPoint: ".",
                    placeholder: "0",
                    autoGroup: !1,
                    min: 0,
                    max: 100,
                    suffix: " %",
                    allowMinus: !1
                }
            }), f
        })
    },
    function(C, x, m) {
        var p, v, E;
        "function" == typeof Symbol && Symbol.iterator;
        ! function(B) {
            v = [m(0), m(1)];
            void 0 !==
                (E = "function" == typeof(p = B) ? p.apply(x, v) : p) && (C.exports = E)
        }(function(m, f) {
            function c(b, c) {
                var a = (b.mask || b).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""),
                    d = (c.mask || c).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, "");
                b = (b.mask || b).split("#")[0];
                c = (c.mask || c).split("#")[0];
                return 0 === c.indexOf(b) ? -1 : 0 === b.indexOf(c) ? 1 : a.localeCompare(d)
            }
            var h = f.prototype.analyseMask;
            return f.prototype.analyseMask = function(b, c, a) {
                function d(a, c, e) {
                    c = c || "";
                    e = e || p;
                    "" !== c && (e[c] = {});
                    var f = "";
                    c = e[c] ||
                        e;
                    for (e = a.length - 1; 0 <= e; e--) c[f = (b = a[e].mask || a[e]).substr(0, 1)] = c[f] || [], c[f].unshift(b.substr(1)), a.splice(e, 1);
                    for (var h in c) 500 < c[h].length && d(c[h].slice(), h, c)
                }

                function f(b) {
                    var c = "",
                        d = [],
                        e;
                    for (e in b) m.isArray(b[e]) ? 1 === b[e].length ? d.push(e + b[e]) : d.push(e + a.groupmarker.start + b[e].join(a.groupmarker.end + a.alternatormarker + a.groupmarker.start) + a.groupmarker.end) : d.push(e + f(b[e]));
                    return 1 === d.length ? c += d[0] : c += a.groupmarker.start + d.join(a.groupmarker.end + a.alternatormarker + a.groupmarker.start) +
                        a.groupmarker.end, c
                }
                var p = {};
                return a.phoneCodes && (a.phoneCodes && 1E3 < a.phoneCodes.length && (d((b = b.substr(1, b.length - 2)).split(a.groupmarker.end + a.alternatormarker + a.groupmarker.start)), b = f(p)), b = b.replace(/9/g, "\\9")), h.call(this, b, c, a)
            }, f.extendAliases({
                abstractphone: {
                    groupmarker: {
                        start: "<",
                        end: ">"
                    },
                    countrycode: "",
                    phoneCodes: [],
                    mask: function(b) {
                        return b.definitions = {
                            "#": f.prototype.definitions[9]
                        }, b.phoneCodes.sort(c)
                    },
                    keepStatic: !0,
                    onBeforeMask: function(b, c) {
                        b = b.replace(/^0{1,2}/, "").replace(/[\s]/g,
                            "");
                        return (1 < b.indexOf(c.countrycode) || -1 === b.indexOf(c.countrycode)) && (b = "+" + c.countrycode + b), b
                    },
                    onUnMask: function(b, c, a) {
                        return b.replace(/[()#-]/g, "")
                    },
                    inputmode: "tel"
                }
            }), f
        })
    },
    function(C, x, m) {
        var p, v, E;
        "function" == typeof Symbol && Symbol.iterator;
        ! function(B) {
            v = [m(0), m(1)];
            void 0 !== (E = "function" == typeof(p = B) ? p.apply(x, v) : p) && (C.exports = E)
        }(function(m, f) {
            return f.extendAliases({
                Regex: {
                    mask: "r",
                    greedy: !1,
                    repeat: "*",
                    regex: null,
                    regexTokens: null,
                    tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                    quantifierFilter: /[0-9]+[^,]/,
                    isComplete: function(c, f) {
                        return (new RegExp(f.regex, f.casing ? "i" : "")).test(c.join(""))
                    },
                    definitions: {
                        r: {
                            validator: function(c, f, b, d, a) {
                                function e(a, b) {
                                    this.matches = [];
                                    this.isGroup = a || !1;
                                    this.isQuantifier = b || !1;
                                    this.quantifier = {
                                        min: 1,
                                        max: 1
                                    };
                                    this.repeaterPart = void 0
                                }

                                function h(b, c) {
                                    var d = !1;
                                    c && (v += "(", w++);
                                    for (var e = 0; e < b.matches.length; e++) {
                                        var f = b.matches[e];
                                        if (!0 === f.isGroup) d = h(f, !0);
                                        else if (!0 === f.isQuantifier) {
                                            var p = m.inArray(f, b.matches);
                                            p = b.matches[p - 1];
                                            var q = v;
                                            if (isNaN(f.quantifier.max)) {
                                                for (; f.repeaterPart &&
                                                    f.repeaterPart !== v && f.repeaterPart.length > v.length && !(d = h(p, !0)););
                                                (d = d || h(p, !0)) && (f.repeaterPart = v);
                                                v = q + f.quantifier.max
                                            } else {
                                                for (var x = 0, B = f.quantifier.max - 1; x < B && !(d = h(p, !0)); x++);
                                                v = q + "{" + f.quantifier.min + "," + f.quantifier.max + "}"
                                            }
                                        } else if (void 0 !== f.matches)
                                            for (p = 0; p < f.length && !(d = h(f[p], c)); p++);
                                        else {
                                            if ("[" == f.charAt(0)) {
                                                d = v;
                                                d += f;
                                                for (x = 0; x < w; x++) d += ")";
                                                d = (new RegExp("^(" + d + ")$", a.casing ? "i" : "")).test(n)
                                            } else
                                                for (p = 0, q = f.length; p < q; p++)
                                                    if ("\\" !== f.charAt(p)) {
                                                        d = v;
                                                        d = (d += f.substr(0, p + 1)).replace(/\|$/,
                                                            "");
                                                        for (x = 0; x < w; x++) d += ")";
                                                        if (d = (new RegExp("^(" + d + ")$", a.casing ? "i" : "")).test(n)) break
                                                    }
                                            v += f
                                        }
                                        if (d) break
                                    }
                                    return c && (v += ")", w--), d
                                }
                                var p;
                                d = f.buffer.slice();
                                var v = "";
                                f = !1;
                                var w = 0;
                                null === a.regexTokens && function() {
                                    var b, c, d = new e,
                                        f = [];
                                    for (a.regexTokens = []; b = a.tokenizer.exec(a.regex);) switch ((c = b[0]).charAt(0)) {
                                        case "(":
                                            f.push(new e(!0));
                                            break;
                                        case ")":
                                            p = f.pop();
                                            0 < f.length ? f[f.length - 1].matches.push(p) : d.matches.push(p);
                                            break;
                                        case "{":
                                        case "+":
                                        case "*":
                                            var h = new e(!1, !0),
                                                m = c.replace(/[{}]/g, "").split(",");
                                            c = isNaN(m[0]) ? m[0] : parseInt(m[0]);
                                            m = 1 === m.length ? c : isNaN(m[1]) ? m[1] : parseInt(m[1]);
                                            (h.quantifier = {
                                                min: c,
                                                max: m
                                            }, 0 < f.length) ? (c = f[f.length - 1].matches, (b = c.pop()).isGroup || ((p = new e(!0)).matches.push(b), b = p), c.push(b), c.push(h)) : ((b = d.matches.pop()).isGroup || ((p = new e(!0)).matches.push(b), b = p), d.matches.push(b), d.matches.push(h));
                                            break;
                                        default:
                                            0 < f.length ? f[f.length - 1].matches.push(c) : d.matches.push(c)
                                    }
                                    0 < d.matches.length && a.regexTokens.push(d)
                                }();
                                d.splice(b, 0, c);
                                var n = d.join("");
                                for (c = 0; c < a.regexTokens.length &&
                                    !(b = a.regexTokens[c], f = h(b, b.isGroup)); c++);
                                return f
                            },
                            cardinality: 1
                        }
                    }
                }
            }), f
        })
    },
    function(C, x, m) {
        var p, v, E, B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(f) {
            return typeof f
        } : function(f) {
            return f && "function" == typeof Symbol && f.constructor === Symbol && f !== Symbol.prototype ? "symbol" : typeof f
        };
        ! function(f) {
            v = [m(2), m(1)];
            void 0 !== (E = "function" == typeof(p = f) ? p.apply(x, v) : p) && (C.exports = E)
        }(function(f, c) {
            return void 0 === f.fn.inputmask && (f.fn.inputmask = function(h, b) {
                var d, a = this[0];
                if (void 0 ===
                    b && (b = {}), "string" == typeof h) switch (h) {
                    case "unmaskedvalue":
                        return a && a.inputmask ? a.inputmask.unmaskedvalue() : f(a).val();
                    case "remove":
                        return this.each(function() {
                            this.inputmask && this.inputmask.remove()
                        });
                    case "getemptymask":
                        return a && a.inputmask ? a.inputmask.getemptymask() : "";
                    case "hasMaskedValue":
                        return !(!a || !a.inputmask) && a.inputmask.hasMaskedValue();
                    case "isComplete":
                        return !a || !a.inputmask || a.inputmask.isComplete();
                    case "getmetadata":
                        return a && a.inputmask ? a.inputmask.getmetadata() : void 0;
                    case "setvalue":
                        f(a).val(b);
                        a && void 0 === a.inputmask && f(a).triggerHandler("setvalue");
                        break;
                    case "option":
                        if ("string" != typeof b) return this.each(function() {
                            if (void 0 !== this.inputmask) return this.inputmask.option(b)
                        });
                        if (a && void 0 !== a.inputmask) return a.inputmask.option(b);
                        break;
                    default:
                        return b.alias = h, d = new c(b), this.each(function() {
                            d.mask(this)
                        })
                } else {
                    if ("object" == (void 0 === h ? "undefined" : B(h))) return d = new c(h), void 0 === h.mask && void 0 === h.alias ? this.each(function() {
                        if (void 0 !== this.inputmask) return this.inputmask.option(h);
                        d.mask(this)
                    }) : this.each(function() {
                        d.mask(this)
                    });
                    if (void 0 === h) return this.each(function() {
                        (d = new c(b)).mask(this)
                    })
                }
            }), f.fn.inputmask
        })
    }
]);