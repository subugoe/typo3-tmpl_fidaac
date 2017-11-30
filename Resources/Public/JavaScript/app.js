'use strict';

$(document).ready(function () {

    var searchForm = $('#search-form');

    // we use realurl, so we have different paths, depending on language
    var lang = $('html').attr('lang');
    var getAction = function getAction(search) {
        if (lang === 'de') {
            if (search === 'metasearch') {
                return '/de/suche/kataloge';
            }
            return '/de/suche/website';
        }
        if (search === 'metasearch') {
            return '/search/metasearch-engine';
        }
        return '/search/website';
    };
    var searchEngineSettingsMetasearch = {
        'action': getAction('metasearch'),
        'id': 'choice-pazpar2',
        'name': 'tx_pazpar2_pazpar2[queryString]',
        'query': getAction('metasearch') + '?tx_pazpar2_pazpar2[useJS]=yes&tx_pazpar2_pazpar2[queryString]='
    };

    var searchEngineSettingsWebsite = {
        'action': getAction('website'),
        'id': 'choice-website',
        'name': 'q',
        'query': getAction('website') + '/?q='
    };

    var initializeSearchForm = function initializeSearchForm() {
        var parameters = searchEngineSettingsMetasearch;
        searchForm.attr('action', parameters.action);
        searchForm.attr('name', parameters.name);
    };

    $('.header_search').click(function () {
        $('.js-search-bar').slideToggle(250);
        initializeSearchForm();

        return false;
    });

    $('input[name=search-choice]').change(function (event) {
        if (event.target.id === 'choice-website') {
            var parameters = searchEngineSettingsWebsite;

            searchForm.attr('action', parameters.action);
            searchForm.attr('name', parameters.name);
        } else {
            var _parameters = searchEngineSettingsMetasearch;

            searchForm.attr('action', _parameters.action);
            searchForm.attr('name', _parameters.name);
        }
    });

    var getQuery = function getQuery(choice) {
        if (choice === 'choice-website') {
            var _parameters2 = searchEngineSettingsWebsite;
            return _parameters2.query;
        }

        var parameters = searchEngineSettingsMetasearch;
        return parameters.query;
    };

    searchForm.submit(function () {
        var id = document.querySelector('input[name=search-choice]:checked').getAttribute('id');
        window.location = getQuery(id) + $('#search').val();
        return false;
    });

    $('.pagination .previous a').html('<svg><use xlink:href="#backward"/></svg>');
    $('.pagination .last.next a').html('<svg><use xlink:href="#forward"/></svg>');
});

/**
 * Navigation.js
 *
 * Change the menu, so that hovering over or clicking on a link leads to the page
 * which opens and closes the submenu
 *
 * Submenu levels in L and S are taken out of their regular dom element and moved into submenuContainer
 * so that levels can be shown in a horizontal way
 * This behaviour is not possible with position:fixed. Therefore, submenus are moved with jQuery.
 */

