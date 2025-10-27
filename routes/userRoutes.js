const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/authMiddleware')
const userController = require('../controllers/userController');

// @route   GET /api/user/get-profile
// @desc    Get a user profile
// @access  Only logged in users can get the access
router.get('/get-profile', authCheck, userController.get_profile);

// @route   PUT /api/user/get-profile
// @desc    Update a user profile
// @access  Only logged in users can get the access
router.put('/update-profile', authCheck, userController.update_profile);

module.exports = router;