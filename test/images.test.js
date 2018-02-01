var assert = require('assert');

Feature('Check images');

Scenario('Check image on top', function*(I) {
    I.amOnPage('/information-for/tester/images/');
    I.see('Single image on top');
    let imagewidth = yield I.grabCssPropertyFrom('.singleColumn:first-of-type .figure-center-above img:first-of-type', 'width');
    let captionwidth = yield I.grabCssPropertyFrom('.singleColumn:first-of-type .figure-center-above .image-caption:first-of-type', 'width');
    assert.equal(imagewidth[0], captionwidth[0]);
});

Scenario('Check two images on top', function*(I) {
    I.see('Two images on top');
    let firstImage = yield I.grabCssPropertyFrom('.figure-center-above:nth-of-type(2) img', 'width');

    let top1 = yield I.getPositionTop('.singleColumn:nth-of-type(2) .figure-center-above:nth-of-type(1) img');
    let top2 = yield I.getPositionTop('.singleColumn:nth-of-type(2) .figure-center-above:nth-of-type(2) img');
    console.info('1: '+top1+', 2: '+top2);
    assert.equal(top1, top2);
});
