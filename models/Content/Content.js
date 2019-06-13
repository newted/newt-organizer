const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
  name: String,
  sourceInfo: {
    name: String,
    type: String,
    id: String
  },
  url: String,
  knowledgeMapClass: String,
  knowledgeMapSubclass: String,
  level: Number,
  mainTopics: [String],
  additionalTopics: [String],
  dateAdded: Date,
  lastUpdated: Date
});
