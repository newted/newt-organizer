const mongoose = require("mongoose");

const LearningMap = mongoose.model("learningMaps");

module.exports = app => {
  // POST request to create an initial learning map if one doesn't already
  // exist for the user
  app.post("/api/learning-map/create", async (req, res) => {
    try {
      // Get userId from request
      const { userId } = req.body;

      // Check if learning map exists for the user
      const existingLearningMap = await LearningMap.findOne({ _user: userId });

      // If it does exist, send existing one to client
      if (existingLearningMap) {
        res.send(existingLearningMap);
      } else {
        // Create Learning Map
        const learningMap = new LearningMap({
          _user: userId,
          dateCreated: Date.now(),
          lastUpdated: Date.now()
        });

        await learningMap.save();
        res.send(learningMap);
      }
    } catch (error) {
      res.send(error);
    }
  });
};
