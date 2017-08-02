$(document).ready(() => {

    // heading and text is not shown for full width images
    $('.image-full').siblings(':header').css('display', 'none');
    $('.image-full').parent('.content').siblings().css('display', 'none');

});
