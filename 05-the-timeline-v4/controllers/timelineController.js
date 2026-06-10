const Post = require('../models/postModel');
const Comment = require('../models/Comment');

const getTimeline = async (req, res) => {
    try {
        const postsWithComments = await Post.find()
            .sort({ createdAt: -1 })
            .populate({
                path: 'comments',
                options: { sort: { createdAt: 1 } }
            });
        
        const postError = req.query.postError || null;
        const commentError = req.query.commentError || null;
        const errorPostId = req.query.errorPostId || null;

        res.render('timeline', { 
            posts: postsWithComments, 
            error: postError, 
            commentError: commentError,
            errorPostId: errorPostId
        });
    } catch (err) {
        console.error('Error fetching timeline data:', err);
        res.status(500).send('Server Error');
    }
};

const getPostDetails = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate({
            path: 'comments',
            options: { sort: { createdAt: 1 } }
        });

        if (!post) {
            return res.status(404).send('Post not found');
        }

        res.render('details', { post });
    } catch (err) {
        console.error('Error fetching post details:', err);
        res.status(500).send('Server Error');
    }
};

const createPost = (req, res) => {
    const cleanPost = req.body.post ? req.body.post.trim() : '';
    if (cleanPost.length < 25) {
        return res.redirect('/?postError=' + encodeURIComponent('Post must be at least 25 valid characters'));
    }

    const newPost = new Post({ post: cleanPost });
    newPost.save()
        .then(() => res.redirect('/'))
        .catch((err) => {
            res.redirect('/?postError=' + encodeURIComponent(err.message));
        });
};

const deletePost = async (req, res) => {
    try {
        await Comment.deleteMany({ post_id: req.params.id });
        await Post.findByIdAndDelete(req.params.id);
        res.json({ redirect: '/' });
    } catch (err) {
        res.status(500).send('Delete failed');
    }
};

const updatePost = async (req, res) => {
    try {
        const postContent = req.body.post || req.body.message;
        if (!postContent) {
            return res.status(400).send('Update failed: No content provided');
        }

        const cleanPost = postContent.trim();
        if (cleanPost.length < 25) {
            return res.redirect('/?postError=' + encodeURIComponent('Update failed: Minimum 25 characters required'));
        }
        
        await Post.findByIdAndUpdate(req.params.id, { post: cleanPost });
        res.redirect('/');
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Update failed');
    }
};

const createComment = async (req, res) => {
    const postId = req.params.id;
    try {
        const cleanComment = req.body.comment ? req.body.comment.trim() : '';
        if (cleanComment.length < 10) {
            return res.redirect(`/?commentError=${encodeURIComponent('Comment must be at least 10 valid characters')}&errorPostId=${postId}`);
        }

        const newComment = new Comment({ comment: cleanComment, post_id: postId });
        await newComment.save();
        res.redirect('/');
    } catch (err) {
        res.redirect(`/?commentError=${encodeURIComponent(err.message)}&errorPostId=${postId}`);
    }
};

const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ redirect: '/' });
    } catch (err) {
        res.status(500).send('Delete comment failed');
    }
};

const updateComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        const cleanCommentText = req.body.comment ? req.body.comment.trim() : '';
        if (cleanCommentText.length < 10) {
            const currentComment = await Comment.findById(commentId);
            return res.redirect(`/?commentError=${encodeURIComponent('Comment must be at least 10 valid characters')}&errorPostId=${currentComment.post_id}`);
        }
        await Comment.findByIdAndUpdate(commentId, { comment: cleanCommentText });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Update comment failed');
    }
};

module.exports = {
    getTimeline,
    getPostDetails,
    createPost,
    deletePost,
    updatePost,
    createComment,
    deleteComment,
    updateComment
};