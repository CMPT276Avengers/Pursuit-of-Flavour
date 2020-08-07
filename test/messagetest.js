var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect



chai.use(chaiHttp); //to mkae http calls/requests
var should = chai.should(); // should function is assertions


describe('Livechat ', function() {
  //test searching for recipe videos
    before(function() {
        this.timeout(10000) // 10 second timeout
      })


    it('should work with strings', function(done){

        chai.request(server).get('/message/message')
        .end(function(error,res){
           res.body.should.be.a('object')
          expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
          done();
        })
    })



});
