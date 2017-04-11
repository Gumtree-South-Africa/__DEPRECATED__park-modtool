define(
  [
    'backbone'
  ],
  function(Backbone) {
    'use strict';

    var FilterModel = Backbone.Model.extend({
      defaults: {
        values: {
          creatorName: '',
          name: '',
          userVerified: ''
        },
        displayName: {
          filter1: 'creatorName',
          filter2: 'name',
          filter3: 'userVerified'
        },
        verifiedGroup: [
          'ALL',
          'ACTIVE',
          'NOT ACTIVE'
        ]
      },

      initialize: function() {
        this.defaults.values.creatorName='';
        this.defaults.values.name='';
        this.defaults.values.userVerified='';
      }

    });

    return FilterModel;

  }
);