'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const Thundercat = require('../model/thundercat.js');
const storage = require('../lib/storage.js');

const apiURL = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

describe('testing /api/thundercats', function(){
  describe('testing POST', function(){
    describe('with valid input', function(){
      it('should return a thundercat', (done) => {
        superagent.post(`${apiURL}/api/thundercats`)
        .send({
          name: 'lion-o',
          origin: 'thundera',
          group: 'thundercats',
        })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('lion-o');
          expect(res.body.origin).to.equal('thundera');
          expect(res.body.group).to.equal('thundercats');
          expect(Boolean(res.body.id)).to.equal(true);
          done();
        })
        .catch(done);
      });
    });

    describe('with invalid input', function(){
    });
  });

  describe('testing GET', function(){
    describe('with valid input', function(){
      // mock thundercat for testing. Not a true thundera castaway
      before((done) => {
        this.tempKitty = new Thundercat({name: 'snarf', origin: 'thundera', group: 'thundercats'});
        storage.setItem('thundercats', this.tempKitty)
        .then(() => done())
        .catch(done);
      });

      it('should return a thundercat', (done) => {
        superagent.get(`${apiURL}/api/thundercats?id=${this.tempKitty.id}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('snarf');
          expect(res.body.origin).to.equal('thundera');
          expect(res.body.group).to.equal('thundercats');
          expect(res.body.name).to.equal(this.tempKitty.name);
          expect(res.body.origin).to.equal(this.tempKitty.origin);
          expect(res.body.group).to.equal(this.tempKitty.group);
          expect(res.body.id).to.equal(this.tempKitty.id);
          expect(Boolean(res.body.id)).to.equal(true);
          done();
        })
        .catch(done);
      });
    });

    describe('with invalid input', function(){
    });
  });
});
