var assert = require('assert');

Feature('Check search');

Scenario('Basis check for search bar', function*(I) {
    I.amOnPage('/home/');
    yield I.changeViewportSize(1024, 600);
    I.click('.header_search-text');
    I.waitForVisible('.search-bar-select-item');
    I.click('.search-bar-misc button#search-form_submit');
    I.waitForVisible('.pz2-mainForm');
});

Scenario('Check for search bar in S', function*(I) {
    I.amOnPage('/home/');
    yield I.changeViewportSize(360, 600);
    I.click('.header-s_buttons .header_search');
    I.waitForVisible('.search-bar-select-item');
    I.click('#search-bar-close');
    I.waitForInvisible('.search-bar-select-item');
});
