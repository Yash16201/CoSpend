const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login an existing user by email
// @access  Public
router.post('/login/email', authController.loginByEmail);

// @route   POST /api/auth/login
// @desc    Login an existing user by phone
// @access  Public
router.post('/login/phone', authController.loginByPhone);

module.exports = router;