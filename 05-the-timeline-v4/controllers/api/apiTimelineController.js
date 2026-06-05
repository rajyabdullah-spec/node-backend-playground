// controllers/api/apiTimelineController.js
const Post = require('../../models/postModel');
const Comment = require('../../models/Comment');

// ==========================================================================
// 📝 POSTS CONTROLLER ACTIONS
// ==========================================================================

// 1. GET ALL POSTS WITH THEIR COMMENTS MAPPED
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching posts.' });
    }
};

// 2. CREATE A SINGLE NEW POST (With Mongoose Validation Trap)
exports.postOnePost = async (req, res) => {
    try {
        const { post } = req.body;
        const newPost = await Post.create({ post });
        res.status(201).json(newPost); // 201 Created
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: messages[0] }); // 400 Bad Request
        }
        res.status(500).json({ error: 'Internal server error while saving post.' });
    }
};

// 3. UPDATE AN EXISTING POST BY ID (With Guard Clause for 404)
exports.updateOnePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body; // Matching the frontend key

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { post: message }, 
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found to update.' }); // 404 Not Found
        }

        res.status(200).json(updatedPost); // 200 OK
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: messages[0] });
        }
        res.status(500).json({ error: 'Server error during post modification.' });
    }
};

// 4. DELETE A POST AND REMOVE ITS CORRESPONDING COMMENTS
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ error: 'Target post not found for deletion.' });
        }

        // Clean up orphaned comments linked to this deleted post
        await Comment.deleteMany({ post_id: id });
        
        res.status(200).json({ success: true, message: 'Post and its associated comments deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Server error during deletion processing.' });
    }
};

// ==========================================================================
// 💬 COMMENTS CONTROLLER ACTIONS
// ==========================================================================

// 5. GET ALL COMMENTS LINKED TO A SPECIFIC POST ID
exports.getAllCommentsPost = async (req, res) => {
    try {
        const postId = req.params.postId; // Accessing exact param name from route Spec
        
        // Ensure the parent post actually exists first
        const parentPostExists = await Post.exists({ _id: postId });
        if (!parentPostExists) {
            return res.status(404).json({ error: 'Parent post not found.' });
        }

        const comments = await Comment.find({ post_id: postId }).sort({ createdAt: 1 }); // Oldest first as requested by client wireframe
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching comments.' });
    }
};

// 6. POST ONE COMMENT UNDER A SPECIFIC POST ID
exports.postOneComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { comment } = req.body;

        const parentPostExists = await Post.exists({ _id: postId });
        if (!parentPostExists) {
            return res.status(404).json({ error: 'Cannot comment on a non-existing post.' });
        }

        const newComment = await Comment.create({
            comment,
            post_id: postId
        });

        res.status(201).json(newComment); // 201 Created
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: messages[0] });
        }
        res.status(500).json({ error: 'Server error while submitting comment.' });
    }
};