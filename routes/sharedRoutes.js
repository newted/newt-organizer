const axios = require("axios");
const requireLogin = require("../middleware/requireLogin");
const keys = require("../config/keys");

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
      const { data } = await axios.get(baseUrl, { params });
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  });
};
