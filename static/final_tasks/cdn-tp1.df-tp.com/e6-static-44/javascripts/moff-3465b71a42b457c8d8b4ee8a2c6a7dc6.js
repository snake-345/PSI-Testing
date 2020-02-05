/*
   Licensed under MIT license
 @copyright Copyright (c) 2015-2018 Kadir Fuzaylov
*/
(function() {
    function m(p, k, h) {
        function a(b, c) {
            if (!k[b]) {
                if (!p[b]) {
                    var f = "function" == typeof require && require;
                    if (!c && f) return f(b, !0);
                    if (g) return g(b, !0);
                    c = Error("Cannot find module '" + b + "'");
                    throw c.code = "MODULE_NOT_FOUND", c;
                }
                c = k[b] = {
                    exports: {}
                };
                p[b][0].call(c.exports, function(f) {
                    return a(p[b][1][f] || f)
                }, c, c.exports, m, p, k, h)
            }
            return k[b].exports
        }
        for (var g = "function" == typeof require && require, c = 0; c < h.length; c++) a(h[c]);
        return a
    }
    return m
})()({
    1: [function(m, p, k) {
        Object.defineProperty(k, "__esModule", {
            value: !0
        });
        var h = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(a) {
            return typeof a
        } : function(a) {
            return a && "function" === typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        };
        k.default = function() {
            function a() {
                k = !0;
                Moff.each(v, function(a, f) {
                    b.include(f.id, f.callback)
                })
            }

            function g(a) {
                for (var b = [], c = a.length, n = 0, g; n < c; n++) {
                    g = a[n];
                    var h = f.createElement("a");
                    h.href = g;
                    g = h;
                    m.hasOwnProperty(g.host) || (m[g.host] = []); - 1 === m[g.host].indexOf(g.pathname) && (m[g.host].push(g.pathname),
                        b.push(a[n]))
                }
                return b
            }

            function c() {
                Moff.each(n, function(a, c) {
                    c.loadOnScreen.length && -1 !== c.loadOnScreen.indexOf(Moff.getMode()) && !f.querySelectorAll('[data-load-module="' + a + '"]').length && b.include(a)
                })
            }
            var b = this,
                e = window,
                f = e.document,
                n = {},
                v = [],
                k = !1,
                m = {};
            this.register = function(a) {
                n[a.id] = {
                    loaded: !1,
                    depend: {
                        js: a.depend && a.depend.js || [],
                        css: a.depend && a.depend.css || []
                    },
                    file: {
                        js: a.file && a.file.js || [],
                        css: a.file && a.file.css || []
                    },
                    loadOnScreen: a.loadOnScreen || [],
                    beforeInclude: a.beforeInclude || void 0,
                    afterInclude: a.afterInclude ||
                        void 0,
                    onWindowLoad: a.onWindowLoad || !1
                }
            };
            this.include = function(a, b) {
                function f() {
                    "function" === typeof e.afterInclude && e.afterInclude();
                    m && b()
                }
                var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
                    e = n[a];
                if (e) {
                    "object" === ("undefined" === typeof b ? "undefined" : h(b)) && (c = b, b = void 0);
                    var m = "function" === typeof b;
                    !c.reload && e.loaded ? m && b() : e.onWindowLoad && !k ? v.push({
                        id: a,
                        callback: b
                    }) : (e.loaded = !0, e.depend.js.length && (e.depend.js = g(e.depend.js)), e.depend.css.length && (e.depend.css = g(e.depend.css)),
                        e.file.css.length && (e.file.css = g(e.file.css)), e.file.js.length && (e.file.js = g(e.file.js)), "function" === typeof e.beforeInclude && e.beforeInclude(), Moff.loadAssets(e.depend, function() {
                            Moff.loadAssets(e.file, f, c)
                        }, c))
                } else Moff.debug(a + " AMD module is not registered.")
            };
            Moff.$(function() {
                e.addEventListener("load", a, !1);
                c()
            });
            this._testonly = {
                _deferredObjects: v,
                _registeredFiles: n
            }
        }
    }, {}],
    2: [function(m, p, k) {
        Object.defineProperty(k, "__esModule", {
            value: !0
        });
        var h = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
            function(a) {
                return typeof a
            } : function(a) {
                return a && "function" === typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
            };
        k.default = function() {
            function a(d) {
                if (z && d.matches || I !== l.getMode()) I = l.getMode(), l.runCallbacks(J, l, [l.getMode()]), l.handleDataEvents()
            }

            function g(d) {
                d = d.getAttribute("data-load-screen");
                var a = d.split(" ");
                return d ? a.length && -1 !== a.indexOf(l.getMode()) : !0
            }

            function c() {
                if (B.length)
                    for (var d = 0, a = B.slice(0), b = a.length; d < b; d++) {
                        var c = a[d];
                        l.inViewport(c) && (B.splice(d,
                            1), f(c))
                    }
            }

            function b(d, a) {
                l.ajax({
                    url: d,
                    type: "GET",
                    crossDomain: e(d),
                    success: function(d) {
                        "function" === typeof a && a(d)
                    }
                })
            }

            function e(d) {
                var a = document.createElement("a");
                a.href = d;
                return q.domain !== a.hostname
            }

            function f(d) {
                var a = d.title || "",
                    b = d.href || d.getAttribute("data-load-url"),
                    c = d.getAttribute("data-load-target"),
                    f = d.getAttribute("data-push-url"),
                    e = d.getAttribute("data-load-module");
                b ? (l.showPreloader(), b = n(d, b), d.removeAttribute("data-load-event"), l.runCallbacks(H, d), l.detect.history && null !== f &&
                    (f = Date.now(), r.history.pushState({
                        elemId: f,
                        url: b
                    }, a, b), K[f] = d), v(d, b, c, function() {
                        var a = document.querySelector(c);
                        e ? l.amd.include(e, function() {
                            l.hidePreloader();
                            l.removeClass(a, "moff-hidden");
                            l.runCallbacks(C, d)
                        }) : (l.hidePreloader(), l.removeClass(a, "moff-hidden"), l.runCallbacks(C, d))
                    })) : e && (l.showPreloader(), l.amd.include(e, function() {
                    l.hidePreloader()
                }))
            }

            function n(d, a) {
                return a.replace(/\{\{(.*?)\}\}/g, function(a, b) {
                    return -1 !== b.indexOf("-") ? d.getAttribute(b) : d[b]
                })
            }

            function v(d, a, f, c) {
                function u(a) {
                    var b =
                        d.getAttribute("data-page-title"),
                        u = q.querySelector(f);
                    null !== u && (l.addClass(u, "moff-hidden"), u.innerHTML = a);
                    b && (q.title = b);
                    c();
                    l.handleDataEvents()
                }
                a = m(a);
                A[a] ? u(A[a]) : b(a, u)
            }

            function k(d) {
                if (d = d.state) {
                    var a = K[d.elemId];
                    if (a && g(a)) {
                        d = d.url;
                        var b = a.getAttribute("data-load-target");
                        l.runCallbacks(H, a);
                        v(a, d, b, function() {
                            l.runCallbacks(C, a)
                        })
                    }
                }
            }

            function m(d) {
                var a = d.indexOf("#");
                return -1 === a ? d : d.substr(0, a)
            }

            function p() {
                l.each(q.querySelectorAll("[data-load-screen]"), function() {
                    g(this) && (this.removeAttribute("data-load-screen"),
                        this.handled = !0, f(this))
                })
            }
            var r = window,
                l = this,
                q = r.document,
                t = null,
                G = null,
                z = !(!r.matchMedia || !r.matchMedia("screen").addListener),
                x = z && r.matchMedia,
                y = "(min-width: %dpx)",
                D = y,
                E = y,
                J = [],
                L = [],
                M = !1,
                H = [],
                C = [],
                A = {},
                B = [],
                F = {},
                w = {
                    breakpoints: {
                        sm: 768,
                        md: 992,
                        lg: 1200
                    },
                    loadOnHover: !0,
                    cacheLiveTime: 2E3
                },
                N = "[data-load-target] [data-load-module] [data-load-event] [data-load-url] [data-load-screen] [data-push-url] [data-page-title]".split(" "),
                K = {};
            this.getPreloader = function() {
                return t
            };
            this.showPreloader = function() {
                var d =
                    0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : !0;
                this.hidePreloader();
                this.addClass(t, "__visible");
                d && this.addClass(t, "__default");
                l.detect.supportCSS3("transition") || this.addClass(t, "__ie9-preloader")
            };
            this.hidePreloader = function() {
                this.removeClass(t, "__visible __default __ie9-preloader");
                t.removeAttribute("style")
            };
            this.positionPreloader = function(d, a) {
                this.showPreloader(!1);
                "number" === typeof d && "number" === typeof a && (l.detect.supportCSS3("transition") ? (d = d + "px, " + a + "px", d = "-webkit-transform: translate(" +
                    d + ");\n\t\t\t\t-moz-transform: translate(" + d + ");\n\t\t\t\t-o-transform: translate(" + d + ");\n\t\t\t\ttransform: translate(" + d + ");") : (d = "left: " + d + "px; top: " + a + "px", this.addClass(t, "__ie9-preloader")), t.setAttribute("style", d))
            };
            this.addClass = function(a, b) {
                if (a) {
                    b = b.split(/\s/);
                    var d = b.length,
                        f = 0,
                        c;
                    for (c = " " + a.className + " "; f < d; f++) {
                        var u = b[f];
                        0 > c.indexOf(" " + u + " ") && (c += u + " ")
                    }
                    a.className = c.trim()
                }
            };
            this.removeClass = function(a, b) {
                if (a) {
                    b = b ? b.split(/\s/) : [];
                    for (var d = b.length, f = a.className || "", c = 0; c <
                        d; c++) f = f.replace(new RegExp("(^| )" + b[c] + "( |$)"), " ");
                    a.className != f || d || (f = "");
                    a.className = f.trim();
                    return a
                }
            };
            this.handleDataEvents = function() {
                p();
                l.each(q.querySelectorAll(N.join(", ")), function() {
                    var a = this,
                        c = this;
                    if (!c.handled) {
                        var e = (c.getAttribute("data-load-event") || "click").toLowerCase();
                        Moff.detect.isMobile && "click" === e && (e = "touchstart");
                        "dom" === e ? (l.$(function() {
                                f(c)
                            }), e = "click") : "scroll" === e ? l.inViewport(c) ? f(c) : B.push(c) : ("click" === e || "touchstart" === e) && w.loadOnHover && !l.detect.isMobile &&
                            c.addEventListener("mouseenter", function() {
                                c = a;
                                var d = c.href || c.getAttribute("data-load-url");
                                d && (d = m(d)) && (d = n(c, d), b(d, function(a) {
                                    A[d] = a;
                                    setTimeout(function() {
                                        delete A[d]
                                    }, w.cacheLiveTime)
                                }))
                            }, !1);
                        c.addEventListener(e, function(a) {
                            f(this);
                            a.preventDefault()
                        }, !1);
                        c.handled = !0
                    }
                })
            };
            this.inViewport = function(a) {
                var d = a.getBoundingClientRect();
                a = d.top + window.scrollY;
                var b = d.left + window.scrollX,
                    c = d.width;
                d = d.height;
                return a < r.pageYOffset + r.innerHeight && b < r.pageXOffset + r.innerWidth && a + d > r.pageYOffset && b +
                    c > r.pageXOffset
            };
            this.ajax = function(a) {
                var d = [];
                a.type = a.type.toUpperCase();
                if ("object" === h(a.data)) {
                    var b = a.data;
                    this.each(b, function(a, b) {
                        d.push(encodeURIComponent(a) + "=" + encodeURIComponent(b))
                    });
                    a.data = d.join("&")
                }
                "GET" === a.type && a.data && (a.url += (-1 !== a.url.indexOf("?") ? "&" : "?") + a.data.replace(/%20/g, "+"), a.data = null);
                b = new XMLHttpRequest;
                b.open(a.type, a.url, !0);
                b.setRequestHeader("Content-Type", a.contentType || "application/x-www-form-urlencoded; charset=UTF-8");
                a.crossDomain || b.setRequestHeader("X-Requested-With",
                    "XMLHttpRequest");
                b.onload = function() {
                    var d = this.status;
                    200 <= d && 300 > d || 304 === d ? a.success(this.responseText, this) : a.error(this)
                };
                b.send(a.data)
            };
            this.runCallbacks = function(a, b, c) {
                Array.isArray(a) || (a = []);
                l.each(a, function(a, d) {
                    "function" === typeof d && d.apply(b, c)
                })
            };
            this.onViewChange = function(a) {
                "function" !== typeof a ? this.debug("Moff.onViewChange callback must be a function") : J.push(a)
            };
            this.beforeLoad = function(a) {
                "function" !== typeof a ? this.debug("Moff.beforeLoad callback must be a function") : H.push(a)
            };
            this.afterLoad = function(a) {
                "function" !== typeof a ? this.debug("Moff.afterLoad callback must be a function") : C.push(a)
            };
            this.getMode = function() {
                var a = "xs";
                if (z) x(E).matches ? a = "lg" : x(D).matches ? a = "md" : x(y).matches && (a = "sm");
                else {
                    var b = q.documentElement.clientWidth,
                        c = w.breakpoints;
                    b >= c.lg ? a = "lg" : b >= c.md ? a = "md" : b >= c.sm && (a = "sm")
                }
                return a
            };
            this.loadAssets = function(a, b) {
                function d() {
                    var c = a.js[g];
                    c && l.loadJS(c, function() {
                        g++;
                        e++;
                        e === n ? k && b() : d()
                    }, f)
                }

                function c() {
                    e++;
                    e === n && k && b()
                }
                var f = 2 < arguments.length &&
                    void 0 !== arguments[2] ? arguments[2] : {},
                    e = 0,
                    n = 0,
                    g = 0,
                    h = Array.isArray(a.css),
                    u = Array.isArray(a.js),
                    k = "function" === typeof b;
                u && (n += a.js.length);
                h && (n += a.css.length);
                n ? (d(), h && a.css.length && this.each(a.css, function(a, d) {
                    l.loadCSS(d, c, f)
                })) : (Moff.debug("You must pass minimum one js or css file"), k && b())
            };
            this.loadJS = function(a, b) {
                function d() {
                    F[a] = !0;
                    n && b()
                }

                function c() {
                    var b = q.createElement("script");
                    F[a] = !1;
                    b.setAttribute("src", a);
                    b.addEventListener("load", d, !1);
                    q.querySelector("body").appendChild(b)
                }
                var f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                if ("string" !== typeof a) this.debug("Moff.loadJS source must be a string");
                else {
                    "object" === ("undefined" === typeof b ? "undefined" : h(b)) && (f = b, b = void 0);
                    var e = q.querySelector('script[src="' + a + '"]'),
                        n = "function" === typeof b;
                    f.reload ? (e && e.parentNode.removeChild(e), c()) : e ? F.hasOwnProperty(a) && !F[a] ? e.addEventListener("load", d, !1) : b() : c()
                }
            };
            this.loadCSS = function(a, b) {
                function d() {
                    var d = q.createElement("link");
                    e && d.addEventListener("load", b, !1);
                    d.setAttribute("href", a);
                    d.setAttribute("rel", "stylesheet");
                    q.querySelector("head").appendChild(d);
                    d.onreadystatechange = function() {
                        var a = d.readyState;
                        if ("loaded" === a || "complete" === a) d.onreadystatechange = null, e && b()
                    }
                }
                var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                if ("string" !== typeof a) this.debug("Moff.loadCSS source must be a string");
                else {
                    "object" === ("undefined" === typeof b ? "undefined" : h(b)) && (c = b, b = void 0);
                    var f = q.querySelector('link[href="' + a + '"]'),
                        e = "function" === typeof b;
                    c.reload ?
                        (f && f.parentNode.removeChild(f), d()) : f ? e && b() : d()
                }
            };
            this.settings = function(a, b) {
                if ("undefined" === typeof b) return w[a];
                w[a] = b
            };
            this.each = function(a, b) {
                var d = 0,
                    c = a.length,
                    f;
                (f = Array.isArray(a)) || (f = Object.prototype.toString.call(a), f = h(/^\[object (HTMLCollection|NodeList)\]$/.test(f)) && a.hasOwnProperty("length") && (0 === a.length || "object" === h(a[0]) && 0 < a[0].nodeType));
                if (f)
                    for (; d < c && (f = b.call(a[d], d, a[d]), !1 !== f); d++);
                else
                    for (d in a)
                        if (a.hasOwnProperty(d) && (f = b.call(a[d], d, a[d]), !1 === f)) break
            };
            this.$ =
                function(a) {
                    "function" !== typeof a ? this.debug("Moff.$ argument must be a function") : M ? a() : L.push(a)
                };
            this.debug = function(a) {
                window.console && window.console.debug && window.console.debug("Moff DEBUG: " + a)
            };
            this.error = function(a) {
                throw a;
            };
            this.version = "1.12.5";
            (function() {
                l.each(window.moffConfig || {}, function(a, b) {
                    w[a] = b
                })
            })();
            (function() {
                if (w.breakpoints && z) {
                    var a = w.breakpoints;
                    y = y.replace("%d", a.sm);
                    D = D.replace("%d", a.md);
                    E = E.replace("%d", a.lg)
                }
            })();
            var I = l.getMode();
            q.addEventListener("DOMContentLoaded",
                function() {
                    M = !0;
                    var b = document.createElement("style");
                    b.appendChild(document.createTextNode('\n\t\t\t.moff-loader {\n\t\t\t\tdisplay: none;\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 50px;\n\t\t\t\theight: 50px;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\tz-index: 9999;\n\t\t\t\t-webkit-transition: 0s ease-in;\n\t\t\t\t-moz-transition: 0s ease-in;\n\t\t\t\t-o-transition: 0s ease-in;\n\t\t\t\ttransition: 0s ease-in;\n\t\t\t}\n\t\t\t.moff-loader.__default {\n\t\t\t\ttop: 12px;\n\t\t\t\tleft: 50%;\n\t\t\t\tmargin-left: -25px;\n\t\t\t\tposition: fixed;\n\t\t\t}\n\t\t\t.moff-loader.__ie9-preloader {\n\t\t\t\tbackground: url(\'http://moffjs.com/images/ie9-preloader.gif\');\n\t\t\t}\n\t\t\t.moff-loader.__ie9-preloader .moff-loader_box {\n\t\t\t\tdisplay: none;\n\n\t\t\t}\n\t\t\t.moff-loader.__visible {\n\t\t\t\tdisplay: block;\n\t\t\t}\n\t\t\t.moff-loader_box {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\tborder: 1px solid transparent;\n\t\t\t\tborder-top-color: #3498db;\n\t\t\t\t-webkit-animation: spin 2s linear infinite;\n\t\t\t\tanimation: spin 2s linear infinite;\n\t\t\t}\n\t\t\t.moff-loader_box:before {\n\t\t\t\tcontent: "";\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 2px;\n\t\t\t\tleft: 2px;\n\t\t\t\tright: 2px;\n\t\t\t\tbottom: 2px;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\tborder: 1px solid transparent;\n\t\t\t\tborder-top-color: #e74c3c;\n\t\t\t\t-webkit-animation: spin 3s linear infinite;\n\t\t\t\tanimation: spin 3s linear infinite;\n\t\t\t}\n\t\t\t.moff-loader_box:after {\n\t\t\t\tcontent: "";\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 5px;\n\t\t\t\tleft: 5px;\n\t\t\t\tright: 5px;\n\t\t\t\tbottom: 5px;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\tborder: 1px solid transparent;\n\t\t\t\tborder-top-color: #f9c922;\n\t\t\t\t-webkit-animation: spin 1.5s linear infinite;\n\t\t\t\tanimation: spin 1.5s linear infinite;\n\t\t\t}\n\t\t\t.moff-hidden {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t@-webkit-keyframes spin {\n\t\t\t\t0% {\n\t\t\t\t\t-webkit-transform: rotate(0deg);\n\t\t\t\t\t-ms-transform: rotate(0deg);\n\t\t\t\t\ttransform: rotate(0deg);\n\t\t\t\t}\n\t\t\t\t100% {\n\t\t\t\t\t-webkit-transform: rotate(360deg);\n\t\t\t\t\t-ms-transform: rotate(360deg);\n\t\t\t\t\ttransform: rotate(360deg);\n\t\t\t\t}\n\t\t\t}\n\t\t\t@keyframes spin {\n\t\t\t\t0% {\n\t\t\t\t\t-webkit-transform: rotate(0deg);\n\t\t\t\t\t-ms-transform: rotate(0deg);\n\t\t\t\t\ttransform: rotate(0deg);\n\t\t\t\t}\n\t\t\t\t100% {\n\t\t\t\t\t-webkit-transform: rotate(360deg);\n\t\t\t\t\t-ms-transform: rotate(360deg);\n\t\t\t\t\ttransform: rotate(360deg);\n\t\t\t\t}\n\t\t\t}\n\t\t'));
                    document.querySelector("head").appendChild(b);
                    t = q.createElement("div");
                    G = q.createElement("div");
                    t.setAttribute("class", "moff-loader");
                    G.setAttribute("class", "moff-loader_box");
                    q.body.appendChild(t);
                    t.appendChild(G);
                    z ? (x(E).addListener(a), x(D).addListener(a), x(y).addListener(a)) : r.addEventListener("resize", a, !1);
                    r.addEventListener("scroll", c, !1);
                    r.addEventListener("popstate", k, !1);
                    l.handleDataEvents();
                    l.runCallbacks(L, this)
                }, !1);
            this._testonly = {
                _cache: A,
                _loader: function() {
                    return t
                }
            }
        }
    }, {}],
    3: [function(m,
            p, k) {
            Object.defineProperty(k, "__esModule", {
                value: !0
            });
            k.default = function() {
                var h = window,
                    a = this,
                    g = window.navigator.userAgent.toLowerCase(),
                    c = document;
                this.browser = {};
                this.OS = {};
                this.supportCSS3 = function(a) {
                    var b = a.charAt(0).toUpperCase() + a.slice(1);
                    b = (a + " " + ["Webkit", "Moz", "O", "ms"].join(b + " ") + b).split(" ");
                    for (var c = b.length, n = 0; n < c; n++)
                        if (a = b[n], -1 === a.indexOf("-") && void 0 !== document.createElement("div").style[a]) return !0;
                    return !1
                };
                (function() {
                    a.touch = !!("ontouchstart" in h || h.DocumentTouch && c instanceof h.DocumentTouch);
                    a.applicationCache = !!h.applicationCache;
                    a.canvas = function() {
                        var a = c.createElement("canvas");
                        return !(!a.getContext || !a.getContext("2d"))
                    }();
                    a.canvasText = !(!a.canvas || "function" !== typeof c.createElement("canvas").getContext("2d").fillText);
                    a.dragAndDrop = function() {
                        var a = c.createElement("div");
                        return "draggable" in a || "ondragstart" in a && "ondrop" in a
                    }();
                    a.hashChange = !!("onhashchange" in h && ("undefined" === typeof c.documentMode || 7 < c.documentMode));
                    a.history = !(!h.history || !history.pushState);
                    a.postMessage = !!h.postMessage;
                    a.webSockets = !!("WebSocket" in h || "MozWebSocket" in h);
                    a.webWorkers = !!h.Worker;
                    a.audio = function() {
                        var a = c.createElement("audio"),
                            b = !1;
                        try {
                            a.canPlayType && (b = {}, b.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), b.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), b.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), b.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""))
                        } catch (v) {}
                        return b
                    }();
                    a.video = function() {
                        var a =
                            c.createElement("video"),
                            b = !1;
                        try {
                            a.canPlayType && (b = {}, b.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), b.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), b.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
                        } catch (v) {}
                        return b
                    }();
                    a.indexedDB = function() {
                        var a = ["indexedDB", "webkitIndexedDB", "mozIndexedDB", "OIndexedDB", "msIndexedDB"],
                            b;
                        for (b in a)
                            if (a.hasOwnProperty(b)) {
                                var c = h[a[b]];
                                if (void 0 !== c) return !1 === c ? a[b] : "function" === typeof c ?
                                    c.bind(h) : c
                            }
                        return !1
                    }();
                    try {
                        localStorage.setItem(a.mode, a.mode);
                        localStorage.removeItem(a.mode);
                        var b = !0
                    } catch (f) {
                        b = !1
                    }
                    a.localStorage = b;
                    try {
                        sessionStorage.setItem(a.mode, a.mode);
                        sessionStorage.removeItem(a.mode);
                        var e = !0
                    } catch (f) {
                        e = !1
                    }
                    a.sessionStorage = e
                })();
                (function() {
                    var b = /(edge)[\/]([0-9\.]+)/.exec(g) || /(chrome)[ \/]([\w.]+)/.exec(g) || /(webkit)[ \/]([\w.]+)/.exec(g) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(g) || /(msie) ([\w.]+)/.exec(g) || /(trident).+ rv:([\d+.]+)/.exec(g) || 0 > g.indexOf("compatible") &&
                        /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(g) || [];
                    "trident" === b[1] && (b[1] = "msie");
                    b[1] && (a.browser[b[1]] = !0);
                    b[2] && (a.browser.version = b[2]);
                    a.browser.chrome && (a.browser.webkit = !0)
                })();
                (function() {
                    var b = a.OS,
                        c = /(ipad|iphone|ipod)/g.test(g),
                        f = -1 < g.indexOf("mac"),
                        h = -1 < g.indexOf("win"),
                        k = -1 < g.indexOf("android"),
                        m = -1 < g.indexOf("windows phone");
                    c ? b.iOS = c : f ? b.macOS = f : h ? b.windows = h : k ? b.android = k : m && (b.windowsPhone = m)
                })();
                a.isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(g)
            }
        },
        {}
    ],
    4: [function(m, p, k) {
        Object.defineProperty(k, "__esModule", {
            value: !0
        });
        k.default = function() {
            var h = {};
            this.add = function(a) {
                "undefined" === typeof h[a] && (h[a] = [])
            };
            this.on = function(a, g) {
                this.add(a);
                "function" === typeof g && h[a].push(g)
            };
            this.once = function(a, g) {
                g._onceExecuted = !0;
                this.on(a, g)
            };
            this.trigger = function(a) {
                var g = this,
                    c = Array.prototype.slice.call(arguments, 1),
                    b = [];
                "undefined" !== typeof h[a] && (Moff.runCallbacks(h[a], this, c), Moff.each(h[a], function(a, c) {
                    c._onceExecuted && b.push(a)
                }), Moff.each(b,
                    function(b, c) {
                        g.off(a, h[a][c])
                    }))
            };
            this.get = function(a) {
                a = h[a];
                if (Array.isArray(a) && a.length) return a
            };
            this.off = function(a, g) {
                g ? Moff.each(h[a], function(c, b) {
                    if (b === g) return h[a].splice(c, 1), !1
                }) : h[a] = []
            };
            this._testonly = {
                _eventStore: h
            }
        }
    }, {}],
    5: [function(m, p, k) {
        function h(a) {
            return a && a.__esModule ? a : {
                default: a
            }
        }
        p = m("../../amd/src/amd.e6");
        p = h(p);
        k = m("../../core/src/core.e6");
        k = h(k);
        var a = m("../../event/src/event.e6");
        a = h(a);
        var g = m("../../detect/src/detect.e6");
        g = h(g);
        var c = m("../../modules/src/base.es6");
        c = h(c);
        m = m("../../modules/src/api.e6");
        m = h(m);
        window.Moff = new k.default;
        window.Moff.amd = new p.default;
        window.Moff.event = new a.default;
        window.Moff.Module = new c.default;
        window.Moff.detect = new g.default;
        window.Moff.modules = new m.default
    }, {
        "../../amd/src/amd.e6": 1,
        "../../core/src/core.e6": 2,
        "../../detect/src/detect.e6": 3,
        "../../event/src/event.e6": 4,
        "../../modules/src/api.e6": 6,
        "../../modules/src/base.es6": 7
    }],
    6: [function(m, p, k) {
        Object.defineProperty(k, "__esModule", {
            value: !0
        });
        k.default = function() {
            function h(a) {
                Array.isArray(a) &&
                    Moff.each(a, function(a, c) {
                        Moff.event.add(c)
                    })
            }
            var a = {},
                g = {};
            this.create = function(a, b, e, f) {
                "undefined" === typeof f && "undefined" === typeof e && "function" === typeof b ? (e = b, b = void 0) : "undefined" === typeof f && "function" === typeof e && "function" === typeof b && (f = e, e = b, b = void 0);
                e.prototype = f ? new f : Moff.Module;
                e.prototype.constructor = e;
                "undefined" === typeof g[a] && (g[a] = {
                    constructor: e,
                    depend: b
                })
            };
            this.initClass = function(c, b) {
                function e() {
                    var e = new f.constructor,
                        g = a[c];
                    Array.isArray(g) ? g.push(e) : a[c] = "undefined" !==
                        typeof g ? [g, e] : e;
                    "function" === typeof e.beforeInit && e.beforeInit();
                    b && Moff.each(b, function(a, b) {
                        e[a] = b
                    });
                    e.moduleName = c;
                    Array.isArray(e.events) && e.events.length && h(e.events);
                    e.setScope();
                    "function" === typeof e.init && e.init();
                    "function" === typeof e.afterInit && e.afterInit()
                }
                var f = g[c];
                if (f) try {
                    f.depend ? Moff.loadAssets(f.depend, e) : e()
                } catch (n) {
                    Moff.error(n)
                } else Moff.debug(c + " Class is not registered")
            };
            this.get = function(c) {
                return a.hasOwnProperty(c) && a[c] || void 0
            };
            this.getClass = function(a) {
                var b = function() {};
                g.hasOwnProperty(a) && (b = g[a]);
                return b
            };
            this.getAll = function() {
                return a
            };
            this.getBy = function(a, b) {
                var c = this.getAll(),
                    f = [];
                "class" === a && (a = "moduleName");
                Moff.each(c, function(c, e) {
                    Array.isArray(e) ? Moff.each(e, function(c, e) {
                        e[a] && e[a] === b && f.push(e)
                    }) : e[a] && e[a] === b && f.push(e)
                });
                return f
            };
            this.remove = function(c) {
                var b = 0,
                    e = "string" !== typeof c,
                    f = e ? c.moduleName : c,
                    g = a[f];
                if (Array.isArray(g)) {
                    for (var h = g.length; b < h; b++) {
                        var k = g[b];
                        if (e && k === c || !e && k.moduleName === f) g.splice(b, 1), h = g.length, --b
                    }
                    1 === g.length ?
                        a[f] = a[f][0] : a[f].length || delete a[f]
                } else delete a[f]
            };
            this._testonly = {
                _moduleClassStorage: g,
                _moduleObjectStorage: a
            }
        }
    }, {}],
    7: [function(m, p, k) {
        Object.defineProperty(k, "__esModule", {
            value: !0
        });
        var h = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(a) {
            return typeof a
        } : function(a) {
            return a && "function" === typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        };
        k.default = function() {
            this.scope = this.scopeSelector = null;
            this.events = [];
            this.beforeInit = function() {};
            this.init = function() {};
            this.afterInit = function() {};
            this.setScope = function() {
                this.scopeSelector && (this.scope = document.querySelector(this.scopeSelector))
            };
            this.find = function(a) {
                return this.scope.querySelectorAll(a)
            };
            this.reopen = function(a) {
                var g = this;
                "object" !== ("undefined" === typeof a ? "undefined" : h(a)) ? Moff.debug("Reopen method argument must be an object"): Moff.each(a, function(a, b) {
                    g[a] = b
                })
            }
        }
    }, {}]
}, {}, [5]);