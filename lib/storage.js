'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const storage = module.exports = {};

const dataDir = `${__dirname}/../data`;

storage.createItem = function(SchemaName, item) {
  if (!(`${dataDir}/${SchemaName}`)) {
    fs.mkdirAsync(`${dataDir}/${SchemaName}`);
  }
  return fs.statAsync(`${dataDir}/${SchemaName}`)
  .catch(err => {
    err.status = 400;
    return Promise.reject(err);
  })
  .then(() => {
    let json = JSON.stringify(item);
    return fs.writeFileAsync(`${dataDir}/${SchemaName}/${item.id}.json`, json);
  });
};

storage.readItem = function(SchemaName, id) {
  if (!(`${dataDir}/${SchemaName}`) || !(`${dataDir}/${SchemaName}/${id}`))  {
    let err = new Error('item not found');
    err.status =404;
    return Promise.reject(err);
  }
  return fs.statAsync(`${dataDir}/${SchemaName}/${id}.json`)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.readFileAsync(`${dataDir}/${SchemaName}/${id}.json`);
  })
  .then(data => {
    return JSON.parse(data.toString());
  });
};

storage.deleteItem = function(SchemaName, id) {
  return fs.readFileAsync(`${dataDir}/${SchemaName}/${id}.json`)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    fs.unlinkAsync(`${dataDir}/${SchemaName}/${id}.json`);
    return Promise.resolve();
  });
};
