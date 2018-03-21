var assert = require('assert');

Feature('Check footer');

Scenario('Check contact', function* (I) {
    I.amOnPage('/');
    I.seeElement('.footer-column.-contact .footer-contact_address :first-of-type');
    const textleft = yield I.getPositionLeft('.footer-column.-contact .footer-contact_address a :first-of-type');
    const iconleft = yield I.getPositionLeft('.footer-column.-contact .footer-contact_address .fa-map-marker');

    console.info('Textleft: ' + textleft + ', Iconleft: ' + iconleft);
});
