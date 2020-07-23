const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredients');

router.get('/getMyIngredients',ingredientController.getMyIngredients);
router.post('/addIngredients',ingredientController.addIngredients);

module.exports = router;
