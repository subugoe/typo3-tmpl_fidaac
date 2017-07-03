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
        test.assertVisible('.header_image-home svg', 'Logo image visible');
        test.assertVisible('.header_home-icon svg', 'Home svg visible');
        test.assertVisible('.header_search-icon svg', 'Search svg visible');
        test.assertVisible('.header_language-icon svg', 'Globe svg visible');
    }).

    run(function () {
        test.done();
    });
});

