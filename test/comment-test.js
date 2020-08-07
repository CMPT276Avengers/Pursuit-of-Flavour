var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect

chai.use(chaiHttp); //to mkae http calls/requests
var should = chai.should(); // should function is assertions

describe('get comment', function(){
    it('should send back correct data if given recipeid', function(){
        chai.request(server).get('/comment/getRecipeComments').send({recipeId:"12312"})
        .end(function(error,res){
            res.body.should.be.a('array');

            done();
        })
    })

    it('should send back error if given bad recipeid', function(){
        chai.request(server).get('/comment/getRecipeComments').send({})
        .end(function(error,res){
            res.should.have.status(404);

            done();
        })
    })
})

describe('make comment', function(){

    it('should send back correct status if make successful', function(){
        chai.request(server).post('/comment/postComment').send({recipeId:'12312',context:"hi",time:"2020-08-07"})
        .end(function(error,res){
            res.should.have.status(202);

            done();
        })
    })
})