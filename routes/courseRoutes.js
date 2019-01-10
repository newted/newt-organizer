const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Program = mongoose.model("programs");
const Course = mongoose.model("courses");

module.exports = app => {
  // POST request to create a course
  app.post("/api/programs/:id/course", requireLogin, async (req, res) => {
    const id = req.params.id;

    // Get information from request body
    const { name, shortname } = req.body;

    const course = new Course({
      name,
      shortname,
      dateCreated: Date.now()
    });

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
};
