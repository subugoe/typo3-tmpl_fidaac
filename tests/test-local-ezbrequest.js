// This test is to test the general availability of the website
casper.options.viewportSize = { width: 1024, height: 768 };
casper.options.waitTimeout = 20000;

casper.on("resource.error", function(resourceError){
    casper.echo('Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
    casper.echo('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    this.exit();
});

var baseurl = casper.cli.get("url");
var url = baseurl+'/zeitschriften';

casper.test.begin('Test ezbrequest', 5, function(test) {
    casper.start(url, function () {
        casper.echo('Opened page with title "' + this.getTitle() + '"');
        casper.echo('Capture screenshot');
        casper.capture('./tests/images/ezbrequest.png');
    }).

    then(function() {
        casper.echo('Check availability of all elements');
        test.assertTextExists('Zeitschriften: Literatur, Sprachwissenschaft und Geschichte', 'Page title "Zeitschriften: ..." visible');
        test.assertVisible('.tx-ezbrequest-pi1', 'ezbrequest visible');
        test.assertVisible('#ezb_search_form', 'search form visible');
        test.assertVisible('#ezb_search_form form input', 'input field visible');
        test.assertVisible('#journalList', 'journalList visible');
    }).

    then(function() {
        var institution =  this.getHTML('#journalList+div :nth-child(2)');
        casper.echo('Institution: ' + institution);
        var ip =  this.getHTML('#journalList+div :nth-child(3)');
        casper.echo('IP: ' + ip);
    }).

    run(function() {
        test.done();
    });
});
