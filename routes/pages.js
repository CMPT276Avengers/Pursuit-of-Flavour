const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page');

const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:root@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});




//route made for page redirection
router.get('/', (req, res) => {
    if(req.session.user){
        res.redirect('/userview');
    }else{
        res.render('pages/landing2');
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

router.get('/my_recipe', pageController.displayRecipes);

router.get('/myingredients', pageController.getMyIngredients);


router.get('/database', pageController.getUserDatabase);


router.get('/make', (req,res)=>{
    if(req.session.user){
        res.render('pages/make');
    }else{
        res.render('pages/login')
    }
})

router.get('/compare_my_ingredients',pageController.compare_my_ingredients);

router.get('/cart',pageController.cart);

router.get('/profile', pageController.profile);

router.get('/upload_image', pageController.upload_image);


module.exports = router;