$(document).ready(function () {

    /**
     * When a menuitem is not active anymore, leftover cloned DOM-Elements and the container in which
     * they are shown have to be cleaned up
     */
    var cleanupMenuItem = function cleanupMenuItem(target) {
        $(target).siblings().find('.navigation_default-submenuContainer-outer').hide();
        $(target).siblings().find('.navigation_default-submenu').addClass('visible-hidden');
        $(target).siblings().find('.clone').remove();
        $(target).siblings().removeClass('hover').removeClass('cloned');
        var submenu = $(target).find('.navigation_default-submenu');
        $(submenu).find('.navigation_default-submenu').removeClass('visible-shown').addClass('visible-hidden');
        $(target).removeClass('cloned');
    };

    /**
     * When a submenuitem is not active anymore, leftover DOM-Elements have to be removed
     */
    var cleanupSubmenuItem = function cleanupSubmenuItem(target) {
        $(target).siblings().find('.navigation_default-submenu').addClass('visible-hidden');
        $(target).siblings().removeClass('hover').removeClass('cloned');

        var parent = $(target).parent();
        var next = parent.nextAll('.clone');
        next.remove();
        $(target).removeClass('cloned');
    };

    /**
     * One function to show menu, so that it can be invoked recursivly
     * Subsubmenus are cloned, so that they are independent of the DOM, and can be positioned absolutely
     */
    var showMenu = function showMenu(target) {
        var submenu = $(target).find('.navigation_default-submenu').first();
        var container = '';

        if ($(target).hasClass('navigation_default-submenuItem')) {
            // subsubmenu

            container = $(target).parents('.navigation_default-submenuContainer-outer').first();
            var clonemenu = submenu.clone().addClass('clone');
            if (clonemenu.length > 0) {
                $(target).addClass('cloned');

                $(container).find('.navigation_default-submenuContainer-inner').append(clonemenu);
                $(clonemenu).removeClass('visible-hidden').addClass('visible-shown');

                // add bindings to newly created elements
                $(clonemenu).find('.navigation_default-submenuItem').hoverIntent({
                    over: function over(event) {
                        var subTarget = event.currentTarget;
                        cleanupSubmenuItem(subTarget);
                        $('.cloned').addClass('hover');
                        $(target).parents('.-sub').addClass('hover');
                        showMenu(subTarget);
                    },
                    // increased timeout necessary for FF (default = 0)
                    timeout: 250
                });
            }
        } else {
            // submenu

            container = $(target).find('.navigation_default-submenuContainer-outer').first();
            $(container).show();
            $(submenu).removeClass('visible-hidden').addClass('visible-shown');
        }
        // Height of header is different on start or content page
        $(container).css('top', $('.navigation_default').position().top + $('.navigation_default').height() - $(window).scrollTop());
    };

    var exposePath = function exposePath(target) {
        var subTarget = $(target).find('.-actSub, .-cur, .-act, .-curSub').first();
        if ($(subTarget).length > 0) {
            showMenu($(subTarget));
            exposePath($(subTarget));
        }
    };

    $('.navigation_default-menuItem').hoverIntent({
        over: function over(event) {
            var target = event.currentTarget;
            cleanupMenuItem(target);
            if ($(target).find('.-curSub, .-cur, .-actSub, .-act').length > 0) {
                showMenu(target);
                exposePath(target);
            } else {
                showMenu(target);
            }
        },
        out: function out() {
            // nothing to do
        },
        timeout: 250
    });

    $('.navigation_default-submenuItem').hoverIntent({
        over: function over(event) {
            var target = event.currentTarget;
            cleanupSubmenuItem(target);
            $(target).addClass('hover');
            $(target).parents('.-sub').addClass('hover');
            showMenu(target);
        },
        timeout: 250
    });

    /**
     * Stuff related to scrolling and page up button
     */
    $(window).on('scroll', function (event) {

        if ($(event.currentTarget).scrollTop() === 0) {
            $('.toTop_inner').css('visibility', 'hidden');
        } else if ($('.toTop_inner').css('visibility') === 'hidden') {
            $('.navigation_default-submenuContainer-outer').hide();
            $('.toTop_inner').css('visibility', 'visible');
        }
    });

    $('.toTop_inner').on('click', function () {
        $('html').animate({ scrollTop: 0 }, 'fast');
    });
});

/**
 * Main.js
 *
 * Show the website after all javascript is done
 */

$(document).ready(function () {

    /**
     * The body is not displayed by default, only after javascript is done it is finally displayed
     * This removes jumping elements
     */
    // hide, so that space is preserved
    $('.toTop_inner').css('visibility', 'hidden');
});

