function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance")
}

function _iterableToArray(e) {
    if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
    }
}

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}! function() {
    var e, t, n, i, r, a, o, s, d, c, l, p, u = document.documentElement,
        m = window.precisePrice ? window.precisePrice.config : {},
        v = 0,
        y = "3rdParty",
        w = 35e3,
        h = 992,
        f = !window.CustomEvent,
        g = !1,
        b = !0,
        P = !1,
        E = !1,
        T = {
            titles: {
                timeout: "Precise Price is temporarily timed out.",
                website: "Precise Price is currently not available.",
                vehicle: "Precise Price is currently not available."
            },
            messages: {
                timeout: "You might be able to fix the issue by exiting out and reopen the page. If it's not fixed, it might be because someone spilled coffee on it :) We'll get that fixed quickly so please shop around a little and try again in a few minutes.",
                website: "Please contact support to check the connection. Sorry for the inconvenience.",
                vehicle: "This vehicle is temporarily not supported by Precise Price. Please contact support. Sorry for the inconvenience."
            },
            exit: "EXIT"
        },
        N = {
            widget: "pp-widget",
            widgetInitialized: "pp-widget-initialized",
            overlay: "pp-overlay",
            popup: "pp-popup",
            showPopup: "pp-show-popup",
            hidePopup: "pp-hide-popup",
            iframe: "pp-iframe",
            loader: "pp-loader",
            loading: "pp-loading",
            active: "pp-active",
            error: "pp-error"
        },
        M = {},
        L = "";
    if (m.apiUrl = "https://dr-api-third-party-endpoint-tp52.df-tp.com/", f) F("browser");
    else {
        window.precisePrice = {
            openPopup: C,
            closePopup: k,
            getIframe: function(e) {
                if (M = {}, !e || !(e.writeupId || e.vdpUrl && (e.vehicleVin || e.entryPoint))) return void F("params");
                for (var t in P = !1, e) Object.hasOwnProperty.call(e, t) && (M[t] = e[t]);
                return (i = W({
                    type: "iframe",
                    className: N.iframe,
                    attr: {
                        scrolling: "no",
                        src: S(e)
                    }
                })).onload = V, c = (new Date).getTime(), i
            },
            sendRequest: K,
            getMonthlyPayment: function(e, t) {
                function n(n) {
                    (n = n || {}).vehicleVin = e, "function" == typeof t && t(n)
                }
                K({
                    url: m.apiUrl + "writeup-free/payment-terms?vin=" + e,
                    onSuccess: function(e) {
                        "object" === _typeof(e) ? n({
                            monthlyPayment: function(e, t, n) {
                                var i, r;
                                if (e <= 0) return 0;
                                if (0 === n) return (e / t).toFixed(0);
                                return i = 100 * n / 1e4 / 12, r = Math.pow(1 + i, t), (e * r * i / (r - 1)).toFixed(0)
                            }(e.downMax - e.downPayment, e.termLength, e.apr)
                        }) : n()
                    },
                    onError: n
                })
            },
            removeClass: J,
            numberFormat: function(e) {
                "number" != typeof e && "string" != typeof e && (e = "");
                return e = e.toString().replace(/(\d+)(\.\d+)?/g, function(e, t, n) {
                    return t.replace(/(\d)(?=(\d{3})+$)/g, "$1,") + (n || "")
                })
            },
            checkUrlError: function(e) {
                var t;
                if ((t = document.createElement("a")).href = e, void 0 === e) return !1;
                return !e || t.pathname.match(/^\/error/)
            },
            setButtonText: function(e) {
                _toConsumableArray(document.querySelectorAll(".pp-slider-button, .pp-button-title")).forEach(function(t) {
                    t.innerHTML = e
                }), m.buttonText = e
            },
            getConfig: function() {
                return m
            },
            beforeIframeRemove: function() {
                i = q(), o = {
                    clientType: y,
                    event: "dropSave"
                }, i && i.contentWindow.postMessage(JSON.stringify(o), "*")
            }
        };
        try {
            new CustomEvent("IE9")
        } catch (e) {
            window.CustomEvent = function(e, t) {
                var n;
                return t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                }, (n = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
            }, CustomEvent.prototype = Object.create(window.Event.prototype)
        }
        "loading" !== document.readyState ? I() : document.addEventListener("DOMContentLoaded", I)
    }

    function C(e) {
        var a = window.innerWidth - u.clientWidth;
        if (M = {}, e && (e.writeupId || e.vdpUrl && (e.vehicleVin || e.entryPoint))) {
            if (document.body.contains(n)) {
                if (!g) return void F("opened");
                clearTimeout(l), U()
            }
            for (var o in P = !1, E = !1, e) Object.hasOwnProperty.call(e, o) && (M[o] = e[o]);
            t = W({
                    type: "div",
                    className: N.overlay + " " + N.hidePopup
                }), n = W({
                    type: "div",
                    className: N.popup
                }),
                function(e) {
                    i && i.parentNode === n && n.removeChild(i);
                    (i = W({
                        type: "iframe",
                        className: N.iframe,
                        attr: {
                            scrolling: "no",
                            src: S(e)
                        }
                    })).onload = V, n.appendChild(i)
                }(e),
                function() {
                    if (!n) return;
                    r && r.parentNode === n && n.removeChild(r);
                    r = W({
                        type: "div",
                        innerHTML: '<svg viewBox="25 25 50 50"' + (m.styleVariables && m.styleVariables.primaryColor ? ' style="color:' + m.styleVariables.primaryColor + '"' : "") + '><circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg><div class="pp-loader-text pp-loader-text-1">Now loading...</div><div class="pp-loader-text pp-loader-text-2">Use this tool to calculate a precise price and payment.</div><div class="pp-loader-text pp-loader-text-3">Taxes and fees included!</div>',
                        className: N.loader
                    }), n.appendChild(r)
                }(), document.body.appendChild(t), document.body.appendChild(n), v = u.scrollTop, L = u.style.marginRight, t.style.cssText = "display:block;", t.offsetHeight, t.className += " pp-overlay-visible", n.style.cssText = "display:block;", n.offsetHeight, n.className += " pp-popup-visible " + N.loading, u.className += " " + N.active, u.style.marginRight = a + "px", c = (new Date).getTime(), s = setTimeout(function() {
                    R("timeout")
                }, w)
        } else F("params")
    }

    function x() {
        H() && (J(n, N.loading), r && r.parentNode === n && n.removeChild(r))
    }

    function S(e) {
        var t = "".concat(m.apiUrl, "loader?apiKey=").concat(m.apiKey),
            n = "?launcher=1&clientType=".concat(y, "&apiKey=").concat(m.apiKey).concat(e.vehicleVin ? "&vin=" + e.vehicleVin : "");
        if ("trade-in" === e.entryPoint || "test-drive" === e.entryPoint) {
            var i = "&configurationData%5BvdpUrl%5D=".concat(encodeURIComponent(e.vdpUrl));
            t = "".concat(m.apiUrl, "website/").concat(e.entryPoint).concat(n).concat(i)
        }
        return t
    }

    function V() {
        d = setTimeout(function() {
            P || R("website")
        }, 1e3)
    }

    function k() {
        O(), u.className.match(N.active) && (J(u, N.active), u.style.marginRight = L), v && window.innerWidth < h && (u.scrollTop = v), t instanceof Element && (t.className = N.overlay + " " + N.hidePopup), H() && (g = !0, n.className = N.popup, l = setTimeout(function() {
            U()
        }, 1e3)), document.dispatchEvent(new CustomEvent("ppClose", {
            bubbles: !0
        }))
    }

    function O() {
        clearTimeout(s), clearTimeout(d)
    }

    function U() {
        g = !1, document.body.contains(t) && document.body.removeChild(t), document.body.contains(n) && document.body.removeChild(n)
    }

    function I() {
        var t = function() {
            var e, t, n, i, r = window.location.hash;
            if (r.match(/^#pp\/\w{17}\/[\w-]+\/\d+$/i)) return e = r.split("/"), t = e[1], n = e[2], i = e[3], {
                vehicleVin: t,
                step: n,
                writeupId: i
            };
            return null
        }();
        m.apiKey ? ((e = W({
            type: "link",
            attr: {
                id: "precise-price-css",
                href: "https://cdn-tp1.df-tp.com/preciseprice-tp52/launcher/css/pp.css",
                rel: "stylesheet"
            }
        })).onload = function() {
            !1 !== m.isParseHash && t && C(t)
        }, p = A(), document.head.appendChild(e), function() {
            var e = location.protocol + "//" + location.hostname + location.pathname + location.search,
                t = document.querySelector("." + N.widget),
                n = t ? t.getAttribute("data-vin") : m.vehicleVin,
                i = _();
            if (!(n && m.recentlyViewed && m.recentlyViewed.recentlyViewedEnabled && m.recentlyViewed.recentlyViewedCount)) return;
            m.recentlyViewed.vehicles = i.recentlyViewedVehicles || [], m.recentlyViewed.vehicles.length >= m.recentlyViewed.recentlyViewedCount && m.recentlyViewed.vehicles.shift();
            for (var r = 0; r < m.recentlyViewed.vehicles.length; r++) m.recentlyViewed.vehicles[r].vin === n && m.recentlyViewed.vehicles.splice(r, 1);
            m.recentlyViewed.vehicles.push({
                vin: n,
                url: e
            }), i.recentlyViewedVehicles = m.recentlyViewed.vehicles, j(i)
        }(), function() {
            document.addEventListener("click", function(e) {
                var t, n = function(e) {
                        if (e && e.className.match(N.showPopup)) return e.className.match(N.widget) ? e : D(e, N.widget);
                        for (; e.parentNode;) {
                            if (e.parentNode.className && e.parentNode.className.match(N.showPopup)) return e.parentNode.className.match(N.widget) ? e.parentNode : D(e.parentNode, N.widget);
                            e = e.parentNode
                        }
                        return null
                    }(e.target),
                    r = {};
                n ? (e.preventDefault(), r.vehicleVin = n.getAttribute("data-vin"), r.vehicleImage = n.getAttribute("data-vehicle-image-url"), r.vdpUrl = n.getAttribute("data-vdp-url"), r.entryPoint = n.getAttribute("data-entry-point"), (t = n.getAttribute("data-payment-terms")) && (r.paymentTerms = JSON.parse(t)), C(r)) : e.target && e.target.className.match(N.hidePopup) && (o = {
                    clientType: y,
                    event: "close"
                }, E && i.parentNode ? i.contentWindow.postMessage(JSON.stringify(o), "*") : k(), e.preventDefault())
            }), window.MutationObserver ? new MutationObserver(function() {
                z()
            }).observe(u, {
                childList: !0,
                subtree: !0
            }) : document.addEventListener("DOMSubtreeModified", function() {
                z()
            });
            window.addEventListener("message", function(e) {
                var t, n;
                try {
                    t = JSON.parse(e.data)
                } catch (e) {
                    return
                }
                if (t.clientType === y) switch (t.event) {
                    case "configure":
                        var r = {
                                clientType: y,
                                theme: "responsive1"
                            },
                            a = {},
                            s = ["vehicleVin", "writeupId", "step"],
                            d = ["logo", "dealer", "styleVariables", "recentlyViewed", "vdpUrl", "inventoryUrl", "creditApplicationUrl", "userFont", "getApprovedFormUrl"],
                            l = "object" === _typeof(M.paymentTerms) ? M.paymentTerms : null;
                        for (n in P = !0, O(), i = q(), M) - 1 !== s.indexOf(n) && (r[n] = M[n]);
                        for (n in m) - 1 !== d.indexOf(n) && ("recentlyViewed" === n ? m[n].recentlyViewedEnabled && m[n].vehicles && (a.recentlyViewed = m[n].vehicles) : a[n] = m[n]);
                        M.vdpUrl && (a.vdpUrl = M.vdpUrl), M.vehicleImage && (a.vehicleImage = M.vehicleImage), o = {
                            clientType: y,
                            event: "init",
                            data: {
                                apiKey: m.apiKey,
                                apiUrl: m.apiUrl,
                                configurationData: a,
                                urlParams: r,
                                postData: l ? {
                                    paymentTerms: l
                                } : {},
                                noCache: b
                            }
                        }, i.contentWindow.postMessage(JSON.stringify(o), "*");
                        break;
                    case "ready":
                        E = !0, M.writeupId = t.data ? t.data.writeupId : "", i = q(), o = {
                            clientType: y,
                            event: "ready",
                            data: {
                                apiUrl: m.apiUrl,
                                timestamp: c,
                                windowWidth: window.innerWidth
                            }
                        }, i.contentWindow.postMessage(JSON.stringify(o), "*"), b = !1, x(), document.dispatchEvent(new CustomEvent("ppContentLoad", {
                            bubbles: !0
                        }));
                        break;
                    case "entryPointReady":
                        E = !0, P = !0, i = q(), o = {
                            clientType: y,
                            event: "entryPointReady",
                            data: {
                                styleVariables: m.styleVariables,
                                userFont: m.userFont,
                                windowWidth: window.innerWidth
                            }
                        }, O(), i.contentWindow.postMessage(JSON.stringify(o), "*"), b = !1, x(), document.dispatchEvent(new CustomEvent("ppContentLoad", {
                            bubbles: !0
                        }));
                        break;
                    case "pushState":
                    case "replaceState":
                        var p = t.event,
                            u = t.data.step,
                            v = "#pp/" + M.vehicleVin + "/" + u + "/" + M.writeupId;
                        document.dispatchEvent(new CustomEvent("ppStepChange", {
                            bubbles: !0,
                            detail: {
                                state: p,
                                step: u,
                                hash: v,
                                vehicleVin: M.vehicleVin,
                                writeupId: M.writeupId
                            }
                        }));
                        break;
                    case "updateWidget":
                        document.dispatchEvent(new CustomEvent("ppPaymentTermsUpdate", {
                            bubbles: !0,
                            detail: {
                                downPayment: t.data.down,
                                termLength: t.data.term,
                                apr: t.data.apr,
                                monthlyPayment: t.data.monthly,
                                creditScore: t.data.creditScore
                            }
                        }));
                        break;
                    case "changeLocation":
                        window.location = t.data.url;
                        break;
                    case "close":
                        k();
                        break;
                    case "error":
                        var w = t.data && t.data.errorType ? t.data.errorType : "";
                        R(w);
                        break;
                    case "internalError":
                        P = !0, O(), x(), document.dispatchEvent(new CustomEvent("ppContentLoad", {
                            bubbles: !0
                        }))
                }
            }), window.addEventListener("resize", function() {
                var e = window.innerWidth;
                i = q(), o = {
                    clientType: y,
                    event: "resize",
                    data: {
                        windowWidth: e
                    }
                }, document.body.contains(i) && p !== A() && (i.contentWindow.postMessage(JSON.stringify(o), "*"), p = !p)
            })
        }(), z(), function() {
            var e = _(),
                t = (new Date).getTime();
            if (/bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent) || !m.vehicleVin || e.warmUp && e.warmUp[m.vehicleVin] && t - e.warmUp[m.vehicleVin] < 18e5) return;
            K({
                url: m.apiUrl + "warmup.php?vehicleVin=" + m.vehicleVin,
                onSuccess: function(t) {
                    "object" === _typeof(t) && 1 === t.status && ((e = _()).warmUp || (e.warmUp = {}), e.warmUp[m.vehicleVin] = (new Date).getTime(), j(e))
                }
            })
        }(), document.dispatchEvent(new CustomEvent("ppReady", {
            bubbles: !0,
            detail: t
        }))) : F("params")
    }

    function A() {
        return window.matchMedia("(min-width: ".concat(h, "px)")).matches
    }

    function H() {
        return n instanceof Element
    }

    function W(e) {
        var t, n = document.createElement(e.type);
        for (t in e.className && (n.className = e.className), e.innerHTML && (n.innerHTML = e.innerHTML), e.attr) Object.hasOwnProperty.call(e.attr, t) && n.setAttribute(t, e.attr[t]);
        return n
    }

    function D(e, t) {
        if (e.closest) return e.closest("." + t);
        for (; e.parentNode;) {
            if (e.parentNode.className.match(t)) return e.parentNode;
            e = e.parentNode
        }
        return null
    }

    function q() {
        return document.body.contains(i) ? i : document.querySelector("." + N.iframe)
    }

    function z() {
        for (var e = document.querySelectorAll("." + N.widget), t = m.buttonText || "Calculate Your Payment", n = 0; n < e.length; n++) e[n].className.match(N.widgetInitialized) || e[n].getAttribute("data-type") || (e[n].className += " " + N.widgetInitialized + " " + N.showPopup, "" === e[n].innerHTML && (e[n].innerHTML = '<div class="pp-widget-content"><div class="pp-widget-button"><div class="pp-widget-title">' + t + "</div></div></div>"))
    }

    function R(e) {
        var t = T.titles[e],
            r = T.messages[e],
            o = T.exit;
        O(), a = W({
            type: "div",
            className: N.error,
            innerHTML: '<div class="pp-error-message"><div class="pp-error-title">' + t + '</div><div class="pp-error-text">' + r + '</div><a href="#" class="pp-error-exit pp-hide-popup">' + o + "</a></div>"
        }), H() && (J(n, N.loading), n.className += " pp-popup-error", n.appendChild(a), n.removeChild(i)), document.dispatchEvent(new CustomEvent("ppError", {
            bubbles: !0,
            detail: {
                errorMessage: {
                    title: t,
                    message: r,
                    exit: o
                }
            }
        }))
    }

    function J(e, t) {
        e.className = e.className.replace(new RegExp("(?:^|\\s)" + t + "(?!\\S)"), "")
    }

    function _() {
        var e = ("; " + document.cookie).split("; precisePrice=");
        if (!(e.length >= 2)) return {};
        try {
            return JSON.parse(e.pop().split(";").shift())
        } catch (e) {
            return {}
        }
    }

    function j(e) {
        var t = new Date((new Date).getTime() + 864e5);
        document.cookie = "precisePrice=" + JSON.stringify(e) + "; path=/; expires=" + t.toUTCString()
    }

    function F(e) {
        switch (e) {
            case "browser":
                console.warn("PrecisePrice: Unsupported browser!");
                break;
            case "params":
                console.warn("PrecisePrice: Required params are not provided!");
                break;
            case "opened":
                console.warn("PrecisePrice: Popup already opened!");
                break;
            case "init":
                console.warn("PrecisePrice: Init widget first!");
                break;
            case "price":
                console.warn("PrecisePrice: Vehicle price is not set!")
        }
    }

    function K(e) {
        var t = new XMLHttpRequest;

        function n() {
            "function" == typeof e.onError && e.onError()
        }
        t.open("GET", e.url, !0), t.setRequestHeader("X-Api-Key", m.apiKey), t.timeout = w, t.send(), t.onerror = n, t.ontimeout = n, t.onload = function() {
            if (200 === t.status) {
                var i;
                if (window.precisePrice.checkUrlError(t.responseURL)) return void n();
                try {
                    i = JSON.parse(t.responseText)
                } catch (e) {
                    return void n()
                }! function(t) {
                    "function" == typeof e.onSuccess && e.onSuccess(t)
                }(i)
            } else n()
        }
    }
}(),
function() {
    var e, t = window.precisePrice.getConfig(),
        n = void 0 !== document.createElement("div").style.transition,
        i = t.styleVariables && t.styleVariables.primaryColor ? ' style="color:' + t.styleVariables.primaryColor + '" ' : "",
        r = '<svg viewBox="25 25 50 50"' + i + '><circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg>',
        a = '<div class="pp-monthly-row"><div class="pp-monthly-title">Estimated Monthly Payment</div><div class="pp-monthly-result">$<span class="pp-monthly-value"></span>\t<small>/mo</small></div></div><div class="pp-slider-track"' + i + '><div class="pp-slider-selection"></div><div class="pp-slider-handle"></div></div><div class="pp-payment-terms-row"><div class="pp-payment-terms-item">$<span class="pp-down-payment-value"></span> down</div><div class="pp-payment-terms-item"><span class="pp-term-length-value"></span> mo</div><div class="pp-payment-terms-item"><span class="pp-apr-value"></span>% APR</div><div class="pp-payment-terms-item"><a class="pp-customize-link pp-show-popup" href="#"' + i + '>Customize</a></div></div><a class="pp-slider-button pp-show-popup" href="#"' + i + ">" + (t.buttonText || "Calculate Your Payment") + '</a><div class="pp-slider-loader"><div class="pp-slider-loader-text">Loading Your Monthly Payment...</div><div class="pp-loader">' + r + "</div></div>",
        o = {
            pp: "pp-widget",
            widget: "pp-slider-widget",
            widgetInitialized: "pp-widget-initialized",
            track: "pp-slider-track",
            handle: "pp-slider-handle",
            selection: "pp-slider-selection",
            downPayment: "pp-down-payment-value",
            monthlyPayment: "pp-monthly-value",
            termLength: "pp-term-length-value",
            apr: "pp-apr-value",
            loading: "pp-slider-loading",
            loader: "pp-slider-loader",
            customize: "pp-customize-link",
            button: "pp-slider-button"
        },
        s = {
            widget: null,
            track: null,
            handle: null,
            selection: null,
            downPayment: null,
            monthlyPayment: null,
            termLength: null,
            apr: null,
            loader: null
        },
        d = {},
        c = [],
        l = [];

    function p() {
        var n = document.querySelector("." + o.pp + "[data-type=slider]");
        n && (e = n.getAttribute("data-vin"), n.className += " " + o.widget + " " + o.widgetInitialized + " " + o.loading, n.innerHTML = a, s.widget = n, window.precisePrice.sendRequest({
            url: t.apiUrl + "writeup-free/payment-terms?vin=" + e,
            onSuccess: function(e) {
                if ("object" === _typeof(e)) {
                    for (var t in e) d[t] = e[t];
                    ! function() {
                        var e = 100 * Math.ceil(d.downMin / 100),
                            t = (100 * Math.floor(d.downMax / 100) - e) / 100 + 1;
                        for (var n in s) s[n] = document.querySelector("." + o[n]);
                        window.precisePrice.removeClass(s.widget, o.loading), s.widget.removeChild(s.loader), c = new Array(t).join().split(",").map(function(t, n) {
                            return e + 100 * n
                        }), d.downMin % 100 && c.unshift(d.downMin), d.downMax % 100 && c.push(d.downMax);
                        for (var i = 0; i < c.length; i++) l.push((c[i] - d.downMin) / (d.downMax - d.downMin) * 100);
                        s.termLength.innerHTML = d.termLength, s.apr.innerHTML = d.apr, m(), window.addEventListener("message", function(e) {
                            var t;
                            try {
                                t = JSON.parse(e.data)
                            } catch (e) {
                                return
                            }
                            "updateWidget" === t.event && (d.downPayment = t.data.down, d.termLength = t.data.term, d.apr = t.data.apr, d.monthlyPayment = Math.round(t.data.monthly), v())
                        }), s.track.addEventListener("mousedown", function(e) {
                            m(e), document.addEventListener("mousemove", m), document.addEventListener("mouseup", u), e.preventDefault()
                        }), s.track.addEventListener("touchstart", function(e) {
                            m(e), document.addEventListener("touchmove", m), document.addEventListener("touchend", u), e.preventDefault()
                        }), s.track.addEventListener("dragstart", function(e) {
                            e.preventDefault()
                        }), s.handle.addEventListener("mousedown", function(e) {
                            e.preventDefault()
                        }), s.handle.addEventListener("dragstart", function(e) {
                            e.preventDefault()
                        })
                    }()
                } else y()
            },
            onError: function() {
                y()
            }
        }))
    }

    function u() {
        document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", u), document.removeEventListener("touchmove", m), document.removeEventListener("touchend", u)
    }

    function m(e) {
        if (void 0 === e) d.monthlyPayment = h(d.downMax - d.downPayment, d.termLength, d.apr);
        else {
            var t, n, i = void 0 !== e.pageX ? e.pageX : e.touches[0].pageX,
                r = (u = s.track, {
                    top: (m = u.getBoundingClientRect()).top + pageYOffset,
                    left: m.left + pageXOffset
                }),
                a = i - r.left,
                o = s.track.offsetWidth,
                p = (i - r.left) / o * 100;
            p < 0 && (p = 0), a > o && (p = 100), t = l.reduce(function(e, t) {
                return Math.abs(t - p) < Math.abs(e - p) ? t : e
            }), n = l.indexOf(t), d.downPayment = c[n], d.monthlyPayment = h(d.downMax - c[n], d.termLength, d.apr)
        }
        var u, m;
        v()
    }

    function v(e) {
        var t, n = {
            down: d.downPayment
        };
        if (void 0 === e) t = (d.downPayment - d.downMin) / (d.downMax - d.downMin) * 100;
        else {
            var i = c.indexOf(d.downPayment);
            t = l[i]
        }
        s.widget.setAttribute("data-payment-terms", JSON.stringify(n)), s.downPayment.innerHTML = window.precisePrice.numberFormat(d.downPayment), s.monthlyPayment.innerHTML = window.precisePrice.numberFormat(d.monthlyPayment), s.termLength.innerHTML = d.termLength, s.apr.innerHTML = d.apr, s.selection.style.width = t + "%", s.handle.style.left = t + "%"
    }

    function y() {
        s.widget.className.match(o.loading) ? w() : (s.widget.style.height = s.widget.offsetHeight + "px", s.widget.offsetHeight, s.widget.style.height = 0, n ? s.widget.addEventListener("transitionend", w) : w())
    }

    function w() {
        s.widget.parentNode.removeChild(s.widget)
    }

    function h(e, t, n) {
        var i, r;
        return e <= 0 ? 0 : 0 === n ? (e / t).toFixed(0) : (i = 100 * n / 1e4 / 12, (e * (r = Math.pow(1 + i, t)) * i / (r - 1)).toFixed(0))
    }
    window.ppTest || (window.ppTest = {}), window.ppTest.sliderInit = p, p()
}(),
function() {
    var e = '<div class="pp-widget-content"><div class="pp-button-title">' + (window.precisePrice.getConfig().buttonText || "Calculate your payments") + '</div><div class="pp-button-monthly"><span class="pp-button-monthly-value">$---</span> /mo<div class="pp-loader"><svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div></div></div>',
        t = {
            pp: "pp-widget",
            widget: "pp-button-widget",
            widgetInitialized: "pp-widget-initialized",
            monthlyPayment: "pp-button-monthly-value",
            loading: "pp-loading",
            loader: "pp-loader",
            showPopup: "pp-show-popup"
        };

    function n() {
        for (var n = document.querySelectorAll("." + t.pp + "[data-type=button]"), r = 0; r < n.length; r++) {
            var a = n[r],
                o = a.getAttribute("data-vin");
            a.className.match(t.widgetInitialized) || (a.className += " " + t.widget + " " + t.widgetInitialized + " " + t.loading + " " + t.showPopup, a.innerHTML = e, window.precisePrice.getMonthlyPayment(o, i))
        }
    }

    function i(e) {
        for (var n = document.querySelectorAll("." + t.widget + '[data-vin="' + e.vehicleVin + '"]'), i = 0; i < n.length; i++) void 0 !== e.monthlyPayment && r(n[i], e.monthlyPayment), a(n[i])
    }

    function r(e, n) {
        e.querySelector("." + t.monthlyPayment).innerHTML = "$" + window.precisePrice.numberFormat(n)
    }

    function a(e) {
        var n = e.querySelector("." + t.loader);
        n && n.parentNode.removeChild(n), window.precisePrice.removeClass(e, t.loading)
    }
    window.ppTest || (window.ppTest = {}), window.ppTest.buttonInit = n, n(),
        function() {
            window.MutationObserver ? new MutationObserver(function() {
                n()
            }).observe(document.documentElement, {
                childList: !0,
                subtree: !0
            }) : document.addEventListener("DOMSubtreeModified", function() {
                n()
            });
            window.addEventListener("message", function(e) {
                var n;
                try {
                    n = JSON.parse(e.data)
                } catch (e) {
                    return
                }
                if ("updateWidget" === n.event) {
                    var i = document.querySelector("." + t.widget + '[data-vin="' + n.data.vehicleVin + '"]');
                    i && r(i, Math.round(n.data.monthly))
                }
            })
        }()
}();