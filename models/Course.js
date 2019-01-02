const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: String,
  shortname: String
});

mongoose.model("courses", courseSchema);
