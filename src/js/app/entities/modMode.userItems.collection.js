define(
[
    'backbone',
    '../entities/modMode.userItem.model',
    '../entities/session.model'
],
function (Backbone, ItemModel, Session) {
    'use strict';

    var ModModeUserItemsCollection = Backbone.Collection.extend({

        model: ItemModel,

        initialize: function (options) {
            this.user = options.user;
            this.item = options.item;
        },

        url: function () {
            var url = Session.getHost().host + '/moderationMode/' + this.user + '/' + this.item;
            return url;
        },

        parse: function (resp) {
            if (resp.data) {
                this.totalOfItems = resp.data.totalOfItems;
                return resp.data.items;
            }
            return [];
        }

    });

    return ModModeUserItemsCollection;

}
);
