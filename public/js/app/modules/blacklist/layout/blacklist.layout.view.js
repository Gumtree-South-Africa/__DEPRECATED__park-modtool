define(
  [
    'marionette'
  ],
  function(Marionette) {
    'use strict';

    var BlacklistLayoutView = Marionette.Layout.extend({
      template: 'blacklist.layout.hbs',

      regions: {
        searchRegion: '#searchRegion',
        resultsRegion: '#resultsRegion',
        addWordRegion: '#addWordRegion'
      },

      events: {}
    });

    return BlacklistLayoutView;
  }
);
