define(
  [
    'backbone',
    'marionette',
    'underscore'
  ],
  function(Backbone, Marionette, _) {
    'use strict';

    var NotificationLayoutView = Marionette.Layout.extend({
      template: 'notification.layout.hbs',

      regions: {
        leftRegion: '#leftRegion',
        centerRegion: '#centerRegion',
        rightRegion: '#rightRegion'
      },

      ui: {
        'blackout-80': '.blackout-80'
      },

      events: {
      }

    });

    return NotificationLayoutView;
  }
);
