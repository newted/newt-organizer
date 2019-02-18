const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {
  // Create user if does not exist, otherwise send existing user info
  app.post("/api/create_user", async (req, res) => {
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
      const user = await new User({
        _id,
        displayName,
        email,
        name: {
          familyName,
          givenName
        }
      }).save();

      res.send(user);
    }
  });
};
