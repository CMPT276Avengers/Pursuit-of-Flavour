const { Pool } = require('pg');
var pool = new Pool({
    connectionString: 'postgres://postgres:password@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});
const session = require('express-session');

exports.getMyIngredients = (req,res) => {
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