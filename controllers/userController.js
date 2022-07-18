const asyncCatcher = require("../utils/asyncCatcher");
const CustomeError = require("../utils/CustomError");
const getSource = require("../utils/getSourceFromSourceMap");
const fs = require("fs");

const {
  saveNewProject,
  deleteUserProject,
  saveProjectSourceMap,
  getUserProjectAll,
  getDetails,
  getAllErrors,
  updateUserProject,
  updateSourceMap,
} = require("../service/projectService");
const {
  saveNewError,
  saveNewPerformance,
  getErrorDetatils,
  getFileteredErrorList,
} = require("../service/errorService");
const {
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  INVALID_EMAIL,
} = require("../constants/errorConstants");

const updateProjectError = asyncCatcher(async (req, res, next) => {
  console.log(req.body);
  const { dsn } = req.params;
  const error = req.body;

  const newError = await saveNewError(error, dsn);

  if (!newError) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
  });
});

const updateProjectPerformance = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params;
  const { entryType, parsedEntry } = req.body;
  console.log(req.body);
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
  const userId = req.user.user._id;
  console.log(project);
  const newProject = await saveNewProject(project, userId);

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
  const { dsn } = req.params;
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
  const dsn = req.params.dsn;
  const { project } = req.body;
  const updatedProject = await updateUserProject(project, dsn);

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
  const dsn = req.params.dsn;
  const { sourceMap } = req.body;
  // console.log(sourceMap);
  // const updatedProject = await updateSourceMap(dsn, sourceMap);

  // if (!updatedProject) {
  //   return next(new CustomeError(FOUND_NO_DATA));
  // }

  // return res.json({
  //   ok: true,
  //   status: 201,
  //   updatedProject,
  // });
});

const updateSDKSourceMap = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params.dsn;
  const { sourceMap, bundledSource } = req.body;
  console.log(req);
  console.log(req.body);
  console.log(req.file);
  // getSource(sourceMap);
  // const newError = await saveProjectSourceMap(sourceMap, bundledSource, dsn);

  // if (!newError) {
  //   return next(new CustomeError(FOUND_NO_FIELD));
  // }

  return res.json({
    ok: true,
  });
});

const getUserProject = asyncCatcher(async (req, res, next) => {
  const userId = req.user.user._id;
  const userProject = await getUserProjectAll(userId);

  if (!userProject) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
    userProject,
  });
});

const getError = asyncCatcher(async (req, res, next) => {
  const { error_id } = req.params;
  const error = await getErrorDetatils(error_id);

  if (!error) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
    error: error,
  });
});

const getProjectErrorList = asyncCatcher(async (req, res, next) => {
  const { dsn, page_number } = req.params;
  const filterType = req.query.filter;
  const errorList = filterType
    ? await getFileteredErrorList(dsn, page_number, filterType)
    : await getFileteredErrorList(dsn, page_number);

  if (!errorList) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
    errorList,
  });
});

const getProjectDetails = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params;
  const projectDetails = await getDetails(dsn);

  if (!projectDetails) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
    projectDetails,
  });
});

const getProjectAllError = asyncCatcher(async (req, res, next) => {
  const { dsn } = req.params;
  console.log(dsn);
  const allErrors = await getAllErrors(dsn);

  if (!allErrors) {
    return next(new CustomeError(FOUND_NO_FIELD));
  }

  return res.json({
    ok: true,
    allErrors,
  });
});

module.exports = {
  getProjectAllError,
  getProjectDetails,
  getProjectErrorList,
  getError,
  getUserProject,
  deleteProject,
  createProject,
  updateProject,
  updateProjectError,
  updateProjectPerformance,
  updateProjectSourceMap,
};
