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
            $('.moreButton').css('display', 'none');
            firstLevel.removeClass('span-9').addClass('span-12');
            firstLevel.children().removeClass('hidden');
        });
    };

    // hide the last items of a list, as long as hight differs from aimed height
    removeListItems = function(_list, _height) {
        if ($(_list).height() > _height) {
            $(_list).children(":not(.hidden)").last().addClass('hidden');
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
                createMoreButton();
                removeListItems(firstLevel, 40);
            } else {
                $('.moreButton').css('display', 'block');
            }
        }
    };
    window.onresize = addButtonToNavigation();
});
