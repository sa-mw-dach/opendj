var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var https = require('https');

var fs  = require("fs");

function playerRoute() {
    var playerRouter = new express.Router();
    playerRouter.use(cors());
    playerRouter.use(bodyParser());

    function handleError(err, response) {

        console.log('Error: ' + err);

        var error = {
            "message": err,
            "code": 500
        };
        response.writeHead(500);
        response.end(JSON.stringify(error));
    }

    playerRouter.post('/', function (request, response) {
        
        var token = process.env.token;
        var device = process.env.device;

        console.log(token);
        console.log(device);

        var track = request.body.track;

        if (typeof track === 'undefined') {
            handleError("No track defined in body", response);
        } else {
            var data = JSON.stringify({
                context_uri: track,
                offset: {
                    position: 5
                },
                position_ms: 0
            });

            var options = {
                hostname: 'api.spotify.com',
                path: '/v1/me/player/play?device_id=' + device,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            var req = https.request(options, function (res) {
                console.log('Status: ' + res.statusCode);
                console.log('Headers: ' + JSON.stringify(res.headers));

                res.setEncoding('utf8');

                res.on('data', function (body) {
                    console.log('Body: ' + body);
                });

                response.end(JSON.stringify('Ok'));
            });
            req.on('error', function (e) {
                handleError(e, response);
            });

            req.write(data);
            req.end();
        }
    });

    return playerRouter;
}

module.exports = playerRoute;