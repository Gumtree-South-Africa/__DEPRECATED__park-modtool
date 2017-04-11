define(
  [
    'backbone'
  ],
  function(Backbone) {
    'use strict';

    var GroupModel = Backbone.Model.extend({
      defaults: {
        name: '',
        picture: ''
      }

    });

    return GroupModel;

  }
);