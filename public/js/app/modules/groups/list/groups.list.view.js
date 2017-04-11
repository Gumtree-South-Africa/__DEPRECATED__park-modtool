define(
  [
    'underscore',
    'jquery',
    'marionette',
    './groups.item.view',
    './noresults.view'
  ],
  function(_, $, Marionette, GroupsItem, NoResultsView) {
    'use strict';

    var GroupsListView = Marionette.CompositeView.extend({
      template: 'groups.list.hbs',
      tagName: 'table',
      className: 'products-list groups table table-condensed',
      itemView: GroupsItem,
      emptyView: NoResultsView
    });

    return GroupsListView;
  }
);
