'use-strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const Beer = require('../model/beer.js');
const storage = require('../lib/storage.js');
const apiURL = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

describe('testing /api/beers', function(){
  describe('testing POST', function() {
    it ('should return a note', (done) => {
      superagent.post(`${apiURL}/api/beers`)
      .send({
        name: 'Double Dead Guy',
        type: 'IPA',
        strength: '7.9',
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Double Dead Guy');
        expect(res.body.type).to.equal('IPA');
        expect(res.body.strength).to.equal('7.9');
        expect(Boolean(res.body.id)).to.equal(true);
        expect(Boolean(res.body.created)).to.equal(true);
        done();
      })
      .catch(done);
    });
  });
  describe('with invalid input', function() {
  });
});

describe('testing GET', function() {
  describe('with valid input', function() {
    before((done) => {
      this.tempBeer = new Beer({name: 'hello', type: 'world', strength: 'YEAH'});
      storage.setItem('beers', this.tempBeer)
      .then(() => done())
      .catch(done);
    });

    it('should return a beer', (done) => {
      superagent.get(`${apiURL}/api/beers?id=${this.tempBeer.id}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(this.tempBeer.name);
        expect(res.body.type).to.equal(this.tempBeer.type);
        expect(res.body.strength).to.equal(this.tempBeer.strength);
        expect(res.body.id).to.equal(this.tempBeer.id);
        expect(new Date(res.body.created).toString()).to.equal(this.tempBeer.created.toString());
        expect(Boolean(res.body.created)).to.equal(true);
        expect(Boolean(res.body.id)).to.equal(true);
        done();
      })
      .catch(done);
    });
  });
  describe('with invalid input', function() {
    it('get /api/beers with no id should return a 400 status', (done) => {
      superagent.get(`${apiURL}/api/beers?`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
    it('get /api/beers wit bad id should return a 404 status', (done) => {
      superagent.get(`${apiURL}/api/beers?id=86753`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(500);
        done();
      })
      .catch(done);
    });
  });
});
