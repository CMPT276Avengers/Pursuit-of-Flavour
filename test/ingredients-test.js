var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index')
var expect = require('chai').expect
const fs = require('fs');
const cheerio = require('cheerio')
const assert = require('assert').strict;



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



describe ('File Upload', async =>{
    it('should upload a valid image file to the public/images/ingredients folder', async () => {
          const response = await chai.request(server)
            .post('/ingredients/fileUpload')
            // .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('Content-Type', 'multipart/form-data')
            // .attach('ingredient_image', fs.readFileSync('./public/images/ingredients/testingre.jpg'))
            .attach('ingredient_image',
              fs.readFileSync('./public/images/ingredients/testingre.jpg'),
              'testingre.jpg');
            //   console.log(response)
          expect(response.body).to.be.an('object')
        
          
        },  
);

});

// This test checks whether perfoming the delete file
//action perfoms the desired result 
//the logic and syntax use used is the same 
//as the route /ingredients/fileDelete 
// except in fileDelete we specify the 
//file that needs to be deleted 
describe('File Delete', function(){

    it('creates a temporary text file tests create/write access to FS', function(done){
        // setup
        var newFile = new Date().getTime() +".txt";

        fs.writeFile(newFile, "hello!", function (err) {
            if (err) {console.log(err)};
            // console.log("Created file: "+newFile);

            // This is to test if the function is working properly 
            // All tests have passed 
            fs.unlink(newFile, function(error){
                if(error){console.log("file already deleted")};
                console.log('file deleted')
                done();
    
            });

        });


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