const CustomeError = require("../utils/CustomError");
const asyncCatcher = require("../utils/asyncCatcher");
const { signJwtToken } = require("../utils/signJwtToken");
const { checkIsUser } = require("../service/authService");

const {
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  INVALID_EMAIL,
} = require("../constants/errorConstants");

const login = asyncCatcher(async (req, res, next) => {
  const { name, email } = req.user;
  if (!name || !email) {
    return next(new CustomeError(FOUND_NO_DATA));
  }

  const user = await checkIsUser(name, email);
  const accessToken = signJwtToken(user);

  return res.json({
    ok: true,
    user,
    accessToken: accessToken,
  });
});

module.exports = { login };
