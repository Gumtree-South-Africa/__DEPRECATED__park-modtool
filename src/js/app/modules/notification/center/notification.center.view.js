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

      var NotificationCenterView = Marionette.Layout.extend({
          template: 'notification.center.hbs',

          /**
          Set events of region
          **/
          events: {
              'change #platform': 'eventSetPlatform',
              'change #sessionStatus': 'sendChangeNotification',
              'click .icon-remove-filter': 'eventRemoveFilter',
              'click #addCondition': 'addCondition',
              'change .jsYesNo': 'changeOptionYesNo',
              'change .option-filter': 'runEventSelect',
              'change .jsStates': 'changeState'
          },

          /**
          Set element DOM of region
          **/
          ui: {
              'userType': '#platform',
              'sessionType': '#sessionStatus',
              'filter': '#filter',
              'filterImg': '#filterImg',
              'filterUser': '#filterUser',
              'listCondition': '#listCondition',
              'addCondition': '#addCondition',
              'addFilterText': '#addFilterText'
          },

          initialize: function () {
              //I used this var for toggle option in select
              this.accountDate = '';
              this.categoryActiveItems = '';
              this.hasActiveItems = '';
              this.hasFacebook = '';
              this.hasTwitter = '';
              this.isVerified = '';
              this.isGroupOwner = '';
              this.zipCode = '';
              this.city = 'style="display:none;"';
              this.isGroupFollower = '';
              this.isMemberOfGroup = '';
              this.cities = [];
              this.sendChanged = false;
          },

          /**
          When client select one Target
          **/

          eventSetPlatform: function (e) {
              if (this.ui.sessionType[0].value !== 'default') {
                  this.sendChangeNotification(e);
              } else {
                  this.ui.sessionType.attr('disabled', false);
              }
          },

          sendChangeNotification: function (e) {
              e.preventDefault();
              var filter = {};
              filter[e.target.id] = e.target.value;
              this.trigger('notification:applyFilter', filter);
              this.trigger('notification:applyFilter', {'platform': this.ui.userType[0].value});
              if (e.target.value === 'no_session') {
                  this.disableFilters();
                  this.trigger('notification:disableFeedOption');
              }
              this.trigger('notification:getInformationPreFilter', e.target);
              this.trigger('notification:activeButtonSend');

          },

          enableAddFilter: function () {
              this.ui.filterImg.attr('src', '../img/icon_add_filter_default.png');
              this.ui.addFilterText.addClass('add-condition');
              if (!this.sendChanged) {
                  this.ui.filter.on('click', _.bind(this.addFilter, this));
                  this.sendChanged = true;
              }
          },

          disableAddFilter: function () {
              this.ui.filter.show();
              this.ui.filterUser.hide();
              this.ui.filterImg.attr('src', '../img/icon_add_filter_disabled.png');
              this.ui.addFilterText.removeClass('add-condition');
              if (this.sendChanged) {
                  this.ui.filter.unbind('click');
                  this.sendChanged = false;
              }
          },

          disableFilters: function () {
              var that = this;
              this.ui.listCondition.find('div.option-target').each(function () {
                  var id = $(this).find('.option-filter option:selected').val();
                  that.enableSelector(id);
                  that.removeFilterFromController(id);
                  if (id === 'zipCode' || id === 'city') {
                      that.stateSelected = '';
                      that.city = 'style="display:none;"';
                  }
              });
              this.ui.listCondition.empty();
              this.disableAddFilter();
          },

          addFilter: function () {
              this.ui.filter.hide();
              this.ui.filterUser.show();
              this.addCondition();

              $('.jsEvent').on('click', 'option', this.runEventSelect);
          },

          eventRemoveFilter: function (event) {
              event.preventDefault();
              event.target.parentNode.remove();

              //remove parameter from json
              var id = $(event.target.parentNode).find('.option-filter option:selected').val();
              this.enableSelector(id);
              this.removeFilter(id);
              if (id === 'zipCode') {
                  this.stateSelected = '';
                  this.city = 'style="display:none;"';
                  if ($('.chosen-container-single')[0] !== undefined) {
                      $('.chosen-container-single')[0].parentNode.parentNode.parentNode.remove();
                  }
              }
          },

          enableSelector: function (id) {
              //update var local elements remove disabled
              this[id] = '';
              $('[value="' + id + '"]').removeAttr('style');

              //show buttom condition
              if (this.ui.listCondition.find('li').length < 11) {
                  this.ui.addCondition.show();
              }
          },

          removeFilterFromController: function (id) {
              if (id === 'accountDate') {
                  this.trigger('notification:removeFilter', 'accountCreationFrom');
                  this.trigger('notification:removeFilter', 'accountCreationTo');
              } else if (id === 'city' && this.stateSelected !== '') {
                  this.trigger('notification:getZipCodes', this.stateSelected, '', $('#zipCode'));
              } else {
                  this.trigger('notification:removeFilter', id);
              }
          },

          removeFilter: function (id) {
              this.removeFilterFromController(id);
              this.trigger('notification:getInformationPreFilter');
          },

          resetFilter: function (selectedNode) {
              if (selectedNode !== undefined) {
                  if ((selectedNode.id === 'platform') ||
                    (selectedNode.id === 'categoryActiveItems') ||
                    (selectedNode.id === 'zipCode') ||
                    (selectedNode.id === 'sessionStatus')) {
                      selectedNode.value = 'default';
                      this.trigger('notification:removeFilter', selectedNode.id);
                  }
              }
          },

          addCondition: function (event) {
            //   event.preventDefault();
            console.log('add condition');
              var $element = this.ui.listCondition,
              idElement = $element.find('li').length;

              $element.append('<li id="iconCondition_' + idElement + '">' +
                  '<i class="icon-remove-filter"></i>' +
                  '<div class="option-target">' +
                      '<select class="option-filter form-control">' +
                          '<option value="" selected disabled>Select option...</option>' +
                          '<option ' + this.accountDate + ' data-event="setDates" value="accountDate">Account Creation Date</option>' +
                          '<option ' + this.categoryActiveItems + ' data-event="setCategory" value="categoryActiveItems">Category</option>' +
                          '<option ' + this.hasActiveItems + ' data-event="setSelectYesNo" value="hasActiveItems">User\'s Listings</option>' +
                          '<option ' + this.hasFacebook + ' data-event="setSelectYesNo" value="hasFacebook">User\'s linked facebook</option>' +
                          '<option ' + this.hasTwitter + ' data-event="setSelectYesNo" value="hasTwitter">User\'s linked twitter</option>' +
                          '<option ' + this.isVerified + ' data-event="setSelectYesNo" value="isVerified">User\'s verified email</option>' +
                          '<option ' + this.isGroupOwner + ' data-event="setSelectYesNo" value="isGroupOwner">User\'s created a group</option>' +
                          '<option ' + this.zipCode + ' data-event="setStates" value="zipCode">State</option>' +
                          '<option ' + this.city + ' data-event="setCities" value="city">City</option>' +
                          '<option ' + this.isGroupFollower + ' data-event="setSelectYesNo" value="isGroupFollower">User\'s following a group</option>' +
                          '<option ' + this.isMemberOfGroup + ' data-event="setGroups" value="isMemberOfGroup">User\'s suscribed to a group</option>' +
                      '</select>' +
                  '</div>' +
              '</li>');
              console.log(idElement);
              if (idElement === 10) {
                  this.ui.addCondition.hide();
              }

              this.trigger('notification:addCondition');

          },

          runEventSelect: function (event) {
              event.preventDefault();
              var elemParent = event.target.parentNode;
              var eventRun = $(event.target.selectedOptions).data('event');

              //disabled option in select
              $(event.target).attr('disabled', true);
              this[event.target.value] = 'style="display:none;"';
              $('[value="' + event.target.value + '"]').attr('style', 'display:none');

              this.removeElement(elemParent);
              this[eventRun](elemParent, event);
          },

          setDates: function (elemParent, event) {
              var that = this;
              Date.prototype.getUnixTime = function () {
                  return this.getTime() / 1000 | 0;
              };
              if(!Date.now) {
                Date.now = function () {
                  return new Date();
                };
              }
              Date.time = function () {
                  return Date.now().getUnixTime();
              };

              $('<div class="jsElements option-element controls">' +
              '<input class="date-account jsDatePickerFrom form-control" type="text" data-required-message="Please enter a date"/>' +
              '<span class="date-account-text">To</span>' +
              '<input class="date-account jsDatePickerTo form-control" type="text" disabled data-required-message="Please enter a date"/>' +
              '</div>').appendTo(elemParent);


              $(elemParent).find('.jsDatePickerFrom').datetimepicker({
                  timepicker: false,
                  format: 'm/d/Y',
                  maxDate: 0,
                  onClose: function (current, element) {
                      var elementDateTo = element.next().next();
                      elementDateTo.val('');
                      if (element.val() !== '') {
                          elementDateTo.datetimepicker({
                              minDate: current
                          });
                          elementDateTo.removeAttr('disabled');
                          that.trigger('notification:removeFilter', 'accountCreationTo');
                          that.trigger('notification:applyFilter', {'accountCreationFrom': new Date(current.toString().split('-')[0]).getUnixTime()});
                      } else {
                          elementDateTo.attr('disabled', 'disabled');
                          that.trigger('notification:removeFilter', 'accountCreationFrom');
                          that.trigger('notification:removeFilter', 'accountCreationTo');
                          that.trigger('notification:getInformationPreFilter');
                      }
                  }
              });

              $(elemParent).find('.jsDatePickerTo').datetimepicker({
                  timepicker: false,
                  format: 'm/d/Y',
                  maxDate: 0,
                  onClose: function (current, element) {
                      if (element.val() !== '') {
                          that.updateInfoFilter({'accountCreationTo': new Date(current.toString().split('-')[0]).getUnixTime()}, $(elemParent).find('.jsDatePickerTo'));
                      } else {
                          that.trigger('notification:removeFilter', 'accountCreationTo');
                          that.trigger('notification:getInformationPreFilter');
                      }
                  }
              });

              return true;
          },

          setSelectYesNo: function (elemParent, event) {
              var tagElement = {};
              tagElement[ event.target.value] = true;
              this.addSelectYesNo(elemParent, event.target.parentNode.parentNode.id);
              this.updateInfoFilter(tagElement, event.target);

              return true;
          },

          changeOptionYesNo: function (event) {
              var tagElement = {},
              id = $(event.target.dataset.creator).find('option:selected').val(),
              val = event.target.value;
              tagElement[id] = val;
              this.updateInfoFilter(tagElement, event.target);
          },

          /**
          run trigger for update information (method created in controller)
          **/
          updateInfoFilter: function (tagElement, target) {
              this.trigger('notification:applyFilter', tagElement);
              this.trigger('notification:getInformationPreFilter', target);
          },

          setCategory: function (parentNode, event) {
              return this.trigger('notification:getCategory', parentNode, event);
          },

          addSelectYesNo: function (elemParent, id) {
              this.removeElement(elemParent);

              $('<div class="jsElements option-element">' +
              '<select class="jsYesNo form-control" data-creator="#' + id + ' .option-filter">' +
              '<option value="true">Yes</option>' +
              '<option value="false">No</option>' +
              '</select>' +
              '</div>').appendTo(elemParent);
          },

          removeElement: function (elemParent) {
              $(elemParent).find('.jsElements').remove();
          },

          getUserTypeText: function () {
              return this.ui.userType.find('option:selected').text();
          },

          getErrorMessage: function () {
              if (this.ui.userType[0].value === 'default' || this.ui.sessionType[0].value === 'default') {
                  return 'set target';
              }
              return '';
          },

          createSelectCategory: function (resp, parentNode) {
              var that = this,
              options = '<option selected disabled value="default">Select Category...</option>';
              $.each(resp.data.categories, function () {
                  if (this.selectable) {
                      options = options + '<option value="' + this.id + '">' + this.name + '</option>';
                  }
              });

              $('<div class="jsElements option-element">' +
              '<select id="categoryActiveItems" class="form-control" data-creator="#' + parentNode.id + '_category"   data-required-message="Please select a category" >' +
              options +
              '</select>' +
              '</div>').appendTo($(parentNode));

              $('[data-creator="#' + parentNode.id + '_category"]').on('change', function (parentNode) {
                  that.updateInfoFilter({'categoryActiveItems': parentNode.target.value}, parentNode.target);
              });
          },

          setStates: function (elemParent, event) {
              this.removeElement(elemParent);

              $('<div class="jsElements option-element">' +
              '<select id="zipCode" class="jsStates form-control states" data-required-message="Please select a state">' +
              '<option value="default" selected disabled>Select State...</option>' +
              '<option value="AL">Alabama</option>' +
              '<option value="AK">Alaska</option>' +
              '<option value="AZ">Arizona</option>' +
              '<option value="AR">Arkansas</option>' +
              '<option value="CA">California</option>' +
              '<option value="CO">Colorado</option>' +
              '<option value="CT">Connecticut</option>' +
              '<option value="DE">Delaware</option>' +
              '<option value="FL">Florida</option>' +
              '<option value="GA">Georgia</option>' +
              '<option value="HI">Hawaii</option>' +
              '<option value="ID">Idaho</option>' +
              '<option value="IL">Illinois</option>' +
              '<option value="IN">Indiana</option>' +
              '<option value="IA">Iowa</option>' +
              '<option value="KS">Kansas</option>' +
              '<option value="KY">Kentucky</option>' +
              '<option value="LA">Louisiana</option>' +
              '<option value="ME">Maine</option>' +
              '<option value="MD">Maryland</option>' +
              '<option value="MA">Massachusetts</option>' +
              '<option value="MI">Michigan</option>' +
              '<option value="MN">Minnesota</option>' +
              '<option value="MS">Mississippi</option>' +
              '<option value="MO">Missouri</option>' +
              '<option value="MT">Montana</option>' +
              '<option value="NE">Nebraska</option>' +
              '<option value="NV">Nevada</option>' +
              '<option value="NH">New Hampshire</option>' +
              '<option value="NJ">New Jersey</option>' +
              '<option value="NM">New Mexico</option>' +
              '<option value="NY">New York</option>' +
              '<option value="NC">North Carolina</option>' +
              '<option value="ND">North Dakota</option>' +
              '<option value="OH">Ohio</option>' +
              '<option value="OK">Oklahoma</option>' +
              '<option value="OR">Oregon</option>' +
              '<option value="PA">Pennsylvania</option>' +
              '<option value="RI">Rhode Island</option>' +
              '<option value="SC">South Carolina</option>' +
              '<option value="SD">South Dakota</option>' +
              '<option value="TN">Tennessee</option>' +
              '<option value="TX">Texas</option>' +
              '<option value="UT">Utah</option>' +
              '<option value="VT">Vermont</option>' +
              '<option value="VA">Virginia</option>' +
              '<option value="WA">Washington</option>' +
              '<option value="WV">West Virginia</option>' +
              '<option value="WI">Wisconsin</option>' +
              '<option value="WY">Wyoming</option>' +
              '</select>' +
              '</div>').appendTo(elemParent);

              return true;
          },

          changeState: function (event) {
              if (this.ui.errorSection !== undefined) {
                  this.ui.errorSection.hide();
              }
              this.stateSelected = event.target.value;
              this.trigger('notification:getZipCodes', event.target.value, '', event.target);
          },

          addCityFilterOption: function () {
              if ($('#js_citiesSelect_chosen')[0] !== undefined) {
                  var parent = $('#js_citiesSelect_chosen')[0].parentNode.parentNode;
                  $('#js_citiesSelect_chosen')[0].parentNode.remove();
                  this.trigger('notification:getCities', this.stateSelected, parent);
              } else {
                  this.enableSelector('city');
              }
          },

          setCities: function (elemParent, event) {
              this.removeElement(elemParent);
              return this.trigger('notification:getCities', this.stateSelected, elemParent);
          },

          createInputCities: function (cities, elemParent) {
              var that = this,
              options = '<option selected disabled value="default">Select City...</option>';
              $.each(cities, function () {
                  options = options + '<option value="' + this + '">' + this + '</option>';
              });

              $('<div class="jsElements option-element">' +
              '<select id="js-citiesSelect" data-required-message="Please select a city" >' +
              options +
              '</select>' +
              '</div>').appendTo($(elemParent));
              $('#js-citiesSelect').chosen().change(function (event) {
                  that.changeCity(event);
              });
          },

          changeCity: function (event) {
              this.trigger('notification:getZipCodes', this.stateSelected, event.target.value, event.target);
          },

          setGroups: function (elemParent, event) {
              this.removeElement(elemParent);
              return this.trigger('notification:getGroups', elemParent);
          },

          createInputGroups: function (groups, elemParent) {
              var that = this,
              options = '<option selected disabled value="default">Select Group...</option>';
              _.each(groups, function (group) {
                  options = options + '<option value="' + group.id + '">' + group.name + '</option>';
              });

              $('<div class="jsElements option-element">' +
              '<select id="js-groupsSelect" data-required-message="Please select a group" >' +
              options +
              '</select>' +
              '</div>').appendTo($(elemParent));
              $('#js-groupsSelect').chosen().change(function (event) {
                  that.changeGroup(event);
              });
          },

          changeGroup: function (event) {
              console.log(event.target.value);
              this.updateInfoFilter({'isMemberOfGroup': event.target.value}, event.target.parentNode);
          },

          disabledElements: function () {
              this.ui.userType.attr('disabled', 'true');
              this.ui.listCondition.find('select, input').each(function () {
                  $(this).attr('disabled', 'true');
              });
              this.ui.addCondition.hide();
          }

      });

      return NotificationCenterView;
  }
);
