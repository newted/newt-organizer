const axios = require("axios");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const keys = require("../config/keys");

const Content = mongoose.model("content");

module.exports = app => {
  // Get video information through YouTube API through the video ID.
  app.get("/api/youtube/videoInfo/:videoId", async (req, res) => {
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
      let videoInfo = {
        videoData: {},
        hasKnowledgeTracking: false
      };

      // If the Content collection has a video with that id (that is, if it has
      // skills tracking), then get the corresponding information and add it to
      // the videoInfo object
      if (data.items[0]) {
        // Add YouTube video data
        videoInfo.videoData = data.items[0];

        await Content.findOne(
          // Find by mediaId and source name
          { "source.name": "YouTube", "source.mediaId": videoId },
          // Projection to only return specific, required information
          {
            _id: 1,
            name: 1,
            level: 1,
            knowledgeSubject: 1,
            knowledgeModule: 1
          },
          (error, content) => {
            if (error) {
              res.send(error);
            }

            // If there's a result, this content has knowledge tracking. Thus
            // add the additional information to the videoInfo object
            if (content) {
              videoInfo.hasKnowledgeTracking = true;
              // Add content info
              videoInfo["contentInfo"] = {
                name: content.name,
                level: content.level,
                contentId: content._id
              };
              // Add knowledge subject info
              videoInfo["knowledgeSubject"] = {
                name: content.knowledgeSubject.name,
                knowledgeSubjectId: content.knowledgeSubject.knowledgeSubjectId
              };
              // Add knowledge module info
              videoInfo["knowledgeModule"] = {
                name: content.knowledgeModule.name,
                knowledgeModuleId: content.knowledgeModule.knowledgeModuleId
              };
              // Send data
              res.send(videoInfo);
            } else {
              res.send(videoInfo);
            }
          }
        );
      }
    } catch (error) {
      res.send(error);
    }
  });
};
