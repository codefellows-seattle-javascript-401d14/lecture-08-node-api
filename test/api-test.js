'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Athlete = require('./../model/athlete');
const athlete = new Athlete(data);
require('../server.js');
describe('Athlete API Routes', function() {
  let athlete = null;
  describe('POST: /api/athlete', function(data) {
    it('should return an athlete', function(done) {
      request.post('localhost:3000/api/athlete')
      .send({athlete_name: 'test athlete name', sport: 'test sport', content: 'test content'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.athlete_name).to.equal('test athlete name');
        expect(res.body.sport).to.equal('test sport');
        expect(res.body.content).to.equal('test content');
        athlete = res.body;
        done();
      });
    });
    it('should return a 400 bad request error', function(done) {
      request.post('localhost:3000/api/athlete')
      .send({athlete_name: 'test athlete_name'})
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('GET: /api/athlete', function() {
    it('should return an athlete', function(done) {
      request.get(`localhost:3000/api/athlete?id=${athlete.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.athlete_name).to.equal('test athlete_name');
        expect(res.body.sport).to.equal('test sport');
        expect(res.body.content).to.equal('test content');
        done();
      });
    });
    it('should return a 404 athlete not found error', function(done) {
      request.get('localhost:3000/api/athlete?id==513dh46ef')
      .end((res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should return a 400 bad request error', function(done) {
      request.get('localhost:3000/api/athlete')
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('DELETE: /api/athlete', function() {
    it('should return no athlete content', function(done) {
      request.delete(`localhost:3000/api/athlete?id=${athlete.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body.athlete_name).to.equal(undefined);
        expect(res.body.sport).to.equal(undefined);
        expect(res.body.content).to.equal(undefined);
        done();
      });
    });
  });
});
