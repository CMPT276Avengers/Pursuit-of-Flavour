var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('supertest')
var express = require('express');
var sinon = require('sinon')
var server = require('../index')
var browseRouter = require('../routes/browse');
// const browseController = require('../controllers/browse');


// const server = express.Router();


chai.use(chaiHttp); //to mkae http calls/requests
var should = chai.should(); // should function is assertions

let title = {
    'title':'American'
}

describe('Browse', function() {
    //tests associated with Browse
    // describe("POST /", function(done){
        it('should browse recipes by Cuisine on POST request for browserecipesbyCuisine', function(done){

            var app = express()
            app.use('/browse', browseRouter);

            chai.request(app).post('/browserecipesbyCuisine').send(title)
            .end(function(error,res){
                res.should.have.status(200);
                // res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
        })

    // })
    it('should browse recipes by Cuisine on POST request for browserecipesbyType', function(done){
        chai.request(server).post('/browserecipesbyType').send({'title':'Dinner'})
        .end(function(error,res){
            res.should.have.status(200);
            // res.should.be.json;
            res.body.title.should.equal('Dinner');
            done();
        })
    })
});


describe('Users', function(){

    it('should add single user on successful POST request for /adduser', function(done){
        chai.request(server).post('/adduser').send({'uname':'tester','age':'23'}).end(function(error,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array')
            done();
        })
    })
})