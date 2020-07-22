const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:9789@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});

const axios = require("axios");


exports.adduser_recipe = (req,res) =>{
    var recipe_id = req.body.recipe_id;
    var username = req.session.user.username;

    user_recipe_param = [username,recipe_id]

    var addUser_Recipe =  `INSERT INTO exists_in VALUES ($1, $2, DEFAULT);`

    pool.query(addUser_Recipe, user_recipe_param,(error, resp)=>{
        if (error){ return console.log(error)}

        res.redirect('/my_recipe');

    })


}

exports.deleteuser_recipe = (req,res) =>{

    var recipe_id = JSON.parse(JSON.stringify(req.body.id));
    // var recipe_id = req.body.recipeid
    var username = req.session.user.username;

    user_recipe_param = [username,recipe_id]

    var deleteUser_Recipe =  `DELETE FROM exists_in WHERE username = $1 AND recipe_id = $2`

    pool.query(deleteUser_Recipe, user_recipe_param,(error, resp)=>{
        if (error){ return console.log(error);}

        // res.send(resp)
        res.redirect('/my_recipe');

    })


}

exports.addIngredient = (req,res) => {
    const username = req.session.user.username;
    const ingredient_id = req.body.ingredient_id;

    var getIngredients = 'SELECT * FROM has WHERE username = $1 AND ingredient_id = $2';
    pool.query(getIngredients,[username,ingredient_id],(error,results) => {
        if(error){
            console.log(error);
            res.send("401").redirect('/myingredients');
        }
        else{
            if(results.rows.length == 0){
                var addIngredientQuery = "INSERT INTO has VALUES ($1,$2,1,'things')";
                pool.query(addIngredientQuery,[username,ingredient_id],(error,results2) => {
                    if(error){
                        console.log(error);
                        res.send("401").redirect('/myingredients');
                    }
                    else{
                        res.redirect('/myingredients');
                    }
                })
            }
            else{
                var amount = results.rows[0].amount;
                amount += 1;

                var updateIngredient = 'UPDATE has SET amount = $1 WHERE username = $2 AND ingredient_id = $3';
                pool.query(updateIngredient,[amount,username,ingredient_id],(error,results3) => {
                    if(error){
                        console.log(error);
                        res.send('404').redirect('myingredients');
                    }
                    else{
                        res.redirect('/myingredients');
                    }
                })
            }
        }
    })

}

exports.deleteIngredient = (req,res) => {
    const username = req.session.user.username;
    const ingredient_id = req.body.ingredient_id;

    var getIngredients = 'SELECT * FROM has WHERE username = $1 AND ingredient_id = $2';
    pool.query(getIngredients,[username,ingredient_id],(error,results) => {
        if(error){
            console.log(error);
            res.send("401").redirect('/myingredients');
        }
        else{
            if(results.rows.length == 0){
                res.redirect('/myingredients');
            }
            else{
                if(results.rows[0].amount == 1){
                    var deleteIngredients = 'DELETE FROM has WHERE username = $1 AND ingredient_id = $2';
                    pool.query(deleteIngredients,[username,ingredient_id],(error,results2) => {
                        if(error){
                            res.send('401').redirect('/myingredients');
                        } else{
                            res.redirect('/myingredients');
                        }
                    })
                } else{
                    var amount = results.rows[0].amount;
                    amount -= 1;
                    var updateIngredient = "UPDATE has SET amount = $1 WHERE username = $2 AND ingredient_id = $3";
                    pool.query(updateIngredient,[amount,username,ingredient_id], (error,results3) => {
                        if(error){
                            res.send('401').redirect('/myingredients');
                        } else{
                            res.redirect('/myingredients');
                        }
                    })
                }
            }
        }
    })
}

exports.add_recipe_to_db_add_recipe_to_user = (req,res) => {
    var recipeId = req.body.recipeId;
    var username = req.session.user.username;

    //make api information call
    axios({
        "method":"GET",
        "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeId+"/information",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key":"bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423",
        "useQueryString":true
        }
    })
    .then((response1)=>{
        var recipeInfo = response1.data;
        var insertRecipe = 'INSERT INTO recipes values($1,$2,$3,$4,$5,$6);';
        var cuisine;
        if(recipeInfo.cuisines.length == 0){
            cuisine = "Universal"
        }else{
            cuisine = recipeInfo.cuisines[0];
        }
        pool.query(insertRecipe,[recipeInfo.id,recipeInfo.title,recipeInfo.dishTypes[0],cuisine,recipeInfo.vegan,recipeInfo.veryHealthy],(error,result) => {
            if(error){
            }

            var insertUserRecipe = 'INSERT INTO exists_in values ($1,$2, DEFAULT);';
            pool.query(insertUserRecipe,[username,recipeId],(error,resu) => {
                if(error){
                    res.send({status:"failed"});
                } else{
                    res.send({status:"passed"});
                }
            })


        })

    })
}
