const express = require("express");
const router = express.Router();

const {SignIn, Register} = require('../../controllers/teacher/userController')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", Register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", SignIn);

module.exports = router;