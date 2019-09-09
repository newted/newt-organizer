const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: String,
  shortname: String,
  creator: {
    type: String,
    default: "user"
  },
  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Collection"
    }
  ],
  individualContent: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserContent"
    }
  ],
  _user: String,
  dateCreated: Date,
  lastUpdated: Date
});

mongoose.model("courses", courseSchema);
