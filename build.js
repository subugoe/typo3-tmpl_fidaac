var buildify = require('buildify');

buildify()
    .concat([
        'Resources/Private/JavaScript/Header.Js',
        'Resources/Private/JavaScript/Navigation.Js',
        'Resources/Private/JavaScript/Main.Js'
    ])
    .save('Resources/Public/JavaScript/concatenated.js');

buildify()
    .load('node_modules/jquery/dist/jquery.min.js')
    .save('Resources/Public/JavaScript/jquery.min.js');
