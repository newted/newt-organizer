const mongoose = require("mongoose");
const { Schema } = mongoose;

const learningTopicSchema = new Schema({
  name: String,
  contentHistoryIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "LearningMap.knowledgeMap.contentHistory"
    }
  ],
  confidenceRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

const contentHistorySchema = new Schema({
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Content"
  },
  dateCompleted: Date,
  lastUpdated: Date
});

const personalKnowledgeMapSchema = new Schema({
  knowledgeSubjectId: {
    type: Schema.Types.ObjectId,
    ref: "KnowledgeSubject"
  },
  knowledgeModuleId: {
    type: Schema.Types.ObjectId,
    ref: "KnowledgeSubject.modules"
  },
  contentHistory: [contentHistorySchema],
  primaryTopics: [learningTopicSchema],
  secondaryTopics: [learningTopicSchema]
});

const learningMapSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  knowledgeMap: [personalKnowledgeMapSchema],
  dateAdded: Date,
  lastUpdated: Date
});

mongoose.model("learningMaps", learningMapSchema);
