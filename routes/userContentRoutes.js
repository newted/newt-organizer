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
      const data = req.body;
      data.dateCreated = Date.now();
      data.lastUpdated = Date.now();

      const userContent = new UserContent(data);

      // Save to db
      await userContent.save();
      res.send(userContent);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // PUT request to update content info
  app.put("/api/user-content/:contentId/update", requireLogin, (req, res) => {
    const { contentId } = req.params;
    const data = req.body;

    // Find UserContent by id and update
    UserContent.findByIdAndUpdate(
      contentId,
      data,
      { new: true },
      (error, userContent) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(userContent);
        }
      }
    );
  });

  // PUT request to add quiz to user content
  app.put("/api/user-content/:contentId/add-quiz", requireLogin, (req, res) => {
    const { contentId } = req.params;
    const { quizId } = req.body;

    UserContent.findByIdAndUpdate(
      contentId,
      {
        $push: {
          quizInfo: {
            quizId,
            dateCreated: Date.now()
          }
        }
      },
      { new: true },
      (error, userContent) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(userContent);
        }
      }
    );
  });

  app.delete("/api/user-content/:contentId", requireLogin, (req, res) => {
    const { contentId } = req.params;

    // Find by id and delete
    UserContent.findByIdAndDelete(contentId, error => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.sendStatus(200);
      }
    });
  });
};
