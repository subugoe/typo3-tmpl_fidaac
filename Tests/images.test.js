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

Scenario('Check line break in image caption', function*(I) {
    const nolinebreak = yield I.grabCssPropertyFrom('//figcaption[@class="image-caption" and contains(text(), "No line break")]', 'height');
    const linebreak = yield I.grabCssPropertyFrom('//figcaption[@class="image-caption" and contains(text(), "line break is an absolute must")]', 'height');

    console.info('Caption height without linebreak: '+nolinebreak+', with linebreak: '+linebreak);
    assert.notEqual(nolinebreak, linebreak);
});

Scenario('Check same left position for image and text', function*(I) {
    const leftImage = yield I.getPositionLeft('img[src*="csm_Collections-Liebetruth"]');
    const leftText = yield I.getPositionLeft('//p[contains(text(), "We never saw")]');
    console.info('Left of Image: '+leftImage+', Left of Text: '+leftText);
    assert.equal(leftImage, leftText);
});

Scenario('Check caption aligned right', function*(I) {
    const imgRight = yield I.getPositionRight('img[src*="csm_Collections-Liebetruth"]');
    const capRight = yield I.getPositionRight('//figcaption[@class="image-caption" and contains(text(), "Test caption alignment")]');
    console.info('Right of: Img: '+imgRight+', caption: '+capRight);
    assert.equal(imgRight, capRight);
});
