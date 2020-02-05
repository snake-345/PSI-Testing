/*
 Picturefill - v2.3.1 - 2015-04-09
 http://scottjehl.github.io/picturefill
 Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT  matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license  Picturefill - Responsive Images that work today.
  Author: Scott Jehl, Filament Group, 2012 ( new proposal implemented by Shawn Jansepar )
  License: MIT/GPLv2
  Spec: http://picture.responsiveimages.org/
*/
window.matchMedia || (window.matchMedia = function() {
    var g = window.styleMedia || window.media;
    if (!g) {
        var k = document.createElement("style"),
            m = document.getElementsByTagName("script")[0],
            n = null;
        k.type = "text/css";
        k.id = "matchmediajs-test";
        m.parentNode.insertBefore(k, m);
        n = "getComputedStyle" in window && window.getComputedStyle(k, null) || k.currentStyle;
        g = {
            matchMedium: function(g) {
                g = "@media " + g + "{ #matchmediajs-test { width: 1px; } }";
                k.styleSheet ? k.styleSheet.cssText = g : k.textContent = g;
                return "1px" === n.width
            }
        }
    }
    return function(k) {
        return {
            matches: g.matchMedium(k ||
                "all"),
            media: k || "all"
        }
    }
}());
(function(g, k, m) {
    function n(a) {
        "object" === typeof module && "object" === typeof module.exports ? module.exports = a : "function" === typeof define && define.amd && define("picturefill", function() {
            return a
        });
        "object" === typeof g && (g.picturefill = a)
    }

    function l(a) {
        var f = a || {};
        a = f.elements || b.getAllElements();
        for (var c = 0, e = a.length; c < e; c++) {
            var d = a[c];
            var h = d.parentNode;
            if ("IMG" === d.nodeName.toUpperCase() && (d[b.ns] || (d[b.ns] = {}), f.reevaluate || !d[b.ns].evaluated)) {
                if (h && "PICTURE" === h.nodeName.toUpperCase()) {
                    b.removeVideoShim(h);
                    var g =
                        b.getMatch(d, h);
                    if (!1 === g) continue
                } else g = void 0;
                (h && "PICTURE" === h.nodeName.toUpperCase() || !b.sizesSupported && d.srcset && p.test(d.srcset)) && b.dodgeSrcset(d);
                g ? (h = b.processSourceSet(g), b.applyBestCandidate(h, d)) : (h = b.processSourceSet(d), (void 0 === d.srcset || d[b.ns].srcset) && b.applyBestCandidate(h, d));
                d[b.ns].evaluated = !0
            }
        }
    }
    if (g.HTMLPictureElement) n(function() {});
    else {
        k.createElement("picture");
        var b = g.picturefill || {},
            p = /\s+\+?\d+(e\d+)?w/;
        b.ns = "picturefill";
        b.srcsetSupported = "srcset" in m;
        b.sizesSupported =
            "sizes" in m;
        b.curSrcSupported = "currentSrc" in m;
        b.trim = function(a) {
            return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
        };
        b.makeUrl = function() {
            var a = k.createElement("a");
            return function(b) {
                a.href = b;
                return a.href
            }
        }();
        b.restrictsMixedContent = function() {
            return "https:" === g.location.protocol
        };
        b.matchesMedia = function(a) {
            return g.matchMedia && g.matchMedia(a).matches
        };
        b.getDpr = function() {
            return g.devicePixelRatio || 1
        };
        b.getWidthFromLength = function(a) {
            if (!a || !1 !== -1 < a.indexOf("%") || !(0 < parseFloat(a) || -1 < a.indexOf("calc("))) return !1;
            a = a.replace("vw", "%");
            b.lengthEl || (b.lengthEl = k.createElement("div"), b.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", b.lengthEl.className = "helper-from-picturefill-js");
            b.lengthEl.style.width = "0px";
            try {
                b.lengthEl.style.width = a
            } catch (f) {}
            k.body.appendChild(b.lengthEl);
            a = b.lengthEl.offsetWidth;
            0 >= a && (a = !1);
            k.body.removeChild(b.lengthEl);
            return a
        };
        b.detectTypeSupport = function(a, f) {
            var c = new g.Image;
            c.onerror = function() {
                b.types[a] = !1;
                l()
            };
            c.onload = function() {
                b.types[a] = 1 === c.width;
                l()
            };
            c.src = f;
            return "pending"
        };
        b.types = b.types || {};
        b.initTypeDetects = function() {
            b.types["image/jpeg"] = !0;
            b.types["image/gif"] = !0;
            b.types["image/png"] = !0;
            b.types["image/svg+xml"] = k.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
            b.types["image/webp"] = b.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")
        };
        b.verifyTypeSupport = function(a) {
            a = a.getAttribute("type");
            if (null ===
                a || "" === a) return !0;
            var f = b.types[a];
            return "string" === typeof f && "pending" !== f ? (b.types[a] = b.detectTypeSupport(a, f), "pending") : "function" === typeof f ? (f(), "pending") : f
        };
        b.parseSize = function(a) {
            a = /(\([^)]+\))?\s*(.+)/g.exec(a);
            return {
                media: a && a[1],
                length: a && a[2]
            }
        };
        b.findWidthFromSourceSize = function(a) {
            a = b.trim(a).split(/\s*,\s*/);
            for (var f, c = 0, e = a.length; c < e; c++) {
                var d = b.parseSize(a[c]),
                    h = d.length;
                d = d.media;
                if (h && (!d || b.matchesMedia(d)) && (f = b.getWidthFromLength(h))) break
            }
            return f || Math.max(g.innerWidth ||
                0, k.documentElement.clientWidth)
        };
        b.parseSrcset = function(a) {
            for (var b = [];
                "" !== a;) {
                a = a.replace(/^\s+/g, "");
                var c = a.search(/\s/g),
                    e = null;
                if (-1 !== c) {
                    var d = a.slice(0, c);
                    if ("," === d.slice(-1) || "" === d) d = d.replace(/,+$/, ""), e = "";
                    a = a.slice(c + 1);
                    null === e && (c = a.indexOf(","), -1 !== c ? (e = a.slice(0, c), a = a.slice(c + 1)) : (e = a, a = ""))
                } else d = a, a = "";
                (d || e) && b.push({
                    url: d,
                    descriptor: e
                })
            }
            return b
        };
        b.parseDescriptor = function(a, f) {
            f = f || "100vw";
            var c = a && a.replace(/(^\s+|\s+$)/g, "");
            a = b.findWidthFromSourceSize(f);
            if (c)
                for (f =
                    c.split(" "), c = f.length - 1; 0 <= c; c--) {
                    var e = f[c],
                        d = e && e.slice(e.length - 1);
                    if ("h" !== d && "w" !== d || b.sizesSupported) "x" === d && (h = (h = e && parseFloat(e, 10)) && !isNaN(h) ? h : 1);
                    else var h = parseFloat(parseInt(e, 10) / a)
                }
            return h || 1
        };
        b.getCandidatesFromSourceSet = function(a, f) {
            a = b.parseSrcset(a);
            for (var c = [], e = 0, d = a.length; e < d; e++) {
                var h = a[e];
                c.push({
                    url: h.url,
                    resolution: b.parseDescriptor(h.descriptor, f)
                })
            }
            return c
        };
        b.dodgeSrcset = function(a) {
            a.srcset && (a[b.ns].srcset = a.srcset, a.srcset = "", a.setAttribute("data-pfsrcset",
                a[b.ns].srcset))
        };
        b.processSourceSet = function(a) {
            var f = a.getAttribute("srcset"),
                c = a.getAttribute("sizes"),
                e = [];
            "IMG" === a.nodeName.toUpperCase() && a[b.ns] && a[b.ns].srcset && (f = a[b.ns].srcset);
            f && (e = b.getCandidatesFromSourceSet(f, c));
            return e
        };
        b.backfaceVisibilityFix = function(a) {
            a = a.style || {};
            var b = a.zoom;
            "webkitBackfaceVisibility" in a && (a.zoom = ".999", a.zoom = b)
        };
        b.setIntrinsicSize = function() {
            var a = {},
                f = function(a, b, d) {
                    b && a.setAttribute("width", parseInt(b / d, 10))
                };
            return function(c, e) {
                if (c[b.ns] && !g.pfStopIntrinsicSize &&
                    (void 0 === c[b.ns].dims && (c[b.ns].dims = c.getAttribute("width") || c.getAttribute("height")), !c[b.ns].dims))
                    if (e.url in a) f(c, a[e.url], e.resolution);
                    else {
                        var d = k.createElement("img");
                        d.onload = function() {
                            a[e.url] = d.width;
                            if (!a[e.url]) try {
                                k.body.appendChild(d), a[e.url] = d.width || d.offsetWidth, k.body.removeChild(d)
                            } catch (h) {}
                            c.src === e.url && f(c, a[e.url], e.resolution);
                            c = null;
                            d = d.onload = null
                        };
                        d.src = e.url
                    }
            }
        }();
        b.applyBestCandidate = function(a, f) {
            a.sort(b.ascendingSort);
            var c = a.length;
            var e = a[c - 1];
            for (var d = 0; d <
                c; d++) {
                var h = a[d];
                if (h.resolution >= b.getDpr()) {
                    e = h;
                    break
                }
            }
            e && (e.url = b.makeUrl(e.url), f.src !== e.url && (b.restrictsMixedContent() && "http:" === e.url.substr(0, 5).toLowerCase() ? void 0 !== window.console && console.warn("Blocked mixed content image " + e.url) : (f.src = e.url, b.curSrcSupported || (f.currentSrc = f.src), b.backfaceVisibilityFix(f))), b.setIntrinsicSize(f, e))
        };
        b.ascendingSort = function(a, b) {
            return a.resolution - b.resolution
        };
        b.removeVideoShim = function(a) {
            var b = a.getElementsByTagName("video");
            if (b.length) {
                b =
                    b[0];
                for (var c = b.getElementsByTagName("source"); c.length;) a.insertBefore(c[0], b);
                b.parentNode.removeChild(b)
            }
        };
        b.getAllElements = function() {
            for (var a = [], f = k.getElementsByTagName("img"), c = 0, e = f.length; c < e; c++) {
                var d = f[c];
                ("PICTURE" === d.parentNode.nodeName.toUpperCase() || null !== d.getAttribute("srcset") || d[b.ns] && null !== d[b.ns].srcset) && a.push(d)
            }
            return a
        };
        b.getMatch = function(a, f) {
            f = f.childNodes;
            for (var c, e = 0, d = f.length; e < d; e++) {
                var h = f[e];
                if (1 === h.nodeType) {
                    if (h === a) break;
                    if ("SOURCE" === h.nodeName.toUpperCase()) {
                        null !==
                            h.getAttribute("src") && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                        var g = h.getAttribute("media");
                        if (h.getAttribute("srcset") && (!g || b.matchesMedia(g)))
                            if (g = b.verifyTypeSupport(h), !0 === g) {
                                c = h;
                                break
                            } else if ("pending" === g) return !1
                    }
                }
            }
            return c
        };
        (function() {
            function a() {
                clearTimeout(c);
                c = setTimeout(e, 60)
            }
            b.initTypeDetects();
            l();
            var f = setInterval(function() {
                    l();
                    /^loaded|^i|^c/.test(k.readyState) && clearInterval(f)
                }, 250),
                c, e = function() {
                    l({
                        reevaluate: !0
                    })
                };
            g.addEventListener ? g.addEventListener("resize", a, !1) : g.attachEvent && g.attachEvent("onresize", a)
        })();
        l._ = b;
        n(l)
    }
})(window, window.document, new window.Image);