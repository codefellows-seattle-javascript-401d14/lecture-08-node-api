'use strict';

const storage = require('../lib/storage.js');
const Thundercat = require('../model/thundercat.js');

module.exports = function(router){

  router.post('/api/thundercats', function(req, res){
    // Step one: create a thundercat
    // Step two: store thundercat
    //   on success: send thundercat back
    //   on failer: send error back
    if(!req.body.name || !req.body.origin || !req.body.group){
      let err = new Error('Sword of Omens! Give me sight beyond sight! (⊙ ‿ ⊙)');
      console.error(err);
      res.statusCode = 400; // bad request
      res.end();
      return;
    }

    let thundercat = new Thundercat(req.body);

    storage.setItem('thundercats', thundercat)
    .then(thundercat => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(thundercat));
      res.end();
    })
    .catch(err => {
      //errors are never good Lion-o
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });

  router.get('/api/thundercats', function(req, res){
    let id = req.url.query.id;
    // TODO: put logic right here for a 400 if no id
    if (!req.url.query.id) {
      let err = new Error('Sword of Omens! Give me sight beyond sight! (⊙ ‿ ⊙)');
      console.error(err);
      res.statusCode = 400; // bad request
      res.end();
      return;
    }
    storage.getItem('thundercats', id)

    .then(thundercat => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(thundercat));
      res.end();
    })
    .catch(err => {
      // make better errors Lion-o
      // TODO:  put logic in here for a 404 if getItem didnt find a note
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });
};
