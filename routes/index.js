module.exports = app =>
  Object.assign(
    {},
    require("./assignmentRoutes")(app),
    require("./authRoutes")(app),
    require("./courseRoutes")(app),
    require("./programRoutes")(app),
    require("./sharedRoutes")(app)
  );
