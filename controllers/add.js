const { Pool } = require('pg');
var pool = new Pool({
    connectionString: 'postgres://postgres:password@localhost/project'
    // connectionString: process.env.DATABASE_URL
});


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
    var recipe_id = req.body.recipe_id_delete;
    var username = req.session.user.username;

    user_recipe_param = [username,recipe_id]

    var deleteUser_Recipe =  `DELETE FROM exists_in WHERE username = $1 AND recipe_id = $2`

    pool.query(deleteUser_Recipe, user_recipe_param,(error, resp)=>{
        if (error){ return console.log(error);}

        res.redirect('/my_recipe');

    })


}