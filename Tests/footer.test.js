var assert = require('assert');

Feature('Check footer');

Scenario('Check contact', function* (I) {
    I.amOnPage('/');
    I.seeElement('.footer-column.-tell', 40);
    const fontsize = yield I.grabCssPropertyFrom('.footer-column.-tell', 'font-size');
    assert.equal(fontsize, '16px');
});
