'use strict';

const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors());

var token = process.env.token;
if (typeof token !== 'undefined' && token) {
    console.log("spotify token is defined via env variable- using the real thing...");
    app.use('/play', require('./lib/player.js')());
    app.use('/currentTrack', require('./lib/currentTrack.js')());
    app.use('/trackInfo', require('./lib/trackInfo.js')());
} else {
    console.log("spotify token is NOT defined via env variable- using the mockup...");

    var mockup = require('./lib/mockup.js');
    app.use('/play', mockup["play"]);
    app.use('/currentTrack', mockup["currentTrack"]);
    app.use('/trackInfo', mockup["trackInfo"]);
}

//var swaggerUi = require('swagger-ui-express'),
//swaggerDocument = require('./swagger.json');
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;