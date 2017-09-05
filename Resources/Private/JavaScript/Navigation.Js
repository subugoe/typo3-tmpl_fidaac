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

    const setMenuContainerHeight = () => {
        const outermenu = $('.navigation_default-submenuContainer-outer');
        outermenu.css('height', '0px');
        // firefox positions elements with "position: fixed" relativ to body
        const firetop = $('.navigation_default').position().top + $('.navigation_default').height();
        $('.navigation_default-submenuContainer-outer').css('top', firetop);
        $('.navigation_default-submenu.absolute').each((index, element) => {
            if ($(element).css('display') !== 'none') {
                if ($(outermenu).height() < $(element).height()) {
                    outermenu.css('height', $(element).css('height'));
                }
            }
        });
    };

    const cleanSubmenuContainer = (target) => {
        $.when($(target).siblings().find('.navigation_default-submenu').fadeOut('fast')).done(() => {
            setMenuContainerHeight();
            return true;
        });
    };

    const hoverSubmenuItem = (target) => {
        $(target).addClass('hover');
        $(target).siblings().removeClass('hover');
    };

    // show submenus after removing old ones
    const showSubmenu = (target) => {
        $.when(cleanSubmenuContainer(target)).done(() => {
            const submenu = $(target).find('.navigation_default-submenu').first();
            const parent = $(submenu).parents('.navigation_default-submenu');
            let top = $('.navigation_default-menu').height();
            let left = 0;
            if (parent.length > 0) {
                left = $(parent).position().left + $(parent).width();
                top = 0;
            }
            submenu.addClass('absolute').css({
                'left': `${left}px`,
                'top': `${top}px`
            }).fadeIn('slow');
            setMenuContainerHeight();

            $('.navigation_default-submenuContainer-outer').fadeIn('fast');

            $(submenu).children('.navigation_default-submenuItem').mouseenter((event) => {
                const subtarget = $(event.currentTarget);
                showSubmenu(subtarget);
                hoverSubmenuItem(subtarget);
            });
        });
    };

    const exposePath = (target) => {
        const closest = $(target).find('.-actSub');
        if ($(closest).length > 0) {
            showSubmenu($(closest));
            exposePath($(closest));
        }
    };

    const hoverMenuItem = (target) => {
        // set colors explicitly, as it is overriding color of loaded page
        $(target).addClass('hover').css('background-color', '#e5e5e5');
        $(target).siblings().removeClass('hover').css('background-color', '#f2f2f2');
        showSubmenu($(target));
        setTimeout(() => {
            exposePath(target);
            setMenuContainerHeight();
        }, 'slow');
    };

    const hideSubmenu = () => {
        $('.navigation_default-submenu.absolute').fadeOut('slow', () => {
            setMenuContainerHeight();
        });
    };

    $('.navigation_default-menuItem').mouseenter((event) => {
        const target = event.currentTarget;
        hoverMenuItem(target);
    });

    $('.navigation_default').mouseleave(() => {
        setTimeout(() => {
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
        $('.scrolled').animate({scrollTop: 0}, 'fast');
        $('.navigation_breadCrumbs').hide();
    });

});
