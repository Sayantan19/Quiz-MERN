const express = require("express");
const router = express.Router();

const { SetQuestion, UploadQuestion, UploadFile } = require('../../controllers/teacher/questionController.js')

// @route POST api/questions/question
// @desc to set the question settings
// @access Public
router.post('/question', SetQuestion)

// @route POST api/questions/upload
// @desc to upload the question file
// @access Public
router.post('/upload', UploadFile)

// @route POST api/questions/process
// @desc process the file and sets up the final question.json file which the student side will read
// @access Public
router.post('/process', UploadQuestion)

module.exports = router;
