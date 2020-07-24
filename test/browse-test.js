var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect



chai.use(chaiHttp); //to mkae http calls/requests
var should = chai.should(); // should function is assertions


describe('Browse', function() {
    before(function() {
        this.timeout(10000) // 10 second timeout for setup
      })
  

    it('should browse recipes by Cuisine on POST request for browserecipesbyCuisine', function(done){

        chai.request(server).post('/browse/browserecipesbyCuisine').send({'cuisine':'American'})
        .end(function(error,res){
            res.should.have.status(200);
            // res.body.title.should.equal('American');
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
            done();
        })
    })

    // })
    it('should browse recipes by Type on POST request for browserecipesbyType', function(done){
        chai.request(server).post('/browse/browserecipesbyType').send({'type':'Dinner'})
        .end(function(error,res){
            res.should.have.status(200);
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
            done();
        })
    })

    it('should browse recipes by Diet on POST request for browserecipesbyVegan', function(done){
        chai.request(server).post('/browse/browserecipesbyVegan').send({'diet':'Vegan'})
        .end(function(error,res){
            res.should.have.status(200);
            res.body.should.be.a('object')
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
            done();
        })
    })

    
});
