// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api/apiTimelineController');
const { requireAuth } = require('../middleware/authMiddleware'); // 🛡️ استدعاء الحارس الأمني

// 📝 Posts API Endpoints
router.get('/api/get-posts', apiController.getAllPosts); // متاح للقراءة العامة
router.post('/api/create-post', requireAuth, apiController.postOnePost); // 🔒 محمي
router.put('/api/edit-post/:id', requireAuth, apiController.updateOnePost); // 🔒 محمي
router.delete('/api/delete-post/:id', requireAuth, apiController.deletePost); // 🔒 محمي

// 💬 Comments API Endpoints
router.get('/api/get-post-comments/:postId', apiController.getAllCommentsPost); // متاح للقراءة العامة
router.post('/api/post-post-comment/:postId', requireAuth, apiController.postOneComment); // 🔒 محمي

module.exports = router;