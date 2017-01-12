'use strict';

const expect = require('chai').expect;
const Story = require('../model/constructor.js');

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
