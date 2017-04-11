define(
  [
    'backbone',
    'underscore',
    'jquery',
    'jquery-cookie'
  ],
  function(Backbone, _, $) {
    'use strict';

    var SessionModel = Backbone.Model.extend({
      defaults: {
        token: ''
      },

      initialize: function() {
        var token = $.cookie('token');

        $.getJSON('./config.json', _.bind(function(config) {
          this.host = config.host;
          this.vhost = config.vhost;
          this.webappHost = config.webappHost;
        }, this));

        if (token) {
          this.tokenSetup(token);
        }
      },

      tokenSetup: function(token) {
        this.set('token', token);

        $.ajaxSetup({
          headers: {
            'token': token
          }
        });
      },

      saveSession: function(token) {
        $.cookie('token', token);
        this.tokenSetup(token);
      },

      removeSession: function(token) {
        $.removeCookie('token');
      },

      setHost: function(host, vhost, webappHost) {
        this.host = host;
        this.vhost = vhost;
        this.webappHost = webappHost;
      },

      getHost: function() {
        return {
          host: this.host,
          vhost: this.vhost,
          webappHost: this.webappHost
        };
      }

    });

    return new SessionModel();

  }
);