#samsaara time offset

[![Build Status](https://travis-ci.org/arjunmehta/node-samsaara-geolocation.svg?branch=1.0.0)](https://travis-ci.org/arjunmehta/node-samsaara-geolocation)

Time Offset middleware for [samsaara](https://www.github.com/arjunmehta/node-samsaara). Use this module to:

- **Calculate the clock time difference between server and clients.**

**Note:** *Use of this module requires familiarity with [samsaara](https://www.github.com/arjunmehta/node-samsaara) (of course). It's amazing and you'll love it. Get familiarized.*

## Installation

```bash
npm install --save samsaara-geolocation
```

## Basic Usage

### Client Side

Because there is no particularly unique API this module provides for the client, the only thing necessary is to include the geoLocation middleware to your client's instance of samsaara. Refer to the samsaara module documentation to see how to add middleware.

```javascript
var samsaara = require('samsaara')
var geoLocation = require('samsaara-geolocation')

samsaara
  .use(geoLocation)
  .initialize({
    socket: ws
  })
```


### Server Side

Now your samsaara server can request geoPosition information from clients if available. Just add the geolocation middleware to your samsaara instance. You can pass in the `forced` option to configure whether a client's geoLocation request must complete before initialization. If you're not familiar with what this means, definitely read this section in the samsaara readme about initialization.

```javascript
var samsaara = require('samsaara')
var geoLocation = require('samsaara-geolocation')

samsaara
  .use(geoLocation, {forced: true})
  .initialize({
    socketType: 'ws'
  })
```

#### Manually Query the Client's Location

You can also manually query the geo position of the client.

```javascript
samsaara.connection('connectionName').getCurrentPosition(function(err, position){
  if(!err) {
    console.log('the client\'s position is:', position.coords.latitude, position.coords.longitude)
  } else {
    console.error('client position error:', err)
  }
})
```


## License
The MIT License (MIT)

Copyright (c) 2015 Arjun Mehta