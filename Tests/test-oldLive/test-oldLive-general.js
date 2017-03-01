// This test is to test the general availability of the website
casper.options.viewportSize = { width: 1024, height: 768 };

casper.on("resource.error", function(resourceError){
    casper.echo('Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
    casper.echo('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    this.exit();
});

casper.test.begin('Test for original AAC Web presence', 1, function suite(test) {
    casper.start('https://aac.sub.uni-goettingen.de', function () {
        casper.echo('Opened page with title "' + this.getTitle() + '"');
        casper.capture('./tests/images/aac-oldLive-home.png');
        test.assertVisible('.pz2-searchField');
    });

    casper.then(function () {
        this.fillSelectors('.pz2-searchForm', {
            'input[id="pz2-field-all"]': 'holmes',
        });
    });

    casper.then(function () {
        this.waitForSelector('.pz2-recordCount', function () {
            casper.echo('Number of results: ' + this.getHTML('.pz2-recordCount', false));
        });
    });

    casper.run(function () {
        test.done();
    });
});

