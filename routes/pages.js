const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

var pool = new Pool({
    connectionString: 'postgres://postgres:password@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});

//route made for page redirection
router.get('/', (req, res) => {
    if(req.session.user){
        res.redirect('/userview');
    }else{
        res.render('pages/landing');
    }
})

//route made for authentication
router.get('/login', (req,res) => {
    if(req.session.user){
        res.redirect('/userview');
    }else{
        res.render('pages/login');
    }
})

// router.get('/loggedin', (req,res) => {
//     if(req.session.username){
//         res.render('pages/loggedin',{username: req.session.username});
//     }
//     else{
//         res.redirect('/login');
//     }
// })

//used for generating registration page
router.get('/register', (req,res) => {
    if(req.session.user){
        res.redirect('/userview');
    }
    else{
        res.render('pages/register')
    }
})

//used for generating userview, based on user type
router.get('/userview', (req,res) => {
    // console.log(req.session.user.username);
    if(req.session.user && req.session.user.usertype == "general"){
        res.render('pages/userview',{username: req.session.user.username});
    }
    else if(req.session.user && req.session.user.usertype == "admin"){
        res.render('pages/userview-a',{username: req.session.user.username});
    }
    else{
        res.redirect('/login');
    }
})

router.get('/my_recipe', (req,res)=>{
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
        res.render('pages/login')
    }



})








module.exports = router;
