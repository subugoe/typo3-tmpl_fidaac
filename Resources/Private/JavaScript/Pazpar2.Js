/**
 * Javascript for Pazpar2
 */
$(document).ready(() => {

    $('body').on('DOMNodeInserted', 'a.pz2-prev', () => {
        $('a.pz2-prev').each((index, el) => {
            if ($(el).html().indexOf('svg') === -1) {
                $(el).html('<svg><use xlink:href="#icon-caret-left"/></svg>');
            }
        });
    });

    $('body').on('DOMNodeInserted', 'a.pz2-next', () => {
        $('a.pz2-next').each((index, el) => {
            if ($(el).html().indexOf('svg') === -1) {
                $(el).html('<svg><use xlink:href="#icon-caret-right"/></svg>');
            }
        });
    });
});
