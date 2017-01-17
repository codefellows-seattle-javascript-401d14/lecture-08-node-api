'use strict';

const Promise = require('bluebird');
const storage = module.exports = {};
const fs = Promise.promisifyAll(require('fs'));
const dataDir = `${__dirname}/../data`;

storage.setItem = function(name, item) {
  return fs.statAsync(`${dataDir}/${name}`)
  .then(() => {
    let json = JSON.stringify(item);
    return fs.writeFileAsync(`${dataDir}/${name}/${item.id}.json`, json);
  })
  .then(() => item);
};

storage.getItem = function(name, id){
  return fs.statAsync(`${dataDir}/${name}/${id}.json`)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.readFileAsync(`${dataDir}/${name}/${id}.json`);
  })
  .then(data => {
    return JSON.parse(data.toString());
  });
};


storage.deleteItem = function(name, id) {
  return fs.statAsync(`${dataDir}/${name}/${id}.json`)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    fs.unlinkAsync(`${dataDir}/${name}/${id}.json`);
    return Promise.resolve();
  });
};
