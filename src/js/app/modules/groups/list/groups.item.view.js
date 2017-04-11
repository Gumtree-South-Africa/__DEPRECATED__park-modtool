define(
  [
    'underscore',
    'jquery',
    'marionette',
    'bootstrap'
  ],
  function(_, $, Marionette) {
    'use strict';

    var GroupsItemView = Marionette.ItemView.extend({
      template: 'groups.item.hbs',
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
        this.trigger('group:remove', this.model);
      }

    });

    return GroupsItemView;
  }
);
