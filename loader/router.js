const indexRouter = require("../routes/index");
const userRouter = require("../routes/users");

function routerLoader({ app }) {
  app.use("/", indexRouter);
  app.use("/users", userRouter);
}

module.exports = routerLoader;
