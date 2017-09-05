/**
 * Header.js
 *
 * functions to change the header for different screen sizes
 */

$(document).ready(() => {
    // Text labels hide when screen smaller than 768 and reappear at hover
    const changeHeader = function changeHeader() {
        if (window.innerWidth > 960) {
            ['home', 'search', 'language'].forEach(el => {
                $(`.header_${el}-text`).removeClass('removed');
                $(`.header_${el}`).unbind('mouseenter');
                $(`.header_${el}`).unbind('mouseleave');
            });
            return;
        }
        if (window.innerWidth <= 960 && window.innerWidth > 768) {
            ['home', 'search', 'language'].forEach(el => {
                $(`.header_${el}`).removeClass('removed');
                $(`.header_${el}-text`).addClass('removed');
                $(`.header_${el}`).mouseenter(() => {
                    $(`.header_${el}-text`).removeClass('removed');
                });
                $(`.header_${el}`).mouseleave(() => {
                    $(`.header_${el}-text`).addClass('removed');
                });
            });
            return;
        }
        if (window.innerWidth <= 768 && window.innerWidth > 304) {
            ['home', 'search', 'language'].forEach(el => {
                $(`.header_${el}`).unbind('mouseenter');
                $(`.header_${el}`).unbind('mouseleave');
                $(`.header_${el}`).addClass('removed');
            });
            return;
        }
        if (window.innerWidth <= 304) {
            ['home', 'search', 'language'].forEach(el => {
                $(`.header_${el}`).unbind('mouseenter');
                $(`.header_${el}`).unbind('mouseleave');
                $(`.header_${el}`).addClass('removed');
            });
            $('.navigation').addClass('removed');
        }
    };

    // check every time the screen size is changed
    $(window).resize(() => {
        changeHeader();
    });

    // check on loading
    changeHeader();
});

$(document).ready(() => {

    const searchForm = $('#search-form');

    const searchEngineSettings = [{
        'action': '/search/metasearch-engine',
        'id': 'choice-pazpar2',
        'name': 'tx_pazpar2_pazpar2[queryString]',
        'query': '/search/metasearch-engine?tx_pazpar2_pazpar2[useJS]=yes&tx_pazpar2_pazpar2[queryString]='
    }, {
        'action': '/search/website/',
        'id': 'choice-website',
        'name': 'q',
        'query': '/search/website/?q='
    }];

    const initializeSearchForm = () => {
        const { 0: parameters } = searchEngineSettings;
        searchForm.attr('action', parameters.action);
        searchForm.attr('name', parameters.name);
    };

    $('.header_search').click(() => {
        $('.search-bar_outer').slideToggle(250);
        initializeSearchForm();

        return false;
    });

    $('input[name=search-choice]').change(event => {
        if (event.target.id === 'choice-website') {
            const { 1: parameters } = searchEngineSettings;

            searchForm.attr('action', parameters.action);
            searchForm.attr('name', parameters.name);
        } else {
            const { 0: parameters } = searchEngineSettings;

            searchForm.attr('action', parameters.action);
            searchForm.attr('name', parameters.name);
        }
    });

    const getQuery = choice => {
        if (choice === 'choice-website') {
            const { 1: parameters } = searchEngineSettings;
            return parameters.query;
        }

        const { 0: parameters } = searchEngineSettings;
        return parameters.query;
    };

    searchForm.submit(() => {
        const id = document.querySelector('input[name=search-choice]:checked').getAttribute('id');
        window.location = getQuery(id) + $('#search').val();
        return false;
    });
});

/**
 * Navigation.js
 *
 * Change the menu, so that hovering over or clicking on a link leads to the page
 * which opens and closes the submenu
 *
 * Submenu levels in L and S are taken out of their regular dom element and moved into submenuContainer,
 * because they don't take up any space between their parents, but the height of the menu depends on their height.
 * This behaviour is not possible with position:fixed. Therefore, submenus are moved with jQuery.
 */

