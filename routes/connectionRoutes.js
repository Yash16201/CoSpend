const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/authMiddleware')
const connectionController = require('../controllers/connectionController');

// @route   POST /api/connection/send-request
// @desc    Send a connection request
// @access  Only logged in users can send requests
router.post('/send-request', authCheck, connectionController.send_request_to_connect);

// @route   GET /api/connection/requests
// @desc    Get all connection requests
// @access  Only logged in users can get the access
router.get('/requests', authCheck, connectionController.get_all_connection_requests);

// @route   PUT /api/connection/approve-request
// @desc    Approve a connection request
// @access  Only logged in users can approve requests
router.put('/approve-request', authCheck, connectionController.approve_request);

// @route   PUT /api/connection/block-user
// @desc    Block a user
// @access  Only logged in users can block users
router.put('/block-user', authCheck, connectionController.block_user);

// @route   DELETE /api/connection/delete-connection
// @desc    Delete a connection
// @access  Only logged in users can delete connections
router.delete('/delete-connection', authCheck, connectionController.delete_connection);

// @route   GET /api/connection/my-connections
// @desc    Get all accepted connections
// @access  Only logged in users can get their connections
router.get('/my-connections', authCheck, connectionController.get_my_all_connections);

// @route   GET /api/connection/blocked-connections
// @desc    Get all blocked users
// @access  Only logged in users can get their blocked users
router.get('/blocked-connections', authCheck, connectionController.get_my_blocked_connections);

module.exports = router;