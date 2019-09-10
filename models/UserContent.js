const mongoose = require("mongoose");
const { Schema } = mongoose;

const userContentSchema = new Schema({
  name: String,
  details: String,
  isComplete: {
    type: Boolean,
    default: false
  },
  partOfCollection: {
    type: Boolean,
    default: false
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection"
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
  // user has taken for this content
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
  // Denormalized from Content collection (name, level, and topics)
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
  // Denormalized from Source (name)
  sourceInfo: {
    name: {
      type: String,
      default: "user"
    },
    sourceId: {
      type: Schema.Types.ObjectId,
      ref: "Source"
    }
  },
  // Specific for YouTube videos (for now)
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
  },
  dateCreated: Date,
  dateDue: Date,
  lastUpdated: Date
});

mongoose.model("user-contents", userContentSchema);