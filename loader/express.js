const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routerLoader = require("./router");
const errorHandler = require("../middlewares/errorHandler");
const cors = require("cors");
const { connectDB } = require("../config/db");
// const { init } = require("hantry-js-node");

async function expressLoader({ app }) {
  connectDB();
  app.use(
    cors({
      origin: "*",
      credentials: true,
    }),
  );

  app.use(logger("dev"));
  app.use(
    express.json({
      limit: "50mb",
    }),
  );
  app.use(
    express.urlencoded({
      limit: "50mb",
      extended: true,
    }),
  );
  app.use(cookieParser());

  routerLoader({ app });

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use(errorHandler);
}

module.exports = expressLoader;
