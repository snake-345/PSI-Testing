/*
 j?arouselLazyLoading - v0.1.0 - 2015-12-10
 Copyright (c) 2015 Evgeniy Pelmenev; Licensed MIT */
(function(f) {
    f.jCarousel.isImagesLoaded = function(a) {
        a = a.find("img");
        var e = a.length,
            b = 0;
        f.each(a, function() {
            var a = this.complete ? "undefined" !== typeof this.naturalWidth && 0 === this.naturalWidth ? !1 : !0 : !1;
            a && b++
        });
        return b === e
    };
    f.jCarousel.plugin("jcarouselLazyLoading", {
        _options: {
            preventScroll: !0,
            waitFunction: function(a, e, b) {
                function g() {
                    c++;
                    f.jCarousel.isImagesLoaded(a) ? (e(), d.removeClass("loading")) : 100 >= c ? setTimeout(g, 100) : (e(), d.removeClass("loading"))
                }
                var c = 0,
                    d = a.find("img[data-src],img[data-srcset],source[data-srcset],source[data-sizes]");
                d.toggleClass("non-transition", !!b);
                d.each(function() {
                    var a = f(this),
                        b = a.attr("data-src"),
                        c = a.attr("data-srcset"),
                        d = a.attr("data-sizes");
                    a.addClass("loading");
                    a.attr("src", b).attr("srcset", c).attr("sizes", d).removeAttr("data-src").removeAttr("data-srcset").removeAttr("data-sizes");
                    "function" === typeof window.picturefill && a.is("img") && picturefill({
                        reevaluate: !0,
                        elements: [a[0]]
                    })
                });
                g()
            }
        },
        _loading: !1,
        _scrollPrevented: !1,
        _position: 0,
        _init: function() {
            var a = this;
            this._instance = this.carousel().data("jcarousel");
            this._element.on("jcarousel:reloadend.jcarouselLazyLoading", function() {
                a._reload()
            }).on("jcarousel:scroll.jcarouselLazyLoading", function(e, b, g, c) {
                b = a._position !== a._instance.list().position()[a._instance.lt];
                if (!a._loading && !b && a._options.preventScroll) {
                    b = a._getNextVisibleSlides(g);
                    var d = function() {};
                    a._scrollPrevented = a._loading = !0;
                    f.isFunction(c) && (d = c, c = !0);
                    a._options.waitFunction(b, function() {
                        a._scrollPrevented = !1;
                        a._instance.scroll(g, c, function() {
                            d();
                            a._loading = !1
                        })
                    }, !0);
                    e.preventDefault()
                }
                a._scrollPrevented &&
                    e.preventDefault()
            }).on("jcarousel:scrollend.jcarouselLazyLoading", function() {
                a._position === a._instance.list().position()[a._instance.lt] && a._options.preventScroll || a._options.waitFunction(a._instance.visible(), function() {})
            }).on("jcarousel:animateend.jcarouselLazyLoading", function() {
                a._position = a._instance.list().position()[a._instance.lt]
            })
        },
        _create: function() {
            this._reload()
        },
        _getNextVisibleSlides: function(a) {
            var e = this._instance.clipping(),
                b = this._instance.items().length,
                g, c = 0;
            var d = this._getSlide(a);
            a = this._instance.dimension(d);
            var f = d;
            var h = d.index();
            for (g = h + 1 >= b; a < e;) "circular" !== this._instance._options.wrap && g ? (0 < c && (c = 0), c--) : (c++, g = h + c + 1 >= b), d = this._getSlide(h + c), a += this._instance.dimension(d), f = f.add(d);
            return f
        },
        _getSlide: function(a) {
            a = f.jCarousel.parseTarget(a);
            var e = this._instance.items().length;
            if (a.relative) {
                var b = this._instance.index(this._instance.target());
                return this._instance.items().eq((b + a.target) % e)
            }
            return "number" === typeof a.target ? this._instance.items().eq(a.target % e) : a.target
        },
        _destroy: function() {
            this._element.off(".jcarouselLazyLoading")
        },
        _reload: function() {
            this._options.waitFunction(this._instance.visible(), function() {});
            this._position = this._instance.list().position()[this._instance.lt]
        }
    })
})(jQuery);