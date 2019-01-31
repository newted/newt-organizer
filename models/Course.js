const mongoose = require("mongoose");
const { Schema } = mongoose;
const AnnouncementSchema = require("./Announcement");
const AssignmentSchema = require("./Assignment");
const QuizSchema = require("./Quiz");

const courseSchema = new Schema({
  name: String,
  shortname: String,
  programId: {
    type: Schema.Types.ObjectId,
    ref: 'Program'
  },
  announcements: [AnnouncementSchema],
  assignments: [AssignmentSchema],
  quizzes: [QuizSchema],
  dateCreated: Date
});

mongoose.model("courses", courseSchema);
