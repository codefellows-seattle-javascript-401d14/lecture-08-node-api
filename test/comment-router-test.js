'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const Comment = require('../model/comment.js');
const storage = require('../lib/storage.js');

const apiURL = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

describe('testing /api/comments', function(){
  describe('testing POST', function(){
    describe('with valid input', function(){
      it('should return a Comment', (done) => {
        superagent.post(`${apiURL}/api/comments`)
        .send({
          announcer: 'john madden',
          comment: 'that guy did a thing',
        })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.announcer).to.equal('example');
          expect(res.body.comment).to.equal('that guy did a thing');
          expect(Boolean(res.body.created)).to.equal(true);
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
      // mock a Comment so that we have an id to make a get to
      before((done) => {
        this.tempComment = new Comment({announcer: 'john ', comment: 'madden'});
        storage.setItem('comments', this.tempComment)
        .then(() => done())
        .catch(done);
      });

      it('should return a Comment', (done) => {
        superagent.get(`${apiURL}/api/comments?id=${this.tempComment.id}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.announcer).to.equal(this.tempComment.announcer);
          expect(res.body.comment).to.equal(this.tempComment.comment);
          expect(res.body.id).to.equal(this.tempComment.id);
          expect(Boolean(res.body.created)).to.equal(true);
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
