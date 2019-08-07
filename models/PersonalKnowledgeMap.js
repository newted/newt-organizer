const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentHistorySchema = new Schema({
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Content"
  },
  dateCompleted: Date,
  lastUpdated: Date
});

const learningTopicSchema = new Schema({
  name: String,
  topicId: {
    type: Schema.Types.ObjectId,
    ref: "Topic"
  },
  contentHistoryIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "PersonalKnowledgeMap.contentHistory"
    }
  ],
  confidenceRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
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

mongoose.model("personal-knowledge-maps", personalKnowledgeMapSchema);
