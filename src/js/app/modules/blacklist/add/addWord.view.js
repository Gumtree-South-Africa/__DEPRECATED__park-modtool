define(
  [
    'underscore',
    'jquery',
    'marionette',
    'bootstrap'
  ],
  function(_, $, Marionette) {
    'use strict';

    var AddWordView = Marionette.ItemView.extend({
      template: 'addWord.hbs',
      tagName: 'div',
      className: 'add-word',
      events: {
        'click .js-addWord': 'addWord'
      },

      /**
       * [initialize description]
       * @return {[type]} [description]
       */
      initialize: function() {
        _.bindAll(this);
        $('.tooltiped').tooltip();
      },

      /**
       * [approveItem description]
       * @return {[type]} [description]
       */
      addWord: function(e) {
        e.preventDefault();
        var newWord = $('#addWord').val();
        if (newWord) {
          this.trigger('blacklist:addWord', newWord);
          $('#addWord').val('');
        }
      }

    });

    return AddWordView;
  }
);
