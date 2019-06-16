'use strict';

const express = require('express');
const app = express();
var cors = require('cors');
var router = new express.Router();
var log4js = require('log4js')
var log = log4js.getLogger();
log.level = "trace";


app.use(cors());


function handleError(err, response) {
    log.error('Error: ' + err);
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
    log.log("kafkaClient error: %s -  reconnecting....", err);
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
    log.log("kafkaClient  createTopics error: %s", error);
    log.log("kafkaClient  createTopics result: %s", JSON.stringify(result));
});

var kafkaProducer = new kafka.Producer(kafkaClient);

kafkaProducer.on('ready', function() {
    log.log("kafkaProducer is ready");
});
kafkaProducer.on('error', function(err) {
    log.error("kafkaProducer error: %s", err);
});

var kafkaConsumer = new kafka.Consumer(kafkaClient, [
    { topic: TOPIC_INTERNAL }, // offset, partition
], {
    autoCommit: true,
    fromOffset: true
});

kafkaConsumer.on('message', function(message) {
    log.debug("kafkaConsumer message: %s", JSON.stringify(message));

    if (message.topic != TOPIC_INTERNAL) {
        log.error("ignoring unexpected message %s", JSON.stringify(message));
        return;
    }
    try {
        var payload = JSON.parse(message.value);
        if (payload != null && payload.eventID != null) {
            // TODO: Idempotency - check if our internal state is already newer
            // then we should ignore this message.
            log.info("Adding new state for event %s", payload.eventID);
            mapOfEventStates.set(payload.eventID, payload);
        }
    } catch (e) {
        log.warn(" Exception %s while processing message - ignored", e);
    }
});

kafkaConsumer.on('error', function(error) {
    log.error("kafkaConsumer error: %s", error);
});

function fireEventStateChange(eventState) {
    log.debug("fireEventStateChange for eventID=%s", eventState.eventID);
    eventState.timestamp = new Date().toISOString();
    kafkaProducer.send([{
        topic: TOPIC_INTERNAL,
        key: eventState.eventID,
        messages: [JSON.stringify(eventState)]
    }], function(err, data) {
        log.log("kafkaProducer.send err=%s", err);
        log.log("kafkaProducer.send data=%s", JSON.stringify(data));
    });
    log.debug("fireEventStateChange for eventID=%s DONE", eventState.eventID);
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
    token_expires: "-unknown-",
    token_created: "-unknown-",
    token_refresh_failures: -1,
    isPlaying: false,
    currentTrack: "-unknown-",
    currentDevice: "-unknown-",
    timestamp: new Date().toISOString(),
};

// The Map of Event States:
// Key: EventID
// Value: EventState Object 
var mapOfEventStates = new Map();


function getSpotifyApiForEvent(eventID) {
    log.trace("getSpotifyApiForEvent begin eventID=%s", eventID);
    var spotifyApi = mapOfSpotifyApis[eventID];

    if (spotifyApi == null) {
        log.debug("Create SpotifyApi for eventID=%s...", eventID);
        log.debug("clientId=>%s<, clientSecret=>%s<, redirectUri=>%s<", spotifyClientID, spotifyClientSecret, spotifyRedirectUri);
        spotifyApi = new SpotifyWebApi({
            clientId: spotifyClientID,
            clientSecret: spotifyClientSecret,
            redirectUri: spotifyRedirectUri
        });
        mapOfSpotifyApis[eventID] = spotifyApi;
        log.debug("Create SpotifyApi for eventID=%s...DONE", eventID);
    } else {
        log.trace("spotifyApiForEvent already present");

    }
    // Make sure Api has latest Tokens:
    var eventState = getEventStateForEvent(eventID);
    if (eventState.access_token != null && spotifyApi.getAccessToken() != eventState.access_token) {
        log.debug("Update API access token from state");
        spotifyApi.setAccessToken(eventState.access_token);
    }
    if (eventState.refresh_token != null && spotifyApi.getRefreshToken() != eventState.refresh_token) {
        log.debug("Update API refresh token from state");
        spotifyApi.setRefreshToken(eventState.refresh_token);
    }

    // TODO: Check if Access token did expire
    log.trace("getSpotifyApiForEvent end eventID=%s", eventID);
    return spotifyApi;
}

function getEventStateForEvent(eventID) {
    var eventState = mapOfEventStates.get(eventID);
    if (eventState == null) {
        log.debug("EvenState object created for eventID=%s", eventID);
        eventState = Object.assign({}, eventStatePrototype);
        eventState.eventID = eventID;
        eventState.timestamp = new Date().toISOString();
        mapOfEventStates.set(eventID, eventState);
    }
    return eventState;
}

function refreshExpiredTokens() {
    log.trace("refreshExpiredTokens begin");

    mapOfEventStates.forEach(refreshAccessToken);

    log.trace("refreshExpiredTokens end");
}

function updateEventTokensFromSpotifyBody(eventState, body) {
    var now = new Date();
    log.debug("updateEventTokensFromSpotifyBody body=%s", JSON.stringify(body));
    eventState.access_token = body['access_token'];
    eventState.refresh_token = body['refresh_token'];
    eventState.token_created = now.toISOString();
    eventState.token_expires = new Date(now.getTime() + 1000 * body['expires_in']).toISOString();
}


// We are using "Authorization Code Flow" as we need full access on behalf of the user.
// Read https://developer.spotify.com/documentation/general/guides/authorization-guide/ to 
// understand this, esp. the references to the the steps.

