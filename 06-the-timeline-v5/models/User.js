const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 🏛️ Definition of the User Schema structure
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is strictly required'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email address is strictly required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is strictly required'],
        minlength: [6, 'Password must be at least 6 characters long']
    }
}, {
    timestamps: true // Automatically creates and manages createdAt and updatedAt fields
});

// 🔒 Mongoose Pre-Save Hook: Automating Password Hashing via bcrypt
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is completely new
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a secure cryptographic salt layer (10 rounds)
        const salt = await bcrypt.genSalt(10);
        // Transform the plain text password into an encrypted hash string
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// 🏛️ Compile the schema structure into a reusable Mongoose Model
const User = mongoose.model('User', userSchema);

module.exports = User;