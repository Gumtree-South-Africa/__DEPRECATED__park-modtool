define(
[
    'jquery',
    'backbone',
    './modules/product/product.controller',
    './modules/user/user.controller',
    './modules/blacklist/blacklist.controller',
    './modules/groups/groups.controller',
    './modules/header/header.controller',
    './modules/notification/notification.controller',
    './modules/moderationMode/mod.mode.controller'
],
function ($, Backbone, ProductController, UserController, BlacklistController,
    GroupController, HeaderController, NotificationController, ModerationModeController) {
        'use strict';

        var Router = Backbone.Router.extend({

            routes: {
                'products': 'showProductPage',
                'users': 'showUserPage',
                'blacklist': 'showBlacklistPage',
                'groups': 'showGroupsPage',
                'notification': 'showNotification',
                'moderation': 'showModerationMode'
            },

            /**
            * [initialize description]
            * @return {[type]} [description]
            */
            initialize: function () {
                Backbone.history.start();

                // setTimeout(function() {
                $('.menu-section, .current-user').show();
                // }, 2000);

            },

            /**
            * [showProductPage description]
            * @return {[type]} [description]
            */
            showProductPage: function () {
                var productController = new ProductController({ router: this });
                var headerController = new HeaderController({ router: this });

                $('.menu-section .option a').removeClass('active');
                $('#products-btn').addClass('active');
                productController.show();
                headerController.show();
            },

            /**
            * [showProductPage description]
            * @return {[type]} [description]
            */
            showUserPage: function () {
                var userController = new UserController({ router: this });
                var headerController = new HeaderController({ router: this });

                $('.menu-section .option a').removeClass('active');
                $('#users-btn').addClass('active');
                userController.show();
                headerController.show();
            },

            /**
            * [showProductPage description]
            * @return {[type]} [description]
            */
            showBlacklistPage: function () {
                var blacklistController = new BlacklistController({ router: this });

                $('.menu-section .option a').removeClass('active');
                $('#blacklist-btn').addClass('active');
                blacklistController.show();
            },

            showGroupsPage: function () {
                var gruopsController = new GroupController({ router: this });

                $('.menu-section .option a').removeClass('active');
                $('#groups-btn').addClass('active');
                gruopsController.show();
            },

            showNotification: function () {
                var notificationController = new NotificationController({ router: this });
                $('.menu-section .option a').removeClass('active');
                $('#notification-btn').addClass('active');
                notificationController.show();
            },

            showModerationMode: function () {
                var moderationModeController = new ModerationModeController({ router: this });
                $('.menu-section .option a').removeClass('active');
                $('#moderation-mode-btn').addClass('active');
                moderationModeController.show();
            }

        });

        return Router;
    }
);
