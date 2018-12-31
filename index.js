const express = require("express");
// Require passport before initializing app
require("./services/passport");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to Newt, the future of learning" });
});

// Require in routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
