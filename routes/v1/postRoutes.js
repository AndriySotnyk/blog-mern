const express = require('express');
const postController = require('../../controllers/postController.js');

const router = express.Router();

router.route('/').get(postController.getAllPosts).post(postController.createPost);
router.route('/:id').get(postController.getPostById).put(postController.updatePost).delete(postController.deletePost);

module.exports = router;