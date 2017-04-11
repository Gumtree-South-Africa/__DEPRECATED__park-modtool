define(
  [
    'marionette'
  ],
  function (Marionette) {
    'use strict';

    var UserLayoutView = Marionette.Layout.extend({
      template: 'user.layout.hbs',

      regions: {
        filtersRegion: '#filtersRegion',
        resultsRegion: '#resultsRegion',
        paginationRegion: '#paginationRegion',
        colManagerRegion: '#colManagerRegion'
      },

      ui: {
          'blackout80': '.blackout-80',
          'customizeGridBtn': '#customizeGridBtn'
      },

      events: {
          'click @ui.customizeGridBtn': 'toggleCustomizeGridMenu'
      },

      toggleCustomizeGridMenu: function (event) {
          this.trigger('user:toggleCustomizeGridMenu');
      }

    });

    return UserLayoutView;
  }
);
