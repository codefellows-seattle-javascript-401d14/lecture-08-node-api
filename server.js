'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const server = http.createServer((req,res) => {
  res.statusCode = 404;
  res.write('route Not Found');
  res.end();
  return;

});

server.listen(PORT, () => {
  console.log('server is up! OVOXO');
});
