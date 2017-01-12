'use strict';

const expect = require('chai').expect;
const Comment = require('../model/comment.js');

describe('testing comment model', function(){
  it('should create a comment', function(){
    let data = {
      announcer: 'Troy Aikman',
      comment: 'The team that scores touchdowns is gonna win more often than not',
    };
    let tempComment = new Comment(data);
    expect(Boolean(tempComment.id)).to.equal(true);
    expect(tempComment.comment).to.equal(data.comment);
    expect(tempComment.announcer).to.equal(data.content);
  });
});
