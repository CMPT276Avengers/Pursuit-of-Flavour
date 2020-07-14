const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:password@localhost/cmpt276project'

    // connectionString: process.env.DATABASE_URL
});

const session = require('express-session');

exports.american = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE cuisine = 'American'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "American"}
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.chinese = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE cuisine = 'Chinese'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Chinese"}
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.japanese = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE cuisine = 'Japanese'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Japanese"}
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.breakfast = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE type = 'Breakfast'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Breakfast"}
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.maincourse = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE type = 'Main Course'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Main Course"}
       
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.appetizer = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE type = 'Appetizer'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Appetizer"}
        
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.dessert = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE type = 'Dessert'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Dessert"}
          
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.vegan = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE vegan = 'Yes'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Vegan"}
        
            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.healthy = (req,res) =>{
    if(req.session.user){
        var recipeQuery = "SELECT * FROM recipes WHERE healthy = 'Yes'"

        pool.query(recipeQuery, (error, result) =>{
            if (error){ 
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Healthy"}

            res.render('pages/browserecipes', data);
        })
    }

    else{
        res.render('pages/login');
    }
}


exports.addrecipe = (req,res) =>{
    var recipe_id = req.body.recipe_id
    var username = req.session.user.username;

    user_recipe_param = [username,recipe_id]

    var addUser_Recipe =  `INSERT INTO exists_in VALUES ($1, $2, DEFAULT);`

    pool.query(addUser_Recipe, user_recipe_param,(error, resp)=>{
        if (error){ return console.log(error)}

        res.redirect('/my_recipe');

    })


}
