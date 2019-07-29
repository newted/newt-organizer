module.exports = app => {
  Object.assign(
    {},
    require("./assignmentRoutes")(app),
    require("./authRoutes")(app),
    require("./contentRoutes")(app),
    require("./courseRoutes")(app),
    require("./learningMapRoutes")(app),
    require("./programRoutes")(app),
    require("./sharedRoutes")(app)
  );
};
