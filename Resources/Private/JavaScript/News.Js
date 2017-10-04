$(document).ready(() => {

    /**
     * Implement handles for slider view of news
     */
    $('.news-overlay.-left').hide();
    if ($('.news-slide').length < 3) {
        $('.news-overlay.-right').hide();
    }

    $('.news-overlay.-right').on('click', () => {
        const relleft = $('.news-rel-slider').position().left;
        const relwidth = $('.news-rel-slider').width();

        // TODO: make dependent of media
        $('.news-rel-slider').animate({'left': '-=416px'});
        $('.news-overlay.-left').show();
        // show handles only, if there is still something to scroll
        if (relleft + relwidth <= 416) {
            $('.news-overlay.-right').hide();
        }
    });

    $('.news-overlay.-left').on('click', () => {
        const relleft = $('.news-rel-slider').position().left;
        $('.news-overlay.-right').show();
        // show handles only, if there is still something to scroll
        $('.news-rel-slider').animate({'left': '+=416px'});
        if (relleft >= -416) {
            $('.news-overlay.-left').hide();
        }
    });

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
     * make sure images in slider view are horizonally aligned
     */
    let sliderheaderheight = $('.news-slider-view .news-header').first().height();
    $('.news-slider-view .news-header').each((index, el) => {
        if (sliderheaderheight < $(el).height()) {
            sliderheaderheight = $(el).height();
        }
    });
   $('.news-slider-view .news-header').css('height', sliderheaderheight);

});
