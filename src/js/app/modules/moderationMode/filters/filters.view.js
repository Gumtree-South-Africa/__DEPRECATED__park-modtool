define(
  [
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'jqDateTimePicker',
    'jquery-ui',
    'jqBootstrapValidation',
    'chosen'
  ],
  function ($, Backbone, Marionette, _, JQDateTimePicke, JQUI, Val, Chosen) {
      'use strict';

      var FiltersView = Marionette.ItemView.extend({
          template: 'filters.hbs',

          events: {
              'click #applyFilters': 'applyFilters',
              'click #clearLink': 'clearFilters',
              'change .filter-placeholder': 'changeFontColor',
              'change .filter-input': 'changeFilter',
              'change #stateFilter': 'changeState'
          },

          ui: {
              'username': '#userName',
              'category': '#categoryId',
              'title': '#name',
              'from': '#itemLastUpdatedFrom',
              'to': '#itemLastUpdatedTo',
              'description': '#description',
              'state': '#stateFilter',
              'city': '#cityFilter'
          },

          initialize: function (options) {
              this.categories = options.categories;
              this.filters = {};
          },

          render: function () {
              this.isClosed = false;

              this.triggerMethod("before:render", this);
              this.triggerMethod("item:before:render", this);

              var html = JST[this.template]({'categories': this.categories});

              this.$el.html(html);
              this.bindUIElements();

              this.triggerMethod("render", this);
              this.triggerMethod("item:rendered", this);

              return this;
          },

          onShow: function () {
              this.trigger('modMode.getCategories', this.ui.category);
              this.initDatePickers();
          },

          applyFilters: function (event) {
              this.trigger('modMode.applyFilters', this.filters);
          },

          clearFilters: function (event) {
              this.filters = {};
              this.ui.username.val('');
              this.ui.category.val('default');
              this.ui.title.val('');
              this.ui.from.val('');
              this.ui.to.val('');
              this.ui.to.attr('disabled', true);
              this.ui.description.val('');
              this.ui.state.val('default');
              this.clearCity();
              $('.filter-placeholder').css('color', '#bbb');
          },

          clearCity: function () {
              $('#cityFilter_chosen').hide();
            //   delete this.ui.city.chosen;
              this.ui.city.show();
              this.ui.city.empty();
              this.ui.city.append($('<option>', {value: 'default', text: 'All cities', selected: 'selected'}));
              this.ui.city.attr('disabled', true);
          },

          changeFilter: function (event) {
              var filterId = $(event.target).attr('id'),
              filterVal = $(event.target).val();
              if (['stateFilter', 'cityFilter', 'itemLastUpdatedFrom', 'itemLastUpdatedTo'].indexOf(filterId) === -1) {
                  if (filterVal !== 'default' && filterVal !== '') {
                      this.filters[filterId] = filterVal;
                  } else {
                      delete this.filters[filterId];
                  }
              }

          },

          changeFontColor: function (event) {
              var val = $(event.target).val();
              /* if val is not '' nor default, the font color gets darker.
                 (~ is the bitwise-NOT operator, since the binary representation of -1 consists of only 1's, it's complement is 0, which evaluates as false)
                 */
              $(event.target).css('color', (~['', 'default'].indexOf(val)) ? '#bbb' : '#777');
          },

          initDatePickers: function () {
              function getUnixTime(time) {
                  return time.getTime() / 1000 | 0;
              }

              this.ui.from.datetimepicker({
                  timepicker: false,
                  format: 'm/d/Y',
                  maxDate: 0,
                  onClose: _.bind(function (current, element) {
                      this.ui.to.val('');
                      if (element.val() !== '') {
                          this.ui.to.datetimepicker({
                              minDate: current
                          });
                          this.ui.to.removeAttr('disabled');
                          this.filters.itemLastUpdatedFrom = getUnixTime(new Date(current.toString().split('-')[0]));

                      } else {
                          this.ui.to.attr('disabled', 'disabled');
                      }
                  }, this)
              });

              this.ui.to.datetimepicker({
                  timepicker: false,
                  format: 'm/d/Y',
                  maxDate: 0,
                  onClose: _.bind(function (current, element) {
                      if (element.val() !== '') {
                          this.filters.itemLastUpdatedTo = getUnixTime(new Date(current.toString().split('-')[0]));
                      } else {
                      }
                  }, this)
              });
          },

          changeState: function (event) {
              this.clearCity();
              if (this.ui.state.val() !== 'default') {
                  this.trigger('modMode.getZipCodes', this.ui.state.val(), '', event.target);
              }

          },

          changeCity: function (event) {
              if (this.ui.city.val() !== 'default') {
                  $('.chosen-single').css('color', '#777');
                  this.trigger('modMode.getZipCodes', this.ui.state.val(), this.ui.city.val(), event.target);
              } else {
                  $('.chosen-single').css('color', '#bbb');

              }
          },

          setZipCodes: function (zipCodes) {
              this.filters.zipCodes = zipCodes;
          },

          enableCityFilter: function () {
              this.ui.city.attr('disabled', false);
          },

          createInputCities: function (cities) {
              var $defaultChoice = this.ui.city.find('option[selected]'),
              citiesElements = cities.reduce(function (elList, city) {
                  return elList + '<option value="' + city + '">' + city + '</option>';
              }, '');

              $(citiesElements).insertAfter($defaultChoice);
              var that = this;
              if (this.chosen === undefined) {

                  this.ui.city.chosen().change(function (event) {
                      that.changeCity(event);
                  });
                  this.chosen = true;
              } else {
                  this.ui.city.trigger('chosen:updated');
                  this.ui.city.hide();
                  $('#cityFilter_chosen').show();
              }
              $('#cityFilter_chosen').css('width', '100%');
          }

});

    return FiltersView;

});
