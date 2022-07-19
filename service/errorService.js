const CustomeError = require("../utils/CustomError");
const Error = require("../model/Error");
const Project = require("../model/Project");
const { sendEmail } = require("../utils/email");
const { sendMessageToSlack } = require("../utils/slack");
const { getSourceFromSourceMap } = require("../utils/getSourceFromSourceMap");
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

  if (
    project.alarm &&
    project.alaramSettings &&
    project.alaramSettings.alarmType === "Email"
  ) {
    sendEmail(project.alaramSettings.email, error);
  }

  if (project.alarm && project.alaramSettings.alarmType === "Slack") {
    await sendMessageToSlack(project.alaramSettings.email, error);
  }

  if (project.sourceMap && error.user) {
    const generatedError = getSourceFromSourceMap(
      error,
      project.sourceMap,
      dsn,
    );

    const newError = new Error(generatedError);
    await newError.save();
    return newError;
  }

  const newError = new Error({
    type: error.type || "React",
    message: error.message || "",
    source: error.source || "",
    location: error.location || { colno: 0, lineno: 0 },
    stack: error.stack || [],
    user: error.user || {},
    breadcrumbsURL: error.breadcrumbsURL || [],
    breadcrumbsClick: error.breadcrumbsClick || [],
    createdAt: error.createdAt || Date.now(),
    project: dsn,
  });

  await newError.save();

  return newError;
}

async function saveNewPerformance(type, performance, dsn) {
  const project = await Project.findOne({ dsn: dsn });

  if (!project) {
    return null;
  }

  const newPerformance = {};
  newPerformance[type] = performance;

  project.performance.push(newPerformance);
  await project.save();

  return "1";
}

async function getErrorDetatils(errorId) {
  const error = await Error.findById(errorId);

  if (!error) {
    return null;
  }

  return error;
}
async function getFileteredErrorList(dsn, page, filterType, orderType) {
  let project;
  let newOrderType = orderType === "ascent" ? 1 : -1;

  filterType != null
    ? (project = await Error.find({ project: dsn })
        .find({
          type: { $regex: filterType },
        })
        .sort({ createdAt: newOrderType })
        .skip(5 * page - 5)
        .limit(5))
    : (project = await Error.find({ project: dsn })
        .sort({ field: newOrderType })
        .skip(5 * page - 5)
        .limit(5));

  if (!project) {
    return null;
  }

  return project;
}

module.exports = {
  getFileteredErrorList,
  getErrorDetatils,
  saveNewError,
  saveNewPerformance,
};
