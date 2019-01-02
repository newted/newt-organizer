const mongoose = require("mongoose");
const { Schema } = mongoose;
const courseSchema = require("./Course");

const programSchema = new Schema({
  name: String,
  shortname: String,
  provider: String,
  courses: [CourseSchema]
});

mongoose.model("programs", programSchema);
