const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

// Require models
require("./models/User");
require("./models/Program");
require("./models/Course");
require("./models/LearningMap");

// Require firebase admin initialization
require("./services/firebase-admin");

// Connect to MongoDB
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());

// Require in routes
require("./routes/authRoutes")(app);
require("./routes/programRoutes")(app);
require("./routes/courseRoutes")(app);
require("./routes/assignmentRoutes")(app);
require("./routes/learningMapRoutes")(app);

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
