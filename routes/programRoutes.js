const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Program = mongoose.model("programs");

module.exports = app => {
  app.post("/api/programs", async (req, res) => {
    // Get information from request body
    const { name, shortname, institution } = req.body;

    // Create Program
    const program = new Program({
      name,
      shortname,
      institution,
      _user: req.user.id,
      dateCreated: Date.now()
    });

    try {
      // Add program to database
      await survey.save();

      // Send updated user information
      res.status(201);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
