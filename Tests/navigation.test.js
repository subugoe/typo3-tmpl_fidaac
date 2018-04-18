var assert = require('assert');

Feature('Check navigation');

Scenario('Check navigation', function* (I) {
    I.amOnPage('/');
    I.moveCursorTo('.navigation_default-menuItem:first-of-type');
    I.waitForVisible('.navigation_default-submenuContainer-outer');
    I.moveCursorTo('.navigation_default-submenuItem:first-of-type');
    I.waitForText('Finding Databases', 120, '.navigation_default-submenuItem a');
});

Scenario('Make sure subsubmenu is visible and clickable - 895 and correctly shaded - 905', function* (I) {
    I.moveCursorTo('.navigation_default-menuItem:first-of-type');
    I.waitForVisible('.navigation_default-submenuContainer-outer', 120);
    I.seeElement('.navigation_default-submenuItem:first-of-type');
    I.moveCursorTo('.navigation_default-submenuItem:first-of-type');
    I.see('Finding Databases');

    const actSub = yield I.grabCssPropertyFrom('.navigation_default-submenuItem.-sub', 'background-color');
    assert.equal(actSub[0], 'rgba(244, 214, 74, 1)');

    I.moveCursorTo('//a[contains(@href, "/search/search-tips/american-studies/")]');
    I.moveCursorTo('.navigation_default-submenuItem:first-of-type');
    I.waitForText('American Studies', 120);
    I.seeElement('.navigation_default-submenuItem:first-of-type');
    I.click('.navigation_default-submenuItem:first-of-type a');
    I.waitForText('Searching Literature Online', 120);


    I.moveCursorTo('.navigation_default-menuItem:nth-of-type(2)');
    I.moveCursorTo('.navigation_default-menuItem:first-of-type');
    I.wait(2);
    I.dontSee('Other Types Of Primary Sources');
});