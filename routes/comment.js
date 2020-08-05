const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.get('/getRecipeComments', commentController.getRecipeComments);
router.post('/postComment', commentController.postComment);

module.exports = router;