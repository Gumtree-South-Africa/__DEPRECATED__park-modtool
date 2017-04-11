define(
[
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'handlebars',
    'jqDateTimePicker',
    'jquery-ui',
    'jqBootstrapValidation',
    'chosen',
    'app/modules/modal/confirm/confirm.modal.view',
    'app/modules/modal/info/info.modal.view',
    'templateregistry',
    'app/entities/session.model'
],
function ($, Backbone, Marionette, _, Handlebars, JQDateTimePicke, JQUI, Val, Chosen, ConfirmModal, InfoModal, JST, Session) {
    'use strict';

    var ItemRegion = Marionette.ItemView.extend({
        template: 'results.item.hbs',

        events: {
            'click #noButton': 'deleteItem',
            'click #yesButton': 'approveItem',
            'click #saveAndNextButton': 'saveAndNext',
            'click #skipLink': 'skipItem',
            'click #backLink': 'backToModerate',
            'click div.small-pic-div': 'changeBigPic',
            'click #lock': 'unlockAttributes',
            'click #viewAllGroups': 'viewAllGroups',
            'click .bn-del-group': 'deleteGroup',
            'click #deleteBigPic': 'deleteBigPicture',
            'click .bn-del-picture': 'deleteSmallPicture'
        },

        ui: {
            'noButton': '#noButton',
            'yesButton': '#yesButton',
            'saveNextButton': '#saveAndNextButton',
            'skip': '#skipLink',
            'back': '#backLink',
            'flagApproved': '#flagApproved',
            'flagRejected': '#flagRejected',
            'flagAlreadyApproved': '#flagAlreadyApproved',
            'bigPic': '#bigPic',
            'smallPics': '#smallPicsDiv',
            'lock': '#lock',
            'category': '#categorySelect',
            'title': '#title',
            'description': '#description',
            'deleteBigPicBtn': '#deleteBigPic',
            'deleteSmallPicsBtn': '.bn-del-picture',
            'groupLabels': '.group-label',
            'deleteGroup': '.bn-del-group',
            'groupsDiv': '.groups-labels',
            'rejectionLabel': '#rejectionLabel'
        },

        initialize: function (options) {
            this.item = options.item;
            this.categories = options.categories;
            this.deleteOption = -1;
            this.registerHBHelper();
            this.unlock = false;
            this.unlocked = false;
            this.edited_groups = this.item.groups;
            this.pictures = [];
            for (var i = 0; i < 4; i++) {
                this.pictures.push(this.item['picture' + (i + 1)]);
            }
        },

        registerHBHelper: function () {
            Handlebars.registerHelper('showGoupsLabels', function (groups, opts) {
                /**
                * Retrieve the width in pixels of the string.
                * @param  {String}         text            Text to be measured
                * @param  {String}         font            Text font
                * @param  {HTMLElement}    canvasElement   Optional. Useful to cache canvas when calling this method repeatedly
                * @return {Number}
                */
                function getTextWidth(text, font, canvasElement) {
                    var canvas = canvasElement || document.createElement('canvas'),
                    context = canvas.getContext('2d'),
                    width;

                    context.font = font;

                    width = Math.floor(context.measureText(text).width);
                    // Width may be 0, in that case we don't want to add 1 px.
                    return width ? width + 1 : width;
                }

                function addLabel(group) {
                    return '<div class="group-label-div">' +
                    '<div id="' + group.id + '" class="group-label">' +
                    group.name +
                    '</div>' +
                    '<img class="bn-del-group" src="../img/moderation_mode/bn_delete_group.png" alt="" />' +
                    '</div>';
                }

                var groupsLabels = '',
                total_width = 0,
                max = 262,
                line = 1,
                font = '14px "Open Sans"',
                canvas = document.createElement('canvas'),
                link_width = getTextWidth('View All', font, canvas) + 8;

                for (var i = 0; i < groups.length; i++) {
                    var label_width = getTextWidth(groups[i].name, font, canvas) + 48;
                    if (line < 3) {
                        if (label_width + total_width <= max) {
                            total_width += label_width;
                            groupsLabels += addLabel(groups[i]);
                        } else {
                            line += 1;
                            total_width = 0;
                            if (line == 2 || (i == groups.length - 1 && label_width <= max) || label_width <= max - link_width) {
                                total_width = label_width;
                                groupsLabels += addLabel(groups[i]);
                            }
                        }
                    } else if ((i == groups.length - 1 && total_width + label_width <= max) || total_width + label_width <= max - link_width) {
                        total_width += label_width;
                        groupsLabels += addLabel(groups[i]);
                    } else {
                        groupsLabels += '<a id="viewAllGroups" class="view-all-groups">View All</a>';
                        break;
                    }
                }

                return new Handlebars.SafeString(groupsLabels);
            });
        },

        render: function () {
            var html = JST[this.template]({'item': this.item, 'categories': this.categories});

            return this.$el.html(html);

        },

        deleteItem: function () {
            var rejectionOptions = [
                "Don't send",
                'Duplicate',
                'Photos from internet',
                'Services',
                'Make up',
                'Animals',
                'Commision',
                'Advertising style',
                'Wrong Price',
                'Forbiden articles'
            ],
            confirmModal = new ConfirmModal({
                title: 'Confirm deletion of item #' + this.item.id,
                question: 'Choose a reason to inform the user:',
                options: rejectionOptions,
                confirm: _.bind(function (option) {
                    this.deleteOption = option;
                    this.moderated = true;
                    this.ui.rejectionLabel.text(rejectionOptions[option]);
                }, this),
                cancel: _.bind(function () {
                    this.backToModerate();
                }, this)
            });

            App.modalRegion.show(confirmModal);
            this.toggleButtons();
            this.lockAttributes();
            this.ui.flagAlreadyApproved.hide();
            this.ui.flagRejected.show();
        },

        approveItem: function () {
            var valResult = this.validate();
            if (valResult === undefined || !valResult.hasError) {
                this.moderated = true;
                this.toggleButtons();
                this.lockAttributes();
                this.ui.flagAlreadyApproved.hide();
                this.ui.flagApproved.show();
            } else {
                var errorModal = new InfoModal({
                    title: 'Error',
                    message: valResult.message
                });
                App.modalRegion.show(errorModal);
            }
        },

        saveAndNext: function (opts) {
            // if (this.titleToShort && !opts.switchItems) {
            //     var errorModal = new InfoModal({
            //         title: 'Error',
            //         message: 'The title should have at least 3 characters'
            //     });
            //     App.modalRegion.show(errorModal);
            // } else {
                var options = {};
                options.data = {};
                if (this.deleteOption !== -1) {
                    options.url = Session.getHost().host + '/moderation/items/' + this.item.id + '/' + this.deleteOption;
                    options.type = 'DELETE';
                } else {
                    options.url = Session.getHost().host + '/moderationMode/' + this.item.id;
                    options.type = 'PUT';
                    if (this.unlocked || this.unlock) {
                        options.data = this.getEditedAttributes();
                    }
                }
                $.ajax({
                    url: options.url,
                    type: options.type,
                    data: JSON.stringify(options.data),
                    success: _.bind(function (resp) {
                        if (resp.statusCode === 1) {
                            this.deleteOption = -1;
                            if (!opts.switchItems) {
                                this.trigger('modMode.getNextItem');
                            } else {
                                this.trigger('modMode.getItem', opts.itemId);
                            }
                        } //else {
                        //     var message = 'An error occured while saving the new item status, please try again.';
                        //     if (resp.errorCode == 727) {
                        //         message = "There are invalid characters in item title. Valid characters: numbers, letters and '¡', '¿', '!', '?', '-', '_', 'ñ', 'á', 'é', 'í', 'ó', 'ú' and 'ü'";
                        //     }
                        //     var errorModal = new InfoModal({
                        //         title: 'Error',
                        //         message: message
                        //     });
                        //     App.modalRegion.show(errorModal);
                        // }
                    }, this),
                    error: function (err) {
                        console.log(err);
                    }
                });
            // }

        },

        skipItem: function () {
            this.trigger('modMode.skipItem', this.item.id);
        },

        backToModerate: function () {
            this.toggleButtons();
            this.deleteOption = -1;
            this.moderated = false;
            this.ui.flagApproved.hide();
            this.ui.flagRejected.hide();
            this.ui.rejectionLabel.text('');
            if (this.unlocked) {
                this.unlockAttributes();
            }
        },

        toggleButtons: function () {
            this.ui.noButton.toggle();
            this.ui.yesButton.toggle();
            this.ui.saveNextButton.toggle();
            this.ui.skip.toggle();
            this.ui.back.toggle();
        },

        changeBigPic: function (event) {
            if ($(event.target).is('img')) {
                var $pic, $div, $parent;
                if (!$(event.target).hasClass('bn-del-picture')) {
                    $pic = $(event.target);
                    $div = $(event.target.parentElement.parentElement);
                    $parent = $(event.target.parentElement.parentElement.parentElement);

                    $parent.find('.current-pic').removeClass('current-pic');
                    $div.addClass('current-pic');
                    this.ui.bigPic.attr('src', $pic.attr('src'));
                }
            } else if ($(event.target).is('div') && $(event.target).find('img').is('img')) {
                $(event.target.parentElement.parentElement).find('.current-pic').removeClass('current-pic');
                $(event.target.parentElement).addClass('current-pic');
                this.ui.bigPic.attr('src', $(event.target).find('img').attr('src'));
            }
        },

        unlockAttributes: function (event) {
            if (event === undefined || !this.unlock && !this.unlocked) {
                this.unlock = true;
                this.ui.lock.attr('src', '../img/moderation_mode/padlock_open.png');
                this.unlockCategory();
                this.unlockAttr(this.ui.title);
                this.unlockAttr(this.ui.description);
                this.unlockPictures();
                this.unlockGroups();
            }
        },

        lockAttributes: function () {
            if (this.unlock){
                this.unlocked = true;
                this.unlock = false;
                this.lockAttr(this.ui.category);
                this.lockAttr(this.ui.title);
                this.lockAttr(this.ui.description);
                this.lockPictures();
                this.lockGroups();
            }
        },


        unlockAttr: function(element) {
            element.addClass('item-attr-form');
            element.attr('disabled', false);
        },

        lockAttr: function (element) {
            element.removeClass('item-attr-form');
            element.attr('disabled', true);
        },

        unlockCategory: function () {
            this.unlockAttr(this.ui.category);
        },

        unlockGroups: function () {
            $('.group-label').css('padding-right', '10px');
            $('.bn-del-group').show();
        },

        lockGroups: function () {
            $('.group-label').css('padding-right', '28px');
            $('.bn-del-group').hide();
        },

        unlockPictures: function () {
            if (this.ui.smallPics.find('#pic2').is('img')) {
                this.ui.deleteSmallPicsBtn.show();
                this.ui.deleteBigPicBtn.show();
            }
        },

        lockPictures: function () {
            this.ui.deleteSmallPicsBtn.hide();
            this.ui.deleteBigPicBtn.hide();
        },

        viewAllGroups: function () {
            var title = '<div class="mod-mode-modal-title horizontal-flex flex-center">' +
                '<div class="img-icon">' +
                    '<img src="../img/moderation_mode/icon_group.png" />' +
                '</div>' +
                '<div class="item-title">Groups</div>' +
            '</div>';
            var groupsLabels = this.edited_groups.reduce(function (gl, group) {
                return gl + '<div class="group-label-div">' +
                '<div id="' + group.id + '" class="group-label">' +
                group.name +
                '</div>' +
                '<img class="bn-del-group" src="../img/moderation_mode/bn_delete_group.png" alt="" />' +
                '</div>\n';
            }, '<div class="groups-labels-modal">\n');
            groupsLabels += '</div>\n';
            if (!this.unlock) {
                this.showInfoModal(title, groupsLabels);
            } else {
                this.showConfirmModal(title, groupsLabels);
            }
        },

        showInfoModal: function (title, groups) {
            var infoModal = new InfoModal({
                title: new Handlebars.SafeString(title),
                message: new Handlebars.SafeString(groups)
            });

            App.modalRegion.show(infoModal);
        },

        showConfirmModal: function (title, groups) {
            var confirmModal = new ConfirmModal({
                title: new Handlebars.SafeString(title),
                question: new Handlebars.SafeString(groups),
                confirm: _.bind(function (resp) {
                    var labels = resp.find('.group-label');
                    var labels_ids = _.map(labels, function (label) {
                        return +$(label).attr('id');
                    });
                    var all_groups = _.map(this.edited_groups, function (group) {
                        return group.id;
                    });
                    var deleted = _.difference(all_groups, labels_ids);
                    _.each(deleted, this.deleteGroupFromList, this);
                    this.rerenderGroupsLabels();
                }, this),
                cancel: function () {}
            });

            App.modalRegion.show(confirmModal);
            this.unlockGroups();
        },

        deleteGroup: function (event) {
            var confirmModal = new ConfirmModal({
                title: 'Please confirm',
                question: 'Are you sure you want to delete this group?',
                confirm: _.bind(function (resp) {
                    var group_id = $(event.target.parentElement).find('.group-label').attr('id');
                    this.deleteGroupFromList(group_id);
                    this.rerenderGroupsLabels();
                }, this),
                cancel: function () {}
            });

            App.modalRegion.show(confirmModal);
        },

        deleteGroupFromList: function (group_id) {
            var item_group = _.find(this.edited_groups, function (g) {
                return g.id == group_id;
            });
            this.edited_groups = _.without(this.edited_groups, item_group);
        },

        rerenderGroupsLabels: function () {
            this.ui.groupsDiv.hide().html((Handlebars.helpers.showGoupsLabels(this.edited_groups)).string).fadeIn(0);
            this.unlockGroups();
        },

        deleteBigPicture: function (event) {
            var pic = $('.current-pic').find('.small-pic');
            this.deletePicture(pic);
        },

        deleteSmallPicture: function (event) {
            var pic = $(event.target.parentElement).find('.small-pic');
            this.deletePicture(pic);
        },

        deletePicture: function (pic) {
            var confirmModal = new ConfirmModal({
                title: 'Please confirm',
                question: 'Are you sure you want to delete this picture?',
                confirm: _.bind(function (resp) {
                    this.updatePictures(pic);
                    if (!this.ui.smallPics.find('#pic2').is('img')) {
                        this.ui.deleteBigPicBtn.hide();
                        this.ui.deleteSmallPicsBtn.hide();
                    }
                }, this),
                cancel: function () {}
            });

            App.modalRegion.show(confirmModal);
        },

        updatePictures: function (pic) {
            function grandPa(img) {
                return img.parent().parent();
            }

            var pic_src = pic.attr('src'),
            pic_number = pic.attr('id').split('pic')[1],
            next_pic = this.ui.smallPics.find('#pic' + (parseInt(pic_number, 10) + 1)),
            is_current_pic = (grandPa(pic).hasClass('current-pic'));
            if (next_pic.is('img')) {
                if (is_current_pic) {
                    this.ui.bigPic.attr('src', next_pic.attr('src'));
                }
                pic.attr('src', next_pic.attr('src'));
                if (grandPa(next_pic).hasClass('current-pic')) {
                    grandPa(pic).addClass('current-pic');
                    grandPa(next_pic).removeClass('current-pic');
                }
                this.updatePictures(next_pic);
            } else {
                if (is_current_pic) {
                    grandPa(pic).removeClass('current-pic');
                    var prev_pic = this.ui.smallPics.find('#pic' + (parseInt(pic_number, 10) - 1)),
                    prev_pic_div = grandPa(prev_pic);
                    prev_pic_div.addClass('current-pic');
                    this.ui.bigPic.attr('src', prev_pic.attr('src'));
                }
                grandPa(pic).find('.bn-del-picture').remove();
                pic.remove();
            }

        },

        getCategory: function () {
            return this.ui.category.find('option[selected]');
        },

        getEditedAttributes: function () {
            var attrs = {};
            this.addTitle(attrs);
            this.addDescription(attrs);
            this.addCategory(attrs);
            this.addPictures(attrs);
            this.addGroups(attrs);
            return attrs;
        },

        addDescription: function (attrs) {
            var desc = this.ui.description.val();
            if (this.item.description !== desc){
                attrs.description = desc;
            }
        },

        addTitle: function (attrs) {
            // for some reason in BE the title is call "name"
            var title = this.ui.title.val();
            if (this.item.name !== title) {
                attrs.name = title;
            }
        },

        addCategory: function (attrs) {
            var catID = +this.ui.category.val();
            if (this.item.category.id !== catID) {
                attrs.category = catID;
            }
        },

        addPictures: function (attrs) {
            for (var i = 1; i <= 4; i++) {
                var $pic = this.ui.smallPics.find('#pic' + i);
                if ($pic.is('img')) {
                    if (this.item['picture' + i] !== $pic.attr('src')) {
                        attrs['picture' + i] = $pic.attr('src');
                    }
                } else {
                    if (this.item['picture' + i] !== null) {
                        attrs['picture' + i] = '';
                    }
                }
            }
        },

        addGroups: function (attrs) {
            if (this.edited_groups.length !== this.item.groups.length) {
                attrs.groups = this.edited_groups.map(function (group) {
                    return group.id;
                });
            }
        },

        getStatus: function () {
            return {
                unlock: (this.unlock || this.unlocked),
                moderated: this.moderated,
                itemId: this.item.id,
                validation: this.validate()
            };
        },

        checkTitle: function (event) {
            var result = {
                hasError: false,
                message: ''
            };
            if (this.ui.title.val().length < 3) {
                result.hasError = true;
                result.message += '<p>The item title should have at least 3 characters.</p>';
            }
            if (!/^[a-zA-Z0-9\\t\\n¡¿!?_ñÑáÁéÉíÍóÓúÚüÜ -]+$/.test(this.ui.title.val())) {
                result.hasError = true;
                result.message += "<p>There are invalid characters in item title. Valid characters: numbers, letters and '¡', '¿', '!', '?', '-', '_', 'ñ', 'á', 'é', 'í', 'ó', 'ú' and 'ü'.</p>";
            }

            return result;
        },

        checkDescription: function () {
            var result = {
                hasError: false,
                message: ''
            };
            if (!/^[^:;]*$/.test(this.ui.description.val())) {
                result.hasError = true;
                result.message = "<p>The item description can't contain ':' nor ';'</p>";
            }

            return result;
        },

        validate: function () {
            if (this.unlock || this.unlocked) {
                var result = {},
                titleResult = this.checkTitle(),
                descriptionResult = this.checkDescription();
                result.hasError = titleResult.hasError || descriptionResult.hasError;
                result.message = new Handlebars.SafeString(titleResult.message + descriptionResult.message);
                return result;
            }
            return undefined;
        }

    });

    return ItemRegion;

});
