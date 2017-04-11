define(
  [
    'jquery',
    'underscore',
    'marionette',
    './header.view',
    'app/entities/session.model'
  ],
  function($, _,  Marionette, HeaderView, Session) {
    'use strict';

    var HeaderController = Marionette.Controller.extend({

      /**
       * [initialize description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      initialize: function(options) {
        this.router = options.router;
      },

      /**
       * [show description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      show: function() {
        this.headerView = new HeaderView();

        App.headerRegion.show(this.headerView);
        this.listenTo(this.headerView, 'header:logout', this.logout);
      },

      /**
       * [changePage description]
       * @return {[type]} [description]
       */
      logout: function(token) {
        Session.removeSession();

        location.href = './login.html';
      }

    });

    return HeaderController;
  }
);
