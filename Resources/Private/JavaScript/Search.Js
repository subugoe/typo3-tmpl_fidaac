$(document).ready(() => {

  const searchForm = $('#search-form');

  const searchEngineSettings = [
    {
      'action': '/search/metasearch-engine',
      'id': 'choice-pazpar2',
      'name': 'tx_pazpar2_pazpar2[queryString]',
      'query': '/search/metasearch-engine?tx_pazpar2_pazpar2[useJS]=yes&tx_pazpar2_pazpar2[queryString]='
    },
    {
      'action': '/search/website/',
      'id': 'choice-website',
      'name': 'q',
      'query': '/search/website/?q='
    }
  ];

  const initializeSearchForm = () => {
    const {0: parameters} = searchEngineSettings;
    searchForm.attr('action', parameters.action);
    searchForm.attr('name', parameters.name);
  };


  $('.header_search').click(() => {
    // $('.search-bar_outer').slideToggle(250);
    $('.js-search-bar').slideToggle(250);
    initializeSearchForm();

     return false;
  });

  $('input[name=search-choice]').change((event) => {
    if (event.target.id === 'choice-website') {
      const {1: parameters} = searchEngineSettings;

      searchForm.attr('action', parameters.action);
      searchForm.attr('name', parameters.name);
    } else {
      const {0: parameters} = searchEngineSettings;

      searchForm.attr('action', parameters.action);
      searchForm.attr('name', parameters.name);
    }
  });

  const getQuery = (choice) => {
    if (choice === 'choice-website') {
      const {1: parameters} = searchEngineSettings;
      return parameters.query;
    }

    const {0: parameters} = searchEngineSettings;
    return parameters.query;
  };

  searchForm.submit(() => {
    const id = document.querySelector('input[name=search-choice]:checked').getAttribute('id');
    window.location = getQuery(id) + $('#search').val();
    return false;
  });

});
