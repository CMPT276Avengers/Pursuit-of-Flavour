const express = require('express');
const router = express.Router();

//route made for page redirection
router.get('/', (req, res) => {
    res.render('pages/landing');
})

//route made for authentication
router.get('/login', (req,res) => {
    res.render('pages/login');
})

router.get('/loggedin', (req,res) => {
    res.render('pages/loggedin');
})


module.exports = router;
