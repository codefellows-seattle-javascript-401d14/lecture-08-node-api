'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const Router = require('./lib/router.js');
const storyRouter = require('./router/storyrouter.js');

let router = new Router();

storyRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('sup guy?',PORT);
});
