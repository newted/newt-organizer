const axios = require("axios");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const keys = require("../config/keys");

const Content = mongoose.model("content");
const Quiz = mongoose.model("quizzes");

module.exports = app => {
  // Get video information through YouTube API through the video ID.
  app.get("/api/youtube/videoContentInfo/:videoId", async (req, res) => {
    const { videoId } = req.params;

    const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
    const params = {
      id: videoId,
      part: "snippet",
      key: keys.youtubeApiKey
    };

    try {
      // Make request to YouTube API
      const { data } = await axios.get(baseUrl, { params });
      // Initialize object for video/content info
      let videoContentInfo = {
        videoInfo: {},
        sourceInfo: { name: "YouTube" },
        hasKnowledgeTracking: false,
        hasQuiz: false
      };

      // If the Content collection has a video with that id (that is, if it has
      // skills tracking), then get the corresponding information and add it to
      // the videoContentInfo object
      if (data.items[0]) {
        // Extract data that's needed
        const videoData = {
          name: data.items[0].snippet.title,
          description: data.items[0].snippet.description,
          videoId: data.items[0].id,
          channelId: data.items[0].snippet.channelId,
          datePublished: data.items[0].snippet.publishedAt,
          thumbnails: data.items[0].snippet.thumbnails
        };

        // Add YouTube video data
        videoContentInfo.videoInfo = videoData;

        await Content.findOne(
          // Find by mediaId and source name
          { "source.name": "YouTube", "source.mediaId": videoId },
          async (error, content) => {
            if (error) {
              res.send(error);
            }

            // If there's a result, this content has knowledge tracking. Thus
            // add the additional information to the videoContentInfo object
            if (content) {
              // If there's a quiz Id, fetch the quiz data and add to videoContentInfo
              // object
              if (content.quizId) {
                const quiz = await Quiz.findById(content.quizId);
                videoContentInfo.hasQuiz = true;
              }
              videoContentInfo.hasKnowledgeTracking = true;
              // Add content info
              videoContentInfo["contentInfo"] = {
                name: content.name,
                level: content.level,
                primaryTopics: content.primaryTopics,
                secondaryTopics: content.secondaryTopics,
                contentId: content._id,
                contentCreator: {
                  name: content.contentCreator.name,
                  url: content.contentCreator.url,
                  contentCreatorId: content.contentCreator.contentCreatorId
                }
              };
              // Add knowledge subject info
              videoContentInfo["knowledgeSubject"] = {
                name: content.knowledgeSubject.name,
                knowledgeSubjectId: content.knowledgeSubject.knowledgeSubjectId
              };
              // Add knowledge module info
              videoContentInfo["knowledgeModule"] = {
                name: content.knowledgeModule.name,
                knowledgeModuleId: content.knowledgeModule.knowledgeModuleId
              };
              // Send data
              res.send(videoContentInfo);
            } else {
              res.send(videoContentInfo);
            }
          }
        );
      }
    } catch (error) {
      res.send(error);
    }
  });
};
