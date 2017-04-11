define(
  [
    'backbone',
    'paginator',
    '../entities/blacklist.model',
    '../entities/session.model',
  ],
  function(Backbone, Paginator, BlacklistModel, Session) {
    'use strict';

    var BlackCollection = Backbone.PageableCollection.extend({

      model: BlacklistModel,

      state: {
        firstPage: 0,
        pageSize: 500
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
        var url = Session.getHost().host + '/moderation/blacklist';

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
        this.state.totalRecords = resp.data.amountWordsFound;
        this.state.totalPages = Math.ceil(resp.data.amountWordsFound / this.state.pageSize);
        this.state.lastPage = this.state.totalPages;

        return resp.data.words;
      },

    });

    return BlackCollection;

  }
);


/*"/blacklist GET
@RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value = "order", required = false) String order,
            @RequestParam(value = "description", required = false) String description*/
