'use strict';


/**
 * Returns the current weather for the requested location using the requested unit.
 *
 * greeting String Name of greeting
 * returns Hello
 **/
exports.helloWorldGet = function(greeting) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the current weather for the requested location using the requested unit.
 *
 * greeting String Name of greeting
 * returns Hello
 **/
exports.helloWorldPost = function(greeting) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

