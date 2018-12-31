const passport = require("passport");

module.exports = app => {
  // Google auth route
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Google auth callback route
  app.get("/auth/google/callback", passport.authenticate("google"));

  // Get current authenticated user
  app.get("/api/current_user", (req, res) => res.send(req.user));
};
