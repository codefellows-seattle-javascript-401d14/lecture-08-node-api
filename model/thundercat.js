'use strict';

const uuidv1 = require('node-uuid').v1;

module.exports = function (opts){
  this.name = opts.name;
  this.origin = opts.origin;
  this.id = uuidv1();
  this.group = opts.group;
};
