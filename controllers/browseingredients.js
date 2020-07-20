const { Pool } = require('pg');
var pool = new Pool({
    connectionString: 'postgres://postgres:9789@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});

const session = require('express-session');

exports.meats = (req,res) =>{

    if(req.session.user){
        var ingredientsQuery = `SELECT * FROM ingredients WHERE aisle = 'meats'`

        pool.query(ingredientsQuery, (error, result) =>{
            if (error){
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Meats"}
            res.render('pages/browse_ingredients', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.produce = (req,res) =>{

    if(req.session.user){
        var ingredientsQuery = `SELECT * FROM ingredients WHERE aisle = 'produce'`

        pool.query(ingredientsQuery, (error, result) =>{
            if (error){
             res.send(error)
            };

            console.log(result);
            var data = {"rows": result.rows, "title": "Produce"}
            res.render('pages/browse_ingredients', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.grains = (req,res) =>{

    if(req.session.user){
        var ingredientsQuery = `SELECT * FROM ingredients WHERE aisle = 'grains'`

        pool.query(ingredientsQuery, (error, result) =>{
            if (error){
             res.send(error)
            };

            var data = {"rows": result.rows, "title": "Grains"}
            res.render('pages/browse_ingredients', data);
        })
    }

    else{
        res.render('pages/login');
    }
}

exports.seasonings = (req,res) =>{

    if(req.session.user){
        var ingredientsQuery = `SELECT * FROM ingredients WHERE aisle = 'seasoning'`

        pool.query(ingredientsQuery, (error, result) =>{
            if (error){
             res.send(error)
            };

            console.log(result);
            var data = {"rows": result.rows, "title": "Seasonings"}
            res.render('pages/browse_ingredients', data);
        })
    }

    else{
        res.render('pages/login');
    }
}
