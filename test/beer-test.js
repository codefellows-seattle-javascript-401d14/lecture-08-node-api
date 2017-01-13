'use strict';

const expect = require('chai').expect;
const Beer = require('../model/beer.js');

describe('testing beer model', function() {
  it('should list a beer', function() {
    let data = {
      name: 'name of beer',
      type: 'type of beer',
      strength: 'percent of alcohol',
    };
    let tempBeer = new Beer(data);
    expect(Boolean(tempBeer.id)).to.equal(true);
    expect(tempBeer.title).to.equal(data.title);
    expect(tempBeer.type).to.equal(data.type);
    expect(tempBeer.strength).to.equal(data.strength);
    expect(tempBeer.created instanceof Date).to.equal(true);
  });
});
