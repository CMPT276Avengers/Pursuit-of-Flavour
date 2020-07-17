const express = require('express');
const browseController = require('../controllers/browse');
const router = express.Router();


router.get('/browserecipes', browseController.browserecipes)

router.get('/browseingredients', browseController.browseingredients)

router.post('/addrecipe', browseController.addrecipe)

module.exports = router;