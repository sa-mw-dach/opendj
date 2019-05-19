'use strict';

const express = require('express');
const app = express();
var cors = require('cors');
var router = new express.Router();
var log4js = require('log4js')
var logger = log4js.getLogger();
logger.level = "trace";


app.use(cors());


function handleError(err, response) {
    logger.error('Error: ' + err);
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
    logger.log("kafkaClient error: %s -  reconnecting....", err);
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
    logger.log("kafkaClient  createTopics error: %s", error);
    logger.log("kafkaClient  createTopics result: %s", JSON.stringify(result));
});

var kafkaProducer = new kafka.Producer(kafkaClient);

kafkaProducer.on('ready', function() {
    logger.log("kafkaProducer is ready");
});
kafkaProducer.on('error', function(err) {
    logger.error("kafkaProducer error: %s", err);
});

var kafkaConsumer = new kafka.Consumer(kafkaClient, [
    { topic: TOPIC_INTERNAL }, // offset, partition
], {
    autoCommit: true,
    fromOffset: true
});

kafkaConsumer.on('message', function(message) {
    logger.debug("kafkaConsumer message: %s", JSON.stringify(message));

    if (message.topic != TOPIC_INTERNAL) {
        logger.error("ignoring unexpected message %s", JSON.stringify(message));
        return;
    }
    try {
        var payload = JSON.parse(message.value);
        if (payload != null && payload.eventID != null) {
            // TODO: Idempotency - check if our internal state is already newer
            // then we should ignore this message.
            logger.info("Adding new state for event %s", payload.eventID);
            mapOfEventStates[payload.eventID] = payload;
        }
    } catch (e) {
        logger.warn(" Exception %s while processing message - ignored", e);
    }
});

kafkaConsumer.on('error', function(error) {
    logger.error("kafkaConsumer error: %s", error);
});

function fireEventStateChange(eventState) {
    logger.debug("fireEventStateChange for eventID=%s", eventState.eventID);
    eventState.timestamp = new Date().toISOString();
    kafkaProducer.send([{
        topic: TOPIC_INTERNAL,
        key: eventState.eventID,
        messages: [JSON.stringify(eventState)]
    }], function(err, data) {
        logger.log("kafkaProducer.send err=%s", err);
        logger.log("kafkaProducer.send data=%s", JSON.stringify(data));
    });
    logger.debug("fireEventStateChange for eventID=%s DONE", eventState.eventID);
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// ------------------------------ spotify stuff -----------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyClientID = process.env.SPOTIFY_CLIENT_ID || "-unknown-";
var spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET || "-unknown-";
var spotifyRedirectUri = process.env.SPOTIFY_CALLBACK_URL || "-unknown-";
var spotifyScopes = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'playlist-modify-private'];


// Map of Spotify API Objects:
// Key: EventID
// Value: SpotifyWebApi Object
var mapOfSpotifyApis = {
    "42": null
}

// Example Object for an Event State - this is clone for all events:
var eventStatePrototype = {
    eventID: "-1", // ID of Music Event  
    access_token: null,
    refresh_token: null,
    client_state: "-unknown-",
    token_expires_in: "-unknown-",
    token_created: "unknown",
    isPlaying: false,
    currentTrack: "-unknown-",
    currentDevice: "-unknown-",
    timestamp: new Date().toISOString(),
};

// The Map of Event States:
// Key: EventID
// Value: EventState Object 
var mapOfEventStates = {
    "-1": eventStatePrototype
}


function getSpotifyApiForEvent(eventID) {
    var spotifyApi = mapOfSpotifyApis[eventID];

    if (spotifyApi == null) {
        logger.debug("Create SpotifyApi for eventID=%s...", eventID);
        logger.debug("clientId=%s, clientSecret=%s, redirectUri=%s", spotifyClientID, spotifyClientSecret, spotifyRedirectUri);
        spotifyApi = new SpotifyWebApi({
            clientId: spotifyClientID,
            clientSecret: spotifyClientSecret,
            redirectUri: spotifyRedirectUri
        });
        mapOfSpotifyApis[eventID] = spotifyApi;
        logger.debug("Create SpotifyApi for eventID=%s...DONE", eventID);
    }

    // Make sure Api has latest Tokens:
    var eventState = getEventStateForEvent(eventID);
    if (eventState.access_token != null && spotifyApi.getAccessToken() != eventState.access_token) {
        logger.debug("Update API access token from state");
        spotifyApi.setAccessToken(eventState.access_token);
    }
    if (eventState.refresh_token != null && spotifyApi.getRefreshToken() != eventState.refresh_token) {
        logger.debug("Update API refresh token from state");
        spotifyApi.setRefreshToken(eventState.refresh_token);
    }

    // TODO: Check if Access token did expire

    return spotifyApi;
}

