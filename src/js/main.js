require.config({

    paths: {
        'backbone' : '../vendor/backbone/backbone',
        'paginator': '../vendor/backbone.paginator/lib/backbone.paginator',
        'marionette': '../vendor/marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr' : '../vendor/backbone.wreqr/lib/backbone.wreqr',
        'backbone.eventbinder' : '../vendor/backbone.eventbinder',
        'backbone.babysitter' : '../vendor/backbone.babysitter/lib/backbone.babysitter',
        'jquery' : '../vendor/jquery/dist/jquery',
        'underscore' : '../vendor/lodash/dist/lodash',
        'modernizr' : '../vendor/modernizr/modernizr',
        'handlebars' : '../vendor/handlebars/handlebars',
        'templateregistry' : 'app/templates',
        'moment': '../vendor/moment/moment',
        'bootstrap': '../vendor/bootstrap/dist/js/bootstrap',
        'jquery-cookie': '../vendor/jquery-cookie/jquery.cookie',
        'jqDateTimePicker': '../vendor/jqDateTimePicker/jquery.datetimepicker',
        'jquery-ui': '../vendor/jquery-ui/jquery-ui',
        'jqBootstrapValidation': '../vendor/jqBootstrapValidation/src/jqBootstrapValidation',
        'chosen': '../vendor/chosen/chosen.jquery.min',
        'datatables': '../vendor/datatables/media/js/jquery.dataTables',
        'colReorder': '../vendor/datatables-colreorder/js/dataTables.colReorder'
    },

    shim: {
        'jquery': {
            exports: 'jQuery'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'modernizr': {
            exports: 'Modernizr'
        },

        'handlebars': {
            exports: 'Handlebars'
        },

        'boostrap': {
            deps: ['jquery'],
            exports: '$.fn.popover'
        },

        'paginator': {
            deps: ['backbone'],
            exports: 'Backbone.Paginator'
        }

    },

    waitSeconds: 30
});

require(
    [
        'jquery',
        'jquery-cookie',
        'app/application',
        'modernizr'
    ],
    function (jquery, Cookie, Application, Modernizr) {
        'use strict';
        var token = jquery.cookie('token');

        if (token) {
            window.App = Application;
            Application.start();
        } else {
            setTimeout (function () {
                location.href = './login.html';
            }, 2000);

        }

    }
);
