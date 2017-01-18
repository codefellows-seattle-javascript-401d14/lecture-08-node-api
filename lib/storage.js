'use strict';

const data = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const storage = module.exports = {};
const dataDir = `${__dirname}/../data`;

storage.setItem = function(name, item){
  // TODO: check if directory exits
  return  fs.statAsync(`${dataDir}/${name}`)
  .catch(err => {
    err.status = 400;
    return Promise.reject(err);
  })
  .then(() => {
    let json = JSON.stringify(item);
    return fs.writeFileAsync(`${dataDir}/${name}/${item.id}.json`, json);
  })
  .then(() => item);
};

storage.getItem = function(name, id){
  // TODO: read json file parse and send back

  // TODO check if name dir xists if not 404
  return fs.statAsync(`${dataDir}/${name}/${id}.json`)
  // TODO check if JSON file with id name exists if not 404
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

storage.deleteItem = function(name, id){
  // TODO: use fs.statAsync to check if file exts
  // if not in catch blcok make the error a 404 and reject it
  if (!data[name] || !data[name][id]) {
    let err = new Error('item not found');
    err.status = 404;
    return Promise.reject(err);
  }

  delete data[name][id];
  return Promise.resolve();
};
