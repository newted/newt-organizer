const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const UserContent = mongoose.model("user-contents");

module.exports = app => {
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
