var LoginView = (function($) {
  'use strict';

  var host, vhost;

  var init = function() {
    var token = $.cookie('token');

    if (token) {
      location.href = './';
    } else {
      var errorCode = getParamString('e');
      if (Number(errorCode) === 302) {
        $('.message').html('Session Expired');
      }

      attachValidation();

      $.getJSON('./config.json', function(config) {
        host = config.host;
        vhost = config.vhost;
      });
    }
  };

  var getParamString = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);

    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  var attachValidation = function() {
    var that = this;

    $('.login').find('input,textarea,select').jqBootstrapValidation({
      preventSubmit: true,
      submitSuccess: function($form, event) {
        event.preventDefault();
        $('.login').find('.dimmer').removeClass('hidden');
        doLogin(event);
      },
      filter: function() {
        return $(this).is(':visible');
      }
    });
  };

  var doLogin = function() {
    var data = {
      username: $('#username').val(),
      password: $('#password').val()
    };

    $.ajax({
      type: 'POST',
      beforeSend : function (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        $('#loadingLogin').show();
      },
      url: host + '/moderation/signin',
      crossDomain: true,
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(resp) {
        if (resp.statusCode === 1) {
          $.cookie('token', resp.data.token);
          location.href= './';
        } else {
          onLoginError(resp.statusMessage);
        }
      },
      complete: function() {
        $('#loadingLogin').hide();
      },
      error: function (jqXHR, exception) {
        var msg = '';
        if (jqXHR.status === 0) {
            onLoginError('Not connect.\n Verify Network.');
        } else if (jqXHR.status == 404) {
            onLoginError('Requested page not found. [404]');
        } else if (jqXHR.status == 500) {
            onLoginError('Internal Server Error [500].');
        } else if (exception === 'parsererror') {
            onLoginError('Requested JSON parse failed.');
        } else if (exception === 'timeout') {
            onLoginError('Time out error.');
        } else if (exception === 'abort') {
            onLoginError('Ajax request aborted.');
        } else {
            onLoginError('Uncaught Error.\n' + jqXHR.responseText);
        }
        $('#post').html(msg);
    },
    });
  };

  var onLoginError = function(error) {
    var liStr = '<li class="label label-danger">';
    liStr += error + '</li>';

    $('.login').find('.dimmer').addClass('hidden');

    $('.login .errors-list')
      .html(liStr)
      .removeClass('hidden');
  };

  return {
    init: init
  };

})($);
