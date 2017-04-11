define(
[
'jquery',
'marionette',
'templateregistry'
],
function($, Marionette, JST) {
    'use strict';

    var PaginationView = Marionette.ItemView.extend({
        template: 'pagination.hbs',
        events: {
            'click .js-showFirstPage': 'showFirstPage',
            'click .js-showLastPage': 'showLastPage',
            'click .js-changePage': 'changePage',
            'click .js-previewPage': 'previewPage',
            'click .js-nextPage': 'nextPage'
        },

        /**
        * [initialize description]
        * @param  {[type]} collection [description]
        * @return {[type]}            [description]
        */
        initialize: function(options) {
            this.entityName = options.entityName;
            this.collection = options.collection;
            this.listenTo(this.collection, 'reset', this.render);
        },

        /**
        * [render description]
        * @return {[type]} [description]
        */
        render: function() {
            if (this.collection.models.length >= 0) {
                this.collection.state.arrPages = this.renderPages(this.collection.state.totalPages);
                var html = JST[this.template](this.collection.state);

                return this.$el.html(html);
            }
        },

        renderPages: function(tp){
            this.collection.state.selectPage = this.collection.state.currentPage + 1;
            var cp = this.collection.state.currentPage;
            this.collection.state.viewElements = this.collection.models.length + cp * 10;
            var ps = this.collection.state.pageSize;
            var start = (cp < ps) ? 1 : (cp - 5);
            var finish = ((start + ps) > tp) ? tp : start + ps - 1;
            var window = finish - start;
            var data=[];
            for (var i=0; i <= window; i++) {
                data[i] = start + i;
            }
            return data;
        },

        /**
        * [changePage description]
        * @return {[type]} [description]
        */
        changePage: function(e) {
            var selectedPage = $(e.currentTarget).data('page');
            this.trigger(this.entityName + ':pagination:changePage', selectedPage);
            //this.activateButton(e.currentTarget);
        },

        previewPage: function(e) {
            var selectedPage = this.$el.find('.active').data('page');
            if (selectedPage > 1) {
                this.trigger(this.entityName + ':pagination:changePage', selectedPage-1 );
            }
        },

        nextPage: function(e) {
            var selectedPage = this.$el.find('.active').data('page');

            if (selectedPage < this.collection.state.totalPages) {
                this.trigger(this.entityName + ':pagination:changePage', selectedPage+1 );
            }
        },
        /**
        * [showFirstPage description]
        * @return {[type]} [description]
        */
        showFirstPage: function(e) {
            //this.activateButton(e.currentTarget);
            // this.trigger(this.entityName + ':pagination:showFirstPage');
            this.trigger(this.entityName + ':pagination:changePage', 1);
        },

        /**
        * [showLastPage description]
        * @return {[type]} [description]
        */
        showLastPage: function(e) {
            //this.activateButton(e.currentTarget);
            // this.trigger(this.entityName + ':pagination:showLastPage');
            this.trigger(this.entityName + ':pagination:changePage', this.collection.state.totalPages);
        },

        activateButton: function(target) {
            this.$el.find('.active').removeClass('active');
            $(target).addClass('active');
        }

    });

    return PaginationView;
}
);
