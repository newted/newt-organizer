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
  app.post("/api/user/create", requireLogin, async (req, res) => {
    const { _id, displayName, email } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ _id });

    // If it does exist, send user to client
    if (existingUser) {
      res.send(existingUser);
    } else {
      const givenName = displayName.split(" ")[0];
      const familyName = displayName.split(" ")[1];

      // No existing user, create a new user
      await new User({
        _id,
        displayName,
        email,
        name: {
          familyName,
          givenName
        },
        dateCreated: Date.now()
      }).save();

      const newUser = await User.findOne({ _id });
      res.send(newUser);
    }
  });

  // Update user's personal information information
  app.put("/api/user/:userId/edit", requireLogin, (req, res) => {
    const { userId } = req.params;

    const displayName = `${req.body.firstName} ${req.body.lastName}`;

    User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "name.givenName": req.body.firstName,
          "name.familyName": req.body.lastName,
          displayName
        }
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
