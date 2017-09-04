/**
 * Header.js
 *
 * functions to change the header for different screen sizes
 */

$(document).ready(() => {
    const lightboxId = Math.ceil(Math.random() * 100);

    $('a[href$=".jpg"], a[href$=".png"]').attr('rel', `lightbox[${lightboxId}]`);

});