'use strict';

const storage = require('../lib/storage.js');
const Comment = require('../model/Comment.js');

module.exports = function(router){

  router.post('/api/comments', function(req,res){
    if(!req.body.comment || !req.body.announcer){
      let err = new Error('this is an error, stop talking please');
      console.error(err);
      res.statusCode = 400;
      res.end();
      return;
    }

    let comment = new Comment(req.body);

    storage.setItem('comments', comment)
    .then(comment => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(comment));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });
};
