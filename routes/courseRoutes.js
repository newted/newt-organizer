const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Program = mongoose.model("programs");

module.exports = app => {
  // GET request to receive a list of courses for given program
  app.get("/api/programs/:id", requireLogin, async (req, res) => {
    const id = req.params.id;

    // Database query to get courses
    const courses = await Program.find({
      _id: id
    }).select({
      courses: true
    });

    // Send back courses
    res.status(200).send(courses);
  });

  // POST request to create a course
  app.post("/api/programs/:id/course", requireLogin, async (req, res) => {
    const id = req.params.id;

    // Get information from request body
    const { name, shortname } = req.body;

    const course = {
      name,
      shortname,
      dateCreated: Date.now()
    };

    Program.findByIdAndUpdate(
      id,
      {
        $push: {
          courses: course
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
  });

  // PUT request to edit information about a course in a program
  app.put(
    "/api/programs/:programId/courses/:courseId/edit",
    requireLogin,
    async (req, res) => {
      const { programId, courseId } = req.params;

      const { name, shortname } = req.body;

      Program.findOneAndUpdate(
        {
          _id: programId,
          "courses._id": courseId
        },
        {
          $set: {
            "courses.$.name": name,
            "courses.$.shortname": shortname
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
