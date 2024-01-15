const express = require("express");
const router = express.Router();

const {GetDetails, GetDetailsTeacher, ChangePaperStatus} = require('../controllers/paperDetailsController')

// @route GET api/paperdetails/get-details
// @desc to retrieve the paper details
// @access Private
router.get('/get-details', GetDetails)

// @route GET api/paperdetails/get-details-teacher
// @desc to retrieve the paper details set by the teacher
// @access Private
router.get('/get-details-teacher/:userId', GetDetailsTeacher)

// @route GET api/paperdetails/change-paper-status
// @desc to deactivate/activate the paper set by the teacher
// @access Private
router.post('/change-paper-status', ChangePaperStatus)

module.exports = router;
