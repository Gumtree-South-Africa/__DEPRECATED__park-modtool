define(
[
    'backbone',
    'marionette',
    'underscore'
],
function (Backbone, Marionette, _) {
    'use strict';

    var ModModeLayoutView = Marionette.Layout.extend({
        template: 'layout.hbs',

        regions: {
            filtersRegion: '#modModeFiltersRegion',
            resultsRegion: '#modModeResultsRegion'
        },

        events: {
        }

    });

    return ModModeLayoutView;
}
);
