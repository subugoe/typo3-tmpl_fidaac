/**
 * Navigation.js
 *
 * Change the menu, so that hovering over or clicking on a link leads to the page
 * which opens and closes the submenu
 */

$(document).ready(() => {

    /**
     * everything related to menu
     */
    // clone and show sub levels of element
    const showSubLevels = (el) => {
        const parelement = el;
        const subelement = parelement.next('.navigation_default-subLevelContainerSmall').first();
        const cloneelement = subelement.clone().addClass('clone').show();
        $('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').append(cloneelement);
    };

    // empty dom element and switch back classes of sublevels
    const hideMenu = () => {
        $.when($('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').empty()).done(() => {
            // switch back colors and arrows
            $('.navigation_default-firstLevelItem svg').html('<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-caret-right"/></svg>');
            $('.navigation_default-firstLevelItem').removeClass('active').removeClass('inactive');
        });
    };

    // remove existing subsublevels in dom container
    const removeSubLevelMenu = (el) => {
        $(el).parents('.navigation_default-subLevelContainerSmall').nextAll('.navigation_default-subLevelContainerSmall').remove();
        return false;
    };

    // if sublevel is shown, the svgs have to be clickable
    const addSubLevelClicks = () => {
        // remove all preexisting bindings
        $('.navigation_default-subLevel svg').off();

        // add new binding
        $('.navigation_default-subLevelContainerFull .navigation_default-subLevelItem').mouseenter((event) => {
            const el = $(event.currentTarget);
            if ($(el).children('svg').length !== 0) {
                // clone sublevel element and append to sublevel menu
                const parelement = $(event.currentTarget);
                // remove all preexisting subMenulevels below
                removeSubLevelMenu(el);
                // show all levels of active pate
                showSubLevels(el);
                // create bindings again
                addSubLevelClicks();

                // switch font weight
                parelement.siblings('.navigation_default-subLevelItem').removeClass('active').addClass('inactive');
                parelement.removeClass('inactive').addClass('active');
            }
        });
    };

    // if the acutal site is in a lower level, the complete path should be visible
    const showActiveLevels = (el) => {
        const actSubElement = el.children('.navigation_default-subLevel').children('.-actSub');
        if (actSubElement.length > 0) {
            // show all levels of active pate
            showSubLevels(actSubElement.children('svg'));
        }
    };

    // show sublevels after removing old ones
    const showSubmenus = (event) => {
        $.when($('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').empty()).done(() => {
            const parelement = $(event.currentTarget);
            const navelement = parelement.next('.navigation_default-subLevelContainerSmall');
            const cloneelement = navelement.clone().addClass('clone').show();
            $('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').append(cloneelement);
            addSubLevelClicks();
            showActiveLevels(cloneelement);

            // switch svg arrows
            $('.navigation_default-firstLevelItem svg').html('<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-caret-right"/></svg>');
            $(event.currentTarget).children('svg').html('<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-caret-down"/></svg>');
            // switch colors
            $('.navigation_default-firstLevelItem').removeClass('active').addClass('inactive');
            parelement.removeClass('inactive').addClass('active');
        });

        $('.scrolled').on('click', () => {
            hideMenu();
        });

        return false;
    };

    // show submenus when hovered on first level item
    $('.navigation_default-firstLevelItem').mouseenter((event) => {
        showSubmenus(event);
    });

    $('.navigation_default-subLevelContainerFull').mouseleave(() => {
        hideMenu();
    });

    /**
     * first, hide all sublevels
     */
    $('.navigation_default-subLevelContainerSmall').hide();


    /**
     * everything related to breadcrumbs for scrolled content
     */
    // Reduce header and add transparent gradient to text
    $('.scrolled').on('scroll', (event) => {
        $('.overlay').removeClass('removed').addClass('inserted');
        $('.navigation_default').removeClass('inserted').addClass('removed');
        $('.navigation_breadCrumbs').removeClass('removed').addClass('inserted');

        // when scrolled up show default header
        if ($(event.currentTarget).scrollTop() === 0) {
            $('.overlay').removeClass('inserted').addClass('removed');
            $('.navigation_default').removeClass('removed').addClass('inserted');
            $('.navigation_breadCrumbs').removeClass('inserted').addClass('removed');
        }
    });

    /**
     * When menuButton is clicked, switch back to full menu
     */
    $('.navigation_menuButton').on('click', () => {
        $('.scrolled').animate({scrollTop: 0}, 'fast');
        $('.navigation_breadCrumbs').addClass('removed').removeClass('inserted');
    });


});
