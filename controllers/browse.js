const { Pool } = require('pg');
var pool = new Pool({

  connectionString: 'postgres://postgres:password@localhost/cmpt276project'

    // connectionString: process.env.DATABASE_URL
});


const session = require('express-session');
const fetch = require('node-fetch');

exports.browserecipesbyCuisine = (req,res) =>{

    if(req.session.user){
        var cuisine = req.body.cuisine
        // console.log("browse recipes")

        // var recipearrayID =[]

        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?cuisine="+cuisine+"&number=20&instructionsRequired=true&query=", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423"
          }
        })
        .then(function(response) {
          return response.json()
        })

        .then(function (data){
          var results ={"reciperesults": data.results, "title": cuisine}
          console.log(data)
          console.log(results)
          res.render('pages/browserecipes', results)
        })



        // var recipe_id = req.query.id
        // var recipeQuery = "SELECT * FROM recipes WHERE cuisine = $1"

        // pool.query(recipeQuery, [recipe_id], (error, result) =>{
        //     if (error){
        //      res.send(error)
        //     };
        //     var data = {"rows": result.rows, "title": recipe_id}
        //     res.render('pages/browserecipes', data);
    }

    else{
        res.render('pages/login');
    }
}

exports.browserecipesbyType = (req,res) =>{

    if(req.session.user){
        var type = req.body.type


        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?type="+type+"&number=5&instructionsRequired=true&query=", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423"
          }
        })
        .then(function(response) {
          return response.json()
        })

        .then(function (data){

        if(type = "morning%20meal"){
            type = "Breakfast"
        }

          var results ={"reciperesults": data.results, "title": type}
          res.render('pages/browserecipes', results)
        })

    }

    else{
        res.render('pages/login');
    }
}

exports.browserecipesbyVegan = (req,res) =>{

    if(req.session.user){
        var diet = req.body.diet

        // var recipearrayID =[]

        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet="+diet+"&number=5&instructionsRequired=true&query=", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423"
          }
        })
        .then(function(response) {
          return response.json()
        })

        .then(function (data){
          var results ={"reciperesults": data.results, "title": diet}
          res.render('pages/browserecipes', results)
        })

    }

    else{
        res.render('pages/login');
    }
}


