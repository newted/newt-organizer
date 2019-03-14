const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  displayName: String,
  name: {
    familyName: String,
    givenName: String
  },
  email: String,
  dateCreated: Date
});

mongoose.model("users", userSchema);
