define(
  [
    'jquery',
    'underscore',
    'backbone',
    'app/entities/session.model'
  ],
  function($, _, Backbone, Session) {
    'use strict';

    var NotificationModel = Backbone.Model.extend({

      defaults: {
        contentText: 100
      }

    });

    return NotificationModel;

  }
);