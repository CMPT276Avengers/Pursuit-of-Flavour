const express = require('express');
const router = express.Router();

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
    // console.log(req.session.user);
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






module.exports = router;
