const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    post: {
        type: String,
        required: [true, 'Post content is required'],
        minlength: [25, 'Post should be minimum 25 characters']
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