var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('Update', function(){
	it('should update the user info based on user input', function(done){
		chai.request(server).post('/profile/update').send({'fname':'john', 'lname':'doe', 'username':'jd', 'email':'jd@gmail.com', 
			'phone':'1231231234', 'type':'general', 'password':'abc'})
		.end(function(error,res){
			should.not.exist(error);
      		should.exist(res);
      		res.should.be.a('object');
      		res.should.not.have.status(401);
      		res.should.have.status(200);
      		done();
		})
	})
})