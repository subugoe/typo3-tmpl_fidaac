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
    if ($(window).innerWidth() > 767) {
        const createURLForAjax = (path) => {
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

        const makePathBold = function () {
            const actUrl = window.location.pathname;
            $(`a[href$="${actUrl}"]`).parents('.navigation_default-submenuItem').first().removeClass('-no').addClass('-cur');

        };

        const removeSubsubmenus = function (subsubmenu) {
            $(subsubmenu).parents('.navigation_default-submenuContainer-inner').find('.navigation_default-submenu').first().siblings().remove();
        };

        const showPath = function () {
            const url = createURLForAjax($('.navigation_default-submenuItem.-actSub').find('a').first().attr('href'));
            const menu = $('.navigation_default-submenuItem.-actSub').parents('.navigation_default-submenuContainer-inner').append('<ul class="navigation_default-submenu"></ul>');
            $(menu).find('.navigation_default-submenu').last().load(url, (response, status) => {
                if (status === 'error') {
                    console.log('Error loading submenu');
                } else if (status === 'success') {
                    makePathBold();
                }
            });
        };


        $('.navigation_default-submenuItem.-sub, .navigation_default-submenuItem.-curIfSub, .navigation_default-submenuItem.-actSub').on('mouseenter', function () {
            const url = createURLForAjax($(this).find('a').first().attr('href'));
            removeSubsubmenus(this);
            const menu = $(this).parents('.navigation_default-submenuContainer-inner').append('<ul class="navigation_default-submenu"></ul>');
            $(menu).find('.navigation_default-submenu').last().load(url, (response, status) => {
                if (status === 'error') {
                    console.log('Error loading submenu');
                }
                makePathBold();
            });
        });

        $('.navigation_default-submenuItem.-no').on('mouseenter', function () {
            removeSubsubmenus(this);
        });

        $('.navigation_default-menuItem').on('mouseenter', function () {
            $('.navigation_default-submenuItem').removeClass('-highlight');
            removeSubsubmenus($(this).find('.navigation_default-submenu'));
            if ($(this).find('.navigation_default-submenuItem.-cur').length > 0) {
                showPath();
            }
        });

        $('.navigation_default-submenuItem').on('mouseenter', function () {
            $('.navigation_default-submenuItem').removeClass('-highlight');
            $(this).addClass('-highlight');
        });
    }

    /**
     * make sure navigation is displayed correctly in S
     */
    const showSubmenu = (el) => {
        const text = $(el).siblings('a').html();
        $('.navigation-title_text-title').html(text);
        $(el).siblings('.navigation_default-submenuContainer-outer').show();

        $('.navigation-title_text-title').off('click');
        $('.navigation-title_text-title').on('click', () => {
            $(el).siblings('.navigation_default-submenuContainer-outer').hide();
            $('.navigation-title_text-title').html('Menu');
        });
    };

    const showSubsubmenu = (el) => {
        const text = $(el).siblings('a').html();
        $('.navigation-title_text-title').html(text);
        $(el).siblings('.navigation_default-submenu').show();
        $(el).parents('.navigation_default-submenu').find('.navigation_default-submenu').siblings('.navigation_default-submenu').hide();

        $('.navigation-title_text-title').off('click');
        $('.navigation-title_text-title').on('click', () => {
            showSubmenu($(el).parents('.navigation_default-menuItem').find('.-svg-menu'));
            $(el).parents('.navigation_default-submenu').first().find('.navigation_default-submenu').hide();
        });
    };

    $('.header_menu').click(() => {
        if ($(window).innerWidth() < 768) {
            $('.navigation_outer').show();
            $('.page').css('overflow', 'hidden');
            $('.navigation-title_text-title').html('Menu');
        } else {
            $('.navigation_outer').slideToggle(250);
        }

        return false;
    });

    $('.navigation_default-menuItem .-svg-menu').on('click', function () {
        showSubmenu($(this));
    });

    $('.navigation_default-submenuItem .-svg-submenu').on('click', function () {
        showSubsubmenu($(this));
    });

    $('#navigation-close').click(() => {
        $('.navigation_outer').hide();
        $('.page').css('overflow', 'visible');
        $('.navigation_default-submenuContainer-outer').hide();
        return false;
    });

    window.addEventListener('resize', function () {
        if ($('#navigation-close').css('display') === 'flex') {
            $('.page').css('overflow', 'hidden');
            $('.navigation_outer').hide();
        } else {
            $('.page').css('overflow', 'visible');
            $('.navigation_outer').show();
        }
    });

});
