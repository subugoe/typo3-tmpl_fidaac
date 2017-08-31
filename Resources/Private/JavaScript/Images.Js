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
    });
  };
  adjustFigureWidth();

  const lightboxId = Math.ceil(Math.random() * 100);

  $('a[href$=".jpg"], a[href$=".png"]').attr('rel', `lightbox[${lightboxId}]`);

});
