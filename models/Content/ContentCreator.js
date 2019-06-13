const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentCreatorSchema = new Schema({
  name: String,
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: "ContentSeries"
    }
  ],
  source: {
    name: String,
    url: String
  },
  dateAdded: Date,
  lastUpdated: Date
});
