define(
  [
    'underscore',
    'jquery',
    'marionette'
  ],
  function(_, $, Marionette) {
    'use strict';

    var SearchView = Marionette.ItemView.extend({
      template: 'search.hbs',
      className: 'filters search',
      events: {
        'keyup #searchWord': 'applySearch'
      },

      /**
       * [initialize description]
       * @return {[type]} [description]
       */
      initialize: function(options) {
        _.bindAll(this);
      },

      /**
       * [applyFilter description]
       * @return {[type]} [description]
       */
      applySearch: _.debounce(function(event) {
        event.preventDefault();
        this.trigger('blacklist:search', $(event.currentTarget).val());
      }, 300)

    });

    return SearchView;
  }
);
