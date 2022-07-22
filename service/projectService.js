const CustomeError = require("../utils/CustomError");
const Error = require("../model/Error");
const Project = require("../model/Project");
const { generateDsnToken } = require("../utils/generateDsnToken");
const {
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  INVALID_EMAIL,
} = require("../constants/errorConstants");

async function saveNewProject(project, userID) {
  const dsnGeneratedProject = generateDsnToken(project, userID);
  const newProject = await Project.create(dsnGeneratedProject);
  if (!newProject) {
    return null;
  }

  return newProject;
}

async function updateSourceMap(dsn, sourceMap) {
  const newProject = await Project.findOne({ dsn: dsn });

  if (!newProject) {
    return null;
  }

  newProject.sourceMap = sourceMap;
  await newProject.save();

  return newProject;
}

async function deleteUserProject(dsn) {
  const newProject = await Project.findOneAndRemove({ dsn: dsn });

  if (!newProject) {
    return null;
  }

  return newProject;
}

async function saveProjectSourceMap(sourceMap, bundledSource, dsn) {
  const newProject = await Project.findOne({ dsn: dsn });
  newProject.sourceMap = sourceMap;
  newProject.bundledSource = bundledSource;
  await newProject.save();

  if (!newProject) {
    return null;
  }

  return newProject;
}

async function updateUserProject(project, dsn) {
  const updatedProject = await Project.findOne({ dsn: dsn });
  updatedProject.name = project.name;
  updatedProject.platform = project.platform;
  updatedProject.alarm = project.alarm;
  if (updatedProject.alarm) {
    updatedProject.alaramSettings.alarmType =
      updatedProject.alaramSettings.alarmType;
    updatedProject.alaramSettings.alarmNumber =
      updatedProject.alaramSettings.alarmNumber;
    updatedProject.alaramSettings.email = updatedProject.alaramSettings.email;
  }

  if (!updatedProject) {
    return null;
  }

  await updatedProject.save();
  console.log(updatedProject);
  return updatedProject;
}

async function getUserProjectAll(_id) {
  const userProjectList = await Project.find({ owner: _id });
  if (!userProjectList) {
    return null;
  }

  return userProjectList;
}

async function getDetails(dsn) {
  const project = await Project.findOne({ dsn: dsn });

  if (!project) {
    return null;
  }

  return project;
}

async function getAllErrors(dsn) {
  const allErrors = await Error.find({ project: dsn });
  if (!allErrors) {
    return null;
  }

  return allErrors;
}

async function deleteSourceMap(dsn) {
  const project = await Project.findOne({ dsn: dsn });
  project.sourceMap = null;
  await project.save();

  return project;
}

module.exports = {
  updateSourceMap,
  getAllErrors,
  getDetails,
  getUserProjectAll,
  saveNewProject,
  deleteUserProject,
  saveProjectSourceMap,
  updateUserProject,
  deleteSourceMap,
};
