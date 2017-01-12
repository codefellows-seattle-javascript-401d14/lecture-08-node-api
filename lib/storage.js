'use strict';

// const data ={};
const storage = module.exports = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const dataDirectory = `${__dirname}/../data`;

storage.setItem = function(name,item){
  // if (!data[name])
  //   data[name] = {};
  // data[name][item.id] = item;
  // return Promise.resolve(item);
  return fs.statAsync(`${dataDirectory}/${name}`)
  .catch(err => {
    err.status = 400;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.writeFileAsync(`${dataDirectory}/${name}/${item.id}.json`, JSON.stringify(item));
  })
  .then(() => {
    return Promise.resolve(item);
  });

};

storage.getItem = function(name,id){
  // if (!data[name] || !data[name][id]) {
  //   let err = new Error('item not found');
  //   err.status = 404;
  //   return Promise.reject(err);
  // }
  // return Promise.resolve(data[name][id]);
  let dataPathID = `${dataDirectory}/${name}/${id}.json`;
  return fs.statAsync(dataPathID)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.readFileAsync(dataPathID);
  })
  .then((data) => {
    return Promise.resolve(JSON.parse(data.toString()));
  });
};


storage.deleteItem = function(name, id){
  // if (!data[name] || !data[name][id]) {
  //   let err = new Error('item not found');
  //   err.status = 404;
  //   return Promise.reject(err);
  // }
  // delete data[name][id];
  // return Promise.resolve();
  let dataPathID = `${dataDirectory}/${name}/${id}.json`;
  return fs.statAsync(dataPathID)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.unlinkAsync(dataPathID);
  })
  .then(() => {
    return Promise.resolve();
  });
};

storage.deleteAllItems = function(name){
  let dataPath = `${dataDirectory}/${name}`;
  return fs.statAsync(dataPath)
  .catch(err => {
    err.status = 400;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.unlinkAsync(dataPath);
  })
  .then(() => {
    return Promise.resolve();
  });
};
