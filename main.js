/*!
 * Samsaara Client Geoposition Module
 * Copyright(c) 2014 Arjun Mehta <arjun@newlief.com>
 * MIT Licensed
 */



function geoPosition(options){

  var config,
      connectionController,
      communication,
      ipc;


  /**
   * Connection Initialization Methods
   * Called for every new connection
   *
   * @opts: {Object} contains the connection's options
   * @connection: {SamsaaraConnection} the connection that is initializing
   * @attributes: {Attributes} The attributes of the SamsaaraConnection and its methods
   */

  function connectionInitialzation(opts, connection, attributes){

    connection.updateDataAttribute("geoposition", null);

    if(opts.geoPosition !== undefined){
      console.log("Initializing geoPosition...");
      if(opts.geoPosition === "force") attributes.force("geoPosition");
      communication.sendToClient(connection.id, {internal: "getGeoPosition"}, geoPositionReturn);
    }    
  }


  /**
   * Foundation Methods
   */

  function geoPositionReturn(err, geoposition){

    var connection = this.connection;

    if(connection !== undefined){
      connection.updateDataAttribute("geoposition", geoposition);
      connection.initializeAttributes.initialized(err, "geoPosition");
      samsaara.emit('geoPosition', connection, err, geoposition);
    }
    else{
      connection.initializeAttributes.initialized(new Error("Unknown Error: GeoPosition did not work"), "geoPosition");
      console.log("geoPosition Retrieval Error", connection);
    }
  }

  /**
   * Module Return Function.
   * Within this function you should set up and return your samsaara middleWare exported
   * object. Your eported object can contain:
   * name, foundation, remoteMethods, connectionInitialization, connectionClose
   */

  return function geoPosition(samsaaraCore){

    config = samsaaraCore.config;
    connectionController = samsaaraCore.connectionController;
    communication = samsaaraCore.communication;
    ipc = samsaaraCore.ipcRedis;

    samsaaraCore.addClientFileRoute("samsaara-geoposition.js", __dirname + '/client/samsaara-geoposition.js');

    var exported = {

      name: "geoPosition",

      clientScript: __dirname + '/client/samsaara-geoposition.js', 

      connectionInitialization: {
        geoPosition: connectionInitialzation
      }

    };

    return exported;

  };

}

module.exports = exports = geoPosition;