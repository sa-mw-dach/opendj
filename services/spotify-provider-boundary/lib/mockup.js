var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var https = require('https');

var fs = require("fs");

var mockedState = {
    "is_playing": false,
    "progress_ms": 0,
    "duration_ms": 0,
    "playingStarted": 0,
    "resourceURI": "spotify:track:42nHgxhP9Muia0WSASl4yh"
};

var mockedTrackInfo = {
    "6JEK0CvvjDjjMUBFoXShNZ": {
        "trackName": "Never Gonna Give You Up",
        "albumName": "The Best Of",
        "artistName": "Rick Astley",
        "image": "https://i.scdn.co/image/a97f4035a3d494c68185a85e949a0b2fd75a1855",
        "duration_ms": 354320
    },
    "4u7EnebtmKWzUH433cf5Qv": {
        "trackName": "Bohemian Rhapsody - Remastered 2011",
        "albumName": "A Night At The Opera (2011 Remaster)",
        "artistName": "Queen",
        "image": "https://i.scdn.co/image/16f066184e92b296f9a202a326633a934607cb88",
        "duration_ms": 354320
    },
    "6h9AH81lpDbjcsBz2ClqAE": {
        "trackName": "The Time Is Now",
        "albumName": "Things to Make and Do",
        "artistName": "Moloko",
        "image": "https://i.scdn.co/image/cb832c02a2349ed0e44d06f433b7fbc4e6fce3d0",
        "duration_ms": 318280
    },
    "2GUESfQxaSuauM5fwiRkXb": {
        "trackName": "Ladies Night - Single Version",
        "albumName": "Celebration: The Best Of Kool & The Gang (1979-1987)",
        "artistName": "Kool & The Gang",
        "image": "https://i.scdn.co/image/1a79fc451775aa94985eada31f757957bb7c0d98",
        "duration_ms": 209706
    },
    "id": {
        "trackName": "",
        "albumName": "",
        "artistName": "",
        "image": "",
        "duration_ms": 0
    },
};

function handleError(err, response) {

    console.log('Error: ' + err);

    var error = {
        "message": err,
        "code": 500
    };
    response.writeHead(500);
    response.end(JSON.stringify(error));
}

var play = new express.Router();
play.use(cors());
play.use(bodyParser());

play.post('/', function(request, response) {
    var track = request.body.track;

    console.log("/play");
    console.log("track " + track);

    if (typeof track === 'undefined') {
        handleError("No track defined in body", response);
    } else {
        mockedState.is_playing = true;
        mockedState.progress_ms = 0;
        mockedState.duration_ms = 42000;
        mockedState.resourceURI = track;
        mockedState.playingStarted = new Date().getTime();
        response.end(JSON.stringify('Ok'));
    }
});


var currentTrack = new express.Router();
currentTrack.use(cors());
currentTrack.use(bodyParser());


currentTrack.get('/', function(request, response) {
    console.log("/currentTrack - returing mockup data");
    mockedState.progress_ms = new Date().getTime() - mockedState.playingStarted;
    if (mockedState.progress_ms > mockedState.duration_ms) {
        mockedState.progress_ms = mockedState.duration_ms;
        mockedState.is_playing = false;
    }

    console.log('mocked static response: ' + JSON.stringify(mockedState));
    response.end(JSON.stringify(mockedState));
});


var trackInfo = new express.Router();
trackInfo.use(cors());
trackInfo.use(bodyParser());

trackInfo.get('/:id', function(request, response) {

    var track = request.params.id;

    console.log("/trackInfo");
    console.log("track " + track);

    if (typeof track === 'undefined') {
        handleError("No track defined in body", response);
    } else {

        var myResponse = mockedTrackInfo[track];
        if (typeof myResponse === 'undefined') {
            handleError("Track not found", response);
        } else {
            console.log('response: ' + myResponse);
            response.end(JSON.stringify(myResponse));

        }
    }
});


module.exports = {
    "play": play,
    "currentTrack": currentTrack,
    "trackInfo": trackInfo
};