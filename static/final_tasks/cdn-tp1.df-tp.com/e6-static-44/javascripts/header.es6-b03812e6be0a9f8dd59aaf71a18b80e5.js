import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
import './javascript.es6-5a5ea619a5889131d353e20c08d4d4d1.js';
import './sticky.es6-7df793e1cbd1154f47a2c8380733df61.js';
import './in-viewport.es6-46373fca6273eaaff5ee5a19e4f7af58.js';
import './lazy-images.es6-f3d2d5879c24445f20d29f9137175fe2.js';
import './javascript.es6-4f86bf447c891250942c85b9f9033587.js';
import './javascript.es6-d67a8a8a7bed049c9c31990b76bd8c55.js';

/**
 * @module Header
 */
Moff.modules.create('HeaderTheme1', function() {
    'use strict';

    const MODULE = this;

    const SEL = {
        menuCollapse: '.js-menu-collapse',
        mainMenu: '.js-main-menu',
        menuLink: '.js-menu-link',
        vehicleMenuLink: '.js-vehicle-menu-link',
        vehicleMenuLinkTitle: '.js-vehicle-menu-link-title',
        menuLinkIcon: '.js-icon',
        menuLinkIconLevel2: '.js-icon-level-2',
        menuTrigger: '.js-menu-trigger',
        menuParentTrigger: '.js-sub-menu-trigger-li',
        menuParentTriggerLevel1: '.js-sub-menu-trigger-li-level-1',
        menuParentTriggerLevel2: '.js-sub-menu-trigger-li-level-2',
        subMenu: '.js-sub-menu',
        subMenuLevel2: '.js-sub-menu-level-2',
        subMenuLevel3: '.js-sub-menu-level-3',
        subMenuInner: '.js-sub-menu-inner',
        subMenuInnerLevel2: '.js-sub-menu-inner-level-2',
        subMenuInnerLevel3: '.js-sub-menu-inner-level-3',
        subMenuTrigger: '.js-sub-menu-trigger',
        subMenuCollapse: '.js-sub-menu-collapse',
        subMenuBackground: '.js-sub-menu-background',
        vehicleMenu: '.js-vehicle-menu',
        vehicleSubMenu: '.js-vehicle-sub-menu',
        stickyMobile: '.js-mobile-sticky',
        stickyDesktop: '.js-desktop-sticky',
        popover: '.js-popover',
        popoverDirection: '.js-popover-direction',
        getDirection: '.js-get-direction',
        autocompleteContainer: '.pac-container:last',
        autocompleteItem: '.pac-item',
        autocompleteHelper: '.js-autocomplete-helper',
    };
    const MOD = {
        collapsing: 'collapsing',
        collapseOpened: 'in',
        menuLinkIconOpened: 'menu-link__icon-state_opened',
        menuLinkIconRight: 'menu-link__icon-state_right',
        menuMobileCurrentLinkLevel: [
            'menu-link_level-1-current-mobile',
            'menu-link_level-2-current-mobile',
            'menu-link_level-3-current-mobile',
        ],
        subMenuRight: 'menu__sub-menu_right',
        subMenuOpened: 'menu__link_sub-menu-opened',
        subMenuBackgroundShow: 'sub-menu-background_show',
        menuColums: 'menu__sub-menu_columns',
    };

    let _stickyModule,
        _$desktopSticky,
        _lazyImagesModule,
        _menuIconBlock,
        _$mainMenu;

    this.init = function() {
        _stickyModule = Moff.modules.get('Sticky');
        _lazyImagesModule = Moff.modules.get('LazyImages');

        Moff.modules.initClass('HeaderContact', {
            id: MODULE.id,
            scopeSelector: MODULE.scopeSelector,
            data: MODULE.data
        });
        _initMenuModule();
    };

    function _initMenuModule() {
        _$mainMenu = MODULE.$find(SEL.mainMenu);
        _menuIconBlock = BEM.findChildBlocksFirst($(MODULE.scope), 'menu-icon');

        _handleMenuIcon();
        _mobileLogic();
        _touchDevicesLogic();
        _desktopLogic();
        _handleAnalyticsEvent();
        _initLazyImages();

        MODULE.afterCssLoaded(() => {
            _initMenuSticky();
            _fitSubMenus();
            $(window).on('resize', _fitSubMenus);
        });
        $(window).on('load', _fitSubMenus);
        MODULE.ajaxAddSuccessCallback([
            'inventory.filtering',
            'inventory.search',
        ], _updateView);
    }

    function _initLazyImages() {
        const eventScope = 'lazy-images';

        _menuIconBlock.$block.one(`click.${eventScope}`, event => {
            loadImages();
            _$mainMenu.off(`mouseenter.${eventScope}`);
            event.preventDefault();
        });

        _$mainMenu.one(`mouseenter.${eventScope}`, () => {
            loadImages();
            _menuIconBlock.$block.off(`click.${eventScope}`);
        });

        function loadImages() {
            _lazyImagesModule.load({
                $scope: $(MODULE.scope)
            });
        }
    }

    function _initMenuSticky() {
        const $mobileSticky = MODULE.$find(SEL.stickyMobile);

        _$desktopSticky = MODULE.$find(SEL.stickyDesktop);

        if (_$desktopSticky.length && $mobileSticky.length) {
            _stickyModule.initSticky(_$desktopSticky, {
                scrollLock: true
            });

            $(window).on('resize.header-sticky', () => {
                if (/xs|sm/.test(Moff.getMode())) {
                    _stickyModule.initSticky($mobileSticky);
                } else {
                    _stickyModule.destroySticky($mobileSticky);
                }
            });
            setTimeout(() => {
                $(window).trigger('resize.header-sticky');
            });
        }
    }

    function _handleMenuIcon() {
        _menuIconBlock.$block.on('click', event => {
            if (/xs|sm/.test(Moff.getMode())) {
                const $menuCollapse = MODULE.$find(SEL.menuCollapse);

                _clearMenuEnhancements();
                _toggleCollapse(
                    $menuCollapse,
                    () => {
                        _menuIconBlock.unClose();
                        _stickyModule.reCalculateWithAnimation(_$desktopSticky, _$mainMenu.height(), 0);
                    },
                    () => {
                        _menuIconBlock.close();
                        _stickyModule.reCalculateWithAnimation(_$desktopSticky, 0, _getCollapseHeight(_$mainMenu));
                    }
                );

                event.preventDefault();
            }
        });
    }

    function _mobileLogic() {
        MODULE.$find(SEL.subMenuTrigger).on('click', event => {
            if (/xs|sm/.test(Moff.getMode())) {
                const $trigger = $(event.currentTarget);
                const $icon = $trigger.find(SEL.menuLinkIcon);
                const $subMenu = $trigger.siblings(SEL.subMenuCollapse);

                _toggleCollapse(
                    $subMenu,
                    () => {
                        $trigger.removeClass(MOD.subMenuOpened);
                        $icon.removeClass(MOD.menuLinkIconOpened);
                        _stickyModule.reCalculateWithAnimation(
                            _$desktopSticky,
                            _$mainMenu.height(),
                            _$mainMenu.height() - _getCollapseHeight($subMenu)
                        );
                    },
                    () => {
                        $trigger.addClass(MOD.subMenuOpened);
                        $icon.addClass(MOD.menuLinkIconOpened);
                        _stickyModule.reCalculateWithAnimation(
                            _$desktopSticky,
                            _$mainMenu.height(),
                            _$mainMenu.height() + _getCollapseHeight($subMenu)
                        );
                    }
                );

                event.preventDefault();
            }
        });

        MODULE.$find(SEL.menuLink).on('click', function() {
            if (/xs|sm/.test(Moff.getMode())) {
                const $link = $(this);
                const currentClass = MOD.menuMobileCurrentLinkLevel[$link.data('level') - 1];

                if (!$link.hasClass(SEL.subMenuTrigger.slice(1))) {
                    MODULE
                        .$find(MOD.menuMobileCurrentLinkLevel.map(s => `.${s}`).join(','))
                        .removeClass(MOD.menuMobileCurrentLinkLevel.join(' '));
                    $link.addClass(currentClass);
                }
            }
        });
    }

    function _touchDevicesLogic() {
        MODULE.$find(SEL.subMenuTrigger).on('click', function() {
            if (_isTouchDevice()) {
                const $link = $(this);
                const isLinkToggled = $link.data('toggled');

                if (!isLinkToggled) {
                    event.preventDefault();
                    $link.data('toggled', true);
                }
            }
        });

        MODULE.$find(SEL.menuParentTriggerLevel1).on('mouseleave', function() {
            if (_isTouchDevice()) {
                $(this).find(SEL.subMenuTrigger).data('toggled', false);
            }
        });
    }

    function _desktopLogic() {
        MODULE.$find(SEL.menuParentTriggerLevel1)
            .on('mouseenter', function() {
                if (/md|lg/.test(Moff.getMode())) {
                    const $subMenu = $(this).find(`${SEL.subMenu}:first`);
                    const $vehicleSubMenu = $subMenu.find(SEL.vehicleSubMenu);
                    const subMenuFullHeight = _calculateSubmenuHeight($subMenu);
                    const availableHeight = _calculateAvailableHeight();
                    const subMenuMaxHeight = subMenuFullHeight > availableHeight ? availableHeight : subMenuFullHeight;
                    const overflow = subMenuFullHeight > availableHeight ? '' : 'hidden';

                    $subMenu.css({
                        height: subMenuMaxHeight,
                        top: '100%',
                        overflow,
                    });

                    $vehicleSubMenu.css({
                        'min-height': subMenuMaxHeight,
                        overflow,
                    });

                    MODULE.$find(SEL.subMenuBackground).addClass(MOD.subMenuBackgroundShow).height(subMenuMaxHeight);
                }
            })
            .on('mouseleave', function() {
                if (/md|lg/.test(Moff.getMode())) {
                    $(this).find(`${SEL.subMenu}:first, ${SEL.vehicleSubMenu}`).css({
                        height: '',
                        'min-height': ''
                    });
                    MODULE.$find(SEL.subMenuBackground).removeClass(MOD.subMenuBackgroundShow).removeAttr('style');
                }
            });

        MODULE.$find(`.${MOD.menuColums}`).on('click', SEL.subMenuTrigger, event => {
            if (/xs|sm/.test(Moff.getMode())) {
                return false;
            }

            const $trigger = $(event.currentTarget);
            const $icon = $trigger.find(SEL.menuLinkIcon);
            const $subMenu = $trigger.siblings(SEL.subMenuCollapse);
            const $parentSubMenu = $trigger.parents(SEL.subMenuLevel2);
            const $parentSubMenuInner = $trigger.parents(SEL.subMenuInnerLevel2);
            const isSubMenuOpen = !!$trigger.hasClass(MOD.subMenuOpened);
            const parentSubMenuInitialHeight = $parentSubMenuInner.outerHeight();
            const availableHeight = $(window).height() - MODULE.$find(SEL.subMenuBackground).offset().top + $(window).scrollTop() - 5;

            // Get max height of columns except current
            const maxColumnsHeight = $parentSubMenu.find(SEL.subMenuInnerLevel2).get().reduce((max, element) => {
                const $element = $(element);
                const elementHeight = $element.outerHeight();

                return !$element.is($parentSubMenuInner) && (elementHeight > max) ? elementHeight : max;
            }, 0);

            let subMenuHeight = $subMenu.outerHeight();

            let targetHeight;


            if (isSubMenuOpen) {
                targetHeight = (parentSubMenuInitialHeight - subMenuHeight) < maxColumnsHeight ?
                    maxColumnsHeight : parentSubMenuInitialHeight - subMenuHeight;
            } else {
                subMenuHeight = _getCollapsedElementHeight($subMenu);
                targetHeight = (parentSubMenuInitialHeight + subMenuHeight) < maxColumnsHeight ?
                    maxColumnsHeight : parentSubMenuInitialHeight + subMenuHeight;
            }

            if (targetHeight > availableHeight) {
                targetHeight = availableHeight;
            }

            $parentSubMenu.height(targetHeight);
            MODULE.$find(SEL.subMenuBackground).height(targetHeight);
            _toggleCollapse($subMenu, () => {
                $trigger.removeClass(MOD.subMenuOpened);
                $icon.removeClass(MOD.menuLinkIconOpened);
            }, () => {
                $trigger.addClass(MOD.subMenuOpened);
                $icon.addClass(MOD.menuLinkIconOpened);
            });
            event.preventDefault();

            return false;
        });
    }

    function _getCollapsedElementHeight($element) {
        $element.css({
            position: 'absolute',
            visibility: 'hidden',
            display: 'block',
            height: '',
        });

        const height = $element.outerHeight();

        $element.css({
            position: '',
            visibility: '',
            display: '',
            height: 0,
        });

        return height;
    }

    function _toggleCollapse($collapse, hideCallback = () => {}, showCallback = () => {}) {
        const collapseAnimationSpeed = 300;

        if ($collapse.hasClass(MOD.collapsing)) {
            return;
        }

        if ($collapse.hasClass(MOD.collapseOpened)) {
            hideCallback();
            $collapse.collapse('hide');
            setTimeout(() => {
                $collapse.find(`${SEL.subMenuTrigger}.${MOD.subMenuOpened}`).trigger('click');
                $collapse.css('height', '');
            }, collapseAnimationSpeed);
        } else {
            showCallback();
            $collapse.collapse('show');
        }
    }

    function _fitSubMenus() {
        const $menu = MODULE.$find(SEL.mainMenu);
        const $subMenus = MODULE.$find(`${SEL.subMenuInnerLevel2}:not("${SEL.vehicleMenu}")`);

        if (/xs|sm/.test(Moff.getMode())) {
            return;
        }

        $.each($subMenus, (index, subMenuInner) => {
            const $subMenuInner = $(subMenuInner);
            const $stateIcons = $subMenuInner.find(SEL.menuLinkIconLevel2);
            const subMenuWidth = $subMenuInner.width();
            const $subMenuParentTrigger = $subMenuInner.closest(SEL.menuParentTriggerLevel1);
            const $secondSubMenus = $subMenuInner.find(SEL.subMenuLevel3);
            const $subMenu = $subMenuInner.parent(SEL.subMenu);
            const subMenuPaddingTop = parseInt($subMenuInner.css('padding-top'), 10);
            const isColumn = !!$subMenuInner.parents(`.${MOD.menuColums}`).length;

            if (!$subMenuParentTrigger.length) {
                return false;
            }

            if (isColumn) {
                return true;
            }

            // Calculate submenu placement (left or right)
            const docWidth = document.documentElement.clientWidth;
            const menuDiff = docWidth - ($menu.offset().left + $menu.width());
            const diff = docWidth - ($subMenuParentTrigger.offset().left + subMenuWidth);
            const left = Math.min(docWidth - ($subMenuParentTrigger.offset().left + subMenuWidth), 0);
            const isSecondSubMenuOnLeft = !!left || !!Math.min(diff - $secondSubMenus.width(), 0);

            $stateIcons.toggleClass(MOD.menuLinkIconRight, !!left);
            $subMenu.css({
                paddingLeft: left ? `calc(1000em - ${Math.abs(left - menuDiff)}px)` : '1000em',
                paddingRight: docWidth - ($subMenuInner.offset().left + $subMenu.width()),
            });

            // Find submenu with max height
            const secondSubMenuHeights = $secondSubMenus.map(function() {
                return $(this).height() + subMenuPaddingTop;
            }).get();
            const maxHeight = Math.max($subMenuInner.outerHeight(), ...secondSubMenuHeights);
            const repositionHeight = Math.max(_calculateAvailableHeight(), maxHeight);

            $.each($secondSubMenus, (i, secondSubMenu) => {
                const $secondSubMenu = $(secondSubMenu);
                const $subMenuTrigger = $secondSubMenu.closest(SEL.menuParentTrigger);
                const subMenuTriggerOffsetBottom = $subMenuTrigger.position().top + $subMenuTrigger.outerHeight();
                const isNeedToFit = ($subMenuTrigger.position().top + $secondSubMenu.height()) > repositionHeight;

                // Reposition submenu 3 lvl to minimize scrolling
                // Fit to top if submenu have max height, else fit to bottom of column with max height
                const shift = ($secondSubMenu.height() + subMenuPaddingTop) < maxHeight ?
                    subMenuTriggerOffsetBottom - maxHeight : subMenuTriggerOffsetBottom - $secondSubMenu.height() - subMenuPaddingTop;

                $secondSubMenu.css({
                    top: isNeedToFit ? 'auto' : '',
                    bottom: isNeedToFit ? shift : '',
                });
            });

            $secondSubMenus.toggleClass(MOD.subMenuRight, isSecondSubMenuOnLeft);

            return true;
        });
    }

    function _clearMenuEnhancements() {
        MODULE.$find(SEL.subMenu).css({
            paddingLeft: '',
            paddingRight: '',
        });
    }

    function _calculateAvailableHeight() {
        // This 5 px margin is for showing user that submenu panel is not overflowed
        return $(window).height() - MODULE.$find(SEL.subMenuBackground).offset().top + $(window).scrollTop() - 5;
    }

    function _calculateSubmenuHeight($element) {
        const $trigger = $element.find(SEL.menuParentTrigger);
        const $thirdLevelMenu = $element.find(SEL.subMenuInnerLevel3);

        let height = $element.find(SEL.subMenuInner).get().reduce((max, element) => Math.max(max, $(element).outerHeight()), 0);

        if ($trigger.length && $thirdLevelMenu.length) {
            const subMenuHeights = $trigger.map(function() {
                const $subMenuLevel3 = $(this).find(SEL.subMenuLevel3);

                return $subMenuLevel3.position().top < 0 ? $subMenuLevel3.outerHeight() : $(this).position().top + $subMenuLevel3.outerHeight();
            }).get();

            height = Math.max(height, ...subMenuHeights);
        }

        $.each($element.find(SEL.vehicleSubMenu), function() {
            height = Math.max(height, $(this).outerHeight());
        });

        return height;
    }

    function _getCollapseHeight($collapse) {
        $collapse.css({
            display: 'block',
            height: '',
        });

        const height = $collapse.height();

        $collapse.css('display', '');

        return height;
    }

    function _isTouchDevice() {
        return /md|lg/.test(Moff.getMode()) && Moff.detect.touch;
    }

    function _handleAnalyticsEvent() {
        _$mainMenu.on('click', SEL.menuLink, event => {
            const $link = $(event.currentTarget);
            const linkText = $link.hasClass(SEL.vehicleMenuLink.slice(1)) ? $link.find(SEL.vehicleMenuLinkTitle).text().trim() : $link.text().trim();

            Moff.event.trigger('dsa.navigationClick', {
                data: {
                    LinkObject: {
                        text: linkText,
                        position: 'topNav',
                    },
                },
            });
        });
    }

    function _updateView(html) {
        _$mainMenu.html($(html).find(SEL.menuCollapse).html());
        _mobileLogic();
        _touchDevicesLogic();
        _desktopLogic();
        _initLazyImages();
    }
});
Moff.modules.initByConfig('HeaderTheme1');