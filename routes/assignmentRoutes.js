const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Program = mongoose.model("programs");

module.exports = app => {
  // POST request to create an assignment
  app.post(
    "/api/programs/:programId/courses/:courseId/assignments/add",
    requireLogin,
    (req, res) => {
      const { programId, courseId } = req.params;

      const { name, details, dateDue } = req.body;

      const assignment = {
        name,
        details,
        dateDue,
        dateCreated: Date.now()
      };

      Program.findOneAndUpdate(
        {
          _id: programId,
          "courses._id": courseId
        },
        {
          $push: {
            "courses.$.assignments": assignment
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

  // PUT request to edit assignment information
  app.put(
    "/api/programs/:programId/courses/:courseId/assignments/:assignmentId/edit",
    requireLogin,
    (req, res) => {
      const { programId, courseId, assignmentId } = req.params;

      const { name, details, dateDue } = req.body;

      // Mongoose does not support array filters out of the box, so need to run
      // a custom query.
      // API: https://docs.mongodb.com/manual/reference/operator/update/positional-filtered/#position-nested-arrays-filtered
      // See: https://stackoverflow.com/questions/49597359/mongoose-find-and-update-in-nested-array
      // and: https://stackoverflow.com/questions/48215167/node-js-mongoose-update-with-arrayfilters?rq=1
      // Probably need to get rid of these multiple nested arrays because this
      // is getting complicated
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
                "courses.$[outer].assignments.$[inner].name": name,
                "courses.$[outer].assignments.$[inner].details": details,
                "courses.$[outer].assignments.$[inner].dateDue": dateDue
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
                "courses.$[outer].assignments.$[inner].completed": true
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
