const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Course = mongoose.model("courses");

module.exports = app => {
  // GET request to fetch user's courses
  app.get("/api/courses", requireLogin, (req, res) => {
    const user = req.user.uid;

    Course.find({ _user: user }, (error, courses) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(courses);
      }
    });
  });

  // POST request to create a course
  app.post("/api/courses/create", requireLogin, async (req, res) => {
    try {
      const { name, shortname } = req.body;
      const user = req.user.uid;

      // Create Course
      const course = new Course({
        name,
        shortname,
        _user: user,
        dateCreated: Date.now(),
        lastUpdated: Date.now()
      });

      // Save course to db
      await course.save();
      // Send course to client
      res.send(course);
    } catch (error) {
      res.send(error);
    }
  });

  // PUT request to update course
  app.put("/api/courses/:courseId/update", requireLogin, (req, res) => {
    try {
      const { courseId } = req.params;
      const data = req.body;

      // Find Course by id and update
      Course.findByIdAndUpdate(
        courseId,
        data,
        { new: true },
        (error, course) => {
          if (error) {
            res.send(error);
          } else {
            res.send(course);
          }
        }
      );
    } catch (error) {
      res.send(error);
    }
  });
};
