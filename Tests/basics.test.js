var assert = require('assert');

Feature('Check homepage');

Scenario('Check header', function* (I) {
    I.amOnPage('/');
    I.changeViewportSize(1200, 978);
    I.see('Home');
    let logowidth = yield I.grabCssPropertyFrom('.header_image-home svg', 'width');
    assert.equal(logowidth, '188px');
});

Scenario('Check news', function* (I) {
    let stairsDescriptionWidth = yield I.grabCssPropertyFrom('.teaser-text :first-of-type', 'width');
    assert.equal(stairsDescriptionWidth[0], '472px');
    let sliderTitleWidth = yield I.grabCssPropertyFrom('.news-slide .news-header:first-of-type', 'width');
    assert.equal(sliderTitleWidth[0], '400px');
    let sliderDescriptionWidth = yield I.grabCssPropertyFrom('.news-slide .teaser-text :first-of-type', 'width');
    assert.equal(sliderDescriptionWidth[0], '400px');
    let sliderNews = yield I.grabNumberOfVisibleElements('.news-slide');
    assert.equal(sliderNews, '3');
});

Scenario('Make sure subsubmenu is visible and clickable, even after back and forth with mouse - 895', function* (I) {
    I.moveCursorTo('.navigation_default-menuItem:first-of-type');
    I.waitForVisible('.navigation_default-submenuContainer-outer');
    I.seeElement('.navigation_default-submenuItem:first-of-type');
    I.moveCursorTo('.navigation_default-submenuItem:first-of-type');
    I.waitForText('Other Types of Primary Sources', 40);
    I.moveCursorTo('//a[contains(@href, "/search/search-tips/american-studies/")]');
    I.moveCursorTo('.navigation_default-submenuItem:first-of-type');
    I.waitForText('Other Types of Primary Sources', 60);
    I.waitForText('American Studies', 60);
    I.seeElement('.navigation_default-submenuItem:first-of-type');
    I.click('.navigation_default-submenuItem:first-of-type a');
    I.waitForText('Searching Literature Online', 60);
});
