define(
  [
    'jquery',
    'underscore',
    'backbone',
    'paginator',
    '../entities/product.model',
    '../entities/session.model',
  ],
  function($, _, Backbone, Paginator, ProductModel, Session) {
    'use strict';

    var ProductCollection = Backbone.PageableCollection.extend({

      model: ProductModel,

      state: {
        firstPage: 0,
        pageSize: 10
      },

      queryParams: {
        totalPages: null,
        totalRecords: null,
        sortKey: null,
        order: null,
        pageSize: 'pageSize',
        currentPage: 'page'
      },

      url: function() {
        var url = Session.getHost().host + '/moderation/items';

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
          this.state.totalRecords = resp.data.amountItemsFound;
          this.state.totalPages = Math.ceil(resp.data.amountItemsFound / this.state.pageSize);
          this.state.lastPage = this.state.totalPages - 1;
          this.state.minPageSize = this.state.totalRecords - ((this.state.totalPages - 1 ) * this.state.pageSize);

          return resp.data.items;
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
            if (value === 'NOT VERIFIED'){
              newObj[key] = 'NOT_VERIFIED';                  
            }
            else {
              newObj[key] = value;
            }
          }
        });

        return newObj;
      }

    });

    return ProductCollection;

  }
);
