var assert = require('assert');

Feature('Check pazpar2');

Scenario('Check pazpar2 for availability', function*(I) {
    I.amOnPage('/search/metasearch-engine/');
    I.seeElement('.pz2-mainForm #pz2-field-all');
    I.fillField('.pz2-mainForm #pz2-field-all', 'dickens');
    I.pressKey('Enter');
    I.waitForText('One hot summer', 8);
});

Scenario('Check entries of pazpar2', function*(I) {
    I.click('//span[@class="pz2-title" and contains(text(), "One hot summer")]');
    I.seeElement('.pz2-recordLink .pz2-mediaIcon');
});
