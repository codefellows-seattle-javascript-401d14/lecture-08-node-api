'use strict';

const storage = require('../lib/storage.js');
const Beer = require('../model/beer.js');

module.exports = function(router){

  router.post('/api/beers', function(req, res){
    if(!req.body.name || !req.body.type || !req.body.strength) {
      console.error('requires, type, strength');
      res.statusCode = 400; // bad request
      res.end();
      return;
    }

    let beer = new Beer(req.body);

    storage.setItem('beers', beer)
    .then(beer => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(beer));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });

  router.get('/api/beers', function(req, res){
    let id = req.url.query.id;
    if(!id) {
      console.error('there was no id with the beer request');
      res.statusCode = 400;
      res.end();
      return;
    }

    storage.getItem('beers', id)
    .then(beer => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(beer));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.statusCode = err.status || 500;
      res.end();
    });
  });

  router.delete('/api/beers', function(req, res) {
    let id = req.url.query.id;
    if(!id) {
      console.error('The beer has been deeted');
      res.statusCode = 400;
      res.end();
      return;
    }
    storage.deleteItem('beers', id)
    .then(() => {
      res.statusCode = 204;
      res.end();
    })
    .catch(err => {
      console.error('There was no id that matched to delete');
      res.statusCode = err.status || 404;
      res.end();
    });
  });
};
