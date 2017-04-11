define(
  [
    'backbone',
    'marionette'
  ],
  function(Backbone, Marionette) {
    'use strict';

    var GroupsLayoutView = Marionette.Layout.extend({
      template: 'groups.layout.hbs',

      regions: {
        filtersRegion: '#filtersRegion',
        resultsRegion: Backbone.Marionette.Region.extend({
          el: '#resultsRegion',
        }),
        paginationRegion: '#paginationRegion'
      },

      events: {}
    });

    return GroupsLayoutView;
  }
);
