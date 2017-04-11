define(
  [
    'backbone'
  ],
  function(Backbone) {
    'use strict';

    var UserFilterModel = Backbone.Model.extend({
      defaults: {
        values: {
          username: '',
          status: '',
          email: '',
          statusArr:'',
          userVerified: ''
        },
        displayName: {
          filter1: 'username',
          filter2: 'email',
          filter3: 'status',
          filter4: 'userVerified'
        },
        statusArr: [
          'All',
          'BANNED',
          'ACTIVE',
          'LOCKED'
        ],
        verifiedArr: [
          'ALL',
          'VERIFIED',
          'NOT VERIFIED'
          ]
      },

      initialize: function() {
        this.defaults.values.username='';
        this.defaults.values.email='';
        this.defaults.values.status='';
        this.defaults.values.statusArr='';
        this.defaults.values.userVerified='';
      }

    });

    return UserFilterModel;

  }
);