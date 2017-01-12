'use strict';

const expect = require('chai').expect;
const Thundercat = require('../model/thundercat.js');

describe('testing thundercat model', function(){
  it('should create a thundercat', function(){
    let data = {
      title: 'snarf',
      origin: 'thundera',
      group: 'thundercats',
    };

    let tempKitty = new Thundercat(data);
    expect(Boolean(tempKitty.id)).to.equal(true);
    expect(tempKitty.title).to.equal(data.title);
    expect(tempKitty.origin).to.equal(data.origin);
    expect(tempKitty.group).to.equal(data.group);
  });
});
