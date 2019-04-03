'use strict';

var utils = require('../utils/writer.js');
var Hello = require('../service/HelloService');

module.exports.helloWorldGet = function helloWorldGet (req, res, next) {
  var greeting = req.swagger.params['greeting'].value;
  Hello.helloWorldGet(greeting)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.helloWorldPost = function helloWorldPost (req, res, next) {
  var greeting = req.swagger.params['greeting'].value;
  Hello.helloWorldPost(greeting)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
