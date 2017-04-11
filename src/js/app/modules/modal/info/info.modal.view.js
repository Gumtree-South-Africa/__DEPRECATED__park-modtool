define(
  [
    'underscore',
    'jquery',
    'marionette',
    'templateregistry',
    'bootstrap'
  ],
  function(_, $, Marionette, JST) {
    'use strict';

    var InfoModalView = Marionette.ItemView.extend({
      template: 'info.modal.hbs',
      tagName: 'div',
      className: 'modal-dialog',
      events: {
        'click .js-ok': 'confirmAction'
      },

      /**
       * [initialize description]
       * @return {[type]} [description]
       */
      initialize: function(options) {
        _.bindAll(this);

        this.title = options.title;
        this.message = options.message;
        this.confirmCallback = options.confirm;
      },

      render: function() {
        var html = JST[this.template]({
          title: this.title,
          message: this.message
        });

        return this.$el.html(html);
      },

      /**
       * [confirmAction description]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      confirmAction: function(e) {
        if (this.confirmCallback) {
          this.confirmCallback();
        }
      }

    });

    return InfoModalView;
  }
);
