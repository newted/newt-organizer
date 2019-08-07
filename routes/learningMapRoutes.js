const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const LearningMap = mongoose.model("learningMaps");
const PersonalKnowledgeMap = mongoose.model("personal-knowledge-maps");

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
        // Create a Personal Knowledge Map
        const personalKnowledgeMap = new PersonalKnowledgeMap({});

        // Create Learning Map
        const learningMap = new LearningMap({
          _user: userId,
          knowledgeMap: personalKnowledgeMap._id,
          dateCreated: Date.now(),
          lastUpdated: Date.now()
        });

        personalKnowledgeMap.save((error, doc) => {
          if (error) {
            res.send(error);
          }
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
