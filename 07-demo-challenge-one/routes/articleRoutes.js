const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllArticles);

router.get('/article/:id', articleController.getArticleById);

router.get('/admin/add', articleController.getAddForm);

router.post('/admin/add', articleController.createArticle);

router.get('/admin/edit/:id', articleController.getEditForm);

router.post('/admin/edit/:id', articleController.updateArticle);

router.post('/admin/delete/:id', articleController.deleteArticle);

module.exports = router;