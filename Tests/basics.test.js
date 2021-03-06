var assert = require('assert');

Feature('Check homepage');

Scenario('Check header', function* (I) {
    I.amOnPage('/');
    I.changeViewportSize(1200, 978);
    I.see('Home');
    let logowidth = yield I.grabCssPropertyFrom('.header_image svg', 'width');
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