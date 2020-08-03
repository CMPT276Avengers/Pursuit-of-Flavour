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
                var newAmount = parseInt(oldAmount,10) + parseInt(amt,10);
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

// Cloud vision API call
async function ingred_rec() {
    // console.log("in quickstart function")
    const projectId = 'braided-grammar-285323'
    const keyFilename = './credentials/ingredientrecognition.json'
  
    var ingre_array = []
    // Creates a client
    const client = new vision.ImageAnnotatorClient({projectId, keyFilename});

    const fileName = `./public/images/ingredients/testingre.jpg`;
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
  }


// Ingredient detection 
exports.labelImage = async (req,res) => {
    var duplicates = await ingred_rec()
    console.log(duplicates)

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
    console.log(ingre_name)

    var ingre_amount = JSON.parse(JSON.stringify(req.body.amount[ingre_name]));
    console.log(ingre_amount)

    findIngre = 'SELECT * FROM has WHERE username = $1 AND ingredient_name LIKE $2;'

    pool.query(findIngre, [username, ingre_name + '%'], (error,results) =>{
        if(error){
            console.log("failed!");
            console.log(error)
            res.status(404)
        }
        else{
            if(results.rows.length == 0){
                console.log("This ingredient is not in your list!")
                res.sendStatus(200)
            }

            else{
                var amount = results.rows[0].amount
                amount +=ingre_amount

                var increasequery = 'UPDATE has SET amount = $1 WHERE username = $2 AND ingredient_name LIKE $3;'

                pool.query(increasequery, [amount, username, ingre_name + '%'], (error,results) => {
                    if(error){
                        console.log("failed!");
                        res.sendStatus(404)
                    }
                    else{
                        res.sendStatus(200)
                    }
                })
            }
        }
    })
}
