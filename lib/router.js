'use strict'; //adds better warnings and gives us es6 features

const url = require('url');
const querystring = require('querystring');
const parseMyBody = require('./parse-my-body.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback){ //define a method GET that takes a method and a callback//
  this.routes.GET[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function(){
  return(req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    parseMyBody(req)
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] == 'function'){
        this.routes[req.method][req.url.pathname](req,res);
        return;
      }
      let err = new Error('route not found');
      err.status = 404;
      return Promise.reject(err);
    })
    .catch(err => {
      console.error(err);
      if(err.status){
        res.statusCode = err.status;
        res.end();
        return;
      }
      res.status = 500;
      res.end();
    });
  };
};
