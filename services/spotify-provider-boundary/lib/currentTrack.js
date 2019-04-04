var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var https = require('https');

var fs  = require("fs");

function playerRoute() {
    var router = new express.Router();
    router.use(cors());
    router.use(bodyParser());

    function handleError(err, response) {

        console.log('Error: ' + err);

        var error = {
            "message": err,
            "code": 500
        };
        response.writeHead(500);
        response.end(JSON.stringify(error));
    }

    router.get('/', function (request, response) {

        var token = process.env.token;
        var device = process.env.device;

        console.log("/currentTrack");
        console.log("token " + token);
        console.log("device " + device);

        var options = {
            hostname: 'api.spotify.com',
            path: '/v1/me/player/currently-playing',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        var req = https.request(options, function (res) {
            //console.log('Status: ' + res.statusCode);
            //console.log('Headers: ' + JSON.stringify(res.headers));

            res.setEncoding('utf8');

            var bodyStr = '';
            res.on('data', function (chunk) {
              bodyStr += chunk;
            });

            res.on('end', function () {
                //console.log('BODY: ' + bodyStr);
                var body = JSON.parse(bodyStr);
                var myResponse = {
                  "is_playing": body.is_playing,
                  "progress_ms":  body.progress_ms,
                  "duration_ms":  body.item.duration_ms,
                  "resourceURI": body.item.uri
                };
                
                console.log('response: ' + myResponse);
                response.end(JSON.stringify(myResponse));
            });

        });

        req.on('error', function (e) {
            handleError(e, response);
        });

//        req.write();
        req.end();
    });

    return router;
}

module.exports = playerRoute;
