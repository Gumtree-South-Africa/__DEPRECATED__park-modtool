define(
[
'jquery',
'underscore',
'marionette',
'./layout/notification.layout.view',
'./left/notification.left.view',
'./center/notification.center.view',
'./right/notification.right.view',
'app/entities/notification.model',
'app/entities/session.model'
],
function ($, _, Marionette, NotificationLayout, NotificationLeft,
NotificationCenter, NotificationRight, NotificationModel, Session) {
'use strict';

    var NotificationController = Marionette.Controller.extend({

        /**
        * [initialize description]
        * @param  {[type]} options [description]
        * @return {[type]}         [description]
        */
        initialize: function (options) {
            this.router = options.router;
            this.parameters = {};
            this.errorCategory = false;
        },

        /**
        * [show description]
        * @param  {[type]} options [description]
        * @return {[type]}         [description]
        */
        show: function () {
            this.parameters = {};
            this.layout = new NotificationLayout();
            this.rightRegion = new NotificationRight();
            this.leftRegion = new NotificationLeft({rightRegion: this.rightRegion.$el});
            this.centerRegion = new NotificationCenter();

            App.contentRegion.show(this.layout);

            this.layout.leftRegion.show(this.leftRegion);
            this.layout.centerRegion.show(this.centerRegion);
            this.layout.rightRegion.show(this.rightRegion);


            this.listenTo(this.centerRegion, 'notification:applyFilter', this.applyFilter);
            this.listenTo(this.centerRegion, 'notification:removeFilter', this.removeFilter);
            this.listenTo(this.centerRegion, 'notification:showElementRight', this.showElementRight);
            this.listenTo(this.centerRegion, 'notification:getInformationPreFilter', this.getInformationPreFilter);
            this.listenTo(this.centerRegion, 'notification:getCategory', this.getCategory);
            this.listenTo(this.centerRegion, 'notification:getZipCodes', this.getZipCodes);
            this.listenTo(this.centerRegion, 'notification:getCities', this.getCities);
            this.listenTo(this.centerRegion, 'notification:getGroups', this.getGroups);
            this.listenTo(this.centerRegion, 'notification:addCondition', this.addCondition);
            this.listenTo(this.centerRegion, 'notification:disableFeedOption', this.disableFeedOption);

            this.listenTo(this.leftRegion, 'notification:updatetitleReceivers', this.updatetitleReceivers);

            this.listenTo(this.rightRegion, 'notification:sendInformation', this.sendInformation);

            this.listenTo(this.leftRegion, 'notification:activeButtonSend', this.activeButtonSend);
            this.listenTo(this.centerRegion, 'notification:activeButtonSend', this.activeButtonSend);
            this.listenTo(this.rightRegion, 'notification:activeButtonSend', this.activeButtonSend);

            this.listenTo(this.rightRegion, 'notification:newNotification', this.newNotification);

            this.updateMessageClient();
        },

        applyFilter: function (elem) {
            $.extend(this.parameters, elem);
        },

        removeFilter: function (id) {
            delete this.parameters[id];
        },

        showElementRight: function () {
            this.rightRegion.showElement();
        },

        updateMessageClient: function () {
            var message = '';
            if (this.leftRegion.getErrorMessage() !== '') {
                message = this.leftRegion.getErrorMessage();
            }
            if (this.centerRegion.getErrorMessage() !== '') {
                message = ((message !== '') ? (message + ', ') : '') + this.centerRegion.getErrorMessage();
            }
            if (this.rightRegion.getErrorMessage() !== '') {
                message = ((message !== '') ? (message + ', ') : '') + this.rightRegion.getErrorMessage();
            }

            this.rightRegion.updateMessageClient(message);
        },

        addCondition: function () {
            this.rightRegion.hideErrors();
        },

        disableFeedOption: function () {
            this.leftRegion.disableFeedOption();
        },

        updatetitleReceivers: function (state) {
            this.rightRegion.updatetitleReceivers(state);
        },

        activeButtonSend: function () {
            var emptyMessage = this.leftRegion.$el.find('#notificationMessage').val().length,
            targetAudience = (this.centerRegion.ui.userType[0].value !== 'default') && (this.centerRegion.ui.sessionType[0].value !== 'default');
            this.updateMessageClient();
            this.rightRegion.activeButton(((emptyMessage > 9) && (emptyMessage < 101)), targetAudience);
        },

        getInformationPreFilter: function (selectNode) {
            $.ajax({
                url: Session.getHost().host + '/moderation/users/notify/preFilter',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(this.parameters),
                beforeSend : _.bind(function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    this.showElementRight();
                }, this),
                success: _.bind(function (resp) {
                    if (resp.statusCode === 1) {
                        if (selectNode !== undefined) {
                            if (selectNode.id === 'sessionStatus') {
                                if (selectNode.value !== 'no_session') {
                                    this.centerRegion.enableAddFilter();
                                    this.leftRegion.enableFeedOption();
                                }
                            }
                        }
                        if (!this.errorCategory) {
                            this.rightRegion.hideErrors();
                            this.errorCategory = false;
                        }
                        this.rightRegion.updateUserTexts(resp.data.receivers, this.centerRegion.getUserTypeText());
                    } else {
                        this.centerRegion.resetFilter(selectNode);
                        this.rightRegion.showError('An error has occurred while calculating the amount of users. Please try again.');
                    }
                }, this),
                complete: _.bind(function () {
                    this.rightRegion.hideElement();
                }, this),
                error: _.bind(function (err) {
                    this.centerRegion.resetFilter(selectNode);
                    this.rightRegion.showError('An error has occurred while calculating the amount of users. Please try again.');
                }, this)
            });
        },

        sendInformation: function () {
            // TODO: cambiar esto, no puede llamarse applyFilter cuando en realidad esta agregando parametros.
            this.applyFilter({'message': (this.leftRegion.getMessage())});
            this.applyFilter({'onlyPush': this.leftRegion.getOnlyPush()});

            var data = this.parameters;

            $.ajax({
                url: Session.getHost().host + '/moderation/users/notify',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify(data),
                type: 'POST',
                beforeSend : function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                },
                success: _.bind(function (resp) {
                    if (resp.statusCode === 1) {
                        this.rightRegion.setSuccessInfo(resp.data.receivers, resp.data.pushConfirmed);
                    } else {
                        this.rightRegion.showError('An error has occurred while sending the notification. Please try again.');
                        this.rightRegion.showRetry();
                        console.log(resp.statusMessage);
                    }
                }, this),
                complete: _.bind(function () {
                    this.rightRegion.hideElement();
                    this.layout.ui['blackout-80'].show();
                }, this),
                error: _.bind(function (err) {
                    this.rightRegion.showError('An error has occurred while sending the notification. Please try again.');
                    this.rightRegion.showRetry();
                }, this)
            });
        },

        getCategory: function (parentNode, event) {
            $.ajax({
                url: Session.getHost().host + '/public/categories/v3',
                dataType: 'json',
                type: 'GET',
                beforeSend : _.bind(function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }, this),
                success: _.bind(function (resp) {
                    if (resp.statusCode === 1) {
                        this.centerRegion.createSelectCategory(resp, parentNode);
                        this.errorCategory = false;
                    } else {
                        event.target.parentNode.parentNode.remove();
                        this.centerRegion.enableSelector('categoryActiveItems');
                        this.rightRegion.showError("An error has occurred while retrieving the filter's options. Please try again.");
                        this.errorCategory = true;
                    }
                }, this),
                complete: _.bind(function () {
                    //this.rightRegion.hideElement();
                }, this),
                error: _.bind(function (err) {
                    event.target.parentNode.parentNode.remove();
                    this.centerRegion.enableSelector('categoryActiveItems');
                    this.rightRegion.showError("An error has occurred while retrieving the filter's options. Please try again.");
                    this.errorCategory = true;
                }, this)
            });
        },

        getZipCodes: function (state, city, selectNode) {
            var location = state;
            if (city !== '') {
                location += '/' + city;
            }
            $.ajax({
                url: Session.getHost().host + '/moderation/zipcode/' + location,
                dataType: 'json',
                type: 'GET',
                beforeSend : _.bind(function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    this.showElementRight();
                }, this),
                success: _.bind(function (resp) {
                    //resp.data.states
                    if (resp.statusCode === 1) {
                        if (this.parameters.zipCode) {
                            this.removeFilter('zipCode');
                        }
                        this.applyFilter({'zipCode': resp.data.zipCodes});
                        if (city === '') {
                            this.centerRegion.addCityFilterOption();
                        }
                        this.getInformationPreFilter(selectNode);
                    } else {
                        selectNode.value = 'default';
                        this.rightRegion.showError("An error has occurred while retrieving the state's zip code. Please try again.");
                    }
                }, this),
                complete: _.bind(function () {
                }, this),
                error: _.bind(function (err) {
                    selectNode.value = 'default';
                    this.rightRegion.showError("An error has occurred while retrieving the state's zip code. Please try again.");
                }, this)
            });
        },

        getCities: function (state, elemParent) {
            var errorMessage = "An error has occurred while retrieving the filter's options. Please try again.";
            $.ajax({
                url: Session.getHost().host + '/moderation/cities/' + state,
                dataType: 'json',
                type: 'GET',
                beforeSend : _.bind(function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    // this.showElementRight();
                }, this),
                success: _.bind(function (resp) {
                    //resp.data.states
                    if (resp.statusCode === 1) {
                        this.centerRegion.createInputCities(resp.data.cities, elemParent);
                        this.errorCity = false;
                    } else {
                        elemParent.parentNode.remove();
                        this.centerRegion.enableSelector('city');
                        this.rightRegion.showError(errorMessage);
                        this.errorCity = true;
                    }
                }, this),
                complete: _.bind(function () {}, this),
                error: _.bind(function (err) {
                    elemParent.parentNode.remove();
                    this.centerRegion.enableSelector('city');
                    this.rightRegion.showError(errorMessage);
                    this.errorCity = true;
                }, this)
            });
        },

        getGroups: function (elemParent) {
            var errorMessage = "An error has occurred while retrieving the filter's options. Please try again.";
            $.ajax({
                url: Session.getHost().host + '/public/groups/v3/list',
                dataType: 'json',
                type: 'GET',
                beforeSend : _.bind(function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    this.showElementRight();
                }, this),
                success: _.bind(function (resp) {
                    if (resp.statusCode === 1) {
                        this.centerRegion.createInputGroups(resp.data.groups, elemParent);
                    } else {
                        elemParent.parentNode.remove();
                        this.rightRegion.showError(errorMessage);
                    }
                }, this),
                error: _.bind(function (error) {
                    elemParent.parentNode.remove();
                    this.rightRegion.showError(errorMessage);
                }, this)
            });
        },

        getFilterParam: function () {
            var newObj = '?';

            _.each(this.parameters, function (value, key) {
                newObj = newObj + key + '=' + value + '&';
            });

            newObj = newObj.substring(0, newObj.length - 1);

            return newObj;
        },

        newNotification: function () {
            this.show();
        }

    });

    return NotificationController;
}
);
