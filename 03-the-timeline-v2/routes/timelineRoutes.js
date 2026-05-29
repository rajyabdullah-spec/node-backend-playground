const express = require('express');
const router = express.Router();


const timelineController = require('../controllers/timelineController');


router.get('/', timelineController.getTimeline);

router.post('/add-post', timelineController.createPost);


router.get('/post/:id', timelineController.getPostDetails);


router.delete('/post/:id', timelineController.deletePost);


router.post('/post/:id/edit', timelineController.updatePost);

module.exports = router;