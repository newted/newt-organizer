const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

// Require models
require("./models");
// Require shared models
require("newt-knowledge-map-models");

// Require firebase admin initialization
require("./services/firebase-admin");

// Connect to MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());

// Require in routes
require("./routes")(app);

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