$(document).ready(function () {

    /**
     * make sure, text in stairs view of news is cut according to image height
     */
    $('.news-stairs-view .article').each(function (index, el) {
        var teaserheight = $(el).find('.teaser-text').height();
        var imgheight = $(el).find('.img-wrap').height();
        var headerheight = $(el).find('.news-header').height();
        var buttonheight = $(el).find('.infos-wrap').children('a').last().height();
        var theight = imgheight - buttonheight - headerheight;
        if (teaserheight + buttonheight + headerheight >= imgheight) {
            $(el).find('.teaser-text').css('height', theight - 2);
        }
    });

    /**
     * Implement handles for slider view of news
     */
    $('.news-overlay.-left').hide();
    if ($('.news-slide').length < 3) {
        $('.news-overlay.-right').hide();
    }

    $('.news-overlay.-right').on('click', function () {

        $('.news-overlay.-left').show();
        $.when($('.news-rel-slider').animate({ 'left': '-=416px' })).done(function () {
            // show handles only, if there is still something to scroll
            var relleft = $('.news-rel-slider').children('.article').last().offset().left;
            if (relleft <= 960) {
                $('.news-overlay.-right').hide();
            }
        });
    });

    $('.news-overlay.-left').on('click', function () {
        $('.news-overlay.-right').show();
        // show handles only, if there is still something to scroll
        $.when($('.news-rel-slider').animate({ 'left': '+=416px' })).done(function () {
            var relleft = $('.news-rel-slider').position().left;
            if (relleft === 0) {
                $('.news-overlay.-left').hide();
            }
        });
    });

    /**
     * make sure images in slider view are horizonally aligned
     */
    var sliderheaderheight = $('.news-slider-view .news-header').first().height();
    $('.news-slider-view .news-header').each(function (index, el) {
        if (sliderheaderheight < $(el).height()) {
            sliderheaderheight = $(el).height();
        }
    });
    $('.news-slider-view .news-header').css('height', sliderheaderheight);
});

/**
 * Images.js
 *
 * Image manipulations
 */

$(document).ready(function () {
    var lightboxId = Math.ceil(Math.random() * 100);

    /**
     * Add caption and translate number info to image overlays
     */
    $('a[href$=".jpg"], a[href$=".png"]').attr('rel', 'lightbox[' + lightboxId + ']');
    $('a[href$=".jpg"], a[href$=".png"]').each(function (index, el) {
        if ($('figcaption').length > 0) {
            // content element
            $(el).attr('data-title', $(el).siblings('figcaption').html());
        } else {
            // news
            $(el).attr('data-title', $(el).parent().siblings('.news-img-caption').html());
        }
    });

    if ($('html').attr('lang') === 'de') {
        $('body').on('DOMNodeInserted', '.lb-number', function () {
            var lbNumberEn = $('.lb-number').text();
            var lbNumberGer = lbNumberEn.replace('Image', 'Bild');
            lbNumberGer = lbNumberGer.replace('of', 'von');
            $('.lb-number').text(lbNumberGer);
        });
    }
});

/**
 * Powermail.js
 */

$(document).ready(function () {
    $('.powermail_input').focus(function (event) {
        var id = $(event.target).attr('id');
        $('.powermail_label[for=' + id + ']').addClass('activeLabel');
    });

    $('.powermail_input').blur(function (event) {
        if ($(event.target).val()) {
            return;
        }

        var id = $(event.target).attr('id');
        $('.powermail_label[for=' + id + ']').removeClass('activeLabel');
    });

    /**
     * In checkbox, the label is part of the checkbox and has to be separated in an extra label
     */
    // TODO: When changing the checkbox, the original event has to be delegated to its child
    // const but = $('.powermail_field .checkbox input:required').addClass('changedCheckbox');
    // const butLabel = `<label class="changedLabel">${$(but).attr('value')}</label>`;
    // const butEvent = $('.powermail_field .checkbox input:required').parent('label').getScript();

    // $(but).parent('label').replaceWith($(but).parent('label').children());
    // $('.powermail_field .checkbox').children().last().after(butLabel);
});

/**
 * Javascript for Pazpar2
 */
$(document).ready(function () {

    $('body').on('DOMNodeInserted', 'a.pz2-prev', function () {
        if ($('a.pz2-prev').html().indexOf('svg') === -1) {
            $('a.pz2-prev').html('<svg><use xlink:href="#backward"/></svg>');
        }
    });

    $('body').on('DOMNodeInserted', 'a.pz2-next', function () {
        $('a.pz2-next').each(function (index, el) {
            if ($(el).html().indexOf('svg') === -1) {
                $(el).html('<svg><use xlink:href="#forward"/></svg>');
            }
        });
    });
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
