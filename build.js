const buildify = require('buildify');

buildify()
    .concat([
        'Resources/Private/JavaScript/Header.Js',
        'Resources/Private/JavaScript/Search.Js',
        'Resources/Private/JavaScript/Navigation.Js',
        'Resources/Private/JavaScript/Main.Js',
        'Resources/Private/JavaScript/Images.Js',
        'Resources/Private/JavaScript/Fontfaceobserver.Js'
    ])
    .save('Build/JavaScript/concatenated.js');

buildify()
    .concat([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/lightbox2/dist/js/lightbox.min.js',
        'node_modules/jquery-ui-dist/jquery-ui.min.js',
    ])
    .save('Resources/Public/JavaScript/vendor.min.js');
