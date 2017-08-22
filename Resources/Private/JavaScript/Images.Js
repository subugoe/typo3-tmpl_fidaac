/**
 * Header.js
 *
 * functions to change the header for different screen sizes
 */

$(document).ready(() => {

    const adjustFigureWidth = () => {
        $('[class^=cols]').each((el, is) => {
            const cl = $(is).attr('class');
            const wi = cl.substring(cl.indexOf('-') + 1);
            console.log(wi);
        });
    };
    adjustFigureWidth();
});
