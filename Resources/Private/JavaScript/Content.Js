/**
 * Main.js
 *
 * Show the website after all javascript is done
 */

$(document).ready(() => {

    /**
     * The body is not displayed by default, only after javascript is done it is finally displayed
     * This removes jumping elements
     */
    // hide, so that space is preserved
    $('.toTop_inner').css('visibility', 'hidden');

    document.getElementById('search-bar-close').addEventListener('visibilitychange', function() {
        console.log('resize');
    });

});
