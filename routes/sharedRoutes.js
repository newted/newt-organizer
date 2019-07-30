const mongoose = require("mongoose");
const axios = require("axios");
const requireLogin = require("../middleware/requireLogin");
const keys = require("../config/keys");

// Source model
const Source = mongoose.model("sources");
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
      // Make request through YouTube API
      const { data } = await axios.get(baseUrl, { params });
      // Initialize object for video data
      let videoInfo = {
        videoData: {},
        hasKnowledgeTracking: false
      };

      // If there's a video with that id, add the item to the videoInfo object,
      // and use the videoId to find the corresponding Source information. If
      // there's a hit, then that particular video has knowledge tracking.
      if (data.items[0]) {
        videoInfo["videoData"] = data.items[0];

        Source.findOne(
          // Find by the id of the youtube video
          { "availableContent.mediaId": videoId },
          // Projection to only return the specific source availableContent,
          // if found
          { "availableContent.$": 1 }
        )
          // Set knowledge tracking to true and add the content id
          .then(source => {
            const { contentId } = source.availableContent[0];
            videoInfo["hasKnowledgeTracking"] = true;
            videoInfo["contentId"] = contentId;
            return contentId;
          })
          // Fetch content information using contentId
          .then(contentId => Content.findById(contentId))
          // Add knowledgeModuleId to videoInfo
          .then(
            content =>
              (videoInfo["knowledgeModuleId"] = content.knowledgeModuleId)
          )
          .then(() => res.send(videoInfo))
          .catch(error => {
            res.send(videoInfo);
            next();
          });
      } else {
        res.send(videoInfo);
      }
    } catch (error) {
      res.send(error);
    }
  });
};
