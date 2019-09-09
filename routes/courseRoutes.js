const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Course = mongoose.model("courses");

module.exports = app => {
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
};
