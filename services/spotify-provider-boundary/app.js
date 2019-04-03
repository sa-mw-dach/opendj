'use strict';

const express = require('express');
const app = express();
app.use('/play', require('./lib/player.js')());
app.use('/currentTrack', require('./lib/currentTrack.js')());

module.exports = app;
