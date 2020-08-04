const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:root@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});
const session = require('express-session');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const fs = require('fs');
var async = require('async');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


var file = {}



exports.getMyIngredients = (req,res) => {
    if(req.session.user){
        // console.log("in route");
        var username = req.session.user.username;
        var ingredientQuery = 'SELECT * FROM has WHERE has.username = $1';
        pool.query(ingredientQuery,[username], (error,results) => {
            if (error){
                console.log(error);
                res.send('401').redirect('/userview');
            }
            else{
                var data = {
                    ingredients: results.rows
                };
                res.send(data);
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

exports.addIngredients = (req,res) => {
    if(req.session.user){
        // console.log(req.body)
        var ing_id = req.body.data.id;
        var amt = req.body.data.amount;
        var username = req.session.user.username;

        var getAmountQuery = 'SELECT * FROM has WHERE username = $1 and ingredient_id = $2';
        pool.query(getAmountQuery,[username,ing_id], (error,resp) => {
            if(error){
                console.log("ing NOT FOUND!");
            } else{
                // console.log(resp);
                var oldAmount = resp.rows[0].amount;
                var newAmount = parseFloat(oldAmount,10) + parseFloat(amt,10);
                var update_user_ing =  'UPDATE has SET amount = $1 WHERE username=$2 and ingredient_id = $3';

                pool.query(update_user_ing,[newAmount,username,ing_id],(error,results) => {
                    if(error){
                        console.log("updating of ing failed!");
                        res.sendStatus(404)
                    }
                    else{
                        res.sendStatus(202);
                    }
                })
            }


        })

    }
}

// Set storage 

const storage = multer.diskStorage({
    destination: './public/images/ingredients/',
    filename: function(req, file, cb){
        console.log(Date.now())
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//intialize upload 

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}). single('ingredient_image');

// Check File Type 

function checkFileType(file, cb){
    // Allowed file extension 
    const filetypes = /jpeg|jpg|png/;
    const extnames = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime 
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extnames){
        return cb(null,true);

    } else{
        cb("Error: images only!");
    }

}


exports.fileUpload = (req,res) => {
        file = {}

        upload(req, res, (err)=>{
            if(err){
            console.log(err);
            res.render("pages/upload_image",  {msg: err});
            // res.render('pages/my_ingredients');


            }else{
                if(req.file == undefined){
                console.log('No file selected')
                // res.redirect('/pages/my_ingredients')
                res.render("pages/upload_image", {msg: 'No file selected! Please select a valid image file!'});
                }else{
                    console.log('Success')
                     file = req.file
                    // ingred_rec()
                    // console.log("this is file", file)
                    // res.redirect('/')
                    res.render("pages/upload_image", {msg: 'Uploaded image successfully!',
                    ingre: `../images/ingredients/${req.file.filename}`});
                }

            }

        });



    }


exports.fileDelete = (req,res) => {
    console.log("inside delete file")
    fs.unlink(file.path, function(err){
        if(err){console.log("file already deleted")};
        res.render("pages/upload_image", {msg: 'File Deleted Successfully'});
    })


}





// Cloud vision API call
async function ingred_rec() {
    // console.log("in quickstart function")
    const projectId = 'braided-grammar-285323'
    const keyFilename = './credentials/ingredientrecognition.json'
    // console.log("this is file inside google visoin", file)
  
    var ingre_array = []
    // Creates a client
    const client = new vision.ImageAnnotatorClient({projectId, keyFilename});

    // var imageFile = fs.readFileSync(file.path)
    


    const fileName = file.path;
    const request = {
    image: {content: fs.readFileSync(fileName)},
    };

    const [result] = await client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    objects.forEach(object => {
        console.log(`Name: ${object.name}`);
        ingre_array.push(object.name)
    });

    // ingre_array = [...new Set(ingre_array)]
    var ingre_array = ingre_array.map(word => word.toLowerCase());
    ingre_array.sort()

    var duplicates = {};
    ingre_array.forEach(function(item){ 
        duplicates[item] = (duplicates[item] || 0)+1; 
    });

    return duplicates;
    // console.log(duplicates)
  }


// Ingredient detection 
exports.labelImage = async (req,res) => {
    var duplicates = await ingred_rec()
    // console.log(duplicates)

    // findIngre = 'SELECT * FROM has WHERE username = $1 and name = $2;'

    // pool.query(findIngre, [username, numIngre[0]], (error,results) =>{
    //     if(error){
    //         console.log("failed!");
    //         res.status(404)
    //     }
    //     else{
    //         if(results.rows.length == 0){
    //             alert("This ingredient is not in your list!")
    //         }

    //         else{
    //             var amount = results.rows[0].
    //         }

   var data = {amounts: duplicates}
            res.send(data.amounts);
        // }
    // })
    
    
}

exports.imgAddIngredients = (req,res) =>{
    console.log("working in db")
    var username = req.session.user.username;
    var ingre_name = JSON.parse(JSON.stringify(req.body.ingredient));
    // console.log(ingre_name)

    var ingre_amount = JSON.parse(JSON.stringify(req.body.amount[ingre_name]));
    // console.log(ingre_amount)

    findIngre = 'SELECT * FROM has WHERE username = $1 AND ingredient_name LIKE $2;'

    pool.query(findIngre, [username, ingre_name + '%'], (error,results) =>{
        if(error){
            console.log("failed!");
            console.log(error)
            fs.unlink(file.path, function(err){
                if(err){console.log("file already deleted")};
                console.log("file deleted")
            })
            res.status(404)
        }
        else{
            if(results.rows.length == 0){
                console.log("This ingredient is not in your list!")
                fs.unlink(file.path, function(err){
                    if(err){console.log("file already deleted")};
                    console.log("file deleted")
                })
                res.sendStatus(200)
            }

            else{
                var amount = results.rows[0].amount
                amount +=ingre_amount

                var increasequery = 'UPDATE has SET amount = $1 WHERE username = $2 AND ingredient_name LIKE $3;'

                pool.query(increasequery, [amount, username, ingre_name + '%'], (error,results) => {
                    if(error){
                        console.log("failed!");
                        fs.unlink(file.path, function(err){
                            if(err){console.log("file already deleted")};
                            console.log("file deleted")
                        })
                        res.sendStatus(404)
                    }
                    else{
                        fs.unlink(file.path, function(err){
                            if(err){console.log("file already deleted")};
                            console.log("file deleted")
                        })
                        res.sendStatus(200)
                    }
                })
            }
        }
    })
}
