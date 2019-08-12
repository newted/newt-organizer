const mongoose = require("mongoose");
const { Schema } = mongoose;

// name denormalized from Content
const contentHistorySchema = new Schema(
  {
    name: String,
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "Content"
    },
    dateCompleted: Date
  },
  { _id: false }
);

// name and category denormalized from Topic
const learningTopicSchema = new Schema(
  {
    name: String,
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic"
    },
    category: String,
    // Content history specific to this particular topic
    contentHistory: [contentHistorySchema],
    confidenceRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  { _id: false }
);

const personalKnowledgeMapSchema = new Schema({
  // Reference to learning map
  learningMapId: {
    type: Schema.Types.ObjectId,
    ref: "LearningMap"
  },
  // Denormalized from KnowledgeSubject (name)
  knowledgeSubject: {
    name: String,
    knowledgeSubjectId: {
      type: Schema.Types.ObjectId,
      ref: "KnowledgeSubject"
    }
  },
  // Denormalized from KnowledgeModule (name)
  knowledgeModule: {
    name: String,
    knowledgeModuleId: {
      type: Schema.Types.ObjectId,
      ref: "KnowledgeModule"
    }
  },
  // Content history to this particular module
  contentHistory: [contentHistorySchema],
  topics: [learningTopicSchema]
});

mongoose.model("personal-knowledge-maps", personalKnowledgeMapSchema);
