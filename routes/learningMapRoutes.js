const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const LearningMap = mongoose.model("learningMaps");

module.exports = app => {
  // POST request to create an initial learning map if one doesn't already
  // exist for the user
  app.post("/api/learning-map/create", requireLogin, async (req, res) => {
    try {
      // Check if learning map exists for the user
      const existingLearningMap = await LearningMap.findOne({
        _user: req.user.uid
      });

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
