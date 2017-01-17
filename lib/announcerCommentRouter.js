'use strict';

const storage = require('../lib/storage.js');
const Comment = require('../model/Comment.js');

module.exports = function(router){

  router.post('/api/comments', function(req,res){
    if(!req.body.comment || !req.body.announcer){
      res.statusCode = 400;
      res.end();
      return;
    }

    let comment = new Comment(req.body);

    storage.createItem('comments', comment)
    .then(comment => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(comment));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.statusCode = err.status || 500;
      res.end();
    });
  });
  router.get('/api/comments', function(req,res){
    let id = req.url.query.id;
    if(!id){
      res.statusCode = 400;
      res.end();
      return;
    }
    storage.readItem('comments', id)
    .then(comment => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(comment));
      res.end();
    })
    .catch(err => {
      res.statusCode = err.status || 500;
      res.end();
    });
  });
  router.delete('/api/comments', function(req,res){
    let id = req.url.query.id;
    if(!id){
      let err = new Error('omg id doesnt exist in this realm');
      console.error(err);
      res.statusCode = 400;
      res.end();
      return;
    }
    storage.deleteItem('comments', id)
    .then(() => {
      console.log('hey guess what its been deletoed cheeto');
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
