const mongoose = require("mongoose");
const _ = require("lodash");
const requireLogin = require("../middleware/requireLogin");

const Quiz = mongoose.model("quizzes");
const PersonalQuiz = mongoose.model("personal-quizzes");

module.exports = app => {
  // POST request to create a personal quiz based on a particular item of
  // content
  app.post("/api/quiz/create", requireLogin, async (req, res) => {
    try {
      const userId = req.user.uid;
      const { contentId, assignmentId, iteration } = req.body;

      // Find the quiz for the particular content item
      const quiz = await Quiz.findOne({ contentId });

      // If the quiz exists, create a personal quiz for the user
      if (quiz) {
        const setupResults = _.map(quiz.questions, question => {
          return {
            questionId: question._id,
            question: question.question,
            options: question.options,
            topics: question.topics,
            correctAnswer: question.correctAnswer
          };
        });

        const personalQuiz = new PersonalQuiz({
          _user: userId,
          quizId: quiz._id,
          dateCreated: Date.now(),
          results: setupResults,
          contentId,
          assignmentId,
          iteration
        });

        await personalQuiz.save();
        res.send(personalQuiz);
      }
    } catch (error) {
      res.send(error);
    }
  });
};
