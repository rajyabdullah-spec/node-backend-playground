// controllers/api/apiTimelineController.js
const Post = require('../../models/postModel');
const Comment = require('../../models/Comment');
const User = require('../../models/User'); // 👥 Added User model requirement

// ==========================================================================
// 📝 POSTS CONTROLLER ACTIONS
// ==========================================================================

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching posts.' });
    }
};

exports.postOnePost = async (req, res) => {
    try {
        const { post } = req.body;
        // 🛡️ Fetch user to satisfy database requirements
        const user = await User.findById(req.userId); 

        const newPost = await Post.create({ 
            post,
            user_id: req.userId,
            username: user.username 
        });
        res.status(201).json(newPost);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: messages[0] });
        }
        res.status(500).json({ error: 'Internal server error while saving post.' });
    }
};

exports.updateOnePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        const postToUpdate = await Post.findById(id);
        if (!postToUpdate) {
            return res.status(404).json({ error: 'Post not found to update.' });
        }

        // 🛡️ Strict Ownership Guard Check for API
        if (postToUpdate.user_id.toString() !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized action.' });
        }

        postToUpdate.post = message;
        await postToUpdate.save();

        res.status(200).json(postToUpdate);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: messages[0] });
        }
        res.status(500).json({ error: 'Server error during post modification.' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const postToDelete = await Post.findById(id);

        if (!postToDelete) {
            return res.status(404).json({ error: 'Target post not found for deletion.' });
        }

        // 🛡️ Strict Ownership Guard Check for API
        if (postToDelete.user_id.toString() !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized action.' });
        }

        await Comment.deleteMany({ post_id: id });
        await Post.findByIdAndDelete(id);
        
        res.status(200).json({ success: true, message: 'Post and its associated comments deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Server error during deletion processing.' });
    }
};

// ==========================================================================
// 💬 COMMENTS CONTROLLER ACTIONS
// ==========================================================================

exports.getAllCommentsPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const parentPostExists = await Post.exists({ _id: postId });
        if (!parentPostExists) {
            return res.status(404).json({ error: 'Parent post not found.' });
        }

        const comments = await Comment.find({ post_id: postId }).sort({ createdAt: 1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching comments.' });
    }
};

exports.postOneComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { comment } = req.body;

        const parentPostExists = await Post.exists({ _id: postId });
        if (!parentPostExists) {
            return res.status(404).json({ error: 'Cannot comment on a non-existing post.' });
        }

        // 🛡️ Fetch user to satisfy database requirements
        const user = await User.findById(req.userId);

        const newComment = await Comment.create({
            comment,
            post_id: postId,
            user_id: req.userId,
            username: user.username
        });

        res.status(201).json(newComment);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: messages[0] });
        }
        res.status(500).json({ error: 'Server error while submitting comment.' });
    }
};