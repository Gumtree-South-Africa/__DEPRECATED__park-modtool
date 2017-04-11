define(
  [
    'backbone'
  ],
  function(Backbone) {
    'use strict';

    var FilterModel = Backbone.Model.extend({
      defaults: {
        values: {
          username: '',
          filter: '',
          description: ''
        },
        displayName: {
          filter1: 'description',
          filter2: 'username',
          filter3: 'filter'
        },
        statusArr: [
          'All',
          'BLACKLISTED',
          'FLAGGED',
          'ACTIVE',
          'SOLD',
          'EXPIRED',
          'NOT VERIFIED'
        ]
      },

      initialize: function() {
        this.defaults.values.username='';
        this.defaults.values.filter='';
        this.defaults.values.description='';
      }

    });

    return FilterModel;

  }
);