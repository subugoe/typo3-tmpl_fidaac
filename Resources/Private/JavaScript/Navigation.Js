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

    const cleanSubmenuContainer = (target) => {
        if ($(target).parents().hasClass('navigation_default-submenu')) {
            // remove maybe leftover classes
            $(target).parent('.navigation_default-submenu').nextAll('.navigation_default-submenu').remove();
        } else {
            $('.navigation_default-submenuContainer-inner').empty();
        }
        return true;
    };

    const hoverSubmenuItem = (el) => {
        $(el).addClass('hover');
        $(el).siblings().removeClass('hover');
        $(el).parent('.navigation_default-submenu').prevAll('.navigation_default-submenu').each((index, element) => {
            $(element).find('.-actSub').first().addClass('hover');
        });
    };

    // show submenus after removing old ones
    const showSubmenu = (target) => {
        $.when(cleanSubmenuContainer(target)).done(() => {
            const submenu = $(target).find('.navigation_default-submenu').first();
            const clonemenu = submenu.clone();
            setTimeout(() => {
                $('.navigation_default-submenuContainer-inner').append(clonemenu);
                $(clonemenu).animate('height', 'fast').fadeIn('slow');
            }, 'slow');

            $(clonemenu).children('.navigation_default-submenuItem').mouseenter((event) => {
                const subtarget = $(event.currentTarget);
                showSubmenu(subtarget);
                hoverSubmenuItem(subtarget);
            });
        });
    };

    const exposePath = (el) => {
        const closest = $(el).find('.-actSub');
        if ($(closest).length > 0) {
            showSubmenu($(closest));
            exposePath($(closest));
        }
    };

    const hoverMenuItem = (el) => {
        // set colors explicitly, as it is overriding color of loaded page
        $(el).addClass('hover').css('background-color', '#e5e5e5');
        $(el).siblings().removeClass('hover').css('background-color', '#f2f2f2');
        showSubmenu($(el));
        setTimeout(() => {
            exposePath(el);
        }, 'slow');
    };

    const cleanupMenuItems = () => {
        $('.navigation_default-menuItem').removeClass('hover').css('background-color', '#f2f2f2');
        $('.navigation_default-menuItem.-actSub, .navigation_default-menuItem.-cur, .navigation_default-menuItem.-curIfSub').css('background-color', '#e5e5e5');
    };

    const hideSubmenu = () => {
        cleanSubmenuContainer('.navigation_default-menuItem');
    };

    $('.navigation_default-menuItem').mouseenter((event) => {
        const target = event.currentTarget;
        hoverMenuItem(target);
    });

    $('.navigation_default').mouseleave(() => {
        setTimeout(() => {
            cleanupMenuItems();
            hideSubmenu();
        }, 'slow');
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
        $('.scrolled').animate({ scrollTop: 0 }, 'fast');
        $('.navigation_breadCrumbs').hide();
    });

});