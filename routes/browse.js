const express = require('express');
const browseController = require('../controllers/browserecipes');
const router = express.Router();


router.get('/browse', browseController.browse)

router.post('/addrecipe', browseController.addrecipe)

module.exports = router;