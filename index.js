const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

// Require models
require("./models/User");
require("./models/Program");

// Require passport (authentication)
require("./services/passport");

// Connect to MongoDB
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());

// Enable cookie session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Require in routes
require("./routes/authRoutes")(app);
require("./routes/programRoutes")(app);
require("./routes/courseRoutes")(app);
require("./routes/assignmentRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets created after build process like
  // main.js and main.css
  app.use(express.static("client/build"));

  // Express will serve up index.html if it does not recognize route
  const path = require("path");
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
