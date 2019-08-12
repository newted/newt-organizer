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

  // POST request to create a learning map
  app.post("/api/learning-map/create", requireLogin, async (req, res) => {
    const userId = req.user.uid;

    try {
      const learningMap = new LearningMap({
        _user: userId,
        dateCreated: Date.now(),
        lastUpdated: Date.now()
      });

      await learningMap.save();
      res.send(learningMap);
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

        // If Learning map exists, make updats
        if (learningMap) {
          // Update lastUpdated field to now
          learningMap.lastUpdated = Date.now();
          await learningMap.save();

          // Find personal knowledge map based on learningMapId and knowledgeModuleId
          PersonalKnowledgeMap.findOne(
            {
              learningMapId,
              "knowledgeModule.knowledgeModuleId":
                knowledgeModule.knowledgeModuleId
            },
            async (error, kMap) => {
              if (error) {
                res.send(error);
              }

              // If particular map doesn't exist, create one and send learning map
              // and knowledge map
              if (!kMap) {
                const personalKMap = new PersonalKnowledgeMap({
                  learningMapId,
                  knowledgeSubject,
                  knowledgeModule,
                  contentHistory,
                  topics
                });

                await personalKMap.save();
                res.send({ learningMap, personalKnowledgeMap: personalKMap });
              } else {
                // TODO: Update existing knowledge map
                console.log(kMap);
                res.send({ learningMap, personalKnowledgeMap: kMap });
              }
            }
          );
        }
      } catch (error) {
        res.send(error);
      }
    }
  );
};
