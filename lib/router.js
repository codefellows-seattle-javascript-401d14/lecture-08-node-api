'use strict';
const url = require('url');
const querystring = require('querystring');
const bodyParser = require('./body-parser.js');
const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint,callback) {
  //endpoint and callback are key and value
  //endpoint = string callback = function
  this.routes.GET[endpoint] = callback; //maps the endpoint and callback to the route
};
Router.prototype.post = function(endpoint,callback){
  this.routes.POST[endpoint] = callback; //maps the endpoint and callback to the route
};
Router.prototype.put = function(endpoint,callback){
  this.routes.PUT[endpoint] = callback; //maps the endpoint and callback to the route
};
Router.prototype.delete = function(endpoint,callback){
  this.routes.DELETE[endpoint] = callback; //maps the endpoint and callback to the route
};

//http takes in a request and response
Router.prototype.route = function(){
  return (req,res) => {
    //logic for invoking route callbacks
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);

    //parse  JSON with post and put request then check if valid
    bodyParser(req)
    .then(body => {
      if(typeof this.routes[req.method][req.url.pathname]== 'function'){
        this.routes[req.method][req.url.pathname](req,res);
        return;
      }
      let err = new Error('the route can not be found');
      err.status = 404;
      return Promise.reject(err);
    })
    .catch(err => {
      if(err.status){
        res.statusCode = err.status;
        res.end();
        return;
      }
      res.status = 500; // internal server error
      res.end();
    });
  };
};
