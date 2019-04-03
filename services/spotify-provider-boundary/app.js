'use strict';

/*
 *
 *  Copyright 2016-2017 Red Hat, Inc, and individual contributors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

//var env = process.env.SPOTIFY_CFG || "/tmp/spotify_cfg.js";
//var fs    = require("fs");
//var cfg = require(env);

//var SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ----------- Web Services ----------

app.post('/play', function (request, response) {
  
  var device = "4d5231b6a4a81a23f21171f00fb43b7e0d846a2c";
  var token = 'Bearer BQDKMdWhOy48u7wdcyWuEUw90flDSJRvxlWWk57wWFBwQ9OC_0KRXs57q7f7i71SXZN2xJup0ld3lXZkbi2Dk65YDDxe8nfEDIhG-RbI286ut_ScUWQuTB9Z612zJavSuEy2vX-N-WbqSvfp88-fQviDjmVv7v16A5-cOd8-_lzeU0u9HeojcAPtxu9SUSrYKwj9UCbZNBEU7xWKDI0PaUWjutjCIOx1C-vGk1BweGH-A_J0SDKgTvg2nRe1MH2zRi9fyuwaq4vnhQOAVw';
  var track = "0GjEhVFGZW8afUYGChu3Rr";

  var data = JSON.stringify({
    context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
    offset: {
      position : 5
    },
    position_ms:0
  });

  var options = {
    hostname: 'api.spotify.com',
    path: '/v1/me/player/play?device_id=' + device,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Accept' : 'application/json',
      'Authorization': token
    }
  };

  var req = https.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
      console.log('Body: ' + body);
    });
    response.end( JSON.stringify('Ok'));
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    response.end( JSON.stringify('Error'));
  });
  // write data to request body
  req.write(data);
  req.end();
  
});

module.exports = app;