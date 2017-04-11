define(
[
    'underscore',
    'jquery',
    'marionette',
    'app/entities/session.model',
    'bootstrap'
],
function (_, $, Marionette, Session) {
    'use strict';

    var ProductItemView = Marionette.ItemView.extend({
        template: 'product.item.hbs',
        tagName: 'tr',
        events: {
            'click .js-approveItem': 'approveItem',
            'click .js-removeItem': 'removeItem',
            'click .js-seePage': 'showPage',
            'click .js-showImagePreview': 'showImagePreview'
        },

        /**
        * [initialize description]
        * @return {[type]} [description]
        */
        initialize: function () {
            _.bindAll(this);
            $('.tooltiped').tooltip();
        },

        onRender: function () {
            var imgList = this.$el.find('img');

            $.each(imgList, function (key, img) {
                $('<img/>')
                .attr('src', $(img).attr('src'))
                .load(function () {
                    if (this.width < this.height) {
                        $(img).addClass('portrait');
                    }
                });
            });
        },

        /**
        * [approveItem description]
        * @return {[type]} [description]
        */
        approveItem: function (e) {
            e.preventDefault();
            this.trigger('product:approved', this.model);
        },

        /**
        * [removeItem description]
        * @return {[type]} [description]
        */
        removeItem: function (e) {
            e.preventDefault();
            this.trigger('product:remove', this.model);
        },

        showImagePreview: function (e) {
            var img = $(e.currentTarget).find('img');
            this.trigger('product:showImagePreview', img);
        },

        showPage: function (e) {
            e.preventDefault();

            var itemId = this.model.get('id'),
            itemName = this.model.get('name'),
            webhost = Session.getHost().webappHost.replace('/parkweb', '/');
            window.open(webhost + '/pr/c/' + itemName + '/' + itemId, '_blank');
        }

    });

    return ProductItemView;
}
);
