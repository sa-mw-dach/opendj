'use strict';

const express = require('express');
const app = express();

app.use('/play', require('./lib/player.js')());
app.use('/currentTrack', require('./lib/currentTrack.js')());
app.use('/trackInfo', require('./lib/trackInfo.js')());

//var swaggerUi = require('swagger-ui-express'),
//swaggerDocument = require('./swagger.json');
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
