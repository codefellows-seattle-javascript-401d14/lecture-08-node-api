'use strict';

const storage = require('../lib/storage.js');
const Story = require('../model/constructor.js');

module.exports = function(router){
//**********************POST*************************************************
  router.post('/api/story', function(req, res){
    // Step one: create a note
    // Step two: store note
    //   on success: send note back
    //   on failer: send error back
    if(!req.body.name || !req.body.text){
      let err = new Error('Did not enter text');
      res.statusCode = 400; // bad request
      console.error(err);
      res.end();
      return;
    }
    let note = new Story(req.body);
    storage.setItem('story', note)
    .then(note => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      // make better errors
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });
  //**********************GET*************************************
  router.get('/api/story', function(req, res){
    let id = req.url.query.id;
    // TODO: put logic right here for a 400 if no id
    if(!id) {
      res.statusCode = 400;
      res.end();
      return;
    }
    storage.getItem('story', id)
    .then(note => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(note));
      res.end();
    })
    // TODO:  put logic in here for a 404 if getItem didnt find a note
    .catch(err => {
      res.statusCode = err.status;
      console.error(err);
      res.end();
    });
  });
  //**********************DELETE*************************************
  router.delete('/api/story', function (req, res){
    let id =req.url.query.id;
    if (!id) {
      res.statusCode = 400;
      res.end();
      return;
    }
    storage.deleteItem('story', id)
    .then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 204;
      res.end();
    })
    .catch(err => {
      res.statusCode = err.status;
      console.error(err);
      res.end();
      return;
    });
      // make better errors
    res.statusCode = 500;
    res.end();
  });
};
