$(function() {

    /**
     * change sizes of elements for different media sizes
     * Workaround until grid-system compatible with most browsers
     */
    changeHeader = function() {
        if (window.innerWidth > 960) {
            ['home','search','language'].forEach(function(el) {
                $('.header_'+el+'.-text').removeClass('removed');
            });
            return;
        }
        if (window.innerWidth < 960 && window.innerWidth > 768) {
            ['home','search','language'].forEach(function(el) {
                $('.header_'+el+'.-text').addClass('removed');
            });
            return;
        }
        if (window.innerWidth <= 768) {
        }
    }

    changeNavigation = function() {
    };

    changeSitemap = function() {
        if (window.innerWidth > 960) {
            $('.sitemap_firstLevel').attr('class',$('.sitemap_firstLevel').attr('class').replace(/span-[0-9]+/,'span-2'));
            $('.sitemap_secondLevel').attr('class',$('.sitemap_secondLevel').attr('class').replace(/span-[0-9]+/,'span-10'));
            $('.sitemap_firstLevel').removeClass('left').addClass('right');
            return;
        }
        if (window.innerWidth <= 960 && window.innerWidth > 768) {
            $('.sitemap_firstLevel').attr('class',$('.sitemap_firstLevel').attr('class').replace(/span-[0-9]+/,'span-3'));
            $('.sitemap_secondLevel').attr('class',$('.sitemap_secondLevel').attr('class').replace(/span-[0-9]+/,'span-9'));
            $('.sitemap_firstLevel').removeClass('left').addClass('right');
            return;
        }
        if (window.innerWidth <= 768) {
            $('.sitemap_firstLevel').attr('class',$('.sitemap_firstLevel').attr('class').replace(/span-[0-9]+/,'span-6'));
            $('.sitemap_secondLevel').attr('class',$('.sitemap_secondLevel').attr('class').replace(/span-[0-9]+/,'span-6'));
            $('.sitemap_firstLevel').removeClass('right').addClass('left');
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
