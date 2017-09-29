$(document).ready(() => {

    $('.news-overlay.-left').hide();

    $('.news-overlay.-right').on('click', () => {
        const relleft = $('.news-rel-slider').position().left;
        const relwidth = $('.news-rel-slider').width();
        const fixleft = $('.news-slider-view').position().left;
        const fixwidth = $('.news-slider-view').width();
        console.log(relleft + relwidth);
        console.log(fixleft + fixwidth);
        $('.news-rel-slider').animate({'left': '-=416px'});
        $('.news-overlay.-left').show();
        if (relleft + relwidth < 400) {
            $('.news-overlay.-right').hide();
        }
    });

    $('.news-overlay.-left').on('click', () => {
        const relleft = $('.news-rel-slider').position().left;
        const fixleft = $('.news-slider-view').position().left;
        console.log(relleft);
        console.log(fixleft);
        $('.news-rel-slider').animate({'left': '+=416px'});
        $('.news-overlay.-right').show();
        if (relleft > -416) {
            $('.news-overlay.-left').hide();
        }
    });
});
