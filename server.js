'use strict';

require('dotenv').load();

const http = require('http');
const PORT = process.env.PORT;

const Router = require('./lib/router.js');
let router = new Router();
const beerRouter = require('./router/beer-router.js');

beerRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server lit!');
});

// Code from lecture on 1/13
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const debug = require('debug')('beerapp:server');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const beerRouter = require('./router/beer-router.js');
// app.use(cors());
// app.use(morgan());
// app.use(beerRouter);

//
// app.get('/', function(req, res, next) {
// console.log('req.url', req.url);
// console.log('req.params', req.params);
// console.log('req.query', req.query);
// console.log('req.path', req.path);
//   res.send('hello world');
// });
//
// app.get('/api/beers/:id', function(req, res, next) {
// console.log('req.url', req.url);
// console.log('req.params', req.params);
// console.log('req.query', req.query);
// console.log('req.path', req.path);
//   res.send('hello world');
// });

// app.listen(process.env PORT, () => {
//   console.log('server lit', process.env.PORT);
// });
