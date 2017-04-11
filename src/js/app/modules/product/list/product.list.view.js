define(
  [
    'underscore',
    'jquery',
    'marionette',
    './product.item',
    './noresults.view'
  ],
  function (_, $, Marionette, ProductItem, NoResultsView) {
    'use strict';

    var ProductListView = Marionette.CompositeView.extend({
      template: 'product.list.hbs',
      tagName: 'table',
      className: 'products-list table table-condensed',
      itemView: ProductItem,
      emptyView: NoResultsView
    });

    return ProductListView;
  }
);
