// This file is for creating the result schema for validation from the DB
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// Create Schema
const ResultSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  papername: {
    type: String,
    required: true
  },
  papercode: {
    type: String,
    required: true
  },
  testno: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  totalmarks: {
    type: Number,
    required: true
  },
  cheated: {
    type: Number,
    required: true
  },
});
module.exports = Result = mongoose.model("student-scores", ResultSchema);