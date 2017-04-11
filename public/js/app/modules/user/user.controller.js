define(
  [
    'jquery',
    'underscore',
    'marionette',
    './layout/user.layout.view',
    './list/user.list.view',
    '../filter/filter.view',
    '../pagination/pagination.view',
    '../modal/confirm/confirm.modal.view',
    '../modal/info/info.modal.view',
    '../colManager/colManager.view',
    'app/entities/user.collection',
    'app/entities/user.filter.model',
    'app/entities/session.model',
    'datatables',
    'colReorder'
  ],
  function ($, _, Marionette, UserLayout, UserListView, FiltersView, PaginationView,
    ConfirmModal, InfoModal, ColManager, UserCollection, UserFilterModel, Session, datatables, colReorder) {
      'use strict';

      var UserController = Marionette.Controller.extend({

        /**
        * [initialize description]
        * @param  {[type]} options [description]
        * @return {[type]}         [description]
        */
        initialize: function (options) {
          this.router = options.router;
        },

        /**
        * [show description]
        * @param  {[type]} options [description]
        * @return {[type]}         [description]
        */
        show: function () {
          this.usersCollection = new UserCollection();

          var filterModel = new UserFilterModel();
          this.filtersView = new FiltersView({
            entityName: 'Users',
            model: filterModel
          });
          var resultsView = new UserListView({
            collection: this.usersCollection
          });
          var options = {
            entityName: 'Users',
            collection: this.usersCollection
          };
          this.paginationView = new PaginationView(options);

          this.layout = new UserLayout();
          var controller = this;
          this.usersCollection.getFirstPage({ fetch: true, reset: true }).done(function () {
            controller.colManager = new ColManager({
              entityName: 'Users',
              layout: controller.layout,
              collection: controller.usersCollection,
              paginationView: controller.paginationView,
              table: resultsView.id
            });
          });

          App.contentRegion.show(this.layout);

          this.layout.filtersRegion.show(this.filtersView);
          this.layout.resultsRegion.show(resultsView);
          this.layout.paginationRegion.show(this.paginationView);

          //Users list event handlers
          this.listenTo(this.filtersView, 'Users:applyFilter', this.applyFilter);
          this.listenTo(this.filtersView, 'Users:cleanFilter', this.cleanFilter);
          this.listenTo(resultsView, 'itemview:Users:ban', this.confirmBan);
          this.listenTo(resultsView, 'itemview:Users:activate', this.confirmActive);
          this.listenTo(resultsView, 'itemview:Users:resetPassword', this.confirmResetPwd);

          //Pagination events handlers
          this.listenTo(this.paginationView, 'Users:pagination:changePage', this.changePage);


        },

        /**
        * [changePage description]
        * @return {[type]} [description]
        */
        changePage: function (selectedPage) {
          var that = this;
          this.usersCollection.getPage(selectedPage - 1, {reset: true}).done(function () {
            that.paginationView.render();
          });
        },

        /**
        * [confirmRemove description]
        * @return {[type]} [description]
        */
        confirmActive: function (view, userModel) {
          var confirmModal = new ConfirmModal({
            title: 'Activate User',
            question: 'Are you sure you want to activate this user?',
            confirm: _.bind(function () {
              var url = Session.getHost().host + '/moderation/users/' + userModel.get('userId') + '/activate';

              $.ajax({
                url: url,
                type: 'PUT',
                success: _.bind(function (resp) {
                  if (resp.statusCode !== 1) {
                    var errorModal = new InfoModal({
                      title: 'Error',
                      message: 'The user you are trying to activate is not banned.'
                    });
                    App.modalRegion.show(errorModal);
                  }
                  this.changePage(this.usersCollection.state.selectPage);
                }, this),
                error: function (err) {
                  console.log(err);
                }
              });
            }, this),
            cancel: function () {
              console.log('Operation canceled');
            }
          });

          App.modalRegion.show(confirmModal);
        },

        /**
        * [confirmApprove description]
        * @return {[type]} [description]
        */
        confirmBan: function (view, userModel) {
          var confirmModal = new ConfirmModal({
            title: 'Ban user',
            question: 'Are you sure you want to ban this user?',
            confirm: _.bind(function () {
              var url = Session.getHost().host + '/moderation/users/' + userModel.get('userId') + '/ban';

              $.ajax({
                url: url,
                type: 'PUT',
                success: _.bind(function (resp) {
                  if (resp.statusCode !== 1) {
                    var errorModal = new InfoModal({
                      title: 'Error',
                      message: 'The user is already banned.'
                    });
                    App.modalRegion.show(errorModal);
                  }
                  this.changePage(this.usersCollection.state.selectPage);
                }, this),
                error: function (err) {
                  console.log(err);
                }
              });
            }, this),
            cancel: function () {
              console.log('Operation canceled');
            }
          });

          App.modalRegion.show(confirmModal);
        },

        // /**
        // * resetPassword checks if the user is locked. If it is locked, calls confirmResetPwd,
        // * otherwise shows an error message and refresh the page.
        // * @param {type} view
        // * @param {Objetc} userModel    Model of the user that get the password reset.
        // */
        // resetPassword: function (view, userModel) {
        //   var url = Session.getHost().host + '/moderation/users?status=LOCKED&username=' + userModel.get('username');
        //   $.ajax({
        //     url: url,
        //     type: 'GET',
        //     success: _.bind(function (resp) {
        //       if (resp.data.amountUsersFound === 0) {
        //         var errorModal = new InfoModal({
        //           title: 'Error',
        //           message: 'The user is not locked.'
        //         });
        //         App.modalRegion.show(errorModal);
        //         this.changePage(this.usersCollection.state.selectPage);
        //       } else {
        //         this.confirmResetPwd(view, userModel);
        //       }
        //     }, this),
        //     error: function (err) {
        //       console.log(err);
        //     }
        //   });
        // },

        /**
        * [confirmResetPwd shows a modal asking for confirmation to reset the password
        * of the user. If yes sends the request to BE, which sends an email to the user.]
        * @param {type} view
        * @param {Objetc} userModel    Model of the user that get the password reset.
        */
        confirmResetPwd: function (view, userModel) {
          var confirmModal = new ConfirmModal({
            title: 'Activate User',
            question: 'The user will receive a new password by email.',
            note: 'Are you sure you want to activate this user?',
            confirm: _.bind(function () {
              var url = Session.getHost().host + '/moderation/users?status=LOCKED&username=' + userModel.get('username');
              $.ajax({
                url: url,
                type: 'GET',
                success: _.bind(function (resp) {
                  if (resp.data.amountUsersFound === 0) {
                    var errorModal = new InfoModal({
                      title: 'Error',
                      message: 'The user is not locked.'
                    });
                    App.modalRegion.show(errorModal);
                    this.changePage(this.usersCollection.state.selectPage);
                  } else {
                    var url_reset = Session.getHost().host + '/users/v3/forgotpwd',
                    data = {};
                    data.email = userModel.get('email');

                    $.ajax({
                      url: url_reset,
                      contentType: 'application/json',
                      type: 'POST',
                      data: JSON.stringify(data),
                      success: _.bind(function () {
                        this.changePage(this.usersCollection.state.selectPage);
                      }, this),
                      error: function (err) {
                        console.log(err);
                      }
                    });
                  }
                }, this),
                error: function (err) {
                  console.log(err);
                }
              });
            }, this),
            cancel: function () {
              console.log('Operation canceled');
            }
          });

          App.modalRegion.show(confirmModal);
        },

        /**
        * [applyFilter description]
        * @param  {[type]} filterModel [description]
        * @return {[type]}             [description]
        */
        applyFilter: function (filterModel) {
          this.usersCollection.applyFilter(filterModel.get('values'));
        },

        /**
        * [applyFilter description]
        * @param  {[type]} filterModel [description]
        * @return {[type]}             [description]
        */
        cleanFilter: function () {
          this.usersCollection.cleanFilter();
        },



      });

      return UserController;
    }
  );
