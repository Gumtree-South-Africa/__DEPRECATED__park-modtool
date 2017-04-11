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
      template: 'results.noresults.hbs',
      className: 'no-results-div'
    });


    return NoResultsView;
  }
);
