$(function () {

    /**
     * Manage javascript menu
     * Clone and inject menulevels into dom container
     */

    // Remove all menu levels below
    var removeSubLevelMenu = function (el) {
        $(el).parents('.navigation_default-subLevelContainerSmall').nextAll('.navigation_default-subLevelContainerSmall').remove();
        return false;
    }


    $('.navigation_default-firstLevel svg').on('click', function () {
        var navelement = $(this).parent('.navigation_default-firstLevelItem').next('.navigation_default-subLevelContainerSmall');
        $.when($('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').empty()).done(function () {
            var clonenav = navelement.clone().addClass('clone').removeClass('removed').addClass('inserted');
            $('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').append(clonenav);
            addSubLevelClicks();
        });
        return false;
    });

    var addSubLevelClicks = function () {
        // remove all preexisting bindings
        $('.navigation_default-subLevel svg').off();
        // add new binding
        $('.navigation_default-subLevelContainerFull svg').on('click', function () {
            // remove all preexisting subMenulevels below
            removeSubLevelMenu(this);
            // clone sublevel element and append to sublevel menu
            var subelement = $(this).parent('.navigation_default-subLevelItem').next('.navigation_default-subLevelContainerSmall').first();
            var clonesub = subelement.clone().addClass('clone').removeClass('removed').addClass('inserted');
            $('.navigation_default-subLevelContainerFull .navigation_default-subLevelContainer').append(clonesub);
            // create bindings again
            addSubLevelClicks();
            return false;
        });
    };


    /**
     * Manage BreadCrumbs for scrolled content:
     * Reduce header and add transparent gradient to text
     */
    $('.scrolled').on('scroll', function () {
        $('.overlay').removeClass('removed').addClass('inserted');
        $('.navigation_default').removeClass('inserted').addClass('removed');
        $('.navigation_breadCrumbs').removeClass('removed').addClass('inserted');

        // when scrolled up show default header
        if ($(this).scrollTop() == 0) {
            $('.overlay').removeClass('inserted').addClass('removed');
            $('.navigation_default').removeClass('removed').addClass('inserted');
            $('.navigation_breadCrumbs').removeClass('inserted').addClass('removed');
        }
    });

    /**
     * When menuButton is clicked, switch back to full menu
     */
    $('.navigation_menuButton').on('click', function () {
        $('.scrolled').animate({scrollTop: 0}, 'fast');
        $(".navigation_breadCrumbs").addClass("removed").removeClass("inserted");
    });


});
