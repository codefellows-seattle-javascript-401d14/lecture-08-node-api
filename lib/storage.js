'use strict';

const data = {};

const storage = module.exports = {};

storage.readItem = function(SchemaName, id) {
  if(!data[SchemaName] || !data[SchemaName][id]) {
    let err = new Error('item not found');
    err.status =404;
    return Promise.reject(err);
  }
  return Promise.resolve(data[SchemaName][id]);
};

storage.createItem = function(SchemaName, item) {
  if (!data[SchemaName]) data[name] = {};
  data[SchemaName][item.id] = item;
  return Promise.resolve(item);
};

storage.deleteItem = function(SchemaName, id) {
  if(!data[SchemaName] || !data[SchemaName][id]) {
    let err = new Error('item not found');
    err.status = 404;
    return Promise.reject(err);
  }
  delete data[SchemaName][id];
  return Promise.resolve();
};
