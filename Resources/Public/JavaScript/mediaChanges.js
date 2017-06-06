$(function() {

    /**
     * change sizes of elements for different media sizes
     * Workaround until grid-system compatible with most browsers
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
        if (window.innerWidth <= 768) {
            ['home', 'search', 'language'].forEach(function (el) {
                $('.header_' + el).unbind('mouseenter');
                $('.header_' + el).unbind('mouseleave');
            });
            return;
        }
    }

    changeNavigation = function() {
    };

    changeSitemap = function() {
        if (window.innerWidth > 960) {
            $('.sitemap .-firstLevel').attr('class',$('.sitemap .-firstLevel').attr('class').replace(/span-[0-9]+/,'span-2'));
            $('.sitemap .-secondLevel').attr('class',$('.sitemap .-secondLevel').attr('class').replace(/span-[0-9]+/,'span-10'));
            $('.sitemap .-firstLevel').removeClass('left').addClass('right');
            return;
        }
        if (window.innerWidth <= 960 && window.innerWidth > 768) {
            $('.sitemap .-firstLevel').attr('class',$('.sitemap .-firstLevel').attr('class').replace(/span-[0-9]+/,'span-3'));
            $('.sitemap .-secondLevel').attr('class',$('.sitemap .-secondLevel').attr('class').replace(/span-[0-9]+/,'span-9'));
            $('.sitemap .-firstLevel').removeClass('left').addClass('right');
            return;
        }
        if (window.innerWidth <= 768) {
            $('.sitemap .-firstLevel').attr('class',$('.sitemap .-firstLevel').attr('class').replace(/span-[0-9]+/,'span-6'));
            $('.sitemap .-secondLevel').attr('class',$('.sitemap .-secondLevel').attr('class').replace(/span-[0-9]+/,'span-6'));
            $('.sitemap .-firstLevel').removeClass('right').addClass('left');
        }
    };

    var changeSizes = function() {
        changeHeader();
        changeNavigation();
        changeSitemap();
    }
    changeSizes();

    $(window).resize(function() {
        changeSizes();
    });

});
