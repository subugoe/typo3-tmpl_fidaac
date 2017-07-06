var buildify = require('buildify');

buildify()
    .concat([
        'Resources/Private/JavaScript/Header.Js',
        'Resources/Private/JavaScript/Navigation.Js',
        'Resources/Private/JavaScript/Main.Js'
    ])
    .save('Resources/Public/JavaScript/concatenated.js')
    .load('Resources/Public/Css/concatenated.css')
    .cssmin()
    .save('Resources/Public/Css/minified.css');
