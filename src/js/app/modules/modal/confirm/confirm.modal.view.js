define(
  [
    'underscore',
    'jquery',
    'marionette',
    'templateregistry',
    'bootstrap'
  ],
  function (_, $, Marionette, JST) {
    'use strict';

    var ConfirmModalView = Marionette.ItemView.extend({
      template: 'confirm.modal.hbs',
      tagName: 'div',
      className: 'modal-dialog',

      events: {
        'click .js-confirm': 'confirmAction',
        'click .js-cancel': 'cancelAction',
        'click .modal-option': 'checkOption',
        'click .bn-del-group': 'deleteGroup'
      },

      ui: {
        'confirmButton': '.js-confirm',
        'body': '.modal-body'
      },

      /**
       * [initialize description]
       * @return {[type]} [description]
       */
      initialize: function (options) {
        _.bindAll(this);

        this.title = options.title;
        this.note = options.note;
        this.question = options.question;
        this.options = options.options;
        this.confirmCallback = options.confirm;
        this.cancelCallback = options.cancel;
      },

      onShow: function () {
        this.bindUIElements();
        if (this.options === undefined) {
          this.ui.confirmButton.attr('disabled', false);
        }
      },

      render: function () {
        var html = JST[this.template]({
          title: this.title,
          question: this.question,
          options: this.options,
          note: this.note
        });

        return this.$el.html(html);
      },

      /**
       * [confirmAction description]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      confirmAction: function (e) {
        if (this.confirmCallback) {
            var opt;
            if (this.options !== undefined) {
                opt = $('input[name="delete-options"]:checked').val();
            } else {
                opt = this.ui.body;
            }
          this.confirmCallback(opt);
        }
      },

      /**
       * [cancelAction description]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      cancelAction: function (e) {
        if (this.cancelCallback) {
          this.cancelCallback();
        }
      },

      checkOption: function () {
        this.ui.confirmButton.prop('disabled', false);
    },

    deleteGroup: function (event) {
        $(event.target.parentElement).remove();
    }

    });

    return ConfirmModalView;
  }
);
