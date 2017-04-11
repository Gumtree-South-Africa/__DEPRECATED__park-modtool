define(
  [
    'backbone',
    'jquery',
    'underscore',
    'marionette',
    'datatables',
    'colReorder'
  ],
function (Backbone, $, _, Marionette, datatables, colReorder) {
  'use strict';

  var ColManager = Marionette.ItemView.extend({
    template: 'colManager.view.hbs',

    events: {
      'click @ui.column': 'columnSelected',
      'click @ui.btnShow': 'showColumn',
      'click @ui.btnHide': 'hideColumn',
      'click @ui.btnUp': 'moveUpColumn',
      'click @ui.btnDown': 'moveDownColumn',
      'click @ui.btnCancel': 'cancel',
      'click @ui.btnUpdate': 'btnUpdateClick'
    },

    ui: {
      'column': '.column-option',
      'hiddenColumns': '#hiddenColumns',
      'visibleColumns': '#visibleColumns',
      'btnShow': '#btnShow',
      'btnHide': '#btnHide',
      'btnUp': '#btnUp',
      'btnDown': '#btnDown',
      'btnCancel': '#btnCancel',
      'btnUpdate': '#btnUpdateGrid'
    },

    initialize: function (options) {
      this.entityName = options.entityName;
      this.layout = options.layout;
      this.collection = options.collection;
      this.pagView = options.paginationView;
      this.tableEl = $('#' + options.table);
      this.addButton();
      this.initTable();
      this.setColumns();
      this.colSelected = '';
      this.listenTo(this.collection, 'prereset', this.resetTable);
      this.listenTo(this.collection, 'reset', this.reorderTable);
    },

    addButton: function () {
      var $titulo = $('.title:contains(' + this.entityName + ')');
      $titulo.after('<div class="menu-btns">' +
      '<div id="customizeGridBtn" class="menu-buttons">' +
      '<!-- <div id="customGridIcon"></div> -->' +
      'Customize Grid' +
      '</div>' +
      '</div>');
      $titulo.parent().after('<div class="blackout-80"></div>' +
      '<div id="colManagerRegion" class="col-manager"></div>');
      this.layout.bindUIElements();
      this.listenTo(this.layout, 'user:toggleCustomizeGridMenu', this.toggleCustomizeGridMenu);
    },

    initTable: function () {
      this.table = this.tableEl.DataTable({
        colReorder: {
          fixedColumnsLeft: 20
        },
        'columnDefs': [
          {'width': '15%', 'targets': -1}
        ],
        'info': false,
        'paging': false,
        'ordering': false,
        'searching': false,
        "language": {
          "zeroRecords": " "
        }
      });
    },

    // reset the table to the original state, so the new data is added on the right columns
    resetTable: function () {
      if (this.isMenuInitialized()) {
        this.updateColumns(this.origVisibleColumns, this.origHiddenColumns);
      }
    },

    reorderTable: function () {
      this.updateRows();
      if (this.isMenuInitialized()) {
        this.update();
        this.table.columns.adjust().draw();
      }
    },

    updateRows: function () {
      var data = this.tableEl[0].children[1].children;
      this.table.rows().remove().rows.add(data).draw();
    },

    onRender: function () {
      // console.log(this.visibleColumns);
      this.renderColumns('visibleColumns');
      this.renderColumns('hiddenColumns');
    },

    setColumns: function () {
      if (this.table.columns()[0] !== undefined) {
        var colAmount = this.table.columns()[0].length;
        this.origVisibleColumns = [];
        this.origHiddenColumns = [];
        for (var i = 0; i < colAmount - 1; i++) {
          if (this.table.column(i).visible()) {
            this.origVisibleColumns.push($(this.table.column(i).header()).text());
          } else {
            this.origHiddenColumns.push($(this.table.column(i).header()).text());
          }
        }
        this.visibleColumns = this.origVisibleColumns;
        this.hiddenColumns = this.origHiddenColumns;
      }
    },

    renderColumns: function (columns) {
      var columnsLength = this[columns].length;
      this.ui[columns].empty();
      for (var i = 0; i < columnsLength; i++) {
        this.ui[columns].append('<p class="column-option">' + this[columns][i] + '</p>');
      }
    },

    toggleCustomizeGridMenu: function () {
      this.layout.ui.blackout80.toggle();
      this.layout.ui.customizeGridBtn.toggleClass('menu-buttons-click');
      if (!this.isMenuInitialized()) {
        this.layout.colManagerRegion.show(this);
      } else {
        if (this.layout.colManagerRegion.$el.is(':visible')) {
          this.cleanStyles();
          this.renderColumns('visibleColumns');
          this.renderColumns('hiddenColumns');
        }
        this.layout.colManagerRegion.$el.toggle();
      }
      // }
    },

    cancel: function () {
      this.toggleCustomizeGridMenu();
    },

    cleanStyles: function () {
      if (this.colSelected !== '') {
        this.colSelected.toggleClass('column-active');
        this.colSelected = '';
      }
      this.changeVisibleButtonsAvailability(false);
      this.changeHideButtonsAvailability(false);
    },

    isMenuInitialized: function () {
      return (this.layout.colManagerRegion.$el !== undefined);
    },

    columnSelected: function (e) {
      if (this.colSelected !== '') {
        this.colSelected.toggleClass('column-active');
      }
      this.colSelected = $(e.target);
      this.colSelected.addClass('column-active');
      if (this.colSelected.parents(this.ui.hiddenColumns.selector).length === 1) {
        this.changeVisibleButtonsAvailability(false);
        this.changeHideButtonsAvailability(true);
      } else if (this.colSelected.parents(this.ui.visibleColumns.selector).length === 1) {
        this.changeVisibleButtonsAvailability(true);
        this.changeHideButtonsAvailability(false);
      }
    },

    showColumn: function (event) {
      this.ui.visibleColumns.append(this.colSelected);
      this.changeVisibleButtonsAvailability(true);
      this.changeHideButtonsAvailability(false);
      this.changeUpdateBtnAvailability();
    },

    hideColumn: function (event) {
      this.ui.hiddenColumns.append(this.colSelected);
      this.changeVisibleButtonsAvailability(false);
      this.changeHideButtonsAvailability(true);
      this.changeUpdateBtnAvailability();
    },

    changeVisibleButtonsAvailability: function (availability) {
      this.ui.btnHide.attr('disabled', !availability);
      this.ui.btnUp.attr('disabled', !availability);
      this.ui.btnDown.attr('disabled', !availability);
    },

    changeHideButtonsAvailability: function (availability) {
      this.ui.btnShow.attr('disabled', !availability);
    },

    changeUpdateBtnAvailability: function () {
      if (this.changed()) {
        this.ui.btnUpdate.attr('disabled', false);
      } else {
        this.ui.btnUpdate.attr('disabled', true);
      }
    },

    moveUpColumn: function (event) {
      this.colSelected.insertBefore(this.colSelected.prev());
      this.changeUpdateBtnAvailability();
    },

    moveDownColumn: function (event) {
      this.colSelected.insertAfter(this.colSelected.next());
      this.changeUpdateBtnAvailability();
    },

    btnUpdateClick: function () {
      this.update();
      this.toggleCustomizeGridMenu();
    },

    update: function (event) {
      var show = this.getUIColumnsArray('visibleColumns');
      var hide = this.getUIColumnsArray('hiddenColumns');
      this.updateColumns(show, hide);
      this.visibleColumns = show;
      this.hiddenColumns = hide;
    },

    updateColumns: function (columnsToShow, columnsToHide) {
      var order = this.setColumnsVisibility(columnsToShow, true);
      order = order.concat(this.setColumnsVisibility(columnsToHide, false));
      order.push(this.table.column(':contains(Actions)')[0][0]);
      this.table.colReorder.order(order);
      this.trigger(this.entityName + ':colManager:cancel');
    },

    setColumnsVisibility: function (columnsToSet, visible) {
      var lShow = columnsToSet.length;
      var order = [];
      for (var j = 0; j < lShow; j++) {
        this.table.column(':contains(' + columnsToSet[j] + ')').visible(visible);
        order.push(this.table.column(':contains(' + columnsToSet[j] + ')')[0][0]);
      }
      return order;
    },

    changed: function () {
      var show = this.getUIColumnsArray('visibleColumns');
      if (show.length !== this.visibleColumns.length) {
        return true;
      } else {
        var l = show.length;
        for (var i = 0; i < l; i++) {
          if (show[i] !== this.visibleColumns[i]) {
            return true;
          }
        }
        return false;
      }
    },

    getUIColumnsArray: function (columns) {
      var cols = [];
      this.ui[columns].children().each(function () {
        cols.push($(this).text());
      });
      return cols;
    }

  });

  return ColManager;
});
