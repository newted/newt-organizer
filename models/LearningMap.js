const mongoose = require("mongoose");
const { Schema } = mongoose;

const learningMapSchema = new Schema({
  _user: {
    type: String,
    ref: "User"
  },
  knowledgeMap: {
    type: Schema.Types.ObjectId,
    ref: "PersonalKnowledgeMap"
  },
  dateCreated: Date,
  lastUpdated: Date
});

mongoose.model("learningMaps", learningMapSchema);
