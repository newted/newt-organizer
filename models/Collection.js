const mongoose = require("mongoose");
const { Schema } = mongoose;

const collectionSchema = new Schema({
  name: String,
  description: String,
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  userContentIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserContent"
    }
  ],
  // Array of knowledge subjects
  knowledgeSubject: [
    {
      name: String,
      knowledgeSubjectId: {
        type: Schema.Types.ObjectId,
        ref: "KnowledgeSubject"
      }
    }
  ],
  // Array of knowledge modules
  knowledgeModule: [
    {
      name: String,
      knowledgeModuleId: {
        type: Schema.Types.ObjectId,
        ref: "KnowledgeModule"
      }
    }
  ],
  // Info for ContentSeries
  seriesInfo: {
    name: String,
    seriesId: {
      type: Schema.Types.ObjectId,
      ref: "ContentSeries"
    }
  },
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
  dateCreated: Date,
  dateDue: Date,
  lastUpdated: Date
});

mongoose.model("collections", collectionSchema);
