var chai= require('chai');
var chaiHttp=require('chai-http');
var server= require('../index');
var should=chai.should();

chai.use(chaiHttp);

describe('getMyIngredients',function(){
it('should display ingredients successfully',function(done){
chai.request(server).get('//myingredients').send({})
.end(function(error,res){
  //res.status.should.equal(200);
  // Error key should be false.
//  res.body.error.should.equal(false);
should.not.exist(error);
should.exist(res);
  res.body.should.be.an('object');
    done();
  })
})
})
