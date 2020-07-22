const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:9789@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});

const session = require('express-session');

exports.getMyIngredients = (req,res) => {
    if(req.session.user){
        var username = req.session.user.username;
        var ingredientQuery = 'SELECT * FROM has,ingredients WHERE has.ingredient_id = ingredients.ingredient_id AND has.username = $1';
        pool.query(ingredientQuery,[username], (error,results) => {
            if (error){
                console.log(error);
                res.send('401').redirect('/userview');
            }
            else{
                var data = {
                    ingredients: results.rows
                };
                res.render('pages/my_ingredients', data);

            }
        })
    }
    else{
        res.redirect('/login');
    }
}


exports.compare_my_ingredients = (req,res) => {
    var username = req.session.user.username;
    var ingredientQuery = 'SELECT * FROM has WHERE username = $1';
    pool.query(ingredientQuery,[username], (error,results) => {
        if (error){
            console.log(error);
            res.send('401').redirect('/userview');
        }
        else{
            res.send(results);

        }
    })
}


exports.displayRecipes = (req,res)=>{
    var i = 0;
    var rec_id = []
    if(req.session.user){
        var username = req.session.user.username;
        var user = [username]
        var getUserRecipeQuery = `SELECT recipe_id FROM exists_in WHERE username = $1`;
        pool.query(getUserRecipeQuery,user,(error,resp)=>{
            if (error){ return console.log(error);}
            // var results = {'rows':result.rows}
            if(resp.rows.length == 0){
                res.render('pages/add_new_recipe');
            }else{

                for(i = 0; i < resp.rows.length; i++){
                    rec_id[i] = resp.rows[i].recipe_id

                }

                var getRecipe = `SELECT * FROM recipes WHERE recipe_id in (${rec_id});`

                pool.query(getRecipe, (error,resp)=>{
                    if (error){ return console.log(error);}

                    res.render('pages/my_recipe', resp);

                })

            }



        })
    }
    else{
        res.redirect('/login')
    }



}

exports.getUserDatabase = (req,res)=> {
    if(req.session.user){
        var getUsersQuery=`SELECT * FROM person,account where person.username=account.username`;
        // we are trying to get rows from here
        pool.query(getUsersQuery, (error,result)=>{
        if(error)
            res.end(error); // means we are ending the error and sending it as a response
            // if there is no error:
            var results={'rows':result.rows} //result is an object //'rows' is a parameter
            // result.rows is an array that contains the rows in the database table
                res.render('pages/ad',results);//  we are sending the results to the db.ejs
         })
    }
    else{
        res.redirect('/login');
    }
}
