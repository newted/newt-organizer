const mongoose = require("mongoose");
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  name: String,
  details: String,
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

module.exports = assignmentSchema;
