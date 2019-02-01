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

  // PUT request to edit assignment information
  app.put(
    "/api/courses/:courseId/assignments/:assignmentId/edit",
    requireLogin,
    (req, res) => {
      const { courseId, assignmentId } = req.params;
      console.log(courseId, assignmentId);

      const { name, details, dateDue } = req.body;

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
    "/api/programs/:programId/courses/:courseId/assignments/:assignmentId/complete",
    requireLogin,
    (req, res) => {
      const { programId, courseId, assignmentId } = req.params;

      mongoose.connection.db.command({
        update: Program.collection.name,
        updates: [
          {
            q: {
              _id: mongoose.Types.ObjectId(programId),
              courses: {
                $elemMatch: {
                  _id: mongoose.Types.ObjectId(courseId),
                  "assignments._id": mongoose.Types.ObjectId(assignmentId)
                }
              }
            },
            u: {
              $set: {
                "courses.$[outer].assignments.$[inner].completed": true,
                "courses.$[outer].assignments.$[inner].inProgress": false
              }
            },
            arrayFilters: [
              { "outer._id": mongoose.Types.ObjectId(courseId) },
              { "inner._id": mongoose.Types.ObjectId(assignmentId) }
            ]
          }
        ]
      });
    }
  );

  // PUT request to mark an assignment as in progress
  app.put(
    "/api/programs/:programId/courses/:courseId/assignments/:assignmentId/progress",
    requireLogin,
    (req, res) => {
      const { programId, courseId, assignmentId } = req.params;

      mongoose.connection.db.command({
        update: Program.collection.name,
        updates: [
          {
            q: {
              _id: mongoose.Types.ObjectId(programId),
              courses: {
                $elemMatch: {
                  _id: mongoose.Types.ObjectId(courseId),
                  "assignments._id": mongoose.Types.ObjectId(assignmentId)
                }
              }
            },
            u: {
              $set: {
                "courses.$[outer].assignments.$[inner].inProgress": true,
                "courses.$[outer].assignments.$[inner].completed": false
              }
            },
            arrayFilters: [
              { "outer._id": mongoose.Types.ObjectId(courseId) },
              { "inner._id": mongoose.Types.ObjectId(assignmentId) }
            ]
          }
        ]
      });
    }
  );

  // DELETE request to delete an assignment
  app.delete(
    "/api/programs/:programId/courses/:courseId/assignments/:assignmentId",
    requireLogin,
    (req, res) => {
      const { programId, courseId, assignmentId } = req.params;

      Program.findOneAndUpdate(
        {
          _id: programId,
          "courses._id": courseId
        },
        {
          $pull: {
            "courses.$.assignments": {
              _id: assignmentId
            }
          }
        },
        (error, program) => {
          if (error) {
            res.send(error);
          } else {
            res.send(program);
          }
        }
      );
    }
  );
};
