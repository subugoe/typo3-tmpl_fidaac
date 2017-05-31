// This test is to test the general availability of the website
casper.options.viewportSize = { width: 1224, height: 978 };
casper.options.waitTimeout = 20000;

casper.on("resource.error", function(resourceError){
    casper.echo('Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
    casper.echo('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    this.exit();
});

var baseurl = casper.cli.get("url");
var url = baseurl;

casper.test.begin('Test header', 4, function(test) {
    casper.start(url, function () {
        casper.echo('Image available "' + this.getTitle() + '"');
        casper.echo('Capture screenshot');
        casper.capture('./tests/images/header.png');
    }).

    then(function() {
        casper.echo('Check availability of all elements');
        test.assertVisible('.header_image img', 'Logo image visible');
        test.assertVisible('.header_home svg', 'Home svg visible');
        test.assertVisible('.header_search svg', 'Search svg visible');
        test.assertVisible('.header_language svg', 'Globe svg visible');
    }).

    then(function() {
        require('utils').dump(this.getElementInfo('.header_home svg').y);
        require('utils').dump(this.getElementInfo('.header_search svg').y);
    }).

    run(function () {
        test.done();
    });
});

