/**
 * Images.js
 *
 * Image manipulations
 */

$(document).ready(() => {
    const lightboxId = Math.ceil(Math.random() * 100);

    $('a[href$=".jpg" i], a[href$=".png" i]').attr('rel', `lightbox[${lightboxId}]`);
});
