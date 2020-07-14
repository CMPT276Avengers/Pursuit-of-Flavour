const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();



// router.post('/updateUser',userController);

router.get('/viewUpdateUsers', adminController.viewUpdateUsers)

module.exports = router

