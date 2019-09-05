const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  dateCreated: Date,
  lastUpdated: Date
});

mongoose.model("users", userSchema);
