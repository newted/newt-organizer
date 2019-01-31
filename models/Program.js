const mongoose = require("mongoose");
const { Schema } = mongoose;

const programSchema = new Schema({
  name: String,
  shortname: String,
  institution: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dateCreated: Date
});

mongoose.model("programs", programSchema);
