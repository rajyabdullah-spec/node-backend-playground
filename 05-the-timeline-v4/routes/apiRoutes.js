// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api/apiTimelineController');

// 📝 Posts API Endpoints
router.get('/api/get-posts', apiController.getAllPosts);
router.post('/api/create-post', apiController.postOnePost);
router.put('/api/edit-post/:id', apiController.updateOnePost);
router.delete('/api/delete-post/:id', apiController.deletePost);

// 💬 Comments API Endpoints
router.get('/api/get-post-comments/:postId', apiController.getAllCommentsPost);
router.post('/api/post-post-comment/:postId', apiController.postOneComment);

module.exports = router;