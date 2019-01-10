const mongoose = require("mongoose");
const { Schema } = mongoose;

const announcementSchema = new Schema({
  name: String,
  dateCreated: Date
});

mongoose.model("announcements", announcementSchema);
