define(
  [
    'backbone'
  ],
  function(Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
      defaults: {
        username: '',
        picture: '',
        email: '',
        registrationDate: '',
        status: '',
        userVerified: ''
      }

    });

    return UserModel;

  }
);