var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('Login', function(){
    //Test for good loggin in :
    it('should return success and log user in when given the correct username/password combo', function(done){
        chai.request(server).post('/auth/login').send({'username':'johnsmith1','password':'12345'})
        .end(function(error,res){
            res.should.have.status(200);
            done();
        })
    })

    //Test for bad loggin in
    it('should return success and send error when given the bad username/password combo', function(done){
        chai.request(server).post('/auth/login').send({'username':'johnsmith1','password':'1235'})
        .end(function(error,res){
            res.should.have.status(401);
            done();
        })
    })

    //Tet for empty login info
    it('should return success and send 401 when given empty username/pw fields', function(done){
        chai.request(server).post('/auth/login').send({})
        .end(function(error,res){
            res.should.have.status(400);
            done();
        })
    })
})

describe('Logout', function(){

    //Test for empty login info
    it('should return success and send 200 when given empty username/pw fields', function(done){
        chai.request(server).post('/auth/login').send({username:'johnsmith1',password:'12345'})
        .end(function(error,res){
            res.should.have.status(200);

            chai.request(server).post('/auth/logout').send()
            .end(function(error,res){
                res.should.have.status(200);
                done();
            })
        })
    })
})

describe('AddUser', function(){
    //Test for bad registration
    it('should return success and send 409 if there is problem adding user', function(done){
        chai.request(server).post('/auth/adduser').send({})
        .end(function(error,res){
            res.should.have.status(409);
            done();
        })
    })
})







