// This test is to test the general availability of the website
casper.options.viewportSize = {width: 1024, height: 768};

casper.on("resource.error", function(resourceError){
    casper.echo('Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
    casper.echo('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    this.exit();
});

casper.test.begin('Test for Development Server', 1, function suite(test) {
    casper.start('https://aacdev.sub.uni-goettingen.de', function () {
        casper.waitForSelector('.pz2-searchField', function() {
            casper.echo('Bin drin, und es gibt ' + this.getTitle());
            casper.echo('Opened page with title "' + this.getTitle() + '"');
            casper.capture('./tests/images/aac-dev-home.png');
            test.assertVisible();
        });
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

