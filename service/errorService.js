const CustomeError = require("../utils/CustomError");
const Error = require("../model/Error");
const Project = require("../model/Project");
const {
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  INVALID_EMAIL,
} = require("../constants/errorConstants");

async function saveNewError(error, dsn) {
  const project = await Project.findOne({ dsn: dsn });

  if (!project) {
    return null;
  }

  error.project = project._id;
  const newError = new Error(error);
  await newError.save();

  return newError;
}

module.exports = {
  saveNewError,
};
