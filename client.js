/*!
 * Samsaara GeoLocation Middleware
 * Copyright(c) 2015 Arjun Mehta <arjun@arjunmehta.net>
 * MIT Licensed
 */

var debug = require('debugit').add('samsaara:geoLocation');

var samsaara;


module.exports = {

    name: 'geoLocation',

    initialize: function(extender, capability, options) {

        samsaara = extender.core;
        samsaara.createNamespace('samsaaraGeoLocation', this.exposedMethods);
        return this;
    },

    exposedMethods: {

        getCurrentPosition: function(cb) {

            var errorMessage = null;

            if (navigator && navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                    debug('Geolocation request successful', position);
                    if (typeof cb === 'function') cb(null, position);
                }, function(err) {
                    errorMessage = err.message;
                    debug('Geolocation request failure', errorMessage);
                    if (typeof cb === 'function') cb(errorMessage, null);
                });

            } else {

                errorMessage = 'No geolocation object available on client.';
                debug('Geolocation request failure', errorMessage);
                if (typeof cb === 'function') cb(errorMessage, null);
            }
        }
    }
};
