// This test is to test the general availability of the website
casper.options.viewportSize = { width: 1024, height: 768 };
casper.options.waitTimeout = 20000;

casper.on("resource.error", function(resourceError){
    casper.echo('Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
    casper.echo('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    this.exit();
});

var baseurl = casper.cli.get("url");
var url = baseurl;

casper.test.begin('Test pazpar2', 8, function(test) {
    casper.start(url, function () {
        casper.echo('Opened page with title "' + this.getTitle() + '"');
        casper.echo('Capture screenshot');
        casper.capture('./tests/images/pazpar2.png');
    }).

    then(function() {
        casper.echo('Check availability of all elements');
        test.assertTextExists('Alle Kataloge', 'Page title "Alle Kataloge" visible');
        test.assertVisible('#pazpar2');
        test.assertVisible('.pz2-searchField', 'SearchField visible');
        test.assertVisible('.pz2-submitButton', 'SubmitButton visible');
        test.assertVisible('.pz2-extendedLink', 'ExtendedLink visible');
    }).

    then(function() {
        this.waitForSelector('.pz2-accessNote', function () {
            test.assertSelectorHasText('h2', 'Alle Kataloge');
            casper.echo('Check Access: ' + this.getHTML('.pz2-accessNote', false));
        })
    }).

    then(function () {
        casper.echo('Fill in form and check result');
        this.fillSelectors('.pz2-searchForm', {
            'input[id="pz2-field-all"]': 'holmes',
        });
        this.click('.pz2-submitButton');
    }).

     then(function() {
        this.waitForSelector('.pz2-recordCount', function () {

        })
    }).

    then(function () {
        // wait for selector which takes the longest time to get the most answers
        this.waitForSelector('.pz2-histogramContainer', function () {
            recordCount = this.getHTML('.pz2-recordCount', false);
            casper.echo('Number of results: ' + recordCount);
            test.assertVisible('.pz2-resultList', "Result list visible");
            test.assertElementCount('.pz2-resultList', 1);
        });
    }).

    run(function () {
        test.done();
    });
});

