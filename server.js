'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Router = require('./lib/router');
const storage = require('./lib/storage');
const router = new Router();
const Athlete = require('./model/athlete');

router.get('/api/athlete', function(req, res) {
  if (req.url.query.id) {
    storage.readItem('athlete', req.url.query.id)
    .then(athlete => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(athlete));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('not found');
      res.end();
    });
    return;
  }
  if (!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});
router.post('/api/athlete', function(req, res) {
  try {
    let athlete = new Athlete(req.body.athlete_name, req.body.sport, req.body.content);
    storage.createItem('athlete', athlete);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(athlete));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});
router.delete('/api/athlete', function(req, res) {
  if (req.url.query.id) {
    storage.deleteItem('athlete', req.url.query.id)
    .then(() => {
      res.writeHead(204);
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('Athlete not found');
      res.end();
    });
    return;
  }
});
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server running $$$$', PORT);
});
