'use strict';

var utils = require('../utils/writer.js');
var Pets = require('../service/PetsService');

module.exports.createPets = function createPets (req, res, next) {
  Pets.createPets()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listPets = function listPets (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  Pets.listPets(limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showPetById = function showPetById (req, res, next) {
  var petId = req.swagger.params['petId'].value;
  Pets.showPetById(petId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
