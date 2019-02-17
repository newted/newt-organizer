const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {
  // Google auth route
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Google auth callback route
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => res.redirect("/dashboard")
  );

  // Logout
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Get current authenticated user
  app.get("/api/current_user", (req, res) => res.send(req.user));

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
