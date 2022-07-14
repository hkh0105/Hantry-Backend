const indexRouter = require("../routes/index");
const userRouter = require("../routes/users");
const slackRouter = require("../routes/slack");

function routerLoader({ app }) {
  app.use("/", indexRouter);
  app.use("/users", userRouter);
  app.use("/slack", slackRouter);
}

module.exports = routerLoader;
