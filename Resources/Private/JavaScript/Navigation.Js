/**
 * Navigation.js
 *
 * Change the menu, so that clicking on a link leads to the page
 * while clicking on an arrow opens and closes the submenu
 */

$(document).ready(() => {
    /**
     * Clone and inject menulevels into dom container
     * First, Remove all menu levels below
     */
    const removeSubLevelMenu = (el) => {
        $(el).parents('.navigation_default-subLevelContainerSmall').nextAll('.navigation_default-subLevelContainerSmall').remove();
        return false;
    };

    const addSubLevelClicks = () => {
        // remove all preexisting bindings
        $('.navigation_default-subLevel svg').off();

        // add new binding
        $('.navigation_default-subLevelContainerFull svg').on('click', (event) => {
            // remove all preexisting subMenulevels below and all bold font
            removeSubLevelMenu($(event.currentTarget));

            // clone sublevel element and append to sublevel menu
            const parelement = $(event.currentTarget).parent('.navigation_default-subLevelItem');
            const subelement = parelement.next('.navigation_default-subLevelContainerSmall').first();
            const cloneelement = subelement.clone().addClass('clone').removeClass('removed').addClass('inserted');
            $('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').append(cloneelement);
            // create bindings again
            addSubLevelClicks();

            // switch font weight
            parelement.siblings('.navigation_default-subLevelItem').removeClass('active').addClass('inactive');
            parelement.removeClass('inactive').addClass('active');
            return false;
        });
    };

    $('.navigation_default-firstLevel svg').on('click', (event) => {


        if ($(event.currentTarget).html().match('right')) {
            // show sublevels after removing old ones
            $.when($('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').empty()).done(() => {
                const parelement = $(event.currentTarget).parent('.navigation_default-firstLevelItem');
                const navelement = parelement.next('.navigation_default-subLevelContainerSmall');
                const cloneelement = navelement.clone().addClass('clone').removeClass('removed').addClass('inserted');
                $('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').append(cloneelement);
                addSubLevelClicks();

                // switch svg arrows
                $('.navigation_default-firstLevelItem svg').html('<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-caret-right"/></svg>');
                $(event.currentTarget).html('<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-caret-down"/></svg>');
                // switch colors
                $('.navigation_default-firstLevelItem').removeClass('active').addClass('inactive');
                parelement.removeClass('inactive').addClass('active');
            });

        } else {
            // hide sublevels
            $.when($('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').empty()).done(() => {
                $(event.currentTarget).html('<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-caret-right"/></svg>');
                // switch colors back
                $('.navigation_default-firstLevelItem').removeClass('active').removeClass('inactive');
            });
        }

        return false;
    });


    /**
     * Manage BreadCrumbs for scrolled content:
     * Reduce header and add transparent gradient to text
     */
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
