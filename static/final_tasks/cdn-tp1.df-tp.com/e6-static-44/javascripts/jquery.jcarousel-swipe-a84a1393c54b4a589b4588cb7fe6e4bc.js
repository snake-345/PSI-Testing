/*
 j?arouselSwipe - v0.3.4 - 2016-02-18
 Copyright (c) 2015 Evgeniy Pelmenev; Licensed MIT */
(function(h) {
    h.jCarousel.plugin("jcarouselSwipe", {
        _options: {
            perSwipe: 1,
            draggable: !0,
            method: "scroll"
        },
        _init: function() {
            var a = this;
            this.carousel().on("jcarousel:reloadend", function() {
                a._reload()
            })
        },
        _create: function() {
            this._instance = this.carousel().data("jcarousel");
            this._instance._element.css("touch-action", this._instance.vertical ? "pan-x" : "pan-y");
            this._carouselOffset = this.carousel().offset()[this._instance.lt] + parseInt(this.carousel().css(this._instance.vertical ? "border-top-width" : "border-left-width")) +
                parseInt(this.carousel().css(this._instance.vertical ? "padding-top" : "padding-left"));
            this._slidesCount = this._instance.items().length;
            this.carousel().find("img, a").attr("draggable", !1).css("user-select", "none").on("dragstart", function(a) {
                a.preventDefault()
            });
            this._destroy();
            this._instance.items().length > this._instance.fullyvisible().length && this._initGestures()
        },
        _initGestures: function() {
            function a(a) {
                a = a.originalEvent || a || window.event;
                e = d(a);
                var c = Math.abs(f[k] - e[k]);
                var p = Math.abs(f[m] - e[m]);
                g && a.preventDefault();
                if (10 < p && p > c && !g) h(document).off("touchmove.jcarouselSwipe mousemove.jcarouselSwipe");
                else if (!b._instance.animating && 10 < c || g) a = f[k] - e[k], g || (g = !0, b._addClones(), b._currentLT = b._getListPosition(), c = b._instance.options("items"), n = (h.isFunction(c) ? c.call(b._instance) : b._instance.list().find(c)).last(), l = b._instance.rtl && !b._instance.vertical ? b._instance.dimension(b._instance.list()) - n.position()[b._instance.lt] - b._instance.clipping() : -1 * (n.position()[b._instance.lt] + b._instance.dimension(n) - b._instance.clipping())),
                    a = "circular" === b._instance._options.wrap ? b._currentLT - a : b._instance.rtl && !b._instance.vertical ? Math.max(0, Math.min(b._currentLT - a, l)) : Math.min(0, Math.max(b._currentLT - a, l)), b._setListPosition(a + "px")
            }

            function c(a) {
                a = a.originalEvent || a || window.event;
                e = d(a);
                var c = Math.abs(f[k] - e[k]),
                    p = Math.abs(f[m] - e[m]);
                if (g || !b._options.draggable && 10 < c && c > p) {
                    c = b._getNewTarget(0 < f[k] - e[k]);
                    c = "circular" === b._instance._options.wrap ? c.relative : c.static;
                    if (q === a.target) h(a.target).on("click.disable", function(a) {
                        a.stopImmediatePropagation();
                        a.stopPropagation();
                        a.preventDefault();
                        h(a.target).off("click.disable")
                    });
                    "circular" === b._instance._options.wrap && (b._removeClones(), b._instance._items = null);
                    g = !1;
                    b._instance[b._options.method](c, function() {
                        "circular" !== b._instance._options.wrap && (b._removeClones(), b._instance._items = null)
                    })
                }
                h(document).off("touchmove.jcarouselSwipe mousemove.jcarouselSwipe");
                h(document).off("touchend.jcarouselSwipe touchcancel.jcarouselSwipe mouseup.jcarouselSwipe")
            }

            function d(a) {
                return void 0 !== a.touches && 0 < a.touches.length ? {
                    x: a.touches[0].pageX,
                    y: a.touches[0].pageY
                } : void 0 !== a.changedTouches && 0 < a.changedTouches.length ? {
                    x: a.changedTouches[0].pageX,
                    y: a.changedTouches[0].pageY
                } : void 0 !== a.pageX ? {
                    x: a.pageX,
                    y: a.pageY
                } : {
                    x: a.clientX,
                    y: a.clientY
                }
            }
            var b = this,
                f = {},
                e = {},
                g = !1,
                k = this._instance.vertical ? "y" : "x",
                m = this._instance.vertical ? "x" : "y",
                l, n, q;
            this._element.on("touchstart.jcarouselSwipe mousedown.jcarouselSwipe", function(e) {
                e = e.originalEvent || e || window.event;
                f = d(e);
                q = e.target || e.srcElement;
                if (b._options.draggable && !b._instance.animating) h(document).on("touchmove.jcarouselSwipe mousemove.jcarouselSwipe",
                    a);
                h(document).on("touchend.jcarouselSwipe touchcancel.jcarouselSwipe mouseup.jcarouselSwipe", c)
            })
        },
        _getNewTarget: function(a) {
            var c = this._instance.target(),
                d = this._instance.index(c),
                b = 0,
                f = this._instance.rtl && !this._instance.vertical ? !a : a;
            if (this._options.draggable)
                for (;;) {
                    var e = this._instance.rtl && !this._instance.vertical ? c.offset()[this._instance.lt] + this._instance.dimension(c) - (this._carouselOffset + this._instance.clipping()) : c.offset()[this._instance.lt] - this._carouselOffset;
                    if (!c.length || a && 0 <=
                        e || !a && 0 >= e) break;
                    if (f) {
                        c = c.next();
                        if (!c.length) break;
                        d += 1
                    } else {
                        c = c.prev();
                        if (!c.length) break;
                        --d
                    }
                    b++
                } else d = f ? d + 1 : d - 1, b = 1;
            d = f ? d + Math.abs(b - this._options.perSwipe * Math.ceil(b / this._options.perSwipe)) : d - Math.abs(b - this._options.perSwipe * Math.ceil(b / this._options.perSwipe));
            "first" === this._instance._options.wrap ? d = Math.min(this._slidesCount - 1, d) : "last" === this._instance._options.wrap ? d = Math.max(0, d) : this._instance._options.wrap || (d = Math.max(0, Math.min(this._slidesCount - 1, d)));
            d %= this._slidesCount;
            b =
                this._options.perSwipe * Math.ceil(b / this._options.perSwipe);
            return {
                static: d,
                relative: (f ? "+" : "-") + "=" + b
            }
        },
        _getListPosition: function() {
            var a = this._instance.list(),
                c = a.position();
            this._instance.rtl && (c.left = a.width() + c.left - this._carousel.width());
            return c[this._instance.lt]
        },
        _setListPosition: function(a) {
            var c = this._instance.options("transitions"),
                d = !!c.transforms;
            c = !!c.transforms3d;
            var b = {},
                f = "left" === this._instance.lt;
            a = a || 0;
            c ? b.transform = "translate3d(" + (f ? a : 0) + "," + (f ? 0 : a) + ",0)" : d ? b.transform = "translate(" +
                (f ? a : 0) + "," + (f ? 0 : a) + ")" : b[this._instance.lt] = a;
            this._instance.list().css(b)
        },
        _addClones: function() {
            var a = this._instance,
                c = a.items(),
                d = a.first(),
                b = a.last(),
                f = a.dimension(h(window)),
                e, g, k = [],
                m = [],
                l = this._getListPosition(),
                n = {};
            if (!a._options.wrap) return !1;
            if ("last" !== a._options.wrap) {
                for (g = e = 0; e < f;) d = d.prev(), 0 === d.length ? (g = --g < -c.length ? -1 : g, e += a.dimension(c.eq(g)), k.push(c.eq(g).clone().attr("data-jcarousel-clone", !0))) : e += a.dimension(d);
                l = (a.rtl ? Math.max(l, e) : Math.min(l, -e)) + "px";
                a._items.first().before(k.reverse());
                n[a.lt] = l;
                a.move(n)
            }
            if ("first" !== a._options.wrap) {
                e = 0;
                g = -1;
                for (d = b; e < f;) d = d.next(), 0 === d.length ? (g = ++g > c.length - 1 ? 0 : g, e += a.dimension(c.eq(g)), m.push(c.eq(g).clone().attr("data-jcarousel-clone", !0))) : e += a.dimension(d);
                a._items.last().after(m)
            }
        },
        _removeClones: function() {
            var a = this._instance.first().position()[this._instance.lt],
                c = {};
            this._instance.list().find("[data-jcarousel-clone]").remove();
            if (a -= this._instance.first().position()[this._instance.lt]) c[this._instance.lt] = this._getListPosition() + a +
                "px", this._instance.move(c)
        },
        _destroy: function() {
            this._element.off("touchstart.jcarouselSwipe mousedown.jcarouselSwipe");
            h(document).off("touchmove.jcarouselSwipe mousemove.jcarouselSwipe touchend.jcarouselSwipe touchcancel.jcarouselSwipe mouseup.jcarouselSwipe")
        },
        _reload: function() {
            this._create()
        }
    })
})(jQuery);