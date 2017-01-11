'use strict';
const uuidv1 = require('node-uuid').v1;

module.exports = function(opts){
  this.name = opts.name;
  this.type = opts.type;
  this.moves = opts.move;
  this.id = uuidv1();
};
