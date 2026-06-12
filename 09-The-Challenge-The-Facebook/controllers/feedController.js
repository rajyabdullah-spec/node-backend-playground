const Feed = require('../models/Feed');

exports.getAllFeeds = async (req, res) => {
    try {
        const feeds = await Feed.find().sort({ createdAt: -1 });
        res.render('index', { feeds, errors: null });
    } catch (err) {
        res.render('index', { feeds: [], errors: ['Failed to load database records.'] });
    }
};

exports.createFeed = async (req, res) => {
    const { name, message } = req.body;
    try {
        const newFeed = new Feed({ name, message });
        await newFeed.save();
        res.redirect('/feed');
    } catch (err) {
        const feeds = await Feed.find().sort({ createdAt: -1 });
        let errorMessages = [];
        
        if (err.name === 'ValidationError') {
            errorMessages = Object.values(err.errors).map(val => val.message);
        } else {
            errorMessages.push('An unexpected error occurred during insertion.');
        }
        
        res.render('index', { feeds, errors: errorMessages });
    }
};

exports.getSingleFeed = async (req, res) => {
    try {
        const feed = await Feed.findById(req.params.id);
        if (!feed) return res.redirect('/feed');
        res.render('show', { feed });
    } catch (err) {
        res.redirect('/feed');
    }
};

exports.getEditFeed = async (req, res) => {
    try {
        const feed = await Feed.findById(req.params.id);
        if (!feed) return res.redirect('/feed');
        res.render('edit', { feed, errors: null });
    } catch (err) {
        res.redirect('/feed');
    }
};

exports.updateFeed = async (req, res) => {
    const { name, message } = req.body;
    try {
        await Feed.findByIdAndUpdate(
    req.params.id, 
    { name, message }, 
    { returnDocument: 'after', runValidators: true }
);

        res.redirect('/feed');
    } catch (err) {
        const feed = await Feed.findById(req.params.id);
        let errorMessages = [];
        
        if (err.name === 'ValidationError') {
            errorMessages = Object.values(err.errors).map(val => val.message);
        } else {
            errorMessages.push('An unexpected error occurred during update.');
        }
        
        res.render('edit', { feed, errors: errorMessages });
    }
};

exports.deleteFeed = async (req, res) => {
    try {
        await Feed.findByIdAndDelete(req.params.id);
        res.redirect('/feed');
    } catch (err) {
        res.redirect('/feed');
    }
};