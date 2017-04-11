define(
  [
    'underscore',
    'jquery',
    'marionette',
    'bootstrap'
  ],
  function (_, $, Marionette) {
    'use strict';

    var NoResultsView = Marionette.ItemView.extend({
      template: 'noresults.hbs',
      tagName: 'div',
      className: 'no-results'
    });


    return NoResultsView;
  }
);
