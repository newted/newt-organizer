const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

// One of the shared models
const Content = mongoose.model("content");

module.exports = app => {
  // GET request to get a specific content item by id
  app.get("/api/content/item/:itemId", requireLogin, (req, res) => {
    const { itemId } = req.params;

    Content.findById(itemId, (error, content) => {
      if (error) {
        res.send(error);
      } else {
        res.send(content);
      }
    });
  });
};
