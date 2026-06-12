const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');


router.get('/', (req, res) => {
    res.redirect('/feed');
});


router.get('/feed', feedController.getAllFeeds);

router.get('/feed/edit/:id', feedController.getEditFeed);

router.get('/feed/:id', feedController.getSingleFeed);

router.post('/feed/add', feedController.createFeed);

router.put('/feed/update/:id', feedController.updateFeed);

router.delete('/feed/delete/:id', feedController.deleteFeed);

module.exports = router;