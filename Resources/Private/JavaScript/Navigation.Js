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

    const deflateSubmenuContainer = (target) => {
        console.log('deflate');
        window.timeoutTarget = window.setTimeout(() => {
            $(target).parents('.navigation_default-submenuContainer-outer').css('min-height', '');
        }, 200);
    };

    const inflateForSubmenuContainer = (target) => {
        if ($(target).hasClass('-no') || $(target).hasClass('-cur')) {
            deflateSubmenuContainer(target);
        } else {
            const height = $(target).find('.navigation_default-submenu').height();
            $(target).parents('.navigation_default-submenuContainer-outer').css('min-height', height + 16);
        }
    };

    const clearAll = (target) => {
        $('.navigation_default-submenu').css({
            'visibility': '',
            'transition': 'visibility 0s linear 0.2s'
        });
        clearTimeout(target);
    };


    /**
     * Make sure the current submenuContainer has always the correct height and submenus disappear quicker than the menu
     */

    $('.navigation_default-menuItem.-actSub').on('mouseenter', function () {
        clearAll($(this));
        // Show complete path when hovering menuItem
        window.timeoutTarget = window.setTimeout(() => {
            inflateForSubmenuContainer($(this).find('.-actSub'));
            $(this).find('.-cur').parent('.navigation_default-submenu').css({
                'visibility': 'visible',
                'transition': 'visibility 0s linear 0.4s'
            });
        }, 20);
    });

    $('.navigation_default-menuItem:not(.-actSub)').on('mouseenter', () => {
        clearAll($(this));
        //  hide submenu quicker when no container present
        $('.navigation_default-submenu').css({
            'visibility': '',
            'transition': 'visibility 0s linear 0s'
        });
    });

    $('.navigation_default-menuItem').on('mouseleave', () => {
        clearAll(window.timeoutTarget);
    });
    $('.navigation_default-submenuContainer-inner > .navigation_default-submenu > .navigation_default-submenuItem').on('mouseenter', function () {
        clearAll(window.timeoutTarget);
        window.timeoutTarget = window.setTimeout(() => {
            inflateForSubmenuContainer($(this));
        }, 20);
    });
    $('.navigation_default-submenuContainer-inner > .navigation_default-submenu > .navigation_default-submenuItem').on('mouseleave', function () {
        clearAll(window.timeoutTarget);
        window.timeoutTarget = window.setTimeout(() => {
            deflateSubmenuContainer($(this));
        }, 20);
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
