const Post = require('../models/postModel');

const getTimeline = (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then((posts) => {
            res.render('timeline', { posts: posts, error: null });
        })
        .catch((err) => {
            console.error('❌ Error fetching posts:', err);
            res.status(500).send('Server Error');
        });
};

const createPost = (req, res) => {
    const newPost = new Post({
        post: req.body.post 
    });

    newPost.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log('⚠️ Validation Error:', err.message);
            Post.find().sort({ createdAt: -1 })
                .then((posts) => {
                    res.render('timeline', { posts: posts, error: err.message });
                });
        });
};

const getPostDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id); 
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('details', { post: post }); 
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        await Post.findByIdAndDelete(id); 
        res.json({ redirect: '/' }); 
    } catch (err) {
        console.log(err);
        res.status(500).send('Delete failed');
    }
};

const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedText = req.body.message; 
        
        if (updatedText.length < 25) {
            const post = await Post.findById(id);
            return res.render('details', { post: post, error: 'Message must be at least 25 characters long' });
        }

        await Post.findByIdAndUpdate(id, { post: updatedText }); 
        res.redirect('/'); 
    } catch (err) {
        console.log(err);
        res.status(500).send('Update failed');
    }
};

module.exports = {
    getTimeline,
    createPost,
    getPostDetails,
    deletePost,
    updatePost
};