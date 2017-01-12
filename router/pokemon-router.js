'use strict';

const storage = require('../lib/storage.js');
const Pokemon = require('../model/pokemon.js');

module.exports = function(router){

  router.post('/api/pokemon', function(req, res){
    if(!req.body.name || !req.body.type){
      let err = new Error('Sorry you didn\'t catch them all :/');
      console.error(err);
      res.statusCode = 400;
      res.end();
      return;
    }

    let pokemon = new Pokemon(req.body);
    storage.setItem('pokemon', pokemon)
    .then(pokemon => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(pokemon));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });

  router.get('/api/pokemon', function(req,res){
    let id = req.url.query.id;
    if(!id){
      let err = new Error('Sorry you didn\'t catch them all, enter a proper id:/');
      console.error(err);
      res.statusCode = 400;
      res.end();
      return;
    }

    storage.getItem('pokemon', id)
    .then(pokemon => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(pokemon));
      res.end();
    })
    .catch(err => {
      res.statusCode = err.status;
      res.end();
    });
  });

  router.delete('/api/pokemon', function(req,res){
    let id = req.url.query.id;
    if(!id){
      let err = new Error('Sorry you didn\'t catch them all, enter a proper id:/');
      console.error(err);
      res.statusCode = 400;
      res.end();
      return;
    }

    storage.deleteItem('pokemon', id)
    .then(() => {
      res.statusCode = 200;
      res.end();
    })
    .catch(err => {
      res.statusCode = err.status;
      res.end();
    });
  });

  router.put('/api/pokemon', function(req,res){
    let id = req.url.query.id;
    if(!id){
      let err = new Error('Sorry you didn\'t catch them all, enter a proper id:/');
      console.error(err);
      res.statusCode = 400;
      res.end();
      return;
    }

    storage.getItem('pokemon', id)
    .then(pokemon => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(pokemon));
      res.end();
    })
    .catch(err => {
      res.statusCode = err.status;
      res.end();
    });
  });
};
