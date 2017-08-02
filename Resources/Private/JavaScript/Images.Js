$(document).ready(() => {

    // heading and text is not shown for full width images
    $('.image-full').siblings(':header').css('visibility', 'hidden');
    $('.image-full').parent('.content').siblings().css('visibility', 'hidden');

});
