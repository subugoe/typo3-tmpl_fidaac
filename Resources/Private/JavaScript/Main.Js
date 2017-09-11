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
    $('body').show();
    $('.navigation_breadCrumbs').hide();
    $('.toTop_inner').hide();
    $('.navigation_default-submenuContainer-outer').hide();

});
