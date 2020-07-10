const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();


router.post('/login', authController.login)

router.post('/logout',authController.logout)

router.post('/adduser', authController.adduser)

// router.post('/adduser_recipe', authController.adduser_recipe)


module.exports = router;