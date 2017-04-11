define(
  [
    'underscore',
    'jquery',
    'marionette',
    './blacklist.item.view',
    './noresults.view'
  ],
  function(_, $, Marionette, BlacklistItem, NoResultsView) {
    'use strict';

    var BlackListView = Marionette.CompositeView.extend({
      template: 'blacklist.list.hbs',
      tagName: 'table',
      className: 'products-list blacklist table table-condensed',
      itemView: BlacklistItem,
      emptyView: NoResultsView
    });

    return BlackListView;
  }
);
