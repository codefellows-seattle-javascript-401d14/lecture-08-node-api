'use strict';
const uuidV4 = require('uuid/v4');

module.exports =  function (story){
  this.id = uuidV4();
  this.name = story.name;
  this.text = story.text;
};
