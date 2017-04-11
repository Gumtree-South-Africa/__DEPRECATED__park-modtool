define(
  [
    'jquery',
    'underscore',
    'marionette',
    './layout/groups.layout.view',
    './list/groups.list.view',
    'app/entities/groups.collection',
    '../pagination/pagination.view',
    '../filter/filter.view',
    'app/entities/group.filter.model',
    '../modal/confirm/confirm.modal.view',
    '../modal/info/info.modal.view',
    'app/entities/session.model'
  ],
  function ($, _, Marionette, GroupsLayout, GroupsListView,
    GroupsCollection, PaginationView, FiltersView, GroupFilterModel, ConfirmModal, InfoModal, Session) {
    'use strict';

    var GroupsController = Marionette.Controller.extend({

      /**
       * [initialize description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      initialize: function (options) {
        this.router = options.router;
      },

      /**
       * [show description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      show: function () {
        this.groupsCollection = new GroupsCollection();
        this.layout = new GroupsLayout();

        var filterModel = new GroupFilterModel(),
          filtersView = new FiltersView({
            entityName: 'group',
            model : filterModel
          }),
          resultsView = new GroupsListView({
            collection: this.groupsCollection
          });
        this.paginationView = new PaginationView({
            entityName: 'group',
            collection: this.groupsCollection
          });

        this.groupsCollection.getFirstPage({ fetch: true, reset: true });

        App.contentRegion.show(this.layout);

        this.layout.resultsRegion.show(resultsView);
        this.layout.filtersRegion.show(filtersView);
        this.layout.paginationRegion.show(this.paginationView);

        //Products list event handlers
        this.listenTo(filtersView, 'group:applyFilter', this.applyFilter);
        this.listenTo(filtersView, 'group:cleanFilter', this.cleanFilter);
        this.listenTo(resultsView, 'itemview:group:remove', this.confirmRemove);

        //Pagination events handlers
        this.listenTo(this.paginationView, 'group:pagination:changePage', this.changePage);
      },

      /**
       * [changePage description]
       * @return {[type]} [description]
       */
      changePage: function (selectedPage) {
        var that = this;
        this.groupsCollection.getPage(selectedPage - 1).done(function () {
          that.paginationView.render();
        });
      },

      /**
       * [confirmRemove description]
       * @return {[type]} [description]
       */
      confirmRemove: function (view, itemModel) {
        var confirmModal = new ConfirmModal({
          title: 'Remove Item',
          question: 'Are you sure you want to remove this group from the list?',
          confirm: _.bind(function (option) {
              var url = Session.getHost().host + '/moderation/groups/' + itemModel.get('id');

              $.ajax({
                  url: url,
                  type: 'DELETE',
                  success: _.bind(function (resp) {
                    if (resp.statusCode !== 1) {
                      var errorModal = new InfoModal({
                        title: 'Error',
                        message: 'The group you are trying to remove does not exist.'
                      });
                      App.modalRegion.show(errorModal);
                    }
                    var that = this;
                    this.groupsCollection.getPage(this.groupsCollection.state.selectPage - 1).done(function () {
                        that.paginationView.render();
                    });
                  }, this),
                  error: function (err) {
                      console.log(err);
                  }
              });
          }, this),
          cancel: function () {
            console.log('Operation canceled');
          }
        });

        App.modalRegion.show(confirmModal);
      },

      /**
       * [applyFilter description]
       * @param  {[type]} filterModel [description]
       * @return {[type]}             [description]
       */
      applyFilter: function (filterModel) {
        this.groupsCollection.applyFilter(filterModel.get('values'));
      },

      /**
       * [cleanFilter description]
       * @param  {[type]} filterModel [description]
       * @return {[type]}             [description]
       */
      cleanFilter: function () {
        this.groupsCollection.cleanFilter();
      }

    });

    return GroupsController;
  }
);
