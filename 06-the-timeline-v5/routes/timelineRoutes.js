const { Router } = require('express');
const timelineController = require('../controllers/timelineController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', timelineController.getTimeline);
router.post('/add-post', requireAuth, timelineController.createPost);
router.get('/post/:id', timelineController.getPostDetails);
router.post('/post/:id/edit', requireAuth, timelineController.updatePost);
router.delete('/post/:id', requireAuth, timelineController.deletePost);

router.post('/post/:id/comment', requireAuth, timelineController.createComment);
router.delete('/comment/:id', requireAuth, timelineController.deleteComment);
router.post('/comment/:id/edit', requireAuth, timelineController.updateComment);

module.exports = router;