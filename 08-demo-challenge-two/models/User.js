const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is strictly required'],
        trim: true,
        maxlength: [10, 'First Name must be not longer than 10 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is strictly required'],
        trim: true,
        maxlength: [15, 'Last Name must be not longer than 15 characters']
    },
    email: {
        type: String,
        required: [true, 'Email Address is strictly required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is strictly required']
    }
}, { timestamps: true });


userSchema.pre('save', async function () {

    if (!this.isModified('password')) return; 

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;