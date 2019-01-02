const mongoose = require("mongoose");
const { Schema } = mongoose;

const programSchema = new Schema({
  name: String,
  shortname: String,
  provider: String,
  courses: [String]
});

mongoose.model("programs", programSchema);
