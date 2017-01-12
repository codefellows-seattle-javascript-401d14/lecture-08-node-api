'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Router = require('./lib/router.js');
const pokemonRouter = require('./router/pokemon-router.js');

let router = new Router();

pokemonRouter(router);


//returns function with req,res
const server = http.createServer(router.route());


server.listen(PORT, () => {
  console.log('server is up! OVOXO');
});
