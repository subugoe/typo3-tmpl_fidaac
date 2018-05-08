/**
 * Javascript for Pazpar2
 */
$(document).ready(() => {

    /**
     * Insert button for filters in S
     */
    $('body').on('DOMNodeInserted', '.pz2-resultList', () => {
        if (window.innerWidth < 768) {
            if ($('.pz2-filterButton').length === 0) {
                const buttonText = '<div class="pz2-filterButton">Filters</div>';
                $(buttonText).insertBefore('#pz2-results');
            }
        }
    });

    /**
     * Pagination is different in S versus M and L
     * Make sure it is updated correctly and timely
     */
    window.addEventListener('resize', () => {

        /* global updatePagers */
        // pagination:
        updatePagers();
        $('.pz2-histogramContainer, .flot-overlay').css('width', $('#pz2-termLists').css('width'));

        if (window.innerWidth < 768) {
            $('#pz2-termLists').addClass('-hide');
        } else {
            $('#pz2-termLists').removeClass('-hide');
        }
    });

    if (window.innerWidth < 768) {
        $('#pz2-termLists').addClass('-hide');
    }


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
