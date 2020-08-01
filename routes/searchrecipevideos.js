const express = require('express');
const router = express.Router();
const searchrecipevidoesController = require('../controllers/searchrecipevideos');

//router.get('/details', recipeController.getRecipeDetails);

router.get('/searchrecipevideos',searchrecipevidoesController.searchrecipevideos);


module.exports = router;
