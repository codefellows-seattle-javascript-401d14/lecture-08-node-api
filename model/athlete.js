'use strict';

const uuidv1 = require('node-uuid');

module.exports = function(data){
  if (!data.athlete_name) throw new Error('Expected favorite athlete name.');
  if (!data.sport) throw new Error('Expected the sport your favorite athlete plays.');

  this.id = uuidv1();
  this.athlete_name = data.athlete_name;
  this.sport = data.sport;
  this.created_at = new Date();
  this.updated_at = new Date();
};
