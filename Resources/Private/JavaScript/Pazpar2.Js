/**
 * Javascript for Pazpar2
 */
$(document).ready(() => {

    $('body').on('DOMNodeInserted', 'a.pz2-prev', () => {
        if ($('a.pz2-prev').html().indexOf('svg') === -1) {
            console.log('Prev');
            $('a.pz2-prev').html('<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#backward"/></svg>');
        }
    });

    $('body').on('DOMNodeInserted', 'a.pz2-next', () => {
        if ($('a.pz2-next').html().indexOf('svg') === -1) {
            $('a.pz2-next').html('<svg><use xlink:href="/typo3conf/ext/tmpl_fidaac/Resources/Public/Images/symbol-defs.svg#forward"/></svg>');
        }
    });
});

