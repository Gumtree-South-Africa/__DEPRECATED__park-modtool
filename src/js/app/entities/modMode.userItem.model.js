define(
[
    'jquery',
    'underscore',
    'backbone',
    'app/entities/session.model'
],
function ($, _, Backbone, Session) {
    'use strict';

    var ModModeUserItem = Backbone.Model.extend({

        defaults: {
        }

    });

    return ModModeUserItem;

}
);
