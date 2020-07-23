const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

router.get('/details', recipeController.getRecipeDetails);








module.exports = router;