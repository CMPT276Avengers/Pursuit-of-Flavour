const express = require('express');
const router = express.Router();

//route made for page redirection
router.get('/', (req, res) => {
    if(req.session.username){
        res.redirect('/loggedin');
    }else{
        res.render('pages/landing');
    }
})

//route made for authentication
router.get('/login', (req,res) => {
    if(req.session.username){
        res.redirect('/loggedin');
    }else{
        res.render('pages/login');
    }
})

router.get('/loggedin', (req,res) => {
    if(req.session.username){
        res.render('pages/loggedin',{username: req.session.username});
    }
    else{
        res.redirect('/login');
    }
})


module.exports = router;
