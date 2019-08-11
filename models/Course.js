const mongoose = require("mongoose");
const { Schema } = mongoose;

const AssignmentSchema = require("./Assignment");

const courseSchema = new Schema({
  name: String,
  shortname: String,
  programId: {
    type: Schema.Types.ObjectId,
    ref: "Program"
  },
  assignments: [AssignmentSchema],
  dateCreated: Date
});

mongoose.model("courses", courseSchema);
