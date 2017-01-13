'use strict';

const data = {};
const Promise = require('bluebird');
const storage = module.exports = {};
const dataDir = `${__dirname}/../data`;
const fs = Promise.promisifyAll(require('fs'));

storage.setItem = function(name, item) {
  return fs.statAsync(`${dataDir}/${name}`)
  .catch(err => {
    err.status = 400;
    return Promise.reject(err);
  })
  .then(() => {
    let json = JSON.stringify(item);
    return fs.writeFileAsync(`${dataDir}/${name}/${item.id}.json`, json);
  })
  .then(() => {
    return item;
  });
};

storage.getItem = function(name, id) {
  return fs.statAsync(`${dataDir}/${name}`)
  .catch(err => {
    return Promise.reject(err);
  })
  .then(() => {
    let json = JSON.stringify(id);
    return fs.readFileAsync(`${dataDir}/${name}/${id}.json`, json);
  })
  .then(() => {
    return id;
  });
};

storage.deleteItem = function(name, id) {
  return fs.statAsync(`${dataDir}/${name}`)
  .catch(err => {
    return Promise.reject(err);
  })
  .then(() => {
    let json = JSON.stringify(id);
    return fs.readFileAsync(`${dataDir}/${name}/${id}.json`, json);
  })
  .then(() => {
    delete id;
  })
};
// storage.setItem = function(name, item) {
//   if (!data[name]) data[name] = {};
//   data[name][item.id] = item;
//   return Promise.resolve(item);
// };

// storage.getItem = function(name, id) {
//   if (!data[name] || !data[name][id]) {
//     let err = new Error('item not found');
//     err.status = 404;
//     return Promise.reject(err);
//   }
//   return Promise.resolve(data[name][id]);
// };

// storage.deleteItem = function(name, id) {
//   if (!data[name] || !data[name][id]) {
//     let err = new Error('item not found');
//     err.status = 404;
//     return Promise.reject(err);
//   }
//   delete data[name][id];
//   return Promise.resolve();
// };
