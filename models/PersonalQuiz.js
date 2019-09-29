const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz.questions"
  },
  // Denormalize question, options and topics
  question: String,
  options: [
    {
      option: String,
      explanation: String
    }
  ],
  topics: [
    {
      type: Schema.Types.ObjectId,
      ref: "Topic"
    }
  ],
  optionChosen: String,
  correctAnswer: String,
  isChoiceCorrect: Boolean,
  didNotKnow: Boolean
});

const personalQuizSchema = new Schema({
  _user: {
    type: String,
    ref: "User"
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz"
  },
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Content"
  },
  userContentId: {
    type: Schema.Types.ObjectId,
    ref: "UserContent"
  },
  // Used to indicate the number of times the same quiz was taken (aka which
  // iteration the user is on).
  iteration: {
    type: Number,
    default: 1
  },
  dateCreated: Date,
  dateCompleted: Date,
  results: [resultSchema]
});

mongoose.model("personal-quizzes", personalQuizSchema);
