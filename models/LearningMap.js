const mongoose = require("mongoose");
const { Schema } = mongoose;

const learningMapInfoSchema = new Schema({
  level: Number,
  contentConsumed: [{
    type: Schema.Types.ObjectId,
    ref: "Content"
  }]
})

const learningMapSubclassSchema = new Schema({
  knowledgeMapSubclass: {
    type: Map,
    of: {
      ref: learningMapInfoSchema
    }
  }
});

const learningMapSchema = new Schema({
  contentHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Content"
    }
  ],
  knowledgeMap: {
    type: Map,
    of: {
      ref: learningMapSubclassSchema
    }
  },
  _user: {
    type: String,
    ref: "User"
  },
  dateCreated: Date,
  lastUpdated: Date
});

mongoose.model("learningMaps", learningMapSchema);
