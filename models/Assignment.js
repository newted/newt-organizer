const mongoose = require("mongoose");
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  name: String,
  details: String,
  inProgress: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  hasKnowledgeTracking: {
    type: Boolean,
    default: false
  },
  hasQuiz: {
    type: Boolean,
    default: false
  },
  // List of quiz id and dates created and completed for each quiz that the
  // user has taken for this assignment/content
  quizInfo: [
    {
      dateCreated: Date,
      dateCompleted: Date,
      quizId: {
        type: Schema.Types.ObjectId,
        ref: "PersonalQuiz"
      }
    }
  ],
  // Denormalized from Content collection (name and level)
  contentInfo: {
    name: String,
    level: Number,
    primaryTopics: [
      {
        name: String,
        category: String,
        topicId: Schema.Types.ObjectId
      }
    ],
    secondaryTopics: [
      {
        name: String,
        category: String,
        topicId: Schema.Types.ObjectId
      }
    ],
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "Content"
    }
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
  dateCreated: Date,
  dateDue: Date,
  source: {
    type: String,
    enum: ["manual", "youtube"],
    default: "manual"
  },
  videoInfo: {
    videoId: String,
    channelId: String,
    datePublished: Date,
    thumbnails: {
      maxres: {
        url: String,
        width: Number,
        height: Number
      }
    }
  }
});

module.exports = assignmentSchema;
