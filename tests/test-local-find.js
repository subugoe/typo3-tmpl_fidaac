// This test is to test the general availability of the website
casper.options.viewportSize = { width: 1024, height: 768 };
casper.options.waitTimeout = 20000;

casper.on("resource.error", function(resourceError){
    casper.echo('Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
    casper.echo('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    this.exit();
});

var baseurl = casper.cli.get("url");
var url = baseurl+'/zeitungen';

casper.test.begin('Test find', 5, function(test) {
    casper.start(url, function () {
        casper.echo('Opened page with title "' + this.getTitle() + '"');
        casper.echo('Capture screenshot');
        casper.capture('./tests/images/find.png');
    }).

    then(function() {
        casper.echo('Check availability of all elements');
        test.assertTextExists('Zeitungen', 'Page title "Zeitungen" visible');
        test.assertVisible('#tx_find', 'find visible');
        test.assertVisible('.inputContainer', 'inputContainer visible');
        test.assertVisible('.resultCount', 'recordCount visible');
        resultCount = this.getHTML('.resultCount', false);
        casper.echo('Search before: ' + resultCount.trim());
    }).

    then(function() {
        var details =  this.getHTML('.details');
        this.clickLabel(details);
    }).

    then(function() {
        casper.echo('Clicked ok, new location is ' + this.getCurrentUrl());
        test.assertVisible('.detail', 'Details visible');
    }).

    run(function() {
        test.done();
    });
});
