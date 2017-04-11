define(
[
    'jquery',
    'underscore',
    'marionette',
    '../modal/confirm/confirm.modal.view',
    '../modal/preview/preview.modal.view',
    '../modal/confirmDiscard/confirmDiscard.modal.view',
    '../modal/info/info.modal.view',
    'app/entities/session.model',
    './layout/layout.view',
    './filters/filters.view',
    './resultsRegion/results.layout.view'
],
function ($, _, Marionette, ConfirmModal, PreviewModal, ConfirmDiscardModal, InfoModal, Session, ModModeLayout, FilterView, ResultsLayout) {
    'use strict';

    var ModerationModeController = Marionette.Controller.extend({

        /**
        * [initialize description]
        * @param  {[type]} options [description]
        * @return {[type]}         [description]
        */
        initialize: function (options) {
            this.router = options.router;
            this.itemCounter = 0;
            this.skippedItems = [];
            this.filters = {};
            this.itemsList = [];
            this.currentItem = -1;
            this.getCategories();
        },

        show: function () {
            this.layout = new ModModeLayout();
            this.filtersRegion = new FilterView({'categories': this.categories});
            this.resultsLayout = new ResultsLayout({'categories': this.categories});

            App.contentRegion.show(this.layout);

            // suscribed before show filter region, because it'll trigger onShow.
            this.listenTo(this.filtersRegion, 'modMode.getCategories', this.getCategories);

            this.layout.filtersRegion.show(this.filtersRegion);
            this.layout.resultsRegion.show(this.resultsLayout);

            this.listenTo(this.filtersRegion, 'modMode.applyFilters', this.applyFilters);
            this.listenTo(this.filtersRegion, 'modMode.getZipCodes', this.getZipCodes);
            this.listenTo(this.resultsLayout, 'modMode.skipItem', this.skipItem);
            this.listenTo(this.resultsLayout, 'modMode.getNextItem', this.getNextItem);
            this.listenTo(this.resultsLayout, 'modMode.getCategories', this.getCategories);
            this.listenTo(this.resultsLayout, 'modMode.switchToListItem', this.switchToListItem);
            this.listenTo(this.resultsLayout, 'modMode.getItem', this.getItem);
        },

        applyFilters: function (filters) {
            this.resultsLayout.hideEmptyMessage();
            this.skippedItems = [];
            this.filters = filters;
            this.getItemsList(filters);
        },

        getItemsList: function () {
            this.filters.skippedItems = this.skippedItems;
            var url = Session.getHost().host + '/moderationMode/apply';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(this.filters),
                success: _.bind(function (resp) {
                    if (resp.statusCode !== 1) {
                        var errorModal = new InfoModal({
                            title: 'Error',
                            message: 'An error has occured, please try again later.'
                        });
                        this.resultsLayout.showEmptyMessage();
                        App.modalRegion.show(errorModal);
                    } else {
                        if (resp.data.amountItemsFound !== 0) {
                            this.itemsList = resp.data.items;
                            this.itemCounter = 0;
                            this.getNextItem();
                        } else {
                            var messageModal = new InfoModal({
                                title: 'Sorry!',
                                message: 'There are no items to moderate.'
                            });
                            this.resultsLayout.showEmptyMessage();
                            App.modalRegion.show(messageModal);
                        }
                    }
                }, this),
                error: function (err) {
                    console.log(err);
                }
            });
        },

        skipItem: function (skippedItem) {
            if (!_.contains(this.skippedItems, skippedItem)) {
                this.skippedItems.push(skippedItem);
                this.getNextItem();
            }
        },

        getNextItem: function () {
            if (this.itemCounter >= this.itemsList.length) {
                this.getItemsList();
            } else {
                var url = Session.getHost().host + '/moderationMode/item/' + this.itemsList[this.itemCounter];
                $.ajax({
                    url: url,
                    type: 'GET',
                    success: _.bind(function (resp) {
                        if (resp.statusCode === 1 && resp.data.pendingModeration) {
                            this.currentItem = this.itemsList[this.itemCounter];
                            var indexSkip = this.skippedItems.indexOf(this.currentItem);
                            if (indexSkip !== -1) {
                                this.skippedItems.splice(indexSkip, 1);
                            }
                            this.resultsLayout.showItem(resp.data);
                            this.resultsLayout.showUserItemsList(resp.data.user.id, resp.data.id);
                        } else {
                            this.getNextItem();
                        }
                        this.itemCounter += 1;
                    }, this),
                    error: function (err) {
                        console.log(err);
                    }
                });
            }

        },

        getItem: function (itemId) {
            var url = Session.getHost().host + '/moderationMode/item/' + itemId;
            $.ajax({
                url: url,
                type: 'GET',
                success: _.bind(function (resp) {
                    if (resp.statusCode === 1) {
                        this.currentItem = itemId;
                        var indexItem = this.itemsList.indexOf(itemId),
                        indexSkip = this.skippedItems.indexOf(itemId);
                        if (indexSkip !== -1) {
                            this.skippedItems.splice(indexSkip, 1);
                        }
                        if (indexItem >= this.itemCounter) {
                            this.itemsList.splice(indexItem, 1);
                        }
                        this.resultsLayout.showItem(resp.data);
                        this.resultsLayout.showUserItemsList(resp.data.user.id, resp.data.id);
                    } else {
                        console.log(resp.statusMessage);
                    }
                }, this),
                error: function (err) {
                    console.log(err);
                }
            });
        },

        getCategories: function (selectElement) {
            if (this.categories === undefined) {
                $.ajax({
                    url: Session.getHost().host + '/public/categories/v3',
                    dataType: 'json',
                    type: 'GET',
                    async: false,
                    beforeSend : _.bind(function (xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    }, this),
                    success: _.bind(function (resp) {
                        if (resp.statusCode === 1) {
                            this.categories = resp.data.categories;
                        }
                    }, this),
                    error: _.bind(function (err) {
                        console.log('Error while getting categories.');
                    }, this)
                });
            }
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
                }, this),
                success: _.bind(function (resp) {
                    if (resp.statusCode === 1) {
                        this.filtersRegion.setZipCodes(resp.data.zipCodes);
                        if (city === '') {
                            this.getCities(state);
                            this.filtersRegion.enableCityFilter();
                        }
                    } else {
                        selectNode.value = 'default';
                        this.showError("An error has occurred while retrieving the state's zip code. Please try again.");
                    }
                }, this),
                error: _.bind(function (err) {
                    selectNode.value = 'default';
                    this.showError("An error has occurred while retrieving the state's zip code. Please try again.");
                }, this)
            });
        },

        getCities: function (state) {
            $.ajax({
                url: Session.getHost().host + '/moderation/cities/' + state,
                dataType: 'json',
                type: 'GET',
                beforeSend : _.bind(function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }, this),
                success: _.bind(function (resp) {
                    if (resp.statusCode === 1) {
                        this.filtersRegion.createInputCities(resp.data.cities);
                    } else {
                        this.showError("An error has occurred while retrieving the filter's options. Please try again.");
                    }
                }, this),
                error: _.bind(function (err) {
                    this.rightRegion.showError("An error has occurred while retrieving the filter's options. Please try again.");
                }, this)
            });
        },

        switchToListItem: function (itemId, status) {
            if (status.validation === undefined || !status.validation.hasError) {
                var modalOptions = {
                    title: 'Switch item',
                    cancel: function () {}
                },
                saveAndSwitchItems = _.bind(function () {
                    this.resultsLayout.itemView.saveAndNext({switchItems: true, itemId: itemId});
                }, this),
                switchItems = _.bind(function () {
                    this.getItem(itemId);
                }, this);
                if (status.moderated) {
                    // moderator confirmed action (yes or no)
                    modalOptions.question = 'Do you want to switch items?';
                    modalOptions.note = 'Your changes on item ' + status.itemId + ' will be saved.';
                    modalOptions.confirmButton = 'Yes';
                    modalOptions.confirm = saveAndSwitchItems;
                } else if (status.unlock) {
                    // moderator didn't confirm action, but made changes
                    modalOptions.question = 'Do you want to save changes on item ' + status.itemId + ' before switching?';
                    modalOptions.confirmButton = 'Save';
                    modalOptions.confirm = saveAndSwitchItems;
                    modalOptions.discardButton = 'Discard';
                    modalOptions.discard = switchItems;
                } else {
                    // moderator didn't change anything
                    modalOptions.question = 'Do you want to switch items?';
                    modalOptions.confirmButton = 'Yes';
                    modalOptions.confirm = switchItems;
                }
                var modal = new ConfirmDiscardModal(modalOptions);
                App.modalRegion.show(modal);
            } else {
                var errorModal = new InfoModal({
                    title: 'Error',
                    message: status.validation.message
                });
                App.modalRegion.show(errorModal);
            }
        }


    });

    return ModerationModeController;

}
);
