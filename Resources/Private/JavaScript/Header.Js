/**
 * Header.js
 *
 * functions to change the header for different screen sizes
 */

$(document).ready(() => {
    // Text labels hide when screen smaller than 768 and reappear at hover
  const changeHeader = function changeHeader() {
    if (window.innerWidth > 960) {
      ['home', 'search', 'language'].forEach((el) => {
        $(`.header_${el}-text`).removeClass('removed');
        $(`.header_${el}`).unbind('mouseenter');
        $(`.header_${el}`).unbind('mouseleave');
      });
      return;
    }
    if (window.innerWidth <= 960 && window.innerWidth > 768) {
      ['home', 'search', 'language'].forEach((el) => {
        $(`.header_${el}`).removeClass('removed');
        $(`.header_${el}-text`).addClass('removed');
        $(`.header_${el}`).mouseenter(() => {
          $(`.header_${el}-text`).removeClass('removed');
        });
        $(`.header_${el}`).mouseleave(() => {
          $(`.header_${el}-text`).addClass('removed');
        });
      });
      return;
    }
    if (window.innerWidth <= 768 && window.innerWidth > 304) {
      ['home', 'search', 'language'].forEach((el) => {
        $(`.header_${el}`).unbind('mouseenter');
        $(`.header_${el}`).unbind('mouseleave');
        $(`.header_${el}`).addClass('removed');
      });
      return;
    }
    if (window.innerWidth <= 304) {
      ['home', 'search', 'language'].forEach((el) => {
        $(`.header_${el}`).unbind('mouseenter');
        $(`.header_${el}`).unbind('mouseleave');
        $(`.header_${el}`).addClass('removed');
      });
      $('.navigation').addClass('removed');
    }
  };

    // check every time the screen size is changed
  $(window).resize(() => {
    changeHeader();
  });

    // check on loading
  changeHeader();
});
