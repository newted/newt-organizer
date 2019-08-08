const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentHistorySchema = new Schema(
  {
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "Content"
    },
    dateCompleted: Date
  },
  { _id: false }
);

const learningTopicSchema = new Schema({
  name: String,
  topicId: {
    type: Schema.Types.ObjectId,
    ref: "Topic"
  },
  // Content history specific to this particular topic
  contentHistory: [contentHistorySchema],
  confidenceRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

const personalKnowledgeMapSchema = new Schema({
  learningMapId: {
    type: Schema.Types.ObjectId,
    ref: "LearningMap"
  },
  knowledgeSubjectId: {
    type: Schema.Types.ObjectId,
    ref: "KnowledgeSubject"
  },
  knowledgeModuleId: {
    type: Schema.Types.ObjectId,
    ref: "KnowledgeSubject.modules"
  },
  // Content history specific to this particular knowledge module
  contentHistory: [contentHistorySchema],
  primaryTopics: [learningTopicSchema],
  secondaryTopics: [learningTopicSchema]
});

mongoose.model("personal-knowledge-maps", personalKnowledgeMapSchema);
