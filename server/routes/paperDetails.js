const express = require("express");
const router = express.Router();

const {GetDetails} = require('../controllers/paperDetailsController')

// @route GET api/paperdetails/get-details
// @desc to retrieve the paper details
// @access Private
router.get('/get-details', GetDetails)

module.exports = router;
