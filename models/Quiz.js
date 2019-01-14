const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema({
  name: String,
  inProgress: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  dateCreated: Date,
  dateDue: Date
});

module.exports = quizSchema;
