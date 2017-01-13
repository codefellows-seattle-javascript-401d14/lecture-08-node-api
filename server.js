'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Router = require('./lib/router');
const appRouter = require('./router/app-router');

let router = new Router();

appRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server running $$$$', PORT);
});
