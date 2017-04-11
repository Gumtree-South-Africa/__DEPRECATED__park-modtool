define(
[
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'templateregistry',
    'moment',
    'app/entities/session.model',
    './router'
],
function (jquery, _, Backbone, Marionette, Handlebars, JST, Moment, Session, Router) {
    'use strict';

    var Application = new Marionette.Application();

    Application.on('initialize:before', function (options) {
        console.log(jquery);
    });

    Application.on('initialize:before', function (options) {
        Marionette.Renderer.render = function (template, data) {
            if (!JST[template]) {
                throw "Template '" + template + "' not found!";
            }
            return JST[template](data);
        };
    });

    Application.on('initialize:before', function (options) {
        Handlebars.registerHelper('ifCond', function (v1, v2, opts) {
            if(v1 === v2) {
                return opts.fn(this);
            }
            return opts.inverse(this);
        });

        Handlebars.registerHelper('ifGreater', function (v1, v2, opts) {
            if(v1 > v2) {
                return opts.fn(this);
            }
            return opts.inverse(this);
        });

        Handlebars.registerHelper('parseDate', function (strDate, opts) {
            if (strDate) {
                return new Moment(strDate).format('YYYY/MM/DD');
            }
            return '';
        });

        Handlebars.registerHelper('parseDateWithHour', function (strDate, opts) {
            if (strDate) {
                return new Moment(strDate).format('YYYY/MM/DD [at] h:mmA');
            }
            return '';
        });

        Handlebars.registerHelper('toLowerCase', function (strInput, opts) {
            return strInput.toLowerCase();
        });

        Handlebars.registerHelper('times', function (n, block) {
            var accum = '';

            for (var i = 1; i <= n; ++i) {
                accum += block.fn(i);
            }
            return accum;
        });

        Handlebars.registerHelper('roundPrice', function (price) {
            var price_split = price.split('.'),
            ret = price_split[0];
            if (price_split[1] !== '0') {
                if (price_split[1].length > 1) {
                    ret += '.' + price_split[1];
                } else {
                    ret += '.' + price_split[1] + '0';
                }
            }
            return ret;
        });

    });

    Application.on('initialize:after', function (options) {
        jquery.ajaxSetup({
            cache: false,
            complete: function (resp) {
                jquery('#loading').hide();
                if (resp.status !== 1 && resp.error.status === 302) {
                    Session.removeSession();
                    window.location.href = 'login.html?e=302';
                }
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                jquery('#loading').show();
            }
        });
    });

    Application.on('initialize:after', function (options) {
        var ModalRegion = Backbone.Marionette.Region.extend({
            el: '#modalRegion',
            onShow: function (view) {
                this.$el.modal('show');
            },
            onClose: function () {
                this.$el.modal('hide');
            }
        });

        Application.addRegions({
            contentRegion: '#contentRegion',
            headerRegion: '#headerRegion',
            modalRegion: ModalRegion
        });
    });

    Application.on('initialize:after', function (options) {
        var router = new Router(),
        token = Session.get('token');

        if (token) {
            jquery.ajaxSetup({
                headers: {
                    'token': token
                }
            });

            router.navigate('products', { trigger: true });
        } else {
            setTimeout(function () {
                location.href = './login.html';
            }, 2000);
        }

    });

    return Application;
}
);
