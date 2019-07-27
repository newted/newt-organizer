const mongoose = require("mongoose");
const axios = require("axios");
const requireLogin = require("../middleware/requireLogin");
const keys = require("../config/keys");

// Source model
const Source = mongoose.model("sources");

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

        await Source.findOne(
          { "availableContent.mediaId": videoId },
          (error, source) => {
            if (error) {
              res.send(error);
            }

            if (source) {
              videoInfo["hasKnowledgeTracking"] = true;
            }
          }
        );
      }

      res.send(videoInfo);
    } catch (error) {
      res.send(error);
    }
  });
};
