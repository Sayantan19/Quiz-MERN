const express = require("express");
const router = express.Router();

const { SetQuestion, UploadFile, GetQuestion } = require('../controllers/questionController.js')

// @route POST api/questions/question
// @desc to set the question settings
// @access Private
router.post('/question', SetQuestion)

// @route POST api/questions/upload
// @desc to upload the question file
// @access Private
router.post('/upload', UploadFile)

// @route GET api/question/get-question
// @desc to retrieve the question file
// @access Private
router.post('/get-question', GetQuestion)

module.exports = router;
