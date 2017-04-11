define(
  [
    'jquery',
    'underscore',
    'backbone',
    'app/entities/session.model'
  ],
  function($, _, Backbone, Session) {
    'use strict';

    var ProductModel = Backbone.Model.extend({

      defaults: {
        id: '',
        name: '',
        description: '',
        pictureUrl: '',
        status: '',
        publishDate: '',
        countOfReports: '',
        publishedBy: ''
      }

    });

    return ProductModel;

  }
);