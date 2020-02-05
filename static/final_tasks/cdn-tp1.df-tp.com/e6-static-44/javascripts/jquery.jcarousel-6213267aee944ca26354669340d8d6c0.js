/*
 jCarousel - v0.3.8 - 2018-05-31
 http://sorgalla.com/jcarousel/
 Copyright (c) 2006-2018 Jan Sorgalla; Licensed MIT */
(function(b) {
    var c = b.jCarousel = {};
    c.version = "0.3.8";
    var h = /^([+\-]=)?(.+)$/;
    c.parseTarget = function(b) {
        var a = !1,
            d = "object" !== typeof b ? h.exec(b) : null;
        d ? (b = parseInt(d[2], 10) || 0, d[1] && (a = !0, "-=" === d[1] && (b *= -1))) : "object" !== typeof b && (b = parseInt(b, 10) || 0);
        return {
            target: b,
            relative: a
        }
    };
    c.detectCarousel = function(b) {
        for (var a; 0 < b.length;) {
            a = b.filter("[data-jcarousel]");
            if (0 < a.length) return a;
            a = b.find("[data-jcarousel]");
            if (0 < a.length) return a;
            b = b.parent()
        }
        return null
    };
    c.base = function(e) {
        return {
            version: c.version,
            _options: {},
            _element: null,
            _carousel: null,
            _init: b.noop,
            _create: b.noop,
            _destroy: b.noop,
            _reload: b.noop,
            create: function() {
                this._element.attr("data-" + e.toLowerCase(), !0).data(e, this);
                if (!1 === this._trigger("create")) return this;
                this._create();
                this._trigger("createend");
                return this
            },
            destroy: function() {
                if (!1 === this._trigger("destroy")) return this;
                this._destroy();
                this._trigger("destroyend");
                this._element.removeData(e).removeAttr("data-" + e.toLowerCase());
                return this
            },
            reload: function(a) {
                if (!1 === this._trigger("reload")) return this;
                a && this.options(a);
                this._reload();
                this._trigger("reloadend");
                return this
            },
            element: function() {
                return this._element
            },
            options: function(a, d) {
                if (0 === arguments.length) return b.extend({}, this._options);
                if ("string" === typeof a) {
                    if ("undefined" === typeof d) return "undefined" === typeof this._options[a] ? null : this._options[a];
                    this._options[a] = d
                } else this._options = b.extend({}, this._options, a);
                return this
            },
            carousel: function() {
                this._carousel || (this._carousel = c.detectCarousel(this.options("carousel") || this._element)) ||
                    b.error('Could not detect carousel for plugin "' + e + '"');
                return this._carousel
            },
            _trigger: function(a, d, f) {
                var g, c = !1;
                f = [this].concat(f || []);
                (d || this._element).each(function() {
                    g = b.Event((e + ":" + a).toLowerCase());
                    b(this).trigger(g, f);
                    g.isDefaultPrevented() && (c = !0)
                });
                return !c
            }
        }
    };
    c.plugin = function(e, a) {
        var d = b[e] = function(a, g) {
            this._element = b(a);
            this.options(g);
            this._init();
            this.create()
        };
        d.fn = d.prototype = b.extend({}, c.base(e), a);
        b.fn[e] = function(a) {
            var g = Array.prototype.slice.call(arguments, 1),
                f = this;
            "string" ===
            typeof a ? this.each(function() {
                var d = b(this).data(e);
                if (!d) return b.error("Cannot call methods on " + e + ' prior to initialization; attempted to call method "' + a + '"');
                if (!b.isFunction(d[a]) || "_" === a.charAt(0)) return b.error('No such method "' + a + '" for ' + e + " instance");
                var c = d[a].apply(d, g);
                if (c !== d && "undefined" !== typeof c) return f = c, !1
            }) : this.each(function() {
                var f = b(this).data(e);
                f instanceof d ? f.reload(a) : new d(this, a)
            });
            return f
        };
        return d
    }
})(jQuery);
(function(b, c) {
    var h = b(c),
        e = function(a) {
            return parseFloat(a) || 0
        };
    b.jCarousel.plugin("jcarousel", {
        animating: !1,
        tail: 0,
        inTail: !1,
        resizeState: null,
        resizeTimer: null,
        lt: null,
        vertical: !1,
        rtl: !1,
        circular: !1,
        underflow: !1,
        relative: !1,
        _options: {
            list: function() {
                return this.element().children().eq(0)
            },
            items: function() {
                return this.list().children()
            },
            animation: 400,
            transitions: !1,
            wrap: null,
            vertical: null,
            rtl: null,
            center: !1
        },
        _list: null,
        _items: null,
        _target: b(),
        _first: b(),
        _last: b(),
        _visible: b(),
        _fullyvisible: b(),
        _init: function() {
            var a =
                this;
            a.resizeState = h.width() + "x" + h.height();
            this.onWindowResize = function() {
                a.resizeTimer && clearTimeout(a.resizeTimer);
                a.resizeTimer = setTimeout(function() {
                    var b = h.width() + "x" + h.height();
                    b !== a.resizeState && (a.resizeState = b, a.reload())
                }, 100)
            };
            return this
        },
        _create: function() {
            this._reload();
            h.on("resize.jcarousel", this.onWindowResize)
        },
        _destroy: function() {
            h.off("resize.jcarousel", this.onWindowResize)
        },
        _reload: function() {
            this.vertical = this.options("vertical");
            null == this.vertical && (this.vertical = e(this.list().height()) >
                e(this.list().width()));
            this.rtl = this.options("rtl");
            null == this.rtl && (this.rtl = function(a) {
                if ("rtl" === ("" + a.attr("dir")).toLowerCase()) return !0;
                var d = !1;
                a.parents("[dir]").each(function() {
                    if (/rtl/i.test(b(this).attr("dir"))) return d = !0, !1
                });
                return d
            }(this._element));
            this.lt = this.vertical ? "top" : "left";
            this.relative = "relative" === this.list().css("position");
            this._items = this._list = null;
            var a = 0 <= this.index(this._target) ? this._target : this.closest();
            this.circular = "circular" === this.options("wrap");
            this.underflow = !1;
            var d = {
                left: 0,
                top: 0
            };
            0 < a.length && (this._prepare(a), this.list().find("[data-jcarousel-clone]").remove(), this._items = null, this.underflow = this._fullyvisible.length >= this.items().length, this.circular = this.circular && !this.underflow, d[this.lt] = this._position(a) + "px");
            this.move(d);
            return this
        },
        list: function() {
            if (null === this._list) {
                var a = this.options("list");
                this._list = b.isFunction(a) ? a.call(this) : this._element.find(a)
            }
            return this._list
        },
        items: function() {
            if (null === this._items) {
                var a = this.options("items");
                this._items = (b.isFunction(a) ? a.call(this) : this.list().find(a)).not("[data-jcarousel-clone]")
            }
            return this._items
        },
        index: function(a) {
            return this.items().index(a)
        },
        closest: function() {
            var a = this,
                d = this.list().position()[this.lt],
                f = b(),
                g = !1,
                c = this.vertical ? "bottom" : this.rtl && !this.relative ? "left" : "right",
                p;
            this.rtl && this.relative && !this.vertical && (d += e(this.list().width()) - this.clipping());
            this.items().each(function() {
                f = b(this);
                if (g) return !1;
                var n = a.dimension(f);
                d += n;
                if (0 <= d)
                    if (p = n - e(f.css("margin-" + c)),
                        0 >= Math.abs(d) - n + p / 2) g = !0;
                    else return !1
            });
            return f
        },
        target: function() {
            return this._target
        },
        first: function() {
            return this._first
        },
        last: function() {
            return this._last
        },
        visible: function() {
            return this._visible
        },
        fullyvisible: function() {
            return this._fullyvisible
        },
        hasNext: function() {
            if (!1 === this._trigger("hasnext")) return !0;
            var a = this.options("wrap"),
                b = this.items().length - 1,
                f = this.options("center") ? this._target : this._last;
            return 0 <= b && !this.underflow && (a && "first" !== a || this.index(f) < b || this.tail && !this.inTail) ?
                !0 : !1
        },
        hasPrev: function() {
            if (!1 === this._trigger("hasprev")) return !0;
            var a = this.options("wrap");
            return 0 < this.items().length && !this.underflow && (a && "last" !== a || 0 < this.index(this._first) || this.tail && this.inTail) ? !0 : !1
        },
        clipping: function() {
            return e(this._element["inner" + (this.vertical ? "Height" : "Width")]())
        },
        dimension: function(a) {
            return e(a["outer" + (this.vertical ? "Height" : "Width")](!0))
        },
        scroll: function(a, d, f) {
            if (this.animating || !1 === this._trigger("scroll", null, [a, d])) return this;
            b.isFunction(d) && (f = d,
                d = !0);
            var g = b.jCarousel.parseTarget(a);
            if (g.relative) {
                a = this.items().length - 1;
                var c = Math.abs(g.target),
                    e = this.options("wrap");
                if (0 < g.target) {
                    var h = this.index(this._last);
                    if (h >= a && this.tail) this.inTail ? "both" === e || "last" === e ? this._scroll(0, d, f) : b.isFunction(f) && f.call(this, !1) : this._scrollTail(d, f);
                    else if (g = this.index(this._target), this.underflow && g === a && ("circular" === e || "both" === e || "last" === e) || !this.underflow && h === a && ("both" === e || "last" === e)) this._scroll(0, d, f);
                    else if (c = g + c, this.circular && c > a) {
                        e =
                            a;
                        for (a = this.items().get(-1); e++ < c;) a = this.items().eq(0), (g = 0 <= this._visible.index(a)) && a.after(a.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(a), g || (g = {}, g[this.lt] = this.dimension(a), this.moveBy(g)), this._items = null;
                        this._scroll(a, d, f)
                    } else this._scroll(Math.min(c, a), d, f)
                } else if (this.inTail) this._scroll(Math.max(this.index(this._first) - c + 1, 0), d, f);
                else if (h = this.index(this._first), g = this.index(this._target), g = this.underflow ? g : h, c = g - c, 0 >= g && (this.underflow && "circular" === e || "both" ===
                        e || "first" === e)) this._scroll(a, d, f);
                else if (this.circular && 0 > c) {
                    e = c;
                    for (a = this.items().get(0); 0 > e++;) a = this.items().eq(-1), (g = 0 <= this._visible.index(a)) && a.after(a.clone(!0).attr("data-jcarousel-clone", !0)), this.list().prepend(a), this._items = null, c = this.dimension(a), g = {}, g[this.lt] = -c, this.moveBy(g);
                    this._scroll(a, d, f)
                } else this._scroll(Math.max(c, 0), d, f)
            } else this._scroll(g.target, d, f);
            this._trigger("scrollend");
            return this
        },
        moveBy: function(a, b) {
            var f = this.list().position(),
                d = 1,
                c = 0;
            this.rtl && !this.vertical &&
                (d = -1, this.relative && (c = e(this.list().width()) - this.clipping()));
            a.left && (a.left = e(f.left) + c + e(a.left) * d + "px");
            a.top && (a.top = e(f.top) + c + e(a.top) * d + "px");
            return this.move(a, b)
        },
        move: function(a, d) {
            d = d || {};
            var f = this.options("transitions"),
                c = !!f,
                e = !!f.transforms,
                h = !!f.transforms3d,
                q = d.duration || 0,
                l = this.list();
            if (!c && 0 < q) l.animate(a, d);
            else {
                var m = d.complete || b.noop,
                    k = {};
                if (c) {
                    var r = {
                            transitionDuration: l.css("transitionDuration"),
                            transitionTimingFunction: l.css("transitionTimingFunction"),
                            transitionProperty: l.css("transitionProperty")
                        },
                        t = m;
                    m = function() {
                        b(this).css(r);
                        t.call(this)
                    };
                    d = f.easing || d.easing;
                    f = 0 < q ? e || h ? "all" : a.left ? "left" : "top" : "none";
                    k = {
                        transitionDuration: (0 < q ? q / 1E3 : 0) + "s",
                        transitionTimingFunction: d,
                        transitionProperty: f,
                        transform: "none"
                    }
                }
                h ? k.transform = "translate3d(" + (a.left || 0) + "," + (a.top || 0) + ",0)" : e ? k.transform = "translate(" + (a.left || 0) + "," + (a.top || 0) + ")" : b.extend(k, a);
                if (c && 0 < q) l.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", m);
                l.css(k);
                0 >= q && l.each(function() {
                    m.call(this)
                })
            }
        },
        _scroll: function(a, d, c) {
            if (this.animating) return b.isFunction(c) && c.call(this, !1), this;
            "object" !== typeof a ? a = this.items().eq(a) : "undefined" === typeof a.jquery && (a = b(a));
            if (0 === a.length) return b.isFunction(c) && c.call(this, !1), this;
            this.inTail = !1;
            this._prepare(a);
            a = this._position(a);
            var f = e(this.list().position()[this.lt]);
            if (a === f) return b.isFunction(c) && c.call(this, !1), this;
            f = {};
            f[this.lt] = a + "px";
            this._animate(f, d, c);
            return this
        },
        _scrollTail: function(a, c) {
            if (this.animating || !this.tail) return b.isFunction(c) &&
                c.call(this, !1), this;
            var d = this.list().position()[this.lt];
            this.rtl && this.relative && !this.vertical && (d += e(this.list().width()) - this.clipping());
            d = this.rtl && !this.vertical ? d + this.tail : d - this.tail;
            this.inTail = !0;
            var g = {};
            g[this.lt] = d + "px";
            this._update({
                target: this._target.next(),
                fullyvisible: this._fullyvisible.slice(1).add(this._visible.last())
            });
            this._animate(g, a, c);
            return this
        },
        _animate: function(a, c, f) {
            f = f || b.noop;
            if (!1 === this._trigger("animate")) return f.call(this, !1), this;
            this.animating = !0;
            var d =
                this.options("animation"),
                e = b.proxy(function() {
                    this.animating = !1;
                    var a = this.list().find("[data-jcarousel-clone]");
                    0 < a.length && (a.remove(), this._reload());
                    this._trigger("animateend");
                    f.call(this, !0)
                }, this);
            d = "object" === typeof d ? b.extend({}, d) : {
                duration: d
            };
            var h = d.complete || b.noop;
            !1 === c ? d.duration = 0 : "undefined" !== typeof b.fx.speeds[d.duration] && (d.duration = b.fx.speeds[d.duration]);
            d.complete = function() {
                e();
                h.call(this)
            };
            this.move(a, d);
            return this
        },
        _prepare: function(a) {
            var c = this.index(a),
                f = c,
                g = this.dimension(a),
                h = this.clipping(),
                p = this.vertical ? "bottom" : this.rtl ? "left" : "right",
                q = this.options("center"),
                l = {
                    target: a,
                    first: a,
                    last: a,
                    visible: a,
                    fullyvisible: g <= h ? a : b()
                },
                m;
            q && (g /= 2, h /= 2);
            if (g < h)
                for (;;) {
                    var k = this.items().eq(++f);
                    if (0 === k.length) {
                        if (!this.circular) break;
                        k = this.items().eq(0);
                        if (a.get(0) === k.get(0)) break;
                        (m = 0 <= this._visible.index(k)) && k.after(k.clone(!0).attr("data-jcarousel-clone", !0));
                        this.list().append(k);
                        m || (m = {}, m[this.lt] = this.dimension(k), this.moveBy(m));
                        this._items = null
                    }
                    m = this.dimension(k);
                    if (0 === m) break;
                    g += m;
                    l.last = k;
                    l.visible = l.visible.add(k);
                    m = e(k.css("margin-" + p));
                    g - m <= h && (l.fullyvisible = l.fullyvisible.add(k));
                    if (g >= h) break
                }
            if (!this.circular && !q && g < h)
                for (f = c; !(0 > --f);) {
                    k = this.items().eq(f);
                    if (0 === k.length) break;
                    m = this.dimension(k);
                    if (0 === m) break;
                    g += m;
                    l.first = k;
                    l.visible = l.visible.add(k);
                    m = e(k.css("margin-" + p));
                    g - m <= h && (l.fullyvisible = l.fullyvisible.add(k));
                    if (g >= h) break
                }
            this._update(l);
            this.tail = 0;
            q || "circular" === this.options("wrap") || "custom" === this.options("wrap") || this.index(l.last) !==
                this.items().length - 1 || (g -= e(l.last.css("margin-" + p)), g > h && (this.tail = g - h));
            return this
        },
        _position: function(a) {
            var c = this._first,
                b = e(c.position()[this.lt]),
                g = this.options("center"),
                h = g ? this.clipping() / 2 - this.dimension(c) / 2 : 0;
            this.rtl && !this.vertical ? (b = this.relative ? b - (e(this.list().width()) - this.dimension(c)) : b - (this.clipping() - this.dimension(c)), b += h) : b -= h;
            !g && (this.index(a) > this.index(c) || this.inTail) && this.tail ? (b = this.rtl && !this.vertical ? b - this.tail : b + this.tail, this.inTail = !0) : this.inTail = !1;
            return -b
        },
        _update: function(a) {
            var c = this,
                f = {
                    target: this._target,
                    first: this._first,
                    last: this._last,
                    visible: this._visible,
                    fullyvisible: this._fullyvisible
                },
                e = this.index(a.first || f.first) < this.index(f.first),
                h, p = function(d) {
                    var g = [],
                        h = [];
                    a[d].each(function() {
                        0 > f[d].index(this) && g.push(this)
                    });
                    f[d].each(function() {
                        0 > a[d].index(this) && h.push(this)
                    });
                    e ? g = g.reverse() : h = h.reverse();
                    c._trigger(d + "in", b(g));
                    c._trigger(d + "out", b(h));
                    c["_" + d] = a[d]
                };
            for (h in a) p(h);
            return this
        }
    })
})(jQuery, window);
(function(b) {
    b.jcarousel.fn.scrollIntoView = function(c, h, e) {
        c = b.jCarousel.parseTarget(c);
        var a = this.index(this._fullyvisible.first()),
            d = this.index(this._fullyvisible.last());
        c = c.relative ? 0 > c.target ? Math.max(0, a + c.target) : d + c.target : "object" !== typeof c.target ? c.target : this.index(c.target);
        if (c < a) return this.scroll(c, h, e);
        if (c >= a && c <= d) return b.isFunction(e) && e.call(this, !1), this;
        var f = this.items();
        a = this.clipping();
        var g = this.vertical ? "bottom" : this.rtl ? "left" : "right";
        d = 0;
        for (var n;;) {
            n = f.eq(c);
            if (0 ===
                n.length) break;
            d += this.dimension(n);
            if (d >= a) {
                f = parseFloat(n.css("margin-" + g)) || 0;
                d - f !== a && c++;
                break
            }
            if (0 >= c) break;
            c--
        }
        return this.scroll(c, h, e)
    }
})(jQuery);
(function(b) {
    b.jCarousel.plugin("jcarouselControl", {
        _options: {
            target: "+=1",
            event: "click",
            method: "scroll"
        },
        _active: null,
        _init: function() {
            this.onDestroy = b.proxy(function() {
                this._destroy();
                this.carousel().one("jcarousel:createend", b.proxy(this._create, this))
            }, this);
            this.onReload = b.proxy(this._reload, this);
            this.onEvent = b.proxy(function(c) {
                c.preventDefault();
                c = this.options("method");
                b.isFunction(c) ? c.call(this) : this.carousel().jcarousel(this.options("method"), this.options("target"))
            }, this)
        },
        _create: function() {
            this.carousel().one("jcarousel:destroy",
                this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend", this.onReload);
            this._element.on(this.options("event") + ".jcarouselcontrol", this.onEvent);
            this._reload()
        },
        _destroy: function() {
            this._element.off(".jcarouselcontrol", this.onEvent);
            this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend", this.onReload)
        },
        _reload: function() {
            var c = b.jCarousel.parseTarget(this.options("target")),
                h = this.carousel();
            c.relative ? h = h.jcarousel(0 < c.target ? "hasNext" : "hasPrev") :
                (c = "object" !== typeof c.target ? h.jcarousel("items").eq(c.target) : c.target, h = 0 <= h.jcarousel("target").index(c));
            this._active !== h && (this._trigger(h ? "active" : "inactive"), this._active = h);
            return this
        }
    })
})(jQuery);
(function(b) {
    b.jCarousel.plugin("jcarouselPagination", {
        _options: {
            perPage: null,
            item: function(c) {
                return '<a href="#' + c + '">' + c + "</a>"
            },
            event: "click",
            method: "scroll"
        },
        _carouselItems: null,
        _pages: {},
        _items: {},
        _currentPage: null,
        _init: function() {
            this.onDestroy = b.proxy(function() {
                this._destroy();
                this.carousel().one("jcarousel:createend", b.proxy(this._create, this))
            }, this);
            this.onReload = b.proxy(this._reload, this);
            this.onScroll = b.proxy(this._update, this)
        },
        _create: function() {
            this.carousel().one("jcarousel:destroy",
                this.onDestroy).on("jcarousel:reloadend", this.onReload).on("jcarousel:scrollend", this.onScroll);
            this._reload()
        },
        _destroy: function() {
            this._clear();
            this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend", this.onReload).off("jcarousel:scrollend", this.onScroll);
            this._carouselItems = null
        },
        _reload: function() {
            var c = this.options("perPage");
            this._pages = {};
            this._items = {};
            b.isFunction(c) && (c = c.call(this));
            if (null == c) this._pages = this._calculatePages();
            else {
                c = parseInt(c, 10) || 0;
                for (var h =
                        this._getCarouselItems(), e = 1, a = 0, d;;) {
                    d = h.eq(a++);
                    if (0 === d.length) break;
                    this._pages[e] = this._pages[e] ? this._pages[e].add(d) : d;
                    0 === a % c && e++
                }
            }
            this._clear();
            var f = this,
                g = this.carousel().data("jcarousel"),
                n = this._element,
                p = this.options("item"),
                q = this._getCarouselItems().length;
            b.each(this._pages, function(a, c) {
                var d = f._items[a] = b(p.call(f, a, c));
                d.on(f.options("event") + ".jcarouselpagination", b.proxy(function() {
                    var b = c.eq(0);
                    if (g.circular) {
                        var d = g.index(g.target()),
                            e = g.index(b);
                        parseFloat(a) > parseFloat(f._currentPage) ?
                            e < d && (b = "+=" + (q - d + e)) : e > d && (b = "-=" + (d + (q - e)))
                    }
                    g[this.options("method")](b)
                }, f));
                n.append(d)
            });
            this._update()
        },
        _update: function() {
            var c = this.carousel().jcarousel("target"),
                h;
            b.each(this._pages, function(b, a) {
                a.each(function() {
                    if (c.is(this)) return h = b, !1
                });
                if (h) return !1
            });
            this._currentPage !== h && (this._trigger("inactive", this._items[this._currentPage]), this._trigger("active", this._items[h]));
            this._currentPage = h
        },
        items: function() {
            return this._items
        },
        reloadCarouselItems: function() {
            this._carouselItems = null;
            return this
        },
        _clear: function() {
            this._element.empty();
            this._currentPage = null
        },
        _calculatePages: function() {
            for (var b = this.carousel().data("jcarousel"), h = this._getCarouselItems(), e = b.clipping(), a = 0, d = 0, f = 1, g = {}, n, p;;) {
                n = h.eq(d++);
                if (0 === n.length) break;
                p = b.dimension(n);
                a + p > e && (f++, a = 0);
                a += p;
                g[f] = g[f] ? g[f].add(n) : n
            }
            return g
        },
        _getCarouselItems: function() {
            this._carouselItems || (this._carouselItems = this.carousel().jcarousel("items"));
            return this._carouselItems
        }
    })
})(jQuery);
(function(b, c) {
    var h, e;
    b.each({
        hidden: "visibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange",
        webkitHidden: "webkitvisibilitychange"
    }, function(a, b) {
        if ("undefined" !== typeof c[a]) return h = a, e = b, !1
    });
    b.jCarousel.plugin("jcarouselAutoscroll", {
        _options: {
            target: "+=1",
            interval: 3E3,
            autostart: !0,
            method: "scroll"
        },
        _timer: null,
        _started: !1,
        _init: function() {
            this.onDestroy = b.proxy(function() {
                this._destroy();
                this.carousel().one("jcarousel:createend", b.proxy(this._create, this))
            }, this);
            this.onAnimateEnd =
                b.proxy(this._start, this);
            this.onVisibilityChange = b.proxy(function() {
                c[h] ? this._stop() : this._start()
            }, this)
        },
        _create: function() {
            this.carousel().one("jcarousel:destroy", this.onDestroy);
            b(c).on(e, this.onVisibilityChange);
            this.options("autostart") && this.start()
        },
        _destroy: function() {
            this._stop();
            this.carousel().off("jcarousel:destroy", this.onDestroy);
            b(c).off(e, this.onVisibilityChange)
        },
        _start: function() {
            this._stop();
            if (this._started) return this.carousel().one("jcarousel:animateend", this.onAnimateEnd),
                this._timer = setTimeout(b.proxy(function() {
                    this.carousel().jcarousel(this.options("method"), this.options("target"))
                }, this), this.options("interval")), this
        },
        _stop: function() {
            this._timer && (this._timer = clearTimeout(this._timer));
            this.carousel().off("jcarousel:animateend", this.onAnimateEnd);
            return this
        },
        start: function() {
            this._started = !0;
            this._start();
            return this
        },
        stop: function() {
            this._started = !1;
            this._stop();
            return this
        }
    })
})(jQuery, document);