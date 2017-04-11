define(
[
'jquery',
'underscore',
'marionette',
'./layout/product.layout.view',
'./list/product.list.view',
'../filter/filter.view',
'../pagination/pagination.view',
'../modal/confirm/confirm.modal.view',
'../modal/preview/preview.modal.view',
'../modal/info/info.modal.view',
'app/entities/product.collection',
'app/entities/product.filter.model',
'app/entities/session.model'
],
function ($, _, Marionette, ProductLayout, ProductListView, FiltersView, PaginationView,
    ConfirmModal, PreviewModal, InfoModal, ProductCollection, ProductFilterModel, Session) {
    'use strict';

    var ProductController = Marionette.Controller.extend({

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
            this.productsCollection = new ProductCollection();

            var filterModel = new ProductFilterModel(),
            filtersView = new FiltersView({
                entityName: 'product',
                model: filterModel
            }),
            resultsView = new ProductListView({
                collection: this.productsCollection
            });
            this.paginationView = new PaginationView({
                entityName: 'product',
                collection: this.productsCollection
            });

            this.layout = new ProductLayout();

            this.productsCollection.getFirstPage({ fetch: true, reset: true });

            App.contentRegion.show(this.layout);

            this.layout.filtersRegion.show(filtersView);
            this.layout.resultsRegion.show(resultsView);
            this.layout.paginationRegion.show(this.paginationView);

            //Products list event handlers
            this.listenTo(filtersView, 'product:applyFilter', this.applyFilter);
            this.listenTo(filtersView, 'product:cleanFilter', this.cleanFilter);
            this.listenTo(resultsView, 'itemview:product:approved', this.confirmApprove);
            this.listenTo(resultsView, 'itemview:product:remove', this.confirmRemove);
            this.listenTo(resultsView, 'itemview:product:showImagePreview', this.showImagePreview);
            //Pagination events handlers
            this.listenTo(this.paginationView, 'product:pagination:showFirstPage', this.showFirstPage);
            this.listenTo(this.paginationView, 'product:pagination:showLastPage', this.showLastPage);
            this.listenTo(this.paginationView, 'product:pagination:changePage', this.changePage);
            this.listenTo(this.paginationView, 'product:pagination:previewPage', this.changePage);
            this.listenTo(this.paginationView, 'product:pagination:nextPage', this.changePage);
        },

        /**
        * [changePage description]
        * @return {[type]} [description]
        */
        changePage: function (selectedPage) {
            var that = this;
            this.productsCollection.getPage(selectedPage - 1).done(function () {
                that.paginationView.render();
            });
        },

        /**
        * [showLastPage description]
        * @return {[type]} [description]
        */
        showLastPage: function () {
            var that = this;
            this.productsCollection.getLastPage().done(function () {
                that.paginationView.render();
            });
        },

        /**
        * [showFirstPage description]
        * @return {[type]} [description]
        */
        showFirstPage: function () {
            var that = this;
            this.productsCollection.getFirstPage().done(function () {
                that.paginationView.render();
            });
        },

        /**
        * [confirmRemove description]
        * @return {[type]} [description]
        */
        confirmRemove: function (view, itemModel) {
            var confirmModal = new ConfirmModal({
                title: 'Confirm deletion of item #' + itemModel.get('id'),
                question: 'Choose a reason to inform the user:',
                options: [
                    "Don't send",
                    'Duplicate',
                    'Photos from internet',
                    'Services',
                    'Make up',
                    'Animals',
                    'Commision',
                    'Advertising style',
                    'Wrong Price',
                    'Forbiden articles'
                ],
                confirm: _.bind(function (option) {
                    var url = Session.getHost().host + '/moderation/items/' + itemModel.get('id') + '/' + option;

                    $.ajax({
                        url: url,
                        type: 'DELETE',
                        success: _.bind(function (resp) {
                          if (resp.statusCode !== 1) {
                            var errorModal = new InfoModal({
                              title: 'Error',
                              message: 'The item you are trying to remove does not exist.'
                            });
                            App.modalRegion.show(errorModal);
                          }
                          var that = this;
                          this.productsCollection.getPage(this.productsCollection.state.selectPage - 1).done(function () {
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
        * [confirmApprove description]
        * @return {[type]} [description]
        */
        confirmApprove: function (view, itemModel) {
            var confirmModal = new ConfirmModal({
                title: 'Approve Item',
                question: 'Are you sure you want to approve this item?',
                confirm: _.bind(function () {
                    var url = Session.getHost().host + '/moderation/items/' + itemModel.get('id') + '/activate';

                    $.ajax({
                        url: url,
                        type: 'PUT',
                        success: _.bind(function (resp) {
                          if (resp.statusCode !== 1) {
                            var errorModal = new InfoModal({
                              title: 'Error',
                              message: 'The item you are trying to approve is not blacklisted.'
                            });
                            App.modalRegion.show(errorModal);
                          }
                          var that = this;
                          this.productsCollection.getPage(this.productsCollection.state.selectPage - 1, {reset: true}).done(function () {
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
            this.productsCollection.applyFilter(filterModel.get('values'));
        },

        /**
        * [cleanFilter description]
        * @param  {[type]} filterModel [description]
        * @return {[type]}             [description]
        */
        cleanFilter: function () {
            this.productsCollection.cleanFilter();
        },

        showImagePreview: function (view, image) {
            var previewModal = new PreviewModal({
                title: 'Image Preview',
                image: image,
                confirm: _.bind(function () {
                    console.log('done');
                }, this)
            });

            App.modalRegion.show(previewModal);
        }

    });

    return ProductController;
}
);
