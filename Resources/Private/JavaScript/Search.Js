$(document).ready(() => {

    const searchForm = $('#search-form');

    // we use realurl, so we have different paths, depending on language
    const lang = $('html').attr('lang');
    const getAction = (search) => {
        if (lang === 'de') {
            if (search === 'metasearch') {
                return '/de/suche/kataloge';
            }
            return '/de/suche/website';
        }
        if (search === 'metasearch') {
            return '/search/metasearch-engine';
        }
        return '/search/website';
    };
    const searchEngineSettingsMetasearch = {
        'action': getAction('metasearch'),
        'id': 'choice-pazpar2',
        'name': 'tx_pazpar2_pazpar2[queryString]',
        'query': `${getAction('metasearch')}?tx_pazpar2_pazpar2[useJS]=yes&tx_pazpar2_pazpar2[queryString]=`
    };

    const searchEngineSettingsWebsite = {
        'action': getAction('website'),
        'id': 'choice-website',
        'name': 'q',
        'query': `${getAction('website')}/?q=`
    };

    const initializeSearchForm = () => {
        const parameters = searchEngineSettingsMetasearch;
        searchForm.attr('action', parameters.action);
        searchForm.attr('name', parameters.name);
    };

    $('.header_search').click(() => {
        $('.js-search-bar').slideToggle(250);
        initializeSearchForm();

        return false;
    });

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

    $('.pagination .previous a').html('<svg><use xlink:href="#backward"/></svg>');
    $('.pagination .last.next a').html('<svg><use xlink:href="#forward"/></svg>');

});
