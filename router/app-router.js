'use strict';

const storage = require('../lib/storage.js');
const Athlete = require('../model/athlete.js');

module.exports = function(router) {
  router.post('/api/athletes', function(req, res) {
    if(!req.body.athlete_name || !req.body.sport) {
      res.statusCode = 400;
      res.end();
      return;
    }
    let athlete = new Athlete(req.body);
    storage.createItem('athletes', athlete)
    .then(athlete => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(athlete));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });

  router.get('/api/athletes', function(req, res){
    let id = req.url.query.id;
    if(!id) {
      storage.availIDs('athletes')
      .then(filenames => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(filenames));
        res.end();
      });
    }
    if(id){
      storage.fetchItem('athletes', id)
      .then(athlete => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(athlete));
        res.end();
      })
      .catch(err => {
        res.statusCode = err.status;
        res.end();
      });
    }
  });
  router.delete('/api/athletes', function(req, res) {
    let id = req.url.query.id;
    if(!id) {
      let err = new Error('ID does not exist');
      console.error(err);
      res.statusCode = 400;
      res.end();
    }
    storage.deleteItem('athletes', id)
    .then(() => {
      console.log('item deleted!');
      res.statusCode = 204;
      res.end();
    })
    .catch(err => {
      res.statusCode = err.status;
      console.log(err);
      res.end();
    });
  });
};
