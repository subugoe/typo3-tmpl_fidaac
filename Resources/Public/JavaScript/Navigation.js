$(function() {

// create a botton as replacement for more nav items
    var createMoreButton = function () {
        mbt = '<div class="navigation_moreButton span-3 center">' +
            '<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-bars"/></svg>' +
            'More' +
            '</div>';

        $(mbt).insertAfter('.navigation .-firstLevel');

        $('.navigation_moreButton').on('click', function () {
            var firstLevel = $('navigation_firstLevel');
            $('.navigation_moreButton').addClass('removed');
            firstLevel.children().removeClass('removed');
        });
    };

// hide the last items of a list, as long as hight differs from aimed height
    var removeListItems = function (_list, _height) {
        if ($(_list).height() > _height) {
            $(_list).children(":not(.removed)").last().addClass('removed');
            removeListItems(_list, _height);
        }
    };

    /**
     * Add button "more" to navigations first level if to many items
     *
     * If to many items are present,
     * + add button and
     * + one by one add class "hidden" until length navigation < container length
     */
    var addButtonToNavigation = function () {
        var firstLevel = $('.navigation_firstLevel');
        if ($('.navigation_firstLevel').height() > 40) {
            // add Button if necessary
            if ($('.navigation_moreButton').length == 0) {
                createMoreButton();
            } else {
                $('.navigation_moreButton').removeClass('removed').addClass('inserted');
            }
            removeListItems(firstLevel, 40);
        }
    };

    $(window).resize(function () {
        addButtonToNavigation();
    });
    addButtonToNavigation();


    /**
     * For scrolled content:
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
        $('.scrolled').animate({scrollTop:0}, 'fast');
        $(".navigation_breadCrumbs").addClass("removed").removeClass("inserted");
    });

})
