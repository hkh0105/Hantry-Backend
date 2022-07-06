const jwt = require("jsonwebtoken");
const asyncCatcher = require("../utils/asyncCatcher");
const CustomeError = require("../utils/CustomError");
const {
  TOKEN_DOES_NOT_EXIST,
  INVALID_TOKEN,
  NOT_LOGGED_IN,
} = require("../constants/errorConstants");

const verifyToken = asyncCatcher(async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return next(CustomeError(TOKEN_DOES_NOT_EXIST));
  }

  if (authToken.split(" ")[0] !== "Bearer") {
    return next(CustomeError(TOKEN_DOES_NOT_EXIST));
  }

  const accessToken = authToken.split(" ")[1];

  const verifiedUserData = jwt.verify(
    accessToken,
    process.env.JWT_SECRET_KEY,
    (error, payload) => {
      if (error) {
        return null;
      }

      return payload;
    },
  );

  if (!verifiedUserData) {
    return next(CustomeError(TOKEN_DOES_NOT_EXIST));
  }

  req.user = verifiedUserData;

  next();
});

module.exports = {
  verifyToken,
};
