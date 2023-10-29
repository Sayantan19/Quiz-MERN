const express = require("express");
const router = express.Router();

const {sendOTPEmail} = require('../controllers/emailController');

// @route POST api/emails/send-email
// @desc to retrieve the paper details
// @access Public
router.post('/send-email', sendOTPEmail);

module.exports = router;