// Browse Ingredients based on what nav bar aisle user clicked
exports.browseingredients = (req,res) =>{

    if(req.session.user){
        var ingredient_id = req.query.id
        var ingredientsQuery = `SELECT * FROM ingredients WHERE aisle = $1`

        pool.query(ingredientsQuery, [ingredient_id], (error, result) =>{
            if (error){
             res.send(error)
            };

            var data = {"rows": result.rows, "title": ingredient_id}
            res.render('pages/browse_ingredients', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

// Adds a single recipe to recipe table
exports.addrecipe = (req,res) =>{

    if(req.session.user){
        var recipe_id = JSON.parse(JSON.stringify(req.body.data.id));
        var recipe_name = JSON.parse(JSON.stringify(req.body.data.title));
        var recipe_type =JSON.parse(JSON.stringify(req.body.data.dishTypes));
        recipe_type = recipe_type.join()
        // console.log(recipe_type)

        var recipe_cuisine= JSON.parse(JSON.stringify(req.body.data.cuisines));
        recipe_cuisine = recipe_cuisine.join()
        // console.log(recipe_cuisine)

        if(JSON.parse(JSON.stringify(req.body.data.vegan)) == 'true'){
            var recipe_vegan = 'Yes'
        }
        else{
            var recipe_vegan ='No'
        }

        if(JSON.parse(JSON.stringify(req.body.data.veryHealthy)) == 'true'){
            var recipe_healthy = 'Yes'
        }
        else{
            var recipe_healthy = 'No'
        }


        recipe_param = [recipe_id, recipe_name, recipe_type, recipe_cuisine, recipe_vegan, recipe_healthy];

        var add_Recipe = 'INSERT INTO recipes VALUES ($1, $2, $3, $4, $5, $6);'


        pool.query(add_Recipe, recipe_param,(error, resp)=>{
            if (error){}

            var username = req.session.user.username
            var addUser_Recipe =  `INSERT INTO exists_in VALUES ($1, $2, DEFAULT);`
            user_recipe_param = [username, recipe_id]

            pool.query(addUser_Recipe, user_recipe_param, (error, resp) => {
                if (error){ return console.log("There was a duplicate key!")}

                res.send(resp)

            })

        })
    }
}


// Add to HAS table
exports.addingredients = (req,res) =>{

    if(req.session.user){
        var ingre_id = JSON.parse(JSON.stringify(req.body.data.id));
        var ingre_name = JSON.parse(JSON.stringify(req.body.data.name));
        var amount = 0
        var username = req.session.user.username;
        var unit = JSON.parse(JSON.stringify(req.body.data.unit));
        var image = JSON.parse(JSON.stringify(req.body.data.image));
        var aisle = JSON.parse(JSON.stringify(req.body.data.aisle));

        user_recipe_param = [username,ingre_id,amount, unit,ingre_name,image,aisle];

        var addUser_Recipe =  `INSERT INTO has VALUES ($1, $2, $3, $4, $5, $6, $7);`

        pool.query(addUser_Recipe, user_recipe_param,(error, resp)=>{
            if (error){ return console.log("There was a duplicate key!")}

            res.send(resp);

        })
    }
}

// // Browse Recipes based on Different types of Cuisines.
// exports.populaterecipesCuisine = (req,res) => {

//     if(req.session.user){
//         // Grabbing recipe info
//         var recipe_id = JSON.parse(JSON.stringify(req.body.data.id));

//         var recipe_name = JSON.parse(JSON.stringify(req.body.data.title));
//         if(req.body.data.dishTypes.length != 0){
//             var type = JSON.parse(JSON.stringify(req.body.data.dishTypes[0]));
//         }
//         else{
//             var type = ""
//         }

//         var cuisine = JSON.parse(JSON.stringify(req.body.identifier));

//         var vegan = JSON.parse(JSON.stringify(req.body.data.vegan));
//         var healthy = JSON.parse(JSON.stringify(req.body.data.veryHealthy));
//         // var numIngredients = JSON.parse(JSON.stringify(req.body.data.extendedIngredients.length));
//         // console.log(numIngredients)

//         recipe_param = [recipe_id, recipe_name, type, cuisine, vegan, healthy]

//         var addRecipe = 'INSERT INTO recipes VALUES ($1,$2,$3,$4,$5,$6);'

//         pool.query(addRecipe, recipe_param, (error, result) =>{



//             if(error){
//                 return console.log("There was a duplicate key")
//             }
//         })
//     }
// }



// // Browse recipes based off of different meal types
// exports.populaterecipesType = (req,res) => {

//     if(req.session.user){
//         console.log("querying inside my own function")
//         var recipe_id = JSON.parse(JSON.stringify(req.body.data.id));
//         var recipe_name = JSON.parse(JSON.stringify(req.body.data.title));
//         var type = JSON.parse(JSON.stringify(req.body.identifier));

//         if(req.body.data.cuisines.length != 0){
//             var cuisine = JSON.parse(JSON.stringify(req.body.data.cuisines[0]));
//         }
//         else{
//             var cuisine = ""
//         }
//         var vegan = JSON.parse(JSON.stringify(req.body.data.vegan));
//         var healthy = JSON.parse(JSON.stringify(req.body.data.veryHealthy));

//         recipe_param = [recipe_id, recipe_name, type, cuisine, vegan, healthy]

//         console.log(recipe_param)

//         var addRecipe = 'INSERT INTO recipes VALUES ($1,$2,$3,$4,$5,$6);'

//         pool.query(addRecipe, recipe_param, (error, result) =>{
//             console.log("What row am I adding")
//             console.log(result)

//             if(error){
//                 return console.log("There was a duplicate key")
//             }

//             res.send(result);
//         })

//     }


// }

// // Browse all vegan diet recipes (of any meal type and cuisine)
// exports.populaterecipesVegan = (req,res) => {

//     if(req.session.user){
//         console.log("querying inside my own function")
//         var recipe_id = JSON.parse(JSON.stringify(req.body.data.id));
//         var recipe_name = JSON.parse(JSON.stringify(req.body.data.title));

//         if(req.body.data.dishTypes.length != 0){
//             var type = JSON.parse(JSON.stringify(req.body.data.dishTypes[0]));
//         }
//         else{
//             var type = ""
//         }

//         if(req.body.data.cuisines.length != 0){
//             var cuisine = JSON.parse(JSON.stringify(req.body.data.cuisines[0]));
//         }
//         else{
//             var cuisine = ""
//         }

//         var vegan = JSON.parse(JSON.stringify(req.body.data.vegan));
//         var healthy = JSON.parse(JSON.stringify(req.body.data.veryHealthy));

//         recipe_param = [recipe_id, recipe_name, type, cuisine, vegan, healthy]

//         console.log(recipe_param)

//         var addRecipe = 'INSERT INTO recipes VALUES ($1,$2,$3,$4,$5,$6);'

//         pool.query(addRecipe, recipe_param, (error, result) =>{
//             console.log("What row am I adding")
//             console.log(result)

//             if(error){
//                 return console.log("There was a duplicate key")
//             }

//             res.send(result);
//         })

//     }
// }


// exports.populateingredients = (req,res) => {

//     if(req.session.user){
//         console.log("populating ingredients table")

//         // grabbing ingredients info
//         var ingredient_id =JSON.parse(JSON.stringify(req.body.data.id));
//         console.log(ingredient_id)
//         var ingredientname = JSON.parse(JSON.stringify(req.body.data.name));
//         console.log(ingredientname)


//         var aisle = JSON.parse(JSON.stringify(req.body.data.aisle));

//         ingredientparam = [ingredient_id,ingredientname,aisle]
//         console.log(ingredientparam)

//         var insertIngredient = 'INSERT INTO ingredients VALUES ($1,$2,$3);'

//         pool.query(insertIngredient, ingredientparam, (error,result) =>{
//             console.log("add into ingredient")
//             console.log(result)

//             if(error){
//                 return console.log("Duplicate key")
//             }

//             res.send(result)
//         })

//     }



// }
