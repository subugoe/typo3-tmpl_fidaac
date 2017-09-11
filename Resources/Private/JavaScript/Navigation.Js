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

    const cleanupMenuItem = (target) => {
        $(target).siblings().find('.navigation_default-submenuContainer-outer').hide();
        $(target).siblings().find('.navigation_default-submenu').addClass('visible-hidden');
        $(target).siblings().find('.clone').remove();
        $(target).siblings().removeClass('hover').removeClass('cloned');
        const submenu = $(target).find('.navigation_default-submenu');
        $(submenu).find('.navigation_default-submenu').removeClass('visible-shown').addClass('visible-hidden');
        $(target).removeClass('cloned');
    };

    const cleanupSubmenuItem = (target) => {
        $(target).siblings().find('.navigation_default-submenu').addClass('visible-hidden');
        $(target).siblings().removeClass('hover').removeClass('cloned');

        const parent = $(target).parent();
        const next = parent.nextAll('.clone');
        next.remove();
        $(target).removeClass('cloned');
    };

    /**
     * One function to show menu, so that it can be invoked recursivly
     * Subsubmenus are cloned, so that they are independent of the DOM, and can be positioned absolutely
     */
    const showMenu = (target) => {
        const submenu = $(target).find('.navigation_default-submenu').first();
        let container = '';

        if ($(target).hasClass('navigation_default-submenuItem')) {
            // subsubmenu

            container = $(target).parents('.navigation_default-submenuContainer-outer').first();
            const clonemenu = submenu.clone().addClass('clone');
            if (clonemenu.length > 0) {
                $(target).addClass('cloned');

                $(container).find('.navigation_default-submenuContainer-inner').append(clonemenu);
                $(clonemenu).removeClass('visible-hidden').addClass('visible-shown');

                // add bindings to newly created elements
                $(clonemenu).find('.navigation_default-submenuItem').hoverIntent({
                    over: (event) => {
                        const subTarget = event.currentTarget;
                        cleanupSubmenuItem(subTarget);
                        $('.cloned').addClass('hover');
                        showMenu(subTarget);
                    },
                    out: () => {
                        $('.cloned').removeClass('hover');
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
        $(container).css('top', $('.navigation_default').position().top + $('.navigation_default').height());
    };

    const exposePath = (target) => {
        const subTarget = $(target).find('.-actSub, .-cur, .-act, .-curSub').first();
        if ($(subTarget).length > 0) {
            showMenu($(subTarget));
            exposePath($(subTarget));
        }
    };

    $('.navigation_default-menuItem').hoverIntent({
        over: (event) => {
            const target = event.currentTarget;
            cleanupMenuItem(target);
            if ($(target).find('.-curSub, .-cur, .-actSub, .-act').length > 0) {
                showMenu(target);
                exposePath(target);
            } else {
                showMenu(target);
            }
        },
        out: () => {
            // nothing to do
        },
        timeout: 250
    });

    $('.navigation_default-submenuItem').hoverIntent({
        over: (event) => {
            const target = event.currentTarget;
            cleanupSubmenuItem(target);
            $(target).addClass('hover');
            showMenu(target);
        },
        out: (event) => {
            const target = event.currentTarget;
            $(target).removeClass('hover');
        },
        timeout: 250
    });

    /**
     * Remove whole menu when mouse is outside
     */
    $('.navigation_default').hoverIntent({
        over: () => {
            // nothing to do
        },
        out: () => {
            $('.navigation_default-submenuContainer-outer').hide();
            $('.navigation_default-submenuItems').removeClass('hover');
            $('.clone').remove();
            $('.cloned').removeClass('cloned');
        },
        timeout: 250
    });


    /**
     * everything related to breadcrumbs for scrolled content
     */
    // Reduce header and add transparent gradient to text
    $('.scrolled').on('scroll', (event) => {

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
        $('.scrolled').animate({scrollTop: 0}, 'fast');
        $('.navigation_breadCrumbs').hide();
    });

});
