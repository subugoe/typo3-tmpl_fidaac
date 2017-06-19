$(document).ready(function(){

    // create a botton as replacement for the menu
    var createMenuButton = function () {
        mbt = '<div class="menuButton">' +
            '<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-bars"/></svg>' +
            'Menu' +
            '</div>';

        $('.navigation').append('<div class="menuButton">' +
            '<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#icon-bars"/></svg>' +
            'Menu' +
            '</div>');

        $('.moreButton').on('click', function () {
            console.log('clicked')
        });
    };

    /**
     * change sizes of elements for different media sizes
     * Workaround until grid-system compatible with most browsers
     * Text labels hide when screen smaller than 768 and reappear at hover
     */
    changeHeader = function() {
        if (window.innerWidth > 960) {
            ['home','search','language'].forEach(function(el) {
                $('.header_' + el + '-text').removeClass('removed');
                $('.header_' + el).unbind('mouseenter');
                $('.header_' + el).unbind('mouseleave');
            });
            return;
        }
        if (window.innerWidth <= 960 && window.innerWidth > 768) {
            ['home', 'search', 'language'].forEach(function (el) {
                $('.header_' + el).removeClass('removed');
                $('.header_' + el + '-text').addClass('removed');
                $('.header_' + el).mouseenter(function () {
                    $('.header_' + el + '-text').removeClass('removed');
                });
                $('.header_' + el).mouseleave(function () {
                    $('.header_' + el + '-text').addClass('removed');
                });
            });
            return;
        }
        if (window.innerWidth <= 768 && window.innerWidth > 304) {
            ['home', 'search', 'language'].forEach(function (el) {
                $('.header_' + el).unbind('mouseenter');
                $('.header_' + el).unbind('mouseleave');
                $('.header_' + el).addClass('removed');
            });
            return;
        }
        if (window.innerWidth <= 304) {
            ['home', 'search', 'language'].forEach(function (el) {
                $('.header_' + el).unbind('mouseenter');
                $('.header_' + el).unbind('mouseleave');
                $('.header_' + el).addClass('removed');
            });
            $('.navigation').addClass('removed');
            //changeHeader();
            return;
        }
    }

});