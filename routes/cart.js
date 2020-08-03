const express = require('express');
const cartController = require('../controllers/cart');
const router = express.Router();


router.post('/updateCart', cartController.updateCart)
router.get('/getUserIng', cartController.getUserIng)
router.post('/deleteFromCart',cartController.deleteFromCart)
router.post('/checkOutCart',cartController.checkOutCart)


module.exports = router;