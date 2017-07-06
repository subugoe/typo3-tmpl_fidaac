/**
 * Header.js
 *
 * functions to change the header for different screen sizes
 */

$(document).ready(() => {
    // Text labels hide when screen smaller than 768 and reappear at hover
  const changeHeader = function changeHeader() {
    if (window.innerWidth > 960) {
      ['home', 'search', 'language'].forEach((el) => {
        $(`.header_${el}-text`).removeClass('removed');
        $(`.header_${el}`).unbind('mouseenter');
        $(`.header_${el}`).unbind('mouseleave');
      });
      return;
    }
    if (window.innerWidth <= 960 && window.innerWidth > 768) {
      ['home', 'search', 'language'].forEach((el) => {
        $(`.header_${el}`).removeClass('removed');
        $(`.header_${el}-text`).addClass('removed');
        $(`.header_${el}`).mouseenter(() => {
          $(`.header_${el}-text`).removeClass('removed');
        });
        $(`.header_${el}`).mouseleave(() => {
          $(`.header_${el}-text`).addClass('removed');
        });
      });
      return;
    }
    if (window.innerWidth <= 768 && window.innerWidth > 304) {
      ['home', 'search', 'language'].forEach((el) => {
        $(`.header_${el}`).unbind('mouseenter');
        $(`.header_${el}`).unbind('mouseleave');
        $(`.header_${el}`).addClass('removed');
      });
      return;
    }
    if (window.innerWidth <= 304) {
      ['home', 'search', 'language'].forEach((el) => {
        $(`.header_${el}`).unbind('mouseenter');
        $(`.header_${el}`).unbind('mouseleave');
        $(`.header_${el}`).addClass('removed');
      });
      $('.navigation').addClass('removed');
    }
  };

    // check every time the screen size is changed
  $(window).resize(() => {
    changeHeader();
  });

    // check on loading
  changeHeader();
});

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
            // remove all preexisting subMenulevels below
            removeSubLevelMenu($(event.currentTarget));
            // clone sublevel element and append to sublevel menu
            const subelement = $(event.currentTarget).parent('.navigation_default-subLevelItem').next('.navigation_default-subLevelContainerSmall').first();
            const clonesub = subelement.clone().addClass('clone').removeClass('removed').addClass('inserted');
            $('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').append(clonesub);
            // create bindings again
            addSubLevelClicks();
            return false;
        });
    };

    $('.navigation_default-firstLevel svg').on('click', (event) => {
        const navelement = $(event.currentTarget).parent('.navigation_default-firstLevelItem').next('.navigation_default-subLevelContainerSmall');
        $.when($('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').empty()).done(() => {
            const clonenav = navelement.clone().addClass('clone').removeClass('removed').addClass('inserted');
            $('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').append(clonenav);
            addSubLevelClicks();
        });
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
    $('.navigation_menuButton').on('click', (event) => {
        $('.scrolled').animate({scrollTop: 0}, 'fast');
        $('.navigation_breadCrumbs').addClass('removed').removeClass('inserted');
    });


});

/**
 * Main.js
 *
 * Show the website after all javascript is done
 */

$(document).ready(() => {

    /**
     * The body is not displayed by default, only after javascript is done it is finally displayed
     * This removes jumping elements
     */
    $('body').show();
});
