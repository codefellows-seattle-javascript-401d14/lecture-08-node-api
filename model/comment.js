'use strict';

const uuidv1 = require('node-uuid').v1;

module.exports = function (opts){
  this.announcer = opts.announcer;
  this.comment = opts.comment;
  this.id = uuidv1();
};
