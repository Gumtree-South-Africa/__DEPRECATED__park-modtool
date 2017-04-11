define(
  [
    'backbone',
    'marionette'
  ],
  function(Backbone, Marionette) {
    'use strict';

    var ProductLayoutView = Marionette.Layout.extend({
      template: 'product.layout.hbs',

      regions: {
        filtersRegion: '#filtersRegion',
        resultsRegion: Backbone.Marionette.Region.extend({
          el: '#resultsRegion',
        }),
        paginationRegion: '#paginationRegion'
      },

      events: {}
    });

    return ProductLayoutView;
  }
);
