const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

// Require models
require("./models/User");

// Require passport (authentication)
require("./services/passport");

// Connect to MongoDB
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

// Enable cookie session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to Newt, the future of learning" });
});

// Require in routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
