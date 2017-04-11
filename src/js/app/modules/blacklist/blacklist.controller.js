define(
  [
    'jquery',
    'underscore',
    'marionette',
    './layout/blacklist.layout.view',
    './add/addWord.view',
    './search/search.view',
    './list/blacklist.list.view',
    '../modal/confirm/confirm.modal.view',
    '../modal/info/info.modal.view',
    'app/entities/blacklist.collection'
  ],
  function($, _,  Marionette, BlackListLayout, AddWordView, SearchView, BlackListView, ConfirmModal, InfoModal, BlacklistCollection) {
    'use strict';

    var BlacklistController = Marionette.Controller.extend({

      /**
       * [initialize description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      initialize: function(options) {
        this.router = options.router;
      },

      /**
       * [show description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      show: function() {
        this.blacklistCollection = new BlacklistCollection();
        this.layout = new BlackListLayout();

        var addWordView = new AddWordView(),
          searchView = new SearchView(),
          resultsView = new BlackListView({
            collection: this.blacklistCollection
          });

        this.blacklistCollection.getFirstPage({ fetch: true, reset: true });

        App.contentRegion.show(this.layout);

        this.layout.resultsRegion.show(resultsView);
        this.layout.searchRegion.show(searchView);
        this.layout.addWordRegion.show(addWordView);

        //Products list event handlers
        this.listenTo(searchView, 'blacklist:search', this.applySearch);
        this.listenTo(resultsView, 'itemview:blacklist:remove', this.confirmRemove);
        this.listenTo(addWordView, 'blacklist:addWord', this.confirmAdd);
      },

      /**
       * [confirmRemove description]
       * @return {[type]} [description]
       */
      confirmRemove: function(view, itemModel) {
        var confirmModal = new ConfirmModal({
          title: 'Remove Item',
          question: 'Are you sure you want to remove this word from the blacklists?',
          confirm: _.bind(function() {
            itemModel.destroy({
              success: _.bind(function() {
                this.blacklistCollection.getFirstPage({ reset: true });
              }, this)
            });
          }, this),
          cancel: function() {
            console.log('Operation canceled');
          }
        });

        App.modalRegion.show(confirmModal);
      },

      /**
       * [confirmApprove description]
       * @return {[type]} [description]
       */
      confirmAdd: function(word) {
        var filtered = _.filter(this.blacklistCollection.models, function(item) {
          return item.get('word').toLowerCase() === word;
        });

        if (filtered.length > 0) {
          var infoModal = new InfoModal({
            title: 'Info',
            message: 'The word you want to add, already exist.',
            confirm: function() {
              console.log('Word already exist: ', word);
            }
          });

          App.modalRegion.show(infoModal);
        } else {
          var confirmModal = new ConfirmModal({
            title: 'Add word',
            question: 'You are about to add "' + word + '" to the blacklist. Do you want to confirm?',
            note: 'Please be patient, the word might take some minutes to appear on the list.',
            confirm: _.bind(function() {
              this.blacklistCollection.create({ word: word }, {
                success: _.bind(function() {
                  this.blacklistCollection.getFirstPage({ reset: true });
                }, this)
              });
            }, this),
            cancel: function() {
              console.log('Operation canceled');
            }
          });

          App.modalRegion.show(confirmModal);
        }
      },

      applySearch: function(value) {
        value = value.toLowerCase();

        var filtered = _.filter(this.blacklistCollection.models, function(item) {
          return item.get('word').toLowerCase().indexOf(value) > -1;
        });

        var filteredCollection = new BlacklistCollection(filtered),
          filteredResultsView = new BlackListView({
            collection: filteredCollection
          });

        this.layout.resultsRegion.show(filteredResultsView);
        this.listenTo(filteredResultsView, 'itemview:blacklist:remove', this.confirmRemove);
      }

    });

    return BlacklistController;
  }
);
