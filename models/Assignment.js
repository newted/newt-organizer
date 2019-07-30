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
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Source"
  },
  knowledgeModuleId: {
    type: Schema.Types.ObjectId,
    ref: "KnowledgeSubject.modules"
  },
  knowledgeSubjectId: {
    type: Schema.Types.ObjectId,
    ref: "KnowledgeSubject"
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
