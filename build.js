var buildify = require('buildify');

buildify()
    .concat([
        'Resources/Private/JavaScript/Header.Js',
        'Resources/Private/JavaScript/Navigation.Js',
        'Resources/Private/JavaScript/Main.Js',
        'Resources/Private/JavaScript/Fontfaceobserver.Js'
    ])
    .save('Resources/Public/JavaScript/concatenated.js');