$(document).ready(() => {

    const setMenuContainerHeight = () => {
        const outermenu = $('.navigation_default-submenuContainer-outer');
        outermenu.css('height', '0px');
        // firefox positions elements with "position: fixed" relativ to body
        const firetop = $('.navigation_default').position().top + $('.navigation_default').height();
        $('.navigation_default-submenuContainer-outer').css('top', firetop);
        $('.navigation_default-submenu.absolute').each((index, element) => {
            if ($(element).css('display') !== 'none') {
                if ($(outermenu).height() < $(element).height()) {
                    outermenu.css('height', $(element).css('height'));
                }
            }
        });
    };

    const cleanSubmenuContainer = target => {
        $.when($(target).siblings().find('.navigation_default-submenu').fadeOut('fast')).done(() => {
            setMenuContainerHeight();
            return true;
        });
    };

    const hoverSubmenuItem = target => {
        $(target).addClass('hover');
        $(target).siblings().removeClass('hover');
        // $(target).parent('.navigation_default-submenu').prevAll('.navigation_default-submenu').each((index, element) => {
        //    $(element).find('.-actSub').first().addClass('hover').css('left', $(target).width());
        // });
    };

    // show submenus after removing old ones
    const showSubmenu = target => {
        $.when(cleanSubmenuContainer(target)).done(() => {
            const submenu = $(target).find('.navigation_default-submenu').first();
            const parent = $(submenu).parents('.navigation_default-submenu');
            let top = $('.navigation_default-menu').height();
            let left = 0;
            if (parent.length > 0) {
                left = $(parent).position().left + $(parent).width();
                top = 0;
            }
            submenu.addClass('absolute').css({
                'left': `${left}px`,
                'top': `${top}px`
            }).fadeIn('slow');
            setMenuContainerHeight();

            $('.navigation_default-submenuContainer-outer').fadeIn('fast');

            $(submenu).children('.navigation_default-submenuItem').mouseenter(event => {
                const subtarget = $(event.currentTarget);
                showSubmenu(subtarget);
                hoverSubmenuItem(subtarget);
            });
        });
    };

    const exposePath = target => {
        const closest = $(target).find('.-actSub');
        if ($(closest).length > 0) {
            showSubmenu($(closest));
            exposePath($(closest));
        }
    };

    const hoverMenuItem = target => {
        // set colors explicitly, as it is overriding color of loaded page
        $(target).addClass('hover').css('background-color', '#e5e5e5');
        $(target).siblings().removeClass('hover').css('background-color', '#f2f2f2');
        showSubmenu($(target));
        setTimeout(() => {
            exposePath(target);
            setMenuContainerHeight();
        }, 'slow');
    };
    /*
    const cleanupMenuItems = () => {
        $('.navigation_default-menuItem').removeClass('hover').css('background-color', '#f2f2f2');
        $('.navigation_default-menuItem.-actSub, .navigation_default-menuItem.-cur, .navigation_default-menuItem.-curIfSub').css('background-color', '#e5e5e5');
    };
    */
    const hideSubmenu = () => {
        $('.navigation_default-submenu.absolute').fadeOut('slow', () => {
            setMenuContainerHeight();
        });
    };

    $('.navigation_default-menuItem').mouseenter(event => {
        const target = event.currentTarget;
        hoverMenuItem(target);
    });

    $('.navigation_default').mouseleave(() => {
        setTimeout(() => {
            hideSubmenu();
        }, 'slow');
    });

    /**
     * everything related to breadcrumbs for scrolled content
     */
    // Reduce header and add transparent gradient to text
    $('.scrolled').on('scroll', event => {

        // when scrolled up show default header
        if ($(event.currentTarget).scrollTop() === 0) {
            $('.overlay').hide();
            $('.navigation_default').show();
            $('.navigation_breadCrumbs').hide();
            $('.toTop_inner').fadeOut();
        } else if ($('.toTop_inner').css('display') === 'none') {
            $('.overlay').show();
            $('.navigation_default').hide();
            $('.navigation_breadCrumbs').show();
            $('.toTop_inner').fadeIn();
        }
    });

    /**
     * When menuButton or page-up-button is clicked, switch back to full menu
     */
    $('.navigation_menuButton, .toTop_inner').on('click', () => {
        $('.scrolled').animate({ scrollTop: 0 }, 'fast');
        $('.navigation_breadCrumbs').hide();
    });
});

/**
 * Main.js
 *
 * Show the website after all javascript is done
 */

$(document).ready(() => {

    /**
     * The body is not displayed by default, only after javascript is done it is finally displayed
     * This removes jumping elements
     */
    $('body').show();
    $('.navigation_breadCrumbs').hide();
    $('.toTop_inner').hide();
    $('.navigation_default-submenu').hide();
});

/**
 * Images.js
 *
 * Image manipulations
 */

$(document).ready(() => {
    const lightboxId = Math.ceil(Math.random() * 100);

    $('a[href$=".jpg" i], a[href$=".png" i]').attr('rel', `lightbox[${lightboxId}]`);
});

