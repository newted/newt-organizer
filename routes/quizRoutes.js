const mongoose = require("mongoose");
const _ = require("lodash");
const requireLogin = require("../middleware/requireLogin");

const Quiz = mongoose.model("quizzes");
const PersonalQuiz = mongoose.model("personal-quizzes");

module.exports = app => {
  // GET request to fetch personal quiz by id
  app.get("/api/quiz/:quizId", requireLogin, (req, res) => {
    const { quizId } = req.params;

    PersonalQuiz.findById(quizId, (error, quiz) => {
      if (error) {
        res.send(error);
      } else {
        res.send(quiz);
      }
    });
  });

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

  // PUT request to update the quiz
  app.put("/api/quiz/:quizId/update", requireLogin, (req, res) => {
    try {
      const { quizId } = req.params;
      const { quiz } = req.body;

      PersonalQuiz.findByIdAndUpdate(
        quizId,
        quiz,
        { new: true },
        (error, quiz) => {
          if (error) {
            res.send(error);
          } else {
            res.send(quiz);
          }
        }
      );
    } catch (error) {
      res.send(error);
    }
  });
};
