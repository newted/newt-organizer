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
    }

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
