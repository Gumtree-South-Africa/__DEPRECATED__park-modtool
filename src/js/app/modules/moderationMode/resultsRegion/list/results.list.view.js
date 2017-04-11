define(
  [
    'underscore',
    'jquery',
    'marionette',
    './results.list.item.view',
    './noresults.view'
  ],
  function (_, $, Marionette, ListItem, NoResultsView) {
    'use strict';

    var ProductListView = Marionette.CompositeView.extend({
      template: 'results.list.hbs',
      tagName: 'div',
      className: 'user-items-list',

      itemView: ListItem,
      emptyView: NoResultsView,

      initialize: function (options) {
          this.collection = options.collection;
      },

      onRender: function () {
          $('#totalOfItems').text(this.collection.totalOfItems);
      }
    });

    return ProductListView;
  }
);
