'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const Router = require('./lib/router.js');
const announcerCommentRouter = require('./lib/announcerCommentRouter.js');

let router = new Router();

announcerCommentRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('Spooky ʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʔ-̫͡-ʕ•̫͡•ʔ*̫͡*ʔ-̫͡-ʔ Server', PORT);
});
