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
          announcer: 'Troy Aikman',
          comment: 'The team that scores touchdowns is gonna win more often than not',
        })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.announcer).to.equal('Troy Aikman');
          expect(res.body.comment).to.equal('The team that scores touchdowns is gonna win more often than not');
          expect(Boolean(res.body.created)).to.equal(true);
          expect(Boolean(res.body.id)).to.equal(true);
          done();
        })
        .catch(done);
      });
    });
    describe('invalid request', function(){
      it('should respond 400 bad request', done => {
        superagent.post(`${apiURL}/api/comments`)
       .send({})
       .then(done)
       .catch(err => {
         expect(err.status).to.equal(400);
         done();
       });
      });
    });
  });

  describe('testing GET', function(){
    describe('with valid input', function(){
    // mock a Comment so that we have an id to make a get to
      before(done => {
        this.tempComment = new Comment({announcer: 'Troy Aikman', comment: 'The team that scores touchdowns is gonna win more often than not'});
        storage.createItem('comments', this.tempComment)
          .then(() => done())
          .catch(done);
      });

      it('should return a comment', (done) => {
        superagent.get(`${apiURL}/api/comments?id=${this.tempComment.id}`)
          .then(res => {
            expect(res.status).to.equal(200);
            expect(res.body.announcer).to.equal(this.tempComment.announcer);
            expect(res.body.comment).to.equal(this.tempComment.comment);
            expect(res.body.id).to.equal(this.tempComment.id);
            expect(new Date(res.body.created).toString()).to.equal(this.tempComment.created.toString());
            expect(Boolean(res.body.created)).to.equal(true);
            expect(Boolean(res.body.id)).to.equal(true);
            done();
          })
          .catch(done);
      });
    });

    describe('with invalid input', function(){
      it('get /api/comments with no id should return a 400 status', (done) => {
        superagent.get(`${apiURL}/api/comments`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(400);
          done();
        })
        .catch(done);
      });

      it('get /api/comments with bad id should return a 404 status', (done) => {
        superagent.get(`${apiURL}/api/comments?id=54321`)
          .then(done)
          .catch(err => {
            expect(err.status).to.equal(404);
            done();
          })
          .catch(done);
      });
    });
  });
});
