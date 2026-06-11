const { body, validationResult } = require('express-validator');

// 🧪 Validation rules strictly optimized for the User Signup pipeline
const signupValidationRules = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is strictly required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email address is strictly required')
        .isEmail().withMessage('Please provide a valid email format structure'),
    
    body('password')
        .notEmpty().withMessage('Password field cannot be empty')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// 🚦 Middleware controller to intercept errors and halt execution if payload is invalid
const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return next(); // No validation errors found, proceed forward safely
    }

    // Extracting the first error message to send back to the user interface
    const extractedErrors = errors.array().map(err => err.msg);
    return res.status(400).json({ error: extractedErrors[0] });
};

module.exports = {
    signupValidationRules,
    validate
};