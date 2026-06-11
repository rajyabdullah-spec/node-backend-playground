const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The Title field is required'],
        minlength: [26, 'The Title field must be longer than 25 characters']
    },
    article: {
        type: String,
        required: [true, 'The Article field is required'],
        minlength: [101, 'The Article field must be longer than 100 characters']
    },
    author: {
        type: String,
        required: [true, 'The Author field is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);