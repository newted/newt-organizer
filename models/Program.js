const mongoose = require("mongoose");
const { Schema } = mongoose;
const CourseSchema = require("./Course");

const programSchema = new Schema({
  name: String,
  shortname: String,
  institution: String,
  courses: [CourseSchema],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dateCreated: Date
});

mongoose.model("programs", programSchema);
