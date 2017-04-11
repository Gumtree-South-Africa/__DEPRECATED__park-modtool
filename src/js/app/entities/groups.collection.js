define(
  [
    'backbone',
    'paginator',
    '../entities/group.model',
    '../entities/session.model',
  ],
  function(Backbone, Paginator, GroupsModel, Session) {
    'use strict';

    var GroupsCollection = Backbone.PageableCollection.extend({

      model: GroupsModel,

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
        //return '/modtool/temp/data/groups.mock.json';
        var url = Session.getHost().host + '/moderation/groups';

        if (this.queryFilter) {
          return url + '?' + this.queryFilter;
        }

        return url;
      },

      /**
       * [parseRecords description]
       * @param  {[type]} resp [description]
       * @return {[type]}      [description]
       */
      parseRecords: function (resp) {
        if (resp.data) {
          this.state.totalRecords = resp.data.totalGroupsFound;
          this.state.totalPages = Math.ceil(resp.data.totalGroupsFound / this.state.pageSize);
          this.state.lastPage = this.state.totalPages - 1;
          this.state.minPageSize = this.state.totalRecords - ((this.state.totalPages - 1 ) * this.state.pageSize);

          return resp.data.groups;
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
              if (key === 'userVerified'){
                if (value === 'ACTIVE') {
                  newObj[key] = true;
                }
                else {
                  if (value === 'NOT ACTIVE') {
                    newObj[key] = false;
                  }
                }
              }
              else {
                newObj[key] = value;
              }	
            }
        });

        return newObj;
      }

    });

    return GroupsCollection;

  }
);
