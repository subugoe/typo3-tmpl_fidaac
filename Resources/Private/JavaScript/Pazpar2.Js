/**
 * Javascript for Pazpar2
 */
$(document).ready(() => {

    $('body').on('DOMNodeInserted', 'a.pz2-prev', () => {
        if ($('a.pz2-prev').html().indexOf('svg') === -1) {
            $('a.pz2-prev').html('<svg><use xlink:href="#backward"/></svg>');
        }
    });

    $('body').on('DOMNodeInserted', 'a.pz2-next', () => {
        $('a.pz2-next').each((index, el) => {
            if ($(el).html().indexOf('svg') === -1) {
                $(el).html('<svg><use xlink:href="#forward"/></svg>');
            }
        });
    });
});
