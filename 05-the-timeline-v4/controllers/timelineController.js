const Post = require('../models/postModel');
const Comment = require('../models/Comment');

const getTimeline = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const comments = await Comment.find({ post_id: post._id }).sort({ createdAt: 1 });
                return { ...post._doc, comments: comments };
            })
        );
        
       
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
        console.error('❌ Error fetching timeline data:', err);
        res.status(500).send('Server Error');
    }
};


const createPost = (req, res) => {
    const newPost = new Post({ post: req.body.post });
    newPost.save()
        .then(() => res.redirect('/'))
        .catch((err) => {
            
            res.redirect('/?postError=' + encodeURIComponent(err.message));
        });
};

const getPostDetails = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); 
        if (!post) return res.status(404).send('Post not found');
        res.render('details', { post: post }); 
    } catch (err) {
        res.status(500).send('Server Error');
    }
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
        const id = req.params.id;
        const updatedText = req.body.message; 
        if (updatedText.length < 25) {
            const post = await Post.findById(id);
            return res.render('details', { post: post, error: 'Message must be at least 25 characters long' });
        }
        await Post.findByIdAndUpdate(id, { post: updatedText });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Update failed');
    }
};


const createComment = async (req, res) => {
    const postId = req.params.id;
    try {
        const newComment = new Comment({ comment: req.body.comment, post_id: postId });
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
        const updatedCommentText = req.body.comment;
        if (updatedCommentText.length < 10) {
           
            const currentComment = await Comment.findById(commentId);
            return res.redirect(`/?commentError=${encodeURIComponent('Comment must be at least 10 characters long')}&errorPostId=${currentComment.post_id}`);
        }
        await Comment.findByIdAndUpdate(commentId, { comment: updatedCommentText });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Update comment failed');
    }
};

module.exports = {
    getTimeline, createPost, getPostDetails, deletePost, updatePost,
    createComment, deleteComment, updateComment
};