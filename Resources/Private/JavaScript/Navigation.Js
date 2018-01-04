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

    const makePathBold = function() {
        const actUrl = window.location.pathname;
        console.log(actUrl);
        $(`a[href$="${actUrl}"]`).parents('.navigation_default-submenuItem').first().removeClass('-no').addClass('-cur');

    };

    const showPath = function () {
        const url = createURLForAjax($('.navigation_default-submenuItem.-actSub').find('a').first().attr('href'));
        $('.navigation_default-submenuItem.-actSub').parents('.navigation_default-submenuContainer-inner').find('.navigation_default-submenu').first().siblings().remove();
        const menu = $('.navigation_default-submenuItem.-actSub').parents('.navigation_default-submenuContainer-inner').append('<ul class="navigation_default-submenu"></ul>');
        $(menu).find('.navigation_default-submenu').last().load(url, (response, status) => {
            if (status === 'error') {
                console.log('Error loading submenu');
            } else if (status === 'success') {
                makePathBold();
            }
        });
    };
    showPath();

    $('.navigation_default-submenuItem.-sub, .navigation_default-submenuItem.-curIfSub, .navigation_default-submenuItem.-actSub').on('mouseenter', function () {
        const url = createURLForAjax($(this).find('a').first().attr('href'));
        // clean up first, then refill
        $(this).parents('.navigation_default-submenuContainer-inner').find('.navigation_default-submenu').first().siblings().remove();
        const menu = $(this).parents('.navigation_default-submenuContainer-inner').append('<ul class="navigation_default-submenu"></ul>');
        $(menu).find('.navigation_default-submenu').last().load(url, (response, status) => {
            if (status === 'error') {
                console.log('Error loading submenu');
            }
            makePathBold();
        });
    });

    $('.navigation_default-submenuItem.-no').on('mouseenter', function () {
        $(this).parents('.navigation_default-submenuContainer-inner').find('.navigation_default-submenu').first().siblings().remove();
    });
});
