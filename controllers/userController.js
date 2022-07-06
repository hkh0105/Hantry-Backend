const asyncCatcher = require("../utils/asyncCatcher");
const CustomeError = require("../utils/CustomError");
const { saveNewProject } = require("../service/projectService");
const {
  saveNewError,
  saveNewPerformance,
  saveNewProject,
} = require("../service/errorService");
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
  });
});

const updateProjectPerformance = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params.dsn;
  const { entryType, parsedEntry } = req.body;
  const newPerformance = await saveNewPerformance(entryType, parsedEntry, dsn);

  if (!newPerformance) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
    status: 201,
  });
});

const createProject = asyncCatcher(async (req, res, next) => {
  const { project } = req.body;
  const newProject = await saveNewProject(project);

  if (!newProject) {
    return next(new CustomeError(FOUND_NO_DATA));
  }

  return res.json({
    ok: true,
    status: 201,
    newProject,
  });
});

module.exports = {
  createProject,
  updateProjectError,
  updateProjectPerformance,
};
