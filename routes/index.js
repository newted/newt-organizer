module.exports = app =>
  Object.assign(
    {},
    require("./authRoutes")(app),
    require("./courseRoutes")(app),
    require("./learningMapRoutes")(app),
    require("./quizRoutes")(app),
    require("./sharedRoutes")(app),
    require("./userContentRoutes")(app)
  );
