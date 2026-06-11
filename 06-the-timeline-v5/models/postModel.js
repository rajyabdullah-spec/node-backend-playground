const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post_id'
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;