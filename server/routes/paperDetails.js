const express = require("express");
const router = express.Router();

const {GetDetails, GetDetailsTeacher} = require('../controllers/paperDetailsController')

// @route GET api/paperdetails/get-details
// @desc to retrieve the paper details
// @access Private
router.get('/get-details', GetDetails)

// @route GET api/paperdetails/get-details
// @desc to retrieve the paper details
// @access Private
router.get('/get-details-teacher/:userId', GetDetailsTeacher)

module.exports = router;
