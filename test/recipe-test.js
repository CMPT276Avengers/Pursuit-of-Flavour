var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect



chai.use(chaiHttp); //to mkae http calls/requests
var should = chai.should(); // should function is assertions


describe('Recipe details', function() {


    it('should show recipe details', function(done){

        chai.request(server).get('/recipes/getRecipeDetails')
        .end(function(error,res){

            res.body.should.be.a('object')
            done();
        })
    })

});
