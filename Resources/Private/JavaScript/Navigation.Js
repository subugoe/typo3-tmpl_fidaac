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
     * Stuff related to scrolling and page up button
     */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() === 0) {
            $('.toTop_inner').css('visibility', 'hidden');
        } else if ($('.toTop_inner').css('visibility') === 'hidden') {
            $('.toTop_inner').css('visibility', 'visible');
        }
    });

    $('.toTop_inner').on('click', () => {
        $('html').animate({scrollTop: 0}, 'fast');
    });

    /**
     * Stuff related to ajax-menu
     * To show navigation horizontally:
     * + javascript is enabled -> the second level of submenus are hidden and created via ajax
     * + javascript is not enabled -> the second level of submenus are shown via css
     */
        const createURLForAjaxInML = (path) => {
            let url = '';
            // ie10 doesn't recognice window.location.origin...
            if (window.location.origin) {
                url = window.location.origin;
            } else {
                url = `${window.location.protocol}//${window.location.hostname}`;
                if (window.location.port) {
                    url += `:${window.location.port}`;
                }
            }
            url += path;
            if (url.indexOf('&index.php') === '0') {
                url += '&type=37902';
            } else {
                url += '?type=37902';
            }
            return url;
        };

        const makePathBoldInML = function () {
            const actUrl = window.location.pathname;
            $(`a[href$="${actUrl}"]`).parents('.navigation_default-submenuItem').first().removeClass('-no').addClass('-cur');

        };

        const removeSubsubmenusInML = function (subsubmenu) {
            $(subsubmenu).parents('.navigation_default-submenuContainer-inner').find('.navigation_default-submenu').first().siblings().remove();
        };

        const showPathInML = function () {
            const url = createURLForAjaxInML($('.navigation_default-submenuItem.-actSub').find('a').first().attr('href'));
            const menu = $('.navigation_default-submenuItem.-actSub').parents('.navigation_default-submenuContainer-inner').append('<ul class="navigation_default-submenu"></ul>');
            $(menu).find('.navigation_default-submenu').last().load(url, (response, status) => {
                if (status === 'error') {
                    console.log('Error loading submenu');
                } else if (status === 'success') {
                    makePathBoldInML();
                }
            });
        };


        $('.navigation_default-submenuItem.-sub, .navigation_default-submenuItem.-curIfSub, .navigation_default-submenuItem.-actSub').on('mouseenter', function () {
            if (window.innerWidth < 768) {
                return false;
            }
            const url = createURLForAjaxInML($(this).find('a').first().attr('href'));
            removeSubsubmenusInML(this);
            const menu = $(this).parents('.navigation_default-submenuContainer-inner').append('<ul class="navigation_default-submenu"></ul>');
            $(menu).find('.navigation_default-submenu').last().load(url, (response, status) => {
                if (status === 'error') {
                    console.log('Error loading submenu');
                }
                makePathBoldInML();
            });
            return true;
        });

        $('.navigation_default-submenuItem.-no').on('mouseenter', function () {
            if (window.innerWidth < 768) {
                return false;
            }
            removeSubsubmenusInML(this);
            return true;
        });

        $('.navigation_default-menuItem').on('mouseenter', function () {
            if (window.innerWidth < 768) {
                return false;
            }
            $('.navigation_default-submenuItem').removeClass('-highlight');
            removeSubsubmenusInML($(this).find('.navigation_default-submenu'));
            if ($(this).find('.navigation_default-submenuItem.-cur').length > 0) {
                showPathInML();
            }
            return true;
        });

        $('.navigation_default-submenuItem').on('mouseenter', function () {
            if (window.innerWidth > 767) {
                return false;
            }
            $('.navigation_default-submenuItem').removeClass('-highlight');
            $(this).addClass('-highlight');
            return true;
        });


    /**
     * make sure navigation is displayed correctly in S
     */
    const addNavigationLinkInS = () => {
        if ($('.navigation_default-additional').length === 1) {
            return false;
        }
        const text = '<ul class="navigation_default-additional"><li><svg class="svg-left"><use xlink:href="#icon-caret-left"/></svg>Previous</li></ul>';
        $('.navigation_default').prepend(text);
        return true;
    };

    const removeNavigationLinkInS = () => {
        $('.breadcrumb-page svg').remove();
    };

    const showSubmenuInS = (el) => {
        if (window.innerWidth > 767) {
            return false;
        }
        const parent = $(el).siblings('a').html();
        const container = $(el).siblings('.navigation_default-submenuContainer-outer');
        $('.navigation-title_text-title').html(parent);
        $(container).removeClass('-hide');
        $(container).find('.navigation_default-submenu:first-child').removeClass('-hide');
        $(el).parents('.navigation_default-submenu').find('.navigation_default-submenu').removeClass('-hide');
        addNavigationLinkInS();

        $('.navigation_default-additional').off('click');
        $('.navigation_default-additional').on('click', () => {
            $(el).siblings('.navigation_default-submenuContainer-outer').addClass('-hide');
            $('.navigation-title_text-title').html('Menu');
            removeNavigationLinkInS();
        });
        return true;
    };

    const showSubsubmenuInS = (el) => {
        const parent = $(el).siblings('a').html();
        $('.navigation-title_text-title').html(parent);
        $(el).siblings('.navigation_default-submenu').removeClass('-hide');
        $(el).parents('.navigation_default-submenu').find('.navigation_default-submenu').siblings('.navigation_default-submenu').addClass('-hide');

        $('.navigation_default-additional').off('click');
        $('.navigation_default-additional').on('click', () => {
            showSubmenuInS($(el).parents('.navigation_default-menuItem').find('.-svg-menu'));
            $(el).parents('.navigation_default-submenu').first().find('.navigation_default-submenu').addClass('-hide');
        });
    };

    /**
     * breadcrumbs in S behave differently
     * only upper page is shown, together with icon
     */
    const showIconInSMenu = () => {
        if ($('.breadcrumb-page:nth-last-child(3) svg').length === 1) {
            return false;
        }
        const parent = $('.breadcrumb-page:nth-last-child(3) a');
        const parentText = $(parent).text();
        const icon = '<svg class="svg-left"><use xlink:href="#icon-caret-left"/></svg>';
        $(parent).html(`${icon} ${parentText}`);
        return true;
    };

    $('.header_menu').click(() => {
        if (window.innerWidth < 768) {
            $('.navigation_outer').removeClass('-hide');
            $('.page').css('overflow', 'hidden');
            $('.navigation_default-submenuContainer-inner > .navigation_default-submenu').first().removeClass('-hide');
            $('.navigation-title_text-title').html('Menu');
        } else {
            $('.navigation_outer').slideToggle(250);
        }

        return false;
    });

    $('.navigation_default-menuItem .-svg-menu').on('click', function () {
        showSubmenuInS($(this));
    });

    $('.navigation_default-submenuItem .-svg-submenu').on('click', function () {
        showSubsubmenuInS($(this));
    });

    $('#navigation-close').click(() => {
        $('.navigation_outer').addClass('-hide');
        $('.navigation_default-submenuContainer-outer').addClass('-hide');
        $('.navigation_default-submenu').addClass('-hide');
        $('.page').css('overflow', 'visible');
        return false;
    });

    if (window.innerWidth < 768) {
        $('.navigation_default-submenuContainer-outer').addClass('-hide');
        $('.navigation_outer').addClass('-hide');
        $('.navigation_default-submenu').addClass('-hide');
        showIconInSMenu();
    }

    window.addEventListener('resize', function () {

        if (window.innerWidth < 768) {
            console.log('if');
            $('.navigation_outer').addClass('-hide');
            $('.navigation_default-submenuContainer-outer').addClass('-hide');
            $('.navigation_default-submenu').addClass('-hide');
            $('.page').css('overflow', 'visible');
            showIconInSMenu();
        } else {
            console.log('else');
            $('.-hide').removeClass('-hide');
            $('.page').css('overflow', 'visible');
            removeNavigationLinkInS();
        }
    });
});
