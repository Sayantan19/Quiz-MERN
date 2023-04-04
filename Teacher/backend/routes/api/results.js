const express = require("express");
const router = express.Router();

const {DisplayAll} = require('../../controllers/resultController')

// @route POST api/results/scores
// @desc displays results of quiz
// @access Public
router.get('/scores', DisplayAll);

module.exports = router