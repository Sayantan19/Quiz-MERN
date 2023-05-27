//This file creates the Teacher schema for validating with the DB for Teacher authentication
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// Create Schema
const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Teacher = mongoose.model("teacher-credentials", TeacherSchema);