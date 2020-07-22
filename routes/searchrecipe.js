const express = require('express');
const router = express.Router();
const searchrecipeController = require('../controllers/searchrecipe');

//router.get('/details', recipeController.getRecipeDetails);

router.get('/searchrecipe',searchrecipeController.searchrecipe);


module.exports = router;
