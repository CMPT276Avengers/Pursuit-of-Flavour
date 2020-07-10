const express = require('express');
const browseController = require('../controllers/browserecipes');
const router = express.Router();


router.get('/american', browseController.american)

router.get('/chinese', browseController.chinese)

router.get('/japanese', browseController.japanese)

router.get('/maincourse', browseController.maincourse)

router.get('/breakfast', browseController.breakfast)

router.get('/appetizer', browseController.appetizer)

router.get('/dessert', browseController.dessert)

router.get('/vegan', browseController.vegan)

router.get('/healthy', browseController.healthy)

module.exports = router;