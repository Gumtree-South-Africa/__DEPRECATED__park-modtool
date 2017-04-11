define(
  [
    'jquery',
    'backbone',
    'marionette',
    'underscore'
  ],
  function ($, Backbone, Marionette, _) {
      'use strict';

      var ListItemView = Marionette.ItemView.extend({
          template: 'results.list.item.hbs',

          events: {
              'click #moderateItem': 'moderateItem',
              'click #deleteItem': 'deleteItem',
              'click .list-img': 'zoomInImage',
              'click #zoom-out-btn': 'zoomOutImage'
          },

          ui: {
              'zoomOutBtn': '#zoom-out-btn'
          },

          moderateItem: function () {
              this.trigger('moderateItemFromList', this.model.id);
          },

          deleteItem: function () {
              this.trigger('deleteItemFromList', this.model.id);
          },

          zoomInImage: function (event) {
              _.each(event.target.parentElement.parentElement.children, function (child) {
                  if (!$(child).find(event.target).is('img')) {
                      $(child).hide();
                  }
              });
              $(event.target.parentElement).css('width', '138px');
              $(event.target.parentElement).css('height', '138px');
              this.ui.zoomOutBtn.show();
          },

          zoomOutImage: function (event) {
              _.each(event.target.parentElement.parentElement.children, function (child) {
                  if($(child).is(':hidden')) {
                      $(child).show();
                  } else if ($(child).hasClass('list-image')) {
                        $(child).css('width', '68px');
                        $(child).css('height', '68px');
                  }
              });
              this.ui.zoomOutBtn.hide();
          }

});

    return ListItemView;

});
