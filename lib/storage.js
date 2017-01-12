'use strict';

const data = {};

const storage = module.exports = {};

storage.readItem = function(athlete, id) {
  if(!data[athlete] || !data[athlete][id]) {
    let err = new Error('item not found');
    err.status =404;
    return Promise.reject(err);
  }
  return Promise.resolve(data[athlete][id]);
};
storage.createItem = function(athlete, item) {
  if (!athlete) return Promise.reject(new Error('expected athlete'));
  if (!item) return Promise.reject(new Error('expected item'));
  if (!storage[athlete]) storage[athlete] = {};
  storage[athlete][item.id] = item;
  console.log('storage:', storage);
  return Promise.resolve(item);
};
storage.deleteItem = function(athlete, id) {
  return new Promise((resolve, reject) => {
    if (!athlete) return Promise.reject(new Error('expected athlete name'));
    if (!id) return reject(new Error('expected id'));

    let athlete = storage[athlete];
    if(!athlete) return reject(new Error('athlete not found'));

    delete athlete[id];
    console.log('storage:', storage);
    resolve();
  });
};
