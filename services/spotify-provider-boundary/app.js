'use strict';

const express = require('express');
const app = express();
app.use('/play', require('./lib/player.js')());

module.exports = app;