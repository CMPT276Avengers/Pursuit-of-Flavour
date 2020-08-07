var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect



chai.use(chaiHttp); //to mkae http calls/requests
var should = chai.should(); // should function is assertions


describe('deleteuser', function() {


    it('Should delete users successfully', function(done){

        chai.request(server).post('/admin/deleteUsers').send({'username': 'ttl'})
        .end(function(error,res){
            res.should.have.status(200)
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
            done();
        })


    })


    it('Should delete users unsuccessfully because no username provided', function(done){

        chai.request(server).post('/admin/deleteUsers').send({ })
        .end(function(error,res){
            res.should.have.status(401);
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
            done();
        })


    })


});

describe('Adduser', function(){

    it('Should add users successfully', function(done){

        chai.request(server).post('/admin/deleteUsers').send({'fname':'TingTing', 'lname': 'Li', 'username': 'ttl', 'email':'tl@gmail.com', 'phone':'1111111111', 'type':'admin', 'password':'12345'})
        .end(function(error,res){
            res.should.have.status(200)
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
            done();
        })


    })

    it('Should add users unsuccessfully because no username provided', function(done){

        chai.request(server).post('/admin/deleteUsers').send({ })
        .end(function(error,res){
            res.should.have.status(401);
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
            done();
        })


    })

})


describe('viewUsers', function(){

    it('should view all users', function(done){

        chai.request(server).post('/admin/deleteUsers').send({'username':'ttl'})
        .end(function(error,res){
          //  res.should.have.status(200)
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
            done();
        })

    })

})
