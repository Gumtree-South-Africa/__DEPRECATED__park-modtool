define(
  [
    'underscore',
    'jquery',
    'marionette',
    'app/entities/session.model',
    'bootstrap'
  ],
  function (_, $, Marionette, Session) {
    'use strict';

    var UserItemView = Marionette.ItemView.extend({
      template: 'user.item.hbs',
      tagName: 'tr',
      events: {
        'click .js-banUser': 'banUser',
        'click .js-activateUser': 'activateUser',
        'click .js-seeProfile': 'showProfile',
        'click .js-resetPassword': 'resetPassword'
      },

      /**
       * [initialize description]
       * @return {[type]} [description]
       */
      initialize: function () {
        _.bindAll(this);
        $('.tooltiped').tooltip();
      },

      /**
       * [activateUser trigger the event to unban the user]
       * @return {[type]} [description]
       */
      activateUser: function (e) {
        e.preventDefault();
        this.trigger('Users:activate', this.model);
      },

      /**
       * [resetPassword triggers the event to send a new password to the user]
       * @return {null}
       */
       resetPassword: function (e) {
         e.preventDefault();
         this.trigger('Users:resetPassword', this.model);
       },

      /**
       * [banUser description]
       * @return {[type]} [description]
       */
      banUser: function (e) {
        e.preventDefault();
        this.trigger('Users:ban', this.model);
      },

      /**
       * [showProfile description]
       * @return {[type]} [description]
       */
      showProfile: function (e) {
        e.preventDefault();

        var username = this.model.get('username'),
         webhost = Session.getHost().webappHost;

        window.open(webhost + '/profile/' + username, '_blank');
      }

    });

    return UserItemView;
  }
);
