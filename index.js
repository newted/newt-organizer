const express = require("express");
const app = express();

require("./services/passport");

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to Newt, the future of learning" });
});

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
