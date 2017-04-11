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

    var ConfirmDiscardModalView = Marionette.ItemView.extend({
      template: 'confirmDiscard.modal.hbs',
      tagName: 'div',
      className: 'modal-dialog',

      events: {
        'click .js-cancel': 'cancelAction',
        'click .js-discard': 'discardAction',
        'click .js-confirm': 'confirmAction'
      },

      /**
       * [initialize description]
       * @return {[type]} [description]
       */
      initialize: function (options) {
        _.bindAll(this);

        this.templateParameters = {
            title: options.title,
            question: options.question,
            note: options.note,
            discardButton: options.discardButton,
            confirmButton: options.confirmButton
        };
        this.discardCallback = options.discard;
        this.confirmCallback = options.confirm;
        this.cancelCallback = options.cancel;
      },

      render: function () {
        this.isClosed = false;

        this.triggerMethod("before:render", this);
        this.triggerMethod("item:before:render", this);

        var html = JST[this.template](this.templateParameters);

        this.$el.html(html);
        this.bindUIElements();

        this.triggerMethod("render", this);
        this.triggerMethod("item:rendered", this);

        return this;
      },

      /**
       * [confirmAction description]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      confirmAction: function (event) {
        if (this.confirmCallback) {
          this.confirmCallback();
        }
      },

      discardAction: function (event) {
          if (this.discardCallback) {
              this.discardCallback();
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
      }

    });

    return ConfirmDiscardModalView;
  }
);
