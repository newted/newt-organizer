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

      const { name, details, dueDate } = req.body;

      const assignment = {
        name,
        details,
        dueDate,
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
};
