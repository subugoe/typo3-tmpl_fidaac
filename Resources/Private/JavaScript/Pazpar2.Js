/**
 * Javascript for Pazpar2
 */
$(document).ready(() => {

    /**
     * Insert button for filters in S
     */
    const insertFilterButtonInS = () => {
        if ($('#pz2-filterButton').length === 0) {
            const buttonText = '<div id="pz2-filterButton">Filters</div>';
            $(buttonText).insertBefore('#pz2-results');
        }
    };
    const removeFilterButtonsInS = () => {
            $('#pz2-filterButton').remove();
            $('#pz2-overlay-info').remove();
    };

    $('body').on('DOMNodeInserted', '.pz2-resultList', () => {
        if (window.innerWidth < 768) {
            insertFilterButtonInS();
        }
    });

    /**
     * Handle filters in S
     */
    const hideFiltersInS = () => {
        if (window.innerWidth < 768) {
            $('#pz2-termLists').unwrap('.pz2-facetsInS');
            $('#pz2-overlay-close').remove();
            $('#pz2-overlay-info').remove();
            $('#pz2-termLists').addClass('-hide');
        } else {
            $('#pz2-termLists').removeClass('-hide');
        }
    };
    hideFiltersInS();

    const showFilters = () => {
        // Jump to top
        $('#pz2-termLists').removeClass('-hide');

        if (window.innerWidth < 768) {
            $('html').animate({scrollTop: 0}, 'fast');
            if ($('.pz2-facetsInS').length === 0) {
                // wrap and add close-button and info-button
                $('#pz2-termLists').wrap('<div class="pz2-facetsInS"></div>');
                $('.pz2-facetsInS').height($('.content-main').height());

                const closeButton = '<div id="pz2-overlay-close">' +
                    '<svg>' +
                    '<use xlink:href="#icon-close"/>' +
                    '<span class="visible-hidden">' +
                    'Close' +
                    '</span>' +
                    '</svg>' +
                    'Close' +
                    '</div>';
                $('.pz2-facetsInS').append(closeButton);
                $('#pz2-overlay-close').on('click', () => {
                    hideFiltersInS();
                });


                const infoLabel = '<div id="pz2-overlay-info">' +
                    'Filters' +
                    '</div>';
                $('.pz2-facetsInS').prepend(infoLabel);
            }
            $('.pz2-facetsInS').show(200);
        } else {
            $('#pz2-termLists').unwrap('.pz2-facetsInS');
        }
    };

    $('body').on('DOMNodeInserted', '#pz2-filterButton', () => {
        $('#pz2-filterButton').on('click', () => {
            showFilters();
        });
    });


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

    /**
     * Displaing extended Forms
     */
    /* eslint no-use-before-define: 0 */
    const morphExtended = () => {
        $('.pz2-extendedLink').unbind('click', morphExtended).on('click', morphBasic);
        $('.pz2-fieldContainer, .pz2-checkbox, .pz2-mainForm, .pz2-searchField, .pz2-textFieldLabel, .pz2-formControls').addClass('-extra');
    };

    const morphBasic = () => {
        $('.pz2-extendedLink').unbind('click', morphBasic).on('click', morphExtended);
        $('.-extra').removeClass('-extra');
    };
    morphBasic();


    const switchPlaceForInputExample = () => {
        const elements = [['.pz2-field-person'], ['.pz2-field-date']];

        $.each(elements, function(index, el) {
            const placeholder = $(`${el} input`).attr('placeholder');
            $(`${el} input`).removeAttr('placeholder');
            const text = $(`${el} label`).text();
            $(`${el} label`).text(`${text} (${placeholder})`);
        });
    };
    switchPlaceForInputExample();


    window.addEventListener('resize', () => {
        /* global updatePagers */
        // pagination:
        updatePagers();
        $('.pz2-histogramContainer, .flot-overlay').css('width', $('#pz2-termLists').css('width'));

        if (window.innerWidth < 768) {
            insertFilterButtonInS();
            hideFiltersInS();
        } else {
            removeFilterButtonsInS();
            showFilters();
        }
    });

});
