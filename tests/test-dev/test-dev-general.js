// This test is to test the general availability of the website
casper.options.viewportSize = { width: 1024, height: 768 };

casper.test.begin('Test for dev server', 1, function suite(test) {
    casper.start('https://aacdev.sub.uni-goettingen.de', function () {
        casper.echo('Opened page with title "' + this.getTitle() + '"');
        casper.capture('./tests/images/aac-dev-home.png');
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

