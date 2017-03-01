// This test is to test the general availability of the website
casper.options.viewportSize = { width: 1024, height: 768 };
casper.options.waitTimeout = 20000;

casper.on("resource.error", function(resourceError){
    casper.echo('Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
    casper.echo('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    this.exit();
});

var baseurl = casper.cli.get("url");
var url = baseurl+'/geschichte/guide';

casper.test.begin('Test nkwgok', 5, function(test) {
    casper.start(url, function () {
        casper.echo('Opened page with title "' + this.getTitle() + '"');
        casper.echo('Capture screenshot');
        casper.capture('./tests/images/nkwgok.png');
    }).

    then(function() {
        casper.echo('Check availability of all elements');
        test.assertTextExists('History Guide', 'Page title "History Guide" visible');
        test.assertVisible('.gokContainer', 'gokContainer visible');
        test.assertVisible('.gokMenuForm', 'gokMenuForm visible');
        recordCount = this.getHTML('.pz2-recordCount', false);
        casper.echo('Search before: ' + recordCount);
    }).

    then(function() {
        casper.evaluate(function() {
            $('.gokMenuForm select').val('HistGuide0050').change();
        })
    }).

    then(function() {
        // wait for selector which takes the longest time to get the most answers
        this.waitForSelector('.pz2-title', function () {
            recordCount = this.getHTML('.pz2-recordCount', false);
            casper.echo('Number of results: ' + recordCount);
            test.assertVisible('.pz2-resultList', 'ResultList visible');
            test.assertElementCount('.pz2-resultList', 1);
        });
    }).

    then(function() {
        var firstResult =  this.getHTML('.pz2-title');
        casper.echo('First result: ' + firstResult);
        this.clickLabel(firstResult);
    }).

    then(function() {
        this.waitForSelector('.pz2-details', function () {
            casper.echo('Detail visible');
        })
    }).

    run(function() {
        test.done();
    });
});

