'use strict';

const express = require('express');
const debug = require('debug')('spotify-provider')
const app = express();
var cors = require('cors');
var router = new express.Router();



app.use(cors());


function handleError(err, response) {
    console.error('Error: ' + err);
    var error = {
        "message": err,
        "code": 500
    };
    response.writeHead(500);
    response.end(JSON.stringify(error));
}



// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------ kafka stuff -----------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
const TOPIC_INTERNAL = "opendj-spotifyprovider-internal";

var kafkaURL = process.env.kafkaURL || "localhost:9092"
var kafka = require('kafka-node')
var kafkaClient = new kafka.KafkaClient({
    kafkaHost: kafkaURL,
    connectTimeout: 1000,
    requestTimeout: 500,
    autoConnect: true,
    connectRetryOptions: {
        retries: 10,
        factor: 1,
        minTimeout: 1000,
        maxTimeout: 1000,
        randomize: true,
    },
    idleConnection: 60000,
    reconnectOnIdle: true,
});
kafkaClient.on('error', function(err) {
    console.log("kafkaClient error: %s -  reconnecting....", err);
    kafkaClient.connect();
});

kafkaClient.connect();

// ------- Make sure topics do exit:
var topicsToCreate = [{
    topic: TOPIC_INTERNAL,
    partitions: 1,
    replicationFactor: 1,
    configEntries: [
        { name: "retention.ms", value: "43200000" }, // 12hours for start, should be 48hours!
    ]
}, ];
kafkaClient.createTopics(topicsToCreate, (error, result) => {
    console.log("kafkaClient  createTopics error: %s", error);
    console.log("kafkaClient  createTopics result: %s", JSON.stringify(result));
});

var kafkaProducer = new kafka.Producer(kafkaClient);

kafkaProducer.on('ready', function() {
    console.log("kafkaProducer is ready");
});
kafkaProducer.on('error', function(err) {
    console.error("kafkaProducer error: %s", err);
});

var kafkaConsumer = new kafka.Consumer(kafkaClient, [
    { topic: TOPIC_INTERNAL }, // offset, partition
], {
    autoCommit: true,
    fromOffset: true
});

kafkaConsumer.on('message', function(message) {
    console.debug("kafkaConsumer message: %s", JSON.stringify(message));

    if (message.topic != TOPIC_INTERNAL) {
        console.error("ignoring unexpected message %s", JSON.stringify(message));
        return;
    }
    try {
        var payload = JSON.parse(message.value);
        if (payload != null && payload.eventID != null) {
            console.info("Adding new state for event %s", payload.eventID);
            mapOfEventStates[payload.eventID] = payload;
        }
    } catch (e) {
        console.warn(" Exception %s while processing message - ignored", e);
    }
});

kafkaConsumer.on('error', function(error) {
    console.error("kafkaConsumer error: %s", error);
});

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// ------------------------------ spotify stuff -----------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
//var token = process.env.token;
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyClientID = process.env.spotifyClientID || "-unknown-";
var spotifyClientSecret = process.env.spotifyClientSecret || "-unknown-";
var spotifyRedirectUri = process.env.spotifyCallbackURL || "-unknown-";
var spotifyScopes = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'playlist-modify-private'];


// Key: EventID
// Value: EventState Object 
var mapOfEventStates = {
    "42": {
        "eventID": "42",
        "access_token": "-unknown-",
        "refresh_token": "-unknown-",
        "client_state": "-unknown-",
        "valid_until": "-unknown-",
        "created": "unknown",
    }
}

console.log("create SpotifyWebApi...");
var spotifyApi = new SpotifyWebApi({
    clientId: spotifyClientID,
    clientSecret: spotifyClientSecret,
    redirectUri: spotifyRedirectUri
});

// We are using "Authorization Code Flow" as we need full access on behalf of the user.
// Read https://developer.spotify.com/documentation/general/guides/authorization-guide/ to 
// understand this, esp. the references to the the steps.

// TODO: step1: - generate the URL...


// This is Step 2 of the Authorization Code Flow: 
// Redirected from Spotiy AccountsService after user Consent.
// We receive a code and need to trade that token into tokens:
console.debug("create Spotify auth callback...");
router.get('/auth_callback', function(req, res) {
    //    debug("auth_callback req=%s", JSON.stringify(req));
    var code = req.query.code;
    var eventId = code;
    debug("code = %s", code);

    // TODO: Check on STATE!

    // Trade CODE into TOKENS:

    var eventState = {
        "eventID": eventId,
        "access_token": "-unknown-",
        "refresh_token": "-unknown-",
        "client_state": "-unknown-",
        "valid_until": "-unknown-",
        "created": "unknown",
    };


    kafkaProducer.send([{
        topic: TOPIC_INTERNAL,
        key: eventState.eventID,
        messages: [JSON.stringify(eventState)]
    }], function(err, data) {
        console.log("kafkaProducer.send err=%s", err);
        console.log("kafkaProducer.send data=%s", JSON.stringify(data));
    });



    res.send('1');
    /*    
        spotifyApi.authorizationCodeGrant(code).then(
            function(data) {
                console.log('The token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                console.log('The refresh token is ' + data.body['refresh_token']);

                // Set the access token on the API object to use it in later calls
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);


                // TODO: Store token in internal state and broadcast them via kafka

                // TODO: Sent a decent response!
                res.send('1');
            },
            function(err) {
                handleError(err, res);
            }
        );
    */

});

// Step 3 is using the access_token - omitted here for obvious reasons.

// Step 4 of the flow - refresh tokens!
console.debug("SpotifyApi refreshAccessToken");
spotifyApi.refreshAccessToken().then(
    function(data) {
        console.info('The access token has been refreshed!');

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);

        // TODO: What about the refresh token? Could be changed, to, right?
        // TODO: Store token in interal state and broadcast them via kafka
    },
    function(err) {
        console.log('Could not refresh access token', err);
    }
);



if (typeof spotifyClientID !== 'undefined' && spotifyClientID) {
    console.log("spotifyClientID is defined via env variable- using the real thing...");

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

app.use("/backend-spotifyprovider", router);


module.exports = app;