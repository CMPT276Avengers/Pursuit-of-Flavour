var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect



chai.use(chaiHttp); //to make http calls/requests
var should = chai.should(); // should function is assertions


describe('Add Ingredient', function() {


    it('should increase ingredients', function(done){

        chai.request(server).post('/add/addIngredient').send({'amount': 2, 'username':'ttl', 'ingredient_id':5006})
        .end(function(error,res){

            function checkdb (done) {
                pool.getConnection(done);
              };
            res.should.have.status(200);
            expect(res).to.redirect;
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 

            done();
        })
    })

    it('should fail to increase ingredients if no id', function(){
        chai.request(server).post('/add/addIngredient').send({ })
        .end(function(error,res){
            res.should.have.status(401);

            done();
        })
    })

});

describe('Delete Ingredient', function() {


    it('should decrease ingredients', function(done){

        chai.request(server).post('/add/deleteIngredient').send({'amount': 2, 'username':'ttl', 'ingredient_id':5006})
        .end(function(error,res){

            function checkdb (done) {
                pool.getConnection(done);
              };
            res.should.have.status(200);
            expect(res).to.redirect;
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 

            done();
        })
    })

    it('should fail to decrease ingredients if no id', function(){
        chai.request(server).post('/add/deleteIngredient').send({ })
        .end(function(error,res){
            res.should.have.status(401);

            done();
        })
    })

});
