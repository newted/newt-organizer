const mongoose = require("mongoose");
const _ = require("lodash");
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

  app.post("/api/learning-map/knowledge-map", requireLogin, (req, res) => {
    // Array of knowledge map ids in request body (which are in Learning map's
    // knowledgeMap field)
    const { knowledgeMapIds } = req.body;

    // Get all knowledge maps that are in the array of ids and send them
    PersonalKnowledgeMap.find(
      {
        _id: {
          $in: knowledgeMapIds
        }
      },
      (error, knowledgeMaps) => {
        if (error) {
          res.send(error);
        } else {
          res.send(knowledgeMaps);
        }
      }
    );
  });

  // PUT request to update user's learning map and personal knowledge map
  // after completing some content
  app.put(
    "/api/learning-map/:learningMapId/update",
    requireLogin,
    async (req, res) => {
      const { learningMapId } = req.params;
      let {
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
          // Find personal knowledge map based on learningMapId and knowledgeModuleId
          const personalKnowledgeMap = await PersonalKnowledgeMap.findOne({
            learningMapId,
            "knowledgeModule.knowledgeModuleId":
              knowledgeModule.knowledgeModuleId
          });

          if (!personalKnowledgeMap) {
            // Add current date as the completion date for the piece of content
            contentHistory.dateCompleted = Date.now();

            // Add "learning/ fields" (add content to content history and give a
            // confidence rating) for each topic in the assignment/content
            const evaluatedTopics = topics.map(topic => {
              return Object.assign(topic, {
                contentHistory: [contentHistory],
                confidenceRating: 70 // Arbitrary value for now
              });
            });

            // Create personal knowledge map
            const personalKMap = new PersonalKnowledgeMap({
              learningMapId,
              knowledgeSubject,
              knowledgeModule,
              contentHistory,
              topics: evaluatedTopics
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
            // Update lastUpdated field to now
            learningMap.lastUpdated = Date.now();

            // Check if content info from the request body is already part of the
            // personal knowledge map. If it isn't, add this content info to
            // content history array.
            const repeatContent = personalKnowledgeMap.contentHistory.filter(
              ({ contentId }) => String(contentId) === contentHistory.contentId
            );

            if (_.isEmpty(repeatContent)) {
              contentHistory.dateCompleted = Date.now();
              personalKnowledgeMap.contentHistory.push(contentHistory);
            }

            // For each topic that's in the request body, check if it's already
            // a part of the knowledge map. If it is, increase the confidence
            // rating by 10 (up till a 100 - the 10 is arbitrary). If it doesn't,
            // add the topic to the knowledge map topics array.
            topics.forEach(topic => {
              // Get index of body topic in map's topics (-1 if doesn't exist)
              topicIndex = personalKnowledgeMap.topics.findIndex(
                ({ topicId }) => String(topicId) === topic.topicId
              );

              // If the topic does exist (index >= 0), increment the confidence
              // rating
              if (topicIndex >= 0) {
                const { confidenceRating } = personalKnowledgeMap.topics[
                  topicIndex
                ];

                // Add 10 to confidence rating (up till a max of 100).
                personalKnowledgeMap.topics[
                  topicIndex
                ].confidenceRating = Math.min(100, confidenceRating + 10);
              } else {
                contentHistory.dateCompleted = Date.now();
                // Add learning info to topic
                const evaluatedTopic = Object.assign(topic, {
                  contentHistory: [contentHistory],
                  confidenceRating: 70
                });
                // Add topic to knowledge map
                personalKnowledgeMap.topics.push(evaluatedTopic);
              }
            });

            await learningMap.save();
            await personalKnowledgeMap.save();
            res.send({ learningMap, personalKnowledgeMap });
          }
        }
      } catch (error) {
        res.send(error);
      }
    }
  );
};
