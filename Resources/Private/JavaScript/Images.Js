/**
 * Images.js
 *
 * Image manipulations
 */

$(document).ready(() => {
    const lightboxId = Math.ceil(Math.random() * 100);

    /**
     * Add caption and translate number info to image overlays
     */
    $('a[href$=".jpg" i], a[href$=".png" i]').attr('rel', `lightbox[${lightboxId}]`);
    $('a[href$=".jpg" i], a[href$=".png" i]').each((index, el) => {
        $(el).attr('data-title', $(el).siblings('figcaption').html());
    });

    if ($('html').attr('lang') === 'de') {
        $('body').on('DOMNodeInserted', '.lb-number', () => {
            const lbNumberEn = $('.lb-number').text();
            let lbNumberGer = lbNumberEn.replace('Image', 'Bild');
            lbNumberGer = lbNumberGer.replace('of', 'von');
            $('.lb-number').text(lbNumberGer);
        });
    }
});