function getEventStateForEvent(eventID) {
    var eventState = mapOfEventStates[eventID];
    if (eventState == null) {
        logger.debug("EvenState object created for eventID=%s", eventID);
        eventState = Object.assign({}, eventStatePrototype);
        eventState.eventID = eventID;
        eventState.timestamp = new Date().toISOString();
        mapOfEventStates[eventID] = eventState;
    }
    return eventState;
}

// We are using "Authorization Code Flow" as we need full access on behalf of the user.
// Read https://developer.spotify.com/documentation/general/guides/authorization-guide/ to 
// understand this, esp. the references to the the steps.

// step1: - generate the login URL / redirect...
router.get('/getSpotifyLoginURL', function(req, res) {
    logger.debug("getSpotifyLoginURL");

    // TODO: Error handling if EventID is not presenet
    var eventID = req.query.event;
    var spotifyApi = getSpotifyApiForEvent(eventID);
    var authorizeURL = spotifyApi.createAuthorizeURL(spotifyScopes, eventID);
    logger.debug("authorizeURL=%s", authorizeURL);

    res.send(authorizeURL);
});

// This is Step 2 of the Authorization Code Flow: 
// Redirected from Spotiy AccountsService after user Consent.
// We receive a code and need to trade that token into tokens:
router.get('/auth_callback', function(req, res) {
    logger.debug("auth_callback req=%s", JSON.stringify(req.query));
    var code = req.query.code;
    var state = req.query.state;
    var eventID = state;
    logger.debug("code = %s, state=%s", code, state);

    // TODO: Check on STATE!

    // Trade CODE into TOKENS:
    logger.debug("authorizationCodeGrant with code=%s", code);
    var spotifyApi = getSpotifyApiForEvent(eventID);
    spotifyApi.authorizationCodeGrant(code).then(
        function(data) {
            logger.debug("Access granted for eventID=%s!", eventID);
            logger.debug('The token expires in ' + data.body['expires_in']);
            logger.debug('The access token is ' + data.body['access_token']);
            logger.debug('The refresh token is ' + data.body['refresh_token']);

            // Set tokens on the Event Object to use it in later spotify API calls:
            var eventState = getEventStateForEvent(eventID);
            eventState.access_token = data.body['access_token'];
            eventState.refresh_token = data.body['refresh_token'];
            eventState.token_expires_in = data.body['expires_in'];
            eventState.token_created = new Date().toISOString();
            fireEventStateChange(eventState);

            // TODO: Sent a decent response, actually we need to redirect to a url
            // given in state!
            res.send('1');
        },
        function(err) {
            logger.debug('authorizationCodeGrant err=%s', err);
            handleError(err, res);
        }
    );
});

// Step 3 is using the access_token - omitted here for obvious reasons.

// Step 4 of the flow - refresh tokens!
function refreshAccessToken(event) {
    var api = getSpotifyApiForEvent(event.eventID);
    api.refreshAccessToken().then(
        function(data) {
            logger.debug('The access token has been refreshed for eventID=%s!', event.eventID);
            var newAccessToken = data.body['access_token'];
            var newRefreshToken = data.body['refresh_token'];
            var event = getEventStateForEvent(event.eventID);

            // Save the access token so that it's used in future calls
            api.setAccessToken(newAccessToken);
            api.setRefreshToken(newRefreshToken);
            event.access_token = newAccessToken;
            event.refresh_token = newRefreshToken;
            fireEventStateChange(event);
        },
        function(err) {
            logger.log('Could not refresh access token', err);
        }
    );
}

router.get('/getCurrentTrack', function(req, res) {
    logger.debug("getCurrentTrack");

    // TODO: Error handling if EventID is not present
    var eventID = req.query.event;
    var api = getSpotifyApiForEvent(eventID);

    api.getMyCurrentPlaybackState({}).then(function(data) {
        logger.debug("Now Playing: ", data.body);
        res.send(data.body);
    }, function(err) {
        handleError(err, res);
    });

});
router.get('/getAvailableDevices', function(req, res) {
    logger.debug("getAvailableDevices");

    // TODO: Error handling if EventID is not present
    var eventID = req.query.event;
    var api = getSpotifyApiForEvent(eventID);

    api.getMyDevices({}).then(function(data) {
        logger.debug("Now Playing: ", data.body);
        res.send(data.body);
    }, function(err) {
        handleError(err, res);
    });

});


if (typeof spotifyClientID !== 'undefined' && spotifyClientID) {
    logger.log("spotifyClientID is defined via env variable- using the real thing...");

    app.use('/play', require('./lib/player.js')());
    app.use('/currentTrack', require('./lib/currentTrack.js')());
    app.use('/trackInfo', require('./lib/trackInfo.js')());
} else {
    logger.log("spotify token is NOT defined via env variable- using the mockup...");

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