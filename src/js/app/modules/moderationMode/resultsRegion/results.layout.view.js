define(
[
    'backbone',
    'marionette',
    'underscore',
    'app/modules/modal/confirm/confirm.modal.view',
    'app/modules/modal/info/info.modal.view',
    './item/results.item.view',
    './list/results.list.view',
    'app/entities/modMode.userItems.collection',
    'app/entities/session.model'
],
function (Backbone, Marionette, _, ConfirmModal, InfoModal, ItemView, ListView, ItemsCollection, Session) {
    'use strict';

    var ResultsLayoutView = Marionette.Layout.extend({
        template: 'results.layout.hbs',

        regions: {
            itemRegion: '#itemRegion',
            listRegion: '#itemListRegion'
        },

        ui: {
            'emptyView': '#modModeEmpty',
            'itemRegion': '#itemRegion',
            'itemListRegion': '#itemListRegion',
            'userItemsList': '#userItemsList'
        },

        initialize: function (options) {
            this.categories = options.categories;
        },

        hideEmptyMessage: function () {
            this.ui.emptyView.hide();
        },

        showEmptyMessage: function () {
            this.ui.itemRegion.hide();
            this.ui.userItemsList.hide();
            this.ui.emptyView.show();
        },

        showItem: function (item) {
            this.ui.itemRegion.show();
            this.itemView = new ItemView({'item': item, 'categories': this.categories});
            this.getRegion('itemRegion').show(this.itemView);
            this.itemView.bindUIElements();
            this.listenTo(this.itemView, 'modMode.skipItem', this.skipItem);
            this.listenTo(this.itemView, 'modMode.getNextItem', this.getNextItem);
            this.listenTo(this.itemView, 'modMode.getCategories', this.getCategories);
            this.listenTo(this.itemView, 'modMode.getItem', this.getItem);
        },

        showUserItemsList: function (user, item) {
            this.itemsCollection = new ItemsCollection({'user': user, 'item': item});
            var that = this;
            this.itemsCollection.fetch().done(function () {
                that.listView = new ListView({collection: that.itemsCollection});
                that.ui.userItemsList.show();
                that.getRegion('listRegion').show(that.listView);
                that.listView.bindUIElements();
                that.listenTo(that.listView, 'itemview:deleteItemFromList', that.deleteItemFromList);
                that.listenTo(that.listView, 'itemview:moderateItemFromList', that.moderateItemFromList);
            });
        },

        getNextItem: function () {
            this.trigger('modMode.getNextItem');
        },

        getItem: function (itemId) {
            this.trigger('modMode.getItem', itemId);
        },

        skipItem: function (skippedItem) {
            this.trigger('modMode.skipItem', skippedItem);
        },

        getCategories: function (selectElement) {
            this.trigger('modMode.getCategories', selectElement);
        },

        deleteItemFromList: function (parent, itemId) {
            var that = this;
            var confirmModal = new ConfirmModal({
                title: 'Confirm deletion of item #' + itemId,
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
                    var url = Session.getHost().host + '/moderation/items/' + itemId + '/' + option;
                    $.ajax({
                        url: url,
                        type: 'DELETE',
                        success: _.bind(function (resp) {
                          if (resp.statusCode === 1) {
                              that.itemsCollection.fetch();
                          } else {
                            var errorModal = new InfoModal({
                              title: 'Error',
                              message: 'An error occured while deleting the item, please try again.'
                            });
                            App.modalRegion.show(errorModal);
                          }
                        }, this),
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }, this),
                cancel: _.bind(function () {

                }, this)
            });

            App.modalRegion.show(confirmModal);
        },

        moderateItemFromList: function (parent, itemId) {
            var status = this.itemView.getStatus();
            this.trigger('modMode.switchToListItem', itemId, status);
        }

    });

    return ResultsLayoutView;
}
);
