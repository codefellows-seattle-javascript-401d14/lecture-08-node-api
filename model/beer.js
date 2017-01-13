'use strict';

const uuidv1 = require('node-uuid').v1;

module.exports = function(opts) {
  this.name = opts.name;
  this.type = opts.type;
  this.strength = opts.strength;
  this.id = uuidv1();
  this.created = new Date();
};
