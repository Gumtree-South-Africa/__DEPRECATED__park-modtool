define(
  [
    'backbone',
    'marionette',
    'underscore',
    'jqBootstrapValidation'
  ],
  function (Backbone, Marionette, _, JQBootstrapValidation) {
    'use strict';

    var NotificationRightView = Marionette.ItemView.extend({
      template: 'notification.right.hbs',

      events: {
        'click #optionSchedule input': 'optionSchedule',
        'click #sendDataButton': 'sendData',
        'focusout #sendDataButton': 'focusOutButton',
        'click #newNotification': 'newNotification'
      },

      ui: {
        'radioNow': '#radioNow',
        // push-status divs:
        // -- info about receivers
        'receiversSection': '#receiversSection',
        'titleReceivers': '#titleReceivers',
        'loading': '#loading',
        'infoUsersSend': '#infoUsersSend',
        'numberUsers': '#numberUsers',
        'toUsers': '#toUsers',
        // -- info about schedule
        'whenSection': '#whenSection',
        'scheduleText': '#scheduleText',
        // -- info about what fields are not complete
        'infoSection': '#infoSection',
        'fieldsToComplete': '#fieldsToComplete',
        // -- errors tha occurred while completing or sending the notification
        'errorSection': '#errorSection',
        'errorMessage': '#errorMessage',
        // -- button (send, save, retry)
        'sendButtonsSection': '#sendButtonsSection',
        'sendDataButton': '#sendDataButton',
        'sending': '#sending',
        // -- success info
        'successSection': '#successSection',
        // -- new notification link
        'newNotificationSection': '#newNotificationSection'
      },

      onShow: function () {
          this.ui.receiversSection.hide();
          this.ui.whenSection.hide();
          this.ui.errorSection.hide();
          this.ui.successSection.hide();
          this.ui.sending.hide();
          this.ui.newNotificationSection.hide();
      },

      optionSchedule: function (e) {
          // TODO: implementar setSchedule
          //   this.setSchedule();
          this.ui.whenSection.show();
          this.ui.scheduleText.text('Now');
          this.trigger('notification:activeButtonSend');
      },

      activeButton: function (message, target) {
          if (message && target && this.ui.radioNow.is(':checked')) {
              this.ui.infoSection.hide();
              this.ui.sendDataButton.attr('disabled', false);
              this.ui.sendDataButton.text('Confirm & Send');
          } else {
              this.ui.sendDataButton.attr('disabled', true);
          }
          if (target) {
              this.ui.receiversSection.show();
          }
      },

      sendData: function (e) {
          var allrequired = true;
          $('[data-required-message]').each(function (elem, event) {
              if (((this.value === 'default') || this.value === '') && (this.disabled === false)) {
                  var top = this.offsetTop - 25,
                  left = this.offsetLeft - 10;
                  $('<div class="error" style="top:' + top + 'px; left: ' + left + 'px"><p>' + this.dataset.requiredMessage + '</p></div>').appendTo(this.parentNode);
                  allrequired = false;
              }
          });
          if (allrequired) {
              this.ui.receiversSection.hide();
              this.ui.whenSection.hide();
              this.ui.sending.show();
              this.ui.sendDataButton.hide();
              this.ui.errorSection.hide();
              this.trigger('notification:sendInformation');
          }
      },

      hideElement: function () {
          this.ui.loading.hide();
          this.ui.sending.hide();
          this.ui.infoUsersSend.show();
      },

      showElement: function () {
          this.ui.receiversSection.show();
          this.ui.loading.show();
          this.ui.infoUsersSend.hide();
      },

      updateUserTexts: function (receivers, typeUser) {
          this.ui.numberUsers.text(receivers);
          this.ui.toUsers.text(typeUser);
      },

      updateMessageClient: function (message) {
          this.ui.fieldsToComplete.text(message);
      },

      setSuccessInfo: function (receivers, pushConfirmed) {
          this.ui.successSection.find('#message1').text('Your message has been sent to ' + receivers + ' ' + $('#platform option:selected').text());
          this.ui.successSection.find('#message2').text('Confirmed receptions: ' + pushConfirmed + ' users');
          this.ui.sending.hide();
          this.ui.successSection.show();
          this.ui.newNotificationSection.show();
      },

      showError: function (errorText) {
          this.ui.errorMessage.text(errorText);
          this.ui.errorSection.show();

      },

      hideErrors: function () {
          this.ui.errorSection.hide();
      },

      showRetry: function () {
          this.ui.sendDataButton.text('Retry');
          this.ui.sendDataButton.show();
          this.ui.newNotificationSection.show();
      },

      newNotification: function () {
          this.trigger('notification:newNotification');
      },

      getErrorMessage: function () {
          if (!this.ui.radioNow.is(':checked')) {
              return 'set schedule';
          }
          return '';
      },

      updatetitleReceivers: function (state) {
          if (state) {
              this.ui.titleReceivers.text('Send push and feed notification to');
          } else {
              this.ui.titleReceivers.text('Send push notification to');
          }
      },

      disabledElements: function () {
          this.ui.radioNow.attr('disabled', 'true');
      },

      focusOutButton: function (event) {
          $('.error').remove();
      }

  });

  return NotificationRightView;
}
);
