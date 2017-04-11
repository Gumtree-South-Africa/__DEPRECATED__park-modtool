define(
[
    'backbone',
    'marionette',
    'underscore'
],
function (Backbone, Marionette, _) {
    'use strict';

    var NotificationLeftView = Marionette.Layout.extend({
        template: 'notification.left.hbs',

        text_max: 100,

        events: {
            'keyup #notificationMessage' : 'countCharacterText',
            'click #onlyPush' : 'sendFeed'
        },

        ui: {
            'messageText': '#notificationMessage',
            'textarea_feedback': '#textarea_feedback',
            'onlyPush': '#onlyPush'
        },

        initialize: function (options) {
            this.rightRegion = options.rightRegion;
        },

        countCharacterText: function (e) {
            var text_length = this.ui.messageText.val().length;
            var text_remaining = this.text_max - text_length;
            this.ui.textarea_feedback.html(text_remaining);

            this.trigger('notification:activeButtonSend');
            if (text_length < 101) {
                this.ui.textarea_feedback.css('color', '#9b9b9b');
            } else {
                this.ui.textarea_feedback.css('color', 'red');
            }
        },

        sendFeed: function (e) {
            this.trigger('notification:updatetitleReceivers', e.target.checked);
        },

        getOnlyPush: function () {
            return !this.ui.onlyPush.is(':checked');
        },

        getMessage: function () {
            return this.ui.messageText.val();
        },

        getErrorMessage: function () {
            var text_length = this.ui.messageText.val().length;
            if (text_length === 0) {
                return 'write message';
            } else {
                if ((text_length < 10) || (text_length > 100)) {
                    return 'write message (between 10 and 100 characters)';
                }
            }
            return '';
        },

        disabledElements: function () {
            this.ui.messageText.attr('disabled', true);
            this.ui.onlyPush.attr('disabled', true);
        },

        disableFeedOption: function () {
        this.ui.onlyPush.attr('checked', false);
            this.ui.onlyPush.attr('disabled', true);
        },

        enableFeedOption: function () {
            this.ui.onlyPush.attr('disabled', false);
        }

    });

    return NotificationLeftView;
}
);
