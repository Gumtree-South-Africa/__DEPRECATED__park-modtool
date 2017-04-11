define(
  [
    'jquery',
    'underscore',
    'marionette',
    'templateregistry',
    'app/entities/session.model'
  ],
  function($, _, Marionette, JST, Session) {
    'use strict';

    var HeaderView = Marionette.ItemView.extend({
      template: 'header.hbs',
      events: {
        'click .logout': 'doLogout'
      },

      /**
       * [doLogout description]
       * @return {[type]} [description]
       */
      doLogout: function() {
        $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: Session.getHost().host + '/moderation/signout',
          data: {},
          success: _.bind(function(resp) {
            this.trigger('header:logout');
          }, this),
          error: this.onLogoutError
        });
      },

      /**
       * [onLogoutError description]
       * @param  {[type]} error [description]
       * @return {[type]}       [description]
       */
      onLogoutError: function(error) {
        console.log(error);
      }

    });

    return HeaderView;
  }
);
