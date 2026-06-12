const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

// 🧪 Custom Input Validation Rules based on Code Matrix Guidelines
const registerValidationRules = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First Name field cannot be empty')
        .isLength({ max: 10 }).withMessage('The First Name field must be not longer than 10 characters'),
    
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last Name field cannot be empty')
        .isLength({ max: 15 }).withMessage('The Last Name field must be not longer than 15 characters'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email Address is strictly required')
        .isEmail().withMessage('Please provide a valid email format structure'),
    
    body('password')
        .notEmpty().withMessage('Password field cannot be empty')
];

// 🌐 Legacy Custom UI Custom Routes matching Wireframe URL Bars
router.get('/', userController.getIndexPage);
router.get('/welcome', userController.getWelcomePage);
router.get('/logout', userController.processLogout);

// 🔐 Authentication Pipeline Endpoints
router.post('/register', registerValidationRules, userController.processRegister);
router.post('/login', userController.processLogin);

module.exports = router;