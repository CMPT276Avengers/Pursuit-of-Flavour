const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:rootd@localhost/cmpt276project'

    // connectionString: process.env.DATABASE_URL
});
const session = require('express-session');


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