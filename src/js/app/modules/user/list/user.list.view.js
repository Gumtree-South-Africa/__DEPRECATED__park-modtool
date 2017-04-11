define(
  [
    'underscore',
    'jquery',
    'marionette',
    './user.item',
    './noresults.view'
  ],
  function (_, $, Marionette, UserItem, NoResultsView) {
    'use strict';

    var UserListView = Marionette.CompositeView.extend({
      template: 'user.list.hbs',
      tagName: 'table',
      id: 'usersTable',
      className: 'products-list table table-condensed',
      itemView: UserItem,
      emptyView: NoResultsView
    });

    return UserListView;
  }
);
