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

describe('Make Recipe', function() {
    it('should provide correct status if given correct request structure for make recipe route', function(done){
        chai.request(server).post('/recipes/makeRecipe').send({id:"js1",amount:"amt1"})
        .end(function(error,res){
            res.should.have.status(202);
        })
    })

    it('should provide 404 status if given bad request structure for make recipe route', function(done){
        chai.request(server).post('/recipes/makeRecipe').send({})
        .end(function(error,res){
            res.should.have.status(404);
        })
    })
})
