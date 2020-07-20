const express = require('express');
const ingredientsController = require('../controllers/browseingredients');
const router = express.Router();


router.get('/meats', ingredientsController.meats)

router.get('/produce', ingredientsController.produce)

router.get('/grains', ingredientsController.grains)

router.get('/seasonings', ingredientsController.seasonings)

module.exports = router;
