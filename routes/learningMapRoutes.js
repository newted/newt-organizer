const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const LearningMap = mongoose.model("learningMaps");

module.exports = app => {
  // POST request to create an initial learning map if one doesn't already
  // exist for the user
  app.post("/api/learning-map/create", requireLogin, async (req, res) => {
    try {
      const userId = req.user.uid;

      // Check if learning map exists for the user
      const existingLearningMap = await LearningMap.findOne({
        _user: userId
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

        learningMap.save((error, doc) => {
          if (error) {
            res.send(error);
          } else {
            console.log(doc);
            res.send(doc);
          }
        });
      }
    } catch (error) {
      res.send(error);
    }
  });
};
