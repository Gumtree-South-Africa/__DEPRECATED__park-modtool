define(
  [
    'underscore',
    'jquery',
    'marionette'
  ],
  function(_, $, Marionette) {
    'use strict';

    var FiltersView = Marionette.ItemView.extend({
      template: 'filter.hbs',
      className: 'filters',
      events: {
        'click .js-addFilterValue': 'addFilterValue',
        'keypress .form-control': 'handleKeyPressed',
        'change .js-changeStatus': 'addFilterValue',
        'click .js-applyFilter': 'applyFilter',
        'click .js-removeTag': 'removeFilter',
        'click .js-cleanFilter': 'cleanFilters'
      },

      /**
       * [initialize description]
       * @return {[type]} [description]
       */
      initialize: function(options) {
        _.bindAll(this);

        this.entityName = options.entityName;
        this.model = options.model;
        this.listenTo(this.model, 'change', this.renderTags);

        $(document).scroll(function () {
          var y = $(this).scrollTop();
          if (y > 170) {
            $('.filteredData.active').fadeIn();
          } else {
            $('.filteredData.active').fadeOut();
          }
        });
      },

      /**
       * [addFilterValue description]
       * @param {[type]} e [description]
       */
      addFilterValue: function(e) {
        e.preventDefault();
        var inputField,
          key,
          value;

        if (e.currentTarget.tagName === 'SELECT') {
          inputField = $(e.currentTarget);
          value = inputField.val();
        } else {
          inputField = $(e.currentTarget).parent(".input-group").find('input');
          value = inputField.val();
          inputField.val('');
        }

        key = inputField.attr('name');

        if (key && value) {

          this.model.get('values')[key] = value;
          this.model.trigger('change');
        }
      },

      /**
       * [handleKeyPressed description]
       * @return {[type]} [description]
       */
      handleKeyPressed: function(e) {
        if (e.keyCode === 13) {
          this.addFilterValue(e);
        }
      },

      /**
       * [removeFilter description]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      removeFilter: function(e) {
        var $target = $(e.currentTarget),
          $root = $target.parent('.label'),
          keyToRemove = $root.attr('id').split('-')[1];

        $root.remove();

        this.model.get('values')[keyToRemove] = '';
        this.model.trigger('change');
      },

      /**
       * [cleanFilters description]
       * @return {[type]} [description]
       */
      cleanFilters: function(event) {
        event.preventDefault();

        var values = this.model.get('values');

        for (var i in values) {
          if (values.hasOwnProperty(i)) {
            values[i] = '';
          }
        }

        $('.filteredData').removeClass('active');
        this.model.trigger('change');
        this.trigger(this.entityName + ':cleanFilter');
        $('select').each(function(i, elem){
          elem.selectedIndex = 0;
        });
      },

      /**
       * [renderTags description]
       * @return {[type]} [description]
       */
      renderTags: function() {
        var tagStr = '',
          attributes = _.clone(this.model.get('values'));

        $('.tag-list').empty();

        for (var attr in attributes) {
          if (attributes.hasOwnProperty(attr) && attributes[attr]) {
            tagStr = '<span class="label label-default" id="tag-' + attr +'">' +
                        attributes[attr] +
                        '<a href="javascript:void(0)" class="close-tag js-removeTag">' +
                          '<span class="glyphicon glyphicon-remove"></span>' +
                        '</a>' +
                      '</span>';

            $('.tag-list').append(tagStr);
          }
        }
      },

      /**
       * [applyFilter description]
       * @return {[type]} [description]
       */
      applyFilter: function(event) {
        event.preventDefault();

        if (this.areTagsToApply()) {
          $('.filteredData').addClass('active');
          $('.tag-list .label')
            .removeClass('label-default')
            .addClass('label-success');

          this.trigger(this.entityName + ':applyFilter', this.model);
        } else {
          $('.filteredData').removeClass('active');
        }
      },

      /**
       * [areTagsToApply description]
       * @return {[type]} [description]
       */
      areTagsToApply: function() {
        var values = this.model.get('values');

        for (var i in values) {
          if (values.hasOwnProperty(i)) {
            if (values[i]) {
              return true;
            }
          }
        }

        return false;
      }

    });

    return FiltersView;
  }
);
