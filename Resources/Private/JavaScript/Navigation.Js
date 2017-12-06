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

    let timeoutHeight = '';

    const deflateSubmenuContainer = (target) => {
        $(target).parents('.navigation_default-submenuContainer-outer').css('min-height', '');
    };

    const inflateSubmenuContainer = (target) => {
        if ($(target).hasClass('-no')) {
            deflateSubmenuContainer(window.timeoutEvent);
        } else {
            const height = $(target).find('.navigation_default-submenu').height();
            $(target).parents('.navigation_default-submenuContainer-outer').css('min-height', height + 16);
        }
    };

    const clearAll = () => {
        $('.navigation_default-submenu').css({
            'visibility': '',
            'transition': 'visibility 0s linear 0s'
        });
        clearTimeout(timeoutHeight);
    };

    /**
     * Make sure the current submenuContainer has always the correct height
     */
    $('.navigation_default-submenuItem, .navigation_default-menuItem').on('mouseenter', () => {
        clearAll();
    });
    $('.navigation_default-submenuItem, .navigation_default-menuItem').on('mouseleave', () => {
        clearAll();
    });
    $('.navigation_default-submenuContainer-inner > .navigation_default-submenu > .navigation_default-submenuItem').on('mouseenter', function () {
        window.timeoutEvent = $(this);
        timeoutHeight = window.setTimeout(() => {
            inflateSubmenuContainer(window.timeoutEvent);
        }, 20);
    });
    $('.navigation_default-submenuContainer-inner > .navigation_default-submenu > .navigation_default-submenuItem').on('mouseleave', function () {
        window.timeoutEvent = $(this);
        timeoutHeight = window.setTimeout(() => {
            deflateSubmenuContainer(window.timeoutEvent);
        }, 400);
    });

    /**
     * Show complete path when hovering menuItem
     */
    $('.navigation_default-menuItem.-actSub').on('mouseenter', function () {
        const targets = $(this).find('.-cur, .-curIfSub');
        targets.parents('.navigation_default-submenu').css({
            'visibility': 'visible',
            'transition': 'visibility 0s linear 0.4s'
        });
        window.timeoutEvent = $(this).find('.-actSub');
        timeoutHeight = window.setTimeout(() => {
            inflateSubmenuContainer(window.timeoutEvent);
        }, 20);
    });

    $('.navigation_default-menuItem a, .navigation_default-menuItem').on('mouseleave', function () {
        $(this).parent().find('.navigation_default-submenu').css({
            'visibility': '',
            'transition': 'visibility 0s linear 0s'
        });
        window.timeoutEvent = $(event.currentTarget);
        timeoutHeight = window.setTimeout(() => {
            deflateSubmenuContainer(window.timeoutEvent);
        }, 400);
    });

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

});
