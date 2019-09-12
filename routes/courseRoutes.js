const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Course = mongoose.model("courses");

module.exports = app => {
  // GET request to fetch user's courses
  app.get("/api/courses", requireLogin, (req, res) => {
    const user = req.user.uid;

    Course.find({ _user: user }, (error, courses) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(courses);
      }
    });
  });

  // POST request to create a course
  app.post("/api/courses/create", requireLogin, async (req, res) => {
    try {
      const { name } = req.body;
      const user = req.user.uid;

      // Create Course
      const course = new Course({
        name,
        _user: user,
        dateCreated: Date.now(),
        lastUpdated: Date.now()
      });

      // Save course to db
      await course.save();
      // Send course to client
      res.send(course);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // PUT request to update course
  app.put("/api/courses/:courseId/update", requireLogin, (req, res) => {
    const { courseId } = req.params;
    const data = req.body;
    // Set lastUpdated field to now
    data.lastUpdated = Date.now();

    // Find Course by id and update
    Course.findByIdAndUpdate(courseId, data, { new: true }, (error, course) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(course);
      }
    });
  });

  // PUT request to add content ids to course
  app.put("/api/courses/:courseId/add-content", requireLogin, (req, res) => {
    const { courseId } = req.params;
    const { userContentId } = req.body;

    // Find Course by id and add content
    Course.findByIdAndUpdate(
      courseId,
      {
        $push: { individualContent: userContentId }
      },
      { new: true },
      (error, course) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(course);
        }
      }
    );
  });

  // DELETE request to delete a course
  app.delete("/api/courses/:courseId", requireLogin, (req, res) => {
    const { courseId } = req.params;

    Course.findByIdAndDelete(courseId, error => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.sendStatus(200);
      }
    });
  });
};
