/*
 Bootstrap v3.3.6 (http://getbootstrap.com)
 Copyright 2011-2015 Twitter, Inc.
 Licensed under the MIT license
*/
if ("undefined" === typeof jQuery) throw Error("Bootstrap's JavaScript requires jQuery"); + function(b) {
    b = b.fn.jquery.split(" ")[0].split(".");
    if (2 > b[0] && 9 > b[1] || 1 == b[0] && 9 == b[1] && 1 > b[2] || 2 < b[0]) throw Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
}(jQuery); +
function(b) {
    function f() {
        var b = document.createElement("bootstrap"),
            c = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            },
            a;
        for (a in c)
            if (void 0 !== b.style[a]) return {
                end: c[a]
            };
        return !1
    }
    b.fn.emulateTransitionEnd = function(e) {
        var c = !1,
            a = this;
        b(this).one("bsTransitionEnd", function() {
            c = !0
        });
        setTimeout(function() {
            c || b(a).trigger(b.support.transition.end)
        }, e);
        return this
    };
    b(function() {
        b.support.transition = f();
        b.support.transition &&
            (b.event.special.bsTransitionEnd = {
                bindType: b.support.transition.end,
                delegateType: b.support.transition.end,
                handle: function(e) {
                    if (b(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            })
    })
}(jQuery); +
function(b) {
    var f = function(c) {
        b(c).on("click", '[data-dismiss="alert"]', this.close)
    };
    f.VERSION = "3.3.6";
    f.TRANSITION_DURATION = 150;
    f.prototype.close = function(c) {
        function a() {
            h.detach().trigger("closed.bs.alert").remove()
        }
        var d = b(this),
            g = d.attr("data-target");
        g || (g = (g = d.attr("href")) && g.replace(/.*(?=#[^\s]*$)/, ""));
        var h = b(g);
        c && c.preventDefault();
        h.length || (h = d.closest(".alert"));
        h.trigger(c = b.Event("close.bs.alert"));
        c.isDefaultPrevented() || (h.removeClass("in"), b.support.transition && h.hasClass("fade") ?
            h.one("bsTransitionEnd", a).emulateTransitionEnd(f.TRANSITION_DURATION) : a())
    };
    var e = b.fn.alert;
    b.fn.alert = function(c) {
        return this.each(function() {
            var a = b(this),
                d = a.data("bs.alert");
            d || a.data("bs.alert", d = new f(this));
            "string" == typeof c && d[c].call(a)
        })
    };
    b.fn.alert.Constructor = f;
    b.fn.alert.noConflict = function() {
        b.fn.alert = e;
        return this
    };
    b(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', f.prototype.close)
}(jQuery); +
function(b) {
    function f(a) {
        return this.each(function() {
            var d = b(this),
                g = d.data("bs.button"),
                c = "object" == typeof a && a;
            g || d.data("bs.button", g = new e(this, c));
            "toggle" == a ? g.toggle() : a && g.setState(a)
        })
    }
    var e = function(a, d) {
        this.$element = b(a);
        this.options = b.extend({}, e.DEFAULTS, d);
        this.isLoading = !1
    };
    e.VERSION = "3.3.6";
    e.DEFAULTS = {
        loadingText: "loading..."
    };
    e.prototype.setState = function(a) {
        var d = this.$element,
            g = d.is("input") ? "val" : "html",
            c = d.data();
        a += "Text";
        null == c.resetText && d.data("resetText", d[g]());
        setTimeout(b.proxy(function() {
            d[g](null ==
                c[a] ? this.options[a] : c[a]);
            "loadingText" == a ? (this.isLoading = !0, d.addClass("disabled").attr("disabled", "disabled")) : this.isLoading && (this.isLoading = !1, d.removeClass("disabled").removeAttr("disabled"))
        }, this), 0)
    };
    e.prototype.toggle = function() {
        var a = !0,
            d = this.$element.closest('[data-toggle="buttons"]');
        if (d.length) {
            var b = this.$element.find("input");
            "radio" == b.prop("type") ? (b.prop("checked") && (a = !1), d.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == b.prop("type") &&
                (b.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active"));
            b.prop("checked", this.$element.hasClass("active"));
            a && b.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var c = b.fn.button;
    b.fn.button = f;
    b.fn.button.Constructor = e;
    b.fn.button.noConflict = function() {
        b.fn.button = c;
        return this
    };
    b(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(a) {
        var d = b(a.target);
        d.hasClass("btn") || (d = d.closest(".btn"));
        f.call(d, "toggle");
        b(a.target).is('input[type="radio"]') || b(a.target).is('input[type="checkbox"]') || a.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(a) {
        b(a.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(a.type))
    })
}(jQuery); +
function(b) {
    function f(d) {
        return this.each(function() {
            var a = b(this),
                c = a.data("bs.carousel"),
                f = b.extend({}, e.DEFAULTS, a.data(), "object" == typeof d && d),
                l = "string" == typeof d ? d : f.slide;
            c || a.data("bs.carousel", c = new e(this, f));
            if ("number" == typeof d) c.to(d);
            else if (l) c[l]();
            else f.interval && c.pause().cycle()
        })
    }
    var e = function(d, a) {
        this.$element = b(d);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = a;
        this.$items = this.$active = this.interval = this.sliding = this.paused = null;
        this.options.keyboard &&
            this.$element.on("keydown.bs.carousel", b.proxy(this.keydown, this));
        "hover" != this.options.pause || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.bs.carousel", b.proxy(this.pause, this)).on("mouseleave.bs.carousel", b.proxy(this.cycle, this))
    };
    e.VERSION = "3.3.6";
    e.TRANSITION_DURATION = 600;
    e.DEFAULTS = {
        interval: 5E3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    };
    e.prototype.keydown = function(d) {
        if (!/input|textarea/i.test(d.target.tagName)) {
            switch (d.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            d.preventDefault()
        }
    };
    e.prototype.cycle = function(d) {
        d || (this.paused = !1);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval(b.proxy(this.next, this), this.options.interval));
        return this
    };
    e.prototype.getItemIndex = function(d) {
        this.$items = d.parent().children(".item");
        return this.$items.index(d || this.$active)
    };
    e.prototype.getItemForDirection = function(d, a) {
        var b = this.getItemIndex(a);
        return ("prev" == d && 0 === b || "next" == d && b == this.$items.length -
            1) && !this.options.wrap ? a : this.$items.eq((b + ("prev" == d ? -1 : 1)) % this.$items.length)
    };
    e.prototype.to = function(a) {
        var d = this,
            b = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(a > this.$items.length - 1 || 0 > a)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            d.to(a)
        }) : b == a ? this.pause().cycle() : this.slide(a > b ? "next" : "prev", this.$items.eq(a))
    };
    e.prototype.pause = function(a) {
        a || (this.paused = !0);
        this.$element.find(".next, .prev").length && b.support.transition && (this.$element.trigger(b.support.transition.end),
            this.cycle(!0));
        this.interval = clearInterval(this.interval);
        return this
    };
    e.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    };
    e.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    };
    e.prototype.slide = function(a, c) {
        var d = this.$element.find(".item.active"),
            g = c || this.getItemForDirection(a, d);
        c = this.interval;
        var f = "next" == a ? "left" : "right",
            k = this;
        if (g.hasClass("active")) return this.sliding = !1;
        var p = g[0],
            n = b.Event("slide.bs.carousel", {
                relatedTarget: p,
                direction: f
            });
        this.$element.trigger(n);
        if (!n.isDefaultPrevented()) {
            this.sliding = !0;
            c && this.pause();
            this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), (n = b(this.$indicators.children()[this.getItemIndex(g)])) && n.addClass("active"));
            var q = b.Event("slid.bs.carousel", {
                relatedTarget: p,
                direction: f
            });
            b.support.transition && this.$element.hasClass("slide") ? (g.addClass(a), g[0].offsetWidth, d.addClass(f), g.addClass(f), d.one("bsTransitionEnd", function() {
                g.removeClass([a, f].join(" ")).addClass("active");
                d.removeClass(["active",
                    f
                ].join(" "));
                k.sliding = !1;
                setTimeout(function() {
                    k.$element.trigger(q)
                }, 0)
            }).emulateTransitionEnd(e.TRANSITION_DURATION)) : (d.removeClass("active"), g.addClass("active"), this.sliding = !1, this.$element.trigger(q));
            c && this.cycle();
            return this
        }
    };
    var c = b.fn.carousel;
    b.fn.carousel = f;
    b.fn.carousel.Constructor = e;
    b.fn.carousel.noConflict = function() {
        b.fn.carousel = c;
        return this
    };
    var a = function(a) {
        var d, c = b(this),
            e = b(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (e.hasClass("carousel")) {
            d =
                b.extend({}, e.data(), c.data());
            if (c = c.attr("data-slide-to")) d.interval = !1;
            f.call(e, d);
            c && e.data("bs.carousel").to(c);
            a.preventDefault()
        }
    };
    b(document).on("click.bs.carousel.data-api", "[data-slide]", a).on("click.bs.carousel.data-api", "[data-slide-to]", a);
    b(window).on("load", function() {
        b('[data-ride="carousel"]').each(function() {
            var a = b(this);
            f.call(a, a.data())
        })
    })
}(jQuery); +
function(b) {
    function f(a) {
        var d;
        a = a.attr("data-target") || (d = a.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "");
        return b(a)
    }

    function e(a) {
        return this.each(function() {
            var d = b(this),
                h = d.data("bs.collapse"),
                f = b.extend({}, c.DEFAULTS, d.data(), "object" == typeof a && a);
            !h && f.toggle && /show|hide/.test(a) && (f.toggle = !1);
            h || d.data("bs.collapse", h = new c(this, f));
            if ("string" == typeof a) h[a]()
        })
    }
    var c = function(a, g) {
        this.$element = b(a);
        this.options = b.extend({}, c.DEFAULTS, g);
        this.$trigger = b('[data-toggle="collapse"][href="#' +
            a.id + '"],[data-toggle="collapse"][data-target="#' + a.id + '"]');
        this.transitioning = null;
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
        this.options.toggle && this.toggle()
    };
    c.VERSION = "3.3.6";
    c.TRANSITION_DURATION = 350;
    c.DEFAULTS = {
        toggle: !0
    };
    c.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    };
    c.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var a, g = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (g && g.length && (a = g.data("bs.collapse")) && a.transitioning) return;
            var h = b.Event("show.bs.collapse");
            this.$element.trigger(h);
            if (!h.isDefaultPrevented()) {
                g && g.length && (e.call(g, "hide"), a || g.data("bs.collapse", null));
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0).attr("aria-expanded", !0);
                this.$trigger.removeClass("collapsed").attr("aria-expanded", !0);
                this.transitioning = 1;
                a = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f]("");
                    this.transitioning =
                        0;
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!b.support.transition) return a.call(this);
                g = b.camelCase(["scroll", f].join("-"));
                this.$element.one("bsTransitionEnd", b.proxy(a, this)).emulateTransitionEnd(c.TRANSITION_DURATION)[f](this.$element[0][g])
            }
        }
    };
    c.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var a = b.Event("hide.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                a = this.dimension();
                this.$element[a](this.$element[a]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1);
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1);
                this.transitioning = 1;
                var g = function() {
                    this.transitioning = 0;
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                if (!b.support.transition) return g.call(this);
                this.$element[a](0).one("bsTransitionEnd", b.proxy(g, this)).emulateTransitionEnd(c.TRANSITION_DURATION)
            }
        }
    };
    c.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    c.prototype.getParent = function() {
        return b(this.options.parent).find('[data-toggle="collapse"][data-parent="' +
            this.options.parent + '"]').each(b.proxy(function(a, c) {
            a = b(c);
            this.addAriaAndCollapsedClass(f(a), a)
        }, this)).end()
    };
    c.prototype.addAriaAndCollapsedClass = function(a, b) {
        var d = a.hasClass("in");
        a.attr("aria-expanded", d);
        b.toggleClass("collapsed", !d).attr("aria-expanded", d)
    };
    var a = b.fn.collapse;
    b.fn.collapse = e;
    b.fn.collapse.Constructor = c;
    b.fn.collapse.noConflict = function() {
        b.fn.collapse = a;
        return this
    };
    b(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(a) {
        var d = b(this);
        d.attr("data-target") ||
            a.preventDefault();
        a = f(d);
        d = a.data("bs.collapse") ? "toggle" : d.data();
        e.call(a, d)
    })
}(jQuery); +
function(b) {
    function f(a) {
        var d = a.attr("data-target");
        d || (d = (d = a.attr("href")) && /#[A-Za-z]/.test(d) && d.replace(/.*(?=#[^\s]*$)/, ""));
        return (d = d && b(d)) && d.length ? d : a.parent()
    }

    function e(a) {
        a && 3 === a.which || (b(".dropdown-backdrop").remove(), b('[data-toggle="dropdown"]').each(function() {
            var d = b(this),
                c = f(d),
                e = {
                    relatedTarget: this
                };
            !c.hasClass("open") || a && "click" == a.type && /input|textarea/i.test(a.target.tagName) && b.contains(c[0], a.target) || (c.trigger(a = b.Event("hide.bs.dropdown", e)), a.isDefaultPrevented() ||
                (d.attr("aria-expanded", "false"), c.removeClass("open").trigger(b.Event("hidden.bs.dropdown", e))))
        }))
    }
    var c = function(a) {
        b(a).on("click.bs.dropdown", this.toggle)
    };
    c.VERSION = "3.3.6";
    c.prototype.toggle = function(a) {
        var d = b(this);
        if (!d.is(".disabled, :disabled")) {
            var c = f(d);
            a = c.hasClass("open");
            e();
            if (!a) {
                if ("ontouchstart" in document.documentElement && !c.closest(".navbar-nav").length) b(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(b(this)).on("click", e);
                var m = {
                    relatedTarget: this
                };
                c.trigger(a = b.Event("show.bs.dropdown", m));
                if (a.isDefaultPrevented()) return;
                d.trigger("focus").attr("aria-expanded", "true");
                c.toggleClass("open").trigger(b.Event("shown.bs.dropdown", m))
            }
            return !1
        }
    };
    c.prototype.keydown = function(a) {
        if (/(38|40|27|32)/.test(a.which) && !/input|textarea/i.test(a.target.tagName)) {
            var d = b(this);
            a.preventDefault();
            a.stopPropagation();
            if (!d.is(".disabled, :disabled")) {
                var c = f(d),
                    e = c.hasClass("open");
                if (!e && 27 != a.which || e && 27 == a.which) return 27 == a.which && c.find('[data-toggle="dropdown"]').trigger("focus"),
                    d.trigger("click");
                d = c.find(".dropdown-menu li:not(.disabled):visible a");
                d.length && (c = d.index(a.target), 38 == a.which && 0 < c && c--, 40 == a.which && c < d.length - 1 && c++, ~c || (c = 0), d.eq(c).trigger("focus"))
            }
        }
    };
    var a = b.fn.dropdown;
    b.fn.dropdown = function(a) {
        return this.each(function() {
            var d = b(this),
                f = d.data("bs.dropdown");
            f || d.data("bs.dropdown", f = new c(this));
            "string" == typeof a && f[a].call(d)
        })
    };
    b.fn.dropdown.Constructor = c;
    b.fn.dropdown.noConflict = function() {
        b.fn.dropdown = a;
        return this
    };
    b(document).on("click.bs.dropdown.data-api",
        e).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', c.prototype.toggle).on("keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', c.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", c.prototype.keydown)
}(jQuery); +
function(b) {
    function f(a, d) {
        return this.each(function() {
            var c = b(this),
                f = c.data("bs.modal"),
                m = b.extend({}, e.DEFAULTS, c.data(), "object" == typeof a && a);
            f || c.data("bs.modal", f = new e(this, m));
            if ("string" == typeof a) f[a](d);
            else m.show && f.show(d)
        })
    }
    var e = function(a, d) {
        this.options = d;
        this.$body = b(document.body);
        this.$element = b(a);
        this.$dialog = this.$element.find(".modal-dialog");
        this.originalBodyPad = this.isShown = this.$backdrop = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = !1;
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote,
            b.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
    };
    e.VERSION = "3.3.6";
    e.TRANSITION_DURATION = 300;
    e.BACKDROP_TRANSITION_DURATION = 150;
    e.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    e.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    };
    e.prototype.show = function(a) {
        var d = this,
            c = b.Event("show.bs.modal", {
                relatedTarget: a
            });
        this.$element.trigger(c);
        this.isShown || c.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"),
            this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', b.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                d.$element.one("mouseup.dismiss.bs.modal", function(a) {
                    b(a.target).is(d.$element) && (d.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function() {
                var c = b.support.transition && d.$element.hasClass("fade");
                d.$element.parent().length || d.$element.appendTo(d.$body);
                d.$element.show().scrollTop(0);
                d.adjustDialog();
                c && d.$element[0].offsetWidth;
                d.$element.addClass("in");
                d.enforceFocus();
                var g = b.Event("shown.bs.modal", {
                    relatedTarget: a
                });
                c ? d.$dialog.one("bsTransitionEnd", function() {
                    d.$element.trigger("focus").trigger(g)
                }).emulateTransitionEnd(e.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(g)
            }))
    };
    e.prototype.hide = function(a) {
        a && a.preventDefault();
        a = b.Event("hide.bs.modal");
        this.$element.trigger(a);
        this.isShown && !a.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), b(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
            this.$dialog.off("mousedown.dismiss.bs.modal"), b.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", b.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal())
    };
    e.prototype.enforceFocus = function() {
        b(document).off("focusin.bs.modal").on("focusin.bs.modal", b.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    };
    e.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) this.$element.on("keydown.dismiss.bs.modal",
            b.proxy(function(a) {
                27 == a.which && this.hide()
            }, this));
        else this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    };
    e.prototype.resize = function() {
        if (this.isShown) b(window).on("resize.bs.modal", b.proxy(this.handleUpdate, this));
        else b(window).off("resize.bs.modal")
    };
    e.prototype.hideModal = function() {
        var a = this;
        this.$element.hide();
        this.backdrop(function() {
            a.$body.removeClass("modal-open");
            a.resetAdjustments();
            a.resetScrollbar();
            a.$element.trigger("hidden.bs.modal")
        })
    };
    e.prototype.removeBackdrop = function() {
        this.$backdrop &&
            this.$backdrop.remove();
        this.$backdrop = null
    };
    e.prototype.backdrop = function(a) {
        var d = this,
            c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = b.support.transition && c;
            this.$backdrop = b(document.createElement("div")).addClass("modal-backdrop " + c).appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", b.proxy(function(a) {
                this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() :
                    this.hide())
            }, this));
            f && this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            a && (f ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : a())
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), c = function() {
            d.removeBackdrop();
            a && a()
        }, b.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", c).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : c()) : a && a()
    };
    e.prototype.handleUpdate = function() {
        this.adjustDialog()
    };
    e.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    };
    e.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    };
    e.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        a || (a = document.documentElement.getBoundingClientRect(), a = a.right - Math.abs(a.left));
        this.bodyIsOverflowing =
            document.body.clientWidth < a;
        this.scrollbarWidth = this.measureScrollbar()
    };
    e.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    };
    e.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    };
    e.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure";
        this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        this.$body[0].removeChild(a);
        return b
    };
    var c = b.fn.modal;
    b.fn.modal = f;
    b.fn.modal.Constructor = e;
    b.fn.modal.noConflict = function() {
        b.fn.modal = c;
        return this
    };
    b(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(a) {
        var d = b(this),
            c = d.attr("href"),
            e = b(d.attr("data-target") || c && c.replace(/.*(?=#[^\s]+$)/, ""));
        c = e.data("bs.modal") ? "toggle" : b.extend({
            remote: !/#/.test(c) && c
        }, e.data(), d.data());
        d.is("a") && a.preventDefault();
        e.one("show.bs.modal",
            function(a) {
                if (!a.isDefaultPrevented()) e.one("hidden.bs.modal", function() {
                    d.is(":visible") && d.trigger("focus")
                })
            });
        f.call(e, c, this)
    })
}(jQuery); +
function(b) {
    var f = function(b, a) {
        this.inState = this.$element = this.hoverState = this.timeout = this.enabled = this.options = this.type = null;
        this.init("tooltip", b, a)
    };
    f.VERSION = "3.3.6";
    f.TRANSITION_DURATION = 150;
    f.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    f.prototype.init = function(c, a,
        d) {
        this.enabled = !0;
        this.type = c;
        this.$element = b(a);
        this.options = this.getOptions(d);
        this.$viewport = this.options.viewport && b(b.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        };
        if (this.$element[0] instanceof document.constructor && !this.options.selector) throw Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        c = this.options.trigger.split(" ");
        for (a = c.length; a--;)
            if (d = c[a], "click" == d) this.$element.on("click." + this.type, this.options.selector, b.proxy(this.toggle, this));
            else if ("manual" != d) {
            var f = "hover" == d ? "mouseleave" : "focusout";
            this.$element.on(("hover" == d ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, b.proxy(this.enter, this));
            this.$element.on(f + "." + this.type, this.options.selector, b.proxy(this.leave, this))
        }
        this.options.selector ? this._options = b.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    f.prototype.getDefaults =
        function() {
            return f.DEFAULTS
        };
    f.prototype.getOptions = function(c) {
        c = b.extend({}, this.getDefaults(), this.$element.data(), c);
        c.delay && "number" == typeof c.delay && (c.delay = {
            show: c.delay,
            hide: c.delay
        });
        return c
    };
    f.prototype.getDelegateOptions = function() {
        var c = {},
            a = this.getDefaults();
        this._options && b.each(this._options, function(b, f) {
            a[b] != f && (c[b] = f)
        });
        return c
    };
    f.prototype.enter = function(c) {
        var a = c instanceof this.constructor ? c : b(c.currentTarget).data("bs." + this.type);
        a || (a = new this.constructor(c.currentTarget,
            this.getDelegateOptions()), b(c.currentTarget).data("bs." + this.type, a));
        c instanceof b.Event && (a.inState["focusin" == c.type ? "focus" : "hover"] = !0);
        if (a.tip().hasClass("in") || "in" == a.hoverState) a.hoverState = "in";
        else {
            clearTimeout(a.timeout);
            a.hoverState = "in";
            if (!a.options.delay || !a.options.delay.show) return a.show();
            a.timeout = setTimeout(function() {
                "in" == a.hoverState && a.show()
            }, a.options.delay.show)
        }
    };
    f.prototype.isInStateTrue = function() {
        for (var b in this.inState)
            if (this.inState[b]) return !0;
        return !1
    };
    f.prototype.leave =
        function(c) {
            var a = c instanceof this.constructor ? c : b(c.currentTarget).data("bs." + this.type);
            a || (a = new this.constructor(c.currentTarget, this.getDelegateOptions()), b(c.currentTarget).data("bs." + this.type, a));
            c instanceof b.Event && (a.inState["focusout" == c.type ? "focus" : "hover"] = !1);
            if (!a.isInStateTrue()) {
                clearTimeout(a.timeout);
                a.hoverState = "out";
                if (!a.options.delay || !a.options.delay.hide) return a.hide();
                a.timeout = setTimeout(function() {
                    "out" == a.hoverState && a.hide()
                }, a.options.delay.hide)
            }
        };
    f.prototype.show =
        function() {
            var c = b.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(c);
                var a = b.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (!c.isDefaultPrevented() && a) {
                    var d = this;
                    c = this.tip();
                    a = this.getUID(this.type);
                    this.setContent();
                    c.attr("id", a);
                    this.$element.attr("aria-describedby", a);
                    this.options.animation && c.addClass("fade");
                    a = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement;
                    var e = /\s?auto?\s?/i,
                        h = e.test(a);
                    h && (a = a.replace(e, "") || "top");
                    c.detach().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }).addClass(a).data("bs." + this.type, this);
                    this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
                    this.$element.trigger("inserted.bs." + this.type);
                    e = this.getPosition();
                    var m = c[0].offsetWidth,
                        l = c[0].offsetHeight;
                    if (h) {
                        h = a;
                        var k = this.getPosition(this.$viewport);
                        a = "bottom" == a && e.bottom + l > k.bottom ? "top" : "top" == a && e.top - l < k.top ? "bottom" : "right" == a && e.right + m > k.width ?
                            "left" : "left" == a && e.left - m < k.left ? "right" : a;
                        c.removeClass(h).addClass(a)
                    }
                    e = this.getCalculatedOffset(a, e, m, l);
                    this.applyPlacement(e, a);
                    a = function() {
                        var a = d.hoverState;
                        d.$element.trigger("shown.bs." + d.type);
                        d.hoverState = null;
                        "out" == a && d.leave(d)
                    };
                    b.support.transition && this.$tip.hasClass("fade") ? c.one("bsTransitionEnd", a).emulateTransitionEnd(f.TRANSITION_DURATION) : a()
                }
            }
        };
    f.prototype.applyPlacement = function(c, a) {
        var d = this.tip(),
            f = d[0].offsetWidth,
            e = d[0].offsetHeight,
            m = parseInt(d.css("margin-top"), 10),
            l = parseInt(d.css("margin-left"), 10);
        isNaN(m) && (m = 0);
        isNaN(l) && (l = 0);
        c.top += m;
        c.left += l;
        b.offset.setOffset(d[0], b.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, c), 0);
        d.addClass("in");
        m = d[0].offsetWidth;
        l = d[0].offsetHeight;
        "top" == a && l != e && (c.top = c.top + e - l);
        var k = this.getViewportAdjustedDelta(a, c, m, l);
        k.left ? c.left += k.left : c.top += k.top;
        f = (a = /top|bottom/.test(a)) ? 2 * k.left - f + m : 2 * k.top - e + l;
        e = a ? "offsetWidth" : "offsetHeight";
        d.offset(c);
        this.replaceArrow(f, d[0][e], a)
    };
    f.prototype.replaceArrow = function(b, a, d) {
        this.arrow().css(d ? "left" : "top", 50 * (1 - b / a) + "%").css(d ? "top" : "left", "")
    };
    f.prototype.setContent = function() {
        var b = this.tip(),
            a = this.getTitle();
        b.find(".tooltip-inner")[this.options.html ? "html" : "text"](a);
        b.removeClass("fade in top bottom left right")
    };
    f.prototype.hide = function(c) {
        function a() {
            "in" != d.hoverState && e.detach();
            d.$element.removeAttr("aria-describedby").trigger("hidden.bs." + d.type);
            c && c()
        }
        var d = this,
            e = b(this.$tip),
            h = b.Event("hide.bs." + this.type);
        this.$element.trigger(h);
        if (!h.isDefaultPrevented()) return e.removeClass("in"), b.support.transition && e.hasClass("fade") ? e.one("bsTransitionEnd", a).emulateTransitionEnd(f.TRANSITION_DURATION) : a(), this.hoverState = null, this
    };
    f.prototype.fixTitle = function() {
        var b = this.$element;
        (b.attr("title") || "string" != typeof b.attr("data-original-title")) && b.attr("data-original-title", b.attr("title") || "").attr("title", "")
    };
    f.prototype.hasContent = function() {
        return this.getTitle()
    };
    f.prototype.getPosition = function(c) {
        c = c || this.$element;
        var a =
            c[0],
            d = "BODY" == a.tagName;
        a = a.getBoundingClientRect();
        null == a.width && (a = b.extend({}, a, {
            width: a.right - a.left,
            height: a.bottom - a.top
        }));
        var e = d ? {
            top: 0,
            left: 0
        } : c.offset();
        c = {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : c.scrollTop()
        };
        d = d ? {
            width: b(window).width(),
            height: b(window).height()
        } : null;
        return b.extend({}, a, c, d, e)
    };
    f.prototype.getCalculatedOffset = function(b, a, d, e) {
        return "bottom" == b ? {
            top: a.top + a.height,
            left: a.left + a.width / 2 - d / 2
        } : "top" == b ? {
            top: a.top - e,
            left: a.left + a.width / 2 -
                d / 2
        } : "left" == b ? {
            top: a.top + a.height / 2 - e / 2,
            left: a.left - d
        } : {
            top: a.top + a.height / 2 - e / 2,
            left: a.left + a.width
        }
    };
    f.prototype.getViewportAdjustedDelta = function(b, a, d, e) {
        var c = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return c;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        /right|left/.test(b) ? (d = a.top - f - g.scroll, a = a.top + f - g.scroll + e, d < g.top ? c.top = g.top - d : a > g.top + g.height && (c.top = g.top + g.height - a)) : (e = a.left - f, a = a.left + f + d, e < g.left ? c.left = g.left - e : a > g.right && (c.left =
            g.left + g.width - a));
        return c
    };
    f.prototype.getTitle = function() {
        var b = this.$element,
            a = this.options;
        return b.attr("data-original-title") || ("function" == typeof a.title ? a.title.call(b[0]) : a.title)
    };
    f.prototype.getUID = function(b) {
        do b += ~~(1E6 * Math.random()); while (document.getElementById(b));
        return b
    };
    f.prototype.tip = function() {
        if (!this.$tip && (this.$tip = b(this.options.template), 1 != this.$tip.length)) throw Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    };
    f.prototype.arrow =
        function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        };
    f.prototype.enable = function() {
        this.enabled = !0
    };
    f.prototype.disable = function() {
        this.enabled = !1
    };
    f.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    };
    f.prototype.toggle = function(c) {
        var a = this;
        c && (a = b(c.currentTarget).data("bs." + this.type), a || (a = new this.constructor(c.currentTarget, this.getDelegateOptions()), b(c.currentTarget).data("bs." + this.type, a)));
        c ? (a.inState.click = !a.inState.click, a.isInStateTrue() ? a.enter(a) :
            a.leave(a)) : a.tip().hasClass("in") ? a.leave(a) : a.enter(a)
    };
    f.prototype.destroy = function() {
        var b = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            b.$element.off("." + b.type).removeData("bs." + b.type);
            b.$tip && b.$tip.detach();
            b.$tip = null;
            b.$arrow = null;
            b.$viewport = null
        })
    };
    var e = b.fn.tooltip;
    b.fn.tooltip = function(c) {
        return this.each(function() {
            var a = b(this),
                d = a.data("bs.tooltip"),
                e = "object" == typeof c && c;
            if (d || !/destroy|hide/.test(c))
                if (d || a.data("bs.tooltip", d = new f(this, e)), "string" == typeof c) d[c]()
        })
    };
    b.fn.tooltip.Constructor = f;
    b.fn.tooltip.noConflict = function() {
        b.fn.tooltip = e;
        return this
    }
}(jQuery); +
function(b) {
    var f = function(b, a) {
        this.init("popover", b, a)
    };
    if (!b.fn.tooltip) throw Error("Popover requires tooltip.js");
    f.VERSION = "3.3.6";
    f.DEFAULTS = b.extend({}, b.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    f.prototype = b.extend({}, b.fn.tooltip.Constructor.prototype);
    f.prototype.constructor = f;
    f.prototype.getDefaults = function() {
        return f.DEFAULTS
    };
    f.prototype.setContent = function() {
        var b = this.tip(),
            a = this.getTitle(),
            d = this.getContent();
        b.find(".popover-title")[this.options.html ? "html" : "text"](a);
        b.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof d ? "html" : "append" : "text"](d);
        b.removeClass("fade top bottom left right in");
        b.find(".popover-title").html() || b.find(".popover-title").hide()
    };
    f.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    };
    f.prototype.getContent = function() {
        var b = this.$element,
            a = this.options;
        return b.attr("data-content") || ("function" == typeof a.content ? a.content.call(b[0]) : a.content)
    };
    f.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var e = b.fn.popover;
    b.fn.popover = function(c) {
        return this.each(function() {
            var a = b(this),
                d = a.data("bs.popover"),
                e = "object" == typeof c && c;
            if (d || !/destroy|hide/.test(c))
                if (d || a.data("bs.popover", d = new f(this, e)), "string" == typeof c) d[c]()
        })
    };
    b.fn.popover.Constructor = f;
    b.fn.popover.noConflict = function() {
        b.fn.popover =
            e;
        return this
    }
}(jQuery); +
function(b) {
    function f(a, d) {
        this.$body = b(document.body);
        this.$scrollElement = b(a).is(document.body) ? b(window) : b(a);
        this.options = b.extend({}, f.DEFAULTS, d);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", b.proxy(this.process, this));
        this.refresh();
        this.process()
    }

    function e(a) {
        return this.each(function() {
            var d = b(this),
                c = d.data("bs.scrollspy"),
                e = "object" == typeof a && a;
            c || d.data("bs.scrollspy",
                c = new f(this, e));
            if ("string" == typeof a) c[a]()
        })
    }
    f.VERSION = "3.3.6";
    f.DEFAULTS = {
        offset: 10
    };
    f.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    f.prototype.refresh = function() {
        var a = this,
            d = "offset",
            c = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        b.isWindow(this.$scrollElement[0]) || (d = "position", c = this.$scrollElement.scrollTop());
        this.$body.find(this.selector).map(function() {
            var a =
                b(this);
            a = a.data("target") || a.attr("href");
            var e = /^#./.test(a) && b(a);
            return e && e.length && e.is(":visible") && [
                [e[d]().top + c, a]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            a.offsets.push(this[0]);
            a.targets.push(this[1])
        })
    };
    f.prototype.process = function() {
        var a = this.$scrollElement.scrollTop() + this.options.offset,
            b = this.getScrollHeight(),
            c = this.options.offset + b - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            l = this.activeTarget,
            k;
        this.scrollHeight != b && this.refresh();
        if (a >=
            c) return l != (k = f[f.length - 1]) && this.activate(k);
        if (l && a < e[0]) return this.activeTarget = null, this.clear();
        for (k = e.length; k--;) l != f[k] && a >= e[k] && (void 0 === e[k + 1] || a < e[k + 1]) && this.activate(f[k])
    };
    f.prototype.activate = function(a) {
        this.activeTarget = a;
        this.clear();
        a = b(this.selector + '[data-target="' + a + '"],' + this.selector + '[href="' + a + '"]').parents("li").addClass("active");
        a.parent(".dropdown-menu").length && (a = a.closest("li.dropdown").addClass("active"));
        a.trigger("activate.bs.scrollspy")
    };
    f.prototype.clear =
        function() {
            b(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };
    var c = b.fn.scrollspy;
    b.fn.scrollspy = e;
    b.fn.scrollspy.Constructor = f;
    b.fn.scrollspy.noConflict = function() {
        b.fn.scrollspy = c;
        return this
    };
    b(window).on("load.bs.scrollspy.data-api", function() {
        b('[data-spy="scroll"]').each(function() {
            var a = b(this);
            e.call(a, a.data())
        })
    })
}(jQuery); +
function(b) {
    function f(a) {
        return this.each(function() {
            var d = b(this),
                c = d.data("bs.tab");
            c || d.data("bs.tab", c = new e(this));
            if ("string" == typeof a) c[a]()
        })
    }
    var e = function(a) {
        this.element = b(a)
    };
    e.VERSION = "3.3.6";
    e.TRANSITION_DURATION = 150;
    e.prototype.show = function() {
        var a = this.element,
            c = a.closest("ul:not(.dropdown-menu)"),
            e = a.data("target");
        e || (e = (e = a.attr("href")) && e.replace(/.*(?=#[^\s]*$)/, ""));
        if (!a.parent("li").hasClass("active")) {
            var f = c.find(".active:last a"),
                l = b.Event("hide.bs.tab", {
                    relatedTarget: a[0]
                }),
                k = b.Event("show.bs.tab", {
                    relatedTarget: f[0]
                });
            f.trigger(l);
            a.trigger(k);
            k.isDefaultPrevented() || l.isDefaultPrevented() || (e = b(e), this.activate(a.closest("li"), c), this.activate(e, e.parent(), function() {
                f.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: a[0]
                });
                a.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: f[0]
                })
            }))
        }
    };
    e.prototype.activate = function(a, c, f) {
        function d() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            a.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            h ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade");
            a.parent(".dropdown-menu").length && a.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            f && f()
        }
        var g = c.find("> .active"),
            h = f && b.support.transition && (g.length && g.hasClass("fade") || !!c.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", d).emulateTransitionEnd(e.TRANSITION_DURATION) : d();
        g.removeClass("in")
    };
    var c = b.fn.tab;
    b.fn.tab = f;
    b.fn.tab.Constructor = e;
    b.fn.tab.noConflict = function() {
        b.fn.tab =
            c;
        return this
    };
    var a = function(a) {
        a.preventDefault();
        f.call(b(this), "show")
    };
    b(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', a).on("click.bs.tab.data-api", '[data-toggle="pill"]', a)
}(jQuery); +
function(b) {
    function f(a) {
        return this.each(function() {
            var d = b(this),
                c = d.data("bs.affix"),
                f = "object" == typeof a && a;
            c || d.data("bs.affix", c = new e(this, f));
            if ("string" == typeof a) c[a]()
        })
    }
    var e = function(a, d) {
        this.options = b.extend({}, e.DEFAULTS, d);
        this.$target = b(this.options.target).on("scroll.bs.affix.data-api", b.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", b.proxy(this.checkPositionWithEventLoop, this));
        this.$element = b(a);
        this.pinnedOffset = this.unpin = this.affixed = null;
        this.checkPosition()
    };
    e.VERSION = "3.3.6";
    e.RESET = "affix affix-top affix-bottom";
    e.DEFAULTS = {
        offset: 0,
        target: window
    };
    e.prototype.getState = function(a, b, c, e) {
        var d = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return d < c ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? d + this.unpin <= f.top ? !1 : "bottom" : d + g <= a - e ? !1 : "bottom";
        var h = null == this.affixed;
        f = h ? d : f.top;
        return null != c && d <= c ? "top" : null != e && f + (h ? g : b) >= a - e ? "bottom" : !1
    };
    e.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(e.RESET).addClass("affix");
        var a = this.$target.scrollTop();
        return this.pinnedOffset = this.$element.offset().top - a
    };
    e.prototype.checkPositionWithEventLoop = function() {
        setTimeout(b.proxy(this.checkPosition, this), 1)
    };
    e.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var a = this.$element.height(),
                d = this.options.offset,
                c = d.top,
                f = d.bottom,
                m = Math.max(b(document).height(), b(document.body).height());
            "object" != typeof d && (f = c = d);
            "function" == typeof c && (c = d.top(this.$element));
            "function" == typeof f && (f = d.bottom(this.$element));
            d = this.getState(m, a, c, f);
            if (this.affixed != d) {
                null != this.unpin && this.$element.css("top", "");
                c = "affix" + (d ? "-" + d : "");
                var l = b.Event(c + ".bs.affix");
                this.$element.trigger(l);
                if (l.isDefaultPrevented()) return;
                this.affixed = d;
                this.unpin = "bottom" == d ? this.getPinnedOffset() : null;
                this.$element.removeClass(e.RESET).addClass(c).trigger(c.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == d && this.$element.offset({
                top: m - a - f
            })
        }
    };
    var c = b.fn.affix;
    b.fn.affix = f;
    b.fn.affix.Constructor =
        e;
    b.fn.affix.noConflict = function() {
        b.fn.affix = c;
        return this
    };
    b(window).on("load", function() {
        b('[data-spy="affix"]').each(function() {
            var a = b(this),
                c = a.data();
            c.offset = c.offset || {};
            null != c.offsetBottom && (c.offset.bottom = c.offsetBottom);
            null != c.offsetTop && (c.offset.top = c.offsetTop);
            f.call(a, c)
        })
    })
}(jQuery);