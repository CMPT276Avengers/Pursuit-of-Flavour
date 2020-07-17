const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:root@localhost/cmpt276project'

    // connectionString: process.env.DATABASE_URL
});

const session = require('express-session');

exports.browse = (req,res) =>{

    if(req.session.user){
        var recipe_id = req.query.id
        var recipeQuery = "SELECT * FROM recipes WHERE cuisine = $1"

        pool.query(recipeQuery, [recipe_id], (error, result) =>{
            if (error){ 
             res.send(error)
            };
            var data = {"rows": result.rows, "title": recipe_id}
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.addrecipe = (req,res) =>{
    console.log(req.body)
    var recipe_id = JSON.parse(JSON.stringify(req.body.id));
    console.log(recipe_id)
    var username = req.session.user.username;

    user_recipe_param = [username,recipe_id]

    var addUser_Recipe =  `INSERT INTO exists_in VALUES ($1, $2, DEFAULT);`

    pool.query(addUser_Recipe, user_recipe_param,(error, resp)=>{
        if (error){ return console.log("There was a duplicate key!")}

        res.send(resp);

    })


}
