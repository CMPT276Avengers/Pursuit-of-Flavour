const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

router.get('/details', recipeController.getRecipeDetails);
router.get('/speech', recipeController.texttoSpeech);
router.post('/makeRecipe', recipeController.makeRecipe);








module.exports = router;