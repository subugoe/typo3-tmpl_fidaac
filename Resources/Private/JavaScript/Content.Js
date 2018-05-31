/**
 * Main.js
 *
 * Show the website after all javascript is done
 */

$(document).ready(() => {

    /**
     * Stuff related to scrolling and page up button
     */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() === 0) {
            $('.toTop_inner').css('visibility', 'hidden');
        } else if ($('.toTop_inner').css('visibility') === 'hidden') {
            $('.toTop_inner').css('visibility', 'visible');
        }
    });

    $('.toTop_inner').on('click', () => {
        $('html').animate({scrollTop: 0}, 'fast');
    });

    // hide, so that space is preserved
    $('.toTop_inner').css('visibility', 'hidden');
});
