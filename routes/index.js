module.exports = app =>
  Object.assign(
    {},
    require("./assignmentRoutes")(app),
    require("./authRoutes")(app),
    require("./courseRoutes")(app),
    require("./learningMapRoutes")(app),
    require("./programRoutes")(app),
    require("./quizRoutes")(app),
    require("./sharedRoutes")(app)
  );
