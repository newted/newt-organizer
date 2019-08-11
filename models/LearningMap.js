const mongoose = require("mongoose");
const { Schema } = mongoose;

const learningMapSchema = new Schema({
  _user: {
    type: String,
    ref: "User"
  },
  // Each personal knowledge map is a different knowledge module
  knowledgeMap: [
    {
      type: Schema.Types.ObjectId,
      ref: "PersonalKnowledgeMap"
    }
  ],
  dateCreated: Date,
  lastUpdated: Date
});

mongoose.model("learning-maps", learningMapSchema);
