const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // 🔒 Required for secure user password verification at login

// 📑 Dedicated Error Handling Pipeline for Authentication
const handleErrors = (err) => {
    let errors = { email: '', password: '' };

    // 🔑 1. Catch Duplicate Email Error (MongoDB Error Code: 11000)
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    // 🛡️ 2. Catch Mongoose Validation Errors (Min length, required fields, etc.)
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// 🔑 Helper function to create a signed JSON Web Token (JWT)
const createToken = (id) => {
    const maxAge = 3 * 24 * 60 * 60; // 3 Days in seconds
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};

// 📝 Action handler for processing user registration (Signup)
exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Create user and trigger the pre-save hook for password hashing
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);

        // 2. Drop the token silently inside a secure cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Signup error occurred:', error);
        // 🛡️ Filter the database response through the secure error handling pipeline
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

// 🔓 Action handler for processing user authentication (Login)
exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        // 2. Compare incoming plain password with the hashed password signature
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        // 3. Issue the tracking token on successful match
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

        res.status(200).json({
            message: 'User authenticated successfully',
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Login error occurred:', error);
        res.status(400).json({ error: error.message });
    }
};

// 🚪 Action handler for processing user session termination (Logout)
exports.logout_get = (req, res) => {
    try {
        // 🗑️ Replace the cookie with an empty string and expire it immediately
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Logout error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};