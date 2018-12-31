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
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // If there isn't an existing user with the Google ID, create a new user
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // User with given Google ID already exists
          done(null, existingUser);
        } else {
          // Create a new user
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
