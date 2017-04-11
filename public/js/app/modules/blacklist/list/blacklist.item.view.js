define(
  [
    'underscore',
    'jquery',
    'marionette',
    'bootstrap'
  ],
  function(_, $, Marionette) {
    'use strict';

    var BlacklistItemView = Marionette.ItemView.extend({
      template: 'blacklist.item.hbs',
      tagName: 'tr',
      events: {
        'click .js-removeItem': 'removeItem'
      },

      /**
       * [initialize description]
       * @return {[type]} [description]
       */
      initialize: function() {
        _.bindAll(this);
        $('.tooltiped').tooltip();
      },
      /**
       * [removeItem description]
       * @return {[type]} [description]
       */
      removeItem: function(e) {
        e.preventDefault();
        this.trigger('blacklist:remove', this.model);
      }

    });

    return BlacklistItemView;
  }
);
