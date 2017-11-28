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
