const { Pool } = require('pg');
var pool = new Pool({

    // connectionString: 'postgres://postgres:root@localhost/cmpt276project'
   connectionString: process.env.DATABASE_URL
});
const session = require('express-session');

exports.getRecipeComments = (req,res) => {
    var recipeId = req.query.recipeId;
    var query = 'SELECT * from comment where recipe_id = $1'
    pool.query(query,[recipeId],(error,results) => {
        res.send(results.rows);
    })
}  

exports.postComment = (req,res) => {
    var username = req.session.user.username;
    var recipeId = req.body.data.recipeId;
    var context = req.body.data.context;
    var time = new Date();

    var query = "INSERT INTO comment (username,recipe_id,context,time) VALUES ($1,$2,$3,$4);"
    pool.query(query,[username,recipeId,context,time],function(error,results){
        res.sendStatus(202);
    })

}