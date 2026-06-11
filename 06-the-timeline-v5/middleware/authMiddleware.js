const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🛡️ Guard Middleware: Strictly blocks unauthorized guest users from accessing actions
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Please log in first.' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'raji_super_secret_key_2026', (err, decodedToken) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(401).json({ error: 'Invalid token signature. Access denied.' });
        }

        req.userId = decodedToken.id;
        next();
    });
};

// 👥 Identity Middleware: Checks token status on every single request to feed user data to templates
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.locals.user = null; // No user is logged in, template context is set to empty safely
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET || 'raji_super_secret_key_2026', async (err, decodedToken) => {
        if (err) {
            console.error('General View Token Error:', err.message);
            res.locals.user = null;
            return next();
        }

        try {
            // Fetch the user document from the database using the token payload id
            const user = await User.findById(decodedToken.id).select('-password'); // Strict exclusion of password hash for privacy
            res.locals.user = user; // Injecting the clean user dataset straight into the layout engine context
            next();
        } catch (dbError) {
            console.error('Database connection inside middleware failed:', dbError);
            res.locals.user = null;
            next();
        }
    });
};

module.exports = { requireAuth, checkUser };