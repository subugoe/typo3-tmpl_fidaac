var assert = require('assert');

Feature('Check navigation');

Scenario('Check navigation', function* (I) {
    I.amOnPage('/');
    I.moveCursorTo('.navigation_default-menuItem:first-of-type');
    I.waitForVisible('.navigation_default-submenuContainer-outer');
    I.moveCursorTo('.navigation_default-submenuItem:first-of-type');
    I.waitForText('Other Types of Primary Sources', 40);
});

Scenario('Make sure subsubmenu is visible and clickable - 895 and correctly shaded - 905', function* (I) {
    I.moveCursorTo('.navigation_default-menuItem:first-of-type');
    I.waitForVisible('.navigation_default-submenuContainer-outer');
    I.seeElement('.navigation_default-submenuItem:first-of-type');
    I.moveCursorTo('.navigation_default-submenuItem:first-of-type');
    I.waitForText('Other Types of Primary Sources', 40);

    const actSub = yield I.grabCssPropertyFrom('.navigation_default-submenuItem.-sub', 'background-color');
    assert.equal(actSub[0], 'rgba(168, 168, 168, 1)');

    I.moveCursorTo('//a[contains(@href, "/search/search-tips/american-studies/")]');
    I.moveCursorTo('.navigation_default-submenuItem:first-of-type');
    I.waitForText('Other Types of Primary Sources', 60);
    I.waitForText('American Studies', 60);
    I.seeElement('.navigation_default-submenuItem:first-of-type');
    I.click('.navigation_default-submenuItem:first-of-type a');
    I.waitForText('Searching Literature Online', 60);


    I.moveCursorTo('.navigation_default-menuItem:nth-of-type(2)');
    I.moveCursorTo('.navigation_default-menuItem:first-of-type');
    I.dontSee('Other Types of Primary Sources');

});
