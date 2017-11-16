
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
        $('.js-search-bar').slideToggle(250);
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

$(document).ready(() => {

    /**
     * Make sure navigation's container is always high enough (elements are positioned absolute)
     */
    const defineHeightOfNavigation = () => {
        const elements = [0];
        const heightOfElement = $('.navigation_default-submenuItem').height() + 8;
        $('.navigation_default-submenu').each((index, el) => {
            elements.push($(el).children().length);
        });
        const numberOfElements = Math.max(...elements);
        $('.navigation_default-submenuContainer-outer').css('height', `${numberOfElements * heightOfElement + 16}px`);
    };
    defineHeightOfNavigation();

    /**
     * show complete path if menu is opened
     */
    $('.navigation_default-menuItem').mouseenter(event => {
        $(event.currentTarget).find('.navigation_default-submenuItem').mouseenter(eve => {
            $(eve.currentTarget).siblings().find('.navigation_default-submenu').css('visibility', 'hidden');

            $(eve.currentTarget).find('.navigation_default-submenu').css('visibility', 'visible');
        });
        $(event.currentTarget).find('.-cur').parent('.navigation_default-submenuItem .navigation_default-submenu').css('visibility', 'visible');
    }).mouseleave(event => {
        $(event.currentTarget).find('.navigation_default-submenuItem .navigation_default-submenu').css('visibility', 'hidden');
    });

    /**
     * Stuff related to scrolling and page up button
     */
    $(window).on('scroll', event => {

        if ($(event.currentTarget).scrollTop() === 0) {
            $('.toTop_inner').css('visibility', 'hidden');
        } else if ($('.toTop_inner').css('visibility') === 'hidden') {
            $('.navigation_default-submenuContainer-outer').css('visibility', 'hidden').css('transition', 'all 0s');
            $('.toTop_inner').css('visibility', 'visible');
        }
    });

    $('.toTop_inner').on('click', () => {
        $('html').animate({ scrollTop: 0 }, 'fast');
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
    // hide, so that space is preserved
    $('.toTop_inner').css('visibility', 'hidden');
});

$(document).ready(() => {

    /**
     * make sure, text in stairs view of news is cut according to image height
     */
    $('.news-stairs-view .article').each((index, el) => {
        const teaserheight = $(el).find('.teaser-text').height();
        const imgheight = $(el).find('.img-wrap').height();
        const headerheight = $(el).find('.news-header').height();
        const buttonheight = $(el).find('.infos-wrap').children('a').last().height();
        const theight = imgheight - buttonheight - headerheight;
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

    $('.news-overlay.-right').on('click', () => {

        $('.news-overlay.-left').show();
        $.when($('.news-rel-slider').animate({ 'left': '-=416px' })).done(() => {
            // show handles only, if there is still something to scroll
            const relleft = $('.news-rel-slider').children('.article').last().offset().left;
            if (relleft <= 960) {
                $('.news-overlay.-right').hide();
            }
        });
    });

    $('.news-overlay.-left').on('click', () => {
        $('.news-overlay.-right').show();
        // show handles only, if there is still something to scroll
        $.when($('.news-rel-slider').animate({ 'left': '+=416px' })).done(() => {
            const relleft = $('.news-rel-slider').position().left;
            if (relleft === 0) {
                $('.news-overlay.-left').hide();
            }
        });
    });

    /**
     * make sure images in slider view are horizonally aligned
     */
    let sliderheaderheight = $('.news-slider-view .news-header').first().height();
    $('.news-slider-view .news-header').each((index, el) => {
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

$(document).ready(() => {
    const lightboxId = Math.ceil(Math.random() * 100);

    /**
     * Add caption and translate number info to image overlays
     */
    $('a[href$=".jpg"], a[href$=".png"]').attr('rel', `lightbox[${lightboxId}]`);
    $('a[href$=".jpg"], a[href$=".png"]').each((index, el) => {
        if ($('figcaption').length > 0) {
            // content element
            $(el).attr('data-title', $(el).siblings('figcaption').html());
        } else {
            // news
            $(el).attr('data-title', $(el).parent().siblings('.news-img-caption').html());
        }
    });

    if ($('html').attr('lang') === 'de') {
        $('body').on('DOMNodeInserted', '.lb-number', () => {
            const lbNumberEn = $('.lb-number').text();
            let lbNumberGer = lbNumberEn.replace('Image', 'Bild');
            lbNumberGer = lbNumberGer.replace('of', 'von');
            $('.lb-number').text(lbNumberGer);
        });
    }
});

/**
 * Powermail.js
 */

$(document).ready(() => {
    $('.powermail_input').focus(event => {
        const id = $(event.target).attr('id');
        $(`.powermail_label[for=${id}]`).addClass('activeLabel');
    });

    $('.powermail_input').blur(event => {
        if ($(event.target).val()) {
            return;
        }

        const id = $(event.target).attr('id');
        $(`.powermail_label[for=${id}]`).removeClass('activeLabel');
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
$(document).ready(() => {

    $('body').on('DOMNodeInserted', 'a.pz2-prev', () => {
        if ($('a.pz2-prev').html().indexOf('svg') === -1) {
            $('a.pz2-prev').html('<svg><use xlink:href="#backward"/></svg>');
        }
    });

    $('body').on('DOMNodeInserted', 'a.pz2-next', () => {
        $('a.pz2-next').each((index, el) => {
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
