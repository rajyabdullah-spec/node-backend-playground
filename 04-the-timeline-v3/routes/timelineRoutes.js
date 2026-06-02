const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timelineController');

router.get('/', timelineController.getTimeline);
router.post('/add-post', timelineController.createPost);
router.get('/post/:id', timelineController.getPostDetails);
router.delete('/post/:id', timelineController.deletePost);
router.post('/post/:id/edit', timelineController.updatePost);


router.post('/post/:id/comment', timelineController.createComment);
router.delete('/comment/:id', timelineController.deleteComment);
router.post('/comment/:id/edit', timelineController.updateComment);

module.exports = router;