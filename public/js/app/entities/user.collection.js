define(
  [
    'jquery',
    'underscore',
    'backbone',
    'paginator',
    '../entities/user.model',
    '../entities/session.model',
  ],
  function($, _, Backbone, Paginator, UserModel, Session) {
    'use strict';

    var UserCollection = Backbone.PageableCollection.extend({

      model: UserModel,

      state: {
        firstPage: 0,
        pageSize: 10
      },

      queryParams: {
        totalPages: null,
        totalRecords: null,
        sortKey: null,
        order: null,
        directions: null,
        pageSize: 'pageSize',
        currentPage: 'page'
      },

      url: function() {
        var url = Session.getHost().host + '/moderation/users';

        if (this.queryFilter) {
          return url + '?' + this.queryFilter;
        }

        return url;
      },

      reset: function(models, options) {
        options = options || {};

        if (!options.silent) {
            this.trigger('prereset', this, options);
        }

        Backbone.Collection.prototype.reset.call(this, models, options);
      },

      /**
       * [parseRecords description]
       * @param  {[type]} resp [description]
       * @return {[type]}      [description]
       */
      parseRecords: function (resp) {
        if (resp.data) {
          this.state.totalRecords = resp.data.amountUsersFound;
          this.state.totalPages = Math.ceil(resp.data.amountUsersFound / this.state.pageSize);
          this.state.lastPage = this.state.totalPages - 1;
          this.state.minPageSize = this.state.totalRecords - ((this.state.totalPages - 1 ) * this.state.pageSize);

          return resp.data.users;
        }

        return [];
      },

      /**
       * [applyFilter description]
       * @param  {[type]} filterSet [description]
       * @return {[type]}           [description]
       */
      applyFilter: function(filterSet) {
        this.queryFilter = $.param(this.removeEmptyParams(filterSet));
        this.getFirstPage({ reset: true });
      },

      /**
       * [cleanFilter description]
       * @param  {[type]} filterSet [description]
       * @return {[type]}           [description]
       */
      cleanFilter: function() {
        this.queryFilter = null;
        this.getFirstPage({ reset: true });
      },

      removeEmptyParams: function(filterSet) {
        var newObj = {};

        _.each(filterSet, function(value, key) {
          if (value !== '') {
            switch (key) {
              case 'userVerified':
                  switch (value) {
                     case 'VERIFIED': newObj[key] = true;
                               break;
                     case 'NOT VERIFIED': newObj[key] = false;
                               break;
                  }
                  break;
              default :
                  newObj[key] = value;
            }
          }
        });

        return newObj;
      }

    });

    return UserCollection;

  }
);
