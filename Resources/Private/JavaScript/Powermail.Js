/**
 * Powermail.js
 */


$(document).ready(() => {
  $('.powermail_input').focus((event) => {
    const id = $(event.target).attr('id');
    $(`.powermail_label[for=${id}]`).addClass('activeLabel');
  });

  $('.powermail_input').blur((event) => {
    if ($(event.target).val()) {
      return;
    }

    const id = $(event.target).attr('id');
    $(`.powermail_label[for=${id}]`).removeClass('activeLabel');
  });

    /**
     * In checkbox, the label is part of the checkbox and has to be separated in an extra label
     */
    // TODO: When changing the checkbox, the original event has to be delegated to its child
    // const but = $('.powermail_field .checkbox input:required').addClass('changedCheckbox');
    // const butLabel = `<label class="changedLabel">${$(but).attr('value')}</label>`;
    // const butEvent = $('.powermail_field .checkbox input:required').parent('label').getScript();

    // $(but).parent('label').replaceWith($(but).parent('label').children());
    // $('.powermail_field .checkbox').children().last().after(butLabel);
});
