const express = require("express");
const router = express.Router();

const { SetQuestion, UploadQuestion, UploadFile, ExcelToJson } = require('../controllers/questionController.js')

// @route POST api/questions/question
// @desc to set the question settings
// @access Public
router.post('/question', SetQuestion)

// @route POST api/questions/upload
// @desc to upload the question file
// @access Public
router.post('/upload', UploadFile)

module.exports = router;
