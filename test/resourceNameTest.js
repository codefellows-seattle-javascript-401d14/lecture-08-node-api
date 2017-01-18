'use strict';

const expect = require('chai').expect;
const Story = require('../model/constructor.js');
const superagent = require('superagent');
const storage = require('../lib/storage.js');
const apiURL = 'http://localhost:3000';
require('../server.js');

describe('testing constructor model function', function (){
  it('should return a story with text', function (){
    let data = {
      name: 'The empire strikes back',
      text: 'Once upon a time in a galazy far, far, away',
    };
    let starwars = new Story(data);
    expect(Boolean(starwars.id)).to.equal(true);
    expect(starwars.name).to.equal(data.name);
    expect(starwars.text).to.equal(data.text);
  });
}); //end of describe block

//****************Testing POST here******************************************
describe('testing /api/story' , function(){
  describe('testing POST', function(){
    describe('with valid input', function(){
      it('should return a story', (done) => {
        superagent.post(`${apiURL}/api/story`)
      .send({
        name:'Humpty Dumpty',
        text:'he sat on a wall',
      })
      //on sucess
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Humpty Dumpty');
        expect(res.body.text).to.equal('he sat on a wall');
        done();
      })
      //on failure
      .catch(done);
      }); //end of it statement
    }); // with valid input
    describe('with invalid input or no body', function(){
      it('should return an error', function(done){
        superagent.post(`${apiURL}/api/story`)
        .send({
          name: 'skdhihdf',
        })
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(400);
          done();
        }); // end of catch error block
      });
    });
  });

//********************Testing GET here**************************************
  describe('testing GET', function(){
    describe('with valid input', function(){
      //make a pretend story to see if the GET function works using before
      before((done) => {
        this.temporarystory = new Story({name: 'Sheer', text: 'this is madness'});
        storage.setItem('story', this.temporarystory)
        .then (() => done())
        .catch(done);
      });
      it('should get a story', (done) => {
        superagent.get(`${apiURL}/api/story?id=${this.temporarystory.id}`)
    //on success
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(this.temporarystory.id);
      expect(res.body.name).to.equal(this.temporarystory.name);
      expect(res.body.text).to.equal(this.temporarystory.text);
      done();
    })
    //on failure
    .catch(done);
      }); //end of it statement
    }); // end with valid input - start new test below
    describe('with invalid input or no body', function(){
      it('should return an error', function(done){
        superagent.get(`${apiURL}/api/story`)
        .send({
          name: 'blahblahblah',
        })
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(400);
          done();
        }); // end of catch error block
      }); //end of it block
    }); //end with invalid input - start new describe block below
    describe('with no id found', function(){
      it('should return an error', function(done){
        superagent.get(`${apiURL}/api/story?id=asjfg`)  
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        }); // end of catch error block
      }); //end of it block
    }); //end with invalid input - start new describe block below


  });
});//end testing /api/story block
