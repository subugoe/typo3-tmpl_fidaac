$(document).ready(() => {

    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= '198') {
            if (!$('.breadcrumb_outer').hasClass('-sticky')) {
                $('.breadcrumb_outer').addClass('-sticky');
            }
        } else {
            $('.breadcrumb_outer').removeClass('-sticky');
        }
    });
});
