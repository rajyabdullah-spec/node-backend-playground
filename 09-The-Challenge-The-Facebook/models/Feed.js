const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is strictly required'],
        trim: true,
        maxlength: [15, 'The Name field must be no longer than 15 characters']
    },
    message: {
        type: String,
        required: [true, 'Message field is strictly required'],
        trim: true,
        maxlength: [40, 'The Message field must be no longer than 40 characters']
    }
}, { timestamps: true });

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;