const asyncCatcher = require("../utils/asyncCatcher");
const CustomeError = require("../utils/CustomError");
const {
  saveNewProject,
  deleteUserProject,
  saveProjectSourceMap,
} = require("../service/projectService");
const { saveNewError, saveNewPerformance } = require("../service/errorService");
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

const deleteProject = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params.dsn;
  const deletedProject = await deleteUserProject(dsn);

  if (!deletedProject) {
    return next(new CustomeError(FOUND_NO_DATA));
  }

  return res.json({
    ok: true,
    status: 201,
  });
});

const updateProject = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params.dsn;
  const { fieldName, newFieldData } = req.body;
  const updatedProject = await updateUserProject(fieldName, newFieldData, dsn);

  if (!updatedProject) {
    return next(new CustomeError(FOUND_NO_DATA));
  }

  return res.json({
    ok: true,
    status: 201,
    updatedProject,
  });
});

const updateProjectSourceMap = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params.dsn;
  const { sourceMap, bundledSource } = req.body;
  const newError = await saveProjectSourceMap(sourceMap, bundledSource, dsn);

  if (!newError) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
  });
});

module.exports = {
  deleteProject,
  createProject,
  updateProjectError,
  updateProjectPerformance,
  updateProjectSourceMap,
};
