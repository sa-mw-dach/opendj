'use strict';

//mongoose file must be loaded before all other files in order to provide
// models to other modules
var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');


  var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
      mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
      mongoURLLabel = "";


var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Mockgoose = require('mock-mongoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
mockgoose.prepareStorage().then(function() {
    mongoose.connect('mongodb://mongodb-playlist:27017/playlist');
});

var PlaylistSchema = new Schema({
  _id: {type: String},
  name: {type: String},
  tracks: [{
	  resourceURI: String,
	  artistName: String,
	  imageObject: {externalURI : String}
	  }]
});

mongoose.model('Playlist', PlaylistSchema);
var Playlist = require('mongoose').model('Playlist');

var app = express();

// handle cors
app.use(cors());

//rest API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//middleware for create
var createPlaylist = function (req, res, next) {
  var playlist = new Playlist(req.body);

  playlist.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(playlist);
    }
  });
};

//put
var updatePlaylist = function (req, res, next) {
  Playlist.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, playlist) {
    if (err) {
      next(err);
    } else {
      res.json(playlist);
    }
  });
};

//delete
var deletePlaylist = function (req, res, next) {
  req.playlist.remove(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(req.playlist);
    }
  });
};

//get
var getAllPlaylists = function (req, res, next) {
  Playlist.find(function (err, playlists) {
    if (err) {
      next(err);
    } else {
      res.json(playlists);
    }
  });
};

//get
var getOnePlaylist = function (req, res) {
  res.json(req.playlist);
};

var getByIdPlaylist = function (req, res, next, id) {
  Playlist.findOne({_id: id}, function (err, playlist) {
    if (err) {
      next(err);
    } else {
      req.playlist = playlist;
      next();
    }
  });
};

var getTrackByPlaylist = function (req, res, next) {
  var id = req.body._id;
  Playlist.findOne({ _id: id }, function (err, playlist) {
    if (err) {
      next(err);
    } else {
      res.json(playlist.tracks[0]);
    }
  })
};

var addTrackToPlaylist = function (req, res, next) {
  var id = req.body._id;
  var newTrack = req.body.track;
  Playlist.findOneAndUpdate({ _id: id }, { $push: { tracks: newTrack }}, function (err, playlist) {
    if (err) {
      next(err);
    } else {
      res.json(playlist);
    }
  })
};


router.route('/playlists')
  .post(createPlaylist)
  .get(getAllPlaylists);

router.route('/playlists/:playlistId')
  .get(getOnePlaylist)
  .put(updatePlaylist)
  .delete(deletePlaylist);

router.route('/playlists/:playlistId/firstTrack')
  .get(getTrackByPlaylist)

router.route('/addtrack')
  .post(addTrackToPlaylist)

router.param('playlistId', getByIdPlaylist);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.listen(port,ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
