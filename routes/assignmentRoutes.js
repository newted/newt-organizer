const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Course = mongoose.model("courses");

module.exports = app => {
  // POST request to create an assignment
  app.post("/api/courses/:courseId/assignment", requireLogin, (req, res) => {
    const { courseId } = req.params;
    const { name, details, dateDue } = req.body;
    const assignment = {
      name,
      details,
      dateDue,
      dateCreated: Date.now()
    };

    Course.findOneAndUpdate(
      {
        _id: courseId
      },
      {
        $push: {
          assignments: assignment
        }
      },
      {
        new: true
      },
      (error, course) => {
        if (error) {
          res.send(error);
        } else {
          res.send(course);
        }
      }
    );
  });

  // POST request to create a Youtube assignment (should merge with general
  // createAssignment route later).
  app.post(
    "/api/courses/:courseId/youtubeAssignment",
    requireLogin,
    (req, res) => {
      const { courseId } = req.params;

      const {
        values: { name, details, dateDue },
        otherInfo: {
          hasKnowledgeTracking,
          hasQuiz,
          videoInfo,
          contentInfo,
          knowledgeSubject,
          knowledgeModule
        }
      } = req.body;

      const assignment = {
        name,
        details,
        hasKnowledgeTracking,
        hasQuiz,
        contentInfo,
        knowledgeSubject,
        knowledgeModule,
        videoInfo,
        dateDue,
        dateCreated: Date.now(),
        source: "youtube"
      };

      Course.findOneAndUpdate(
        {
          _id: courseId
        },
        {
          $push: {
            assignments: assignment
          }
        },
        {
          new: true
        },
        (error, course) => {
          if (error) {
            res.send(error);
          } else {
            res.send(course);
          }
        }
      );
    }
  );

  // PUT request to edit assignment information
  app.put(
    "/api/courses/:courseId/assignments/:assignmentId/edit",
    requireLogin,
    (req, res) => {
      const { courseId, assignmentId } = req.params;
      const { name, details, dateDue, quizId } = req.body;

      Course.findOneAndUpdate(
        {
          _id: courseId,
          "assignments._id": assignmentId
        },
        {
          $set: {
            "assignments.$.name": name,
            "assignments.$.details": details,
            "assignments.$.dateDue": dateDue
          }
        },
        {
          new: true
        },
        (error, course) => {
          if (error) {
            res.send(error);
          } else {
            res.send(course);
          }
        }
      );
    }
  );

  // PUT request to mark an assignment as complete
  app.put(
    "/api/courses/:courseId/assignments/:assignmentId/complete",
    requireLogin,
    (req, res) => {
      const { courseId, assignmentId } = req.params;

      Course.findOneAndUpdate(
        {
          _id: courseId,
          "assignments._id": assignmentId
        },
        {
          $set: {
            "assignments.$.inProgress": false,
            "assignments.$.completed": true
          }
        },
        {
          new: true
        },
        (error, course) => {
          if (error) {
            res.send(error);
          } else {
            res.send(course);
          }
        }
      );
    }
  );

  // PUT request to mark an assignment as in progress
  app.put(
    "/api/courses/:courseId/assignments/:assignmentId/progress",
    requireLogin,
    (req, res) => {
      const { courseId, assignmentId } = req.params;

      Course.findOneAndUpdate(
        {
          _id: courseId,
          "assignments._id": assignmentId
        },
        {
          $set: {
            "assignments.$.completed": false,
            "assignments.$.inProgress": true
          }
        },
        {
          new: true
        },
        (error, course) => {
          if (error) {
            res.send(error);
          } else {
            res.send(course);
          }
        }
      );
    }
  );

  // PUT request to mark an assignment as incomplete
  app.put(
    "/api/courses/:courseId/assignments/:assignmentId/incomplete",
    requireLogin,
    (req, res) => {
      const { courseId, assignmentId } = req.params;

      Course.findOneAndUpdate(
        {
          _id: courseId,
          "assignments._id": assignmentId
        },
        {
          $set: {
            "assignments.$.completed": false,
            "assignments.$.inProgress": false
          }
        },
        {
          new: true
        },
        (error, course) => {
          if (error) {
            res.send(error);
          } else {
            res.send(course);
          }
        }
      );
    }
  );

  // PUT request to add quiz id to assignment quizzes
  app.put(
    "/api/courses/:courseId/assignments/:assignmentId/add-quiz",
    requireLogin,
    (req, res) => {
      const { courseId, assignmentId } = req.params;
      const { quizId } = req.body;

      Course.findOneAndUpdate(
        {
          _id: courseId,
          "assignments._id": assignmentId
        },
        {
          $push: {
            "assignments.$.quizInfo": {
              quizId,
              dateCreated: Date.now()
            }
          }
        },
        {
          new: true
        },
        (error, course) => {
          if (error) {
            res.send(error);
          } else {
            res.send(course);
          }
        }
      );
    }
  );

  // DELETE request to delete an assignment
  app.delete(
    "/api/courses/:courseId/assignments/:assignmentId",
    requireLogin,
    (req, res) => {
      const { courseId, assignmentId } = req.params;

      Course.findOneAndUpdate(
        {
          _id: courseId,
          "assignments._id": assignmentId
        },
        {
          $pull: {
            assignments: {
              _id: assignmentId
            }
          }
        },
        {
          new: true
        },
        (error, course) => {
          if (error) {
            res.send(error);
          } else {
            res.send(course);
          }
        }
      );
    }
  );
};
