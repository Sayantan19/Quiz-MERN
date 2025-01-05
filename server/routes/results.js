const express = require("express");
const router = express.Router();

const {Display, ResultSend, DisplayAll, DeleteAllResults } = require('../controllers/resultController')

// @route POST api/results/result
// @desc posts results of quiz
// @access Public
router.post("/result", ResultSend);

// @route POST api/results/display
// @desc displays results of quiz
// @access Public
router.post("/display", Display);

// @route GET api/results/scores
// @desc displays results of a particular paper
// @access Public
router.get('/scores/:teacherUserId/:code/:testno', DisplayAll);

router.post('/delete/deletePaperResults', DeleteAllResults);

module.exports = router