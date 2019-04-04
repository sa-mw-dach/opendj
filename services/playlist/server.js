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
	  resourceURI: {type: String},
	  trackName: {type: String},
      albumName: {type: String},
	  artistName: {type: String},
	  image: {type: String},
	  trackName: {type: String},
	  imageObject: {externalURI : {type: String}}
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

var getTrackByPlaylist = function (req, res) {
	if (req.playlist.tracks[0]){
		res.json(req.playlist.tracks[0])
	} else {
		res.status(404).send("empty list");
	}
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

var addTrackToPlaylist = function (req, res, next) {
  console.log("Request method");
  console.log(req.method);
  
  console.log("Request Body");
  console.log(req.body);
  //console.log(typeOf(req.body));
  
  var id = req.body._id;
  console.log("fetching teh following Playlist ID");
  console.log(id);
  console.log("Track Data")
  var newTrack = req.body.track;
  console.log(newTrack)
  Playlist.findOneAndUpdate({ _id: id }, { $push: { tracks: newTrack }}, {new: true}, function (err, playlist) {
    if (err) {
	  console.log(err);
      next(err);
    } else {

      res.json(playlist);
    }
  })
};

function createPartyMock() {
   var mockedPlaylist = new Playlist({_id : "0", name : "Dan's Playlist", tracks : []});
   //mockedPlaylist._id = "0";
   mockedPlaylist.save(function (err) {
    if (err) {
      next(err);
    } else {
      console.log("saved mocked playlist");
    }
    });
   //mockgoose.
}

router.route('/playlists')
  .post(createPlaylist)
  .get(getAllPlaylists);

router.route('/playlists/:playlistId')
  .get(getOnePlaylist)
  .put(updatePlaylist)
  .delete(deletePlaylist);

router.route('/playlists/:playlistId/firstTrack')
  .get(getTrackByPlaylist);

router.route('/getFirstTrack/:playlistId')
  .get(getTrackByPlaylist);


router.route('/addtrack')
  .post(addTrackToPlaylist);

router.param('playlistId', getByIdPlaylist);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

//init with seeding data
createPartyMock();


app.listen(port,ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
