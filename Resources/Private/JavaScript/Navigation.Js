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
    $('.navigation_default-menuItem').mouseenter((event) => {
        $(event.currentTarget)
            .find('.navigation_default-submenuItem')
            .mouseenter((eve) => {
            $(eve.currentTarget)
                .siblings()
                .find('.navigation_default-submenu')
                .css('visibility', 'hidden');

                $(eve.currentTarget)
                    .find('.navigation_default-submenu')
                    .css('visibility', 'visible');
            });
        $(event.currentTarget)
            .find('.-cur')
            .parent('.navigation_default-submenuItem .navigation_default-submenu')
            .css('visibility', 'visible');
    }).mouseleave((event) => {
        $(event.currentTarget)
            .find('.navigation_default-submenuItem .navigation_default-submenu')
            .css('visibility', 'hidden');
    });

    /**
     * Stuff related to scrolling and page up button
     */
    $(window).on('scroll', (event) => {

        if ($(event.currentTarget).scrollTop() === 0) {
            $('.toTop_inner').css('visibility', 'hidden');
        } else if ($('.toTop_inner').css('visibility') === 'hidden') {
            $('.navigation_default-submenuContainer-outer').css('visibility', 'hidden').css('transition', 'all 0s');
            $('.toTop_inner').css('visibility', 'visible');
        }
    });

    $('.toTop_inner').on('click', () => {
        $('html').animate({scrollTop: 0}, 'fast');
    });

});
