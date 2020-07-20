const express = require('express');
const browseController = require('../controllers/browse');
const router = express.Router();


router.post('/browserecipesbyCuisine', browseController.browserecipesbyCuisine)

router.post('/browserecipesbyType', browseController.browserecipesbyType)

router.post('/browserecipesbyVegan', browseController.browserecipesbyVegan)


router.get('/browseingredients', browseController.browseingredients)

router.post('/addrecipe', browseController.addrecipe)
router.post('/addUserRecipe', browseController.addUserRecipe)

router.post('/addingredients', browseController.addingredients)


// router.post('/populaterecipesCuisine', browseController.populaterecipesCuisine)
// router.post('/populaterecipesType', browseController.populaterecipesType)
// router.post('/populaterecipesVegan', browseController.populaterecipesVegan)
// router.post('/populateingredients', browseController.populateingredients)

module.exports = router;