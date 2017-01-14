'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const storage = require('../lib/storage.js');

const apiURL = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

const Athlete = require('./../model/athlete');

describe('Athlete API Routes', function() {
  it('should create an instanceof Athlete', function(){
    describe('with valid input', function(){
      it('should return an athlete', (done) => {
        superagent.post(`${apiURL}/api/athletes`)
        .send({
          athlete_name: 'test athlete',
          sport: 'test sport',
        })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.athlete_name).to.equal('test athlete');
          expect(res.body.sport).to.equal('test sport');
          expect(Boolean(res.body.created_at instanceof Date)).to.equal(true);
          expect(Boolean(res.body.id)).to.equal(true);
          done();
        })
      .catch(done);
      });
    });
  });
});
