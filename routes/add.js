const express = require('express');
const addController = require('../controllers/add');
const router = express.Router();


router.post('/adduser_recipe', addController.adduser_recipe)

router.post('/deleteuser_recipe', addController.deleteuser_recipe)


module.exports = router;