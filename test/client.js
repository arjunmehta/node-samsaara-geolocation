var shim = require('es5-shim');
var debugit = require('debugit').enable();
var debug = debugit.add('samsaara:test:geoLocation');

var WebSocket = require('ws');
var samsaara = require('samsaara');
var geoLocation = require('../client');

var test = require('tape').test;
var TapeFence = require('./tapefence');
var fences = {};

var ws;

navigator.geolocation = {};

navigator.geolocation.getCurrentPosition = function(cb) {
    cb({
        coords: {
            accuracy: 65,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 37.75237273835916,
            longitude: -122.41376256374076,
            speed: null
        },
        timestamp: 464836157371
    });
};


// test setup

samsaara.expose({
    continueTest: function() {
        console.log('CONTINUING TEST');
        fences['Wait to Continue'].hit('continue');
    }
});


// tests

test('Samsaara Client Exists', function(t) {
    t.equal(typeof samsaara, 'object');
    t.end();
});

test('Samsaara can load Groups middleware', function(t) {
    samsaara.use(geoLocation);
    t.end();
});

test('Samsaara initializes', function(t) {

    t.plan(1);

    ws = new WebSocket('ws://localhost:8080');

    samsaara.initialize({
        socket: ws
    });

    t.equal(typeof samsaara.core, 'object');
    t.end();
});

test('Wait to Continue', function(t) {

    fences['Wait to Continue'] = new TapeFence(1, function(c) {
        if (c === 'continue') {
            t.end();
        }
    });
});

test('End Test', function(t) {
    samsaara.core.execute('doneTest')(function() {
        t.end();
        ws.close();
    });
});