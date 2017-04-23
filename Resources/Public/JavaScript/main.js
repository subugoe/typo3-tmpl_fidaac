$(function() {
    // create a botton as replacement for more nav items
    createMoreButton = function () {
        mbt = '<div class="moreButton span-3 right">' +
            '<i class="fa fa-bars" aria-hidden="true"></i>' +
            'Weitere' +
            '</div>';

        $(mbt).insertAfter('.-firstLevel');

        $('.moreButton').on('click', function () {
            var firstLevel = $('navigation .-firstLevel');
            $('.moreButton').addClass('removed');
            firstLevel.removeClass('span-9').addClass('span-12');
            firstLevel.children().removeClass('removed');
        });
    };

    // hide the last items of a list, as long as hight differs from aimed height
    removeListItems = function(_list, _height) {
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
    addButtonToNavigation = function () {
        var firstLevel = $('navigation .-firstLevel');

        if (firstLevel.height() > 40) {
            // add Button if necessary
            firstLevel.removeClass('span-12').addClass('span-9');
            if ($('.moreButton').length == 0) {
                console.log("Keiner da")
                createMoreButton();
                removeListItems(firstLevel, 40);
            } else {
                console.log("DA")
                $('.moreButton').removeClass('removed').addClass('inserted');
            }
        }
    };
    window.onresize = addButtonToNavigation();

    /**
     * For scrolled content:
     * Reduce header and add transparent gradient to text
     */
    $('main').on('scroll', function() {
        $('.overlay').removeClass('removed').addClass('inserted');
        $('navigation .default').removeClass('inserted').addClass('removed');
        $('navigation .breadCrumbs').removeClass('removed').addClass('inserted');

        // when scrolled up show default header
        if ( $(this).scrollTop() == 0) {
            $('.overlay').removeClass('inserted').addClass('removed');
            $('navigation .default').removeClass('removed').addClass('inserted');
            $('navigation .breadCrumbs').removeClass('inserted').addClass('removed');
        }
    });

    /**
     * Wen menuButton is clicked, switch back to full menu
     */
    $('.menuButton').on('click',function() {
        $(".default").addClass("inserted").removeClass("removed");
        $(".breadCrumbs").addClass("removed").removeClass("inserted");
    })
});
