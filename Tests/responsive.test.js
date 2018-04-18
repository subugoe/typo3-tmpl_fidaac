const assert = require('assert');

Feature('Check header`s responsiveness on home');

Scenario('Check correct buttons are shown L', function*(I) {
    I.amOnPage('/');
    yield I.changeViewportSize(1200, 978);
    I.seeElement('.header_buttons');
    yield I.getViewportSize();
    I.dontSeeElement('.header-s_buttons');
    const buttonsBottom = yield I.getPositionBottom('.header_buttons .header_home');
    const logoBottom = yield I.getPositionBottom('.header_bildText');
    const checkGreater = yield I.checkGreaterThan(logoBottom, buttonsBottom);
    assert.equal(checkGreater, true);
});

Scenario('Check correct buttons are shown M', function*(I) {
    I.amOnPage('/collections');
    yield I.changeViewportSize(800, 600);
    I.seeElement('.header_buttons', 30);
    yield I.getViewportSize();
    I.dontSeeElement('.header-s_buttons', 30);
});

Scenario('Check correct buttons are shown S', function*(I) {
    I.amOnPage('/request-it');
    yield I.changeViewportSize(320, 568);
    yield I.getViewportSize();
    I.dontSeeElement('.header_buttons');
    I.seeElement('.header-s_buttons');
});

Scenario('Check images are shown correct in S', function*(I) {
    I.amOnPage('/information-for/tester/images/');
    yield I.changeViewportSize(320, 568);
<<<<<<< HEAD
    let imagewidth = yield I.grabCssPropertyFrom('//img[@title="Single image on top."]', 'width');
    assert.equal(imagewidth, '316px');
=======
    const imagewidth = yield I.grabCssPropertyFrom('//img[@title="Test caption alignment."]', 'width');
    assert.equal(imagewidth, '324px');
});

Scenario('Check images are shown correct in news in S', function*(I) {
    I.amOnPage('/collections/american-studies/recent-post/detail/News/paradise-lost-als-lyrische-fundgrube/');
    yield I.changeViewportSize(320, 568);
    const imagewidth = yield I.grabCssPropertyFrom('//img[@title="Ronald Johnson, Radi os"]', 'width');
    assert.equal(imagewidth, '324px');
>>>>>>> f0c129c... Implement responsive images for news detail
});