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

async function updateUserProject(fieldName, newFieldData, dsn) {
  const updatedProject = await Project.findOneAndUpdate(
    { dsn: dsn },
    {
      [fieldName]: newFieldData,
    },
  );

  if (!updatedProject) {
    return null;
  }

  return updatedProject;
}

async function getUserProjectAll(_id) {
  const userProjectList = await Project.find({ owner: _id });
  console.log(userProjectList);
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

module.exports = {
  getAllErrors,
  getDetails,
  getUserProjectAll,
  saveNewProject,
  deleteUserProject,
  saveProjectSourceMap,
  updateUserProject,
};
