define(
  [
    'backbone'
  ],
  function(Backbone) {
    'use strict';

    var BlacklistModel = Backbone.Model.extend({
      defaults: {
        word: ''
      }

    });

    return BlacklistModel;

  }
);