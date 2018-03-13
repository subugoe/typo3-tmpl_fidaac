var assert = require('assert');

Feature('Check header`s responsiveness on home');

Scenario('Check correct buttons are shown L', function*(I) {
    I.amOnPage('/');
    yield I.changeViewportSize(1200, 978);
    I.seeElement('.header_buttons');
    yield I.getViewportSize();
    I.dontSeeElement('.header-s_buttons');
    const buttonsBottom = yield I.getPositionBottom('.header_buttons .header_home');
    const logoBottom = yield I.getPositionBottom('.header_bildText-home');
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
    let buttonsVisibility = yield I.grabCssPropertyFrom('.header_buttons', 'display');
    yield I.getViewportSize();
    let buttonsSVisibility = yield I.grabCssPropertyFrom('.header-s_buttons', 'display');
    I.dontSeeElement('.header_buttons');
    I.seeElement('.header-s_buttons');
});
