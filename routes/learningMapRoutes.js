const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const LearningMap = mongoose.model("learningMaps");

module.exports = app => {
  // POST request to create a learning map
  app.post("/api/learningMap", async (req, res) => {
    // Get info from request body
    const { knowledgeMap } = req.body;

    // Create Learning Map
    const learningMap = new LearningMap({
      knowledgeMap,
      dateCreated: Date.now(),
      lastUpdated: Date.now()
    });

    try {
      // Add learning map to database
      await learningMap.save();

      res.send(learningMap);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
