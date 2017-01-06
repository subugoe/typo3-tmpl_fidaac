casper.options.viewportSize = {width: 1024, height: 768};

casper.test.begin('Teste AAC', 1, function suite(test) {
	casper.start("https://aac.sub.uni-goettingen.de/en/", function() {

		console.log('Opened page with title \"' + this.getTitle() + '"');
		casper.capture('./tests/images/aac-home.png');

		test.assertVisible('.pz2-searchField');
	});
	casper.then(function() {
		this.fillSelectors('.pz2-searchForm', {
			'input[id="pz2-field-all"]': 'holmes'
		});
	});
	casper.then(function() {
		this.wait(3000, function() {
			console.log('Ergibt: '+this.getHTML('.pz2-recordCount',false));
		});
	});
		//this.fill('.pz2-searchField', {
		//	'tx_pazar2*': 'holmes'
		//});
	//casper.then(function() {
	//	test.assertEqual('.pz2-searchField', 'holmes');
		//test.assertEquals('.pz2-recordCount', '1-100 of 1286+');
	//});

	casper.run(function() {
		test.done();
	});
});

