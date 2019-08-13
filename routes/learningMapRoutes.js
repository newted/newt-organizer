const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const LearningMap = mongoose.model("learning-maps");
const PersonalKnowledgeMap = mongoose.model("personal-knowledge-maps");

module.exports = app => {
  // GET request to fetch a learning map from a user's id
  app.get("/api/learning-map", requireLogin, (req, res) => {
    const userId = req.user.uid;

    LearningMap.findOne({ _user: userId }, (error, learningMap) => {
      if (error) {
        res.send(error);
      } else {
        res.send(learningMap);
      }
    });
  });

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
            res.send(doc);
          }
        });
      }
    } catch (error) {
      res.send(error);
    }
  });

  // PUT request to update user's learning map (and personal knowledge map)
  // after completing some content
  app.put(
    "/api/learning-map/:learningMapId/update",
    requireLogin,
    async (req, res) => {
      const { learningMapId } = req.params;
      const {
        knowledgeSubject,
        knowledgeModule,
        contentHistory,
        topics
      } = req.body;

      try {
        // Find user's learning map through id
        const learningMap = await LearningMap.findById(learningMapId);

        // If Learning map exists, make updates
        if (learningMap) {
          // await learningMap.save();

          // Find personal knowledge map based on learningMapId and knowledgeModuleId
          const personalKnowledgeMap = await PersonalKnowledgeMap.findOne({
            learningMapId,
            "knowledgeModule.knowledgeModuleId":
              knowledgeModule.knowledgeModuleId
          });

          if (!personalKnowledgeMap) {
            console.log("Gotta create a personal map");
            const personalKMap = new PersonalKnowledgeMap({
              learningMapId,
              knowledgeSubject,
              knowledgeModule,
              contentHistory,
              topics
            });

            // Add knowledgeMap id to Learning Map
            learningMap.knowledgeMap.push(personalKMap._id);
            // Update lastUpdated field to now
            learningMap.lastUpdated = Date.now();

            // Save changes to learning map and knowledge map on database
            await learningMap.save();
            await personalKMap.save();
            res.send({ learningMap, personalKnowledgeMap: personalKMap });
          } else {
            // TODO: Update existing knowledge map
            console.log(personalKnowledgeMap);
            res.send({ learningMap, personalKnowledgeMap });
          }
        }
      } catch (error) {
        res.send(error);
      }
    }
  );
};
