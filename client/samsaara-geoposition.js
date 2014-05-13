/*!
 * Samsaara Client Geoposition Module
 * Copyright(c) 2014 Arjun Mehta <arjun@newlief.com>
 * MIT Licensed
 */

var geoPosition = (function(module){

  module.internalMethods = {

    getGeoPosition: function(callBack){

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position){
          samsaara.geoposition = position;
          if(typeof callBack === "function") callBack(null, position);
        }, function (err){
          if(typeof callBack === "function") callBack(err, null);
        });
      }      
    }
  };

  module.initializationMethods = {};
  module.closeMethods = {};

  return module;

}(this.geoPosition = this.geoPosition || {}));

samsaara.use(geoPosition);