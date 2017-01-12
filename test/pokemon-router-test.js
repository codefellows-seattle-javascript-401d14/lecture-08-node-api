'use strict';
const expect = require('chai').expect;
const Pokemon = require('../model/pokemon.js');
const storage = require('../lib/storage.js');
const superagent = require('superagent');

const apiURL = `http://localhost:${process.env.PORT || 3000}`;
require('../server.js');

describe('testing /api/pokemon', function() {
  describe('testing POST', function() {
    describe('with valid input', function() {
      it('should return a pokemon', done => {
        superagent.post(`${apiURL}/api/pokemon`)
        .send({
          name:'Charmander',
          type: 'fire',
          pokedexNUM: 4,
          moves: '"scratch", "ember", "tail whip"',
        })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Charmander');
          expect(res.body.type).to.equal('fire');
          expect(res.body.pokedexNUM).to.equal(4);
          expect(Boolean(res.body.id)).to.equal(true);
          done();
        })
        .catch(done);
      });
    });
    describe('with invalid input or not found input', function(){
      it('should respond with bad request', done => {
        superagent.post(`${apiURL}/api/pokemon`)
        .send({})
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('testing GET', function() {
    describe('with valid input', function() {
      before(done => {
        this.tempPokemon = new Pokemon({
          name:'Charmander',
          type: 'fire',
          pokedexNUM: 4,
          moves: '"scratch", "ember", "tail whip"',
        });
        storage.setItem('pokemon', this.tempPokemon)
        .then(() => done())
        .catch(done);
      });

      it('should return a pokemon from a given id', (done) => {
        superagent.get(`${apiURL}/api/pokemon?id=${this.tempPokemon.id}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Charmander');
          expect(res.body.type).to.equal('fire');
          expect(res.body.pokedexNUM).to.equal(4);
          expect(Boolean(res.body.id)).to.equal(true);
          done();
        })
        .catch(done);
      });
    });

    describe('with invalid input', function() {
      before(done => {
        this.tempPokemon = new Pokemon({
          name:'Charmander',
          type: 'fire',
          pokedexNUM: 4,
          moves: '"scratch", "ember", "tail whip"',
        });
        storage.setItem('pokemon', this.tempPokemon)
        .then(() => done())
        .catch(done);
      });
      it('no id provided should respond bad request', done => {
        superagent.get(`${apiURL}/api/pokemon?id=`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
      it('id not found should respond with not found', done => {
        superagent.get(`${apiURL}/api/pokemon?id=5556666`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('testing DELETE', function() {
    describe('with valid input', function() {
      before(done => {
        this.tempPokemon = new Pokemon({
          name:'Charmander',
          type: 'fire',
          pokedexNUM: 4,
          moves: '"scratch", "ember", "tail whip"',
        });
        storage.setItem('pokemon', this.tempPokemon)
        .then(() => done())
        .catch(done);
      });

      it('should delete a pokemon from a given id', (done) => {
        superagent.delete(`${apiURL}/api/pokemon?id=${this.tempPokemon.id}`)
        .then(res => {
          expect(Boolean(res.body.id)).to.equal(false);
          done();
        })
        .catch(done);
      });
    });
  });
});
