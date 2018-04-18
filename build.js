const buildify = require('buildify');

buildify()
    .concat([
        'Resources/Private/JavaScript/Header.Js',
        'Resources/Private/JavaScript/Search.Js',
        'Resources/Private/JavaScript/Navigation.Js',
        'Resources/Private/JavaScript/Content.Js',
        'Resources/Private/JavaScript/News.Js',
        'Resources/Private/JavaScript/Images.Js',
        'Resources/Private/JavaScript/Powermail.Js',
        'Resources/Private/JavaScript/Pazpar2.Js',
        'Resources/Private/JavaScript/Fontfaceobserver.Js',
        'Resources/Private/JavaScript/Shariff.Js'
    ])
    .save('Build/JavaScript/concatenated.js');

buildify()
    .concat([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/lightbox2/dist/js/lightbox.min.js',
        'node_modules/jquery-ui-dist/jquery-ui.min.js',
        'node_modules/jquery-hoverintent/jquery.hoverIntent.min.js',
        'Resources/Public/JavaScript/Extensions/find.js',
        'Resources/Public/JavaScript/Extensions/pz2-client.js',
        'Resources/Public/JavaScript/Extensions/fontfaceobserver.js'
    ])
    .save('Resources/Public/JavaScript/vendor.min.js');
