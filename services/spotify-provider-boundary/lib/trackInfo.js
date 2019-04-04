var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var https = require('https');

function trackInfoRoute() {
    var trackInfo = new express.Router();
    trackInfo.use(cors());
    trackInfo.use(bodyParser());

    function handleError(err, response) {

        console.log('Error: ' + err);

        var error = {
            "message": err,
            "code": 500
        };
        response.writeHead(500);
        response.end(JSON.stringify(error));
    }

    trackInfo.get('/:id', function (request, response) {
        var token = process.env.token;
        var device = process.env.device;

        console.log(request.params);
        var track = request.params.id;

        if (typeof track === 'undefined') {
            handleError("No track defined in body", response);
        } else {
            var data = JSON.stringify({
                uris: [track],
                position_ms: 0
            });

            var options = {
                hostname: 'api.spotify.com',
                path: '/v1/tracks/' + track,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            var req = https.request(options, function (res) {
                console.log('Status: ' + res.statusCode);
                console.log('Headers: ' + JSON.stringify(res.headers));

                res.setEncoding('utf8');

                var bodyStr = '';
                res.on('data', function (chunk) {
                    bodyStr += chunk;
                });

                res.on('end', function () {
                    console.log('BODY: ' + bodyStr);
                    var body = JSON.parse(bodyStr);

                    var myResponse = {
                        "trackName": body.name,
                        "albumName": body.album.name,
                        "artistName" : body.artists[0].name,
                        "image": body.album.images[0].url
                    };

                    console.log('myResponse: ' + myResponse);
                    response.end(JSON.stringify(myResponse));
                });

            });

            req.on('error', function (e) {
                handleError(e, response);
            });

            req.end();
        }
    });

    return trackInfo;
}

module.exports = trackInfoRoute;