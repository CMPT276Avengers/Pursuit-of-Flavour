const express = require('express');
const profileController = require('../controllers/profile.js');
const router = express.Router();

router.post('/update', profileController.update);


module.exports = router;