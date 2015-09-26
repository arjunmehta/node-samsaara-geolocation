/*!
 * Samsaara Geolocation Middleware
 * Copyright(c) 2015 Arjun Mehta <arjun@arjunmehta.net>
 * MIT Licensed
 */

var debug = require('debugit').add('samsaara:geoLocation');

var samsaara;


module.exports = {

    name: 'geoLocation',

    initialize: function(extender, capability, options) {

        samsaara = extender.core;

        extender.addConnectionMethods(this.connectionMethods);

        if (options.onConnection) {
            extender.addConnectionInitialization(this.connectionInitialization, {
                forced: options.forced ? true : false
            });
        }

        return this;
    },

    connectionMethods: {
        getCurrentPosition: function(cb) {
            this.nameSpace('samsaaraGeoLocation').execute('getCurrentPosition')(function(err, position) {

                if (!err) {
                    debug('Client Position', position);
                    this.setState({
                        position: position
                    });
                    if (typeof cb === 'function') cb(null, position);
                } else {
                    debug('Client Location Error', err);
                    if (typeof cb === 'function') cb(new Error(err), null);
                }
            });
        }
    },

    connectionInitialization: function(connection, done) {
        connection.nameSpace('samsaaraGeoLocation').execute('getCurrentPosition')(function(err, position) {

            if (!err) {
                debug('Client Position', position);
                this.setState({
                    position: position
                });
            } else {
                debug('Client Location Error', err);
            }

            done();
        });
    }
};
