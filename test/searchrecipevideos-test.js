var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect



chai.use(chaiHttp); //to mkae http calls/requests
var should = chai.should(); // should function is assertions


describe('Searchrecipevideos', function() {
  //test searching for recipe videos
    before(function() {
        this.timeout(10000) // 10 second timeout
      })
      function checkdb (done) {
                      pool.getConnection(done);
                    };

    it('should return recipe videos by research on GET request for /searchrecipevideos', function(done){

        chai.request(server).get('/searchrecipevideos/searchrecipevideos')
        .end(function(error,res){
          const result = res.statusCode
          expect(result).to.equal(200)
           res.body.should.be.a('object')
          expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
          done();
        })
    })



});