(function () {
    if (sessionStorage.foutFontsLoaded) {
        document.documentElement.className += " fonts-loaded";
        return;
    }

    (function () {
        function e(e, t) {
            document.addEventListener ? e.addEventListener("scroll", t, !1) : e.attachEvent("scroll", t);
        }function t(e) {
            document.body ? e() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function t() {
                document.removeEventListener("DOMContentLoaded", t), e();
            }) : document.attachEvent("onreadystatechange", function n() {
                if ("interactive" == document.readyState || "complete" == document.readyState) document.detachEvent("onreadystatechange", n), e();
            });
        }function n(e) {
            this.a = document.createElement("div"), this.a.setAttribute("aria-hidden", "true"), this.a.appendChild(document.createTextNode(e)), this.b = document.createElement("span"), this.c = document.createElement("span"), this.h = document.createElement("span"), this.f = document.createElement("span"), this.g = -1, this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;", this.b.appendChild(this.h), this.c.appendChild(this.f), this.a.appendChild(this.b), this.a.appendChild(this.c);
        }function r(e, t) {
            e.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:" + t + ";";
        }function i(e) {
            var t = e.a.offsetWidth,
                n = t + 100;return e.f.style.width = n + "px", e.c.scrollLeft = n, e.b.scrollLeft = e.b.scrollWidth + 100, e.g !== t ? (e.g = t, !0) : !1;
        }function s(t, n) {
            function r() {
                var e = s;i(e) && null !== e.a.parentNode && n(e.g);
            }var s = t;e(t.b, r), e(t.c, r), i(t);
        }function o(e, t) {
            var n = t || {};this.family = e, this.style = n.style || "normal", this.weight = n.weight || "normal", this.stretch = n.stretch || "normal";
        }function l() {
            if (null === a) {
                var e = document.createElement("div");try {
                    e.style.font = "condensed 100px sans-serif";
                } catch (t) {}a = "" !== e.style.font;
            }return a;
        }function c(e, t) {
            return [e.style, e.weight, l() ? e.stretch : "", "100px", t].join(" ");
        }var u = null,
            a = null,
            f = null;o.prototype.load = function (e, i) {
            var o = this,
                a = e || "BESbswy",
                l = i || 3e3,
                h = new Date().getTime();return new Promise(function (e, i) {
                null === f && (f = !!window.FontFace);if (f) {
                    var p = new Promise(function (e, t) {
                        function n() {
                            new Date().getTime() - h >= l ? t() : document.fonts.load(c(o, o.family), a).then(function (t) {
                                1 <= t.length ? e() : setTimeout(n, 25);
                            }, function () {
                                t();
                            });
                        }n();
                    }),
                        d = new Promise(function (e, t) {
                        setTimeout(t, l);
                    });Promise.race([d, p]).then(function () {
                        e(o);
                    }, function () {
                        i(o);
                    });
                } else t(function () {
                    function t() {
                        var t;if (t = -1 != m && -1 != g || -1 != m && -1 != S || -1 != g && -1 != S) (t = m != g && m != S && g != S) || (null === u && (t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), u = !!t && (536 > parseInt(t[1], 10) || 536 === parseInt(t[1], 10) && 11 >= parseInt(t[2], 10))), t = u && (m == x && g == x && S == x || m == T && g == T && S == T || m == N && g == N && S == N)), t = !t;t && (null !== C.parentNode && C.parentNode.removeChild(C), clearTimeout(L), e(o));
                    }function f() {
                        if (new Date().getTime() - h >= l) null !== C.parentNode && C.parentNode.removeChild(C), i(o);else {
                            var e = document.hidden;if (!0 === e || void 0 === e) m = p.a.offsetWidth, g = d.a.offsetWidth, S = v.a.offsetWidth, t();L = setTimeout(f, 50);
                        }
                    }var p = new n(a),
                        d = new n(a),
                        v = new n(a),
                        m = -1,
                        g = -1,
                        S = -1,
                        x = -1,
                        T = -1,
                        N = -1,
                        C = document.createElement("div"),
                        L = 0;C.dir = "ltr", r(p, c(o, "sans-serif")), r(d, c(o, "serif")), r(v, c(o, "monospace")), C.appendChild(p.a), C.appendChild(d.a), C.appendChild(v.a), document.body.appendChild(C), x = p.a.offsetWidth, T = d.a.offsetWidth, N = v.a.offsetWidth, f(), s(p, function (e) {
                        m = e, t();
                    }), r(p, c(o, '"' + o.family + '",sans-serif')), s(d, function (e) {
                        g = e, t();
                    }), r(d, c(o, '"' + o.family + '",serif')), s(v, function (e) {
                        S = e, t();
                    }), r(v, c(o, '"' + o.family + '",monospace'));
                });
            });
        }, "undefined" != typeof module ? module.exports = o : (window.FontFaceObserver = o, window.FontFaceObserver.prototype.load = o.prototype.load);
    })();

    var font_a = new FontFaceObserver('Open Sans', {
        weight: 300
    });
    var font_b = new FontFaceObserver('Open Sans', {
        weight: 400,
        style: 'italic'
    });
    var font_c = new FontFaceObserver('Open Sans', {
        weight: 400
    });
    var font_d = new FontFaceObserver('Open Sans', {
        weight: 400,
        style: 'italic'
    });
    var font_e = new FontFaceObserver('Open Sans', {
        weight: 600
    });
    var font_f = new FontFaceObserver('Open Sans', {
        weight: 600,
        style: 'italic'
    });

    Promise.all([font_a.load(), font_b.load(), font_c.load(), font_d.load(), font_e.load(), font_f.load()]).then(function () {
        document.documentElement.className += " fonts-loaded";
        sessionStorage.foutFontsLoaded = true;
    });
})();
