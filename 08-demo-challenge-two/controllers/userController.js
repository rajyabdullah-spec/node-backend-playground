const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// 📥 1. GET: Render Index Page (Login & Register Form) -> Path: /
exports.getIndexPage = (req, res) => {
    res.render('index', { errors: null, success: null });
};

// 🔐 2. POST: Process Registration -> Path: /register
exports.processRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return res.render('index', { errors: extractedErrors, success: null });
    }

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('index', { errors: ['Passwords do not match!'], success: null });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('index', { errors: ['Email address is already registered.'], success: null });
        }

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        res.cookie('userSessionId', newUser._id.toString(), { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect('/welcome');

    } catch (err) {
        return res.render('index', { errors: [err.message], success: null });
    }
};

// 🔓 3. POST: Process Login -> Path: /login
exports.processLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('index', { errors: ['Please fill in all login fields.'], success: null });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('index', { errors: ['Incorrect Email Address or Password.'], success: null });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('index', { errors: ['Incorrect Email Address or Password.'], success: null });
        }

        res.cookie('userSessionId', user._id.toString(), { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect('/welcome');

    } catch (err) {
        return res.render('index', { errors: [err.message], success: null });
    }
};

// 📥 4. GET: Render Welcome Page -> Path: /welcome
exports.getWelcomePage = async (req, res) => {
    const userId = req.cookies.userSessionId;

    if (!userId) {
        return res.redirect('/');
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.clearCookie('userSessionId');
            return res.redirect('/');
        }
        res.render('welcome', { user });
    } catch (err) {
        res.redirect('/');
    }
};

// 🚪 5. GET: Clear Session -> Path: /logout
exports.processLogout = (req, res) => {
    res.clearCookie('userSessionId');
    res.redirect('/');
};