const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const UserContent = mongoose.model("user-contents");
const Course = mongoose.model("courses");

module.exports = app => {
  // GET request to get user content for a course
  app.get(
    "/api/user-content/course/:courseId",
    requireLogin,
    async (req, res) => {
      const { courseId } = req.params;

      // Get individualContent field (and _id) from Course
      const { individualContent } = await Course.findById(courseId, {
        individualContent: 1
      });

      // Get user content data based on individualContent ids array
      UserContent.find(
        { _id: { $in: individualContent } },
        (error, userContentList) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.send(userContentList);
          }
        }
      );
    }
  );

  // GET request to get individual user content
  app.get("/api/user-content/:contentId", requireLogin, (req, res) => {
    const { contentId } = req.params;

    UserContent.findById(contentId, (error, userContent) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(userContent);
      }
    });
  });

  // POST request to create content
  app.post("/api/user-content/create", requireLogin, async (req, res) => {
    try {
      const { name, description, dateDue, courseId } = req.body;

      const userContent = new UserContent({
        name,
        description,
        dateDue,
        courseId,
        dateCreated: Date.now(),
        lastUpdated: Date.now()
      });

      // Save to db
      await userContent.save();
      res.send(userContent);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
