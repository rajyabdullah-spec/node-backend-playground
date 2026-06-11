const Article = require('../models/Article');

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.render('index', { articles });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.render('show', { article });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.getAddForm = (req, res) => {
    res.render('add', { errors: [], oldData: {} });
};

exports.createArticle = async (req, res) => {
    const { title, author, article } = req.body;
    const errors = [];

    if (!title || !author || !article) {
        errors.push('The Fields are required, No fields can be empty');
    }
    if (title && title.length <= 25) {
        errors.push('The Title field must be longer than 25 characters');
    }
    if (article && article.length <= 100) {
        errors.push('The Article field must be longer than 100 characters');
    }

    if (errors.length > 0) {
        return res.render('add', { errors, oldData: { title, author, article } });
    }

    try {
        await Article.create({ title, author, article });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.getEditForm = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.render('edit', { article, errors: [] });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.updateArticle = async (req, res) => {
    const { title, author, article } = req.body;
    const errors = [];

    if (!title || !author || !article) {
        errors.push('The Fields are required, No fields can be empty');
    }
    if (title && title.length <= 25) {
        errors.push('The Title field must be longer than 25 characters');
    }
    if (article && article.length <= 100) {
        errors.push('The Article field must be longer than 100 characters');
    }

    if (errors.length > 0) {
        return res.render('edit', { 
            errors, 
            article: { _id: req.params.id, title, author, article } 
        });
    }

    try {
        await Article.findByIdAndUpdate(req.params.id, { title, author, article }, { runValidators: true });
        res.redirect(`/article/${req.params.id}`);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};