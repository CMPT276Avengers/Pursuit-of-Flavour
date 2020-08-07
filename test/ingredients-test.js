var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect



chai.use(chaiHttp); //to mkae http calls/requests
var should = chai.should(); // should function is assertions


describe('get ingredients', function() {


    it('should show users ingredients', function(done){

        chai.request(server).get('/ingredients/getMyIngredients')
        .end(function(error,res){
            function checkdb (done) {
                pool.getConnection(done);
              };
            const result = res.statusCode
            expect(result).to.equal(200)
            done();
        })
    })

    
});


// describe('Add ingredients', function() {
//     before(function() {
//         this.timeout(10000) // 10 second timeout for setup
//       })
  


//     it('should add ingredients', function(done){

//         chai.request(server).post('/ingredients/addIngredients').send({'ing_id':123, 'amt':2, 'username': 'jsmith'})
//         .end(function(error,res){
//             const result = res.statusCode
//             expect(result).to.equal(202)
//             done();
//         })
//     })

    
// });

// describe('Calls function ingred_rec', function() {


//     it('should return a dictionary of labelled objects and quantities', function(done){

//         chai.request(server).get('/ingredients/labelImage')
//         .end(function(error,res){
//             const result = res.statusCode
//             expect(result).to.equal(200)
//             done();
//         })
//     })

    
// });

describe('Add Ingredients from image', function() {


    it('should update has table after image upload', function(done){

        chai.request(server).post('/ingredients/imgAddIngredients').send({username:'ttl', ingrdient:"tomato"})
        .end(function(error,res){

             function checkdb (done) {
                pool.getConnection(done);
              };
        
            should.exist(res)
            res.body.should.be.an('object')
            const result = res.statusCode
            expect(result).to.equal(200)
            done();
        })
    })

    it('should return an error if no ingredients provided', function(done){

        chai.request(server).post('/ingredients/imgAddIngredients').send({username:'ttl'})
        .end(function(error,res){
            res.should.have.status(404)
            done();
        })
    })
    


    
});