// step1: - generate the login URL / redirect...
router.get('/getSpotifyLoginURL', function(req, res) {
    log.debug("getSpotifyLoginURL");

    // TODO: Error handling if EventID is not presenet
    var eventID = req.query.event;
    var spotifyApi = getSpotifyApiForEvent(eventID);
    var authorizeURL = spotifyApi.createAuthorizeURL(spotifyScopes, eventID);
    log.debug("authorizeURL=%s", authorizeURL);

    res.send(authorizeURL);
});

// This is Step 2 of the Authorization Code Flow: 
// Redirected from Spotiy AccountsService after user Consent.
// We receive a code and need to trade that token into tokens:
router.get('/auth_callback', function(req, res) {
    log.debug("auth_callback req=%s", JSON.stringify(req.query));
    var code = req.query.code;
    var state = req.query.state;
    var eventID = state;
    log.debug("code = %s, state=%s", code, state);

    // TODO: Check on STATE!

    // Trade CODE into TOKENS:
    log.debug("authorizationCodeGrant with code=%s", code);
    var spotifyApi = getSpotifyApiForEvent(eventID);
    spotifyApi.authorizationCodeGrant(code).then(
        function(data) {
            log.debug("Access granted for eventID=%s!", eventID);
            log.debug('The token expires in ' + data.body['expires_in']);
            log.debug('The access token is ' + data.body['access_token']);
            log.debug('The refresh token is ' + data.body['refresh_token']);

            // Set tokens on the Event Object to use it in later spotify API calls:
            var eventState = getEventStateForEvent(eventID);
            updateEventTokensFromSpotifyBody(eventState, data.body);
            fireEventStateChange(eventState);

            // TODO: Sent a decent response, actually we need to redirect to a url
            // given in state!
            res.send('1');
        },
        function(err) {
            log.debug('authorizationCodeGrant err=%s', err);
            handleError(err, res);
        }
    );
});

// Step 3 is using the access_token - omitted here for obvious reasons.

// Step 4 of the flow - refresh tokens!
function refreshAccessToken(event) {
    log.trace("refreshAccessToken begin eventID=%s", event.eventID);

    // TODO: Refresh not only expired but also close to expiry, using a random interval

    if (Date.parse(event.token_expires) < Date.now()) {
        log.info("access token for eventID=%s is expired - initiating refresh... ", event.eventID);

        var api = getSpotifyApiForEvent(event.eventID);
        api.refreshAccessToken().then(
            function(data) {
                log.info("access token for^ eventID=%s is expired - initiating refresh...SUCCESS", event.eventID);
                updateEventTokensFromSpotifyBody(event, data.body);
                fireEventStateChange(event);
            },
            function(err) {
                event.token_refresh_failures++;
                log.log('Could not refresh access token', err);
            }
        );
    } else {
        log.debug("toking for eventID=%s  is still valid", event.eventID);
    }
    log.trace("refreshAccessToken end eventID=%s", event.eventID);
}

router.get('/getCurrentTrack', function(req, res) {
    log.debug("getCurrentTrack");

    // TODO: Error handling if EventID is not present
    var eventID = req.query.event;
    var api = getSpotifyApiForEvent(eventID);

    api.getMyCurrentPlaybackState({}).then(function(data) {
        log.debug("Now Playing: ", data.body);
        res.send(data.body);
    }, function(err) {
        handleError(err, res);
    });

});
router.get('/getAvailableDevices', function(req, res) {
    log.debug("getAvailableDevices");

    // TODO: Error handling if EventID is not present
    var eventID = req.query.event;
    var api = getSpotifyApiForEvent(eventID);

    api.getMyDevices({}).then(function(data) {
        log.debug("Now Playing: ", data.body);
        res.send(data.body);
    }, function(err) {
        handleError(err, res);
    });

});

// Problem: Init of 10 Pods concurrently and expiered tokens, - we need to avoid concurrent token refresh
// (actually we need to test that - could be that with a new refresh tokens, the 2nd call fails).
// Other approach: readiness check = false, wait a random interval 0-30 seconds, then check for expiered tokens. Assumption: one  pod checks first for expiered tokens and does the update, other pods get notified and when their interval experies, they see only current tokens.

// TODO: Implement Health and Readiness check.

// TODO: Implement token refresh during runtime - check every minute or so if tokens expy in the near future. Use a random interval for "near future" to avoid concurrent refreshs. If a refresh fails, we assume that another pod tried it already.
// If refresh_failure counter is too high, we notify to EventOwner.

// TODO: Implement Retries on Spotify API Calls.


if (typeof spotifyClientID !== 'undefined' && spotifyClientID) {
    log.log("spotifyClientID is defined via env variable- using the real thing...");

    app.use('/play', require('./lib/player.js')());
    app.use('/currentTrack', require('./lib/currentTrack.js')());
    app.use('/trackInfo', require('./lib/trackInfo.js')());
} else {
    log.log("spotify token is NOT defined via env variable- using the mockup...");

    var mockup = require('./lib/mockup.js');
    app.use('/play', mockup["play"]);
    app.use('/currentTrack', mockup["currentTrack"]);
    app.use('/trackInfo', mockup["trackInfo"]);
}



//var swaggerUi = require('swagger-ui-express'),
//swaggerDocument = require('./swagger.json');
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/backend-spotifyprovider", router);

// Wait 5 seconds for all messages to be processed, then check once for expired tokens:
setTimeout(refreshExpiredTokens, 5000);

setInterval(refreshExpiredTokens, 60000);

module.exports = app;