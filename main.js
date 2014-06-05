/*!
 * Samsaara Client Geoposition Module
 * Copyright(c) 2014 Arjun Mehta <arjun@newlief.com>
 * MIT Licensed
 */

var debug = require('debug')('samsaara:geoPosition');


var samsaara,
    config,
    connectionController,
    communication,
    ipc;


var geoPosition = {

  name: "geoPosition",

  clientScript: __dirname + '/client/samsaara-geoposition.js', 

  connectionInitialization: {
    geoPosition: connectionInitialzation
  }
};


// the root interface loaded by require. Options are pass in options here.

function main(opts){
  return initialize;
}


// samsaara will call this method when it's ready to load it into its middleware stack
// return your main

function initialize(samsaaraCore){

  samsaara = samsaaraCore.samsaara;
  connectionController = samsaaraCore.connectionController;
  communication = samsaaraCore.communication;
  ipc = samsaaraCore.ipc;

  samsaaraCore.addClientFileRoute("samsaara-geoposition.js", __dirname + '/client/samsaara-geoposition.js');

  return geoPosition;
}


// Connection Initialization Methods
// Called for every new connection
// 
// @opts: {Object} contains the connection's options
// @connection: {SamsaaraConnection} the connection that is initializing
// @attributes: {Attributes} The attributes of the SamsaaraConnection and its methods

function connectionInitialzation(opts, connection, attributes){

  connection.updateDataAttribute("geoposition", null);

  if(opts.geoPosition !== undefined){
    debug("Initializing geoPosition...");
    if(opts.geoPosition === "force") attributes.force("geoPosition");
    connection.executeRaw({ns:"internal", func:"getGeoPosition"}, geoPositionReturn);
  }    
}


// Foundation Methods

function geoPositionReturn(err, geoposition){

  var connection = this;

  if(connection !== undefined){
    connection.updateDataAttribute("geoposition", geoposition);
    connection.initializeAttributes.initialized(err, "geoPosition");
    samsaara.emit('geoPosition', connection, err, geoposition);
    debug("geoPosition Retrieval Success", err, geoposition);
  }
  else{
    connection.initializeAttributes.initialized(new Error("Unknown Error: GeoPosition did not work"), "geoPosition");
    debug("geoPosition Retrieval Error", connection);
  }
}



module.exports = exports = main;