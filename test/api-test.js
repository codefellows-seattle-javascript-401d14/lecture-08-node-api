'use strict';

const expect = require('chai').expect;
const Athlete = require('./../model/athlete');

describe('Athlete API Routes', function() {
  it('should create an instanceof Athlete', function(){
    let data = {
      athlete_name: 'test athlete',
      sport: 'test sport',
    };
    let tempAthlete = new Athlete(data);
    expect(Boolean(tempAthlete.id)).to.equal(true);
    expect(tempAthlete.created_at instanceof Date).to.equal(true);
    expect(tempAthlete.athlete_name).to.equal(data.athlete_name);
    expect(tempAthlete.sport).to.equal(data.sport);
  });
});
