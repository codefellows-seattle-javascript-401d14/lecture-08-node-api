'use strict';

const uuidv1 = require('node-uuid');

module.exports = function(opts){
  if (!opts.athlete_name) throw new Error('Expected favorite athlete name.');
  if (!opts.sport) throw new Error('Expected the sport your favorite athlete plays.');
  if (!opts.content) throw new Error('Expected some content about your favorite athlete. Tell us why.');

  this.id = uuidv1();
  this.athlete_name = opts.athlete_name;
  this.sport = opts.sport;
  this.vote_up = opts.vote_up;
  this.vote_down = opts.vote_down;
  this.image = opts.image;
  this.content = opts.content;
  this.created_at = new Date();
  this.updated_at = new Date();
};
