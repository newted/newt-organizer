const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSeriesSchema = new Schema({
  name: String,
  subjects: [String],
  type: [String],
  url: String,
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: "Content"
    }
  ],
  dateAdded: Date,
  lastUpdated: Date
});
