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

    var PreviewModalView = Marionette.ItemView.extend({
      template: 'preview.modal.hbs',
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

        this.confirmCallback = options.confirm;
        this.image = options.image;
      },

      /**
       * [onRender description]
       * @return {[type]} [description]
       */
      onRender: function() {
        var imgPlaceholder = this.$el.find('#imageContent');

        imgPlaceholder.append(this.image.clone());
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

    return PreviewModalView;
  }
);
