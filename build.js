var buildify = require('buildify');

buildify()
    .concat([
        'Resources/Public/JavaScript/Header.js',
        'Resources/Public/JavaScript/Navigation.js',
        'Resources/Public/JavaScript/Main.js'])
    .uglify()
    .save('Resources/Public/JavaScript/output.js')
    .load('Resources/Public/Css/Main.css')
    .cssmin()
    .save('Resources/Public/Css/output.css');
