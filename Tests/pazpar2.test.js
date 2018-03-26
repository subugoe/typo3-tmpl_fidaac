var assert = require('assert');

Feature('Check pazpar2');

Scenario('Check pazpar2 for books', function*(I) {
    I.amOnPage('/search/metasearch-engine/');
    I.seeElement('.pz2-mainForm #pz2-field-all');
    I.fillField('.pz2-mainForm #pz2-field-all', 'One hot summer');
    I.pressKey('Enter');
    I.waitForText('One hot summer', 80);
    I.click('//span[@class="pz2-title" and contains(text(), "One hot summer")]');
    I.waitForText('Search GVK (ILL)', 40);
    I.see('Search GVK (ILL)');
});

Scenario('Check pazpar2 for articles', function*(I) {
    I.seeElement('.pz2-mainForm #pz2-field-all');
    I.fillField('.pz2-mainForm #pz2-field-all', 'dickens Pseudo-Dickens');
    I.pressKey('Enter');
    I.waitForText('Dickens, "Dickensian," and the Pseudo-Dickens Industry', 80);
    I.click('//span[@class="pz2-title" and contains(text(), "and the Pseudo-Dickens Industry")]');
    I.waitForText('Essays: Literature', 40);
    I.see('Essays: Literature');
});
