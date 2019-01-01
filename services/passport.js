const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// Serializing user session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing user session
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      /* If there isn't an existing user with the Google ID, create a new user */
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User with given Google ID already exists
        return done(null, existingUser);
      }

      // No existing user, create a new user
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
