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

async function saveNewProject(project) {
  const dsnGeneratedProject = generateDsnToken(project);
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

  if (!userProjectList) {
    return null;
  }

  return userProjectList;
}

updateUserProject(fieldName, newFieldData, dsn);
module.exports = {
  getUserProjectAll,
  saveNewProject,
  deleteUserProject,
  saveProjectSourceMap,
  updateUserProject,
};
