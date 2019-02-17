const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  googleId: String,
  displayName: String,
  name: {
    familyName: String,
    givenName: String
  },
  email: String
});

mongoose.model("users", userSchema);
