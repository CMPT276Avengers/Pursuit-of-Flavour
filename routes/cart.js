const express = require('express');
const cartController = require('../controllers/cart');
const router = express.Router();


router.post('/updateCart', cartController.updateCart)
router.get('/getUserIng', cartController.getUserIng)
router.post('/deleteFromCart',cartController.deleteFromCart)


module.exports = router;