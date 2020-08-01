const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');


router.get('/message',messageController.message);


module.exports = router;
