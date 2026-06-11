const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { signupValidationRules, validate } = require('../middleware/validatorMiddleware'); // 🚦 Import the validation layers

// 📥 Visual Frontend Views (GET Requests)
router.get('/signup', (req, res) => res.render('signup'));
router.get('/login', (req, res) => res.render('login'));

// 🔐 Secure Authentication Handlers (With strict input validator injection)
router.post('/signup', signupValidationRules, validate, authController.signup_post);
router.post('/login', authController.login_post);

// 🚪 Session Destruction Handler (GET Request)
router.get('/logout', authController.logout_get);

module.exports = router;