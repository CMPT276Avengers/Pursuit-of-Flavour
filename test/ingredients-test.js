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
