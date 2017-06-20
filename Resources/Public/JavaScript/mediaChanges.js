$(document).ready(function(){

    changeNavigation = function() {
    };

    var changeSizes = function() {
        changeHeader();
        changeNavigation();
    }
    changeSizes();

    $(window).resize(function() {
        changeSizes();
    });

});
