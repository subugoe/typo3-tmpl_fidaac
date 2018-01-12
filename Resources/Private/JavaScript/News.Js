$(document).ready(() => {


    /**
     * make sure, text in stairs view of news is cut according to image height
     */
    $('.news-stairs-view .article').each((index, el) => {
        const teaserheight = $(el).find('.teaser-text').height();
        const imgheight = $(el).find('.img-wrap').height();
        const headerheight = $(el).find('.news-header').height();
        const buttonheight = $(el).find('.infos-wrap').children('a').last().height();
        const theight = imgheight - buttonheight - headerheight;
        if (teaserheight + buttonheight + headerheight >= imgheight) {
            $(el).find('.teaser-text').css('height', theight - 2);
        }
    });

    /**
     * Implement handles for slider view of news
     */
    $('.news-overlay.-left').hide();
    if ($('.news-slide').length < 3) {
        $('.news-overlay.-right').hide();
    }

    $('.news-overlay.-right').on('click', () => {

        $('.news-overlay.-left').show();
        $.when($('.news-rel-slider').animate({'left': '-=416px'}))
            .done(() => {
                // show handles only, if there is still something to scroll
                if ($('.news-slider-view').prop('scrollWidth') <= 960) {
                    $('.news-overlay.-right').hide();
                }
            });
    });

    $('.news-overlay.-left').on('click', () => {
        $('.news-overlay.-right').show();
        // show handles only, if there is still something to scroll
        $.when($('.news-rel-slider').animate({'left': '+=416px'}))
            .done(() => {
                const relleft = $('.news-rel-slider').position().left;
                if (relleft === 0) {
                    $('.news-overlay.-left').hide();
                }
            });
    });

    /**
     * make sure images in slider view are horizonally aligned
     */
    let sliderheaderheight = $('.news-slider-view .news-header').first().height();
    $('.news-slider-view .news-header').each((index, el) => {
        if (sliderheaderheight < $(el).height()) {
            sliderheaderheight = $(el).height();
        }
    });
   $('.news-slider-view .news-header').css('height', sliderheaderheight);

    /**
     * Make sure, pagination resembles design
     */
    $('.news .f3-widget-paginator .previous a').html('<svg><use xlink:href="#icon-caret-left"/></svg>');
    $('.news .f3-widget-paginator .next a').html('<svg><use xlink:href="#icon-caret-right"/></svg>');
});
