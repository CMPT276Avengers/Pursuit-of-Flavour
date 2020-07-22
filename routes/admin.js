const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();



// router.post('/updateUser',userController);

router.get('/viewUpdateUsers', adminController.viewUpdateUsers)

router.post('/addUsers', adminController.addUsers)

router.post('/deleteUsers', adminController.deleteUsers)

router.post('/viewUsers', adminController.viewUsers)



module.exports = router
