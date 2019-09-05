const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const User = mongoose.model("users");

module.exports = app => {
  // Fetch user given user ID
  app.get("/api/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.send(error);
    }
  });

  // Create user if does not exist, otherwise send existing user info
  app.post("/api/create_user", async (req, res) => {
    const { _id, displayName, email } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ _id });

    // If it does exist, send user to client
    if (existingUser) {
      res.send(existingUser);
    } else {
      const firstName = displayName.split(" ")[0];
      const lastName = displayName.split(" ")[1];

      // No existing user, create a new user
      await new User({
        _id,
        displayName,
        firstName,
        lastName,
        email,
        dateCreated: Date.now(),
        lastUpdated: Date.now()
      }).save();

      const newUser = await User.findOne({ _id });
      res.send(newUser);
    }
  });

  // Update user's personal information information
  app.put("/api/user/:userId/edit", requireLogin, (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;

    const displayName = `${firstName} ${lastName}`;

    User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        displayName,
        lastUpdated: Date.now()
      },
      {
        new: true
      },
      (error, user) => {
        if (error) {
          res.send(error);
        } else {
          res.send(user);
        }
      }
    );
  });
};
