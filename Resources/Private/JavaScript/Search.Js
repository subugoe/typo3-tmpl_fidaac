$(document).ready(() => {

    const searchForm = $('#search-form');

    const searchEngineSettingsMetasearch = {
        'action': '/search/metasearch-engine',
        'id': 'choice-pazpar2',
        'name': 'tx_pazpar2_pazpar2[queryString]',
        'query': '/search/metasearch-engine?tx_pazpar2_pazpar2[useJS]=yes&tx_pazpar2_pazpar2[queryString]='
    };

    const searchEngineSettingsWebsite = {
        'action': '/search/website/',
        'id': 'choice-website',
        'name': 'q',
        'query': '/search/website/?q='
    };

    const initializeSearchForm = () => {
        const parameters = searchEngineSettingsMetasearch;
        searchForm.attr('action', parameters.action);
        searchForm.attr('name', parameters.name);
    };

    $('input[name=search-choice]').change((event) => {
        if (event.target.id === 'choice-website') {
            const parameters = searchEngineSettingsWebsite;

            searchForm.attr('action', parameters.action);
            searchForm.attr('name', parameters.name);
        } else {
            const parameters = searchEngineSettingsMetasearch;

            searchForm.attr('action', parameters.action);
            searchForm.attr('name', parameters.name);
        }
    });

    const getQuery = (choice) => {
        if (choice === 'choice-website') {
            const parameters = searchEngineSettingsWebsite;
            return parameters.query;
        }

        const parameters = searchEngineSettingsMetasearch;
        return parameters.query;
    };

    searchForm.submit(() => {
        const id = document.querySelector('input[name=search-choice]:checked').getAttribute('id');
        window.location = getQuery(id) + $('#search').val();
        return false;
    });

    $('.pagination .previous a').html('<svg><use xlink:href="#icon-caret-left"/></svg>');
    $('.pagination .last.next a').html('<svg><use xlink:href="#icon-caret-right"/></svg>');


    /**
     * make sure search bar is displayed correctly for all screen widths
     */
    $('.header_search').click(() => {
        if ($(window).innerWidth() < 768) {
            $('.search-bar_outer').show();
            $('.page').css('overflow', 'hidden');
        } else {
            $('.search-bar_outer').slideToggle(250);
        }
        initializeSearchForm();

        return false;
    });

    $('#search-bar-close').click(() => {
        $('.search-bar_outer').hide();
        $('.page').css('overflow', 'visible');
    });

    window.addEventListener('resize', function () {
        if ($('#search-bar-close').css('display') === 'flex') {
            $('.page').css('overflow', 'hidden');
        } else {
            $('.page').css('overflow', 'visible');
        }
    });

});
