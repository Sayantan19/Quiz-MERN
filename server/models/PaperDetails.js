// This file is for creating the Paper Details schema for validation from the DB
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// Create Schema
const PaperDetailsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  testno: {
    type: String,
    required: true
  }
});
module.exports = PaperDetails = mongoose.model("paper-details", PaperDetailsSchema);