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
    $('a[href$=".jpg"], a[href$=".png"], a[href$=".JPG"], a[href$=".jpeg"]').attr('rel', `lightbox[${lightboxId}]`);
    $('a[href$=".jpg"], a[href$=".png"], a[href$=".JPG"], a[href$=".jpeg"]').each((index, el) => {
        if ($('figcaption').length > 0) {
            // content element
            $(el).attr('data-title', $(el).siblings('figcaption').html());
        } else {
            // news
            $(el).attr('data-title', $(el).parent().siblings('.news-img-caption').html());
        }
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
