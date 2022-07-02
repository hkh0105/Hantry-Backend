const asyncCatcher = require("../utils/asyncCatcher");
const CustomeError = require("../utils/CustomError");
const { saveNewError } = require("../service/errorService");
const {
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  INVALID_EMAIL,
} = require("../constants/errorConstants");

const updateProjectError = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params.dsn;
  const { error } = req.body;
  const newError = await saveNewError(error, dsn);

  if (!newError) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
    status: 201,
  });
});

module.exports = {
  updateProjectError,
};
