'use strict';

const uuid = require('node-uuid');

module.exports = function(data){
  this.id = uuid.v1();
  this.athlete_name = data.athlete_name;
  this.sport = data.sport;
  this.created_at = new Date();
};
